import type {
  AnalyticsPageView,
  AnalyticsReport,
  AnalyticsTrafficSource,
  AnalyticsVisit,
  AnalyticsVisitEvent,
} from "../../data/analyticsContract.ts";
import {
  getVisitDatabase,
  VisitDatabaseConfigurationError,
  type VisitDatabase,
} from "../visits/repository.ts";
import type { AnalyticsSelection } from "./request.ts";

type AnalyticsVisitRow = Record<string, unknown>;

const trafficSources = new Set<AnalyticsTrafficSource>([
  "direct",
  "internal",
  "paid",
  "referral",
]);

const eventSources = new Set<AnalyticsVisitEvent["source"]>([
  "client",
  "server",
]);

const analyticsVisitColumns = `
  ledger.visit_id::TEXT AS "id",
  ledger.visitor_id::TEXT AS "visitorId",
  ledger.visit_number::INTEGER AS "visitNumber",
  (
    SELECT COUNT(*)::INTEGER
    FROM site_visits AS visitor_visits
    WHERE visitor_visits.visitor_id = ledger.visitor_id
  ) AS "totalVisits",
  TO_CHAR(
    ledger.started_at AT TIME ZONE 'Australia/Perth',
    'YYYY-MM-DD'
  ) AS "dateKey",
  ledger.started_at AS "startedAt",
  ledger.last_seen_at AS "lastSeenAt",
  ledger.visit_duration_seconds::INTEGER AS "durationSeconds",
  ledger.landing_path AS "landingPath",
  ledger.referrer_url AS "referrerUrl",
  ledger.referrer_host AS "referrerHost",
  ledger.traffic_source AS "trafficSource",
  ledger.gclid,
  ledger.ad_code AS "adCode",
  ledger.network_code AS "networkCode",
  ledger.matched_keyword AS "matchedKeyword",
  ledger.match_type AS "matchType",
  ledger.is_bot AS "isBot",
  ledger.bot_name AS "botName",
  ledger.bot_category AS "botCategory",
  EXISTS (
    SELECT 1
    FROM analytics_excluded_visitors AS exclusions
    WHERE exclusions.visitor_id = ledger.visitor_id
  ) AS "isExcluded",
  COALESCE(
    (
      SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
          'activeSeconds', page_views.active_seconds,
          'id', page_views.id::TEXT,
          'path', page_views.path,
          'viewedAt', page_views.viewed_at
        )
        ORDER BY page_views.viewed_at, page_views.id
      )
      FROM site_page_views AS page_views
      WHERE page_views.visit_id = ledger.visit_id
    ),
    '[]'::JSON
  ) AS "pageViews",
  COALESCE(
    (
      SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', visit_events.id::TEXT,
          'eventType', visit_events.event_type,
          'occurredAt', visit_events.occurred_at,
          'pageViewId', visit_events.page_view_id::TEXT,
          'properties', visit_events.properties,
          'source', visit_events.source
        )
        ORDER BY visit_events.occurred_at, visit_events.id
      )
      FROM site_visit_events AS visit_events
      WHERE visit_events.visit_id = ledger.visit_id
    ),
    '[]'::JSON
  ) AS "events"
`;

export const dailyAnalyticsSql = `
SELECT
${analyticsVisitColumns}
FROM visit_ledger AS ledger
WHERE ledger.started_at >= (
  $1::DATE::TIMESTAMP AT TIME ZONE 'Australia/Perth'
)
AND ledger.started_at < (
  (($1::DATE + 1)::TIMESTAMP) AT TIME ZONE 'Australia/Perth'
)
AND NOT EXISTS (
  SELECT 1
  FROM analytics_excluded_visitors AS exclusions
  WHERE exclusions.visitor_id = ledger.visitor_id
)
ORDER BY ledger.started_at DESC, ledger.visit_id DESC;
`;

export const monthlyEnquiryAnalyticsSql = `
SELECT
${analyticsVisitColumns}
FROM visit_ledger AS ledger
WHERE EXISTS (
  SELECT 1
  FROM site_visit_events AS monthly_events
  WHERE monthly_events.visit_id = ledger.visit_id
    AND monthly_events.event_type IN ('enquiry_sent', 'enquiry_failed')
    AND monthly_events.occurred_at >= (
      (($1 || '-01')::DATE::TIMESTAMP) AT TIME ZONE 'Australia/Perth'
    )
    AND monthly_events.occurred_at < (
      (((($1 || '-01')::DATE + INTERVAL '1 month')::TIMESTAMP))
      AT TIME ZONE 'Australia/Perth'
    )
)
AND NOT EXISTS (
  SELECT 1
  FROM analytics_excluded_visitors AS exclusions
  WHERE exclusions.visitor_id = ledger.visitor_id
)
ORDER BY ledger.started_at DESC, ledger.visit_id DESC;
`;

export const pageViewsAnalyticsSql = `
WITH included_visits AS (
  SELECT ledger.visit_id
  FROM visit_ledger AS ledger
  WHERE ledger.started_at >= (
    $1::DATE::TIMESTAMP AT TIME ZONE 'Australia/Perth'
  )
  AND ledger.started_at < (
    (($2::DATE + 1)::TIMESTAMP) AT TIME ZONE 'Australia/Perth'
  )
  AND ($3::BOOLEAN OR ledger.is_bot IS DISTINCT FROM TRUE)
  AND NOT EXISTS (
    SELECT 1
    FROM analytics_excluded_visitors AS exclusions
    WHERE exclusions.visitor_id = ledger.visitor_id
  )
),
route_counts AS (
  SELECT
    page_views.path,
    SUM(page_views.active_seconds)::INTEGER AS active_seconds,
    COUNT(*)::INTEGER AS page_view_count,
    COUNT(DISTINCT page_views.visit_id)::INTEGER AS visit_count
  FROM site_page_views AS page_views
  INNER JOIN included_visits
    ON included_visits.visit_id = page_views.visit_id
  GROUP BY page_views.path
)
SELECT
  route_counts.path,
  route_counts.active_seconds AS "activeSeconds",
  route_counts.page_view_count AS "pageViews",
  route_counts.visit_count AS "visits",
  (SELECT COUNT(*)::INTEGER FROM included_visits) AS "totalVisits",
  COALESCE((SELECT SUM(active_seconds)::INTEGER FROM route_counts), 0) AS "totalActiveSeconds",
  COALESCE((SELECT SUM(page_view_count)::INTEGER FROM route_counts), 0) AS "totalPageViews"
FROM (SELECT 1) AS report_row
LEFT JOIN route_counts ON TRUE
ORDER BY route_counts.page_view_count DESC NULLS LAST, route_counts.path ASC;
`;

export const visitorAnalyticsSql = `
SELECT
${analyticsVisitColumns}
FROM visit_ledger AS ledger
WHERE ledger.visitor_id = $1::UUID
ORDER BY ledger.started_at DESC, ledger.visit_id DESC;
`;

export class AnalyticsDataUnavailableError extends Error {
  constructor() {
    super("Analytics database configuration is unavailable.");
    this.name = "AnalyticsDataUnavailableError";
  }
}

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return value;
}

function nullableString(value: unknown, field: string) {
  if (value === null || value === undefined) return null;
  return requiredString(value, field);
}

function nullableBoolean(value: unknown, field: string) {
  if (value === null || value === undefined) return null;

  if (typeof value !== "boolean") {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return value;
}

function requiredBoolean(value: unknown, field: string) {
  const normalized = nullableBoolean(value, field);

  if (normalized === null) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return normalized;
}

function nonNegativeInteger(value: unknown, field: string) {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isSafeInteger(number) || number < 0) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return number;
}

function timestampString(value: unknown, field: string) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString();
  }

  return requiredString(value, field);
}

function normalizeTrafficSource(value: unknown) {
  if (typeof value === "string" && trafficSources.has(value as AnalyticsTrafficSource)) {
    return value as AnalyticsTrafficSource;
  }

  throw new TypeError("Analytics row has an invalid traffic source.");
}

function normalizeEventSource(value: unknown): AnalyticsVisitEvent["source"] {
  if (
    typeof value === "string"
    && eventSources.has(value as AnalyticsVisitEvent["source"])
  ) {
    return value as AnalyticsVisitEvent["source"];
  }

  throw new TypeError("Analytics row has an invalid event source.");
}

function normalizeEventProperties(value: unknown): Record<string, string> {
  const properties = typeof value === "string" ? JSON.parse(value) : value;

  if (!properties || typeof properties !== "object" || Array.isArray(properties)) {
    throw new TypeError("Analytics row has invalid event properties.");
  }

  const entries = Object.entries(properties);
  if (entries.some(([, propertyValue]) => typeof propertyValue !== "string")) {
    throw new TypeError("Analytics row has invalid event properties.");
  }

  return Object.fromEntries(entries) as Record<string, string>;
}

function normalizeEvents(value: unknown): AnalyticsVisitEvent[] {
  const events = typeof value === "string" ? JSON.parse(value) : value;

  if (!Array.isArray(events)) {
    throw new TypeError("Analytics row has invalid events.");
  }

  return events.map((event) => {
    if (!event || typeof event !== "object") {
      throw new TypeError("Analytics row has an invalid event.");
    }

    const row = event as Record<string, unknown>;
    return {
      eventType: requiredString(row.eventType, "event type"),
      id: requiredString(row.id, "event ID"),
      occurredAt: timestampString(row.occurredAt, "event time"),
      pageViewId: nullableString(row.pageViewId, "event page-view ID"),
      properties: normalizeEventProperties(row.properties),
      source: normalizeEventSource(row.source),
    };
  });
}

function normalizePageViews(value: unknown): AnalyticsPageView[] {
  const pageViews = typeof value === "string" ? JSON.parse(value) : value;

  if (!Array.isArray(pageViews)) {
    throw new TypeError("Analytics row has invalid page views.");
  }

  return pageViews.map((pageView) => {
    if (!pageView || typeof pageView !== "object") {
      throw new TypeError("Analytics row has an invalid page view.");
    }

    const row = pageView as Record<string, unknown>;
    return {
      activeSeconds: nonNegativeInteger(row.activeSeconds, "page-view active time"),
      id: requiredString(row.id, "page-view ID"),
      path: requiredString(row.path, "page-view path"),
      viewedAt: timestampString(row.viewedAt, "page-view time"),
    };
  });
}

function normalizeVisit(row: AnalyticsVisitRow): AnalyticsVisit {
  const visitNumber = nonNegativeInteger(row.visitNumber, "visit number");
  const totalVisits = nonNegativeInteger(row.totalVisits, "total visits");

  if (visitNumber < 1 || totalVisits < visitNumber) {
    throw new TypeError("Analytics row has an invalid visit sequence.");
  }

  return {
    adCode: nullableString(row.adCode, "ad code"),
    botCategory: nullableString(row.botCategory, "bot category"),
    botName: nullableString(row.botName, "bot name"),
    dateKey: requiredString(row.dateKey, "date"),
    durationSeconds: nonNegativeInteger(row.durationSeconds, "duration"),
    events: normalizeEvents(row.events),
    gclid: nullableString(row.gclid, "GCLID"),
    id: requiredString(row.id, "visit ID"),
    isBot: nullableBoolean(row.isBot, "bot verdict"),
    landingPath: requiredString(row.landingPath, "landing path"),
    lastSeenAt: timestampString(row.lastSeenAt, "last-seen time"),
    matchType: nullableString(row.matchType, "match type"),
    matchedKeyword: nullableString(row.matchedKeyword, "matched keyword"),
    networkCode: nullableString(row.networkCode, "network code"),
    pageViews: normalizePageViews(row.pageViews),
    referrerHost: nullableString(row.referrerHost, "referrer host"),
    referrerUrl: nullableString(row.referrerUrl, "referrer URL"),
    startedAt: timestampString(row.startedAt, "start time"),
    trafficSource: normalizeTrafficSource(row.trafficSource),
    totalVisits,
    visitNumber,
    visitorId: requiredString(row.visitorId, "visitor ID"),
  };
}

function resolveDatabase(database?: VisitDatabase) {
  if (database) return database;

  try {
    return getVisitDatabase();
  } catch (error) {
    if (error instanceof VisitDatabaseConfigurationError) {
      throw new AnalyticsDataUnavailableError();
    }

    throw error;
  }
}

export async function readAnalytics(
  selection: AnalyticsSelection,
  database?: VisitDatabase,
): Promise<AnalyticsReport> {
  const selectedDatabase = resolveDatabase(database);

  if (selection.type === "pageViews") {
    const rows = await selectedDatabase.query(pageViewsAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsVisitRow[];
    const totals = rows[0] ?? { totalActiveSeconds: 0, totalPageViews: 0, totalVisits: 0 };
    const routes = rows
      .filter((row) => row.path !== null && row.path !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "route active time"),
        pageViews: nonNegativeInteger(row.pageViews, "route page views"),
        path: requiredString(row.path, "route path"),
        visits: nonNegativeInteger(row.visits, "route visits"),
      }));

    return {
      endDate: selection.endDate,
      routes,
      startDate: selection.startDate,
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "total active time"),
      totalPageViews: nonNegativeInteger(totals.totalPageViews, "total page views"),
      totalVisits: nonNegativeInteger(totals.totalVisits, "total visits"),
      type: "pageViews",
    };
  }

  const query = selection.type === "daily"
    ? dailyAnalyticsSql
    : selection.type === "monthly"
      ? monthlyEnquiryAnalyticsSql
      : visitorAnalyticsSql;
  const parameter = selection.type === "daily"
    ? selection.date
    : selection.type === "monthly"
      ? selection.month
      : selection.visitorId;
  const rows = await selectedDatabase.query(query, [parameter]) as AnalyticsVisitRow[];
  const visits = rows.map(normalizeVisit);

  return selection.type === "daily"
    ? { type: "daily", date: selection.date, visits }
    : selection.type === "monthly"
      ? { type: "monthly", month: selection.month, visits }
      : {
          type: "visitor",
          visitorId: selection.visitorId,
          isExcluded: rows.length
            ? requiredBoolean(rows[0].isExcluded, "visitor exclusion state")
            : false,
          visits,
        };
}

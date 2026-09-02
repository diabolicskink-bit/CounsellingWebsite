import type {
  AnalyticsPageView,
  AnalyticsReport,
  AnalyticsTrafficSource,
  AnalyticsVisit,
  AnalyticsVisitEvent,
} from "../../data/analyticsContract.ts";
import {
  australianVisitRegionCodes,
  type AustralianVisitRegionCode,
  type VisitDeviceType,
} from "../../data/visitClientEnvironment.ts";
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

const deviceTypes = new Set<VisitDeviceType>([
  "desktop",
  "mobile",
  "tablet",
  "unknown",
]);

const australianRegionCodes = new Set<AustralianVisitRegionCode>(australianVisitRegionCodes);

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
  visit_record.user_agent AS "userAgent",
  visit_record.device_type AS "deviceType",
  visit_record.is_webdriver AS "isWebDriver",
  visit_record.location_country_code AS "locationCountryCode",
  visit_record.location_region_code AS "locationRegionCode",
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
INNER JOIN site_visits AS visit_record
  ON visit_record.id = ledger.visit_id
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
INNER JOIN site_visits AS visit_record
  ON visit_record.id = ledger.visit_id
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
),
route_actions AS (
  SELECT
    page_views.path,
    COUNT(*) FILTER (
      WHERE visit_events.event_type = 'email_link_clicked'
    )::INTEGER AS email_clicks,
    COUNT(*) FILTER (
      WHERE visit_events.event_type = 'instagram_link_clicked'
    )::INTEGER AS instagram_clicks,
    COUNT(*) FILTER (
      WHERE visit_events.event_type = 'linkedin_link_clicked'
    )::INTEGER AS linkedin_clicks
  FROM site_visit_events AS visit_events
  INNER JOIN included_visits
    ON included_visits.visit_id = visit_events.visit_id
  INNER JOIN site_page_views AS page_views
    ON page_views.id = visit_events.page_view_id
    AND page_views.visit_id = visit_events.visit_id
  WHERE visit_events.event_type IN (
    'email_link_clicked',
    'instagram_link_clicked',
    'linkedin_link_clicked'
  )
  GROUP BY page_views.path
)
SELECT
  route_counts.path,
  route_counts.active_seconds AS "activeSeconds",
  COALESCE(route_actions.email_clicks, 0) AS "emailClicks",
  COALESCE(route_actions.instagram_clicks, 0) AS "instagramClicks",
  COALESCE(route_actions.linkedin_clicks, 0) AS "linkedinClicks",
  COALESCE(route_actions.email_clicks, 0)
    + COALESCE(route_actions.instagram_clicks, 0)
    + COALESCE(route_actions.linkedin_clicks, 0) AS "outboundClicks",
  route_counts.page_view_count AS "pageViews",
  route_counts.visit_count AS "visits",
  (SELECT COUNT(*)::INTEGER FROM included_visits) AS "totalVisits",
  COALESCE((SELECT SUM(active_seconds)::INTEGER FROM route_counts), 0) AS "totalActiveSeconds",
  COALESCE((SELECT SUM(email_clicks)::INTEGER FROM route_actions), 0) AS "totalEmailClicks",
  COALESCE((SELECT SUM(instagram_clicks)::INTEGER FROM route_actions), 0) AS "totalInstagramClicks",
  COALESCE((SELECT SUM(linkedin_clicks)::INTEGER FROM route_actions), 0) AS "totalLinkedinClicks",
  COALESCE((
    SELECT SUM(email_clicks + instagram_clicks + linkedin_clicks)::INTEGER
    FROM route_actions
  ), 0) AS "totalOutboundClicks",
  COALESCE((SELECT SUM(page_view_count)::INTEGER FROM route_counts), 0) AS "totalPageViews"
FROM (SELECT 1) AS report_row
LEFT JOIN route_counts ON TRUE
LEFT JOIN route_actions ON route_actions.path = route_counts.path
ORDER BY route_counts.page_view_count DESC NULLS LAST, route_counts.path ASC;
`;

export const keywordAnalyticsSql = `
WITH included_paid_visits AS (
  SELECT
    ledger.visit_id,
    ledger.visit_number,
    ledger.started_at,
    LOWER(BTRIM(ledger.matched_keyword)) AS keyword,
    ledger.match_type
  FROM visit_ledger AS ledger
  WHERE ledger.started_at >= (
    $1::DATE::TIMESTAMP AT TIME ZONE 'Australia/Perth'
  )
  AND ledger.started_at < (
    (($2::DATE + 1)::TIMESTAMP) AT TIME ZONE 'Australia/Perth'
  )
  AND ledger.traffic_source = 'paid'
  AND ($3::BOOLEAN OR ledger.is_bot IS DISTINCT FROM TRUE)
  AND NOT EXISTS (
    SELECT 1
    FROM analytics_excluded_visitors AS exclusions
    WHERE exclusions.visitor_id = ledger.visitor_id
  )
),
visit_activity AS (
  SELECT
    page_views.visit_id,
    COUNT(*)::INTEGER AS page_views,
    SUM(page_views.active_seconds)::INTEGER AS active_seconds
  FROM site_page_views AS page_views
  INNER JOIN included_paid_visits
    ON included_paid_visits.visit_id = page_views.visit_id
  GROUP BY page_views.visit_id
),
visit_outcomes AS (
  SELECT
    visit_events.visit_id,
    TRUE AS has_enquiry
  FROM site_visit_events AS visit_events
  INNER JOIN included_paid_visits
    ON included_paid_visits.visit_id = visit_events.visit_id
  WHERE visit_events.event_type = 'enquiry_sent'
  GROUP BY visit_events.visit_id
),
tagged_visits AS (
  SELECT
    included_paid_visits.*,
    COALESCE(visit_activity.page_views, 0) AS page_views,
    COALESCE(visit_activity.active_seconds, 0) AS active_seconds,
    COALESCE(visit_outcomes.has_enquiry, FALSE) AS has_enquiry
  FROM included_paid_visits
  LEFT JOIN visit_activity
    ON visit_activity.visit_id = included_paid_visits.visit_id
  LEFT JOIN visit_outcomes
    ON visit_outcomes.visit_id = included_paid_visits.visit_id
  WHERE included_paid_visits.keyword IS NOT NULL
    AND included_paid_visits.keyword <> ''
),
keyword_rows AS (
  SELECT
    tagged_visits.keyword,
    COUNT(*)::INTEGER AS visits,
    COUNT(*) FILTER (WHERE tagged_visits.visit_number > 1)::INTEGER AS "returningVisits",
    COUNT(*) FILTER (WHERE tagged_visits.has_enquiry)::INTEGER AS "enquiryVisits",
    COALESCE(SUM(tagged_visits.page_views), 0)::INTEGER AS "pageViews",
    COALESCE(SUM(tagged_visits.active_seconds), 0)::INTEGER AS "activeSeconds",
    MAX(tagged_visits.started_at) AS "latestVisitAt",
    COALESCE(
      TO_JSONB(ARRAY_AGG(DISTINCT tagged_visits.match_type ORDER BY tagged_visits.match_type)
        FILTER (WHERE tagged_visits.match_type IS NOT NULL)),
      '[]'::JSONB
    ) AS "matchTypes"
  FROM tagged_visits
  GROUP BY tagged_visits.keyword
)
SELECT
  keyword_rows.keyword,
  keyword_rows.visits,
  keyword_rows."returningVisits",
  keyword_rows."enquiryVisits",
  keyword_rows."pageViews",
  keyword_rows."activeSeconds",
  keyword_rows."latestVisitAt",
  keyword_rows."matchTypes",
  (SELECT COUNT(*)::INTEGER FROM included_paid_visits) AS "totalPaidVisits",
  (SELECT COUNT(*)::INTEGER FROM tagged_visits) AS "taggedVisits",
  (
    SELECT COUNT(*)::INTEGER
    FROM included_paid_visits
    INNER JOIN visit_outcomes
      ON visit_outcomes.visit_id = included_paid_visits.visit_id
  ) AS "totalEnquiryVisits",
  (SELECT COUNT(*) FILTER (WHERE has_enquiry)::INTEGER FROM tagged_visits) AS "taggedEnquiryVisits",
  COALESCE((SELECT SUM(page_views)::INTEGER FROM visit_activity), 0) AS "totalPageViews",
  COALESCE((SELECT SUM(active_seconds)::INTEGER FROM visit_activity), 0) AS "totalActiveSeconds"
FROM (SELECT 1) AS report_row
LEFT JOIN keyword_rows ON TRUE
ORDER BY keyword_rows."enquiryVisits" DESC NULLS LAST,
  keyword_rows.visits DESC NULLS LAST,
  keyword_rows.keyword ASC;
`;

export const visitorAnalyticsSql = `
SELECT
${analyticsVisitColumns}
FROM visit_ledger AS ledger
INNER JOIN site_visits AS visit_record
  ON visit_record.id = ledger.visit_id
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

function normalizeDeviceType(value: unknown): VisitDeviceType {
  if (typeof value === "string" && deviceTypes.has(value as VisitDeviceType)) {
    return value as VisitDeviceType;
  }

  throw new TypeError("Analytics row has an invalid device type.");
}

function normalizeVisitLocation(countryValue: unknown, regionValue: unknown) {
  const countryCode = nullableString(countryValue, "location country code");
  const regionCode = nullableString(regionValue, "location region code");

  if (countryCode === null) {
    if (regionCode !== null) throw new TypeError("Analytics row has an invalid visit location.");
    return { locationCountryCode: null, locationRegionCode: null };
  }

  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new TypeError("Analytics row has an invalid visit location.");
  }

  if (countryCode !== "AU") {
    if (regionCode !== null) throw new TypeError("Analytics row has an invalid visit location.");
    return { locationCountryCode: countryCode, locationRegionCode: null };
  }

  if (!regionCode || !australianRegionCodes.has(regionCode as AustralianVisitRegionCode)) {
    throw new TypeError("Analytics row has an invalid visit location.");
  }

  return {
    locationCountryCode: countryCode,
    locationRegionCode: regionCode as AustralianVisitRegionCode,
  };
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

function normalizeStringList(value: unknown, field: string): string[] {
  const values = typeof value === "string" ? JSON.parse(value) : value;

  if (!Array.isArray(values) || values.some((item) => typeof item !== "string" || !item)) {
    throw new TypeError(`Analytics row has invalid ${field}.`);
  }

  return values;
}

function normalizeVisit(row: AnalyticsVisitRow): AnalyticsVisit {
  const visitNumber = nonNegativeInteger(row.visitNumber, "visit number");
  const totalVisits = nonNegativeInteger(row.totalVisits, "total visits");

  if (visitNumber < 1 || totalVisits < visitNumber) {
    throw new TypeError("Analytics row has an invalid visit sequence.");
  }

  const location = normalizeVisitLocation(row.locationCountryCode, row.locationRegionCode);

  return {
    adCode: nullableString(row.adCode, "ad code"),
    botCategory: nullableString(row.botCategory, "bot category"),
    botName: nullableString(row.botName, "bot name"),
    dateKey: requiredString(row.dateKey, "date"),
    deviceType: normalizeDeviceType(row.deviceType),
    durationSeconds: nonNegativeInteger(row.durationSeconds, "duration"),
    events: normalizeEvents(row.events),
    gclid: nullableString(row.gclid, "GCLID"),
    id: requiredString(row.id, "visit ID"),
    isBot: nullableBoolean(row.isBot, "bot verdict"),
    isWebDriver: nullableBoolean(row.isWebDriver, "WebDriver flag"),
    landingPath: requiredString(row.landingPath, "landing path"),
    lastSeenAt: timestampString(row.lastSeenAt, "last-seen time"),
    ...location,
    matchType: nullableString(row.matchType, "match type"),
    matchedKeyword: nullableString(row.matchedKeyword, "matched keyword"),
    networkCode: nullableString(row.networkCode, "network code"),
    pageViews: normalizePageViews(row.pageViews),
    referrerHost: nullableString(row.referrerHost, "referrer host"),
    referrerUrl: nullableString(row.referrerUrl, "referrer URL"),
    startedAt: timestampString(row.startedAt, "start time"),
    trafficSource: normalizeTrafficSource(row.trafficSource),
    totalVisits,
    userAgent: nullableString(row.userAgent, "user-agent"),
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

  if (selection.type === "keywords") {
    const rows = await selectedDatabase.query(keywordAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsVisitRow[];
    const totals = rows[0] ?? {
      taggedEnquiryVisits: 0,
      taggedVisits: 0,
      totalActiveSeconds: 0,
      totalEnquiryVisits: 0,
      totalPageViews: 0,
      totalPaidVisits: 0,
    };
    const keywords = rows
      .filter((row) => row.keyword !== null && row.keyword !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "keyword active time"),
        enquiryVisits: nonNegativeInteger(row.enquiryVisits, "keyword enquiry visits"),
        keyword: requiredString(row.keyword, "keyword"),
        latestVisitAt: timestampString(row.latestVisitAt, "keyword latest visit time"),
        matchTypes: normalizeStringList(row.matchTypes, "keyword match types"),
        pageViews: nonNegativeInteger(row.pageViews, "keyword page views"),
        returningVisits: nonNegativeInteger(row.returningVisits, "keyword returning visits"),
        visits: nonNegativeInteger(row.visits, "keyword visits"),
      }));

    return {
      endDate: selection.endDate,
      keywords,
      startDate: selection.startDate,
      taggedEnquiryVisits: nonNegativeInteger(totals.taggedEnquiryVisits, "tagged enquiry visits"),
      taggedVisits: nonNegativeInteger(totals.taggedVisits, "tagged visits"),
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "paid visit active time"),
      totalEnquiryVisits: nonNegativeInteger(totals.totalEnquiryVisits, "paid enquiry visits"),
      totalPageViews: nonNegativeInteger(totals.totalPageViews, "paid page views"),
      totalPaidVisits: nonNegativeInteger(totals.totalPaidVisits, "paid visits"),
      type: "keywords",
    };
  }

  if (selection.type === "pageViews") {
    const rows = await selectedDatabase.query(pageViewsAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsVisitRow[];
    const totals = rows[0] ?? {
      totalActiveSeconds: 0,
      totalEmailClicks: 0,
      totalInstagramClicks: 0,
      totalLinkedinClicks: 0,
      totalOutboundClicks: 0,
      totalPageViews: 0,
      totalVisits: 0,
    };
    const routes = rows
      .filter((row) => row.path !== null && row.path !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "route active time"),
        emailClicks: nonNegativeInteger(row.emailClicks, "route email clicks"),
        instagramClicks: nonNegativeInteger(row.instagramClicks, "route Instagram clicks"),
        linkedinClicks: nonNegativeInteger(row.linkedinClicks, "route LinkedIn clicks"),
        outboundClicks: nonNegativeInteger(row.outboundClicks, "route outbound clicks"),
        pageViews: nonNegativeInteger(row.pageViews, "route page views"),
        path: requiredString(row.path, "route path"),
        visits: nonNegativeInteger(row.visits, "route visits"),
      }));

    return {
      endDate: selection.endDate,
      routes,
      startDate: selection.startDate,
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "total active time"),
      totalEmailClicks: nonNegativeInteger(totals.totalEmailClicks, "total email clicks"),
      totalInstagramClicks: nonNegativeInteger(
        totals.totalInstagramClicks,
        "total Instagram clicks",
      ),
      totalLinkedinClicks: nonNegativeInteger(
        totals.totalLinkedinClicks,
        "total LinkedIn clicks",
      ),
      totalOutboundClicks: nonNegativeInteger(
        totals.totalOutboundClicks,
        "total outbound clicks",
      ),
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

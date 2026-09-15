import { isAnalyticsReport, type AnalyticsReport } from "../../data/analyticsContract.ts";
import type { VisitDatabase } from "../visits/repository.ts";
import { resolveAnalyticsDatabase } from "./database.ts";
import type { AnalyticsSelection } from "./request.ts";
import { nonNegativeInteger, timestampString } from "./row-values.ts";

type AnalyticsRow = Record<string, unknown>;

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
    AND monthly_events.event_type IN (
      'email_link_clicked',
      'enquiry_sent',
      'enquiry_failed',
      'phone_link_clicked'
    )
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

export const referrersAnalyticsSql = `
WITH included_visits AS (
  SELECT
    ledger.visit_id,
    CASE
      WHEN ledger.referrer_host IS NULL THEN 'No referrer recorded'
      WHEN LOWER(ledger.referrer_host) IN ('vivecounselling.com.au', 'www.vivecounselling.com.au')
        THEN 'Internal'
      ELSE REGEXP_REPLACE(LOWER(ledger.referrer_host), '^www[.]', '')
    END AS referrer
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
visit_activity AS (
  SELECT
    page_views.visit_id,
    COUNT(*)::INTEGER AS page_views,
    SUM(page_views.active_seconds)::INTEGER AS active_seconds
  FROM site_page_views AS page_views
  INNER JOIN included_visits ON included_visits.visit_id = page_views.visit_id
  GROUP BY page_views.visit_id
),
visit_outcomes AS (
  SELECT visit_events.visit_id, TRUE AS has_enquiry
  FROM site_visit_events AS visit_events
  INNER JOIN included_visits ON included_visits.visit_id = visit_events.visit_id
  WHERE visit_events.event_type IN ('enquiry_sent', 'phone_link_clicked')
  GROUP BY visit_events.visit_id
),
referrer_rows AS (
  SELECT
    included_visits.referrer,
    COUNT(*)::INTEGER AS visits,
    COALESCE(SUM(visit_activity.page_views), 0)::INTEGER AS "pageViews",
    COALESCE(SUM(visit_activity.active_seconds), 0)::INTEGER AS "activeSeconds",
    COUNT(*) FILTER (WHERE visit_outcomes.has_enquiry)::INTEGER AS "enquiryVisits"
  FROM included_visits
  LEFT JOIN visit_activity ON visit_activity.visit_id = included_visits.visit_id
  LEFT JOIN visit_outcomes ON visit_outcomes.visit_id = included_visits.visit_id
  GROUP BY included_visits.referrer
)
SELECT
  referrer_rows.*,
  COALESCE((SELECT SUM(visits)::INTEGER FROM referrer_rows), 0) AS "totalVisits",
  COALESCE((SELECT SUM("pageViews")::INTEGER FROM referrer_rows), 0) AS "totalPageViews",
  COALESCE((SELECT SUM("activeSeconds")::INTEGER FROM referrer_rows), 0) AS "totalActiveSeconds",
  COALESCE((SELECT SUM("enquiryVisits")::INTEGER FROM referrer_rows), 0) AS "totalEnquiryVisits"
FROM (SELECT 1) AS report_row
LEFT JOIN referrer_rows ON TRUE
ORDER BY referrer_rows.visits DESC NULLS LAST, LOWER(referrer_rows.referrer) COLLATE "C" ASC;
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
  WHERE visit_events.event_type IN ('enquiry_sent', 'phone_link_clicked')
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

function jsonValue(value: unknown): unknown {
  return typeof value === "string" ? JSON.parse(value) : value;
}

function jsonArray(value: unknown, field: string): unknown[] {
  const values = jsonValue(value);
  if (!Array.isArray(values)) {
    throw new TypeError(`Analytics row has invalid ${field}.`);
  }
  return values;
}

function objectRow(value: unknown, field: string): AnalyticsRow {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }
  return value as AnalyticsRow;
}

function normalizeEvents(value: unknown) {
  return jsonArray(value, "events").map((event) => {
    const row = objectRow(event, "event");
    return {
      eventType: row.eventType,
      id: row.id,
      occurredAt: timestampString(row.occurredAt, "event time"),
      pageViewId: row.pageViewId ?? null,
      properties: jsonValue(row.properties),
      source: row.source,
    };
  });
}

function normalizePageViews(value: unknown) {
  return jsonArray(value, "page views").map((pageView) => {
    const row = objectRow(pageView, "page view");
    return {
      activeSeconds: nonNegativeInteger(row.activeSeconds, "page-view active time"),
      id: row.id,
      path: row.path,
      viewedAt: timestampString(row.viewedAt, "page-view time"),
    };
  });
}

function normalizeVisit(row: AnalyticsRow) {
  return {
    adCode: row.adCode ?? null,
    botCategory: row.botCategory ?? null,
    botName: row.botName ?? null,
    dateKey: row.dateKey,
    deviceType: row.deviceType,
    durationSeconds: nonNegativeInteger(row.durationSeconds, "duration"),
    events: normalizeEvents(row.events),
    gclid: row.gclid ?? null,
    id: row.id,
    isBot: row.isBot ?? null,
    isWebDriver: row.isWebDriver ?? null,
    landingPath: row.landingPath,
    lastSeenAt: timestampString(row.lastSeenAt, "last-seen time"),
    locationCountryCode: row.locationCountryCode ?? null,
    locationRegionCode: row.locationRegionCode ?? null,
    matchType: row.matchType ?? null,
    matchedKeyword: row.matchedKeyword ?? null,
    networkCode: row.networkCode ?? null,
    pageViews: normalizePageViews(row.pageViews),
    referrerHost: row.referrerHost ?? null,
    referrerUrl: row.referrerUrl ?? null,
    startedAt: timestampString(row.startedAt, "start time"),
    trafficSource: row.trafficSource,
    totalVisits: nonNegativeInteger(row.totalVisits, "total visits"),
    userAgent: row.userAgent ?? null,
    visitNumber: nonNegativeInteger(row.visitNumber, "visit number"),
    visitorId: row.visitorId,
  };
}

function validatedReport(report: unknown): AnalyticsReport {
  // Convert database representations above; keep domain rules in the shared contract.
  if (!isAnalyticsReport(report)) {
    throw new TypeError("Analytics query returned an invalid report.");
  }
  return report;
}

export async function readAnalytics(
  selection: AnalyticsSelection,
  database?: VisitDatabase,
): Promise<AnalyticsReport> {
  const selectedDatabase = resolveAnalyticsDatabase(database);

  if (selection.type === "referrers") {
    const rows = await selectedDatabase.query(referrersAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsRow[];
    const totals = rows[0] ?? {
      totalActiveSeconds: 0,
      totalEnquiryVisits: 0,
      totalPageViews: 0,
      totalVisits: 0,
    };
    const referrers = rows
      .filter((row) => row.referrer !== null && row.referrer !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "referrer active time"),
        enquiryVisits: nonNegativeInteger(row.enquiryVisits, "referrer enquiry visits"),
        referrer: row.referrer,
        pageViews: nonNegativeInteger(row.pageViews, "referrer page views"),
        visits: nonNegativeInteger(row.visits, "referrer visits"),
      }));

    return validatedReport({
      endDate: selection.endDate,
      referrers,
      startDate: selection.startDate,
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "total active time"),
      totalEnquiryVisits: nonNegativeInteger(totals.totalEnquiryVisits, "total enquiry visits"),
      totalPageViews: nonNegativeInteger(totals.totalPageViews, "total page views"),
      totalVisits: nonNegativeInteger(totals.totalVisits, "total visits"),
      type: "referrers",
    });
  }

  if (selection.type === "keywords") {
    const rows = await selectedDatabase.query(keywordAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsRow[];
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
        keyword: row.keyword,
        latestVisitAt: timestampString(row.latestVisitAt, "keyword latest visit time"),
        matchTypes: jsonValue(row.matchTypes),
        pageViews: nonNegativeInteger(row.pageViews, "keyword page views"),
        returningVisits: nonNegativeInteger(row.returningVisits, "keyword returning visits"),
        visits: nonNegativeInteger(row.visits, "keyword visits"),
      }));

    return validatedReport({
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
    });
  }

  if (selection.type === "pageViews") {
    const rows = await selectedDatabase.query(pageViewsAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsRow[];
    const totals = rows[0] ?? {
      totalActiveSeconds: 0,
      totalPageViews: 0,
      totalVisits: 0,
    };
    const routes = rows
      .filter((row) => row.path !== null && row.path !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "route active time"),
        pageViews: nonNegativeInteger(row.pageViews, "route page views"),
        path: row.path,
        visits: nonNegativeInteger(row.visits, "route visits"),
      }));

    return validatedReport({
      endDate: selection.endDate,
      routes,
      startDate: selection.startDate,
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "total active time"),
      totalPageViews: nonNegativeInteger(totals.totalPageViews, "total page views"),
      totalVisits: nonNegativeInteger(totals.totalVisits, "total visits"),
      type: "pageViews",
    });
  }

  switch (selection.type) {
    case "daily": {
      const rows = await selectedDatabase.query(dailyAnalyticsSql, [selection.date]) as AnalyticsRow[];
      return validatedReport({ type: "daily", date: selection.date, visits: rows.map(normalizeVisit) });
    }
    case "monthly": {
      const rows = await selectedDatabase.query(
        monthlyEnquiryAnalyticsSql,
        [selection.month],
      ) as AnalyticsRow[];
      return validatedReport({ type: "monthly", month: selection.month, visits: rows.map(normalizeVisit) });
    }
    case "visitor": {
      const rows = await selectedDatabase.query(
        visitorAnalyticsSql,
        [selection.visitorId],
      ) as AnalyticsRow[];
      return validatedReport({
        type: "visitor",
        visitorId: selection.visitorId,
        isExcluded: rows.length > 0 ? rows[0].isExcluded : false,
        visits: rows.map(normalizeVisit),
      });
    }
  }
}

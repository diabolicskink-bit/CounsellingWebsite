import { enquiryEventTypes } from "../../contracts/analyticsContract.ts";

// These literals come only from the shared reporting contract, never request input.
const enquiryEventTypesSql = enquiryEventTypes.map((type) => `'${type}'`).join(", ");

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
      ${enquiryEventTypesSql}, 'enquiry_failed'
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
WITH selected_visits AS (
  SELECT
    ledger.visit_id,
    ledger.traffic_source,
    REGEXP_REPLACE(LOWER(ledger.referrer_host), '^www[.]', '') AS referrer_host
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
included_visits AS (
  SELECT
    visit_id,
    CASE
      WHEN referrer_host IS NULL THEN 'No referrer recorded'
      WHEN referrer_host = 'vivecounselling.com.au' THEN 'Internal'
      WHEN referrer_host ~ '^google[.](com|[a-z]{2}|(com|co)[.][a-z]{2})$'
        THEN referrer_host || CASE
          WHEN traffic_source = 'paid' THEN ' (paid)'
          ELSE ' (organic)'
        END
      ELSE referrer_host
    END AS referrer
  FROM selected_visits
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
  WHERE visit_events.event_type IN (${enquiryEventTypesSql})
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
  WHERE visit_events.event_type IN (${enquiryEventTypesSql})
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

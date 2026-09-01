-- Newest-first working ledger. Increase or reduce the limit in Neon as needed.
SELECT
  ledger.started_at AT TIME ZONE 'Australia/Perth' AS started_at_awst,
  ledger.visitor_status,
  ledger.visit_number,
  ledger.previous_visit_started_at AT TIME ZONE 'Australia/Perth'
    AS previous_visit_started_at_awst,
  ROUND(ledger.days_since_previous_visit, 2) AS days_since_previous_visit,
  ledger.traffic_source,
  ledger.is_bot,
  ledger.bot_name,
  ledger.bot_category,
  visit_record.device_type,
  visit_record.is_webdriver,
  visit_record.user_agent,
  ledger.ad_code,
  ledger.network_code,
  ledger.matched_keyword,
  ledger.match_type,
  ledger.landing_path,
  ledger.referrer_host,
  ledger.page_view_count,
  ledger.visit_duration_seconds,
  ledger.visit_id,
  ledger.visitor_id,
  ledger.gclid,
  ledger.referrer_url
FROM visit_ledger AS ledger
JOIN site_visits AS visit_record ON visit_record.id = ledger.visit_id
WHERE NOT EXISTS (
  SELECT 1
  FROM analytics_excluded_visitors AS exclusions
  WHERE exclusions.visitor_id = ledger.visitor_id
)
ORDER BY ledger.started_at DESC, ledger.visit_id DESC
LIMIT 200;

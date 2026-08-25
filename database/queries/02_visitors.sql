-- One row per anonymous browser ID, including single-visit browsers.
SELECT
  ledger.visitor_id,
  COUNT(*)::INTEGER AS visit_count,
  MIN(ledger.started_at) AT TIME ZONE 'Australia/Perth' AS first_seen_at_awst,
  MAX(ledger.started_at) AT TIME ZONE 'Australia/Perth' AS latest_seen_at_awst,
  COUNT(*) FILTER (WHERE ledger.is_bot IS TRUE)::INTEGER AS bot_visit_count,
  COUNT(*) FILTER (WHERE ledger.is_bot IS NOT TRUE)::INTEGER AS unflagged_visit_count,
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT ledger.bot_name), NULL) AS verified_bot_names,
  COUNT(*) FILTER (WHERE visit_record.device_type = 'desktop')::INTEGER AS desktop_visit_count,
  COUNT(*) FILTER (WHERE visit_record.device_type = 'mobile')::INTEGER AS mobile_visit_count,
  COUNT(*) FILTER (WHERE visit_record.device_type = 'tablet')::INTEGER AS tablet_visit_count,
  COUNT(*) FILTER (WHERE visit_record.device_type = 'unknown')::INTEGER AS unknown_device_visit_count,
  COUNT(*) FILTER (WHERE visit_record.is_webdriver IS TRUE)::INTEGER AS webdriver_visit_count,
  COUNT(*) FILTER (WHERE visit_record.is_webdriver IS FALSE)::INTEGER AS webdriver_false_visit_count,
  COUNT(*) FILTER (WHERE visit_record.is_webdriver IS NULL)::INTEGER AS webdriver_unreported_visit_count,
  COUNT(*) FILTER (WHERE ledger.is_paid)::INTEGER AS paid_visit_count,
  SUM(ledger.page_view_count)::INTEGER AS total_page_view_count,
  ARRAY_AGG(ledger.visit_id ORDER BY ledger.started_at DESC, ledger.visit_id DESC) AS visit_ids
FROM visit_ledger AS ledger
JOIN site_visits AS visit_record ON visit_record.id = ledger.visit_id
WHERE NOT EXISTS (
  SELECT 1
  FROM analytics_excluded_visitors AS exclusions
  WHERE exclusions.visitor_id = ledger.visitor_id
)
GROUP BY ledger.visitor_id
ORDER BY MAX(ledger.started_at) DESC, ledger.visitor_id DESC
LIMIT 200;

-- One row per anonymous browser ID, including single-visit browsers.
SELECT
  ledger.visitor_id,
  COUNT(*)::INTEGER AS visit_count,
  MIN(ledger.started_at) AT TIME ZONE 'Australia/Perth' AS first_seen_at_awst,
  MAX(ledger.started_at) AT TIME ZONE 'Australia/Perth' AS latest_seen_at_awst,
  COUNT(*) FILTER (WHERE ledger.is_bot IS TRUE)::INTEGER AS bot_visit_count,
  COUNT(*) FILTER (WHERE ledger.is_bot IS NOT TRUE)::INTEGER AS unflagged_visit_count,
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT ledger.bot_name), NULL) AS verified_bot_names,
  COUNT(*) FILTER (WHERE ledger.is_paid)::INTEGER AS paid_visit_count,
  SUM(ledger.page_view_count)::INTEGER AS total_page_view_count,
  ARRAY_AGG(ledger.visit_id ORDER BY ledger.started_at DESC, ledger.visit_id DESC) AS visit_ids
FROM visit_ledger AS ledger
GROUP BY ledger.visitor_id
ORDER BY MAX(ledger.started_at) DESC, ledger.visitor_id DESC
LIMIT 200;

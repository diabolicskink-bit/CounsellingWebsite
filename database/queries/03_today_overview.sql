-- Today's totals use the practice's Australia/Perth calendar day.
WITH today AS (
  SELECT ledger.*
  FROM visit_ledger AS ledger
  WHERE ledger.started_at >= (
    (CURRENT_TIMESTAMP AT TIME ZONE 'Australia/Perth')::DATE::TIMESTAMP
      AT TIME ZONE 'Australia/Perth'
  )
)
SELECT
  COUNT(*)::INTEGER AS visit_count,
  COUNT(*) FILTER (WHERE today.is_bot IS TRUE)::INTEGER AS bot_visit_count,
  COUNT(*) FILTER (WHERE today.is_bot IS NOT TRUE)::INTEGER AS unflagged_visit_count,
  COUNT(*) FILTER (WHERE today.is_bot IS NULL)::INTEGER AS unclassified_visit_count,
  COUNT(DISTINCT today.visitor_id)::INTEGER AS browser_count,
  COUNT(*) FILTER (WHERE NOT today.is_returning AND today.is_bot IS NOT TRUE)::INTEGER AS new_visit_count,
  COUNT(*) FILTER (WHERE today.is_returning AND today.is_bot IS NOT TRUE)::INTEGER AS returning_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'paid' AND today.is_bot IS NOT TRUE)::INTEGER AS paid_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'referral' AND today.is_bot IS NOT TRUE)::INTEGER AS referral_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'internal' AND today.is_bot IS NOT TRUE)::INTEGER AS internal_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'direct' AND today.is_bot IS NOT TRUE)::INTEGER AS direct_visit_count,
  COALESCE(SUM(today.page_view_count) FILTER (WHERE today.is_bot IS NOT TRUE), 0)::INTEGER AS page_view_count
FROM today;

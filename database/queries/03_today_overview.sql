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
  COUNT(DISTINCT today.visitor_id)::INTEGER AS browser_count,
  COUNT(*) FILTER (WHERE NOT today.is_returning)::INTEGER AS new_visit_count,
  COUNT(*) FILTER (WHERE today.is_returning)::INTEGER AS returning_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'paid')::INTEGER AS paid_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'referral')::INTEGER AS referral_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'internal')::INTEGER AS internal_visit_count,
  COUNT(*) FILTER (WHERE today.traffic_source = 'direct')::INTEGER AS direct_visit_count,
  COALESCE(SUM(today.page_view_count), 0)::INTEGER AS page_view_count
FROM today;

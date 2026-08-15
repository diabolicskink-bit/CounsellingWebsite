-- Daily source and ad breakdown for the latest 30 Australia/Perth calendar days.
WITH recent_visits AS (
  SELECT ledger.*
  FROM visit_ledger AS ledger
  WHERE ledger.started_at >= (
    ((CURRENT_TIMESTAMP AT TIME ZONE 'Australia/Perth')::DATE - 29)::TIMESTAMP
      AT TIME ZONE 'Australia/Perth'
  )
)
SELECT
  (recent_visits.started_at AT TIME ZONE 'Australia/Perth')::DATE AS visit_date_awst,
  recent_visits.traffic_source,
  recent_visits.referrer_host,
  recent_visits.ad_code,
  recent_visits.network_code,
  recent_visits.matched_keyword,
  recent_visits.match_type,
  COUNT(*)::INTEGER AS visit_count,
  COUNT(DISTINCT recent_visits.visitor_id)::INTEGER AS browser_count,
  COUNT(*) FILTER (WHERE recent_visits.is_returning)::INTEGER AS returning_visit_count,
  SUM(recent_visits.page_view_count)::INTEGER AS page_view_count
FROM recent_visits
WHERE recent_visits.is_bot IS NOT TRUE
GROUP BY
  visit_date_awst,
  recent_visits.traffic_source,
  recent_visits.referrer_host,
  recent_visits.ad_code,
  recent_visits.network_code,
  recent_visits.matched_keyword,
  recent_visits.match_type
ORDER BY
  visit_date_awst DESC,
  visit_count DESC,
  recent_visits.traffic_source,
  recent_visits.ad_code,
  recent_visits.referrer_host;

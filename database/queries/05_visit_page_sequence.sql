-- Replace the zero UUID with a visit_id copied from the newest-first ledger.
WITH selected_visit AS (
  SELECT '00000000-0000-0000-0000-000000000000'::UUID AS visit_id
)
SELECT
  ledger.started_at AT TIME ZONE 'Australia/Perth' AS visit_started_at_awst,
  ledger.visitor_status,
  ledger.visitor_id,
  ledger.is_bot,
  ledger.bot_name,
  ledger.bot_category,
  visit_record.device_type,
  visit_record.is_webdriver,
  visit_record.user_agent,
  page_views.visit_id,
  ROW_NUMBER() OVER (
    PARTITION BY page_views.visit_id
    ORDER BY page_views.viewed_at, page_views.id
  ) AS page_number,
  page_views.viewed_at AT TIME ZONE 'Australia/Perth' AS viewed_at_awst,
  page_views.path
FROM selected_visit
JOIN visit_ledger AS ledger ON ledger.visit_id = selected_visit.visit_id
JOIN site_visits AS visit_record ON visit_record.id = ledger.visit_id
JOIN site_page_views AS page_views ON page_views.visit_id = ledger.visit_id
ORDER BY page_views.viewed_at, page_views.id;

BEGIN;

ALTER TABLE site_visits
  ADD COLUMN is_bot BOOLEAN,
  ADD COLUMN bot_name TEXT,
  ADD COLUMN bot_category TEXT,
  ADD CONSTRAINT site_visits_bot_name CHECK (
    bot_name IS NULL
    OR (
      is_bot IS TRUE
      AND char_length(bot_name) BETWEEN 1 AND 128
    )
  ),
  ADD CONSTRAINT site_visits_bot_category CHECK (
    bot_category IS NULL
    OR (
      is_bot IS TRUE
      AND char_length(bot_category) BETWEEN 1 AND 128
    )
  );

CREATE OR REPLACE VIEW visit_ledger
WITH (security_invoker = true)
AS
WITH ordered_visits AS (
  SELECT
    visits.*,
    ROW_NUMBER() OVER (
      PARTITION BY visits.visitor_id
      ORDER BY visits.started_at, visits.id
    ) AS visit_number,
    LAG(visits.started_at) OVER (
      PARTITION BY visits.visitor_id
      ORDER BY visits.started_at, visits.id
    ) AS previous_visit_started_at
  FROM site_visits AS visits
),
page_totals AS (
  SELECT
    page_views.visit_id,
    COUNT(*)::INTEGER AS page_view_count,
    MIN(page_views.viewed_at) AS first_page_view_at,
    MAX(page_views.viewed_at) AS latest_page_view_at
  FROM site_page_views AS page_views
  GROUP BY page_views.visit_id
)
SELECT
  ordered_visits.id AS visit_id,
  ordered_visits.visitor_id,
  ordered_visits.visit_number,
  ordered_visits.visit_number > 1 AS is_returning,
  CASE
    WHEN ordered_visits.visit_number > 1 THEN 'returning'
    ELSE 'new'
  END AS visitor_status,
  ordered_visits.previous_visit_started_at,
  CASE
    WHEN ordered_visits.previous_visit_started_at IS NULL THEN NULL
    ELSE EXTRACT(
      EPOCH FROM ordered_visits.started_at - ordered_visits.previous_visit_started_at
    ) / 86400
  END AS days_since_previous_visit,
  ordered_visits.started_at,
  ordered_visits.last_seen_at,
  GREATEST(
    0,
    EXTRACT(EPOCH FROM ordered_visits.last_seen_at - ordered_visits.started_at)
  )::BIGINT AS visit_duration_seconds,
  ordered_visits.landing_path,
  ordered_visits.referrer_url,
  ordered_visits.referrer_host,
  CASE
    WHEN ordered_visits.gclid IS NOT NULL
      OR ordered_visits.ad_code IS NOT NULL
      OR ordered_visits.network_code IS NOT NULL
      OR ordered_visits.matched_keyword IS NOT NULL
      OR ordered_visits.match_type IS NOT NULL
      THEN 'paid'
    WHEN ordered_visits.referrer_host IN (
      'vivecounselling.com.au',
      'www.vivecounselling.com.au'
    ) THEN 'internal'
    WHEN ordered_visits.referrer_host IS NOT NULL THEN 'referral'
    ELSE 'direct'
  END AS traffic_source,
  ordered_visits.gclid IS NOT NULL
    OR ordered_visits.ad_code IS NOT NULL
    OR ordered_visits.network_code IS NOT NULL
    OR ordered_visits.matched_keyword IS NOT NULL
    OR ordered_visits.match_type IS NOT NULL AS is_paid,
  ordered_visits.gclid,
  ordered_visits.ad_code,
  ordered_visits.network_code,
  ordered_visits.matched_keyword,
  ordered_visits.match_type,
  COALESCE(page_totals.page_view_count, 0) AS page_view_count,
  page_totals.first_page_view_at,
  page_totals.latest_page_view_at,
  ordered_visits.is_bot,
  ordered_visits.bot_name,
  ordered_visits.bot_category
FROM ordered_visits
LEFT JOIN page_totals ON page_totals.visit_id = ordered_visits.id;

COMMENT ON COLUMN site_visits.is_bot IS
  'BotID Basic verdict for this visit; null when the visit predates classification or the check was unavailable.';
COMMENT ON COLUMN site_visits.bot_name IS
  'Vercel verified-bot identifier when BotID recognizes the bot.';
COMMENT ON COLUMN site_visits.bot_category IS
  'Vercel verified-bot category when BotID recognizes the bot.';
COMMENT ON COLUMN visit_ledger.is_bot IS
  'True for BotID-classified bots, false for non-bots, and null when unclassified.';

COMMIT;

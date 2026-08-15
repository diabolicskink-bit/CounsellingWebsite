BEGIN;

CREATE TABLE site_visits (
  id UUID PRIMARY KEY,
  visitor_id UUID NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  landing_path TEXT NOT NULL,
  referrer_url TEXT,
  referrer_host TEXT,
  gclid TEXT,
  ad_code TEXT,
  network_code TEXT,
  matched_keyword TEXT,
  match_type TEXT,
  CONSTRAINT site_visits_activity_order CHECK (last_seen_at >= started_at),
  CONSTRAINT site_visits_landing_path CHECK (
    char_length(landing_path) BETWEEN 1 AND 2048
    AND left(landing_path, 1) = '/'
    AND position('?' IN landing_path) = 0
    AND position('#' IN landing_path) = 0
  ),
  CONSTRAINT site_visits_referrer_url CHECK (
    referrer_url IS NULL
    OR (
      char_length(referrer_url) BETWEEN 1 AND 4096
      AND referrer_url ~* '^https?://'
    )
  ),
  CONSTRAINT site_visits_referrer_host CHECK (
    referrer_host IS NULL
    OR char_length(referrer_host) BETWEEN 1 AND 253
  ),
  CONSTRAINT site_visits_gclid CHECK (
    gclid IS NULL OR char_length(gclid) BETWEEN 1 AND 2048
  ),
  CONSTRAINT site_visits_ad_code CHECK (
    ad_code IS NULL OR char_length(ad_code) BETWEEN 1 AND 128
  ),
  CONSTRAINT site_visits_network_code CHECK (
    network_code IS NULL OR char_length(network_code) BETWEEN 1 AND 32
  ),
  CONSTRAINT site_visits_matched_keyword CHECK (
    matched_keyword IS NULL OR char_length(matched_keyword) BETWEEN 1 AND 1024
  ),
  CONSTRAINT site_visits_match_type CHECK (
    match_type IS NULL OR char_length(match_type) BETWEEN 1 AND 32
  )
);

CREATE TABLE site_page_views (
  id UUID PRIMARY KEY,
  visit_id UUID NOT NULL REFERENCES site_visits(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  path TEXT NOT NULL,
  CONSTRAINT site_page_views_path CHECK (
    char_length(path) BETWEEN 1 AND 2048
    AND left(path, 1) = '/'
    AND position('?' IN path) = 0
    AND position('#' IN path) = 0
  )
);

CREATE INDEX site_visits_started_at_idx
  ON site_visits (started_at DESC);

CREATE INDEX site_visits_visitor_started_at_idx
  ON site_visits (visitor_id, started_at DESC);

CREATE INDEX site_visits_gclid_idx
  ON site_visits (gclid)
  WHERE gclid IS NOT NULL;

CREATE INDEX site_page_views_visit_viewed_at_idx
  ON site_page_views (visit_id, viewed_at, id);

COMMENT ON TABLE site_visits IS
  'Anonymous browser visits recorded by Vive first-party analytics.';
COMMENT ON COLUMN site_visits.visitor_id IS
  'Random first-party browser identifier; identifies a browser profile, not a known person.';
COMMENT ON COLUMN site_visits.referrer_url IS
  'Full initial document.referrer value as supplied by the browser after server validation.';
COMMENT ON COLUMN site_visits.matched_keyword IS
  'Google Ads matched keyword value when supplied; not necessarily the visitor search query.';
COMMENT ON TABLE site_page_views IS
  'Public site routes viewed within an anonymous browser visit.';

COMMIT;

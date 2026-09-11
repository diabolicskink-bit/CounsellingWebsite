BEGIN;

ALTER TABLE site_visits
  ADD COLUMN user_agent TEXT,
  ADD COLUMN device_type TEXT NOT NULL DEFAULT 'unknown',
  ADD COLUMN is_webdriver BOOLEAN,
  ADD CONSTRAINT site_visits_user_agent CHECK (
    user_agent IS NULL
    OR (
      char_length(user_agent) BETWEEN 1 AND 1024
      AND user_agent !~ '[[:cntrl:]]'
    )
  ),
  ADD CONSTRAINT site_visits_device_type CHECK (
    device_type IN ('desktop', 'mobile', 'tablet', 'unknown')
  );

COMMENT ON COLUMN site_visits.user_agent IS
  'Initial User-Agent request header for this visit, bounded to 1024 characters.';
COMMENT ON COLUMN site_visits.device_type IS
  'Server-derived desktop, mobile, tablet, or unknown classification for this visit.';
COMMENT ON COLUMN site_visits.is_webdriver IS
  'Initial browser navigator.webdriver value; null when the client did not report it.';

COMMIT;

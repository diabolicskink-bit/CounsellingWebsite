BEGIN;

ALTER TABLE site_page_views
  ADD COLUMN active_seconds INTEGER NOT NULL DEFAULT 0,
  ADD CONSTRAINT site_page_views_active_seconds_range
    CHECK (active_seconds BETWEEN 0 AND 43200);

COMMENT ON COLUMN site_page_views.active_seconds IS
  'Cumulative seconds the page was visible, capped at 12 hours.';

COMMIT;

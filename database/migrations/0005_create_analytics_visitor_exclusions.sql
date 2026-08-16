BEGIN;

CREATE TABLE analytics_excluded_visitors (
  visitor_id UUID PRIMARY KEY,
  excluded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX analytics_excluded_visitors_excluded_at_idx
  ON analytics_excluded_visitors (excluded_at DESC, visitor_id);

COMMENT ON TABLE analytics_excluded_visitors IS
  'Anonymous visitor identifiers manually excluded from private analytics reports.';
COMMENT ON COLUMN analytics_excluded_visitors.visitor_id IS
  'Random first-party visitor identifier whose retained and future visits are excluded from aggregate reports.';
COMMENT ON COLUMN analytics_excluded_visitors.excluded_at IS
  'Time this visitor identifier was first excluded from reports.';

COMMIT;

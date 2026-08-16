BEGIN;

ALTER TABLE site_page_views
  ADD CONSTRAINT site_page_views_id_visit_id_key UNIQUE (id, visit_id);

CREATE TABLE site_visit_events (
  id UUID PRIMARY KEY,
  visit_id UUID NOT NULL REFERENCES site_visits(id) ON DELETE CASCADE,
  page_view_id UUID,
  event_type TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  source TEXT NOT NULL,
  properties JSONB NOT NULL DEFAULT '{}'::JSONB,
  CONSTRAINT site_visit_events_page_view_ownership
    FOREIGN KEY (page_view_id, visit_id)
    REFERENCES site_page_views(id, visit_id)
    ON DELETE CASCADE,
  CONSTRAINT site_visit_events_type CHECK (
    event_type IN (
      'contact_option_selected',
      'enquiry_started',
      'enquiry_submit_attempted',
      'enquiry_sent',
      'enquiry_failed'
    )
  ),
  CONSTRAINT site_visit_events_source CHECK (
    source IN ('client', 'server')
  ),
  CONSTRAINT site_visit_events_source_type CHECK (
    source = 'server'
    OR event_type IN ('contact_option_selected', 'enquiry_started')
  ),
  CONSTRAINT site_visit_events_properties_object CHECK (
    jsonb_typeof(properties) = 'object'
  ),
  CONSTRAINT site_visit_events_properties CHECK (
    CASE event_type
      WHEN 'contact_option_selected' THEN
        properties = JSONB_BUILD_OBJECT('option', properties->>'option')
        AND properties->>'option' IN ('appointment', 'consult', 'question')
      WHEN 'enquiry_failed' THEN
        properties = JSONB_BUILD_OBJECT('reason', properties->>'reason')
        AND properties->>'reason' IN (
          'configuration',
          'email_provider',
          'network',
          'server'
        )
      ELSE properties = '{}'::JSONB
    END
  )
);

CREATE INDEX site_visit_events_visit_occurred_at_idx
  ON site_visit_events (visit_id, occurred_at, id);

CREATE INDEX site_visit_events_type_occurred_at_idx
  ON site_visit_events (event_type, occurred_at DESC);

COMMENT ON TABLE site_visit_events IS
  'Controlled first-party interaction events associated with anonymous site visits.';
COMMENT ON COLUMN site_visit_events.occurred_at IS
  'Server receipt time for the event; client-provided timestamps are not accepted.';
COMMENT ON COLUMN site_visit_events.properties IS
  'Event-specific properties constrained by event type; not an arbitrary metadata payload.';

COMMIT;

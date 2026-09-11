BEGIN;

ALTER TABLE site_visit_events
  DROP CONSTRAINT site_visit_events_type,
  DROP CONSTRAINT site_visit_events_source_type,
  DROP CONSTRAINT site_visit_events_properties;

ALTER TABLE site_visit_events
  ADD CONSTRAINT site_visit_events_type CHECK (
    event_type IN (
      'contact_option_selected',
      'email_link_clicked',
      'enquiry_started',
      'enquiry_submit_attempted',
      'enquiry_sent',
      'enquiry_failed',
      'instagram_link_clicked',
      'linkedin_link_clicked'
    )
  ),
  ADD CONSTRAINT site_visit_events_source_type CHECK (
    source = 'server'
    OR event_type IN (
      'contact_option_selected',
      'email_link_clicked',
      'enquiry_started',
      'instagram_link_clicked',
      'linkedin_link_clicked'
    )
  ),
  ADD CONSTRAINT site_visit_events_properties CHECK (
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
  );

COMMIT;

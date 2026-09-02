BEGIN;

ALTER TABLE site_visits
  ADD COLUMN location_country_code TEXT,
  ADD COLUMN location_region_code TEXT,
  ADD CONSTRAINT site_visits_location CHECK (
    (
      location_country_code IS NULL
      AND location_region_code IS NULL
    )
    OR (
      location_country_code = 'AU'
      AND location_region_code IN ('ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA')
    )
    OR (
      location_country_code <> 'AU'
      AND location_country_code ~ '^[A-Z]{2}$'
      AND location_region_code IS NULL
    )
  );

COMMENT ON COLUMN site_visits.location_country_code IS
  'Vercel IP-derived country code; AU is retained only with a valid state or territory code.';
COMMENT ON COLUMN site_visits.location_region_code IS
  'Vercel IP-derived Australian state or territory code; null for overseas and unknown locations.';

COMMIT;

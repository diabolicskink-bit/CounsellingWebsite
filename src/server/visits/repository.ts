import {
  neon,
  type NeonQueryFunction,
} from "@neondatabase/serverless";
import type { VisitRequestEnvironment } from "../../data/visitClientEnvironment.ts";

export type VisitBotClassification = {
  botCategory: string | null;
  botName: string | null;
  isBot: boolean | null;
};

export type VisitObservationPayload = {
  adCode: string | null;
  gclid: string | null;
  isWebDriver: boolean | null;
  landingPath: string;
  matchType: string | null;
  matchedKeyword: string | null;
  networkCode: string | null;
  pageViewId: string;
  path: string;
  referrerHost: string | null;
  referrerUrl: string | null;
  visitId: string;
  visitorId: string;
};

export type VisitObservation = VisitObservationPayload
  & VisitBotClassification
  & VisitRequestEnvironment;

export type VisitObservationResult = {
  pageViewInserted: boolean;
};

export type VisitDatabase = Pick<NeonQueryFunction<false, false>, "query">;

type VisitObservationRow = {
  pageViewInserted: boolean;
  pageViewMatched: boolean;
  visitInserted: boolean;
  visitMatched: boolean;
};

export class VisitDatabaseConfigurationError extends Error {
  constructor() {
    super("Visit database configuration is missing.");
    this.name = "VisitDatabaseConfigurationError";
  }
}

export class VisitIdentityConflictError extends Error {
  constructor() {
    super("The visit ID is already associated with another anonymous visitor.");
    this.name = "VisitIdentityConflictError";
  }
}

export class PageViewIdentityConflictError extends Error {
  constructor() {
    super("The page-view ID is already associated with a different page-view observation.");
    this.name = "PageViewIdentityConflictError";
  }
}

let cachedDatabase: VisitDatabase | undefined;
let cachedDatabaseUrl: string | undefined;

export function getVisitDatabase(): VisitDatabase {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new VisitDatabaseConfigurationError();
  }

  if (!cachedDatabase || cachedDatabaseUrl !== databaseUrl) {
    cachedDatabase = neon(databaseUrl);
    cachedDatabaseUrl = databaseUrl;
  }

  return cachedDatabase;
}

export const recordVisitObservationSql = `
WITH observation AS (
  SELECT
    CURRENT_TIMESTAMP AS recorded_at,
    $1::UUID AS visitor_id,
    $2::UUID AS visit_id,
    $3::UUID AS page_view_id,
    $4::TEXT AS landing_path,
    $5::TEXT AS path,
    $6::TEXT AS referrer_url,
    $7::TEXT AS referrer_host,
    $8::TEXT AS gclid,
    $9::TEXT AS ad_code,
    $10::TEXT AS network_code,
    $11::TEXT AS matched_keyword,
    $12::TEXT AS match_type,
    $13::BOOLEAN AS is_bot,
    $14::TEXT AS bot_name,
    $15::TEXT AS bot_category,
    $16::TEXT AS user_agent,
    $17::TEXT AS device_type,
    $18::BOOLEAN AS is_webdriver,
    $19::TEXT AS location_country_code,
    $20::TEXT AS location_region_code
),
inserted_visit AS (
  INSERT INTO site_visits (
    id,
    visitor_id,
    started_at,
    last_seen_at,
    landing_path,
    referrer_url,
    referrer_host,
    gclid,
    ad_code,
    network_code,
    matched_keyword,
    match_type,
    is_bot,
    bot_name,
    bot_category,
    user_agent,
    device_type,
    is_webdriver,
    location_country_code,
    location_region_code
  )
  SELECT
    observation.visit_id,
    observation.visitor_id,
    observation.recorded_at,
    observation.recorded_at,
    observation.landing_path,
    observation.referrer_url,
    observation.referrer_host,
    observation.gclid,
    observation.ad_code,
    observation.network_code,
    observation.matched_keyword,
    observation.match_type,
    observation.is_bot,
    observation.bot_name,
    observation.bot_category,
    observation.user_agent,
    observation.device_type,
    observation.is_webdriver,
    observation.location_country_code,
    observation.location_region_code
  FROM observation
  ON CONFLICT (id) DO NOTHING
  RETURNING id
),
matched_visit AS (
  SELECT inserted_visit.id
  FROM inserted_visit
  UNION
  SELECT visits.id
  FROM site_visits AS visits
  CROSS JOIN observation
  WHERE visits.id = observation.visit_id
    AND visits.visitor_id = observation.visitor_id
),
inserted_page_view AS (
  INSERT INTO site_page_views (id, visit_id, viewed_at, path)
  SELECT
    observation.page_view_id,
    matched_visit.id,
    observation.recorded_at,
    observation.path
  FROM matched_visit
  CROSS JOIN observation
  ON CONFLICT (id) DO NOTHING
  RETURNING id, visit_id, viewed_at
),
matched_page_view AS (
  SELECT inserted_page_view.id
  FROM inserted_page_view
  UNION
  SELECT page_views.id
  FROM site_page_views AS page_views
  CROSS JOIN observation
  WHERE page_views.id = observation.page_view_id
    AND page_views.visit_id = observation.visit_id
    AND page_views.path = observation.path
),
updated_existing_visit AS (
  UPDATE site_visits
  SET
    last_seen_at = CASE
      WHEN inserted_page_view.viewed_at IS NULL THEN site_visits.last_seen_at
      ELSE GREATEST(site_visits.last_seen_at, inserted_page_view.viewed_at)
    END,
    is_bot = CASE
      WHEN site_visits.is_bot IS TRUE OR observation.is_bot IS TRUE THEN TRUE
      WHEN site_visits.is_bot IS FALSE OR observation.is_bot IS FALSE THEN FALSE
      ELSE NULL
    END,
    bot_name = COALESCE(site_visits.bot_name, observation.bot_name),
    bot_category = COALESCE(site_visits.bot_category, observation.bot_category)
  FROM matched_visit
  CROSS JOIN observation
  LEFT JOIN inserted_page_view ON inserted_page_view.visit_id = matched_visit.id
  WHERE site_visits.id = matched_visit.id
    AND NOT EXISTS (
      SELECT 1
      FROM inserted_visit
      WHERE inserted_visit.id = matched_visit.id
    )
  RETURNING site_visits.id
)
SELECT
  EXISTS (SELECT 1 FROM inserted_visit) AS "visitInserted",
  (
    EXISTS (SELECT 1 FROM inserted_visit)
    OR EXISTS (SELECT 1 FROM updated_existing_visit)
  ) AS "visitMatched",
  EXISTS (SELECT 1 FROM matched_page_view) AS "pageViewMatched",
  EXISTS (SELECT 1 FROM inserted_page_view) AS "pageViewInserted";
`;

export const deleteEmptyVisitSql = `
DELETE FROM site_visits AS visits
WHERE visits.id = $2::UUID
  AND visits.visitor_id = $1::UUID
  AND NOT EXISTS (
    SELECT 1
    FROM site_page_views AS page_views
    WHERE page_views.visit_id = visits.id
  );
`;

export async function recordVisitObservation(
  observation: VisitObservation,
  database: VisitDatabase = getVisitDatabase(),
): Promise<VisitObservationResult> {
  const queryParameters = [
    observation.visitorId,
    observation.visitId,
    observation.pageViewId,
    observation.landingPath,
    observation.path,
    observation.referrerUrl,
    observation.referrerHost,
    observation.gclid,
    observation.adCode,
    observation.networkCode,
    observation.matchedKeyword,
    observation.matchType,
    observation.isBot,
    observation.botName,
    observation.botCategory,
    observation.userAgent,
    observation.deviceType,
    observation.isWebDriver,
    observation.locationCountryCode,
    observation.locationRegionCode,
  ];
  const executeObservationWrite = async () => {
    const rows = (await database.query(
      recordVisitObservationSql,
      queryParameters,
    )) as VisitObservationRow[];

    return rows[0];
  };
  const initialResult = await executeObservationWrite();
  // A concurrent insert may not become visible until the next statement snapshot.
  const shouldRetry = !initialResult?.visitMatched || !initialResult.pageViewMatched;
  const finalResult = shouldRetry ? await executeObservationWrite() : initialResult;
  const visitWasInserted = Boolean(initialResult?.visitInserted || finalResult?.visitInserted);

  if (!finalResult?.visitMatched) {
    throw new VisitIdentityConflictError();
  }

  if (!finalResult.pageViewMatched) {
    if (visitWasInserted) {
      await database.query(deleteEmptyVisitSql, [
        observation.visitorId,
        observation.visitId,
      ]);
    }

    throw new PageViewIdentityConflictError();
  }

  return { pageViewInserted: finalResult.pageViewInserted };
}

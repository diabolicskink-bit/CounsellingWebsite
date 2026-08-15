import {
  neon,
  type NeonQueryFunction,
} from "@neondatabase/serverless";

export type VisitBotClassification = {
  botCategory: string | null;
  botName: string | null;
  isBot: boolean | null;
};

export type VisitObservationPayload = {
  adCode: string | null;
  gclid: string | null;
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

export type VisitObservation = VisitObservationPayload & VisitBotClassification;

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
    super("The page-view ID is already associated with another visit.");
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
WITH observation_time AS (
  SELECT CURRENT_TIMESTAMP AS recorded_at
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
    bot_category
  )
  SELECT
    $2::uuid,
    $1::uuid,
    observation_time.recorded_at,
    observation_time.recorded_at,
    $4,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13::BOOLEAN,
    $14,
    $15
  FROM observation_time
  ON CONFLICT (id) DO NOTHING
  RETURNING id
),
matched_visit AS (
  SELECT id FROM inserted_visit
  UNION
  SELECT id
  FROM site_visits
  WHERE id = $2::uuid AND visitor_id = $1::uuid
),
classified_visit AS (
  UPDATE site_visits
  SET
    is_bot = CASE
      WHEN site_visits.is_bot IS TRUE OR $13::BOOLEAN IS TRUE THEN TRUE
      WHEN site_visits.is_bot IS FALSE OR $13::BOOLEAN IS FALSE THEN FALSE
      ELSE NULL
    END,
    bot_name = COALESCE(site_visits.bot_name, $14),
    bot_category = COALESCE(site_visits.bot_category, $15)
  FROM matched_visit
  WHERE site_visits.id = matched_visit.id
  RETURNING site_visits.id
),
inserted_page_view AS (
  INSERT INTO site_page_views (id, visit_id, viewed_at, path)
  SELECT
    $3::uuid,
    classified_visit.id,
    observation_time.recorded_at,
    $5
  FROM classified_visit
  CROSS JOIN observation_time
  ON CONFLICT (id) DO NOTHING
  RETURNING id, visit_id, viewed_at
),
matched_page_view AS (
  SELECT id FROM inserted_page_view
  UNION
  SELECT id
  FROM site_page_views
  WHERE id = $3::uuid AND visit_id = $2::uuid
),
updated_visit AS (
  UPDATE site_visits
  SET last_seen_at = GREATEST(site_visits.last_seen_at, inserted_page_view.viewed_at)
  FROM inserted_page_view
  WHERE site_visits.id = inserted_page_view.visit_id
    AND NOT EXISTS (
      SELECT 1
      FROM inserted_visit
      WHERE inserted_visit.id = inserted_page_view.visit_id
    )
  RETURNING site_visits.id
)
SELECT
  EXISTS (SELECT 1 FROM inserted_visit) AS "visitInserted",
  EXISTS (SELECT 1 FROM matched_visit) AS "visitMatched",
  EXISTS (SELECT 1 FROM matched_page_view) AS "pageViewMatched",
  EXISTS (SELECT 1 FROM inserted_page_view) AS "pageViewInserted",
  EXISTS (SELECT 1 FROM updated_visit) AS "visitActivityUpdated";
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
  const parameters = [
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
  ];
  const readResult = async () => {
    const rows = (await database.query(
      recordVisitObservationSql,
      parameters,
    )) as VisitObservationRow[];

    return rows[0];
  };
  const firstResult = await readResult();
  const shouldRetry = !firstResult?.visitMatched || !firstResult.pageViewMatched;
  const result = shouldRetry ? await readResult() : firstResult;
  const insertedVisit = Boolean(firstResult?.visitInserted || result?.visitInserted);

  if (!result?.visitMatched) {
    throw new VisitIdentityConflictError();
  }

  if (!result.pageViewMatched) {
    if (insertedVisit) {
      await database.query(deleteEmptyVisitSql, [
        observation.visitorId,
        observation.visitId,
      ]);
    }

    throw new PageViewIdentityConflictError();
  }

  return { pageViewInserted: result.pageViewInserted };
}

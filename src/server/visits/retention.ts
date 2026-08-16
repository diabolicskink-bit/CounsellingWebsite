import {
  getVisitDatabase,
  type VisitDatabase,
} from "./repository.ts";

export type VisitRetentionCleanupResult = {
  exclusionsDeleted: number;
  pageViewsDeleted: number;
  visitsDeleted: number;
};

type VisitRetentionCleanupRow = {
  exclusionsDeleted: number | string;
  pageViewsDeleted: number | string;
  visitsDeleted: number | string;
};

export const deleteExpiredVisitDataSql = `
WITH cutoff AS (
  SELECT CURRENT_TIMESTAMP - INTERVAL '12 months' AS expires_before
),
expired_visits AS MATERIALIZED (
  SELECT visits.id
  FROM site_visits AS visits
  CROSS JOIN cutoff
  WHERE visits.started_at < cutoff.expires_before
),
expired_page_views AS MATERIALIZED (
  SELECT COUNT(*)::INTEGER AS page_views_deleted
  FROM site_page_views AS page_views
  WHERE page_views.visit_id IN (SELECT id FROM expired_visits)
),
deleted_visits AS (
  DELETE FROM site_visits AS visits
  USING expired_visits
  WHERE visits.id = expired_visits.id
  RETURNING visits.id
),
deleted_exclusions AS (
  DELETE FROM analytics_excluded_visitors AS exclusions
  WHERE NOT EXISTS (
    SELECT 1
    FROM site_visits AS visits
    WHERE visits.visitor_id = exclusions.visitor_id
      AND visits.id NOT IN (SELECT id FROM expired_visits)
  )
  RETURNING exclusions.visitor_id
)
SELECT
  (SELECT COUNT(*)::INTEGER FROM deleted_exclusions) AS "exclusionsDeleted",
  (SELECT COUNT(*)::INTEGER FROM deleted_visits) AS "visitsDeleted",
  (SELECT page_views_deleted FROM expired_page_views) AS "pageViewsDeleted";
`;

function getDeletedCount(value: number | string | undefined) {
  const count = Number(value);

  if (!Number.isSafeInteger(count) || count < 0) {
    throw new Error("Visit retention cleanup returned an invalid deletion count.");
  }

  return count;
}

export async function deleteExpiredVisitData(
  database: VisitDatabase = getVisitDatabase(),
): Promise<VisitRetentionCleanupResult> {
  const rows = (await database.query(deleteExpiredVisitDataSql, [])) as VisitRetentionCleanupRow[];
  const [result] = rows;

  return {
    exclusionsDeleted: getDeletedCount(result?.exclusionsDeleted),
    pageViewsDeleted: getDeletedCount(result?.pageViewsDeleted),
    visitsDeleted: getDeletedCount(result?.visitsDeleted),
  };
}

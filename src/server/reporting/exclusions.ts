import type {
  ExcludedVisitorSummary,
  ExcludedVisitorsReport,
} from "../../data/analyticsContract.ts";
import {
  getVisitDatabase,
  VisitDatabaseConfigurationError,
  type VisitDatabase,
} from "../visits/repository.ts";
import { AnalyticsDataUnavailableError } from "./reader.ts";

type ExcludedVisitorRow = Record<string, unknown>;

type VisitorExclusionUpdateRow = {
  isExcluded: boolean;
  visitorExists: boolean;
};

export class UnknownAnalyticsVisitorError extends Error {
  constructor() {
    super("The analytics visitor does not exist.");
    this.name = "UnknownAnalyticsVisitorError";
  }
}

export const listExcludedVisitorsSql = `
SELECT
  exclusions.visitor_id::TEXT AS "visitorId",
  exclusions.excluded_at AS "excludedAt",
  MIN(visits.started_at) AS "firstSeenAt",
  MAX(visits.last_seen_at) AS "latestSeenAt",
  COUNT(*)::INTEGER AS "totalVisits"
FROM analytics_excluded_visitors AS exclusions
JOIN site_visits AS visits ON visits.visitor_id = exclusions.visitor_id
GROUP BY exclusions.visitor_id, exclusions.excluded_at
ORDER BY exclusions.excluded_at DESC, exclusions.visitor_id DESC;
`;

export const setVisitorExclusionSql = `
WITH known_visitor AS MATERIALIZED (
  SELECT EXISTS (
    SELECT 1
    FROM site_visits AS visits
    WHERE visits.visitor_id = $1::UUID
  ) AS visitor_exists
),
inserted_exclusion AS (
  INSERT INTO analytics_excluded_visitors (visitor_id)
  SELECT $1::UUID
  FROM known_visitor
  WHERE known_visitor.visitor_exists AND $2::BOOLEAN
  ON CONFLICT (visitor_id) DO NOTHING
  RETURNING visitor_id
),
deleted_exclusion AS (
  DELETE FROM analytics_excluded_visitors AS exclusions
  USING known_visitor
  WHERE exclusions.visitor_id = $1::UUID
    AND known_visitor.visitor_exists
    AND NOT $2::BOOLEAN
  RETURNING exclusions.visitor_id
)
SELECT
  known_visitor.visitor_exists AS "visitorExists",
  CASE
    WHEN known_visitor.visitor_exists THEN $2::BOOLEAN
    ELSE FALSE
  END AS "isExcluded",
  EXISTS (SELECT 1 FROM inserted_exclusion)
    OR EXISTS (SELECT 1 FROM deleted_exclusion) AS "stateChanged"
FROM known_visitor;
`;

function resolveDatabase(database?: VisitDatabase) {
  if (database) return database;

  try {
    return getVisitDatabase();
  } catch (error) {
    if (error instanceof VisitDatabaseConfigurationError) {
      throw new AnalyticsDataUnavailableError();
    }

    throw error;
  }
}

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value) {
    throw new TypeError(`Analytics exclusion row has an invalid ${field}.`);
  }

  return value;
}

function timestampString(value: unknown, field: string) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString();
  }

  return requiredString(value, field);
}

function positiveInteger(value: unknown, field: string) {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isSafeInteger(number) || number < 1) {
    throw new TypeError(`Analytics exclusion row has an invalid ${field}.`);
  }

  return number;
}

function normalizeExcludedVisitor(row: ExcludedVisitorRow): ExcludedVisitorSummary {
  return {
    excludedAt: timestampString(row.excludedAt, "exclusion time"),
    firstSeenAt: timestampString(row.firstSeenAt, "first-seen time"),
    latestSeenAt: timestampString(row.latestSeenAt, "latest-seen time"),
    totalVisits: positiveInteger(row.totalVisits, "visit count"),
    visitorId: requiredString(row.visitorId, "visitor ID"),
  };
}

export async function readExcludedVisitors(
  database?: VisitDatabase,
): Promise<ExcludedVisitorsReport> {
  const rows = await resolveDatabase(database).query(
    listExcludedVisitorsSql,
    [],
  ) as ExcludedVisitorRow[];

  return {
    type: "excluded",
    visitors: rows.map(normalizeExcludedVisitor),
  };
}

export async function setVisitorExclusion(
  visitorId: string,
  isExcluded: boolean,
  database?: VisitDatabase,
) {
  const rows = await resolveDatabase(database).query(
    setVisitorExclusionSql,
    [visitorId, isExcluded],
  ) as VisitorExclusionUpdateRow[];
  const result = rows[0];

  if (!result || typeof result.visitorExists !== "boolean" || typeof result.isExcluded !== "boolean") {
    throw new TypeError("Analytics exclusion update returned an invalid result.");
  }

  if (!result.visitorExists) {
    throw new UnknownAnalyticsVisitorError();
  }

  return { isExcluded: result.isExcluded, visitorId };
}

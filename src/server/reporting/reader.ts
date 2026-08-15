import type {
  AnalyticsPageView,
  AnalyticsReport,
  AnalyticsTrafficSource,
  AnalyticsVisit,
} from "../../data/analyticsContract.ts";
import {
  getVisitDatabase,
  VisitDatabaseConfigurationError,
  type VisitDatabase,
} from "../visits/repository.ts";
import type { AnalyticsSelection } from "./request.ts";

type AnalyticsVisitRow = Record<string, unknown>;

const trafficSources = new Set<AnalyticsTrafficSource>([
  "direct",
  "internal",
  "paid",
  "referral",
]);

const analyticsVisitColumns = `
  ledger.visit_id::TEXT AS "id",
  ledger.visitor_id::TEXT AS "visitorId",
  ledger.visit_number::INTEGER AS "visitNumber",
  TO_CHAR(
    ledger.started_at AT TIME ZONE 'Australia/Perth',
    'YYYY-MM-DD'
  ) AS "dateKey",
  ledger.started_at AS "startedAt",
  ledger.last_seen_at AS "lastSeenAt",
  ledger.visit_duration_seconds::INTEGER AS "durationSeconds",
  ledger.landing_path AS "landingPath",
  ledger.referrer_url AS "referrerUrl",
  ledger.referrer_host AS "referrerHost",
  ledger.traffic_source AS "trafficSource",
  ledger.gclid,
  ledger.ad_code AS "adCode",
  ledger.network_code AS "networkCode",
  ledger.matched_keyword AS "matchedKeyword",
  ledger.match_type AS "matchType",
  ledger.is_bot AS "isBot",
  ledger.bot_name AS "botName",
  ledger.bot_category AS "botCategory",
  COALESCE(
    (
      SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', page_views.id::TEXT,
          'path', page_views.path,
          'viewedAt', page_views.viewed_at
        )
        ORDER BY page_views.viewed_at, page_views.id
      )
      FROM site_page_views AS page_views
      WHERE page_views.visit_id = ledger.visit_id
    ),
    '[]'::JSON
  ) AS "pageViews"
`;

export const dailyAnalyticsSql = `
SELECT
${analyticsVisitColumns}
FROM visit_ledger AS ledger
WHERE ledger.started_at >= (
  $1::DATE::TIMESTAMP AT TIME ZONE 'Australia/Perth'
)
AND ledger.started_at < (
  (($1::DATE + 1)::TIMESTAMP) AT TIME ZONE 'Australia/Perth'
)
ORDER BY ledger.started_at DESC, ledger.visit_id DESC;
`;

export const visitorAnalyticsSql = `
SELECT
${analyticsVisitColumns}
FROM visit_ledger AS ledger
WHERE ledger.visitor_id = $1::UUID
ORDER BY ledger.started_at DESC, ledger.visit_id DESC;
`;

export class AnalyticsDataUnavailableError extends Error {
  constructor() {
    super("Analytics database configuration is unavailable.");
    this.name = "AnalyticsDataUnavailableError";
  }
}

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return value;
}

function nullableString(value: unknown, field: string) {
  if (value === null || value === undefined) return null;
  return requiredString(value, field);
}

function nullableBoolean(value: unknown, field: string) {
  if (value === null || value === undefined) return null;

  if (typeof value !== "boolean") {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return value;
}

function nonNegativeInteger(value: unknown, field: string) {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isSafeInteger(number) || number < 0) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return number;
}

function timestampString(value: unknown, field: string) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString();
  }

  return requiredString(value, field);
}

function normalizeTrafficSource(value: unknown) {
  if (typeof value === "string" && trafficSources.has(value as AnalyticsTrafficSource)) {
    return value as AnalyticsTrafficSource;
  }

  throw new TypeError("Analytics row has an invalid traffic source.");
}

function normalizePageViews(value: unknown): AnalyticsPageView[] {
  const pageViews = typeof value === "string" ? JSON.parse(value) : value;

  if (!Array.isArray(pageViews)) {
    throw new TypeError("Analytics row has invalid page views.");
  }

  return pageViews.map((pageView) => {
    if (!pageView || typeof pageView !== "object") {
      throw new TypeError("Analytics row has an invalid page view.");
    }

    const row = pageView as Record<string, unknown>;
    return {
      id: requiredString(row.id, "page-view ID"),
      path: requiredString(row.path, "page-view path"),
      viewedAt: timestampString(row.viewedAt, "page-view time"),
    };
  });
}

function normalizeVisit(row: AnalyticsVisitRow): AnalyticsVisit {
  const visitNumber = nonNegativeInteger(row.visitNumber, "visit number");

  if (visitNumber < 1) {
    throw new TypeError("Analytics row has an invalid visit number.");
  }

  return {
    adCode: nullableString(row.adCode, "ad code"),
    botCategory: nullableString(row.botCategory, "bot category"),
    botName: nullableString(row.botName, "bot name"),
    dateKey: requiredString(row.dateKey, "date"),
    durationSeconds: nonNegativeInteger(row.durationSeconds, "duration"),
    gclid: nullableString(row.gclid, "GCLID"),
    id: requiredString(row.id, "visit ID"),
    isBot: nullableBoolean(row.isBot, "bot verdict"),
    landingPath: requiredString(row.landingPath, "landing path"),
    lastSeenAt: timestampString(row.lastSeenAt, "last-seen time"),
    matchType: nullableString(row.matchType, "match type"),
    matchedKeyword: nullableString(row.matchedKeyword, "matched keyword"),
    networkCode: nullableString(row.networkCode, "network code"),
    pageViews: normalizePageViews(row.pageViews),
    referrerHost: nullableString(row.referrerHost, "referrer host"),
    referrerUrl: nullableString(row.referrerUrl, "referrer URL"),
    startedAt: timestampString(row.startedAt, "start time"),
    trafficSource: normalizeTrafficSource(row.trafficSource),
    visitNumber,
    visitorId: requiredString(row.visitorId, "visitor ID"),
  };
}

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

export async function readAnalytics(
  selection: AnalyticsSelection,
  database?: VisitDatabase,
): Promise<AnalyticsReport> {
  const selectedDatabase = resolveDatabase(database);
  const query = selection.type === "daily" ? dailyAnalyticsSql : visitorAnalyticsSql;
  const parameter = selection.type === "daily" ? selection.date : selection.visitorId;
  const rows = await selectedDatabase.query(query, [parameter]) as AnalyticsVisitRow[];
  const visits = rows.map(normalizeVisit);

  return selection.type === "daily"
    ? { type: "daily", date: selection.date, visits }
    : { type: "visitor", visitorId: selection.visitorId, visits };
}

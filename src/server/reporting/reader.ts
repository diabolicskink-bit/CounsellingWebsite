import { isAnalyticsReport, type AnalyticsReport } from "../../contracts/analyticsContract.ts";
import type { VisitDatabase } from "../visit-database.ts";
import { resolveAnalyticsDatabase } from "./database.ts";
import type { AnalyticsSelection } from "./request.ts";
import { nonNegativeInteger, timestampString } from "./row-values.ts";
import {
  dailyAnalyticsSql,
  keywordAnalyticsSql,
  monthlyEnquiryAnalyticsSql,
  pageViewsAnalyticsSql,
  referrersAnalyticsSql,
  visitorAnalyticsSql,
} from "./queries.ts";

type AnalyticsRow = Record<string, unknown>;

function jsonValue(value: unknown): unknown {
  return typeof value === "string" ? JSON.parse(value) : value;
}

function jsonArray(value: unknown, field: string): unknown[] {
  const values = jsonValue(value);
  if (!Array.isArray(values)) {
    throw new TypeError(`Analytics row has invalid ${field}.`);
  }
  return values;
}

function objectRow(value: unknown, field: string): AnalyticsRow {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }
  return value as AnalyticsRow;
}

function normalizeEvents(value: unknown) {
  return jsonArray(value, "events").map((event) => {
    const row = objectRow(event, "event");
    return {
      eventType: row.eventType,
      id: row.id,
      occurredAt: timestampString(row.occurredAt, "event time"),
      pageViewId: row.pageViewId ?? null,
      properties: jsonValue(row.properties),
      source: row.source,
    };
  });
}

function normalizePageViews(value: unknown) {
  return jsonArray(value, "page views").map((pageView) => {
    const row = objectRow(pageView, "page view");
    return {
      activeSeconds: nonNegativeInteger(row.activeSeconds, "page-view active time"),
      id: row.id,
      path: row.path,
      viewedAt: timestampString(row.viewedAt, "page-view time"),
    };
  });
}

function normalizeVisit(row: AnalyticsRow) {
  return {
    adCode: row.adCode ?? null,
    botCategory: row.botCategory ?? null,
    botName: row.botName ?? null,
    dateKey: row.dateKey,
    deviceType: row.deviceType,
    durationSeconds: nonNegativeInteger(row.durationSeconds, "duration"),
    events: normalizeEvents(row.events),
    gclid: row.gclid ?? null,
    id: row.id,
    isBot: row.isBot ?? null,
    isWebDriver: row.isWebDriver ?? null,
    landingPath: row.landingPath,
    lastSeenAt: timestampString(row.lastSeenAt, "last-seen time"),
    locationCountryCode: row.locationCountryCode ?? null,
    locationRegionCode: row.locationRegionCode ?? null,
    matchType: row.matchType ?? null,
    matchedKeyword: row.matchedKeyword ?? null,
    networkCode: row.networkCode ?? null,
    pageViews: normalizePageViews(row.pageViews),
    referrerHost: row.referrerHost ?? null,
    referrerUrl: row.referrerUrl ?? null,
    startedAt: timestampString(row.startedAt, "start time"),
    trafficSource: row.trafficSource,
    totalVisits: nonNegativeInteger(row.totalVisits, "total visits"),
    userAgent: row.userAgent ?? null,
    visitNumber: nonNegativeInteger(row.visitNumber, "visit number"),
    visitorId: row.visitorId,
  };
}

function validatedReport(report: unknown): AnalyticsReport {
  // Convert database representations above; keep domain rules in the shared contract.
  if (!isAnalyticsReport(report)) {
    throw new TypeError("Analytics query returned an invalid report.");
  }
  return report;
}

export async function readAnalytics(
  selection: AnalyticsSelection,
  database?: VisitDatabase,
): Promise<AnalyticsReport> {
  const selectedDatabase = resolveAnalyticsDatabase(database);

  if (selection.type === "referrers") {
    const rows = await selectedDatabase.query(referrersAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsRow[];
    const totals = rows[0] ?? {
      totalActiveSeconds: 0,
      totalEnquiryVisits: 0,
      totalPageViews: 0,
      totalVisits: 0,
    };
    const referrers = rows
      .filter((row) => row.referrer !== null && row.referrer !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "referrer active time"),
        enquiryVisits: nonNegativeInteger(row.enquiryVisits, "referrer enquiry visits"),
        referrer: row.referrer,
        pageViews: nonNegativeInteger(row.pageViews, "referrer page views"),
        visits: nonNegativeInteger(row.visits, "referrer visits"),
      }));

    return validatedReport({
      endDate: selection.endDate,
      referrers,
      startDate: selection.startDate,
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "total active time"),
      totalEnquiryVisits: nonNegativeInteger(totals.totalEnquiryVisits, "total enquiry visits"),
      totalPageViews: nonNegativeInteger(totals.totalPageViews, "total page views"),
      totalVisits: nonNegativeInteger(totals.totalVisits, "total visits"),
      type: "referrers",
    });
  }

  if (selection.type === "keywords") {
    const rows = await selectedDatabase.query(keywordAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsRow[];
    const totals = rows[0] ?? {
      taggedEnquiryVisits: 0,
      taggedVisits: 0,
      totalActiveSeconds: 0,
      totalEnquiryVisits: 0,
      totalPageViews: 0,
      totalPaidVisits: 0,
    };
    const keywords = rows
      .filter((row) => row.keyword !== null && row.keyword !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "keyword active time"),
        enquiryVisits: nonNegativeInteger(row.enquiryVisits, "keyword enquiry visits"),
        keyword: row.keyword,
        latestVisitAt: timestampString(row.latestVisitAt, "keyword latest visit time"),
        matchTypes: jsonValue(row.matchTypes),
        pageViews: nonNegativeInteger(row.pageViews, "keyword page views"),
        returningVisits: nonNegativeInteger(row.returningVisits, "keyword returning visits"),
        visits: nonNegativeInteger(row.visits, "keyword visits"),
      }));

    return validatedReport({
      endDate: selection.endDate,
      keywords,
      startDate: selection.startDate,
      taggedEnquiryVisits: nonNegativeInteger(totals.taggedEnquiryVisits, "tagged enquiry visits"),
      taggedVisits: nonNegativeInteger(totals.taggedVisits, "tagged visits"),
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "paid visit active time"),
      totalEnquiryVisits: nonNegativeInteger(totals.totalEnquiryVisits, "paid enquiry visits"),
      totalPageViews: nonNegativeInteger(totals.totalPageViews, "paid page views"),
      totalPaidVisits: nonNegativeInteger(totals.totalPaidVisits, "paid visits"),
      type: "keywords",
    });
  }

  if (selection.type === "pageViews") {
    const rows = await selectedDatabase.query(pageViewsAnalyticsSql, [
      selection.startDate,
      selection.endDate,
      selection.includeBots,
    ]) as AnalyticsRow[];
    const totals = rows[0] ?? {
      totalActiveSeconds: 0,
      totalPageViews: 0,
      totalVisits: 0,
    };
    const routes = rows
      .filter((row) => row.path !== null && row.path !== undefined)
      .map((row) => ({
        activeSeconds: nonNegativeInteger(row.activeSeconds, "route active time"),
        pageViews: nonNegativeInteger(row.pageViews, "route page views"),
        path: row.path,
        visits: nonNegativeInteger(row.visits, "route visits"),
      }));

    return validatedReport({
      endDate: selection.endDate,
      routes,
      startDate: selection.startDate,
      totalActiveSeconds: nonNegativeInteger(totals.totalActiveSeconds, "total active time"),
      totalPageViews: nonNegativeInteger(totals.totalPageViews, "total page views"),
      totalVisits: nonNegativeInteger(totals.totalVisits, "total visits"),
      type: "pageViews",
    });
  }

  switch (selection.type) {
    case "daily": {
      const rows = await selectedDatabase.query(dailyAnalyticsSql, [selection.date]) as AnalyticsRow[];
      return validatedReport({ type: "daily", date: selection.date, visits: rows.map(normalizeVisit) });
    }
    case "monthly": {
      const rows = await selectedDatabase.query(
        monthlyEnquiryAnalyticsSql,
        [selection.month],
      ) as AnalyticsRow[];
      return validatedReport({ type: "monthly", month: selection.month, visits: rows.map(normalizeVisit) });
    }
    case "visitor": {
      const rows = await selectedDatabase.query(
        visitorAnalyticsSql,
        [selection.visitorId],
      ) as AnalyticsRow[];
      return validatedReport({
        type: "visitor",
        visitorId: selection.visitorId,
        isExcluded: rows.length > 0 ? rows[0].isExcluded : false,
        visits: rows.map(normalizeVisit),
      });
    }
  }
}

import {
  australianVisitRegionCodes,
  type AustralianVisitRegionCode,
  type VisitDeviceType,
} from "./visitClientEnvironment.ts";

export type AnalyticsTrafficSource = "direct" | "internal" | "paid" | "referral";

const perthDateFormatter = new Intl.DateTimeFormat("en-CA", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "Australia/Perth",
  year: "numeric",
});

export function getPerthDateKey(date = new Date()) {
  const parts = perthDateFormatter.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

export function getPerthMonthKey(date = new Date()) {
  return getPerthDateKey(date).slice(0, 7);
}

export function isAnalyticsDateKey(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day, 12));

  return !Number.isNaN(parsedDate.valueOf())
    && parsedDate.toISOString().slice(0, 10) === value;
}

export function isAnalyticsMonthKey(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) return false;

  const month = Number(value.slice(5));
  return month >= 1 && month <= 12;
}

const analyticsIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const analyticsTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

function isAnalyticsId(value: unknown): value is string {
  return typeof value === "string"
    && analyticsIdPattern.test(value);
}

export function isAnalyticsVisitorId(value: unknown): value is string {
  return isAnalyticsId(value);
}

export type AnalyticsPageView = {
  activeSeconds: number;
  id: string;
  path: string;
  viewedAt: string;
};

export type AnalyticsVisitEvent = {
  eventType: string;
  id: string;
  occurredAt: string;
  pageViewId: string | null;
  properties: Record<string, string>;
  source: "client" | "server";
};

export type AnalyticsVisit = {
  adCode: string | null;
  botCategory: string | null;
  botName: string | null;
  dateKey: string;
  deviceType: VisitDeviceType;
  durationSeconds: number;
  events: AnalyticsVisitEvent[];
  gclid: string | null;
  id: string;
  isBot: boolean | null;
  isWebDriver: boolean | null;
  landingPath: string;
  lastSeenAt: string;
  locationCountryCode: string | null;
  locationRegionCode: AustralianVisitRegionCode | null;
  matchType: string | null;
  matchedKeyword: string | null;
  networkCode: string | null;
  pageViews: AnalyticsPageView[];
  referrerHost: string | null;
  referrerUrl: string | null;
  startedAt: string;
  trafficSource: AnalyticsTrafficSource;
  totalVisits: number;
  userAgent: string | null;
  visitNumber: number;
  visitorId: string;
};

export type DailyAnalyticsReport = {
  date: string;
  type: "daily";
  visits: AnalyticsVisit[];
};

export type MonthlyAnalyticsReport = {
  month: string;
  type: "monthly";
  visits: AnalyticsVisit[];
};

export type PageViewRouteSummary = {
  activeSeconds: number;
  pageViews: number;
  path: string;
  visits: number;
};

export type PageViewsAnalyticsReport = {
  endDate: string;
  routes: PageViewRouteSummary[];
  startDate: string;
  totalActiveSeconds: number;
  totalPageViews: number;
  totalVisits: number;
  type: "pageViews";
};

export type KeywordAnalyticsSummary = {
  activeSeconds: number;
  enquiryVisits: number;
  keyword: string;
  latestVisitAt: string;
  matchTypes: string[];
  pageViews: number;
  returningVisits: number;
  visits: number;
};

export type KeywordAnalyticsReport = {
  endDate: string;
  keywords: KeywordAnalyticsSummary[];
  startDate: string;
  taggedEnquiryVisits: number;
  taggedVisits: number;
  totalActiveSeconds: number;
  totalEnquiryVisits: number;
  totalPageViews: number;
  totalPaidVisits: number;
  type: "keywords";
};

export type VisitorAnalyticsReport = {
  isExcluded: boolean;
  type: "visitor";
  visitorId: string;
  visits: AnalyticsVisit[];
};

export type ExcludedVisitorSummary = {
  excludedAt: string;
  firstSeenAt: string;
  latestSeenAt: string;
  totalVisits: number;
  visitorId: string;
};

export type ExcludedVisitorsReport = {
  type: "excluded";
  visitors: ExcludedVisitorSummary[];
};

export type AnalyticsReport =
  | DailyAnalyticsReport
  | ExcludedVisitorsReport
  | KeywordAnalyticsReport
  | MonthlyAnalyticsReport
  | PageViewsAnalyticsReport
  | VisitorAnalyticsReport;

export type AnalyticsReportType = AnalyticsReport["type"];

export type AnalyticsReportOfType<Type extends AnalyticsReportType> = Extract<
  AnalyticsReport,
  { type: Type }
>;

export type AnalyticsApiResponse = {
  data: AnalyticsReport;
};

export type AnalyticsExclusionsApiResponse = {
  data: ExcludedVisitorsReport;
};

export type AnalyticsExclusionUpdateResponse = {
  data: {
    isExcluded: boolean;
    visitorId: string;
  };
};

const analyticsTrafficSources = new Set<AnalyticsTrafficSource>([
  "direct",
  "internal",
  "paid",
  "referral",
]);

const visitDeviceTypes = new Set<VisitDeviceType>([
  "desktop",
  "mobile",
  "tablet",
  "unknown",
]);

const visitRegionCodes = new Set<AustralianVisitRegionCode>(australianVisitRegionCodes);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isNullableString(value: unknown): value is string | null {
  return value === null || isNonEmptyString(value);
}

function isNullableBoolean(value: unknown): value is boolean | null {
  return value === null || typeof value === "boolean";
}

function isVisitLocation(
  countryCode: unknown,
  regionCode: unknown,
): countryCode is string | null {
  if (countryCode === null) return regionCode === null;
  if (typeof countryCode !== "string" || !/^[A-Z]{2}$/.test(countryCode)) return false;

  if (countryCode !== "AU") return regionCode === null;
  return typeof regionCode === "string"
    && visitRegionCodes.has(regionCode as AustralianVisitRegionCode);
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isPositiveInteger(value: unknown): value is number {
  return isNonNegativeInteger(value) && value > 0;
}

function isTimestamp(value: unknown): value is string {
  return isNonEmptyString(value)
    && analyticsTimestampPattern.test(value)
    && !Number.isNaN(Date.parse(value));
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value)
    && Object.values(value).every((propertyValue) => typeof propertyValue === "string");
}

export function isAnalyticsPageView(value: unknown): value is AnalyticsPageView {
  if (!isRecord(value)) return false;

  return isNonNegativeInteger(value.activeSeconds)
    && isAnalyticsId(value.id)
    && isNonEmptyString(value.path)
    && isTimestamp(value.viewedAt);
}

export function isAnalyticsVisitEvent(value: unknown): value is AnalyticsVisitEvent {
  if (!isRecord(value)) return false;

  return isNonEmptyString(value.eventType)
    && isAnalyticsId(value.id)
    && isTimestamp(value.occurredAt)
    && (value.pageViewId === null || isAnalyticsId(value.pageViewId))
    && isStringRecord(value.properties)
    && (value.source === "client" || value.source === "server");
}

export function isAnalyticsVisit(value: unknown): value is AnalyticsVisit {
  if (!isRecord(value)) return false;

  if (!isPositiveInteger(value.visitNumber) || !isPositiveInteger(value.totalVisits)) {
    return false;
  }

  return value.totalVisits >= value.visitNumber
    && isNullableString(value.adCode)
    && isNullableString(value.botCategory)
    && isNullableString(value.botName)
    && typeof value.dateKey === "string"
    && isAnalyticsDateKey(value.dateKey)
    && typeof value.deviceType === "string"
    && visitDeviceTypes.has(value.deviceType as VisitDeviceType)
    && isNonNegativeInteger(value.durationSeconds)
    && Array.isArray(value.events)
    && value.events.every(isAnalyticsVisitEvent)
    && isNullableString(value.gclid)
    && isAnalyticsId(value.id)
    && isNullableBoolean(value.isBot)
    && isNullableBoolean(value.isWebDriver)
    && isNonEmptyString(value.landingPath)
    && isTimestamp(value.lastSeenAt)
    && isVisitLocation(value.locationCountryCode, value.locationRegionCode)
    && isNullableString(value.matchType)
    && isNullableString(value.matchedKeyword)
    && isNullableString(value.networkCode)
    && Array.isArray(value.pageViews)
    && value.pageViews.every(isAnalyticsPageView)
    && isNullableString(value.referrerHost)
    && isNullableString(value.referrerUrl)
    && isTimestamp(value.startedAt)
    && typeof value.trafficSource === "string"
    && analyticsTrafficSources.has(value.trafficSource as AnalyticsTrafficSource)
    && isNullableString(value.userAgent)
    && isAnalyticsVisitorId(value.visitorId);
}

export function isPageViewRouteSummary(value: unknown): value is PageViewRouteSummary {
  if (!isRecord(value)) return false;

  return isNonNegativeInteger(value.activeSeconds)
    && isPositiveInteger(value.pageViews)
    && isNonEmptyString(value.path)
    && isPositiveInteger(value.visits);
}

export function isKeywordAnalyticsSummary(value: unknown): value is KeywordAnalyticsSummary {
  if (!isRecord(value)) return false;

  return isNonNegativeInteger(value.activeSeconds)
    && isNonNegativeInteger(value.enquiryVisits)
    && isNonEmptyString(value.keyword)
    && isTimestamp(value.latestVisitAt)
    && Array.isArray(value.matchTypes)
    && value.matchTypes.every(isNonEmptyString)
    && isNonNegativeInteger(value.pageViews)
    && isNonNegativeInteger(value.returningVisits)
    && isPositiveInteger(value.visits)
    && value.enquiryVisits <= value.visits
    && value.returningVisits <= value.visits;
}

export function isExcludedVisitorSummary(value: unknown): value is ExcludedVisitorSummary {
  if (!isRecord(value)) return false;

  return isTimestamp(value.excludedAt)
    && isTimestamp(value.firstSeenAt)
    && isTimestamp(value.latestSeenAt)
    && isPositiveInteger(value.totalVisits)
    && isAnalyticsVisitorId(value.visitorId);
}

export function isAnalyticsReport(value: unknown): value is AnalyticsReport {
  if (!isRecord(value)) return false;

  if (value.type === "daily") {
    return typeof value.date === "string"
      && isAnalyticsDateKey(value.date)
      && Array.isArray(value.visits)
      && value.visits.every(isAnalyticsVisit);
  }

  if (value.type === "monthly") {
    return typeof value.month === "string"
      && isAnalyticsMonthKey(value.month)
      && Array.isArray(value.visits)
      && value.visits.every(isAnalyticsVisit);
  }

  if (value.type === "visitor") {
    if (
      typeof value.isExcluded !== "boolean"
      || !isAnalyticsVisitorId(value.visitorId)
      || !Array.isArray(value.visits)
      || !value.visits.every(isAnalyticsVisit)
    ) {
      return false;
    }

    const visitorId = value.visitorId;
    return value.visits.every((visit) => visit.visitorId === visitorId);
  }

  if (value.type === "excluded") {
    return Array.isArray(value.visitors)
      && value.visitors.every(isExcludedVisitorSummary);
  }

  if (value.type === "pageViews") {
    if (
      typeof value.startDate !== "string"
      || !isAnalyticsDateKey(value.startDate)
      || typeof value.endDate !== "string"
      || !isAnalyticsDateKey(value.endDate)
      || value.startDate > value.endDate
      || !Array.isArray(value.routes)
      || !value.routes.every(isPageViewRouteSummary)
      || !isNonNegativeInteger(value.totalActiveSeconds)
      || !isNonNegativeInteger(value.totalPageViews)
      || !isNonNegativeInteger(value.totalVisits)
    ) {
      return false;
    }

    const totalVisits = value.totalVisits;

    return value.routes.reduce((total, route) => total + route.activeSeconds, 0)
      === value.totalActiveSeconds
      && value.routes.reduce((total, route) => total + route.pageViews, 0)
        === value.totalPageViews
      && value.routes.every((route) => route.visits <= totalVisits);
  }

  if (value.type === "keywords") {
    if (
      typeof value.startDate !== "string"
      || !isAnalyticsDateKey(value.startDate)
      || typeof value.endDate !== "string"
      || !isAnalyticsDateKey(value.endDate)
      || value.startDate > value.endDate
      || !Array.isArray(value.keywords)
      || !value.keywords.every(isKeywordAnalyticsSummary)
      || !isNonNegativeInteger(value.taggedEnquiryVisits)
      || !isNonNegativeInteger(value.taggedVisits)
      || !isNonNegativeInteger(value.totalActiveSeconds)
      || !isNonNegativeInteger(value.totalEnquiryVisits)
      || !isNonNegativeInteger(value.totalPageViews)
      || !isNonNegativeInteger(value.totalPaidVisits)
    ) {
      return false;
    }

    const taggedActiveSeconds = value.keywords.reduce(
      (total, keyword) => total + keyword.activeSeconds,
      0,
    );
    const taggedEnquiryVisits = value.keywords.reduce(
      (total, keyword) => total + keyword.enquiryVisits,
      0,
    );
    const taggedPageViews = value.keywords.reduce(
      (total, keyword) => total + keyword.pageViews,
      0,
    );
    const taggedVisits = value.keywords.reduce(
      (total, keyword) => total + keyword.visits,
      0,
    );

    return taggedVisits === value.taggedVisits
      && taggedEnquiryVisits === value.taggedEnquiryVisits
      && taggedVisits <= value.totalPaidVisits
      && taggedEnquiryVisits <= value.totalEnquiryVisits
      && value.totalEnquiryVisits <= value.totalPaidVisits
      && taggedActiveSeconds <= value.totalActiveSeconds
      && taggedPageViews <= value.totalPageViews;
  }

  return false;
}

export function isAnalyticsReportOfType<Type extends AnalyticsReportType>(
  value: unknown,
  expectedType: Type,
): value is AnalyticsReportOfType<Type> {
  return isAnalyticsReport(value) && value.type === expectedType;
}

export function isAnalyticsApiResponseOfType<Type extends AnalyticsReportType>(
  value: unknown,
  expectedType: Type,
): value is { data: AnalyticsReportOfType<Type> } {
  return isRecord(value) && isAnalyticsReportOfType(value.data, expectedType);
}

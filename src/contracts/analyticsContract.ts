import {
  australianVisitRegionCodes,
  visitDeviceTypes,
  type AustralianVisitRegionCode,
  type VisitDeviceType,
} from "./visitClientEnvironment.ts";
import {
  visitEventSources,
  visitEventTypes,
  type VisitEventProperties,
  type VisitEventSource,
} from "./visitEventContract.ts";

export const analyticsTrafficSources = [
  "direct",
  "internal",
  "paid",
  "referral",
] as const;

export type AnalyticsTrafficSource = (typeof analyticsTrafficSources)[number];

export const enquiryEventTypes = [
  visitEventTypes.enquirySent,
  visitEventTypes.phoneLinkClicked,
  visitEventTypes.emailLinkClicked,
] as const;

export type EnquiryEventType = (typeof enquiryEventTypes)[number];

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
  properties: VisitEventProperties;
  source: VisitEventSource;
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
  totalVisits: number;
  trafficSource: AnalyticsTrafficSource;
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
  paidAttributedEnquiries: number;
  paidVisits: number;
  paidVisitsWithEnquiry: number;
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

export type ReferrerAnalyticsSummary = {
  activeSeconds: number;
  enquiryVisits: number;
  pageViews: number;
  referrer: string;
  visits: number;
};

export type ReferrersAnalyticsReport = {
  endDate: string;
  referrers: ReferrerAnalyticsSummary[];
  startDate: string;
  totalActiveSeconds: number;
  totalEnquiryVisits: number;
  totalPageViews: number;
  totalVisits: number;
  type: "referrers";
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
  | ReferrersAnalyticsReport
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

export type AnalyticsExclusionUpdateApiResponse = {
  data: {
    isExcluded: boolean;
    visitorId: string;
  };
};

type UnknownRecord = Record<string, unknown>;

const analyticsIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const analyticsTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const countryCodePattern = /^[A-Z]{2}$/;
const dateKeyPattern = /^\d{4}-\d{2}-\d{2}$/;
const monthKeyPattern = /^\d{4}-\d{2}$/;

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

export function isEnquiryEventType(eventType: string): eventType is EnquiryEventType {
  return isOneOf(enquiryEventTypes, eventType);
}

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isOneOf<Value extends string>(values: readonly Value[], value: unknown): value is Value {
  return typeof value === "string" && (values as readonly string[]).includes(value);
}

function isArrayOf<Item>(value: unknown, isItem: (item: unknown) => item is Item): value is Item[] {
  return Array.isArray(value) && value.every((item) => isItem(item));
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

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isPositiveInteger(value: unknown): value is number {
  return isNonNegativeInteger(value) && value > 0;
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value)
    && Object.values(value).every((propertyValue) => typeof propertyValue === "string");
}

function sumOf<Row>(rows: readonly Row[], getValue: (row: Row) => number) {
  return rows.reduce((total, row) => total + getValue(row), 0);
}

export function isAnalyticsDateKey(value: unknown): value is string {
  if (typeof value !== "string" || !dateKeyPattern.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day, 12));

  return !Number.isNaN(parsedDate.valueOf())
    && parsedDate.toISOString().slice(0, 10) === value;
}

export function isAnalyticsMonthKey(value: unknown): value is string {
  if (typeof value !== "string" || !monthKeyPattern.test(value)) {
    return false;
  }

  const month = Number(value.slice(5));

  return month >= 1 && month <= 12;
}

export function isAnalyticsTimestamp(value: unknown): value is string {
  return isNonEmptyString(value)
    && analyticsTimestampPattern.test(value)
    && !Number.isNaN(Date.parse(value));
}

function isAnalyticsId(value: unknown): value is string {
  return typeof value === "string" && analyticsIdPattern.test(value);
}

export function isAnalyticsVisitorId(value: unknown): value is string {
  return isAnalyticsId(value);
}

function hasDateRange(report: UnknownRecord) {
  return isAnalyticsDateKey(report.startDate)
    && isAnalyticsDateKey(report.endDate)
    && report.startDate <= report.endDate;
}

function isVisitLocation(countryCode: unknown, regionCode: unknown) {
  if (countryCode === null) {
    return regionCode === null;
  }

  if (typeof countryCode !== "string" || !countryCodePattern.test(countryCode)) {
    return false;
  }

  return countryCode === "AU"
    ? isOneOf(australianVisitRegionCodes, regionCode)
    : regionCode === null;
}

function isAnalyticsPageView(value: unknown): value is AnalyticsPageView {
  return isRecord(value)
    && isNonNegativeInteger(value.activeSeconds)
    && isAnalyticsId(value.id)
    && isNonEmptyString(value.path)
    && isAnalyticsTimestamp(value.viewedAt);
}

function isAnalyticsVisitEvent(value: unknown): value is AnalyticsVisitEvent {
  return isRecord(value)
    && isNonEmptyString(value.eventType)
    && isAnalyticsId(value.id)
    && isAnalyticsTimestamp(value.occurredAt)
    && (value.pageViewId === null || isAnalyticsId(value.pageViewId))
    && isStringRecord(value.properties)
    && isOneOf(visitEventSources, value.source);
}

function isAnalyticsVisit(value: unknown): value is AnalyticsVisit {
  return isRecord(value)
    && isNullableString(value.adCode)
    && isNullableString(value.botCategory)
    && isNullableString(value.botName)
    && isAnalyticsDateKey(value.dateKey)
    && isOneOf(visitDeviceTypes, value.deviceType)
    && isNonNegativeInteger(value.durationSeconds)
    && isArrayOf(value.events, isAnalyticsVisitEvent)
    && isNullableString(value.gclid)
    && isAnalyticsId(value.id)
    && isNullableBoolean(value.isBot)
    && isNullableBoolean(value.isWebDriver)
    && isNonEmptyString(value.landingPath)
    && isAnalyticsTimestamp(value.lastSeenAt)
    && isVisitLocation(value.locationCountryCode, value.locationRegionCode)
    && isNullableString(value.matchType)
    && isNullableString(value.matchedKeyword)
    && isNullableString(value.networkCode)
    && isArrayOf(value.pageViews, isAnalyticsPageView)
    && isNullableString(value.referrerHost)
    && isNullableString(value.referrerUrl)
    && isAnalyticsTimestamp(value.startedAt)
    && isPositiveInteger(value.totalVisits)
    && isOneOf(analyticsTrafficSources, value.trafficSource)
    && isNullableString(value.userAgent)
    && isPositiveInteger(value.visitNumber)
    && value.visitNumber <= value.totalVisits
    && isAnalyticsVisitorId(value.visitorId);
}

function isPageViewRouteSummary(value: unknown): value is PageViewRouteSummary {
  return isRecord(value)
    && isNonNegativeInteger(value.activeSeconds)
    && isPositiveInteger(value.pageViews)
    && isNonEmptyString(value.path)
    && isPositiveInteger(value.visits);
}

function isReferrerAnalyticsSummary(value: unknown): value is ReferrerAnalyticsSummary {
  return isRecord(value)
    && isNonNegativeInteger(value.activeSeconds)
    && isNonNegativeInteger(value.enquiryVisits)
    && isNonNegativeInteger(value.pageViews)
    && isNonEmptyString(value.referrer)
    && isPositiveInteger(value.visits)
    && value.enquiryVisits <= value.visits;
}

function isKeywordAnalyticsSummary(value: unknown): value is KeywordAnalyticsSummary {
  return isRecord(value)
    && isNonNegativeInteger(value.activeSeconds)
    && isNonNegativeInteger(value.enquiryVisits)
    && isNonEmptyString(value.keyword)
    && isAnalyticsTimestamp(value.latestVisitAt)
    && isArrayOf(value.matchTypes, isNonEmptyString)
    && isNonNegativeInteger(value.pageViews)
    && isNonNegativeInteger(value.returningVisits)
    && isPositiveInteger(value.visits)
    && value.enquiryVisits <= value.visits
    && value.returningVisits <= value.visits;
}

export function isExcludedVisitorSummary(value: unknown): value is ExcludedVisitorSummary {
  return isRecord(value)
    && isAnalyticsTimestamp(value.excludedAt)
    && isAnalyticsTimestamp(value.firstSeenAt)
    && isAnalyticsTimestamp(value.latestSeenAt)
    && isPositiveInteger(value.totalVisits)
    && isAnalyticsVisitorId(value.visitorId);
}

function isDailyReport(report: UnknownRecord) {
  return isAnalyticsDateKey(report.date)
    && isArrayOf(report.visits, isAnalyticsVisit);
}

function isMonthlyReport(report: UnknownRecord) {
  return isAnalyticsMonthKey(report.month)
    && isNonNegativeInteger(report.paidAttributedEnquiries)
    && isNonNegativeInteger(report.paidVisits)
    && isNonNegativeInteger(report.paidVisitsWithEnquiry)
    && report.paidVisitsWithEnquiry <= report.paidVisits
    && isArrayOf(report.visits, isAnalyticsVisit);
}

function isVisitorReport(report: UnknownRecord) {
  const { visitorId, visits } = report;

  return typeof report.isExcluded === "boolean"
    && isAnalyticsVisitorId(visitorId)
    && isArrayOf(visits, isAnalyticsVisit)
    && visits.every((visit) => visit.visitorId === visitorId);
}

function isExcludedVisitorsReport(report: UnknownRecord) {
  return isArrayOf(report.visitors, isExcludedVisitorSummary);
}

function isPageViewsReport(report: UnknownRecord) {
  const { routes, totalVisits } = report;

  return hasDateRange(report)
    && isArrayOf(routes, isPageViewRouteSummary)
    && isNonNegativeInteger(report.totalActiveSeconds)
    && isNonNegativeInteger(report.totalPageViews)
    && isNonNegativeInteger(totalVisits)
    && sumOf(routes, (route) => route.activeSeconds) === report.totalActiveSeconds
    && sumOf(routes, (route) => route.pageViews) === report.totalPageViews
    && routes.every((route) => route.visits <= totalVisits);
}

function isReferrersReport(report: UnknownRecord) {
  const { referrers } = report;

  return hasDateRange(report)
    && isArrayOf(referrers, isReferrerAnalyticsSummary)
    && isNonNegativeInteger(report.totalActiveSeconds)
    && isNonNegativeInteger(report.totalEnquiryVisits)
    && isNonNegativeInteger(report.totalPageViews)
    && isNonNegativeInteger(report.totalVisits)
    && new Set(referrers.map((row) => row.referrer)).size === referrers.length
    && sumOf(referrers, (row) => row.activeSeconds) === report.totalActiveSeconds
    && sumOf(referrers, (row) => row.enquiryVisits) === report.totalEnquiryVisits
    && sumOf(referrers, (row) => row.pageViews) === report.totalPageViews
    && sumOf(referrers, (row) => row.visits) === report.totalVisits;
}

function isKeywordsReport(report: UnknownRecord) {
  const { keywords } = report;

  if (
    !hasDateRange(report)
    || !isArrayOf(keywords, isKeywordAnalyticsSummary)
    || !isNonNegativeInteger(report.taggedEnquiryVisits)
    || !isNonNegativeInteger(report.taggedVisits)
    || !isNonNegativeInteger(report.totalActiveSeconds)
    || !isNonNegativeInteger(report.totalEnquiryVisits)
    || !isNonNegativeInteger(report.totalPageViews)
    || !isNonNegativeInteger(report.totalPaidVisits)
  ) {
    return false;
  }

  const taggedVisits = sumOf(keywords, (keyword) => keyword.visits);
  const taggedEnquiryVisits = sumOf(keywords, (keyword) => keyword.enquiryVisits);

  return taggedVisits === report.taggedVisits
    && taggedEnquiryVisits === report.taggedEnquiryVisits
    && taggedVisits <= report.totalPaidVisits
    && taggedEnquiryVisits <= report.totalEnquiryVisits
    && report.totalEnquiryVisits <= report.totalPaidVisits
    && sumOf(keywords, (keyword) => keyword.activeSeconds) <= report.totalActiveSeconds
    && sumOf(keywords, (keyword) => keyword.pageViews) <= report.totalPageViews;
}

// Keyed by report type so that adding a report to the union without a validator fails to compile.
const reportValidators: Readonly<Record<AnalyticsReportType, (report: UnknownRecord) => boolean>> = {
  daily: isDailyReport,
  excluded: isExcludedVisitorsReport,
  keywords: isKeywordsReport,
  monthly: isMonthlyReport,
  pageViews: isPageViewsReport,
  referrers: isReferrersReport,
  visitor: isVisitorReport,
};

const analyticsReportTypes = Object.keys(reportValidators) as AnalyticsReportType[];

export function isAnalyticsReport(value: unknown): value is AnalyticsReport {
  return isRecord(value)
    && isOneOf(analyticsReportTypes, value.type)
    && reportValidators[value.type](value);
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

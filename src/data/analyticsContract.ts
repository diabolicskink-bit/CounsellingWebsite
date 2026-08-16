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

export function isAnalyticsVisitorId(value: unknown): value is string {
  return typeof value === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export type AnalyticsPageView = {
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
  durationSeconds: number;
  events: AnalyticsVisitEvent[];
  gclid: string | null;
  id: string;
  isBot: boolean | null;
  landingPath: string;
  lastSeenAt: string;
  matchType: string | null;
  matchedKeyword: string | null;
  networkCode: string | null;
  pageViews: AnalyticsPageView[];
  referrerHost: string | null;
  referrerUrl: string | null;
  startedAt: string;
  trafficSource: AnalyticsTrafficSource;
  totalVisits: number;
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
  pageViews: number;
  path: string;
  visits: number;
};

export type PageViewsAnalyticsReport = {
  endDate: string;
  routes: PageViewRouteSummary[];
  startDate: string;
  totalPageViews: number;
  totalVisits: number;
  type: "pageViews";
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
  | MonthlyAnalyticsReport
  | PageViewsAnalyticsReport
  | VisitorAnalyticsReport;

export type AnalyticsApiResponse = {
  data: AnalyticsReport;
};

export type AnalyticsApiError = {
  error: string;
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

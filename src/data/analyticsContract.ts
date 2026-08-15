export type AnalyticsTrafficSource = "direct" | "internal" | "paid" | "referral";

export type AnalyticsPageView = {
  id: string;
  path: string;
  viewedAt: string;
};

export type AnalyticsVisit = {
  adCode: string | null;
  dateKey: string;
  durationSeconds: number;
  gclid: string | null;
  id: string;
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
  visitNumber: number;
  visitorId: string;
};

export type DailyAnalyticsReport = {
  date: string;
  type: "daily";
  visits: AnalyticsVisit[];
};

export type VisitorAnalyticsReport = {
  type: "visitor";
  visitorId: string;
  visits: AnalyticsVisit[];
};

export type AnalyticsReport = DailyAnalyticsReport | VisitorAnalyticsReport;

export type AnalyticsApiResponse = {
  data: AnalyticsReport;
};

export type AnalyticsApiError = {
  error: string;
};

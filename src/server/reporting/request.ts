import {
  getPerthDateKey,
  isAnalyticsDateKey,
  isAnalyticsMonthKey,
  isAnalyticsVisitorId,
} from "../../data/analyticsContract.ts";

export type AnalyticsSelection =
  | { date: string; type: "daily" }
  | { month: string; type: "monthly" }
  | { endDate: string; includeBots: boolean; startDate: string; type: "pageViews" }
  | { type: "visitor"; visitorId: string };

export type AnalyticsRequest = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
};

export type AnalyticsResponse = {
  json(body: unknown): unknown;
  setHeader(name: string, value: string): void;
  status(statusCode: number): AnalyticsResponse;
};

export type AnalyticsSelectionResult =
  | { selection: AnalyticsSelection; type: "valid" }
  | { type: "invalid" };

const allowedQueryKeys = new Set(["bots", "date", "end", "month", "start", "visitor"]);
const maximumPageViewRangeDays = 366;
function getSingleQueryValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function daysBetween(startDate: string, endDate: string) {
  const start = Date.parse(`${startDate}T12:00:00.000Z`);
  const end = Date.parse(`${endDate}T12:00:00.000Z`);
  return Math.round((end - start) / 86_400_000);
}

export function getAnalyticsSelection(
  query: AnalyticsRequest["query"],
  now: Date,
): AnalyticsSelectionResult {
  const normalizedQuery = query ?? {};

  if (Object.keys(normalizedQuery).some((key) => !allowedQueryKeys.has(key))) {
    return { type: "invalid" };
  }

  const date = getSingleQueryValue(normalizedQuery.date);
  const endDate = getSingleQueryValue(normalizedQuery.end);
  const month = getSingleQueryValue(normalizedQuery.month);
  const startDate = getSingleQueryValue(normalizedQuery.start);
  const visitorId = getSingleQueryValue(normalizedQuery.visitor);
  const bots = getSingleQueryValue(normalizedQuery.bots);

  if (
    Array.isArray(normalizedQuery.bots)
    || Array.isArray(normalizedQuery.date)
    || Array.isArray(normalizedQuery.end)
    || Array.isArray(normalizedQuery.month)
    || Array.isArray(normalizedQuery.start)
    || Array.isArray(normalizedQuery.visitor)
  ) {
    return { type: "invalid" };
  }

  if (bots && bots !== "include") {
    return { type: "invalid" };
  }

  if (startDate || endDate) {
    const today = getPerthDateKey(now);
    const rangeLength = isAnalyticsDateKey(startDate) && isAnalyticsDateKey(endDate)
      ? daysBetween(startDate, endDate)
      : -1;

    return startDate
      && endDate
      && !date
      && !month
      && !visitorId
      && rangeLength >= 0
      && rangeLength < maximumPageViewRangeDays
      && endDate <= today
      ? {
          type: "valid",
          selection: {
            endDate,
            includeBots: bots === "include",
            startDate,
            type: "pageViews",
          },
        }
      : { type: "invalid" };
  }

  if (bots) {
    return { type: "invalid" };
  }

  if ([date, month, visitorId].filter(Boolean).length > 1) {
    return { type: "invalid" };
  }

  if (visitorId) {
    return isAnalyticsVisitorId(visitorId)
      ? { type: "valid", selection: { type: "visitor", visitorId } }
      : { type: "invalid" };
  }

  if (month) {
    return isAnalyticsMonthKey(month)
      ? { type: "valid", selection: { type: "monthly", month } }
      : { type: "invalid" };
  }

  const selectedDate = date || getPerthDateKey(now);

  return isAnalyticsDateKey(selectedDate)
    ? { type: "valid", selection: { type: "daily", date: selectedDate } }
    : { type: "invalid" };
}

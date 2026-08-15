import {
  getPerthDateKey,
  isAnalyticsDateKey,
} from "../../data/analyticsContract.ts";

export type AnalyticsSelection =
  | { date: string; type: "daily" }
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

const allowedQueryKeys = new Set(["date", "visitor"]);
const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getSingleQueryValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : "";
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
  const visitorId = getSingleQueryValue(normalizedQuery.visitor);

  if (Array.isArray(normalizedQuery.date) || Array.isArray(normalizedQuery.visitor)) {
    return { type: "invalid" };
  }

  if (date && visitorId) {
    return { type: "invalid" };
  }

  if (visitorId) {
    return visitorIdPattern.test(visitorId)
      ? { type: "valid", selection: { type: "visitor", visitorId } }
      : { type: "invalid" };
  }

  const selectedDate = date || getPerthDateKey(now);

  return isAnalyticsDateKey(selectedDate)
    ? { type: "valid", selection: { type: "daily", date: selectedDate } }
    : { type: "invalid" };
}

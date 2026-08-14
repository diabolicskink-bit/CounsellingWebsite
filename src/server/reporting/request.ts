export type VisitReportSelection =
  | { date: string; type: "daily" }
  | { type: "visitor"; visitorId: string };

export type VisitReportRequest = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
};

export type VisitReportResponse = {
  json(body: unknown): unknown;
  setHeader(name: string, value: string): void;
  status(statusCode: number): VisitReportResponse;
};

export type VisitReportSelectionResult =
  | { selection: VisitReportSelection; type: "valid" }
  | { type: "invalid" };

const allowedQueryKeys = new Set(["date", "visitor"]);
const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getSingleQueryValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function isDateKey(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day, 12));

  return !Number.isNaN(parsedDate.valueOf())
    && parsedDate.toISOString().slice(0, 10) === value;
}

export function getPerthDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Australia/Perth",
    year: "numeric",
  }).formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

export function getVisitReportSelection(
  query: VisitReportRequest["query"],
  now: Date,
): VisitReportSelectionResult {
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

  return isDateKey(selectedDate)
    ? { type: "valid", selection: { type: "daily", date: selectedDate } }
    : { type: "invalid" };
}

import { isAnalyticsTimestamp } from "../../contracts/analyticsContract.ts";

export function nonNegativeInteger(value: unknown, field: string) {
  // PostgreSQL counts can arrive as numbers or decimal strings.
  const number = typeof value === "string" && /^\d+$/.test(value)
    ? Number(value)
    : value;

  if (typeof number !== "number" || !Number.isSafeInteger(number) || number < 0) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return number;
}

export function positiveInteger(value: unknown, field: string) {
  const number = nonNegativeInteger(value, field);

  if (number === 0) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return number;
}

export function timestampString(value: unknown, field: string) {
  const timestamp = value instanceof Date && !Number.isNaN(value.valueOf())
    ? value.toISOString()
    : value;

  if (!isAnalyticsTimestamp(timestamp)) {
    throw new TypeError(`Analytics row has an invalid ${field}.`);
  }

  return timestamp;
}

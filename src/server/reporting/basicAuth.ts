import { timingSafeEqual } from "node:crypto";

export type AnalyticsAuthState = "authorized" | "misconfigured" | "unauthorized";

export type AnalyticsCredentials = {
  password?: string;
  username?: string;
};

function safeStringEqual(supplied: string, expected: string) {
  const suppliedBytes = Buffer.from(supplied);
  const expectedBytes = Buffer.from(expected);
  const comparisonLength = Math.max(suppliedBytes.length, expectedBytes.length, 1);
  const suppliedComparison = Buffer.alloc(comparisonLength);
  const expectedComparison = Buffer.alloc(comparisonLength);

  suppliedBytes.copy(suppliedComparison);
  expectedBytes.copy(expectedComparison);

  return suppliedBytes.length === expectedBytes.length
    && timingSafeEqual(suppliedComparison, expectedComparison);
}

function getBasicToken(authorization: string | null) {
  const match = authorization?.match(/^\s*Basic\s+([^\s]+)\s*$/i);

  return match?.[1] ?? "";
}

export function getAnalyticsAuthState(
  authorization: string | null,
  credentials: AnalyticsCredentials,
): AnalyticsAuthState {
  const { password, username } = credentials;

  if (!username || !password) {
    return "misconfigured";
  }

  const suppliedToken = getBasicToken(authorization);
  const expectedToken = Buffer.from(`${username}:${password}`).toString("base64");

  return safeStringEqual(suppliedToken, expectedToken)
    ? "authorized"
    : "unauthorized";
}

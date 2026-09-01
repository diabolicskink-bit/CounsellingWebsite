import { timingSafeEqual } from "node:crypto";
import { next } from "@vercel/functions";

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

const protectedResponseHeaders = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function sendUnavailable() {
  return new Response("Analytics is unavailable.", {
    status: 503,
    headers: protectedResponseHeaders,
  });
}

function requestAuthentication() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      ...protectedResponseHeaders,
      "WWW-Authenticate": 'Basic realm="Vive analytics", charset="UTF-8"',
    },
  });
}

export default function protectAnalytics(request: Request) {
  const authState = getAnalyticsAuthState(
    request.headers.get("authorization"),
    {
      password: process.env.ANALYTICS_PASSWORD,
      username: process.env.ANALYTICS_USERNAME,
    },
  );

  if (authState === "misconfigured") {
    console.error("Analytics authentication is not configured.");
    return sendUnavailable();
  }

  if (authState === "unauthorized") {
    return requestAuthentication();
  }

  return next({ headers: protectedResponseHeaders });
}

export const config = {
  matcher: ["/analytics/:path*", "/api/analytics/:path*"],
  runtime: "nodejs",
};

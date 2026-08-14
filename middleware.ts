import { next } from "@vercel/functions";
import { getAnalyticsAuthState } from "./src/server/reporting/basicAuth.ts";

const protectedResponseHeaders = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function sendUnavailable() {
  return new Response("Visit reporting is unavailable.", {
    status: 503,
    headers: protectedResponseHeaders,
  });
}

function requestAuthentication() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      ...protectedResponseHeaders,
      "WWW-Authenticate": 'Basic realm="Vive visit reporting", charset="UTF-8"',
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
    console.error("Visit reporting authentication is not configured.");
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

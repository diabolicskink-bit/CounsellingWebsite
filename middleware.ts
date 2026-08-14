import { next } from "@vercel/functions";
import { getVisitReportAuthState } from "./src/server/reporting/basicAuth.ts";

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

export default function protectVisitReporting(request: Request) {
  const authState = getVisitReportAuthState(
    request.headers.get("authorization"),
    {
      password: process.env.VISIT_REPORT_PASSWORD,
      username: process.env.VISIT_REPORT_USERNAME,
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
  matcher: ["/visit-report/:path*", "/api/visit-report/:path*"],
  runtime: "nodejs",
};

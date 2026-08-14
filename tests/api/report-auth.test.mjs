import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import protectVisitReporting, { config } from "../../middleware.ts";
import { getVisitReportAuthState } from "../../src/server/reporting/basicAuth.ts";

const originalConsoleError = console.error;
const originalPassword = process.env.VISIT_REPORT_PASSWORD;
const originalUsername = process.env.VISIT_REPORT_USERNAME;

afterEach(() => {
  console.error = originalConsoleError;

  if (originalPassword === undefined) delete process.env.VISIT_REPORT_PASSWORD;
  else process.env.VISIT_REPORT_PASSWORD = originalPassword;

  if (originalUsername === undefined) delete process.env.VISIT_REPORT_USERNAME;
  else process.env.VISIT_REPORT_USERNAME = originalUsername;
});

function basicAuthorization(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

test("authorizes the exact configured reporting credentials", () => {
  assert.equal(
    getVisitReportAuthState(
      basicAuthorization("report-owner", "correct:horse:battery"),
      { username: "report-owner", password: "correct:horse:battery" },
    ),
    "authorized",
  );
});

test("accepts the Basic authentication scheme case-insensitively", () => {
  const authorization = basicAuthorization("report-owner", "secret").replace("Basic", "basic");

  assert.equal(
    getVisitReportAuthState(authorization, { username: "report-owner", password: "secret" }),
    "authorized",
  );
});

test("rejects missing, malformed, and incorrect authorization", () => {
  const credentials = { username: "report-owner", password: "secret" };

  assert.equal(getVisitReportAuthState(null, credentials), "unauthorized");
  assert.equal(getVisitReportAuthState("Bearer secret", credentials), "unauthorized");
  assert.equal(getVisitReportAuthState("Basic not-the-token", credentials), "unauthorized");
  assert.equal(
    getVisitReportAuthState(basicAuthorization("someone-else", "secret"), credentials),
    "unauthorized",
  );
  assert.equal(
    getVisitReportAuthState(basicAuthorization("report-owner", "incorrect"), credentials),
    "unauthorized",
  );
});

test("fails closed when either reporting credential is missing", () => {
  const authorization = basicAuthorization("report-owner", "secret");

  assert.equal(getVisitReportAuthState(authorization, {}), "misconfigured");
  assert.equal(
    getVisitReportAuthState(authorization, { username: "report-owner" }),
    "misconfigured",
  );
  assert.equal(
    getVisitReportAuthState(authorization, { password: "secret" }),
    "misconfigured",
  );
});

test("middleware protects only the reporting page and reporting API", () => {
  assert.deepEqual(config, {
    matcher: ["/visit-report/:path*", "/api/visit-report/:path*"],
    runtime: "nodejs",
  });
});

test("middleware challenges unauthorized requests and passes authorized requests onward", () => {
  process.env.VISIT_REPORT_USERNAME = "report-owner";
  process.env.VISIT_REPORT_PASSWORD = "secret";

  const unauthorized = protectVisitReporting(new Request("https://example.test/visit-report"));
  const authorized = protectVisitReporting(new Request("https://example.test/visit-report", {
    headers: { authorization: basicAuthorization("report-owner", "secret") },
  }));

  assert.equal(unauthorized.status, 401);
  assert.equal(
    unauthorized.headers.get("www-authenticate"),
    'Basic realm="Vive visit reporting", charset="UTF-8"',
  );
  assert.equal(unauthorized.headers.get("cache-control"), "private, no-store");
  assert.equal(authorized.status, 200);
  assert.equal(authorized.headers.get("x-middleware-next"), "1");
  assert.equal(authorized.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
});

test("middleware returns an unavailable response when credentials are not configured", () => {
  delete process.env.VISIT_REPORT_USERNAME;
  delete process.env.VISIT_REPORT_PASSWORD;
  console.error = () => {};

  const response = protectVisitReporting(new Request("https://example.test/visit-report"));

  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("www-authenticate"), null);
});

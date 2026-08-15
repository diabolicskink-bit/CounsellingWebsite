import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import protectAnalytics, { config, getAnalyticsAuthState } from "../../middleware.ts";

const originalConsoleError = console.error;
const originalPassword = process.env.ANALYTICS_PASSWORD;
const originalUsername = process.env.ANALYTICS_USERNAME;

afterEach(() => {
  console.error = originalConsoleError;

  if (originalPassword === undefined) delete process.env.ANALYTICS_PASSWORD;
  else process.env.ANALYTICS_PASSWORD = originalPassword;

  if (originalUsername === undefined) delete process.env.ANALYTICS_USERNAME;
  else process.env.ANALYTICS_USERNAME = originalUsername;
});

function basicAuthorization(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

test("authorizes the exact configured reporting credentials", () => {
  assert.equal(
    getAnalyticsAuthState(
      basicAuthorization("report-owner", "correct:horse:battery"),
      { username: "report-owner", password: "correct:horse:battery" },
    ),
    "authorized",
  );
});

test("accepts the Basic authentication scheme case-insensitively", () => {
  const authorization = basicAuthorization("report-owner", "secret").replace("Basic", "basic");

  assert.equal(
    getAnalyticsAuthState(authorization, { username: "report-owner", password: "secret" }),
    "authorized",
  );
});

test("rejects missing, malformed, and incorrect authorization", () => {
  const credentials = { username: "report-owner", password: "secret" };

  assert.equal(getAnalyticsAuthState(null, credentials), "unauthorized");
  assert.equal(getAnalyticsAuthState("Bearer secret", credentials), "unauthorized");
  assert.equal(getAnalyticsAuthState("Basic not-the-token", credentials), "unauthorized");
  assert.equal(
    getAnalyticsAuthState(basicAuthorization("someone-else", "secret"), credentials),
    "unauthorized",
  );
  assert.equal(
    getAnalyticsAuthState(basicAuthorization("report-owner", "incorrect"), credentials),
    "unauthorized",
  );
});

test("fails closed when either reporting credential is missing", () => {
  const authorization = basicAuthorization("report-owner", "secret");

  assert.equal(getAnalyticsAuthState(authorization, {}), "misconfigured");
  assert.equal(
    getAnalyticsAuthState(authorization, { username: "report-owner" }),
    "misconfigured",
  );
  assert.equal(
    getAnalyticsAuthState(authorization, { password: "secret" }),
    "misconfigured",
  );
});

test("middleware protects only the reporting page and reporting API", () => {
  assert.deepEqual(config, {
    matcher: ["/analytics/:path*", "/api/analytics/:path*"],
    runtime: "nodejs",
  });
});

test("middleware challenges unauthorized requests and passes authorized requests onward", () => {
  process.env.ANALYTICS_USERNAME = "report-owner";
  process.env.ANALYTICS_PASSWORD = "secret";

  const unauthorized = protectAnalytics(new Request("https://example.test/analytics"));
  const authorized = protectAnalytics(new Request("https://example.test/analytics", {
    headers: { authorization: basicAuthorization("report-owner", "secret") },
  }));

  assert.equal(unauthorized.status, 401);
  assert.equal(
    unauthorized.headers.get("www-authenticate"),
    'Basic realm="Vive analytics", charset="UTF-8"',
  );
  assert.equal(unauthorized.headers.get("cache-control"), "private, no-store");
  assert.equal(authorized.status, 200);
  assert.equal(authorized.headers.get("x-middleware-next"), "1");
  assert.equal(authorized.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
});

test("middleware returns an unavailable response when credentials are not configured", () => {
  delete process.env.ANALYTICS_USERNAME;
  delete process.env.ANALYTICS_PASSWORD;
  console.error = () => {};

  const response = protectAnalytics(new Request("https://example.test/analytics"));

  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("www-authenticate"), null);
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { createVisitHandler } from "../../../api/visit.ts";
import {
  PageViewIdentityConflictError,
  VisitDatabaseConfigurationError,
  VisitIdentityConflictError,
} from "../../../src/server/visits/repository.ts";
import { getVisitRequestEnvironment } from "../../../src/server/visits/request.ts";

const nonBotClassification = {
  botCategory: null,
  botName: null,
  isBot: false,
};
const desktopUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36";

function createResponse() {
  const result = {
    body: undefined,
    ended: false,
    headers: {},
    statusCode: 200,
  };

  const response = {
    end() {
      result.ended = true;
      return result;
    },
    json(body) {
      result.body = body;
      return result;
    },
    setHeader(name, value) {
      result.headers[name.toLowerCase()] = value;
    },
    status(statusCode) {
      result.statusCode = statusCode;
      return response;
    },
  };

  return { response, result };
}

function validPayload(overrides = {}) {
  return {
    adCode: "enm",
    gclid: "CjwK-test-click",
    isWebDriver: false,
    landingPath: "/polyamory-enm-counselling",
    matchType: "p",
    matchedKeyword: "polyamory therapy",
    networkCode: "g",
    pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    path: "/polyamory-enm-counselling",
    referrerUrl: "https://WWW.Google.com/search?q=sensitive-test-value",
    visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
    visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
    ...overrides,
  };
}

function jsonHeaders(headers = {}) {
  return {
    "content-type": "application/json; charset=utf-8",
    "sec-ch-ua-mobile": "?0",
    "user-agent": desktopUserAgent,
    ...headers,
  };
}

function silenceExpectedLogs(context) {
  const errors = [];
  const warnings = [];

  context.mock.method(console, "error", (...args) => errors.push(args));
  context.mock.method(console, "warn", (...args) => warnings.push(args));

  return { errors, warnings };
}

function createTestVisitHandler(recordObservation, classifyBot = async () => nonBotClassification) {
  return createVisitHandler(recordObservation, classifyBot);
}

async function invoke(handler, { body = validPayload(), headers = jsonHeaders(), method = "POST" } = {}) {
  const { response, result } = createResponse();
  const returned = await handler({ body, headers, method }, response);

  return returned ?? result;
}

test("records valid observations with same-origin or omitted origin signals", async () => {
  const observations = [];
  const handler = createTestVisitHandler(async (observation) => {
    observations.push(observation);
    return { pageViewInserted: true };
  });

  const results = [
    await invoke(handler),
    await invoke(handler, {
      headers: jsonHeaders({
        host: "vivecounselling.com.au",
        origin: "https://vivecounselling.com.au",
        "sec-fetch-site": "same-origin",
        "x-forwarded-proto": "https",
      }),
    }),
  ];

  for (const result of results) {
    assert.equal(result.statusCode, 204);
    assert.equal(result.ended, true);
    assert.equal(result.body, undefined);
    assert.equal(result.headers["cache-control"], "no-store");
  }

  const expectedObservation = {
    ...validPayload(),
    ...nonBotClassification,
    deviceType: "desktop",
    referrerHost: "www.google.com",
    userAgent: desktopUserAgent,
  };
  assert.deepEqual(observations, [expectedObservation, expectedObservation]);
});

test("derives bounded device and user-agent values from request headers", () => {
  const mobileUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1";
  const tabletUserAgent = "Mozilla/5.0 (Linux; Android 15; Tablet) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36";

  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {
      "sec-ch-ua-mobile": "?1",
      "user-agent": mobileUserAgent,
    } }),
    { deviceType: "mobile", userAgent: mobileUserAgent },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {
      "sec-ch-ua-mobile": "?0",
      "user-agent": tabletUserAgent,
    } }),
    { deviceType: "tablet", userAgent: tabletUserAgent },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: { "user-agent": desktopUserAgent } }),
    { deviceType: "desktop", userAgent: desktopUserAgent },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {} }),
    { deviceType: "unknown", userAgent: null },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: { "user-agent": "x".repeat(1025) } }),
    { deviceType: "unknown", userAgent: "x".repeat(1024) },
  );
});

test("preserves true and omitted WebDriver states", async () => {
  const observations = [];
  const handler = createTestVisitHandler(async (observation) => observations.push(observation));
  const olderPayload = validPayload();

  delete olderPayload.isWebDriver;
  const results = [
    await invoke(handler, { body: validPayload({ isWebDriver: true }) }),
    await invoke(handler, { body: olderPayload }),
  ];

  assert.ok(results.every((result) => result.statusCode === 204));
  assert.deepEqual(observations.map(({ isWebDriver }) => isWebDriver), [true, null]);
});

test("stores a verified bot verdict and identity without blocking the visit", async () => {
  const observations = [];
  const handler = createTestVisitHandler(
    async (observation) => observations.push(observation),
    async () => ({
      botCategory: "search engine",
      botName: "googlebot",
      isBot: true,
    }),
  );

  const result = await invoke(handler);

  assert.equal(result.statusCode, 204);
  assert.equal(observations[0].isBot, true);
  assert.equal(observations[0].botName, "googlebot");
  assert.equal(observations[0].botCategory, "search engine");
});

test("records an unclassified visit when bot detection is unavailable", async (context) => {
  const { warnings } = silenceExpectedLogs(context);
  const observations = [];
  const handler = createTestVisitHandler(
    async (observation) => observations.push(observation),
    async () => {
      throw new Error("private bot provider detail");
    },
  );

  const result = await invoke(handler);

  assert.equal(result.statusCode, 204);
  assert.equal(observations[0].isBot, null);
  assert.equal(observations[0].botName, null);
  assert.equal(observations[0].botCategory, null);
  assert.match(JSON.stringify(warnings), /Visit bot classification unavailable/);
  assert.doesNotMatch(JSON.stringify(warnings), /private bot provider detail/);
});

test("normalizes absent optional fields and route casing", async () => {
  const observations = [];
  const handler = createTestVisitHandler(async (observation) => observations.push(observation));

  const result = await invoke(handler, {
    body: validPayload({
      adCode: undefined,
      gclid: undefined,
      matchType: undefined,
      matchedKeyword: undefined,
      networkCode: undefined,
      landingPath: "/Contact",
      path: "/Working-With-Joel",
      referrerUrl: "",
    }),
  });

  assert.equal(result.statusCode, 204);
  assert.equal(observations.length, 1);
  assert.equal(observations[0].adCode, null);
  assert.equal(observations[0].gclid, null);
  assert.equal(observations[0].landingPath, "/contact");
  assert.equal(observations[0].path, "/working-with-joel");
  assert.equal(observations[0].referrerHost, null);
  assert.equal(observations[0].referrerUrl, null);
});

test("rejects unsupported methods and malformed request bodies before storage", async (context) => {
  silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createTestVisitHandler(async () => {
    recordCalled = true;
  });
  const cases = [
    { expectedStatus: 405, request: { method: "GET" } },
    {
      expectedStatus: 415,
      request: { body: JSON.stringify(validPayload()), headers: { "content-type": "text/plain" } },
    },
    {
      expectedStatus: 400,
      request: { headers: jsonHeaders({ "content-length": "invalid" }) },
    },
    {
      expectedStatus: 413,
      request: { headers: jsonHeaders({ "content-length": String(16 * 1024 + 1) }) },
    },
    {
      expectedStatus: 413,
      request: { body: validPayload({ ignored: "x".repeat(16 * 1024) }) },
    },
    { expectedStatus: 400, request: { body: "{" } },
  ];

  for (const { expectedStatus, request } of cases) {
    const result = await invoke(handler, request);

    assert.equal(result.statusCode, expectedStatus);
    assert.equal(result.headers["cache-control"], "no-store");
    assert.deepEqual(result.body, { error: "Visit could not be recorded." });

    if (expectedStatus === 405) {
      assert.equal(result.headers.allow, "POST");
    }
  }

  assert.equal(recordCalled, false);
});

test("rejects cross-site request signals before storage", async (context) => {
  const { warnings } = silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createTestVisitHandler(async () => {
    recordCalled = true;
  });

  const fetchSiteResult = await invoke(handler, {
    headers: jsonHeaders({ "sec-fetch-site": "cross-site" }),
  });
  const originResult = await invoke(handler, {
    headers: jsonHeaders({
      host: "vivecounselling.com.au",
      origin: "https://attacker.example",
      "x-forwarded-proto": "https",
    }),
  });
  const refererResult = await invoke(handler, {
    headers: jsonHeaders({
      host: "vivecounselling.com.au",
      referer: "https://attacker.example/private-path?secret=value",
      "x-forwarded-proto": "https",
    }),
  });

  assert.equal(fetchSiteResult.statusCode, 403);
  assert.equal(originResult.statusCode, 403);
  assert.equal(refererResult.statusCode, 403);
  assert.equal(recordCalled, false);
  assert.match(JSON.stringify(warnings), /cross_site_fetch_site|mismatched_origin|mismatched_referer/);
  assert.doesNotMatch(JSON.stringify(warnings), /private-path|secret=value/);
});

test("rejects invalid identities, paths, referrers, and oversized attribution", async (context) => {
  const { warnings } = silenceExpectedLogs(context);
  const observations = [];
  const handler = createTestVisitHandler(async (observation) => observations.push(observation));
  const payloads = [
    validPayload({ visitorId: "not-a-uuid" }),
    validPayload({ path: "/contact?message=secret" }),
    validPayload({ path: "/ANALYTICS/pages" }),
    validPayload({ referrerUrl: "javascript:alert(1)" }),
    validPayload({ matchedKeyword: "x".repeat(1025) }),
    validPayload({ isWebDriver: "true" }),
  ];

  for (const body of payloads) {
    const result = await invoke(handler, { body });
    assert.equal(result.statusCode, 400);
    assert.deepEqual(result.body, { error: "Visit could not be recorded." });
  }

  assert.equal(observations.length, 0);
  assert.doesNotMatch(JSON.stringify(warnings), /secret|javascript|xxxxx/);
});

test("maps identity conflicts to a generic conflict response", async (context) => {
  const { warnings } = silenceExpectedLogs(context);

  for (const error of [new VisitIdentityConflictError(), new PageViewIdentityConflictError()]) {
    const handler = createTestVisitHandler(async () => {
      throw error;
    });
    const result = await invoke(handler);

    assert.equal(result.statusCode, 409);
    assert.deepEqual(result.body, { error: "Visit could not be recorded." });
  }

  assert.doesNotMatch(JSON.stringify(warnings), /anonymous visitor|another visit/);
});

test("keeps database configuration and runtime failures out of public responses", async (context) => {
  const { errors } = silenceExpectedLogs(context);
  const failures = [
    new VisitDatabaseConfigurationError(),
    new Error("postgres://user:password@private-host/database"),
  ];

  for (const error of failures) {
    const handler = createTestVisitHandler(async () => {
      throw error;
    });
    const result = await invoke(handler);

    assert.equal(result.statusCode, 500);
    assert.deepEqual(result.body, { error: "Visit could not be recorded." });
  }

  assert.doesNotMatch(
    JSON.stringify(errors),
    /sensitive-test-value|polyamory therapy|CjwK-test-click|password|private-host/,
  );
});

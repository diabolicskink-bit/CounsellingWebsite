import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createVisitHandler } from "../../api/visit.ts";
import {
  PageViewIdentityConflictError,
  VisitDatabaseConfigurationError,
  VisitIdentityConflictError,
} from "../../src/server/visits/repository.ts";

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const nonBotClassification = {
  botCategory: null,
  botName: null,
  isBot: false,
};

afterEach(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

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
    ...headers,
  };
}

function silenceExpectedLogs() {
  const errors = [];
  const warnings = [];

  console.error = (...args) => errors.push(args.map(String).join(" "));
  console.warn = (...args) => warnings.push(args);

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

test("records a valid observation and returns no content", async () => {
  const observations = [];
  const handler = createTestVisitHandler(async (observation) => {
    observations.push(observation);
    return { pageViewInserted: true };
  });

  const result = await invoke(handler);

  assert.equal(result.statusCode, 204);
  assert.equal(result.ended, true);
  assert.equal(result.body, undefined);
  assert.equal(result.headers["cache-control"], "no-store");
  assert.equal(observations.length, 1);
  assert.deepEqual(observations[0], {
    ...validPayload(),
    ...nonBotClassification,
    referrerHost: "www.google.com",
  });
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

test("records an unclassified visit when bot detection is unavailable", async () => {
  const { warnings } = silenceExpectedLogs();
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

test("returns the same success for an idempotent repeated observation", async () => {
  const handler = createTestVisitHandler(async () => ({ pageViewInserted: false }));

  const result = await invoke(handler);

  assert.equal(result.statusCode, 204);
  assert.equal(result.body, undefined);
});

test("does not expose a read method", async () => {
  let recordCalled = false;
  const handler = createTestVisitHandler(async () => {
    recordCalled = true;
  });

  const result = await invoke(handler, { method: "GET" });

  assert.equal(result.statusCode, 405);
  assert.equal(result.headers.allow, "POST");
  assert.deepEqual(result.body, { error: "Visit could not be recorded." });
  assert.equal(recordCalled, false);
});

test("rejects unsupported and missing content types before storage", async () => {
  const { warnings } = silenceExpectedLogs();
  let recordCalled = false;
  const handler = createTestVisitHandler(async () => {
    recordCalled = true;
  });

  const textResult = await invoke(handler, {
    body: JSON.stringify(validPayload()),
    headers: { "content-type": "text/plain" },
  });
  const missingResult = await invoke(handler, { headers: {} });

  assert.equal(textResult.statusCode, 415);
  assert.equal(missingResult.statusCode, 415);
  assert.equal(recordCalled, false);
  assert.match(JSON.stringify(warnings), /unsupported_content_type/);
});

test("rejects oversized declared and parsed request bodies", async () => {
  silenceExpectedLogs();
  const handler = createTestVisitHandler(async () => {
    throw new Error("storage should not be called");
  });

  const declaredResult = await invoke(handler, {
    headers: jsonHeaders({ "content-length": String(16 * 1024 + 1) }),
  });
  const parsedResult = await invoke(handler, {
    body: validPayload({ ignored: "x".repeat(16 * 1024) }),
  });

  assert.equal(declaredResult.statusCode, 413);
  assert.equal(parsedResult.statusCode, 413);
});

test("rejects cross-site request signals before storage", async () => {
  const { warnings } = silenceExpectedLogs();
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

test("accepts a same-origin production-shaped request", async () => {
  let recordCalled = false;
  const handler = createTestVisitHandler(async () => {
    recordCalled = true;
  });

  const result = await invoke(handler, {
    headers: jsonHeaders({
      host: "vivecounselling.com.au",
      origin: "https://vivecounselling.com.au",
      "sec-fetch-site": "same-origin",
      "x-forwarded-proto": "https",
    }),
  });

  assert.equal(result.statusCode, 204);
  assert.equal(recordCalled, true);
});

test("rejects invalid identities, paths, referrers, and oversized attribution", async () => {
  const { warnings } = silenceExpectedLogs();
  const observations = [];
  const handler = createTestVisitHandler(async (observation) => observations.push(observation));
  const payloads = [
    validPayload({ visitorId: "not-a-uuid" }),
    validPayload({ path: "/contact?message=secret" }),
    validPayload({ landingPath: "/Analytics", path: "/Analytics" }),
    validPayload({ path: "/ANALYTICS/pages" }),
    validPayload({ referrerUrl: "javascript:alert(1)" }),
    validPayload({ matchedKeyword: "x".repeat(1025) }),
  ];

  for (const body of payloads) {
    const result = await invoke(handler, { body });
    assert.equal(result.statusCode, 400);
    assert.deepEqual(result.body, { error: "Visit could not be recorded." });
  }

  assert.equal(observations.length, 0);
  assert.doesNotMatch(JSON.stringify(warnings), /secret|javascript|xxxxx/);
});

test("maps identity conflicts to a generic conflict response", async () => {
  const { warnings } = silenceExpectedLogs();

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

test("keeps database configuration and runtime failures out of public responses", async () => {
  const { errors } = silenceExpectedLogs();
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

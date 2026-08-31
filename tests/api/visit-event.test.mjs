import assert from "node:assert/strict";
import { test } from "node:test";
import { createVisitEventHandler } from "../../api/visit-event.ts";
import {
  VisitEventIdentityConflictError,
  VisitEventPageViewConflictError,
  VisitEventVisitConflictError,
} from "../../src/server/visit-events/repository.ts";
import { VisitDatabaseConfigurationError } from "../../src/server/visits/repository.ts";

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
    eventId: "f1c7f928-4532-4a77-9734-2d606d064687",
    eventType: "contact_option_selected",
    pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    properties: { option: "appointment" },
    visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
    ...overrides,
  };
}

function jsonHeaders(headers = {}) {
  return {
    "content-type": "application/json; charset=utf-8",
    ...headers,
  };
}

function silenceExpectedLogs(context) {
  const errors = [];
  const logs = [];
  const warnings = [];

  context.mock.method(console, "error", (...args) => errors.push(args));
  context.mock.method(console, "log", (...args) => logs.push(args));
  context.mock.method(console, "warn", (...args) => warnings.push(args));

  return { errors, logs, warnings };
}

async function invoke(
  handler,
  { body = validPayload(), headers = jsonHeaders(), method = "POST" } = {},
) {
  const { response, result } = createResponse();
  const returned = await handler({ body, headers, method }, response);

  return returned ?? result;
}

test("records a controlled client event and returns no content", async (context) => {
  silenceExpectedLogs(context);
  const observations = [];
  const handler = createVisitEventHandler(async (observation) => {
    observations.push(observation);
    return { eventInserted: true };
  });

  const result = await invoke(handler);

  assert.equal(result.statusCode, 204);
  assert.equal(result.ended, true);
  assert.equal(result.body, undefined);
  assert.equal(result.headers["cache-control"], "no-store");
  assert.deepEqual(observations, [{ ...validPayload(), source: "client" }]);
});

test("normalizes an omitted page view to null", async (context) => {
  silenceExpectedLogs(context);
  const observations = [];
  const handler = createVisitEventHandler(async (observation) => observations.push(observation));
  const { pageViewId: _pageViewId, ...payload } = validPayload({
    eventType: "enquiry_started",
    properties: {},
  });

  const result = await invoke(handler, { body: payload });

  assert.equal(result.statusCode, 204);
  assert.equal(observations[0].pageViewId, null);
  assert.equal(observations[0].eventType, "enquiry_started");
});

test("rejects server-owned event types at the public endpoint", async (context) => {
  const { warnings } = silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createVisitEventHandler(async () => {
    recordCalled = true;
  });

  for (const eventType of [
    "enquiry_submit_attempted",
    "enquiry_sent",
    "enquiry_failed",
  ]) {
    const result = await invoke(handler, {
      body: validPayload({ eventType, properties: {} }),
    });

    assert.equal(result.statusCode, 400);
    assert.deepEqual(result.body, { error: "Visit event could not be recorded." });
  }

  assert.equal(recordCalled, false);
  assert.match(JSON.stringify(warnings), /eventType/);
});

test("rejects unknown properties, option values, and top-level fields", async (context) => {
  silenceExpectedLogs(context);
  const observations = [];
  const handler = createVisitEventHandler(async (observation) => observations.push(observation));
  const payloads = [
    validPayload({ properties: { option: "appointment", privateValue: "do not store" } }),
    validPayload({ properties: { option: "unknown" } }),
    validPayload({ ignored: "unexpected" }),
    validPayload({ eventType: "enquiry_started", properties: { option: "appointment" } }),
  ];

  for (const body of payloads) {
    const result = await invoke(handler, { body });
    assert.equal(result.statusCode, 400);
  }

  assert.equal(observations.length, 0);
});

test("rejects invalid event, visit, and page-view identities", async (context) => {
  silenceExpectedLogs(context);
  const observations = [];
  const handler = createVisitEventHandler(async (observation) => observations.push(observation));

  for (const body of [
    validPayload({ eventId: "not-a-uuid" }),
    validPayload({ visitId: "not-a-uuid" }),
    validPayload({ pageViewId: "not-a-uuid" }),
  ]) {
    const result = await invoke(handler, { body });
    assert.equal(result.statusCode, 400);
  }

  assert.equal(observations.length, 0);
});

test("does not expose a read method", async (context) => {
  silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createVisitEventHandler(async () => {
    recordCalled = true;
  });

  const result = await invoke(handler, { method: "GET" });

  assert.equal(result.statusCode, 405);
  assert.equal(result.headers.allow, "POST");
  assert.deepEqual(result.body, { error: "Visit event could not be recorded." });
  assert.equal(recordCalled, false);
});

test("rejects unsupported and oversized request bodies", async (context) => {
  silenceExpectedLogs(context);
  const handler = createVisitEventHandler(async () => {
    throw new Error("storage should not be called");
  });

  const contentTypeResult = await invoke(handler, {
    body: JSON.stringify(validPayload()),
    headers: { "content-type": "text/plain" },
  });
  const declaredResult = await invoke(handler, {
    headers: jsonHeaders({ "content-length": String(4 * 1024 + 1) }),
  });
  const parsedResult = await invoke(handler, {
    body: validPayload({ ignored: "x".repeat(4 * 1024) }),
  });

  assert.equal(contentTypeResult.statusCode, 415);
  assert.equal(declaredResult.statusCode, 413);
  assert.equal(parsedResult.statusCode, 413);
});

test("rejects cross-site request signals before storage", async (context) => {
  const { warnings } = silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createVisitEventHandler(async () => {
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
      referer: "https://attacker.example/private?secret=value",
      "x-forwarded-proto": "https",
    }),
  });

  assert.equal(fetchSiteResult.statusCode, 403);
  assert.equal(originResult.statusCode, 403);
  assert.equal(refererResult.statusCode, 403);
  assert.equal(recordCalled, false);
  assert.match(JSON.stringify(warnings), /cross_site_fetch_site|mismatched_origin|mismatched_referer/);
  assert.doesNotMatch(JSON.stringify(warnings), /private|secret/);
});

test("accepts a same-origin production-shaped request", async (context) => {
  silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createVisitEventHandler(async () => {
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

test("maps visit, page-view, and event conflicts to a generic response", async (context) => {
  const { warnings } = silenceExpectedLogs(context);

  for (const error of [
    new VisitEventVisitConflictError(),
    new VisitEventPageViewConflictError(),
    new VisitEventIdentityConflictError(),
  ]) {
    const handler = createVisitEventHandler(async () => {
      throw error;
    });
    const result = await invoke(handler);

    assert.equal(result.statusCode, 409);
    assert.deepEqual(result.body, { error: "Visit event could not be recorded." });
  }

  assert.doesNotMatch(JSON.stringify(warnings), /does not exist|does not belong|another visit/);
});

test("keeps database configuration and runtime failures out of public responses", async (context) => {
  const { errors } = silenceExpectedLogs(context);

  for (const error of [
    new VisitDatabaseConfigurationError(),
    new Error("postgres://user:password@private-host/database"),
  ]) {
    const handler = createVisitEventHandler(async () => {
      throw error;
    });
    const result = await invoke(handler);

    assert.equal(result.statusCode, 500);
    assert.deepEqual(result.body, { error: "Visit event could not be recorded." });
  }

  assert.doesNotMatch(JSON.stringify(errors), /password|private-host/);
});

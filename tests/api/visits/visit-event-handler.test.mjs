import assert from "node:assert/strict";
import { test } from "node:test";
import { createVisitEventHandler } from "../../../api/visit-event.ts";
import {
  VisitEventIdentityConflictError,
  VisitEventPageViewConflictError,
  VisitEventVisitConflictError,
} from "../../../src/server/visit-events/repository.ts";
import { VisitDatabaseConfigurationError } from "../../../src/server/visits/repository.ts";

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
  const warnings = [];

  context.mock.method(console, "error", (...args) => errors.push(args));
  context.mock.method(console, "log", () => {});
  context.mock.method(console, "warn", (...args) => warnings.push(args));

  return { errors, warnings };
}

async function invoke(
  handler,
  { body = validPayload(), headers = jsonHeaders(), method = "POST" } = {},
) {
  const { response, result } = createResponse();
  const returned = await handler({ body, headers, method }, response);

  return returned ?? result;
}

test("records controlled client events with or without page context", async (context) => {
  silenceExpectedLogs(context);
  const observations = [];
  const handler = createVisitEventHandler(async (observation) => {
    observations.push(observation);
    return { eventInserted: true };
  });
  const { pageViewId: _pageViewId, ...withoutPageView } = validPayload({
    eventId: "8655de5b-48d1-481f-8acc-2d8ab0e33cd2",
    eventType: "enquiry_started",
    properties: {},
  });
  const linkPayloads = [
    validPayload({
      eventId: "10000000-0000-4000-8000-000000000001",
      eventType: "email_link_clicked",
      properties: {},
    }),
    validPayload({
      eventId: "10000000-0000-4000-8000-000000000002",
      eventType: "instagram_link_clicked",
      properties: {},
    }),
    validPayload({
      eventId: "10000000-0000-4000-8000-000000000003",
      eventType: "linkedin_link_clicked",
      properties: {},
    }),
  ];

  const results = [
    await invoke(handler, {
      headers: jsonHeaders({
        host: "vivecounselling.com.au",
        origin: "https://vivecounselling.com.au",
        "sec-fetch-site": "same-origin",
        "x-forwarded-proto": "https",
      }),
    }),
    await invoke(handler, { body: withoutPageView }),
  ];

  for (const payload of linkPayloads) {
    results.push(await invoke(handler, { body: payload }));
  }

  for (const result of results) {
    assert.equal(result.statusCode, 204);
    assert.equal(result.ended, true);
    assert.equal(result.body, undefined);
    assert.equal(result.headers["cache-control"], "no-store");
  }

  assert.deepEqual(observations, [
    { ...validPayload(), source: "client" },
    { ...withoutPageView, pageViewId: null, source: "client" },
    ...linkPayloads.map((payload) => ({ ...payload, source: "client" })),
  ]);
});

test("rejects events outside the public client contract before storage", async (context) => {
  silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createVisitEventHandler(async () => {
    recordCalled = true;
  });
  const payloads = [
    ...[
      "enquiry_submit_attempted",
      "enquiry_sent",
      "enquiry_failed",
    ].map((eventType) => validPayload({ eventType, properties: {} })),
    ...[
      "email_link_clicked",
      "instagram_link_clicked",
      "linkedin_link_clicked",
    ].map((eventType) => validPayload({
      eventType,
      properties: { unexpected: "value" },
    })),
    validPayload({ eventType: "uncontrolled_event", properties: {} }),
    validPayload({ properties: { option: "appointment", privateValue: "do not store" } }),
    validPayload({ properties: { option: "unknown" } }),
    validPayload({ ignored: "unexpected" }),
    validPayload({ eventType: "enquiry_started", properties: { option: "appointment" } }),
    validPayload({ eventId: "not-a-uuid" }),
    validPayload({ visitId: "not-a-uuid" }),
    validPayload({ pageViewId: "not-a-uuid" }),
    "{",
  ];

  for (const body of payloads) {
    const result = await invoke(handler, { body });

    assert.equal(result.statusCode, 400);
    assert.deepEqual(result.body, { error: "Visit event could not be recorded." });
  }

  assert.equal(recordCalled, false);
});

test("rejects unsupported methods and malformed request bodies before storage", async (context) => {
  silenceExpectedLogs(context);
  let recordCalled = false;
  const handler = createVisitEventHandler(async () => {
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
      request: { headers: jsonHeaders({ "content-length": String(4 * 1024 + 1) }) },
    },
    {
      expectedStatus: 413,
      request: { body: validPayload({ ignored: "x".repeat(4 * 1024) }) },
    },
  ];

  for (const { expectedStatus, request } of cases) {
    const result = await invoke(handler, request);

    assert.equal(result.statusCode, expectedStatus);
    assert.equal(result.headers["cache-control"], "no-store");
    assert.deepEqual(result.body, { error: "Visit event could not be recorded." });

    if (expectedStatus === 405) {
      assert.equal(result.headers.allow, "POST");
    }
  }

  assert.equal(recordCalled, false);
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

import assert from "node:assert/strict";
import { test } from "node:test";
import { createPageEngagementHandler } from "../../../api/page-engagement.ts";
import { PageEngagementIdentityConflictError } from "../../../src/server/page-engagement/repository.ts";
import { VisitDatabaseConfigurationError } from "../../../src/server/visits/repository.ts";

const validPayload = {
  activeSeconds: 47,
  pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
  visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
  visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
};

function createResponse() {
  const result = { body: undefined, ended: false, headers: {}, statusCode: 200 };
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

function jsonHeaders(headers = {}) {
  return { "content-type": "application/json", ...headers };
}

async function invoke(
  handler,
  { body = validPayload, headers = jsonHeaders(), method = "POST" } = {},
) {
  const { response, result } = createResponse();
  const returned = await handler({ body, headers, method }, response);

  return returned ?? result;
}

test("records bounded cumulative active time", async () => {
  const observations = [];
  const handler = createPageEngagementHandler(async (value) => observations.push(value));

  for (const activeSeconds of [1, 47, 43_200]) {
    const result = await invoke(handler, {
      body: { ...validPayload, activeSeconds },
    });

    assert.equal(result.statusCode, 204);
    assert.equal(result.ended, true);
    assert.equal(result.headers["cache-control"], "no-store");
  }

  assert.deepEqual(
    observations.map((observation) => observation.activeSeconds),
    [1, 47, 43_200],
  );
});

test("rejects invalid engagement payloads", async (context) => {
  context.mock.method(console, "warn", () => {});
  const observations = [];
  const handler = createPageEngagementHandler(async (value) => observations.push(value));
  const invalidBodies = [
    { ...validPayload, activeSeconds: 0 },
    { ...validPayload, activeSeconds: 43_201 },
    { ...validPayload, activeSeconds: 1.5 },
    { ...validPayload, activeSeconds: "47" },
    { ...validPayload, visitorId: "invalid" },
    { ...validPayload, extra: "not stored" },
  ];

  for (const body of invalidBodies) {
    const result = await invoke(handler, { body });
    assert.equal(result.statusCode, 400, JSON.stringify(body));
    assert.deepEqual(result.body, { error: "Page engagement could not be recorded." });
  }

  assert.equal(observations.length, 0);
});

test("enforces the write-only same-origin JSON boundary", async (context) => {
  context.mock.method(console, "warn", () => {});
  let recordCalls = 0;
  const handler = createPageEngagementHandler(async () => {
    recordCalls += 1;
  });
  const cases = [
    { expectedStatus: 405, request: { method: "GET" } },
    {
      expectedStatus: 415,
      request: { body: JSON.stringify(validPayload), headers: { "content-type": "text/plain" } },
    },
    {
      expectedStatus: 413,
      request: { headers: jsonHeaders({ "content-length": String(16 * 1024 + 1) }) },
    },
    {
      expectedStatus: 403,
      request: { headers: jsonHeaders({ "sec-fetch-site": "cross-site" }) },
    },
  ];

  for (const { expectedStatus, request } of cases) {
    const result = await invoke(handler, request);
    assert.equal(result.statusCode, expectedStatus);
    assert.equal(result.headers["cache-control"], "no-store");

    if (expectedStatus === 405) {
      assert.equal(result.headers.allow, "POST");
    }
  }

  assert.equal(recordCalls, 0);
});

test("maps identity and storage failures to generic responses", async (context) => {
  const errors = [];
  const warnings = [];
  context.mock.method(console, "error", (...args) => errors.push(args));
  context.mock.method(console, "warn", (...args) => warnings.push(args));

  for (const { error, statusCode } of [
    { error: new PageEngagementIdentityConflictError(), statusCode: 409 },
    { error: new VisitDatabaseConfigurationError(), statusCode: 500 },
    {
      error: new Error("postgres://user:password@private-host/database"),
      statusCode: 500,
    },
  ]) {
    const handler = createPageEngagementHandler(async () => {
      throw error;
    });
    const result = await invoke(handler);

    assert.equal(result.statusCode, statusCode);
    assert.equal(result.headers["cache-control"], "no-store");
    assert.deepEqual(result.body, { error: "Page engagement could not be recorded." });
  }

  assert.equal(warnings.length, 1);
  assert.equal(errors.length, 2);
  assert.doesNotMatch(JSON.stringify([errors, warnings]), /password|private-host/);
});

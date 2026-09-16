import assert from "node:assert/strict";
import { test } from "node:test";
import { createAnalyticsHandler } from "../../../api/analytics.ts";
import { AnalyticsDataUnavailableError } from "../../../src/server/reporting/database.ts";
import { createResponse } from "../support/http-response.mjs";

async function invoke(handler, request) {
  const { response, result } = createResponse();
  const returned = await handler(request, response);

  return returned ?? result;
}

test("dispatches a validated selection and returns a private response", async () => {
  const selections = [];
  const handler = createAnalyticsHandler(async (selection) => {
    selections.push(selection);
    return { type: "daily", date: "2026-08-14", visits: [] };
  });

  const result = await invoke(handler, {
    method: "GET",
    query: { date: "2026-08-14" },
  });

  assert.deepEqual(selections, [{ type: "daily", date: "2026-08-14" }]);
  assert.equal(result.statusCode, 200);
  assert.equal(result.headers["cache-control"], "private, no-store");
  assert.deepEqual(result.body, {
    data: { type: "daily", date: "2026-08-14", visits: [] },
  });
});

test("rejects unsupported methods before reading", async () => {
  let readCalls = 0;
  const handler = createAnalyticsHandler(async () => {
    readCalls += 1;
    return {};
  });

  const result = await invoke(handler, { method: "POST", query: {} });

  assert.equal(result.statusCode, 405);
  assert.equal(result.headers.allow, "GET");
  assert.equal(readCalls, 0);
});

test("rejects an invalid report selection before reading", async () => {
  let readCalls = 0;
  const handler = createAnalyticsHandler(async () => {
    readCalls += 1;
    return {};
  });

  const result = await invoke(handler, {
    method: "GET",
    query: { date: "2026-08-14", month: "2026-08" },
  });

  assert.equal(result.statusCode, 400);
  assert.equal(readCalls, 0);
});

test("keeps unavailable and unexpected reader failures generic", async (context) => {
  const errors = [];
  context.mock.method(console, "error", (...args) => errors.push(args));

  for (const { error, statusCode } of [
    { error: new AnalyticsDataUnavailableError(), statusCode: 503 },
    {
      error: new Error("postgres://user:password@private-host/database"),
      statusCode: 500,
    },
  ]) {
    const handler = createAnalyticsHandler(async () => {
      throw error;
    });
    const result = await invoke(handler, { method: "GET", query: {} });

    assert.equal(result.statusCode, statusCode);
    assert.equal(result.headers["cache-control"], "private, no-store");
    assert.deepEqual(result.body, { error: "Analytics data is unavailable." });
  }

  assert.doesNotMatch(JSON.stringify(errors), /password|private-host/);
});

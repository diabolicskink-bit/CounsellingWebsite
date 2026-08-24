import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createAnalyticsExclusionsHandler } from "../../api/analytics/exclusions.ts";
import {
  AnalyticsDataUnavailableError,
} from "../../src/server/reporting/reader.ts";
import {
  UnknownAnalyticsVisitorError,
} from "../../src/server/reporting/exclusions.ts";

const originalConsoleError = console.error;
const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";

afterEach(() => {
  console.error = originalConsoleError;
});

function createResponse() {
  const result = { body: undefined, headers: {}, statusCode: 200 };
  const response = {
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

async function invoke(handler, request) {
  const { response, result } = createResponse();
  return await handler(request, response) ?? result;
}

test("lists excluded visitors without caching", async () => {
  const handler = createAnalyticsExclusionsHandler(
    async () => ({ type: "excluded", visitors: [] }),
    async () => { throw new Error("unexpected update"); },
  );

  const result = await invoke(handler, { method: "GET", query: {} });

  assert.equal(result.statusCode, 200);
  assert.equal(result.headers["cache-control"], "private, no-store");
  assert.deepEqual(result.body, { data: { type: "excluded", visitors: [] } });
});

test("sets and removes exclusions with the exact JSON contract", async () => {
  const updates = [];
  const handler = createAnalyticsExclusionsHandler(
    async () => ({ type: "excluded", visitors: [] }),
    async (selectedVisitorId, excluded) => {
      updates.push({ excluded, visitorId: selectedVisitorId });
      return { isExcluded: excluded, visitorId: selectedVisitorId };
    },
  );

  const excluded = await invoke(handler, {
    body: { excluded: true, visitorId },
    headers: { "content-type": "application/json" },
    method: "PUT",
    query: {},
  });
  const restored = await invoke(handler, {
    body: JSON.stringify({ excluded: false, visitorId }),
    headers: { "content-type": "application/json; charset=utf-8" },
    method: "PUT",
    query: {},
  });

  assert.deepEqual(updates, [
    { excluded: true, visitorId },
    { excluded: false, visitorId },
  ]);
  assert.deepEqual(excluded.body, { data: { isExcluded: true, visitorId } });
  assert.deepEqual(restored.body, { data: { isExcluded: false, visitorId } });
});

test("returns not found when an exclusion targets an unknown visitor", async () => {
  let updateCalls = 0;
  const handler = createAnalyticsExclusionsHandler(
    async () => ({ type: "excluded", visitors: [] }),
    async () => {
      updateCalls += 1;
      throw new UnknownAnalyticsVisitorError();
    },
  );
  const unknown = await invoke(handler, {
    body: { excluded: true, visitorId },
    headers: { "content-type": "application/json" },
    method: "PUT",
  });

  assert.equal(unknown.statusCode, 404);
  assert.equal(updateCalls, 1);
});

test("keeps database failures generic", async () => {
  const errors = [];
  console.error = (...args) => errors.push(args.map(String).join(" "));
  const unavailable = createAnalyticsExclusionsHandler(
    async () => { throw new AnalyticsDataUnavailableError(); },
    async () => ({ isExcluded: true, visitorId }),
  );
  const failed = createAnalyticsExclusionsHandler(
    async () => { throw new Error("postgres://user:password@private-host/database"); },
    async () => ({ isExcluded: true, visitorId }),
  );

  const unavailableResult = await invoke(unavailable, { method: "GET" });
  const failedResult = await invoke(failed, { method: "GET" });

  assert.equal(unavailableResult.statusCode, 503);
  assert.equal(failedResult.statusCode, 500);
  assert.deepEqual(failedResult.body, { error: "Analytics exclusions are unavailable." });
  assert.doesNotMatch(JSON.stringify(errors), /password|private-host/);
});

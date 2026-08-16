import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createPageEngagementHandler } from "../../api/page-engagement.ts";

const originalConsoleWarn = console.warn;

afterEach(() => {
  console.warn = originalConsoleWarn;
});

const validPayload = {
  activeSeconds: 47,
  pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
  visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
  visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
};

function createResponse() {
  const result = { body: undefined, ended: false, headers: {}, statusCode: 200 };
  const response = {
    end() { result.ended = true; return result; },
    json(body) { result.body = body; return result; },
    setHeader(name, value) { result.headers[name.toLowerCase()] = value; },
    status(statusCode) { result.statusCode = statusCode; return response; },
  };
  return { response, result };
}

async function invoke(handler, body = validPayload) {
  const { response, result } = createResponse();
  await handler({
    body,
    headers: { "content-type": "application/json" },
    method: "POST",
  }, response);
  return result;
}

test("records a bounded cumulative active-time observation", async () => {
  const observations = [];
  const handler = createPageEngagementHandler(async (value) => observations.push(value));

  const result = await invoke(handler);

  assert.equal(result.statusCode, 204);
  assert.equal(result.ended, true);
  assert.deepEqual(observations, [validPayload]);
});

test("rejects invalid time, identities and extra data", async () => {
  console.warn = () => {};
  const observations = [];
  const handler = createPageEngagementHandler(async (value) => observations.push(value));

  for (const body of [
    { ...validPayload, activeSeconds: 0 },
    { ...validPayload, activeSeconds: 43201 },
    { ...validPayload, pageViewId: "invalid" },
    { ...validPayload, extra: "not stored" },
  ]) {
    assert.equal((await invoke(handler, body)).statusCode, 400);
  }

  assert.equal(observations.length, 0);
});

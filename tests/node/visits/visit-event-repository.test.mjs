import assert from "node:assert/strict";
import { test } from "node:test";
import {
  recordVisitEvent,
  VisitEventIdentityConflictError,
  VisitEventPageViewConflictError,
  VisitEventVisitConflictError,
} from "../../../src/server/visit-events/repository.ts";

function createObservation(overrides = {}) {
  return {
    eventId: "f1c7f928-4532-4a77-9734-2d606d064687",
    eventType: "contact_option_selected",
    pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    properties: { option: "appointment" },
    source: "client",
    visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
    ...overrides,
  };
}

function createDatabase(...results) {
  const calls = [];
  let resultIndex = 0;

  return {
    calls,
    database: {
      async query(query, parameters) {
        calls.push({ parameters, query });
        const result = results[Math.min(resultIndex, results.length - 1)];
        resultIndex += 1;
        return result === undefined ? [] : [result];
      },
    },
  };
}

test("passes the event identity and payload to persistence", async () => {
  const observation = createObservation();
  const { calls, database } = createDatabase({
    eventInserted: true,
    eventMatched: true,
    pageViewMatched: true,
    visitMatched: true,
  });
  assert.deepEqual(await recordVisitEvent(observation, database), { eventInserted: true });
  assert.deepEqual(calls[0].parameters, [
    observation.eventId, observation.visitId, observation.pageViewId, observation.eventType, observation.source,
    JSON.stringify(observation.properties),
  ]);
});

test("treats a repeated matching event ID as idempotent", async () => {
  const { calls, database } = createDatabase({
    eventInserted: false,
    eventMatched: true,
    pageViewMatched: true,
    visitMatched: true,
  });
  assert.deepEqual(await recordVisitEvent(createObservation(), database), { eventInserted: false });
  assert.equal(calls.length, 1);
});

test("retries an event hidden by a concurrent statement snapshot", async () => {
  const { calls, database } = createDatabase(
    { eventInserted: false, eventMatched: false, pageViewMatched: true, visitMatched: true },
    { eventInserted: false, eventMatched: true, pageViewMatched: true, visitMatched: true },
  );
  assert.deepEqual(await recordVisitEvent(createObservation(), database), { eventInserted: false });
  assert.equal(calls.length, 2);
});

test("rejects unknown visits, unrelated page views, and conflicting event IDs", async () => {
  for (const { error, result } of [
    { error: VisitEventVisitConflictError, result: { eventInserted: false, eventMatched: false, pageViewMatched: false, visitMatched: false } },
    { error: VisitEventPageViewConflictError, result: { eventInserted: false, eventMatched: false, pageViewMatched: false, visitMatched: true } },
    { error: VisitEventIdentityConflictError, result: { eventInserted: false, eventMatched: false, pageViewMatched: true, visitMatched: true } },
  ]) {
    const { database } = createDatabase(result, result);
    await assert.rejects(recordVisitEvent(createObservation(), database), error);
  }
});

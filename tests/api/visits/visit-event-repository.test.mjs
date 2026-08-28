import assert from "node:assert/strict";
import { test } from "node:test";
import {
  recordVisitEvent,
  recordVisitEventSql,
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

test("records an event through one parameterized statement", async () => {
  const observation = createObservation();
  const { calls, database } = createDatabase({
    eventInserted: true,
    eventMatched: true,
    pageViewMatched: true,
    visitMatched: true,
  });

  const result = await recordVisitEvent(observation, database);

  assert.deepEqual(result, { eventInserted: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].query, recordVisitEventSql);
  assert.deepEqual(calls[0].parameters, [
    observation.eventId,
    observation.visitId,
    observation.pageViewId,
    observation.eventType,
    observation.source,
    JSON.stringify(observation.properties),
  ]);
  assert.doesNotMatch(calls[0].query, /appointment/);
});

test("binds page ownership and repeated event identity in SQL", () => {
  const matchedPageView = recordVisitEventSql.match(
    /matched_page_view AS \((?<body>[\s\S]*?)\),\s*inserted_event AS/i,
  )?.groups?.body;
  const matchedEvent = recordVisitEventSql.match(
    /matched_event AS \((?<body>[\s\S]*?)\)\s*SELECT/i,
  )?.groups?.body;

  assert.ok(matchedPageView, "matched_page_view CTE must remain present");
  assert.match(matchedPageView, /id = \$3::UUID/i);
  assert.match(matchedPageView, /visit_id = \$2::UUID/i);
  assert.match(
    recordVisitEventSql,
    /WHERE \$3::UUID IS NULL\s*OR EXISTS \(SELECT 1 FROM matched_page_view\)/i,
  );

  assert.ok(matchedEvent, "matched_event CTE must remain present");
  assert.match(matchedEvent, /id = \$1::UUID/i);
  assert.match(matchedEvent, /visit_id = \$2::UUID/i);
  assert.match(matchedEvent, /page_view_id IS NOT DISTINCT FROM \$3::UUID/i);
  assert.match(matchedEvent, /event_type = \$4/i);
  assert.match(matchedEvent, /source = \$5/i);
  assert.match(matchedEvent, /properties = \$6::JSONB/i);
});

test("treats a repeated matching event ID as idempotent", async () => {
  const { calls, database } = createDatabase({
    eventInserted: false,
    eventMatched: true,
    pageViewMatched: true,
    visitMatched: true,
  });

  const result = await recordVisitEvent(createObservation(), database);

  assert.deepEqual(result, { eventInserted: false });
  assert.equal(calls.length, 1);
});

test("retries an event hidden by a concurrent statement snapshot", async () => {
  const { calls, database } = createDatabase(
    {
      eventInserted: false,
      eventMatched: false,
      pageViewMatched: true,
      visitMatched: true,
    },
    {
      eventInserted: false,
      eventMatched: true,
      pageViewMatched: true,
      visitMatched: true,
    },
  );

  const result = await recordVisitEvent(createObservation(), database);

  assert.deepEqual(result, { eventInserted: false });
  assert.equal(calls.length, 2);
});

test("rejects an unknown visit after a retry", async () => {
  const conflict = {
    eventInserted: false,
    eventMatched: false,
    pageViewMatched: false,
    visitMatched: false,
  };
  const { calls, database } = createDatabase(conflict, conflict);

  await assert.rejects(recordVisitEvent(createObservation(), database), VisitEventVisitConflictError);

  assert.equal(calls.length, 2);
});

test("rejects a page view that does not belong to the visit", async () => {
  const conflict = {
    eventInserted: false,
    eventMatched: false,
    pageViewMatched: false,
    visitMatched: true,
  };
  const { database } = createDatabase(conflict, conflict);

  await assert.rejects(
    recordVisitEvent(createObservation(), database),
    VisitEventPageViewConflictError,
  );
});

test("rejects an event ID associated with different event data", async () => {
  const conflict = {
    eventInserted: false,
    eventMatched: false,
    pageViewMatched: true,
    visitMatched: true,
  };
  const { database } = createDatabase(conflict, conflict);

  await assert.rejects(
    recordVisitEvent(createObservation(), database),
    VisitEventIdentityConflictError,
  );
});

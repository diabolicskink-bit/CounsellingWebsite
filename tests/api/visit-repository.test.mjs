import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  getVisitDatabase,
  PageViewIdentityConflictError,
  recordVisitObservation,
  recordVisitObservationSql,
  VisitDatabaseConfigurationError,
  VisitIdentityConflictError,
} from "../../src/server/visits/repository.ts";

const originalDatabaseUrl = process.env.DATABASE_URL;

afterEach(() => {
  if (typeof originalDatabaseUrl === "undefined") {
    delete process.env.DATABASE_URL;
  } else {
    process.env.DATABASE_URL = originalDatabaseUrl;
  }
});

function createObservation(overrides = {}) {
  return {
    adCode: "enm",
    gclid: "CjwK-test-click",
    landingPath: "/polyamory-enm-counselling",
    matchType: "p",
    matchedKeyword: "polyamory therapy",
    networkCode: "g",
    pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    path: "/polyamory-enm-counselling",
    referrerHost: "www.google.com",
    referrerUrl: "https://www.google.com/search?q=private-test-value",
    visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
    visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
    ...overrides,
  };
}

function createDatabase(result) {
  const calls = [];

  return {
    calls,
    database: {
      async query(query, parameters) {
        calls.push({ parameters, query });
        return [result];
      },
    },
  };
}

test("does not initialize Neon until database access is requested", () => {
  delete process.env.DATABASE_URL;

  assert.throws(() => getVisitDatabase(), VisitDatabaseConfigurationError);
});

test("records a visit observation through one parameterized statement", async () => {
  const observation = createObservation();
  const { calls, database } = createDatabase({
    pageViewInserted: true,
    pageViewMatched: true,
    visitMatched: true,
  });

  const result = await recordVisitObservation(observation, database);

  assert.deepEqual(result, { pageViewInserted: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].query, recordVisitObservationSql);
  assert.deepEqual(calls[0].parameters, [
    observation.visitorId,
    observation.visitId,
    observation.pageViewId,
    observation.landingPath,
    observation.path,
    observation.referrerUrl,
    observation.referrerHost,
    observation.gclid,
    observation.adCode,
    observation.networkCode,
    observation.matchedKeyword,
    observation.matchType,
  ]);
  assert.doesNotMatch(calls[0].query, /private-test-value|polyamory therapy|CjwK-test-click/);
});

test("treats a repeated matching page-view ID as an idempotent observation", async () => {
  const { database } = createDatabase({
    pageViewInserted: false,
    pageViewMatched: true,
    visitMatched: true,
  });

  const result = await recordVisitObservation(createObservation(), database);

  assert.deepEqual(result, { pageViewInserted: false });
});

test("rejects a visit ID already associated with another anonymous visitor", async () => {
  const { database } = createDatabase({
    pageViewInserted: false,
    pageViewMatched: false,
    visitMatched: false,
  });

  await assert.rejects(
    recordVisitObservation(createObservation(), database),
    VisitIdentityConflictError,
  );
});

test("rejects a page-view ID already associated with another visit", async () => {
  const { database } = createDatabase({
    pageViewInserted: false,
    pageViewMatched: false,
    visitMatched: true,
  });

  await assert.rejects(
    recordVisitObservation(createObservation(), database),
    PageViewIdentityConflictError,
  );
});

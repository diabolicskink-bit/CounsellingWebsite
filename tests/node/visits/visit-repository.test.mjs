import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  PageViewIdentityConflictError,
  recordVisitObservation,
  VisitIdentityConflictError,
} from "../../../src/server/visits/repository.ts";
import { getVisitDatabase, VisitDatabaseConfigurationError } from "../../../src/server/visit-database.ts";

const originalDatabaseUrl = process.env.DATABASE_URL;

afterEach(() => {
  if (typeof originalDatabaseUrl === "undefined") delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = originalDatabaseUrl;
});

function createObservation(overrides = {}) {
  return {
    adCode: "enm",
    botCategory: null,
    botName: null,
    deviceType: "desktop",
    gclid: "CjwK-test-click",
    isBot: false,
    isWebDriver: false,
    landingPath: "/polyamory-enm-counselling",
    locationCountryCode: "AU",
    locationRegionCode: "WA",
    matchType: "p",
    matchedKeyword: "polyamory therapy",
    networkCode: "g",
    pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    path: "/polyamory-enm-counselling",
    referrerHost: "www.google.com",
    referrerUrl: "https://www.google.com/search?q=private-test-value",
    visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
    visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/145.0.0.0",
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

test("requires DATABASE_URL when the default database is requested", () => {
  delete process.env.DATABASE_URL;
  assert.throws(() => getVisitDatabase(), VisitDatabaseConfigurationError);
});

test("passes the complete observation to persistence", async () => {
  const observation = createObservation();
  const { calls, database } = createDatabase({
    pageViewInserted: true,
    pageViewMatched: true,
    visitInserted: true,
    visitMatched: true,
  });

  assert.deepEqual(await recordVisitObservation(observation, database), { pageViewInserted: true });
  assert.deepEqual(calls[0].parameters, [
    observation.visitorId, observation.visitId, observation.pageViewId, observation.landingPath, observation.path,
    observation.referrerUrl, observation.referrerHost, observation.gclid, observation.adCode, observation.networkCode,
    observation.matchedKeyword, observation.matchType, observation.isBot, observation.botName, observation.botCategory,
    observation.userAgent, observation.deviceType, observation.isWebDriver, observation.locationCountryCode,
    observation.locationRegionCode,
  ]);
});

test("treats a repeated matching page-view ID as idempotent", async () => {
  const { calls, database } = createDatabase({
    pageViewInserted: false,
    pageViewMatched: true,
    visitInserted: false,
    visitMatched: true,
  });
  assert.deepEqual(await recordVisitObservation(createObservation(), database), { pageViewInserted: false });
  assert.equal(calls.length, 1);
});

test("retries when a concurrent insert is not visible to the first statement snapshot", async () => {
  const { calls, database } = createDatabase(
    { pageViewInserted: false, pageViewMatched: false, visitInserted: false, visitMatched: false },
    { pageViewInserted: true, pageViewMatched: true, visitInserted: false, visitMatched: true },
  );
  assert.deepEqual(await recordVisitObservation(createObservation(), database), { pageViewInserted: true });
  assert.equal(calls.length, 2);
});

test("rejects a visit ID already associated with another anonymous visitor", async () => {
  const result = { pageViewInserted: false, pageViewMatched: false, visitInserted: false, visitMatched: false };
  const { calls, database } = createDatabase(result, result);
  await assert.rejects(recordVisitObservation(createObservation(), database), VisitIdentityConflictError);
  assert.equal(calls.length, 2);
});

test("removes a newly inserted empty visit before rejecting a page-view identity conflict", async () => {
  const firstConflict = { pageViewInserted: false, pageViewMatched: false, visitInserted: true, visitMatched: true };
  const observation = createObservation();
  const { calls, database } = createDatabase(firstConflict, { ...firstConflict, visitInserted: false }, undefined);
  await assert.rejects(recordVisitObservation(observation, database), PageViewIdentityConflictError);
  assert.equal(calls.length, 3);
  assert.deepEqual(calls[2].parameters, [observation.visitorId, observation.visitId]);
});

test("does not delete an established visit after a page-view identity conflict", async () => {
  const result = { pageViewInserted: false, pageViewMatched: false, visitInserted: false, visitMatched: true };
  const { calls, database } = createDatabase(result, result);
  await assert.rejects(recordVisitObservation(createObservation(), database), PageViewIdentityConflictError);
  assert.equal(calls.length, 2);
});

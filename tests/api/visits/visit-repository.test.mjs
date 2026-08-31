import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  deleteEmptyVisitSql,
  getVisitDatabase,
  PageViewIdentityConflictError,
  recordVisitObservation,
  recordVisitObservationSql,
  VisitDatabaseConfigurationError,
  VisitIdentityConflictError,
} from "../../../src/server/visits/repository.ts";

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
    botCategory: null,
    botName: null,
    deviceType: "desktop",
    gclid: "CjwK-test-click",
    isBot: false,
    isWebDriver: false,
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

test("passes the complete observation to the visit upsert", async () => {
  const observation = createObservation();
  const { calls, database } = createDatabase({
    pageViewInserted: true,
    pageViewMatched: true,
    visitInserted: true,
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
    observation.isBot,
    observation.botName,
    observation.botCategory,
    observation.userAgent,
    observation.deviceType,
    observation.isWebDriver,
  ]);
  assert.doesNotMatch(calls[0].query, /private-test-value|polyamory therapy|CjwK-test-click/);
});

test("updates visit activity and bot classification without rewriting first-touch data", () => {
  const visitUpdateAssignments = [...recordVisitObservationSql.matchAll(
    /UPDATE site_visits\s*SET(?<assignments>[\s\S]*?)\s*FROM/gi,
  )].map((match) => match.groups?.assignments ?? "");
  const [updatedVisit] = visitUpdateAssignments;

  assert.equal(visitUpdateAssignments.length, 1);

  for (const column of [
    "landing_path",
    "referrer_url",
    "referrer_host",
    "gclid",
    "ad_code",
    "network_code",
    "matched_keyword",
    "match_type",
    "user_agent",
    "device_type",
    "is_webdriver",
  ]) {
    assert.doesNotMatch(
      visitUpdateAssignments.join("\n"),
      new RegExp(`\\b${column}\\s*=`),
    );
  }

  assert.match(updatedVisit, /last_seen_at = CASE[\s\S]*?GREATEST\(/i);
  assert.match(
    updatedVisit,
    /WHEN site_visits\.is_bot IS TRUE OR observation\.is_bot IS TRUE THEN TRUE/i,
  );
  assert.match(
    updatedVisit,
    /bot_name = COALESCE\(site_visits\.bot_name, observation\.bot_name\)/i,
  );
  assert.match(
    updatedVisit,
    /bot_category = COALESCE\(site_visits\.bot_category, observation\.bot_category\)/i,
  );
  assert.match(
    recordVisitObservationSql,
    /INSERT INTO site_page_views[\s\S]*?FROM matched_visit\s+CROSS JOIN observation/i,
    "a newly inserted visit must be able to record its first page view in the same statement",
  );
  assert.match(
    recordVisitObservationSql,
    /FROM matched_visit\s+CROSS JOIN observation\s+LEFT JOIN inserted_page_view ON inserted_page_view\.visit_id = matched_visit\.id/i,
  );
});

test("treats a repeated matching page-view ID as an idempotent observation", async () => {
  const { calls, database } = createDatabase({
    pageViewInserted: false,
    pageViewMatched: true,
    visitInserted: false,
    visitMatched: true,
  });

  const result = await recordVisitObservation(createObservation(), database);

  assert.deepEqual(result, { pageViewInserted: false });
  assert.equal(calls.length, 1);
  assert.match(
    recordVisitObservationSql,
    /WHERE page_views\.id = observation\.page_view_id\s*AND page_views\.visit_id = observation\.visit_id\s*AND page_views\.path = observation\.path/i,
  );
});

test("retries when a concurrent insert is not visible to the first statement snapshot", async () => {
  const firstResult = {
    pageViewInserted: false,
    pageViewMatched: false,
    visitInserted: false,
    visitMatched: false,
  };
  const secondResult = {
    pageViewInserted: true,
    pageViewMatched: true,
    visitInserted: false,
    visitMatched: true,
  };
  const { calls, database } = createDatabase(firstResult, secondResult);

  const result = await recordVisitObservation(createObservation(), database);

  assert.deepEqual(result, { pageViewInserted: true });
  assert.equal(calls.length, 2);
  assert.ok(calls.every((call) => call.query === recordVisitObservationSql));
});

test("rejects a visit ID already associated with another anonymous visitor", async () => {
  const conflict = {
    pageViewInserted: false,
    pageViewMatched: false,
    visitInserted: false,
    visitMatched: false,
  };
  const { calls, database } = createDatabase(conflict, conflict);

  await assert.rejects(
    recordVisitObservation(createObservation(), database),
    VisitIdentityConflictError,
  );

  assert.equal(calls.length, 2);
});

test("removes a newly inserted empty visit before rejecting a page-view identity conflict", async () => {
  const firstConflict = {
    pageViewInserted: false,
    pageViewMatched: false,
    visitInserted: true,
    visitMatched: true,
  };
  const repeatedConflict = {
    ...firstConflict,
    visitInserted: false,
  };
  const { calls, database } = createDatabase(firstConflict, repeatedConflict, undefined);
  const observation = createObservation();

  await assert.rejects(
    recordVisitObservation(observation, database),
    PageViewIdentityConflictError,
  );

  assert.equal(calls.length, 3);
  assert.equal(calls[2].query, deleteEmptyVisitSql);
  assert.deepEqual(calls[2].parameters, [observation.visitorId, observation.visitId]);
  assert.match(deleteEmptyVisitSql, /visits\.id = \$2::UUID/i);
  assert.match(deleteEmptyVisitSql, /visits\.visitor_id = \$1::UUID/i);
  assert.match(
    deleteEmptyVisitSql,
    /NOT EXISTS \([\s\S]*?FROM site_page_views AS page_views[\s\S]*?page_views\.visit_id = visits\.id[\s\S]*?\)/i,
  );
});

test("does not delete an established visit after a page-view identity conflict", async () => {
  const conflict = {
    pageViewInserted: false,
    pageViewMatched: false,
    visitInserted: false,
    visitMatched: true,
  };
  const { calls, database } = createDatabase(conflict, conflict);

  await assert.rejects(
    recordVisitObservation(createObservation(), database),
    PageViewIdentityConflictError,
  );

  assert.equal(calls.length, 2);
});

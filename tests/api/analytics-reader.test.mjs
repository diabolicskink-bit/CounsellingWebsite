import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  AnalyticsDataUnavailableError,
  dailyAnalyticsSql,
  readAnalytics,
  visitorAnalyticsSql,
} from "../../src/server/reporting/reader.ts";

const originalDatabaseUrl = process.env.DATABASE_URL;

afterEach(() => {
  if (originalDatabaseUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = originalDatabaseUrl;
});

function createVisitRow(overrides = {}) {
  return {
    adCode: "enm",
    dateKey: "2026-08-15",
    durationSeconds: "305",
    gclid: "CjwK-test",
    id: "1a560836-220d-4d33-a05e-5f364891f9cb",
    landingPath: "/polyamory-enm-counselling",
    lastSeenAt: "2026-08-15T03:05:00.000Z",
    matchType: "p",
    matchedKeyword: "polyamory therapy",
    networkCode: "g",
    pageViews: [
      {
        id: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
        path: "/polyamory-enm-counselling",
        viewedAt: "2026-08-15T03:00:00.000Z",
      },
      {
        id: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98",
        path: "/contact",
        viewedAt: "2026-08-15T03:05:00.000Z",
      },
    ],
    referrerHost: "www.google.com",
    referrerUrl: "https://www.google.com/",
    startedAt: "2026-08-15T03:00:00.000Z",
    trafficSource: "paid",
    visitNumber: "2",
    visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
    ...overrides,
  };
}

function createDatabase(rows) {
  const calls = [];

  return {
    calls,
    database: {
      async query(query, parameters) {
        calls.push({ parameters, query });
        return rows;
      },
    },
  };
}

test("reads one Perth calendar day with ordered page journeys", async () => {
  const { calls, database } = createDatabase([createVisitRow()]);

  const result = await readAnalytics(
    { type: "daily", date: "2026-08-15" },
    database,
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].query, dailyAnalyticsSql);
  assert.deepEqual(calls[0].parameters, ["2026-08-15"]);
  assert.equal(result.type, "daily");
  assert.equal(result.date, "2026-08-15");
  assert.equal(result.visits[0].visitNumber, 2);
  assert.equal(result.visits[0].durationSeconds, 305);
  assert.deepEqual(
    result.visits[0].pageViews.map((pageView) => pageView.path),
    ["/polyamory-enm-counselling", "/contact"],
  );
  assert.match(calls[0].query, /Australia\/Perth/);
  assert.match(calls[0].query, /ORDER BY ledger\.started_at DESC/);
});

test("reads complete retained history for one anonymous browser", async () => {
  const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";
  const { calls, database } = createDatabase([
    createVisitRow(),
    createVisitRow({
      adCode: null,
      gclid: null,
      id: "7282c495-2cb7-44a7-a6db-3aaf692a724a",
      matchType: null,
      matchedKeyword: null,
      networkCode: null,
      pageViews: "[]",
      trafficSource: "direct",
      visitNumber: 1,
    }),
  ]);

  const result = await readAnalytics({ type: "visitor", visitorId }, database);

  assert.equal(calls[0].query, visitorAnalyticsSql);
  assert.deepEqual(calls[0].parameters, [visitorId]);
  assert.deepEqual(result, {
    type: "visitor",
    visitorId,
    visits: result.visits,
  });
  assert.equal(result.visits.length, 2);
  assert.deepEqual(result.visits[1].pageViews, []);
});

test("fails closed before creating a database client when configuration is absent", async () => {
  delete process.env.DATABASE_URL;

  await assert.rejects(
    readAnalytics({ type: "daily", date: "2026-08-15" }),
    AnalyticsDataUnavailableError,
  );
});

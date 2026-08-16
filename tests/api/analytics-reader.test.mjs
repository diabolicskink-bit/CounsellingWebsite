import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  AnalyticsDataUnavailableError,
  dailyAnalyticsSql,
  monthlyEnquiryAnalyticsSql,
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
    botCategory: "search engine",
    botName: "googlebot",
    dateKey: "2026-08-15",
    durationSeconds: "305",
    events: [
      {
        eventType: "contact_option_selected",
        id: "21ed6eca-8270-461e-bf7a-ea3a63e4d3ac",
        occurredAt: new Date("2026-08-15T03:04:00.000Z"),
        pageViewId: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98",
        properties: { option: "appointment" },
        source: "client",
      },
      {
        eventType: "enquiry_sent",
        id: "a5fd57e2-8d4b-45f3-9850-a656e0c2a42a",
        occurredAt: "2026-08-15T03:05:30.000Z",
        pageViewId: null,
        properties: {},
        source: "server",
      },
    ],
    gclid: "CjwK-test",
    id: "1a560836-220d-4d33-a05e-5f364891f9cb",
    isBot: true,
    isExcluded: false,
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
    totalVisits: "3",
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
  assert.equal(result.visits[0].totalVisits, 3);
  assert.equal(result.visits[0].durationSeconds, 305);
  assert.equal(result.visits[0].isBot, true);
  assert.equal(result.visits[0].botName, "googlebot");
  assert.equal(result.visits[0].botCategory, "search engine");
  assert.deepEqual(result.visits[0].events, [
    {
      eventType: "contact_option_selected",
      id: "21ed6eca-8270-461e-bf7a-ea3a63e4d3ac",
      occurredAt: "2026-08-15T03:04:00.000Z",
      pageViewId: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98",
      properties: { option: "appointment" },
      source: "client",
    },
    {
      eventType: "enquiry_sent",
      id: "a5fd57e2-8d4b-45f3-9850-a656e0c2a42a",
      occurredAt: "2026-08-15T03:05:30.000Z",
      pageViewId: null,
      properties: {},
      source: "server",
    },
  ]);
  assert.deepEqual(
    result.visits[0].pageViews.map((pageView) => pageView.path),
    ["/polyamory-enm-counselling", "/contact"],
  );
  assert.match(calls[0].query, /Australia\/Perth/);
  assert.match(calls[0].query, /ORDER BY ledger\.started_at DESC/);
  assert.match(calls[0].query, /visitor_visits\.visitor_id = ledger\.visitor_id/);
  assert.match(
    calls[0].query,
    /ORDER BY visit_events\.occurred_at, visit_events\.id/,
  );
});

test("reads complete retained history for one anonymous browser", async () => {
  const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";
  const { calls, database } = createDatabase([
    createVisitRow({ isExcluded: true }),
    createVisitRow({
      adCode: null,
      gclid: null,
      id: "7282c495-2cb7-44a7-a6db-3aaf692a724a",
      matchType: null,
      matchedKeyword: null,
      networkCode: null,
      events: "[]",
      pageViews: "[]",
      trafficSource: "direct",
      visitNumber: 1,
      isExcluded: true,
    }),
  ]);

  const result = await readAnalytics({ type: "visitor", visitorId }, database);

  assert.equal(calls[0].query, visitorAnalyticsSql);
  assert.deepEqual(calls[0].parameters, [visitorId]);
  assert.deepEqual(result, {
    isExcluded: true,
    type: "visitor",
    visitorId,
    visits: result.visits,
  });
  assert.equal(result.visits.length, 2);
  assert.match(calls[0].query, /analytics_excluded_visitors/);
  assert.deepEqual(result.visits[1].events, []);
  assert.deepEqual(result.visits[1].pageViews, []);
});

test("reads visits with enquiry outcomes in one Perth calendar month", async () => {
  const { calls, database } = createDatabase([createVisitRow()]);

  const result = await readAnalytics(
    { type: "monthly", month: "2026-08" },
    database,
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].query, monthlyEnquiryAnalyticsSql);
  assert.deepEqual(calls[0].parameters, ["2026-08"]);
  assert.equal(result.type, "monthly");
  assert.equal(result.month, "2026-08");
  assert.equal(result.visits.length, 1);
  assert.match(calls[0].query, /enquiry_sent/);
  assert.match(calls[0].query, /enquiry_failed/);
  assert.match(calls[0].query, /INTERVAL '1 month'/);
  assert.match(calls[0].query, /Australia\/Perth/);
  assert.match(calls[0].query, /analytics_excluded_visitors/);
});

test("normalizes serialized event collections and rejects unsafe event shapes", async () => {
  const { database } = createDatabase([
    createVisitRow({
      events: JSON.stringify([
        {
          eventType: "enquiry_failed",
          id: "4dfa3ea2-a11a-49ba-9398-03e380502240",
          occurredAt: "2026-08-15T03:06:00.000Z",
          pageViewId: null,
          properties: JSON.stringify({ reason: "email_provider" }),
          source: "server",
        },
      ]),
    }),
  ]);

  const result = await readAnalytics(
    { type: "daily", date: "2026-08-15" },
    database,
  );

  assert.deepEqual(result.visits[0].events[0].properties, {
    reason: "email_provider",
  });

  const invalidSource = createDatabase([
    createVisitRow({
      events: [{
        eventType: "enquiry_sent",
        id: "8ed360fd-cc9a-4ba1-a6ec-18c40d942f90",
        occurredAt: "2026-08-15T03:07:00.000Z",
        pageViewId: null,
        properties: {},
        source: "browser",
      }],
    }),
  ]);
  await assert.rejects(
    readAnalytics(
      { type: "daily", date: "2026-08-15" },
      invalidSource.database,
    ),
    /invalid event source/,
  );

  const invalidProperties = createDatabase([
    createVisitRow({
      events: [{
        eventType: "enquiry_failed",
        id: "3262f5f1-30c1-4f33-b397-1d3731d947a0",
        occurredAt: "2026-08-15T03:08:00.000Z",
        pageViewId: null,
        properties: { attempt: 2 },
        source: "server",
      }],
    }),
  ]);
  await assert.rejects(
    readAnalytics(
      { type: "daily", date: "2026-08-15" },
      invalidProperties.database,
    ),
    /invalid event properties/,
  );
});

test("fails closed before creating a database client when configuration is absent", async () => {
  delete process.env.DATABASE_URL;

  await assert.rejects(
    readAnalytics({ type: "daily", date: "2026-08-15" }),
    AnalyticsDataUnavailableError,
  );
});

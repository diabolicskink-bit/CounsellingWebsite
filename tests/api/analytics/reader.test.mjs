import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  AnalyticsDataUnavailableError,
  dailyAnalyticsSql,
  keywordAnalyticsSql,
  monthlyEnquiryAnalyticsSql,
  pageViewsAnalyticsSql,
  readAnalytics,
  visitorAnalyticsSql,
} from "../../../src/server/reporting/reader.ts";

const originalDatabaseUrl = process.env.DATABASE_URL;
const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";
const dailySelection = { type: "daily", date: "2026-08-15" };

afterEach(() => {
  if (originalDatabaseUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = originalDatabaseUrl;
});

function createEventRow(overrides = {}) {
  return {
    eventType: "contact_option_selected",
    id: "21ed6eca-8270-461e-bf7a-ea3a63e4d3ac",
    occurredAt: new Date("2026-08-15T03:04:00.000Z"),
    pageViewId: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98",
    properties: { option: "appointment" },
    source: "client",
    ...overrides,
  };
}

function createVisitRow(overrides = {}) {
  return {
    adCode: "enm",
    botCategory: "search engine",
    botName: "googlebot",
    dateKey: "2026-08-15",
    deviceType: "desktop",
    durationSeconds: "305",
    events: [
      createEventRow(),
      createEventRow({
        eventType: "enquiry_sent",
        id: "a5fd57e2-8d4b-45f3-9850-a656e0c2a42a",
        occurredAt: "2026-08-15T03:05:30.000Z",
        pageViewId: null,
        properties: {},
        source: "server",
      }),
    ],
    gclid: "CjwK-test",
    id: "1a560836-220d-4d33-a05e-5f364891f9cb",
    isBot: true,
    isExcluded: false,
    isWebDriver: true,
    landingPath: "/polyamory-enm-counselling",
    lastSeenAt: "2026-08-15T03:05:00.000Z",
    locationCountryCode: "AU",
    locationRegionCode: "WA",
    matchType: "p",
    matchedKeyword: "polyamory therapy",
    networkCode: "g",
    pageViews: [
      {
        activeSeconds: 90,
        id: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
        path: "/polyamory-enm-counselling",
        viewedAt: "2026-08-15T03:00:00.000Z",
      },
      {
        activeSeconds: 35,
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
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/145.0.0.0",
    visitNumber: "2",
    visitorId,
    ...overrides,
  };
}

function expectedVisitFromDatabaseRow(row) {
  const { isExcluded: _isExcluded, ...visit } = row;

  return {
    ...visit,
    durationSeconds: Number(row.durationSeconds),
    events: row.events.map((event) => ({
      ...event,
      occurredAt: event.occurredAt instanceof Date
        ? event.occurredAt.toISOString()
        : event.occurredAt,
    })),
    totalVisits: Number(row.totalVisits),
    visitNumber: Number(row.visitNumber),
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
  const visitRow = createVisitRow();
  const { calls, database } = createDatabase([visitRow]);

  const result = await readAnalytics(dailySelection, database);

  assert.equal(calls.length, 1);
  assert.equal(calls[0].query, dailyAnalyticsSql);
  assert.deepEqual(calls[0].parameters, ["2026-08-15"]);
  assert.deepEqual(result, {
    date: dailySelection.date,
    type: "daily",
    visits: [expectedVisitFromDatabaseRow(visitRow)],
  });
});

test("reads complete retained history for one anonymous browser", async () => {
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
});

test("reads an aggregated page-view breakdown in one query", async () => {
  const { calls, database } = createDatabase([
    {
      activeSeconds: "250",
      pageViews: "5",
      path: "/contact",
      totalActiveSeconds: "370",
      totalPageViews: "8",
      totalVisits: "4",
      visits: "3",
    },
    {
      activeSeconds: "120",
      pageViews: "3",
      path: "/",
      totalActiveSeconds: "370",
      totalPageViews: "8",
      totalVisits: "4",
      visits: "2",
    },
  ]);

  const result = await readAnalytics(
    {
      endDate: "2026-08-15",
      includeBots: false,
      startDate: "2026-08-01",
      type: "pageViews",
    },
    database,
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].query, pageViewsAnalyticsSql);
  assert.deepEqual(calls[0].parameters, ["2026-08-01", "2026-08-15", false]);
  assert.deepEqual(result, {
    endDate: "2026-08-15",
    routes: [
      {
        activeSeconds: 250,
        pageViews: 5,
        path: "/contact",
        visits: 3,
      },
      {
        activeSeconds: 120,
        pageViews: 3,
        path: "/",
        visits: 2,
      },
    ],
    startDate: "2026-08-01",
    totalActiveSeconds: 370,
    totalPageViews: 8,
    totalVisits: 4,
    type: "pageViews",
  });
});

test("reads keyword journeys with visit depth, active time and enquiry outcomes", async () => {
  const { calls, database } = createDatabase([
    {
      activeSeconds: "420",
      enquiryVisits: "1",
      keyword: "kink aware therapist",
      latestVisitAt: new Date("2026-08-15T03:00:00.000Z"),
      matchTypes: ["e", "p"],
      pageViews: "7",
      returningVisits: "1",
      taggedEnquiryVisits: "1",
      taggedVisits: "3",
      totalActiveSeconds: "510",
      totalEnquiryVisits: "1",
      totalPageViews: "9",
      totalPaidVisits: "4",
      visits: "3",
    },
  ]);

  const result = await readAnalytics(
    {
      endDate: "2026-08-15",
      includeBots: false,
      startDate: "2026-07-17",
      type: "keywords",
    },
    database,
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].query, keywordAnalyticsSql);
  assert.deepEqual(calls[0].parameters, ["2026-07-17", "2026-08-15", false]);
  assert.deepEqual(result, {
    endDate: "2026-08-15",
    keywords: [{
      activeSeconds: 420,
      enquiryVisits: 1,
      keyword: "kink aware therapist",
      latestVisitAt: "2026-08-15T03:00:00.000Z",
      matchTypes: ["e", "p"],
      pageViews: 7,
      returningVisits: 1,
      visits: 3,
    }],
    startDate: "2026-07-17",
    taggedEnquiryVisits: 1,
    taggedVisits: 3,
    totalActiveSeconds: 510,
    totalEnquiryVisits: 1,
    totalPageViews: 9,
    totalPaidVisits: 4,
    type: "keywords",
  });
});

test("reporting queries preserve their data and filtering boundaries", () => {
  for (const query of [
    dailyAnalyticsSql,
    keywordAnalyticsSql,
    monthlyEnquiryAnalyticsSql,
    pageViewsAnalyticsSql,
  ]) {
    assert.match(query, /Australia\/Perth/);
    assert.match(query, /analytics_excluded_visitors/);
  }

  assert.match(dailyAnalyticsSql, /ORDER BY ledger\.started_at DESC/);
  assert.match(dailyAnalyticsSql, /visitor_visits\.visitor_id = ledger\.visitor_id/);
  assert.match(dailyAnalyticsSql, /visit_record\.id = ledger\.visit_id/);
  assert.match(dailyAnalyticsSql, /ORDER BY page_views\.viewed_at, page_views\.id/);
  assert.match(dailyAnalyticsSql, /ORDER BY visit_events\.occurred_at, visit_events\.id/);
  for (const alias of [
    "userAgent",
    "deviceType",
    "isWebDriver",
    "locationCountryCode",
    "locationRegionCode",
  ]) {
    assert.match(dailyAnalyticsSql, new RegExp(`AS "${alias}"`));
  }

  assert.match(visitorAnalyticsSql, /analytics_excluded_visitors/);
  assert.doesNotMatch(visitorAnalyticsSql, /AND NOT EXISTS\s*\(/);

  for (const eventType of ["enquiry_sent", "enquiry_failed", "phone_link_clicked"]) {
    assert.match(monthlyEnquiryAnalyticsSql, new RegExp(`'${eventType}'`));
  }
  assert.match(monthlyEnquiryAnalyticsSql, /INTERVAL '1 month'/);

  assert.match(pageViewsAnalyticsSql, /COUNT\(DISTINCT page_views\.visit_id\)/);
  assert.match(pageViewsAnalyticsSql, /SUM\(page_views\.active_seconds\)/);
  assert.match(pageViewsAnalyticsSql, /ledger\.is_bot IS DISTINCT FROM TRUE/);
  assert.doesNotMatch(pageViewsAnalyticsSql, /site_visit_events|outbound|_clicks/);

  assert.match(keywordAnalyticsSql, /ledger\.traffic_source = 'paid'/);
  assert.match(keywordAnalyticsSql, /SUM\(page_views\.active_seconds\)/);
  for (const eventType of ["enquiry_sent", "phone_link_clicked"]) {
    assert.match(keywordAnalyticsSql, new RegExp(`'${eventType}'`));
  }
  assert.match(keywordAnalyticsSql, /ledger\.is_bot IS DISTINCT FROM TRUE/);
  assert.doesNotMatch(keywordAnalyticsSql, /landing_path|topLandingPath/);
});

test("keeps paid visits without keyword tags visible in keyword coverage totals", async () => {
  const { database } = createDatabase([{
    activeSeconds: null,
    enquiryVisits: null,
    keyword: null,
    latestVisitAt: null,
    matchTypes: null,
    pageViews: null,
    returningVisits: null,
    taggedEnquiryVisits: "0",
    taggedVisits: "0",
    totalActiveSeconds: "180",
    totalEnquiryVisits: "0",
    totalPageViews: "3",
    totalPaidVisits: "2",
    visits: null,
  }]);

  const result = await readAnalytics(
    {
      endDate: "2026-08-15",
      includeBots: false,
      startDate: "2026-08-15",
      type: "keywords",
    },
    database,
  );

  assert.deepEqual(result, {
    endDate: "2026-08-15",
    keywords: [],
    startDate: "2026-08-15",
    taggedEnquiryVisits: 0,
    taggedVisits: 0,
    totalActiveSeconds: 180,
    totalEnquiryVisits: 0,
    totalPageViews: 3,
    totalPaidVisits: 2,
    type: "keywords",
  });
});

test("returns a complete empty page-view report", async () => {
  const { database } = createDatabase([]);

  const result = await readAnalytics(
    {
      endDate: "2026-08-15",
      includeBots: false,
      startDate: "2026-08-15",
      type: "pageViews",
    },
    database,
  );

  assert.deepEqual(result, {
    endDate: "2026-08-15",
    routes: [],
    startDate: "2026-08-15",
    totalActiveSeconds: 0,
    totalPageViews: 0,
    totalVisits: 0,
    type: "pageViews",
  });
});

test("normalizes serialized event collections", async () => {
  const { database } = createDatabase([
    createVisitRow({
      events: JSON.stringify([
        createEventRow({
          eventType: "enquiry_failed",
          id: "4dfa3ea2-a11a-49ba-9398-03e380502240",
          occurredAt: "2026-08-15T03:06:00.000Z",
          pageViewId: null,
          properties: JSON.stringify({ reason: "email_provider" }),
          source: "server",
        }),
      ]),
    }),
  ]);

  const result = await readAnalytics(dailySelection, database);

  assert.deepEqual(result.visits[0].events[0].properties, {
    reason: "email_provider",
  });
});

test("rejects unsafe stored event shapes", async () => {
  const invalidEvents = [
    [
      createEventRow({ source: "browser" }),
      /invalid event source/,
    ],
    [
      createEventRow({ properties: { attempt: 2 } }),
      /invalid event properties/,
    ],
  ];

  for (const [event, expectedError] of invalidEvents) {
    const { database } = createDatabase([createVisitRow({ events: [event] })]);

    await assert.rejects(readAnalytics(dailySelection, database), expectedError);
  }
});

test("rejects inconsistent stored visit locations", async () => {
  for (const location of [
    { locationCountryCode: "NZ", locationRegionCode: "WA" },
    { locationCountryCode: "AU", locationRegionCode: "XX" },
  ]) {
    const { database } = createDatabase([createVisitRow(location)]);

    await assert.rejects(
      readAnalytics(dailySelection, database),
      /invalid visit location/,
    );
  }
});

test("fails closed before creating a database client when configuration is absent", async () => {
  delete process.env.DATABASE_URL;

  await assert.rejects(
    readAnalytics(dailySelection),
    AnalyticsDataUnavailableError,
  );
});

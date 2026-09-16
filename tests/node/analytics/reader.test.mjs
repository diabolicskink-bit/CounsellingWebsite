import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { AnalyticsDataUnavailableError } from "../../../src/server/reporting/database.ts";
import { isAnalyticsReport } from "../../../src/data/analyticsContract.ts";
import { getAnalyticsSelection } from "../../../src/server/reporting/request.ts";
import {
  dailyAnalyticsSql,
  keywordAnalyticsSql,
  monthlyEnquiryAnalyticsSql,
  pageViewsAnalyticsSql,
  referrersAnalyticsSql,
  readAnalytics,
  visitorAnalyticsSql,
} from "../../../src/server/reporting/reader.ts";

const originalDatabaseUrl = process.env.DATABASE_URL;
const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";
const dailySelection = { type: "daily", date: "2026-08-15" };
const referrerSelection = {
  type: "referrers",
  startDate: "2026-08-01",
  endDate: "2026-08-16",
  includeBots: false,
};

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

function createReferrerReport() {
  return {
    type: "referrers",
    startDate: "2026-08-01",
    endDate: "2026-08-16",
    referrers: [
      { referrer: "google.com (paid)", visits: 2, pageViews: 5, activeSeconds: 90, enquiryVisits: 1 },
      { referrer: "google.com (organic)", visits: 1, pageViews: 2, activeSeconds: 30, enquiryVisits: 1 },
      { referrer: "No referrer recorded", visits: 1, pageViews: 0, activeSeconds: 0, enquiryVisits: 0 },
    ],
    totalVisits: 4,
    totalPageViews: 7,
    totalActiveSeconds: 120,
    totalEnquiryVisits: 2,
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

test("referrer reader maps grouped counts and passes the requested filters", async () => {
  const expected = createReferrerReport();
  const { referrers, type, startDate, endDate, ...totals } = expected;
  const rows = referrers.map((row) => Object.fromEntries(
    Object.entries({ ...row, ...totals }).map(([key, value]) => [key, String(value)]),
  ));
  const report = await readAnalytics(referrerSelection, {
    async query(sql, parameters) {
      assert.equal(sql, referrersAnalyticsSql);
      assert.deepEqual(parameters, [startDate, endDate, false]);
      return rows;
    },
  });
  assert.deepEqual(report, expected);
});

test("referrer reader supports the SQL empty row and an empty result", async () => {
  for (const rows of [[], [{
    referrer: null, visits: null, pageViews: null, activeSeconds: null, enquiryVisits: null,
    totalVisits: 0, totalPageViews: 0, totalActiveSeconds: 0, totalEnquiryVisits: 0,
  }]]) {
    const report = await readAnalytics(referrerSelection, { query: async () => rows });
    assert.deepEqual(report, {
      type: "referrers", startDate: referrerSelection.startDate, endDate: referrerSelection.endDate,
      referrers: [], totalVisits: 0, totalPageViews: 0, totalActiveSeconds: 0, totalEnquiryVisits: 0,
    });
    assert.equal(isAnalyticsReport(report), true);
  }
});

test("referrer reader rejects invalid database counts", async () => {
  await assert.rejects(readAnalytics(referrerSelection, {
    query: async () => [{ ...createReferrerReport().referrers[0], activeSeconds: -1 }],
  }), /active time/);
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
      /invalid report/,
    ],
    [
      createEventRow({ properties: { attempt: 2 } }),
      /invalid report/,
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
      /invalid report/,
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

test("uppercase visitor selections produce history accepted by the dashboard", async () => {
  const selection = getAnalyticsSelection(
    { visitor: visitorId.toUpperCase() },
    new Date("2026-08-16T04:00:00Z"),
  );
  assert.equal(selection.type, "valid");
  const { database } = createDatabase([createVisitRow()]);

  const report = await readAnalytics(selection.selection, database);

  assert.equal(report.visitorId, visitorId);
  assert.equal(isAnalyticsReport(report), true);
});

test("rejects malformed stored counts instead of coercing them into visit metrics", async () => {
  const invalidCounts = [
    null, undefined, true, false, "", " ", [], [1], {},
    -1, 1.5, "1e2", "0x10", Infinity, Number.MAX_SAFE_INTEGER + 1,
  ];
  for (const value of invalidCounts) {
    const { database } = createDatabase([createVisitRow({ durationSeconds: value })]);
    await assert.rejects(readAnalytics(dailySelection, database), /invalid duration/);
  }

  const { database } = createDatabase([createVisitRow({
    pageViews: [{ activeSeconds: null, id: visitorId, path: "/", viewedAt: "2026-08-15T03:00:00Z" }],
  })]);
  await assert.rejects(readAnalytics(dailySelection, database), /invalid page-view active time/);
});

test("rejects malformed aggregate totals instead of reporting zero activity", async () => {
  const selection = {
    type: "pageViews", startDate: "2026-08-15", endDate: "2026-08-15", includeBots: false,
  };
  for (const value of [null, false, "", []]) {
    const { database } = createDatabase([{
      path: null, totalActiveSeconds: value, totalPageViews: 0, totalVisits: 0,
    }]);
    await assert.rejects(readAnalytics(selection, database), /invalid total active time/);
  }
});

test("rejects invalid stored timestamps at the reporting boundary", async () => {
  const invalidTimestamps = [
    "not-a-date", "2026-08-15", "2026-08-15T03:00:00", "2026-13-15T03:00:00Z", new Date(NaN),
  ];
  for (const timestamp of invalidTimestamps) {
    const { database } = createDatabase([createVisitRow({ startedAt: timestamp })]);
    await assert.rejects(readAnalytics(dailySelection, database), /invalid start time/);
  }

  const { database } = createDatabase([createVisitRow({
    events: [createEventRow({ occurredAt: "not-a-date" })],
  })]);
  await assert.rejects(readAnalytics(dailySelection, database), /invalid event time/);
});

test("preserves valid timestamp offsets and sub-millisecond precision", async () => {
  const timestamp = "2026-08-15T11:00:00.123456+08:00";
  const { database } = createDatabase([createVisitRow({
    startedAt: new Date("2026-08-15T03:00:00Z"),
    pageViews: [{ activeSeconds: "0", id: visitorId, path: "/", viewedAt: timestamp }],
  })]);

  const report = await readAnalytics(dailySelection, database);

  assert.equal(report.visits[0].startedAt, "2026-08-15T03:00:00.000Z");
  assert.equal(report.visits[0].pageViews[0].viewedAt, timestamp);
  assert.equal(report.visits[0].pageViews[0].activeSeconds, 0);
  assert.equal(isAnalyticsReport(report), true);
});

test("checks stored identities and aggregate consistency before returning a report", async () => {
  const { database } = createDatabase([createVisitRow({ id: "not-a-visit-id" })]);
  await assert.rejects(readAnalytics(dailySelection, database), /invalid report/);

  const selection = {
    type: "pageViews", startDate: "2026-08-15", endDate: "2026-08-15", includeBots: false,
  };
  await assert.rejects(readAnalytics(selection, {
    query: async () => [{
      path: "/contact", visits: 1, pageViews: 2, activeSeconds: 30,
      totalVisits: 1, totalPageViews: 3, totalActiveSeconds: 30,
    }],
  }), /invalid report/);
});

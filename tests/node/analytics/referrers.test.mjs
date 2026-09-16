import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isAnalyticsApiResponseOfType,
  isAnalyticsReport,
} from "../../../src/data/analyticsContract.ts";
import { getAnalyticsSelection } from "../../../src/server/reporting/request.ts";
import { readAnalytics, referrersAnalyticsSql } from "../../../src/server/reporting/reader.ts";

const selection = {
  type: "referrers",
  startDate: "2026-08-01",
  endDate: "2026-08-16",
  includeBots: false,
};

function createReport() {
  return {
    type: "referrers",
    startDate: selection.startDate,
    endDate: selection.endDate,
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

test("referrer selection supports bot inclusion and the inclusive 366-day boundary", () => {
  const now = new Date("2026-08-16T04:00:00Z");
  for (const includeBots of [false, true]) {
    assert.deepEqual(getAnalyticsSelection({
      report: "referrers", start: "2025-08-16", end: "2026-08-16",
      ...(includeBots ? { bots: "include" } : {}),
    }, now), {
      type: "valid",
      selection: { ...selection, startDate: "2025-08-16", includeBots },
    });
  }
  for (const query of [
    {},
    { start: "2026-08-01" },
    { start: "2026-02-30", end: "2026-08-16" },
    { start: "2026-08-16", end: "2026-08-15" },
    { start: "2026-08-16", end: "2026-08-17" },
    { start: "2025-08-15", end: "2026-08-16" },
    { start: "2026-08-01", end: "2026-08-16", date: "2026-08-01" },
    { start: "2026-08-01", end: "2026-08-16", bots: "exclude" },
    { start: ["2026-08-01"], end: "2026-08-16" },
    { start: "2026-08-01", end: "2026-08-16", report: ["referrers"] },
  ]) {
    assert.deepEqual(getAnalyticsSelection({ report: "referrers", ...query }, now),
      { type: "invalid" }, JSON.stringify(query));
  }
});

test("referrer reader maps grouped counts and passes the requested filters", async () => {
  const expected = createReport();
  const { referrers, type, startDate, endDate, ...totals } = expected;
  const rows = referrers.map((row) => Object.fromEntries(
    Object.entries({ ...row, ...totals }).map(([key, value]) => [key, String(value)]),
  ));
  const report = await readAnalytics(selection, {
    async query(sql, parameters) {
      assert.equal(sql, referrersAnalyticsSql);
      assert.deepEqual(parameters, [startDate, endDate, false]);
      return rows;
    },
  });
  assert.deepEqual(report, expected);
  assert.equal(isAnalyticsApiResponseOfType({ data: report }, type), true);
  assert.equal(isAnalyticsApiResponseOfType({ data: report }, "pageViews"), false);
});

test("referrer reader supports the SQL empty row and an empty result", async () => {
  for (const rows of [[], [{
    referrer: null, visits: null, pageViews: null, activeSeconds: null, enquiryVisits: null,
    totalVisits: 0, totalPageViews: 0, totalActiveSeconds: 0, totalEnquiryVisits: 0,
  }]]) {
    const report = await readAnalytics(selection, { query: async () => rows });
    assert.deepEqual(report, {
      type: "referrers", startDate: selection.startDate, endDate: selection.endDate,
      referrers: [], totalVisits: 0, totalPageViews: 0, totalActiveSeconds: 0, totalEnquiryVisits: 0,
    });
    assert.equal(isAnalyticsReport(report), true);
  }
});

test("referrer contract rejects malformed rows, duplicate groups and inconsistent totals", () => {
  const report = createReport();
  assert.equal(isAnalyticsReport(report), true);
  for (const key of ["totalVisits", "totalPageViews", "totalActiveSeconds", "totalEnquiryVisits"]) {
    assert.equal(isAnalyticsReport({ ...report, [key]: report[key] + 1 }), false, key);
  }
  for (const patch of [
    { referrer: "" }, { referrer: null }, { visits: 0 }, { visits: "3" },
    { pageViews: -1 }, { activeSeconds: 1.5 }, { enquiryVisits: 4 },
    { enquiryVisits: undefined },
  ]) {
    assert.equal(isAnalyticsReport({
      ...report, referrers: report.referrers.map((row, index) => index === 0 ? { ...row, ...patch } : row),
    }), false, JSON.stringify(patch));
  }
  assert.equal(isAnalyticsReport({ ...report, endDate: "2026-07-31" }), false);
  assert.equal(isAnalyticsReport({ ...report, referrers: null }), false);
  assert.equal(isAnalyticsReport({
    ...report, referrers: report.referrers.map((row) => ({ ...row, referrer: "google.com" })),
  }), false);
});

test("referrer reader rejects invalid database counts", async () => {
  await assert.rejects(readAnalytics(selection, {
    query: async () => [{ ...createReport().referrers[0], activeSeconds: -1 }],
  }), /active time/);
});

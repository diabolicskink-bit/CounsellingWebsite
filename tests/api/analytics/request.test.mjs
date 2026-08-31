import assert from "node:assert/strict";
import { test } from "node:test";
import { getAnalyticsSelection } from "../../../src/server/reporting/request.ts";

const now = new Date("2026-08-16T04:00:00.000Z");
const visitorId = "7a2f0000-0000-4000-8000-000000000004";

test("parses each supported report selection", () => {
  const cases = [
    [undefined, { type: "daily", date: "2026-08-16" }],
    [{ date: " 2026-08-14 " }, { type: "daily", date: "2026-08-14" }],
    [{ month: "2026-08" }, { type: "monthly", month: "2026-08" }],
    [{ visitor: visitorId }, { type: "visitor", visitorId }],
    [
      { end: "2026-08-16", start: "2025-08-16" },
      {
        endDate: "2026-08-16",
        includeBots: false,
        startDate: "2025-08-16",
        type: "pageViews",
      },
    ],
    [
      { bots: "include", end: "2026-08-16", start: "2026-08-01" },
      {
        endDate: "2026-08-16",
        includeBots: true,
        startDate: "2026-08-01",
        type: "pageViews",
      },
    ],
    [
      { end: "2026-08-16", report: "keywords", start: "2026-07-18" },
      {
        endDate: "2026-08-16",
        includeBots: false,
        startDate: "2026-07-18",
        type: "keywords",
      },
    ],
  ];

  for (const [query, selection] of cases) {
    assert.deepEqual(
      getAnalyticsSelection(query, now),
      { type: "valid", selection },
      JSON.stringify(query),
    );
  }
});

test("rejects malformed, mixed, and out-of-bounds selections", () => {
  const invalidQueries = [
    { limit: "100" },
    { date: ["2026-08-14"] },
    { date: "2026-02-31" },
    { month: "2026-13" },
    { visitor: "not-a-visitor" },
    { date: "2026-08-14", month: "2026-08" },
    { bots: "include" },
    { bots: "exclude", end: "2026-08-16", start: "2026-08-01" },
    { start: "2026-08-01" },
    { report: "keywords" },
    { end: "2026-08-14", report: "sources", start: "2026-08-01" },
    { end: "2026-08-01", start: "2026-08-02" },
    { end: "2026-08-17", start: "2026-08-17" },
    { end: "2026-08-16", start: "2025-08-15" },
  ];

  for (const query of invalidQueries) {
    assert.deepEqual(getAnalyticsSelection(query, now), { type: "invalid" }, JSON.stringify(query));
  }
});

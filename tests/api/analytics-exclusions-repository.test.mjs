import assert from "node:assert/strict";
import { test } from "node:test";
import {
  listExcludedVisitorsSql,
  readExcludedVisitors,
  setVisitorExclusion,
  setVisitorExclusionSql,
  UnknownAnalyticsVisitorError,
} from "../../src/server/reporting/exclusions.ts";

const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";

test("reads excluded visitor summaries newest first", async () => {
  const calls = [];
  const database = {
    async query(query, parameters) {
      calls.push({ parameters, query });
      return [{
        excludedAt: new Date("2026-08-16T03:00:00.000Z"),
        firstSeenAt: "2026-08-01T01:00:00.000Z",
        latestSeenAt: "2026-08-16T02:00:00.000Z",
        totalVisits: "4",
        visitorId,
      }];
    },
  };

  const report = await readExcludedVisitors(database);

  assert.deepEqual(calls, [{ parameters: [], query: listExcludedVisitorsSql }]);
  assert.deepEqual(report, {
    type: "excluded",
    visitors: [{
      excludedAt: "2026-08-16T03:00:00.000Z",
      firstSeenAt: "2026-08-01T01:00:00.000Z",
      latestSeenAt: "2026-08-16T02:00:00.000Z",
      totalVisits: 4,
      visitorId,
    }],
  });
  assert.match(listExcludedVisitorsSql, /ORDER BY exclusions\.excluded_at DESC/i);
});

test("sets and removes a visitor exclusion idempotently", async () => {
  const calls = [];
  const database = {
    async query(query, parameters) {
      calls.push({ parameters, query });
      return [{ isExcluded: parameters[1], visitorExists: true }];
    },
  };

  assert.deepEqual(
    await setVisitorExclusion(visitorId, true, database),
    { isExcluded: true, visitorId },
  );
  assert.deepEqual(
    await setVisitorExclusion(visitorId, false, database),
    { isExcluded: false, visitorId },
  );
  assert.deepEqual(calls, [
    { parameters: [visitorId, true], query: setVisitorExclusionSql },
    { parameters: [visitorId, false], query: setVisitorExclusionSql },
  ]);
  assert.match(setVisitorExclusionSql, /ON CONFLICT \(visitor_id\) DO NOTHING/i);
  assert.match(setVisitorExclusionSql, /DELETE FROM analytics_excluded_visitors/i);
});

test("rejects an exclusion update for an unknown visitor", async () => {
  const database = {
    async query() {
      return [{ isExcluded: false, visitorExists: false }];
    },
  };

  await assert.rejects(
    setVisitorExclusion(visitorId, true, database),
    UnknownAnalyticsVisitorError,
  );
});

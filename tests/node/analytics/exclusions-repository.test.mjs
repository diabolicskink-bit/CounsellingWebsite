import assert from "node:assert/strict";
import { test } from "node:test";
import {
  readExcludedVisitors,
  setVisitorExclusion,
  UnknownAnalyticsVisitorError,
} from "../../../src/server/reporting/exclusions.ts";

const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";

test("reads excluded visitor summaries", async () => {
  const database = {
    async query() {
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
});

test("maps set and remove results", async () => {
  const parameters = [];
  const database = {
    async query(_query, values) {
      parameters.push(values);
      return [{ isExcluded: values[1], visitorExists: true }];
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
  assert.deepEqual(parameters, [[visitorId, true], [visitorId, false]]);
});

test("rejects an exclusion update for an unknown visitor", async () => {
  await assert.rejects(
    setVisitorExclusion(visitorId, true, {
      query: async () => [{ isExcluded: false, visitorExists: false }],
    }),
    UnknownAnalyticsVisitorError,
  );
});

test("rejects malformed stored exclusion summaries", async () => {
  const visitor = {
    excludedAt: "2026-08-16T03:00:00Z",
    firstSeenAt: "2026-08-01T01:00:00Z",
    latestSeenAt: "2026-08-16T02:00:00Z",
    totalVisits: 4,
    visitorId,
  };

  for (const patch of [{ totalVisits: "0x10" }, { excludedAt: "not-a-date" }]) {
    await assert.rejects(readExcludedVisitors({
      query: async () => [{ ...visitor, ...patch }],
    }));
  }
});

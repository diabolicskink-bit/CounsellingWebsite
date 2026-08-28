import assert from "node:assert/strict";
import { test } from "node:test";
import {
  deleteExpiredVisitData,
  deleteExpiredVisitDataSql,
} from "../../../src/server/visits/retention.ts";

test("emits the bounded cleanup and maps its deletion counts", async () => {
  const calls = [];
  const database = {
    async query(query, parameters) {
      calls.push({ parameters, query });
      return [{ exclusionsDeleted: 1, pageViewsDeleted: 9, visitsDeleted: 3 }];
    },
  };

  const result = await deleteExpiredVisitData(database);

  assert.deepEqual(result, { exclusionsDeleted: 1, pageViewsDeleted: 9, visitsDeleted: 3 });
  assert.deepEqual(calls, [{ parameters: [], query: deleteExpiredVisitDataSql }]);
  assert.match(deleteExpiredVisitDataSql, /INTERVAL '12 months'/i);
  assert.match(deleteExpiredVisitDataSql, /DELETE FROM site_visits/i);
  assert.match(deleteExpiredVisitDataSql, /site_page_views/i);
  assert.match(deleteExpiredVisitDataSql, /DELETE FROM analytics_excluded_visitors/i);
});

test("normalizes integer deletion counts returned as strings", async () => {
  const database = {
    async query() {
      return [{ exclusionsDeleted: "1", pageViewsDeleted: "4", visitsDeleted: "2" }];
    },
  };

  assert.deepEqual(
    await deleteExpiredVisitData(database),
    { exclusionsDeleted: 1, pageViewsDeleted: 4, visitsDeleted: 2 },
  );
});

test("rejects malformed cleanup results", async () => {
  const database = {
    async query() {
      return [{ exclusionsDeleted: 0, pageViewsDeleted: -1, visitsDeleted: 1 }];
    },
  };

  await assert.rejects(
    deleteExpiredVisitData(database),
    /invalid deletion count/i,
  );
});

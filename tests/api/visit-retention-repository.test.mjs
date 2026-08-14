import assert from "node:assert/strict";
import { test } from "node:test";
import {
  deleteExpiredVisitData,
  deleteExpiredVisitDataSql,
} from "../../src/server/visits/retention.ts";

test("deletes visits outside the 12-month window and counts cascaded page views", async () => {
  const calls = [];
  const database = {
    async query(query, parameters) {
      calls.push({ parameters, query });
      return [{ pageViewsDeleted: 9, visitsDeleted: 3 }];
    },
  };

  const result = await deleteExpiredVisitData(database);

  assert.deepEqual(result, { pageViewsDeleted: 9, visitsDeleted: 3 });
  assert.deepEqual(calls, [{ parameters: [], query: deleteExpiredVisitDataSql }]);
  assert.match(deleteExpiredVisitDataSql, /INTERVAL '12 months'/i);
  assert.match(deleteExpiredVisitDataSql, /DELETE FROM site_visits/i);
  assert.match(deleteExpiredVisitDataSql, /site_page_views/i);
});

test("normalizes integer deletion counts returned as strings", async () => {
  const database = {
    async query() {
      return [{ pageViewsDeleted: "4", visitsDeleted: "2" }];
    },
  };

  assert.deepEqual(
    await deleteExpiredVisitData(database),
    { pageViewsDeleted: 4, visitsDeleted: 2 },
  );
});

test("rejects malformed cleanup results", async () => {
  const database = {
    async query() {
      return [{ pageViewsDeleted: -1, visitsDeleted: 1 }];
    },
  };

  await assert.rejects(
    deleteExpiredVisitData(database),
    /invalid deletion count/i,
  );
});

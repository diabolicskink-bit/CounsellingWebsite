import assert from "node:assert/strict";
import { test } from "node:test";
import {
  deleteExpiredVisitData,
  deleteExpiredVisitDataSql,
} from "../../../src/server/visits/retention.ts";

test("returns bounded retention cleanup deletion counts", async () => {
  const database = {
    async query() {
      return [{ exclusionsDeleted: 1, pageViewsDeleted: 9, visitsDeleted: 3 }];
    },
  };

  assert.deepEqual(
    await deleteExpiredVisitData(database),
    { exclusionsDeleted: 1, pageViewsDeleted: 9, visitsDeleted: 3 },
  );
  assert.match(deleteExpiredVisitDataSql, /INTERVAL '12 months'[\s\S]*?visits\.started_at < cutoff\.expires_before/i);
  assert.match(
    deleteExpiredVisitDataSql,
    /FROM site_page_views AS page_views[\s\S]*?page_views\.visit_id IN \(SELECT id FROM expired_visits\)[\s\S]*?DELETE FROM site_visits AS visits\s*USING expired_visits/i,
  );
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

  await assert.rejects(deleteExpiredVisitData(database), /invalid deletion count/i);
});

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  PageEngagementIdentityConflictError,
  recordPageEngagement,
  recordPageEngagementSql,
} from "../../../src/server/page-engagement/repository.ts";

const observation = {
  activeSeconds: 47,
  pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
  visitId: "1a560836-220d-4d33-a05e-5f364891f9cb",
  visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
};

test("emits an ownership-checked cumulative active-time update", async () => {
  const calls = [];
  const database = {
    async query(query, parameters) {
      calls.push({ parameters, query });
      return [{ activeSeconds: 47 }];
    },
  };

  assert.deepEqual(await recordPageEngagement(observation, database), { activeSeconds: 47 });
  assert.deepEqual(calls, [{
    parameters: [observation.visitorId, observation.visitId, observation.pageViewId, 47],
    query: recordPageEngagementSql,
  }]);
  assert.match(recordPageEngagementSql, /GREATEST\(page_views\.active_seconds, \$4::INTEGER\)/);
  assert.match(recordPageEngagementSql, /page_views\.id = \$3::UUID/);
  assert.match(recordPageEngagementSql, /page_views\.visit_id = \$2::UUID/);
  assert.match(recordPageEngagementSql, /visits\.id = page_views\.visit_id/);
  assert.match(recordPageEngagementSql, /visits\.visitor_id = \$1::UUID/);
});

test("rejects a page view outside the supplied visit and visitor", async () => {
  const database = { async query() { return []; } };

  await assert.rejects(
    recordPageEngagement(observation, database),
    PageEngagementIdentityConflictError,
  );
});

import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const queriesUrl = new URL("../../../database/queries/", import.meta.url);

const queryFilenames = (await readdir(queriesUrl))
  .filter((filename) => filename.endsWith(".sql"))
  .sort();

function removeSqlComments(sql) {
  return sql.replaceAll(/^--.*$/gm, "");
}

test("saved visit ledger queries are read-only and cover each reporting task", async () => {
  assert.deepEqual(queryFilenames, [
    "01_latest_visits.sql",
    "02_visitors.sql",
    "03_today_overview.sql",
    "04_traffic_last_30_days.sql",
    "05_visit_page_sequence.sql",
  ]);

  const queries = new Map(await Promise.all(queryFilenames.map(async (filename) => [
    filename,
    await readFile(new URL(filename, queriesUrl), "utf8"),
  ])));

  for (const [filename, query] of queries) {
    const sql = removeSqlComments(query);

    assert.doesNotMatch(
      sql,
      /\b(?:ALTER|CREATE|DELETE|DROP|GRANT|INSERT|REVOKE|TRUNCATE|UPDATE)\b/i,
      `${filename} must remain read-only`,
    );
  }

  assert.match(
    queries.get("01_latest_visits.sql"),
    /ORDER BY ledger\.started_at DESC, ledger\.visit_id DESC/i,
  );
  assert.match(queries.get("02_visitors.sql"), /GROUP BY ledger\.visitor_id/i);
  assert.match(queries.get("03_today_overview.sql"), /Australia\/Perth/i);
  assert.match(queries.get("04_traffic_last_30_days.sql"), /matched_keyword/i);
  assert.match(queries.get("04_traffic_last_30_days.sql"), /is_bot IS NOT TRUE/i);
  assert.match(queries.get("03_today_overview.sql"), /webdriver_visit_count/i);
  assert.match(queries.get("03_today_overview.sql"), /webdriver_false_visit_count/i);
  assert.match(queries.get("02_visitors.sql"), /webdriver_false_visit_count/i);
  assert.match(queries.get("04_traffic_last_30_days.sql"), /device_type/i);
  for (const filename of ["01_latest_visits.sql", "05_visit_page_sequence.sql"]) {
    assert.match(queries.get(filename), /user_agent/i);
    assert.match(queries.get(filename), /is_webdriver/i);
  }
  for (const filename of queryFilenames.slice(0, 4)) {
    assert.match(queries.get(filename), /analytics_excluded_visitors/i);
  }
  assert.match(
    queries.get("05_visit_page_sequence.sql"),
    /ORDER BY page_views\.viewed_at, page_views\.id/i,
  );
});

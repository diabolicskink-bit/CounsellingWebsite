import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const migrationsUrl = new URL("../../database/migrations/", import.meta.url);
const queriesUrl = new URL("../../database/queries/", import.meta.url);
const viewMigration = await readFile(
  new URL("0002_create_visit_ledger_view.sql", migrationsUrl),
  "utf8",
);
const queryFilenames = (await readdir(queriesUrl))
  .filter((filename) => filename.endsWith(".sql"))
  .sort();

function removeSqlComments(sql) {
  return sql.replaceAll(/^--.*$/gm, "");
}

test("visit ledger migrations retain their application order", async () => {
  const migrationFilenames = (await readdir(migrationsUrl))
    .filter((filename) => filename.endsWith(".sql"))
    .sort();

  assert.deepEqual(migrationFilenames, [
    "0001_create_visit_ledger.sql",
    "0002_create_visit_ledger_view.sql",
  ]);
});

test("visit ledger view exposes return status, traffic source, and page totals", () => {
  assert.match(viewMigration, /CREATE VIEW visit_ledger/i);
  assert.match(viewMigration, /ROW_NUMBER\(\) OVER \(\s*PARTITION BY visits\.visitor_id/is);
  assert.match(viewMigration, /LAG\(visits\.started_at\) OVER/is);
  assert.match(viewMigration, /END AS visitor_status/i);
  assert.match(viewMigration, /END AS traffic_source/i);
  assert.match(viewMigration, /COUNT\(\*\)::INTEGER AS page_view_count/i);
  assert.match(viewMigration, /WITH \(security_invoker = true\)/i);
});

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
  assert.match(
    queries.get("05_visit_page_sequence.sql"),
    /ORDER BY page_views\.viewed_at, page_views\.id/i,
  );
});

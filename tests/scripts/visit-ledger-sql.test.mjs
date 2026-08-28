import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const migrationsUrl = new URL("../../database/migrations/", import.meta.url);
const queriesUrl = new URL("../../database/queries/", import.meta.url);
const baseMigration = await readFile(
  new URL("0001_create_visit_ledger.sql", migrationsUrl),
  "utf8",
);
const viewMigration = await readFile(
  new URL("0002_create_visit_ledger_view.sql", migrationsUrl),
  "utf8",
);
const botMigration = await readFile(
  new URL("0003_add_visit_bot_classification.sql", migrationsUrl),
  "utf8",
);
const eventMigration = await readFile(
  new URL("0004_create_visit_event_ledger.sql", migrationsUrl),
  "utf8",
);
const exclusionMigration = await readFile(
  new URL("0005_create_analytics_visitor_exclusions.sql", migrationsUrl),
  "utf8",
);
const activeTimeMigration = await readFile(
  new URL("0006_add_page_view_active_time.sql", migrationsUrl),
  "utf8",
);
const clientEnvironmentMigration = await readFile(
  new URL("0007_add_visit_client_environment.sql", migrationsUrl),
  "utf8",
);
const queryFilenames = (await readdir(queriesUrl))
  .filter((filename) => filename.endsWith(".sql"))
  .sort();

function removeSqlComments(sql) {
  return sql.replaceAll(/^--.*$/gm, "");
}

test("base visit schema cascades page views when a visit is deleted", () => {
  assert.match(
    baseMigration,
    /visit_id UUID NOT NULL REFERENCES site_visits\(id\) ON DELETE CASCADE/i,
  );
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

test("bot classification migration preserves nullable verdicts and verified identities", () => {
  assert.match(botMigration, /ADD COLUMN is_bot BOOLEAN/i);
  assert.match(botMigration, /ADD COLUMN bot_name TEXT/i);
  assert.match(botMigration, /ADD COLUMN bot_category TEXT/i);
  assert.match(botMigration, /CREATE OR REPLACE VIEW visit_ledger/i);
  assert.match(botMigration, /ordered_visits\.is_bot/i);
});

test("visit-event migration enforces controlled event and page ownership data", () => {
  assert.match(eventMigration, /CREATE TABLE site_visit_events/i);
  assert.match(eventMigration, /id UUID PRIMARY KEY/i);
  assert.match(eventMigration, /visit_id UUID NOT NULL REFERENCES site_visits/i);
  assert.match(eventMigration, /FOREIGN KEY \(page_view_id, visit_id\)/i);
  assert.match(eventMigration, /occurred_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP/i);
  assert.match(eventMigration, /source IN \('client', 'server'\)/i);
  assert.match(eventMigration, /properties JSONB NOT NULL/i);
  assert.match(eventMigration, /contact_option_selected/i);
  assert.match(eventMigration, /enquiry_started/i);
  assert.match(eventMigration, /enquiry_submit_attempted/i);
  assert.match(eventMigration, /enquiry_sent/i);
  assert.match(eventMigration, /enquiry_failed/i);
});

test("visitor-exclusion migration creates a durable visitor-level filter", () => {
  assert.match(exclusionMigration, /CREATE TABLE analytics_excluded_visitors/i);
  assert.match(exclusionMigration, /visitor_id UUID PRIMARY KEY/i);
  assert.match(exclusionMigration, /excluded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP/i);
});

test("page-view active-time migration stores bounded cumulative seconds", () => {
  assert.match(activeTimeMigration, /ADD COLUMN active_seconds INTEGER NOT NULL DEFAULT 0/i);
  assert.match(activeTimeMigration, /active_seconds BETWEEN 0 AND 43200/i);
});

test("client-environment migration stores bounded visit-level diagnostics", () => {
  assert.match(clientEnvironmentMigration, /ADD COLUMN user_agent TEXT/i);
  assert.match(clientEnvironmentMigration, /ADD COLUMN device_type TEXT NOT NULL DEFAULT 'unknown'/i);
  assert.match(clientEnvironmentMigration, /ADD COLUMN is_webdriver BOOLEAN/i);
  assert.match(clientEnvironmentMigration, /char_length\(user_agent\) BETWEEN 1 AND 1024/i);
  assert.match(
    clientEnvironmentMigration,
    /device_type IN \('desktop', 'mobile', 'tablet', 'unknown'\)/i,
  );
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

import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  getMigrationChecksums,
  getTransactionalStatements,
  readMigrations,
  splitSqlStatements,
} from "../../scripts/apply-database-migrations.mjs";

const migrationsUrl = new URL("../../database/migrations/", import.meta.url);
const queriesUrl = new URL("../../database/queries/", import.meta.url);
const viewMigration = await readFile(
  new URL("0002_create_visit_ledger_view.sql", migrationsUrl),
  "utf8",
);
const botMigration = await readFile(
  new URL("0003_add_visit_bot_classification.sql", migrationsUrl),
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
    "0003_add_visit_bot_classification.sql",
  ]);
});

test("database migration reader returns the ordered ledger migrations", async () => {
  const migrations = await readMigrations();

  assert.deepEqual(
    migrations.map((migration) => migration.filename),
    [
      "0001_create_visit_ledger.sql",
      "0002_create_visit_ledger_view.sql",
      "0003_add_visit_bot_classification.sql",
    ],
  );
  assert.ok(migrations.every((migration) => /^[a-f0-9]{64}$/.test(migration.checksum)));
  assert.ok(migrations.every((migration) => migration.statements.length > 0));
});

test("migration checksums are stable across checkout line endings", () => {
  const lfSql = "BEGIN;\nSELECT 'stable';\nCOMMIT;\n";
  const crlfSql = lfSql.replaceAll("\n", "\r\n");
  const lfChecksums = getMigrationChecksums(lfSql);
  const crlfChecksums = getMigrationChecksums(crlfSql);

  assert.equal(lfChecksums.checksum, crlfChecksums.checksum);
  assert.ok(lfChecksums.acceptedChecksums.includes(crlfChecksums.checksum));
  assert.ok(crlfChecksums.acceptedChecksums.includes(lfChecksums.checksum));
});

test("SQL splitting preserves semicolons inside quoted and commented content", () => {
  const statements = splitSqlStatements(`
    SELECT 'one;two', "three;four", $$five;six$$;
    -- seven;eight
    SELECT 2 /* nine;ten */;
  `);

  assert.equal(statements.length, 2);
  assert.match(statements[0], /one;two/);
  assert.match(statements[0], /five;six/);
  assert.match(statements[1], /nine;ten/);
});

test("migration transaction boundaries are validated and removed", () => {
  assert.deepEqual(
    getTransactionalStatements("BEGIN; SELECT 1; SELECT 'two;three'; COMMIT;"),
    ["SELECT 1", "SELECT 'two;three'"],
  );
  assert.throws(
    () => getTransactionalStatements("SELECT 1;"),
    /one BEGIN followed by one COMMIT/,
  );
  assert.throws(
    () => getTransactionalStatements("BEGIN; COMMIT; SELECT 1;"),
    /one BEGIN followed by one COMMIT/,
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
  assert.match(
    queries.get("05_visit_page_sequence.sql"),
    /ORDER BY page_views\.viewed_at, page_views\.id/i,
  );
});

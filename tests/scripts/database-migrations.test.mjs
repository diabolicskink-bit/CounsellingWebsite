import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getMigrationChecksums,
  getTransactionalStatements,
  readMigrations,
  splitSqlStatements,
} from "../../scripts/apply-database-migrations.mjs";

const migrationFilenames = [
  "0001_create_visit_ledger.sql",
  "0002_create_visit_ledger_view.sql",
  "0003_add_visit_bot_classification.sql",
  "0004_create_visit_event_ledger.sql",
  "0005_create_analytics_visitor_exclusions.sql",
  "0006_add_page_view_active_time.sql",
  "0007_add_visit_client_environment.sql",
  "0008_add_contact_link_events.sql",
  "0009_add_visit_location.sql",
];

test("migration reader returns the complete ordered migration set", async () => {
  const migrations = await readMigrations();

  assert.deepEqual(
    migrations.map((migration) => migration.filename),
    migrationFilenames,
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

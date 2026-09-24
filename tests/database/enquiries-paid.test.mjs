// Runs the real query against synthetic Preview CTEs; no retained data is read or changed.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { parseEnv } from "node:util";
import { neon } from "@neondatabase/serverless";
import { monthlyEnquiryMetricsSql } from "../../src/server/reporting/queries.ts";

const fixtureSql = `WITH
visit_ledger(visit_id, visitor_id, started_at, is_bot, traffic_source) AS (
  VALUES
    (1, 1, '2026-08-15T02:00:00Z'::TIMESTAMPTZ, FALSE, 'paid'),
    (2, 1, '2026-09-10T02:00:00Z', FALSE, 'direct'),
    (3, 2, '2026-09-05T02:00:00Z', FALSE, 'paid'),
    (4, 3, '2026-09-06T02:00:00Z', FALSE, 'direct'),
    (5, 3, '2026-09-07T02:00:00Z', FALSE, 'paid'),
    (6, 4, '2026-09-08T02:00:00Z', FALSE, 'paid'),
    (7, 4, '2026-09-09T02:00:00Z', FALSE, 'direct'),
    (8, 5, '2026-09-12T02:00:00Z', TRUE, 'paid'),
    (9, 5, '2026-09-13T02:00:00Z', TRUE, 'direct'),
    (10, 6, '2026-09-12T02:00:00Z', FALSE, 'paid'),
    (11, 6, '2026-09-13T02:00:00Z', FALSE, 'direct'),
    (12, 7, '2026-08-31T15:59:00Z', FALSE, 'paid'),
    (13, 7, '2026-08-31T16:00:00Z', FALSE, 'direct'),
    (14, 8, '2026-09-30T15:59:00Z', FALSE, 'paid'),
    (15, 9, '2026-09-30T16:00:00Z', FALSE, 'paid'),
    (16, 10, '2026-08-31T16:00:00Z', FALSE, 'paid'),
    (17, 11, '2026-08-31T15:00:00Z', FALSE, 'paid'),
    (18, 12, '2026-09-16T02:00:00Z', FALSE, 'paid'),
    (19, 12, '2026-09-15T02:00:00Z', FALSE, 'paid')
),
analytics_excluded_visitors(visitor_id) AS (
  VALUES (6)
),
site_visit_events(visit_id, event_type, occurred_at) AS (
  VALUES
    (2, 'enquiry_sent', '2026-09-10T03:00:00Z'::TIMESTAMPTZ),
    (2, 'email_link_clicked', '2026-09-10T03:01:00Z'),
    (4, 'phone_link_clicked', '2026-09-06T03:00:00Z'),
    (7, 'enquiry_sent', '2026-09-09T03:00:00Z'),
    (9, 'enquiry_sent', '2026-09-13T03:00:00Z'),
    (11, 'enquiry_sent', '2026-09-13T03:00:00Z'),
    (13, 'email_link_clicked', '2026-08-31T16:00:00Z'),
    (14, 'phone_link_clicked', '2026-09-30T15:59:30Z'),
    (15, 'enquiry_sent', '2026-09-30T16:01:00Z'),
    (17, 'enquiry_sent', '2026-08-31T15:30:00Z'),
    (18, 'enquiry_sent', '2026-09-16T03:00:00Z'),
    (18, 'email_link_clicked', '2026-09-16T03:01:00Z'),
    (3, 'enquiry_failed', '2026-09-05T03:00:00Z'),
    (3, 'instagram_link_clicked', '2026-09-05T03:01:00Z')
),`;

test("monthly paid enquiry metrics use event month and prior paid history", async () => {
  const preview = parseEnv(await readFile(new URL("../../.env.preview.local", import.meta.url), "utf8"));
  assert.ok(preview.DATABASE_URL, "Configure Preview DATABASE_URL in .env.preview.local before running test:database.");
  const sql = neon(preview.DATABASE_URL);
  const query = fixtureSql + monthlyEnquiryMetricsSql.replace(/^\s*WITH/, "");

  const [withoutBots] = await sql.query(query, ["2026-09", false]);
  assert.deepEqual({
    paidVisits: withoutBots.paidVisits,
    paidAttributedEnquiries: withoutBots.paidAttributedEnquiries,
    paidVisitsWithEnquiry: withoutBots.paidVisitsWithEnquiry,
  }, {
    paidVisits: 7,
    paidAttributedEnquiries: 7,
    paidVisitsWithEnquiry: 3,
  });

  const [withBots] = await sql.query(query, ["2026-09", true]);
  assert.deepEqual({
    paidVisits: withBots.paidVisits,
    paidAttributedEnquiries: withBots.paidAttributedEnquiries,
    paidVisitsWithEnquiry: withBots.paidVisitsWithEnquiry,
  }, {
    paidVisits: 8,
    paidAttributedEnquiries: 8,
    paidVisitsWithEnquiry: 4,
  });
});

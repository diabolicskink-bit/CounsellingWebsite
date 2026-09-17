// Runs the real query against synthetic Preview CTEs; no retained data is read or changed.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { test } from "node:test";
import { neon } from "@neondatabase/serverless";
import { isAnalyticsReport } from "../../src/contracts/analyticsContract.ts";
import { readAnalytics } from "../../src/server/reporting/reader.ts";

const fixtureSql = `WITH
visit_ledger AS (
  SELECT
    visit_id,
    visit_id AS visitor_id,
    1 AS visit_number,
    '2026-09-17T02:00:00Z'::TIMESTAMPTZ AS started_at,
    FALSE AS is_bot,
    'paid' AS traffic_source,
    CASE WHEN visit_id = 7 THEN NULL ELSE 'counselling' END AS matched_keyword,
    'e' AS match_type
  FROM GENERATE_SERIES(1, 7) AS visits(visit_id)
),
analytics_excluded_visitors AS (
  SELECT NULL::INTEGER AS visitor_id WHERE FALSE
),
site_page_views AS (
  SELECT visit_id, 10 AS active_seconds
  FROM visit_ledger CROSS JOIN GENERATE_SERIES(1, 2)
),
site_visit_events(visit_id, event_type) AS (
  VALUES
    (1, 'enquiry_sent'),
    (2, 'email_link_clicked'), (2, 'email_link_clicked'),
    (3, 'phone_link_clicked'),
    (4, 'instagram_link_clicked'), (4, 'linkedin_link_clicked'),
    (4, 'consult_cta_clicked'), (4, 'enquiry_started'), (4, 'enquiry_submit_attempted'),
    (5, 'enquiry_failed'),
    (6, 'enquiry_sent'), (6, 'phone_link_clicked'), (6, 'email_link_clicked'),
    (7, 'email_link_clicked')
),`;

test("keyword enquiry visits include all contact channels once, excluding social clicks and incomplete forms", async () => {
  const preview = parseEnv(await readFile(new URL("../../.env.preview.local", import.meta.url), "utf8"));
  assert.ok(preview.DATABASE_URL, "Configure Preview DATABASE_URL in .env.preview.local before running test:database.");
  const sql = neon(preview.DATABASE_URL);
  const database = {
    query: (query, parameters) => sql.query(fixtureSql + query.replace(/^\s*WITH/, ""), parameters),
  };
  const report = await readAnalytics({
    type: "keywords", startDate: "2026-09-17", endDate: "2026-09-17", includeBots: false,
  }, database);

  assert.equal(isAnalyticsReport(report), true);
  assert.equal(report.totalPaidVisits, 7);
  assert.equal(report.taggedVisits, 6);
  assert.equal(report.totalEnquiryVisits, 5);
  assert.equal(report.taggedEnquiryVisits, 4);
  assert.equal(report.totalPageViews, 14);
  assert.equal(report.totalActiveSeconds, 140);
  assert.equal(report.keywords.length, 1);
  assert.equal(report.keywords[0].visits, 6);
  assert.equal(report.keywords[0].enquiryVisits, 4);
  assert.equal(report.keywords[0].pageViews, 12);
  assert.equal(report.keywords[0].activeSeconds, 120);
});

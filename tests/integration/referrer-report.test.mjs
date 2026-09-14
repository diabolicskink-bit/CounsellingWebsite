// Opt-in PostgreSQL check: set REFERRER_TEST_DATABASE_URL to the Preview database.
// Every report source is shadowed by VALUES-backed CTEs; no retained data is read or changed.
import assert from "node:assert/strict";
import { test } from "node:test";
import { neon } from "@neondatabase/serverless";
import { isAnalyticsReport } from "../../src/data/analyticsContract.ts";
import { readAnalytics } from "../../src/server/reporting/reader.ts";

const fixtureSql = `WITH
visit_ledger(visit_id, visitor_id, referrer_host, started_at, is_bot, traffic_source) AS (
  VALUES
    (1, 1, 'www.Google.COM', '2026-08-14T16:00:00Z'::TIMESTAMPTZ, FALSE, 'paid'),
    (2, 2, 'google.com', '2026-08-15T15:59:59Z'::TIMESTAMPTZ, FALSE, 'referral'),
    (3, 3, 'www.google.com.au', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'referral'),
    (4, 4, 'mail.google.com', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'referral'),
    (5, 5, 'vivecounselling.com.au', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'internal'),
    (6, 6, 'WWW.ViveCounselling.com.au', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'paid'),
    (7, 7, NULL, '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'paid'),
    (8, 8, NULL, '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'direct'),
    (9, 9, 'example.com', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, TRUE, 'referral'),
    (10, 10, 'google.com', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'referral'),
    (11, 11, 'before.example', '2026-08-14T15:59:59Z'::TIMESTAMPTZ, FALSE, 'referral'),
    (12, 12, 'after.example', '2026-08-15T16:00:00Z'::TIMESTAMPTZ, FALSE, 'referral'),
    (13, 13, 'example.org', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, NULL, 'referral'),
    (14, 14, 'www.www.example.com', '2026-08-15T01:00:00Z'::TIMESTAMPTZ, FALSE, 'referral')
),
analytics_excluded_visitors(visitor_id) AS (VALUES (10)),
site_page_views(visit_id, active_seconds, viewed_at) AS (
  SELECT visit_id, 10, started_at FROM visit_ledger
  UNION ALL VALUES (1, 20, '2026-08-17T00:00:00Z'::TIMESTAMPTZ),
                   (1, 30, '2026-08-17T00:01:00Z'::TIMESTAMPTZ)
),
site_visit_events(visit_id, event_type, occurred_at) AS (
  SELECT visit_id, event_type, '2026-08-17T00:00:00Z'::TIMESTAMPTZ
  FROM (VALUES
    (1, 'enquiry_sent'), (1, 'enquiry_sent'), (1, 'phone_link_clicked'),
    (2, 'phone_link_clicked'), (5, 'enquiry_failed'), (7, 'enquiry_sent'),
    (8, 'email_link_clicked'), (10, 'enquiry_sent'), (13, 'phone_link_clicked')
  ) AS events(visit_id, event_type)
),`;

test("referrer SQL groups arrivals and counts retained journeys without multiplying outcomes", {
  skip: !process.env.REFERRER_TEST_DATABASE_URL,
}, async () => {
  const sql = neon(process.env.REFERRER_TEST_DATABASE_URL);
  const database = {
    query: (query, parameters) => sql.query(fixtureSql + query.replace(/^\s*WITH/, ""), parameters),
  };
  const selection = {
    type: "referrers", startDate: "2026-08-15", endDate: "2026-08-15", includeBots: false,
  };
  const report = await readAnalytics(selection, database);
  assert.equal(isAnalyticsReport(report), true);
  assert.deepEqual(report.referrers.map((row) => [row.referrer, row.visits]), [
    ["google.com", 2], ["Internal", 2], ["No referrer recorded", 2],
    ["example.org", 1], ["google.com.au", 1], ["mail.google.com", 1], ["www.example.com", 1],
  ]);
  assert.deepEqual(report.referrers[0], {
    referrer: "google.com", visits: 2, pageViews: 4, activeSeconds: 70, enquiryVisits: 2,
  });
  assert.equal(report.totalVisits, 10);
  assert.equal(report.totalPageViews, 12);
  assert.equal(report.totalActiveSeconds, 150);
  assert.equal(report.totalEnquiryVisits, 4);
  assert.equal(report.referrers.find((row) => row.referrer === "Internal").enquiryVisits, 0);
  assert.equal(report.referrers.find((row) => row.referrer === "No referrer recorded").enquiryVisits, 1);

  const bots = await readAnalytics({ ...selection, includeBots: true }, database);
  assert.equal(isAnalyticsReport(bots), true);
  assert.equal(bots.totalVisits, 11);
  assert.equal(bots.totalPageViews, 13);
  assert.equal(bots.totalActiveSeconds, 160);
  assert.equal(bots.totalEnquiryVisits, 4);
  assert.equal(bots.referrers.find((row) => row.referrer === "example.com").visits, 1);

  const empty = await readAnalytics({
    ...selection, startDate: "2026-08-18", endDate: "2026-08-18",
  }, database);
  assert.deepEqual(empty.referrers, []);
  assert.equal(empty.totalVisits, 0);
  assert.equal(empty.totalPageViews, 0);
  assert.equal(empty.totalEnquiryVisits, 0);
  assert.equal(empty.totalActiveSeconds, 0);
  assert.equal(isAnalyticsReport(empty), true);
});

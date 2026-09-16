import assert from "node:assert/strict";
import { test } from "node:test";
import {
  dailyAnalyticsSql,
  keywordAnalyticsSql,
  monthlyEnquiryAnalyticsSql,
  pageViewsAnalyticsSql,
  referrersAnalyticsSql,
  visitorAnalyticsSql,
} from "../../../src/server/reporting/reader.ts";

test("reporting queries preserve their data and filtering boundaries", () => {
  for (const query of [
    dailyAnalyticsSql,
    keywordAnalyticsSql,
    monthlyEnquiryAnalyticsSql,
    pageViewsAnalyticsSql,
    referrersAnalyticsSql,
  ]) {
    assert.match(query, /Australia\/Perth/);
    assert.match(query, /analytics_excluded_visitors/);
  }

  assert.match(dailyAnalyticsSql, /ORDER BY ledger\.started_at DESC/);
  assert.match(dailyAnalyticsSql, /visitor_visits\.visitor_id = ledger\.visitor_id/);
  assert.match(dailyAnalyticsSql, /visit_record\.id = ledger\.visit_id/);
  assert.match(dailyAnalyticsSql, /ORDER BY page_views\.viewed_at, page_views\.id/);
  assert.match(dailyAnalyticsSql, /ORDER BY visit_events\.occurred_at, visit_events\.id/);
  for (const alias of [
    "userAgent",
    "deviceType",
    "isWebDriver",
    "locationCountryCode",
    "locationRegionCode",
  ]) {
    assert.match(dailyAnalyticsSql, new RegExp(`AS "${alias}"`));
  }

  assert.match(visitorAnalyticsSql, /analytics_excluded_visitors/);
  assert.doesNotMatch(visitorAnalyticsSql, /AND NOT EXISTS\s*\(/);

  for (const eventType of [
    "email_link_clicked",
    "enquiry_sent",
    "enquiry_failed",
    "phone_link_clicked",
  ]) {
    assert.match(monthlyEnquiryAnalyticsSql, new RegExp(`'${eventType}'`));
  }
  assert.match(monthlyEnquiryAnalyticsSql, /INTERVAL '1 month'/);

  assert.match(pageViewsAnalyticsSql, /COUNT\(DISTINCT page_views\.visit_id\)/);
  assert.match(pageViewsAnalyticsSql, /SUM\(page_views\.active_seconds\)/);
  assert.match(pageViewsAnalyticsSql, /ledger\.is_bot IS DISTINCT FROM TRUE/);
  assert.doesNotMatch(pageViewsAnalyticsSql, /site_visit_events|outbound|_clicks/);

  assert.match(keywordAnalyticsSql, /ledger\.traffic_source = 'paid'/);
  assert.match(keywordAnalyticsSql, /SUM\(page_views\.active_seconds\)/);
  for (const eventType of ["enquiry_sent", "phone_link_clicked"]) {
    assert.match(keywordAnalyticsSql, new RegExp(`'${eventType}'`));
  }
  assert.match(keywordAnalyticsSql, /ledger\.is_bot IS DISTINCT FROM TRUE/);
  assert.doesNotMatch(keywordAnalyticsSql, /landing_path|topLandingPath/);
});

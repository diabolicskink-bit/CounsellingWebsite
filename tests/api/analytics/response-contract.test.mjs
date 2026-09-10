import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isAnalyticsApiResponseOfType,
  isAnalyticsReport,
  isAnalyticsReportOfType,
} from "../../../src/data/analyticsContract.ts";

const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";
const otherVisitorId = "78c09df2-880c-44c8-8336-2a28fd0bb65c";

function createPageView(overrides = {}) {
  return {
    activeSeconds: 90,
    id: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    path: "/contact",
    viewedAt: "2026-08-15T03:00:00.000Z",
    ...overrides,
  };
}

function createEvent(overrides = {}) {
  return {
    eventType: "contact_option_selected",
    id: "21ed6eca-8270-461e-bf7a-ea3a63e4d3ac",
    occurredAt: "2026-08-15T03:04:00.000Z",
    pageViewId: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
    properties: { option: "appointment" },
    source: "client",
    ...overrides,
  };
}

function createVisit(overrides = {}) {
  return {
    adCode: "enm",
    botCategory: null,
    botName: null,
    dateKey: "2026-08-15",
    deviceType: "desktop",
    durationSeconds: 305,
    events: [createEvent()],
    gclid: "CjwK-test",
    id: "1a560836-220d-4d33-a05e-5f364891f9cb",
    isBot: false,
    isWebDriver: false,
    landingPath: "/polyamory-enm-counselling",
    lastSeenAt: "2026-08-15T03:05:00.000Z",
    locationCountryCode: "AU",
    locationRegionCode: "WA",
    matchType: "p",
    matchedKeyword: "polyamory therapy",
    networkCode: "g",
    pageViews: [createPageView()],
    referrerHost: "www.google.com",
    referrerUrl: "https://www.google.com/",
    startedAt: "2026-08-15T03:00:00.000Z",
    totalVisits: 3,
    trafficSource: "paid",
    userAgent: "Mozilla/5.0",
    visitNumber: 2,
    visitorId,
    ...overrides,
  };
}

function createReports() {
  return {
    daily: { date: "2026-08-15", type: "daily", visits: [createVisit()] },
    excluded: {
      type: "excluded",
      visitors: [{
        excludedAt: "2026-08-15T03:00:00.000Z",
        firstSeenAt: "2026-08-01T03:00:00.000Z",
        latestSeenAt: "2026-08-15T03:05:00.000Z",
        totalVisits: 3,
        visitorId,
      }],
    },
    keywords: {
      endDate: "2026-08-15",
      keywords: [{
        activeSeconds: 90,
        enquiryVisits: 1,
        keyword: "polyamory therapy",
        latestVisitAt: "2026-08-15T11:00:00.000+08:00",
        matchTypes: ["p"],
        pageViews: 2,
        returningVisits: 1,
        visits: 1,
      }],
      startDate: "2026-08-01",
      taggedEnquiryVisits: 1,
      taggedVisits: 1,
      totalActiveSeconds: 90,
      totalEnquiryVisits: 1,
      totalPageViews: 2,
      totalPaidVisits: 1,
      type: "keywords",
    },
    monthly: { month: "2026-08", type: "monthly", visits: [createVisit()] },
    pageViews: {
      endDate: "2026-08-15",
      routes: [{
        activeSeconds: 90,
        pageViews: 2,
        path: "/contact",
        visits: 1,
      }],
      startDate: "2026-08-01",
      totalActiveSeconds: 90,
      totalPageViews: 2,
      totalVisits: 1,
      type: "pageViews",
    },
    visitor: {
      isExcluded: false,
      type: "visitor",
      visitorId,
      visits: [createVisit()],
    },
  };
}

test("accepts every complete analytics report and its API envelope", () => {
  for (const report of Object.values(createReports())) {
    assert.equal(isAnalyticsReport(report), true, report.type);
    assert.equal(isAnalyticsReportOfType(report, report.type), true, report.type);
    assert.equal(isAnalyticsApiResponseOfType({ data: report }, report.type), true, report.type);
  }
});

test("requires the report discriminator expected by the requesting page", () => {
  const dailyReport = createReports().daily;

  assert.equal(isAnalyticsReportOfType(dailyReport, "keywords"), false);
  assert.equal(isAnalyticsApiResponseOfType({ data: dailyReport }, "keywords"), false);
  assert.equal(isAnalyticsApiResponseOfType({ error: "unavailable" }, "daily"), false);
});

test("rejects malformed nested visits, page views, and events", () => {
  const { daily, visitor } = createReports();
  const invalidCases = [
    [
      "fractional page-view active time",
      {
        ...daily,
        visits: [createVisit({ pageViews: [createPageView({ activeSeconds: 1.5 })] })],
      },
    ],
    [
      "non-string event properties",
      {
        ...daily,
        visits: [createVisit({ events: [createEvent({ properties: { option: false } })] })],
      },
    ],
    [
      "visit sequence beyond total visits",
      { ...daily, visits: [createVisit({ totalVisits: 1 })] },
    ],
    [
      "Australian visit without a region",
      { ...daily, visits: [createVisit({ locationCountryCode: "AU", locationRegionCode: null })] },
    ],
    [
      "visitor history containing another visitor",
      { ...visitor, visits: [createVisit({ visitorId: otherVisitorId })] },
    ],
  ];

  for (const [name, report] of invalidCases) {
    assert.equal(isAnalyticsReport(report), false, name);
  }
});

test("rejects malformed aggregate rows and report context", () => {
  const { daily, excluded, keywords, monthly, pageViews } = createReports();
  const [route] = pageViews.routes;
  const [keyword] = keywords.keywords;
  const [excludedVisitor] = excluded.visitors;
  const invalidCases = [
    ["reversed report dates", { ...pageViews, endDate: "2026-07-31" }],
    [
      "route without page views",
      { ...pageViews, routes: [{ ...route, pageViews: 0 }], totalPageViews: 0 },
    ],
    ["route totals that do not reconcile", { ...pageViews, totalPageViews: 0 }],
    [
      "excluded visitor without retained visits",
      { ...excluded, visitors: [{ ...excludedVisitor, totalVisits: 0 }] },
    ],
    [
      "empty keyword match type",
      { ...keywords, keywords: [{ ...keyword, matchTypes: [""] }] },
    ],
    ["keyword totals that do not reconcile", { ...keywords, taggedVisits: 2 }],
    [
      "keyword counts beyond its visits",
      { ...keywords, keywords: [{ ...keyword, enquiryVisits: 2, returningVisits: 2 }] },
    ],
    ["invalid daily date", { ...daily, date: "2026-02-30" }],
    ["invalid monthly date", { ...monthly, month: "2026-13" }],
  ];

  for (const [name, report] of invalidCases) {
    assert.equal(isAnalyticsReport(report), false, name);
  }
});

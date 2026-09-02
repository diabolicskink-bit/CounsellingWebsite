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
  return [
    { date: "2026-08-15", type: "daily", visits: [createVisit()] },
    { month: "2026-08", type: "monthly", visits: [createVisit()] },
    {
      isExcluded: false,
      type: "visitor",
      visitorId,
      visits: [createVisit()],
    },
    {
      type: "excluded",
      visitors: [{
        excludedAt: "2026-08-15T03:00:00.000Z",
        firstSeenAt: "2026-08-01T03:00:00.000Z",
        latestSeenAt: "2026-08-15T03:05:00.000Z",
        totalVisits: 3,
        visitorId,
      }],
    },
    {
      endDate: "2026-08-15",
      routes: [{
        activeSeconds: 90,
        emailClicks: 1,
        instagramClicks: 0,
        linkedinClicks: 1,
        outboundClicks: 2,
        pageViews: 2,
        path: "/contact",
        visits: 1,
      }],
      startDate: "2026-08-01",
      totalActiveSeconds: 90,
      totalEmailClicks: 1,
      totalInstagramClicks: 0,
      totalLinkedinClicks: 1,
      totalOutboundClicks: 2,
      totalPageViews: 2,
      totalVisits: 1,
      type: "pageViews",
    },
    {
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
  ];
}

test("accepts every complete analytics report and its API envelope", () => {
  for (const report of createReports()) {
    assert.equal(isAnalyticsReport(report), true, report.type);
    assert.equal(isAnalyticsReportOfType(report, report.type), true, report.type);
    assert.equal(isAnalyticsApiResponseOfType({ data: report }, report.type), true, report.type);
  }
});

test("requires the report discriminator expected by the requesting page", () => {
  const dailyReport = createReports()[0];

  assert.equal(isAnalyticsReportOfType(dailyReport, "keywords"), false);
  assert.equal(isAnalyticsApiResponseOfType({ data: dailyReport }, "keywords"), false);
  assert.equal(isAnalyticsApiResponseOfType({ error: "unavailable" }, "daily"), false);
});

test("rejects malformed nested visits, page views, and events", () => {
  const invalidReports = [
    {
      date: "2026-08-15",
      type: "daily",
      visits: [createVisit({ pageViews: [createPageView({ activeSeconds: 1.5 })] })],
    },
    {
      date: "2026-08-15",
      type: "daily",
      visits: [createVisit({ events: [createEvent({ properties: { option: false } })] })],
    },
    {
      date: "2026-08-15",
      type: "daily",
      visits: [createVisit({ totalVisits: 1 })],
    },
    {
      date: "2026-08-15",
      type: "daily",
      visits: [createVisit({ startedAt: "1" })],
    },
    {
      date: "2026-08-15",
      type: "daily",
      visits: [createVisit({ locationCountryCode: "AU", locationRegionCode: null })],
    },
    {
      date: "2026-08-15",
      type: "daily",
      visits: [createVisit({ locationCountryCode: "NZ", locationRegionCode: "WA" })],
    },
    {
      isExcluded: false,
      type: "visitor",
      visitorId,
      visits: [createVisit({ visitorId: otherVisitorId })],
    },
  ];

  for (const report of invalidReports) {
    assert.equal(isAnalyticsReport(report), false);
  }
});

test("rejects malformed aggregate rows and report context", () => {
  const invalidReports = [
    {
      endDate: "2026-08-01",
      routes: [],
      startDate: "2026-08-15",
      totalActiveSeconds: 0,
      totalPageViews: 0,
      totalVisits: 0,
      type: "pageViews",
    },
    {
      endDate: "2026-08-15",
      routes: [{
        activeSeconds: 1,
        emailClicks: 0,
        instagramClicks: 0,
        linkedinClicks: 0,
        outboundClicks: 0,
        pageViews: 1,
        path: "",
        visits: 1,
      }],
      startDate: "2026-08-01",
      totalActiveSeconds: 1,
      totalEmailClicks: 0,
      totalInstagramClicks: 0,
      totalLinkedinClicks: 0,
      totalOutboundClicks: 0,
      totalPageViews: 1,
      totalVisits: 1,
      type: "pageViews",
    },
    {
      endDate: "2026-08-15",
      routes: [{
        activeSeconds: 1,
        emailClicks: 0,
        instagramClicks: 0,
        linkedinClicks: 0,
        outboundClicks: 0,
        pageViews: 0,
        path: "/contact",
        visits: 1,
      }],
      startDate: "2026-08-01",
      totalActiveSeconds: 1,
      totalEmailClicks: 0,
      totalInstagramClicks: 0,
      totalLinkedinClicks: 0,
      totalOutboundClicks: 0,
      totalPageViews: 0,
      totalVisits: 1,
      type: "pageViews",
    },
    {
      endDate: "2026-08-15",
      routes: [{
        activeSeconds: 12,
        emailClicks: 0,
        instagramClicks: 0,
        linkedinClicks: 0,
        outboundClicks: 0,
        pageViews: 5,
        path: "/contact",
        visits: 1,
      }],
      startDate: "2026-08-01",
      totalActiveSeconds: 12,
      totalEmailClicks: 0,
      totalInstagramClicks: 0,
      totalLinkedinClicks: 0,
      totalOutboundClicks: 0,
      totalPageViews: 0,
      totalVisits: 1,
      type: "pageViews",
    },
    {
      endDate: "2026-08-15",
      routes: [{
        activeSeconds: 12,
        emailClicks: 1,
        instagramClicks: 1,
        linkedinClicks: 0,
        outboundClicks: 1,
        pageViews: 1,
        path: "/contact",
        visits: 1,
      }],
      startDate: "2026-08-01",
      totalActiveSeconds: 12,
      totalEmailClicks: 1,
      totalInstagramClicks: 1,
      totalLinkedinClicks: 0,
      totalOutboundClicks: 1,
      totalPageViews: 1,
      totalVisits: 1,
      type: "pageViews",
    },
    {
      type: "excluded",
      visitors: [{
        excludedAt: "not-a-timestamp",
        firstSeenAt: "2026-08-01T03:00:00.000Z",
        latestSeenAt: "2026-08-15T03:05:00.000Z",
        totalVisits: 0,
        visitorId,
      }],
    },
    {
      endDate: "2026-08-15",
      keywords: [{
        activeSeconds: 0,
        enquiryVisits: 0,
        keyword: "polyamory therapy",
        latestVisitAt: "invalid",
        matchTypes: [""],
        pageViews: 0,
        returningVisits: 0,
        visits: 1,
      }],
      startDate: "2026-08-01",
      taggedEnquiryVisits: 0,
      taggedVisits: 1,
      totalActiveSeconds: 0,
      totalEnquiryVisits: 0,
      totalPageViews: 0,
      totalPaidVisits: 1,
      type: "keywords",
    },
    {
      endDate: "2026-08-15",
      keywords: [{
        activeSeconds: 10,
        enquiryVisits: 1,
        keyword: "polyamory therapy",
        latestVisitAt: "2026-08-15T03:00:00.000Z",
        matchTypes: ["p"],
        pageViews: 2,
        returningVisits: 1,
        visits: 1,
      }],
      startDate: "2026-08-01",
      taggedEnquiryVisits: 1,
      taggedVisits: 2,
      totalActiveSeconds: 10,
      totalEnquiryVisits: 1,
      totalPageViews: 2,
      totalPaidVisits: 2,
      type: "keywords",
    },
    {
      endDate: "2026-08-15",
      keywords: [{
        activeSeconds: 10,
        enquiryVisits: 3,
        keyword: "polyamory therapy",
        latestVisitAt: "2026-08-15T03:00:00.000Z",
        matchTypes: ["p"],
        pageViews: 2,
        returningVisits: 4,
        visits: 1,
      }],
      startDate: "2026-08-01",
      taggedEnquiryVisits: 3,
      taggedVisits: 1,
      totalActiveSeconds: 10,
      totalEnquiryVisits: 3,
      totalPageViews: 2,
      totalPaidVisits: 1,
      type: "keywords",
    },
    { date: "2026-02-30", type: "daily", visits: [] },
    { month: "2026-13", type: "monthly", visits: [] },
  ];

  for (const report of invalidReports) {
    assert.equal(isAnalyticsReport(report), false, report.type);
  }
});

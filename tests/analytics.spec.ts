import { readFileSync } from "node:fs";
import { expect, test, type Page } from "playwright/test";
import type { RouteMetadata } from "../src/data/routeMetadata";
import { privateRoutePaths } from "../src/data/routes";

const routeMetadataData = JSON.parse(
  readFileSync(new URL("../src/data/routeMetadata.json", import.meta.url), "utf8"),
) as { routes: Record<string, RouteMetadata> };

const analyticsQaScenario = process.env.ANALYTICS_QA_SCENARIO;
const noindexDirective = "noindex, nofollow";
const qaRuntimeOrigin = new URL(
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4287",
).origin;
const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

type GoogleAnalyticsEvent = {
  eventName: string;
  params: Record<string, unknown>;
};

type GoogleAnalyticsEventArguments = [
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
];

function requireAnalyticsScenario(scenario: "blocked" | "enabled") {
  test.skip(
    analyticsQaScenario !== scenario,
    `This scenario is covered by the ${scenario} npm run qa:analytics build.`,
  );
}

function isAnalyticsUrl(rawUrl: string) {
  try {
    const hostname = new URL(rawUrl).hostname;

    return (
      hostname === "www.googletagmanager.com"
      || hostname === "www.google-analytics.com"
      || hostname === "analytics.google.com"
      || hostname === "clarity.ms"
      || hostname.endsWith(".clarity.ms")
    );
  } catch {
    return false;
  }
}

async function stubAnalyticsRequests(page: Page) {
  await page.route("**/*", async (route) => {
    if (isAnalyticsUrl(route.request().url())) {
      await route.fulfill({
        body: "",
        contentType: "application/javascript",
        status: 200,
      });
      return;
    }

    await route.continue();
  });
}

async function getGoogleAnalyticsEvents(
  page: Page,
  eventName: string,
): Promise<GoogleAnalyticsEvent[]> {
  return page.evaluate((targetEventName) => {
    return (window.dataLayer ?? [])
      .filter((entry): entry is GoogleAnalyticsEventArguments => entry[0] === "event")
      .filter((entry) => entry[1] === targetEventName)
      .map((entry) => ({
        eventName: entry[1],
        params: entry[2] ?? {},
      }));
  }, eventName);
}

test.describe("private analytics boundaries", () => {
  requireAnalyticsScenario("enabled");

  test("serves every private route from the no-index client shell", async ({ request }) => {
    for (const route of Object.values(privateRoutePaths)) {
      const response = await request.get(route);
      const html = await response.text();

      expect(response.ok()).toBeTruthy();
      expect(html).toContain("<title>Analytics | Vive Counselling</title>");
      expect(html).toContain(`<meta name="robots" content="${noindexDirective}" />`);
      expect(html).toContain('<div id="root"></div>');
      expect(html).not.toContain('<link rel="canonical"');
      expect(html).not.toContain('data-render-mode="prerendered"');
    }
  });

  test("private routes do not record or load analytics providers", async ({ page }) => {
    const analyticsRequests: string[] = [];
    const recordingRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) {
        analyticsRequests.push(request.url());
      }

      if (["/api/visit", "/api/visit-event", "/api/page-engagement"].includes(
        new URL(request.url()).pathname,
      )) {
        recordingRequests.push(request.url());
      }
    });

    await page.route("**/api/analytics?*", async (route) => {
      await route.fulfill({
        body: JSON.stringify({ error: "Reporting unavailable." }),
        contentType: "application/json",
        status: 503,
      });
    });

    await page.goto("/analytics", { waitUntil: "networkidle" });

    expect(analyticsRequests).toEqual([]);
    expect(recordingRequests).toEqual([]);
    await expect(
      page.locator(
        "#vive-google-analytics, #vive-google-analytics-config, #vive-microsoft-clarity",
      ),
    ).toHaveCount(0);

    const storedIdentity = await page.evaluate(() => ({
      visit: sessionStorage.getItem("vive:visit-analytics:visit:v1"),
      visitor: localStorage.getItem("vive:visit-analytics:visitor:v1"),
    }));

    expect(storedIdentity).toEqual({ visit: null, visitor: null });
  });

  test("an SPA transition forces a clean private document", async ({ page }) => {
    await stubAnalyticsRequests(page);
    await page.route("**/api/visit", async (route) => route.fulfill({ status: 204 }));
    await page.route("**/api/analytics?*", async (route) => {
      const date = new URL(route.request().url()).searchParams.get("date") ?? "2026-08-15";

      await route.fulfill({
        body: JSON.stringify({ data: { type: "daily", date, visits: [] } }),
        contentType: "application/json",
        status: 200,
      });
    });

    let privateDocumentRequests = 0;
    page.on("request", (request) => {
      if (request.isNavigationRequest() && new URL(request.url()).pathname === "/analytics") {
        privateDocumentRequests += 1;
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("#vive-google-analytics, #vive-microsoft-clarity")).toHaveCount(2);
    await expect(page.locator("#vive-microsoft-clarity")).toHaveAttribute(
      "src",
      `https://www.clarity.ms/tag/${process.env.VITE_CLARITY_PROJECT_ID}`,
    );

    await page.evaluate(() => {
      history.pushState({}, "", "/analytics");
      dispatchEvent(new PopStateEvent("popstate"));
    });

    await expect(page).toHaveURL(/\/analytics$/);
    await expect(page.getByRole("heading", { level: 1, name: "Today" })).toBeVisible();
    expect(privateDocumentRequests).toBe(1);
    await expect(
      page.locator(
        "#vive-google-analytics, #vive-google-analytics-config, #vive-microsoft-clarity",
      ),
    ).toHaveCount(0);
  });

  test("integrates outbound actions and coarse location across daily and route reports", async ({ page }) => {
    const date = "2026-08-15";
    const pageViewId = "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf";
    const visit = {
      adCode: null,
      botCategory: null,
      botName: null,
      dateKey: date,
      deviceType: "mobile",
      durationSeconds: 130,
      events: [
        {
          eventType: "email_link_clicked",
          id: "21ed6eca-8270-461e-bf7a-ea3a63e4d3ac",
          occurredAt: "2026-08-15T03:01:00.000Z",
          pageViewId,
          properties: {},
          source: "client",
        },
        {
          eventType: "instagram_link_clicked",
          id: "4dfa3ea2-a11a-49ba-9398-03e380502240",
          occurredAt: "2026-08-15T03:02:00.000Z",
          pageViewId,
          properties: {},
          source: "client",
        },
      ],
      gclid: null,
      id: "1a560836-220d-4d33-a05e-5f364891f9cb",
      isBot: false,
      isWebDriver: false,
      landingPath: "/contact",
      lastSeenAt: "2026-08-15T03:03:00.000Z",
      locationCountryCode: "AU",
      locationRegionCode: "WA",
      matchType: null,
      matchedKeyword: null,
      networkCode: null,
      pageViews: [{
        activeSeconds: 75,
        id: pageViewId,
        path: "/contact",
        viewedAt: "2026-08-15T03:00:00.000Z",
      }],
      referrerHost: null,
      referrerUrl: null,
      startedAt: "2026-08-15T03:00:00.000Z",
      totalVisits: 1,
      trafficSource: "direct",
      userAgent: "Mozilla/5.0",
      visitNumber: 1,
      visitorId: "114ba8f9-96f8-41e1-a301-15112400759e",
    };

    await page.route("**/api/analytics?*", async (route) => {
      const requestUrl = new URL(route.request().url());

      if (requestUrl.searchParams.has("start")) {
        await route.fulfill({
          body: JSON.stringify({
            data: {
              endDate: requestUrl.searchParams.get("end"),
              routes: [{
                activeSeconds: 75,
                emailClicks: 1,
                instagramClicks: 1,
                linkedinClicks: 0,
                outboundClicks: 2,
                pageViews: 1,
                path: "/contact",
                visits: 1,
              }],
              startDate: requestUrl.searchParams.get("start"),
              totalActiveSeconds: 75,
              totalEmailClicks: 1,
              totalInstagramClicks: 1,
              totalLinkedinClicks: 0,
              totalOutboundClicks: 2,
              totalPageViews: 1,
              totalVisits: 1,
              type: "pageViews",
            },
          }),
          contentType: "application/json",
          status: 200,
        });
        return;
      }

      await route.fulfill({
        body: JSON.stringify({ data: { date, type: "daily", visits: [visit] } }),
        contentType: "application/json",
        status: 200,
      });
    });

    await page.goto(`/analytics?date=${date}`, { waitUntil: "networkidle" });

    const diagnostics = page.getByRole("region", {
      name: "Location and device mix",
    });
    await expect(diagnostics.locator(".signal-location-mix dl > div")).toHaveCount(8);
    const westernAustralia = diagnostics
      .locator(".signal-location-mix dl > div")
      .filter({ hasText: "WA" });
    await expect(westernAustralia.locator("dd")).toHaveText("1");

    const visitRow = page.locator(".signal-event");
    await expect(visitRow).toContainText("WA");
    await expect(visitRow).toContainText("2 outbound clicks");
    await visitRow.click();
    await expect(page.getByText("Email link clicked", { exact: true })).toBeVisible();
    await expect(page.getByText("Instagram link clicked", { exact: true })).toBeVisible();
    await page.getByText("Request details", { exact: true }).click();
    await expect(page.locator(".signal-request-details__body")).toContainText(
      "Western Australia, Australia",
    );

    await page.getByRole("link", {
      name: `View full page-view breakdown for 15 Aug 2026`,
    }).click();

    await expect(page).toHaveURL(/\/analytics\/pages\?/);
    const routeActions = page.getByRole("region", { name: "Outbound actions" });
    await expect(routeActions).toContainText("2");
    await expect(routeActions).toContainText("Email1");
    await expect(routeActions).toContainText("Instagram1");
    const contactRoute = page.getByRole("row").filter({ hasText: "/contact" });
    await expect(contactRoute).toContainText("1 email · 1 IG");
  });

  test("loads and sorts matched keywords across route and range changes", async ({ page }) => {
    let releaseKeywordResponse = () => {};
    const keywordResponseGate = new Promise<void>((resolve) => {
      releaseKeywordResponse = resolve;
    });
    let delayKeywordResponse = true;
    let requestedBots = "";
    let requestedEndDate = "";
    let requestedReport = "";
    let requestedStartDate = "";

    await page.route("**/api/analytics?*", async (route) => {
      const requestUrl = new URL(route.request().url());
      requestedBots = requestUrl.searchParams.get("bots") ?? "";
      requestedEndDate = requestUrl.searchParams.get("end") ?? "";
      requestedReport = requestUrl.searchParams.get("report") ?? "";
      requestedStartDate = requestUrl.searchParams.get("start") ?? "";

      if (requestedReport !== "keywords") {
        await route.fulfill({
          body: JSON.stringify({
            data: {
              date: requestUrl.searchParams.get("date"),
              type: "daily",
              visits: [],
            },
          }),
          contentType: "application/json",
          status: 200,
        });
        return;
      }

      if (delayKeywordResponse) {
        await keywordResponseGate;
        delayKeywordResponse = false;
      }

      await route.fulfill({
        body: JSON.stringify({
          data: {
            endDate: requestUrl.searchParams.get("end"),
            keywords: [
              {
                activeSeconds: 300,
                enquiryVisits: 1,
                keyword: "kink aware counselling",
                latestVisitAt: "2026-08-15T03:00:00.000Z",
                matchTypes: ["e", "p"],
                pageViews: 7,
                returningVisits: 1,
                visits: 3,
              },
              {
                activeSeconds: 90,
                enquiryVisits: 0,
                keyword: "inclusive relationship counselling",
                latestVisitAt: "2026-08-11T04:30:00.000Z",
                matchTypes: ["b"],
                pageViews: 5,
                returningVisits: 2,
                visits: 4,
              },
              {
                activeSeconds: 480,
                enquiryVisits: 3,
                keyword: "perth bdsm therapist",
                latestVisitAt: "2026-08-14T06:15:00.000Z",
                matchTypes: ["p"],
                pageViews: 8,
                returningVisits: 1,
                visits: 4,
              },
            ],
            startDate: requestUrl.searchParams.get("start"),
            taggedEnquiryVisits: 4,
            taggedVisits: 11,
            totalActiveSeconds: 1020,
            totalEnquiryVisits: 5,
            totalPageViews: 23,
            totalPaidVisits: 12,
            type: "keywords",
          },
        }),
        contentType: "application/json",
        status: 200,
      });
    });

    await page.goto("/analytics?date=2026-08-15", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      history.pushState(
        {},
        "",
        "/Analytics/Keywords?start=2026-07-17&end=2026-08-15&bots=include",
      );
      dispatchEvent(new PopStateEvent("popstate"));
    });

    await expect(page.getByRole("heading", { level: 1, name: "Loading activity" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Activity could not be loaded" })).toHaveCount(0);
    releaseKeywordResponse();

    expect(requestedReport).toBe("keywords");
    expect(requestedStartDate).toBe("2026-07-17");
    expect(requestedEndDate).toBe("2026-08-15");
    expect(requestedBots).toBe("include");
    await expect(page.getByRole("heading", { level: 1, name: "Keywords" })).toBeVisible();
    const matchedKeywords = page.getByRole("region", { name: "Matched keywords" });
    await expect(matchedKeywords).toBeVisible();
    const keywordRow = page.getByRole("row").filter({ hasText: "kink aware counselling" });
    await expect(keywordRow).toContainText("7 views");
    await expect(keywordRow).toContainText("1:40");

    const keywordRows = matchedKeywords.locator("tbody tr");
    const enquiriesHeader = matchedKeywords.getByRole("columnheader", { name: "Enquiries" });
    await expect(enquiriesHeader).toHaveAttribute("aria-sort", "descending");
    await expect(keywordRows.nth(0)).toContainText("perth bdsm therapist");
    await expect(keywordRows.nth(1)).toContainText("kink aware counselling");
    await expect(keywordRows.nth(2)).toContainText("inclusive relationship counselling");

    await enquiriesHeader.getByRole("button", { name: "Enquiries" }).click();
    await expect(enquiriesHeader).toHaveAttribute("aria-sort", "ascending");
    await expect(keywordRows.nth(0)).toContainText("inclusive relationship counselling");
    await expect(keywordRows.nth(1)).toContainText("kink aware counselling");
    await expect(keywordRows.nth(2)).toContainText("perth bdsm therapist");

    await page.getByLabel("Start date").fill("2026-08-01");
    await page.getByLabel("End date").fill("2026-08-14");
    await page.getByRole("button", { name: "Apply range" }).click();

    await expect.poll(() => requestedStartDate).toBe("2026-08-01");
    expect(requestedEndDate).toBe("2026-08-14");
    expect(requestedBots).toBe("include");
  });
});

test.describe("analytics availability", () => {
  requireAnalyticsScenario("blocked");

  test("configured analytics stays blocked on an unallowed host", async ({ page }) => {
    const analyticsRequests: string[] = [];
    const recordingRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) {
        analyticsRequests.push(request.url());
      }

      if (["/api/visit", "/api/visit-event", "/api/page-engagement"].includes(
        new URL(request.url()).pathname,
      )) {
        recordingRequests.push(request.url());
      }
    });

    await page.goto("/contact", { waitUntil: "networkidle" });
    const form = page.getByRole("form", { name: "Your enquiry" });
    await form.getByLabel("How would you like to start?").selectOption("question");
    await form.getByLabel("Name").fill("Host gate check");

    expect(analyticsRequests).toEqual([]);
    expect(recordingRequests).toEqual([]);
    await expect(page.locator("#vive-google-analytics, #vive-microsoft-clarity")).toHaveCount(0);
  });
});

test.describe("first-party analytics", () => {
  requireAnalyticsScenario("enabled");

  test("records attribution, Fees navigation, engagement, and refreshes", async ({ page }) => {
    const engagementUpdates: Array<Record<string, unknown>> = [];
    const observations: Array<Record<string, unknown>> = [];
    const requestOrder: string[] = [];

    await page.route("**/api/visit", async (route) => {
      requestOrder.push("visit");
      observations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/page-engagement", async (route) => {
      requestOrder.push("engagement");
      engagementUpdates.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });

    await page.goto(
      "/polyamory-enm-counselling?ad=enm&net=g&kw=polyamory%20therapy&mt=p&gclid=CjwK-test-click",
      {
        referer: "https://referrer.example/articles/open-relationships?source=directory",
        waitUntil: "networkidle",
      },
    );

    await expect.poll(() => observations.length).toBe(1);

    const [observation] = observations;
    expect(observation).toEqual({
      adCode: "enm",
      gclid: "CjwK-test-click",
      isWebDriver: true,
      landingPath: "/polyamory-enm-counselling",
      matchType: "p",
      matchedKeyword: "polyamory therapy",
      networkCode: "g",
      pageViewId: expect.stringMatching(uuidV4),
      path: "/polyamory-enm-counselling",
      referrerUrl: "https://referrer.example/articles/open-relationships?source=directory",
      visitId: expect.stringMatching(uuidV4),
      visitorId: expect.stringMatching(uuidV4),
    });

    await page.waitForTimeout(1_100);
    await page.getByRole("banner").getByRole("link", { name: "Fees", exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect.poll(() => observations.length).toBe(2);
    await expect.poll(() => engagementUpdates.length).toBe(1);

    expect(observations[1]).toMatchObject({
      landingPath: observation.landingPath,
      path: "/fees",
      referrerUrl: observation.referrerUrl,
      visitId: observation.visitId,
      visitorId: observation.visitorId,
    });
    expect(observations[1].pageViewId).not.toBe(observation.pageViewId);
    expect(engagementUpdates[0]).toEqual({
      activeSeconds: expect.any(Number),
      pageViewId: observation.pageViewId,
      visitId: observation.visitId,
      visitorId: observation.visitorId,
    });
    expect(engagementUpdates[0].activeSeconds).toBeGreaterThanOrEqual(1);
    expect(Number.isInteger(engagementUpdates[0].activeSeconds)).toBe(true);
    expect(requestOrder[0]).toBe("visit");
    expect(requestOrder.indexOf("engagement")).toBeGreaterThan(0);

    await page.evaluate(() => {
      history.replaceState(history.state, "", "/contact?ignored=yes#fees");
      dispatchEvent(new PopStateEvent("popstate"));
    });
    await expect(page).toHaveURL(/\/contact\?ignored=yes#fees$/);
    await page.evaluate(() => new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    }));
    expect(observations).toHaveLength(2);

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect.poll(() => observations.length).toBe(3);

    expect(observations[2]).toMatchObject({
      landingPath: observation.landingPath,
      path: "/fees",
      visitId: observation.visitId,
      visitorId: observation.visitorId,
    });
    expect(observations[2].pageViewId).not.toBe(observations[1].pageViewId);
  });

  test("recognizes a return visit and rotates an expired browser ID", async ({ page }) => {
    const observations: Array<Record<string, string | null>> = [];

    await page.route("**/api/visit", async (route) => {
      observations.push(route.request().postDataJSON() as Record<string, string | null>);
      await route.fulfill({ status: 204 });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await expect.poll(() => observations.length).toBe(1);

    await page.evaluate(() => {
      const key = "vive:visit-analytics:visit:v1";
      const visit = JSON.parse(sessionStorage.getItem(key) ?? "null");

      visit.lastActivityAt = Date.now() - 31 * 60 * 1000;
      sessionStorage.setItem(key, JSON.stringify(visit));
    });

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect.poll(() => observations.length).toBe(2);

    expect(observations[1].visitorId).toBe(observations[0].visitorId);
    expect(observations[1].visitId).not.toBe(observations[0].visitId);
    expect(observations[1].pageViewId).not.toBe(observations[0].pageViewId);

    await page.evaluate(() => {
      const key = "vive:visit-analytics:visitor:v1";
      const visitor = JSON.parse(localStorage.getItem(key) ?? "null");

      visitor.createdAt = Date.now() - 366 * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify(visitor));
    });

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect.poll(() => observations.length).toBe(3);

    expect(observations[2].visitorId).not.toBe(observations[1].visitorId);
    expect(observations[2].visitId).not.toBe(observations[1].visitId);
    expect(observations[2].pageViewId).not.toBe(observations[1].pageViewId);
  });

  test("records configured social and email clicks against the active page view", async ({ page }) => {
    const eventObservations: Array<Record<string, unknown>> = [];
    const visitObservations: Array<Record<string, unknown>> = [];

    await stubAnalyticsRequests(page);
    await page.route("**/api/visit", async (route) => {
      visitObservations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/visit-event", async (route) => {
      eventObservations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await expect.poll(() => visitObservations.length).toBe(1);

    const footer = page.getByRole("contentinfo");
    const clickWithoutNavigation = async (name: string) => {
      const link = footer.getByRole("link", { name, exact: true });
      await link.evaluate((element) => {
        element.addEventListener("click", (event) => event.preventDefault(), { once: true });
      });
      await link.click();
    };

    await clickWithoutNavigation("Instagram");
    await clickWithoutNavigation("LinkedIn");
    await clickWithoutNavigation("joel@vivecounselling.com.au");
    await expect.poll(() => eventObservations.length).toBe(3);

    const visitObservation = visitObservations[0];
    expect(eventObservations).toEqual([
      "instagram_link_clicked",
      "linkedin_link_clicked",
      "email_link_clicked",
    ].map((eventType) => ({
      eventId: expect.stringMatching(uuidV4),
      eventType,
      pageViewId: visitObservation.pageViewId,
      properties: {},
      visitId: visitObservation.visitId,
    })));
  });

  test("keeps enquiry events visit-linked and server-owned", async ({ page }) => {
    const visitObservations: Array<Record<string, unknown>> = [];
    const eventObservations: Array<Record<string, unknown>> = [];
    const enquirySubmissions: Array<Record<string, unknown>> = [];

    await stubAnalyticsRequests(page);
    await page.route("**/api/visit", async (route) => {
      visitObservations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/visit-event", async (route) => {
      eventObservations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/enquiry", async (route) => {
      enquirySubmissions.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({
        body: JSON.stringify({ ok: true }),
        contentType: "application/json",
        status: 200,
      });
    });

    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect.poll(() => visitObservations.length).toBe(1);

    const form = page.getByRole("form", { name: "Your enquiry" });
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your message").fill("Hello");
    await form.getByLabel("How would you like to start?").selectOption("question");
    await expect.poll(() => eventObservations.length).toBe(2);

    const visitObservation = visitObservations[0];
    expect(eventObservations).toEqual([
      {
        eventId: expect.stringMatching(uuidV4),
        eventType: "enquiry_started",
        pageViewId: visitObservation.pageViewId,
        properties: {},
        visitId: visitObservation.visitId,
      },
      {
        eventId: expect.stringMatching(uuidV4),
        eventType: "contact_option_selected",
        pageViewId: visitObservation.pageViewId,
        properties: { option: "question" },
        visitId: visitObservation.visitId,
      },
    ]);

    await form.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect.poll(() => enquirySubmissions.length).toBe(1);
    expect(enquirySubmissions[0]).toMatchObject({
      analyticsPageViewId: visitObservation.pageViewId,
      analyticsVisitId: visitObservation.visitId,
    });
    expect(eventObservations.map((observation) => observation.eventType)).toEqual([
      "enquiry_started",
      "contact_option_selected",
    ]);
  });
});

test.describe("Google Analytics and Clarity", () => {
  requireAnalyticsScenario("enabled");

  test("the enquiry form is explicitly masked for Clarity", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect(page.getByRole("form", { name: "Your enquiry" })).toHaveAttribute(
      "data-clarity-mask",
      "true",
    );
  });

  test("Google Analytics records Fees navigation with the shared virtual path", async ({ page }) => {
    await stubAnalyticsRequests(page);

    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("banner").getByRole("link", { name: "Fees", exact: true }).click();

    await expect.poll(() => getGoogleAnalyticsEvents(page, "page_view")).toEqual([
      {
        eventName: "page_view",
        params: {
          page_location: `${qaRuntimeOrigin}/`,
          page_path: "/",
          page_title: routeMetadataData.routes["/"].title,
          send_to: process.env.VITE_GA_MEASUREMENT_ID,
        },
      },
      {
        eventName: "page_view",
        params: {
          page_location: `${qaRuntimeOrigin}/fees`,
          page_path: "/fees",
          page_title: routeMetadataData.routes["/contact"].title,
          send_to: process.env.VITE_GA_MEASUREMENT_ID,
        },
      },
    ]);
  });

  test("confirmed enquiry submissions emit conversion analytics", async ({ page }) => {
    let submissionSucceeds = false;

    await page.route("**/*", async (route) => {
      const requestUrl = new URL(route.request().url());

      if (requestUrl.pathname === "/api/enquiry") {
        await route.fulfill({
          body: JSON.stringify(submissionSucceeds ? { ok: true } : { error: "Submission failed." }),
          contentType: "application/json",
          status: submissionSucceeds ? 200 : 502,
        });
        return;
      }
      if (isAnalyticsUrl(route.request().url())) {
        await route.fulfill({ body: "", contentType: "application/javascript", status: 200 });
        return;
      }
      await route.continue();
    });

    await page.goto("/contact", { waitUntil: "networkidle" });
    const form = page.getByRole("form", { name: "Your enquiry" });
    await form.getByLabel("How would you like to start?").selectOption("question");
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your message").fill("Hello");
    await form.getByRole("button", { name: "Send message" }).click();

    await expect(form.getByRole("alert")).toBeVisible();
    expect(await getGoogleAnalyticsEvents(page, "generate_lead")).toEqual([]);

    submissionSucceeds = true;
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect.poll(() => getGoogleAnalyticsEvents(page, "generate_lead")).toEqual([
      {
        eventName: "generate_lead",
        params: {
          form_name: "contact",
          lead_source: "website_enquiry_form",
          send_to: process.env.VITE_GA_MEASUREMENT_ID,
        },
      },
    ]);
  });

  test("contact-intent events contain no visitor data", async ({ page }) => {
    await stubAnalyticsRequests(page);

    await page.goto("/contact", { waitUntil: "networkidle" });
    const form = page.getByRole("form", { name: "Your enquiry" });
    await form.getByLabel("How would you like to start?").selectOption("question");
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("How would you like to start?").selectOption("consult");
    await form.getByLabel("How would you like to start?").selectOption("appointment");

    await expect.poll(() => getGoogleAnalyticsEvents(page, "contact_option_selected")).toEqual([
      {
        eventName: "contact_option_selected",
        params: { contact_option: "question", send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
      {
        eventName: "contact_option_selected",
        params: { contact_option: "consult", send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
      {
        eventName: "contact_option_selected",
        params: { contact_option: "appointment", send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
    ]);

    const emailLink = page.getByRole("link", { name: "joel@vivecounselling.com.au" }).first();
    await emailLink.evaluate((link) => {
      link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    });
    await emailLink.click();
    await expect.poll(() => getGoogleAnalyticsEvents(page, "email_link_clicked")).toEqual([
      {
        eventName: "email_link_clicked",
        params: { send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
    ]);
  });
});

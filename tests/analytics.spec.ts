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

  test("renders captured keyword journeys", async ({ page }) => {
    let requestedReport = "";

    await page.route("**/api/analytics?*", async (route) => {
      const requestUrl = new URL(route.request().url());
      requestedReport = requestUrl.searchParams.get("report") ?? "";

      await route.fulfill({
        body: JSON.stringify({
          data: {
            endDate: requestUrl.searchParams.get("end"),
            keywords: [{
              activeSeconds: 300,
              enquiryVisits: 1,
              keyword: "kink aware counselling",
              latestVisitAt: "2026-08-15T03:00:00.000Z",
              matchTypes: ["e", "p"],
              pageViews: 7,
              returningVisits: 1,
              topLandingPath: "/kink-bdsm-counselling",
              visits: 3,
            }],
            startDate: requestUrl.searchParams.get("start"),
            taggedEnquiryVisits: 1,
            taggedVisits: 3,
            totalActiveSeconds: 390,
            totalEnquiryVisits: 1,
            totalPageViews: 9,
            totalPaidVisits: 4,
            type: "keywords",
          },
        }),
        contentType: "application/json",
        status: 200,
      });
    });

    await page.goto(
      "/analytics/keywords?start=2026-07-17&end=2026-08-15",
      { waitUntil: "networkidle" },
    );

    expect(requestedReport).toBe("keywords");
    await expect(page.getByRole("heading", { level: 1, name: "Keyword journeys" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Search intent ledger" })).toBeVisible();
    const keywordRow = page.getByRole("row").filter({ hasText: "kink aware counselling" });
    await expect(keywordRow).toContainText("7 views");
    await expect(keywordRow).toContainText("1:40");
    await expect(keywordRow).toContainText("/kink-bdsm-counselling");
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
    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
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

    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await expect.poll(() => eventObservations.length).toBe(2);

    const visitObservation = visitObservations[0];
    expect(eventObservations).toEqual([
      {
        eventId: expect.stringMatching(uuidV4),
        eventType: "contact_option_selected",
        pageViewId: visitObservation.pageViewId,
        properties: { option: "question" },
        visitId: visitObservation.visitId,
      },
      {
        eventId: expect.stringMatching(uuidV4),
        eventType: "enquiry_started",
        pageViewId: visitObservation.pageViewId,
        properties: {},
        visitId: visitObservation.visitId,
      },
    ]);

    await form.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect.poll(() => enquirySubmissions.length).toBe(1);
    expect(enquirySubmissions[0]).toMatchObject({
      analyticsPageViewId: visitObservation.pageViewId,
      analyticsVisitId: visitObservation.visitId,
    });
    expect(eventObservations.map((observation) => observation.eventType)).toEqual([
      "contact_option_selected",
      "enquiry_started",
    ]);
  });
});

test.describe("Google Analytics and Clarity", () => {
  requireAnalyticsScenario("enabled");

  test("the enquiry form is explicitly masked for Clarity", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect(page.getByRole("form", { name: "Enquiry" })).toHaveAttribute(
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
    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await form.getByRole("button", { name: "Send enquiry" }).click();

    await expect(form.getByRole("alert")).toBeVisible();
    expect(await getGoogleAnalyticsEvents(page, "generate_lead")).toEqual([]);

    submissionSucceeds = true;
    await form.getByRole("button", { name: "Send enquiry" }).click();
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
    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Request a consult").check();
    await form.getByLabel("Make an appointment").check();

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

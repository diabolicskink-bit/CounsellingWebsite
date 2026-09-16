import { expect, test } from "playwright/test";
import { isAnalyticsUrl, requireAnalyticsScenario, stubAnalyticsRequests } from "./support";

const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

test.describe("analytics availability", () => {
  requireAnalyticsScenario("blocked");

  test("configured analytics stays blocked on an unallowed host", async ({ page }) => {
    const analyticsRequests: string[] = [];
    const recordingRequests: string[] = [];
    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) analyticsRequests.push(request.url());
      if (["/api/visit", "/api/visit-event", "/api/page-engagement"].includes(
        new URL(request.url()).pathname,
      )) recordingRequests.push(request.url());
    });

    await page.goto("/contact", { waitUntil: "networkidle" });

    expect(analyticsRequests).toEqual([]);
    expect(recordingRequests).toEqual([]);
  });
});

test.describe("first-party analytics", () => {
  requireAnalyticsScenario("enabled");

  test("records landing attribution and the Fees virtual page", async ({ page }) => {
    const observations: Array<Record<string, unknown>> = [];
    await page.route("**/api/visit", async (route) => {
      observations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/page-engagement", async (route) => route.fulfill({ status: 204 }));

    await page.goto(
      "/polyamory-enm-counselling?ad=enm&net=g&kw=polyamory%20therapy&mt=p&gclid=CjwK-test-click",
      {
        referer: "https://referrer.example/articles/open-relationships?source=directory",
        waitUntil: "networkidle",
      },
    );
    await expect.poll(() => observations.length).toBe(1);

    expect(observations[0]).toMatchObject({
      adCode: "enm",
      gclid: "CjwK-test-click",
      landingPath: "/polyamory-enm-counselling",
      matchType: "p",
      matchedKeyword: "polyamory therapy",
      networkCode: "g",
      path: "/polyamory-enm-counselling",
      referrerUrl: "https://referrer.example/articles/open-relationships?source=directory",
      visitId: expect.stringMatching(uuidV4),
      visitorId: expect.stringMatching(uuidV4),
    });

    await page.getByRole("banner").getByRole("link", { name: "Fees", exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect.poll(() => observations.length).toBe(2);
    expect(observations[1]).toMatchObject({
      landingPath: observations[0].landingPath,
      path: "/fees",
      visitId: observations[0].visitId,
      visitorId: observations[0].visitorId,
    });
  });

  test("passes the active visit context with an enquiry without exposing a client success event", async ({ page }) => {
    const visits: Array<Record<string, unknown>> = [];
    const events: Array<Record<string, unknown>> = [];
    const submissions: Array<Record<string, unknown>> = [];

    await stubAnalyticsRequests(page);
    await page.route("**/api/visit", async (route) => {
      visits.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/visit-event", async (route) => {
      events.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/enquiry", async (route) => {
      submissions.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ body: JSON.stringify({ ok: true }), contentType: "application/json", status: 200 });
    });

    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect.poll(() => visits.length).toBe(1);
    const form = page.getByRole("form");
    await form.locator('[name="name"]').fill("Alex Person");
    await form.locator('[name="email"]').fill("alex@example.com");
    await form.locator('[name="message"]').fill("Hello");
    await form.locator('[name="contactPath"]').selectOption("question");
    await form.locator('button[type="submit"]').click();

    await expect(page.getByRole("status")).toBeVisible();
    await expect.poll(() => submissions.length).toBe(1);
    expect(submissions[0]).toMatchObject({
      analyticsPageViewId: visits[0].pageViewId,
      analyticsVisitId: visits[0].visitId,
    });
    expect(events.some((event) => event.eventType === "enquiry_sent")).toBe(false);
  });
});

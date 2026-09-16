import { expect, test } from "playwright/test";
import { isAnalyticsUrl, requireAnalyticsScenario, stubAnalyticsRequests } from "./support";

test.describe("private analytics boundaries", () => {
  requireAnalyticsScenario("enabled");

  test("private routes do not record or load analytics providers", async ({ page }) => {
    const analyticsRequests: string[] = [];
    const recordingRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) analyticsRequests.push(request.url());
      if (["/api/visit", "/api/visit-event", "/api/page-engagement"].includes(
        new URL(request.url()).pathname,
      )) recordingRequests.push(request.url());
    });
    await page.route("**/api/analytics?*", async (route) => route.fulfill({
      body: JSON.stringify({ error: "Reporting unavailable." }),
      contentType: "application/json",
      status: 503,
    }));

    await page.goto("/analytics", { waitUntil: "networkidle" });

    expect(analyticsRequests).toEqual([]);
    expect(recordingRequests).toEqual([]);
    await expect(page.locator("#vive-google-analytics, #vive-google-analytics-config, #vive-microsoft-clarity"))
      .toHaveCount(0);
  });

  test("an SPA transition forces a clean private document", async ({ page }) => {
    await stubAnalyticsRequests(page);
    await page.route("**/api/visit", async (route) => route.fulfill({ status: 204 }));
    await page.route("**/api/analytics?*", async (route) => route.fulfill({
      body: JSON.stringify({ data: { type: "daily", date: "2026-08-15", visits: [] } }),
      contentType: "application/json",
      status: 200,
    }));

    let privateDocumentRequests = 0;
    page.on("request", (request) => {
      if (request.isNavigationRequest() && new URL(request.url()).pathname === "/analytics") {
        privateDocumentRequests += 1;
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      history.pushState({}, "", "/analytics");
      dispatchEvent(new PopStateEvent("popstate"));
    });

    await expect.poll(() => privateDocumentRequests).toBe(1);
    await expect(page.locator("#vive-google-analytics, #vive-google-analytics-config, #vive-microsoft-clarity"))
      .toHaveCount(0);
  });
});

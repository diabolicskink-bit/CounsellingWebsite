import { expect, test } from "playwright/test";
import { privateRoutePaths } from "../../../src/data/routes";
import { isAnalyticsUrl, requireAnalyticsScenario, stubAnalyticsRequests } from "./support";

const noindexDirective = "noindex, nofollow";

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


});

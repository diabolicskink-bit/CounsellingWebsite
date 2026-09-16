import { test, type Page } from "playwright/test";

const analyticsQaScenario = process.env.ANALYTICS_QA_SCENARIO;

export function requireAnalyticsScenario(scenario: "blocked" | "enabled") {
  test.skip(
    analyticsQaScenario !== scenario,
    `This scenario is covered by the ${scenario} npm run qa:analytics build.`,
  );
}

export function isAnalyticsUrl(rawUrl: string) {
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

export async function stubAnalyticsRequests(page: Page) {
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

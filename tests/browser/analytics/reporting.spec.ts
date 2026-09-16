import { expect, test } from "playwright/test";
import { requireAnalyticsScenario } from "./support";

test.describe("private analytics reports", () => {
  requireAnalyticsScenario("enabled");

  test("requests and renders a representative keyword report", async ({ page }) => {
    let requestedReportUrl: URL | undefined;

    await page.route("**/api/analytics?*", async (route) => {
      const requestUrl = new URL(route.request().url());
      requestedReportUrl = requestUrl;

      await route.fulfill({
        body: JSON.stringify({
          data: {
            endDate: requestUrl.searchParams.get("end"),
            keywords: [{
              activeSeconds: 300,
              enquiryVisits: 1,
              keyword: "kink aware counselling",
              latestVisitAt: "2026-08-15T03:00:00.000Z",
              matchTypes: ["p"],
              pageViews: 7,
              returningVisits: 1,
              visits: 3,
            }],
            startDate: requestUrl.searchParams.get("start"),
            taggedEnquiryVisits: 1,
            taggedVisits: 3,
            totalActiveSeconds: 300,
            totalEnquiryVisits: 1,
            totalPageViews: 7,
            totalPaidVisits: 3,
            type: "keywords",
          },
        }),
        contentType: "application/json",
        status: 200,
      });
    });

    await page.goto(
      "/analytics/keywords?start=2026-07-17&end=2026-08-15&bots=include",
      { waitUntil: "networkidle" },
    );

    expect(requestedReportUrl?.searchParams.get("report")).toBe("keywords");
    expect(requestedReportUrl?.searchParams.get("start")).toBe("2026-07-17");
    expect(requestedReportUrl?.searchParams.get("end")).toBe("2026-08-15");
    expect(requestedReportUrl?.searchParams.get("bots")).toBe("include");
    await expect(page.getByRole("heading", { level: 1, name: "Keywords" })).toBeVisible();
    await expect(page.getByText("kink aware counselling", { exact: true })).toBeVisible();
  });
});

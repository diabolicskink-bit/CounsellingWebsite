import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "playwright/test";

const publicRoutes = [
  "/",
  "/working-with-joel",
  "/inclusion",
  "/inclusion/kink-bdsm",
  "/inclusion/enm-polyamory",
  "/inclusion/lgbtqia",
  "/fees",
  "/contact",
] as const;

const accessibilitySmokeRoutes = [
  "/",
  "/contact",
  "/inclusion",
  "/inclusion/kink-bdsm",
] as const;

const devOnlyRoutes = [
  "/codex-tb",
  "/opus-tb",
  "/documents",
  "/design-language",
  "/design-language/foundations",
] as const;

test.describe("public pages", () => {
  for (const route of publicRoutes) {
    test(`${route} renders core content and hydrated metadata`, async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });

      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page.locator("main").first()).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).not.toHaveTitle(/^Vive Counselling$/);

      const h1Text = (await page.locator("h1").innerText()).trim();
      expect(h1Text.length).toBeGreaterThan(8);

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);

      expect(consoleErrors).toEqual([]);
    });
  }
});

test.describe("production route boundaries", () => {
  for (const route of devOnlyRoutes) {
    test(`${route} is not registered in the production build`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page).toHaveTitle("Page not found | Vive Counselling");
      await expect(page.locator("h1")).toContainText(/This page does\s*not exist/);
      await expect(page.getByRole("link", { name: "Dev" })).toHaveCount(0);
    });
  }
});

test.describe("accessibility smoke", () => {
  for (const route of accessibilitySmokeRoutes) {
    test(`${route} has no serious axe violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const seriousViolations = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );

      expect(
        seriousViolations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
    });
  }
});

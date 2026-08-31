import { expect, test } from "playwright/test";

test.describe("progressive enhancement", () => {
  test.use({ javaScriptEnabled: false });

  test("exposes every counselling approach without JavaScript", async ({ page }) => {
    await page.goto("/working-with-joel");

    const approach = page.locator(".working-with-joel-page__approach");
    const panels = approach.locator(".site-broad-tabs__content");

    await expect(approach.getByRole("heading", { level: 3 })).toHaveText([
      "Psychodynamic",
      "Attachment",
      "Integrative",
    ]);
    await expect(panels).toHaveCount(3);
    for (const panel of await panels.all()) {
      await expect(panel).toBeVisible();
    }
    await expect(approach.getByRole("tablist", { name: "Counselling approach" })).toHaveCount(0);
  });
});

test("tabs support pointer and keyboard input", async ({ page }) => {
  await page.goto("/working-with-joel");

  const tablist = page.getByRole("tablist", { name: "Counselling approach" });
  const psychodynamic = tablist.getByRole("tab", { name: "Psychodynamic" });
  const attachment = tablist.getByRole("tab", { name: "Attachment" });
  const integrative = tablist.getByRole("tab", { name: "Integrative" });
  const panels = page.locator('[role="tabpanel"]');
  const visiblePanel = page.getByRole("tabpanel");

  await expect(tablist.getByRole("tab")).toHaveCount(3);
  await expect(panels).toHaveCount(3);
  await expect(visiblePanel).toHaveCount(1);
  await expect(psychodynamic).toHaveAttribute("aria-selected", "true");
  await attachment.click();
  await expect(attachment).toHaveAttribute("aria-selected", "true");
  await expect(visiblePanel).toHaveAccessibleName("Attachment");
  await attachment.press("End");
  await expect(integrative).toBeFocused();
  await expect(integrative).toHaveAttribute("aria-selected", "true");
  await integrative.press("ArrowRight");
  await expect(psychodynamic).toBeFocused();
  await expect(visiblePanel).toHaveAccessibleName("Psychodynamic");
});

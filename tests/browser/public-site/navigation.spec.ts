import { expect, test } from "playwright/test";

test("desktop and mobile navigation reach public destinations", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).locator('a[href="/contact"]').click();
  await expect(page).toHaveURL(/\/contact$/);

  await page.goto("/");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" })
    .locator('a[href="/polyamory-enm-counselling"]')
    .click();
  await expect(page).toHaveURL(/\/polyamory-enm-counselling$/);
});

test("the mobile menu returns focus and restores the prior scroll state", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Open navigation" });
  await page.evaluate(() => {
    document.body.style.overflow = "clip";
  });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("clip");
});

import { expect, test } from "playwright/test";

const inclusionChildRoutes = [
  { path: "/kink-bdsm-counselling", navLabel: "Kink & BDSM" },
  { path: "/polyamory-enm-counselling", navLabel: "ENM & polyamory" },
  { path: "/lgbtqia-affirming-counselling", navLabel: "LGBTQIA+" },
] as const;

const expectedSocialProfileLinks = [
  { name: "Instagram", href: "https://www.instagram.com/joel.ropes/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/vivecounselling/" },
] as const;

test.describe("shared navigation", () => {
  test("routes primary contact actions and exposes social profiles", async ({ page }) => {
    await page.goto("/");

    const header = page.getByRole("banner");
    const footer = page.getByRole("contentinfo");

    await expect(header.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
    await expect(
      header.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Fees" }),
    ).toHaveAttribute("href", "/contact");
    await expect(footer.getByRole("link", { name: "Fees" })).toHaveAttribute("href", "/contact");
    await expect(footer.getByRole("link", { name: "Crisis support" })).toHaveAttribute(
      "href",
      "/crisis-support",
    );

    for (const profile of expectedSocialProfileLinks) {
      const link = footer.getByRole("link", { name: profile.name, exact: true });

      await expect(link).toHaveAttribute("href", profile.href);
      await expect(link).toHaveAttribute("rel", "me");
    }
  });

  test("exposes inclusion pages in desktop and mobile navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const desktopNavigation = page.getByRole("navigation", { name: "Main navigation" });
    await desktopNavigation.getByRole("link", { name: "Inclusion", exact: true }).focus();
    const desktopSubmenu = desktopNavigation.getByRole("group", { name: "Inclusion submenu" });

    await expect(desktopSubmenu).toBeVisible();
    for (const route of inclusionChildRoutes) {
      await expect(desktopSubmenu.getByRole("link", { name: route.navLabel, exact: true })).toHaveAttribute(
        "href",
        route.path,
      );
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open navigation" }).click();
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });

    for (const route of inclusionChildRoutes) {
      await expect(mobileNavigation.getByRole("link", { name: route.navLabel, exact: true })).toHaveAttribute(
        "href",
        route.path,
      );
    }

    await mobileNavigation.getByRole("link", { name: "ENM & polyamory", exact: true }).click();
    await expect(page).toHaveURL(/\/polyamory-enm-counselling$/);
  });

  test("restores mobile menu focus and scroll state", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Open navigation" });
    await page.evaluate(() => {
      document.body.style.overflow = "clip";
    });

    await toggle.click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("clip");

    await toggle.click();
    await page.setViewportSize({ width: 1200, height: 844 });
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("clip");
  });

  test("removes non-essential shared motion when requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "Get in touch" })).toHaveCSS(
      "transition-duration",
      "0s",
    );

    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCSS(
      "animation-name",
      "none",
    );
  });
});

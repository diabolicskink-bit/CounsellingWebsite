import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test } from "playwright/test";

const routeMetadataData = JSON.parse(
  readFileSync(new URL("../src/data/routeMetadata.json", import.meta.url), "utf8"),
) as {
  site: {
    name: string;
    defaultOrigin: string;
    themeColor: string;
    socialImage: string;
    socialImageAlt: string;
  };
  routes: Record<string, { title: string; description: string }>;
};

const publicRoutes = [
  "/",
  "/working-with-joel",
  "/inclusion",
  "/inclusion/kink-bdsm",
  "/inclusion/enm-polyamory",
  "/inclusion/lgbtqia",
  "/contact",
] as const;

const publicRouteMetadataEntries = Object.entries(routeMetadataData.routes);
const siteOrigin = (process.env.SITE_URL ?? routeMetadataData.site.defaultOrigin).replace(/\/$/, "");
const socialImageUrl = `${siteOrigin}${routeMetadataData.site.socialImage}`;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function absoluteRouteUrl(route: string) {
  return route === "/" ? `${siteOrigin}/` : `${siteOrigin}${route}`;
}

const aliasRedirects = [
  { from: "/about", to: "/working-with-joel" },
  { from: "/fees", to: "/contact" },
] as const;

const retiredRoutes = ["/about-joel", "/approach", "/enquire"] as const;

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

test.describe("first response metadata", () => {
  for (const [route, metadata] of publicRouteMetadataEntries) {
    test(`${route} includes route metadata before hydration`, async ({ request }) => {
      const response = await request.get(route);
      const html = await response.text();
      const canonicalUrl = absoluteRouteUrl(route);

      expect(response.ok()).toBeTruthy();
      expect(html).toContain(`<title>${escapeHtml(metadata.title)}</title>`);
      expect(html).toContain(
        `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
      );
      expect(html).toContain(`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`);
      expect(html).toContain(`<meta property="og:site_name" content="${escapeHtml(routeMetadataData.site.name)}" />`);
      expect(html).toContain('<meta property="og:type" content="website" />');
      expect(html).toContain(`<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
      expect(html).toContain(`<meta property="og:title" content="${escapeHtml(metadata.title)}" />`);
      expect(html).toContain(`<meta property="og:description" content="${escapeHtml(metadata.description)}" />`);
      expect(html).toContain(`<meta property="og:image" content="${escapeHtml(socialImageUrl)}" />`);
      expect(html).toContain('<meta property="og:image:width" content="1200" />');
      expect(html).toContain('<meta property="og:image:height" content="630" />');
      expect(html).toContain(
        `<meta property="og:image:alt" content="${escapeHtml(routeMetadataData.site.socialImageAlt)}" />`,
      );
      expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
      expect(html).toContain(`<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`);
      expect(html).toContain(`<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`);
      expect(html).toContain(`<meta name="twitter:image" content="${escapeHtml(socialImageUrl)}" />`);
      expect(html).toContain(
        `<meta name="twitter:image:alt" content="${escapeHtml(routeMetadataData.site.socialImageAlt)}" />`,
      );
      expect(html).toContain('<link rel="icon" href="/favicon.svg" type="image/svg+xml" />');
      expect(html).toContain('<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />');
      expect(html).toContain('<link rel="apple-touch-icon" href="/apple-touch-icon.png" />');
      expect(html).toContain('<link rel="manifest" href="/site.webmanifest" />');
      expect(html).toContain(`<meta name="theme-color" content="${escapeHtml(routeMetadataData.site.themeColor)}" />`);
    });
  }
});

test.describe("crawl and app metadata assets", () => {
  test("robots.txt allows crawling and points to the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const robots = await response.text();

    expect(response.ok()).toBeTruthy();
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${siteOrigin}/sitemap.xml`);
  });

  test("sitemap.xml lists only canonical public routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const sitemap = await response.text();

    expect(response.ok()).toBeTruthy();

    for (const route of Object.keys(routeMetadataData.routes)) {
      expect(sitemap).toContain(`<loc>${absoluteRouteUrl(route)}</loc>`);
    }

    for (const route of [...aliasRedirects.map(({ from }) => from), ...retiredRoutes, ...devOnlyRoutes]) {
      expect(sitemap).not.toContain(`<loc>${absoluteRouteUrl(route)}</loc>`);
    }
  });

  test("site.webmanifest exposes the app identity and icons", async ({ request }) => {
    const response = await request.get("/site.webmanifest");
    const manifest = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(manifest).toMatchObject({
      name: "Vive Counselling",
      short_name: "Vive",
      start_url: "/",
      display: "standalone",
      background_color: "#f7f6f2",
      theme_color: "#234b3d",
    });
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: "/icon-192.png", sizes: "192x192", type: "image/png" }),
        expect.objectContaining({ src: "/icon-512.png", sizes: "512x512", type: "image/png" }),
      ]),
    );
  });

  for (const assetPath of [
    "/favicon.svg",
    "/favicon-32x32.png",
    "/apple-touch-icon.png",
    "/icon-192.png",
    "/icon-512.png",
    "/og-vive-counselling.png",
  ]) {
    test(`${assetPath} is served`, async ({ request }) => {
      const response = await request.get(assetPath);

      expect(response.ok()).toBeTruthy();
    });
  }
});

test.describe("alias URL redirects", () => {
  for (const { from, to } of aliasRedirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(from, { waitUntil: "networkidle" });

      await expect(page).toHaveURL(new RegExp(`${to}$`));
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    });
  }
});

test.describe("retired route boundaries", () => {
  for (const route of retiredRoutes) {
    test(`${route} is not registered`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page).toHaveTitle("Page not found | Vive Counselling");
      await expect(page.locator("h1")).toContainText(/This page does\s*not exist/);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    });
  }
});

test.describe("production route boundaries", () => {
  for (const route of devOnlyRoutes) {
    test(`${route} is not registered in the production build`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page).toHaveTitle("Page not found | Vive Counselling");
      await expect(page.locator("h1")).toContainText(/This page does\s*not exist/);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
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

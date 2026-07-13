import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test, type Page } from "playwright/test";

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
  routes: Record<string, { h1: string; title: string; description: string; robots?: string }>;
};
const vercelConfigData = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8")) as {
  headers?: Array<{
    source: string;
    headers: Array<{ key: string; value: string }>;
  }>;
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
const noindexDirective = "noindex, nofollow";
const indexableRoutes = ["/", "/working-with-joel", "/inclusion", "/contact"] as const;
const draftInclusionRoutes = ["/inclusion/kink-bdsm", "/inclusion/enm-polyamory", "/inclusion/lgbtqia"] as const;
const productionLinkHiddenRoutes = ["/", "/inclusion"] as const;
const analyticsConfigured = process.env.VITE_ANALYTICS_ENABLED === "true";
const qaRuntimeHostname = "127.0.0.1";

function normalizeAnalyticsHostname(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  try {
    const withProtocol = trimmedValue.includes("://") ? trimmedValue : `https://${trimmedValue}`;

    return new URL(withProtocol).hostname.toLowerCase();
  } catch {
    return trimmedValue.toLowerCase();
  }
}

const analyticsAllowedHostnames = new Set(
  (process.env.VITE_ANALYTICS_ALLOWED_HOSTS ?? "")
    .split(",")
    .map((hostname) => normalizeAnalyticsHostname(hostname))
    .filter((hostname): hostname is string => Boolean(hostname)),
);
const qaRuntimeHostAllowed = analyticsAllowedHostnames.has(qaRuntimeHostname);
const googleAnalyticsRouteTrackingEnabled =
  analyticsConfigured && qaRuntimeHostAllowed && Boolean(process.env.VITE_GA_MEASUREMENT_ID);
const microsoftClarityEnabled =
  analyticsConfigured && qaRuntimeHostAllowed && Boolean(process.env.VITE_CLARITY_PROJECT_ID);
const analyticsConfiguredOnBlockedHost =
  analyticsConfigured &&
  !qaRuntimeHostAllowed &&
  (Boolean(process.env.VITE_GA_MEASUREMENT_ID) || Boolean(process.env.VITE_CLARITY_PROJECT_ID));

const expectedIconAssets = [
  { path: "/favicon-32x32.png", width: 32, height: 32 },
  { path: "/apple-touch-icon.png", width: 180, height: 180 },
  { path: "/icon-192.png", width: 192, height: 192 },
  { path: "/icon-512.png", width: 512, height: 512 },
] as const;
const expectedFaviconTags = [
  '<link rel="icon" href="/favicon.ico" sizes="any" />',
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
  '<link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
  '<link rel="manifest" href="/site.webmanifest" />',
] as const;
const expectedSocialImageAsset = { path: "/og-vive-counselling.png", width: 1200, height: 630 } as const;

const readPngDimensions = (body: Uint8Array) => {
  const view = new DataView(body.buffer, body.byteOffset, body.byteLength);

  return {
    width: view.getUint32(16),
    height: view.getUint32(20),
  };
};
const readIcoDirectory = (body: Uint8Array) => {
  const view = new DataView(body.buffer, body.byteOffset, body.byteLength);
  const count = view.getUint16(4, true);

  return Array.from({ length: count }, (_, index) => {
    const offset = 6 + index * 16;
    const imageOffset = view.getUint32(offset + 12, true);
    const pngSignature = Array.from(body.slice(imageOffset, imageOffset + 8));

    return {
      width: view.getUint8(offset) || 256,
      height: view.getUint8(offset + 1) || 256,
      colorCount: view.getUint8(offset + 2),
      reserved: view.getUint8(offset + 3),
      planes: view.getUint16(offset + 4, true),
      bitCount: view.getUint16(offset + 6, true),
      bytesInRes: view.getUint32(offset + 8, true),
      imageOffset,
      pngSignature,
    };
  });
};
const uniqueDeploymentOriginPattern =
  /counselling-website-[a-z0-9]{8,}-diabolicskink-7990s-projects\.vercel\.app/i;

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

function escapeXml(value: string) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function getHomeStructuredDataScript() {
  const homepageUrl = absoluteRouteUrl("/");
  const websiteId = `${homepageUrl}#website`;
  const organizationId = `${homepageUrl}#organization`;
  const personId = `${homepageUrl}#joel-griffiths`;
  const organization = routeMetadataData.site.organization;
  const person = routeMetadataData.site.person;

  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: routeMetadataData.site.name,
        url: homepageUrl,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: routeMetadataData.site.name,
        url: homepageUrl,
        email: organization.email,
        description: organization.description,
        sameAs: organization.sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "enquiries",
          email: organization.email,
          availableLanguage: "English",
        },
        logo: {
          "@type": "ImageObject",
          url: `${siteOrigin}${organization.logo}`,
          width: organization.logoWidth,
          height: organization.logoHeight,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        url: `${siteOrigin}${person.url}`,
        image: `${siteOrigin}${person.image}`,
        description: person.description,
        jobTitle: person.jobTitle,
        worksFor: { "@id": organizationId },
        sameAs: person.sameAs,
      },
    ],
  })}</script>`;
}

function routeRobotsDirective(route: string) {
  return routeMetadataData.routes[route]?.robots;
}

function expectNoGeneratedOriginLeak(content: string) {
  expect(content).not.toMatch(/localhost/i);
  expect(content).not.toMatch(/127\.0\.0\.1/);
  expect(content).not.toMatch(uniqueDeploymentOriginPattern);
}

function isAnalyticsUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);

    return (
      url.hostname === "www.googletagmanager.com" ||
      url.hostname === "www.google-analytics.com" ||
      url.hostname === "analytics.google.com" ||
      url.hostname === "clarity.ms" ||
      url.hostname.endsWith(".clarity.ms") ||
      url.pathname.startsWith("/_vercel/insights")
    );
  } catch {
    return (
      rawUrl.includes("googletagmanager.com") ||
      rawUrl.includes("google-analytics.com") ||
      rawUrl.includes("clarity.ms")
    );
  }
}

type PageDiagnostics = {
  consoleErrors: string[];
  failedRequests: string[];
  failedResponses: string[];
};

type AnalyticsPageViewEvent = {
  eventName: string;
  params: {
    page_location?: string;
    page_path?: string;
    page_title?: string;
    send_to?: string;
  };
};

function collectPageDiagnostics(page: Page): PageDiagnostics {
  const diagnostics: PageDiagnostics = {
    consoleErrors: [],
    failedRequests: [],
    failedResponses: [],
  };

  page.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location();
      const source = location.url ? ` (${location.url}:${location.lineNumber}:${location.columnNumber})` : "";

      diagnostics.consoleErrors.push(`${message.text()}${source}`);
    }
  });

  page.on("response", (response) => {
    if (response.status() >= 400) {
      const request = response.request();

      diagnostics.failedResponses.push(
        `${response.status()} ${response.statusText()} ${request.method()} ${request.resourceType()} ${response.url()}`,
      );
    }
  });

  page.on("requestfailed", (request) => {
    diagnostics.failedRequests.push(
      `${request.method()} ${request.resourceType()} ${request.url()} - ${request.failure()?.errorText ?? "unknown failure"}`,
    );
  });

  return diagnostics;
}

async function expectNoPageDiagnostics(diagnostics: PageDiagnostics) {
  expect(diagnostics).toEqual({
    consoleErrors: [],
    failedRequests: [],
    failedResponses: [],
  });
}

async function expectNotFoundPage(page: Page, requestedPath: string) {
  await expect(page).toHaveTitle("Page not found | Vive Counselling");
  await expect(page.locator(".not-found-page__label")).toHaveText("Page not found");
  await expect(page.locator("h1")).toHaveText("That page isn't here.");
  await expect(page.getByLabel("Requested address")).toContainText(requestedPath);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
}

async function getAnalyticsPageViewEvents(page: Page): Promise<AnalyticsPageViewEvent[]> {
  return page.evaluate(() => {
    return (window.dataLayer ?? [])
      .filter((entry) => entry[0] === "event" && entry[1] === "page_view")
      .map((entry) => ({
        eventName: entry[1],
        params: entry[2] ?? {},
      }));
  });
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

const notFoundBoundaryRoutes = [...retiredRoutes, ...devOnlyRoutes, "/not-a-real-page"] as const;
const landmarkContractRoutes = [...publicRoutes, ...notFoundBoundaryRoutes] as const;

test.describe("public pages", () => {
  for (const route of publicRoutes) {
    test(`${route} renders core content and hydrated metadata`, async ({ page }) => {
      const diagnostics = collectPageDiagnostics(page);

      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page.locator("main").first()).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("h1")).toHaveText(routeMetadataData.routes[route].h1);
      await expect(page.locator(".hero-section h2.hero-display")).toHaveCount(1);
      await expect(page).toHaveTitle(routeMetadataData.routes[route].title);

      const h1Text = (await page.locator("h1").innerText()).trim();
      expect(h1Text.length).toBeGreaterThan(8);

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);

      const robotsDirective = routeRobotsDirective(route);
      if (robotsDirective) {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", robotsDirective);
      } else {
        await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      }

      await expectNoPageDiagnostics(diagnostics);
    });
  }
});

test.describe("landmark structure", () => {
  for (const route of landmarkContractRoutes) {
    test(`${route} exposes one main landmark`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      const mainLandmark = page.getByRole("main");

      await expect(mainLandmark).toHaveCount(1);
      await expect(mainLandmark).toBeVisible();
      await expect(page.locator("main")).toHaveCount(1);
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
      expectNoGeneratedOriginLeak(html);
      expect(html).toContain(`<main data-static-route-shell="${escapeHtml(route)}">`);
      expect(html).toContain(`<h1>${escapeHtml(metadata.h1)}</h1>`);
      expect(html).toContain(`<p>${escapeHtml(metadata.description)}</p>`);
      expect(html).toContain(`<title>${escapeHtml(metadata.title)}</title>`);
      expect(html).toContain(
        `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
      );
      if (metadata.robots) {
        expect(html).toContain(`<meta name="robots" content="${metadata.robots}" />`);
      } else {
        expect(html).not.toContain('<meta name="robots"');
      }
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
      if (route === "/") {
        expect(html).toContain(getHomeStructuredDataScript());
      } else {
        expect(html).not.toContain('"@type":"WebSite"');
        expect(html).not.toContain('"@type":"Organization"');
        expect(html).not.toContain('"@type":"Person"');
      }
      for (const faviconTag of expectedFaviconTags) {
        expect(html).toContain(faviconTag);
      }
      expect(html).toContain(`<meta name="theme-color" content="${escapeHtml(routeMetadataData.site.themeColor)}" />`);
    });
  }
});

test.describe("crawl and app metadata assets", () => {
  test("robots.txt allows crawling and advertises the launch sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const robots = await response.text();

    expect(response.ok()).toBeTruthy();
    expectNoGeneratedOriginLeak(robots);
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).not.toContain("Disallow: /");
    expect(robots).toContain(`Sitemap: ${siteOrigin}/sitemap.xml`);
  });

  test("sitemap.xml includes only approved indexable public routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const sitemap = await response.text();

    expect(response.ok()).toBeTruthy();
    expectNoGeneratedOriginLeak(sitemap);
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    for (const route of indexableRoutes) {
      expect(sitemap).toContain(`<loc>${escapeXml(absoluteRouteUrl(route))}</loc>`);
    }

    for (const route of Object.keys(routeMetadataData.routes)) {
      if (!indexableRoutes.includes(route as (typeof indexableRoutes)[number])) {
        expect(sitemap).not.toContain(`<loc>${escapeXml(absoluteRouteUrl(route))}</loc>`);
      }
    }

    for (const route of [...aliasRedirects.map(({ from }) => from), ...retiredRoutes, ...devOnlyRoutes]) {
      expect(sitemap).not.toContain(`<loc>${escapeXml(absoluteRouteUrl(route))}</loc>`);
    }

    expect(sitemap).not.toContain(`${siteOrigin}/404`);
    expect(sitemap).not.toContain(`${siteOrigin}/404.html`);
  });

  test("draft inclusion child routes carry durable route-level noindex metadata", () => {
    for (const route of draftInclusionRoutes) {
      expect(routeMetadataData.routes[route].robots).toBe(noindexDirective);
    }

    for (const [route, metadata] of publicRouteMetadataEntries) {
      if (!draftInclusionRoutes.includes(route as (typeof draftInclusionRoutes)[number])) {
        expect(metadata.robots).toBeUndefined();
      }
    }
  });

  for (const route of productionLinkHiddenRoutes) {
    test(`${route} does not link to draft inclusion child pages in production`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      for (const childRoute of draftInclusionRoutes) {
        await expect(page.locator(`a[href="${childRoute}"]`)).toHaveCount(0);
      }

      if (route === "/") {
        await expect(page.getByText("Kink & BDSM counselling")).toBeVisible();
        await expect(page.getByText("Polyamory & ENM counselling")).toBeVisible();
        await expect(page.getByText("LGBTQIA+ inclusive")).toBeVisible();
        await expect(page.locator(".home-page__inclusive-details .site-detail-stack__action")).toHaveCount(0);
      }

      if (route === "/inclusion") {
        const inclusionHeroDetails = page.locator(".inclusion-hero__details");

        await expect(inclusionHeroDetails).toBeVisible();
        await expect(inclusionHeroDetails.locator(".inclusion-hero__detail-link--static")).toHaveText([
          "Kink & BDSM",
          "ENM & Polyamory",
          "LGBTQIA+",
        ]);
      }
    });
  }

  test("Vercel config does not apply global noindex headers", () => {
    const siteWideHeader = vercelConfigData.headers?.find(({ source }) => source === "/(.*)");
    const configuredHeaders = vercelConfigData.headers?.flatMap(({ headers }) => headers) ?? [];

    expect(siteWideHeader?.headers ?? []).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ key: "X-Robots-Tag" })]),
    );
    expect(configuredHeaders).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "X-Robots-Tag",
          value: expect.stringContaining("noindex"),
        }),
      ]),
    );
  });

  test("404.html serves an app-powered noindex fallback shell", async ({ request }) => {
    const response = await request.get("/404.html");
    const html = await response.text();

    expect(response.ok()).toBeTruthy();
    expectNoGeneratedOriginLeak(html);
    expect(html).toContain("<title>Page not found | Vive Counselling</title>");
    expect(html).toContain(`<meta name="robots" content="${noindexDirective}" />`);
    expect(html).toContain('<main data-static-route-shell="/404.html">');
    expect(html).toContain("<h1>That page isn't here.</h1>");
    expect(html).toContain("<p>This page could not be found on the Vive Counselling website.</p>");
    expect(html).toContain('script type="module"');
    expect(html).toContain("/assets/");
    expect(html).not.toContain('<link rel="canonical"');
    for (const faviconTag of expectedFaviconTags) {
      expect(html).toContain(faviconTag);
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

  test("favicon SVG exposes the current app icon mark", async ({ request }) => {
    const response = await request.get("/favicon.svg");
    const svg = await response.text();

    expect(response.ok()).toBeTruthy();
    expect(svg).toContain('viewBox="0 0 64 64"');
    expect(svg).toContain('fill="#234b3d"');
    expect(svg).toContain('fill="#c49a4b"');
  });

  for (const { path, width, height } of expectedIconAssets) {
    test(`${path} has the expected icon dimensions`, async ({ request }) => {
      const response = await request.get(path);

      expect(response.ok()).toBeTruthy();
      const dimensions = readPngDimensions(await response.body());

      expect(dimensions).toEqual({ width, height });
    });
  }

  test("/favicon.ico is a PNG-backed ICO fallback with expected icon sizes", async ({ request }) => {
    const response = await request.get("/favicon.ico");

    expect(response.ok()).toBeTruthy();
    const body = await response.body();
    const view = new DataView(body.buffer, body.byteOffset, body.byteLength);

    expect(view.getUint16(0, true)).toBe(0);
    expect(view.getUint16(2, true)).toBe(1);

    const entries = readIcoDirectory(body);

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 32,
          height: 32,
          colorCount: 0,
          reserved: 0,
          planes: 1,
          bitCount: 32,
          pngSignature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
        }),
        expect.objectContaining({
          width: 192,
          height: 192,
          colorCount: 0,
          reserved: 0,
          planes: 1,
          bitCount: 32,
          pngSignature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
        }),
      ]),
    );
  });

  test(`${expectedSocialImageAsset.path} has the expected social preview dimensions`, async ({ request }) => {
    const response = await request.get(expectedSocialImageAsset.path);

    expect(response.ok()).toBeTruthy();
    const dimensions = readPngDimensions(await response.body());

    expect(dimensions).toEqual({
      width: expectedSocialImageAsset.width,
      height: expectedSocialImageAsset.height,
    });
  });

  test("analytics providers are disabled in default QA builds", async ({ page }) => {
    const analyticsRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) {
        analyticsRequests.push(request.url());
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });

    expect(analyticsRequests).toEqual([]);
    await expect(
      page.locator(
        [
          'script[src*="googletagmanager.com"]',
          'script[src*="google-analytics.com"]',
          'script[src*="clarity.ms"]',
          'script[src*="/_vercel/insights"]',
          "#vive-google-analytics",
          "#vive-google-analytics-config",
          "#vive-microsoft-clarity",
        ].join(", "),
      ),
    ).toHaveCount(0);
  });

  test("analytics providers stay blocked on unallowed configured hosts", async ({ page }) => {
    test.skip(!analyticsConfiguredOnBlockedHost, "Analytics host blocking is covered by npm run qa:analytics.");

    const analyticsRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) {
        analyticsRequests.push(request.url());
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });

    expect(analyticsRequests).toEqual([]);
    await expect(
      page.locator(
        [
          'script[src*="googletagmanager.com"]',
          'script[src*="google-analytics.com"]',
          'script[src*="clarity.ms"]',
          'script[src*="/_vercel/insights"]',
          "#vive-google-analytics",
          "#vive-google-analytics-config",
          "#vive-microsoft-clarity",
        ].join(", "),
      ),
    ).toHaveCount(0);
  });

  test("enquiry form is explicitly masked for Clarity", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "networkidle" });

    await expect(page.locator("form.site-form")).toHaveAttribute("data-clarity-mask", "true");
  });

  test("Google Analytics sends route-change page views when enabled", async ({ page }) => {
    test.skip(!googleAnalyticsRouteTrackingEnabled, "Analytics route tracking is covered by npm run qa:analytics.");

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

    await page.goto("/", { waitUntil: "networkidle" });

    await expect
      .poll(() => getAnalyticsPageViewEvents(page))
      .toEqual([
        {
          eventName: "page_view",
          params: {
            page_location: "http://127.0.0.1:4287/",
            page_path: "/",
            page_title: routeMetadataData.routes["/"].title,
            send_to: process.env.VITE_GA_MEASUREMENT_ID,
          },
        },
      ]);

    await page.getByRole("banner").getByRole("link", { name: "Get in touch" }).click();

    await expect
      .poll(() => getAnalyticsPageViewEvents(page))
      .toEqual([
        {
          eventName: "page_view",
          params: {
            page_location: "http://127.0.0.1:4287/",
            page_path: "/",
            page_title: routeMetadataData.routes["/"].title,
            send_to: process.env.VITE_GA_MEASUREMENT_ID,
          },
        },
        {
          eventName: "page_view",
          params: {
            page_location: "http://127.0.0.1:4287/contact",
            page_path: "/contact",
            page_title: routeMetadataData.routes["/contact"].title,
            send_to: process.env.VITE_GA_MEASUREMENT_ID,
          },
        },
      ]);
  });

  test("Microsoft Clarity loads when configured", async ({ page }) => {
    test.skip(!microsoftClarityEnabled, "Microsoft Clarity loading is covered by npm run qa:analytics.");

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

    await page.goto("/", { waitUntil: "networkidle" });

    const clarityScript = page.locator("#vive-microsoft-clarity");

    await expect(clarityScript).toHaveAttribute(
      "src",
      `https://www.clarity.ms/tag/${process.env.VITE_CLARITY_PROJECT_ID}`,
    );
  });

  for (const assetPath of [
    "/favicon.ico",
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

test.describe("working with Joel approach tabs", () => {
  test("starts on the first tab and keeps one panel active", async ({ page }) => {
    await page.goto("/working-with-joel", { waitUntil: "networkidle" });

    const tablist = page.getByRole("tablist", { name: "Counselling approach" });
    const psychodynamic = tablist.getByRole("tab", { name: /Psychodynamic/ });
    const attachment = tablist.getByRole("tab", { name: /Attachment/ });
    const integrative = tablist.getByRole("tab", { name: /Integrative/ });

    await expect(page.locator(".working-approach__number")).toHaveCount(0);
    await expect(psychodynamic).toHaveAttribute("aria-selected", "true");
    await expect(attachment).toHaveAttribute("aria-selected", "false");
    await expect(integrative).toHaveAttribute("aria-selected", "false");

    const psychodynamicPanelId = await psychodynamic.getAttribute("aria-controls");

    expect(psychodynamicPanelId).toBeTruthy();

    if (psychodynamicPanelId) {
      await expect(page.locator(`[id="${psychodynamicPanelId}"]`)).toHaveAttribute("role", "tabpanel");
    }

    await attachment.click();
    await expect(psychodynamic).toHaveAttribute("aria-selected", "false");
    await expect(attachment).toHaveAttribute("aria-selected", "true");
    await expect(integrative).toHaveAttribute("aria-selected", "false");
    await expect(page.getByRole("tabpanel", { name: "Attachment" })).toContainText("Attachment work");

    await integrative.click();
    await expect(psychodynamic).toHaveAttribute("aria-selected", "false");
    await expect(attachment).toHaveAttribute("aria-selected", "false");
    await expect(integrative).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel", { name: "Integrative" })).toContainText("Integrative");
  });
});

test.describe("enquiry form", () => {
  test("shows a safe public error without technical details", async ({ page }) => {
    await page.route("**/api/enquiry", async (route) => {
      await route.fulfill({
        body: JSON.stringify({
          details: "Missing Vercel env vars: RESEND_API_KEY.",
          error: "Email delivery is not configured yet.",
        }),
        contentType: "application/json",
        status: 502,
      });
    });

    await page.goto("/contact", { waitUntil: "networkidle" });

    const form = page.locator("form.site-form");

    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await form.getByLabel("General enquiry").check();
    await form.getByRole("button", { name: "Send enquiry" }).click();

    const alert = form.getByRole("alert");

    await expect(alert).toContainText(
      "Sorry, the enquiry could not be sent. Please email joel@vivecounselling.com.au directly.",
    );
    await expect(alert).not.toContainText("Technical detail");
    await expect(alert).not.toContainText("RESEND_API_KEY");
    await expect(page.getByText(/Technical detail/i)).toHaveCount(0);
  });
});

test.describe("retired route boundaries", () => {
  for (const route of retiredRoutes) {
    test(`${route} is not registered`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      await expectNotFoundPage(page, route);
    });
  }
});

test.describe("production route boundaries", () => {
  for (const route of devOnlyRoutes) {
    test(`${route} is not registered in the production build`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      await expectNotFoundPage(page, route);
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

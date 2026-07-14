import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test, type Page } from "playwright/test";
import type { RouteMetadata, SiteMetadata } from "../src/data/routeMetadata";

const routeMetadataData = JSON.parse(
  readFileSync(new URL("../src/data/routeMetadata.json", import.meta.url), "utf8"),
) as {
  site: SiteMetadata;
  routes: Record<string, RouteMetadata>;
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
const prerenderedRoutes = publicRoutes;
const prerenderedRouteContracts = {
  "/": {
    mainClass: "site-page home-page",
    rawFragments: [
      'src="/joel-griffiths-homepage-portrait.jpg"',
      'fetchpriority="high"',
      'aria-label="Practice details"',
      'class="home-topics__grid"',
      'class="site-card home-workroom__joel"',
      'aria-label="Inclusive practice topics"',
      'href="/working-with-joel"',
      'href="/inclusion"',
      'href="/contact"',
    ],
    noJavaScriptSelector: 'img[src="/joel-griffiths-homepage-portrait.jpg"]',
  },
  "/working-with-joel": {
    mainClass: "site-page working-with-joel-page",
    rawFragments: [
      'src="/joel-griffiths-working-with-joel-portrait.jpg"',
      'loading="lazy"',
      'aria-label="Joel Griffiths credentials and practice details"',
      'aria-label="About Joel Griffiths"',
      'class="site-copy-panel rich-text working-with-joel-page__intro-panel"',
      'aria-label="Counselling approach"',
      'aria-label="Examples of what people bring to counselling"',
      'class="working-topics__item working-topics__item--closing"',
    ],
    noJavaScriptSelector: 'img[src="/joel-griffiths-working-with-joel-portrait.jpg"]',
  },
  "/inclusion": {
    mainClass: "site-page inclusion-page",
    rawFragments: ['class="inclusion-hub__panels"', 'class="site-faq-list"'],
    noJavaScriptSelector: ".inclusion-hub__panels",
  },
  "/inclusion/kink-bdsm": {
    mainClass: "site-page kink-page",
    rawFragments: ['class="kink-page__knowledge-grid"', 'class="site-faq-list"'],
    noJavaScriptSelector: ".kink-page__knowledge-grid",
  },
  "/inclusion/enm-polyamory": {
    mainClass: "site-page enm-page",
    rawFragments: ['class="enm-page__position-list"', 'class="site-faq-list"'],
    noJavaScriptSelector: ".enm-page__position-list",
  },
  "/inclusion/lgbtqia": {
    mainClass: "site-page inclusion-page lgbtqia-page",
    rawFragments: ['class="lgbtqia-page__assumptions"', 'class="lgbtqia-page__faq-list"'],
    noJavaScriptSelector: ".lgbtqia-page__assumptions",
  },
  "/contact": {
    mainClass: "site-page contact-page",
    rawFragments: [
      'class="site-fee-card contact-page__fee-card"',
      "Mon to Fri, 9.30am to 5.00pm AWST",
      'data-timezone-notes-source="prerendered"',
      'class="site-form"',
      'action="/api/enquiry"',
      'aria-labelledby="contact-form-heading"',
      'data-clarity-mask="true"',
      'id="contact-form-heading">Enquiry</h2>',
      'href="mailto:joel@vivecounselling.com.au"',
      'class="site-faq-list"',
    ],
    noJavaScriptSelector: "form.site-form",
  },
} as const;

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

type ServerRenderEntry = {
  renderRoute(pathname: string, options: { initialRenderAt: string }): string;
};

let serverRenderEntryPromise: Promise<ServerRenderEntry> | undefined;

function getServerRenderEntry() {
  serverRenderEntryPromise ??= import(
    new URL("../.prerender/server/entry-server.js", import.meta.url).href
  ) as Promise<ServerRenderEntry>;
  return serverRenderEntryPromise;
}

async function createSeededContactArtifact(templateHtml: string, initialRenderAt: string) {
  const { renderRoute } = await getServerRenderEntry();
  const renderedMarkup = renderRoute("/contact", { initialRenderAt });
  const renderedRoot = `<div id="root" data-render-mode="prerendered" data-prerendered-path="/contact" data-prerendered-at="${escapeHtml(
    initialRenderAt,
  )}">${renderedMarkup}</div>`;
  const rootPattern = /<div id="root"[^>]*>.*<\/div>(?=\s*<\/body>)/s;

  if (!rootPattern.test(templateHtml)) {
    throw new Error("Unable to replace the generated Contact root for fixed-clock coverage.");
  }

  return templateHtml.replace(rootPattern, renderedRoot);
}

function getExpectedStructuredDataIds() {
  const homepageUrl = absoluteRouteUrl("/");
  const profileUrl = absoluteRouteUrl("/working-with-joel");

  return {
    homepageUrl,
    organizationId: `${homepageUrl}#organization`,
    personId: `${profileUrl}#joel-griffiths`,
    profilePageId: `${profileUrl}#profile-page`,
    profileUrl,
    serviceId: `${homepageUrl}#counselling-service`,
    websiteId: `${homepageUrl}#website`,
  };
}

function getExpectedPersonNode(
  ids: ReturnType<typeof getExpectedStructuredDataIds>,
  options: { includeCredentials?: boolean; mainEntityOfPage?: string } = {},
) {
  const person = routeMetadataData.site.person;
  const { includeCredentials = false, mainEntityOfPage } = options;

  return {
    "@type": "Person",
    "@id": ids.personId,
    name: person.name,
    url: ids.profileUrl,
    image: `${siteOrigin}${person.image}`,
    description: person.description,
    jobTitle: person.jobTitle,
    worksFor: { "@id": ids.organizationId },
    sameAs: person.sameAs,
    knowsAbout: person.knowsAbout,
    ...(mainEntityOfPage ? { mainEntityOfPage: { "@id": mainEntityOfPage } } : {}),
    ...(includeCredentials
      ? {
          hasCredential: person.credentials.map((credential) => ({
            "@type": "EducationalOccupationalCredential",
            name: credential.name,
            credentialCategory: credential.credentialCategory,
            ...(credential.url ? { url: credential.url } : {}),
            recognizedBy: {
              "@type": credential.recognizedBy.type,
              name: credential.recognizedBy.name,
              url: credential.recognizedBy.url,
            },
          })),
        }
      : {}),
  };
}

function getExpectedStructuredDataScript(structuredData: object) {
  return `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
}

function getHomeStructuredDataScript() {
  const ids = getExpectedStructuredDataIds();
  const organization = routeMetadataData.site.organization;
  const service = routeMetadataData.site.service;

  return getExpectedStructuredDataScript({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.websiteId,
        name: routeMetadataData.site.name,
        url: ids.homepageUrl,
        publisher: { "@id": ids.organizationId },
      },
      {
        "@type": "Organization",
        "@id": ids.organizationId,
        name: routeMetadataData.site.name,
        url: ids.homepageUrl,
        email: organization.email,
        description: organization.description,
        sameAs: organization.sameAs,
        founder: { "@id": ids.personId },
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
      getExpectedPersonNode(ids),
      {
        "@type": "Service",
        "@id": ids.serviceId,
        name: service.name,
        serviceType: service.serviceType,
        url: `${siteOrigin}${service.url}`,
        description: service.description,
        provider: { "@id": ids.organizationId },
        audience: {
          "@type": "PeopleAudience",
          audienceType: service.audience,
        },
        areaServed: {
          "@type": "Country",
          name: service.areaServed,
        },
      },
    ],
  });
}

function getProfileStructuredDataScript() {
  const ids = getExpectedStructuredDataIds();

  return getExpectedStructuredDataScript({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": ids.profilePageId,
        url: ids.profileUrl,
        name: routeMetadataData.routes["/working-with-joel"].title,
        isPartOf: { "@id": ids.websiteId },
        mainEntity: { "@id": ids.personId },
      },
      getExpectedPersonNode(ids, {
        includeCredentials: true,
        mainEntityOfPage: ids.profilePageId,
      }),
    ],
  });
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

async function expectHomePageStructure(page: Page) {
  const home = page.locator("main.home-page");
  const portrait = home.locator('img[src="/joel-griffiths-homepage-portrait.jpg"]');

  await expect(home).toBeVisible();
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute("alt", "Joel Griffiths");
  await expect(portrait).toHaveAttribute("fetchpriority", "high");
  await expect(home.getByRole("list", { name: "Practice details" }).locator(":scope > li")).toHaveCount(4);
  await expect(home.getByRole("list", { name: "Common themes" }).locator(":scope > li")).toHaveCount(6);
  await expect(home.locator("article.site-card.home-workroom__joel")).toBeVisible();
  await expect(
    home.getByRole("navigation", { name: "Inclusive practice topics" }).locator(":scope li"),
  ).toHaveCount(3);

  for (const href of ["/working-with-joel", "/inclusion", "/contact"]) {
    await expect(home.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
}

async function expectWorkingWithJoelPageStructure(page: Page) {
  const main = page.locator("main.working-with-joel-page");
  const portrait = main.locator('img[src="/joel-griffiths-working-with-joel-portrait.jpg"]');

  await expect(main).toBeVisible();
  await expect(
    main.getByRole("list", { name: "Joel Griffiths credentials and practice details" }).locator(":scope > li"),
  ).toHaveCount(4);
  await expect(main.getByRole("region", { name: "Introducing Joel" })).toBeVisible();
  await expect(main.getByRole("complementary", { name: "About Joel Griffiths" })).toBeVisible();
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute("alt", "Joel Griffiths");
  await expect(portrait).toHaveAttribute("loading", "lazy");
  await expect(main.getByRole("tablist", { name: "Counselling approach" }).getByRole("tab")).toHaveCount(3);
  await expect(
    main.getByRole("list", { name: "Examples of what people bring to counselling" }).locator(":scope > li"),
  ).toHaveCount(10);
  await expect(main.locator(".working-topics__item--closing")).toHaveCount(1);
}

function expectMeaningfulRawH1(html: string) {
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];

  expect(h1Matches).toHaveLength(1);
  const h1Text = (h1Matches[0]?.[1] ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  expect(h1Text.length).toBeGreaterThan(8);
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
  "/working-with-joel",
  "/contact",
  "/inclusion",
  "/inclusion/kink-bdsm",
  "/inclusion/lgbtqia",
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
      await expect(page.locator("h1.hero-badge")).toHaveCount(1);
      await expect(page.locator("h1.hero-badge")).toBeVisible();
      await expect(page.locator(".hero-section p.hero-display")).toHaveCount(1);
      await expect(page.locator(".hero-section h2.hero-display")).toHaveCount(0);

      if (route === "/inclusion/kink-bdsm") {
        await expect(
          page.locator(
            "h2.kink-page__panel-title, .kink-page__closing-intro > h2, h2.kink-page__closing-card-title",
          ),
        ).toHaveCount(3);
        await expect(page.locator(".kink-page h3:not(.site-faq-item__heading)")).toHaveCount(0);
        await expect(page.locator(".site-faq-item h3.site-faq-item__heading")).not.toHaveCount(0);
      }

      if (route === "/inclusion/lgbtqia") {
        const pageMain = page.locator("main.lgbtqia-page");

        await expect(pageMain.locator(".lgbtqia-page__assumptions > div")).toHaveCount(4);
        await expect(pageMain.locator(".lgbtqia-page__topic-list > article")).toHaveCount(3);
        await expect(pageMain.locator(".lgbtqia-page__faq-list details")).toHaveCount(5);
      }
      await expect(page).toHaveTitle(routeMetadataData.routes[route].title);
      await expect(page.locator("#root")).toHaveAttribute(
        "data-react-activation",
        prerenderedRoutes.includes(route as (typeof prerenderedRoutes)[number]) ? "hydrate" : "client-render",
      );

      const h1Text = (await page.locator("h1").innerText()).trim();
      expect(h1Text.length).toBeGreaterThan(8);

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);

      if (route === "/") {
        await expectHomePageStructure(page);
      }

      if (route === "/working-with-joel") {
        await expectWorkingWithJoelPageStructure(page);
      }

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

test.describe("shared navigation", () => {
  test("restores mobile menu focus and body scrolling when Escape closes it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });

    const toggle = page.locator("button.menu-toggle");
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });

    await page.evaluate(() => {
      document.body.style.overflow = "clip";
    });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAccessibleName("Open navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();

    await expect(toggle).toHaveAccessibleName("Close navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(mobileNavigation).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    const workingWithJoelLink = mobileNavigation.getByRole("link", { name: "Working with Joel" });
    await workingWithJoelLink.focus();
    await expect(workingWithJoelLink).toBeFocused();

    await page.keyboard.press("Escape");

    await expect(mobileNavigation).toHaveCount(0);
    await expect(toggle).toHaveAccessibleName("Open navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("clip");
  });
});

test.describe("prerendered route activation boundaries", () => {
  test("keeps Home's page-owned navigation active after hydration", async ({ page }) => {
    const diagnostics = collectPageDiagnostics(page);

    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
    await page.evaluate(() => {
      document.body.dataset.spaNavigationSentinel = "preserved";
    });

    await page.locator('.home-workroom__joel a[href="/working-with-joel"]').click();

    await expect(page).toHaveURL(/\/working-with-joel$/);
    await expect(page.locator("h1.hero-badge")).toBeVisible();
    expect((await page.locator("h1.hero-badge").innerText()).trim().length).toBeGreaterThan(8);
    expect(await page.evaluate(() => document.body.dataset.spaNavigationSentinel)).toBe("preserved");
    await expectNoPageDiagnostics(diagnostics);
  });

  test("client-renders an unknown preview path when Vite serves mismatched Home markup", async ({
    page,
    request,
  }) => {
    const diagnostics = collectPageDiagnostics(page);
    const response = await request.get("/not-a-real-page");
    const html = await response.text();

    expect(response.ok()).toBeTruthy();
    expect(html).toContain('data-render-mode="prerendered"');
    expect(html).toContain('data-prerendered-path="/"');
    expect(html).not.toContain('data-not-found-fallback="true"');

    await page.goto("/not-a-real-page", { waitUntil: "networkidle" });

    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expect(page.locator("#root")).toHaveAttribute("data-prerendered-path", "/");
    await expectNotFoundPage(page, "/not-a-real-page");
    await expectNoPageDiagnostics(diagnostics);
  });

  test("client-renders the direct generic 404 artifact without attempting hydration", async ({ page }) => {
    const diagnostics = collectPageDiagnostics(page);

    await page.goto("/404.html", { waitUntil: "networkidle" });

    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expect(page.locator("#root")).not.toHaveAttribute("data-render-mode", /.+/);
    await expect(page.locator("#root")).not.toHaveAttribute("data-prerendered-path", /.+/);
    await expectNotFoundPage(page, "/404.html");
    await expectNoPageDiagnostics(diagnostics);
  });
});

test.describe("prerendered routes without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const route of prerenderedRoutes) {
    test(`${route} exposes meaningful component-rendered content and links`, async ({ page }) => {
      const contract = prerenderedRouteContracts[route];

      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page.locator("header.site-header")).toBeVisible();
      await expect(page.locator(`main.${contract.mainClass.split(" ").join(".")}`)).toBeVisible();
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main h1")).toBeVisible();
      expect((await page.locator("main h1").innerText()).trim().length).toBeGreaterThan(8);
      await expect(page.locator(contract.noJavaScriptSelector)).toBeVisible();
      await expect(page.locator("header.site-header a[href], footer.site-footer a[href]")).not.toHaveCount(0);
      await expect(page.locator("footer.site-footer")).toBeVisible();
      await expect(page.locator("footer.site-footer").getByText("Mon to Fri, 9.30am to 5.00pm AWST")).toBeVisible();
      await expect(page.locator("#root")).not.toHaveAttribute("data-react-activation", /.+/);

      if (route === "/") {
        await expectHomePageStructure(page);
      }

      if (route === "/working-with-joel") {
        await expectWorkingWithJoelPageStructure(page);
      }

      if (route === "/contact") {
        const form = page.getByRole("form", { name: "Enquiry" });

        await expect(form.getByRole("heading", { level: 2, name: "Enquiry", exact: true })).toHaveCount(1);
        await expect(form).toHaveAttribute("action", "/api/enquiry");
        await expect(form).toHaveAttribute("method", "post");
        await expect(form).toHaveAttribute("data-clarity-mask", "true");
        await expect(
          page.getByLabel("Contact details").getByText("Mon to Fri, 9.30am to 5.00pm AWST"),
        ).toBeVisible();
        await expect(page.getByLabel("Timezone")).toHaveCount(0);
      }
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
      const prerenderedRoute = route as (typeof prerenderedRoutes)[number];
      const contract = prerenderedRouteContracts[prerenderedRoute];

      expect(prerenderedRoutes).toContain(prerenderedRoute);
      expect(html).toContain('data-render-mode="prerendered"');
      expect(html).toContain(`data-prerendered-path="${escapeHtml(route)}"`);
      expect(html).toContain('<header class="site-header">');
      expect(html).toContain(`<main class="${contract.mainClass}">`);
      expectMeaningfulRawH1(html);
      for (const fragment of contract.rawFragments) {
        expect(html).toContain(fragment);
      }
      expect(html).toContain('<footer class="site-footer">');
      expect(html).not.toContain("data-not-found-fallback");
      expect(html).not.toContain("data-static-route-shell");
      expect(html).not.toContain("Static route shell generated at build time");
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
        expect(html).not.toContain('"@type":"ProfilePage"');
        expect(html).not.toContain('"hasCredential"');
      } else if (route === "/working-with-joel") {
        expect(html).toContain(getProfileStructuredDataScript());
        expect(html).not.toContain('"@type":"WebSite"');
        expect(html).not.toContain('"@type":"Service"');
      } else {
        expect(html).not.toContain('"@type":"WebSite"');
        expect(html).not.toContain('"@type":"Organization"');
        expect(html).not.toContain('"@type":"Person"');
        expect(html).not.toContain('"@type":"ProfilePage"');
        expect(html).not.toContain('"@type":"Service"');
      }
      for (const faviconTag of expectedFaviconTags) {
        expect(html).toContain(faviconTag);
      }
      expect(html).toContain(`<meta name="theme-color" content="${escapeHtml(routeMetadataData.site.themeColor)}" />`);
    });
  }
});

test.describe("prerendered route output forms", () => {
  for (const route of prerenderedRoutes.filter((route) => route !== "/")) {
    test(`${route} has equivalent flat and nested artifacts`, () => {
      const artifactPath = route.slice(1);
      const flatHtml = readFileSync(new URL(`../dist/${artifactPath}.html`, import.meta.url), "utf8");
      const nestedHtml = readFileSync(new URL(`../dist/${artifactPath}/index.html`, import.meta.url), "utf8");

      expect(nestedHtml).toBe(flatHtml);
      expect(flatHtml).toContain('data-render-mode="prerendered"');
      expect(flatHtml).toContain(`data-prerendered-path="${route}"`);
      expect(flatHtml).not.toContain("data-not-found-fallback");
      expect(flatHtml).not.toContain("data-static-route-shell");
    });
  }
});

test.describe("crawl and app metadata assets", () => {
  test("generated route roots share one valid prerender timestamp", async ({ request }) => {
    const timestamps = new Set<string>();

    for (const route of [...publicRoutes, "/404.html"]) {
      const response = await request.get(route);
      const html = await response.text();
      const timestamp = html.match(/<div id="root"[^>]*data-prerendered-at="([^"]+)"[^>]*>/)?.[1];

      expect(response.ok()).toBeTruthy();
      expect(timestamp).toBeTruthy();
      expect(Number.isNaN(Date.parse(timestamp ?? ""))).toBeFalsy();
      timestamps.add(timestamp ?? "");
    }

    expect(timestamps.size).toBe(1);
  });

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

  test("404.html serves an app-powered noindex fallback artifact", async ({ request }) => {
    const response = await request.get("/404.html");
    const html = await response.text();

    expect(response.ok()).toBeTruthy();
    expectNoGeneratedOriginLeak(html);
    expect(html).toContain("<title>Page not found | Vive Counselling</title>");
    expect(html).toContain(`<meta name="robots" content="${noindexDirective}" />`);
    expect(html).toContain('<main data-not-found-fallback="true">');
    expect(html).toContain("<h1>That page isn't here.</h1>");
    expect(html).toContain("<p>This page could not be found on the Vive Counselling website.</p>");
    expect(html).not.toContain('data-render-mode="prerendered"');
    expect(html).not.toContain("data-prerendered-path=");
    expect(html).not.toContain("data-react-activation=");
    expect(html).not.toContain("data-static-route-shell");
    expect(html).not.toContain("Static route shell generated at build time");
    const timestamp = html.match(/<div id="root" data-prerendered-at="([^"]+)">/)?.[1];
    expect(timestamp).toBeTruthy();
    expect(Number.isNaN(Date.parse(timestamp ?? ""))).toBeFalsy();
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

test.describe("Working with Joel approach tabs", () => {
  test("keeps one labelled panel active for pointer and keyboard input", async ({ page }) => {
    const diagnostics = collectPageDiagnostics(page);

    await page.goto("/working-with-joel", { waitUntil: "networkidle" });
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");

    const tablist = page.getByRole("tablist", { name: "Counselling approach" });
    const psychodynamic = tablist.getByRole("tab", { name: "Psychodynamic" });
    const attachment = tablist.getByRole("tab", { name: "Attachment" });
    const integrative = tablist.getByRole("tab", { name: "Integrative" });
    const panel = page.getByRole("tabpanel");

    await expect(tablist.getByRole("tab")).toHaveCount(3);
    await expect(panel).toHaveCount(1);
    await expect(psychodynamic).toHaveAttribute("aria-selected", "true");
    await expect(psychodynamic).toHaveAttribute("tabindex", "0");
    await expect(attachment).toHaveAttribute("aria-selected", "false");
    await expect(attachment).toHaveAttribute("tabindex", "-1");
    await expect(integrative).toHaveAttribute("aria-selected", "false");
    await expect(integrative).toHaveAttribute("tabindex", "-1");

    const psychodynamicPanelId = await psychodynamic.getAttribute("aria-controls");
    const psychodynamicTabId = await psychodynamic.getAttribute("id");

    expect(psychodynamicPanelId).toBeTruthy();
    expect(psychodynamicTabId).toBeTruthy();
    await expect(attachment).toHaveAttribute("aria-controls", psychodynamicPanelId ?? "");
    await expect(integrative).toHaveAttribute("aria-controls", psychodynamicPanelId ?? "");
    await expect(panel).toHaveAttribute("id", psychodynamicPanelId ?? "");
    await expect(panel).toHaveAttribute("aria-labelledby", psychodynamicTabId ?? "");
    await expect(panel.locator(":scope > p")).toHaveCount(2);

    await attachment.click();
    await expect(psychodynamic).toHaveAttribute("aria-selected", "false");
    await expect(attachment).toHaveAttribute("aria-selected", "true");
    await expect(integrative).toHaveAttribute("aria-selected", "false");
    await expect(panel).toHaveAccessibleName("Attachment");
    await expect(panel.locator(":scope > p")).toHaveCount(2);

    await attachment.press("End");
    await expect(integrative).toBeFocused();
    await expect(psychodynamic).toHaveAttribute("aria-selected", "false");
    await expect(attachment).toHaveAttribute("aria-selected", "false");
    await expect(integrative).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAccessibleName("Integrative");

    await integrative.press("ArrowRight");
    await expect(psychodynamic).toBeFocused();
    await expect(psychodynamic).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAccessibleName("Psychodynamic");

    await psychodynamic.press("ArrowLeft");
    await expect(integrative).toBeFocused();
    await expect(integrative).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAccessibleName("Integrative");

    await integrative.press("Home");
    await expect(psychodynamic).toBeFocused();
    await expect(psychodynamic).toHaveAttribute("aria-selected", "true");
    await expect(psychodynamic).toHaveAttribute("tabindex", "0");
    await expect(attachment).toHaveAttribute("tabindex", "-1");
    await expect(integrative).toHaveAttribute("tabindex", "-1");
    await expect(panel).toHaveAccessibleName("Psychodynamic");
    await expectNoPageDiagnostics(diagnostics);
  });
});

test.describe("enquiry form", () => {
  async function routeSeededContact(page: Page, prerenderedAt: string) {
    await page.route("**/contact", async (route) => {
      const response = await route.fetch();
      const html = await createSeededContactArtifact(await response.text(), prerenderedAt);

      await route.fulfill({ body: html, response });
    });
  }

  async function openContactAt({
    currentTime,
    page,
    prerenderedAt,
  }: {
    currentTime: string;
    page: Page;
    prerenderedAt: string;
  }) {
    await page.clock.setFixedTime(currentTime);
    await routeSeededContact(page, prerenderedAt);
    await page.goto("/contact", { waitUntil: "networkidle" });
  }

  test("keeps current standard-time notes from the prerender seed", async ({ page }) => {
    const standardTime = "2026-07-15T04:00:00.000Z";
    const diagnostics = collectPageDiagnostics(page);

    await openContactAt({ currentTime: standardTime, page, prerenderedAt: standardTime });

    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
    await expect(
      page.getByLabel("Contact details").getByText("Mon to Fri, 9.30am to 5.00pm AWST"),
    ).toBeVisible();
    const notes = page.locator(".contact-page__contact-notes");
    await expect(notes).toHaveAttribute("data-timezone-notes-source", "prerendered");
    await expect(notes.locator("small")).toHaveText([
      "ACST: 11.00am to 6.30pm",
      "AEST: 11.30am to 7.00pm",
    ]);
    await expectNoPageDiagnostics(diagnostics);
  });

  test("keeps current daylight-saving notes from the prerender seed", async ({ page }) => {
    const daylightSavingTime = "2026-01-15T04:00:00.000Z";
    const diagnostics = collectPageDiagnostics(page);

    await openContactAt({ currentTime: daylightSavingTime, page, prerenderedAt: daylightSavingTime });

    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
    const notes = page.locator(".contact-page__contact-notes");
    await expect(notes).toHaveAttribute("data-timezone-notes-source", "prerendered");
    await expect(notes.locator("small")).toHaveText([
      "ACST: 11.00am to 6.30pm",
      "AEST: 11.30am to 7.00pm",
      "ACDT: 12.00pm to 7.30pm",
      "AEDT: 12.30pm to 8.00pm",
    ]);
    await expectNoPageDiagnostics(diagnostics);
  });

  test("refreshes stale notes and consult options for daylight-saving time", async ({ page }) => {
    const diagnostics = collectPageDiagnostics(page);

    await openContactAt({
      currentTime: "2026-01-15T04:00:00.000Z",
      page,
      prerenderedAt: "2026-07-15T04:00:00.000Z",
    });

    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
    const notes = page.locator(".contact-page__contact-notes");
    await expect(notes).toHaveAttribute("data-timezone-notes-source", "current");
    await expect(notes.locator("small")).toHaveText([
      "ACST: 11.00am to 6.30pm",
      "AEST: 11.30am to 7.00pm",
      "ACDT: 12.00pm to 7.30pm",
      "AEDT: 12.30pm to 8.00pm",
    ]);

    await expect(page.getByLabel("Timezone")).toHaveCount(0);
    await page.getByLabel("Booking enquiry").check();
    await page.getByLabel("Request a 15-minute consult").check();
    await expect(page.getByLabel("Timezone").locator("option")).toHaveText([
      "Select your timezone",
      "AWST (WA)",
      "ACST (NT)",
      "AEST (QLD)",
      "ACDT (SA)",
      "AEDT (NSW / ACT / VIC / TAS)",
    ]);
    await expectNoPageDiagnostics(diagnostics);
  });

  test(
    "preserves server-rendered form values through hydration and the timezone refresh",
    async ({ page }) => {
      const diagnostics = collectPageDiagnostics(page);
      let releaseClientBundle = () => {};
      const clientBundleGate = new Promise<void>((resolve) => {
        releaseClientBundle = resolve;
      });

      await page.clock.setFixedTime("2026-01-15T04:00:00.000Z");
      await routeSeededContact(page, "2026-07-15T04:00:00.000Z");
      await page.route("**/assets/*.js", async (route) => {
        await clientBundleGate;
        await route.continue();
      });

      await page.goto("/contact", { waitUntil: "commit" });
      const form = page.locator("form.site-form");

      try {
        await form.getByLabel("Name").fill("Alex Before Hydration");
        await form.getByLabel("Email").fill("alex@example.com");
        await form.getByLabel("Your enquiry").fill("Please preserve this message.");
      } finally {
        releaseClientBundle();
      }

      await page.waitForLoadState("networkidle");
      await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
      await expect(page.locator(".contact-page__contact-notes")).toHaveAttribute(
        "data-timezone-notes-source",
        "current",
      );
      await expect(form.getByLabel("Name")).toHaveValue("Alex Before Hydration");
      await expect(form.getByLabel("Email")).toHaveValue("alex@example.com");
      await expect(form.getByLabel("Your enquiry")).toHaveValue("Please preserve this message.");
      await expectNoPageDiagnostics(diagnostics);
    },
  );

  test("preserves conditional fields, payload values, and success focus", async ({ page }) => {
    const diagnostics = collectPageDiagnostics(page);
    let submittedMethod = "";
    let submittedPayload: Record<string, string> | undefined;
    let releaseSubmission = () => {};
    const submissionGate = new Promise<void>((resolve) => {
      releaseSubmission = resolve;
    });

    await page.clock.setFixedTime("2026-01-15T04:00:00.000Z");
    await page.route("**/api/enquiry", async (route) => {
      submittedMethod = route.request().method();
      submittedPayload = route.request().postDataJSON() as Record<string, string>;
      await submissionGate;
      await route.fulfill({
        body: JSON.stringify({ ok: true }),
        contentType: "application/json",
        status: 200,
      });
    });
    await page.goto("/contact", { waitUntil: "networkidle" });

    const form = page.getByRole("form", { name: "Enquiry" });
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
    await expect(form.getByRole("heading", { level: 2, name: "Enquiry", exact: true })).toHaveCount(1);
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("I would like an initial consult.");

    await form.getByLabel("General enquiry").check();
    await expect(form.getByLabel("Make an appointment")).toHaveCount(0);
    await expect(form.getByLabel("Request a 15-minute consult")).toHaveCount(0);

    await form.getByLabel("Booking enquiry").check();
    await form.getByLabel("Make an appointment").check();
    await expect(form.getByLabel("Preferred timing")).toBeVisible();
    await expect(form.getByLabel("State or territory")).toBeVisible();
    await expect(form.getByLabel("Availability")).toHaveCount(0);
    await expect(form.getByLabel("Timezone")).toHaveCount(0);

    await form.getByLabel("General enquiry").check();
    await expect(form.getByLabel("Preferred timing")).toHaveCount(0);
    await expect(form.getByLabel("State or territory")).toHaveCount(0);

    await form.getByLabel("Booking enquiry").check();
    await form.getByLabel("Request a 15-minute consult").check();
    await expect(form.getByLabel("Preferred timing")).toHaveCount(0);
    await expect(form.getByLabel("State or territory")).toHaveCount(0);
    await form.getByLabel("Availability").fill("Weekday afternoons");
    await form.getByLabel("Timezone").selectOption("AEDT");
    await form.getByRole("button", { name: "Send enquiry" }).click();

    try {
      await expect(form.getByRole("heading", { level: 2, name: "Enquiry", exact: true })).toHaveCount(1);
      await expect(form.getByRole("button", { name: "Sending..." })).toBeDisabled();
    } finally {
      releaseSubmission();
    }

    const completedFormArea = page.locator("section.site-form.site-form--complete");
    const success = completedFormArea.getByRole("status");
    await expect(success).toContainText("Thanks, your enquiry has been sent.");
    await expect(success).toBeFocused();
    await expect(
      completedFormArea.getByRole("heading", { level: 2, name: "Thanks, your enquiry has been sent." }),
    ).toHaveCount(1);
    await expect(completedFormArea.getByRole("heading", { level: 2 })).toHaveCount(1);
    await expect(page.getByRole("form", { name: "Enquiry" })).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 2, name: "Enquiry", exact: true })).toHaveCount(0);
    expect(await completedFormArea.getAttribute("aria-labelledby")).toBeNull();
    expect(submittedMethod).toBe("POST");
    expect(submittedPayload).toEqual({
      availability: "Weekday afternoons",
      bookingType: "consult",
      email: "alex@example.com",
      enquiryType: "booking",
      message: "I would like an initial consult.",
      name: "Alex Person",
      state: "",
      timing: "",
      timeZone: "AEDT",
      website: "",
    });
    await expectNoPageDiagnostics(diagnostics);
  });

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

    const form = page.getByRole("form", { name: "Enquiry" });

    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await form.getByLabel("General enquiry").check();
    await form.getByRole("button", { name: "Send enquiry" }).click();

    const alert = form.getByRole("alert");

    await expect(form.getByRole("heading", { level: 2, name: "Enquiry", exact: true })).toHaveCount(1);
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

test("rebuilt LGBTQIA+ page reflows without horizontal overflow", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 820, height: 1180 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/inclusion/lgbtqia", { waitUntil: "networkidle" });

    await expect(page.locator(".lgbtqia-page__assumptions")).toBeVisible();
    await expect(page.locator(".lgbtqia-page__faq-list")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
    ).toBe(true);
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

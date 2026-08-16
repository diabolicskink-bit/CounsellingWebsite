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

const publicRoutes = Object.keys(routeMetadataData.routes);
const inclusionChildRoutes = [
  { path: "/kink-bdsm-counselling", navLabel: "Kink & BDSM" },
  { path: "/polyamory-enm-counselling", navLabel: "ENM & polyamory" },
  { path: "/lgbtqia-affirming-counselling", navLabel: "LGBTQIA+" },
] as const;
const aliasRedirects = [
  { from: "/about", to: "/working-with-joel" },
  { from: "/fees", to: "/contact" },
  { from: "/inclusion", to: "/inclusive-counselling" },
] as const;
const expectedSocialProfileLinks = [
  { name: "Instagram", href: "https://www.instagram.com/joel.ropes/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/vivecounselling/" },
] as const;
const noindexDirective = "noindex, nofollow";
const siteOrigin = (process.env.SITE_URL ?? routeMetadataData.site.defaultOrigin).replace(/\/$/, "");
const analyticsConfigured = process.env.VITE_ANALYTICS_ENABLED === "true";
const visitAnalyticsConfigured = process.env.VITE_VISIT_ANALYTICS_ENABLED === "true";
const qaRuntimeUrl = new URL(process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4287");
const qaRuntimeOrigin = qaRuntimeUrl.origin;

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const analyticsAllowedHostnames = new Set(
  (process.env.VITE_ANALYTICS_ALLOWED_HOSTS ?? "")
    .split(",")
    .map((hostname) => normalizeAnalyticsHostname(hostname))
    .filter((hostname): hostname is string => Boolean(hostname)),
);
const visitAnalyticsAllowedHostnames = new Set(
  (process.env.VITE_VISIT_ANALYTICS_ALLOWED_HOSTS ?? "")
    .split(",")
    .map((hostname) => normalizeAnalyticsHostname(hostname))
    .filter((hostname): hostname is string => Boolean(hostname)),
);
const qaRuntimeHostAllowed = analyticsAllowedHostnames.has(qaRuntimeUrl.hostname);
const qaRuntimeHostAllowedForVisitAnalytics = visitAnalyticsAllowedHostnames.has(qaRuntimeUrl.hostname);
const googleAnalyticsRouteTrackingEnabled =
  analyticsConfigured && qaRuntimeHostAllowed && Boolean(process.env.VITE_GA_MEASUREMENT_ID);
const microsoftClarityEnabled =
  analyticsConfigured && qaRuntimeHostAllowed && Boolean(process.env.VITE_CLARITY_PROJECT_ID);
const analyticsConfiguredOnBlockedHost =
  (
    analyticsConfigured
    && !qaRuntimeHostAllowed
    && (Boolean(process.env.VITE_GA_MEASUREMENT_ID) || Boolean(process.env.VITE_CLARITY_PROJECT_ID))
  )
  || (visitAnalyticsConfigured && !qaRuntimeHostAllowedForVisitAnalytics);
const firstPartyVisitRecordingEnabled =
  visitAnalyticsConfigured && qaRuntimeHostAllowedForVisitAnalytics;

type PageDiagnostics = {
  consoleErrors: string[];
  failedRequests: string[];
  failedResponses: string[];
};

type GoogleAnalyticsEvent = {
  eventName: string;
  params: Record<string, unknown>;
};

type GoogleAnalyticsEventArguments = [
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
];

function collectPageDiagnostics(page: Page): PageDiagnostics {
  const diagnostics: PageDiagnostics = {
    consoleErrors: [],
    failedRequests: [],
    failedResponses: [],
  };

  page.on("console", (message) => {
    if (message.type() === "error") {
      diagnostics.consoleErrors.push(message.text());
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      diagnostics.failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on("requestfailed", (request) => {
    diagnostics.failedRequests.push(
      `${request.method()} ${request.url()} - ${request.failure()?.errorText ?? "unknown failure"}`,
    );
  });

  return diagnostics;
}

function expectNoPageDiagnostics(diagnostics: PageDiagnostics) {
  expect(diagnostics).toEqual({
    consoleErrors: [],
    failedRequests: [],
    failedResponses: [],
  });
}

async function expectNotFoundPage(page: Page, requestedPath: string) {
  await expect(page).toHaveTitle("Page not found | Vive Counselling");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("That page isn't here.");
  await expect(page.getByLabel("Requested address")).toContainText(requestedPath);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
}

function isAnalyticsUrl(rawUrl: string) {
  try {
    const hostname = new URL(rawUrl).hostname;

    return (
      hostname === "www.googletagmanager.com" ||
      hostname === "www.google-analytics.com" ||
      hostname === "analytics.google.com" ||
      hostname === "clarity.ms" ||
      hostname.endsWith(".clarity.ms")
    );
  } catch {
    return false;
  }
}

async function stubAnalyticsRequests(page: Page) {
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

async function getGoogleAnalyticsEvents(page: Page, eventName: string): Promise<GoogleAnalyticsEvent[]> {
  return page.evaluate((targetEventName) => {
    return (window.dataLayer ?? [])
      .filter((entry): entry is GoogleAnalyticsEventArguments => entry[0] === "event")
      .filter((entry) => entry[1] === targetEventName)
      .map((entry) => ({
        eventName: entry[1],
        params: entry[2] ?? {},
      }));
  }, eventName);
}

test.describe("public routes", () => {
  for (const route of publicRoutes) {
    test(`${route} renders and hydrates without runtime failures`, async ({ page }) => {
      const diagnostics = collectPageDiagnostics(page);

      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page).toHaveTitle(routeMetadataData.routes[route].title);
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        routeMetadataData.routes[route].description,
      );
      await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
      expectNoPageDiagnostics(diagnostics);
    });
  }
});

test("Crisis Support exposes urgent actions and national and regional services", async ({ page }) => {
  await page.goto("/crisis-support", { waitUntil: "networkidle" });

  const main = page.locator("main.crisis-support-page");
  const expectedContactHrefs = [
    "tel:000",
    "tel:131114",
    "sms:0477131114",
    "tel:1300659467",
    "tel:139276",
    "tel:1800629354",
    "tel:1800011511",
    "tel:1800682288",
    "tel:1300642255",
    "tel:131465",
    "tel:1800332388",
    "tel:1300555788",
    "tel:1800676822",
    "tel:1800552002",
  ];
  const expectedStateHrefs = [
    "#crisis-act",
    "#crisis-nsw",
    "#crisis-nt",
    "#crisis-qld",
    "#crisis-sa",
    "#crisis-tas",
    "#crisis-vic",
    "#crisis-wa",
  ];
  const lastReviewed = routeMetadataData.routes["/crisis-support"].lastReviewed;

  if (!lastReviewed) {
    throw new Error("Crisis Support metadata must include a lastReviewed date.");
  }

  await expect(main.getByRole("link", { name: "Call 000" })).toHaveAttribute("href", "tel:000");
  await expect(main.getByRole("heading", { level: 2 })).toHaveText([
    "Immediate danger",
    "National urgent support services",
    "State and territory urgent support services",
  ]);
  await expect(main.locator(".crisis-support-page__national-service")).toHaveCount(3);
  await expect(main.locator(".crisis-support-page__state-service")).toHaveCount(8);
  expect(
    await main
      .locator('a[href^="tel:"], a[href^="sms:"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual(expectedContactHrefs);
  expect(
    await main
      .locator(".crisis-support-page__location-index a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual(expectedStateHrefs);
  await expect(main.getByRole("link", { name: "Find your local service" })).toHaveAttribute(
    "href",
    "https://vahi.vic.gov.au/mental-health-services",
  );
  await expect(main.locator(".crisis-support-page__information-note time")).toHaveAttribute(
    "datetime",
    lastReviewed,
  );
});

test("Crisis Support keeps keyboard focus visible and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/crisis-support", { waitUntil: "networkidle" });

  const emergencyCall = page.getByRole("main").getByRole("link", { name: "Call 000" });
  const lifelineLink = page.getByRole("main").getByRole("link", { name: "Lifeline" });

  await emergencyCall.focus();
  await expect(emergencyCall).toHaveCSS("outline-color", "rgb(96, 34, 29)");

  await lifelineLink.focus();
  await expect(lifelineLink).toHaveCSS("outline-color", "rgb(35, 75, 61)");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("Crisis Support semantic colours survive the shared CSS cascade", async ({ page }) => {
  await page.goto("/crisis-support", { waitUntil: "networkidle" });

  const emergency = page.locator(".crisis-support-page__emergency");

  await expect(emergency.getByRole("heading", { name: "Immediate danger" })).toHaveCSS(
    "color",
    "rgb(96, 34, 29)",
  );
  await expect(emergency.locator("p")).toHaveCSS("color", "rgb(71, 32, 28)");
  await expect(page.locator(".crisis-support-page__region").first()).toHaveCSS(
    "color",
    "rgb(29, 64, 52)",
  );
});

test("Working with Joel offers contact actions in the hero and closing invitation", async ({ page }) => {
  await page.goto("/working-with-joel", { waitUntil: "networkidle" });

  const main = page.getByRole("main");
  const hero = main.locator(".working-with-joel-page__hero");
  const closingInvitation = main.locator(".contact-invitation");

  await expect(hero.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  await expect(closingInvitation.getByRole("heading", { name: "Get in touch." })).toBeVisible();
  await expect(closingInvitation.getByRole("link", { name: "See contact options" })).toHaveAttribute(
    "href",
    "/contact",
  );
  await expect(main.locator(":scope > section").last()).toHaveClass(/contact-invitation/);
});

test.describe("shared navigation", () => {
  test("routes primary contact actions and exposes social profiles", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

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

    await header.getByRole("link", { name: "Get in touch" }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("exposes inclusion pages in desktop and mobile navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/", { waitUntil: "networkidle" });

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
    await page.goto("/", { waitUntil: "networkidle" });

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
});

test.describe("rendering boundaries", () => {
  test("keeps client-side navigation active after hydration", async ({ page }) => {
    const diagnostics = collectPageDiagnostics(page);

    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.body.dataset.spaNavigationSentinel = "preserved";
    });
    await page.getByRole("link", { name: "Read about inclusive practice" }).click();

    await expect(page).toHaveURL(/\/inclusive-counselling$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.body.dataset.spaNavigationSentinel)).toBe("preserved");
    expectNoPageDiagnostics(diagnostics);
  });

  test("client-renders unknown and generic fallback paths", async ({ page }) => {
    await page.goto("/not-a-real-page", { waitUntil: "networkidle" });
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expectNotFoundPage(page, "/not-a-real-page");

    await page.goto("/404.html", { waitUntil: "networkidle" });
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expect(page.locator("#root")).not.toHaveAttribute("data-render-mode", /.+/);
    await expectNotFoundPage(page, "/404.html");
  });

  for (const route of ["/design-language", "/design-system"]) {
    test(`${route} is not registered in production`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      await expectNotFoundPage(page, route);
      await expect(page.getByRole("link", { name: "Dev" })).toHaveCount(0);
    });
  }
});

test.describe("progressive enhancement", () => {
  test.use({ javaScriptEnabled: false });

  test("Contact exposes a usable native enquiry form without JavaScript", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "networkidle" });

    const form = page.getByRole("form", { name: "Enquiry" });

    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("action", "/api/enquiry");
    await expect(form).toHaveAttribute("method", "post");
    await expect(form).toHaveAttribute("data-clarity-mask", "true");
    await expect(page.getByRole("link", { name: "find support now" })).toHaveCount(2);
    await expect(page.locator("#root")).not.toHaveAttribute("data-react-activation", /.+/);
  });
});

test.describe("crawl output", () => {
  test("serves canonical first-response metadata, robots, and sitemap files", async ({ request }) => {
    const robotsResponse = await request.get("/robots.txt");
    const robots = await robotsResponse.text();
    const sitemapResponse = await request.get("/sitemap.xml");
    const sitemap = await sitemapResponse.text();

    expect(robotsResponse.ok()).toBeTruthy();
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${siteOrigin}/sitemap.xml`);
    expect(sitemapResponse.ok()).toBeTruthy();

    for (const route of publicRoutes) {
      const routeUrl = route === "/" ? `${siteOrigin}/` : `${siteOrigin}${route}`;
      const routeResponse = await request.get(route);
      const routeHtml = await routeResponse.text();

      expect(routeResponse.ok()).toBeTruthy();
      expect(routeHtml).toContain(`<title>${escapeHtml(routeMetadataData.routes[route].title)}</title>`);
      expect(routeHtml).toContain(
        `<meta name="description" content="${escapeHtml(routeMetadataData.routes[route].description)}" />`,
      );
      expect(routeHtml).toContain(`<link rel="canonical" href="${routeUrl}" />`);
      expect(sitemap).toContain(`<loc>${routeUrl}</loc>`);
    }

    const crisisSupportUrl = `${siteOrigin}/crisis-support`;
    const crisisSupportLastModified = routeMetadataData.routes["/crisis-support"].lastModified;

    expect(crisisSupportLastModified).toBeTruthy();
    expect(sitemap).toContain(
      `<url><loc>${crisisSupportUrl}</loc><lastmod>${crisisSupportLastModified}</lastmod></url>`,
    );
  });
});

test.describe("analytics", () => {
  test("analytics providers are disabled in default QA builds", async ({ page }) => {
    const analyticsRequests: string[] = [];
    const visitRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) {
        analyticsRequests.push(request.url());
      }

      if (new URL(request.url()).pathname === "/api/visit") {
        visitRequests.push(request.url());
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });

    expect(analyticsRequests).toEqual([]);
    expect(visitRequests).toEqual([]);
    await expect(
      page.locator(
        [
          'script[src*="googletagmanager.com"]',
          'script[src*="google-analytics.com"]',
          'script[src*="clarity.ms"]',
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
    const firstPartyAnalyticsRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) {
        analyticsRequests.push(request.url());
      }

      if (["/api/visit", "/api/visit-event"].includes(new URL(request.url()).pathname)) {
        firstPartyAnalyticsRequests.push(request.url());
      }
    });

    await page.goto("/contact", { waitUntil: "networkidle" });
    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Host gate check");

    expect(analyticsRequests).toEqual([]);
    expect(firstPartyAnalyticsRequests).toEqual([]);
    await expect(page.locator("#vive-google-analytics, #vive-microsoft-clarity")).toHaveCount(0);
  });

  test("private analytics routes do not record or load analytics providers", async ({ page }) => {
    test.skip(
      !(firstPartyVisitRecordingEnabled && googleAnalyticsRouteTrackingEnabled && microsoftClarityEnabled),
      "Private-route analytics exclusion is covered by npm run qa:analytics.",
    );

    const analyticsRequests: string[] = [];
    const visitRequests: string[] = [];

    page.on("request", (request) => {
      if (isAnalyticsUrl(request.url())) {
        analyticsRequests.push(request.url());
      }

      if (new URL(request.url()).pathname === "/api/visit") {
        visitRequests.push(request.url());
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
    expect(visitRequests).toEqual([]);
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

  test("private analytics routes force a clean document after an SPA transition", async ({ page }) => {
    test.skip(
      !(firstPartyVisitRecordingEnabled && googleAnalyticsRouteTrackingEnabled && microsoftClarityEnabled),
      "Private-route analytics exclusion is covered by npm run qa:analytics.",
    );

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

    await page.evaluate(() => {
      history.pushState({}, "", "/analytics");
      dispatchEvent(new PopStateEvent("popstate"));
    });

    await expect(page).toHaveURL(/\/analytics$/);
    await expect(page.getByRole("heading", { level: 1, name: "Today" })).toBeVisible();
    expect(privateDocumentRequests).toBe(1);
    await expect(
      page.locator("#vive-google-analytics, #vive-google-analytics-config, #vive-microsoft-clarity"),
    ).toHaveCount(0);
  });

  test("private analytics dashboard supports its core reporting path", async ({ page }) => {
    const visitorId = "114ba8f9-96f8-41e1-a301-15112400759e";
    const visitId = "1a560836-220d-4d33-a05e-5f364891f9cb";

    await page.route("**/api/analytics?*", async (route) => {
      const requestUrl = new URL(route.request().url());
      const date = requestUrl.searchParams.get("date") ?? "2026-08-15";
      const visit = {
        adCode: "enm-01",
        botCategory: null,
        botName: null,
        dateKey: date,
        durationSeconds: 90,
        events: [
          {
            eventType: "contact_option_selected",
            id: "d148d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
            occurredAt: `${date}T03:00:45.000Z`,
            pageViewId: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98",
            properties: { option: "question" },
            source: "client",
          },
          {
            eventType: "enquiry_failed",
            id: "d448d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
            occurredAt: `${date}T03:01:15.000Z`,
            pageViewId: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98",
            properties: { reason: "email_provider" },
            source: "server",
          },
          {
            eventType: "enquiry_sent",
            id: "d648d3b9-f4d3-4f53-bf5f-0f04150d3aaf",
            occurredAt: `${date}T03:01:25.000Z`,
            pageViewId: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98",
            properties: {},
            source: "server",
          },
        ],
        gclid: "CjwK-gclid-only",
        id: visitId,
        isBot: false,
        landingPath: "/",
        lastSeenAt: `${date}T03:01:30.000Z`,
        matchType: null,
        matchedKeyword: null,
        networkCode: null,
        pageViews: [
          { id: "a948d3b9-f4d3-4f53-bf5f-0f04150d3aaf", path: "/", viewedAt: `${date}T03:00:00.000Z` },
          { id: "e6bb1f87-203f-4ea8-812b-97d80b2d5e98", path: "/contact", viewedAt: `${date}T03:00:30.000Z` },
          { id: "f7bb1f87-203f-4ea8-812b-97d80b2d5e98", path: "/contact", viewedAt: `${date}T03:01:30.000Z` },
        ],
        referrerHost: null,
        referrerUrl: null,
        startedAt: `${date}T03:00:00.000Z`,
        trafficSource: "paid",
        totalVisits: 3,
        visitNumber: 2,
        visitorId,
      };
      const data = requestUrl.searchParams.has("visitor")
        ? { isExcluded: false, type: "visitor", visitorId, visits: [visit] }
        : requestUrl.searchParams.has("month")
          ? {
              type: "monthly",
              month: requestUrl.searchParams.get("month"),
              visits: [visit],
            }
          : { type: "daily", date, visits: [visit] };

      await route.fulfill({
        body: JSON.stringify({ data }),
        contentType: "application/json",
        status: 200,
      });
    });

    await page.goto("/analytics?date=2026-08-15", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 2, name: "Visits on this day" })).toBeVisible();
    await expect(page.getByRole("img", { name: /1 visits: 1 paid/ })).toBeVisible();
    await expect(page.getByText("Page views", { exact: true })).toBeVisible();

    const paidVisit = page.getByRole("button").filter({ hasText: "Ad enm-01" });
    await expect(paidVisit).toHaveCount(1);
    await expect(paidVisit).toContainText("Enquiry sent");
    await expect(paidVisit).toContainText("Question selected");
    await expect(paidVisit).not.toContainText("Send failed");

    await paidVisit.click();
    await expect(page.getByRole("heading", { level: 3, name: "Visit timeline" })).toBeVisible();
    await expect(page.getByText("Enquiry failed", { exact: true })).toBeVisible();
    await expect(page.getByText("GCLID", { exact: true })).toHaveCount(0);
    await expect(page.getByText("CjwK-gclid-only", { exact: true })).toHaveCount(0);

    await page.getByRole("button", { name: /View all visits from Visitor/ }).click();
    await expect(page.getByRole("heading", { level: 2, name: "All visits" })).toBeVisible();
    await expect(page.getByText("GCLID", { exact: true })).toHaveCount(0);
    await expect(page.getByText("CjwK-gclid-only", { exact: true })).toHaveCount(0);

    await page.getByRole("link", { name: "Enquiries" }).click();
    await expect(page).toHaveURL(/\/analytics\/enquiries$/);
    await expect(page.getByRole("heading", { level: 2, name: "All enquiries" })).toBeVisible();
    await page.getByRole("button", { name: /Enquiry sent on.*Open enquiry journey/ }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Enquiry journey" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Visits and enquiry activity" })).toBeVisible();
  });

  test("first-party visit recorder records SPA route changes and refreshes in the active visit", async ({ page }) => {
    test.skip(
      !firstPartyVisitRecordingEnabled,
      "First-party visit recording is covered by npm run qa:analytics.",
    );

    const observations: Array<Record<string, unknown>> = [];

    await page.route("**/api/visit", async (route) => {
      observations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });

    await page.goto(
      "/polyamory-enm-counselling?ad=enm&net=g&kw=polyamory%20therapy&mt=p&gclid=CjwK-test-click",
      {
        referer: "https://referrer.example/articles/open-relationships?source=directory",
        waitUntil: "networkidle",
      },
    );

    await expect.poll(() => observations.length).toBe(1);

    const [observation] = observations;
    const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    expect(observation).toEqual({
      adCode: "enm",
      gclid: "CjwK-test-click",
      landingPath: "/polyamory-enm-counselling",
      matchType: "p",
      matchedKeyword: "polyamory therapy",
      networkCode: "g",
      pageViewId: expect.stringMatching(uuidV4),
      path: "/polyamory-enm-counselling",
      referrerUrl: "https://referrer.example/articles/open-relationships?source=directory",
      visitId: expect.stringMatching(uuidV4),
      visitorId: expect.stringMatching(uuidV4),
    });

    const storedIdentity = await page.evaluate(() => {
      const visitor = JSON.parse(localStorage.getItem("vive:visit-analytics:visitor:v1") ?? "null");
      const visit = JSON.parse(sessionStorage.getItem("vive:visit-analytics:visit:v1") ?? "null");

      return {
        visitId: visit?.id,
        visitorId: visitor?.id,
        visitVisitorId: visit?.visitorId,
      };
    });

    expect(storedIdentity).toEqual({
      visitId: observation.visitId,
      visitorId: observation.visitorId,
      visitVisitorId: observation.visitorId,
    });

    await page.getByRole("banner").getByRole("link", { name: "Get in touch" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect.poll(() => observations.length).toBe(2);

    expect(observations[1]).toMatchObject({
      landingPath: observation.landingPath,
      path: "/contact",
      referrerUrl: observation.referrerUrl,
      visitId: observation.visitId,
      visitorId: observation.visitorId,
    });
    expect(observations[1].pageViewId).not.toBe(observation.pageViewId);

    await page.evaluate(() => {
      history.replaceState({}, "", "/contact?ignored=yes#fees");
      dispatchEvent(new PopStateEvent("popstate"));
    });
    await expect(page).toHaveURL(/\/contact\?ignored=yes#fees$/);
    await page.evaluate(() => new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    }));
    expect(observations).toHaveLength(2);

    await page.reload({ waitUntil: "networkidle" });
    await expect.poll(() => observations.length).toBe(3);

    expect(observations[2]).toMatchObject({
      landingPath: observation.landingPath,
      visitId: observation.visitId,
      visitorId: observation.visitorId,
    });
    expect(observations[2].pageViewId).not.toBe(observations[1].pageViewId);
    expect(observations[2].path).toBe("/contact");

    await page.goBack({ waitUntil: "networkidle" });
    await expect(page).toHaveURL(/\/polyamory-enm-counselling\?/);
    await expect.poll(() => observations.length).toBe(4);

    expect(observations[3]).toMatchObject({
      landingPath: observation.landingPath,
      path: "/polyamory-enm-counselling",
      visitId: observation.visitId,
      visitorId: observation.visitorId,
    });
    expect(observations[3].pageViewId).not.toBe(observation.pageViewId);
  });

  test("first-party visit recorder recognizes a return visit and rotates an expired browser ID", async ({ page }) => {
    test.skip(
      !firstPartyVisitRecordingEnabled,
      "First-party visit recording is covered by npm run qa:analytics.",
    );

    const observations: Array<Record<string, string | null>> = [];

    await page.route("**/api/visit", async (route) => {
      observations.push(route.request().postDataJSON() as Record<string, string | null>);
      await route.fulfill({ status: 204 });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await expect.poll(() => observations.length).toBe(1);

    await page.evaluate(() => {
      const key = "vive:visit-analytics:visit:v1";
      const visit = JSON.parse(sessionStorage.getItem(key) ?? "null");

      visit.lastActivityAt = Date.now() - 31 * 60 * 1000;
      sessionStorage.setItem(key, JSON.stringify(visit));
    });

    await page.reload({ waitUntil: "networkidle" });
    await expect.poll(() => observations.length).toBe(2);

    expect(observations[1].visitorId).toBe(observations[0].visitorId);
    expect(observations[1].visitId).not.toBe(observations[0].visitId);
    expect(observations[1].pageViewId).not.toBe(observations[0].pageViewId);

    await page.evaluate(() => {
      const key = "vive:visit-analytics:visitor:v1";
      const visitor = JSON.parse(localStorage.getItem(key) ?? "null");

      visitor.createdAt = Date.now() - 366 * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify(visitor));
    });

    await page.reload({ waitUntil: "networkidle" });
    await expect.poll(() => observations.length).toBe(3);

    expect(observations[2].visitorId).not.toBe(observations[1].visitorId);
    expect(observations[2].visitId).not.toBe(observations[1].visitId);
    expect(observations[2].pageViewId).not.toBe(observations[1].pageViewId);
  });

  test("first-party enquiry events stay visit-linked and server-owned", async ({ page }) => {
    test.skip(
      !firstPartyVisitRecordingEnabled,
      "First-party enquiry event recording is covered by npm run qa:analytics.",
    );

    const visitObservations: Array<Record<string, unknown>> = [];
    const eventObservations: Array<Record<string, unknown>> = [];
    const enquirySubmissions: Array<Record<string, unknown>> = [];
    const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    await stubAnalyticsRequests(page);
    await page.route("**/api/visit", async (route) => {
      visitObservations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/visit-event", async (route) => {
      eventObservations.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/enquiry", async (route) => {
      enquirySubmissions.push(route.request().postDataJSON() as Record<string, unknown>);
      await route.fulfill({ body: JSON.stringify({ ok: true }), contentType: "application/json", status: 200 });
    });

    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect.poll(() => visitObservations.length).toBe(1);

    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await expect.poll(() => eventObservations.length).toBe(2);

    const visitObservation = visitObservations[0];
    expect(eventObservations).toEqual([
      {
        eventId: expect.stringMatching(uuidV4),
        eventType: "contact_option_selected",
        pageViewId: visitObservation.pageViewId,
        properties: { option: "question" },
        visitId: visitObservation.visitId,
      },
      {
        eventId: expect.stringMatching(uuidV4),
        eventType: "enquiry_started",
        pageViewId: visitObservation.pageViewId,
        properties: {},
        visitId: visitObservation.visitId,
      },
    ]);

    await form.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect.poll(() => enquirySubmissions.length).toBe(1);
    expect(enquirySubmissions[0]).toMatchObject({
      analyticsPageViewId: visitObservation.pageViewId,
      analyticsVisitId: visitObservation.visitId,
    });
    expect(eventObservations.map((observation) => observation.eventType)).toEqual([
      "contact_option_selected",
      "enquiry_started",
    ]);
  });

  test("enquiry form is explicitly masked for Clarity", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect(page.getByRole("form", { name: "Enquiry" })).toHaveAttribute("data-clarity-mask", "true");
  });

  test("Google Analytics sends route-change page views when enabled", async ({ page }) => {
    test.skip(!googleAnalyticsRouteTrackingEnabled, "Analytics route tracking is covered by npm run qa:analytics.");
    await stubAnalyticsRequests(page);

    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("banner").getByRole("link", { name: "Get in touch" }).click();

    await expect.poll(() => getGoogleAnalyticsEvents(page, "page_view")).toEqual([
      {
        eventName: "page_view",
        params: {
          page_location: `${qaRuntimeOrigin}/`,
          page_path: "/",
          page_title: routeMetadataData.routes["/"].title,
          send_to: process.env.VITE_GA_MEASUREMENT_ID,
        },
      },
      {
        eventName: "page_view",
        params: {
          page_location: `${qaRuntimeOrigin}/contact`,
          page_path: "/contact",
          page_title: routeMetadataData.routes["/contact"].title,
          send_to: process.env.VITE_GA_MEASUREMENT_ID,
        },
      },
    ]);
  });

  test("confirmed enquiry submissions emit conversion analytics", async ({ page }) => {
    test.skip(!googleAnalyticsRouteTrackingEnabled, "Analytics conversion tracking is covered by npm run qa:analytics.");
    let submissionSucceeds = false;

    await page.route("**/*", async (route) => {
      const requestUrl = new URL(route.request().url());

      if (requestUrl.pathname === "/api/enquiry") {
        await route.fulfill({
          body: JSON.stringify(submissionSucceeds ? { ok: true } : { error: "Submission failed." }),
          contentType: "application/json",
          status: submissionSucceeds ? 200 : 502,
        });
        return;
      }
      if (isAnalyticsUrl(route.request().url())) {
        await route.fulfill({ body: "", contentType: "application/javascript", status: 200 });
        return;
      }
      await route.continue();
    });

    await page.goto("/contact", { waitUntil: "networkidle" });
    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await form.getByRole("button", { name: "Send enquiry" }).click();

    await expect(form.getByRole("alert")).toBeVisible();
    expect(await getGoogleAnalyticsEvents(page, "generate_lead")).toEqual([]);

    submissionSucceeds = true;
    await form.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect.poll(() => getGoogleAnalyticsEvents(page, "generate_lead")).toEqual([
      {
        eventName: "generate_lead",
        params: {
          form_name: "contact",
          lead_source: "website_enquiry_form",
          send_to: process.env.VITE_GA_MEASUREMENT_ID,
        },
      },
    ]);
  });

  test("Google Analytics contact-intent events contain no visitor data", async ({ page }) => {
    test.skip(!googleAnalyticsRouteTrackingEnabled, "Analytics contact-intent tracking is covered by npm run qa:analytics.");
    await stubAnalyticsRequests(page);

    await page.goto("/contact", { waitUntil: "networkidle" });
    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Request a consult").check();
    await form.getByLabel("Make an appointment").check();

    await expect.poll(() => getGoogleAnalyticsEvents(page, "contact_option_selected")).toEqual([
      {
        eventName: "contact_option_selected",
        params: { contact_option: "question", send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
      {
        eventName: "contact_option_selected",
        params: { contact_option: "consult", send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
      {
        eventName: "contact_option_selected",
        params: { contact_option: "appointment", send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
    ]);

    const emailLink = page.getByRole("link", { name: "joel@vivecounselling.com.au" }).first();
    await emailLink.evaluate((link) => {
      link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    });
    await emailLink.click();
    await expect.poll(() => getGoogleAnalyticsEvents(page, "email_link_clicked")).toEqual([
      {
        eventName: "email_link_clicked",
        params: { send_to: process.env.VITE_GA_MEASUREMENT_ID },
      },
    ]);
  });

  test("Microsoft Clarity loads when configured", async ({ page }) => {
    test.skip(!microsoftClarityEnabled, "Microsoft Clarity loading is covered by npm run qa:analytics.");
    await stubAnalyticsRequests(page);

    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("#vive-microsoft-clarity")).toHaveAttribute(
      "src",
      `https://www.clarity.ms/tag/${process.env.VITE_CLARITY_PROJECT_ID}`,
    );
  });
});

test.describe("alias URL redirects", () => {
  for (const { from, to } of aliasRedirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(from, { waitUntil: "networkidle" });
      await expect(page).toHaveURL(new RegExp(`${to}$`));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test("Working with Joel tabs support pointer and keyboard input", async ({ page }) => {
  await page.goto("/working-with-joel", { waitUntil: "networkidle" });

  const tablist = page.getByRole("tablist", { name: "Counselling approach" });
  const psychodynamic = tablist.getByRole("tab", { name: "Psychodynamic" });
  const attachment = tablist.getByRole("tab", { name: "Attachment" });
  const integrative = tablist.getByRole("tab", { name: "Integrative" });
  const panel = page.getByRole("tabpanel");

  await expect(tablist.getByRole("tab")).toHaveCount(3);
  await expect(panel).toHaveCount(1);
  await expect(psychodynamic).toHaveAttribute("aria-selected", "true");
  await attachment.click();
  await expect(attachment).toHaveAttribute("aria-selected", "true");
  await expect(panel).toHaveAccessibleName("Attachment");
  await attachment.press("End");
  await expect(integrative).toBeFocused();
  await expect(integrative).toHaveAttribute("aria-selected", "true");
  await integrative.press("ArrowRight");
  await expect(psychodynamic).toBeFocused();
  await expect(panel).toHaveAccessibleName("Psychodynamic");
});

test.describe("enquiry form", () => {
  test("preserves conditional payload values and success focus", async ({ page }) => {
    let submittedMethod = "";
    let submittedPayload: Record<string, string> | undefined;

    await page.clock.setFixedTime("2026-01-15T04:00:00.000Z");
    await page.route("**/api/enquiry", async (route) => {
      submittedMethod = route.request().method();
      submittedPayload = route.request().postDataJSON() as Record<string, string>;
      await route.fulfill({ body: JSON.stringify({ ok: true }), contentType: "application/json", status: 200 });
    });
    await page.goto("/contact", { waitUntil: "networkidle" });

    const form = page.getByRole("form", { name: "Enquiry" });
    await form.getByLabel("Request a consult").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your message").fill("I would like an initial consult.");
    await form.getByLabel("Availability").fill("Weekday afternoons");
    await form.getByLabel("Timezone").selectOption("AEDT");
    await form.getByRole("button", { name: "Request the 15-minute consult" }).click();

    const success = page.getByRole("status");
    await expect(success).toBeVisible();
    await expect(success).toBeFocused();
    expect(submittedMethod).toBe("POST");
    expect(submittedPayload).toEqual({
      analyticsPageViewId: "",
      analyticsVisitId: "",
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
    await form.getByLabel("General enquiry").check();
    await form.getByLabel("Name").fill("Alex Person");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Your enquiry").fill("Hello");
    await form.getByRole("button", { name: "Send enquiry" }).click();

    const alert = form.getByRole("alert");
    await expect(alert).toContainText("joel@vivecounselling.com.au");
    await expect(alert).not.toContainText("RESEND_API_KEY");
    await expect(alert).not.toContainText("Technical detail");
  });
});

test("public routes do not overflow a compact viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "networkidle" });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
    ).toBe(true);
  }
});

test.describe("accessibility smoke", () => {
  for (const route of publicRoutes) {
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

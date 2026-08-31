import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test, type Page } from "playwright/test";
import type {
  NotFoundMetadata,
  RouteMetadata,
  SiteMetadata,
} from "../src/data/routeMetadata";

const routeMetadataData = JSON.parse(
  readFileSync(new URL("../src/data/routeMetadata.json", import.meta.url), "utf8"),
) as {
  notFound: NotFoundMetadata;
  site: SiteMetadata;
  routes: Record<string, RouteMetadata>;
};

const publicRoutes = Object.keys(routeMetadataData.routes);
const notFoundPath = "/not-a-real-page";
const publicAndNotFoundRoutes = [...publicRoutes, notFoundPath];
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
const siteOrigin = (process.env.SITE_URL ?? routeMetadataData.site.defaultOrigin).replace(/\/$/, "");

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type PageDiagnostics = {
  consoleErrors: string[];
  failedRequests: string[];
  failedResponses: string[];
};

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
  await expect(page).toHaveTitle(routeMetadataData.notFound.title);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    routeMetadataData.notFound.heading,
  );
  await expect(
    page.getByText("Requested address", { exact: true }).locator("..").locator("code"),
  ).toHaveText(requestedPath);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    routeMetadataData.notFound.robots,
  );
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
  const nationalContactHrefs = [
    "tel:131114",
    "sms:0477131114",
    "tel:1300659467",
    "tel:139276",
  ] as const;
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
  await expect(main.locator('.crisis-support-page__state-service a[href^="tel:"]')).toHaveCount(9);
  for (const href of nationalContactHrefs) {
    await expect(main.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
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
    await page.goto(notFoundPath, { waitUntil: "networkidle" });
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expectNotFoundPage(page, notFoundPath);

    await page.goto("/404.html", { waitUntil: "networkidle" });
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expect(page.locator("#root")).not.toHaveAttribute("data-render-mode", /.+/);
    await expectNotFoundPage(page, "/404.html");
  });

  test("clears not-found metadata when returning to a public page", async ({ page }) => {
    await page.goto("/404.html", { waitUntil: "networkidle" });
    await expectNotFoundPage(page, "/404.html");
    await page.getByRole("link", { name: "Go to homepage" }).click();

    const homeMetadata = routeMetadataData.routes["/"];

    await expect(page).toHaveURL(/\/$/);
    await expect(page).toHaveTitle(homeMetadata.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      homeMetadata.description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
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

  test("Working with Joel exposes every counselling approach without JavaScript", async ({ page }) => {
    await page.goto("/working-with-joel", { waitUntil: "networkidle" });

    const approach = page.locator(".working-with-joel-page__approach");

    await expect(approach.getByRole("heading", { level: 3 })).toHaveText([
      "Psychodynamic",
      "Attachment",
      "Integrative",
    ]);
    await expect(approach.getByText("Psychodynamic work pays attention", { exact: false })).toBeVisible();
    await expect(approach.getByText("Attachment work looks at how you learned", { exact: false })).toBeVisible();
    await expect(approach.getByText("Integrative counselling recognises", { exact: false })).toBeVisible();
    await expect(approach.getByRole("tablist", { name: "Counselling approach" })).toHaveCount(0);
  });

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

test("public and not-found routes do not overflow a compact viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of publicAndNotFoundRoutes) {
    await page.goto(route, { waitUntil: "networkidle" });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
    ).toBe(true);
  }
});

test.describe("accessibility smoke", () => {
  for (const route of publicAndNotFoundRoutes) {
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

import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test, type Page } from "playwright/test";
import { getArticleRouteMetadata } from "../../../src/content/articles/manifest";
import type {
  NotFoundMetadata,
  RouteMetadata,
  SiteMetadata,
} from "../../../src/data/routeMetadata";

const routeMetadataData = JSON.parse(
  readFileSync(new URL("../../../src/data/routeMetadata.json", import.meta.url), "utf8"),
) as {
  notFound: NotFoundMetadata;
  site: SiteMetadata;
  routes: Record<string, RouteMetadata>;
};

const publicRouteMetadata: Record<string, RouteMetadata> = {
  ...routeMetadataData.routes,
  ...getArticleRouteMetadata(),
};
const publicRoutes = Object.keys(publicRouteMetadata);
const notFoundPath = "/not-a-real-page";
const unavailableProductionRoutes = ["/article-editor", "/design-language", "/design-system"] as const;

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

async function expectNoSeriousAxeViolations(page: Page) {
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
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBe(true);
}

async function expectNotFoundPage(page: Page, requestedPath: string) {
  await expect(page).toHaveTitle(routeMetadataData.notFound.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    routeMetadataData.notFound.description,
  );
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

test.describe("route health", () => {
  for (const route of publicRoutes) {
    test(`${route} renders, hydrates, and remains accessible`, async ({ page }) => {
      const diagnostics = collectPageDiagnostics(page);

      await page.goto(route);

      await expect(page).toHaveTitle(publicRouteMetadata[route].title);
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "hydrate");
      await expectNoSeriousAxeViolations(page);
      await page.setViewportSize({ width: 390, height: 844 });
      await expectNoHorizontalOverflow(page);
      expectNoPageDiagnostics(diagnostics);
    });
  }

  test("not-found renders accessibly without compact-viewport overflow", async ({ page }) => {
    await page.goto(notFoundPath);

    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expectNotFoundPage(page, notFoundPath);
    await expectNoSeriousAxeViolations(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await expectNoHorizontalOverflow(page);
  });
});

test.describe("rendering boundaries", () => {
  test("client-renders the generic fallback path", async ({ page }) => {
    await page.goto("/404.html");
    await expect(page.locator("#root")).toHaveAttribute("data-react-activation", "client-render");
    await expect(page.locator("#root")).not.toHaveAttribute("data-render-mode", /.+/);
    await expectNotFoundPage(page, "/404.html");
  });

  test("keeps not-found metadata aligned through recovery and browser history", async ({ page }) => {
    await page.goto("/404.html");
    await expectNotFoundPage(page, "/404.html");
    await page.getByRole("link", { name: "Go to homepage" }).click();

    const homeMetadata = publicRouteMetadata["/"];

    await expect(page).toHaveURL(/\/$/);
    await expect(page).toHaveTitle(homeMetadata.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      homeMetadata.description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);

    await page.goBack();
    await expectNotFoundPage(page, "/404.html");

    await page.goForward();
    await expect(page).toHaveTitle(homeMetadata.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      homeMetadata.description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  test("does not expose development routes in production", async ({ page }) => {
    for (const route of unavailableProductionRoutes) {
      await page.goto(route);
      await expectNotFoundPage(page, route);
      await expect(page.getByRole("link", { name: "Dev" })).toHaveCount(0);
    }
  });
});

test("serves the representative Fees alias redirect", async ({ page }) => {
  await page.goto("/fees");
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

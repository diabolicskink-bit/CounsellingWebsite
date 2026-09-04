import { expect, test } from "playwright/test";
import { articles } from "../../src/content/articles/articles";
import {
  getArticlePath,
  type ArticlePresentationKey,
} from "../../src/content/articles/manifest";

const noindexDirective = "noindex, nofollow";
const indexedArticles = articles.filter(
  (article) => article.slug !== "self-critical-perfectionism",
);
const customPresentationExpectations = {
  "self-critical-perfectionism": {
    bodySelector: ".perfectionism-article__equation",
    className: "article-page--self-critical-perfectionism",
  },
} satisfies Record<ArticlePresentationKey, { bodySelector: string; className: string }>;

test.describe("article publishing", () => {
  test("moves from the index into an article and back", async ({ page }) => {
    const firstArticle = indexedArticles[0];
    const firstArticlePath = getArticlePath(firstArticle.slug);

    await page.goto("/articles");
    await expect(page.locator(".article-index__list > li")).toHaveCount(indexedArticles.length);
    await expect(
      page.getByRole("link", {
        name: "Self-Critical Perfectionism: When Nothing Feels Good Enough",
      }),
    ).toHaveCount(0);
    await page.getByRole("link", { name: firstArticle.title }).click();

    await expect(page).toHaveURL(new RegExp(`${firstArticlePath}$`));
    await expect(page.getByRole("heading", { level: 1, name: firstArticle.title })).toBeVisible();
    if (firstArticle.isSample) {
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
    } else {
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    }
    await page.getByRole("link", { name: "All articles" }).click();

    await expect(page).toHaveURL(/\/articles$/);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  for (const article of articles) {
    test(`${article.slug} uses its intended article presentation`, async ({ page }) => {
      await page.goto(getArticlePath(article.slug));

      const articleDocument = page.locator("main.article-page .article-page__document");
      const presentationKey = article.presentation;

      await expect(page).toHaveTitle(
        article.metaTitle ?? `${article.title} | Vive Counselling`,
      );
      await expect(articleDocument.locator(".article-page__prose")).toBeVisible();
      await expect(articleDocument.locator(".article-page__prose .site-reading")).toHaveCount(0);
      await expect(page.getByRole("link", { name: "All articles" })).toHaveAttribute("href", "/articles");
      const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });

      await expect(breadcrumb.getByRole("link", { name: "Articles" }))
        .toHaveAttribute("href", "/articles");
      await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(article.topic);
      await expect(page.getByRole("link", { name: article.author, exact: true }))
        .toHaveAttribute("href", "/working-with-joel");
      if (article.isSample) {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
      } else {
        await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      }

      if (presentationKey) {
        const expectedPresentation = customPresentationExpectations[presentationKey];

        await expect(articleDocument).toHaveClass(new RegExp(expectedPresentation.className));
        await expect(articleDocument.locator(expectedPresentation.bodySelector)).toBeVisible();
      } else {
        await expect(articleDocument).toHaveClass("article-page__document");
        await expect(articleDocument.locator(".article-page__prose--standard")).toBeVisible();
      }

      if (article.references.length > 0) {
        const referenceLedger = articleDocument.locator(".article-page__references");
        const anchoredReferences = article.references.filter((reference) => reference.anchorId);

        await expect(referenceLedger.getByRole("heading", { level: 2, name: "References" }))
          .toBeVisible();
        await expect(referenceLedger.locator("li")).toHaveCount(article.references.length);
        await expect(referenceLedger.locator(".article-page__reference-link"))
          .toHaveCount(article.references.length);
        await expect(referenceLedger.locator(".article-page__reference-count"))
          .toHaveText(
            `${article.references.length} ${article.references.length === 1 ? "source" : "sources"}`,
          );
        await expect(referenceLedger.locator("li[id^='article-reference-']"))
          .toHaveCount(anchoredReferences.length);
      }
    });
  }

  test("links kink article citations to their reference entries", async ({ page }) => {
    await page.goto("/articles/kink-aware-therapy");

    const citationLinks = page.locator(
      ".article-page__prose a[href^='#article-reference-']",
    );
    const targets = await citationLinks.evaluateAll((links) => (
      [...new Set(links.flatMap((link) => {
        const href = link.getAttribute("href");
        return href ? [href] : [];
      }))]
    ));

    expect(targets.length).toBeGreaterThan(0);
    for (const target of targets) {
      await expect(page.locator(target)).toHaveCount(1);
    }

    const firstCitation = citationLinks.first();
    const firstTarget = await firstCitation.getAttribute("href");
    expect(firstTarget).not.toBeNull();
    if (!firstTarget) {
      throw new Error("Expected the first citation to have a reference target.");
    }
    await firstCitation.click();

    await expect(page).toHaveURL(new RegExp(`${firstTarget}$`));
    await expect(page.locator(firstTarget)).toBeFocused();
    await expect(page.locator(firstTarget)).toBeInViewport();
  });

  test("uses the ordinary not-found boundary for an unpublished slug", async ({ page }) => {
    await page.goto("/articles/not-published");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("That page isn't here.");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
    await expect(page.locator("main.not-found-page")).toBeVisible();
  });
});

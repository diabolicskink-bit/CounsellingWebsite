import { expect, test } from "playwright/test";
import { articles } from "../../src/content/articles/articles";
import {
  getArticlePath,
  type ArticlePresentationKey,
} from "../../src/content/articles/manifest";

const noindexDirective = "noindex, nofollow";
const customPresentationExpectations = {
  "ant-trail": {
    bodySelector: ".ant-article__model",
    className: "article-page--ant-trail",
  },
  "fossil-record": {
    bodySelector: ".fossil-article__evidence-key",
    className: "article-page--fossil-record",
  },
} satisfies Record<ArticlePresentationKey, { bodySelector: string; className: string }>;

test.describe("article publishing", () => {
  test("moves from the index into an article and back", async ({ page }) => {
    const firstArticle = articles[0];
    const firstArticlePath = getArticlePath(firstArticle.slug);

    await page.goto("/articles");
    await expect(page.locator(".article-index__list > li")).toHaveCount(articles.length);
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

      await expect(articleDocument.locator(".article-page__prose")).toBeVisible();
      await expect(articleDocument.locator(".article-page__prose .site-reading")).toHaveCount(0);
      await expect(page.getByRole("link", { name: "All articles" })).toHaveAttribute("href", "/articles");
      const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });

      await expect(breadcrumb.getByRole("link", { name: "Articles" }))
        .toHaveAttribute("href", "/articles");
      await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(article.topic);
      if (article.isSample) {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
      } else {
        await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      }

      if (presentationKey) {
        const expectedPresentation = customPresentationExpectations[presentationKey];

        await expect(articleDocument).toHaveClass(new RegExp(expectedPresentation.className));
        await expect(articleDocument.locator(expectedPresentation.bodySelector))
          .toBeVisible();
      } else {
        await expect(articleDocument).toHaveClass("article-page__document");
        await expect(articleDocument.locator(".article-page__prose--standard")).toBeVisible();
      }

      if (article.references.length > 0) {
        const referenceLedger = articleDocument.locator(".article-page__references");

        await expect(referenceLedger.getByRole("heading", { level: 2, name: "References" }))
          .toBeVisible();
        await expect(referenceLedger.locator("li")).toHaveCount(article.references.length);
        await expect(referenceLedger.locator(".article-page__reference-link"))
          .toHaveCount(article.references.length);
        await expect(referenceLedger.locator(".article-page__reference-count"))
          .toHaveText(
            `${article.references.length} ${article.references.length === 1 ? "source" : "sources"}`,
          );
      }
    });
  }

  test("uses the ordinary not-found boundary for an unpublished slug", async ({ page }) => {
    await page.goto("/articles/not-published");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("That page isn't here.");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
    await expect(page.locator("main.not-found-page")).toBeVisible();
  });
});

import { expect, test } from "playwright/test";
import { blogPosts } from "../../src/content/blog/posts";
import { getBlogPostPath } from "../../src/content/blog/manifest";
import {
  blogArticlePresentationDefinitions,
  getBlogArticlePresentationDefinition,
  type BlogArticlePresentationKey,
} from "../../src/content/blog/presentationDefinitions";

const noindexDirective = "noindex, nofollow";
const customPresentationBodySelectors = {
  [blogArticlePresentationDefinitions.antTrail.key]: ".ant-article__model",
  [blogArticlePresentationDefinitions.fossilRecord.key]: ".fossil-article__evidence-key",
} satisfies Record<BlogArticlePresentationKey, string>;

test.describe("article publishing", () => {
  test("moves from the index into an article and back", async ({ page }) => {
    const firstPost = blogPosts[0];
    const firstPostPath = getBlogPostPath(firstPost.slug);

    await page.goto("/blog");
    await expect(page.locator(".blog-index__list > li")).toHaveCount(blogPosts.length);
    await page.getByRole("link", { name: firstPost.title }).click();

    await expect(page).toHaveURL(new RegExp(`${firstPostPath}$`));
    await expect(page.getByRole("heading", { level: 1, name: firstPost.title })).toBeVisible();
    if (firstPost.isSample) {
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
    } else {
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    }
    await page.getByRole("link", { name: "All articles" }).click();

    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  for (const post of blogPosts) {
    test(`${post.slug} uses its intended article presentation`, async ({ page }) => {
      await page.goto(getBlogPostPath(post.slug));

      const articleDocument = page.locator("main.blog-article .blog-article__document");
      const presentation = getBlogArticlePresentationDefinition(post.presentation);

      await expect(articleDocument.locator(".blog-article__prose")).toBeVisible();
      await expect(articleDocument.locator(".blog-article__prose .site-reading")).toHaveCount(0);
      await expect(page.getByRole("link", { name: "All articles" })).toHaveAttribute("href", "/blog");
      if (post.isSample) {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
      } else {
        await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      }

      if (presentation) {
        await expect(articleDocument).toHaveClass(new RegExp(presentation.documentClassName));
        await expect(articleDocument.locator(customPresentationBodySelectors[presentation.key]))
          .toBeVisible();
      } else {
        await expect(articleDocument).toHaveClass("blog-article__document");
        await expect(articleDocument.locator(".blog-article__prose--sectioned")).toBeVisible();
      }

      if (post.references.length > 0) {
        const referenceLedger = articleDocument.locator(".blog-article__references");
        const linkedReferenceCount = post.references.filter((reference) => reference.href).length;

        await expect(referenceLedger.getByRole("heading", { level: 2, name: "References" }))
          .toBeVisible();
        await expect(referenceLedger.locator("li")).toHaveCount(post.references.length);
        await expect(referenceLedger.locator(".blog-article__reference-link"))
          .toHaveCount(linkedReferenceCount);
        await expect(referenceLedger.locator(".blog-article__reference-count"))
          .toHaveText(
            `${post.references.length} ${post.references.length === 1 ? "source" : "sources"}`,
          );
      }
    });
  }

  test("uses the ordinary not-found boundary for an unpublished slug", async ({ page }) => {
    await page.goto("/blog/not-published");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("That page isn't here.");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
    await expect(page.locator("main.not-found-page")).toBeVisible();
  });
});

import { expect, test } from "playwright/test";
import {
  blogPosts,
  getBlogPostPath,
} from "../../src/content/blog/posts";

const noindexDirective = "noindex, nofollow";

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
    test(`${post.slug} uses its registered article presentation`, async ({ page }) => {
      await page.goto(getBlogPostPath(post.slug));

      await expect(page.locator("main.blog-article .blog-article__prose")).toBeVisible();
      await expect(page.getByRole("link", { name: "All articles" })).toHaveAttribute("href", "/blog");
      if (post.isSample) {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexDirective);
      } else {
        await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      }

      if (post.presentation === "ant-trail") {
        await expect(page.locator(".blog-article--ant-trail .ant-article__model")).toBeVisible();
      }

      if (post.presentation === "fossil-record") {
        await expect(page.locator(".blog-article--fossil-record .fossil-article__evidence-key")).toBeVisible();
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

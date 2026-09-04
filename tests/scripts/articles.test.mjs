import assert from "node:assert/strict";
import { test } from "node:test";
import {
  articleMetadata,
  validateArticleManifest,
} from "../../src/content/articles/manifest.ts";
import { articles } from "../../src/content/articles/articles.ts";

const validArticle = {
  abstract: "A useful summary.",
  author: "Joel Griffiths",
  description: "A useful search description.",
  publishedAt: "2026-08-12",
  slug: "a-valid-article",
  title: "A valid article",
  topic: "Testing",
};

test("keeps every published manifest entry paired with a non-empty article body", () => {
  assert.deepEqual(
    articles.map((article) => article.slug),
    articleMetadata.map((article) => article.slug),
  );

  for (const article of articles) {
    assert.ok(article.body.trim(), article.slug);
    assert.ok(Array.isArray(article.references), article.slug);
    const anchorIds = new Set();

    for (const reference of article.references) {
      assert.ok(reference.citation.trim(), `${article.slug} has an empty reference`);
      assert.doesNotThrow(() => new URL(reference.href));

      if (reference.anchorId !== undefined) {
        assert.match(reference.anchorId, /^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
        assert.equal(
          anchorIds.has(reference.anchorId),
          false,
          `${article.slug} has a duplicate reference anchor`,
        );
        anchorIds.add(reference.anchorId);
      }
    }

    for (const match of article.body.matchAll(/\]\(#article-reference-([a-z0-9-]+)\)/gu)) {
      assert.equal(
        anchorIds.has(match[1]),
        true,
        `${article.slug} links to a missing reference anchor: ${match[1]}`,
      );
    }
  }
});

test("rejects publication dates that are not real ISO calendar dates", () => {
  assert.throws(
    () => validateArticleManifest([{ ...validArticle, publishedAt: "2026-02-30" }]),
    /invalid publication date/,
  );
});

test("rejects revisions dated before publication", () => {
  assert.throws(
    () => validateArticleManifest([{ ...validArticle, updatedAt: "2026-08-11" }]),
    /updated date precedes/,
  );
});

test("rejects duplicate slugs", () => {
  assert.throws(
    () => validateArticleManifest([validArticle, validArticle]),
    /Duplicate article slug/,
  );
});

test("rejects empty publication metadata", () => {
  assert.throws(
    () => validateArticleManifest([{ ...validArticle, title: " " }]),
    /empty title/,
  );
});

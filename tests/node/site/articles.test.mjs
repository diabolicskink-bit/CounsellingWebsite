import assert from "node:assert/strict";
import { test } from "node:test";
import { articleMetadata } from "../../../src/content/articles/manifest.ts";
import { articles } from "../../../src/content/articles/articles.ts";

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

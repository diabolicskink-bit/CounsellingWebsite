import assert from "node:assert/strict";
import { test } from "node:test";
import {
  blogPostMetadata,
  validateBlogPostManifest,
} from "../../src/content/blog/manifest.ts";
import { blogPosts } from "../../src/content/blog/posts.ts";

const validPost = {
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
    blogPosts.map((post) => post.slug),
    blogPostMetadata.map((post) => post.slug),
  );

  for (const post of blogPosts) {
    assert.ok(post.body.trim(), post.slug);
    assert.ok(Array.isArray(post.references), post.slug);

    for (const reference of post.references) {
      assert.ok(reference.citation.trim(), `${post.slug} has an empty reference`);
      assert.doesNotThrow(() => new URL(reference.href));
    }
  }
});

test("rejects publication dates that are not real ISO calendar dates", () => {
  assert.throws(
    () => validateBlogPostManifest([{ ...validPost, publishedAt: "2026-02-30" }]),
    /invalid publication date/,
  );
});

test("rejects revisions dated before publication", () => {
  assert.throws(
    () => validateBlogPostManifest([{ ...validPost, updatedAt: "2026-08-11" }]),
    /updated date precedes/,
  );
});

test("rejects duplicate slugs", () => {
  assert.throws(
    () => validateBlogPostManifest([validPost, validPost]),
    /Duplicate blog post slug/,
  );
});

test("rejects empty publication metadata", () => {
  assert.throws(
    () => validateBlogPostManifest([{ ...validPost, title: " " }]),
    /empty title/,
  );
});

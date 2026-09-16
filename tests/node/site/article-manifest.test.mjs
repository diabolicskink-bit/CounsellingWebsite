import assert from "node:assert/strict";
import { test } from "node:test";
import { validateArticleManifest } from "../../../src/content/articles/manifest.ts";

const validArticle = {
  abstract: "A useful summary.",
  author: "Joel Griffiths",
  description: "A useful search description.",
  publishedAt: "2026-08-12",
  slug: "a-valid-article",
  title: "A valid article",
  topic: "Testing",
};

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

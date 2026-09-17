import assert from "node:assert/strict";
import { test } from "node:test";
import { articles } from "../../../src/content/articles/articles.ts";
import {
  parseArticleMarkdown,
  serializeArticleMarkdown,
  toggleMarkdownBold,
} from "../../../src/pages/dev/article-editor/articleEditorMarkdown.ts";

test("round-trips every current article body through the block editor", () => {
  for (const article of articles) {
    assert.equal(
      serializeArticleMarkdown(parseArticleMarkdown(article.body)),
      article.body,
      article.slug,
    );
  }
});

test("adds and removes Markdown bold around selected text", () => {
  assert.deepEqual(toggleMarkdownBold("Make this clear", 5, 9), {
    selectionEnd: 11,
    selectionStart: 7,
    value: "Make **this** clear",
  });
  assert.deepEqual(toggleMarkdownBold("Make **this** clear", 7, 11), {
    selectionEnd: 9,
    selectionStart: 5,
    value: "Make this clear",
  });
  assert.deepEqual(toggleMarkdownBold("Make **this** clear", 5, 13), {
    selectionEnd: 9,
    selectionStart: 5,
    value: "Make this clear",
  });
});

test("inserts Markdown bold markers at an empty selection", () => {
  assert.deepEqual(toggleMarkdownBold("Make clear", 5, 5), {
    selectionEnd: 7,
    selectionStart: 7,
    value: "Make ****clear",
  });
});

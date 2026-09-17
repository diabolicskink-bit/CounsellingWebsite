import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
  renderArticleTemplateSource,
  updateArticleTemplateContent,
} from "../../../scripts/dev/articleEditorPlugin.ts";
import { articles } from "../../../src/content/articles/articles.ts";

async function importRenderedTemplate(source) {
  const executableSource = source.replace(
    /^import .+;$/mu,
    "const defineArticleTemplate = (template) => template;",
  );
  const encodedSource = Buffer.from(executableSource).toString("base64");

  return import(`data:text/javascript;base64,${encodedSource}`);
}

const articleContent = {
  body: "A backslash: \\\n\nA template marker: ${value}\n\nA backtick: `",
  references: [
    {
      anchorId: "author-2024",
      citation: "Author, A. (2024). A `source` with ${Markdown} and a backslash \\.",
      href: "https://doi.org/10.1000/example",
    },
  ],
};

test("rejects empty article and reference fields", () => {
  const slug = articles[0].slug;

  assert.throws(
    () => renderArticleTemplateSource(slug, { body: " ", references: [] }),
    /body cannot be empty/u,
  );
  assert.throws(
    () => renderArticleTemplateSource(slug, {
      body: "Body.",
      references: [{ citation: "", href: "https://example.com" }],
    }),
    /must contain a citation and source URL/u,
  );
  assert.throws(
    () => renderArticleTemplateSource(slug, {
      body: "Body.",
      references: [{
        anchorId: "Invalid anchor",
        citation: "Author, A. (2024). Source.",
        href: "https://example.com",
      }],
    }),
    /invalid anchor ID/u,
  );
});

test("writes only an allowlisted article template", async (context) => {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "vive-article-editor-"));
  context.after(() => rm(temporaryRoot, { force: true, recursive: true }));

  const templatesRoot = path.join(
    temporaryRoot,
    "src",
    "content",
    "articles",
    "articleTemplates",
  );
  await mkdir(templatesRoot, { recursive: true });

  const slug = articles[0].slug;
  const templatePath = await updateArticleTemplateContent(
    temporaryRoot,
    slug,
    articleContent,
  );
  const articleModule = await importRenderedTemplate(await readFile(templatePath, "utf8"));

  assert.deepEqual(articleModule.default, { slug, ...articleContent });
  await assert.rejects(
    updateArticleTemplateContent(temporaryRoot, "../outside", articleContent),
    /Invalid article slug/u,
  );
});

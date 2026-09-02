import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
  renderArticleTemplateSource,
  updateArticleTemplateContent,
} from "../../scripts/articleEditorPlugin.ts";
import { articles } from "../../src/content/articles/articles.ts";
import {
  parseArticleMarkdown,
  serializeArticleMarkdown,
} from "../../src/pages/dev/articleEditorMarkdown.ts";

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
      citation: "Author, A. (2024). A `source` with ${Markdown} and a backslash \\.",
      href: "https://doi.org/10.1000/example",
    },
  ],
};

test("round-trips every current article body through the block editor", () => {
  for (const article of articles) {
    assert.equal(
      serializeArticleMarkdown(parseArticleMarkdown(article.body)),
      article.body,
      article.slug,
    );
  }
});

test("renders body and reference content as a readable template module", async () => {
  const slug = articles[0].slug;
  const source = renderArticleTemplateSource(slug, articleContent);
  const articleModule = await importRenderedTemplate(source);

  assert.deepEqual(articleModule.default, { slug, ...articleContent });
  assert.match(source, /body: `A backslash:/u);
  assert.match(source, /references: \[/u);
});

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

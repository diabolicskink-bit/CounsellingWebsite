import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import {
  readArticleTemplateContent,
  replaceArticleTemplateBody,
  replaceArticleTemplateContent,
  replaceArticleTemplateReferences,
  updateArticleTemplateBody,
  updateArticleTemplateContent,
} from "../../scripts/articleEditorPlugin.ts";
import { blogPosts } from "../../src/content/blog/posts.ts";
import {
  parseArticleMarkdown,
  serializeArticleMarkdown,
} from "../../src/pages/dev/articleEditorMarkdown.ts";

function createTemplateSource({
  body = "Old body.",
  references = `[
    {
      citation: \`Alpha, A. (2024). A useful source. *Journal, 1*(1), 1-2.\`,
      href: "https://doi.org/10.1000/alpha",
    },
  ]`,
} = {}) {
  return `import { defineBlogPostTemplate } from "../postTemplate";

export default defineBlogPostTemplate({
  slug: "safe-article",
  body: \`${body}\`,
  references: ${references},
});
`;
}

test("round-trips every current article body without changing its Markdown", () => {
  for (const post of blogPosts) {
    assert.equal(serializeArticleMarkdown(parseArticleMarkdown(post.body)), post.body, post.slug);
  }
});

test("body-only replacement preserves reference source bytes and escaped editor input", () => {
  const source = createTemplateSource();
  const referencesSource = source.slice(source.indexOf("  references:"));
  const body = "A backslash: \\\n\nA template marker: ${value}\n\nA backtick: `";
  const updatedSource = replaceArticleTemplateBody(source, body);

  assert.equal(readArticleTemplateContent(updatedSource).body, body);
  assert.equal(updatedSource.slice(updatedSource.indexOf("  references:")), referencesSource);
});

test("reference-only replacement preserves body source bytes", () => {
  const source = createTemplateSource({ body: "A body with \\`escaped\\` source." });
  const bodySource = source.slice(source.indexOf("  body:"), source.indexOf("  references:"));
  const references = [
    {
      citation: "Beta, B. (2023). Another useful source. *Journal, 2*(1), 3-4.",
      href: "https://doi.org/10.1000/beta",
    },
  ];
  const updatedSource = replaceArticleTemplateReferences(source, references);

  assert.equal(
    updatedSource.slice(updatedSource.indexOf("  body:"), updatedSource.indexOf("  references:")),
    bodySource,
  );
  assert.deepEqual(readArticleTemplateContent(updatedSource).references, references);
});

test("combined replacement changes body and references together", () => {
  const references = [
    {
      citation: "Gamma, G. (2022). Combined update. *Journal, 3*(2), 5-6.",
      href: "https://doi.org/10.1000/gamma",
    },
  ];
  const updatedSource = replaceArticleTemplateContent(createTemplateSource(), {
    body: "Combined body.",
    references,
  });

  assert.deepEqual(readArticleTemplateContent(updatedSource), {
    body: "Combined body.",
    references,
  });
});

test("adds a missing references property without rewriting other fields", () => {
  const source = `export default defineBlogPostTemplate({
  slug: "safe-article",
  body: \`Keep this body.\`,
});
`;
  const references = [
    {
      citation: "Delta, D. (2021). Added later. *Journal, 4*(2), 7-8.",
      href: "https://doi.org/10.1000/delta",
    },
  ];
  const updatedSource = replaceArticleTemplateReferences(source, references);

  assert.equal(readArticleTemplateContent(updatedSource).body, "Keep this body.");
  assert.deepEqual(readArticleTemplateContent(updatedSource).references, references);
  assert.match(updatedSource, /body: `Keep this body\.`,\n  references:/u);
});

test("writes allowlisted article fields without touching other templates", async (context) => {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "vive-article-editor-"));
  context.after(() => rm(temporaryRoot, { force: true, recursive: true }));

  const templatesRoot = path.join(temporaryRoot, "src", "content", "blog", "postTemplates");
  const templatePath = path.join(templatesRoot, "safe-article.ts");
  await mkdir(templatesRoot, { recursive: true });
  await writeFile(templatePath, createTemplateSource(), "utf8");

  const references = [
    {
      citation: "Epsilon, E. (2020). Saved reference. *Journal, 5*(1), 9-10.",
      href: "https://doi.org/10.1000/epsilon",
    },
  ];
  const saved = await updateArticleTemplateContent(temporaryRoot, "safe-article", {
    body: "New body.",
    references,
  });

  assert.deepEqual(
    readArticleTemplateContent(await readFile(templatePath, "utf8")),
    { body: "New body.", references },
  );
  assert.equal(saved.templatePath, templatePath);

  await updateArticleTemplateBody(temporaryRoot, "safe-article", "A second body.");
  assert.equal(
    readArticleTemplateContent(await readFile(templatePath, "utf8")).body,
    "A second body.",
  );

  await assert.rejects(
    updateArticleTemplateContent(temporaryRoot, "../outside", { body: "Unsafe body." }),
    /Invalid article slug/u,
  );
});

test("rejects empty content and incompatible template or reference source", () => {
  assert.throws(
    () => replaceArticleTemplateBody("export default {};", "Content"),
    /Could not find the article template definition/u,
  );
  assert.throws(
    () => replaceArticleTemplateBody(createTemplateSource(), "  "),
    /cannot be empty/u,
  );
  assert.throws(
    () => readArticleTemplateContent(createTemplateSource({ references: "notAnArray" })),
    /references field must be an array/u,
  );
  assert.throws(
    () => replaceArticleTemplateContent(createTemplateSource(), {}),
    /No article changes/u,
  );
});

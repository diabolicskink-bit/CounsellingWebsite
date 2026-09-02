import { writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import type { Plugin } from "vite";
import { articleMetadata, type ArticleSlug } from "../src/content/articles/manifest.ts";
import type { ArticleReference } from "../src/content/articles/articleTemplate.ts";

const articleEditorApiPrefix = "/__dev/article-editor/";
const maximumRequestBytes = 256 * 1024;
const publishedArticleSlugs = new Set<string>(articleMetadata.map((article) => article.slug));

class ArticleEditorInputError extends Error {}

type ArticleTemplateContent = Readonly<{
  body: string;
  references: readonly ArticleReference[];
}>;

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Readonly<Record<string, unknown>>,
) {
  response.statusCode = statusCode;
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

function resolveTemplatePath(projectRoot: string, slug: ArticleSlug) {
  return path.join(projectRoot, "src", "content", "articles", "articleTemplates", `${slug}.ts`);
}

function isPublishedArticleSlug(slug: string): slug is ArticleSlug {
  return publishedArticleSlugs.has(slug);
}

function escapeTemplateLiteral(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function validateArticleContent(content: ArticleTemplateContent) {
  if (!content.body.trim()) {
    throw new ArticleEditorInputError("Article body cannot be empty.");
  }

  content.references.forEach((reference, index) => {
    if (!reference.citation.trim() || !reference.href.trim()) {
      throw new ArticleEditorInputError(
        `Reference ${index + 1} must contain a citation and source URL.`,
      );
    }
  });
}

function renderReferences(references: readonly ArticleReference[]) {
  if (references.length === 0) {
    return "[]";
  }

  return [
    "[",
    ...references.map((reference) => [
      "    {",
      `      citation: \`${escapeTemplateLiteral(reference.citation)}\`,`,
      `      href: ${JSON.stringify(reference.href)},`,
      "    },",
    ].join("\n")),
    "  ]",
  ].join("\n");
}

export function renderArticleTemplateSource(
  slug: ArticleSlug,
  content: ArticleTemplateContent,
) {
  validateArticleContent(content);

  return `import { defineArticleTemplate } from "../articleTemplate.ts";

export default defineArticleTemplate({
  slug: ${JSON.stringify(slug)},
  body: \`${escapeTemplateLiteral(content.body)}\`,
  references: ${renderReferences(content.references)},
});
`;
}

export async function updateArticleTemplateContent(
  projectRoot: string,
  slug: string,
  content: ArticleTemplateContent,
) {
  if (!isPublishedArticleSlug(slug)) {
    throw new ArticleEditorInputError("Invalid article slug.");
  }

  const templatePath = resolveTemplatePath(projectRoot, slug);
  const source = renderArticleTemplateSource(slug, content);

  await writeFile(templatePath, source, "utf8");
  return templatePath;
}

async function readJsonBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  let byteLength = 0;

  for await (const chunk of request) {
    const buffer = Buffer.from(chunk);
    byteLength += buffer.byteLength;

    if (byteLength > maximumRequestBytes) {
      throw new ArticleEditorInputError("Request body is too large.");
    }

    chunks.push(buffer);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    throw new ArticleEditorInputError("Request body must be valid JSON.");
  }
}

function parseArticleContent(payload: unknown): ArticleTemplateContent {
  if (
    !payload
    || typeof payload !== "object"
    || Array.isArray(payload)
    || typeof (payload as { body?: unknown }).body !== "string"
    || !Array.isArray((payload as { references?: unknown }).references)
  ) {
    throw new ArticleEditorInputError(
      "Request body must contain an article body and references array.",
    );
  }

  const { body, references: unparsedReferences } = payload as {
    body: string;
    references: unknown[];
  };
  const references = unparsedReferences.map(
    (reference, index): ArticleReference => {
      if (
        !reference
        || typeof reference !== "object"
        || Array.isArray(reference)
        || typeof (reference as { citation?: unknown }).citation !== "string"
        || typeof (reference as { href?: unknown }).href !== "string"
      ) {
        throw new ArticleEditorInputError(
          `Reference ${index + 1} must contain citation and href strings.`,
        );
      }

      return {
        citation: (reference as { citation: string }).citation,
        href: (reference as { href: string }).href,
      };
    },
  );
  return { body, references };
}

function isLocalRequest(request: IncomingMessage) {
  const host = request.headers.host;

  if (!host) {
    return false;
  }

  try {
    const hostname = new URL(`http://${host}`).hostname;
    return hostname === "127.0.0.1" || hostname === "localhost" || hostname === "[::1]";
  } catch {
    return false;
  }
}

export function articleEditorPlugin(): Plugin {
  return {
    name: "vive-article-editor",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestUrl = new URL(request.url ?? "/", "http://article-editor.local");

        if (!requestUrl.pathname.startsWith(articleEditorApiPrefix)) {
          next();
          return;
        }

        if (!isLocalRequest(request)) {
          sendJson(response, 403, { error: "The article editor is available only on localhost." });
          return;
        }

        if (request.method !== "PUT") {
          response.setHeader("Allow", "PUT");
          sendJson(response, 405, { error: "Method not allowed." });
          return;
        }

        if (!request.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
          sendJson(response, 415, { error: "Content-Type must be application/json." });
          return;
        }

        try {
          let slug: string;

          try {
            slug = decodeURIComponent(requestUrl.pathname.slice(articleEditorApiPrefix.length));
          } catch {
            throw new ArticleEditorInputError("Invalid article slug.");
          }

          await updateArticleTemplateContent(
            server.config.root,
            slug,
            parseArticleContent(await readJsonBody(request)),
          );
          sendJson(response, 200, { saved: true, slug });
        } catch (error) {
          if (error instanceof ArticleEditorInputError) {
            sendJson(response, 400, { error: error.message });
            return;
          }

          server.config.logger.error(
            error instanceof Error ? error.stack ?? error.message : String(error),
          );
          sendJson(response, 500, { error: "The article template could not be saved." });
        }
      });
    },
  };
}

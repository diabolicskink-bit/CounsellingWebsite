import { readFile, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import ts from "typescript";
import type { Plugin } from "vite";
import type { BlogPostReference } from "../src/content/blog/postTemplate.ts";
import { assertValidBlogReferences } from "../src/content/blog/referenceValidation.ts";

const articleEditorApiPrefix = "/__dev/article-editor/";
const articleSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maximumRequestBytes = 256 * 1024;
const maximumReferenceCount = 100;

class ArticleEditorInputError extends Error {}

type ArticleTemplateUpdate = Readonly<{
  body?: string;
  references?: readonly BlogPostReference[];
}>;

type ParsedArticleTemplate = Readonly<{
  bodyProperty: ts.PropertyAssignment;
  referencesProperty: ts.PropertyAssignment | null;
  sourceFile: ts.SourceFile;
  templateObject: ts.ObjectLiteralExpression;
}>;

type SourceEdit = Readonly<{
  end: number;
  start: number;
  text: string;
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

function resolveTemplatePath(projectRoot: string, slug: string) {
  if (!articleSlugPattern.test(slug)) {
    throw new ArticleEditorInputError("Invalid article slug.");
  }

  const templatesRoot = path.resolve(projectRoot, "src/content/blog/postTemplates");
  const templatePath = path.resolve(templatesRoot, `${slug}.ts`);

  if (path.dirname(templatePath) !== templatesRoot) {
    throw new ArticleEditorInputError("Invalid article template path.");
  }

  return templatePath;
}

function getPropertyName(property: ts.ObjectLiteralElementLike) {
  if (!property.name) {
    return null;
  }

  return ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
    ? property.name.text
    : null;
}

function findProperty(
  objectLiteral: ts.ObjectLiteralExpression,
  name: string,
) {
  const property = objectLiteral.properties.find(
    (candidate) => getPropertyName(candidate) === name,
  );

  if (!property) {
    return null;
  }

  if (!ts.isPropertyAssignment(property)) {
    throw new ArticleEditorInputError(`The article ${name} field is not editable.`);
  }

  return property;
}

function parseArticleTemplate(source: string): ParsedArticleTemplate {
  const sourceFile = ts.createSourceFile(
    "article-template.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  let templateObject: ts.ObjectLiteralExpression | null = null;

  const visit = (node: ts.Node) => {
    if (
      !templateObject
      && ts.isCallExpression(node)
      && ts.isIdentifier(node.expression)
      && node.expression.text === "defineBlogPostTemplate"
      && node.arguments.length === 1
      && ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      templateObject = node.arguments[0];
      return;
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (!templateObject) {
    throw new ArticleEditorInputError("Could not find the article template definition.");
  }

  const bodyProperty = findProperty(templateObject, "body");

  if (!bodyProperty) {
    throw new ArticleEditorInputError("Could not find the article body field.");
  }

  return {
    bodyProperty,
    referencesProperty: findProperty(templateObject, "references"),
    sourceFile,
    templateObject,
  };
}

function readStaticString(expression: ts.Expression, fieldName: string) {
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
    return expression.text;
  }

  throw new ArticleEditorInputError(`The article ${fieldName} must be a static string.`);
}

function readReferences(property: ts.PropertyAssignment | null) {
  if (!property) {
    return [];
  }

  if (!ts.isArrayLiteralExpression(property.initializer)) {
    throw new ArticleEditorInputError("The article references field must be an array.");
  }

  return property.initializer.elements.map((element, index): BlogPostReference => {
    if (!ts.isObjectLiteralExpression(element)) {
      throw new ArticleEditorInputError(`Reference ${index + 1} must be an object.`);
    }

    const citationProperty = findProperty(element, "citation");
    const hrefProperty = findProperty(element, "href");

    if (!citationProperty || !hrefProperty) {
      throw new ArticleEditorInputError(
        `Reference ${index + 1} must contain citation and href fields.`,
      );
    }

    return {
      citation: readStaticString(citationProperty.initializer, "reference citation"),
      href: readStaticString(hrefProperty.initializer, "reference href"),
    };
  });
}

export function readArticleTemplateContent(source: string) {
  const parsedTemplate = parseArticleTemplate(source);

  return {
    body: readStaticString(parsedTemplate.bodyProperty.initializer, "body"),
    references: readReferences(parsedTemplate.referencesProperty),
  };
}

function validateBody(body: string) {
  if (!body.trim()) {
    throw new ArticleEditorInputError("Article body cannot be empty.");
  }

  if (Buffer.byteLength(body, "utf8") > maximumRequestBytes) {
    throw new ArticleEditorInputError("Article body is too large.");
  }
}

function validateReferenceShape(references: readonly BlogPostReference[]) {
  if (references.length > maximumReferenceCount) {
    throw new ArticleEditorInputError(
      `An article cannot contain more than ${maximumReferenceCount} references.`,
    );
  }

  references.forEach((reference, index) => {
    if (
      !reference
      || typeof reference !== "object"
      || typeof reference.citation !== "string"
      || typeof reference.href !== "string"
    ) {
      throw new ArticleEditorInputError(
        `Reference ${index + 1} must contain citation and href strings.`,
      );
    }
  });
}

function escapeTemplateLiteral(value: string, lineEnding: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${")
    .replace(/\n/g, lineEnding);
}

function renderTemplateLiteral(value: string, lineEnding: string) {
  return `\`${escapeTemplateLiteral(value, lineEnding)}\``;
}

function renderReferences(
  references: readonly BlogPostReference[],
  lineEnding: string,
) {
  if (references.length === 0) {
    return "[]";
  }

  const renderedReferences = references.map((reference) => [
    "    {",
    `      citation: ${renderTemplateLiteral(reference.citation, lineEnding)},`,
    `      href: ${JSON.stringify(reference.href)},`,
    "    },",
  ].join(lineEnding));

  return ["[", ...renderedReferences, "  ]"].join(lineEnding);
}

function applySourceEdits(source: string, edits: readonly SourceEdit[]) {
  return [...edits]
    .sort((left, right) => right.start - left.start)
    .reduce(
      (updatedSource, edit) => `${updatedSource.slice(0, edit.start)}${edit.text}${updatedSource.slice(edit.end)}`,
      source,
    );
}

export function replaceArticleTemplateContent(
  source: string,
  update: ArticleTemplateUpdate,
) {
  const hasBody = update.body !== undefined;
  const hasReferences = update.references !== undefined;

  if (!hasBody && !hasReferences) {
    throw new ArticleEditorInputError("No article changes were provided.");
  }

  if (update.body !== undefined) {
    validateBody(update.body);
  }

  if (update.references !== undefined) {
    validateReferenceShape(update.references);
  }

  const parsedTemplate = parseArticleTemplate(source);
  const lineEnding = source.includes("\r\n") ? "\r\n" : "\n";
  const edits: SourceEdit[] = [];

  if (update.body !== undefined) {
    edits.push({
      end: parsedTemplate.bodyProperty.initializer.getEnd(),
      start: parsedTemplate.bodyProperty.initializer.getStart(parsedTemplate.sourceFile),
      text: renderTemplateLiteral(update.body, lineEnding),
    });
  }

  if (update.references !== undefined) {
    const renderedReferences = renderReferences(update.references, lineEnding);

    if (parsedTemplate.referencesProperty) {
      edits.push({
        end: parsedTemplate.referencesProperty.initializer.getEnd(),
        start: parsedTemplate.referencesProperty.initializer.getStart(parsedTemplate.sourceFile),
        text: renderedReferences,
      });
    } else {
      const closeBraceStart = parsedTemplate.templateObject.getEnd() - 1;
      const lastProperty = parsedTemplate.templateObject.properties.at(-1);

      if (!lastProperty) {
        throw new ArticleEditorInputError("The article template has no editable fields.");
      }

      const lastPropertyEnd = lastProperty.getEnd();
      const betweenPropertyAndClose = source.slice(lastPropertyEnd, closeBraceStart);
      const separator = betweenPropertyAndClose.includes(",")
        ? betweenPropertyAndClose
        : `,${betweenPropertyAndClose}`;

      edits.push({
        end: closeBraceStart,
        start: lastPropertyEnd,
        text: `${separator}  references: ${renderedReferences},${lineEnding}`,
      });
    }
  }

  return applySourceEdits(source, edits);
}

export function replaceArticleTemplateBody(source: string, body: string) {
  return replaceArticleTemplateContent(source, { body });
}

export function replaceArticleTemplateReferences(
  source: string,
  references: readonly BlogPostReference[],
) {
  return replaceArticleTemplateContent(source, { references });
}

export async function updateArticleTemplateBody(
  projectRoot: string,
  slug: string,
  body: string,
) {
  const templatePath = resolveTemplatePath(projectRoot, slug);
  const source = await readFile(templatePath, "utf8");
  const updatedSource = replaceArticleTemplateBody(source, body);

  await writeFile(templatePath, updatedSource, "utf8");
  return templatePath;
}

export async function updateArticleTemplateContent(
  projectRoot: string,
  slug: string,
  update: ArticleTemplateUpdate,
) {
  const templatePath = resolveTemplatePath(projectRoot, slug);
  const source = await readFile(templatePath, "utf8");
  const currentContent = readArticleTemplateContent(source);
  const nextContent = {
    body: update.body ?? currentContent.body,
    references: update.references ?? currentContent.references,
  };

  assertValidBlogReferences([{ slug, ...nextContent }]);

  const updatedSource = replaceArticleTemplateContent(source, update);
  await writeFile(templatePath, updatedSource, "utf8");

  return { ...nextContent, templatePath };
}

async function readJsonBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  let byteLength = 0;

  for await (const chunk of request) {
    const buffer = typeof chunk === "string"
      ? Buffer.from(chunk, "utf8")
      : Buffer.from(chunk);
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

function parseArticleUpdate(payload: unknown): ArticleTemplateUpdate {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ArticleEditorInputError("Request body must contain article changes.");
  }

  const record = payload as Record<string, unknown>;
  const hasBody = Object.hasOwn(record, "body");
  const hasReferences = Object.hasOwn(record, "references");

  if (!hasBody && !hasReferences) {
    throw new ArticleEditorInputError("Request body must contain body or references changes.");
  }

  if (hasBody && typeof record.body !== "string") {
    throw new ArticleEditorInputError("The article body must be a string.");
  }

  if (hasReferences && !Array.isArray(record.references)) {
    throw new ArticleEditorInputError("The article references must be an array.");
  }

  const references = hasReferences
    ? record.references as unknown[]
    : undefined;

  if (references && references.length > maximumReferenceCount) {
    throw new ArticleEditorInputError(
      `An article cannot contain more than ${maximumReferenceCount} references.`,
    );
  }

  const parsedReferences = references?.map((reference, index): BlogPostReference => {
    if (
      !reference
      || typeof reference !== "object"
      || Array.isArray(reference)
      || typeof (reference as Record<string, unknown>).citation !== "string"
      || typeof (reference as Record<string, unknown>).href !== "string"
    ) {
      throw new ArticleEditorInputError(
        `Reference ${index + 1} must contain citation and href strings.`,
      );
    }

    return {
      citation: (reference as { citation: string }).citation,
      href: (reference as { href: string }).href,
    };
  });

  return {
    ...(hasBody ? { body: record.body as string } : {}),
    ...(parsedReferences ? { references: parsedReferences } : {}),
  };
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

          const update = parseArticleUpdate(await readJsonBody(request));
          const savedArticle = await updateArticleTemplateContent(
            server.config.root,
            slug,
            update,
          );
          sendJson(response, 200, {
            body: savedArticle.body,
            references: savedArticle.references,
            saved: true,
            slug,
          });
        } catch (error) {
          if (
            error instanceof ArticleEditorInputError
            || (error instanceof Error && error.message.startsWith("Invalid blog references:"))
          ) {
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

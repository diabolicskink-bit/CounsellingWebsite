import { useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useSearchParams } from "react-router-dom";
import DocumentsSidebar, {
  type DocumentsSidebarGroup,
} from "../components/DocumentsSidebar";
import DevPageHero from "../components/DevPageHero";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

type DocumentCategory = "documentation" | "reports" | "plans";

type DocumentItem = {
  category: DocumentCategory;
  content: string;
  path: string;
  title: string;
};

const categoryMeta: Array<{
  emptyLabel: string;
  key: DocumentCategory;
  label: string;
}> = [
  {
    key: "documentation",
    label: "Documentation",
    emptyLabel: "No permanent documentation yet.",
  },
  {
    key: "reports",
    label: "Reports",
    emptyLabel: "No reports yet.",
  },
  {
    key: "plans",
    label: "Plans",
    emptyLabel: "No plans yet.",
  },
];

const markdownFiles = import.meta.glob("../../docs/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function normalizePath(modulePath: string) {
  return modulePath.replace(/^(\.\.\/)+/, "").replace(/\\/g, "/");
}

function humanizeFileName(value: string) {
  return value
    .replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function extractTitle(content: string, path: string) {
  const headingMatch = content.match(/^#\s+(.+)$/m);

  if (headingMatch) {
    return headingMatch[1].trim();
  }

  const segments = path.split("/");
  const fileName = segments[segments.length - 1] ?? path;

  if (fileName.toLowerCase() === "readme.md") {
    return humanizeFileName(segments[segments.length - 2] ?? fileName);
  }

  return humanizeFileName(fileName);
}

function getCategory(path: string): DocumentCategory {
  if (path.startsWith("docs/reports/")) {
    return "reports";
  }

  if (path.startsWith("docs/plans/")) {
    return "plans";
  }

  return "documentation";
}

function compareDocuments(a: DocumentItem, b: DocumentItem) {
  const categoryOrder = categoryMeta.map((category) => category.key);
  const categoryDifference = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);

  if (categoryDifference !== 0) {
    return categoryDifference;
  }

  if (a.category === "documentation") {
    return a.path.localeCompare(b.path);
  }

  return b.path.localeCompare(a.path);
}

function resolveMarkdownPath(currentPath: string, href: string) {
  try {
    const resolvedUrl = new URL(href, `https://documents.local/${currentPath}`);
    const normalizedPath = decodeURIComponent(resolvedUrl.pathname.replace(/^\//, ""));

    if (!normalizedPath.endsWith(".md")) {
      return null;
    }

    return normalizedPath;
  } catch {
    return null;
  }
}

const documents = Object.entries(markdownFiles)
  .map(([modulePath, content]) => {
    const path = normalizePath(modulePath);

    return {
      category: getCategory(path),
      content,
      path,
      title: extractTitle(content, path),
    } satisfies DocumentItem;
  })
  .sort(compareDocuments);

const documentLookup = new Map(documents.map((document) => [document.path, document]));

export default function Documents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPath = searchParams.get("doc");
  const selectedDocument = documents.find((document) => document.path === requestedPath) ?? documents[0] ?? null;

  useDocumentMetadata(
    "Documents | Vive Counselling",
    "Developer-only markdown reader for documentation, reports, and plans."
  );

  const groups = useMemo<DocumentsSidebarGroup[]>(
    () =>
      categoryMeta.map((category) => ({
        key: category.key,
        label: category.label,
        emptyLabel: category.emptyLabel,
        items: documents
          .filter((document) => document.category === category.key)
          .map((document) => ({ path: document.path, title: document.title })),
      })),
    [],
  );

  useEffect(() => {
    if (!selectedDocument || requestedPath === selectedDocument.path) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("doc", selectedDocument.path);
    setSearchParams(nextSearchParams, { replace: true });
  }, [requestedPath, searchParams, selectedDocument, setSearchParams]);

  const selectedCategoryLabel =
    categoryMeta.find((category) => category.key === selectedDocument?.category)?.label ?? "Documentation";

  return (
    <main className="site-page">
      <DevPageHero
        badge="Dev documents"
        title="Documents"
        description="A small reader for markdown documentation, generated reports, and draft plans. Drop files into the docs folders and they will appear here automatically in development."
      />

      <div className="ds-layout">
        <div className="ds-layout__sidebar">
          <DocumentsSidebar groups={groups} selectedPath={selectedDocument?.path ?? null} />
        </div>

        <div className="ds-layout__content">
          <section className="documents-viewer" aria-live="polite">
            {selectedDocument ? (
              <>
                <div className="documents-viewer__meta">
                  <span>{selectedCategoryLabel}</span>
                  <code>{selectedDocument.path}</code>
                </div>

                <article className="documents-viewer__article">
                  <div className="documents-markdown">
                    <ReactMarkdown
                      components={{
                        a({ href = "", children, ...props }) {
                          const linkedDocumentPath =
                            selectedDocument && !href.startsWith("#")
                              ? resolveMarkdownPath(selectedDocument.path, href)
                              : null;

                          if (linkedDocumentPath && documentLookup.has(linkedDocumentPath)) {
                            const nextSearchParams = new URLSearchParams(searchParams);
                            nextSearchParams.set("doc", linkedDocumentPath);

                            return <Link to={`/documents?${nextSearchParams.toString()}`}>{children}</Link>;
                          }

                          const isExternal = /^https?:\/\//i.test(href);

                          return (
                            <a
                              {...props}
                              href={href}
                              rel={isExternal ? "noreferrer" : undefined}
                              target={isExternal ? "_blank" : undefined}
                            >
                              {children}
                            </a>
                          );
                        },
                      }}
                      remarkPlugins={[remarkGfm]}
                    >
                      {selectedDocument.content}
                    </ReactMarkdown>
                  </div>
                </article>
              </>
            ) : (
              <div className="documents-viewer__empty">
                <h2>No markdown files found.</h2>
                <p>Add `.md` files under `docs/` to populate this page.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

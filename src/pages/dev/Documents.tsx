import { useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useSearchParams } from "react-router-dom";
import DocumentsSidebar, {
  type DocumentsSidebarGroup,
} from "../../components/DocumentsSidebar";
import DevPageHero from "../../components/DevPageHero";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";

type DocumentCategory = "checklists" | "reports" | "plans";

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
    key: "checklists",
    label: "Checklists",
    emptyLabel: "No checklists yet.",
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

const markdownFiles = import.meta.glob(
  ["../../../docs/checklists/**/*.md", "../../../docs/reports/**/*.md", "../../../docs/plans/**/*.md"],
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
) as Record<string, string>;

const statusClassNames: Record<string, string> = {
  "actioned": "actioned",
  "bucket": "bucket",
  "consolidate candidate": "consolidate-candidate",
  "delete candidate": "delete-candidate",
  "expanded": "expanded",
  "fail": "fail",
  "keep": "keep",
  "keep, document": "keep-document",
  "move candidate": "move-candidate",
  "n/a": "na",
  "not checked": "not-checked",
  "not reviewed": "not-reviewed",
  "partial": "partial",
  "pass": "pass",
  "restructure candidate": "restructure-candidate",
  "reviewing": "reviewing",
};

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
  if (path.startsWith("docs/checklists/")) {
    return "checklists";
  }

  if (path.startsWith("docs/reports/")) {
    return "reports";
  }

  return "plans";
}

function compareDocuments(a: DocumentItem, b: DocumentItem) {
  const categoryOrder = categoryMeta.map((category) => category.key);
  const categoryDifference = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);

  if (categoryDifference !== 0) {
    return categoryDifference;
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

function getStatusClassName(children: unknown) {
  const label = String(children).trim();
  const statusKey = label.toLowerCase();
  const modifier = statusClassNames[statusKey];

  return modifier ? `documents-status documents-status--${modifier}` : null;
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
    "Developer-only markdown reader for project checklists, generated reports, and draft plans."
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
    categoryMeta.find((category) => category.key === selectedDocument?.category)?.label ?? "Documents";

  return (
    <main className="site-page">
      <DevPageHero
        badge="Dev documents"
        title="Documents"
        description="A small reader for project checklists, generated reports, and draft plans. Drop markdown into the checklists, reports, or plans folders and it will appear here automatically in development."
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
                        code({ children, className, node: _node, ...props }) {
                          const statusClassName = className ? null : getStatusClassName(children);

                          if (statusClassName) {
                            return <span className={statusClassName}>{children}</span>;
                          }

                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
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
                <p>Add `.md` files under `docs/checklists/`, `docs/reports/`, or `docs/plans/` to populate this page.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

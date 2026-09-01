import ReactMarkdown, { type Components } from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";

type ArticleMarkdownProps = Readonly<{
  body: string;
  className?: string;
  components?: Components;
  sectioned?: boolean;
}>;

type ArticleSection = Readonly<{
  body: string;
  heading: string;
}>;

const levelTwoHeadingPattern = /^##\s+(.+?)\s*$/gm;

const defaultComponents: Components = {
  a: ({ children, href = "", node: _node, ...anchorProps }) =>
    href.startsWith("/") && !href.startsWith("//") ? (
      <Link to={href} {...anchorProps}>{children}</Link>
    ) : (
      <a href={href} {...anchorProps}>{children}</a>
    ),
  p: ({ children }) => <p className="blog-article__paragraph">{children}</p>,
  table: ({ children, node: _node, ...tableProps }) => (
    <div
      aria-label="Article table. Scroll horizontally to see every column."
      className="blog-article__table-region"
      role="region"
      tabIndex={0}
    >
      <table {...tableProps}>{children}</table>
    </div>
  ),
};

function splitArticleIntoSections(body: string) {
  const headings = [...body.matchAll(levelTwoHeadingPattern)].map((match) => ({
    bodyStart: (match.index ?? 0) + match[0].length,
    heading: match[1].trim(),
    start: match.index ?? 0,
  }));

  if (headings.length === 0) {
    return { introduction: body.trim(), sections: [] };
  }

  const sections: ArticleSection[] = headings.map((heading, index) => ({
    body: body.slice(heading.bodyStart, headings[index + 1]?.start ?? body.length).trim(),
    heading: heading.heading,
  }));

  return {
    introduction: body.slice(0, headings[0].start).trim(),
    sections,
  };
}

function createSectionId(heading: string, index: number) {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `article-section-${index + 1}-${slug || "section"}`;
}

function countReferenceEntries(body: string) {
  return (body.match(/^[-*+]\s+/gm) ?? []).length;
}

function MarkdownContent({
  body,
  components,
}: Readonly<Pick<ArticleMarkdownProps, "body" | "components">>) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{ ...defaultComponents, ...components }}
    >
      {body}
    </ReactMarkdown>
  );
}

function MarkdownSectionHeading({
  components,
  heading,
  id,
}: Readonly<{
  components?: Components;
  heading: string;
  id: string;
}>) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        ...defaultComponents,
        ...components,
        p: ({ children }) => <h2 id={id}>{children}</h2>,
      }}
    >
      {heading}
    </ReactMarkdown>
  );
}

export default function ArticleMarkdown({
  body,
  className = "blog-article__prose",
  components,
  sectioned = false,
}: ArticleMarkdownProps) {
  const { introduction, sections } = splitArticleIntoSections(body);

  if (sectioned && sections.length > 0) {
    return (
      <div className={`${className} blog-article__prose--sectioned`}>
        {introduction ? (
          <div className="blog-article__lead">
            <MarkdownContent body={introduction} components={components} />
          </div>
        ) : null}

        {sections.map((section, index) => {
          const sectionId = createSectionId(section.heading, index);
          const isReferences = section.heading.toLowerCase() === "references";
          const referenceCount = isReferences ? countReferenceEntries(section.body) : 0;
          const sectionClassName = [
            "blog-article__section",
            isReferences ? "blog-article__references" : null,
          ].filter(Boolean).join(" ");

          return (
            <section
              aria-labelledby={sectionId}
              className={sectionClassName}
              key={`${section.heading}-${index}`}
            >
              <header className="blog-article__section-heading">
                <MarkdownSectionHeading
                  components={components}
                  heading={section.heading}
                  id={sectionId}
                />
                {referenceCount > 0 ? (
                  <p className="blog-article__reference-count">
                    {referenceCount} {referenceCount === 1 ? "source" : "sources"}
                  </p>
                ) : null}
              </header>
              <div className="blog-article__section-copy">
                <MarkdownContent body={section.body} components={components} />
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className={className}>
      <MarkdownContent body={body} components={components} />
    </div>
  );
}

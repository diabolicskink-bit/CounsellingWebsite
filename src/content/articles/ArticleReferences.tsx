import ArticleMarkdown from "./ArticleMarkdown.tsx";
import type { ArticleReference } from "./articleTemplate.ts";

type ArticleReferencesProps = Readonly<{
  references: readonly ArticleReference[];
}>;

export default function ArticleReferences({ references }: ArticleReferencesProps) {
  if (references.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="article-references-title"
      className="article-page__references"
    >
      <header className="article-page__references-heading">
        <h2 id="article-references-title">References</h2>
        <p className="article-page__reference-count">
          {references.length} {references.length === 1 ? "source" : "sources"}
        </p>
      </header>

      <ul className="article-page__reference-list">
        {references.map((reference) => (
          <li
            id={reference.anchorId ? `article-reference-${reference.anchorId}` : undefined}
            key={reference.anchorId ?? reference.citation}
            tabIndex={reference.anchorId ? -1 : undefined}
          >
            <ArticleMarkdown
              body={reference.citation}
              className="article-page__reference-copy"
            />
            <a
              className="article-page__reference-link"
              href={reference.href}
            >
              {reference.href}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

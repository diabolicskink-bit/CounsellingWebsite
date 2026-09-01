import ArticleMarkdown from "./ArticleMarkdown.tsx";
import type { BlogPostReference } from "./postTemplate.ts";

type ArticleReferencesProps = Readonly<{
  references: readonly BlogPostReference[];
}>;

export default function ArticleReferences({ references }: ArticleReferencesProps) {
  if (references.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="article-references-title"
      className="blog-article__section blog-article__references"
    >
      <header className="blog-article__section-heading">
        <h2 id="article-references-title">References</h2>
        <p className="blog-article__reference-count">
          {references.length} {references.length === 1 ? "source" : "sources"}
        </p>
      </header>

      <ul className="blog-article__reference-list">
        {references.map((reference, index) => (
          <li key={`${index}-${reference.citation}`}>
            <ArticleMarkdown
              body={reference.citation}
              className="blog-article__reference-copy"
            />
            <a
              className="blog-article__reference-link"
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

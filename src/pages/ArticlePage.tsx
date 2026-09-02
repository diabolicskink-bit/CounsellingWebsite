import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import ArticleMarkdown from "../content/articles/ArticleMarkdown";
import ArticleReferences from "../content/articles/ArticleReferences";
import ArticleHero from "../content/articles/ArticleHero";
import { getArticleBySlug, type Article } from "../content/articles/articles";
import { getArticlePresentation } from "../content/articles/presentations";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-articles.css";
import NotFound from "./NotFound";

function PublishedArticlePage({ article }: { article: Article }) {
  const presentation = getArticlePresentation(article.presentation);
  const ArticleBody = presentation?.Body;
  const isStandardArticle = !ArticleBody;
  const documentClassName = ["article-page__document", presentation?.className]
    .filter(Boolean)
    .join(" ");
  useDocumentMetadata(
    article.metaTitle ?? `${article.title} | Vive Counselling`,
    article.description,
    article.isSample ? "noindex, nofollow" : undefined,
  );

  return (
    <main className="site-page article-page">
      <article className={documentClassName}>
        <ArticleHero article={article} />

        <div className="article-page__reading-area">
          <Container
            className={[
              "article-page__reading-inner",
              isStandardArticle ? "article-page__reading-inner--standard" : null,
            ].filter(Boolean).join(" ")}
          >
            {article.sourceNote ? (
              <aside className="article-page__source-note" aria-labelledby="article-source-note-title">
                <h2 id="article-source-note-title">Publication note</h2>
                <p>{article.sourceNote}</p>
              </aside>
            ) : null}

            {ArticleBody ? (
              <ArticleBody body={article.body} />
            ) : (
              <ArticleMarkdown
                body={article.body}
                className="article-page__prose article-page__prose--standard"
              />
            )}
            <ArticleReferences references={article.references} />
          </Container>
        </div>
      </article>

      <div className="article-page__return">
        <Container>
          <Link to={publicRoutePaths.articles}>
            <ArrowLeft size={18} aria-hidden="true" /> All articles
          </Link>
        </Container>
      </div>
    </main>
  );
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);

  return article ? <PublishedArticlePage article={article} /> : <NotFound />;
}

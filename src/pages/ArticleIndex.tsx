import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {
  articleMetadata,
  formatArticleDate,
  getArticlePath,
} from "../content/articles/manifest";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-article-index.css";

const articlesMetadata = getRouteMetadata(publicRoutePaths.articles);

export default function ArticleIndex() {
  useDocumentMetadata(articlesMetadata.title, articlesMetadata.description);

  return (
    <main className="site-page article-index">
      <header
        className="site-hero site-hero-surface article-index__hero"
        aria-labelledby="article-index-title"
      >
        <Container>
          <p className="site-hero__eyebrow">Vive Counselling</p>
          <h1 className="site-hero__statement" id="article-index-title">
            Psychology and counselling articles
          </h1>
        </Container>
      </header>

      <Container className="article-index__content">
        {articleMetadata.length > 0 ? (
          <ol className="article-index__list" aria-label="Published articles" role="list">
            {articleMetadata.map((article) => (
              <li key={article.slug}>
                <article className="article-index__entry">
                  <Link
                    className="article-index__article-link"
                    to={getArticlePath(article.slug)}
                    aria-labelledby={"article-title-" + article.slug}
                  >
                    <div className="article-index__meta">
                      <span>{article.topic}</span>
                      <time dateTime={article.publishedAt}>
                        {formatArticleDate(article.publishedAt)}
                      </time>
                    </div>
                    <h2 id={"article-title-" + article.slug}>{article.title}</h2>
                    <p className="site-reading">{article.description}</p>
                    <footer className="article-index__details">
                      <span className="article-index__author">{article.author}</span>
                      <span className="article-index__read">
                        Read article <ArrowRight size={18} aria-hidden="true" />
                      </span>
                    </footer>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <p className="article-index__empty">No articles have been published yet.</p>
        )}
      </Container>
    </main>
  );
}

import { Link } from "react-router-dom";
import Container from "../components/Container";
import { formatArticleDate, getArticlePath } from "../content/articles/manifest";
import { articles } from "../content/articles/articles";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-articles.css";

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
          <div className="article-index__hero-heading">
            <p className="site-hero__eyebrow">Vive Counselling</p>
            <h1 className="site-hero__statement" id="article-index-title">Articles</h1>
          </div>
        </Container>
      </header>

      <section className="article-index__entries" aria-labelledby="article-entries-title">
        <Container>
          <header className="article-index__entries-heading">
            <h2 id="article-entries-title">Published articles</h2>
            <p>{articles.length === 1 ? "1 article" : `${articles.length} articles`}</p>
          </header>

          {articles.length > 0 ? (
            <ol className="article-index__list" aria-label="Published articles">
              {articles.map((article) => (
                <li key={article.slug}>
                  <article className="article-index__entry">
                    <div className="article-index__entry-meta">
                      <span>{article.topic}</span>
                      {article.isSample ? <span className="article-sample-label">Sample</span> : null}
                    </div>

                    <div className="article-index__entry-copy">
                      <h3>
                        <Link to={getArticlePath(article.slug)}>{article.title}</Link>
                      </h3>
                      <p className="site-reading">{article.abstract}</p>
                    </div>

                    <footer className="article-index__entry-details">
                      <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
                      <Link to={getArticlePath(article.slug)}>Read article</Link>
                    </footer>
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <p className="article-index__empty">No articles have been published yet.</p>
          )}
        </Container>
      </section>

      <section className="article-index__site-links" aria-labelledby="article-site-links-title">
        <Container className="article-index__site-links-inner">
          <h2 id="article-site-links-title">Counselling information</h2>
          <nav aria-label="Counselling information">
            <Link to={publicRoutePaths.workingWithJoel}>Working with Joel</Link>
            <Link to={publicRoutePaths.contact}>Contact and fees</Link>
          </nav>
        </Container>
      </section>
    </main>
  );
}

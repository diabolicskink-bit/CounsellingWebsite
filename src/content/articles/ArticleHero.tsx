import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { publicRoutePaths } from "../../data/routes";
import { formatArticleDate, type ArticleMetadata } from "./manifest";

type ArticleHeroProps = Readonly<{
  article: ArticleMetadata;
}>;

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <header
      className="site-hero site-hero-surface article-hero"
      aria-labelledby="article-hero-title"
    >
      <Container>
        <nav
          className="site-hero__eyebrow article-hero__breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to={publicRoutePaths.articles}>Articles</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{article.topic}</span>
        </nav>

        <div className="article-hero__layout">
          <div className="article-hero__heading">
            <h1 className="site-hero__statement" id="article-hero-title">
              {article.title}
            </h1>
          </div>

          <section
            className="article-hero__abstract"
            aria-labelledby="article-abstract-title"
          >
            <h2 id="article-abstract-title">Abstract</h2>
            <p className="site-reading">{article.abstract}</p>
          </section>

          <dl className="article-hero__details" aria-label="Article details">
            <div>
              <dt>Author</dt>
              <dd>{article.author}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
              </dd>
            </div>
            {article.updatedAt ? (
              <div>
                <dt>Updated</dt>
                <dd>
                  <time dateTime={article.updatedAt}>
                    {formatArticleDate(article.updatedAt)}
                  </time>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </Container>
    </header>
  );
}

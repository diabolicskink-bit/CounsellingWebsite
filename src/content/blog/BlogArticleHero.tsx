import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { publicRoutePaths } from "../../data/routes";
import { formatBlogDate, type BlogPostMetadata } from "./manifest";
import "./blog-shared.css";
import "./blog-article-hero.css";

type BlogArticleHeroProps = Readonly<{
  post: BlogPostMetadata;
}>;

export default function BlogArticleHero({ post }: BlogArticleHeroProps) {
  return (
    <header
      className="site-hero site-hero-background blog-article-hero"
      aria-labelledby="blog-article-title"
    >
      <Container className="blog-article-hero__inner">
        <nav className="blog-article-hero__breadcrumb" aria-label="Breadcrumb">
          <Link to={publicRoutePaths.blog}>Articles</Link>
          <span aria-hidden="true">/</span>
          <span>{post.topic}</span>
        </nav>

        <div className="blog-article-hero__layout">
          <div className="blog-article-hero__heading">
            <div className="site-hero__eyebrow blog-article-hero__classification">
              <span>{post.topic}</span>
              {post.isSample ? (
                <span className="blog-sample-label blog-article-hero__sample">Sample article</span>
              ) : null}
            </div>
            <h1 className="site-hero__statement" id="blog-article-title">
              {post.title}
            </h1>
          </div>

          <div className="blog-article-hero__record">
            <section
              className="blog-article-hero__abstract"
              aria-labelledby="article-abstract-title"
            >
              <h2 id="article-abstract-title">Abstract</h2>
              <p className="site-reading">{post.abstract}</p>
            </section>

            <dl className="blog-article-hero__details" aria-label="Article details">
              <div>
                <dt>Author</dt>
                <dd>{post.author}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={post.publishedAt}>
                    {formatBlogDate(post.publishedAt)}
                  </time>
                </dd>
              </div>
              {post.updatedAt ? (
                <div>
                  <dt>Updated</dt>
                  <dd>
                    <time dateTime={post.updatedAt}>
                      {formatBlogDate(post.updatedAt)}
                    </time>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </Container>
    </header>
  );
}

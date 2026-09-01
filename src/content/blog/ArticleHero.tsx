import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { publicRoutePaths } from "../../data/routes";
import { formatBlogDate, type BlogPostMetadata } from "./manifest";

type ArticleHeroProps = Readonly<{
  post: BlogPostMetadata;
}>;

export default function ArticleHero({ post }: ArticleHeroProps) {
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
          <Link to={publicRoutePaths.blog}>Articles</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.topic}</span>
        </nav>

        <div className="article-hero__layout">
          <div className="article-hero__heading">
            <h1 className="site-hero__statement" id="article-hero-title">
              {post.title}
            </h1>
          </div>

          <section
            className="article-hero__abstract"
            aria-labelledby="article-abstract-title"
          >
            <h2 id="article-abstract-title">Abstract</h2>
            <p className="site-reading">{post.abstract}</p>
          </section>

          <dl className="article-hero__details" aria-label="Article details">
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
      </Container>
    </header>
  );
}

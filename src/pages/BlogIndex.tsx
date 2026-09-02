import { Link } from "react-router-dom";
import Container from "../components/Container";
import { formatBlogDate, getBlogPostPath } from "../content/blog/manifest";
import { blogPosts } from "../content/blog/posts";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-blog.css";

const blogMetadata = getRouteMetadata(publicRoutePaths.blog);

export default function BlogIndex() {
  useDocumentMetadata(blogMetadata.title, blogMetadata.description);

  return (
    <main className="site-page blog-index">
      <header
        className="site-hero site-hero-surface blog-index__hero"
        aria-labelledby="blog-index-title"
      >
        <Container>
          <div className="blog-index__hero-heading">
            <p className="site-hero__eyebrow">Vive Counselling</p>
            <h1 className="site-hero__statement" id="blog-index-title">Articles</h1>
          </div>
        </Container>
      </header>

      <section className="blog-index__entries" aria-labelledby="blog-entries-title">
        <Container>
          <header className="blog-index__entries-heading">
            <h2 id="blog-entries-title">Published articles</h2>
            <p>{blogPosts.length === 1 ? "1 article" : `${blogPosts.length} articles`}</p>
          </header>

          {blogPosts.length > 0 ? (
            <ol className="blog-index__list" aria-label="Published articles">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <article className="blog-index__entry">
                    <div className="blog-index__entry-meta">
                      <span>{post.topic}</span>
                      {post.isSample ? <span className="article-sample-label">Sample</span> : null}
                    </div>

                    <div className="blog-index__entry-copy">
                      <h3>
                        <Link to={getBlogPostPath(post.slug)}>{post.title}</Link>
                      </h3>
                      <p className="site-reading">{post.abstract}</p>
                    </div>

                    <footer className="blog-index__entry-details">
                      <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                      <Link to={getBlogPostPath(post.slug)}>Read article</Link>
                    </footer>
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <p className="blog-index__empty">No articles have been published yet.</p>
          )}
        </Container>
      </section>

      <section className="blog-index__site-links" aria-labelledby="blog-site-links-title">
        <Container className="blog-index__site-links-inner">
          <h2 id="blog-site-links-title">Counselling information</h2>
          <nav aria-label="Counselling information">
            <Link to={publicRoutePaths.workingWithJoel}>Working with Joel</Link>
            <Link to={publicRoutePaths.contact}>Contact and fees</Link>
          </nav>
        </Container>
      </section>
    </main>
  );
}

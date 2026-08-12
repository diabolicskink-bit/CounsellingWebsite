import { Link } from "react-router-dom";
import Container from "../components/Container";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostPath,
  getBlogReadingMinutes,
} from "../content/blog/posts";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-blog.css";

const blogMetadata = getRouteMetadata("/blog");

export default function BlogIndex() {
  useDocumentMetadata(blogMetadata.title, blogMetadata.description);

  return (
    <main className="site-page blog-index">
      <header className="blog-index__header" aria-labelledby="blog-index-title">
        <Container className="blog-index__header-grid">
          <div>
            <p className="blog-index__section-label">Vive Counselling</p>
            <h1 id="blog-index-title">Articles</h1>
          </div>
          <p className="blog-index__introduction site-reading">
            Essays and explanatory articles. Topics and formats vary; sources and
            adaptation notes are included where relevant.
          </p>
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
              {blogPosts.map((post) => {
                const readingMinutes = getBlogReadingMinutes(post.body);

                return (
                  <li key={post.slug}>
                    <article className="blog-index__entry">
                      <div className="blog-index__entry-meta">
                        <span>{post.topic}</span>
                        {post.isSample ? <span className="blog-index__sample">Sample</span> : null}
                      </div>

                      <div className="blog-index__entry-copy">
                        <h3>
                          <Link to={getBlogPostPath(post.slug)}>{post.title}</Link>
                        </h3>
                        <p className="site-reading">{post.abstract}</p>
                      </div>

                      <footer className="blog-index__entry-details">
                        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                        <span>{readingMinutes} min read</span>
                        <Link to={getBlogPostPath(post.slug)}>Read article</Link>
                      </footer>
                    </article>
                  </li>
                );
              })}
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
            <Link to={routeHref(publicRoutePaths.workingWithJoel)}>Working with Joel</Link>
            <Link to={routeHref(publicRoutePaths.contact)}>Contact and fees</Link>
          </nav>
        </Container>
      </section>
    </main>
  );
}

import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import ArticleMarkdown from "../content/blog/ArticleMarkdown";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getBlogReadingMinutes,
  type BlogPost,
} from "../content/blog/posts";
import { getBlogArticlePresentation } from "../content/blog/presentations";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-blog.css";
import NotFound from "./NotFound";

function PublishedBlogArticle({ post }: { post: BlogPost }) {
  const readingMinutes = getBlogReadingMinutes(post.body);
  const presentation = getBlogArticlePresentation(post.presentation);
  const ArticleBody = presentation?.Body;
  const documentClassName = ["blog-article__document", presentation?.className]
    .filter(Boolean)
    .join(" ");
  useDocumentMetadata(
    `${post.title} | Vive Counselling`,
    post.description,
    post.isSample ? "noindex, nofollow" : undefined,
  );

  return (
    <main className="site-page blog-article">
      <article className={documentClassName}>
        <header className="blog-article__header">
          <Container className="blog-article__header-inner">
            <nav className="blog-article__breadcrumb" aria-label="Breadcrumb">
              <Link to={routeHref(publicRoutePaths.blog)}>Articles</Link>
              <span aria-hidden="true">/</span>
              <span>{post.topic}</span>
            </nav>

            <div className="blog-article__heading">
              <div className="blog-article__classification">
                <span>{post.topic}</span>
                {post.isSample ? <span className="blog-article__sample">Sample article</span> : null}
              </div>
              <h1>{post.title}</h1>
            </div>

            <section className="blog-article__abstract" aria-labelledby="article-abstract-title">
              <h2 id="article-abstract-title">Abstract</h2>
              <p className="site-reading">{post.abstract}</p>
            </section>

            <dl className="blog-article__details" aria-label="Article details">
              <div>
                <dt>Author</dt>
                <dd>{post.author}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                </dd>
              </div>
              {post.updatedAt ? (
                <div>
                  <dt>Updated</dt>
                  <dd>
                    <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Reading time</dt>
                <dd>{readingMinutes} min</dd>
              </div>
            </dl>
          </Container>
        </header>

        <div className="blog-article__reading-area">
          <Container className="blog-article__reading-inner">
            {post.sourceNote ? (
              <aside className="blog-article__source-note" aria-labelledby="article-source-note-title">
                <h2 id="article-source-note-title">Publication note</h2>
                <p>{post.sourceNote}</p>
              </aside>
            ) : null}

            {ArticleBody ? (
              <ArticleBody post={post} />
            ) : (
              <ArticleMarkdown body={post.body} />
            )}
          </Container>
        </div>
      </article>

      <div className="blog-article__return">
        <Container>
          <Link to={routeHref(publicRoutePaths.blog)}>
            <ArrowLeft size={18} aria-hidden="true" /> All articles
          </Link>
        </Container>
      </div>
    </main>
  );
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug);

  return post ? <PublishedBlogArticle post={post} /> : <NotFound />;
}

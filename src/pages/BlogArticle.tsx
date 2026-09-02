import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import ArticleMarkdown from "../content/blog/ArticleMarkdown";
import ArticleReferences from "../content/blog/ArticleReferences";
import ArticleHero from "../content/blog/ArticleHero";
import { getBlogPostBySlug, type BlogPost } from "../content/blog/posts";
import { getBlogArticlePresentation } from "../content/blog/presentations";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-blog.css";
import NotFound from "./NotFound";

function PublishedBlogArticle({ post }: { post: BlogPost }) {
  const presentation = getBlogArticlePresentation(post.presentation);
  const ArticleBody = presentation?.Body;
  const isStandardArticle = !ArticleBody;
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
        <ArticleHero post={post} />

        <div className="blog-article__reading-area">
          <Container
            className={[
              "blog-article__reading-inner",
              isStandardArticle ? "blog-article__reading-inner--standard" : null,
            ].filter(Boolean).join(" ")}
          >
            {post.sourceNote ? (
              <aside className="blog-article__source-note" aria-labelledby="article-source-note-title">
                <h2 id="article-source-note-title">Publication note</h2>
                <p>{post.sourceNote}</p>
              </aside>
            ) : null}

            {ArticleBody ? (
              <ArticleBody body={post.body} />
            ) : (
              <ArticleMarkdown
                body={post.body}
                className="blog-article__prose blog-article__prose--standard"
              />
            )}
            <ArticleReferences references={post.references} />
          </Container>
        </div>
      </article>

      <div className="blog-article__return">
        <Container>
          <Link to={publicRoutePaths.blog}>
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

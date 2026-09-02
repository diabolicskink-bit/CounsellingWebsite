import type { Components } from "react-markdown";
import ArticleMarkdown from "../ArticleMarkdown";
import "./self-critical-perfectionism.css";

function withPresentationClass(className: string | undefined, presentationClass: string) {
  return className ? `${className} ${presentationClass}` : presentationClass;
}

const selfCriticalPerfectionismComponents: Components = {
  blockquote: ({ className, node: _node, ...blockquoteProps }) => (
    <blockquote
      {...blockquoteProps}
      className={withPresentationClass(className, "perfectionism-article__equation")}
    />
  ),
  ol: ({ className, node: _node, ...listProps }) => (
    <ol
      {...listProps}
      className={withPresentationClass(className, "perfectionism-article__cycle")}
    />
  ),
  ul: ({ className, node: _node, ...listProps }) => (
    <ul
      {...listProps}
      className={withPresentationClass(className, "perfectionism-article__signals")}
    />
  ),
};

export default function SelfCriticalPerfectionismArticle({
  body,
}: Readonly<{ body: string }>) {
  return (
    <ArticleMarkdown
      body={body}
      className="article-page__prose article-page__prose--standard perfectionism-article__prose"
      components={selfCriticalPerfectionismComponents}
    />
  );
}

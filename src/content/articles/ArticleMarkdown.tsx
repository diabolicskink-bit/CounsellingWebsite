import ReactMarkdown, { type Components } from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";

type ArticleMarkdownProps = Readonly<{
  body: string;
  className?: string;
  components?: Components;
}>;

const markdownPlugins = [remarkGfm];

const articleMarkdownComponents: Components = {
  a: ({ children, href = "", node: _node, ...anchorProps }) => (
    href.startsWith("/") && !href.startsWith("//") ? (
      <Link to={href} {...anchorProps}>{children}</Link>
    ) : (
      <a href={href} {...anchorProps}>{children}</a>
    )
  ),
  p: ({ children }) => <p className="article-page__paragraph">{children}</p>,
  table: ({ children, node: _node, ...tableProps }) => (
    <div
      aria-label="Article table. Scroll horizontally to see every column."
      className="article-page__table-region"
      role="region"
      tabIndex={0}
    >
      <table {...tableProps}>{children}</table>
    </div>
  ),
};

export default function ArticleMarkdown({
  body,
  className = "article-page__prose",
  components,
}: ArticleMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{ ...articleMarkdownComponents, ...components }}
        remarkPlugins={markdownPlugins}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}

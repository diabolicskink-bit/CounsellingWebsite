import ReactMarkdown, { type Components } from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";

type ArticleMarkdownProps = Readonly<{
  body: string;
  className?: string;
  components?: Components;
}>;

const defaultComponents: Components = {
  a: ({ children, href = "", node: _node, ...anchorProps }) =>
    href.startsWith("/") && !href.startsWith("//") ? (
      <Link to={href} {...anchorProps}>{children}</Link>
    ) : (
      <a href={href} {...anchorProps}>{children}</a>
    ),
  p: ({ children }) => <p className="site-reading">{children}</p>,
  table: ({ children, node: _node, ...tableProps }) => (
    <div
      aria-label="Article table. Scroll horizontally to see every column."
      className="blog-article__table-region"
      role="region"
      tabIndex={0}
    >
      <table {...tableProps}>{children}</table>
    </div>
  ),
};

export default function ArticleMarkdown({
  body,
  className = "blog-article__prose",
  components,
}: ArticleMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ ...defaultComponents, ...components }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}

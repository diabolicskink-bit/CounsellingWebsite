import ReactMarkdown, { type Components } from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";

type ArticleMarkdownProps = Readonly<{
  body: string;
  className?: string;
  components?: Components;
}>;

const defaultComponents: Components = {
  a: ({ children, href = "" }) =>
    href.startsWith("/") ? (
      <Link to={href}>{children}</Link>
    ) : (
      <a href={href}>{children}</a>
    ),
  p: ({ children }) => <p className="site-reading">{children}</p>,
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

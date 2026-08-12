import type { ComponentType } from "react";
import AntRouteArticle from "./articles/AntRouteArticle";
import DinosaurFossilArticle from "./articles/DinosaurFossilArticle";
import type { BlogPost } from "./posts";

export type BlogArticleBodyProps = Readonly<{
  post: BlogPost;
}>;

type BlogArticlePresentation = Readonly<{
  Body: ComponentType<BlogArticleBodyProps>;
  className: string;
}>;

const blogArticlePresentations = {
  "ant-trail": {
    Body: AntRouteArticle,
    className: "blog-article--ant-trail",
  },
  "fossil-record": {
    Body: DinosaurFossilArticle,
    className: "blog-article--fossil-record",
  },
} satisfies Record<string, BlogArticlePresentation>;

export function getBlogArticlePresentation(key: string | undefined) {
  if (!key) {
    return undefined;
  }

  return blogArticlePresentations[key as keyof typeof blogArticlePresentations];
}

import type { ComponentType } from "react";
import AntRouteArticle from "./articles/AntRouteArticle";
import DinosaurFossilArticle from "./articles/DinosaurFossilArticle";
import type { BlogArticlePresentationKey } from "./manifest";

type BlogArticleBodyProps = Readonly<{
  body: string;
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
} satisfies Record<BlogArticlePresentationKey, BlogArticlePresentation>;

export function getBlogArticlePresentation(key: BlogArticlePresentationKey | undefined) {
  if (!key) {
    return undefined;
  }

  return blogArticlePresentations[key];
}

import type { ComponentType } from "react";
import AntRouteArticle from "./articles/AntRouteArticle";
import DinosaurFossilArticle from "./articles/DinosaurFossilArticle";
import type { ArticlePresentationKey } from "./manifest";

type ArticleBodyProps = Readonly<{
  body: string;
}>;

type ArticlePresentation = Readonly<{
  Body: ComponentType<ArticleBodyProps>;
  className: string;
}>;

const articlePresentations = {
  "ant-trail": {
    Body: AntRouteArticle,
    className: "article-page--ant-trail",
  },
  "fossil-record": {
    Body: DinosaurFossilArticle,
    className: "article-page--fossil-record",
  },
} satisfies Record<ArticlePresentationKey, ArticlePresentation>;

export function getArticlePresentation(key: ArticlePresentationKey | undefined) {
  if (!key) {
    return undefined;
  }

  return articlePresentations[key];
}

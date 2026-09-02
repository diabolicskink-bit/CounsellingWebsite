import type { ComponentType } from "react";
import SelfCriticalPerfectionismArticle from "./articles/SelfCriticalPerfectionismArticle";
import type { ArticlePresentationKey } from "./manifest";

type ArticleBodyProps = Readonly<{
  body: string;
}>;

type ArticlePresentation = Readonly<{
  Body: ComponentType<ArticleBodyProps>;
  className: string;
}>;

const articlePresentations = {
  "self-critical-perfectionism": {
    Body: SelfCriticalPerfectionismArticle,
    className: "article-page--self-critical-perfectionism",
  },
} satisfies Record<ArticlePresentationKey, ArticlePresentation>;

export function getArticlePresentation(key: ArticlePresentationKey | undefined) {
  if (!key) {
    return undefined;
  }

  return articlePresentations[key];
}

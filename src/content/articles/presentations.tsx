import type { ComponentType } from "react";
import type { ArticlePresentationKey } from "./manifest";

type ArticleBodyProps = Readonly<{
  body: string;
}>;

type ArticlePresentation = Readonly<{
  Body: ComponentType<ArticleBodyProps>;
  className: string;
}>;

const articlePresentations: Readonly<Record<string, ArticlePresentation>> = {};

export function getArticlePresentation(key: ArticlePresentationKey | undefined) {
  if (!key) {
    return undefined;
  }

  return articlePresentations[key as string];
}

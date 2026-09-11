import { lazy } from "react";
import type { ArticlePageComponents } from "../../App";

export const browserArticlePages = {
  Index: lazy(() => import("../../pages/ArticleIndex")),
  Page: lazy(() => import("../../pages/ArticlePage")),
} satisfies ArticlePageComponents;

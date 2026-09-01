import { lazy } from "react";
import type { BlogPageComponents } from "../../App";

export const browserBlogPages = {
  Article: lazy(() => import("../../pages/BlogArticle")),
  Index: lazy(() => import("../../pages/BlogIndex")),
} satisfies BlogPageComponents;

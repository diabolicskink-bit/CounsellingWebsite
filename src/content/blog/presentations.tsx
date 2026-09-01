import type { ComponentType } from "react";
import AntRouteArticle from "./articles/AntRouteArticle";
import DinosaurFossilArticle from "./articles/DinosaurFossilArticle";
import {
  blogArticlePresentationDefinitions,
  type BlogArticlePresentationKey,
} from "./presentationDefinitions";
import type { BlogPost } from "./posts";

export type BlogArticleBodyProps = Readonly<{
  post: BlogPost;
}>;

type BlogArticlePresentation = Readonly<{
  Body: ComponentType<BlogArticleBodyProps>;
  className: string;
}>;

const blogArticlePresentations = {
  [blogArticlePresentationDefinitions.antTrail.key]: {
    Body: AntRouteArticle,
    className: blogArticlePresentationDefinitions.antTrail.documentClassName,
  },
  [blogArticlePresentationDefinitions.fossilRecord.key]: {
    Body: DinosaurFossilArticle,
    className: blogArticlePresentationDefinitions.fossilRecord.documentClassName,
  },
} satisfies Record<BlogArticlePresentationKey, BlogArticlePresentation>;

export function getBlogArticlePresentation(key: BlogArticlePresentationKey | undefined) {
  if (!key) {
    return undefined;
  }

  return blogArticlePresentations[key];
}

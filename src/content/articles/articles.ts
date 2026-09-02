import {
  articleMetadata,
  type ArticleMetadata,
  type ArticleSlug,
} from "./manifest.ts";
import type {
  ArticleReference,
  ArticleTemplate,
} from "./articleTemplate.ts";
import selfCriticalPerfectionismTemplate from "./articleTemplates/self-critical-perfectionism.ts";
import whatIsKinkAffirmingTherapyTemplate from "./articleTemplates/what-is-kink-affirming-therapy.ts";

export type Article = Readonly<ArticleMetadata & {
  body: string;
  references: readonly ArticleReference[];
}>;

const articleTemplates = {
  [selfCriticalPerfectionismTemplate.slug]: selfCriticalPerfectionismTemplate,
  [whatIsKinkAffirmingTherapyTemplate.slug]: whatIsKinkAffirmingTherapyTemplate,
} as const satisfies Record<ArticleSlug, ArticleTemplate>;

export const articles: readonly Article[] = articleMetadata.map((article) => ({
  ...article,
  body: articleTemplates[article.slug].body,
  references: articleTemplates[article.slug].references,
}));

export function getArticleBySlug(slug: string | undefined) {
  return articles.find((article) => article.slug === slug);
}

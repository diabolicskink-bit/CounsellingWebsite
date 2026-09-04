import {
  articleMetadata,
  type ArticleMetadata,
  type ArticleSlug,
} from "./manifest.ts";
import type {
  ArticleReference,
  ArticleTemplate,
} from "./articleTemplate.ts";
import kinkAwareTherapyTemplate from "./articleTemplates/kink-aware-therapy.ts";
import selfCriticalPerfectionismTemplate from "./articleTemplates/self-critical-perfectionism.ts";

export type Article = Readonly<ArticleMetadata & {
  body: string;
  references: readonly ArticleReference[];
}>;

const articleTemplates = {
  [kinkAwareTherapyTemplate.slug]: kinkAwareTherapyTemplate,
  [selfCriticalPerfectionismTemplate.slug]: selfCriticalPerfectionismTemplate,
} as const satisfies Record<ArticleSlug, ArticleTemplate>;

export const articles: readonly Article[] = articleMetadata.map((article) => ({
  ...article,
  body: articleTemplates[article.slug].body,
  references: articleTemplates[article.slug].references,
}));

export function getArticleBySlug(slug: string | undefined) {
  return articles.find((article) => article.slug === slug);
}

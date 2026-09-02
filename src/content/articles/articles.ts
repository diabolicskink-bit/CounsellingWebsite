import {
  articleMetadata,
  type ArticleMetadata,
  type ArticleSlug,
} from "./manifest.ts";
import type {
  ArticleReference,
  ArticleTemplate,
} from "./articleTemplate.ts";
import whatIsKinkAffirmingTherapyTemplate from "./articleTemplates/what-is-kink-affirming-therapy.ts";
import howAntColoniesChooseARouteTemplate from "./articleTemplates/how-ant-colonies-choose-a-route.ts";
import whatDinosaurFossilsCanTellUsTemplate from "./articleTemplates/what-dinosaur-fossils-can-tell-us.ts";

export type Article = Readonly<ArticleMetadata & {
  body: string;
  references: readonly ArticleReference[];
}>;

const articleTemplates = {
  [whatIsKinkAffirmingTherapyTemplate.slug]: whatIsKinkAffirmingTherapyTemplate,
  [howAntColoniesChooseARouteTemplate.slug]: howAntColoniesChooseARouteTemplate,
  [whatDinosaurFossilsCanTellUsTemplate.slug]: whatDinosaurFossilsCanTellUsTemplate,
} as const satisfies Record<ArticleSlug, ArticleTemplate>;

export const articles: readonly Article[] = articleMetadata.map((article) => ({
  ...article,
  body: articleTemplates[article.slug].body,
  references: articleTemplates[article.slug].references,
}));

export function getArticleBySlug(slug: string | undefined) {
  return articles.find((article) => article.slug === slug);
}

import type { ArticleSlug } from "./manifest.ts";

export type ArticleReference = Readonly<{
  anchorId?: string;
  citation: string;
  href: string;
}>;

export type ArticleTemplate<Slug extends ArticleSlug = ArticleSlug> = Readonly<{
  body: string;
  references: readonly ArticleReference[];
  slug: Slug;
}>;

export function defineArticleTemplate<const Slug extends ArticleSlug>(
  template: ArticleTemplate<Slug>,
) {
  return template;
}

import type { BlogPostSlug } from "./manifest.ts";

export type BlogPostReference = Readonly<{
  citation: string;
  href: string;
}>;

export type BlogPostTemplate<Slug extends BlogPostSlug = BlogPostSlug> = Readonly<{
  body: string;
  references: readonly BlogPostReference[];
  slug: Slug;
}>;

export function defineBlogPostTemplate<const Slug extends BlogPostSlug>(
  template: BlogPostTemplate<Slug>,
) {
  return template;
}

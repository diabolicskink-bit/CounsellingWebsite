import {
  blogPostMetadata,
  type BlogPostMetadata,
  type BlogPostSlug,
} from "./manifest.ts";
import type {
  BlogPostReference,
  BlogPostTemplate,
} from "./postTemplate.ts";
import whatIsKinkAffirmingTherapyTemplate from "./postTemplates/what-is-kink-affirming-therapy.ts";
import howAntColoniesChooseARouteTemplate from "./postTemplates/how-ant-colonies-choose-a-route.ts";
import whatDinosaurFossilsCanTellUsTemplate from "./postTemplates/what-dinosaur-fossils-can-tell-us.ts";

export type BlogPost = Readonly<BlogPostMetadata & {
  body: string;
  references: readonly BlogPostReference[];
}>;

const blogPostTemplates = {
  [whatIsKinkAffirmingTherapyTemplate.slug]: whatIsKinkAffirmingTherapyTemplate,
  [howAntColoniesChooseARouteTemplate.slug]: howAntColoniesChooseARouteTemplate,
  [whatDinosaurFossilsCanTellUsTemplate.slug]: whatDinosaurFossilsCanTellUsTemplate,
} as const satisfies Record<BlogPostSlug, BlogPostTemplate>;

export const blogPosts: readonly BlogPost[] = blogPostMetadata.map((post) => ({
  ...post,
  body: blogPostTemplates[post.slug].body,
  references: blogPostTemplates[post.slug].references,
}));

export function getBlogPostBySlug(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}

import {
  blogArticlePresentationDefinitions,
  isBlogArticlePresentationKey,
  type BlogArticlePresentationKey,
} from "./presentationDefinitions.ts";

export type BlogPostMetadata = Readonly<{
  abstract: string;
  author: string;
  description: string;
  isSample?: boolean;
  presentation?: BlogArticlePresentationKey;
  publishedAt: string;
  slug: string;
  sourceNote?: string;
  title: string;
  topic: string;
  updatedAt?: string;
}>;

const blogSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const blogDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const blogDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});
const requiredTextFields = [
  "abstract",
  "author",
  "description",
  "slug",
  "title",
  "topic",
] as const satisfies readonly (keyof BlogPostMetadata)[];

const publishedBlogPostMetadata = [
  {
    abstract:
      "Kink-affirming therapy asks what kink means in a person's life without treating it as either the problem or beyond question. That requires knowledge, not just tolerance.",
    author: "Joel Griffiths",
    description:
      "What kink-affirming therapy means in practice, including therapist knowledge, trauma, consent, stigma and the difference between acceptance and competence.",
    publishedAt: "2026-09-01",
    slug: "what-is-kink-affirming-therapy",
    title: "What is kink-affirming therapy?",
    topic: "Kink and BDSM",
  },
  {
    abstract:
      "Ant colonies can concentrate their foraging on one route without a leader choosing it. The result emerges from local signals, reinforcement and correction.",
    author: "Joel Griffiths",
    description:
      "A sample article explaining how ant colonies use local signals, positive feedback and correction to organise a foraging route.",
    isSample: true,
    presentation: blogArticlePresentationDefinitions.antTrail.key,
    publishedAt: "2026-08-12",
    slug: "how-ant-colonies-choose-a-route",
    sourceNote: "Sample article created to demonstrate a subject-specific presentation.",
    title: "How an ant colony chooses a route",
    topic: "Collective behaviour",
  },
  {
    abstract:
      "Bones are only one part of the fossil record. Tracks, nests, skin impressions and surrounding rock can support different claims, while gaps in preservation limit what can be known.",
    author: "Joel Griffiths",
    description:
      "A sample article distinguishing the evidence provided by dinosaur body fossils, trace fossils and geological context from later inference.",
    isSample: true,
    presentation: blogArticlePresentationDefinitions.fossilRecord.key,
    publishedAt: "2026-08-12",
    slug: "what-dinosaur-fossils-can-tell-us",
    sourceNote: "Sample article created to demonstrate a subject-specific presentation.",
    title: "What dinosaur fossils can and cannot tell us",
    topic: "Palaeontology",
  },
] as const satisfies readonly BlogPostMetadata[];

export type BlogPostSlug = (typeof publishedBlogPostMetadata)[number]["slug"];

function isIsoDate(value: string) {
  if (!blogDatePattern.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(parsedDate.valueOf())
    && parsedDate.toISOString().slice(0, 10) === value;
}

export function validateBlogPostManifest(posts: readonly BlogPostMetadata[]) {
  const seenSlugs = new Set<string>();

  for (const post of posts) {
    for (const field of requiredTextFields) {
      const value = post[field];

      if (typeof value !== "string" || !value.trim()) {
        throw new Error(`Blog post ${post.slug || "without a slug"} has an empty ${field}.`);
      }
    }

    if (!blogSlugPattern.test(post.slug)) {
      throw new Error(`Blog post slug must be URL-safe: ${post.slug}`);
    }

    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate blog post slug: ${post.slug}`);
    }

    if (!isIsoDate(post.publishedAt)) {
      throw new Error(`Blog post has an invalid publication date: ${post.slug}`);
    }

    if (post.updatedAt && !isIsoDate(post.updatedAt)) {
      throw new Error(`Blog post has an invalid updated date: ${post.slug}`);
    }

    if (post.updatedAt && post.updatedAt < post.publishedAt) {
      throw new Error(`Blog post updated date precedes its publication date: ${post.slug}`);
    }

    if (post.sourceNote !== undefined && !post.sourceNote.trim()) {
      throw new Error(`Blog post has an empty source note: ${post.slug}`);
    }

    if (post.presentation && !isBlogArticlePresentationKey(post.presentation)) {
      throw new Error(`Blog post has an unknown presentation: ${post.slug}`);
    }

    seenSlugs.add(post.slug);
  }
}

validateBlogPostManifest(publishedBlogPostMetadata);

export const blogPostMetadata: readonly (BlogPostMetadata & { slug: BlogPostSlug })[] = [
  ...publishedBlogPostMetadata,
].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export function getBlogPostPath(slug: string) {
  return `/blog/${slug}`;
}

export function formatBlogDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function getBlogRouteMetadata() {
  return Object.fromEntries(
    blogPostMetadata.map((post) => [
      getBlogPostPath(post.slug),
      {
        abstract: post.abstract,
        articleSection: post.topic,
        authorName: post.author,
        description: post.description,
        headline: post.title,
        lastModified: post.updatedAt ?? post.publishedAt,
        modifiedAt: post.updatedAt ?? post.publishedAt,
        pageType: "article" as const,
        publishedAt: post.publishedAt,
        robots: post.isSample ? "noindex, nofollow" : undefined,
        title: `${post.title} | Vive Counselling`,
      },
    ]),
  );
}

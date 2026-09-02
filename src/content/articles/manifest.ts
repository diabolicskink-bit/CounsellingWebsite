export type ArticlePresentationKey = "ant-trail" | "fossil-record";

export type ArticleMetadata = Readonly<{
  abstract: string;
  author: string;
  description: string;
  isSample?: boolean;
  presentation?: ArticlePresentationKey;
  publishedAt: string;
  slug: string;
  sourceNote?: string;
  title: string;
  topic: string;
  updatedAt?: string;
}>;

const articleSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const articleDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const articleDateFormatter = new Intl.DateTimeFormat("en-AU", {
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
] as const satisfies readonly (keyof ArticleMetadata)[];

const publishedArticleMetadata = [
  {
    abstract:
      "Good intentions are not enough for kink-affirming therapy. A therapist needs to understand BDSM well enough to explore what it means without mistaking consensual power for pathology or overlooking genuine harm.",
    author: "Joel Griffiths",
    description:
      "What kink-affirming therapy means in practice, including therapist knowledge, trauma, consent, stigma and the difference between acceptance and competence.",
    publishedAt: "2026-09-01",
    slug: "what-is-kink-affirming-therapy",
    title: "What Is Kink-Affirming Therapy?",
    topic: "Kink and BDSM",
  },
  {
    abstract:
      "Ant colonies can concentrate their foraging on one route without a leader choosing it. The result emerges from local signals, reinforcement and correction.",
    author: "Joel Griffiths",
    description:
      "A sample article explaining how ant colonies use local signals, positive feedback and correction to organise a foraging route.",
    isSample: true,
    presentation: "ant-trail",
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
    presentation: "fossil-record",
    publishedAt: "2026-08-12",
    slug: "what-dinosaur-fossils-can-tell-us",
    sourceNote: "Sample article created to demonstrate a subject-specific presentation.",
    title: "What dinosaur fossils can and cannot tell us",
    topic: "Palaeontology",
  },
] as const satisfies readonly ArticleMetadata[];

export type ArticleSlug = (typeof publishedArticleMetadata)[number]["slug"];

function isIsoDate(value: string) {
  if (!articleDatePattern.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(parsedDate.valueOf())
    && parsedDate.toISOString().slice(0, 10) === value;
}

export function validateArticleManifest(articles: readonly ArticleMetadata[]) {
  const seenSlugs = new Set<string>();

  for (const article of articles) {
    for (const field of requiredTextFields) {
      const value = article[field];

      if (typeof value !== "string" || !value.trim()) {
        throw new Error(`Article ${article.slug || "without a slug"} has an empty ${field}.`);
      }
    }

    if (!articleSlugPattern.test(article.slug)) {
      throw new Error(`Article slug must be URL-safe: ${article.slug}`);
    }

    if (seenSlugs.has(article.slug)) {
      throw new Error(`Duplicate article slug: ${article.slug}`);
    }

    if (!isIsoDate(article.publishedAt)) {
      throw new Error(`Article has an invalid publication date: ${article.slug}`);
    }

    if (article.updatedAt && !isIsoDate(article.updatedAt)) {
      throw new Error(`Article has an invalid updated date: ${article.slug}`);
    }

    if (article.updatedAt && article.updatedAt < article.publishedAt) {
      throw new Error(`Article updated date precedes its publication date: ${article.slug}`);
    }

    if (article.sourceNote !== undefined && !article.sourceNote.trim()) {
      throw new Error(`Article has an empty source note: ${article.slug}`);
    }

    seenSlugs.add(article.slug);
  }
}

validateArticleManifest(publishedArticleMetadata);

export const articleMetadata: readonly (ArticleMetadata & { slug: ArticleSlug })[] = [
  ...publishedArticleMetadata,
].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export function getArticlePath(slug: string) {
  return `/articles/${slug}`;
}

export function formatArticleDate(date: string) {
  return articleDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function getArticleRouteMetadata() {
  return Object.fromEntries(
    articleMetadata.map((article) => [
      getArticlePath(article.slug),
      {
        abstract: article.abstract,
        articleSection: article.topic,
        authorName: article.author,
        description: article.description,
        headline: article.title,
        lastModified: article.updatedAt ?? article.publishedAt,
        modifiedAt: article.updatedAt ?? article.publishedAt,
        pageType: "article" as const,
        publishedAt: article.publishedAt,
        robots: article.isSample ? "noindex, nofollow" : undefined,
        title: `${article.title} | Vive Counselling`,
      },
    ]),
  );
}

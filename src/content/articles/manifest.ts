export type ArticlePresentationKey = "self-critical-perfectionism";

export type ArticleMetadata = Readonly<{
  abstract: string;
  author: string;
  description: string;
  isSample?: boolean;
  metaTitle?: string;
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
      "Self-critical perfectionism turns ordinary standards into tests of personal worth. Understanding what the pattern is protecting you from can make change possible.",
    author: "Joel Griffiths",
    description:
      "Self-critical perfectionism is more than high standards. Learn how fear of mistakes and harsh self-judgement develop, persist and can change.",
    metaTitle: "Self-Critical Perfectionism | Vive Counselling",
    presentation: "self-critical-perfectionism",
    publishedAt: "2026-09-02",
    slug: "self-critical-perfectionism",
    title: "Self-Critical Perfectionism: When Nothing Feels Good Enough",
    topic: "Perfectionism",
  },
  {
    abstract:
      "Kink-aware therapy requires more than accepting attitudes. A therapist needs to understand BDSM well enough to explore what it means without mistaking consensual power for pathology or overlooking genuine harm.",
    author: "Joel Griffiths",
    description:
      "What is kink-aware therapy? Learn how informed counselling approaches BDSM, consent, trauma, power exchange and relationships without pathologising kink.",
    metaTitle: "Kink-Aware Therapy & Counselling | Vive Counselling",
    publishedAt: "2026-08-26",
    slug: "kink-aware-therapy",
    title: "What Is Kink-Aware Therapy?",
    topic: "Kink and BDSM",
    updatedAt: "2026-09-04",
  },
] as const satisfies readonly ArticleMetadata[];

export type ArticleSlug = (typeof publishedArticleMetadata)[number]["slug"];

export const articleRedirects = [
  {
    fromSlug: "kink-affirming-therapy",
    toSlug: "kink-aware-therapy",
  },
] as const satisfies readonly Readonly<{
  fromSlug: string;
  toSlug: ArticleSlug;
}>[];

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

    if (article.metaTitle !== undefined && !article.metaTitle.trim()) {
      throw new Error(`Article has an empty meta title: ${article.slug}`);
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
        title: article.metaTitle ?? `${article.title} | Vive Counselling`,
      },
    ]),
  );
}

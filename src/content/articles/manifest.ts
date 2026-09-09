export type ArticlePresentationKey = never;

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
      "Self-critical perfectionism makes achievement a test of personal worth, so even success may do little to resolve a sense of inadequacy. This article examines the research on its emotional and relational costs, its connection with depression, and how therapy can help change the conditions people place on their worth.",
    author: "Joel Griffiths",
    description:
      "Research on self-critical perfectionism, depression and relationships, including why achievement may never feel enough and how therapy can help.",
    metaTitle: "Self-Critical Perfectionism | Vive Counselling",
    publishedAt: "2026-09-09",
    slug: "self-critical-perfectionism",
    title: "Self-critical perfectionism and the cost of conditional self-worth",
    topic: "Perfectionism",
  },
  {
    abstract:
      "Discussing kink in therapy takes more than an accepting response. Informed counselling can help when shame, consent, trauma or changing desires are difficult to talk about. Knowing what that involves can help you choose a therapist.",
    author: "Joel Griffiths",
    description:
      "What kink-aware therapy involves, how counselling approaches BDSM, consent, trauma and shame, and questions to ask when choosing a therapist.",
    metaTitle: "Kink-Aware Therapy & Counselling | Vive Counselling",
    publishedAt: "2026-08-26",
    slug: "kink-aware-therapy",
    title: "What Is Kink-Aware Therapy?",
    topic: "Kink and BDSM",
    updatedAt: "2026-09-09",
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

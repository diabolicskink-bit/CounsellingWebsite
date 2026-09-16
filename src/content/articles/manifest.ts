export type ArticleMetadata = Readonly<{
  abstract: string;
  author: string;
  description: string;
  metaTitle?: string;
  publishedAt: string;
  slug: string;
  sourceNote?: string;
  title: string;
  topic: string;
  updatedAt?: string;
}>;

export const urlSafeArticleTokenPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
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
      "Mental health difficulties among sex workers are bound up with working conditions, earlier experiences, financial insecurity and stigma. Accessing care can bring further difficulties when practitioners assume that the occupation explains the distress or that leaving should be the goal of treatment. Effective support requires an understanding of what the person is struggling with, the circumstances sustaining it and the changes they want to make. This includes being able to discuss harm without having their entire working life defined by it.",
    author: "Joel Griffiths",
    description:
      "How stigma, working conditions and financial pressure shape sex workers' mental health and access to care, and what respectful counselling can offer.",
    metaTitle: "Sex Work and Access to Mental Health Care",
    publishedAt: "2026-09-16",
    slug: "sex-work-and-access-to-mental-health-care",
    title: "Sex work and access to mental health care",
    topic: "Sex work",
  },
  {
    abstract:
      "People choose ethical non-monogamy for sexual exploration, emotional connection, autonomy and relationships that fit their values. The appeal can also involve feeling desired, accommodating differences between partners or hoping to resolve existing difficulties. Drawing on research into non-monogamy, dating and relationship psychology, this article examines what people hope to find in ENM, how self-worth can shape the pursuit of new connections, and when agreement reflects pressure or fear of losing a partner. Understanding these motives can help people make sense of their own wishes and a partner’s interest in non-monogamy.",
    author: "Joel Griffiths",
    description:
      "Why do people want open relationships or polyamory? The psychology behind ethical non-monogamy, from sexual exploration to connection and self-worth.",
    metaTitle: "Why People Choose Non-Monogamy | The Psychology of ENM",
    publishedAt: "2026-09-09",
    slug: "why-people-choose-ethical-non-monogamy",
    title: "Why people choose ethical non-monogamy",
    topic: "Ethical non-monogamy",
  },
  {
    abstract:
      "Self-critical perfectionism can leave people feeling inadequate despite substantial achievement. Mistakes become judgments of personal worth, while success brings only temporary reassurance. Research links this pattern with depression, burnout, procrastination and difficulties in relationships. Understanding how these standards develop and what keeps them in place helps explain why reassurance often falls short. Therapy can address both the habits that maintain perfectionism and the fear of what being imperfect would mean.",
    author: "Joel Griffiths",
    description:
      "Why success can still leave you feeling inadequate. Self-critical perfectionism, its links with depression and burnout, and how therapy can help.",
    metaTitle: "Self-Critical Perfectionism | Never Feeling Good Enough",
    publishedAt: "2026-09-02",
    slug: "self-critical-perfectionism",
    title: "Self-critical perfectionism and the cost of conditional self-worth",
    topic: "Perfectionism",
  },
  {
    abstract:
      "Kink-aware therapy brings an understanding of BDSM and consensual power exchange to counselling. Drawing on research into mental health, attachment and sexual trauma, this article examines what people find rewarding about kink, how shame and stigma affect access to therapy, and why abuse within kink relationships can be difficult to disclose. It considers how therapists can address these concerns without assuming that a person’s sexual interests are the source of their difficulties.",
    author: "Joel Griffiths",
    description:
      "What research tells us about BDSM and mental health, and how kink-aware therapy approaches shame, consent and discussing sexual trauma in counselling.",
    metaTitle: "Kink-Aware Therapy and the Psychology of BDSM",
    publishedAt: "2026-08-26",
    slug: "kink-aware-therapy",
    title: "Kink-Aware Therapy and the Psychology of BDSM",
    topic: "Kink and BDSM",
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

    if (!urlSafeArticleTokenPattern.test(article.slug)) {
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

// Shared by the prerendered route metadata and the client-side article route so a
// direct visit and an in-app navigation always agree on the same title.
export function getArticleDocumentMetadata(article: ArticleMetadata) {
  return {
    description: article.description,
    title: article.metaTitle ?? `${article.title} | Vive Counselling`,
  };
}

export function getArticleRouteMetadata() {
  return Object.fromEntries(
    articleMetadata.map((article) => {
      const { description, title } = getArticleDocumentMetadata(article);
      const lastModifiedAt = article.updatedAt ?? article.publishedAt;

      return [
        getArticlePath(article.slug),
        {
          abstract: article.abstract,
          articleSection: article.topic,
          authorName: article.author,
          description,
          headline: article.title,
          lastModified: lastModifiedAt,
          modifiedAt: lastModifiedAt,
          pageType: "article" as const,
          publishedAt: article.publishedAt,
          title,
        },
      ];
    }),
  );
}

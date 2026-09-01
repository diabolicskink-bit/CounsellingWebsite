import type { BlogPostReference } from "./postTemplate.ts";

export type BlogReferenceValidationPost = Readonly<{
  body: string;
  references: readonly BlogPostReference[];
  slug: string;
}>;

type ReferenceIdentity = Readonly<{
  leadAuthor: string;
  year: string;
}>;

const apaDatePattern = /\(((?:\d{4}[a-z]?|n\.d\.)(?:,\s*[^)]+)?)\)\./u;
const citationYearPattern = /(?:\d{4}[a-z]?|n\.d\.)/u;
const doiPattern = /10\.\d{4,9}\/[^\s?#&]+/iu;
const markdownMarkerPattern = /[*_`]/gu;
const trackingParameterPattern = /^(?:fbclid|gclid|utm_.+)$/iu;
const referenceCollator = new Intl.Collator("en-AU", {
  ignorePunctuation: true,
  numeric: true,
  sensitivity: "base",
});

function normalizeCitationForSort(citation: string) {
  return citation
    .replace(markdownMarkerPattern, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function normalizeDoi(value: string) {
  return value.replace(/[.,;:]+$/u, "").toLowerCase();
}

function extractDoi(value: string) {
  try {
    const match = decodeURIComponent(value).match(doiPattern);
    return match ? normalizeDoi(match[0]) : null;
  } catch {
    return null;
  }
}

function extractReferenceIdentity(citation: string): ReferenceIdentity | null {
  const dateMatch = citation.match(apaDatePattern);

  if (!dateMatch || dateMatch.index === undefined) {
    return null;
  }

  const authorText = citation
    .slice(0, dateMatch.index)
    .trim()
    .replace(/\.$/u, "");
  const year = dateMatch[1].match(citationYearPattern)?.[0];

  if (!authorText || !year) {
    return null;
  }

  const firstComma = authorText.indexOf(",");
  const leadAuthor = (firstComma >= 0 ? authorText.slice(0, firstComma) : authorText).trim();

  return leadAuthor ? { leadAuthor, year } : null;
}

function getCitedYears(body: string, leadAuthor: string) {
  const author = escapeRegExp(leadAuthor);
  const year = "(\\d{4}[a-z]?|n\\.d\\.)";
  const pattern = new RegExp(
    `\\b${author}(?:\\s+et\\s+al\\.)?(?:\\s+(?:and|&)\\s+[\\p{L}\\p{M}][\\p{L}\\p{M} .’'’-]*)?\\s*(?:,\\s*|\\(\\s*)${year}`,
    "giu",
  );

  return [...body.matchAll(pattern)].map((match) => match[1]);
}

function validateHref(
  href: string,
  label: string,
  issues: string[],
) {
  if (href !== href.trim()) {
    issues.push(`${label} has whitespace around its source URL.`);
    return null;
  }

  let url: URL;

  try {
    url = new URL(href);
  } catch {
    issues.push(`${label} has an invalid source URL.`);
    return null;
  }

  if (url.protocol !== "https:") {
    issues.push(`${label} must use an HTTPS source URL.`);
  }

  if (url.username || url.password) {
    issues.push(`${label} must not include credentials in its source URL.`);
  }

  if (url.hash) {
    issues.push(`${label} must not include a URL fragment.`);
  }

  for (const parameter of url.searchParams.keys()) {
    if (trackingParameterPattern.test(parameter)) {
      issues.push(`${label} must not include tracking parameters.`);
      break;
    }
  }

  const doi = extractDoi(href);

  if (doi) {
    if (url.hostname.toLowerCase() !== "doi.org") {
      issues.push(`${label} must use the canonical https://doi.org/ DOI URL.`);
    } else if (
      url.search
      || url.hash
      || url.pathname.length <= 1
      || normalizeDoi(decodeURIComponent(url.pathname.slice(1))) !== doi
    ) {
      issues.push(`${label} has a malformed DOI URL.`);
    }
  } else if (url.hostname.toLowerCase() === "doi.org") {
    issues.push(`${label} has a malformed DOI URL.`);
  }

  return doi;
}

export function sortBlogPostReferences<Reference extends BlogPostReference>(
  references: readonly Reference[],
): Reference[] {
  return [...references].sort((left, right) => referenceCollator.compare(
    normalizeCitationForSort(left.citation),
    normalizeCitationForSort(right.citation),
  ));
}

export function getBlogReferenceIssues(
  posts: readonly BlogReferenceValidationPost[],
): string[] {
  const issues: string[] = [];

  for (const post of posts) {
    const identities = new Map<string, Set<string>>();
    const seenDois = new Set<string>();
    const seenHrefs = new Set<string>();

    post.references.forEach((reference, index) => {
      const label = `${post.slug} reference ${index + 1}`;
      const citation = reference.citation;

      if (!citation.trim()) {
        issues.push(`${label} has an empty citation.`);
        return;
      }

      if (citation !== citation.trim()) {
        issues.push(`${label} has whitespace around its citation.`);
      }

      if (/\r|\n/u.test(citation)) {
        issues.push(`${label} must remain one logical line; the editor wraps it visually.`);
      }

      const terminalCitationText = citation.replace(markdownMarkerPattern, "").trim();

      if (!/[.?!]$/u.test(terminalCitationText)) {
        issues.push(`${label} must end its APA citation text with terminal punctuation.`);
      }

      if (/https?:\/\/|\bdoi\s*:/iu.test(citation)) {
        issues.push(`${label} duplicates its DOI or source URL inside the citation text.`);
      }

      const identity = extractReferenceIdentity(citation);

      if (!identity) {
        issues.push(`${label} needs an APA author and date boundary such as Author. (2023).`);
      } else {
        const authorKey = identity.leadAuthor.toLocaleLowerCase("en-AU");
        const years = identities.get(authorKey) ?? new Set<string>();
        years.add(identity.year.toLowerCase());
        identities.set(authorKey, years);
      }

      if (!reference.href) {
        issues.push(`${label} needs a DOI or stable source URL.`);
        return;
      }

      const doi = validateHref(reference.href, label, issues);
      const normalizedHref = reference.href.toLowerCase();

      if (seenHrefs.has(normalizedHref)) {
        issues.push(`${label} duplicates another source URL in this article.`);
      }
      seenHrefs.add(normalizedHref);

      if (doi) {
        if (seenDois.has(doi)) {
          issues.push(`${label} duplicates another DOI in this article.`);
        }
        seenDois.add(doi);
      }
    });

    const sortedReferences = sortBlogPostReferences(post.references);
    const isSorted = post.references.every(
      (reference, index) => reference === sortedReferences[index],
    );

    if (!isSorted) {
      issues.push(`${post.slug} references must be ordered alphabetically.`);
    }

    for (const [authorKey, referenceYears] of identities) {
      const identity = post.references
        .map((reference) => extractReferenceIdentity(reference.citation))
        .find((candidate) => candidate?.leadAuthor.toLocaleLowerCase("en-AU") === authorKey);

      if (!identity) {
        continue;
      }

      for (const citedYear of getCitedYears(post.body, identity.leadAuthor)) {
        if (!referenceYears.has(citedYear.toLowerCase())) {
          issues.push(
            `${post.slug} cites ${identity.leadAuthor} (${citedYear}) but its reference year does not match.`,
          );
        }
      }
    }
  }

  return issues;
}

export function assertValidBlogReferences(
  posts: readonly BlogReferenceValidationPost[],
) {
  const issues = getBlogReferenceIssues(posts);

  if (issues.length > 0) {
    throw new Error(`Invalid blog references:\n- ${issues.join("\n- ")}`);
  }
}

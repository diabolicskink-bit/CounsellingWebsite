import assert from "node:assert/strict";
import { test } from "node:test";
import { blogPosts } from "../../src/content/blog/posts.ts";
import {
  assertValidBlogReferences,
  getBlogReferenceIssues,
  sortBlogPostReferences,
} from "../../src/content/blog/referenceValidation.ts";

function makePost(references, body = "") {
  return [{ body, references, slug: "reference-test" }];
}

const journalReference = {
  citation: `Smith, A. A. (2023). A useful article. *Example Journal, 4*(2), 10–20.`,
  href: "https://doi.org/10.1234/example.2023.1",
};

test("accepts every current article reference set", () => {
  assert.doesNotThrow(() => assertValidBlogReferences(blogPosts));
});

test("sorts references using their APA citation text", () => {
  const references = [
    {
      citation: `Žoric, A. (2022). Final source. *Example Journal, 2*(1), 2–3.`,
      href: "https://doi.org/10.1234/zoric",
    },
    {
      citation: `Adams, B. (2021). First source. *Example Journal, 1*(1), 1–2.`,
      href: "https://doi.org/10.1234/adams",
    },
  ];

  assert.equal(sortBlogPostReferences(references)[0].citation, references[1].citation);
  assert.match(getBlogReferenceIssues(makePost(references)).join("\n"), /ordered alphabetically/);
});

test("rejects malformed, duplicated, or noncanonical source links", () => {
  const references = [
    {
      citation: `Adams, A. (2020). First source. *Example Journal, 1*(1), 1–2.`,
      href: "http://doi.org/10.1234/DUPLICATE",
    },
    {
      citation: `Brown, B. (2021). Second source. *Example Journal, 2*(1), 3–4.`,
      href: "https://publisher.example/article?id=10.1234/duplicate&utm_source=test",
    },
    {
      citation: `Clark, C. (2022). Third source. *Example Journal, 3*(1), 5–6.`,
      href: "https://user:secret@example.com/source#details",
    },
  ];
  const issues = getBlogReferenceIssues(makePost(references)).join("\n");

  assert.match(issues, /HTTPS source URL/);
  assert.match(issues, /canonical https:\/\/doi\.org/);
  assert.match(issues, /tracking parameters/);
  assert.match(issues, /duplicates another DOI/);
  assert.match(issues, /credentials/);
  assert.match(issues, /URL fragment/);
});

test("keeps DOI and URL text out of the formatted citation", () => {
  const issues = getBlogReferenceIssues(makePost([{
    ...journalReference,
    citation: `${journalReference.citation} https://doi.org/10.1234/example.2023.1`,
  }])).join("\n");

  assert.match(issues, /duplicates its DOI or source URL/);
});

test("requires an APA author-date boundary, terminal punctuation, and a source", () => {
  const issues = getBlogReferenceIssues(makePost([{
    citation: "A loose source label",
    href: "",
  }])).join("\n");

  assert.match(issues, /APA author and date boundary/);
  assert.match(issues, /terminal punctuation/);
  assert.match(issues, /needs a DOI or stable source URL/);
});

test("checks common parenthetical, narrative, and corporate citation years", () => {
  const references = [
    {
      citation: `American Psychiatric Association. (2022). *A diagnostic manual*.`,
      href: "https://doi.org/10.1234/manual",
    },
    {
      citation: `Holvoet, L., Example, A., & Example, B. (2017). A population study. *Example Journal, 1*(1), 1–2.`,
      href: "https://doi.org/10.1234/holvoet",
    },
    {
      citation: `Wismeijer, A. A. J., & van Assen, M. A. L. M. (2013). A practitioner study. *Example Journal, 2*(1), 3–4.`,
      href: "https://doi.org/10.1234/wismeijer",
    },
  ];
  const matchingBody = [
    "The manual remains relevant (American Psychiatric Association, 2022).",
    "Population evidence is available (Holvoet et al., 2017).",
    "Wismeijer and van Assen (2013) reported a comparison.",
  ].join("\n\n");

  assert.deepEqual(getBlogReferenceIssues(makePost(references, matchingBody)), []);

  const mismatchedBody = matchingBody.replace("Holvoet et al., 2017", "Holvoet et al., 2018");
  assert.match(
    getBlogReferenceIssues(makePost(references, mismatchedBody)).join("\n"),
    /cites Holvoet \(2018\) but its reference year does not match/,
  );
});

test("allows the same DOI in different articles", () => {
  const posts = [
    { body: "", references: [journalReference], slug: "first" },
    { body: "", references: [journalReference], slug: "second" },
  ];

  assert.deepEqual(getBlogReferenceIssues(posts), []);
});

# Articles

Use the authoring section when drafting or revising prose, and the implementation section when saving, registering or publishing it. [Writing](WRITING.md) owns the shared editorial policy; [AGENTS.md](../../AGENTS.md) owns authorization to edit and release.

## Writing An Article

Use this guide when drafting or revising an article for Vive. The shared
[writing policy](WRITING.md) and repository
[copywriter skill](../../.agents/skills/copywriter/SKILL.md) apply to the prose.
The [implementation section](#implementing-and-publishing) covers saving and publication in the website.

### Purpose and treatment

Let the subject and current brief determine what the article explores, explains
or argues, and how it develops. Articles can support the practice through
useful, interesting writing. Include references to Joel's work or an invitation
to enquire where they contribute to the article.

### Tone and style

The owner's intended style is a blend of postgraduate research paper writing
and a compelling blog article. Combine intellectual depth, precise concepts
and a developed argument with readable prose, human relevance and a reason
to keep reading.

Write with a thoughtful, assured and approachable voice. Trust the reader's
intelligence while explaining concepts without assuming specialist training.
Retain terminology that adds precision and make its meaning clear in the
prose. Joel's perspective can give the article an authorial voice alongside
the research.

Develop a connected line of thought. Bring findings together, explain how
ideas relate and draw out why they matter. Select study details and statistics
for what they help the reader understand. The academic quality comes from the
reasoning and depth of understanding; it does not require an exhaustive account
of each paper or a qualification after every point.

Keep the subject engaging through recognisable situations, useful questions,
concrete examples and explanations that build on one another. Give paragraphs
room to develop an idea and vary sentence rhythm naturally. Choose openings,
headings and transitions that carry this particular article forward. A
compelling treatment can be serious and reflective, with warmth and interest
coming from attention to the subject and the people it concerns.

Current articles can be consulted for examples of this blend. Assess their
individual strengths against the brief; their wording, structure and density
are not a template for every new article.

### Evidence and attribution

Check consequential factual claims, including clinical or legal claims,
research findings and statistics, against appropriate sources.
Prefer primary sources when reporting research, and distinguish findings from
Joel's perspective or the article's interpretation. Explain uncertainty or
limitations where they affect the conclusion being drawn.

Cite sources where they materially support the article. The subject and claims
determine the evidence needed; an article does not require research citations
simply because it is an article.

Do not use client material, even when names or surface details are changed.
Acknowledge an article's origin or adaptation when readers need that context.

### Citations and references

Use APA 7 for article reference lists, with entries ordered alphabetically.
Check bibliographic details against the sources and keep in-text author and
year details consistent with the reference list. Include the DOI or a stable
source link for each entry. When citations link to reference entries, check
that each link reaches the intended source.

The publishing guide's [reference fields](ARTICLES.md#reference-fields)
section explains how citations and source links are stored in article templates.


## Implementing And Publishing

The Vive Articles section is a code-managed, statically prerendered publishing system. It does not use a CMS, database, login, or separate build process. The canonical public route is `/articles`, matching the shared navigation and visible page labels.

For drafting, evidence and citation conventions, use [Writing An Article](#writing-an-article). This section covers adding, editing and publishing articles in the application.

### Add An Article

Add one `ArticleMetadata`-compatible object to `publishedArticleMetadata` in `src/content/articles/manifest.ts`:

```ts
{
  abstract: "A concise account of the article's question and argument.",
  author: "Joel Griffiths",
  description: "A specific search and social description for the article.",
  metaTitle: "An optional shorter browser and search title | Vive Counselling",
  publishedAt: "YYYY-MM-DD",
  slug: "lowercase-url-safe-slug",
  title: "The public article title",
  topic: "A short subject classification",
}
```



Create one matching `ArticleTemplate` module at `src/content/articles/articleTemplates/<slug>.ts`:

```ts
import { defineArticleTemplate } from "../articleTemplate.ts";

export default defineArticleTemplate({
  slug: "the-same-manifest-slug",
  body: `The article introduction begins here.

## The first section

The article continues in Markdown.`,
  references: [
    {
      anchorId: "author-2026",
      citation: `One complete reference, with *Markdown emphasis* when useful.`,
      href: "https://example.com/source",
    },
  ],
});
```

Import that template in `src/content/articles/articles.ts` and add it to `articleTemplates`. The typed registry must contain exactly one template for every manifest slug. The manifest stays deliberately lightweight because shared metadata and analytics use it on every public route; article bodies and Markdown rendering load only when someone opens an individual article.

Keep the public title in the manifest rather than repeating it as a Markdown H1. Put only the article body in `body`. Put each complete bibliography entry in the ordered `references` array rather than adding a References heading to the body; use an empty array when an article has no sources. See [Reference Fields](#reference-fields) for entry storage and citation links.

### Development Editor

During local Vite development, `/article-editor` provides a deliberately simple content editor for existing templates. It presents paragraphs, headings, lists, quotations, tables and code as wrapped auto-height editing blocks, so ordinary Markdown paragraph separators do not appear as empty source lines. Inline Markdown remains visible. Select body text and use the Bold control or `Ctrl/Cmd+B` to add or remove Markdown bold markers; using the control without a selection inserts an empty bold pair ready for typing. Its References section edits the structured citation and source URL separately and can add, remove, or alphabetise entries. Existing citation anchor IDs remain attached to their references when the editor saves or reorders them. Saving rewrites that article's small content template from its body and complete reference list in one consistent format.

The editor does not change titles, metadata or template registration. Those remain typed source changes. Its save endpoint exists only in the Vite development server, accepts allowlisted article slugs, and refuses non-localhost requests; production builds contain neither the route nor a write endpoint.

### Reference Fields

Format references according to [ARTICLES.md](ARTICLES.md#citations-and-references). Put the formatted citation and any Markdown italics in `citation`, and put the canonical DOI URL or a stable source page in `href` rather than repeating it inside the citation. When in-text citations link to the reference ledger, give each referenced source a unique, lowercase, URL-safe `anchorId` based on its author and year rather than its list position, then link to `#article-reference-<anchorId>` from the body Markdown. Verify that each citation link resolves to its intended entry.

### Publication Dates and Source Notes

Use `updatedAt` only after a substantive published revision. Keep the original `publishedAt` value.

Use `sourceNote` for a short acknowledgement of an article's origin or adaptation when appropriate. Keep inline citations in the body and the corresponding entries in the template's `references` array.

### Article Presentation

The index shows each article's description as a short preview.

Every article uses the same publication shell and renders ordinary Markdown, including headings, lists, quotations, tables, emphasis, and links. Its article-owned reading layout uses a centred continuous column, compact paragraph leading, and level-two headings directly above their sections with a controlled transition rather than the public site's general reading and section rhythm. Use site-root paths such as `/working-with-joel` for internal links and complete `https://` URLs for external sources.

When a template's `references` array is non-empty, the dedicated references component renders the ordered set as a wider source ledger with a source count, compact typography, ruled entries, APA-style hanging indents, and visible DOI or source URLs that remain readable at narrow widths. Each citation accepts inline Markdown, including emphasis. The component controls structure and presentation; authors supply the formatted entries in their intended order.

`src/pages/articles/ArticleHero.tsx` is the supported reusable hero template for every published article. It owns the single eyebrow-styled breadcrumb, title, abstract, author, dates, and responsive composition; its `.article-hero*` presentation lives with the other supported component styles in `src/design-system/components.css`. `src/pages/articles/ArticlePage.tsx` owns the publication note and return navigation around the body. The hero composes the supported `.site-hero`, `.site-hero__eyebrow`, `.site-hero__statement`, and `.site-hero-surface` roles while retaining its article-specific grid and metadata presentation. This keeps article orientation and publication details consistent across the section.

There is no per-article body presentation mechanism. An article that genuinely needs a different information form is a deliberate design change to the shared shell, not a registry entry.

### What The Build Does

`src/content/articles/manifest.ts` is the authoritative publication manifest. It:

- validates required metadata, URL-safe unique slugs, real ISO dates, and revision ordering;
- sorts entries newest first;
- supplies the `/articles/:slug` route;
- generates article metadata for the prerenderer and analytics; and
- adds indexable articles and their publication or revision date to the sitemap.

`src/content/articles/articles.ts` pairs each manifest entry with its typed content template. Type checking fails when a manifest slug has no matching template or a template declares an unknown slug. Browser builds lazy-load the Articles pages, while the server build keeps their synchronous components available so every article body and reference set remain present in the prerendered first response.

`npm run build` fails if a generated article route cannot be rendered or its expected article structure is missing. Local tests protect article/reference integrity, editor round trips and safe template writes. The browser suite covers representative public journeys; it does not pin article copy, layout or structured-data graph shape. Routine publication does not require new regression tests. The subject classification remains separate as the article section because the site has no subject archive routes.

### Publishing Boundaries

- Treat every object in `publishedArticleMetadata` as publicly viewable. There is no draft flag or scheduled-release state.
- Apply [ARTICLES.md](ARTICLES.md#writing-an-article) for article content, evidence, client-material boundaries and references, alongside the shared [writing policy](WRITING.md).
- As an explicit publication gate, run `npm run qa:site` before publishing a new article. Inspect the index and article at narrow and wide widths when new content introduces shapes not already represented.

### When A CMS Becomes Worthwhile

The current model is intentionally small. Consider a CMS only when Joel needs to publish without a code change, schedule articles, manage drafts or multiple authors, upload article-specific media, or maintain a materially larger archive. A future CMS should preserve the canonical `/articles/:slug` URLs and metadata contract.

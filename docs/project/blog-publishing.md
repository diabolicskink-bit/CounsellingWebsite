# Article Publishing

The Vive Articles section is a code-managed, statically prerendered publishing system. It does not use a CMS, database, login, or separate build process. The public route remains `/blog` for continuity, while shared navigation and visible page labels use Articles.

## Add An Article

Add one object to `publishedBlogPostMetadata` in `src/content/blog/manifest.ts`:

```ts
{
  abstract: "A concise account of the article's question and argument.",
  author: "Joel Griffiths",
  description: "A specific search and social description for the article.",
  publishedAt: "YYYY-MM-DD",
  slug: "lowercase-url-safe-slug",
  title: "The public article title",
  topic: "A short subject classification",
}
```

Create one matching content template at `src/content/blog/postTemplates/<slug>.ts`:

```ts
import { defineBlogPostTemplate } from "../postTemplate.ts";

export default defineBlogPostTemplate({
  slug: "the-same-manifest-slug",
  body: `The article introduction begins here.

## The first section

The article continues in Markdown.`,
  references: [
    {
      citation: `One complete reference, with *Markdown emphasis* when useful.`,
      href: "https://example.com/source",
    },
  ],
});
```

Import that template in `src/content/blog/posts.ts` and add it to `blogPostTemplates`. The typed registry must contain exactly one template for every manifest slug. The manifest stays deliberately lightweight because shared metadata and analytics use it on every public route; article bodies and Markdown rendering load only when someone enters the Articles section.

Keep the public title in the manifest rather than repeating it as a Markdown H1. Put only the article body in `body`. Put each complete bibliography entry in the ordered `references` array rather than adding a References heading to the body; use an empty array when an article has no sources. Format every source in APA 7 style, order entries alphabetically, store the formatted reference text and Markdown italics in `citation`, and store the canonical DOI URL or a stable source destination separately in `href`.

## Development Editor

During local Vite development, `/article-editor` provides a deliberately simple content editor for existing templates. It presents paragraphs, headings, lists, quotations, tables and code as wrapped auto-height editing blocks, so ordinary Markdown paragraph separators do not appear as empty source lines. Inline Markdown remains visible. Its References section edits the structured citation and source URL separately and can add, remove, or alphabetise entries. Saving rewrites that article's small content template from its body and complete reference list in one consistent format.

The editor does not change titles, metadata, template registration or custom presentations. Those remain typed source changes. Its save endpoint exists only in the Vite development server, accepts allowlisted article slugs, and refuses non-localhost requests; production builds contain neither the route nor a write endpoint.

## Reference Convention

Use APA 7 for every article reference list. Keep entries alphabetical, put the formatted citation and any Markdown italics in `citation`, and put the canonical DOI URL or a stable source page in `href` rather than repeating it inside the citation. Before publishing, check the bibliographic details against the source and make sure in-text author and year details agree with the reference list.

Use `updatedAt` only after a substantive published revision. Keep the original `publishedAt` value.

Use `sourceNote` when readers should know where the article came from or how it was adapted. Graduate Diploma coursework is one possible source, not the organising identity of the section. State the note narrowly, for example: `Adapted from Graduate Diploma coursework and revised for a general audience.` Keep inline citations in the body and add the corresponding entries to the template's `references` array when sources materially support the article.

Set `isSample: true` only for temporary demonstration content. Samples are visible from the index but receive `noindex, nofollow` metadata and are excluded from the sitemap.

## Standard And Custom Presentation

The default presentation renders ordinary Markdown, including headings, lists, quotations, tables, emphasis, and links. Its article-owned reading layout uses a centred continuous column, compact paragraph leading, and level-two headings directly above their sections with a controlled transition rather than the public site's general reading and section rhythm. Use site-root paths such as `/working-with-joel` for internal links and complete `https://` URLs for external sources.

When a template's `references` array is non-empty, the dedicated references component renders the ordered set as a wider source ledger with a source count, compact typography, ruled entries, APA-style hanging indents, and visible DOI or source URLs that remain readable at narrow widths. Each citation accepts inline Markdown, including emphasis. The component controls structure and presentation only; authors should keep academic citations complete and APA 7 formatted, with entries ordered alphabetically.

An article may instead select a custom body presentation without changing the publication shell:

1. Add a page-scoped React body component and stylesheet under `src/content/blog/articles/`.
2. Add its key to `BlogArticlePresentationKey` in `src/content/blog/manifest.ts`.
3. Register the component and its scoped document class in `src/content/blog/presentations.tsx`.
4. Set the manifest object's `presentation` field to the typed definition key.

`src/content/blog/ArticleHero.tsx` is the supported reusable hero template for every published article. It owns the single eyebrow-styled breadcrumb, title, abstract, author, dates, and responsive composition; its `.article-hero*` presentation lives with the other supported component styles in `src/design-system/components.css`. `BlogArticle.tsx` owns the publication note and return navigation around the body. The hero composes the supported `.site-hero`, `.site-hero__eyebrow`, `.site-hero__statement`, and `.site-hero-surface` roles while retaining its article-specific grid and metadata presentation. The registered presentation component owns only the article body. This keeps article orientation and publication details consistent while allowing structure and visual treatment below the hero to follow the subject of an individual article.

Do not add a custom presentation merely to decorate an otherwise standard article. Use one when the subject benefits from a different information form, such as a process, comparison, annotated sequence, evidence key, or visual essay.

## What The Build Does

`src/content/blog/manifest.ts` is the authoritative publication manifest. It:

- validates required metadata, URL-safe unique slugs, real ISO dates, revision ordering, and presentation keys;
- sorts entries newest first;
- supplies the `/blog/:slug` route;
- generates article metadata for the prerenderer and analytics; and
- adds indexable articles and their publication or revision date to the sitemap.

`src/content/blog/posts.ts` pairs each manifest entry with its typed content template. Type checking fails when a manifest slug has no matching template or a template declares an unknown slug. Browser builds lazy-load the Articles pages, while the server build keeps their synchronous components available so every article body and reference set remain present in the prerendered first response.

`npm run build` fails if a generated article route cannot be rendered or if its expected article structure is missing. The route and article browser specs under `tests/public-site/` derive the article route list from the same registry and cover hydration, metadata, sitemap and sample noindex behaviour, navigation, article wayfinding, custom sample presentations, and unknown-slug handling. Direct script tests cover editor-safe template updates and the generated `Blog` and `BlogPosting` structured data.

## Publishing Boundaries

- Treat every object in `publishedBlogPostMetadata` as publicly viewable. There is no draft flag or scheduled-release state.
- Do not use client material, even when names or surface details are changed.
- Verify factual, clinical, legal, and research claims before publication and link primary sources where a source materially supports the article.
- Follow `practice-direction.md`, `writing-direction.md`, and the repository `copywriter` skill for public wording.
- Run `npm run qa:site` before publishing a new article. Inspect the index and article at narrow and wide widths when new content or a custom presentation introduces shapes not already represented.

## When A CMS Becomes Worthwhile

The current model is intentionally small. Consider a CMS only when Joel needs to publish without a code change, schedule articles, manage drafts or multiple authors, upload article-specific media, or maintain a materially larger archive. A future CMS should preserve the existing canonical `/blog/:slug` URLs and metadata contract.

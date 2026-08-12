# Article Publishing

The Vive Articles section is a code-managed, statically prerendered publishing system. It does not use a CMS, database, login, or separate build process. The public route remains `/blog` for continuity, while shared navigation and visible page labels use Articles.

## Add An Article

Add one object to `publishedBlogPosts` in `src/content/blog/posts.ts`:

```ts
{
  abstract: "A concise account of the article's question and argument.",
  author: "Joel Griffiths",
  body: `Write the article in Markdown.`,
  description: "A specific search and social description for the article.",
  publishedAt: "YYYY-MM-DD",
  slug: "lowercase-url-safe-slug",
  title: "The public article title",
  topic: "A short subject classification",
}
```

Use `updatedAt` only after a substantive published revision. Keep the original `publishedAt` value.

Use `sourceNote` when readers should know where the article came from or how it was adapted. Graduate Diploma coursework is one possible source, not the organising identity of the section. State the note narrowly, for example: `Adapted from Graduate Diploma coursework and revised for a general audience.` Keep citations and a `## References` section in the Markdown body when sources materially support the article.

Set `isSample: true` only for temporary demonstration content. Samples are visible from the index but receive `noindex, nofollow` metadata and are excluded from the sitemap.

## Standard And Custom Presentation

The default presentation renders ordinary Markdown, including headings, lists, quotations, tables, emphasis, and links. Use site-root paths such as `/working-with-joel` for internal links and complete `https://` URLs for external sources.

An article may instead select a custom body presentation without changing the publication shell:

1. Add a page-scoped React body component and stylesheet under `src/content/blog/articles/`.
2. Register the component and its scoped document class in `src/content/blog/presentations.tsx`.
3. Set the article object's `presentation` field to that registry key.

The shared shell continues to own the breadcrumb, classification, sample label, title, abstract, author, dates, reading time, publication note, and return navigation. The registered component owns only the article body. This keeps the index consistent while allowing structure and visual treatment to follow the subject of an individual article.

Do not add a custom presentation merely to decorate an otherwise standard article. Use one when the subject benefits from a different information form, such as a process, comparison, annotated sequence, evidence key, or visual essay.

## What The Build Does

`src/content/blog/posts.ts` is the single article registry. Its helpers:

- validate URL-safe, unique slugs and valid publication dates;
- sort entries newest first;
- supply the `/blog/:slug` route;
- generate article metadata for the prerenderer and analytics;
- add indexable articles to the sitemap; and
- provide publication date and reading-time display.

`npm run build` fails if a generated article route cannot be rendered or if its expected article structure is missing. `tests/public-site.spec.ts` derives the article route list from the same registry and covers hydration, JavaScript-disabled output, metadata, sitemap and sample noindex behaviour, navigation, article wayfinding, custom sample presentations, and unknown-slug handling.

## Publishing Boundaries

- Treat every object in `publishedBlogPosts` as publicly viewable. There is no draft flag or scheduled-release state.
- Do not use client material, even when names or surface details are changed.
- Verify factual, clinical, legal, and research claims before publication and link primary sources where a source materially supports the article.
- Follow `practice-direction.md`, `writing-direction.md`, and the repository `copywriter` skill for public wording.
- Run `npm run qa:site` before publishing a new article. Inspect the index and article at narrow and wide widths when new content or a custom presentation introduces shapes not already represented.

## When A CMS Becomes Worthwhile

The current model is intentionally small. Consider a CMS only when Joel needs to publish without a code change, schedule articles, manage drafts or multiple authors, upload article-specific media, or maintain a materially larger archive. A future CMS should preserve the existing canonical `/blog/:slug` URLs and metadata contract.

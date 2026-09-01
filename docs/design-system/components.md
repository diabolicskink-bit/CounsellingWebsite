# Supported Components

This catalogue contains every React component currently approved for deliberate reuse.

## Article Mastheads

### `<BlogArticleHero />`

- `Contract`: Canonical masthead for every published article. A `BlogPostMetadata` value supplies the breadcrumb topic, classification, optional sample label, title, abstract, author, publication date, and optional revision date. The component owns their semantics, order, dark hero composition, responsive recomposition, and presentation.
- `Boundary`: Use exactly once at the start of a `/blog/:slug` article. It does not render the article body, source note, return navigation, metadata tags, or subject-specific presentation. It composes the supported site-hero structure and surface; article-body presentations must not restyle or replace it.
- `Implementation`: `BlogArticleHero` in `src/content/blog/BlogArticleHero.tsx`, with self-owned presentation in `src/content/blog/blog-article-hero.css` and the shared Articles sample label in `src/content/blog/blog-shared.css`.
- `Verified consumers`: Every article route generated from `src/content/blog/manifest.ts`; the current ant and dinosaur samples exercise the same component with different body presentations.
- `Promoted`: 2026-09-01 — owner-authorized article-template consolidation and design-system review.

## Contact Invitations

### `<ContactInvitation />`

- `Contract`: Canonical closing invitation that gives a public content page one clear transition into the Contact journey.
- `Boundary`: Owns its section semantics, fixed heading and explanatory copy, Contact destination and action label, warm-section surface, responsive layout, focus treatment, and reduced-motion behaviour. Consumers own placement only. It accepts no props, appears at most once as the final section of a public page, and is not intended for Contact or development routes.
- `Implementation`: `ContactInvitation` in `src/components/ContactInvitation.tsx` with `.contact-invitation*` styles in `src/design-system/components.css`.
- `Verified consumers`: Home, Working with Joel, and the Kink and BDSM, ENM and polyamory, and LGBTQIA+ child Inclusion pages, each as the final section before the shared footer.
- `Promoted`: 2026-08-05 — owner-authorized shared-component extraction ahead of the planned non-Contact public-page rollout under `DEBT-37`.

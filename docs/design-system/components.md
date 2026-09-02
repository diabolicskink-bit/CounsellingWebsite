# Supported Components

This catalogue contains every React component currently approved for deliberate reuse.

## Article Heroes

### `<ArticleHero />`

- `Contract`: Canonical hero for every published article. An `ArticleMetadata` value supplies the breadcrumb topic, title, abstract, author, publication date, and optional revision date. The author name links to Working with Joel. The component owns their semantics, order, dark hero composition, responsive recomposition, and presentation. Its single breadcrumb doubles as the shared site-eyebrow role.
- `Boundary`: Use exactly once at the start of an `/articles/:slug` article. It does not render the article body, source note, return navigation, metadata tags, or subject-specific presentation. It composes the supported site-hero structure and surface; article-body presentations must not restyle or replace it.
- `Implementation`: `ArticleHero` in `src/content/articles/ArticleHero.tsx`, with component-owned `.article-hero*` presentation in `src/design-system/components.css`.
- `Verified consumers`: Every article route generated from `src/content/articles/manifest.ts`; the current standard and subject-specific article bodies use the same component without changing its presentation.
- `Promoted`: 2026-09-01 — owner-authorized article-template consolidation and design-system review.

## Contact Invitations

### `<ContactInvitation />`

- `Contract`: Canonical closing invitation that gives a public content page one clear transition into the Contact journey.
- `Boundary`: Owns its section semantics, fixed heading and explanatory copy, Contact destination and action label, warm-section surface, responsive layout, focus treatment, and reduced-motion behaviour. Consumers own placement only. It accepts no props, appears at most once as the final section of a public page, and is not intended for Contact or development routes.
- `Implementation`: `ContactInvitation` in `src/components/ContactInvitation.tsx` with `.contact-invitation*` styles in `src/design-system/components.css`.
- `Verified consumers`: Home, Working with Joel, and the Kink and BDSM, ENM and polyamory, and LGBTQIA+ child Inclusion pages, each as the final section before the shared footer.
- `Promoted`: 2026-08-05 — owner-authorized shared-component extraction ahead of the planned non-Contact public-page rollout under `DEBT-37`.

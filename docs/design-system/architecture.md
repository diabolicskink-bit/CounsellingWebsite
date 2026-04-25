# Design System Architecture

## Purpose

The design system exists to keep the counselling website visually coherent, maintainable, reusable, and safe to develop with AI assistance.

It should support:

- Public pages.
- Shared React components.
- Reusable section and page patterns.
- Rendered design-system pages.
- Written design-system documentation.
- Cleanup and consolidation.
- Future extension without visual drift.

It should prevent:

- One-off page styling becoming accidental system.
- Old demo classes leaking into production.
- AI copying legacy examples into public pages.
- Duplicate components or duplicate page patterns.
- Undocumented reusable design elements.
- Design-system pages becoming a separate visual language.

## Source Of Truth

Use this hierarchy when deciding where design-system truth lives.

1. `src/styles.css`
   Production visual tokens, base typography, shared classes, `site-*` classes, `hero-*` classes, and promoted reusable patterns.

2. `src/components/`
   Reusable React components used by production pages, including the site shell, buttons, layout wrappers, FAQ sections, and enquiry form.

3. `src/pages/design-system/`
   Rendered design-system pages showing active foundations, components, heroes, and patterns.

4. `docs/design-system/`
   Written rules, scope, architecture, cleanup plans, AI rules, token notes, and implementation direction.

5. `src/styles-dev.css`
   Development, documentation, and rendered-doc support styling. This file currently contains `ds-*` classes and the Documents page markdown viewer styles.

6. Page-scoped CSS
   Files such as `src/styles-home.css`, `src/styles-inclusive-practice.css`, `src/styles-enquire.css`, and related page CSS files are allowed for page-specific implementation. They are not automatically part of the design system.

7. Legacy, demo, and archive layers
   Existing legacy or experimental classes are reference only unless a pattern is deliberately promoted into the active system.

## Active And Legacy Layers

Active layers:

- Production tokens in `src/styles.css`.
- `site-*` shared production classes.
- `hero-*` shared production hero classes.
- Shared React components in `src/components/`.
- Active page-scoped classes when the need is genuinely page-specific.
- Existing non-prefixed component classes such as `.container`, `.button`, `.card`, `.section-heading`, and `.rich-text` where they back current shared components.

Legacy, demo, reference, or narrow support layers:

- `ds-*` exists for rendered docs and dev-page scaffolding. It is not a production layer and is not the preferred future architecture. It may still be used when a design-system or dev page needs scaffolding that truly does not belong in `site-*`, `hero-*`, or a shared component.
- `design-language-*` is an older design-language/demo layer and should be treated as legacy or reference unless a specific idea is promoted into the active system.
- `legacy-*` is reference only.
- Superseded `site-hero-*`, if encountered, should be treated as replaced by `hero-*`.
- `test-bed-*`, `opus-*`, and old experiment classes are archive/dev reference only.

Useful legacy ideas must be promoted deliberately. Production pages should use active layers, not legacy/demo layers.

## How Design-System Pages Function

Design-system pages are living rendered references. They should show:

- Foundations.
- Tokens.
- Typography.
- Colours.
- Spacing.
- Surfaces.
- Components.
- Page and section patterns.
- Hero patterns.
- Any active reusable design elements.

They should not:

- Become a separate design language.
- Preserve `ds-*` as a permanent preferred visual shell.
- Showcase inactive patterns without labelling them as experimental, legacy, or reference.
- Become a dumping ground for abandoned experiments.

Current rendered design-system routes are under `/design-language/...`, even though the product concept is the design system.

- Overview page: `src/pages/DesignLanguage.tsx`
  Purpose: top-level route for the rendered design-system experience.
  Belongs there: links to the design-system sections and high-level usage principles.
  Status: active overview, but it still uses `ds-*` and `design-language-*` support classes.
  Gap: the route naming and some overview counts may need future audit if the rendered docs are renamed or expanded.

- Foundations page: `src/pages/design-system/DS_Foundations.tsx`
  Purpose: active reference for tokens, base typography, spacing, section rhythm, surfaces, focus/link states, and rich-text HTML.
  Belongs there: token tables, type role specimens, foundational state rules, and baseline layout examples.
  Status: active, with `ds-*` documentation scaffolding.
  Gap: keep the token examples aligned with `src/styles.css` when tokens change.

- Components page: `src/pages/design-system/DS_Components.tsx`
  Purpose: active reference for reusable UI pieces such as buttons, cards, trust strips, forms, footer, lists, stacks, and FAQ sections.
  Belongs there: production-safe shared components and `site-*` examples.
  Status: active, with `ds-*` demo wrappers.
  Gap: the sidebar lists the main sections but does not currently link every section shown on the page, such as Footer and FAQ accordion.

- Heroes page: `src/pages/design-system/DS_Heroes.tsx`
  Purpose: active reference for the shared `hero-*` system.
  Belongs there: hero anatomy, display heading, intro/deck/copy-panel variants, support strips, media notes, background, and full hero composition.
  Status: active canonical hero reference.
  Gap: the page still carries the `design-language-page` wrapper class, which is a legacy name even when the examples themselves use active `hero-*` classes.

- Patterns page: `src/pages/design-system/DS_Patterns.tsx`
  Purpose: page-level composition reference.
  Belongs there: active section patterns and clearly labelled candidate/reference patterns.
  Status: mixed. It contains active shared examples such as `site-split`, `site-copy-panel`, `site-cta-block`, `site-principles`, and `hero-*`, but also older `design-language-*` pattern demos.
  Gap: inactive/candidate examples should be labelled or promoted before future work treats them as production-safe.

## How Design Elements Become Part Of The System

A design element can be a token, colour, type role, spacing rule, surface, border, shadow, button, card, panel, hero, trust strip, FAQ, CTA, issue grid, inclusion panel, form, navigation pattern, footer, or page section.

A design element becomes part of the active design system when:

- It has an active implementation.
- It has a reusable purpose.
- It is production-safe.
- It is documented or represented in the design-system pages.
- It is not merely a one-off page class or legacy demo.

Page-scoped implementations can be useful and production-safe without being design-system elements. They should only be promoted when they solve a repeated need.

## Promotion Workflow

1. Pattern appears in one page or experiment.
2. Pattern proves useful beyond one isolated case.
3. Pattern is named and given a clear role.
4. Pattern is implemented with production-safe tokens, classes, or components.
5. Pattern is documented in the relevant markdown doc.
6. Pattern is shown in the relevant design-system page.
7. `docs/design-system/current-scope.md` is updated.
8. Old duplicate or legacy usage is removed or marked for cleanup.

## Cleanup Workflow

Cleanup should:

- Converge on `site-*` and `hero-*` where sensible.
- Avoid expanding legacy class layers.
- Keep docs/dev styles out of production pages.
- Keep `ds-*` narrow and documentation-specific when no shared production layer fits.
- Update docs when implementation and documentation disagree.
- Correct code when docs are right and implementation has drifted.
- Stay small and verifiable.
- Avoid becoming a redesign.

Cleanup should not copy old demo styles into public pages. If an old demo idea is useful, promote the idea into the active system deliberately.

## Keeping Current Scope Updated

Whenever a future task adds, removes, promotes, deprecates, or materially changes a design-system element, `docs/design-system/current-scope.md` must be updated.

Examples:

- Adding a form component means `current-scope.md` moves forms from Not Included Yet to Included or Partially Included.
- Retiring `ds-*` usage means `current-scope.md` updates the legacy status.
- Adding a design-system page means `current-scope.md` lists it.
- Promoting a CTA pattern means `current-scope.md` lists it as included.
- Discovering a missing icon system means `current-scope.md` may list icon system under Not Included Yet.

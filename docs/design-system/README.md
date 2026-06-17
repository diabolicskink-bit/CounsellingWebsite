# Design System Documentation

This directory is the active design-system guidance for Vive Counselling. It covers visual foundations, shared components, page patterns, rendered design-system pages, cleanup rules, and legacy migration context.

Start here before changing shared UI, layout, reusable CSS, rendered design-system pages, or design-system documentation.

## Reading Order

For normal UI or layout work:

1. Read `../project/product-direction.md` for audience, voice, and public-site intent.
2. Read `ai-rules.md` for the compact working checklist.
3. Check `current-scope.md` for what is active, partial, legacy, or out of scope.
4. Use `patterns/components.md` and `patterns/page-patterns.md` before creating new UI.

For design-system architecture or promotion work:

1. Read `governance.md`.
2. Check `current-scope.md`.
3. Update the relevant foundation, pattern, or maintenance doc in the same change.

For cleanup work:

1. Read `maintenance/cleanup-sweeps.md`.
2. Check `maintenance/migration-notes.md` and `../project/project-debt.md` for related `DEBT-*` items.
3. Keep cleanup focused and behaviour-preserving unless the task explicitly asks for redesign.

## File Map

- `ai-rules.md` is the short AI checklist for visual work.
- `governance.md` owns source-of-truth order, active and legacy layer policy, promotion rules, and update duties.
- `current-scope.md` is the factual inventory of what the design system currently includes.
- `foundations/principles.md` owns visual intent and tone.
- `foundations/tokens.md` owns colour, spacing, type roles, and baseline typography guidance.
- `patterns/components.md` owns active React components and component-backed API.
- `patterns/page-patterns.md` owns shared `site-*`, `hero-*`, section, card, panel, rich-text, CTA, form, and page-pattern guidance.
- `maintenance/cleanup-sweeps.md` owns cleanup sweep behaviour and named cleanup modes.
- `maintenance/migration-notes.md` owns legacy and migration context that should stay visible across future design-system work.

## Implementation Sources

- `src/styles.css` is the production source of truth for tokens, base typography, shared classes, `site-*`, `hero-*`, and promoted reusable patterns.
- `src/components/` contains shared React components, but a file existing there does not automatically make it active design-system API. Check `current-scope.md` and `patterns/components.md`.
- `src/pages/dev/design-system/` contains the rendered design-system pages.
- `src/styles-dev.css` contains docs/dev support styling such as `ds-*`.
- Page-scoped CSS can be production-safe without being design-system API.

## Rendered Pages

The rendered design-system experience currently lives under historical `/design-language` routes:

- `/design-language`
- `/design-language/foundations`
- `/design-language/components`
- `/design-language/heroes`
- `/design-language/patterns`

Treat those as design-system pages even though the route name is historical.

## Update Rule

If design-system work adds, removes, promotes, deprecates, or materially changes a token, component, pattern, rendered design-system page, legacy layer, or known missing area, update `current-scope.md` in the same change.

Tiny implementation changes that do not change design-system scope do not need a scope update.

# Design System Documentation

This directory is the active design-system guidance for Vive Counselling. It covers visual foundations, shared components, page patterns, rendered design-system pages, cleanup rules, and current legacy status.

Start here before changing shared UI, layout, reusable CSS, rendered design-system pages, or design-system documentation.

## Reading Order

For normal UI or layout work:

1. Read `../project/product-direction.md` for audience, voice, and public-site intent.
2. Read `../project/writing-direction.md` when public copy or content hierarchy may be affected.
3. Check `current-scope.md` for what is active, partial, legacy, or out of scope.
4. Use `patterns/components.md` and `patterns/page-patterns.md` before creating or extending UI.
5. Read `governance.md` when changing shared classes, components, rendered design-system pages, reusable-API status, or design-system documentation.

For design-system architecture or promotion work:

1. Read `governance.md`.
2. Check `current-scope.md` and the relevant foundation or pattern catalogue.

For cleanup work:

1. Read `maintenance/cleanup-sweeps.md`.
2. Check `current-scope.md` for legacy status and `../project/project-debt.md` for related `DEBT-*` items.
3. Keep cleanup focused and behaviour-preserving unless the task explicitly asks for redesign.

## File Map

- `governance.md` owns implementation-evidence rules, reusable-API authority, active and legacy layer policy, promotion rules, and update duties.
- `current-scope.md` is the factual inventory of what the design system currently includes.
- `foundations/principles.md` owns visual intent and tone.
- `foundations/tokens.md` owns colour, spacing, type roles, and baseline typography guidance.
- `patterns/components.md` owns active React components and component-backed API.
- `patterns/page-patterns.md` owns shared `site-*`, `hero-*`, section, card, panel, rich-text, CTA, form, and page-pattern guidance.
- `maintenance/cleanup-sweeps.md` owns cleanup sweep behaviour and named cleanup modes.

## Implementation Sources

- `src/styles.css` is the production implementation source for tokens, base typography, shared classes, `site-*`, `hero-*`, and promoted reusable patterns. Governance and the active catalogues determine whether an implementation is approved reusable API.
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

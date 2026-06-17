# Design System Governance

## Purpose

The design system keeps the counselling website visually coherent, maintainable, reusable, and safe to develop with AI assistance. It should support shared production UI while still allowing page-specific composition when the content needs it.

It should prevent old demos, docs shell styles, or unused components from becoming accidental production API.

## Source Of Truth

Use this order when design-system sources disagree:

1. `src/styles.css`
   Production visual tokens, base typography, shared classes, `site-*`, `hero-*`, and promoted reusable patterns.
2. Active shared React components in `src/components/`
   A component file is active design-system API only when `current-scope.md` and `patterns/components.md` say so.
3. Rendered design-system pages in `src/pages/dev/design-system/`
   Living visual references for foundations, components, heroes, and patterns.
4. Written docs in `docs/design-system/`
   Operating rules, current scope, component catalogues, pattern guidance, cleanup rules, and migration context.
5. `src/styles-dev.css`
   Docs/dev support styling, including `ds-*`.
6. Page-scoped CSS
   Production-safe for one page, but not automatically shared design-system API.
7. Legacy, demo, reference, and archive layers
   Reference only unless deliberately promoted.

## Active Layers

- Production tokens in `src/styles.css`.
- `site-*` shared production classes.
- `hero-*` shared production hero classes.
- Shared React components documented as active.
- Existing non-prefixed shared classes where they back current components or patterns: `.container`, `.button`, `.section-heading`, `.rich-text`, `.check-item`, and `.icon-box`.
- Deliberate page-scoped classes for page-specific composition.

## Legacy And Support Layers

- `ds-*` is docs/dev support styling and should stay out of production pages.
- `design-language-*` is older rendered-doc/demo styling and is not production-safe by default.
- `legacy-*`, `test-bed-*`, `opus-*`, `inc-lab-*`, and superseded `site-hero-*` are reference or retired layers.
- The old `src/components/Card.tsx`, `.card`, `.card-grid`, and `.card-kicker` path has been removed. Do not reintroduce it as card API.

Useful legacy ideas can be promoted, but the idea must be rebuilt into the active `site-*`, `hero-*`, or component layer and documented before production use.

## Page-Scoped Vs Shared

Page-scoped CSS is allowed when:

- the composition is specific to one page
- a shared pattern would weaken the content or accessibility
- the pattern has not proved reusable

Promote a page-scoped pattern only when:

- it solves a repeated need
- it has a clear name and role
- it uses existing tokens and type roles
- it is represented in markdown guidance and, when visual, the rendered design-system pages
- `current-scope.md` is updated

## Rendered Design-System Pages

Rendered pages are living examples, not separate design language. They should show active foundations, components, heroes, and page patterns using the same production visual system wherever possible.

Current rendered routes:

- `/design-language`: overview route
- `/design-language/foundations`: tokens, typography, spacing, surfaces, focus/link states, and rich-text HTML
- `/design-language/components`: buttons, cards, trust strips, forms, footer, lists, stacks, FAQ, and reusable UI pieces
- `/design-language/heroes`: canonical `hero-*` system
- `/design-language/patterns`: page-level composition patterns

If a rendered example is experimental, legacy, or reference-only, label it clearly before future work treats it as production-safe.

## Promotion Workflow

1. A pattern appears in one page or experiment.
2. It proves useful beyond one isolated case.
3. It receives a clear name and role.
4. It is implemented with production-safe tokens, classes, or components.
5. It is documented in the relevant markdown doc.
6. It is shown in the relevant rendered design-system page when visual.
7. `current-scope.md` is updated.
8. Old duplicate or legacy usage is removed or tracked for cleanup.

## Cleanup Workflow

Cleanup should converge on active `site-*`, `hero-*`, and shared component patterns where sensible. It should be small, verifiable, and behaviour-preserving unless the task explicitly asks for broader change.

Cleanup should not copy old demo styles into production pages. If an old demo idea is useful, promote the idea deliberately.

Use `maintenance/cleanup-sweeps.md` for named sweep behaviour and `maintenance/migration-notes.md` for known legacy areas.

## Scope Updates

Update `current-scope.md` whenever work adds, removes, promotes, deprecates, or materially changes a design-system element.

Do not update it for tiny implementation changes that do not change design-system scope.

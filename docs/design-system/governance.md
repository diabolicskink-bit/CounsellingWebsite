# Design System Governance

## Purpose

The design system keeps the counselling website visually coherent, maintainable, reusable, and safe to develop with AI assistance. It should support shared production UI while still allowing page-specific composition when the content needs it.

It should prevent old demos, docs shell styles, or unused components from becoming accidental production API.

## Authority And Evidence

Design-system sources answer two different questions. Do not use implementation existence as proof that something is approved reusable API.

### Current Implementation Fact

When determining what is actually implemented, use this evidence order:

1. Production source and configuration, especially `src/styles.css` and the components used by active routes.
2. Tested or rendered behaviour on affected public and development routes.
3. `current-scope.md`, pattern catalogues, and rendered design-system pages as maintained summaries and visual references.

If documentation disagrees with executable behaviour, treat the implementation as the current fact. Reconcile the stale documentation when the task changes or formally assesses that durable state.

`src/styles-dev.css` and `ds-*` are dev support rather than production implementation. Page-scoped CSS can be production-safe for its page without becoming shared API. Legacy, demo, reference, and archive layers remain reference only unless deliberately promoted.

### Approved Reusable API

When deciding whether a token, class, component, or pattern is approved for reuse:

1. Follow the boundaries and promotion rules in this governance document.
2. Confirm active status in `current-scope.md` and the relevant catalogue: `foundations/tokens.md`, `patterns/components.md`, or `patterns/page-patterns.md`.
3. Use source and rendered examples to verify how that documented API is implemented and behaves.

A file in `src/components/`, a selector in a stylesheet, or a rendered example is not reusable design-system API merely because it exists. Experimental, page-scoped, dev-only, legacy, and undocumented implementation must remain local or be deliberately promoted before shared reuse.

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

Reuse should serve the content and interaction. Do not flatten a distinctive page moment, invent generic sections, or rewrite approved copy merely to make an existing component or pattern fit.

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

Use `maintenance/cleanup-sweeps.md` for source-first sweep behaviour and named cleanup modes. Do not use current-scope documents or trackers to select sweep work. Consult the project debt tracker only when the source-first sweep independently exposes a worthwhile issue that is too large to complete safely, then follow the sweep file's deduplication and automatic recording workflow.

## Verification

- For documentation-only changes, run reference searches or link checks that confirm active guidance points to the intended canonical documents.
- For CSS, component, or rendered-page changes, run `npm run build` unless the current task explicitly excludes it.
- For visual changes, inspect the affected public route or rendered design-system page when practical.

## Scope Updates

Update `current-scope.md` whenever work adds, removes, promotes, deprecates, or materially changes a design-system element.

Do not update it for tiny implementation changes that do not change design-system scope.

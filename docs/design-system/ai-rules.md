# AI Rules For Design-System Work

Use this as the quick checklist before changing visual code. It routes you to the right source instead of repeating the whole system.

## Before Editing

- Read `../project/product-direction.md` when public copy, content hierarchy, inclusion language, or visitor-facing positioning may be affected.
- Read `governance.md` when changing shared classes, components, design-system pages, or design-system documentation.
- Read `current-scope.md` before treating any class, component, or rendered example as active API.
- Read `patterns/components.md` and `patterns/page-patterns.md` before creating a new component or shared style.
- Read `maintenance/cleanup-sweeps.md` when the task is cleanup, simplification, deduplication, override reduction, or legacy removal.

## Use The Active Layers

- Production shared CSS should use documented `site-*`, `hero-*`, and existing non-prefixed shared classes such as `.container`, `.button`, `.section-heading`, `.rich-text`, `.check-item`, and `.icon-box`.
- Hero work should use the shared `hero-*` system unless the task deliberately creates a page-scoped hero extension.
- Card-like production UI should use `.site-card`, `.site-card--link`, `.site-card__*`, `.site-topic-card`, `.site-fee-card`, or a deliberate page-scoped class.
- Existing React components are starting points, not automatic API. Confirm active status before reusing a component as a pattern.
- Page-scoped CSS is acceptable when the page needs a specific composition that should not become shared yet.

## Avoid

- Do not use `ds-*`, `design-language-*`, `legacy-*`, `test-bed-*`, `opus-*`, `inc-lab-*`, or superseded `site-hero-*` classes on production pages.
- Do not use `src/components/Card.tsx`, `.card`, `.card-grid`, or old card-adjacent selectors for new production or design-system work.
- Do not create a page-specific card, hero, panel, CTA, or form style when a documented shared pattern is a close fit.
- Do not flatten distinctive page moments into generic card grids merely because reuse is easier.
- Do not introduce ad hoc colours, type sizes, shadows, radii, or spacing when an existing token or role fits.
- Do not turn cleanup into redesign, public copy changes, route changes, or new visitor-facing scope unless explicitly requested.

## When Creating Or Promoting UI

- Start with the content, interaction, accessibility, and responsive need.
- Reuse an active component or pattern when it honestly fits.
- Use a page-scoped composition when the need is specific to one page.
- Promote a reusable pattern only when it has a clear role beyond one isolated case.
- Document promoted patterns in the relevant markdown file and rendered design-system page.
- Update `current-scope.md` when the design-system state changes.

## Verification Expectations

- For docs-only changes, run reference searches that prove active links point to the new canonical docs.
- For CSS, component, or rendered-page changes, run `npm run build` unless the task explicitly says not to.
- For visual changes, inspect the affected public route or rendered design-system page when practical.

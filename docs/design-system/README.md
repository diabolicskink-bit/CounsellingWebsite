# Design System Documentation

This directory records the currently implemented Vive Counselling design system: visual foundations, shared components, page patterns, rendered examples, and legacy status.

## Creative-Within-Identity Status

Fresh creation and redesign should actively explore content-shaped, out-of-the-box compositions rather than begin from existing page patterns. The site's established font families, type roles and scale, colour palette and semantic colour roles remain the basic identity scheme unless the current task explicitly changes that identity.

Composition, grids, component forms, surfaces, depth, layering, shape, spacing rhythm, imagery, motion and responsive behaviour are active creative variables. Establish structurally different directions from the task, content, real assets, and the website-design skill first. Consult this directory afterward to understand implementation and decide what can be reused without weakening the selected direction. Existing components and page patterns are optional implementation resources, not acceptance criteria.

Start here first only when maintaining, documenting, promoting, or deliberately reusing shared UI.

## Reading Order

For fresh creation or redesign:

1. Start from the current task, actual page content, and real assets.
2. Read `../project/writing-direction.md` when public copy or content hierarchy may be affected.
3. Establish at least two structurally different, content-shaped directions within the basic identity scheme when the user has not already selected one; ensure at least one materially departs from existing page patterns.
4. Check source and `current-scope.md` after selection for implementation facts and behaviour worth preserving.
5. Reuse or replace existing components and styles according to concept fit, accessibility, behaviour, and maintenance—not prior design-system status alone.

For shared-UI maintenance or deliberate reuse:

1. Check `current-scope.md` for what is implemented, partial, legacy, or out of scope.
2. Use `patterns/components.md` and `patterns/page-patterns.md` as catalogues of existing implementation.
3. Read `governance.md` when changing shared classes, components, rendered design-system pages, reusable-API status, or design-system documentation.

For design-system architecture or promotion work:

1. Read `governance.md`.
2. Check `current-scope.md` and the relevant foundation or pattern catalogue.

## File Map

- `governance.md` owns implementation-evidence rules, reusable-API authority, active and legacy layer policy, promotion rules, and update duties.
- `current-scope.md` is the factual inventory of what the design system currently includes.
- `foundations/principles.md` records the creative-within-identity policy and distinguishes identity anchors from open composition variables.
- `foundations/tokens.md` inventories existing colour, spacing, type roles, and baseline typography implementation.
- `patterns/components.md` inventories current React components and component-backed behaviour.
- `patterns/page-patterns.md` inventories existing `site-*`, `hero-*`, section, card, panel, rich-text, CTA, form, and page-pattern implementation.

## Implementation Sources

- `src/styles.css` is the production implementation source for current tokens, base typography, shared classes, `site-*`, `hero-*`, and promoted reusable patterns. This describes what exists; it does not make those visual choices mandatory for new work.
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

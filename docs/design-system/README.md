# Design System Documentation

This directory documents the Vive Counselling design system: what exists, how it is organised, how to use it, when to extend it, and how to keep it from drifting.

Start here when changing shared UI, rendered design-system pages, tokens, reusable patterns, or design-system documentation.

## Core Docs

- `architecture.md` explains how the design system is organised, maintained, extended, and cleaned up.
- `current-scope.md` is the live inventory of what the design system currently includes, partially includes, does not include yet, and treats as legacy.
- `principles.md` explains the design and tone principles behind the site.
- `tokens.md` explains production visual tokens and baseline layout/type rules.
- `components.md` explains reusable components and production-safe patterns.
- `ai-rules.md` provides quick AI-editing rules.
- `cleanup-sweeps.md` tracks cleanup passes for CSS, page structure, shared patterns, route/layout maintenance, and legacy layers.
- `type-scale-plan.md` tracks typography direction and remaining type-scale cleanup.

## Implementation Sources

- `src/styles.css` is the primary production source of truth for tokens, shared classes, `site-*`, `hero-*`, and promoted reusable patterns.
- `src/components/` contains shared React components used by production and documentation pages.
- `src/pages/design-system/` contains rendered design-system pages.
- `src/styles-dev.css` contains development, documentation, and rendered-doc support styles.
- Page-scoped CSS files can implement page-specific composition, but they are not automatically part of the design system.

## Rendered Design-System Pages

The rendered design-system experience currently lives under `/design-language` routes:

- `/design-language`
- `/design-language/foundations`
- `/design-language/components`
- `/design-language/heroes`
- `/design-language/patterns`

The route name is historical. Treat these as design-system pages.

## Active Production Layers

- `site-*` is the main shared production layer for sections, cards, panels, lists, forms, footer, FAQ, CTA, trust, contact, and general page structure.
- `hero-*` is the shared production hero layer for page-opening sections, display headings, copy rails, hero support rows, media notes, and hero backgrounds.
- Shared React components should be considered before creating new primitives, but new components are welcome when they produce a clearer, more accessible, more maintainable, or more content-specific result.
- Existing non-prefixed shared classes such as `.container`, `.button`, `.card`, `.section-heading`, and `.rich-text` remain active where they back current shared components.

## Legacy, Demo, And Support Layers

- `ds-*` is documentation/dev-page support styling, not a production layer and not the preferred future architecture.
- `ds-*` may still exist in current design-system pages and support components.
- `ds-*` may be used only when a docs/dev page needs scaffolding that truly does not make sense in `site-*`, `hero-*`, or a shared component.
- Do not copy `ds-*` into production pages.
- Do not expand `ds-*` as an active production layer.
- Useful `ds-*` ideas should be promoted into active `site-*`, `hero-*`, or shared component layers.
- `design-language-*`, `legacy-*`, `test-bed-*`, `opus-*`, `inc-lab-*`, and any discovered `site-hero-*` usage are legacy/demo/reference layers unless a future task deliberately promotes a useful idea into the active system.

## Update Rule

If design-system work adds, removes, promotes, deprecates, or materially changes a token, component, pattern, rendered design-system page, or legacy layer, update `current-scope.md` in the same change.

Tiny implementation changes that do not change design-system scope do not need a scope update.

## Extension Rule

Reuse is the default starting point, not a veto on new design work. When an existing component or pattern is only superficially similar, prefer a deliberate new page-scoped composition or a new reusable pattern over forcing content into the wrong shape.

New reusable patterns should use existing tokens and visual principles, have a clear role, and be documented in the relevant markdown and rendered design-system page. New page-specific compositions may stay page-scoped until they prove useful in more than one place.

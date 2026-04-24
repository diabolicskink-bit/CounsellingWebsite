# Design System Documentation

This site uses a calm, editorial design system for a counselling practice. The overall feeling should be grounded, clear, and emotionally steady rather than promotional, clinical, or startup-like.

Read these files together:

- `principles.md`: the tone and decision-making rules behind the system
- `tokens.md`: the shared visual tokens and baseline layout rules
- `components.md`: the reusable building blocks to prefer in implementation
- `ai-rules.md`: the short, strict checklist AI tools should follow during edits
- `cleanup-sweeps.md`: named cleanup passes for simplifying CSS, page structure, shared patterns, nested class complexity, and route/layout maintenance over time
- `type-scale-plan.md`: assessment and staged plan for tightening the foundational typography roles

Primary implementation sources:

- `src/styles.css`
- `src/styles-dev.css` for design-system docs/dev-page shell styles such as `ds-*`
- `src/components`
- `src/pages/design-system/DS_Foundations.tsx`
- `src/pages/design-system/DS_Components.tsx`
- `src/pages/design-system/DS_Patterns.tsx`
- `src/pages/design-system/DS_Heroes.tsx`

## Authoritative Shared Prefixes

- `site-*` classes are the current authoritative shared system for production UI.
- Shared page-opening hero classes are also authoritative: `hero-*` and the documented hero primitives used in `src/styles.css`.
- Treat `hero-*` as a separate shared hero design system layered alongside `site-*`.
- `site-*` is the main shared production system for sections, cards, panels, lists, forms, and general page structure.
- `hero-*` is the shared production system for page-opening hero composition, hero backgrounds, hero copy rails, hero support strips, and hero-related supporting media/layout.
- Within the shared hero system, `.hero-display` is the authoritative page-opening H1 pattern for production pages.
- When a hero title only needs a different width, prefer setting `--hero-display-max-width` at page scope over creating a page-specific title class.
- `site-hero-*` belongs to an older design-system shell and should be treated as legacy/demo scaffolding.
- `design-language-*` classes come from an older v1 design-system layer and should be treated as legacy/demo scaffolding unless a specific pattern has been promoted into a `site-*` class.
- When reusing or extending a shared pattern for real page work, prefer the `site-*` or shared hero class rather than introducing a new `design-language-*` dependency.

## Prefix Map For AI Edits

Use this map when deciding whether a class is safe to reuse, should be extended carefully, or should be treated as legacy.

### Current Production API

- `site-*`
  The main shared production design system. Reuse these first for public pages.
- `hero-*`
  The current shared public hero design system. This is separate from `site-*`, but equally authoritative for production use. Reuse these for page-opening hero structure and hero sub-parts.

### Production Page-Specific Layers

- Page-scoped classes such as `home-page*`, `working-with-joel-page*`, `enquire-page*`, `inclusion-*`, `kink-page*`, `enm-page*`
  These are production page implementations, but they are not the shared design-system API. They may extend `site-*` and `hero-*`, but should not be treated as reusable shared primitives unless they are intentionally promoted into `src/styles.css` and documented.

### Design System Documentation Shell

- `ds-*`
  These classes are for design-system documentation pages, demos, sidebars, usage notes, tables, and showcase layouts. They are valid inside `src/pages/design-system/*`, `src/pages/DesignLanguage.tsx`, and related design-system navigation/supporting UI. They are not production page primitives and should not be used on live public pages as if they were shared site components.
  The documentation shell should still visually compose from the authoritative production system: `site-*`, `hero-*`, shared tokens, and shared components. `ds-*` should be treated as documentation chrome/layout/supporting wrappers, not as an alternate site design language.

### Legacy / Demo / Archive Layers

- `design-language-*`
  Older v1 design-language classes used for archived examples, exploratory patterns, and reference material. Treat these as legacy/demo scaffolding unless a pattern has been explicitly promoted into a `site-*` class.
- `legacy-*`
  Documentation-only sample styling, mostly used in design-system foundations/examples to show older HTML/token/type treatments. Never introduce these into production pages.
- `site-hero-*`
  Older hero shell/demo scaffolding. Prefer the shared `hero-*` system instead.

### Naming Clarification

- `design-system-*`
  There is currently no active shared CSS prefix in the codebase using `design-system-*`. If you see the phrase "design system" in docs, routes, or component names, that is a documentation/product-language label rather than the authoritative production CSS API.

## AI Workflow For Shared UI Changes

When an AI tool changes site UI, the decision order should be:

1. Reuse an existing React component from `src/components`.
2. Reuse an existing `site-*` or shared `hero-*` class from `src/styles.css`.
3. Extend an existing shared production pattern in `src/styles.css`.
4. Use a page-scoped class only when the change is truly page-specific and should not become part of the shared system.
5. Only use `ds-*`, `design-language-*`, or `legacy-*` inside design-system docs/demo contexts.

For design-system documentation pages specifically:

1. Prefer the same shared `site-*` / `hero-*` system used by production pages.
2. If documentation needs a genuinely reusable new component, state, or pattern, add it to the shared site system and document it.
3. Use `ds-*` only for documentation-specific scaffolding such as doc layout, sidebar navigation, demo wrappers, and usage-note framing.

## AI Guardrails Around Legacy Layers

- Do not copy `ds-*` classes from design-system pages into production pages.
- Do not promote `design-language-*` or `legacy-*` into production by habit just because a visual example exists.
- If a legacy/demo example is the right direction for production, recreate it using `site-*` or `hero-*` classes and then document the promoted version.
- If you are unsure whether a class is production-safe, check whether it is documented in `docs/design-system/components.md` and whether it lives in the shared production sections of `src/styles.css`.
- Do not let design-system docs become a separate visual system. The docs shell may have its own layout helpers, but the actual showcased UI should be built from the authoritative shared site system.
- When documentation pages need page-specific CSS, put that CSS in a dedicated stylesheet for the documentation page or doc shell instead of continuing to grow documentation-shell rules inside `src/styles.css`.

## What This System Is Trying To Do

- Make sensitive information feel calm, contained, and readable.
- Use typography, spacing, and section rhythm as the main design tools.
- Keep colour disciplined: paper background, soft green surfaces, cedar accents.
- Support trust and clarity without sounding corporate, salesy, or overly polished.
- Let shared patterns repeat so pages feel related.

## How To Use These Docs

- Start with `principles.md` if you are making a judgment call about tone or hierarchy.
- Check `tokens.md` before introducing any new colour, spacing, radius, or shadow.
- Check `components.md` before creating new layout or card patterns.
- Use `ai-rules.md` as the final pre-commit checklist for UI changes.
- Use `cleanup-sweeps.md` when the goal is cleanup, simplification, deduplication, page-pattern convergence, or style-system maintenance rather than feature work.

## Update Rule

If you add a new reusable component, layout pattern, token, or major visual rule, update these docs in the same change so future AI edits stay aligned.

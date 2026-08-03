# Design System Governance

## Purpose

The design system records and supports shared production UI, implementation coherence, maintenance, and reuse. It also governs the gradual movement from old or uncertain styling toward a deliberately supported shared layer. It does not currently own visual direction for fresh creation or redesign.

It should prevent old demos, docs shell styles, or unused components from becoming accidental production API.

## Creative-Within-Identity Policy

- Actively establish fresh, content-shaped visual concepts before consulting existing component or page-pattern material. When direction is open, explore at least two structurally different concepts and ensure at least one materially departs from current page patterns.
- Preserve established font families, type roles and scale, the colour palette and semantic colour roles, shared shell behaviour, and the accessibility baseline unless the current task explicitly changes the site's identity.
- Treat composition, grids, component forms, surfaces, depth, layering, shape, spacing rhythm, imagery, motion, and responsive recomposition as creative variables rather than inherited constraints.
- Existing heroes, page patterns, components, rendered examples, flat surfaces, fine rules, and section silhouettes are optional implementation resources rather than creative defaults.
- Preserve semantic behaviour, accessibility, data flow, routing, and other functional contracts required by the task; their existing visual treatment is not automatically protected.
- Select reuse only after a direction exists. Reuse is successful when it strengthens that direction and the required behaviour, not merely when the new element resembles an existing pattern.
- Page-scoped or replacement implementation does not need promotion into shared API unless the current task also asks to change the reusable system.
- A task may explicitly opt into the existing system, preserve named elements, or re-establish visual constraints. Until then, current visual conventions have reference status.

## Authority And Evidence

Design-system sources answer two different questions. Do not use implementation existence as proof that something is approved reusable API.

### Current Implementation Fact

When determining what is actually implemented, use this evidence order:

1. Production source and configuration, especially `src/styles.css` and the components used by active routes.
2. Tested or rendered behaviour on affected public and development routes.
3. `current-scope.md` and the written pattern catalogues as maintained summaries.

If documentation disagrees with executable behaviour, treat the implementation as the current fact. Reconcile the stale documentation when the task changes or formally assesses that durable state.

`src/styles-dev.css` and its remaining `ds-*` rules support the Documents development route rather than production implementation. Page-scoped CSS can be production-safe for its page without becoming shared API. Legacy, demo, and reference layers remain reference only unless deliberately promoted.

The rendered `/design-language/*` catalogue was removed on 2026-08-03. Its former pages survive only in Git history and are not implementation evidence or reusable-API authority.

## Lifecycle

Every reviewed token, selector or selector family, component, and pattern uses one of these statuses:

- `Unreviewed`: source-backed status has not been decided. It may remain in current source, but it must not gain new consumers or be removed on assumption.
- `Page-local`: intentionally supported only within its current page or bounded feature. It is not shared API.
- `Candidate`: a repeated semantic need worth evaluating for elevation. It remains local and is not approved reusable API.
- `Shared-supported`: deliberately elevated, documented, and available for reuse within its stated role.
- `Deprecated`: retained for existing-consumer compatibility while replacement or retirement proceeds. It must not gain new consumers.
- `Dormant`: no current production consumer has been verified. It is a removal candidate, not proof that removal is safe.
- `Historical/dev-only`: retained for archive, test-bed, documentation, or development support and has no production authority.
- `Removed`: no longer present in active source. Keep only the concise historical record needed to prevent accidental reintroduction.

Anything in the written catalogues without an explicit lifecycle record is `Unreviewed`, regardless of its heading, name, source location, or earlier description. Existing catalogue content is reconciled incrementally as related work touches it; the lifecycle does not require an initial whole-system audit.

### Item Record

Add or update an item record in the relevant existing catalogue when a task verifies, promotes, deprecates, or removes it. Each record must include:

- identifier: token, selector or selector family, component, or named pattern
- lifecycle status
- intended semantic role and supported boundary
- source evidence and current public consumers
- replacement, migration, or retirement note, using `None` when not applicable
- review date and the task or debt item that supplied authority

Use this compact shape beside the relevant catalogue entry:

```md
### `identifier`

- `Status`: `Unreviewed | Page-local | Candidate | Shared-supported | Deprecated | Dormant | Historical/dev-only | Removed`
- `Role and boundary`: ...
- `Source evidence and public consumers`: ...
- `Replacement or migration`: `None` or ...
- `Reviewed`: YYYY-MM-DD — task or DEBT-ID
```

`current-scope.md` summarizes verified state; it does not replace item records. The existing token, component, and page-pattern catalogues are the item-level register, so do not create a parallel migration tracker.

### Available Reusable API

When a selected direction would benefit from existing implementation and deciding whether a token, class, component, or pattern is available for deliberate reuse:

1. Follow the boundaries and promotion rules in this governance document.
2. Confirm an explicit `Shared-supported` item record in `foundations/tokens.md`, `patterns/components.md`, or `patterns/page-patterns.md`.
3. Verify its current implementation and consumers in production source, then check `current-scope.md` for the corresponding summary.

A file in `src/components/`, a selector in a stylesheet, a public-route consumer, or a rendered example is not shared API merely because it exists. Experimental, page-scoped, dev-only, legacy, undocumented, and unreviewed implementation can inform a bounded assessment, but must be deliberately promoted before new shared reuse.

## Existing Implementation Under Reconciliation

Production source currently contains tokens in `src/styles.css`, `site-*` and `hero-*` class families, non-prefixed classes, shared React components, and deliberate page-scoped CSS. These are implementation facts under incremental reconciliation, not blanket lifecycle classifications. Only item records marked `Shared-supported` define the reusable layer.

## Legacy And Support Layers

- Remaining `ds-*` rules are `Historical/dev-only` Documents-route support and must stay out of production pages. The rendered-catalogue selectors and `design-language-*` support are `Removed`.
- `test-bed-*` and `opus-*` are `Historical/dev-only`; `legacy-*`, `inc-lab-*`, and superseded `site-hero-*` require their existing catalogue or source-backed record before any maintenance decision.
- The old `src/components/Card.tsx`, `.card`, `.card-grid`, and `.card-kicker` path is `Removed`. Do not reintroduce it as card API.

Useful legacy ideas can be rebuilt as new `Page-local` implementation when a selected concept calls for them. They need promotion and documentation only when an explicitly authorized task elevates them to `Shared-supported`.

## Page-Scoped Vs Shared

Choose page structure and visual direction before reuse. Reuse should serve the content and interaction. Do not flatten a distinctive page moment, invent generic sections, or rewrite approved copy merely to make an existing component or pattern fit.

New visual CSS is `Page-local` by default. Page-scoped CSS is appropriate when:

- the composition is specific to one page
- a shared pattern would weaken the content or accessibility
- the pattern has not proved reusable

Record a pattern as a `Candidate` when it appears to solve the same semantic need beyond one context. Candidate status records the opportunity but does not authorize reuse.

Promote a page-scoped pattern to `Shared-supported` only when the current task explicitly includes shared-system work and:

- current production consumers verify a repeated semantic need rather than superficial visual similarity
- it has a stable name, role, and supported boundary
- responsive behaviour, accessibility, interaction states, and affected consumers are covered proportionately
- existing consumers are migrated to the elevated implementation without retaining accidental duplicates
  - it is represented in the relevant written catalogue; no rendered catalogue exists as proof of promotion
- `current-scope.md` is updated

Repeated literal values or declarations do not establish a semantic role and are not sufficient reason to create a token or shared selector.

## Removed Rendered Catalogue

The former development-only `/design-language/*` routes, page modules, archive layout, navigation component, and archive-only styling were removed on 2026-08-03. The written lifecycle, current-scope summary, and item-level catalogues are now the only active design-system documentation.

Do not restore the old rendered snapshot or copy demonstrations from Git history as current guidance. A future explorer would require an explicitly authorized task, source-backed `Shared-supported` records, and a new implementation whose authority is stated independently of the removed catalogue. Incremental source reconciliation remains tracked as `DEBT-37`.

## Promotion Workflow

1. Keep new implementation `Page-local`.
2. When source shows the same semantic need beyond one context, add a `Candidate` item record without broadening reuse.
3. In an explicitly authorized shared-system task, verify consumers, role, boundaries, responsive behaviour, accessibility, and interaction states.
4. Elevate the implementation, migrate the intended consumers, and remove or separately track accidental duplicates.
5. Mark the item `Shared-supported`, complete its catalogue record, and update `current-scope.md`.

## Deprecation And Removal

- Mark an item `Deprecated` only when an explicitly authorized task identifies its existing consumers and replacement or retirement direction.
- Deprecated implementation may receive narrow correctness, accessibility, or compatibility fixes for existing consumers. Do not expand its role or add consumers.
- Migrate consumers only within the authorized task boundary. Do not perform opportunistic whole-site replacement during unrelated page work.
- Mark an item `Dormant` only after a source search finds no current production consumer. Dormant status is a removal candidate and still requires an explicit cleanup task.
- Remove implementation only after the cleanup task verifies exact source consumers, dependent states and responsive rules, and runs checks proportionate to the affected behaviour.
- When removal is complete, delete the active item record or move only a concise `Removed` note into durable history. Update `current-scope.md` and related debt when their factual state changes.
- Never rebuild a `Historical/dev-only` example directly into production. If its idea becomes relevant, implement it as a new `Page-local` item and assess it through the normal lifecycle.

## Verification

- For documentation-only changes, run reference searches or link checks that confirm AI guidance points to this lifecycle and that unreviewed or historical material is not described as approved reusable API.
- For CSS, component, or rendered-page changes, run `npm run build` unless the current task explicitly excludes it.
- For visual changes, inspect the affected public route or remaining development tool. There is no rendered design catalogue to use as validation.

## Scope Updates

Update `current-scope.md` whenever work adds, removes, promotes, deprecates, or materially changes a design-system element.

Do not update it for tiny implementation changes that do not change design-system scope.

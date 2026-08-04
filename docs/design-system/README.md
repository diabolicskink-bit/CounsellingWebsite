# Design System Documentation

This directory governs the gradual movement from page-local, old, or uncertain implementation toward a deliberately supported shared layer. Its written catalogues are being reconciled incrementally; the former rendered catalogue has been removed.

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
5. Implement the selected direction page-locally by default. Reuse existing implementation only when its lifecycle record authorizes that reuse; lifecycle status constrains implementation without choosing the visual direction.

For shared-UI maintenance or deliberate reuse:

1. Read `governance.md` for lifecycle status, reusable-API authority, promotion, deprecation, and removal rules.
2. Check `current-scope.md` for the summary of verified state.
3. Use `foundations/tokens.md`, `patterns/components.md`, and `patterns/page-patterns.md` as the item-level registers. Anything without an explicit lifecycle record is `Unreviewed`.

For design-system architecture or promotion work:

1. Read `governance.md`.
2. Check production source, `current-scope.md`, and the relevant foundation or pattern catalogue.
3. Use `/design-system` only after written status and production evidence are established; the rendered workspace does not grant status.

## Incremental Lifecycle

The lifecycle is `Unreviewed`, `Page-local`, `Candidate`, `Shared-supported`, `Deprecated`, `Dormant`, `Historical/dev-only`, and `Removed`. Definitions and transition rules live only in `governance.md`.

- Production source proves implementation, not reusable status.
- New visual implementation stays `Page-local` unless an explicitly authorized shared-system task promotes it.
- Only an explicit `Shared-supported` item record authorizes deliberate reuse.
- Existing catalogue entries without a record remain `Unreviewed`; reconciliation happens when related work touches them.
- Deprecated or dormant implementation is not expanded or removed opportunistically.

## File Map

- `governance.md` owns lifecycle definitions, implementation-evidence rules, reusable-API authority, promotion, deprecation, removal, and update duties.
- `current-scope.md` summarizes verified design-system state without replacing item records.
- `foundations/principles.md` records the creative-within-identity policy and distinguishes identity anchors from open composition variables.
- `foundations/tokens.md` is the item-level register for colour, spacing, type roles, and baseline typography implementation.
- `patterns/components.md` is the item-level register for React components and component-backed behaviour.
- `patterns/page-patterns.md` is the item-level register for `site-*`, `hero-*`, section, card, panel, rich-text, CTA, form, and page-pattern implementation.

## Implementation Sources

- `src/styles.css` is production implementation evidence for tokens, base typography, `site-*`, `hero-*`, and other classes. Presence there does not establish `Shared-supported` status.
- `src/components/` contains React components, but a file existing there does not automatically make it reusable design-system API. Require an explicit `Shared-supported` record.
- `src/styles-dev.css` contains page-scoped `documents-*` styling for the development-only Documents route.
- `src/pages/dev/DesignSystem.tsx`, `src/components/DesignSystemSpecimen.tsx`, and `src/styles-design-system.css` form the development-only rendered workspace. They may visualise only items already recorded as `Shared-supported`.
- Page-scoped CSS can be production-safe without being design-system API.

## Rendered Workspace Status

The former development-only `/design-language/*` routes and their archive-only implementation were removed on 2026-08-03. Git history preserves the old snapshot, but it has no current design-system authority and must not be restored or copied as present guidance.

The new development-only `/design-system` route is a source-backed workspace. Its Foundations section contains four supported colour specimens: `--cedar` plus the `--portrait-panel`, `--portrait-frame`, and `--portrait-footer-tint` material set shared by Home and Working with Joel. All other unreviewed inventory remains absent. The workspace explains the promotion gate, links into the written records through Documents, and provides a strict specimen frame for promoted items. It is a view over authority rather than a catalogue register or a continuation of the retired snapshot.

Use this README, `governance.md`, `current-scope.md`, and the item-level written catalogues as the active documentation chain. Incremental source reconciliation remains tracked as `DEBT-37`.

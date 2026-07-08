# Migration Notes

This file tracks design-system migration context that should stay visible without turning `current-scope.md` into a rulebook.

Use `../project/project-debt.md` for stable `DEBT-*` tracking. This file gives design-system context and cross-links; it does not resolve implementation debt by itself.

## Card Boundary

Status: instruction-level boundary and source cleanup resolved.

- Active card API: `.site-card`, `.site-card--link`, `.site-card__*`, `.site-topic-card`, `.site-fee-card`, and deliberate page-scoped classes.
- Removed source: `src/components/Card.tsx`, generic `.card`, `.card-grid`, `.card-kicker`, and the card-specific responsive hooks were removed while preserving the active `site-*` card system.
- Related debt: archived `DEBT-17`, with broader remaining legacy CSS context in `DEBT-13`.

## Legacy CSS Layers

Status: open cleanup pressure.

Known or suspected legacy clusters include old card, panel, strip, topic, issue, and experiment classes that remain in CSS or docs/dev support surfaces. Remove only confirmed-dead slices, preserve still-used compatibility paths, and split concrete discoveries into smaller `DEBT-*` items.

Related debt:

- `DEBT-13`: broad legacy CSS cleanup parent.
- `DEBT-18`: old panel and strip selector audit.
- `DEBT-19`: old issue and topic grid selector audit.
- `DEBT-15`: global CSS bundling makes legacy selectors more expensive to keep.

## Docs And Dev Shell Layers

Status: partially included.

- `ds-*` remains valid for docs/dev scaffolding only.
- `design-language-*` remains older rendered-doc/demo styling and should not be copied into production pages.
- Docs/dev styles belong in `src/styles-dev.css` unless they are promoted into the shared production system.
- Rendered design-system pages still live under `/design-language`; the route name is historical.

## Side-Stripe Rule

Status: resolved as a documentation/rule issue.

The active side-striped panels are intentional and acceptable. The old blanket rule against 4px side stripes was removed. Existing `.site-copy-panel`, `.site-check-panel`, and `.site-fee-card` treatments remain valid shared patterns.

The unused `.site-highlight__box` question belongs to dead CSS or legacy cleanup if it matters later.

## Reference Exports And Historical Plans

Status: not active canonical docs.

Raw design export files and the old type-scale plan were not carried into the new design-system folder as active docs. Historical icon candidate export folders have now been removed as inactive reference material. Durable token, type, icon-asset, and visual-rule guidance has been folded into `foundations/tokens.md`, `foundations/principles.md`, the pattern docs, and the active public assets.

Historical reports remain under `docs/reports/` and may mention old paths or old findings.

# Migration Notes

This file tracks design-system migration context that should stay visible without turning `current-scope.md` into a rulebook.

Use the [active project debt tracker](../../project/project-debt.md) for `DEBT-*` tracking. This file keeps unresolved design-system migration context and cross-links; it does not resolve implementation debt by itself.

## Legacy CSS Layers

Status: open cleanup pressure.

Known or suspected legacy clusters include older shared utilities and experiment classes that remain in CSS or docs/dev support surfaces. Confirmed-dead card, panel, strip, issue-section, topic-card, generic `.stack`, and `.site-highlight__box` production slices have been removed. Remove only confirmed-dead slices, preserve still-used compatibility paths, and split concrete discoveries into smaller `DEBT-*` items.

Related debt:

- `DEBT-13`: broad legacy CSS cleanup parent.
- `DEBT-15`: global CSS bundling makes legacy selectors more expensive to keep.
- Archived `DEBT-17`, `DEBT-18`, and `DEBT-19` preserve completed card, panel/strip, and issue/topic cleanup history in the [project debt archive](../../project/archive/project-debt-archive.md).

## Docs And Dev Shell Layers

Status: partially included.

- `ds-*` remains valid for docs/dev scaffolding only.
- `design-language-*` remains older rendered-doc/demo styling and should not be copied into production pages.
- Docs/dev styles belong in `src/styles-dev.css` unless they are promoted into the shared production system.
- Rendered design-system pages still live under `/design-language`; the route name is historical.

## Resolved Migration History

Completed card-boundary, legacy card-source, and side-stripe guidance decisions are preserved as `DEBT-12`, `DEBT-17`, and `DEBT-14` in the [project debt archive](../../project/archive/project-debt-archive.md). They are not active migration work; current card and panel API is owned by the [component catalogue](../patterns/components.md) and [page-pattern catalogue](../patterns/page-patterns.md).

## Reference Exports And Historical Plans

Status: not active canonical docs.

Raw design export files and the old type-scale plan were not carried into the new design-system folder as active docs. Historical icon candidate export folders have now been removed as inactive reference material. Durable token, type, icon-asset, and visual-rule guidance has been folded into `foundations/tokens.md`, `foundations/principles.md`, the pattern docs, and the active public assets.

Historical reports remain under `docs/reports/` and may mention old paths or old findings.

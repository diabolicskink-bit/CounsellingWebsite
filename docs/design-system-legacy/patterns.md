# Legacy Patterns Register

This is source-backed working evidence about inherited selectors and compositions outside the active design system. Presence here does not authorize new reuse or removal.

Primary shared-looking implementation currently lives in `src/styles.css`; page-local implementation lives in the relevant `src/styles-*.css` files.

## Section And Layout Families

- `.site-grid`: inherited neutral section surface
- `.site-highlight`: inherited paper-sage alternate band
- `.site-split`: inherited split layout

These patterns remain implemented and may have current consumers. None is part of the active catalogue. The promoted `.site-section-warm` pattern is intentionally absent and lives in `docs/design-system/patterns.md`.

## Rich Text And Copy Families

`.site-broad-tabs__content` remains mounted through Working with Joel, while `.hero-copy-panel` remains mounted only through `DevPageHero` on the two development test beds. The page's copy uses the promoted `.site-reading` role rather than an inherited generic copy wrapper.

## Hero Family

Current inherited source includes `.hero-section`, `.hero-top`, `.hero-badge`, `.hero-display`, `.hero-copy-panel`, `.hero-support-tagline`, and the mounted `.hero-media-note*` portrait subset.

Public pages consume parts of this family and layer page-specific composition on top. The family remains inherited implementation rather than an approved hero system. The former light `.hero-bg--default` helper, its unused noise asset, and duplicated public and development dark backgrounds were removed when `.site-hero-background` became the supported shared hero-surface contract.

## Navigation, Footer, And Broad-Tab Families

- `.site-header*`, navigation classes, and `.site-footer*` support the current `Layout` shell.
- `.site-broad-tabs*` supports `BroadTabPanel` on Working with Joel.

These functional surfaces require focused source and behaviour review before promotion or cleanup.

The second source-level selector review batch covers `.site-shell`, `.container`, `.site-header`, `.site-header__inner`, `.brand`, `.brand__name`, `.brand--header`, `.brand__name--header`, `.site-header__cluster`, and `.desktop-nav`. As of 2026-08-06, all ten are mounted through `Layout`, `Container`, or `DesktopNavigation`. The audit retained their distinct shell, wordmark, header-composition, and navigation jobs; the header inner now composes `Container`, and exact duplicate shared-shell border/wordmark colours were removed without promoting any selector.

## Page-Local Implementation

Contact owns the current enquiry form through `Contact.tsx` and `src/styles-contact.css`; there is no promoted form component or shared form pattern. Other page-prefixed selectors remain owned by their pages unless an authorized task promotes a repeated semantic contract.

Last consolidated from current source: 2026-08-14 — redundant inherited copy and panel wrappers removed in source-first cleanup.

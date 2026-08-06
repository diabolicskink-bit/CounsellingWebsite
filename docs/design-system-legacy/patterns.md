# Legacy Patterns Register

This is source-backed working evidence about inherited selectors and compositions outside the active design system. Presence here does not authorize new reuse or removal.

Primary shared-looking implementation currently lives in `src/styles.css`; page-local implementation lives in the relevant `src/styles-*.css` files.

## Section And Layout Families

- `.site-grid`: inherited neutral section surface
- `.site-highlight`: inherited paper-sage alternate band
- `.site-split`: inherited split layout
- `.site-content-stack`: inherited content-side stack
- `.site-cta-block*`: inherited closing action composition

These patterns remain implemented and may have current consumers. None is part of the active catalogue. The promoted `.site-section-warm` pattern is intentionally absent and lives in `docs/design-system/patterns.md`.

## Card, Panel, List, And Detail Families

- `.site-card*`, `.site-card-grid`
- `.site-topic-grid`, `.site-topic-card*`
- `.site-copy-panel`
- `.site-check-panel*`
- `.site-fee-card`
- `.site-principles`, `.site-principle`
- `.site-pill-row`
- `.site-trust-list*`
- `.site-detail-stack*`
- `.site-contact-strip`, `.site-contact-item`

These names describe current inherited source, not a coherent or approved component library. Verify semantic role and consumers one family at a time before promotion or cleanup.

## Rich Text And Copy Families

- `.rich-text`
- `.site-ruled-paragraph*`
- `.site-text-link`
- `.site-body-copy`, `.site-copy-flow`

This group mixes mounted production selectors with dormant inherited aliases. None is a current reusable contract; verify the individual source-side audit before reuse or cleanup.

The first source-level body-copy review batch is recorded per selector beside the shared `:where(...)` group in `src/styles.css`, with full evidence in `docs/checklists/css-review.md` under `CSS-1.2.1`. As of 2026-08-06, `.site-copy-flow`, `.section-heading__copy`, `.rich-text`, and `.site-broad-tabs__content` have mounted use through Working with Joel, while `.hero-copy-panel` is mounted only through `DevPageHero` on the two development test beds. Those five receive maintenance notes for specific ownership or overlap questions. `.site-body-copy`, `.site-ruled-paragraph`, `.site-ruled-paragraph--wide`, `.site-cta-block`, and `.hero-intro` have no TS/TSX consumer and remain delete candidates pending a separately actioned cleanup.

## Hero Family

Current inherited source includes `.hero-section`, `.hero-top`, `.hero-badge`, `.hero-display`, `.hero-intro`, `.hero-copy-panel`, `.hero-deck*`, `.hero-support-tagline`, `.hero-media-note*`, `.hero-principles-strip`, and `.hero-detail-stack*`.

Public pages consume parts of this family and layer page-specific composition on top. The family remains inherited implementation rather than an approved hero system. The former light `.hero-bg--default` helper, its unused noise asset, and duplicated public and development dark backgrounds were removed when `.site-hero-background` became the supported shared hero-surface contract.

## Navigation, Footer, And Broad-Tab Families

- `.site-header*`, navigation classes, and `.site-footer*` support the current `Layout` shell.
- `.site-broad-tabs*` supports `BroadTabPanel` on Working with Joel.

These functional surfaces require focused source and behaviour review before promotion or cleanup.

The second source-level selector review batch covers `.site-shell`, `.container`, `.site-header`, `.site-header__inner`, `.brand`, `.brand__name`, `.brand--header`, `.brand__name--header`, `.site-header__cluster`, and `.desktop-nav`. As of 2026-08-06, all ten are mounted through `Layout`, `Container`, or `DesktopNavigation`. The audit retained their distinct shell, wordmark, header-composition, and navigation jobs; the header inner now composes `Container`, and exact duplicate shared-shell border/wordmark colours were removed without promoting any selector.

## Page-Local Implementation

Contact owns the current enquiry form through `Contact.tsx` and `src/styles-contact.css`; there is no promoted form component or shared form pattern. Other page-prefixed selectors remain owned by their pages unless an authorized task promotes a repeated semantic contract.

Last consolidated from current source: 2026-08-06 — deep body-copy selector review under `DEBT-13` and `DEBT-21`.

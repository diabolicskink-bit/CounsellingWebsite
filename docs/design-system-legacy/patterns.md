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

These selectors have production consumers but have not completed promotion as current reusable contracts.

## Hero Family

Current source includes `.hero-section`, `.hero-bg--default`, `.hero-top`, `.hero-badge`, `.hero-display`, `.hero-intro`, `.hero-copy-panel`, `.hero-deck*`, `.hero-support-tagline`, `.hero-media-note*`, `.hero-principles-strip`, and `.hero-detail-stack*`.

Public pages consume parts of this family and layer page-specific composition on top. The family remains inherited implementation rather than an approved hero system.

## Navigation, Footer, And FAQ Families

- `.site-header*`, navigation classes, and `.site-footer*` support the current `Layout` shell.
- `.site-faq-*` supports the current FAQ components, but no component consumer outside their own source was found in the 2026-08-05 source search.
- `.site-broad-tabs*` supports `BroadTabPanel` on Working with Joel.

These functional surfaces require focused source and behaviour review before promotion or cleanup.

## Page-Local Implementation

Contact owns the current enquiry form through `Contact.tsx` and `src/styles-contact.css`; there is no promoted form component or shared form pattern. Other page-prefixed selectors remain owned by their pages unless an authorized task promotes a repeated semantic contract.

Last consolidated from current source: 2026-08-05 — active/legacy catalogue separation under `DEBT-37`.

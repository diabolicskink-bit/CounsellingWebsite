# Legacy Foundations Register

This is source-backed working evidence about inherited foundations that are outside the active design system. It neither authorizes new reuse nor makes removal safe.

Primary implementation currently lives in `src/styles.css`.

## Colour And Surface Tokens

The following root tokens are implemented but not promoted:

- `--paper`: root page background
- `--surface`: structural soft-green surface
- `--surface-strong`: light card, form-panel, and inset surface
- `--surface-muted`: very light alternate wash
- `--site-highlight-bg`: paper-sage section gradient
- `--site-footer-bg`: footer surface
- `--line`: borders and dividers
- `--ink`: strongest text and headings
- `--body`: paragraph text
- `--muted`: supporting copy
- `--faint`: quiet labels and metadata
- `--cedar-dark`: darker cedar interaction state
- `--cedar-soft`: cedar-related soft emphasis
- `--accent`, `--accent-deep`, `--accent-soft`: inherited secondary green accent roles

`--surface` and `--cedar-soft` currently share a literal value but have different recorded roles. That similarity is not evidence for consolidation or promotion.

The promoted `--cedar`, `--portrait-*`, `--section-warm`, and `--section-rule` contracts are intentionally absent; they live in `docs/design-system/foundations.md`.

## Layout And Material Tokens

The following root tokens are implemented but not promoted:

- `--max`: inherited main-content width
- `--radius`: inherited general radius
- `--shadow`: inherited floating-surface shadow

Existing pages and the `Container` component consume parts of this implementation. Confirm exact consumers before changing or removing any token.

## Typography And Leading Tokens

The following root tokens are implemented but not promoted:

- `--font-serif`, `--font-sans`, `--font-mono`
- `--type-display`, `--type-page-title`, `--type-section`, `--type-section-compact`
- `--type-card-title`, `--type-topic-title`
- `--type-body`, `--type-body-rich`, `--type-support`, `--type-small`
- `--type-label`, `--type-caption`, `--type-faq-question`
- `--type-hero-deck-lead`, `--type-hero-detail`, `--type-fee-display`
- `--leading-display`, `--leading-heading`, `--leading-card`, `--leading-body`, `--leading-rich`, `--leading-loose`

The type-size tokens adjust at the current `900px` breakpoint. Public source widely consumes these values, but their exact roles, exceptions, and raw-size overlap remain under `DEBT-20` and `DEBT-21` rather than active design-system authority.

## Global Baseline

`src/styles.css` also owns inherited global box sizing, root scrolling, body typography, heading defaults, paragraph defaults, link behaviour, focus treatment, and reduced-motion rules. These rules affect production but have not been promoted as one supported baseline contract.

Last consolidated from current source: 2026-08-05 — active/legacy catalogue separation under `DEBT-37`.

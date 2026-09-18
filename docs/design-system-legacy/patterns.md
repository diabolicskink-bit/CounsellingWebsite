# Legacy Patterns Register

This is source-backed working evidence about inherited selectors and compositions outside the active design system. Presence here does not authorize new reuse or removal.

Primary shared-looking implementation currently lives in `src/styles.css`; page-local implementation lives in the relevant `src/pages/**/*.css` files.

## Rich Text And Copy Families

`.hero-copy-panel` remains mounted only through `DevPageHero` on the two development test beds. Working with Joel's prose uses the promoted `.site-reading` role; its tab presentation is owned by the page stylesheet.

## Hero Family

The development-only `src/pages/dev/test-beds/test-beds.css` owns `.hero-top` and `.hero-copy-panel`, including their typography and responsive layout. They have no global CSS implementation.

The former `.hero-section`, `.hero-badge`, and `.hero-display` roles were replaced by the semantically named `.site-hero`, `.site-hero__eyebrow`, and `.site-hero__statement` active pattern on 2026-09-01 after their approved visuals and current consumers were verified. The remaining inherited family is not an approved complete hero system. Working with Joel owns its credential and portrait composition directly in its page stylesheet.

## Navigation, Footer, And Broad-Tab Families

- `.site-header*`, navigation classes, and `.site-footer*` support the current `Layout` shell.
- `.site-broad-tabs*` supports `BroadTabPanel` only on Working with Joel. Its page stylesheet owns both the initial all-panel reading layout and hydrated tab presentation; there is no parallel global presentation layer.

These functional surfaces require focused source and behaviour review before promotion or cleanup.

The current header wordmark uses `.brand` and `.brand__name` directly. `Layout` is their only consumer; focus and responsive rules live with the header styles in `src/styles.css`. `Container` owns containment while `.site-header__inner` owns the header grid.

## Page-Local Implementation

Home owns `.home-page__emphasis` in `src/pages/home/home.css`; the heading treatment has no global utility selector.

Contact owns the current enquiry form through `src/pages/contact/EnquiryForm.tsx` and `src/pages/contact/contact.css`; there is no promoted form component or shared form pattern. Other page-prefixed selectors remain owned by their pages unless an authorized task promotes a repeated semantic contract.

Last consolidated from current source: 2026-09-17 — global stylesheet cleanup and page-owned style consolidation.

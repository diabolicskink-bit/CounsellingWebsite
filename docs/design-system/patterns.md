# Supported Patterns

This catalogue contains every repeated semantic arrangement currently approved for deliberate reuse. Absence from this file means a selector family or composition is not part of the design system.

## Hero Surfaces

### `.site-hero`, `.site-hero__eyebrow`, and `.site-hero__statement`

- `Contract`: The established public-hero frame and opening roles. `.site-hero` supplies the `40px` vertical frame, content stacking, a `16px` eyebrow-to-statement gap, and the shared dark-hero foreground roles: primary `#fcfcfa`, eyebrow `#c8d9cc`, emphasis `#d9e5d9`, and supporting `rgba(239, 244, 240, 0.86)`. `.site-hero__eyebrow` supplies the uppercase sans label role; `.site-hero__statement` supplies the balanced serif opening statement. The public custom properties are `--site-hero-eyebrow-gap`, `--site-hero-statement-max-width`, `--site-hero-foreground`, `--site-hero-eyebrow-foreground`, `--site-hero-emphasis-foreground`, and `--site-hero-supporting-foreground`.
- `Boundary`: This is deliberately not a complete hero template. It does not own the surface, page-specific statement scale and measure, grid, actions, metadata, supporting-content structure, media, or line breaks. Those remain consumer-owned so the approved Home, Working with Joel, specialist, Articles, Contact, and other hero compositions are not flattened into one visual treatment. Pair it with `.site-hero-surface` for the current dark public surface. Use `.site-hero__statement` for the visual opening statement regardless of whether a route's heading semantics place that role on `h1` or `p`.
- `Implementation`: `.site-hero`, `.site-hero__eyebrow`, and `.site-hero__statement` in `src/design-system/patterns.css`.
- `Verified consumers`: Every current public hero uses the shared frame. Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, the Articles index, article heroes, and Crisis Support use the applicable opening roles; Contact retains its distinct page-owned heading roles. The Documents hero and shared development test-bed hero also consume the applicable roles without becoming production consumers.
- `Promoted`: 2026-09-01 — approved public-hero primitives renamed by semantic role and consolidated under `DEBT-37` without changing their established page compositions.

### `.site-hero-surface`

- `Contract`: Shared dark-green hero surface with one restrained sage highlight and a quiet lower boundary.
- `Boundary`: Owns only the surface material, clipping, isolation, and lower rule. It does not prescribe hero height, padding, grid, copy structure, typography, actions, media, or responsive composition.
- `Implementation`: `.site-hero-surface` in `src/design-system/patterns.css`.
- `Verified consumers`: The hero or opening section on Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, the Articles index and article heroes, Crisis Support, and Contact. The Design System cover, Documents hero, and shared development test-bed hero also use the same surface without becoming production consumers.
- `Promoted`: 2026-08-05 — shared public-hero background promotion under `DEBT-37`.

## Editorial Sections

### `.site-section-warm`

- `Contract`: Primary light editorial section band with a flat warm material, `60px` default vertical rhythm, and quiet lower boundary.
- `Boundary`: Owns `--section-warm`, default block padding, and the `--section-rule` lower boundary. It does not prescribe grid, content structure, heading treatment, internal rules, or page-specific responsive recomposition. Verified consumers may override only vertical padding when their narrow layout moves that space into inner regions.
- `Implementation`: `.site-section-warm` in `src/design-system/patterns.css`.
- `Verified consumers`: Home About Vive and closing invitation; Working with Joel introduction; Inclusion chapters; Contact enquiry task; Kink misread; ENM reasons; and LGBTQIA+ recognition sections.
- `Promoted`: 2026-08-05 — shared warm-section promotion under `DEBT-37`.

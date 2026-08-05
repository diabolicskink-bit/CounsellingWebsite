# Supported Patterns

This catalogue contains every repeated semantic arrangement currently approved for deliberate reuse. Absence from this file means a selector family or composition is not part of the design system.

## Hero Surfaces

### `.site-hero-background`

- `Contract`: Shared dark-green hero surface with one restrained sage highlight and a quiet lower boundary.
- `Boundary`: Owns only the background material, clipping, isolation, and lower rule. It does not prescribe hero height, padding, grid, copy structure, typography, actions, media, or responsive composition.
- `Implementation`: `.site-hero-background` in `src/styles.css`.
- `Verified consumers`: The hero or opening section on Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, and Contact. The Design System cover, Documents hero, and shared development test-bed hero also use the same surface without becoming production consumers.
- `Promoted`: 2026-08-05 — shared public-hero background promotion under `DEBT-37`.

## Editorial Sections

### `.site-section-warm`

- `Contract`: Primary light editorial section band with a flat warm material, `60px` default vertical rhythm, and quiet lower boundary.
- `Boundary`: Owns `--section-warm`, default block padding, and the `--section-rule` lower boundary. It does not prescribe grid, content structure, heading treatment, internal rules, or page-specific responsive recomposition. Verified consumers may override only vertical padding when their narrow layout moves that space into inner regions.
- `Implementation`: `.site-section-warm` in `src/styles.css`.
- `Verified consumers`: Home About Vive and closing invitation; Working with Joel introduction; Inclusion chapters; Contact enquiry task; Kink misread; ENM reasons; and LGBTQIA+ recognition sections.
- `Promoted`: 2026-08-05 — shared warm-section promotion under `DEBT-37`.

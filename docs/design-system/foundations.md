# Supported Foundations

This catalogue contains every foundation currently approved for deliberate reuse. Absence from this file means a token or global rule is not part of the design system.

## Typography Foundations

### `.site-reading`

- `Contract`: Default long-form reading role for public-page prose: the Inter-first `--font-sans` stack, `clamp(1.01rem, 1.12vw, 1.08rem)`, weight `400`, line-height `1.64`, and `--body` as the supported light-surface foreground.
- `Boundary`: Use for substantive paragraphs that need comfortable continuous reading, not headings, labels, navigation, buttons, captions, metadata, form controls, or compact supporting text. A consumer on a dark or otherwise incompatible surface may override only the foreground colour with a contrast-appropriate contextual value; the family, size, weight, and line-height remain part of the role. The underlying `--font-sans` token is not separately promoted by this contract.
- `Implementation`: `.site-reading` in `src/styles.css`.
- `Verified consumers`: Home About narrative, inclusive copy, and `<ContactInvitation />` copy; Working with Joel introduction, approach overview, and active tab copy; Inclusion hub hero support and chapter overviews; Kink and BDSM chapter prose; ENM and polyamory reasons, focus, and position prose; LGBTQIA+ recognition, assumptions, and disclosure prose; Contact first-message and crisis-support prose.
- `Promoted`: 2026-08-05 — owner-authorized reading-role promotion under `DEBT-20` and `DEBT-21`.

### `.site-reading--lead`

- `Contract`: Lead-paragraph modifier for one opening or summary paragraph within a reading group. Used together with `.site-reading`, it keeps the same family, responsive size, and `1.64` line-height while changing the foreground to `--ink` and the weight to `500`.
- `Boundary`: It is a restrained paragraph-level hierarchy step, not an inline bold utility, heading substitute, general emphasis class, or dark-surface treatment. Apply it only with `.site-reading` where the darker ink remains appropriate and accessible.
- `Implementation`: `.site-reading.site-reading--lead` in `src/styles.css`; consumers apply the public `.site-reading--lead` modifier alongside `.site-reading`.
- `Verified consumers`: Home About opening paragraph and Working with Joel introduction opening paragraph.
- `Promoted`: 2026-08-05 — owner-authorized lead-reading promotion under `DEBT-20` and `DEBT-21`.

## Colour And Material Foundations

### `--cedar`

- `Contract`: Primary brand accent (`#234b3d`) for action surfaces, strong interactive or editorial emphasis, and focus or boundary cues on verified light site surfaces.
- `Boundary`: Light text `#fcfcfa` on cedar has a 9.53:1 contrast ratio, cedar on `--paper` has a 9.05:1 ratio, and cedar on `--surface` has an 8.65:1 ratio. Do not assume the same contrast on photographs or dark-green surfaces. This contract does not include `--cedar-dark`, `--cedar-soft`, or adjacent colour tokens.
- `Implementation`: Defined on `:root` in `src/styles.css`.
- `Verified consumers`: `.site-header .header-button`, `.button--primary`, `.rich-text a`, `.site-text-link`, `.site-card__action`, `.site-footer a:focus-visible`, `.contact-invitation__action`, Working with Joel's active-tab rule, and Contact form labels, controls, links, and focus states.
- `Promoted`: 2026-08-03 — first colour promotion under `DEBT-37`.

### `--portrait-panel`

- `Contract`: Dark chocolate portrait material (`#6b5146`) for the outer frame around identified-person media.
- `Boundary`: It is not a generic brown surface, action colour, or substitute for the site's green action tokens. Light text `#fcfcfa` on the panel has a 7.07:1 contrast ratio.
- `Implementation`: Defined on `:root` in `src/styles.css`.
- `Verified consumers`: Home `.home-about__portrait` and Working with Joel `.working-with-joel-page__intro-note`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--portrait-frame`

- `Contract`: Pale warm backing (`#e4d9cc`) immediately around identified-person imagery inside `--portrait-panel`.
- `Boundary`: It is a non-text media material rather than a general page, card, or content surface.
- `Implementation`: Defined on `:root` in `src/styles.css`.
- `Verified consumers`: Home `.home-about__portrait-frame` and Working with Joel portrait `.hero-media-note__image`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--portrait-footer-tint`

- `Contract`: Translucent chocolate tint (`rgba(32, 21, 17, 0.12)`) for a footer or action band directly over `--portrait-panel`.
- `Boundary`: Do not treat the tint as an opaque colour or apply it over unrelated surfaces. Over the supported panel it composites to approximately `#624a40`, where light text `#fcfcfa` has a 7.95:1 contrast ratio. Home's stronger interaction tint remains page-local.
- `Implementation`: Defined on `:root` in `src/styles.css`.
- `Verified consumers`: Home `.home-about__portrait-link` and Working with Joel `.working-with-joel-page__intro-note-details`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--section-warm`

- `Contract`: Flat warm paper (`#f2efe8`) for primary light editorial sections across public routes.
- `Boundary`: It is not the root page canvas, footer material, a sage or dark section treatment, or authority for unrelated declarations that share the same literal value. Dark `#1f231f` ink has a 13.87:1 contrast ratio and `#3f493f` body text has an 8.18:1 ratio on the surface. Use `.site-section-warm` when the complete supported section contract is intended.
- `Implementation`: Defined on `:root` in `src/styles.css` and consumed through `.site-section-warm`.
- `Verified consumers`: Home About Vive and closing invitation; Working with Joel introduction; Inclusion chapters; Contact enquiry task; Kink misread; ENM reasons; and LGBTQIA+ recognition sections.
- `Promoted`: 2026-08-05 — shared warm-section promotion under `DEBT-37`.

### `--section-rule`

- `Contract`: Cedar-derived boundary (`rgba(35, 75, 61, 0.22)`) below `.site-section-warm`.
- `Boundary`: It is a quiet decorative separator, not a general border token or the sole cue to content structure.
- `Implementation`: Defined on `:root` in `src/styles.css` and used by `.site-section-warm`.
- `Verified consumers`: The supported warm editorial sections across all seven public content routes.
- `Promoted`: 2026-08-05 — shared warm-section pattern promotion under `DEBT-37`.

# Supported Foundations

This catalogue contains every foundation currently approved for deliberate reuse. Absence from this file means a token or global rule is not part of the design system.

## Typography Foundations

### `.site-reading`

- `Contract`: Default long-form reading role for public-page prose: the Inter-first `--font-sans` stack, responsive `1.005–1.04rem` size, weight `400`, line-height `1.63`, and `--body` as the supported light-surface foreground.
- `Boundary`: Use for substantive paragraphs that need comfortable continuous reading, not headings, labels, navigation, buttons, captions, metadata, form controls, or compact supporting text. A consumer on a dark or otherwise incompatible surface may override only the foreground colour with a contrast-appropriate contextual value; the family, size, weight, and line-height remain part of the role. The underlying `--font-sans` token is not separately promoted by this contract.
- `Implementation`: `.site-reading` in `src/design-system/foundations.css`.
- `Verified consumers`: Home About narrative, inclusive copy, and `<ContactInvitation />` copy; Working with Joel introduction, approach overview, and active tab copy; Inclusion hub hero support and chapter overviews; Kink and BDSM chapter prose; ENM and polyamory reasons, focus, and position prose; LGBTQIA+ recognition, assumptions, and disclosure prose; Crisis Support emergency guidance and section introductions; Contact first-message and crisis-support prose.
- `Promoted`: 2026-08-05 — owner-authorized reading-role promotion under `DEBT-20` and `DEBT-21`.

### `.site-reading--lead`

- `Contract`: Lead-paragraph modifier for one opening or summary paragraph within a reading group. Used together with `.site-reading`, it keeps the same family, responsive `1.005–1.04rem` size, and `1.63` line-height while changing the foreground to `--ink` and the weight to `500`.
- `Boundary`: It is a restrained paragraph-level hierarchy step, not an inline bold utility, heading substitute, general emphasis class, or dark-surface treatment. Apply it only with `.site-reading` where the darker ink remains appropriate and accessible.
- `Implementation`: `.site-reading.site-reading--lead` in `src/design-system/foundations.css`; consumers apply the public `.site-reading--lead` modifier alongside `.site-reading`.
- `Verified consumers`: Home About opening paragraph and Working with Joel introduction opening paragraph.
- `Promoted`: 2026-08-05 — owner-authorized lead-reading promotion under `DEBT-20` and `DEBT-21`.

## Colour And Material Foundations

### `--cedar`

- `Contract`: Primary brand accent (`#234b3d`) for action surfaces, strong interactive or editorial emphasis, and focus or boundary cues on verified light site surfaces.
- `Boundary`: Light text `#fcfcfa` on cedar has a 9.53:1 contrast ratio, cedar on `--paper` has a 9.05:1 ratio, and cedar on `--surface` has an 8.65:1 ratio. Do not assume the same contrast on photographs or dark-green surfaces. This contract does not include `--cedar-dark`, `--cedar-soft`, or adjacent colour tokens.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: `.site-header .header-button`, `.button--primary`, `.site-footer a:focus-visible`, `.contact-invitation__action`, Working with Joel's active-tab rule, and Contact form labels, controls, links, and focus states.
- `Promoted`: 2026-08-03 — first colour promotion under `DEBT-37`.

### `--portrait-panel`

- `Contract`: Dark chocolate portrait material (`#6b5146`) for the outer frame around identified-person media.
- `Boundary`: It is not a generic brown surface, action colour, or substitute for the site's green action tokens. Light text `#fcfcfa` on the panel has a 7.07:1 contrast ratio.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home `.home-about__portrait` and Working with Joel `.working-with-joel-page__intro-note`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--portrait-frame`

- `Contract`: Pale warm backing (`#e4d9cc`) immediately around identified-person imagery inside `--portrait-panel`.
- `Boundary`: It is a non-text media material rather than a general page, card, or content surface.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home `.home-about__portrait-frame` and Working with Joel portrait `.hero-media-note__image`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--portrait-footer-tint`

- `Contract`: Translucent chocolate tint (`rgba(32, 21, 17, 0.12)`) for a footer or action band directly over `--portrait-panel`.
- `Boundary`: Do not treat the tint as an opaque colour or apply it over unrelated surfaces. Over the supported panel it composites to approximately `#624a40`, where light text `#fcfcfa` has a 7.95:1 contrast ratio. Home's stronger interaction tint remains page-local.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home `.home-about__portrait-link` and Working with Joel `.working-with-joel-page__intro-note-details`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--section-warm`

- `Contract`: Flat warm paper (`#f2efe8`) for public editorial page backings, sections, and content materials.
- `Boundary`: It is distinct from the lighter root `--paper` canvas and is not authority for the shared header, navigation, or footer merely because they currently share its literal value. Dark `#1f231f` ink has a 13.87:1 contrast ratio and `#3f493f` body text has an 8.18:1 ratio on the surface. Use `.site-section-warm` when the complete supported section pattern is intended.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`; consumers may use the token as a material or `.site-section-warm` for the complete pattern.
- `Verified consumers`: Documents workspace; Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, and LGBTQIA+ page backings or editorial sections; Contact enquiry task; and the shared closing invitation.
- `Promoted`: 2026-08-05 — shared warm-section promotion under `DEBT-37`.

### `--section-sage`

- `Contract`: Pale sage material (`#dfe8dc`) for editorial fields, sections, supporting fills, and the Documents workspace navigation.
- `Boundary`: It is not the inherited `--surface` treatment, a generic success colour, or authority for every similar green tint. Dark `#1f231f` ink has a 12.68:1 contrast ratio and `#3f493f` body text has a 7.47:1 ratio on the surface.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Documents workspace and table headings; Working with Joel topic close; Inclusion, Kink and BDSM, ENM and polyamory, and LGBTQIA+ editorial fields; Contact essentials and submission mark; and development design-system workspace framing.
- `Promoted`: 2026-08-14 — owner-authorized editorial-material consolidation under `DEBT-37`.

### `--section-dark`

- `Contract`: Deep green (`#173028`) for dark editorial surfaces and strong foregrounds on supported warm or sage materials.
- `Boundary`: It is not the primary action colour, an interaction-state replacement for `--cedar` or `--cedar-dark`, or authority for nearby dark greens such as the Kink page's `#163229`. Light `#fcfcfa` text has a 13.72:1 contrast ratio on the surface; the token has 12.27:1 contrast on `--section-warm` and 11.22:1 on `--section-sage`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Documents navigation; Home inclusive-practice foregrounds; Working with Joel method and topic treatments; Inclusion, ENM and polyamory, and LGBTQIA+ editorial surfaces or foregrounds; and the Contact first-message heading.
- `Promoted`: 2026-08-14 — owner-authorized editorial-material consolidation under `DEBT-37`.

### `--section-dark-soft`

- `Contract`: Softened deep green (`#21483a`) used as the lighter endpoint of supported dark editorial gradients.
- `Boundary`: Use only with `--section-dark` in a dark content surface; it is not an independent page background, foreground colour, or interaction state. Light `#fcfcfa` text has a 9.96:1 contrast ratio on the colour.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home inclusive-practice background and Working with Joel topics background.
- `Promoted`: 2026-08-14 — owner-authorized editorial-material consolidation under `DEBT-37`.

### `--section-rule`

- `Contract`: Cedar-derived boundary (`rgba(35, 75, 61, 0.22)`) for quiet separators on supported light editorial materials.
- `Boundary`: It is not a general site-chrome or form-control border token and must not be the sole cue to content structure. The Contact form's stronger and quieter rules retain their page-owned opacities.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css` and used by `.site-section-warm` and verified editorial consumers.
- `Verified consumers`: Supported warm sections and closing invitations; Documents boundaries and Markdown content; Crisis Support service and region separators; and editorial rules across Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, and LGBTQIA+.
- `Promoted`: 2026-08-05 — shared warm-section pattern promotion under `DEBT-37`.

### `--section-dark-rule`

- `Contract`: Pale translucent boundary (`rgba(232, 239, 233, 0.2)`) for quiet separators over supported dark editorial and hero materials.
- `Boundary`: It is decorative, not a text colour, a light-surface rule, or the sole cue to content structure. Over `--section-dark` it composites to approximately `#41564f`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Specialist counselling hero actions; Home inclusive-practice topics; Working with Joel dark topics; Inclusion, Kink and BDSM, ENM and polyamory, and LGBTQIA+ dark editorial regions; and the Documents hero.
- `Promoted`: 2026-08-14 — owner-authorized editorial-material consolidation under `DEBT-37`.

# Existing Tokens And Baseline Implementation

Primary production tokens live in `src/styles.css`. This file inventories the current implementation. Fresh concepts should preserve the established font families, documented type roles and responsive scale, colour palette and semantic colour roles unless the current task explicitly changes the site's identity. Layout, spacing, radius, shadow, surface treatment, depth, and composition remain open creative variables.

## Incremental Status Rule

This inventory predates the lifecycle framework and has not been item-by-item reconciled. Every entry without an adjacent source-backed lifecycle record is `Unreviewed`, regardless of earlier wording. Unreviewed entries authorize neither new reuse nor removal; only an explicit `Shared-supported` record authorizes deliberate reuse.

When related work verifies or changes an item, add the record required by [governance](../governance.md): identifier, status, semantic role and boundary, source evidence and current public consumers, replacement or migration note, and review date/task. Do not classify unrelated entries during that work.

## Colour Tokens

- `--paper`: main page background.
- `--surface`: soft green section surface.
- `--surface-strong`: cards, form panels, and inset surfaces.
- `--surface-muted`: very light alternate wash.
- `--site-highlight-bg`: muted paper-sage alternate section band.
- `--site-footer-bg`: deeper green closing surface.
- `--line`: borders and dividers.
- `--ink`: headings and strongest text.
- `--body`: paragraph text.
- `--muted`: supporting copy.
- `--faint`: metadata and quiet labels.
- `--cedar`: primary accent and primary button background.
- `--cedar-dark`: hover and active state for cedar surfaces.
- `--cedar-soft`: subtle cedar-related emphasis.
- `--accent`, `--accent-deep`, `--accent-soft`: secondary green accent roles.
- `--portrait-panel`: dark chocolate outer material for the shared portrait treatment.
- `--portrait-frame`: pale warm backing immediately around portrait imagery.
- `--portrait-footer-tint`: translucent footer/action band over the portrait panel.

`--surface` and `--cedar-soft` currently share a value but represent different roles in existing styles: structural surface and accent-related emphasis.

### `--cedar`

- `Status`: `Shared-supported`
- `Role and boundary`: Primary brand accent (`#234b3d`) for action surfaces, strong interactive or editorial emphasis, and focus or boundary cues on verified light site surfaces. At its current value, light text `#fcfcfa` on cedar has a 9.53:1 contrast ratio, cedar on `--paper` has a 9.05:1 ratio, and cedar on `--surface` has an 8.65:1 ratio. Do not assume the same contrast on photographs or dark-green surfaces.
- `Source evidence and public consumers`: Defined on `:root` in `src/styles.css`. Route-reachable consumers include `.site-header .header-button`, `.button--primary`, `.rich-text a`, `.site-text-link`, `.site-card__action`, `.site-footer a:focus-visible`, `.home-closing__action`, Working with Joel's active-tab rule, and Contact form labels, controls, links, and focus states.
- `Replacement or migration`: `None`; existing consumers already use the production token. This promotion does not classify or authorize `--cedar-dark`, `--cedar-soft`, or other adjacent colour tokens.
- `Reviewed`: 2026-08-03 — first supported colour promotion under `DEBT-37`

### `--portrait-panel`

- `Status`: `Shared-supported`
- `Role and boundary`: Dark chocolate portrait material (`#6b5146`) for the outer frame around identified-person media. Light text `#fcfcfa` on the panel has a 7.07:1 contrast ratio. It is not a generic brown surface, action colour, or substitute for the site's green action tokens.
- `Source evidence and public consumers`: Defined on `:root` in `src/styles.css`. The Home `.home-about__portrait` figure and Working with Joel `.working-with-joel-page__intro-note` both use it as the outer portrait panel across their responsive layouts.
- `Replacement or migration`: Replaces the duplicate page-local `--home-photo-panel` and `--working-photo-panel` aliases without changing their rendered value.
- `Reviewed`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`

### `--portrait-frame`

- `Status`: `Shared-supported`
- `Role and boundary`: Pale warm portrait backing (`#e4d9cc`) used immediately behind an identified-person image inside `--portrait-panel`. It is a non-text media material rather than a general page, card, or content surface; dark `#1f231f` text would have an 11.45:1 contrast ratio, but text use is not part of the supported role.
- `Source evidence and public consumers`: Defined on `:root` in `src/styles.css`. Home's `.home-about__portrait-frame` and Working with Joel's portrait `.hero-media-note__image` use the same value for the inner image frame.
- `Replacement or migration`: Replaces the duplicate `#e4d9cc` declarations in `src/styles-home.css` and `src/styles-working-with-joel.css` without changing their rendered value.
- `Reviewed`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`

### `--portrait-footer-tint`

- `Status`: `Shared-supported`
- `Role and boundary`: Translucent chocolate tint (`rgba(32, 21, 17, 0.12)`) for the footer or action band layered directly over `--portrait-panel`. The resulting composite is approximately `#624a40`; light text `#fcfcfa` on that supported pairing has a 7.95:1 contrast ratio. Do not treat the tint as an opaque colour or apply it over unrelated surfaces.
- `Source evidence and public consumers`: Defined on `:root` in `src/styles.css`. It supplies the resting background for Home's `.home-about__portrait-link` and the matching Working with Joel `.working-with-joel-page__intro-note-details` band.
- `Replacement or migration`: Replaces the duplicate base tint in both page styles. Home's stronger `rgba(32, 21, 17, 0.28)` hover, focus, and coarse-pointer active state remains page-local and is not promoted by this record.
- `Reviewed`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`

## Layout Tokens

- `--max`: main content width.
- `--radius`: standard radius.
- `--shadow`: restrained floating-surface shadow.

Existing pages commonly use `Container` for major width containment. Fresh work may use a different containment and grid strategy. Reuse `Container` or shared section classes only after the selected direction shows that they fit.

## Typography Baseline

- `--font-serif`: Georgia, used for headings and editorial display roles.
- `--font-sans`: Inter/system sans stack, used for body, forms, labels, and navigation.
- `--font-mono`: monospace stack, used for inline code and technical references.
- Public pages should retain one clear page-topic `h1`. Existing shared heroes use `h1.hero-badge`, but fresh work does not need the shared hero or badge/display pairing.
- `.hero-display` is the shared expressive hero statement style and sits on `p` after `h1.hero-badge` in production heroes. It remains visually prominent without adding a non-structural section to the heading outline.
- `h2` uses `--type-section` for major section statements.
- `h3` uses `--type-card-title` for cards, grouped ideas, and nested content.
- `.rich-text` is the shared editorial reading wrapper for paragraph groups, contextual links, lists, blockquotes, tables, dividers, and inline code.

## Type Role Tokens

| Token | Role |
| --- | --- |
| `--type-display` | Expressive hero display via `.hero-display`. |
| `--type-page-title` | Plain page `h1` when no shared hero label is used. |
| `--type-section` | Main section headings, FAQ titles, and major section statements. |
| `--type-section-compact` | Contained section headings, rich text `h2`, form success headings, and closing CTA headings. |
| `--type-card-title` | Cards, grouped ideas, principles, linked detail titles, and nested headings. |
| `--type-topic-title` | Topic cards where the title needs more editorial presence. |
| `--type-body` | Standard paragraph copy. |
| `--type-body-rich` | Rich editorial paragraphs inside `.rich-text`; currently aliases the standard body size. |
| `--type-support` | Hero support copy, intro rails, and explanatory support text. |
| `--type-small` | Helper text, card list items, compact actions, and supporting notes. |
| `--type-label` | Eyebrows, small labels, form technical errors, and quiet metadata. |
| `--type-caption` | Captions, badges, hero principle details, and very small labels. |
| `--type-faq-question` | FAQ question text. |
| `--type-hero-deck-lead` | Serif lead sentence inside `.hero-deck`. |
| `--type-hero-detail` | Open hero detail stack items. |
| `--type-fee-display` | Large numeric/fee display. |

Type role variables currently adjust at breakpoints. New work should use this responsive type system while remaining free to combine and compose the roles in new ways. Changes to the shared type system should be explicit, deliberate, and documented when the task includes an identity or shared-system change.

## Body Copy Rule

Ordinary paragraph-style copy should use a literal `p` by default. If body copy cannot be a paragraph, use `.site-body-copy`; if a container owns body-copy children such as mixed `p` and `li` content, use `.site-copy-flow`.

Current page CSS generally handles layout concerns such as width, margin, and gaps. Fresh designs may define new layout-specific styling locally, but should retain the established type roles and scale unless the task explicitly changes the site's identity.

## Existing Spacing And Surfaces

- `.site-grid` supplies the current neutral section surface.
- `.site-highlight` supplies the current darker paper-sage alternate band.
- Existing cards and panels generally share restrained spacing, grid gaps, shadows, and boundaries.
- These surface and spacing conventions describe the present site and do not constrain fresh concepts.

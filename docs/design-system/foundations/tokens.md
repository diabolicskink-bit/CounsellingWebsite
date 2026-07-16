# Existing Tokens And Baseline Implementation

Primary production tokens live in `src/styles.css`. This file inventories the current implementation. Fresh concepts should preserve the established font families, documented type roles and responsive scale, colour palette and semantic colour roles unless the current task explicitly changes the site's identity. Layout, spacing, radius, shadow, surface treatment, depth, and composition remain open creative variables.

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

`--surface` and `--cedar-soft` currently share a value but represent different roles in existing styles: structural surface and accent-related emphasis.

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

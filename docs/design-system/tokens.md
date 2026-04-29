# Tokens And Baseline Rules

Primary tokens live in `src/styles.css`.

## Colour Tokens

- `--paper`: main page background
- `--surface`: soft green section surface
- `--surface-strong`: cards, form panels, inset surfaces
- `--surface-muted`: very light alternate wash
- `--site-highlight-bg`: quiet alternate section surface used by `.site-highlight`
- `--site-footer-bg`: deeper green closing surface used by `.site-footer`
- `--line`: borders and dividers
- `--ink`: headings and strongest text
- `--body`: paragraph text
- `--muted`: supporting copy
- `--faint`: metadata and quiet labels
- `--cedar`: primary accent and primary button background
- `--cedar-dark`: hover and active state for cedar surfaces
- `--cedar-soft`: subtle accent background
- `--accent`: secondary green accent
- `--accent-deep`: deepest accent for limited emphasis
- `--accent-soft`: alternate light green wash

`--surface` and `--cedar-soft` currently share the same value. Keep the role distinction clear: `--surface` is for section and structural surfaces, while `--cedar-soft` is for subtle cedar-related emphasis such as tertiary buttons, inline code, and selected choices.

## Layout Tokens

- `--max`: `1180px` content width
- `--radius`: `8px` standard radius
- `--shadow`: very restrained floating-surface shadow

## Typography Baseline

- `--font-serif`: Georgia, used for headings and editorial display roles.
- `--font-sans`: Inter/system sans stack, used for body, forms, labels, and navigation.
- `--font-mono`: monospace stack, used for inline code and technical references.
- `h1` uses `--type-page-title` and should appear once per page when the page is not using `.hero-display`.
- `h2` uses `--type-section` for major section statements.
- `h3` uses `--type-card-title` for cards, grouped ideas, and nested content.
- `.rich-text` is the shared editorial reading wrapper for paragraph groups, contextual links, lists, blockquotes, tables, dividers, and inline code.
- Rich text links must stay visibly linked with cedar color, weight, underline, and a quiet focus outline.

## Type Role Tokens

| Token | Role |
| --- | --- |
| `--type-display` | Page-opening hero display via `.hero-display`. |
| `--type-page-title` | Plain page `h1` when no hero display is used. |
| `--type-section` | Main section headings, FAQ titles, and major section statements. |
| `--type-section-compact` | Contained section headings, rich text `h2`, form success headings, and closing CTA headings. |
| `--type-card-title` | Cards, grouped ideas, principles, linked detail titles, and nested headings. |
| `--type-topic-title` | Topic cards where the title needs a little more editorial presence. |
| `--type-body` | Default paragraphs, forms, FAQ answers, ruled stacks, and practical copy. |
| `--type-body-rich` | Rich editorial paragraphs inside `.rich-text`. |
| `--type-support` | Hero support copy, intro rails, and larger explanatory support text. |
| `--type-small` | Helper text, card list items, compact actions, and supporting notes. |
| `--type-label` | Eyebrows, small labels, form technical errors, and quiet metadata. |
| `--type-caption` | Captions, badges, hero principle details, and very small labels. |
| `--type-faq-question` | FAQ question text. |
| `--type-hero-deck-lead` | Serif lead sentence inside `.hero-deck`. |
| `--type-hero-detail` | Open hero detail stack items. |
| `--type-fee-display` | Large numeric/fee display. |

Type role variables are allowed to adjust at breakpoints. At the current compact breakpoint, `--type-display`, `--type-page-title`, `--type-section`, `--type-section-compact`, and `--type-hero-detail` compress. Avoid adding viewport-scaled font sizes to new shared production rules, and do not copy desktop display sizes into mobile-specific page styles.

## Spacing Rules

- Use the shared `.container` width logic via the `Container` component.
- Major sections should usually have generous block padding.
- Use `.site-grid` for the neutral section surface and `.site-highlight` for the quieter alternating surface before creating page-scoped section wrappers.
- Card and panel spacing should stay consistent across pages.
- Card grid gaps should stay in the restrained range already used across the site.

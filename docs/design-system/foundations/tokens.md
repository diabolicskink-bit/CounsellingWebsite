# Tokens And Baseline Rules

Primary production tokens live in `src/styles.css`.

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

`--surface` and `--cedar-soft` may share a value, but their roles are different. Keep `--surface` structural and `--cedar-soft` accent-related.

## Layout Tokens

- `--max`: main content width.
- `--radius`: standard radius.
- `--shadow`: restrained floating-surface shadow.

Use the `Container` component for major page width containment. Use shared section classes when the page follows the standard rhythm, and page-scoped wrappers when the composition genuinely differs.

## Typography Baseline

- `--font-serif`: Georgia, used for headings and editorial display roles.
- `--font-sans`: Inter/system sans stack, used for body, forms, labels, and navigation.
- `--font-mono`: monospace stack, used for inline code and technical references.
- `h1` should appear once per page. In shared heroes, use `h1.hero-badge` for the concise visible page-topic label.
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

Type role variables may adjust at breakpoints. Do not add viewport-scaled font sizes to new shared production rules.

## Body Copy Rule

Ordinary paragraph-style copy should use a literal `p` by default. If body copy cannot be a paragraph, use `.site-body-copy`; if a container owns body-copy children such as mixed `p` and `li` content, use `.site-copy-flow`.

Page CSS should usually handle layout concerns such as width, margin, and gaps. Do not restate `color: var(--body)`, `font-size: var(--type-body)`, and `line-height: var(--leading-body)` unless a deliberately different role is being defined.

## Spacing And Surfaces

- Use `.site-grid` for the neutral section surface.
- Use `.site-highlight` for the darker paper-sage alternating band when the shared section rhythm fits.
- Keep card and panel spacing consistent across pages.
- Keep grid gaps in the restrained range already used across the site.
- Use low shadows and soft boundaries before adding stronger separation.

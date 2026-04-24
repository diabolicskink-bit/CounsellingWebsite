# Tokens And Baseline Rules

Primary tokens live in `src/styles.css`.

## Colour Tokens

- `--paper`: main page background
- `--surface`: soft green section surface
- `--surface-strong`: cards, form panels, inset surfaces
- `--surface-muted`: very light alternate wash
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

## Layout Tokens

- `--max`: `1180px` content width
- `--radius`: `8px` standard radius
- `--shadow`: very restrained floating-surface shadow

## Typography Baseline

- Headings use serif styling defined in `src/styles.css`.
- Body copy uses the shared sans-serif stack defined in `src/styles.css`.
- `h1` is large, editorial, and should appear once per page.
- `h2` is the main section heading.
- `h3` supports cards and nested content groups.
- `.rich-text` is the shared editorial reading wrapper for paragraph groups, contextual links, lists, blockquotes, tables, dividers, and inline code.
- Rich text links must stay visibly linked with cedar color, weight, underline, and a quiet focus outline.

## Spacing Rules

- Use the shared `.container` width logic via the `Container` component.
- Major sections should usually have generous block padding.
- Use `.site-grid` for the neutral section surface and `.site-highlight` for the soft-green alternating surface before creating page-scoped section wrappers.
- Card and panel spacing should stay consistent across pages.
- Card grid gaps should stay in the restrained range already used across the site.

## Hard Constraints

- Do not introduce hex values directly in components if an existing token can be used.
- Do not introduce custom radius values unless the system is intentionally expanding.
- Do not use heavy shadows where a border will do.
- Do not create a new spacing scale ad hoc inside page components.

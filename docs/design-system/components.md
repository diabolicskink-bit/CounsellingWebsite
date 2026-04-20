# Shared Components And Patterns

Prefer these shared building blocks before creating anything new.

## React Components

- `src/components/Container.tsx`
  Use for major page width containment.
- `src/components/Button.tsx`
  Use for shared action styles. Prefer its built-in variants: `primary`, `secondary`, `tertiary`, `light`.
- `src/components/Card.tsx`
  Use for generic card containment when the shared card shell is appropriate.
- `src/components/SectionHeading.tsx`
  Use for repeated section heading structure.
- `src/components/Layout.tsx`
  Preserve the existing site shell and navigation treatment.

## Shared CSS Patterns

- `.site-card`
  Primary card treatment for service themes, reassurance points, and practical grouped content.
- `.site-card--link`
  Linked destination card based on the shared card primitive.
- `.site-card__list`
  Short bullet lists inside linked or richer cards.
- `.site-card__action`
  Trailing action row for linked cards.
- `.site-topic-card`
  Shared topic/issue card treatment for uneven editorial card layouts where copy-led tiles need the same visual language but custom placement.
- `.site-topic-card--soft`
  Soft green variant of the shared topic card.
- `.site-topic-card--narrow`
  Shared tighter-copy variant for narrower topic cards.
- `.site-pill-row`
  Short non-navigational tags or topic pills.
- `.site-split`
  Split layout pairing a heading block with contained reading content.
- `.site-copy-panel`
  Contained panel for explanatory rich text.
- `.site-principles` and `.site-principle`
  Shared grouped principle/value blocks.
- `.design-language-trust-list`
  Compact trust strip for short factual reassurance items.
- `.site-form`
  Shared form shell; keep inputs aligned with existing field styling.
- `.hero-section`, `.hero-top`, `.hero-display`, `.hero-copy-panel`
  Shared public-page hero system.

## Design System Showcase Pages

Use these pages as living examples of how shared patterns should look:

- `src/pages/design-system/DS_Foundations.tsx`
  Tokens, typography, spacing, and baseline HTML treatment.
- `src/pages/design-system/DS_Components.tsx`
  Reusable UI pieces such as buttons, cards, trust strips, and forms.
- `src/pages/design-system/DS_Patterns.tsx`
  Reusable page-level composition patterns.
- `src/pages/design-system/DS_Heroes.tsx`
  Hero variations and hero usage guidance.

## Reuse Rule

If a new page needs a card, panel, hero, split section, principle block, or trust treatment that is close to an existing pattern, extend the shared pattern instead of creating a page-specific lookalike.

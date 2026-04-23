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
- `src/components/FaqSection.tsx`
  Use for shared FAQ sections site-wide. Keep question-and-answer content data-driven at page level and pass it into this component.
- `src/components/Layout.tsx`
  Preserve the existing site shell, navigation treatment, and compact footer structure.

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
- `.site-text-link`
  Inline contextual link treatment for low-emphasis navigation inside supporting copy or demos.
- `.site-trust-list`
  Compact trust strip for short factual reassurance items.
- `.site-trust-list--highlight-last`
  Optional trust-strip modifier that moves the final item onto its own line and gives it cedar emphasis when it functions as a positioning statement.
- `.site-ruled-paragraph`
  Single paragraph with a left rule and inset for short reflective or orienting copy that needs quiet emphasis without becoming a full panel.
- `.site-detail-stack`
  Shared ruled stack for short detail items or compact grouped statements. It provides spacing and separators while the item markup controls the text hierarchy.
- `.site-split`
  Split layout pairing a heading block with contained reading content.
- `.site-copy-panel`
  Contained panel for explanatory rich text.
- `.site-cta-block`, `.site-cta-block__inner`, `.site-cta-block__copy`
  Shared closing CTA section for one clear next step. This is the authoritative site-wide final prompt pattern: large serif heading, contained top rule, split layout, and a single right-aligned action.
- `.site-contact-strip` and `.site-contact-item`
  Shared contact-value strip for small sets of practical contact details with icon, label, and value.
- `.site-footer`, `.site-footer__primary`, `.site-footer__secondary`
  Shared compact footer treatment for brand, utility links, and one quiet detail line. Keep it thin; do not turn it into a large CTA section.
- `.site-fee-card`
  Shared highlighted price or fee card for one strong amount and a small amount of explanatory copy.
- `.site-principles` and `.site-principle`
  Shared grouped principle/value blocks.
- `.site-form`
  Shared form shell; keep inputs aligned with existing field styling.
- `.hero-intro`
  Shared intro paragraph for text-led heroes with longer opening copy. Use it under hero headings when the intro needs a controlled measure.
- `.hero-bg--default`
  Shared continuous paper-and-sage hero surface. This is the one shared hero background in the system, and it should read as one calm editorial field with soft depth rather than a visible shape or alternate skin.
- `.hero-section`, `.hero-top`, `.hero-display`, `.hero-copy-panel`, `.hero-deck`, `.hero-detail-stack`
  Shared public-page hero design system. This is a separate authoritative shared subsystem alongside `site-*`, not a legacy variation.
- `.hero-display`
  The authoritative page-opening H1 pattern for production heroes. If a page only needs a narrower or wider title measure, set `--hero-display-max-width` at page scope instead of adding another page-specific H1 class.

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

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
  Use for shared FAQ sections site-wide. Keep question-and-answer content data-driven at page level and pass it into this component. When a page needs the highlighted alternating section surface, pass `className="site-highlight"`.
- `src/components/EnquiryForm.tsx`
  Use for the site contact/enquiry form. The production Enquire page and the design-system example should both render this component with `src/data/enquiry.ts` content so form flow, subject lines, fields, and direct-submit behaviour stay aligned.
- `src/components/Layout.tsx`
  Preserve the existing site shell, navigation treatment, and compact footer structure.

## Shared CSS Patterns

- `.site-grid`
  Default public-page section surface. Use this for the first non-hero section and as the neutral step in the shared alternating page rhythm.
- `.site-highlight`
  Alternate soft-green public-page section surface. Use this between `site-grid` sections to keep body sections alternating without inventing page-specific wrappers.
- `.site-content-stack`
  Shared vertical stack for pairing a card grid, copy panel, principle list, or ruled note inside the content side of a split section.
- `.site-topic-grid`
  Shared responsive grid for compact topic cards inside a content column.
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
- `.site-ruled-paragraph--wide`
  Wider reading modifier for ruled notes that sit under card grids or rich-text panels.
- `.site-detail-stack`
  Shared ruled stack for short detail items or compact grouped statements. It provides spacing and separators while the item markup controls the text hierarchy.
- `.site-detail-stack--linked` and `site-detail-stack__*`
  Shared linked variation of the detail stack for destination lists with a serif title, trailing action cue, and one short supporting line of copy.
- `.site-split`
  Split layout pairing a heading block with contained reading content.
- `.site-copy-panel`
  Contained panel for explanatory rich text.
- `.rich-text`
  Shared editorial reading wrapper for paragraph groups, contextual links, lists, blockquotes, tables, dividers, and inline code. Use it when rich content needs baseline typography and link treatment without page-specific styling.
- `.site-cta-block`, `.site-cta-block__inner`, `.site-cta-block__copy`
  Shared closing CTA section for one clear next step. This is the authoritative site-wide final prompt pattern: large serif heading, calm split layout, and a single right-aligned action. It can also sit on `site-highlight` when the alternating section rhythm calls for the highlighted surface.
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
- `.site-form__grid`, `.site-form__row--full`, `.site-form__submit`
  Shared enquiry form layout helpers used by `EnquiryForm`. Do not recreate this two-column form grid with page-scoped classes.
- `.site-form__status`
  Shared status message for direct form submission feedback. After a successful enquiry submission, `EnquiryForm` replaces the fields with the success state from `src/data/enquiry.ts` so the page only shows the confirmation and reply expectation.
- `.site-form__choice-group`, `.site-form__choices`, `.site-form__choice`
  Shared radio-choice treatment for the progressive enquiry flow. Use for compact form routing choices, not for navigation cards.
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

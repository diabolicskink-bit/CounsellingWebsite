# Page Patterns

This file owns active shared CSS patterns and page-level composition guidance.

## Shared Section Patterns

- `.site-grid`
  Neutral public-page section surface with a pale paper gradient.
- `.site-highlight`
  Muted paper-sage alternate section band.
- `.site-split`
  Split layout pairing a heading block with contained reading content.
- `.site-content-stack`
  Shared vertical stack for pairing card grids, copy panels, principle lists, or ruled notes inside a content side.
- `.site-cta-block`, `.site-cta-block__inner`, `.site-cta-block__copy`
  Shared closing CTA section for one clear next step.

Use page-scoped wrappers when a section needs a genuinely different composition.

## Cards, Panels, And Lists

- `.site-card`, `.site-card--link`, `.site-card__list`, `.site-card__action`
  General shared card system.
- `.site-topic-grid`, `.site-topic-card`, `.site-topic-card--soft`, `.site-topic-card--narrow`
  Topic and issue card layouts.
- `.site-copy-panel`
  Contained panel for explanatory rich text.
- `.site-check-panel`, `.site-check-panel--grid`
  Practical check-list panels and grid check panels.
- `.site-fee-card`
  Highlighted price or fee card for one strong amount and a small amount of explanatory copy.
- `.site-principles`, `.site-principle`
  Grouped principle/value blocks.
- `.site-pill-row`
  Short non-navigational tags or topic pills.
- `.site-trust-list`, `.site-trust-list--highlight-last`
  Compact trust strip for short factual reassurance items.
- `.site-detail-stack`, `.site-detail-stack--linked`, `site-detail-stack__*`
  Ruled detail stack and linked destination list pattern.
- `.site-contact-strip`, `.site-contact-item`
  Small sets of practical contact details with icon, label, and value.

Ruled accents and side-border panels are acceptable where they are part of active shared patterns. Avoid near-duplicate card or panel treatments.

## Rich Text And Copy

- `.rich-text`
  Shared editorial reading wrapper for paragraph groups, contextual links, lists, blockquotes, tables, dividers, and inline code.
- `.site-ruled-paragraph`, `.site-ruled-paragraph--wide`
  Short reflective or orienting copy that needs quiet emphasis without becoming a full panel.
- `.site-text-link`
  Inline contextual link treatment for low-emphasis navigation inside supporting copy or demos.
- `.site-body-copy`, `.site-copy-flow`
  Body-copy helpers when literal paragraphs are not enough.

## Hero System

The `hero-*` system is a separate active shared subsystem alongside `site-*`.

- `.hero-section`
  Shared hero section shell and default spacing.
- `.hero-bg--default`
  Continuous paper-and-sage hero surface.
- `.hero-top`
  Main hero layout region.
- `.hero-badge`
  Concise visible page-topic H1.
- `.hero-display`
  Expressive serif hero statement on `p` after `h1.hero-badge`, kept outside the semantic heading outline.
- `.hero-intro`
  Longer opening intro paragraph.
- `.hero-copy-panel`
  Ruled support copy panel.
- `.hero-deck`
  Larger hero text group with a lead/body rhythm.
- `.hero-support-tagline`
  Short trust/support row.
- `.hero-media-note`
  Quiet media note/caption.
- `.hero-media-note--portrait`, `.hero-media-note__tag`
  Portrait media variant with the shared framed image treatment and overlaid practitioner name tag.
- `.hero-principles-strip`
  Hero-adjacent principle strip.
- `.hero-detail-stack`
  Open hero detail stack.

Use page-scoped hero classes only for composition-specific needs layered on top of the shared hero system.

## Forms

- `.site-form`
  Shared form shell.
- `.site-form__grid`, `.site-form__row--full`, `.site-form__submit`
  Shared enquiry form layout helpers.
- `.site-form__status`
  Direct form submission feedback.
- `.site-form__choice-group`, `.site-form__choices`, `.site-form__choice`
  Radio-choice treatment for the progressive enquiry flow.

Do not recreate the enquiry form with page-scoped classes. Use `EnquiryForm` and `src/data/enquiry.ts`.

## Footer And Navigation

- `.site-footer`, `.site-footer__primary`, `.site-footer__secondary`
  Compact footer treatment for brand, utility links, one quiet detail line, and the deeper green closing surface.

The production header and navigation live in `Layout`. They are implemented but not yet represented as a dedicated design-system page section.

## Reuse Rule

If a new page needs a card, panel, hero, split section, principle block, trust treatment, form pattern, or CTA that is close to an existing pattern, extend the shared pattern instead of creating a page-specific lookalike.

If the existing pattern is only a loose resemblance, use a page-scoped composition or promote a new shared pattern when the repeated need is clear.

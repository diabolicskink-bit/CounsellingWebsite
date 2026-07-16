# Page Patterns

This file inventories shared CSS and page-level compositions that currently exist. Under the creative-within-identity policy, these patterns are optional implementation references rather than required or preferred structures for fresh work. Agents should actively explore content-shaped alternatives within the site's typography, type scale, and colour scheme.

Establish and select the page concept before consulting this catalogue. A pattern being available, visually similar, or already used elsewhere is not sufficient reason to use it.

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

Fresh work may use page-scoped or replacement composition regardless of whether an existing section pattern is superficially similar. Use these shared sections only when they support the already-selected direction.

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

Ruled accents and side-border panels occur in the current implementation. They carry no preference for new work. Avoid accidental near-duplicates when deliberate reuse would genuinely serve the concept; otherwise create the treatment the selected direction requires.

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

The `hero-*` system is a currently implemented shared subsystem alongside `site-*`. It is not canonical or mandatory for fresh pages and redesigns.

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

Fresh work may retain, modify, replace, or omit the shared hero composition. Preserve one clear page topic and valid heading structure, but do not require `hero-*`, the badge/display pairing, or layering page styles on top of the current hero.

## Forms

- `.site-form`
  Shared form shell.
- `.site-form__heading`
  Semantic form heading that keeps the shared eyebrow treatment and names the control-bearing form through `aria-labelledby`.
- `.site-form__grid`, `.site-form__row--full`, `.site-form__submit`
  Shared enquiry form layout helpers.
- `.site-form__status`
  Direct form submission feedback.
- `.site-form__choice-group`, `.site-form__choices`, `.site-form__choice`
  Radio-choice treatment for the progressive enquiry flow.

For the current enquiry flow, preserve the behaviour and data contract owned by `EnquiryForm` and `src/data/enquiry.ts` unless the task explicitly changes them. Their current visual treatment may be redesigned independently.

## Footer And Navigation

- `.site-footer`, `.site-footer__primary`, `.site-footer__secondary`
  Compact footer treatment for brand, utility links, one quiet detail line, and the deeper green closing surface.

The production header and navigation live in `Layout`. They are implemented but not yet represented as a dedicated design-system page section.

## Selection Order

1. Establish the page purpose, content architecture, and visual direction without this catalogue as a template.
2. Identify the semantic, interaction, accessibility, and data contracts the implementation must preserve.
3. Compare the selected direction with existing implementation.
4. Reuse an existing pattern only when it fits without changing the direction or creating unnecessary maintenance cost.
5. Use page-scoped or replacement implementation when existing patterns are merely similar, visually constraining, or conceptually wrong.
6. Promote a pattern only when the task includes shared-system work and the pattern has proved useful beyond one context.

The current hero, split section, cards, panels, topic grids, trust treatments, FAQ surface, and closing CTA do not form a required page skeleton. Do not assemble them by default or treat their combined silhouette as the Vive visual identity.

# Page Patterns

This file inventories CSS and page-level compositions recorded before the lifecycle framework. Under the creative-within-identity policy, these patterns are implementation references rather than required or preferred structures for fresh work. Agents should actively explore content-shaped alternatives within the site's typography, type scale, and colour scheme.

Establish and select the page concept before consulting this catalogue. A pattern being available, visually similar, or already used elsewhere is not sufficient reason to reuse it.

## Incremental Status Rule

This inventory has not been item-by-item reconciled. Every entry without an adjacent source-backed lifecycle record is `Unreviewed`, regardless of its section heading, shared-looking name, source location, or earlier description. Unreviewed entries authorize neither new reuse nor removal; only an explicit `Shared-supported` record authorizes deliberate reuse.

When related work verifies or changes an item, add the record required by [governance](../governance.md): identifier, status, semantic role and boundary, source evidence and current public consumers, replacement or migration note, and review date/task. Do not classify unrelated entries during that work.

### `/design-language/*` rendered catalogue

- `Status`: `Removed`
- `Role and boundary`: Former development-only rendered snapshot of earlier design-system guidance.
- `Source evidence and public consumers`: All five routes, their page modules, route constants, lazy imports, navigation entry, and archive layout were removed after verification found no production dependency. The paths remain in the retired-route boundary test and resolve through the ordinary Not Found route.
- `Replacement or migration`: Written lifecycle governance and item registers remain under `docs/design-system/`. The separate `/design-system` workspace neither restores nor redirects this snapshot.
- `Reviewed`: 2026-08-03 — rendered design catalogue retirement

### Rendered-catalogue support selectors

- `Status`: `Removed`
- `Role and boundary`: Former `.ds-archive-notice*`, `.ds-overview-*`, `.ds-section*`, `.ds-foundation-*`, `.ds-hero-demo*`, and `design-language-*` development-only catalogue presentation.
- `Source evidence and public consumers`: Removed from `src/styles-dev.css` after source search verified that their only consumers were the retired catalogue pages. The remaining `ds-layout*` and `ds-sidebar*` rules continue to support the separate Documents route.
- `Replacement or migration`: `None`.
- `Reviewed`: 2026-08-03 — rendered design catalogue retirement

### `/design-system` rendered workspace

- `Status`: `Historical/dev-only`
- `Role and boundary`: Development-only governance ledger and empty supported-specimen workspace. It visualises completed written authority but does not define reusable API.
- `Source evidence and public consumers`: Implemented by `src/pages/dev/DesignSystem.tsx` and registered only through the development route map. It has no production consumer and currently contains zero supported specimens.
- `Replacement or migration`: `None`; the route is separate from and does not restore the retired `/design-language/*` snapshot.
- `Reviewed`: 2026-08-03 — source-backed design-system workspace setup

### `.system-workspace*`, `.system-specimen*`

- `Status`: `Historical/dev-only`
- `Role and boundary`: Page-scoped presentation for the `/design-system` governance ledger and its strict supported-specimen frame.
- `Source evidence and public consumers`: Implemented in `src/styles-design-system.css`; imported only by the development workspace, with no production route consumer.
- `Replacement or migration`: `None`; do not promote these documentation styles as production UI.
- `Reviewed`: 2026-08-03 — source-backed design-system workspace setup

## Recorded Section Patterns

- `.site-grid`
  Neutral public-page section surface with a pale paper gradient.
- `.site-highlight`
  Muted paper-sage alternate section band.
- `.site-split`
  Split layout pairing a heading block with contained reading content.
- `.site-content-stack`
  Recorded vertical stack for pairing card grids, copy panels, principle lists, or ruled notes inside a content side.
- `.site-cta-block`, `.site-cta-block__inner`, `.site-cta-block__copy`
  Recorded closing CTA section for one clear next step.

Fresh work should use page-scoped composition regardless of whether an existing section pattern is superficially similar. Reuse an entry only when it is explicitly `Shared-supported` and supports the already-selected direction.

## Cards, Panels, And Lists

- `.site-card`, `.site-card--link`, `.site-card__list`, `.site-card__action`
  Recorded general card implementation.
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
  Recorded editorial reading wrapper for semantic headings, paragraph groups, contextual links, lists, blockquotes, simple tables, dividers, inline code, and an optional contextual button.
- `.site-ruled-paragraph`, `.site-ruled-paragraph--wide`
  Short reflective or orienting copy that needs quiet emphasis without becoming a full panel.
- `.site-text-link`
  Inline contextual link treatment for low-emphasis navigation inside supporting copy or demos.
- `.site-body-copy`, `.site-copy-flow`
  Body-copy helpers when literal paragraphs are not enough.

## Hero System

The `hero-*` and `site-*` families exist in current production source. That implementation fact does not assign lifecycle status; their entries remain `Unreviewed` until adjacent source-backed records say otherwise.

- `.hero-section`
  Recorded hero section shell and default spacing, including the `--hero-badge-display-gap` relationship.
- `.hero-bg--default`
  Continuous paper-and-sage hero surface.
- `.hero-top`
  Main hero layout region.
- `.hero-badge`
  Concise visible page-topic H1.
- `.hero-display`
  Expressive serif hero statement on `p` after `h1.hero-badge`, kept outside the semantic heading outline. Recorded adjacent badge/display pairs use a 16px gap.
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
  Recorded portrait media variant with a framed image treatment and overlaid practitioner name tag.
- `.hero-principles-strip`
  Hero-adjacent principle strip.
- `.hero-detail-stack`
  Open hero detail stack.

Fresh work should preserve one clear page topic and valid heading structure without assuming `hero-*`, the badge/display pairing, or the recorded hero composition is reusable. Use a recorded hero item only when its adjacent status is `Shared-supported`; otherwise keep new work `Page-local`.

### `.site-form*`

- `Status`: `Removed`
- `Role and boundary`: Former shared production styling for the progressive enquiry form.
- `Source evidence and public consumers`: Removed from `src/styles.css`; production enquiry form markup and styling are now page-local to `Contact.tsx` and `src/styles-contact.css`.
- `Replacement or migration`: Contact retains shared recipient and success content from `src/data/enquiry.ts`, but no general-purpose shared form CSS API replaces this selector family.
- `Reviewed`: 2026-08-03 — staging Contact/form consolidation

## Footer And Navigation

- `.site-footer`, `.site-footer__main`, `.site-footer__nav`, `.site-footer__email`, `.site-footer__utility`, `.site-footer__social`
  Compact warm footer treatment for the brand, short navigation, contact details, understated social-profile links, and copyright.

The production header and navigation live in `Layout`. They are implemented but not yet represented as a dedicated design-system page section.

## Selection Order

1. Establish the page purpose, content architecture, and visual direction without this catalogue as a template.
2. Identify the semantic, interaction, accessibility, and data contracts the implementation must preserve.
3. Compare the selected direction with existing implementation.
4. Reuse an existing pattern only when its item record is `Shared-supported` and it fits without changing the direction or creating unnecessary maintenance cost.
5. Use page-scoped or replacement implementation when existing patterns are merely similar, visually constraining, or conceptually wrong.
6. Promote a pattern only when the task includes shared-system work and the pattern has proved useful beyond one context.

The recorded hero, split section, cards, panels, topic grids, trust treatments, FAQ surface, and closing CTA do not form a required page skeleton. Do not assemble them by default or treat their combined silhouette as the Vive visual identity.

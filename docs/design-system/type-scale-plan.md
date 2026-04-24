# Type Scale Assessment And Plan

This document captures the current state of the site's type scale and a high-level plan for tightening it without turning the site into a different design.

The goal is not to make a large team-proof token system. This is a single-owner website, so the right outcome is a clear, usable set of type roles that make future page work easier and keep the site feeling calm, editorial, and coherent.

## Implementation Status

The first implementation slice has been completed:

- Type role tokens now live in `src/styles.css`.
- Core shared selectors now consume those roles for hero display, page titles, section headings, rich text, cards, labels, forms, FAQs, fee display, and hero support copy.
- `docs/design-system/tokens.md` documents the implemented type roles.
- The Foundations page shows a live type-role table and role specimens.

Remaining work is mostly cleanup: reduce older page-specific type overrides, retire viewport-scaled font-size rules in current shared production code, and decide whether older test-bed or archived styles should be left alone or moved out of the main stylesheet.

## Current State

The site already has a strong typographic direction:

- Headings use Georgia and carry the emotional tone.
- Body copy uses a practical sans-serif stack.
- The shared hero system has a clear display pattern through `.hero-display`.
- The design language is generally calm, spacious, and readable.
- The recent `.rich-text` baseline gives editorial content a more complete shared treatment.

The issue is that the scale is mostly implied by local CSS rather than named as a foundation. Typography decisions are spread across global defaults, shared components, hero classes, dev-page examples, and page-specific styles.

## Main Issues

### 1. Type roles are not clearly named

The system has many real roles, but they are not formally defined:

- page-opening display heading
- standard page `h1`
- section heading
- compact section heading
- card title
- topic card title
- body copy
- rich editorial body
- support copy
- small note
- eyebrow or label
- form label
- metadata
- large numeric or fee display

Because these roles are not named, page-specific styles can drift even when they are trying to preserve the same voice.

### 2. Some global heading rules are too broad

Global `h1`, `h2`, and `h3` rules set large serif sizes. That gives the site a good default voice, but it also makes every heading context inherit a scale that may be too broad for cards, panels, form states, and documentation demos.

The shared system already compensates for this in places with local selectors such as `.site-topic-card h3`, `.site-faq-shell__title`, `.hero-display`, and page-specific title classes. That is a sign the roles exist but need clearer foundations.

### 3. Fluid sizing is inconsistent

Some type uses `clamp(...)` with viewport units and some uses fixed `rem` values. A few global rules use `clamp(...)` with a fixed middle value, which looks like a fluid rule but behaves like a static size.

That is not a disaster, but it makes the scale harder to reason about. The site should decide which roles are allowed to be fluid and which should stay fixed.

Recommended direction:

- Fluid: hero display, major page-opening display, large CTA headings.
- Mostly fixed: body, labels, cards, forms, small notes.
- Lightly responsive: section headings and compact section headings.

### 4. Letter spacing is not fully aligned with the current rules

The design-system rules now prefer `letter-spacing: 0`, but older and experimental sections still contain negative or positive tracking. Some of that may be harmless in archived/test-bed code, but production-facing shared classes should converge on zero letter spacing unless there is a deliberate exception.

### 5. Body copy has several close-but-different sizes

The site currently uses body-ish text at several nearby sizes, including `1rem`, `1.02rem`, `1.04rem`, `1.06rem`, `1.08rem`, `1.12rem`, and `1.14rem`.

That can be fine if each role is named, but right now it is hard to tell which size is the intended default for:

- ordinary paragraph copy
- rich editorial copy
- section introduction copy
- card copy
- form helper/status copy
- hero support copy

### 6. Documentation examples may overstate the type scale

Design-system pages sometimes use real production classes inside constrained demo wrappers. This is useful, but it can make display and section type feel oversized in a documentation context unless the demo wrapper explicitly explains that the scale is being shown as a production specimen.

The Foundations page should keep showing real examples, but the type roles should be described clearly enough that a future edit does not copy a hero-scale heading into a compact panel.

## Proposed Type Roles

These roles should become the mental model before any code change.

| Role | Intended Use | Current Source |
| --- | --- | --- |
| Display hero | Page-opening emotional statement | `.hero-display` |
| Page title | Non-hero or plain document page title | global `h1` or future shared role |
| Section heading | Main section statement | global `h2`, `.section-heading h2` |
| Compact section heading | Smaller section title inside panels/docs/components | local/shared component rules |
| Card title | Individual card or repeated item title | `.site-card h3`, `.site-topic-card h3` |
| Rich text heading | Heading inside editorial copy | `.rich-text h2`, `.rich-text h3` |
| Body | Standard paragraph copy | global `p` |
| Rich body | Longer editorial paragraph copy | `.rich-text p` |
| Support copy | Section intro, hero support, captions | `.section-heading__copy`, `.hero-intro`, local caption rules |
| Small note | Helper text, caveats, metadata | scattered local rules |
| Label | Eyebrows, form labels, metadata labels | `.site-eyebrow`, form labels, local metadata |
| Numeric display | Fees or large figures | `.site-fee-card strong` |

## High-Level Plan

### Phase 1: Decide the roles

Define the type roles in `docs/design-system/tokens.md` and the Foundations page before changing many selectors.

Output:

- A short role table.
- Clear guidance for which roles are fluid.
- Clear guidance for which roles should never use display scale.
- A note that production page typography should prefer shared roles before page-specific sizing.

### Phase 2: Add type variables or role classes carefully

Introduce only the variables that remove real ambiguity. Do not create a huge scale for its own sake.

Possible variables:

- `--font-serif`
- `--font-sans`
- `--font-mono`
- `--type-display`
- `--type-page-title`
- `--type-section`
- `--type-section-compact`
- `--type-card-title`
- `--type-topic-title`
- `--type-body`
- `--type-body-rich`
- `--type-support`
- `--type-small`
- `--type-label`
- `--type-caption`
- `--type-faq-question`
- `--type-hero-deck-lead`
- `--type-hero-detail`
- `--type-fee-display`

Possible line-height variables:

- `--leading-display`
- `--leading-heading`
- `--leading-body`
- `--leading-tight`

If variables feel too abstract, use role classes first and add variables only where duplication becomes obvious.

### Phase 3: Align shared selectors first

Update shared production selectors before page-specific CSS:

- global `h1`, `h2`, `h3`, `p`
- `.hero-display`
- `.hero-intro`
- `.hero-copy-panel`
- `.section-heading`
- `.section-heading__copy`
- `.site-card h3`
- `.site-topic-card h3`
- `.rich-text`
- `.site-eyebrow`
- `.site-form`
- `.site-faq-*`
- `.site-fee-card`

This should make the public site feel more consistent without needing a page-by-page redesign.

### Phase 4: Reduce page-specific type overrides

After shared selectors are aligned, inspect page CSS for local type sizes that can be removed or converted to role usage.

Good candidates:

- page-specific section heading widths or sizes
- topic/card title overrides
- repeated paragraph sizing
- small note/caption sizing
- one-off letter spacing

Keep page-specific type only when the page genuinely has a unique composition, such as a hero title width or a special editorial layout.

### Phase 5: Update the design-system examples

Update Foundations so it shows the final type roles as live specimens, not one-off examples.

Update Components and Heroes only where examples refer to old values or imply a role that no longer exists.

## Recommended First Implementation Slice

Start with a small, visible pass:

1. Add the role table to `tokens.md`.
2. Add a type-role specimen section to Foundations.
3. Normalize the shared body, rich body, section heading, card title, label, and hero display roles.
4. Do not touch page-specific CSS yet unless a shared change obviously breaks a page.

This will give the site a clearer typographic center of gravity before doing cleanup.

Status: completed. The next pass should focus on reducing page-specific type overrides and checking public pages visually after the shared role alignment.

## Done When

The type-scale pass is successful when:

- A future page can choose a type role without guessing.
- Hero, section, card, form, and rich-text typography feel related but not identical.
- Body copy sizes are reduced to a small number of intentional roles.
- Production shared classes no longer rely on scattered near-duplicate type values.
- The Foundations page shows real examples of every major type role.
- Page-specific CSS mostly adjusts layout and measure, not basic type scale.

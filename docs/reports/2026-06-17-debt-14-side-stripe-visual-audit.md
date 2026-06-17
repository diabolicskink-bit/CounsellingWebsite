# DEBT-14 Side-Stripe Visual Audit

Generated: 2026-06-17

## Purpose

This report maps where the side-stripe question appears in the site and records the visual review that resolved `DEBT-14`.

`DEBT-14` was about an AI/design-system rule conflict: the design-system rules said not to add new 4px coloured side stripes, but several active shared patterns intentionally used a 4px cedar left border.

This report does not recommend a final CSS change. It lists what is on which pages, what class creates the treatment, and what to look at.

## Decision Recorded

After visual review, the active side-striped panels are not considered a design issue. They read as intentional shared panels and cards.

The fix for `DEBT-14` is to remove the blanket rule against 4px side stripes, not to change the UI. Future work should still reuse the active shared patterns instead of creating near-duplicate panel/card treatments.

## Original DEBT-14 Surface

Primary patterns reviewed:

| Pattern | Where defined | Current treatment | Current public usage |
| --- | --- | --- | --- |
| `.site-highlight__box` | `src/styles.css:1204` | Boxed panel with `border-left: 4px solid var(--cedar)` | No current routed page usage found |
| `.site-copy-panel` | `src/styles.css:1303` | Boxed panel with `border-left: 4px solid var(--cedar)` | `/inclusion` |
| `.site-check-panel` | `src/styles.css:1303` | Boxed panel with `border-left: 4px solid var(--cedar)` | `/inclusion/lgbtqia` |
| `.site-fee-card` | `src/styles.css:1429` | Compact fee card with `border-left: 4px solid var(--cedar)` | `/contact` |

Nearby patterns to compare, but not the same issue:

| Pattern | Where defined | Current treatment | Why it is adjacent |
| --- | --- | --- | --- |
| `.site-ruled-paragraph` | `src/styles.css:1293` | Paragraph inset with `border-left: 2px solid rgba(...)` | This is a thin editorial rule, not a 4px card/panel stripe |
| `.hero-copy-panel` | `src/styles.css:2638` | Hero copy inset with `border-left: 2px solid var(--cedar)` | This is part of the hero system and becomes a top rule on mobile |
| `.hero-deck` | `src/styles.css:2654` | Larger hero text group with `border-left: 1px solid rgba(...)` | This is a thin hero rail, not a boxed side stripe |
| `.rich-text blockquote` | `src/styles.css:667` | Blockquote with `border-left: 3px solid var(--cedar)` | This is rich-text quote styling, not a shared card/panel API |

## Public Pages To Look At

### `/inclusion`

File: `src/pages/InclusivePractice.tsx:197`

Section to inspect: the inclusion hub under the heading text `Known before you arrive. Not learned as you go.`

What is on the page:

- Three linked explanatory panels for `Kink & BDSM-aware counselling`, `ENM & polyamory`, and `LGBTQIA+ affirming counselling`.
- Each panel uses `.site-copy-panel`.
- The 4px cedar stripe comes from the shared `.site-copy-panel` rule in `src/styles.css`.

Visual question:

- Does the left stripe help these panels read as a coherent inclusion hub, or would a quieter full-border/background treatment do the same job?

### `/inclusion/lgbtqia`

File: `src/pages/LgbtqiaCounselling.tsx:138`

Section to inspect: the `What people may want to bring` checklist area.

What is on the page:

- A two-column check grid using `.site-check-panel.site-check-panel--grid`.
- The outer panel uses the 4px cedar left stripe from `.site-check-panel`.
- The internal grid dividers use thinner right/bottom borders; those are grid separators, not the DEBT-14 side-stripe treatment.

Visual question:

- Does the outer left stripe give useful orientation to the checklist, or does the grid already have enough structure without it?

### `/contact`

File: `src/pages/Contact.tsx:197`

Section to inspect: the contact hero fee card.

What is on the page:

- A compact price summary card rendered by `FeeCard`.
- The aside uses `.site-fee-card`.
- The 4px cedar stripe comes from the shared `.site-fee-card` rule in `src/styles.css`.

Visual question:

- Should the fee card remain an explicit exception because it highlights one important practical value, or should it follow the same no-thick-stripe policy as other cards and panels?

### `/`

File: `src/pages/Home.tsx:205`, `src/pages/Home.tsx:259`, `src/pages/Home.tsx:296`

Sections to inspect:

- The hero support copy uses `.hero-copy-panel`.
- The `What people bring.` / workroom area uses `.site-ruled-paragraph`.
- The inclusive practice lead-in also uses `.site-ruled-paragraph`.

What is on the page:

- These are thin editorial rules, not 4px boxed card stripes.
- They are useful comparison points if deciding what "thin rule" should mean in practice.

Visual question:

- Do these thinner rules already express the visual language the side-stripe panels should move toward?

### `/working-with-joel`

File: `src/pages/WorkingWithJoel.tsx:246`

Section to inspect: the intro body near the top of the page.

What is on the page:

- A rich-text intro block using `.site-ruled-paragraph.site-ruled-paragraph--wide`.
- This is a thin 2px editorial rule and not a DEBT-14 candidate.

Visual question:

- Does this feel like the correct quieter emphasis model for longer explanatory copy?

### `/inclusion/enm-polyamory`

File: `src/pages/EnmPolyamoryCounselling.tsx:237`, `src/pages/EnmPolyamoryCounselling.tsx:364`

Sections to inspect:

- The hero support copy uses `.hero-copy-panel`.
- The individual note later in the page uses `.site-ruled-paragraph`.

What is on the page:

- Both are thin-rule treatments, not 4px boxed card stripes.
- This page is useful for comparing a specialist inclusion page that does not currently use `.site-copy-panel` or `.site-check-panel`.

Visual question:

- Does the page still have enough emphasis and structure without thick side-striped cards?

### `/inclusion/kink-bdsm`

File: `src/pages/KinkBdsmCounselling.tsx:161`

Section to inspect: the hero support panel.

What is on the page:

- The hero support copy uses `.hero-copy-panel`.
- This is a thin hero-system rule, not a DEBT-14 candidate.

Visual question:

- Does this hero-only rail feel different enough from boxed card stripes to keep it outside the DEBT-14 cleanup?

## Dev-Only Design-System Pages To Look At

These routes are dev-only, but they matter because they teach future agents which patterns are active.

### `/design-language/components`

File: `src/pages/dev/design-system/DS_Components.tsx`

What is shown:

| Line | Pattern | What to look at |
| --- | --- | --- |
| `320` | `.site-fee-card` | Fee card demo with 4px cedar left stripe |
| `384` | `.site-check-panel` | Standard check panel with 4px cedar left stripe |
| `399` | `.site-check-panel.site-check-panel--grid` | Grid check panel with 4px outer stripe and thin internal dividers |
| `428` | `.site-copy-panel` | Copy panel demo with 4px cedar left stripe |
| `231`, `466` | `.site-ruled-paragraph` | Thin-rule paragraph examples for comparison |

Why it matters:

- This page actively presents the 4px stripe patterns as reusable components.
- If the public CSS changes, this page should change with it so the examples do not keep teaching the old rule.

### `/design-language/foundations`

File: `src/pages/dev/design-system/DS_Foundations.tsx`

What is shown:

| Line | Pattern | What to look at |
| --- | --- | --- |
| `465` | `.site-copy-panel.rich-text` | Rich-text panel with the 4px left stripe |
| `479` | `.site-fee-card` | Type specimen fee card with the 4px left stripe |
| `537` | `.site-ruled-paragraph` | Thin-rule paragraph example |
| `655` | `.site-copy-panel.rich-text` | Rich-text demo panel with the 4px left stripe |

Why it matters:

- Foundations uses the side-striped components to show type and content behavior, so a style decision may need demo updates here too.

### `/design-language/patterns`

File: `src/pages/dev/design-system/DS_Patterns.tsx`

What is shown:

| Line | Pattern | What to look at |
| --- | --- | --- |
| `147` | `.hero-copy-panel` | Thin hero-system rule |
| `166` | `.site-copy-panel.rich-text` | Split layout copy panel with 4px left stripe |

Why it matters:

- This page makes the difference between hero thin rules and boxed copy-panel stripes visible side by side.

### `/design-language/heroes`

File: `src/pages/dev/design-system/DS_Heroes.tsx`

What is shown:

| Line | Pattern | What to look at |
| --- | --- | --- |
| `306`, `308`, `328`, `475` | `.hero-copy-panel` | Hero-system thin rule examples |

Why it matters:

- This page is mostly comparison context. The hero rules are thinner and are currently documented as a separate active subsystem.

## Documentation Places That Mention The Policy

| File | Current role |
| --- | --- |
| `docs/project/project-debt.md` | Archives `DEBT-14` as resolved and links this visual audit |
| `docs/design-system/ai-rules.md` | No longer prohibits side stripes; the remaining guidance is to reuse close shared patterns rather than create duplicates |
| `docs/design-system/components.md` | Lists `.site-copy-panel`, `.site-fee-card`, `.site-ruled-paragraph`, and hero classes as active component language |
| `docs/design-system/current-scope.md` | Lists `.site-copy-panel`, `.site-check-panel`, `.site-fee-card`, `.site-ruled-paragraph`, and `hero-*` as active or partial scope |
| `docs/design-system/architecture.md` | Describes `site-*` and `hero-*` as active shared systems, with `DS_Patterns` containing active examples and older demos |
| `docs/design-system/design-export.md` and `.json` | Reference exports only; they mention hero copy panels but should not override active docs |

## Initial Read Before Any Fix

The strongest DEBT-14 conflict is the active reusable component set:

- `.site-copy-panel`
- `.site-check-panel`
- `.site-fee-card`

Those patterns are both implemented with a 4px left stripe and documented as active shared patterns.

`.site-highlight__box` also has the 4px left stripe, but no current routed page usage was found. It may belong in a dead-CSS or legacy-selector cleanup rather than a visual normalization pass.

The thin-rule patterns should probably be reviewed visually at the same time but should not automatically be changed with DEBT-14:

- `.site-ruled-paragraph`
- `.hero-copy-panel`
- `.hero-deck`
- `.rich-text blockquote`

## Review Checklist

When visually reviewing this debt item, check these routes first:

1. `/inclusion` - the inclusion hub `.site-copy-panel` cards.
2. `/inclusion/lgbtqia` - the `.site-check-panel.site-check-panel--grid` checklist.
3. `/contact` - the `.site-fee-card` fee summary.
4. `/design-language/components` - the canonical demos for all three active 4px side-stripe patterns.
5. `/design-language/patterns` - comparison between `.hero-copy-panel` and `.site-copy-panel`.

Then compare against these thin-rule examples:

1. `/` - `.hero-copy-panel` and `.site-ruled-paragraph`.
2. `/working-with-joel` - `.site-ruled-paragraph.site-ruled-paragraph--wide`.
3. `/inclusion/enm-polyamory` - `.hero-copy-panel` and `.site-ruled-paragraph`.

## Decision Points Closed

- `.site-fee-card`, `.site-copy-panel`, and `.site-check-panel` can keep their current side-stripe treatment.
- The AI rule against side stripes was removed because the active examples look good and are not a problem in themselves.
- `.site-highlight__box` remains a separate possible CSS cleanup question because no current routed page usage was found.

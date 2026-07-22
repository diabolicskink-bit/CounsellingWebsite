# Launch Readiness Tracker

This tracker owns launch gates, review passes, and acceptance checks. It is separate from `site-backlog.md`, which tracks concrete visitor-facing change work, and from `project-debt.md`, which tracks technical and maintainability pressure.

Use stable IDs when discussing or working on these items, such as `LAUNCH-1`. Do not renumber existing items. When a launch check finds concrete work, create or link the relevant `SITE-*` or `DEBT-*` item rather than turning the launch item into a mixed backlog card.

## Tracker Metadata

- `Next ID`: `LAUNCH-9`

## How To Maintain This Tracker

- Add an item when a launch-readiness review, sign-off, smoke check, matrix, or cross-site acceptance gate should stay visible.
- Keep launch items focused on review outcomes and acceptance conditions, not the detailed implementation of every gap they discover.
- Link found work to `SITE-*` for visitor-facing changes or `DEBT-*` for technical/project-health work.
- Use `Status` to show review progress; use linked items to show what needs changing.
- Move completed launch items to [archive/launch-readiness-archive.md](archive/launch-readiness-archive.md) only when the review is complete and unresolved gaps are either accepted, resolved, or tracked elsewhere.
- Keep active items ordered by priority first, then ID.
- Do not treat this tracker as permission to implement a fix. It is memory, readiness tracking, and sign-off support.

## Priority, Size, And Status

Priorities:

- `P1`: Launch-blocking or trust-critical gate.
- `P2`: Important launch confidence check.
- `P3`: Nice-to-have or post-launch readiness improvement.

Sizes:

- `XS`: Tiny confirmation or one-route smoke check.
- `S`: Narrow review over one route or feature.
- `M`: Focused review across several routes, states, or files.
- `L`: Whole-site or multi-boundary readiness pass.

Statuses:

- `Open`: Known launch check, not currently complete.
- `Active`: Current work is directly assessing or completing it.
- `Passed`: The launch check passed, with no required follow-up untracked.
- `Partial`: Some review is complete, but gaps remain or coverage is incomplete.
- `Blocked`: Cannot complete without owner input or external configuration.
- `Superseded`: Replaced by another launch item or implemented direction.

## Active Items

### LAUNCH-1 - Accessibility launch review

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Partial`
- `Source`: Supersedes `SITE-1`, `docs/checklists/accessibility-launch.md`
- `Launch Goal`: Make accessibility coverage visible enough that launch does not ship with unreviewed semantic structure, keyboard access, focus states, contrast, reduced-motion, or form clarity gaps.
- `Current State`: `docs/checklists/accessibility-launch.md` is the working route-by-route checklist artifact, and Home, Inclusion Hub, plus Contact/Fees have begun assessment. The Contact semantic-heading gap is resolved through archived `SITE-20`; required-field clarity remains tracked as `SITE-21`.
- `Review Method`: Work through the checklist for each public route in browser, with axe where useful, keyboard checks for interactive states, mobile/reflow checks, and notes that link any concrete gap to `SITE-*` or `DEBT-*`.
- `Passes When`: Public routes have completed accessibility checklist entries, and every non-pass item is either resolved, accepted for launch, or linked to a concrete tracker item.
- `Linked Work`: `SITE-21`, `DEBT-29`, `DEBT-30`
- `Links`: `docs/checklists/accessibility-launch.md`, `docs/checklists/accessibility.md`, `tests/public-site.spec.ts`

### LAUNCH-2 - Responsive launch review

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: Supersedes `SITE-2`, `docs/checklists/responsive-launch.md`, `docs/project/current-scope.md`
- `Launch Goal`: Make mobile and desktop layout expectations explicit so launch does not ship with broken reading, navigation, form, or hero behaviour at common viewport sizes.
- `Current State`: Responsive CSS exists across shared and page-scoped styles, and `docs/checklists/responsive-launch.md` is now the working route-by-route checklist artifact. Inclusion Hub has begun assessment, but there is no completed responsive readiness pass.
- `Review Method`: Work through the checklist for the shared shell, each public route, and the not-found route across representative mobile, tablet, desktop, and wide desktop viewports, with notes that link any concrete gap to `SITE-*` or `DEBT-*`.
- `Passes When`: Public routes have completed responsive checkpoints and any discovered concrete layout work is resolved or linked to `SITE-*` or `DEBT-*`.
- `Linked Work`: None yet.
- `Links`: `docs/checklists/responsive-launch.md`, `src/pages/`, `tests/public-site.spec.ts`

## Resolved Item Archive

Completed and superseded `LAUNCH-*` items live in [archive/launch-readiness-archive.md](archive/launch-readiness-archive.md).

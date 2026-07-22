# Launch Readiness Tracker

This tracker owns launch gates, review passes, and acceptance checks. It is separate from `site-backlog.md`, which tracks concrete visitor-facing change work, and from `project-debt.md`, which tracks technical and maintainability pressure.

Use stable IDs when discussing or working on these items. Do not renumber existing items. When a launch check finds concrete work, create or link the relevant `SITE-*` or `DEBT-*` item rather than turning the launch item into a mixed backlog card.

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

There are no active launch-readiness items.

## Resolved Item Archive

Completed and superseded `LAUNCH-*` items live in [archive/launch-readiness-archive.md](archive/launch-readiness-archive.md).

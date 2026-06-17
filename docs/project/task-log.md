# Task Log

Curated milestone history for durable project state. This is not a full changelog; Git remains the detailed implementation history.

## How To Use This Log

- Read this for important project milestones and durable context.
- Use `current-scope.md` for exact current scope.
- Use `project-debt.md` for technical pressure.
- Use `site-backlog.md` for deferred visitor-facing work.
- Use `docs/design-system/current-scope.md` for design-system scope.

## Admission Rule

- Add entries for public behaviour changes, documentation governance changes, major design-system state changes, deployment/testing posture changes, API/form milestones, or tracker creation/resolution.
- Skip routine bug fixes, tiny cleanup, pure investigations, and review-only notes unless they change durable project state.
- Keep entries to 2-4 bullets focused on what is now true.

## 2026-06-17 - Design-System AI Docs Rebuilt

- Changed: Rebuilt `docs/design-system/` as a lean canonical AI/design-system instruction structure and moved the previous design-system docs aside for review.
- Changed: Split design-system guidance into clear ownership files for AI rules, governance, current scope, foundations, patterns, cleanup sweeps, and migration notes.
- Preserved: Public UI, source code, routes, rendered design-system pages, runtime behaviour, and historical reports are unchanged.

## 2026-06-17 - DEBT-14 Side-Stripe Rule Resolved

- Changed: Removed the blanket AI/design-system prohibition on 4px side stripes after visual review confirmed the active striped panels are intentional and acceptable.
- Preserved: Existing public UI, CSS, routes, and copy are unchanged; the resolution is documentation and tracker alignment only.
- Closed: Marked `DEBT-14` resolved and kept any unused-selector cleanup separate from the side-stripe rule decision.

## 2026-06-17 - Documents Reader Scope Restored

- Changed: Limited the dev Documents page back to `docs/reports/` and `docs/plans/` markdown only.
- Preserved: Project and design-system documentation remain canonical on disk, but they are not browsed through the dev Documents page.

## 2026-06-17 - Technical Review Tracker Coverage Completed

- Changed: Seeded the remaining 2026-06-17 technical review recommendations into `project-debt.md` and `site-backlog.md`.
- Changed: Added tracker coverage for direct enquiry API tests, explicit email delivery config, design-system card and CSS cleanup pressure, side-stripe rule conflicts, global CSS scoping risk, runtime/package-manager pinning, reduced motion, and shared portrait/media treatment.
- Preserved: Existing tracker items continue to own overlapping review findings for structured enquiry payloads, analytics policy, performance budgets, and public image delivery.

## 2026-06-17 - Project Governance Documentation

- Changed: Added `docs/project/` as the whole-project documentation home for product direction, current scope, technical debt, visitor-facing backlog, and durable task history.
- Changed: Moved root product and design export files into canonical documentation locations so project guidance and design-system references are separated.
- Changed: Seeded `DEBT-*` and `SITE-*` trackers from the technical review baseline while keeping the existing design-system docs as their own subsystem.

## 2026-06-17 - Technical Review Baseline

- Changed: Added a technical review report covering build/QA state, routing, API/enquiry risks, testing gaps, design-system cleanup candidates, deployment concerns, and performance follow-ups.
- Preserved: The report is an audit baseline, not an implementation plan by itself; durable follow-up work is tracked through `project-debt.md` and `site-backlog.md`.

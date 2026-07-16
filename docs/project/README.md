# Project Documentation

This directory is the whole-project memory for Vive Counselling. [../../AGENTS.md](../../AGENTS.md) owns agent task routing and repository-wide update triggers; this file maps document ownership and artifact authority.

Project documentation sits beside, not inside, the design-system documentation. `docs/design-system/` records existing tokens, shared components, implemented patterns, rendered design-system pages, and cleanup rules. During the temporary open-design period, it does not supply mandatory visual direction for fresh creation or redesign unless the current task explicitly adopts it.

## Authority And Artifact Types

- Canonical direction documents own product, writing, and domain policy.
- Current-scope documents summarize current state. When exact details disagree, verify executable behaviour, tests, configuration, and source, then reconcile stale documentation when the task changes durable state.
- Audience research dossiers are supporting evidence and synthesis for downstream work. They do not override product or writing direction, make public claims approved, or authorize implementation.
- `LAUNCH-*`, `DEBT-*`, and `SITE-*` trackers are scoped memory and triage. Consult only the tracker relevant to the task; an item does not authorize unrelated work.
- Reports, plans, checklists, archives, and the task log are supporting evidence or history. They do not override active guidance or become requirements unless the current task explicitly adopts them.

## Direction

- [product-direction.md](product-direction.md) owns practice context, the site's job, audiences, visitor decisions, positioning, success criteria, non-goals, inclusion, and the accessibility baseline.
- [writing-direction.md](writing-direction.md) owns public-copy status, source order, voice, SEO language, temporary wording constraints, collaboration, and implementation rules.
- [../design-system/README.md](../design-system/README.md) is the entry point for current implementation reference, reusable UI assessment, and design-system maintenance. It is not a required source of visual direction for fresh design work during the temporary open-design period.

## Current State

- [current-scope.md](current-scope.md) is the factual inventory of public and development routes, content status, rendering, metadata, enquiry behaviour, analytics, deployment, tests, known gaps, and excluded project scope.
- [../design-system/current-scope.md](../design-system/current-scope.md) is the separate factual inventory of active, partial, legacy, missing, and excluded design-system state.
- [../design-system/governance.md](../design-system/governance.md) owns design-system implementation evidence, reusable-API authority, promotion, cleanup, verification, and update duties.

## Tracked Work

- [launch-readiness.md](launch-readiness.md) tracks cross-site launch gates, review passes, acceptance checks, and sign-off work with stable `LAUNCH-*` IDs.
- [project-debt.md](project-debt.md) tracks technical, security, routing, API, testing, deployment, and maintainability pressure with stable `DEBT-*` IDs.
- [site-backlog.md](site-backlog.md) tracks concrete deferred visitor-facing change work with stable `SITE-*` IDs.

## Supporting Memory

- [../research/README.md](../research/README.md) maps reusable audience research dossiers for copywriting, SEO, content strategy, service explanation, and website work.
- `../page-plan/` contains visitor-first content plans for individual public pages. These are supporting plans and do not approve wording or authorise implementation by themselves.
- [task-log.md](task-log.md) records selected durable milestones; Git remains the detailed implementation history.
- [archive/README.md](archive/README.md) maps resolved tracker items and older task history kept outside the active reading path.
- `../checklists/` contains launch and recurring manual-QA checklists.
- `../reports/` contains generated audits and assessments.
- `../plans/` contains draft plans and working documents.

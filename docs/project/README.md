# Project Documentation

This directory is the whole-project memory for Vive Counselling. It records product direction, current public-site scope, launch readiness, technical debt, visitor-facing backlog items, and durable task history.

It deliberately sits beside, not inside, the design-system documentation. Use `docs/design-system/` for tokens, shared components, visual rules, and design-system cleanup.

## Reading Order

For most work:

1. Read this file.
2. Read [product-direction.md](product-direction.md) for audience, purpose, positioning, and brand direction.
3. Read [writing-direction.md](writing-direction.md) when public wording, content hierarchy, metadata wording, inclusion language, or enquiry language may be affected.
4. Read [current-scope.md](current-scope.md) to understand what is currently true.
5. Check [launch-readiness.md](launch-readiness.md), [project-debt.md](project-debt.md), and [site-backlog.md](site-backlog.md) for existing tracked work before creating new plans.
6. Check [task-log.md](task-log.md) when durable project history matters.

For UI, layout, component, visual, or design-system work:

1. Read this file and [product-direction.md](product-direction.md); also read [writing-direction.md](writing-direction.md) when public copy or content hierarchy may be affected.
2. Read [../design-system/README.md](../design-system/README.md).
3. Follow [../design-system/ai-rules.md](../design-system/ai-rules.md).
4. Check [../design-system/patterns/components.md](../design-system/patterns/components.md) and [../design-system/patterns/page-patterns.md](../design-system/patterns/page-patterns.md) before creating reusable UI.
5. Update [../design-system/current-scope.md](../design-system/current-scope.md) when design-system scope changes.

For technical, API, routing, build, deployment, test, or security work:

1. Read [current-scope.md](current-scope.md).
2. Check [project-debt.md](project-debt.md) for related `DEBT-*` items.
3. Update debt tracker status, notes, or archive entries when the work changes a tracked pressure point.

For public content, SEO, accessibility, form-flow, performance, or operations ideas:

1. Read [product-direction.md](product-direction.md) and [writing-direction.md](writing-direction.md).
2. Check [current-scope.md](current-scope.md) for current public facts and temporary positioning constraints.
3. Check [launch-readiness.md](launch-readiness.md) for `LAUNCH-*` review gates and [site-backlog.md](site-backlog.md) for concrete `SITE-*` change work.
4. Use `LAUNCH-*` for cross-site launch checks, review passes, matrices, and sign-off work; use `SITE-*` for specific visitor-facing changes.

## Document Map

- [product-direction.md](product-direction.md) is the project-level source for audience, positioning, brand direction, inclusion stance, anti-references, and accessibility baseline.
- [writing-direction.md](writing-direction.md) is the operational source for public voice, copy source order, approved writing patterns, SEO language, collaboration workflow, and anti-AI review.
- [current-scope.md](current-scope.md) is the factual inventory of public routes, dev routes, app behaviours, tests, deployment assumptions, and known missing areas.
- [launch-readiness.md](launch-readiness.md) tracks launch gates, review passes, acceptance checks, and sign-off work with stable `LAUNCH-*` IDs.
- [project-debt.md](project-debt.md) tracks technical, security, routing, API, testing, deployment, and maintainability pressure with stable `DEBT-*` IDs.
- [site-backlog.md](site-backlog.md) tracks concrete visitor-facing future change work with stable `SITE-*` IDs and a classification label for possible future splitting.
- [task-log.md](task-log.md) records durable milestones. It is not a full changelog.
- [../design-system/README.md](../design-system/README.md) is the design-system entry point.
- [../design-system/governance.md](../design-system/governance.md) owns design-system source-of-truth order, active/legacy layers, promotion rules, and update duties.
- [../design-system/foundations/tokens.md](../design-system/foundations/tokens.md) owns design-system token and type-role guidance.
- [../design-system/patterns/components.md](../design-system/patterns/components.md) and [../design-system/patterns/page-patterns.md](../design-system/patterns/page-patterns.md) own reusable component and pattern guidance.
- [../design-system/maintenance/cleanup-sweeps.md](../design-system/maintenance/cleanup-sweeps.md) owns design-system cleanup behaviour.
- `../checklists/` contains rendered project checklists used for launch or recurring manual QA.
- `../reports/` contains generated audits and reports.
- `../plans/` contains draft plans and thinking documents.

## Maintenance Rules

- Update `current-scope.md` when work changes what the site currently includes, partially includes, does not include, or treats as explicitly out of scope.
- Add or update `LAUNCH-*` items when launch-readiness review, sign-off, matrices, or cross-site checks should stay visible.
- Add or update `DEBT-*` items when technical pressure should remain visible across future sessions.
- Add or update `SITE-*` items when a meaningful visitor-facing idea is identified but intentionally not implemented now.
- Add a `task-log.md` entry only for durable project state changes, not routine bug fixes or small implementation details.
- When other approved work changes a public page or shared page behaviour, review the relevant rendering and interaction tests while that context is active and update any matching active debt note. Do not treat a page-test checklist as authorization for a separate test-only campaign.
- Keep design-system scope and project scope separate. A visual-system change updates `docs/design-system/current-scope.md`; a public-site capability change updates this directory's `current-scope.md`.
- Trackers are memory and triage. They do not authorize implementation by themselves.

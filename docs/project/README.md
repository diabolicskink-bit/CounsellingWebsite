# Project Documentation

This directory is the whole-project memory for Vive Counselling. It records product direction, current public-site scope, technical debt, visitor-facing backlog items, and durable task history.

It deliberately sits beside, not inside, the design-system documentation. Use `docs/design-system/` for tokens, shared components, visual rules, and design-system cleanup.

## Reading Order

For most work:

1. Read this file.
2. Read [product-direction.md](product-direction.md) for audience, voice, purpose, and anti-references.
3. Read [current-scope.md](current-scope.md) to understand what is currently true.
4. Check [project-debt.md](project-debt.md) and [site-backlog.md](site-backlog.md) for existing tracked work before creating new plans.
5. Check [task-log.md](task-log.md) when durable project history matters.

For UI, layout, component, visual, or design-system work:

1. Read this file and [product-direction.md](product-direction.md).
2. Read [../design-system/README.md](../design-system/README.md).
3. Follow [../design-system/ai-rules.md](../design-system/ai-rules.md).
4. Update [../design-system/current-scope.md](../design-system/current-scope.md) when design-system scope changes.

For technical, API, routing, build, deployment, test, or security work:

1. Read [current-scope.md](current-scope.md).
2. Check [project-debt.md](project-debt.md) for related `DEBT-*` items.
3. Update debt tracker status, notes, or archive entries when the work changes a tracked pressure point.

For public content, SEO, accessibility, form-flow, performance, or operations ideas:

1. Read [product-direction.md](product-direction.md).
2. Check [site-backlog.md](site-backlog.md) for related `SITE-*` items.
3. Use the `Classification` field if a backlog item may later move into a more specialised tracker.

## Document Map

- [product-direction.md](product-direction.md) is the project-level source for audience, positioning, voice, inclusion stance, anti-references, and accessibility baseline.
- [current-scope.md](current-scope.md) is the factual inventory of public routes, dev routes, app behaviours, tests, deployment assumptions, and known missing areas.
- [project-debt.md](project-debt.md) tracks technical, security, routing, API, testing, deployment, and maintainability pressure with stable `DEBT-*` IDs.
- [site-backlog.md](site-backlog.md) tracks visitor-facing future work with stable `SITE-*` IDs and a classification label for possible future splitting.
- [task-log.md](task-log.md) records durable milestones. It is not a full changelog.
- [../design-system/README.md](../design-system/README.md) is the design-system entry point.
- `../reports/` contains generated audits and reports.
- `../plans/` contains draft plans and thinking documents.

## Maintenance Rules

- Update `current-scope.md` when work changes what the site currently includes, partially includes, does not include, or treats as explicitly out of scope.
- Add or update `DEBT-*` items when technical pressure should remain visible across future sessions.
- Add or update `SITE-*` items when a meaningful visitor-facing idea is identified but intentionally not implemented now.
- Add a `task-log.md` entry only for durable project state changes, not routine bug fixes or small implementation details.
- Keep design-system scope and project scope separate. A visual-system change updates `docs/design-system/current-scope.md`; a public-site capability change updates this directory's `current-scope.md`.
- Trackers are memory and triage. They do not authorize implementation by themselves.

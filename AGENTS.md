# Repository Guidance For AI Agents

Start with [docs/project/README.md](docs/project/README.md). It is the whole-project hub for reading order, product direction, current scope, debt, backlog, and task-log expectations.

## Required Reading

- For public copy, content hierarchy, inclusion language, enquiry flow, metadata wording, or visitor-facing positioning, read [docs/project/product-direction.md](docs/project/product-direction.md) and [docs/project/writing-direction.md](docs/project/writing-direction.md).
- For current routes, app behaviour, API/form behaviour, deployment assumptions, tests, or documentation structure, check [docs/project/current-scope.md](docs/project/current-scope.md).
- For technical, routing, API, security, deployment, test, design-system maintenance, or general maintainability work, check [docs/project/project-debt.md](docs/project/project-debt.md).
- For launch-readiness review, cross-site checks, sign-off, SEO/accessibility/performance/form-flow review passes, or launch gates, check [docs/project/launch-readiness.md](docs/project/launch-readiness.md).
- For concrete deferred visitor-facing changes, check [docs/project/site-backlog.md](docs/project/site-backlog.md).
- For visual, layout, component, shared CSS, rendered design-system, or design-system documentation work, start at [docs/design-system/README.md](docs/design-system/README.md).

## Working Rules

- Default collaboration preference: ask as many clarifying questions as are genuinely useful before planning or implementing; do not artificially limit the count to one. Keep questions concise, grouped, and focused on details that would change the work.
- Public copy is under active owner-led revision. Treat existing page source as factual and layout context, not as an approved voice reference; use the source order in `docs/project/writing-direction.md`.
- When the user asks for copy review or analysis, do not edit files unless implementation is also requested. When exact replacement wording is supplied, preserve it unless asked to edit it.
- Treat SEO reports and sample outlines as research and coverage prompts, not as mandatory page templates or voice references.
- Treat trackers as memory and triage, not permission to implement unrelated scope.
- Keep project scope and design-system scope separate.
- For UI work, use active design-system guidance before treating source files, rendered examples, or old classes as reusable API.
- Do not treat a file in `src/components/` as active design-system API unless the design-system docs describe it that way.
- Keep one-off visual explorations page-scoped until they prove useful beyond one context.

## Git And Release Workflow

- `master` is the production branch and the source for Vercel production deployments.
- `staging` is the long-lived integration branch and primary release candidate. Use its Vercel preview deployment to review combined changes before production.
- Create `work/*` branches from the current `staging` branch by default, then merge completed work back into `staging`.
- Vercel may create preview deployments for any non-production branch. Working-branch previews are useful for isolated checks; the `staging` preview represents the combined release candidate.
- Release by fast-forwarding or merging `staging` into `master`. Do not squash or rebase the long-lived `staging` branch into `master`, because their shared history should remain usable for later releases.
- If a production fix lands directly on `master`, bring it back into `staging` before creating further work so the branches do not drift.

## Update Rules

- Update [docs/project/current-scope.md](docs/project/current-scope.md) when public-site, API, test, deployment, or documentation scope changes.
- Add or update `DEBT-*` items in [docs/project/project-debt.md](docs/project/project-debt.md) when technical or maintainability pressure should stay visible.
- Add or update `LAUNCH-*` items in [docs/project/launch-readiness.md](docs/project/launch-readiness.md) when launch-readiness review, sign-off, matrices, or cross-site checks should stay visible.
- Add or update `SITE-*` items in [docs/project/site-backlog.md](docs/project/site-backlog.md) when meaningful concrete visitor-facing change work is deferred.
- Update [docs/project/task-log.md](docs/project/task-log.md) only for durable project state changes.
- Update [docs/design-system/current-scope.md](docs/design-system/current-scope.md) when visual/component system state changes.

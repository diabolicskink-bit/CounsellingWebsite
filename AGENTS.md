# Repository Guidance For AI Agents

Start with [docs/project/README.md](docs/project/README.md). It is the whole-project map for document ownership, authority, current state, tracked work, and supporting history. This file owns task routing and repository-wide working rules.

## Authority Model

- For requirements and intent, the current task defines the requested outcome, followed by the repository-wide rules in this file and then the relevant domain guidance. A tracker item or plan applies only when the current task selects it.
- For current implementation facts, executable behaviour, tests, configuration, and source are the strongest evidence. Current-scope documents summarize that state; reports and task history provide supporting context.
- For reusable design-system API, follow [docs/design-system/governance.md](docs/design-system/governance.md), its active catalogues, and its current-scope document. Source code or a rendered example existing does not by itself make it approved reusable API.
- Trackers, reports, plans, checklists, archives, and task history are supporting memory. They do not override active guidance or authorize work unless the current task explicitly adopts them.

## Required Reading

- For public copy, content hierarchy, inclusion language, enquiry flow, metadata wording, or visitor-facing positioning, read [docs/project/product-direction.md](docs/project/product-direction.md) and [docs/project/writing-direction.md](docs/project/writing-direction.md).
- For current routes, app behaviour, API/form behaviour, deployment assumptions, tests, or documentation structure, check [docs/project/current-scope.md](docs/project/current-scope.md).
- For technical, routing, API, security, deployment, test, design-system maintenance, or general maintainability work, search [docs/project/project-debt.md](docs/project/project-debt.md) for related `DEBT-*` items rather than reading it as a general prerequisite. Source-first cleanup sweeps are the exception: follow [docs/design-system/maintenance/cleanup-sweeps.md](docs/design-system/maintenance/cleanup-sweeps.md), do not search trackers to select the work, and consult project debt only when independently discovered code evidence triggers that file's too-large finding workflow.
- For launch-readiness review, cross-site checks, sign-off, SEO/accessibility/performance/form-flow review passes, or launch gates, consult [docs/project/launch-readiness.md](docs/project/launch-readiness.md).
- For requested or deferred concrete visitor-facing changes, or when deciding how to record one, consult [docs/project/site-backlog.md](docs/project/site-backlog.md).
- For design-system maintenance, shared-API reuse, cleanup, or documentation work, start at [docs/design-system/README.md](docs/design-system/README.md). For fresh visual creation or redesign, establish an actively creative direction from the current task, product direction, content, and the website-design skill before consulting existing component or page-pattern material. Preserve the site's basic identity scheme as described below, but do not treat the current design system as layout authority unless the task explicitly adopts a pattern.

## Working Rules

- In Planning Mode, actively use questions to understand the user's intent and preferences. The user welcomes exploratory dialogue: ask freely whenever an answer could improve the plan, including non-blocking preferences and choices for which a reasonable assumption is available, and do not cap the total at three. Inspect available context first so questions build on what is already known. If the interface limits each prompt to three questions, use additional concise, grouped rounds and adapt later questions to earlier answers. Outside Planning Mode, ask before acting when missing information would materially change the requested outcome, scope, safety, or an irreversible decision; otherwise make a reasonable assumption, state it when useful, and proceed.
- Public copy is under active owner-led revision. Treat existing page source as factual and layout context, not as an approved voice reference; use the source order in `docs/project/writing-direction.md`.
- When the user asks for copy review or analysis, do not edit files unless implementation is also requested. When exact replacement wording is supplied, preserve it unless asked to edit it.
- Treat SEO reports and sample outlines as research and coverage prompts, not as mandatory page templates or voice references.
- Apply tracker items only when they are relevant to the current task; their presence is not permission to implement unrelated scope.
- Keep project scope and design-system scope separate.
- For fresh visual creation or redesign, actively pursue a content-specific, out-of-the-box composition. Creative departure is the default expectation, not merely an available option. Develop at least two structurally different directions before selecting one when the user has not already chosen a concrete direction; at least one should materially depart from the site's existing page patterns.
- Unless the current task explicitly changes the visual identity, keep the site's basic scheme: established font families, type roles and type scale; the existing colour palette and semantic colour roles; shared navigation, footer and interaction behaviour; and the accessibility baseline. These are identity anchors, not layout templates.
- Treat composition, grids, component forms, surfaces, depth, layering, shape, spacing rhythm, imagery, motion and responsive recomposition as active creative variables. New page-scoped components and treatments are encouraged when they give the content a clearer or more memorable form.
- Do not default to existing cards, fine rules, flat surfaces, split sections, spacing patterns, rendered examples or page silhouettes simply because they already exist. Reuse them only when they strengthen the selected concept. Every creative departure should clarify hierarchy, meaning, relationship or interaction rather than add novelty for its own sake.
- Do not treat a file in `src/components/` as active design-system API unless the design-system docs describe it that way.
- Keep one-off visual explorations page-scoped until they prove useful beyond one context.

## Git And Release Workflow

- Do not check for or use GitHub CLI (`gh`) unless the current task explicitly involves pull requests, GitHub issues, Actions, or another GitHub-specific feature. Use standard Git commands for repository operations.
- `master` is the production branch and the source for Vercel production deployments.
- `staging` is the long-lived integration branch and primary release candidate. Use its Vercel preview deployment to review combined changes before production.
- Create `work/*` branches from the current `staging` branch by default, then merge completed work back into `staging`.
- Vercel may create preview deployments for any non-production branch. Working-branch previews are useful for isolated checks; the `staging` preview represents the combined release candidate.
- Release by fast-forwarding or merging `staging` into `master`. Do not squash or rebase the long-lived `staging` branch into `master`, because their shared history should remain usable for later releases.
- If a production fix lands directly on `master`, bring it back into `staging` before creating further work so the branches do not drift.

## Update Rules

- Update [docs/project/current-scope.md](docs/project/current-scope.md) when public-site, development-route, API, analytics, test, or deployment scope changes.
- Add or update `DEBT-*` items in [docs/project/project-debt.md](docs/project/project-debt.md) when technical or maintainability pressure should stay visible.
- Add or update `LAUNCH-*` items in [docs/project/launch-readiness.md](docs/project/launch-readiness.md) when launch-readiness review, sign-off, matrices, or cross-site checks should stay visible.
- Add or update `SITE-*` items in [docs/project/site-backlog.md](docs/project/site-backlog.md) when meaningful concrete visitor-facing change work is deferred.
- Update [docs/project/task-log.md](docs/project/task-log.md) only for durable project state changes.
- Update [docs/design-system/current-scope.md](docs/design-system/current-scope.md) when visual/component system state changes.

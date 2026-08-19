# Repository Guidance For AI Agents

Start with [docs/project/README.md](docs/project/README.md). It is the whole-project map for document ownership, authority, current state, tracked work, and supporting history. This file owns task routing and repository-wide working rules.

## Authority Model

- For requirements and intent, the current task defines the requested outcome, followed by the repository-wide rules in this file and then the relevant domain guidance. A tracker item or plan applies only when the current task selects it.
- For stable practice scope, expertise, positioning, and public-site purpose, follow [docs/project/practice-direction.md](docs/project/practice-direction.md). It supplies internal direction, not reusable public wording.
- For current implementation facts, executable behaviour, tests, configuration, and source are the strongest evidence. Current-scope documents summarize that state; reports and task history provide supporting context.
- For reusable design-system API, follow [docs/design-system/governance.md](docs/design-system/governance.md) and the current-only `foundations.md`, `components.md`, and `patterns.md` catalogues. Source code, a public consumer, a legacy-register entry, or a rendered example does not by itself make something approved reusable API.
- Trackers, reports, plans, checklists, archives, and task history are supporting memory. They do not override active guidance or authorize work unless the current task explicitly adopts them.

## Required Reading

- For public copy, content hierarchy, inclusion language, enquiry flow, metadata wording, or visitor-facing positioning, read [docs/project/practice-direction.md](docs/project/practice-direction.md), [docs/project/writing-direction.md](docs/project/writing-direction.md), and the target page context, then use the repository-local `copywriter` skill. This remains required when substantive public copy changes inside a broader design or implementation task. Do not consult audience or market research for ordinary drafting unless the user explicitly requests research-informed work. Consult source or [docs/project/current-scope.md](docs/project/current-scope.md) only when the wording needs a current service or implementation detail.
- For current routes, app behaviour, API/form behaviour, deployment assumptions, tests, or documentation structure, check [docs/project/current-scope.md](docs/project/current-scope.md).
- Use the repository-local `cleanup-sweep` skill only when the user explicitly asks for a cleanup sweep. Do not invoke it for other reviews, cleanup, refactoring, or general maintainability work; handle those within the current task's stated scope. During a cleanup sweep, do not use trackers to select the target; consult project debt only when the selected source finding cannot be completed safely, and treat that debt record as the outcome.
- For a holistic code review and improvement pass over a named implementation surface or code change set, use the repository-local `code-quality-pass` skill. The supplied surface or change set defines the boundary, while relevant callers, dependencies, styles, scripts, tests, and configuration may be included when needed to judge and improve it properly. Unless the user explicitly asks for review-only findings, implement all justified in-scope improvements; do not turn the pass into a repository-wide cleanup sweep.
- For other technical, routing, API, security, deployment, test, design-system maintenance, or general maintainability work, search [docs/project/project-debt.md](docs/project/project-debt.md) for related `DEBT-*` items rather than reading it as a general prerequisite.
- For requested or deferred concrete visitor-facing changes, or when deciding how to record one, consult [docs/project/site-backlog.md](docs/project/site-backlog.md).
- For design-system maintenance, shared-API reuse, or documentation work, start at [docs/design-system/README.md](docs/design-system/README.md). For fresh visual creation or redesign, establish an actively creative direction from the current task, content, and the website-design skill before consulting existing component or page-pattern material. Preserve the site's basic identity scheme as described below, but do not treat the current design system as layout authority unless the task explicitly adopts a pattern.

## Working Rules

- In Planning Mode, actively use questions to understand the user's intent and preferences. The user welcomes exploratory dialogue: ask freely whenever an answer could improve the plan, including non-blocking preferences and choices for which a reasonable assumption is available, and do not cap the total at three. Inspect available context first so questions build on what is already known. If the interface limits each prompt to three questions, use additional concise, grouped rounds and adapt later questions to earlier answers. Outside Planning Mode, ask before acting when missing information would materially change the requested outcome, scope, safety, or an irreversible decision; otherwise make a reasonable assumption, state it when useful, and proceed.
- Public copy is under active owner-led revision. Treat existing page source as factual and layout context, not as an approved voice reference or editorial precedent; use the source order in `docs/project/writing-direction.md`.
- When the user asks for copy review or analysis, do not edit files unless implementation is also requested. When exact replacement wording is supplied, preserve it unless asked to edit it.
- When an explicitly research- or SEO-informed task uses reports or sample outlines, treat them as content prompts rather than page templates or voice references.
- Apply tracker items only when they are relevant to the current task; their presence is not permission to implement unrelated scope.
- Keep project scope and design-system scope separate.
- For fresh visual creation or redesign, actively pursue a content-specific, out-of-the-box composition. Creative departure is the default expectation, not merely an available option. Develop at least two structurally different directions before selecting one when the user has not already chosen a concrete direction; at least one should materially depart from the site's existing page patterns.
- Unless the current task explicitly changes the visual identity, keep the site's basic scheme: established font families, type roles and type scale; the existing colour palette and semantic colour roles; shared navigation, footer and interaction behaviour; and the accessibility baseline. These are identity anchors, not layout templates.
- Treat composition, grids, component forms, surfaces, depth, layering, shape, spacing rhythm, imagery, motion and responsive recomposition as active creative variables. New page-scoped components and treatments are encouraged when they give the content a clearer or more memorable form.
- Do not default to existing cards, fine rules, flat surfaces, split sections, spacing patterns, rendered examples or page silhouettes simply because they already exist. Reuse them only when they strengthen the selected concept. Every creative departure should clarify hierarchy, meaning, relationship or interaction rather than add novelty for its own sake.
- Do not treat a file in `src/components/` as reusable design-system API unless it has a current contract in `docs/design-system/components.md`.
- Keep one-off visual explorations page-scoped until they prove useful beyond one context.

## Private Analytics

- Treat the entire private analytics surface—`/analytics`, every route beneath it, and its reporting UI—as an owner-only internal product surface, not as part of the public site's visual identity or design system. Do not broaden this surface into a multi-user administration product, generalized dashboard framework, or reusable public-site pattern unless the current task explicitly requests that scope.
- Keep the visual implementation boundary strict in both directions. Analytics owns its CSS, visual tokens, assets, and UI components; do not import public page or design-system presentation into analytics, change public styles to accommodate analytics, reuse or promote analytics presentation on the public site, or use either surface as visual direction for the other. Nonvisual types, data contracts, domain utilities, and public tracking infrastructure may be shared when they represent a genuine functional boundary.
- There is no local analytics database. Use proportionate local static, type, unit, or mocked checks without claiming that they verify deployed data behaviour. When database-backed analytics behaviour needs verification, complete the safe local checks, push the working branch to trigger its Git-integrated Vercel Preview deployment against the separate Preview database, and never use Production for development verification. Use the available Vercel tooling to find the deployment for the pushed commit, wait for it to become ready, and give the owner the exact preview `/analytics` URL with a short focused manual-check list; the owner is the final verifier.
- Calibrate automated coverage to the risk and the fact that analytics has one owner. Add tests for high-risk data correctness, migrations, API contracts, authentication or privacy boundaries, and concrete regressions; avoid extensive visual assertions and speculative coverage. Where practical, keep analytics-only coverage behind `npm run qa:analytics` or a narrower relevant command, and do not add routine private-dashboard cases to the public-site browser suite or general site QA unless the change genuinely crosses a shared boundary.

## Incremental Design-System Migration

- Production source proves what is implemented; it does not by itself make a token, selector, component, or pattern approved reusable API. Only a current contract in [docs/design-system/foundations.md](docs/design-system/foundations.md), [components.md](docs/design-system/components.md), or [patterns.md](docs/design-system/patterns.md) authorizes deliberate shared reuse.
- The active catalogues contain promoted items only. Do not place inherited, page-local, candidate, development-only, withdrawn, removed, or historical items in them.
- Treat implementation absent from the active catalogues as outside the design system. Do not reuse or remove it merely because it exists, looks current, has a shared-looking name, appears on a public route, or is recorded in `docs/design-system-legacy/`.
- Keep new visual implementation page-local by default. Investigate repeated needs within the current task, but do not add candidate records to the active catalogues or promote during ordinary page work.
- Promote CSS, tokens, components, or patterns only when the current task explicitly includes shared-system work and the promotion rules in [docs/design-system/governance.md](docs/design-system/governance.md) are satisfied.
- Existing consumers of inherited implementation may receive scoped correctness, accessibility, or compatibility fixes until an explicitly authorized migration replaces them. Do not broaden the implementation's role during that work.
- Remove or migrate old implementation only within explicit cleanup or shared-system scope, after verifying source consumers and running checks proportionate to the affected behaviour. Preserve existing consumers otherwise.
- Similar declarations or literal values are not enough to justify elevation. Shared implementation must represent the same semantic role across current consumers without flattening content-shaped page composition.
- Use `docs/design-system-legacy/` only as non-authoritative, source-backed working evidence about inherited implementation. Remove a legacy entry when its item is promoted or its source is removed; Git and the project task log retain completed history.
- Treat the development-only `/design-system` workspace as a rendered view of the active catalogues, never as authority itself. It may show only items currently present in those catalogues.
- Render supported specimens from the real production component or supported production classes. Do not copy approximate demo markup, maintain a parallel status registry, or place legacy, candidate, page-local, withdrawn, removed, or development-only items in the supported specimen area.
- Keep candidate exploration in page-local work or the development test beds. Do not restore or redirect the retired `/design-language/*` snapshot when extending the new workspace.

## IDE Visual Verification

- For visual verification from Codex in the VS Code extension, follow [docs/project/visual-verification.md](docs/project/visual-verification.md). It owns the supported browser route, managed server lifecycle, invocation, and capture techniques without defining task-specific visual review criteria.
- For changes confined to development-only pages, default to a quick code sanity check: focused source inspection and the smallest relevant typecheck or build check. Do not perform full visual, responsive, accessibility, or browser testing on development-only pages unless the current task explicitly requests it.

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
- Add or update `SITE-*` items in [docs/project/site-backlog.md](docs/project/site-backlog.md) when meaningful concrete visitor-facing change work is deferred.
- Update [docs/project/task-log.md](docs/project/task-log.md) only for durable project state changes.
- Update the relevant active catalogue under [docs/design-system/](docs/design-system/) when supported system state changes, and update [docs/design-system-legacy/](docs/design-system-legacy/) only when current source work changes or verifies inherited implementation facts.

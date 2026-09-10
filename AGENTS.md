# Repository Guidance For AI Agents

This file owns repository-wide working rules and task routing. Start with [docs/project/README.md](docs/project/README.md) for the document map, then load the guidance relevant to the task.

## Authority And Scope

- Within repository guidance, the current task defines the requested outcome, followed by this file and then relevant domain guidance. Follow explicit editing limits and preserve exact supplied wording unless the user asks to revise it.
- Source, executable behaviour, tests and configuration are the strongest evidence for implementation facts. [Current scope](docs/project/current-scope.md) explains the system and points to those owners; a checked-out feature is not proof of a Production deployment.
- [Practice context](docs/project/practice-context.md) supplies background facts about Vive and Joel. The current task determines their relevance and presentation; they do not set copy or design priorities.
- For reusable design-system API, follow [docs/design-system/governance.md](docs/design-system/governance.md) and the current-only `foundations.md`, `components.md`, and `patterns.md` catalogues. Source code, a public consumer, a legacy-register entry, or a rendered example does not by itself make something approved reusable API.
- Trackers, reports, plans, checklists, archives and task history are supporting memory. Use relevant evidence without treating it as permission for additional work. A plan or tracker item becomes the brief only when the current task adopts it.

## Understand The Task

| Request | Expected action |
| --- | --- |
| “Do a code review of X” or “Give X a quality pass” | Inspect the named implementation or change set, fix justified in-scope issues, and verify the result using [code-quality-pass](.agents/skills/code-quality-pass/SKILL.md). |
| “Review only”, “findings only”, or “do not edit” | Report findings and recommended changes without editing, including for code reviews. |
| Review or assess copy, documentation, instructions or a plan | Return the assessment and suggested direction. Edit when the user also asks to implement, rewrite or update. |
| Implement, fix, improve or rework X | Complete the requested change within its stated scope, including necessary integration and verification. |

A code review may include relevant callers, dependencies, styles, tests and configuration needed to judge and improve the named surface. It does not authorize unrelated feature work or a repository-wide cleanup. Explicit task instructions override these defaults; the user does not need to repeat authorization already given in the conversation.

- In Planning Mode, actively explore intent and preferences through questions, including useful non-blocking choices. Inspect context first, adapt later questions to earlier answers, and do not impose a fixed total question limit. Use additional grouped rounds when the interface limits questions per prompt.
- Outside Planning Mode, resolve routine choices and proceed. Ask when missing information would materially change the outcome, scope, safety or an irreversible decision; state useful assumptions without turning them into approval requests.
- Preserve unrelated working-tree changes. Read the current files before editing and integrate with ongoing work rather than restoring an older version.

## Read For The Task

- **System understanding:** start with the orientation in [current-scope.md](docs/project/current-scope.md), then the relevant sections and source links.
- **Public wording:** use the repository [copywriter](.agents/skills/copywriter/SKILL.md) skill when editorial judgement is needed, including within implementation work. Follow its reading order for practice context, writing direction and target copy. Typo-only fixes and insertion of exact supplied wording do not trigger it. Internal documentation, private-interface text and technical work require explicit invocation of this skill. Audience and market research remain opt-in under [writing direction](docs/project/writing-direction.md).
- **Articles:** also read [article-writing.md](docs/project/article-writing.md) for drafting or revision; use [article-publishing.md](docs/project/article-publishing.md) for implementation and publication.
- **Cleanup sweeps:** use [cleanup-sweep](.agents/skills/cleanup-sweep/SKILL.md) only when explicitly requested. It selects its target from source, not trackers; its debt-recording fallback applies when the selected improvement cannot be completed safely.
- **Other technical or maintainability work:** search [project-debt.md](docs/project/project-debt.md) for related `DEBT-*` items instead of reading the whole tracker as a prerequisite.
- **Database changes:** follow [database/README.md](database/README.md) for environment selection and migration procedure. Builds and deployments do not apply migrations.

## Engineering And Verification

This is a small, owner-operated site. Prefer clear, direct implementation that serves demonstrated needs. Scale architecture, dependencies, safeguards and tests to the actual maintenance cost and consequences of failure. Data correctness, enquiry delivery, authentication and privacy warrant more care than routine presentation edits.

- Choose the smallest set of checks that gives useful confidence in the change. Use the commands and limits in [current-scope.md](docs/project/current-scope.md#working-locally-and-verifying-changes); full QA suites, browser sweeps and Lighthouse audits are not routine completion requirements.
- Reuse relevant existing coverage. Add or update tests for a material regression, changed behavioural contract, consequential side effect, or data/security boundary. Do not add tests merely to mirror implementation details or cover a routine wording, styling or documentation edit.
- For public visual or interaction changes, use focused rendered or browser inspection when needed to assess the affected behaviour. Limit it to relevant routes, states and viewports. For Codex IDE browser access, follow [visual-verification.md](docs/project/visual-verification.md), which owns the supported tools and lifecycle.
- Development-only presentation changes normally need source inspection and the smallest relevant static check. Changes to functional tools, such as article saving, still need focused checks of the affected behaviour. Do not turn those checks into a full visual, responsive or browser audit unless requested.
- Once relevant checks pass, stop. Broaden or repeat them only when a failure, subsequent change or unresolved concern justifies it. Avoid repeating checks already covered by a command that passed.
- Review the final diff. Report material changes, checks performed and any consequential verification still outstanding. Distinguish source inspection, mocked tests and local builds from evidence about deployed services.

The private-dashboard verification policy below takes precedence over general browser-review guidance, including skill defaults.

## Private Analytics

- Treat the entire private analytics surface—`/analytics`, every route beneath it, and its reporting UI—as an owner-only internal product surface, not as part of the public site's visual identity or design system. Do not broaden this surface into a multi-user administration product, generalized dashboard framework, or reusable public-site pattern unless the current task explicitly requests that scope.
- Keep analytics visually independent in direction: the dashboard does not need to look or feel like the public website and may own its CSS, visual tokens, assets, and UI components. This does not require a separate browser entry, isolated bundles, or zero shared global styles or generic foundations. Do not change public presentation merely to accommodate analytics, promote analytics presentation as public design-system API, or use either surface as the default visual direction for the other unless the current task requests it. Nonvisual types, data contracts, domain utilities, and public tracking infrastructure may also be shared when they represent a genuine functional boundary.
- Dashboard browser testing belongs to the owner. Do not perform automated or manual browser checks of dashboard presentation, interactions or reports unless the current task explicitly asks the agent to do it. This covers `/analytics` and every dashboard subroute. There is no local analytics database.
- Use focused local source, type, unit or mocked checks where useful. Prioritize report/data correctness, migrations, API contracts, authentication/privacy boundaries and concrete regressions. Avoid routine dashboard browser assertions, speculative coverage and broad test runs. Local checks do not verify deployed data behaviour.
- When a dashboard change needs visual, interaction or real-data verification, prepare a working-branch Vercel Preview for the owner. Check any required Preview migration using [database/README.md](database/README.md), commit and push the relevant work, find the deployment for that commit, and wait for it to become ready. Provide its exact `/analytics` URL (or the relevant dashboard subroute) and a short, focused check list. Use the separate Preview database; never use Production for development verification.
- If the owner check is outstanding, hand off the ready preview and identify what remains unverified. Keep the feature on its working branch until that check is complete; then follow the normal merge flow. A preview check is needed when the change warrants it, not for every dashboard edit.
- Public tracking and shared privacy boundaries are separate from dashboard browser testing: verify changes to collection, attribution or private-route tracking exclusion where affected. Use focused non-browser analytics checks such as `npm run test:analytics` when relevant; `npm run qa:analytics` includes browser scenarios and is not the default for dashboard work. Keep routine private-dashboard cases out of public-site QA.

## Git And Release Workflow

- Continue an appropriate existing `work/*` branch for ongoing work. For new independent work, create a `work/*` branch from an up-to-date `staging` branch.
- Commit coherent completed features or fixes and merge their working branch into `staging` after the relevant verification. If a branch still contains unfinished work, keep it separate until it is ready for integration.
- `staging` is the long-lived integration branch and combined release candidate. Its Vercel Preview supports review before release; working-branch previews support isolated checks.
- Release by fast-forwarding or merging `staging` into `master`, the source of Vercel Production deployments. Do not squash or rebase the long-lived `staging` branch into `master`; preserve their shared history for later releases.
- If a Production fix lands directly on `master`, bring it back into `staging` before starting further work.
- Use standard Git commands. Do not check for or use GitHub CLI (`gh`) unless the task explicitly involves a GitHub feature such as pull requests, issues or Actions.

## Maintain Project Memory

- Update [current-scope.md](docs/project/current-scope.md) when capabilities, significant behaviour, data flows, runtime/privacy boundaries, source ownership or verification methods change. Follow its [maintenance guidance](docs/project/current-scope.md#maintaining-this-guide): preserve useful system understanding without a length target or a running account of presentation changes.
- Add or update relevant `DEBT-*` records in [project-debt.md](docs/project/project-debt.md) when unresolved technical or maintainability pressure should remain visible.
- The [site backlog](docs/project/site-backlog.md) is not required reading for visitor-facing work. Use it when the task selects an item or when recording/updating meaningful deferred visitor-facing work. Keep resolved records current when the selected work completes them.
- Record durable project-state or guidance changes in [task-log.md](docs/project/task-log.md). Routine fixes, investigations and small edits do not each need an entry.
- Keep working rules here, functional understanding in current scope, and specialist methods in their owner documents or skills. Update the owner and any affected routing links instead of maintaining parallel procedures.
- Update the relevant active catalogue under [docs/design-system/](docs/design-system/) when supported system state changes, and update [docs/design-system-legacy/](docs/design-system-legacy/) only when current source work changes or verifies inherited implementation facts.

## Visual Work

- For design-system maintenance, shared-API reuse, or documentation work, start at [docs/design-system/README.md](docs/design-system/README.md). For fresh visual creation or redesign, establish an actively creative direction from the current task, content, and the website-design skill before consulting existing component or page-pattern material. Preserve the site's basic identity scheme as described below, but do not treat the current design system as layout authority unless the task explicitly adopts a pattern.

- Keep project scope and design-system scope separate.
- For fresh visual creation or redesign, actively pursue a content-specific, out-of-the-box composition. Creative departure is the default expectation, not merely an available option. Develop at least two structurally different directions before selecting one when the user has not already chosen a concrete direction; at least one should materially depart from the site's existing page patterns.
- Unless the current task explicitly changes the visual identity, keep the site's basic scheme: established font families, type roles and type scale; the existing colour palette and semantic colour roles; shared navigation, footer and interaction behaviour; and the accessibility baseline. These are identity anchors, not layout templates.
- Treat composition, grids, component forms, surfaces, depth, layering, shape, spacing rhythm, imagery, motion and responsive recomposition as active creative variables. New page-scoped components and treatments are encouraged when they give the content a clearer or more memorable form.
- Do not default to existing cards, fine rules, flat surfaces, split sections, spacing patterns, rendered examples or page silhouettes simply because they already exist. Reuse them only when they strengthen the selected concept. Every creative departure should clarify hierarchy, meaning, relationship or interaction rather than add novelty for its own sake.
- Do not treat a file in `src/components/` as reusable design-system API unless it has a current contract in `docs/design-system/components.md`.
- Keep one-off visual explorations page-scoped until they prove useful beyond one context.

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

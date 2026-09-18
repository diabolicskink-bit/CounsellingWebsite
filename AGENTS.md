# Repository Guidance For AI Agents

This file owns repository-wide working rules and task routing. Start with [docs/project/README.md](docs/project/README.md) for the document map, then load the guidance relevant to the task.

## Authority And Scope

- Within repository guidance, the current task defines the requested outcome, followed by this file and then relevant domain guidance. Follow explicit editing limits and preserve exact supplied wording unless the user asks to revise it.
- Source, executable behaviour, tests and configuration are the strongest evidence for implementation facts. [Current scope](docs/project/current-scope.md) explains the system and points to those owners; a checked-out feature is not proof of a Production deployment.
- [Practice context](docs/project/practice-context.md) supplies background facts about Vive and Joel. The current task determines their relevance and presentation; they do not set copy or design priorities.
- For shared visual implementation, follow [design-system governance](docs/design-system/governance.md): the active catalogues define supported API, and its [public identity compatibility baseline](docs/design-system/governance.md#public-identity-compatibility-baseline) permits specific inherited building blocks. Source, a consumer, a legacy entry, or a rendered example alone does not authorize reuse.
- Trackers, reports, plans, checklists, archives and task history are supporting memory. Use relevant evidence without treating it as permission for additional work. A plan or tracker item becomes the brief only when the current task adopts it.

## Understand The Task

| Request | Expected action |
| --- | --- |
| “Do a code review of X” or “Give X a quality pass” | Use [code-quality-pass](.agents/skills/code-quality-pass/SKILL.md) to review the named implementation or change set as a very senior programmer: improve its design and line-level craftsmanship, including working code, correct defects, and verify the result. |
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

This is a low-traffic site maintained by one developer, with one owner using the private analytics. Prefer clear, direct implementation that serves demonstrated needs. Scale architecture, dependencies, safeguards and tests to the actual maintenance cost and consequences of failure. Data correctness, enquiry delivery, authentication and privacy warrant more care than routine presentation edits.

- Choose the smallest set of checks that gives useful confidence in the change. Use the commands and limits in [tests/README.md](tests/README.md#commands); full QA suites, browser sweeps and Lighthouse audits are not routine completion requirements.
- For public visual or interaction changes, use focused rendered or browser inspection when needed to assess the affected behaviour. Limit it to relevant routes, states and viewports. In the Codex IDE, use the persistent `node_repl` JavaScript tool with repository Playwright and installed Chrome, following [visual-verification.md](docs/project/visual-verification.md). This repository route takes precedence over plugin browser workflows; do not start with `agent-browser` or a Chromium download.
- Development-only presentation changes normally need source inspection and the smallest relevant static check. Changes to functional tools, such as article saving, still need focused checks of the affected behaviour. Do not turn those checks into a full visual, responsive or browser audit unless requested.
- Once relevant checks pass, stop. Broaden or repeat them only when a failure, subsequent change or unresolved concern justifies it. Avoid repeating checks already covered by a command that passed.
- Review the final diff. Report material changes, checks performed and any consequential verification still outstanding. Distinguish source inspection, mocked tests and local builds from evidence about deployed services.

### Test Scope And Maintenance

Reuse existing coverage and add tests only for consequential behaviour that warrants their maintenance. Follow [tests/README.md](tests/README.md) for test design, coverage ownership, commands, and execution limits.

The private-dashboard verification policy below takes precedence over general browser-review guidance, including skill defaults.

## Private Analytics

- Treat the entire private analytics surface—`/analytics`, every route beneath it, and its reporting UI—as an owner-only internal product surface, not as part of the public site's visual identity or design system. Do not broaden this surface into a multi-user administration product, generalized dashboard framework, or reusable public-site pattern unless the current task explicitly requests that scope.
- Keep analytics visually independent in direction: the dashboard does not need to look or feel like the public website and may own its CSS, visual tokens, assets, and UI components. This does not require a separate browser entry, isolated bundles, or zero shared global styles or generic foundations. Do not change public presentation merely to accommodate analytics, promote analytics presentation as public design-system API, or use either surface as the default visual direction for the other unless the current task requests it. Nonvisual types, data contracts, domain utilities, and public tracking infrastructure may also be shared when they represent a genuine functional boundary.
- Routine dashboard browser testing belongs to the owner. Agents may perform focused browser or real-data checks when the task explicitly requests them, or when substantial analytics changes cannot be adequately verified locally and warrant direct verification through a Preview. This covers `/analytics` and every dashboard subroute. There is no local analytics database.
- Use focused local source, type, unit or mocked checks where useful. Prioritize report/data correctness, migrations, API contracts, authentication/privacy boundaries and concrete regressions. Avoid routine dashboard browser assertions, speculative coverage and broad test runs. Local checks do not verify deployed data behaviour.
- An explicit working-branch Preview request, or substantial analytics work meeting the verification condition above, authorizes committing and pushing the relevant changes for a working-branch Vercel Preview. Routine wording, styling or small changes do not qualify merely because there is no local database.
- For Preview verification, check any required Preview migration using [database/README.md](database/README.md), find the deployment for the relevant commit, and wait for it to become ready. Perform the focused checks warranted by the task, or provide the Preview for the owner's checks when that is the request. Use the separate Preview database; never use Production for development verification.
- Report the Preview's exact `/analytics` URL (or relevant dashboard subroute), what was verified and any checks remaining for the owner. Where a Preview is not warranted, report any verification left to the owner. Keep the work on its working branch until the owner directs integration or promotion.
- Public tracking and shared privacy boundaries are separate from dashboard browser testing: verify changes to collection, attribution or private-route tracking exclusion where affected. Use focused non-browser analytics checks such as `npm run test:analytics` when relevant; `npm run qa:analytics` includes browser scenarios and is not the default for dashboard work. Keep routine private-dashboard cases out of public-site QA.

## Git And Release Workflow

Create `work/*` branches from `origin/staging` and do implementation work on those working branches. Continue an appropriate existing working branch for ongoing work. At the owner's direction, merge working branches into `staging` for integration, then merge `staging` into `master` for Production promotion.

Both `staging` and `master` are long-lived branches. The `staging` Vercel Preview supports review of the combined release candidate; pushing `master` triggers automatic Vercel Production deployment.

- Leave working-branch changes uncommitted after implementation and verification for the owner's IDE diff review. Task completion or passing checks does not itself authorize a commit, push, merge or promotion.
- Interpret Git requests in the context of the conversation, following the requested destination and any stated limits. Combined requests authorize their combined actions:
  - **Commit** authorizes committing the changes in scope.
  - **Push** authorizes pushing existing commits.
  - **Merge** authorizes any necessary commits and local merges to the requested destination, without pushing.
  - **Promote** authorizes the commits, merges and pushes needed to reach the requested destination. Promoting to `staging` stops there; promoting to Production continues through `staging` to `master`.
- An explicit working-branch Preview request, or substantial analytics verification under [Private Analytics](#private-analytics), authorizes the necessary working-branch commit and push. Preview verification does not authorize staging integration or Production promotion.
- The owner may use IDE Sync after local commits or merges. Do not check deployment status after routine pushes or promotions unless requested. Preparing a Preview for actual verification includes waiting for it to be ready for those checks.
- Preserve shared history between the long-lived branches. Do not squash or rebase `staging` into `master`.
- Use standard Git commands. Do not check for or use GitHub CLI (`gh`) unless the task explicitly involves a GitHub feature such as pull requests, issues or Actions.

## Maintain Project Memory

- Update [current-scope.md](docs/project/current-scope.md) when capabilities, significant behaviour, data flows, runtime/privacy boundaries, source ownership or verification methods change. Follow its [maintenance guidance](docs/project/current-scope.md#maintaining-this-guide): preserve useful system understanding without a length target or a running account of presentation changes.
- Add or update relevant `DEBT-*` records in [project-debt.md](docs/project/project-debt.md) when unresolved technical or maintainability pressure should remain visible.
- The [site backlog](docs/project/site-backlog.md) is not required reading for visitor-facing work. Use it when the task selects an item or when recording/updating meaningful deferred visitor-facing work. Keep resolved records current when the selected work completes them.
- Record consequential project-state changes and decision context under the [task log's admission and maintenance rules](docs/project/task-log.md#admission-rule). Routine fixes, investigations and small edits do not each need an entry.
- Keep working rules here, functional understanding in current scope, and specialist methods in their owner documents or skills. Update the owner and any affected routing links instead of maintaining parallel procedures.
- Update the relevant active catalogue under [docs/design-system/](docs/design-system/) when supported system state changes, and update [docs/design-system-legacy/](docs/design-system-legacy/) only when current source work changes or verifies inherited implementation facts.

## Visual Work

- Public pages should belong recognisably to the same site, use shared implementation for recurring needs, and make room for creative composition and interesting new components. Follow [design-system guidance](docs/design-system/README.md) for the available foundations and building blocks; use the website-design skill for fresh visual creation or redesign.
- Unless the current task explicitly changes the visual identity, preserve the established font families, type roles and scale, colour palette and semantic roles, shared navigation and footer, interaction conventions, and accessibility baseline. Use the shared foundations directly rather than copying their values or creating page-specific substitutes.
- Reuse a supported component or pattern when it fits the content and role. Related pages should normally share hero foundations and suitable component families; page-specific content alone does not justify another hero implementation or body-text style. Respect each contract's fixed behaviour and consumer-owned freedoms.
- Actively develop interesting new components and treatments when they give the content or interaction a clearer, more engaging form. Creative freedom includes component structure, imagery, grids, surfaces, layering, motion and responsive composition, while keeping the site's identity and accessibility coherent.
- Establish direction from the task and content while considering the shared building blocks early. Explore meaningfully different approaches when useful; creative quality does not require departing from existing patterns, implementing multiple prototypes, or adding an approval checkpoint.
- Keep genuinely unique work page-local. When the same role recurs, prefer a suitable shared implementation or a purposeful variant to near-duplicate components. Follow governance for changes to shared contracts; keep abstractions proportionate to demonstrated needs.
- Judge the result by content fit, visual coherence, accessibility and maintenance cost. Reuse should support expressive design, and new design should earn its complexity through a useful content or interaction distinction.

## Incremental Design-System Migration

Follow [design-system governance](docs/design-system/governance.md) for reuse permissions, shared-contract changes, promotion, withdrawal, inherited implementation, source organisation, and rendered-workspace maintenance. Ordinary page work may use the active contracts and the explicit compatibility baseline, and create page-local components. Promotion follows the shared-system scope rules in governance.

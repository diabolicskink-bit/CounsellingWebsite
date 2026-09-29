# Repository Guidance For AI Agents

This is the repository-wide working agreement and task router. Read the guides relevant to the current task; combine them when work crosses domains. [docs/README.md](docs/README.md) is the full document map, not an additional prerequisite.

## Authority And Scope

- Within repository guidance, follow the current task, then this file, then the relevant domain guide. Preserve explicit editing limits and exact supplied wording unless asked to revise it.
- Source, executable behaviour, tests and configuration establish implementation facts. The system reference explains their connections; a checked-out feature is not proof of a Production deployment.
- Guidance owns working rules; references own project facts; design-system catalogues own promoted reuse contracts. Reports, plans, checklists, research and memory support the task without authorizing more work. A recorded item becomes the brief only when the current task adopts it.
- Preserve unrelated working-tree changes, including other agents' work. Read current files and integrate changes rather than restoring older versions.

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

## Task Routing

| Task | Read or use |
| --- | --- |
| Understand the application or locate implementation | [System reference](docs/reference/SYSTEM.md): orientation, then relevant sections |
| Public design, a new component, or shared-system work | [Design](docs/guidance/DESIGN.md), then relevant [catalogues](docs/design-system/README.md); use [website-design](.agents/skills/website-design/SKILL.md) for fresh creation or redesign |
| Write or assess public wording | Use [copywriter](.agents/skills/copywriter/SKILL.md) and [writing guidance](docs/guidance/WRITING.md); [practice facts](docs/reference/PRACTICE.md) are context, not a content checklist |
| Draft, revise, implement or publish an article | Relevant authoring or implementation sections of [Articles](docs/guidance/ARTICLES.md) |
| Private analytics UI, reporting or Preview checks | [Analytics](docs/guidance/ANALYTICS.md); its independent visual direction and owner-led browser policy take precedence over public-site defaults |
| Choose checks or inspect rendered behaviour | [Verification](docs/guidance/VERIFICATION.md); [tests](tests/README.md) owns command selections and organisation |
| Database or migration work | [Database](database/README.md); builds and deployments do not apply migrations |
| Technical or maintainability work | Search [debt](docs/memory/DEBT.md) for related `DEBT-*` records; do not read the full tracker as a prerequisite |
| Explicit cleanup sweep | Use [cleanup-sweep](.agents/skills/cleanup-sweep/SKILL.md); it selects work from source, not trackers |

Public-copy skill use requires editorial judgement: typo-only corrections and insertion of exact supplied wording do not trigger it. Internal documentation, private-interface wording and technical work require explicit invocation. Audience and market research remain opt-in. Cleanup sweeps also require explicit invocation.

## Engineering And Verification

This is a low-traffic site maintained by one developer, with one owner using private analytics. Prefer clear implementation for demonstrated needs. Scale architecture, safeguards and tests to maintenance cost and consequences; enquiry delivery, data correctness, authentication and privacy warrant more care than routine presentation.

Choose the smallest useful checks under [Verification](docs/guidance/VERIFICATION.md), including its domain exceptions. Stop once relevant checks pass; expand only for a failure, subsequent change or unresolved concern. Review the final diff and report material changes, checks performed and consequential gaps. Distinguish local inspection, mocks and builds from evidence about deployed services.

## Git And Release Workflow

Create `work/*` branches from `origin/staging` and do implementation work on those working branches. Continue an appropriate existing working branch for ongoing work. At the owner's direction, merge working branches into `staging` for integration, then merge `staging` into `master` for Production promotion.

Both `staging` and `master` are long-lived branches. The `staging` Vercel Preview supports review of the combined release candidate; pushing `master` triggers automatic Vercel Production deployment.

- Leave working-branch changes uncommitted after implementation and verification for the owner's IDE diff review. Task completion or passing checks does not itself authorize a commit, push, merge or promotion.
- Interpret Git requests in the context of the conversation, following the requested destination and any stated limits. Combined requests authorize their combined actions:
  - **Commit** authorizes committing the changes in scope.
  - **Push** authorizes pushing existing commits.
  - **Merge** authorizes any necessary commits and local merges to the requested destination, without pushing.
  - **Promote** authorizes the commits, merges and pushes needed to reach the requested destination. Promoting to `staging` stops there; promoting to Production continues through `staging` to `master`.
- An explicit working-branch Preview request, or substantial analytics verification under [Private Analytics](docs/guidance/ANALYTICS.md), authorizes the necessary working-branch commit and push. Preview verification does not authorize staging integration or Production promotion.
- The owner may use IDE Sync after local commits or merges. Do not check deployment status after routine pushes or promotions unless requested. Preparing a Preview for actual verification includes waiting for it to be ready for those checks.
- Preserve shared history between the long-lived branches. Do not squash or rebase `staging` into `master`.
- Use standard Git commands. Do not check for or use GitHub CLI (`gh`) unless the task explicitly involves a GitHub feature such as pull requests, issues or Actions.

## Maintain Project Memory

- Update [SYSTEM.md](docs/reference/SYSTEM.md#maintaining-this-guide) when capabilities, significant behaviour, data flows, runtime/privacy boundaries or source ownership change. Keep procedures with their guide and update affected routes and links.
- Keep unresolved technical pressure in [DEBT.md](docs/memory/DEBT.md), and meaningful deferred visitor-facing work in [BACKLOG.md](docs/memory/BACKLOG.md). The backlog is optional unless the task selects an item or needs to record deferred work.
- Record consequential decisions and milestones under [DECISIONS.md](docs/memory/DECISIONS.md#admission-rule). Routine fixes and small edits do not each need an entry.
- Update supported design-system contracts when their API changes; update legacy evidence only from source. Follow [Design](docs/guidance/DESIGN.md) for both.
- Use uppercase document basenames with a lowercase `.md` extension and lowercase folders, for example `docs/guidance/DESIGN.md`. Keep skill-package filenames intact; update their references when an owner document moves.

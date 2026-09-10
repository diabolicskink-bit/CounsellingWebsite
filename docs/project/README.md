# Project Documentation

This directory is the whole-project memory for Vive Counselling. [../../AGENTS.md](../../AGENTS.md) owns task modes, routing, proportionate verification, Git workflow and repository-wide update triggers; this file maps document ownership and artifact authority.

Project documentation sits beside, not inside, the design-system documentation. `docs/design-system/` is a current-only catalogue: every listed foundation, component, or pattern is approved for deliberate reuse. `docs/design-system-legacy/` separately records source-backed facts about inherited implementation without granting reuse authority or making removal safe. The outdated `/design-language/*` rendered catalogue has been removed; the development-only `/design-system` workspace visualises only the current promoted catalogue. During the temporary open-design period, the design system does not supply mandatory visual direction for fresh creation or redesign unless the current task explicitly adopts a supported pattern.

## Authority And Artifact Types

- `practice-context.md` records background facts about Vive and Joel. It does not set copy or design priorities or require those facts to appear in a particular task.
- `writing-direction.md` owns public-writing policy.
- `article-writing.md` owns article-specific tone, authoring, evidence and citation guidance; `article-publishing.md` owns implementation and publication procedures.
- `current-scope.md` gives agents a working understanding of the current system: capabilities, connected flows, source ownership, runtime boundaries and verification. It describes the checked-out implementation and deployment model; dated remote-state observations require rechecking when consequential. When exact details disagree, verify executable behaviour, tests, configuration and source, then reconcile the relevant explanation.
- Audience research dossiers are opt-in decision support for explicitly research-informed work. They do not override owner decisions, current service information, or writing direction, make public claims approved, or authorize implementation.
- Market-research dossiers are opt-in, dated decision support about search visibility, demand signals, provider supply, offers, directories and market structure. They do not set SEO, pricing, positioning or content strategy or assess provider quality.
- `DEBT-*` and `SITE-*` trackers are scoped memory and triage. Consult only the tracker relevant to the task; an item does not authorize unrelated work.
- Reports, plans, checklists, archives, and the task log are supporting evidence or history. They do not override active guidance or become requirements unless the current task explicitly adopts them.

## Practice and Writing

- [practice-context.md](practice-context.md) provides practice facts for use when relevant to the task.
- [writing-direction.md](writing-direction.md) owns the shared public-writing policy: business purpose, natural writing, factual judgement, source use and editing boundaries. Each task determines its content, emphasis and structure.
- [article-writing.md](article-writing.md) adds article-specific guidance for tone, subject treatment, evidence, attribution and references. Drafting does not require loading the publishing procedure.
- [../design-system/README.md](../design-system/README.md) is the entry point for approved reusable UI and design-system maintenance. [The legacy register](../design-system-legacy/README.md) is optional working evidence when inherited implementation is being assessed; neither is a required source of visual direction for fresh design work during the temporary open-design period.

## Current State

- [current-scope.md](current-scope.md) is the agent system guide. Start with its orientation, then use the relevant capability, rendering, enquiry, analytics, environment or verification section and source links. Maintain functional understanding and consequential connections rather than page presentation descriptions or a running changelog.
- [../../database/README.md](../../database/README.md) owns environment selection and database migration procedure; current-scope explains where that workflow fits into collection, reporting and deployment.
- [visual-verification.md](visual-verification.md) owns the supported access mechanism for ad-hoc visual inspection by Codex in the VS Code extension without defining task-specific review criteria.
- [article-publishing.md](article-publishing.md) owns the code-managed article publishing workflow, article schema, verification expectations, and boundary for considering a future CMS.
- [../design-system/governance.md](../design-system/governance.md) owns design-system authority, promotion, withdrawal, removal, verification, and update duties.
- [../design-system/foundations.md](../design-system/foundations.md), [components.md](../design-system/components.md), and [patterns.md](../design-system/patterns.md) are the complete current reusable API.

## Tracked Work

- [project-debt.md](project-debt.md) tracks technical, security, routing, API, testing, deployment, and maintainability pressure with stable `DEBT-*` IDs.
- [site-backlog.md](site-backlog.md) tracks concrete deferred visitor-facing change work with stable `SITE-*` IDs.

## Supporting Memory

- [../research/README.md](../research/README.md) maps audience dossiers available when the owner explicitly requests research-informed work.
- [../market-research/README.md](../market-research/README.md) maps dated market-segment dossiers available for explicitly selected SEO, positioning, pricing, content, and product decisions.
- `../page-plan/` contains reader-informed content plans for individual public pages. These are supporting plans and do not approve wording or authorise implementation by themselves.
- [task-log.md](task-log.md) records selected durable milestones; Git remains the detailed implementation history.
- [archive/README.md](archive/README.md) maps resolved tracker items and older task history kept outside the active reading path.
- [../design-system-legacy/README.md](../design-system-legacy/README.md) maps inherited implementation evidence kept outside the active design-system catalogue.
- `../checklists/` contains owner-directed monitors and manual-QA checklists.
- `../reports/` contains generated audits and assessments.
- `../plans/` contains draft plans and working documents.

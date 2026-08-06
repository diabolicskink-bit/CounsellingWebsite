# Repository Guidance For AI Agents

Start with [docs/project/README.md](docs/project/README.md). It maps document
ownership, current state, tracked work, and supporting history.

## Authority

- The current task defines the requested outcome.
- [docs/project/practice-direction.md](docs/project/practice-direction.md)
  owns stable practice scope, expertise, positioning, and the commercial
  purpose of the public site.
- Executable source, tests, and configuration own current behaviour.
  [docs/project/current-scope.md](docs/project/current-scope.md) summarises that
  state.
- [docs/design-system/governance.md](docs/design-system/governance.md) and the
  current-only `foundations.md`, `components.md`, and `patterns.md` catalogues
  own approved reusable design-system API. Source code, a public consumer, a
  legacy-register entry, or a rendered example does not grant reuse authority.
- Plans, trackers, reports, research, checklists, archives, and task history
  support decisions but do not override current direction or authorise work by
  themselves.

## Task Routing

- For public copy, content hierarchy, metadata wording, or visitor-facing
  positioning, read
  [docs/project/practice-direction.md](docs/project/practice-direction.md) and
  [docs/project/writing-direction.md](docs/project/writing-direction.md), then
  use the repository `copywriter` skill. Use `develop-page-copy` when the task
  specifically needs a whole-page direction or a durable page-copy artifact.
  Consult research only when the user requests it or a specific knowledge gap
  materially affects the work.
- For routes, application or form behaviour, deployment, tests, or exact
  service configuration, check
  [docs/project/current-scope.md](docs/project/current-scope.md) and source.
- For fresh design, redesign, implementation, or visual critique, use the
  repository `website-design` skill. Start at
  [docs/design-system/README.md](docs/design-system/README.md) for
  design-system maintenance or approved shared API.
- For a source-first cleanup or open-ended maintainability improvement, use the
  repository `improve-codebase` skill.
- For other technical work, search
  [docs/project/project-debt.md](docs/project/project-debt.md) for a related
  `DEBT-*` item. For deferred visitor-facing work, consult
  [docs/project/site-backlog.md](docs/project/site-backlog.md).

## Working Boundaries

- Review and analysis tasks do not authorise file changes. Implement when the
  user asks for a change or build.
- Preserve exact replacement wording when the user supplies it for
  implementation unless they also ask for editing.
- Treat existing public copy as implementation context while it remains under
  revision, not as an approved writing model.
- Preserve unrelated user changes and keep project scope separate from
  design-system scope.
- A file under `src/components/` is not approved reusable design-system API
  unless it has a current contract in `docs/design-system/components.md`.

For new visual work, preserve the established fonts, colour roles, shared
navigation, footer, interaction behaviour, and accessibility baseline unless
the task changes the identity. Composition and page-scoped treatments remain
open design decisions.

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

- Use standard Git commands unless the task specifically involves GitHub.
- `master` is the production branch.
- `staging` is the long-lived integration and release-candidate branch.
- Create `work/*` branches from current `staging` by default and merge
  completed work back into `staging`.
- Release by merging or fast-forwarding `staging` into `master`. Do not squash
  or rebase the long-lived branches together.
- Bring any production fix made directly on `master` back into `staging`.

## Documentation Updates

- Update `current-scope.md` when public-site, development-route, API, analytics,
  test, or deployment scope changes.
- Update `practice-direction.md` when the owner changes practice scope,
  expertise, positioning, or the site's commercial purpose.
- Record durable technical pressure in `project-debt.md` and deferred
  visitor-facing work in `site-backlog.md`.
- Update `task-log.md` only for durable project-state changes.
- Update the relevant active catalogue under `docs/design-system/` when
  supported system state changes. Update `docs/design-system-legacy/` only when
  current source work changes or verifies inherited implementation facts.

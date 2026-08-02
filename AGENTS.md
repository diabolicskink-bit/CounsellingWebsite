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
- [docs/design-system/governance.md](docs/design-system/governance.md) and its
  active catalogues own approved reusable design-system API.
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
  unless the design-system documentation says it is.

For new visual work, preserve the established fonts, colour roles, shared
navigation, footer, interaction behaviour, and accessibility baseline unless
the task changes the identity. Composition and page-scoped treatments remain
open design decisions.

## Visual Verification

For visual checks in the VS Code extension, follow
[docs/project/visual-verification.md](docs/project/visual-verification.md).

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

- Update `current-scope.md` when public-site, API, analytics, test, or
  deployment scope changes.
- Update `practice-direction.md` when the owner changes practice scope,
  expertise, positioning, or the site's commercial purpose.
- Record durable technical pressure in `project-debt.md` and deferred
  visitor-facing work in `site-backlog.md`.
- Update `task-log.md` only for durable project-state changes.
- Update `docs/design-system/current-scope.md` when reusable visual or
  component-system state changes.

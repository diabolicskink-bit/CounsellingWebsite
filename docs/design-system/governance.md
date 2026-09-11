# Design System Governance

## Purpose

The design system is the deliberately supported reusable layer for current production UI. It grows incrementally from a codebase that contains inherited implementation from two earlier site rebuilds.

The active catalogues are positive lists. Inclusion means an item is currently approved for deliberate reuse within its documented boundary. Absence means it is not design-system API.

## Ownership And Authority

- The site owner approves changes to the shared system and its identity foundations.
- The current task must explicitly include shared-system work before an item can be promoted, materially changed, or withdrawn.
- The implementer supplies source, consumer, responsive, accessibility, interaction, migration, and verification evidence proportionate to the item.
- Production source and rendered behaviour are authoritative for what currently exists and how it behaves.
- `foundations.md`, `components.md`, and `patterns.md` are authoritative for what may be deliberately reused.
- A source file, selector, token, public consumer, legacy-register entry, or rendered specimen does not grant reusable status.

## Active Catalogue Contract

The active catalogues contain only currently supported items:

- `foundations.md`: public semantic foundations such as approved colour or type roles, accessibility baselines, and genuinely shared primitives.
- `components.md`: approved reusable React contracts, including their props, states, behaviour, accessibility, and supported boundaries.
- `patterns.md`: approved repeated semantic arrangements that coordinate foundations or components without imposing a page template.

Do not place these in the active catalogues:

- inherited or unreviewed implementation
- candidates or proposals
- page-local implementation
- development-only tooling
- withdrawn or removed items
- historical demonstrations or migration history

Each active item record must include:

```md
### `public identifier`

- `Contract`: The semantic job the item supports.
- `Boundary`: What the item owns and what it deliberately leaves to consumers.
- `Implementation`: Current production source.
- `Verified consumers`: Current source-backed consumers.
- `Promoted`: YYYY-MM-DD — task or DEBT-ID.
```

Add usage constraints or migration notes only when they are part of the current contract. Do not retain historical status prose in an active record.

## Production CSS Organisation

- Keep CSS implementations named by active contracts under `src/design-system/`, split into Foundations, Components, and Patterns source files.
- Import `src/design-system/index.css` once from the application entry so source organisation does not create separate production stylesheet requests.
- Do not place inherited, candidate, page-local, withdrawn, removed, historical, or development-workspace CSS in that directory.
- Keep the rendered catalogue presentation in `src/styles-design-system-workspace.css`; its location and selectors do not make it production design-system API.
- Source location improves inspection but never replaces a current catalogue contract as reuse authority.

## Public Naming Convention

- Use the `site-` namespace for site-wide CSS foundations and patterns. Use a block name for the contract, `__part` for an owned element, and `--modifier` only for a genuine variant.
- Name reusable React components in PascalCase by their semantic role. Give component-owned CSS a matching kebab-case root: `<ArticleHero />` owns `.article-hero*`, and `<ContactInvitation />` owns `.contact-invitation*`.
- Prefix public custom properties with the contract that owns them, such as `--site-hero-*` or `--contact-invitation-*`. Keep genuinely global semantic foundations concise, such as `--cedar`, `--section-*`, and `--portrait-*`.
- Prefer names that describe a stable role or material over an implementation technique, a historical route, or a visual accident. A shared hero material is a `surface`, for example, rather than a `background`.
- Name component source files in PascalCase and CSS files in kebab-case. Feature-local shared styles use their feature namespace and remain outside the public design-system API unless explicitly promoted.
- Preserve content-shaped page selectors outside these namespaces. Similar spelling does not make a page-local selector part of the shared system.

## Implementation Outside The System

Production contains inherited global CSS, shared-looking selectors, React components, and page-scoped styling that are not active design-system API.

- Existing consumers may keep using inherited implementation until an authorized task changes them.
- Narrow correctness, accessibility, or compatibility fixes may preserve an existing consumer without promoting the implementation.
- New visual implementation remains page-local by default.
- A repeated need may be investigated as a candidate in the task that encounters it, but candidate status does not belong in the active catalogues.
- Similar declarations, literal values, or shapes do not by themselves justify promotion.

The living `docs/design-system-legacy/` register may record source-backed facts about inherited implementation. It is investigation support, not an alternative catalogue or a reuse path.

## Promotion Workflow

Promote an item only when the current task explicitly includes shared-system work and all of the following are true:

1. Current source demonstrates the same semantic need beyond one accidental or merely visual similarity.
2. The public identifier, contract, ownership boundary, and intended consumers are stable.
3. Responsive behaviour, accessibility, interaction states, and affected consumers have proportionate coverage.
4. Intended consumers are migrated to the promoted implementation without retaining accidental duplicates.
5. The production implementation is complete before the active catalogue record is added.
6. The relevant active catalogue is updated and any corresponding legacy-register entry is removed.
7. A rendered specimen is added only when it materially helps maintenance and uses the real supported implementation.

Promotion should clarify a reusable semantic contract, not flatten content-shaped page composition.

## Withdrawal And Removal

When an item is no longer supported:

1. Remove it from the active catalogue and `/design-system` workspace immediately.
2. Stop adding consumers.
3. If existing consumers still require the implementation, add or update a source-backed entry in `docs/design-system-legacy/` with the remaining consumers and migration direction.
4. Migrate consumers only within authorized scope.
5. Remove source only after checking exact consumers, dependent states, responsive rules, and affected behaviour.
6. When source is removed, delete its legacy-register entry. Git and `docs/project/task-log.md` retain durable history; do not create a retired-item catalogue.

## Rendered Workspace

The development-only `/design-system` overview and its `/design-system/foundations`, `/design-system/components`, and `/design-system/patterns` category routes are views over the active catalogues.

- Render only items present in `foundations.md`, `components.md`, or `patterns.md`.
- Import the real production component or apply the supported production classes.
- Expose the exact identifier, contract, verified consumers, and link to its active catalogue record.
- Do not maintain a parallel status registry.
- Do not display legacy, page-local, candidate, dev-only, withdrawn, or removed implementation as supported specimens.
- Add category navigation only when that active catalogue has at least one rendered specimen.

The retired `/design-language/*` snapshot must not be restored or redirected into this workspace.

## Verification

- Documentation-only changes require reference and link searches that confirm the active/legacy boundary remains clear.
- CSS, component, or rendered-workspace changes require `npm run build` unless the task explicitly excludes it.
- Visual or interaction changes require direct inspection of affected consumers; the workspace specimen is not a substitute for consumer testing.
- Removal requires source-consumer searches plus checks proportionate to the affected behaviour.

## Update Duties

- Add or change an active catalogue record whenever the supported public contract changes.
- Update the legacy register only from current source evidence.
- Update `docs/project/project-debt.md` when unresolved migration or cleanup pressure should remain visible.
- Update `docs/project/task-log.md` for durable promotions, withdrawals, removals, or governance changes.

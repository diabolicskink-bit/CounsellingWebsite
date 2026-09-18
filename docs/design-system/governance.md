# Design System Governance

## Purpose

The design system is the deliberately supported reusable layer for current production UI. It grows incrementally from a codebase that contains inherited implementation from two earlier site rebuilds.

The active catalogues are positive lists of promoted API. Inclusion permits deliberate reuse within the documented boundary. The [public identity compatibility baseline](#public-identity-compatibility-baseline) separately permits a limited set of inherited building blocks while reconciliation continues; it does not promote them.

## Ownership And Authority

- The site owner approves changes to the shared system and its identity foundations.
- A page or component task includes proportionate shared variants or extractions directly needed to deliver that work when a recurring role is demonstrated. Preserve the site's identity and existing consumers' behaviour, update affected contracts, and verify those consumers. This does not require a separate request for shared-system work. Identity changes, broad migrations, unrelated promotions, and withdrawal of contracts still require explicit task scope.
- The implementer supplies source, consumer, responsive, accessibility, interaction, migration, and verification evidence proportionate to the item.
- Production source and rendered behaviour are authoritative for what currently exists and how it behaves.
- `foundations.md`, `components.md`, and `patterns.md` own promoted reuse contracts. This document owns the compatibility permission below; the legacy register remains evidence only.
- A source file, selector, token, public consumer, legacy-register entry, or rendered specimen does not grant reusable status.

## Public Identity Compatibility Baseline

Ordinary public-page work may inherit the existing application defaults and deliberately use the items below in their current roles. Use their implementation directly instead of copying values or markup. This is the complete compatibility allowance, not permission to adopt other inherited selectors or components.

| Building block | Permitted use and boundary |
| --- | --- |
| Application shell and global defaults | Add public routes beneath the existing `Layout` in [App.tsx](../../src/app/App.tsx). Continue the shared navigation/footer and inherit the global typography, element, focus and reduced-motion rules in [styles.css](../../src/styles.css). Do not reproduce the shell or reuse its internal selectors as page components. |
| Font and type roles | Use `--font-serif` for established heading/editorial roles, `--font-sans` for body/UI roles, and `--font-mono` for code. Use the existing `--type-display`, `--type-page-title`, `--type-section`, `--type-section-compact`, `--type-card-title`, `--type-body`, `--type-small`, `--type-label`, `--type-caption`, `--leading-display`, `--leading-heading`, `--leading-card`, and `--leading-body` roles in `src/styles.css`. Prefer the promoted reading and hero roles when their full contract fits; a raw token does not authorize overriding those contracts. |
| Core text and canvas colours | Use `--ink` for strongest text/headings, `--body` for body copy, `--muted` for supporting copy, `--faint` for quiet metadata, `--paper` for the canvas, and `--surface-strong` for light control/inset surfaces. These are existing light-surface roles in `src/styles.css`; check contrast in the actual context, especially for quieter text. Use the promoted material contracts for other supported surfaces. |
| Content containment | Use [Container](../../src/components/Container.tsx) for the existing shared width and responsive gutters. Its `className` may add consumer layout; page composition remains local. Use the component rather than copying its `.container` declarations. |
| Standard actions | Use [Button](../../src/components/Button.tsx) with its existing primary/secondary variants, or the matching `.button` plus `.button--primary` or `.button--secondary` classes on semantic links or native buttons. Preserve the shared state styling. The component's link mode is internal navigation; its `disabled` prop only disables native buttons. New control behaviour still needs appropriate semantics and verification. |

The compatibility allowance permits new consumers without changing the global values, shell behaviour or shared control contracts. Any necessary shared improvement follows [task-scope rules](#ownership-and-authority) and the promotion workflow. Keep these items in their current source and legacy records until promoted; they do not become supported workspace specimens through this allowance. On promotion or withdrawal, remove the corresponding compatibility allowance so there is one current permission owner. Other inherited implementation follows [the restrictions below](#implementation-outside-the-system).

## Choosing Reuse And New Components

- Use the catalogue contracts and compatibility baseline early in page design. A component may combine shared foundations with a new content-specific structure.
- Reuse suitable existing contracts and their documented variants. For example, published articles use `ArticleHero`; other public heroes can compose the shared hero frame, opening roles and surface with content-appropriate media, actions and layout. Shared foundations do not require an identical composition everywhere.
- A novel component is a normal part of page work when the content or interaction benefits. Keep unique implementation local and preserve shared identity, rather than duplicating a recurring role merely to make the page different.
- Adding consumers or using documented customization points is ordinary implementation. A directly needed shared variant or extraction also falls within page work under [Ownership And Authority](#ownership-and-authority); complete the affected contracts and consumer reconciliation under the promotion workflow rather than copying the implementation or waiting for a separate request.
- When a local idea proves useful across contexts, develop a focused shared contract within authorized scope and reconcile its intended consumers. Avoid speculative variants or a universal component driven by page-specific switches.

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
- Keep the rendered catalogue presentation in `src/pages/dev/design-system/design-system-workspace.css`; its location and selectors do not make it production design-system API.
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
- Narrow correctness, accessibility, or compatibility fixes may preserve an existing consumer without promoting the implementation or broadening its role.
- Remove or migrate inherited implementation only within authorized cleanup or shared-system scope, after verifying consumers and affected behaviour.
- New components may compose active contracts and the compatibility baseline. Genuinely unique implementation and candidate exploration remain page-local or in development test beds until shared-system work is in scope.
- A demonstrated recurring need may justify a focused shared contract in the task that encounters it. Incomplete candidates do not belong in the active catalogues.
- Similar declarations, literal values, or shapes do not by themselves justify promotion.

The living `docs/design-system-legacy/` register may record source-backed facts about inherited implementation. It is investigation support, not an alternative catalogue or a reuse path.

## Promotion Workflow

Promote an item only within the task scope defined under [Ownership And Authority](#ownership-and-authority), and when all of the following are true:

1. Current source demonstrates the same semantic need beyond one accidental or merely visual similarity.
2. The public identifier, contract, ownership boundary, and intended consumers are stable.
3. Responsive behaviour, accessibility, interaction states, and affected consumers have proportionate coverage.
4. Intended consumers are migrated to the promoted implementation without retaining accidental duplicates.
5. The production implementation is complete before the active catalogue record is added.
6. The item's contract is added to exactly one relevant active catalogue and any corresponding legacy-register entry is removed.
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

[AGENTS.md](../../AGENTS.md#engineering-and-verification) determines verification scope, including the development-only and private-dashboard boundaries. Within that scope:

- Documentation-only changes require reference and link searches that confirm the active/legacy boundary remains clear.
- Production CSS or supported component implementation changes require `npm run build` unless the task explicitly excludes it. Presentation-only changes to the development workspace follow the root development-only policy.
- Production visual or interaction changes require direct inspection of affected consumers; the workspace specimen is not a substitute for consumer testing.
- Removal requires source-consumer searches plus checks proportionate to the affected behaviour.

## Update Duties

- Add or change an active catalogue record whenever the supported public contract changes.
- When supported implementation changes, search the active catalogues and rendered workspace for references to its identifier, semantic role, and consumers. Reconcile affected records and specimen descriptions with current source, including foundation or pattern relationships removed or introduced by a component change.
- Update the legacy register only from current source evidence.
- Update `docs/project/project-debt.md` when unresolved migration or cleanup pressure should remain visible.
- Update `docs/project/task-log.md` for durable promotions, withdrawals, removals, or governance changes.

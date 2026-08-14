# CSS Review Checklist

This is the progressive review checklist for the site's CSS. It is a working review artifact, not a cleanup backlog and not permission to change styles by itself.

Use this checklist to expand, review, and record decisions about CSS in manageable slices. When review finds actual cleanup work, link or create the relevant `DEBT-*` item instead of turning this checklist into a backlog card.

> **Rendered-catalogue retirement:** The `/design-language/*` routes and their source modules were removed on 2026-08-03. Earlier `Used By`, `Evidence`, or architecture notes that mention rendered design-system examples are dated review history, not current consumers or reusable-API evidence. Re-run source usage before acting on any affected item.

> **Dormant presentation cleanup:** The 2026-08-13 source-first cleanup actioned the unmounted selector families and tokens previously recorded here, including the dormant body-copy aliases, rich-text descendants, tertiary button variant, card/topic/check/fee/detail/CTA/list systems, unused hero subsets, and uncalled `SectionHeading` component. Earlier leaf evidence remains dated review history; the living current-source inventory is `docs/design-system-legacy/`.

## Status Labels

- `Bucket`: A high-level area exists, but has not been expanded into reviewable children.
- `Expanded`: The area has been split into smaller checklist items.
- `Not reviewed`: The item exists at reviewable depth, but no evidence or decision has been recorded.
- `Reviewing`: Current work is inspecting this item.
- `Keep`: Checked and retained as-is.
- `Keep, document`: Checked and retained, but documentation should clarify its role.
- `Consolidate candidate`: Checked and likely overlaps another pattern.
- `Move candidate`: Checked and likely belongs in another CSS file or layer.
- `Restructure candidate`: Checked and likely needs a broader CSS organization change rather than a class-local cleanup.
- `Delete candidate`: Checked and appears removable, pending safe implementation work.
- `Actioned`: A reviewed decision has been implemented and verified.

## Progressive ID Rules

- `CSS-1`: stylesheet or layer bucket.
- `CSS-1.1`: major region inside that stylesheet or layer.
- `CSS-1.1.1`: class group or selector cluster.
- `CSS-1.1.1.1`: individual class token leaf.

Class-token leaves are the final review unit. Pseudo states, media-query overrides, descendant selectors, and compound selectors are recorded under the relevant class token rather than receiving their own IDs.

## Review Workflow

- "Expand `CSS-1.4`" means add lower-level checklist items beneath that bucket.
- "Review `CSS-1.4.1` to `CSS-1.4.5`" means inspect usage, declarations, naming/structure, architecture, document evidence, and record a decision.
- "Action delete candidates from `CSS-1.5`" means make code changes only after review evidence exists.
- Keep review and implementation separate. This checklist records evidence and decisions; code cleanup happens in focused follow-up work.
- Non-keep decisions should link the relevant `DEBT-*` item or state that a new item is needed.
- Every review should check naming and structure consistency: class name clarity, prefix/layer fit, variant naming, component prop alignment, documented API alignment, and whether selectors depend on avoidable markup shape.
- Every class-token review should include a declaration-level CSS code review. Inspect the declarations inside the class, its pseudo states, media overrides, descendant/context selectors, and closely related sibling modifiers. Check whether repeated declarations belong on a base class, whether variant-only declarations are genuinely variant-specific, whether any override is defensive or obsolete, whether tokens are used instead of avoidable literals, whether specificity and source order are doing unnecessary work, and whether responsive or state rules duplicate logic that could be expressed once.
- Every review should also consider CSS architecture: whether the selector belongs in its current file and layer, whether the surrounding rule order is logical, whether shared/page/dev boundaries are clean, whether grouping or file splitting would reduce ambiguity, and whether a larger staged restructure should be proposed before local cleanup.
- Treat each class-token audit as a deep source review, not a usage-count exercise. Trace every emitter and consumer, read the owning component contract, inspect the full selector family across files and breakpoints, compare declarations with adjacent/base/context rules, check tests and rendered behavior where risk warrants it, and distinguish exact duplication from intentional semantic overlap.
- After a leaf is reviewed, place a compact audit comment immediately above its primary selector definition with `Used` and `Consumers`. Add `Maintenance` only when deeper maintenance review is warranted; its presence is the signal, so describe the overlap, complexity, ownership ambiguity, or cleanup possibility directly without adding a status phrase. Keep implementation decisions and full evidence in this checklist rather than expanding the source comment into a second audit document.
- Mark `Restructure candidate` only when the issue is larger than one class or simple movement. Link or create a `DEBT-*` item before implementing any broad restructure.
- Existing reviewed leaves that do not yet include `Declaration Review` should be upgraded when revisited, before actioning a candidate, or before using them as evidence for a broader cleanup.

## Review Fields For Expanded Leaves

Use this structure when a region is expanded to class-token leaves:

```md
##### CSS-1.4.1.1 - `.button`

- `Status`: `Not reviewed`
- `Layer`: Shared production API
- `Selectors Covered`: `.button`, `.button:hover`, `.button:disabled`, responsive overrides
- `Naming/Structure Check`:
- `Declaration Review`:
- `Architecture Check`:
- `Used By`:
- `Decision`:
- `Evidence`:
- `Follow-up`:
```

## Top-Level Buckets

- `CSS-1` `Expanded` `src/styles.css`, inherited and uncatalogued shared production CSS.
  - Scope: Base document rules, tokens and shared-looking selectors that remain outside the current-only design-system CSS entry. Promotion status must be checked against the active catalogues rather than inferred from this file.
  - Next: Expand one major region at a time into class groups or class-token leaves.

- `CSS-2` `Bucket` `src/styles-dev.css`, dev/docs support CSS.
  - Scope: Remaining `ds-*`, the Documents reader, and the separate `src/styles-design-system-workspace.css` rendered-catalogue presentation.
  - Next: Expand after production shared CSS has enough review structure.

- `CSS-3` `Bucket` Public page-scoped CSS files.
  - Scope: `styles-home.css`, `styles-contact.css`, `styles-inclusive-practice.css`, `styles-working-with-joel.css`, `styles-kink-bdsm.css`, `styles-enm-polyamory.css`, `styles-lgbtqia.css`, and `styles-not-found.css`.
  - Next: Expand by route/page file, then by class token.

- `CSS-4` `Bucket` Dev/test-bed experiment CSS files.
  - Scope: `styles-test-beds.css`, the page-scoped shell shared by the clean Codex and Opus development routes. The former candidate-specific test-bed stylesheets have been removed.
  - Next: Review the clean-shell stylesheet when either test bed receives a new design exploration; keep exploration-specific styling page-scoped until it proves reusable.

- `CSS-5` `Bucket` `src/design-system/`, current-only promoted production CSS.
  - Scope: `foundations.css`, `components.css`, and `patterns.css`, imported once through `index.css`. Every retained identifier must have a matching current contract under `docs/design-system/`.
  - Next: Review these files only when a supported contract changes, is withdrawn, or gains a new verified consumer; do not add candidate or inherited selectors here.

## CSS-1 - `src/styles.css`

- `CSS-1.1` `Not reviewed` Tokens and root setup.
  - Scope: `:root`, colour tokens, surface tokens, type tokens, layout tokens, shadow/radius tokens, and root-level responsive token overrides.
  - Next: Expand to token groups such as colour, typography, spacing/layout, and responsive root overrides.

- `CSS-1.2` `Expanded` Base document, element, and typography defaults.
  - Scope: Universal box sizing, `html`, `body`, native form font inheritance, links, images, heading resets, base heading roles, and shared body-copy selector groups.
  - Next: The inherited body-copy compatibility group is reviewed below. Expand the remaining base element rules and heading defaults separately.

### CSS-1.2 - Base document and typography defaults

#### CSS-1.2.1 - Inherited body-copy compatibility group

- `Status`: `Expanded`
- `Layer`: Inherited shared production typography
- `Scope`: The ten class tokens in the low-specificity body-copy `:where(...)` group, including each token's standalone, descendant, contextual, and responsive rules.
- `Related Work`: `DEBT-13`, `DEBT-20`, `DEBT-21`.
- `Next`: Action dormant-selector cleanup separately; give the five maintenance-marked selectors focused family reviews before changing their contracts.

##### CSS-1.2.1.1 - `.site-body-copy`

- `Status`: `Delete candidate`
- `Layer`: Dormant inherited body-copy alias
- `Selectors Covered`: `.site-body-copy` in the shared body-copy `:where(...)` rule.
- `Naming/Structure Check`: The name suggests a general shared prose role, but the promoted `.site-reading` role now owns substantive public-page prose.
- `Declaration Review`: It receives only `--body`, `--type-body`, and `--leading-body` from the grouped rule and has no standalone, contextual, state, or responsive declarations.
- `Architecture Check`: Keeping an unused legacy alias beside the supported `.site-reading` contract makes the available body-copy API less clear.
- `Used By`: No current TS, TSX, HTML, test, or component emitter.
- `Decision`: Delete candidate; do not infer supported status from its `site-*` prefix.
- `Evidence`: Exact source search found the token only in `src/styles.css`, legacy documentation, and audit records.
- `Follow-up`: Remove with the other dormant members of this selector group in a focused cleanup pass.

##### CSS-1.2.1.2 - `.site-copy-flow`

- `Status`: `Consolidate candidate`
- `Layer`: BroadTabPanel content fallback typography
- `Selectors Covered`: `.site-copy-flow` and `.site-copy-flow :where(p, li)` in the grouped body-copy rule.
- `Naming/Structure Check`: The name implies a reusable flow primitive, but its only emitter is the more specific `BroadTabPanel` component.
- `Declaration Review`: The wrapper and paragraph/list descendants inherit the legacy body role. Every current Working with Joel tab paragraph also carries `.site-reading`, whose later, more specific promoted declarations win; only the component's string/number fallback still depends directly on `.site-copy-flow`.
- `Architecture Check`: The generic fallback and the promoted reading role currently split typography ownership inside one component.
- `Used By`: `BroadTabPanel`, mounted once on Working with Joel.
- `Decision`: Retain pending a focused BroadTabPanel content-contract review; consolidation is plausible but not safe from current markup alone.
- `Evidence`: `BroadTabPanel.tsx` always emits the wrapper class, converts string/number content to an unclassed paragraph, and otherwise accepts arbitrary `ReactNode`; Working with Joel supplies only `.site-reading` paragraphs.
- `Follow-up`: Decide whether BroadTabPanel should apply the supported reading role to its fallback content or continue owning a separate generic flow contract.

##### CSS-1.2.1.3 - `.section-heading__copy`

- `Status`: `Consolidate candidate`
- `Layer`: Inherited section-introduction copy element
- `Selectors Covered`: `.section-heading__copy` in the grouped body rule and its standalone maximum-width rule.
- `Naming/Structure Check`: The BEM element name is clear, but the live page uses it directly while the `SectionHeading` component that also emits it has no callers.
- `Declaration Review`: The standalone rule contributes `max-width: 760px`. On current live paragraphs, `.site-reading` overrides the grouped size and leading, leaving this class as a measure/layout hook rather than the typography role its grouping implies.
- `Architecture Check`: Component ownership, direct page use, layout measure, and prose typography are mixed across one class.
- `Used By`: Working with Joel approach overview; also emitted by the currently uncalled `SectionHeading` component.
- `Decision`: Retain because it affects live layout, but review before presenting it as a shared copy role.
- `Evidence`: Current source search found direct page markup only in `WorkingWithJoel.tsx`; no `SectionHeading` import or invocation exists outside its own component module.
- `Follow-up`: Review `.section-heading`, this element, the unused component, and `.site-reading` composition together.

##### CSS-1.2.1.4 - `.rich-text`

- `Status`: `Keep, document`
- `Layer`: Inherited rich editorial HTML wrapper
- `Selectors Covered`: The grouped wrapper/paragraph/list body role; base layout; heading, link, focus, list, strong, code, blockquote, table, divider, and button descendants; `.site-copy-panel.rich-text`.
- `Naming/Structure Check`: The broad name fits a semantic rich-HTML boundary, but it should not be mistaken for a promoted reusable API.
- `Declaration Review`: Its grid, gap, and panel-width composition are active. The live paragraph typography comes from `.site-reading`; the remaining descendant family covers substantially more HTML than the current public consumer renders.
- `Architecture Check`: A broad descendant boundary can be appropriate for authored rich HTML, but most of this inherited contract is currently supported only by dormant capability rather than mounted examples.
- `Used By`: Working with Joel introduction panel; its current children are one heading and `.site-reading` paragraphs.
- `Decision`: Keep the active wrapper and document a maintenance review of its descendant family rather than deleting unexercised child rules piecemeal.
- `Evidence`: Source search found one current TSX emitter. The former rendered design-language examples cited by the older record have been retired.
- `Follow-up`: Audit which rich-child rules still have a foreseeable authored-content contract, and add responsive table handling only if tables regain a live consumer.

##### CSS-1.2.1.5 - `.site-ruled-paragraph`

- `Status`: `Delete candidate`
- `Layer`: Dormant inherited paragraph treatment
- `Selectors Covered`: `.site-ruled-paragraph` in the grouped body rule and its standalone margin, inset, and left-rule declarations.
- `Naming/Structure Check`: Clear descriptive name, but current public compositions use other page or hero-specific ruled-copy treatments.
- `Declaration Review`: The class combines prose-role inheritance with a decorative left rule and inset; no state or responsive rules exist.
- `Architecture Check`: With no emitter, it is dormant shared-looking implementation rather than an available supported pattern.
- `Used By`: No current TS, TSX, HTML, test, or component emitter.
- `Decision`: Delete candidate.
- `Evidence`: Exact source search found only CSS, legacy-documentation, and audit references.
- `Follow-up`: Remove together with its unused wide modifier in a focused cleanup pass.

##### CSS-1.2.1.6 - `.site-ruled-paragraph--wide`

- `Status`: `Delete candidate`
- `Layer`: Dormant inherited paragraph modifier
- `Selectors Covered`: `.site-ruled-paragraph--wide` in the grouped body rule and its `54ch` maximum-width rule.
- `Naming/Structure Check`: Modifier naming implies composition with `.site-ruled-paragraph`, but neither token has a current emitter.
- `Declaration Review`: It adds only measure while redundantly participating in the body-type group; no responsive or contextual rules exist.
- `Architecture Check`: An orphan modifier should not remain as apparent shared API.
- `Used By`: No current TS, TSX, HTML, test, or component emitter.
- `Decision`: Delete candidate with its base.
- `Evidence`: Exact source search found only CSS, legacy-documentation, and audit references.
- `Follow-up`: Remove with `.site-ruled-paragraph`.

##### CSS-1.2.1.7 - `.site-broad-tabs__content`

- `Status`: `Keep, document`
- `Layer`: BroadTabPanel tabpanel shell
- `Selectors Covered`: The grouped body role, base panel and paragraph rules, focus state, `900px` responsive panel rule, and Working with Joel desktop/tablet/mobile contextual overrides.
- `Naming/Structure Check`: Clear element name under `.site-broad-tabs` and aligned with the component's tabpanel markup.
- `Declaration Review`: The base owns grid, gap, minimum height, padding, border, radius, surface, paragraph measure, focus outline, and responsive recomposition. Working with Joel replaces the gap, minimum height, padding, border, radius, surface, paragraph measure, focus treatment, and small-screen presentation; current paragraph typography comes from `.site-reading`.
- `Architecture Check`: A generic component shell with one route consumer and extensive page-level replacement has an unclear reusable boundary, though the accessibility and interaction structure remains component-owned.
- `Used By`: `BroadTabPanel`, mounted once on Working with Joel.
- `Decision`: Keep current behavior; perform a family-level ownership review before consolidating the base or page override.
- `Evidence`: Component tracing found one mounted consumer. `styles-working-with-joel.css` overrides the panel at the base route scope and again at `1000px` and `600px`, on top of the inherited `900px` rule.
- `Follow-up`: Review the complete `.site-broad-tabs*` family and decide whether it is genuinely generic or page-owned.

##### CSS-1.2.1.8 - `.site-cta-block`

- `Status`: `Delete candidate`
- `Layer`: Dormant inherited closing-action family
- `Selectors Covered`: `.site-cta-block p` in the grouped body rule and the complete `.site-cta-block*` root, highlight, inner, copy, heading, paragraph, button, and responsive family.
- `Naming/Structure Check`: Coherent BEM family, but the shared-looking name no longer corresponds to a mounted component or page section.
- `Declaration Review`: The family still carries surface, grid, spacing, heading, paragraph, action-placement, and two responsive layouts despite having no emitter.
- `Architecture Check`: This is a whole dormant feature family rather than an isolated dead selector; removal should be complete when authorized.
- `Used By`: No current TS, TSX, HTML, test, or component emitter.
- `Decision`: Delete candidate as a family.
- `Evidence`: Exact source search found no class emitter; all runtime-looking occurrences are CSS rules.
- `Follow-up`: Remove the entire `.site-cta-block*` family together rather than deleting only its body-group entry.

##### CSS-1.2.1.9 - `.hero-intro`

- `Status`: `Delete candidate`
- `Layer`: Dormant inherited hero-copy class
- `Selectors Covered`: `.hero-intro` in the grouped body rule and its standalone measure/margin rule.
- `Naming/Structure Check`: Clear hero element name, but no current hero implementation emits it.
- `Declaration Review`: It provides only inherited body typography, a `38rem` maximum width, and margin reset; no contextual or responsive rules remain.
- `Architecture Check`: Retaining the unused class makes the already broad inherited hero vocabulary harder to assess.
- `Used By`: No current TS, TSX, HTML, test, or component emitter.
- `Decision`: Delete candidate.
- `Evidence`: Exact source search found only CSS, legacy-documentation, and audit references.
- `Follow-up`: Remove during a focused hero-family cleanup after checking adjacent hero copy roles.

##### CSS-1.2.1.10 - `.hero-copy-panel`

- `Status`: `Move candidate`
- `Layer`: Shared production CSS with development-only consumers
- `Selectors Covered`: The grouped body role, base panel, non-paragraph grid wrapper, direct paragraph reset, `900px` responsive rule, and `.test-bed-page` colour/border overrides.
- `Naming/Structure Check`: The name aligns with the inherited hero family, but its only component consumer is explicitly development-only.
- `Declaration Review`: Base inset/rule composition and mobile top-rule recomposition remain functional. Test-bed CSS supplies the dark-surface foreground and boundary colour for both current consumers.
- `Architecture Check`: Shipping the structural rule in shared production CSS for two development test beds blurs the production/dev ownership boundary.
- `Used By`: `DevPageHero`, mounted by the Codex and Opus development test beds only.
- `Decision`: Move candidate; retain until the development hero boundary is reviewed as a unit.
- `Evidence`: Source tracing found `DevPageHero` imports only in the two test-bed routes and page overrides only in `styles-test-beds.css`.
- `Follow-up`: Review whether `DevPageHero` and this selector should move fully into the development layer or be replaced by a production consumer-backed hero copy contract.

- `CSS-1.3` `Expanded` Shell, container, header, navigation, and mobile nav.
  - Scope: `.site-shell`, `.container`, `.site-header*`, `.brand*`, `.desktop-nav`, `.nav-*`, `.menu-toggle`, `.mobile-nav`, `.header-button`, and related responsive behavior.
  - Next: The first ten shell/header selectors are reviewed below. Continue with `.nav-link` and the remaining desktop/submenu navigation selectors before moving to mobile navigation.

### CSS-1.3 - Shell, container, and header

#### CSS-1.3.1 - First shell/header selector batch

- `Status`: `Expanded`
- `Layer`: Inherited shared production shell CSS
- `Scope`: The first ten class selectors in source order after the body-copy selector group.
- `Related Work`: `DEBT-13`, `DEBT-37`.
- `Next`: Continue the source-order review from `.nav-link`.

##### CSS-1.3.1.1 - `.site-shell`

- `Status`: `Keep`
- `Layer`: Layout root
- `Selectors Covered`: `.site-shell`, page-owned `.site-shell:has(...)` refinements, and the `.site-shell--shared` contextual family.
- `Naming/Structure Check`: Clear shell boundary; the `site-*` prefix matches its repository-wide ownership.
- `Declaration Review`: `min-height: 100vh` and the paper canvas are appropriate defaults. LGBTQIA+ and Not Found override the canvas only through their page-root presence.
- `Architecture Check`: Keep in shared production CSS as the Layout-owned root rather than moving page-specific canvas rules into it.
- `Used By`: `Layout` on every public and development route using the shared application shell.
- `Decision`: Keep.
- `Evidence`: `Layout.tsx` emits the base class once and conditionally adds `.site-shell--shared`; source search found only page-scoped `:has()` refinements beyond the shared-shell contextual rules.
- `Follow-up`: Review `.site-shell--shared` as its own modifier when the remaining shell-context selectors are batched.

##### CSS-1.3.1.2 - `.container`

- `Status`: `Actioned`
- `Layer`: Inherited shared containment primitive
- `Selectors Covered`: `.container`, its `700px` gutter override, and page/hero direct-child refinements.
- `Naming/Structure Check`: The non-prefixed name is component-backed and consistently emitted by `Container`; it remains outside the promoted component catalogue.
- `Declaration Review`: The base owns the shared maximum width, desktop gutters, centring, and narrow-screen gutters. No page-specific declaration duplicates those core decisions after the header migration.
- `Architecture Check`: Header containment now composes the existing `Container` component instead of maintaining a parallel width and centring contract on `.site-header__inner`.
- `Used By`: Twenty-nine `Container` call sites across all public content routes, `Layout` header/footer, `DevPageHero`, and development/documentation routes.
- `Decision`: Keep and consolidate the header onto this existing containment owner.
- `Evidence`: Source search found the component as the only emitter of `.container`; the former header declarations exactly matched the base and responsive container widths.
- `Follow-up`: Promotion remains separate shared-system work; this audit establishes current inherited ownership only.

##### CSS-1.3.1.3 - `.site-header`

- `Status`: `Actioned`
- `Layer`: Layout header root
- `Selectors Covered`: `.site-header`, header descendant contexts, its responsive height override, and the removed `.site-shell--shared .site-header` declaration.
- `Naming/Structure Check`: Clear Layout-owned block name with consistent element selectors.
- `Declaration Review`: The base correctly owns sticky positioning, stacking, the header-height custom property, boundary, warm surface, and ink foreground. The shared-shell border override repeated the base value exactly and was removed.
- `Architecture Check`: Keep the invariant header surface on the base selector; reserve `.site-shell--shared` for genuine contextual differences.
- `Used By`: The single `Layout` banner rendered across mounted routes.
- `Decision`: Keep the base and remove the duplicate contextual border declaration.
- `Evidence`: Both declarations used `rgba(35, 75, 61, 0.22)` with no intervening header border override; public tests exercise the banner on every route.
- `Follow-up`: Review remaining header descendants in later batches.

##### CSS-1.3.1.4 - `.site-header__inner`

- `Status`: `Actioned`
- `Layer`: Layout header composition
- `Selectors Covered`: `.site-header__inner` and its gap overrides at `700px`, `430px`, and `360px`.
- `Naming/Structure Check`: Clear element name for the header's three-column composition.
- `Declaration Review`: Grid, columns, alignment, responsive gaps, and minimum height remain here. Duplicated width, centring, and narrow-screen gutter declarations were removed.
- `Architecture Check`: `Layout` now renders `Container className="site-header__inner"`, separating containment ownership from header composition.
- `Used By`: The single `Layout` header inner wrapper.
- `Decision`: Retain as the composition class and compose it with `.container`.
- `Evidence`: The removed desktop width/margin and mobile width matched `.container` exactly; no selector depends on the former single-class markup.
- `Follow-up`: None.

##### CSS-1.3.1.5 - `.brand`

- `Status`: `Keep`
- `Layer`: Header wordmark link base
- `Selectors Covered`: `.brand`.
- `Naming/Structure Check`: Broad but internally consistent with `.brand--header` and `.brand__name`; current use is confined to the header.
- `Declaration Review`: Inline-flex alignment and `min-width: 0` provide the correct link-level layout without duplicating the wordmark's typography.
- `Architecture Check`: Keep beside the header family; collapsing it into the modifier would reduce the base/modifier distinction without a maintenance gain.
- `Used By`: The header home link in `Layout`.
- `Decision`: Keep.
- `Evidence`: One TSX emitter and no competing `.brand` implementation were found.
- `Follow-up`: Revisit naming only if the wordmark gains another non-header consumer.

##### CSS-1.3.1.6 - `.brand__name`

- `Status`: `Keep`
- `Layer`: Header wordmark text base
- `Selectors Covered`: `.brand__name` and its participation in the shared serif/weight heading group.
- `Naming/Structure Check`: Correct element naming under `.brand`.
- `Declaration Review`: Base ink, serif family, weight, size, and leading form a coherent wordmark role; the header modifier changes only header-specific scale and tracking.
- `Architecture Check`: Keep shared typography on the base rather than repeating it in `.brand__name--header`.
- `Used By`: The header wordmark span in `Layout`.
- `Decision`: Keep.
- `Evidence`: Source search found one emitter and verified that the removed shared-shell ink override duplicated this base colour.
- `Follow-up`: None.

##### CSS-1.3.1.7 - `.brand--header`

- `Status`: `Actioned`
- `Layer`: Header wordmark link modifier
- `Selectors Covered`: `.brand--header` and `.brand--header:focus-visible`.
- `Naming/Structure Check`: Modifier accurately scopes link alignment and spacing to the header use.
- `Declaration Review`: Alignment and vertical padding remain; the link-level ink declaration was removed because the child `.brand__name` already owns the rendered foreground. Focus treatment remains grouped with other header controls.
- `Architecture Check`: Keep layout on the link modifier and visual text ownership on the child element.
- `Used By`: The header home link in `Layout`.
- `Decision`: Keep and remove the duplicate colour declaration.
- `Evidence`: The modifier has no icon or additional text node; `.brand__name` supplies `var(--ink)` directly.
- `Follow-up`: None.

##### CSS-1.3.1.8 - `.brand__name--header`

- `Status`: `Actioned`
- `Layer`: Header wordmark text modifier
- `Selectors Covered`: `.brand__name--header`, its `700px`, `430px`, and `360px` size overrides, and the removed `.site-shell--shared .site-header .brand__name--header` rule.
- `Naming/Structure Check`: Modifier clearly owns header-specific wordmark scale and fit.
- `Declaration Review`: Header size, tracking, leading, and no-wrap remain. The shared-shell ink declaration was removed because `.brand__name` already supplies the same value.
- `Architecture Check`: Keep invariant wordmark colour on the base and responsive fit on the header modifier.
- `Used By`: The header wordmark span in `Layout`.
- `Decision`: Keep and remove the duplicate contextual colour declaration.
- `Evidence`: Both base and removed contextual declarations resolved to `var(--ink)`; no route-specific wordmark colour override remains.
- `Follow-up`: None.

##### CSS-1.3.1.9 - `.site-header__cluster`

- `Status`: `Keep`
- `Layer`: Desktop navigation placement wrapper
- `Selectors Covered`: `.site-header__cluster` and its `1080px` hide rule.
- `Naming/Structure Check`: Clear Layout-owned element name, distinct from the navigation component itself.
- `Declaration Review`: Flex alignment and centred grid placement belong to the wrapper; hiding it at the established desktop breakpoint cleanly hands over to `.mobile-nav`.
- `Architecture Check`: Keep the wrapper because header-grid placement and navigation-internal layout are separate responsibilities.
- `Used By`: The `DesktopNavigation` wrapper in `Layout`.
- `Decision`: Keep.
- `Evidence`: One TSX emitter; navigation tests exercise the desktop-to-mobile handoff around the same breakpoint.
- `Follow-up`: None.

##### CSS-1.3.1.10 - `.desktop-nav`

- `Status`: `Keep`
- `Layer`: DesktopNavigation root
- `Selectors Covered`: `.desktop-nav`; descendant links and submenus remain for later selector batches.
- `Naming/Structure Check`: Clear component-root name paired with the exported `DesktopNavigation` function.
- `Declaration Review`: Flex layout, full-height alignment, muted inherited foreground, compact type, and medium weight are coherent root-level navigation decisions.
- `Architecture Check`: Keep navigation-internal layout here and header-grid placement on `.site-header__cluster`.
- `Used By`: `DesktopNavigation` in `SiteNavigation.tsx`, mounted once by `Layout`.
- `Decision`: Keep.
- `Evidence`: One component emitter; public navigation tests cover desktop visibility, nested navigation, active destinations, and route changes.
- `Follow-up`: Continue with `.nav-link` and its states in the next batch.

- `CSS-1.4` `Expanded` Buttons and action primitives.
  - Scope: `.button`, button modifiers, and action/button overrides in shared contexts.
  - Next: `CSS-1.4.1.*` is reviewed and kept. `CSS-1.4.2.*` has been actioned. Review remaining `.header-button` ownership only when expanding `CSS-1.3`.

### CSS-1.4 - Buttons and action primitives

#### CSS-1.4.1 - Shared button family

- `Status`: `Expanded`
- `Layer`: Shared production API
- `Scope`: Base button styling, visual button variants, disabled/hover behavior, and contextual button sizing or placement overrides.
- `Naming/Structure Note`: Variant review found the implemented Button set is `primary`, `secondary`, and `tertiary`. No `light` component type, CSS class, rendered example, or source usage was found; the current source evidence now lives in `docs/design-system-legacy/components.md` because Button has not been promoted.
- `Next`: No CSS action for the core button family. Revisit only if a broader token, shadow, or button API cleanup is opened.

##### CSS-1.4.1.1 - `.button`

- `Status`: `Keep`
- `Layer`: Shared production API
- `Selectors Covered`: `.button`, `.button:hover`, `.button:disabled`, `.button:disabled:hover`, `.rich-text .button`, `.site-cta-block .button`, `.site-page .button`, `.button` inside small-screen responsive rules, and page/dev contextual selectors that refine `.button` placement or focus.
- `Naming/Structure Check`: Base class name is short but explicitly documented as an active non-prefixed shared component class, so it is a valid exception to the newer `site-*` and `hero-*` naming pattern. `Button` consistently emits `button button--${variant}`, which keeps base and modifier structure clear. The previous family-level docs mismatch around a nonexistent `light` variant has been actioned.
- `Declaration Review`: The base rule owns the right shared mechanics: inline-flex layout, alignment, gap, max-width, border shape, padding, pointer affordance, type weight, centered text, and shared transition properties. The lift hover and disabled rules are correctly base-level because every variant shares that behavior. Contextual width and placement refinements remain with their owning contexts. The duplicate `border-radius: 8px` declaration has been removed from `.site-page .button`, which now inherits the same `--radius` value from the base class while retaining its page-level minimum width. No variant declaration needs to move up into `.button`.
- `Architecture Check`: Keep the base rule in `src/styles.css` with shared production primitives. Contextual selectors such as `.rich-text .button`, `.site-cta-block .button`, `.site-page .button`, and page/dev overrides remain legitimate placement or sizing refinements. This leaf is not a `Restructure candidate` by itself.
- `Used By`: `Button` component; public page CTAs/actions on Home, Inclusion, Kink/BDSM, ENM/polyamory, LGBTQIA+, and Not Found; the Contact form submit action; `Layout` contact action via `.header-button`; rendered design-system/dev examples.
- `Decision`: Keep as the base shared action class. It is active, documented, component-backed, widely used, and not a delete, move, consolidate, or restructure candidate at this leaf level.
- `Evidence`: `docs/design-system-legacy/components.md` records `.button` and the component-backed variants as inherited implementation outside the active system. `src/components/Button.tsx` composes every rendered `Button` with `button button--${variant}` and only exposes `primary`, `secondary`, and `tertiary`. Source search found `.button` usage through public pages, the Contact form, and `Layout`; no competing base button class was found. Disabled usage currently appears only on the native submit button path, so `.button:disabled` matches current behavior.
- `Follow-up`: None.

##### CSS-1.4.1.2 - `.button--primary`

- `Status`: `Keep`
- `Layer`: Shared production API
- `Selectors Covered`: `.button--primary`, `.button--primary:hover`.
- `Naming/Structure Check`: Modifier naming matches the component contract and the active `.button button--${variant}` structure. Because `Button` defaults to `primary`, most primary usage is intentionally implicit in JSX rather than written as `variant="primary"`.
- `Declaration Review`: The modifier owns only visual variant declarations: cedar background, cedar border, light text, and a stronger action shadow. Hover changes background and border color only, which matches the base transition list and keeps motion/layout in `.button`. The shadow is a one-off literal rather than `--shadow`, but it is also a distinct primary-action treatment rather than a repeated surface shadow; leave it in place unless a future token-alignment sweep introduces a button-specific shadow token.
- `Architecture Check`: Keep beside `.button` and the other button modifiers in `src/styles.css`. The rule owns the cedar-filled primary treatment and a small action shadow; it is not a move, consolidate, or restructure candidate.
- `Used By`: Default `Button` path across public primary CTAs, including contact/enquiry actions, Home closing CTA, Kink/BDSM hero action, LGBTQIA+ hero action, Not Found homepage action, the Contact form submit action, `Layout` header contact action, and rendered design-system examples.
- `Decision`: Keep as the default primary action variant.
- `Evidence`: `src/components/Button.tsx` defaults `variant` to `primary` and emits `button button--${variant}`. `src/styles.css` defines `.button--primary` and `.button--primary:hover` with cedar tokens. Rendered design-system usage describes Primary as the one-per-view key action. Source search found no direct production use of `button--primary` outside CSS/checklist text, which means the modifier is component-generated rather than a free-floating class hook.
- `Follow-up`: No CSS action. Component documentation now lists `primary` as part of the active variant set without the stale `light` reference; consider the primary shadow only if a broader shadow-token cleanup happens.

##### CSS-1.4.1.3 - `.button--secondary`

- `Status`: `Keep`
- `Layer`: Shared production API
- `Selectors Covered`: `.button--secondary`, `.button--secondary:hover`.
- `Naming/Structure Check`: Modifier naming is consistent with the active Button API and clearly expresses a secondary action role. It is used through `variant="secondary"` rather than as a direct class in page markup.
- `Declaration Review`: The modifier owns only visual variant declarations: line border, strong surface background, and ink text. Hover changes background and repeats `border-color: var(--line)`; that repetition is harmless and keeps the hover state self-contained, but it could be removed if a future cleanup prefers fewer no-op hover declarations. Nothing here belongs in the base `.button` rule because the primary variant deliberately uses a different border color.
- `Architecture Check`: Keep in the shared button modifier block. The white/outlined treatment is visually and semantically distinct from primary and tertiary, so it is not a consolidate candidate.
- `Used By`: Supporting public actions on ENM/polyamory, LGBTQIA+, and Not Found pages; secondary hero/read-more examples in rendered design-system pages; dev design-language navigation examples.
- `Decision`: Keep as the supporting action variant.
- `Evidence`: `src/components/Button.tsx` exposes `secondary` in the variant union. `src/styles.css` defines `.button--secondary` and `.button--secondary:hover`. Rendered design-system usage describes Secondary as a supporting action alongside Primary. Source search found explicit `variant="secondary"` usage in public pages and dev examples, with no direct `button--secondary` class usage outside CSS/checklist text.
- `Follow-up`: No CSS action. Component documentation now lists `secondary` as part of the active variant set without the stale `light` reference; repeated hover border color can be revisited in a small declaration cleanup if desired.

##### CSS-1.4.1.4 - `.button--tertiary`

- `Status`: `Keep`
- `Layer`: Shared production API
- `Selectors Covered`: `.button--tertiary`, `.button--tertiary:hover`.
- `Naming/Structure Check`: Modifier naming is consistent with the active Button API and with the rendered design-system explanation of a lower-emphasis action. It is used through `variant="tertiary"` rather than direct page class hooks.
- `Declaration Review`: The modifier owns low-emphasis visual declarations: line border, cedar-soft background, cedar text, and no shadow. `box-shadow: none` is defensive because the base `.button` has no shadow, but it protects against future modifier stacking and documents that tertiary should stay flatter than primary. Hover repeats `border-color: var(--line)` and changes the background only; the repeated border color is low-risk and can stay unless a focused declaration cleanup removes no-op hover declarations.
- `Architecture Check`: Keep in the shared button modifier block. Although it is another bordered button, its cedar-soft surface and low-emphasis role are distinct from the white secondary treatment, so it should not be consolidated during this leaf review.
- `Used By`: Lower-emphasis actions on Home workroom/profile and inclusive-practice panels, Inclusion hub panel actions, and rendered design-system button examples.
- `Decision`: Keep as the low-emphasis shared action variant.
- `Evidence`: `src/components/Button.tsx` exposes `tertiary` in the variant union. `src/styles.css` defines `.button--tertiary` and `.button--tertiary:hover`. Rendered design-system usage describes Tertiary as a low-emphasis action on coloured or busy surfaces. Source search found explicit `variant="tertiary"` usage on Home, Inclusive Practice, and design-system examples, with no direct `button--tertiary` class usage outside CSS/checklist text.
- `Follow-up`: No CSS action. Component documentation now lists `tertiary` as part of the active variant set without the stale `light` reference; defensive `box-shadow: none` and repeated hover border color can be revisited in a small declaration cleanup if desired.

#### CSS-1.4.2 - Button-adjacent action layout classes

- `Status`: `Expanded`
- `Layer`: Shared production API
- `Scope`: Shared row/action helpers and header-specific button sizing.
- `Next`: Both leaves have been actioned. `.header-button` remains active as a header-specific class and belongs to `CSS-1.3` for any future naming or placement review.

##### CSS-1.4.2.1 - `.button-row`

- `Status`: `Actioned`
- `Layer`: Removed legacy/shared production helper
- `Selectors Covered`: Removed `.button-row` and button-row responsive overrides from `src/styles.css`.
- `Naming/Structure Check`: Non-prefixed helper name is understandable but not part of the documented active non-prefixed component exceptions. It overlaps the active `site-*` direction for page/action layout helpers, especially `.site-actions`.
- `Declaration Review`: The base rule only sets `display: flex`, `flex-wrap: wrap`, and `gap: 14px`; the responsive rule changes it to a stretched column. Those declarations are simple and not harmful, but they are currently dead. If this layout is needed again, `.site-actions` already expresses the active action-row pattern with similar flex wrapping and a documented `site-*` naming direction.
- `Architecture Check`: This does not need to remain in `src/styles.css` as an unused shared helper. It should not be moved or re-promoted without a current usage case; delete is cleaner than consolidating into `.site-actions` while there are no callers.
- `Used By`: No source usage found outside the removed `src/styles.css` selectors and this checklist.
- `Decision`: Removed unused `.button-row` base and responsive rules from production CSS.
- `Evidence`: Source search before removal found `.button-row` only in `src/styles.css` and `docs/checklists/css-review.md`. Design-system scope names `.button` as an active non-prefixed component class, but does not list `.button-row`; current action clusters use `.site-actions`.
- `Follow-up`: None.

##### CSS-1.4.2.2 - `.header-button`

- `Status`: `Actioned`
- `Layer`: Header/shell-specific production class on `Button`
- `Selectors Covered`: `.header-button` and header-button responsive overrides. Removed redundant `.site-shell--shared .header-button` and `.site-shell--shared .header-button:hover` primary-colour overrides from `src/styles.css`.
- `Naming/Structure Check`: The class name is clear enough for its current single use, but it is header-specific rather than a reusable action primitive. A future rename to a `site-header__*` class could improve structural consistency, but that should be considered with the broader header/shell region rather than as an isolated button cleanup.
- `Declaration Review`: The active `.header-button` declarations now only add header-specific density and fit: compact padding, smaller type, `white-space: nowrap`, mobile padding/type adjustment, and mobile width handling that counters full-width small-screen buttons inside the header. Primary button colour, border, text colour, hover colour, base shape, and button behavior now come from `.button` and `.button--primary`.
- `Architecture Check`: The CSS cleanup for this leaf is complete. The class itself remains active and header-specific, so any future rename or relocation belongs to the `CSS-1.3` header/shell review rather than the button primitive region.
- `Used By`: `Layout` header contact action only, via `<Button href="/contact" className="header-button">`.
- `Decision`: Removed redundant primary-colour overrides and kept only header-specific adjustments on `.header-button`.
- `Evidence`: `src/components/Button.tsx` defaults `variant` to `primary`, so the Layout header action receives `button button--primary header-button`. The removed shared-shell `.header-button` colour declarations matched `.button--primary` and `.button--primary:hover`; source search after cleanup leaves only header-specific `.header-button` styling.
- `Follow-up`: Revisit naming and ownership during `CSS-1.3` expansion/review if desired; no remaining `CSS-1.4` action.

- `CSS-1.5` `Expanded` Older shared and legacy pre-`site-*` patterns.
  - Scope: `.check-item`, `.icon-box`, `.section-heading*`, `.rich-text*`, `.stack`, `.small-note`, `.form-note`, `.info-card`, and `.quiet-card`. Removed `CSS-1.5.1` panel/media shells, `.section`, `.split`, `.check-list`, `.fit-strip*`, `.issues-section*`, `.topic-grid`, and `.topic-card` are retained below as actioned history.
  - Next: Review one subgroup at a time, starting with remaining legacy/debt-linked groups before active non-prefixed exceptions.
  - Related Work: `DEBT-13`, archived `DEBT-18`, archived `DEBT-19`, `DEBT-20`, `DEBT-21`.

### CSS-1.5 - Older shared and legacy pre-`site-*` patterns

#### CSS-1.5.1 - Legacy media and panel shells

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Scope`: Removed older media, two-column, and feature-panel shells that overlapped current `site-*` panel/card direction.
- `Related Work`: `DEBT-13`, archived `DEBT-18`.
- `Next`: None for this subgroup. `DEBT-18` is archived after the `CSS-1.5.3` fit-strip cleanup.

##### CSS-1.5.1.1 - `.image-panel`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.image-panel`, `.image-panel img`, and responsive `.image-panel img` from `src/styles.css`.
- `Naming/Structure Check`: Generic non-prefixed panel name is not part of the documented active non-prefixed shared exceptions. It also predates the current `site-*`, `hero-*`, and page-scoped media/composition naming direction, so future media panels should not copy this name.
- `Declaration Review`: The wrapper sets a standard bordered/radius/shadowed surface with `overflow: hidden`; the child image rule forces a fixed crop height, `object-fit: cover`, and muted saturation/contrast, with a smaller mobile height. Those declarations are coherent for an old framed image card, but they are unused. Nothing here needs to move into a base class unless a future active media-panel pattern is deliberately designed.
- `Architecture Check`: This belongs to the `DEBT-18` legacy panel/strip cleanup lane. It should be deleted rather than moved or consolidated if the rest of the `CSS-1.5.1` panel-shell review confirms no hidden current usage.
- `Used By`: No source usage found outside the removed `src/styles.css` selectors, this checklist, and project-debt references.
- `Decision`: Removed unused `.image-panel` rules from production CSS.
- `Evidence`: Source search before removal found `.image-panel` only in `src/styles.css`, `docs/checklists/css-review.md`, and `docs/project/project-debt.md`. `DEBT-18` already recorded `.image-panel` as part of the legacy panel/strip selector group with no obvious current page or component references.
- `Follow-up`: None.

##### CSS-1.5.1.2 - `.two-column-panel`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed grouped `.two-column-panel, .feature-panel`, `.two-column-panel`, `.two-column-panel h2`, `.two-column-panel p`, and responsive `.two-column-panel` from `src/styles.css`.
- `Naming/Structure Check`: Usage-only pass. Naming and structure were not fully reviewed beyond confirming this is part of the legacy panel-shell group tracked by `DEBT-18`.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: Usage evidence supports treating this as part of the `DEBT-18` legacy panel-shell cleanup batch rather than active shared API.
- `Used By`: No source usage found outside the removed `src/styles.css` selectors, this checklist, and project-debt references.
- `Decision`: Removed unused `.two-column-panel` rules from production CSS.
- `Evidence`: `rg` over `src` excluding `src/styles.css` found no matches for `.two-column-panel`; full source/docs search before removal found only `src/styles.css`, `docs/checklists/css-review.md`, and `docs/project/project-debt.md`.
- `Follow-up`: None.

##### CSS-1.5.1.3 - `.feature-panel`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed grouped `.two-column-panel, .feature-panel`, `.feature-panel`, and responsive `.feature-panel` from `src/styles.css`.
- `Naming/Structure Check`: Usage-only pass. Naming and structure were not fully reviewed beyond confirming this is part of the legacy panel-shell group tracked by `DEBT-18`.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: Usage evidence supports treating this as part of the `DEBT-18` legacy panel-shell cleanup batch rather than active shared API.
- `Used By`: No source usage found outside the removed `src/styles.css` selectors, this checklist, and project-debt references.
- `Decision`: Removed unused `.feature-panel` rules from production CSS.
- `Evidence`: `rg` over `src` excluding `src/styles.css` found no matches for `.feature-panel`; full source/docs search before removal found only `src/styles.css`, `docs/checklists/css-review.md`, and `docs/project/project-debt.md`.
- `Follow-up`: None.

##### CSS-1.5.1.4 - `.feature-panel--compact`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.feature-panel--compact` and responsive `.feature-panel--compact` from `src/styles.css`.
- `Naming/Structure Check`: Usage-only pass. Naming and structure were not fully reviewed beyond confirming this is a modifier in the unused legacy feature-panel group.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: Usage evidence supports treating this as part of the `DEBT-18` legacy panel-shell cleanup batch rather than active shared API.
- `Used By`: No source usage found outside the removed `src/styles.css` selectors, this checklist, and project-debt references.
- `Decision`: Removed unused `.feature-panel--compact` rules from production CSS.
- `Evidence`: `rg` over `src` excluding `src/styles.css` found no matches for `.feature-panel--compact`; full source/docs search before removal found only `src/styles.css` and `docs/checklists/css-review.md`.
- `Follow-up`: None.

##### CSS-1.5.1.5 - `.feature-panel__content`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.feature-panel__content` from `src/styles.css`.
- `Naming/Structure Check`: Usage-only pass. Naming and structure were not fully reviewed beyond confirming this is an element class in the unused legacy feature-panel group.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: Usage evidence supports treating this as part of the `DEBT-18` legacy panel-shell cleanup batch rather than active shared API.
- `Used By`: No source usage found outside the removed `src/styles.css` selector, this checklist, and project-debt references.
- `Decision`: Removed unused `.feature-panel__content` rule from production CSS.
- `Evidence`: `rg` over `src` excluding `src/styles.css` found no matches for `.feature-panel__content`; full source/docs search before removal found only `src/styles.css` and `docs/checklists/css-review.md`.
- `Follow-up`: None.

##### CSS-1.5.1.6 - `.feature-panel__card`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.feature-panel__card` from `src/styles.css`.
- `Naming/Structure Check`: Usage-only pass. Naming and structure were not fully reviewed beyond confirming this is an element class in the unused legacy feature-panel group.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: Usage evidence supports treating this as part of the `DEBT-18` legacy panel-shell cleanup batch rather than active shared API.
- `Used By`: No source usage found outside the removed `src/styles.css` selector, this checklist, and project-debt references.
- `Decision`: Removed unused `.feature-panel__card` rule from production CSS.
- `Evidence`: `rg` over `src` excluding `src/styles.css` found no matches for `.feature-panel__card`; full source/docs search before removal found only `src/styles.css` and `docs/checklists/css-review.md`.
- `Follow-up`: None.

#### CSS-1.5.2 - Check and icon primitives

- `Status`: `Actioned`
- `Layer`: Mixed active non-prefixed and older shared production CSS
- `Scope`: Check-list structure, individual check rows, and icon boxes.
- `Related Work`: `DEBT-13`.
- `Next`: `.check-list` cleanup is complete. Run declaration, naming, and structure review before changing the active `.check-item` and `.icon-box` tokens.

##### CSS-1.5.2.1 - `.check-list`

- `Status`: `Actioned`
- `Layer`: Removed older shared production helper
- `Selectors Covered`: Removed `.check-list` from `src/styles.css`.
- `Naming/Structure Check`: Not assessed in this usage-only pass.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: No live markup usage found; current check-panel patterns appear to use `.site-check-panel` plus `.check-item` rather than this standalone list wrapper.
- `Used By`: No TSX/HTML/source usage found outside the `src/styles.css` selector. The only non-CSS match found was descriptive documentation text saying "check-list panels", not a class reference.
- `Decision`: Removed unused `.check-list` rule from production CSS.
- `Evidence`: 2026-06-27 usage pass: broad `rg` searches across `src`, `public`, `docs/design-system`, and `docs/project` found no `className`/`class` reference for `.check-list`; matches were limited to `src/styles.css` and descriptive docs wording.
- `Follow-up`: None.

##### CSS-1.5.2.2 - `.check-item`

- `Status`: `Reviewing`
- `Layer`: Active non-prefixed shared class with contextual shared-pattern overrides
- `Selectors Covered`: shared body-type grouping for `.check-item`, `.check-item`, `.check-item svg`; contextual `.site-check-panel .check-item*` rules are cross-region with `CSS-1.7`.
- `Naming/Structure Check`: Not assessed in this usage-only pass.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: Active shared exception; it is documented as a current non-prefixed shared class and is used by current page and design-system examples.
- `Used By`: Historical source review recorded `src/pages/LgbtqiaCounselling.tsx` and the retired rendered catalogue; current evidence belongs in `docs/design-system-legacy/patterns.md` when the selector is reassessed.
- `Decision`: Used; not a delete candidate on usage evidence alone.
- `Evidence`: 2026-06-27 usage pass found live references at `src/pages/LgbtqiaCounselling.tsx:140`, `src/pages/dev/design-system/DS_Components.tsx:386`, and `src/pages/dev/design-system/DS_Components.tsx:401`; docs list `.check-item` as an active non-prefixed shared class.
- `Follow-up`: Run full declaration, naming, and structure review before deciding whether to keep, document, or consolidate.

##### CSS-1.5.2.3 - `.icon-box`

- `Status`: `Keep`
- `Layer`: Active non-prefixed shared class with contextual shared-pattern overrides
- `Selectors Covered`: `.icon-box`; contextual `.site-contact-item .icon-box` rule is cross-region with `CSS-1.7`.
- `Naming/Structure Check`: The short name is an intentional documented exception to the `site-*` layer. It represents one reusable icon surface rather than a page-specific composition.
- `Declaration Review`: The base rule owns the shared inline-flex sizing, alignment, radius, background, and colour. `.site-contact-item .icon-box` now adds only its contextual border; duplicate radius, background, and colour declarations have been removed.
- `Architecture Check`: Keep the base primitive and its one-value contact-item refinement. Public Contact uses `.icon-box` with a page-scoped alignment adjustment, while the rendered design-system contact pattern uses the shared contextual border.
- `Used By`: Historical source review recorded `src/pages/Contact.tsx` and the retired rendered catalogue; current evidence belongs in `docs/design-system-legacy/patterns.md` when the selector is reassessed.
- `Decision`: Keep the active shared primitive and the narrower contextual border rule.
- `Evidence`: The 2026-07-13 declaration review confirmed that `--radius` resolves to `8px` globally and found no alternate token overrides. Source usage remains in `src/pages/Contact.tsx` and `src/pages/dev/design-system/DS_Components.tsx`; canonical design-system docs continue to list `.icon-box` as active shared API.
- `Follow-up`: None.

#### CSS-1.5.3 - Legacy fit-strip band

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Scope`: Removed older horizontal fit-strip band and children.
- `Related Work`: `DEBT-13`, archived `DEBT-18`.
- `Next`: None for this subgroup. `DEBT-18` is archived.

##### CSS-1.5.3.1 - `.fit-strip`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.fit-strip` from `src/styles.css`.
- `Naming/Structure Check`: Not assessed in this usage-only pass.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: No live markup usage found; appears to be a legacy band wrapper kept visible only by debt notes and CSS definitions.
- `Used By`: No TSX/HTML/source usage found outside `src/styles.css`; non-CSS matches are project-debt references.
- `Decision`: Removed unused `.fit-strip` rule from production CSS.
- `Evidence`: 2026-06-27 usage pass: `rg` across `src/pages`, `src/components`, `src/data`, `public`, `docs/design-system`, and `docs/project` found no class usage; full-source matches were limited to `src/styles.css` and `docs/project/project-debt.md`.
- `Follow-up`: None.

##### CSS-1.5.3.2 - `.fit-strip__grid`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.fit-strip__grid` and responsive `.fit-strip__grid` from `src/styles.css`.
- `Naming/Structure Check`: Not assessed in this usage-only pass.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: No live markup usage found; tied to the unused `.fit-strip` wrapper.
- `Used By`: No TSX/HTML/source usage found outside `src/styles.css`.
- `Decision`: Removed unused `.fit-strip__grid` rules from production CSS.
- `Evidence`: 2026-06-27 usage pass found `.fit-strip__grid` only in `src/styles.css` base and responsive selectors.
- `Follow-up`: None.

##### CSS-1.5.3.3 - `.fit-strip__item`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.fit-strip__item`, `.fit-strip__item:first-child`, `.fit-strip__item p`, responsive `.fit-strip__item`, `.fit-strip__item:nth-child(odd)`, and `.fit-strip__item:first-child` from `src/styles.css`.
- `Naming/Structure Check`: Not assessed in this usage-only pass.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: No live markup usage found; tied to the unused `.fit-strip` wrapper.
- `Used By`: No TSX/HTML/source usage found outside `src/styles.css`.
- `Decision`: Removed unused `.fit-strip__item` rules from production CSS.
- `Evidence`: 2026-06-27 usage pass found `.fit-strip__item` only in `src/styles.css` base and responsive selectors.
- `Follow-up`: None.

##### CSS-1.5.3.4 - `.fit-strip__icon`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: Removed `.fit-strip__icon`, `.fit-strip__icon svg` from `src/styles.css`.
- `Naming/Structure Check`: Not assessed in this usage-only pass.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: No live markup usage found; tied to the unused `.fit-strip` wrapper.
- `Used By`: No TSX/HTML/source usage found outside `src/styles.css`.
- `Decision`: Removed unused `.fit-strip__icon` rules from production CSS.
- `Evidence`: 2026-06-27 usage pass found `.fit-strip__icon` only in `src/styles.css` base selectors.
- `Follow-up`: None.

#### CSS-1.5.4 - Generic section and layout wrappers

- `Status`: `Reviewing`
- `Layer`: Older shared production layout helpers
- `Scope`: Generic section, split, and stack helpers that predate or overlap current `site-*` section patterns.
- `Related Work`: `DEBT-13`, `DEBT-21`.
- `Next`: `SplitSection`, `.section`, `.section--surface`, and `.split` cleanup is complete. `.stack` remains a separate delete candidate.

##### CSS-1.5.4.1 - `.section`

- `Status`: `Actioned`
- `Layer`: Removed older shared production layout helper
- `Selectors Covered`: Removed `.section` and responsive `.section` from `src/styles.css`.
- `Naming/Structure Check`: `SplitSection` review found this class belongs to the older generic layout naming layer. It is not listed among the active non-prefixed shared class exceptions, while current public section surfaces use `site-*` names such as `.site-grid` and `.site-highlight`.
- `Declaration Review`: `.section` only provides section vertical padding, with a mobile override. That responsibility now overlaps the active section-surface system rather than needing a separate generic wrapper.
- `Architecture Check`: No current page or rendered design-system route uses `.section` directly. The only source reference is inside `SplitSection`, which is documented as active but has no call sites in `src` and uses the older `.section` / `.split` layout pair instead of the current `site-*` section/split system.
- `Used By`: Former source-only reference in removed `src/components/SplitSection.tsx`; no `SplitSection` usage/import call sites were found outside its component file and design-system docs.
- `Decision`: Removed `.section` CSS with the unused `SplitSection` component and design-system docs references.
- `Evidence`: 2026-06-27 usage pass found `.section` produced by `src/components/SplitSection.tsx:19`. `SplitSection` review found no source call sites beyond its component file; design-system docs previously listed `SplitSection` as active, and this cleanup removed that active docs reference. Active section guidance points to `.site-grid`, `.site-highlight`, and `.site-split`.
- `Follow-up`: None.

##### CSS-1.5.4.2 - `.section--surface`

- `Status`: `Actioned`
- `Layer`: Removed older shared production layout helper
- `Selectors Covered`: Removed `.section--surface` from `src/styles.css`.
- `Naming/Structure Check`: Not assessed in this usage-only pass.
- `Declaration Review`: Not performed in this usage-only pass.
- `Architecture Check`: No source or docs usage found outside `src/styles.css`; current section surface language appears to be `site-grid` / `site-highlight` rather than this modifier.
- `Used By`: No TSX/HTML/source usage found outside `src/styles.css`.
- `Decision`: Removed unused `.section--surface` rule with the old generic section layer.
- `Evidence`: 2026-06-27 usage pass found no matches for `section--surface` across `src`, `docs`, or `public` excluding `src/styles.css` and this checklist.
- `Follow-up`: None.

##### CSS-1.5.4.3 - `.split`

- `Status`: `Actioned`
- `Layer`: Removed older shared production layout helper
- `Selectors Covered`: Removed `.split` and responsive `.split` from `src/styles.css`.
- `Naming/Structure Check`: `SplitSection` review found this class belongs to the older generic layout naming layer. Current live split layouts use `.site-split`, which makes the unprefixed `.split` path structurally stale.
- `Declaration Review`: `.split` owns a two-column grid and mobile collapse. That layout responsibility now overlaps the active `.site-split` shared pattern.
- `Architecture Check`: No current page or rendered design-system route uses `.split` directly. The only source reference is inside `SplitSection`, which is documented as active but has no call sites in `src` and uses the older `.section` / `.split` layout pair instead of the current `site-*` section/split system.
- `Used By`: Former source-only reference in removed `src/components/SplitSection.tsx`; no `SplitSection` usage/import call sites were found outside its component file and design-system docs.
- `Decision`: Removed `.split` CSS with the unused `SplitSection` component and design-system docs references.
- `Evidence`: 2026-06-27 usage pass found `.split` in `src/components/SplitSection.tsx:20`. `SplitSection` review found no source call sites beyond its component file; design-system docs previously listed `SplitSection` as active, and this cleanup removed that active docs reference. Public and dev pages use `.site-split` for live split layouts.
- `Follow-up`: None.

##### CSS-1.5.4.4 - `.stack`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production layout helper
- `Selectors Covered`: Removed `.stack` from `src/styles.css`.
- `Naming/Structure Check`: The generic class was ambiguous beside the active, purpose-specific `.site-content-stack` and `.site-detail-stack` APIs.
- `Declaration Review`: Removed the isolated `display: grid` and `gap: 50px` declarations as one dead rule.
- `Architecture Check`: No source usage found; current stack language appears to be explicit `site-*` stacks such as `.site-content-stack` and `.site-detail-stack`.
- `Used By`: No TSX/HTML/source usage found outside `src/styles.css`.
- `Decision`: Remove.
- `Evidence`: The 2026-06-27 usage pass found no exact `.stack` class usage across `src`, `docs`, or `public` excluding `src/styles.css` and this checklist. A focused 2026-07-13 sweep confirmed no runtime call sites before removal.
- `Follow-up`: None.

#### CSS-1.5.5 - Section heading and rich-text system

- `Status`: `Expanded`
- `Layer`: Active non-prefixed shared production classes with older contextual selectors
- `Scope`: Active `SectionHeading` and rich editorial text classes plus their descendant selectors.
- `Related Work`: `DEBT-13`, `DEBT-21`.
- `Next`: Current source evidence is reconciled below and in `CSS-1.2.1.3`/`CSS-1.2.1.4`. Review the section-heading component boundary and rich-child coverage before changing either family.

##### CSS-1.5.5.1 - `.section-heading`

- `Status`: `Keep, document`
- `Layer`: Active non-prefixed shared class
- `Selectors Covered`: `.section-heading`.
- `Naming/Structure Check`: Clear block name paired with `.section-heading__copy`, but live code now writes the classes directly while the matching component is uncalled.
- `Declaration Review`: Grid, `18px` gap, and `760px` measure form a small coherent layout wrapper; former `.issues-section` contextual rules were removed in an earlier completed cleanup.
- `Architecture Check`: The styling remains live on Working with Joel, but component ownership is stale and should be assessed with the copy element rather than inferred from the exported component's existence.
- `Used By`: Working with Joel approach introduction; also emitted by the currently uncalled `SectionHeading` component.
- `Decision`: Keep the live layout class and document the component-boundary question.
- `Evidence`: The 2026-08-06 current-source pass found one direct mounted use in `WorkingWithJoel.tsx`, one emitter in `SectionHeading.tsx`, and no import or invocation of that component.
- `Follow-up`: Review whether the page should consume `SectionHeading`, the component should be removed, or the classes should remain page-authored.

##### CSS-1.5.5.2 - `.section-heading__copy`

- `Status`: `Consolidate candidate`
- `Layer`: Active non-prefixed shared class
- `Selectors Covered`: `.section-heading__copy` in the shared body-type group and its standalone measure rule.
- `Naming/Structure Check`: Clear element name, but direct page use and an uncalled component both claim ownership.
- `Declaration Review`: The live class contributes a `760px` maximum width; `.site-reading` supplies the current paragraph typography and overrides the low-specificity legacy body group.
- `Architecture Check`: Layout measure and a superseded prose role are combined on one inherited class. See the current deep record at `CSS-1.2.1.3`.
- `Used By`: Working with Joel approach overview; also emitted by the currently uncalled `SectionHeading` component.
- `Decision`: Retain the live measure while treating the component/prose-role overlap as a consolidation candidate.
- `Evidence`: The 2026-08-06 current-source pass found no public or development consumer beyond Working with Joel and no `SectionHeading` invocation.
- `Follow-up`: Review with `.section-heading`, `SectionHeading`, and `.site-reading`.

##### CSS-1.5.5.3 - `.rich-text`

- `Status`: `Keep, document`
- `Layer`: Active non-prefixed shared class
- `Selectors Covered`: shared body-type grouping for `.rich-text`, `.rich-text`, `.rich-text h2`, `.rich-text h3`, `.rich-text h4`, `.rich-text a:not(.button)`, `.rich-text a:not(.button):focus-visible`, `.rich-text ul`, `.rich-text ol`, `.rich-text strong`, `.rich-text code`, `.rich-text blockquote`, `.rich-text blockquote p`, `.rich-text table`, `.rich-text th`, `.rich-text td`, `.rich-text hr`, `.rich-text .button`, and contextual `.site-copy-panel.rich-text`.
- `Naming/Structure Check`: Clear active non-prefixed shared exception. The name is broad, but appropriate for the job: a scoped editorial HTML wrapper for content whose child elements are authored as semantic HTML rather than as component classes. Keep it as the wrapper API; avoid creating near-duplicate page-scoped rich-copy classes.
- `Declaration Review`: Base `display: grid`, `gap: 20px`, and `max-width: 680px` create a consistent reading column. Body colour, size, and leading are inherited from the shared body-type grouping for `.rich-text`, `.rich-text p`, and `.rich-text li`, which keeps the wrapper aligned with the broader type system. Descendant heading, link, focus, list, strong, code, blockquote, table, divider, and button rules are cohesive and token-led. `.site-copy-panel.rich-text { max-width: none; }` is a sensible composition override because the panel controls the container width. Ordinary editorial-link rules now exclude `.button` anchors so `Button` variants retain their own colour and text-decoration contract. The table treatment remains appropriate for the current simple design-system example; wider public tables would need an overflow wrapper.
- `Architecture Check`: Keep as the shared editorial HTML styling boundary. The broad descendant selector set is acceptable here because the wrapper intentionally absorbs ordinary rich HTML and prevents one-off page styles for links, lists, quotes, code, and simple tables. `.rich-text .button` remains a small placement refinement for one optional contextual next step, while grouped actions belong outside the wrapper. The blockquote left rule stays scoped to editorial quote content rather than becoming a generic callout/card pattern.
- `Used By`: Working with Joel introduction panel. Its mounted children are currently one heading and `.site-reading` paragraphs.
- `Decision`: Keep the active wrapper. The prior ordinary-link/button correction remains valid, but the broad descendant family now needs current-consumer review rather than relying on retired rendered examples.
- `Evidence`: The 2026-08-06 current-source pass found one TSX emitter. The `/design-language/*` examples cited by the older review have been retired; the current design-system workspace mentions `.rich-text` only as inherited link-treatment context, not as a rendered or supported contract.
- `Follow-up`: Review dormant rich-child capabilities as one family; if wider tables regain a live consumer, add an overflow/responsive treatment rather than stretching the base wrapper.

#### CSS-1.5.6 - Legacy issue and topic-card cluster

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Scope`: Removed the older issues section and topic-card system that overlapped active `site-topic-*` patterns.
- `Related Work`: `DEBT-13`, archived `DEBT-19`.
- `Next`: None for this subgroup.

##### CSS-1.5.6.1 - `.issues-section`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: `.issues-section`, `.issues-section .section-heading`, `.issues-section .section-heading h2`, and `.issues-section .section-heading__copy`.
- `Naming/Structure Check`: Superseded by the documented `site-*` section and topic-card APIs.
- `Declaration Review`: Removed the base section spacing and contextual section-heading overrides as one dead compatibility slice.
- `Architecture Check`: No production or rendered design-system call sites remained, so retaining contextual overrides only increased cascade ambiguity.
- `Used By`: No source call sites found.
- `Decision`: Remove.
- `Evidence`: Focused source search on 2026-07-10 found references only in maintenance documentation; current public and design-system topic layouts use page-scoped classes or `.site-topic-*`.
- `Follow-up`: None.

##### CSS-1.5.6.2 - `.issues-section__inner`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: `.issues-section__inner`.
- `Naming/Structure Check`: Belonged only to the removed `.issues-section` compatibility path.
- `Declaration Review`: Removed its isolated gap override with the parent cluster.
- `Architecture Check`: No source call sites remained.
- `Used By`: No source call sites found.
- `Decision`: Remove.
- `Evidence`: Focused source search on 2026-07-10 found references only in maintenance documentation.
- `Follow-up`: None.

##### CSS-1.5.6.3 - `.topic-grid`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: `.topic-grid` and responsive `.topic-grid`.
- `Naming/Structure Check`: Ambiguous beside the active `.site-topic-grid` API.
- `Declaration Review`: Removed the base grid and both responsive overrides together.
- `Architecture Check`: The active `.site-topic-grid` system covers the supported shared outcome; no compatibility call site remained.
- `Used By`: No source call sites found.
- `Decision`: Remove.
- `Evidence`: Focused source search on 2026-07-10 found only `.site-topic-grid` runtime/demo use and maintenance references to the old class.
- `Follow-up`: None.

##### CSS-1.5.6.4 - `.topic-card`

- `Status`: `Actioned`
- `Layer`: Removed legacy shared production CSS
- `Selectors Covered`: `.topic-card`, `.topic-card:hover`, `.topic-card h3`.
- `Naming/Structure Check`: Ambiguous beside the active `.site-topic-card` API.
- `Declaration Review`: Removed the base card, hover, and heading rules as a complete dead selector group.
- `Architecture Check`: The active `.site-topic-card` pattern remains documented and demonstrated; no compatibility call site remained.
- `Used By`: No source call sites found.
- `Decision`: Remove.
- `Evidence`: Focused source search on 2026-07-10 found only `.site-topic-card` runtime/demo use and maintenance references to the old class.
- `Follow-up`: None.

#### CSS-1.5.7 - Small note and card-like utilities

- `Status`: `Expanded`
- `Layer`: Older shared production utility CSS
- `Scope`: Small text notes and older card-like utility classes.
- `Related Work`: `DEBT-13`, `DEBT-21`.
- `Next`: Review individual class tokens.

##### CSS-1.5.7.1 - `.small-note`

- `Status`: `Not reviewed`
- `Layer`: Older shared production utility
- `Selectors Covered`: grouped `.small-note, .form-note`.
- `Naming/Structure Check`:
- `Declaration Review`:
- `Architecture Check`:
- `Used By`:
- `Decision`:
- `Evidence`:
- `Follow-up`:

##### CSS-1.5.7.2 - `.form-note`

- `Status`: `Not reviewed`
- `Layer`: Older shared production utility
- `Selectors Covered`: grouped `.small-note, .form-note`.
- `Naming/Structure Check`:
- `Declaration Review`:
- `Architecture Check`:
- `Used By`:
- `Decision`:
- `Evidence`:
- `Follow-up`:

##### CSS-1.5.7.3 - `.info-card`

- `Status`: `Not reviewed`
- `Layer`: Older shared production utility
- `Selectors Covered`: `.info-card`.
- `Naming/Structure Check`:
- `Declaration Review`:
- `Architecture Check`:
- `Used By`:
- `Decision`:
- `Evidence`:
- `Follow-up`:

##### CSS-1.5.7.4 - `.quiet-card`

- `Status`: `Not reviewed`
- `Layer`: Older shared production utility
- `Selectors Covered`: `.quiet-card`.
- `Naming/Structure Check`:
- `Declaration Review`:
- `Architecture Check`:
- `Used By`:
- `Decision`:
- `Evidence`:
- `Follow-up`:

- `CSS-1.6` `Not reviewed` Footer.
  - Scope: `.site-footer*` and shared footer detail/link states.
  - Next: Expand to footer shell, primary footer, navigation, details, and copyright classes.

- `CSS-1.7` `Expanded` Active shared `site-*` system.
  - Scope: `.site-page`, `.site-actions`, `.site-grid*`, `.site-eyebrow`, `.site-card*`, `.site-topic-*`, `.site-split`, `.site-highlight*`, `.site-pill-row`, `.site-text-link`, `.site-trust-list*`, `.site-ruled-paragraph*`, `.site-copy-panel`, `.site-check-panel*`, `.site-principles*`, `.site-contact-*`, `.site-fee-card`, `.site-detail-stack*`, and responsive overrides. The removed `.site-spotlight*` family is retained below as actioned history.
  - Next: Expand by documented shared pattern family before moving to individual class tokens.

### CSS-1.7 - Active shared `site-*` system

#### CSS-1.7.1 - Retired spotlight composition

- `Status`: `Actioned`
- `Layer`: Removed shared production CSS
- `Selectors Covered`: Removed `.site-spotlight`, `.site-spotlight__grid`, `.site-spotlight__eyebrow`, `.site-spotlight__stats` and its descendant rules, plus the responsive `.site-spotlight__grid` hook.
- `Naming/Structure Check`: The `site-*` name made the composition appear to be active shared API, but it is absent from the page-pattern catalogue and has no source consumer.
- `Declaration Review`: The rules formed one complete two-column spotlight and statistics composition, so the base and responsive rules were removed together rather than leaving partial compatibility CSS.
- `Architecture Check`: No current shared pattern replaces this exact composition because no current page needs the outcome. Future spotlight content should be designed from an active page need rather than reviving an unused shell.
- `Used By`: No runtime, dev-page, test, or HTML call sites were found.
- `Decision`: Remove.
- `Evidence`: A focused source scan on 2026-07-13 found `site-spotlight` only in `src/styles.css` and CSS maintenance documentation.
- `Follow-up`: Continue `CSS-1.7` one documented pattern family at a time.

#### CSS-1.7.2 - Contextual primitive declaration deduplication

- `Status`: `Actioned`
- `Layer`: Shared production primitives within active `site-*` contexts
- `Selectors Covered`: `.site-page .button` and `.site-contact-item .icon-box`.
- `Naming/Structure Check`: Both contextual selectors remain appropriate because they add page-pattern-specific sizing or border treatment without creating new class API.
- `Declaration Review`: Removed the hard-coded page button radius already supplied by `.button { border-radius: var(--radius); }`. Removed the contact-item icon radius, background, and colour already supplied by `.icon-box`; its contextual border remains.
- `Architecture Check`: Shared visual ownership now sits with the base `.button` and `.icon-box` primitives, while the `site-*` contexts retain only declarations that differ from those bases.
- `Used By`: Public page buttons, the public Contact icon primitive, and the rendered design-system contact-strip example.
- `Decision`: Consolidate exact duplicate declarations into their existing base primitives without changing selectors, markup, or visual output.
- `Evidence`: A 2026-07-13 token and source scan found `--radius` defined once at `8px`, no descendant overrides, and exact matching base values for all four removed declarations.
- `Follow-up`: Continue `CSS-1.7` one documented pattern family at a time.

- `CSS-1.8` `Not reviewed` Broad-tab, CTA, and interactive shared patterns.
  - Scope: `.site-broad-tabs*`, `.site-cta-block*`, reduced-motion support, and hover/focus states for these patterns. The obsolete `.site-form*` layer was removed in the 2026-08-03 source-first cleanup sweep; the unconsumed `.site-faq-*` feature family was removed in the 2026-08-06 source-first cleanup sweep.
  - Next: Expand by broad tabs, CTA, and interaction-state clusters.

- `CSS-1.9` `Not reviewed` Hero design language.
  - Scope: `.hero-section`, `.hero-top`, `.hero-display`, `.hero-intro`, `.site-emphasis`, `.hero-copy-panel`, `.hero-deck*`, `.hero-support-tagline`, `.hero-badge`, `.hero-principles-strip`, `.hero-principle-item`, `.hero-top--supporting-media`, `.hero-media-note*`, and hero responsive rules. `.site-hero-background` was separately reviewed and promoted on 2026-08-05; the former `.hero-bg--default` helper was removed.
  - Next: Expand by hero wrapper/top layout, hero typography/copy, hero decks/support, hero principles, hero backgrounds, and hero media.

- `CSS-1.10` `Not reviewed` Shared hero detail stack and late shared overrides.
  - Scope: `.hero-detail-stack*` and late shared production overrides that sit after the main hero system.
  - Next: Expand to class-token leaves and confirm whether each late rule belongs in this location.

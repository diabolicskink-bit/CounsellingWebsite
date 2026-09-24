# Design System Setup And Guidance Review

- Date: 2026-09-18
- Branch: `work/ai-instruction-review`
- Reviewed commit: `dadc14b`
- Scope: Design-system architecture, instructions, catalogues, compatibility boundary, production implementation, rendered workspace and related maintenance workflow.
- Method: Repository source inspection and focused local checks. Skills are excluded, continuing the instruction-review scope.
- Status: Assessment and recommendations only. This report does not authorize implementation.

## Overall assessment

The setup is fundamentally suitable for this site. It has a recognisable identity, a small supported layer, real shared components and enough room for new compositions. The recent guidance changes describe the owner's intended balance substantially better: consistent foundations, reuse for recurring roles, and active encouragement to create interesting new components.

The main weakness is the gap between that policy and the tools that explain and demonstrate it. The development workspace still repeats an obsolete promotion rule, publishes inaccurate counts, and presents full-page components inside a constrained preview area. The document viewer also loses the section links used to explain the new compatibility permission. A useful existing specialist hero family is absent from the component guidance.

Production CSS has a workable ownership structure, but consumer customization still relies on specificity knowledge and inherited global context. This is maintainability pressure, not evidence that the entire styling architecture needs replacement.

The recommended direction is to finish reconciling the written and rendered guidance, make the existing reusable families easier to discover, and clarify a few practical CSS extension points. Preserve the small system and its content-specific design freedom. A larger UI framework, a universal page template, a second catalogue platform or a wholesale token migration would be disproportionate to the evidence.

No critical production failure was established in this review. Several concrete developer-tool and guidance defects were established. Responsive rendering concerns below are identified as source-derived risks rather than claimed browser observations.

## The owner's design goals

The assessment uses these goals from the current conversation:

1. Public pages should feel like parts of the same site.
2. Recurring needs should share implementation, avoiding a different hero or body-font treatment for every page.
3. Designers should retain freedom to develop expressive compositions.
4. Interesting new components should be encouraged when they improve the content or interaction.
5. Maintenance and verification should remain proportionate to a small site maintained by one developer.

The latest [root visual guidance](../guidance/DESIGN.md#visual-direction) and [governance scope rules](../guidance/DESIGN.md#ownership-and-authority) are aligned with those goals. This review assesses their implementation and remaining practical gaps; it does not reinstate the earlier requirement for every new page to depart from existing patterns.

## What currently exists

### Authority and operating model

| Layer | Owner | Current purpose |
| --- | --- | --- |
| Site-wide working rules | [AGENTS.md](../../AGENTS.md) | Task scope, visual direction, permissions and verification boundaries. |
| Design-system operating rules | [Governance](../guidance/DESIGN.md) | Contracts, compatibility permission, shared work, promotion, withdrawal and evidence. |
| Promoted API | [Foundations](../design-system/FOUNDATIONS.md), [components](../design-system/COMPONENTS.md), [patterns](../design-system/PATTERNS.md) | Supported reusable implementation and its boundaries. |
| Permitted inherited basics | [Compatibility baseline](../guidance/DESIGN.md#public-identity-compatibility-baseline) | Existing fonts/type roles, selected text/canvas colours, shell, containment and standard actions. |
| Inherited implementation evidence | [Legacy register](../design-system/legacy/README.md) | Source-backed records that do not independently grant reuse or removal permission. |
| Rendered examples | [Design-system workspace](../../src/pages/dev/design-system/DesignSystem.tsx) | Development-only demonstrations of promoted API. |
| Maintenance memory | [Project debt](../memory/DEBT.md), [CSS review](../checklists/CSS-REVIEW.md) | Outstanding pressure and dated review evidence, subject to the current task. |

The distinctions are useful. In particular, compatibility permission does not silently promote everything in the global stylesheet. Conversely, a new page now has an explicit way to use ordinary identity primitives without copying their literal values.

### Supported surface and source size

Counts below describe this checkout, not a target size or a quality score.

| Surface | Observed state |
| --- | --- |
| Foundation catalogue | 13 records: two reading roles, ten colour/material tokens and the anchor-offset token. |
| Component catalogue | Two contracts: `ArticleHero` and `ContactInvitation`. |
| Pattern catalogue | Three records: the hero frame/opening roles, hero surface and warm editorial section. |
| Rendered specimens | 12 foundations, two components and three patterns: 17 specimens. |
| Supported production CSS | Four files, including the import entry; approximately 545 lines. |
| Inherited global stylesheet | Approximately 1,037 lines in `src/styles.css`. |
| Public page/feature CSS | 13 files and approximately 4,485 lines, excluding analytics and development routes. |
| Workspace presentation CSS | Approximately 834 lines, separately owned as development presentation. |

The 18 catalogue records and 17 specimens are not inherently inconsistent. Governance only calls for a specimen when it materially helps maintenance; `--site-anchor-offset` currently has a written contract without a dedicated specimen. The incorrect visible counts are a separate issue.

[main.tsx](../../src/main.tsx) loads the global stylesheet and the supported CSS entry. [The supported entry](../../src/design-system/index.css) composes foundations, patterns and components. [App.tsx](../../src/app/App.tsx) keeps workspace routes inside the `import.meta.env.DEV` branch. Public pages and the private analytics product remain separate in policy and route composition.

## What is working well

### Shared identity is real, not merely aspirational

The source has shared font families, heading/body defaults, colour roles, containment and navigation. A scan of public page CSS found only `var(--font-serif)`, `var(--font-sans)` and `var(--font-mono)` in font-family declarations. That does not prove every typography decision is coherent, but it does not support a diagnosis of uncontrolled font-family proliferation.

The supported `.site-reading` role gives substantive prose a shared family, scale, weight and line-height. Its limited contextual foreground exception is useful. Supported section and portrait materials also express meaningful roles rather than collecting every similar literal into a generic palette.

### The component examples demonstrate sensible levels of reuse

[ArticleHero](../../src/pages/articles/ArticleHero.tsx) owns a stable article-specific structure, metadata and presentation. [ContactInvitation](../../src/components/ContactInvitation.tsx) owns a complete recurring closing section, including destinations and its consult event. Both have clear consumer boundaries.

The [specialist hero](../../src/pages/inclusion/SpecialistCounsellingHero.tsx) is another positive example: three related service pages share their opening structure and actions while supplying different wording and title content. Its discoverability needs work, as described below; its existence is evidence that the project already supports reuse beyond generic visual primitives.

Fixed copy in `ContactInvitation` and article metadata in `ArticleHero` are appropriate product decisions for these contracts. They are not defects simply because a general-purpose component library might expose more props.

### Creative freedom and maintenance now coexist in the policy

Ordinary page work can reuse existing contracts, create a novel local component, and make a proportionate shared extraction or variant directly needed for a demonstrated recurring role. That avoids the earlier choice between duplication and a separate permission request.

Identity changes, broad migrations and unrelated promotions remain separately scoped. This is a useful boundary. It allows a new content treatment without quietly redesigning the rest of the site.

### Source and rendered evidence have distinct roles

The workspace imports the actual `ArticleHero` and `ContactInvitation` implementations. Pattern specimens apply real supported classes, and colour swatches consume real production tokens. This is much better than maintaining approximate copies of production markup.

The written rule that a specimen does not replace inspection of affected public consumers is also correct. The responsive concern below is a practical reason to retain that distinction.

### Verification is appropriately selective

[The test guide](../../tests/README.md) prioritizes consequential behaviour and explicitly avoids tests that freeze routine styling or documentation. Existing public browser coverage includes home hydration/accessibility, navigation behaviour and enquiry handling. Lack of an exhaustive design-system snapshot suite is not itself a finding.

Focused checks of a changed shared component and representative consumers are more useful here than testing catalogue counts or enforcing a screenshot for every token.

## Findings and recommendations

Severity reflects practical impact in this repository. P2 means a meaningful tooling or maintenance problem to address in a focused task. P3 means a lower-impact accuracy or clarity improvement. None of these findings authorizes a site-wide redesign.

| ID | Priority | Finding | Evidence level |
| --- | --- | --- | --- |
| DS1 | P2 | The rendered workspace still teaches the previous promotion policy. | Confirmed source mismatch. |
| DS2 | P2 | The document viewer discards cross-document anchors and renders headings without anchor IDs. | Confirmed source and focused execution. |
| DS3 | P2 | The specimen stage does not reproduce the width assumptions of full-page components. | Confirmed structural mismatch; visual consequence requires rendering. |
| DS4 | P2 | The existing specialist hero family lacks a discoverable reuse boundary. | Confirmed source/documentation gap. |
| DS5 | P2 | CSS customization contracts leave too much specificity and inherited context implicit. | Confirmed maintainability gap; no new public regression established. |
| DS6 | P3 | Workspace inventory and metadata are manually duplicated and already stale. | Confirmed count mismatch. |
| DS7 | P3 | Some live legacy/checklist routing still names retired stylesheet locations. | Confirmed path drift. |

### DS1: The rendered workspace still teaches the previous promotion policy

**Evidence.** [DesignSystem.tsx](../../src/pages/dev/design-system/DesignSystem.tsx), lines 32-33, presents an “Authorize shared scope” step and says promotion only happens when the task explicitly includes shared-system work. The current [governance](../guidance/DESIGN.md#ownership-and-authority) instead authorizes directly needed, proportionate shared variants or extractions during ordinary page work.

[DesignSystemWorkspace.tsx](../../src/pages/dev/design-system/DesignSystemWorkspace.tsx) also presents “Item record decides reuse” as the whole first step of its authority explanation. That is incomplete now that governance separately permits the compatibility baseline.

**Consequence.** Someone following the workspace can reintroduce the approval obstacle just removed from the written instructions. They can also miss the permitted fonts, controls and containment because these are intentionally absent from the promoted specimen list.

**Recommended action.** Update the workspace to summarize the current scope rule and link directly to its owner. Include a short explanation that inherited identity basics have a separate, bounded use permission. Keep those basics out of the promoted specimen area until actually promoted.

Avoid reproducing the full governance procedure in the interface. A short explanation and reliable link are sufficient.

**Completion evidence.** A new-page example should lead to the same decision from either route: ordinary reuse is allowed; a directly needed shared improvement can proceed with contract/consumer checks; a wider identity change or migration needs explicit scope.

### DS2: The document viewer loses the section links used by the guidance

**Evidence.** In [Documents.tsx](../../src/pages/dev/documents/Documents.tsx), `resolveMarkdownPath` returns only the pathname, discarding the hash. Its link renderer then creates a `/documents?doc=...` destination without restoring that hash. Local `#...` links are passed through, but the current Markdown renderer does not assign IDs to headings.

Focused local execution confirmed both parts:

- Resolving `governance.md#public-identity-compatibility-baseline` produces only `docs/guidance/DESIGN.md`.
- Rendering the corresponding level-two Markdown heading with the current `react-markdown` and `remark-gfm` setup produces `<h2>Public Identity Compatibility Baseline</h2>`, without an `id`.

**Consequence.** Links from the catalogue to the relevant compatibility rule arrive at the document rather than the section. Same-document section links have no heading target. The files and their Markdown links are valid when read through a renderer that supplies heading anchors; the defect is in the repository's development viewer.

**Recommended action.** Preserve document fragments when resolving internal links, give rendered headings stable IDs with a consistent duplicate-heading policy, and scroll to the selected fragment after a document change. Keep existing plain document links working. Handle source-file links deliberately rather than treating them as another Markdown document.

**Completion evidence.** Verify one cross-document link into the compatibility section, one same-document governance link and ordinary document selection in the local viewer. A small focused behaviour test may be worthwhile for the routing/fragment boundary; exact prose or a full document snapshot would not be.

### DS3: Full-page components are rendered inside a stage with different width assumptions

**Evidence.** The workspace has a 246px side rail, a substantial column gap and a padded specimen stage in [workspace CSS](../../src/pages/dev/design-system/design-system-workspace.css), particularly lines 130-136 and 439-444.

[ContactInvitation CSS](../../src/design-system/components.css) retains a two-column layout with a 390px minimum second column until the browser viewport reaches 980px. The specimen may be far narrower than that viewport. At a nominal 1,000px viewport, the declared workspace widths leave approximately 634px for the working field, 534px after stage padding, and 494px inside the component's `Container`. Its desktop second column and 80px gap then leave only about 24px for the first column. This is arithmetic from the declared CSS, not a browser measurement.

`ArticleHero` responds to a named container, which is a stronger fit for embedding. However, some of its type sizes still use viewport units, so narrowing the specimen does not exactly simulate a narrow browser viewport.

**Consequence.** The workspace can show a cramped or misleading rendering of a component that is intended for a full public content width. A maintainer might compensate in production CSS for a problem created by the specimen host, or assume the specimen proves responsiveness when it does not.

**Recommended action.** Decide what the workspace needs to demonstrate. For these full-width sections, a simple full-width preview or an isolated viewport with a small number of selectable widths is sufficient. If a component is meant to work in arbitrary containers, make that part of its production contract and verify it as such. Do not change production layout solely to rescue the current padded stage.

**Completion evidence.** Inspect the two actual components at representative public widths and compare those results with their specimens. No full-site sweep is needed. Until then, treat this as a source-established preview limitation with an unmeasured visual effect.

### DS4: The existing specialist hero family is not discoverable from component guidance

**Evidence.** [SpecialistCounsellingHero.tsx](../../src/pages/inclusion/SpecialistCounsellingHero.tsx) and [its CSS](../../src/pages/inclusion/specialist-counselling-hero.css) supply one implementation used by Kink/BDSM, ENM/polyamory and LGBTQIA+ pages. Its props cover the eyebrow, title, primary action, secondary action and page class.

The active component catalogue lists only `ArticleHero` and `ContactInvitation`. The legacy component register and current system guide do not name the specialist component either. The pattern catalogue describes shared hero primitives, but not this higher-level family.

**Consequence.** The code already has the level of reuse the owner wants, yet someone creating a related page is more likely to discover primitive hero classes than the existing complete family. Its absence also leaves the boundary between deliberate feature-local sharing and promoted API unclear.

**Recommended action.** Review this specific family as a candidate for a small, bounded contract. If it is the intended default for related specialist pages, document its supported scope and verify its three current consumers before promotion. Feature ownership can remain in the inclusion directory; a shared contract does not require moving every React component into a generic folder.

If the family is deliberately restricted to its current three consumers, record that decision and its owner so the omission is not mistaken for a need to build another hero. Do not promote every existing component merely to make the inventory complete.

**Completion evidence.** A maintainer working on a new specialist page should be able to tell whether to use this family, extend it or create a different composition, and why.

### DS5: Extension points still require implicit CSS knowledge

**Evidence.** [The hero contract](../design-system/PATTERNS.md#hero-surfaces) makes statement scale and measure consumer-owned and exposes several custom properties. [patterns.css](../../src/design-system/patterns.css) nevertheless sets those defaults directly on `.site-hero` and applies statement rules through a two-class selector.

Consumers deal with that through scoped selectors. [Home CSS](../../src/pages/home/home.css) explicitly says shared type rules require its overrides. [Article-index CSS](../../src/pages/articles/article-index.css) says its selector outranks the shared statement rule. Contact uses the same three-class approach. Crisis Support currently uses `.site-hero.crisis-support-page__hero` to set its width variable; the earlier task-log concern about that declaration being overridden should not be repeated as a current defect.

There is also an inherited context rule, `.site-page .button { min-width: 210px; }`, in [styles.css](../../src/styles.css), beyond the base button styles. The compatibility permission describes standard actions without explaining that context-dependent sizing.

**Consequence.** A developer can choose the correct shared item and still need to reverse-engineer how to customize it. Setting a property on an ancestor will not replace a value redeclared on the hero itself. A same-specificity override can depend on stylesheet order. A standard action can acquire a minimum width from its page wrapper.

This is a discoverability and robustness issue. The inspected hero consumers already use deliberate specificity; this review does not claim they currently render incorrectly.

**Recommended action.** Add a small practical example for hero composition and customization: where properties belong, which values are fixed, which may vary, and how a page should scope an override. State the button sizing boundary when the compatibility contract is next refined.

Where repeated override friction is demonstrated, consider lower-specificity defaults or explicit fallback variables as a focused implementation change. Verify affected consumers before changing cascade behaviour. A site-wide cascade-layer migration is not justified by this review alone.

**Completion evidence.** A new consumer should be implementable from the contract and example without copying selectors from an unrelated page. Check a representative hero with a custom measure and a standard action in its real page context.

### DS6: The workspace's duplicated inventory has already drifted

**Evidence.** [DesignSystem.tsx](../../src/pages/dev/design-system/DesignSystem.tsx), line 7, advertises eight foundations. [DesignSystemWorkspace.tsx](../../src/pages/dev/design-system/DesignSystemWorkspace.tsx) repeats `08` and a total of 13 specimens. The foundation page actually renders 12 specimens; the three pages together render 17. The written catalogues contain 18 records.

Roles, consumer lists, colour labels and contrast facts are also repeated between Markdown records and the foundation/component/pattern TSX files. Actual swatches correctly use production tokens, but their displayed facts and descriptions are independent text.

**Consequence.** The interface's “current state” is visibly unreliable even though its real specimens use production source. The issue is repeated maintenance data, not a need to render every token.

**Recommended action.** Prefer removing counts that do not help a decision. If counts are retained, derive specimen counts from the actual specimen definitions and label them as specimens, not the size of the entire reusable system. Avoid introducing another authoritative registry.

Keep the written contract as the owner of detailed boundaries. The workspace can show a short role and clearly labelled example consumers with a link to that record. Only centralize additional facts when doing so removes demonstrable repeated maintenance; do not build a documentation generator for its own sake.

**Completion evidence.** The overview, rail and rendered pages should agree. Do not add tests that lock the current counts or document inventory in place.

### DS7: Some current routing still uses old stylesheet locations

**Evidence.** [The legacy pattern register](../design-system/legacy/PATTERNS.md), line 5, sends readers to `src/styles-*.css` for page styles. Current implementations are under `src/pages/<feature>/`. The [CSS review checklist's top-level buckets](../checklists/CSS-REVIEW.md#top-level-buckets) also retain old page/test-bed stylesheet names, although parts of that document correctly explain that dated leaf evidence is historical.

**Consequence.** Future maintainers can search the wrong locations or confuse a historical inventory with current ownership. This weakens the otherwise useful distinction between source evidence and old review history.

**Recommended action.** Update live orientation and bucket descriptions to current owners when undertaking that documentation cleanup. Preserve explicitly dated historical evidence as historical. Retain the CSS review document: the owner has deferred its removal, and its existence is not the problem described here.

The separate concern about mandatory selector audit comments remains the subject of the earlier instruction review's R8. It does not need to be repackaged as an instruction to remove the workflow in this report.

**Completion evidence.** Current entry points should lead to existing files or clearly described current directories; historical records should remain recognisable as dated evidence.

## Suitability and structure

### A small supported layer is appropriate

Two promoted React components is not inherently too few. The better question is whether people can find and use the recurring roles the site actually has. Article and closing-invitation reuse work well; the specialist hero is the clearest next contract to assess.

Likewise, the workspace stylesheet being larger than the supported CSS is not a defect by itself. It is a sign that the preview environment has a meaningful maintenance cost. Future effort should prioritize reliable component inspection and navigation before adding more decorative workspace structure.

### Keep identity, recurring families and unique composition distinct

A useful operating model is:

| Layer | Expected behaviour |
| --- | --- |
| Identity foundations | Shared fonts, type roles, semantic colours, core behaviour and accessibility expectations. Ordinary pages consume them directly. |
| Recurring component families | Reuse complete structures where the role repeats, such as article heroes and specialist openings. Variants should represent real needs. |
| Content-specific composition | Create interesting local components, arrangements and interactions using the shared identity. Extract only when a recurring need is demonstrated. |

This model already broadly exists in the updated instructions. The next improvement is concrete discoverability and examples, not more abstract policy.

The compatibility table should remain a bounded bridge. When a foundation or control receives a deliberate promotion, its complete current contract should replace the relevant compatibility entry. There is no need to promote all tokens or move all inherited CSS at once.

### Preserve real functional boundaries

The application shell is substantial behaviour, including navigation and mobile interactions; it is not merely a visual wrapper. A future shell promotion should preserve those behaviours and refer to their tests.

`Button` is a deliberately small existing wrapper, not yet a universal action primitive. Its current props do not forward the complete native button/link API, and its disabled behaviour applies to the native-button branch. The baseline correctly calls out the latter. Any broader control contract should follow demonstrated needs rather than adding speculative props.

The private analytics surface should retain its independent presentation boundary. Nothing in the identified design-system problems requires restyling analytics or using it as a source of public components.

### Practical evidence should remain proportionate

The related open work is already represented by `DEBT-37` for reconciliation, `DEBT-15` for global CSS coupling, and `DEBT-20`/`DEBT-21` for typography role review. This report supplies more specific targets; it should not turn those parent items into mandatory prerequisites for ordinary page work.

For a real shared-component change, inspect the affected contract, source, current consumers and relevant states. Run the smallest useful static/behavioural checks and focused rendering. For documentation-only reconciliation, source and link checks are normally enough. Avoid documentation snapshots, tests of hard-coded counts, and mandatory full-site audits.

## Recommended order of work

1. **Reconcile workspace guidance and inventory — DS1 and DS6.** Correct the obsolete policy, expose the compatibility link and remove or derive stale counts. This is a focused development-tool update.
2. **Repair document fragments — DS2.** Make the links into specific rules useful in the local viewer.
3. **Make component previews trustworthy — DS3.** Inspect the current staging geometry and choose a simple full-width or isolated-width preview approach.
4. **Document the existing specialist family — DS4.** Decide its intended reuse boundary and complete only the relevant contract/consumer work.
5. **Clarify extension points — DS5.** Add concise practical usage guidance; change CSS specificity only where an actual repeated problem warrants it.
6. **Refresh live legacy routing — DS7.** Correct current paths while retaining historical records and the CSS-review document.

These are independent, reviewable slices. They do not require a broad design-system rewrite, a new package, a comprehensive visual overhaul or changes to every page.

## Verification and limits of this review

Performed:

- Read current root guidance, design-system governance, active catalogues, legacy registers, related debt and relevant review-workflow instructions.
- Inspected supported CSS, global foundations/actions, both promoted React components, the specialist hero and representative public consumers.
- Inspected all design-system workspace modules and their CSS, document-viewer routing/rendering, development-route registration and existing verification policy.
- Counted catalogue records and actual specimen definitions directly from source.
- Executed the current document-path resolver extracted from source and rendered a heading using the installed Markdown libraries to verify fragment/heading behaviour.
- Scanned public-page font-family declarations and checked relevant source locations.
- Checked this report's repository links and text encoding before completion.

Not performed:

- No development server, browser, viewport sweep, screenshots, production build or broad QA suite.
- No deployed-service, Production or private-analytics verification.
- No implementation, catalogue, policy, skill, tracker or CSS-review changes.

The report establishes source/documentation findings and a focused tool-behaviour result. It does not establish the site's full visual quality, keyboard behaviour, contrast compliance or responsive correctness. DS3 specifically needs rendered inspection before deciding on a production component change.


# Heading hierarchy and SEO scope report

Date: 13 July 2026

Status update: The Kink page heading fix and the site-wide hero migration described below were implemented and verified on 13 July 2026. The ENM approach heading and Contact form heading remain separate follow-up work.

## Conclusion

The proposed Kink page outline is directionally correct, but the issue is broader and slightly different from the original diagnosis.

- This is not a direct Google Search ranking failure. Google says meaningful main headings matter, but semantic heading order itself is primarily an accessibility and document-structure concern.
- The shared hero issue was site-wide. All seven metadata-backed public routes now render `h1.hero-badge` followed by `p.hero-display`, reserving `h2` for actual content sections.
- The Kink page had a confirmed conceptual nesting problem. "No translation needed" and "More than kink" were peer sections in the page composition but were marked up as `h3` subsections. This page-specific problem is now resolved.
- The ENM and polyamory page has a second confirmed hierarchy problem. Its approach principles are `h3` headings without an approach `h2`, so the generated outline makes them children of the preceding topics section.
- The Contact page has a separate known heading-navigation gap. The visible "Enquiry" label is a styled `span`, not a heading or form landmark label. This is already tracked as `SITE-20`.
- The shared FAQ implementation is already correct. "Frequently asked questions" is an `h2`, and every individual question is an `h3`.

Overall assessment: the low-risk, cross-site hero refactor and Kink page correction are resolved. The ENM hierarchy issue remains **P2**, while the existing Contact form gap retains its tracked **P1** priority.

## Audit scope and method

The audit covered:

- all seven metadata-backed public routes;
- the Not Found page and generated `404.html` fallback;
- shared FAQ and enquiry-form markup;
- the active hero CSS, design-system documentation, rendered design-system examples, and heading-related tests;
- generated first-response HTML after a fresh production build.

`npm run build` passed on 13 July 2026 and reported: `Prerendered 7 routes and validated metadata for 7 public routes.` The heading outlines below were extracted from those generated route files, not inferred only from JSX.

Redirect-only routes (`/about` and `/fees`) have no independent content outline. Development routes are not part of the public SEO assessment, but they are included in the implementation impact because they document and demonstrate the shared hero contract.

## Standards and SEO interpretation

The distinction between search impact and semantic quality matters here:

- [Google Search Essentials](https://developers.google.com/search/docs/essentials) recommends putting useful search language in prominent places such as the page title and main heading.
- In [Google Search Central's July 2024 SEO Office Hours](https://developers.google.com/search/help/office-hours/2024/july), Google states that semantic heading order is valuable for screen readers but does not matter to Google Search merely because the levels are out of order.
- [W3C WAI heading guidance](https://www.w3.org/WAI/tutorials/page-structure/headings/) says headings communicate page organisation, lower-ranked headings create subsections, and ranks should reflect the actual relationship between sections.
- [WCAG 2.2 guidance for headings and labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels) explains that headings help people orient themselves and understand relationships between parts of the content. Programmatically exposing those relationships is also relevant to WCAG 1.3.1.

The site already had one descriptive `h1` on every public route, component-rendered first-response HTML, route metadata, canonicals, and indexability rules. Nothing in this audit suggested that search engines could not discover or understand the pages. The completed hero work provides a cleaner assistive-technology outline and a more truthful mapping between the visual composition and the document structure.

## Site-wide pattern

Before migration, every metadata-backed public route began with this semantic pattern:

```text
H1: concise page-topic badge
H2: large expressive hero statement
H2: first major content section
H3: content nested under that section
```

This occurs on:

- `/`
- `/working-with-joel`
- `/inclusion`
- `/inclusion/kink-bdsm`
- `/inclusion/enm-polyamory`
- `/inclusion/lgbtqia`
- `/contact`

The old pattern was deliberate and documented, not accidental:

- `docs/design-system/foundations/tokens.md:38-39` prescribed `h1.hero-badge` followed by `h2.hero-display`.
- `docs/design-system/patterns/page-patterns.md:66-69` repeated the same contract.
- `src/pages/dev/design-system/DS_Heroes.tsx`, `DS_Foundations.tsx`, and `DS_Patterns.tsx` demonstrated it.
- `src/components/DevPageHero.tsx:18-19` implemented it for development pages.
- `tests/public-site.spec.ts:558` explicitly required `.hero-section h2.hero-display` on every metadata-backed route.

An expressive hero `h2` is not automatically invalid. It can describe the hero copy that follows. The problem is that the site also uses headings as a navigable outline, and a creative statement is not consistently a real content section. On pages such as Kink and ENM, subsequent `h3` elements then inherit a misleading parent in the outline.

The active site-wide rule is now:

```text
H1: concise page topic
Styled hero statement: non-heading text, normally <p class="hero-display">
H2: each major content section
H3: genuine subsections, cards, principles, and FAQ questions under an H2
```

The `hero-display` styling is class-based, and the shared rule now owns its serif font directly. The element migration is therefore visually neutral, and no production CSS selector depends on `h2.hero-display`.

## Route-by-route findings

| Route | Finding | Recommended action |
|---|---|---|
| `/` | Resolved. The hero display is non-heading text. The topic, workroom, inclusion, and CTA sections remain coherent `h2`s, with topic and Joel details at `h3`. | No further hero rank changes required. |
| `/working-with-joel` | Resolved. The hero display is non-heading text. "Introducing Joel", "How I work", and "Some of the issues I work with" remain valid peer `h2` sections. | No further hero rank changes required. |
| `/inclusion` | Resolved. The hero display is non-heading text. "Known before you arrive" remains a genuine umbrella `h2`, with the inclusion panels as `h3` children and correct FAQ structure. | No further hero rank changes required. |
| `/inclusion/kink-bdsm` | Resolved on 13 July 2026. The hero display is non-heading text, and "No translation needed", "When therapy gets kink wrong", and "More than kink" are peer `h2` sections. | No further page-level rank changes required. |
| `/inclusion/enm-polyamory` | Hero migration resolved. A separate missing section heading remains: the approach contains three `h3` principles but has no `h2`, so they appear under "Any of the things that bring people to therapy" in the outline. | Make the visible "The approach" label an `h2`, keeping the three principles as `h3`. |
| `/inclusion/lgbtqia` | Resolved. The hero display is non-heading text, removing the near-duplicate heading while leaving the section and FAQ ranks coherent. | No further hero rank changes required. The exact retained `h1` wording remains an optional copy choice. |
| `/contact` | Hero migration resolved. Contact, practical details, and FAQ remain valid `h2` sections. The visible "Enquiry" label is still absent from the heading outline, a separate gap tracked in `SITE-20`. | Implement `SITE-20`, preferably by making "Enquiry" an `h2` that labels the form. |
| Not Found | The client-rendered page has one `h1` and an `h2` for recovery routes. The generated fallback contains one `h1`. Both are coherent for a `noindex` error page. | No change required. |

The three Inclusion child routes are currently `noindex, nofollow`, but their heading semantics still affect visitors. Their hero semantics are corrected; the separate ENM approach gap remains to be addressed before those pages become indexable.

## Detailed findings

### P2, resolved: Shared hero statements were encoded as sections on every public route

Locations:

- `src/pages/Home.tsx:202-207`
- `src/pages/WorkingWithJoel.tsx:200-207`
- `src/pages/InclusivePractice.tsx:159-169`
- `src/pages/KinkBdsmCounselling.tsx:157-158`
- `src/pages/EnmPolyamoryCounselling.tsx:230-235`
- `src/pages/LgbtqiaCounselling.tsx:100-101`
- `src/pages/Contact.tsx:165-171`

Previous impact:

- Screen-reader heading lists include a large creative line as though it begins a major section.
- On otherwise well-structured pages this is mostly noise, not a broken outline.
- On Kink and ENM it helps create false parent-child relationships for later `h3` headings.
- The direct Google Search impact is low. The pages retain a meaningful `h1`, useful visible copy, and complete prerendered HTML.

Implemented resolution:

- Every route retains exactly one descriptive `h1`.
- Every expressive line now renders as `<p className="hero-display">`.
- The `.hero-display` class and existing inline `span`, `em`, and `br` structures are preserved.
- The active design-system contract, examples, shared CSS, and tests now use the same rule.

### P2, resolved: Kink page peer sections were marked as parent and child sections

Locations:

- `src/pages/KinkBdsmCounselling.tsx:175`
- `src/pages/KinkBdsmCounselling.tsx:205`
- `src/pages/KinkBdsmCounselling.tsx:217`

Previous generated outline:

```text
H1 Kink & BDSM-aware counselling
  H2 Therapy where kink doesn't need a preamble.
    H3 No translation needed.
  H2 When therapy gets kink wrong.
    H3 More than kink.
  H2 Frequently asked questions
    H3 individual FAQ questions
```

The visual composition presents "No translation needed", "When therapy gets kink wrong", and "More than kink" as separate peer ideas. The old ranks instead announced the first and third as subsections of unrelated preceding headings.

Implemented outline:

```text
H1 Kink & BDSM-aware counselling
Styled hero statement Therapy where kink doesn't need a preamble.
H2 No translation needed.
H2 When therapy gets kink wrong.
H2 More than kink.
H2 Frequently asked questions
  H3 individual FAQ questions
```

The closing-card title now uses the class-based `.kink-page__closing-card-title` selector. The large hero statement keeps `.hero-display`, whose shared rule now owns the serif declaration and preserves its former visual treatment after changing from `h2` to `p`.

### P2: ENM approach principles have no `h2` parent

Locations:

- `src/pages/EnmPolyamoryCounselling.tsx:311-334`
- `src/pages/EnmPolyamoryCounselling.tsx:314` contains the visible "The approach" label as a `span`.
- `src/pages/EnmPolyamoryCounselling.tsx:328` renders each principle as `h3`.

Current relevant outline:

```text
H2 Any of the things that bring people to therapy.
  H3 topic headings
  H3 No structural preference
  H3 Complexity can stay complex
  H3 Feelings before verdicts
H2 Individual therapy can still hold a complicated picture.
```

The three principles belong to the approach section, not the topics section.

Recommended target:

```text
H2 Any of the things that bring people to therapy.
  H3 topic headings
H2 The approach
  H3 No structural preference
  H3 Complexity can stay complex
  H3 Feelings before verdicts
H2 Individual therapy can still hold a complicated picture.
```

The smallest change is to render the existing visible "The approach" eyebrow as `<h2 className="site-eyebrow">`. The quote can remain the expressive visual statement beneath it.

### P1, already tracked: Contact enquiry form is skipped by heading navigation

Locations:

- `src/components/EnquiryForm.tsx:148-156`
- `docs/project/site-backlog.md`, `SITE-20`

The form begins with `<span className="site-eyebrow">Enquiry</span>`. In the initial page state, heading navigation moves from "Practical details" directly to "Frequently asked questions" and does not expose the enquiry form as a named section.

Recommendation:

- Prefer an `h2` for the visible "Enquiry" title and associate it with the form using `aria-labelledby` if needed.
- Preserve the existing success-state `h2`, but ensure the change does not create two competing form headings when the success state replaces the form fields.
- Complete and close `SITE-20` as part of the same semantic pass if scope permits.

### P3, resolved: Tests and design-system guidance enforced the old semantic contract

The public pages do not share one production Hero React component, so the seven page files were updated individually. The old contract was also replaced across documentation, development components, rendered examples, CSS comments, and tests.

Affected support surfaces include:

- `docs/design-system/foundations/tokens.md`
- `docs/design-system/patterns/page-patterns.md`
- `docs/design-system/current-scope.md`
- `src/styles.css:2208-2222`
- `src/components/DevPageHero.tsx`
- `src/pages/dev/DesignLanguage.tsx`
- `src/pages/dev/design-system/DS_Foundations.tsx`
- `src/pages/dev/design-system/DS_Heroes.tsx`
- `src/pages/dev/design-system/DS_Patterns.tsx`
- `tests/public-site.spec.ts:556-558`

Implemented resolution:

- Documentation now calls `.hero-display` an expressive hero statement.
- `.hero-display` remains active design-system API on a paragraph element.
- Public-route tests require one visible `p.hero-display` and reject `h2.hero-display`.
- Kink retains focused heading-outline assertions. ENM and Contact still need assertions with their separate fixes.

## What does not need changing

- `FaqSection.tsx` already renders the FAQ title as `h2` and each question as `h3`.
- `FaqSchema.tsx` and FAQ structured data do not need to change.
- Route titles, descriptions, canonicals, robots rules, and sitemap membership are outside this heading fix.
- The `hero-display` typography, colour, width variables, and page-specific visual compositions can remain unchanged.
- No new shared production Hero component is required merely to make this semantic correction.
- The Not Found page and redirect routes need no heading work.

## Recommended implementation scope

The focused cross-site semantic refactor is complete. The remaining work is limited to the separate ENM and Contact findings.

Recommended order:

1. Completed: change all seven public `h2.hero-display` elements to `p.hero-display`.
2. Completed: promote "No translation needed" and "More than kink" to `h2` on the Kink page, preserving their visual treatment.
3. Add the missing ENM approach `h2`, keeping its three principle titles as `h3`.
4. Implement the existing `SITE-20` Contact form heading if the semantic pass includes the Contact flow.
5. Completed: update active design-system documentation, rendered examples, CSS comments, and heading tests.
6. Completed: rebuild and compare the generated public heading outlines.
7. Recheck the affected pages in a browser with heading navigation, axe, mobile layout, and JavaScript disabled.
8. Update the relevant `LAUNCH-1` accessibility checklist notes and `LAUNCH-3` semantic-clarity notes after verification.

## Acceptance criteria

- Every public route has exactly one descriptive `h1`.
- `.hero-display` preserves its current visual role but is absent from the accessibility heading outline.
- Every `h3` has a truthful relationship to the nearest preceding `h2`.
- Kink exposes "No translation needed", "When therapy gets kink wrong", and "More than kink" as peer `h2` sections.
- ENM exposes a distinct approach `h2` above its three `h3` principles.
- Contact exposes the enquiry form through a semantic heading or an equivalently clear named landmark.
- FAQ titles remain `h2` and FAQ questions remain `h3`.
- Prerendered and hydrated outlines match.
- The visual hierarchy and responsive layout do not change unintentionally.
- `npm run build` and the affected public-site tests pass.

## Final recommendation

The non-heading hero statement pattern is now adopted across the full public site, and the Kink page-specific relationships are fixed. The remaining ENM and Contact findings should still be treated as semantic and accessibility quality work, not as likely search-ranking penalties.

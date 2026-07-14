# Contact enquiry form heading-navigation brief

Date: 14 July 2026

Status: **Implemented and verified on 14 July 2026.**

Tracker: `SITE-20` in `docs/project/site-backlog.md`

## Problem

The Contact page presents “Enquiry” visually above the enquiry form, but `EnquiryForm` renders it as:

```tsx
<span className="site-eyebrow">{content.eyebrow}</span>
```

The text is therefore absent from the page heading outline. The `<form>` also has no accessible name, so heading and landmark navigation do not provide a direct semantic route to this important section.

This is primarily an accessibility and document-structure issue, not a direct SEO ranking problem.

## Recommended implementation

1. Give the form heading a stable ID derived from `idPrefix`, for example `${idPrefix}-form-heading`.
2. In the idle, sending and error states, render the existing “Enquiry” text as an `h2` with `className="site-eyebrow site-form__heading"`.
3. Add a shared `.site-form__heading` rule that preserves the current label's sans-serif typography, cedar colour and inherited line-height. Do not assume `.site-eyebrow` alone is element-neutral: the global `h2` and `.site-page h2` rules otherwise change the font family, line-height and colour.
4. Add `aria-labelledby` to the `<form>` using the heading ID in every state where the form controls are present. This exposes the form as a landmark named “Enquiry”.
5. In the success state, replace the “Enquiry” heading with the existing success `h2` inside the focused status content. Do not render both headings at the same time.
6. Do not require the success-only content to remain a named form landmark after the form controls have been removed. Prefer rendering the completed state in a non-form status or section container. If the existing `<form>` wrapper is retained for the completed state, remove its accessible name and ensure it has no dangling `aria-labelledby` reference.
7. Preserve the existing success-status focus movement, submission behaviour, form payload, native form fallback and Clarity masking.

## Acceptance criteria

- In the idle, sending and error states, “Enquiry” is an `h2` and the form has the accessible name “Enquiry”.
- The server-rendered, no-JavaScript and hydrated Contact page expose the same initial form heading and landmark name.
- The heading is a peer Contact-page section, and the wider heading order remains coherent.
- The error state keeps the “Enquiry” heading and named form landmark while exposing the existing alert.
- After successful submission, the completed form area contains exactly one relevant `h2`, focus still moves to the success status, and no accessible-name attribute references a missing element.
- Success-only confirmation content is not exposed as a misleading form landmark when it no longer contains form controls.
- The heading's visual presentation matches the current `span.site-eyebrow` treatment at supported desktop and mobile widths, including font family, colour, size, weight, line-height and spacing.
- Focused Playwright coverage protects the prerendered, no-JavaScript, hydrated initial, error and success-state semantics.
- The Contact page continues to pass the existing serious-impact axe smoke check.

## Verification coverage

- Extend the raw prerendered Contact contract to assert the heading ID, `h2` markup and initial `aria-labelledby` relationship.
- In the JavaScript-disabled Contact test, assert that the form is exposed with the accessible name “Enquiry” and contains the level-two “Enquiry” heading.
- In the hydrated Contact flow, assert the same initial heading and form name.
- Extend the existing failed-submission test to confirm that the heading and form name remain present alongside the alert.
- Extend the existing successful-submission test to confirm the focused status, the single success `h2`, the absence of the initial “Enquiry” heading and the absence of a stale or misleading form landmark.
- Compare the affected form at supported desktop and mobile widths because the project does not have visual-regression testing.

## Documentation closure

- `SITE-20` is archived as implemented in `docs/project/site-backlog.md`.
- The Contact heading-order result is `Pass` in `docs/checklists/accessibility-launch.md`.
- `LAUNCH-1` now records the resolved heading gap and retains `SITE-21` as the remaining Contact form-clarity item.
- `.site-form__heading` is documented in `docs/design-system/patterns/page-patterns.md`.
- `docs/project/current-scope.md` now records the strengthened mocked form-flow and semantic browser coverage; no design-system current-scope update was required because the shared form system did not change scope.
- No task-log entry was required for this focused semantic correction.

## Non-goals

- Changing the form’s visitor-facing copy or visual hierarchy.
- Addressing required-field clarity tracked separately as `SITE-21`.
- Changing enquiry validation, submission, API or success-focus behaviour.
- Applying the broader site-wide hero or Inclusion-page heading work.

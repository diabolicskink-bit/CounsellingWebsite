# Contact enquiry form heading-navigation brief

Date: 14 July 2026

Status: **Open — documentation only. No implementation is included in this report.**

Tracker: `SITE-20` in `docs/project/site-backlog.md`

## Problem

The Contact page presents “Enquiry” visually above the enquiry form, but `EnquiryForm` renders it as:

```tsx
<span className="site-eyebrow">{content.eyebrow}</span>
```

The text is therefore absent from the page heading outline. The `<form>` also has no accessible name, so heading and landmark navigation do not provide a direct semantic route to this important section.

This is primarily an accessibility and document-structure issue, not a direct SEO ranking problem.

## Recommended implementation

1. Give the form heading a stable ID derived from `idPrefix`.
2. In the normal and error states, render the existing “Enquiry” text as an `h2` with `className="site-eyebrow"` so its visual treatment does not change.
3. Add `aria-labelledby` to the `<form>` using that heading ID, exposing it as a named form landmark.
4. In the success state, replace the “Enquiry” heading with the existing success `h2`, reusing the form-heading ID or updating `aria-labelledby` to point to it.
5. Do not render both “Enquiry” and the success title as competing form-level `h2` headings after submission.
6. Preserve the existing success-status focus movement, submission behaviour, form payload and Clarity masking.

## Acceptance criteria

- Before submission, “Enquiry” is an `h2` and the form has the accessible name “Enquiry”.
- The server-rendered, no-JavaScript and hydrated Contact page expose the same form heading.
- The heading is a peer Contact-page section, and the wider heading order remains coherent.
- After successful submission, the form contains one relevant `h2`, the named form landmark remains valid, and focus still moves to the success status.
- The visual presentation is unchanged at supported desktop and mobile widths.
- Focused Playwright coverage protects the initial and success-state semantics.
- The Contact page continues to pass the existing serious-impact axe smoke check.

## Documentation closure

When the implementation is verified:

- complete `SITE-20` in `docs/project/site-backlog.md`;
- update the Contact heading-order result in `docs/checklists/accessibility-launch.md`;
- record the durable semantic change in `docs/project/task-log.md` if required by the project logging rules.

## Non-goals

- Changing the form’s visitor-facing copy or visual hierarchy.
- Addressing required-field clarity tracked separately as `SITE-21`.
- Changing enquiry validation, submission, API or success-focus behaviour.
- Applying the broader site-wide hero or Inclusion-page heading work.

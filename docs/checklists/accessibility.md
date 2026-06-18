# Launch Accessibility Checklist

This is the working checklist for `SITE-1`. It is meant to be readable in raw markdown and in the dev Documents reader.

It is not a replacement for automated tests. It is the place to record what has actually been checked before launch, what still needs manual review, and which tracker item owns any known gap.

## Status Labels

- `Not checked`: No route-level review has been recorded yet.
- `Pass`: Checked and acceptable for launch.
- `Partial`: Mostly acceptable, with one or more tracked gaps.
- `Fail`: A launch-relevant issue exists and needs work before launch.
- `N/A`: The check does not apply to this route.

## How To Use This Checklist

- Work one route at a time.
- Prefer evidence over vibes: link the test, note the browser/device, or name the manual check.
- Keep notes short. If a note starts becoming a plan, create or link a `SITE-*` or `DEBT-*` item.
- Do not mark a route `Pass` until keyboard, focus, layout, readable copy, and route-specific interaction checks have been reviewed.

## Standard Checks

Use these checks for every public route unless marked `N/A`.

- `A1` - One visible main landmark.
- `A2` - One visible page-level `h1`, with sensible heading order after it.
- `A3` - Header, footer, links, buttons, and route-specific controls are reachable by keyboard.
- `A4` - Focus states are visible and do not get clipped or hidden.
- `A5` - Text contrast is acceptable in normal, hover, focus, and active states.
- `A6` - Layout works at mobile width and at 200 percent browser zoom without horizontal scrolling.
- `A7` - Motion is either minimal or respects reduced-motion expectations.
- `A8` - Images, icons, and decorative media have intentional accessible text or are correctly hidden.
- `A9` - Forms, validation, success, and error states are labelled and announced where relevant.
- `A10` - Page-specific widgets use appropriate semantics and state.

## Launch Summary

- [ ] `/` - Home: `Not checked`
- [ ] `/working-with-joel` - Working with Joel: `Not checked`
- [ ] `/inclusion` - Inclusion hub: `Not checked`
- [ ] `/inclusion/kink-bdsm` - Kink and BDSM: `Not checked`
- [ ] `/inclusion/enm-polyamory` - ENM and polyamory: `Not checked`
- [ ] `/inclusion/lgbtqia` - LGBTQIA+: `Not checked`
- [ ] `/contact` - Contact and fees: `Not checked`
- [ ] Not-found route: `Not checked`

## Cross-Site Follow-Ups

- `SITE-7` - Global reduced-motion baseline.
- `DEBT-29` - Route changes lack focus restoration and a skip-link baseline.
- `DEBT-30` - Shared navigation disclosure semantics are CSS-driven and untested.

## Route Checks

### `/` - Home

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts`.
- Automated: serious axe smoke coverage currently includes this route.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, topic links, inclusion links, and CTAs.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A8` - Portrait/media accessibility is intentional.

Notes:

- Home uses decorative portrait imagery with a visible name tag. Confirm that remains the intended accessible treatment.

Follow-up:

- `SITE-7`, `DEBT-29`, `DEBT-30`

### `/working-with-joel` - Working with Joel

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts`.
- Automated: broad-tab behaviour has browser coverage in `tests/public-site.spec.ts`.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, portrait area, and approach tabs.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A8` - Portrait/media accessibility is intentional.
- [ ] `A10` - Approach tabs expose correct tablist, tab, selected state, and panel semantics.

Notes:

- The approach tabs are the highest-risk interaction on this route.

Follow-up:

- `SITE-7`, `DEBT-29`, `DEBT-30`

### `/inclusion` - Inclusion Hub

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts`.
- Automated: serious axe smoke coverage currently includes this route.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, hero topic links, panel links, and FAQ controls.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A10` - FAQ controls expose expanded state and usable answer regions.

Notes:

- FAQ behaviour should be checked with keyboard and screen-reader semantics, not only visual expansion.

Follow-up:

- `SITE-7`, `DEBT-29`, `DEBT-30`

### `/inclusion/kink-bdsm` - Kink And BDSM

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts`.
- Automated: serious axe smoke coverage currently includes this route.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, CTA, language field, and FAQ controls.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A10` - FAQ controls expose expanded state and usable answer regions.

Notes:

- The language field is visual and non-interactive. Confirm it reads acceptably as grouped content.

Follow-up:

- `SITE-7`, `DEBT-29`, `DEBT-30`

### `/inclusion/enm-polyamory` - ENM And Polyamory

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts`.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, hub link, inline links, CTA, and FAQ controls.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A10` - FAQ controls expose expanded state and usable answer regions.

Notes:

- Complete `SITE-9` before this route can be treated as launch-ready.

Follow-up:

- `SITE-7`, `SITE-9`, `DEBT-29`, `DEBT-30`

### `/inclusion/lgbtqia` - LGBTQIA+

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts`.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, breadcrumbs, CTAs, inline links, checklist items, and FAQ controls.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A8` - Check icons are decorative or otherwise intentionally handled.
- [ ] `A10` - FAQ controls expose expanded state and usable answer regions.

Notes:

- Breadcrumb and check-panel reading order should be checked at mobile widths.

Follow-up:

- `SITE-7`, `DEBT-29`, `DEBT-30`

### `/contact` - Contact And Fees

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts`.
- Automated: serious axe smoke coverage currently includes this route.
- Automated: safe public form error copy has browser coverage in `tests/public-site.spec.ts`.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, email link, form controls, radio groups, selects, submit, and FAQ controls.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A9` - Required fields, radio groups, conditional fields, success state, and error state are labelled and announced clearly.
- [ ] `A10` - FAQ controls expose expanded state and usable answer regions.

Notes:

- This is the highest-risk accessibility route because it contains the public enquiry form.

Follow-up:

- `SITE-6`, `SITE-7`, `DEBT-29`, `DEBT-30`

### Not-Found Route

Status: `Not checked`

Evidence:

- Automated: one main landmark is covered by `tests/public-site.spec.ts` for not-found boundary routes.

Checklist:

- [ ] `A1` - One main landmark.
- [ ] `A2` - Page heading and heading order.
- [ ] `A3` - Keyboard access through header, footer, recovery links, and CTAs.
- [ ] `A4` - Visible focus states.
- [ ] `A5` - Contrast check.
- [ ] `A6` - Mobile and 200 percent zoom check.
- [ ] `A7` - Reduced-motion expectation.
- [ ] `A8` - Decorative 404 mark is hidden from assistive technology.

Notes:

- Confirm requested-address text wraps cleanly for long or malformed paths.

Follow-up:

- `SITE-7`, `DEBT-29`, `DEBT-30`

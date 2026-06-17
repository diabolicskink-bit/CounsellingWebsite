# Current Project Scope

This is the factual current scope of the Vive Counselling website and supporting app. Keep design-system inventory in `docs/design-system/current-scope.md`.

## Included

- Vite, React, and TypeScript power a public counselling website for Vive Counselling.
- Public routes include Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, Contact/Fees, and the Not Found page.
- `/about` redirects to Working with Joel, and `/fees` redirects to Contact/Fees.
- Public navigation includes Home, Working with Joel, Inclusion child pages, and Fees.
- Development-only routes include the rendered design-system pages, Documents, Codex test bed, and Opus test bed.
- The dev Documents page imports markdown only from `docs/reports/` and `docs/plans/` and renders those reports and draft plans through the app in development.
- Root project guidance now lives under `docs/project/`; visual-system guidance lives under `docs/design-system/`.
- The design system has rebuilt written docs, rendered dev pages, shared components, shared CSS class layers, and cleanup guidance.
- Public-page content and product positioning are governed by `docs/project/product-direction.md`.
- Route metadata exists in `src/data/routeMetadata.json` and is applied by `useDocumentMetadata`.
- A prerender script updates route metadata artifacts as part of `npm run build`.
- Public assets include favicons, app icons, a web manifest, an OG image, and portrait/media assets under `public/`.
- The Contact/Fees page uses the shared `EnquiryForm` component and data from `src/data/enquiry.ts`.
- The enquiry form submits to the serverless `/api/enquiry` endpoint.
- The TypeScript enquiry API validates structured form fields server-side, builds the email subject/reply-to/plain text/HTML from the validated payload, and sends email through Resend when configured.
- Basic honeypot spam protection exists for enquiry submissions.
- Vercel Analytics is rendered by the app, and Google Tag Manager is loaded from `index.html`.
- Playwright public-site tests exist under `tests/public-site.spec.ts`, including one-main-landmark contract coverage for public and not-found boundary routes.
- Direct Node API tests cover accepted and rejected enquiry submissions under `tests/api/`.
- The public-site QA gate, `npm run qa:site`, builds the app, starts the QA preview server, and passes the Playwright public-site suite locally.
- The aggregate QA command, `npm run qa`, runs the build, direct API tests, and public-site Playwright suite.
- Test tooling includes axe checks through Playwright and Lighthouse audit scripts.
- Build tooling includes TypeScript build for `src`, Vite build, and route metadata prerendering.
- The TypeScript build includes the `api/` serverless endpoint.
- Vercel deployment configuration exists in `vercel.json` with clean URLs and redirects.

## Partially Included / Known Gaps

- Enquiry spam protection is minimal and should not be treated as complete abuse protection.
- Enquiry timezone comparison notes are not yet generated from canonical server-owned timezone logic.
- The form declares a native action/method path, but the API does not currently support a true no-JavaScript form post with native field names.
- API error responses can expose technical/provider details to visitors.
- Route definitions, route metadata, prerendering, and tests are not yet unified behind one manifest.
- Type checking does not currently cover tests, scripts, and most config files.
- Vercel clean URL and fallback behaviour is not directly exercised by the local QA command.
- Accessibility support exists in components and tests, but there is no complete accessibility status matrix.
- Responsive styling exists, but there is no formal responsive QA matrix.
- Performance tooling exists, but Lighthouse budgets are not enforced.
- Analytics are active in local/test contexts unless separately blocked by the test environment.

## Not Included Yet

- CMS integration.
- Blog or article publishing system.
- Online booking or scheduling integration.
- Payments.
- Authentication or admin editing.
- Visitor accounts.
- Dark mode.
- Storybook or an external component explorer.
- Visual regression testing.
- Complete accessibility audit matrix.
- Complete responsive QA matrix.
- Complete public-page SEO/content QA matrix.
- Form-flow browser tests with mocked API outcomes.
- Dedicated production deployment smoke tests against Vercel preview behaviour.

## Explicitly Out Of Scope Unless Requested

- Full redesign.
- Wholesale public copy rewrite.
- New brand identity, palette, or typefaces.
- Framework migration.
- Tailwind or CSS-framework migration.
- CMS migration.
- Booking, payment, account, or client-portal features.
- Broad design-system rewrite.
- Expanding dev/test-bed routes into public pages.

## Update Rule

Update this file when work changes current public routes, dev routes, form/API behaviour, metadata, deployment assumptions, testing coverage, documentation structure, or the list of known missing areas.

Do not update this file for tiny code changes that do not change project scope.

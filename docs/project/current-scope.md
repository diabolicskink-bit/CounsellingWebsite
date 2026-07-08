# Current Project Scope

This is the factual current scope of the Vive Counselling website and supporting app. Keep design-system inventory in `docs/design-system/current-scope.md`.

## Included

- Vite, React, and TypeScript power a public counselling website for Vive Counselling.
- Public routes include Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, Contact/Fees, and the Not Found page.
- `/about` redirects to Working with Joel, and `/fees` redirects to Contact/Fees.
- Public navigation includes Home, Working with Joel, Inclusion child pages, and Fees.
- Development-only routes include the rendered design-system pages, Documents, Codex test bed, and Opus test bed.
- The dev Documents page imports markdown from `docs/checklists/`, `docs/reports/`, and `docs/plans/` and renders checklists, reports, and draft plans through the app in development; exact inline checklist status labels render as quiet coloured badges.
- Root project guidance now lives under `docs/project/`; visual-system guidance lives under `docs/design-system/`.
- Launch readiness gates, review passes, and acceptance checks are tracked separately in `docs/project/launch-readiness.md` with stable `LAUNCH-*` IDs.
- The design system has rebuilt written docs, rendered dev pages, shared components, shared CSS class layers, and cleanup guidance.
- Public-page content and product positioning are governed by `docs/project/product-direction.md`.
- Route metadata exists in `src/data/routeMetadata.json` and is applied by `useDocumentMetadata`.
- A prerender script updates route metadata artifacts, sitemap, robots, and the app-powered `404.html` fallback as part of `npm run build`.
- Temporary pre-launch indexability controls are active: generated public route HTML includes `noindex, nofollow`, `vercel.json` adds a matching `X-Robots-Tag` header, `sitemap.xml` is intentionally empty, and `robots.txt` allows crawling without advertising the sitemap so crawlers can read the page-level noindex directive.
- `vivecounselling.com.au` and `www.vivecounselling.com.au` are assigned to the Vercel project; `www` is configured as a permanent redirect to the apex domain, but registrar DNS propagation/configuration is still pending.
- Production metadata defaults to the stable Vercel canonical origin `https://counselling-website-seven.vercel.app`; `SITE_URL` can override this when a custom canonical domain is ready.
- Public assets include favicons, app icons, a web manifest, and portrait/media assets under `public/`.
- The Contact/Fees page uses the shared `EnquiryForm` component and data from `src/data/enquiry.ts`.
- Public contact display and enquiry fallback/failure messaging use `joel@vivecounselling.com.au`.
- The enquiry form submits to the serverless `/api/enquiry` endpoint.
- The TypeScript enquiry API validates structured form fields server-side, supports endpoint-level URL-encoded native form posts, builds the email subject/reply-to/plain text/HTML from the validated payload, formats the verified sender address with the visitor name as the email display name, and sends email through Resend when configured.
- The enquiry API rejects unsupported content types, multipart posts, oversized declared bodies above 25KB, and explicit cross-site fetch/origin/referer signals before validation or email delivery.
- Enquiry API failures return generic visitor-safe public errors, while provider/configuration/runtime diagnostics stay in server logs.
- Basic honeypot spam protection exists for enquiry submissions.
- Vercel Analytics is rendered by the app when analytics are enabled, and `SiteAnalytics` injects Google Analytics `gtag.js` with manual public-route `page_view` events for React Router navigation.
- Playwright public-site tests exist under `tests/public-site.spec.ts`, including one-main-landmark contract coverage for public and not-found boundary routes plus generated metadata, sitemap, robots, and 404 fallback artifact coverage.
- Direct Node API tests cover accepted and rejected enquiry submissions under `tests/api/`.
- Direct Node script tests cover route metadata origin policy under `tests/scripts/`.
- The public-site QA gate, `npm run qa:site`, builds the app, starts the QA preview server, and passes the Playwright public-site suite locally.
- The opt-in analytics QA gate, `npm run qa:analytics`, builds with a fake Google Analytics measurement ID and verifies manual SPA route-change pageview calls without loading third-party analytics scripts.
- The aggregate QA command, `npm run qa`, runs encoding checks, direct script tests, the build, direct API tests, and the public-site Playwright suite.
- Static encoding checks run through `npm run check:encoding` and are included in `npm run qa` and `npm run qa:site`.
- Test tooling includes axe checks through Playwright and Lighthouse audit scripts.
- Build tooling includes TypeScript build for `src`, Vite build, and route metadata prerendering.
- The TypeScript build includes the `api/` serverless endpoint.
- Vercel deployment configuration exists in `vercel.json` with clean URLs, trailing-slash redirects, and public alias redirects.

## Partially Included / Known Gaps

- Enquiry spam protection includes a honeypot and conservative request-shape checks, but does not include platform rate limiting or complete abuse protection.
- Enquiry timezone comparison notes are not yet generated from canonical server-owned timezone logic.
- Endpoint-level native form posts are supported, but full JavaScript-disabled public-page rendering is not; the current Vite app still renders the contact form through client-side React.
- Route metadata references a social sharing image that is not currently present in `public/`.
- Route definitions, route metadata, prerendering, and tests remain separate by design for this small route set; explicit route parity coverage is still tracked as debt.
- Type checking does not currently cover tests, scripts, and most config files.
- Vercel clean URL config and generated app 404 fallback are covered locally, but live Vercel smoke testing is not automated.
- Accessibility support exists in components and tests, and `docs/checklists/accessibility-launch.md` provides the working route-by-route checklist for `LAUNCH-1`, but the launch accessibility review is not complete.
- Responsive styling exists, but the `LAUNCH-2` responsive review is not complete.
- Performance tooling exists, but Lighthouse budgets are not enforced.
- The analytics launch environment policy is not signed off yet; `LAUNCH-5` still needs to confirm production, preview, local, test, and GA4 admin-setting behaviour before launch.

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
- Completed `LAUNCH-*` review passes for accessibility, responsive layout, public SEO/metadata, performance, analytics policy, enquiry flow, final public copy, and launch domain readiness.
- Form-flow browser tests with mocked API outcomes.
- Dedicated live Vercel production or preview smoke tests.

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

# Current Project Scope

This is the factual current-state summary of the Vive Counselling website and supporting app. Design-system inventory is maintained separately in `docs/design-system/current-scope.md`.

## Application And Routes

- Vite, React, and TypeScript power the public counselling website.
- Public routes include Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, Contact/Fees, and Not Found.
- The three Inclusion child routes remain directly accessible draft pages.
- `/about` redirects to Working with Joel, and `/fees` redirects to Contact/Fees.
- Public navigation includes Home, Working with Joel, Inclusion, and Fees. Inclusion child-page links appear only in local development builds.
- Development-only routes include the rendered design-system pages, Documents, Codex test bed, and Opus test bed.
- The development Documents page imports Markdown from `docs/checklists/`, `docs/reports/`, and `docs/plans/`; exact inline checklist status labels render as quiet coloured badges.

## Public Content And Discoverability

- Public copy is under active owner-led revision. Existing page source is implementation state rather than an approved voice corpus; current copy status and wording constraints are recorded in `docs/project/writing-direction.md`.
- Online delivery remains a factual part of the service. The current constraint on foregrounding it in visible copy or metadata is owned by `docs/project/writing-direction.md`.
- Route metadata is stored in `src/data/routeMetadata.json` and applied by `useDocumentMetadata`.
- Home, Working with Joel, Inclusion, and Contact/Fees are indexable. Their generated HTML omits `noindex`, and `sitemap.xml` advertises those four canonical URLs.
- The three draft Inclusion child routes are excluded from production links and sitemap output and use route-level `noindex, nofollow` metadata.
- `robots.txt` allows crawling and references the sitemap.
- Production metadata defaults to `https://vivecounselling.com.au`; `SITE_URL` can override the origin for an intentional alternate environment.
- The apex and `www` domains are assigned to the Vercel project. `www` permanently redirects to the apex domain, and DNS resolves to Vercel.
- Homepage JSON-LD includes linked `WebSite`, `Organization`, `Person`, and `Service` entities for the confirmed public business, practitioner, contact, directory identity, and counselling service facts.
- Working with Joel metadata adds a `ProfilePage` whose `mainEntity` is the same `Person` and includes the confirmed ECU and ACA credential details.
- Delivery channel, pricing, address, and local-business structured data are not currently included.
- Public assets include favicons, app icons, a web manifest, a shared social preview image, and portrait/media assets under `public/`.

## Rendering, Build, And Deployment

- Browser and static entry points share the same route/application tree, Strict Mode boundary, and serializable initial-render timestamp contract.
- `npm run build` creates a disposable Vite SSR bundle under `.prerender/server` and imports it while prerendering every metadata-backed public route.
- Generated route HTML contains component-rendered header, page, navigation, and footer markup in the first response.
- The controlled `404.html` artifact uses dedicated generic not-found fallback markup.
- The browser hydrates only when the prerendered route marker, valid build timestamp, and normalized pathname match. Development roots, stale or mismatched artifacts, unknown paths, and `404.html` use the client-render fallback.
- The prerender process updates generated route HTML, metadata artifacts, sitemap, robots, and the app-powered `404.html` fallback.
- The build fails when a metadata-backed route is absent from the component prerender set.
- TypeScript checking covers the application and the TypeScript serverless API.
- `vercel.json` defines clean URLs, trailing-slash redirects, and public alias redirects.

## Enquiry Flow And API

- Contact/Fees uses the shared `EnquiryForm` component and `src/data/enquiry.ts`.
- The page displays fixed Perth business hours in AWST. Interstate comparison notes start from the generated route timestamp and refresh in the browser when daylight-saving differences have changed since deployment.
- Consult-request timezone options are calculated when the conditional timezone field opens.
- Public contact display and enquiry fallback/failure messaging use `joel@vivecounselling.com.au`.
- The form submits to the serverless `/api/enquiry` endpoint and supports endpoint-level URL-encoded native form posts.
- JavaScript-disabled visits expose the full server-rendered Contact form and component markup on every metadata-backed public route.
- The TypeScript endpoint validates structured fields server-side, builds the subject, reply-to, plain text, and HTML from the validated payload, formats the verified sender address with the visitor name as its display name, and sends through Resend when configured.
- The endpoint rejects unsupported content types, multipart posts, declared bodies above 25 KB, and explicit cross-site fetch, origin, or referer signals before validation or delivery.
- Public failure responses remain generic while provider, configuration, and runtime diagnostics stay in server logs.
- Basic honeypot spam protection is active.

## Analytics

- Vercel Analytics renders when analytics are enabled and the runtime hostname is allowed.
- `SiteAnalytics` loads Google Analytics when `VITE_GA_MEASUREMENT_ID` is configured and sends manual public-route `page_view` events.
- Microsoft Clarity loads when `VITE_CLARITY_PROJECT_ID` is configured.
- The default analytics host allowlist includes the canonical apex and `www`; `VITE_ANALYTICS_ALLOWED_HOSTS` supports intentional alternate QA environments.
- The enquiry form uses `data-clarity-mask="true"` so Clarity does not capture form content.

## Testing And QA

- `tests/public-site.spec.ts` covers public landmarks, raw and JavaScript-disabled output, hydration, shared mobile-navigation Escape/focus/scroll-lock behaviour, focused Home semantics and CTA ownership, Working with Joel tab interaction and axe checks, Contact timezone behaviour, conditional enquiry fields and payloads, success/error states, form semantics, flat and nested artifacts, SPA navigation, fallback activation, generated metadata, sitemap, robots, and the 404 artifact.
- Direct Node tests under `tests/api/` cover accepted and rejected enquiry submissions.
- Direct Node tests under `tests/scripts/` cover route-metadata origin policy.
- `npm run qa:site` builds the app, starts the QA preview server, and runs the Playwright public-site suite.
- `npm run qa:analytics` builds with fake analytics identifiers and verifies Google Analytics SPA pageviews and the Clarity script path without loading third-party scripts.
- `npm run qa` runs encoding checks, direct script tests, the build, direct API tests, and the public-site Playwright suite.
- `npm run check:encoding` is also included in `npm run qa` and `npm run qa:site`.
- Test tooling includes Playwright axe checks and Lighthouse audit scripts.

## Known Gaps

- Enquiry protection does not include platform rate limiting or complete abuse protection.
- The 404 build and local-preview contract is verified, but repeatable post-deploy confirmation remains manual under `DEBT-24`.
- Route definitions, metadata, prerendering, and tests remain separate; explicit route-parity enforcement is tracked as debt.
- The Working with Joel approach tabs work after hydration, but only the initially active Psychodynamic explanation is present before JavaScript; progressive access to the Attachment and Integrative copy is tracked under `DEBT-35`.
- Type checking does not cover tests, scripts, or most configuration files.
- Accessibility support and route-level checklist coverage exist, but the `LAUNCH-1` accessibility review is incomplete.
- Responsive styling exists, but the `LAUNCH-2` responsive review is incomplete.
- Lighthouse tooling exists, but performance budgets are not enforced.
- Analytics launch policy is not fully signed off; `LAUNCH-5` still covers GA4 administration and Microsoft Clarity cookie/session-recording behaviour.
- Dedicated automated live Vercel production or preview smoke tests do not exist.
- Cross-site launch review and sign-off remain open in `docs/project/launch-readiness.md`.

## Not Included

- CMS integration or a blog/article publishing system.
- Online booking or scheduling integration.
- Payments.
- Authentication, admin editing, or visitor accounts.
- A first-party cookie banner or local Microsoft Clarity Consent API flow.
- Dark mode.
- Storybook or another external component explorer.
- Visual regression testing.

## Outside Current Project Scope

The following remain outside the current project scope unless a task explicitly expands it:

- Wholesale public-copy rewrite.
- Framework, Tailwind, or other CSS-framework migration.
- CMS migration.
- Booking, payment, account, or client-portal features.
- Expanding development or test-bed routes into public pages.

Fresh visual exploration and redesign are currently permitted when requested. Existing design-system palette, typography, heroes, page patterns, and components do not constrain concept development; `docs/design-system/current-scope.md` records their temporary implementation-reference status.

# Current Project Scope

This is the factual current scope of the Vive Counselling website and supporting app. Keep design-system inventory in `docs/design-system/current-scope.md`.

## Included

- Vite, React, and TypeScript power a public counselling website for Vive Counselling.
- Public routes include Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, Contact/Fees, and the Not Found page; the three Inclusion child routes currently remain direct routes but are treated as draft child pages.
- `/about` redirects to Working with Joel, and `/fees` redirects to Contact/Fees.
- Public navigation includes Home, Working with Joel, Inclusion, and Fees; Inclusion child-page links are shown only in local development builds.
- Development-only routes include the rendered design-system pages, Documents, Codex test bed, and Opus test bed.
- The dev Documents page imports markdown from `docs/checklists/`, `docs/reports/`, and `docs/plans/` and renders checklists, reports, and draft plans through the app in development; exact inline checklist status labels render as quiet coloured badges.
- Root project guidance now lives under `docs/project/`; visual-system guidance lives under `docs/design-system/`.
- Launch readiness gates, review passes, and acceptance checks are tracked separately in `docs/project/launch-readiness.md` with stable `LAUNCH-*` IDs.
- The design system has rebuilt written docs, rendered dev pages, shared components, shared CSS class layers, and cleanup guidance.
- Public-page content and product positioning are governed by `docs/project/product-direction.md`; root `PRODUCT.md` mirrors that strategy for frontend design tooling.
- Route metadata exists in `src/data/routeMetadata.json` and is applied by `useDocumentMetadata`.
- The route/application tree is shared by separate browser and static wrappers. Both wrappers use the same Strict Mode boundary and pass the same serializable initial-render timestamp contract; the build now invokes the static wrapper for its in-memory render smoke check.
- A prerender script updates route metadata artifacts, generated route HTML, sitemap, robots, and the app-powered `404.html` fallback as part of `npm run build`.
- The production build creates a disposable Vite SSR bundle outside `dist` and imports it during prerendering. Every metadata-backed public route receives real component-rendered header, page, navigation, and footer markup in its first response. The controlled `404.html` artifact uses a dedicated generic not-found fallback instead of the retired public-route shell path.
- The browser hydrates every metadata-backed public route only when the artifact's explicit prerendered route marker, valid build timestamp, and normalized browser pathname match. Development roots, stale or mismatched artifacts, unknown paths, and `404.html` continue through the client-render fallback.
- Launch indexability is enabled for Home, Working with Joel, Inclusion, and Contact/Fees. Generated route HTML for those pages omits `noindex`, `sitemap.xml` advertises only those four canonical URLs, and `robots.txt` allows crawling with a sitemap reference.
- The three draft Inclusion child routes remain direct routes for review but are excluded from production links, sitemap output, and indexing through route-level `noindex, nofollow` metadata.
- `vivecounselling.com.au` and `www.vivecounselling.com.au` are assigned to the Vercel project; `www` is configured as a permanent redirect to the apex domain, and DNS resolves to Vercel.
- Production metadata defaults to the apex canonical origin `https://vivecounselling.com.au`; `SITE_URL` can still override this for an intentional alternate environment.
- Generated homepage metadata includes a linked JSON-LD graph: `WebSite` names `Vive Counselling` at the canonical apex URL; a minimal `Organization` carries the confirmed public business identity, contact point, logo, description, Kink Aware Professionals directory identity, and Joel Griffiths as `founder`; a concise `Person` identifies Joel and links him to Vive; and a `Service` identifies counselling and psychotherapy for adults, provided by Vive across Australia. Generated Working with Joel metadata adds a `ProfilePage` whose `mainEntity` is the same Person and records the confirmed full ECU and ACA credential details behind the concise visible credential presentation. Delivery channel, pricing, address, and local-business schema remain deferred.
- Public assets include favicons, app icons, a web manifest, the shared social preview image, and portrait/media assets under `public/`.
- The Contact/Fees page uses the shared `EnquiryForm` component and data from `src/data/enquiry.ts`.
- Contact/Fees displays fixed Perth business hours in AWST. Interstate comparison notes derive initially from the build timestamp embedded on generated route roots, then refresh once in the browser only when daylight-saving differences have changed since deployment.
- Consult-request timezone options are calculated when the conditional timezone field is opened rather than when the enquiry content module loads.
- Public contact display and enquiry fallback/failure messaging use `joel@vivecounselling.com.au`.
- The enquiry form submits to the serverless `/api/enquiry` endpoint.
- The TypeScript enquiry API validates structured form fields server-side, supports endpoint-level URL-encoded native form posts, builds the email subject/reply-to/plain text/HTML from the validated payload, formats the verified sender address with the visitor name as the email display name, and sends email through Resend when configured.
- The enquiry API rejects unsupported content types, multipart posts, oversized declared bodies above 25KB, and explicit cross-site fetch/origin/referer signals before validation or email delivery.
- Enquiry API failures return generic visitor-safe public errors, while provider/configuration/runtime diagnostics stay in server logs.
- Basic honeypot spam protection exists for enquiry submissions.
- Vercel Analytics is rendered by the app when analytics are enabled and the runtime hostname is allowed; `SiteAnalytics` injects Google Analytics `gtag.js` with manual public-route `page_view` events when `VITE_GA_MEASUREMENT_ID` is configured, and Microsoft Clarity loads when `VITE_CLARITY_PROJECT_ID` is configured. The default analytics host allowlist is the canonical apex domain plus `www`, with `VITE_ANALYTICS_ALLOWED_HOSTS` available for explicit alternate environments such as local analytics QA.
- The enquiry form is explicitly marked with `data-clarity-mask="true"` so Clarity does not capture form content even if recording features are enabled.
- Playwright public-site tests exist under `tests/public-site.spec.ts`, including one-main-landmark coverage, raw/no-JavaScript/hydration coverage for all seven metadata-backed public routes, shared mobile-navigation Escape, focus-return, and scroll-lock restoration coverage, focused Home semantic-structure, priority-portrait, and page-owned CTA coverage, focused Working with Joel semantic-structure plus pointer/keyboard tab and axe coverage, fixed-season Contact timezone coverage, conditional enquiry fields and payloads, mocked success/error states, success focus and form semantics, equivalent flat/nested artifact checks, SPA-navigation coverage, activation fallback checks, generated metadata, sitemap, robots, and 404 fallback artifact coverage.
- The prerendering migration has no outstanding standalone broad-test phase. When a page or shared behaviour is changed for another reason, its relevant rendering and interaction tests should be reviewed and updated as part of that work rather than through a separate page-by-page testing campaign.
- Direct Node API tests cover accepted and rejected enquiry submissions under `tests/api/`.
- Direct Node script tests cover route metadata origin policy under `tests/scripts/`.
- The public-site QA gate, `npm run qa:site`, builds the app, starts the QA preview server, and passes the Playwright public-site suite locally.
- The opt-in analytics QA gate, `npm run qa:analytics`, builds with fake Google Analytics and Microsoft Clarity IDs, verifies manual SPA route-change pageview calls, and verifies the Clarity script path without loading third-party analytics scripts.
- The aggregate QA command, `npm run qa`, runs encoding checks, direct script tests, the build, direct API tests, and the public-site Playwright suite.
- Static encoding checks run through `npm run check:encoding` and are included in `npm run qa` and `npm run qa:site`.
- Test tooling includes axe checks through Playwright and Lighthouse audit scripts.
- Build tooling includes TypeScript checking, separate Vite client and SSR builds, and component prerendering for every metadata-backed public route. The build fails if a metadata route is missing from the component prerender set, and the ignored SSR artifact is recreated under `.prerender/server` on every production build.
- The TypeScript build includes the `api/` serverless endpoint.
- Vercel deployment configuration exists in `vercel.json` with clean URLs, trailing-slash redirects, and public alias redirects.

## Partially Included / Known Gaps

- Enquiry spam protection includes a honeypot and conservative request-shape checks, but does not include platform rate limiting or complete abuse protection.
- All seven metadata-backed public routes have full static component markup and matching-path hydration. The controlled 404 fallback deliberately retains dedicated generic fallback markup plus `createRoot`; its build and local-preview contract is verified, while exact post-deploy confirmation remains tracked under `DEBT-24`.
- Endpoint-level native form posts and a server-rendered Contact form are supported. JavaScript-disabled visits expose prerendered page markup on every metadata-backed public route.
- Route definitions, route metadata, prerendering, and tests remain separate by design for this small route set; explicit route parity coverage is still tracked as debt.
- The Working with Joel approach tabs render and hydrate accessibly for normal browser use, but only the initially active Psychodynamic panel copy is present before JavaScript; progressive availability of the Attachment and Integrative copy is tracked under `DEBT-35`.
- Type checking does not currently cover tests, scripts, and most config files.
- Vercel clean URL config and the generated app 404 fallback are covered locally. A manual canonical-host baseline confirms unknown paths receive the app fallback with HTTP 404 and `/404.html` redirects to `/404`, but repeatable post-deploy smoke testing is not automated.
- Accessibility support exists in components and tests, and `docs/checklists/accessibility-launch.md` provides the working route-by-route checklist for `LAUNCH-1`, but the launch accessibility review is not complete.
- Responsive styling exists, but the `LAUNCH-2` responsive review is not complete.
- Performance tooling exists, but Lighthouse budgets are not enforced.
- The analytics launch environment policy is not fully signed off yet; `LAUNCH-5` still needs to confirm GA4 admin-setting and Microsoft Clarity cookie/session-recording behaviour before launch. Preview/local analytics collection now requires an explicit host allowlist override.

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
- A first-party cookie banner or local Microsoft Clarity Consent API flow.
- Delivery-channel, pricing, address, or local-business structured data beyond the homepage identity/service graph and Working with Joel `ProfilePage` graph.
- Completed `LAUNCH-*` review passes for accessibility, responsive layout, public SEO/metadata, performance, analytics policy, enquiry flow, final public copy, and launch domain readiness.
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

# Current Project Scope

This is the factual current-state summary of the Vive Counselling website and supporting app. The complete approved reusable UI is maintained separately in the current-only catalogues under `docs/design-system/`; inherited implementation evidence lives under `docs/design-system-legacy/`.

## Application And Routes

- Vite, React, and TypeScript power the public counselling website.
- Public routes include Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, Contact/Fees, and Not Found.
- The Inclusion hub is served at `/inclusive-counselling`; its three first-class topic pages use the flat routes `/kink-bdsm-counselling`, `/polyamory-enm-counselling`, and `/lgbtqia-affirming-counselling`, linked from the shared navigation, Home, and the hub.
- `/about` redirects to Working with Joel, `/fees` redirects to Contact/Fees, and the former indexed `/inclusion` hub permanently redirects to `/inclusive-counselling`; the former unindexed topic URLs do not redirect.
- Public desktop navigation includes Home, Working with Joel, Inclusion with its three child pages, and Fees, plus a separate Get in touch action. The mobile navigation exposes Fees and Contact separately. All shared Fees and Contact entry points open the Contact page at its top so visitors encounter its context before scrolling to the fee details. The compact shared footer keeps the wordmark, short navigation, email, hours, Instagram and LinkedIn profile links, and copyright separate from page-level CTA content.
- Development-only routes include the source-backed `/design-system` overview with separate `/design-system/foundations`, `/design-system/components`, and `/design-system/patterns` catalogue pages, plus Documents and the Codex and Opus test beds. The former five `/design-language/*` rendered-catalogue routes remain retired and resolve through the ordinary Not Found route.
- The Codex and Opus test beds are clean development-only shells for future design explorations. Each retains the shared development-page hero, navigation and footer with the Dev menu available, but contains no active page candidate or enquiry form.
- The development Documents page imports Markdown from `docs/checklists/`, `docs/reports/`, `docs/research/`, `docs/page-plan/`, `docs/plans/`, `docs/design-system/`, and `docs/design-system-legacy/`; exact inline checklist status labels render as quiet coloured badges. The active and legacy design-system documents appear as separate library groups. Its page-scoped presentation follows the production site's dark hero, warm paper and sage surfaces, serif hierarchy, and flat ruled treatment while retaining a responsive, scrollable document library.
- The `/design-system` overview links to one rendered page per current-only catalogue. Foundations renders the promoted standard and lead reading roles alongside the `--cedar`, warm-section, and portrait-material tokens; Components renders the canonical `<ContactInvitation />`; Patterns renders `.site-section-warm` and the shared `.site-hero-background` used by every public-route hero and every development hero or cover. Only `docs/design-system/foundations.md`, `components.md`, and `patterns.md` authorize reuse; inherited implementation remains absent from these workspace pages and is recorded separately under `docs/design-system-legacy/` when useful.

## Public Content And Discoverability

- Public copy is under active owner-led revision. Existing page source is implementation state rather than an approved voice corpus; current copy status and wording constraints are recorded in `docs/project/writing-direction.md`.
- Home uses a dark, direct opening with routes to Contact and the Inclusion hub, followed by one warm editorial About Vive section. A single uninterrupted narrative introduces Joel, the practice's broad scope and online delivery, his particular commitment and his approach without internal subheadings. Its prose, the inclusive-practice introduction, and the closing invitation use the shared reading role; the About opening alone uses the shared lead modifier. Joel's portrait panel contains the editorial link to Working with Joel, but the section intentionally contains no consultation promotion or conversion CTA; it then leads into the dark inclusive-practice index, while the closing invitation owns the request-a-consult and enquiry action. Homepage actions keep their container geometry fixed and use a consistent short arrow movement for feedback. On non-hover or coarse-pointer input, the flat hero actions, portrait-panel link and inclusive-practice index labels retain visible underlines and pressed feedback; the filled closing CTA keeps its distinct treatment. On narrow screens, the complete narrative precedes the portrait panel and its onward link.
- Working with Joel uses a compact dark profile hero with a tightly spaced ruled credential list aligned to the hero eyebrow, a flat warm portrait-led introduction, a warm flat approach workspace retaining the three-tab interaction, and a dark issues index whose final item closes the grid. Its introduction, approach overview, and active tab copy use the shared reading role, with the introduction opening using the shared lead modifier. Its three section headings share one responsive serif scale, while the approach controls and issue titles share a subordinate page-scoped heading scale. On narrow screens, the introduction copy precedes the portrait, the approach controls stack above their active explanation, and the issues index becomes one column.
- The Inclusion hub opens with the owner-approved “Known before you arrive. Not learned as you go.” positioning and community-informed introduction. It then presents one editorial chapter for each child route—Kink and BDSM, ENM and polyamory, and LGBTQIA+—with its established service heading, a concise overview, and one onward link. The previous FAQ and duplicate hero links have been removed.
- The Kink and BDSM route uses a dark direct hero followed by three explicit chapters: no translation needed, when therapy gets kink wrong, and more than kink. The former terminology grid and FAQ have been removed.
- The ENM and polyamory route uses a dark direct hero, a ruled index of reasons someone may seek counselling, a sage section about how relevant non-monogamy is to the work, and a dark closing statement of Joel's position on monogamy and non-monogamy. Working reader-informed content plans remain under `docs/page-plan/`.
- The LGBTQIA+ route uses a dark direct hero, a three-part comparison of how relevant sexuality or gender may be to counselling, a sage section about misplaced therapist assumptions, and a dark disclosure section that does not treat greater disclosure as the default goal.
- Google Business Profile verification is complete. Online delivery may be named selectively in public copy and metadata; the current wording rule is owned by `docs/project/writing-direction.md`.
- Route metadata is stored in `src/data/routeMetadata.json` and applied by `useDocumentMetadata`.
- `docs/checklists/seo-metadata-monitor.md` is the owner-directed manual record for site metadata, generated output, live responses, redirects, and not-found behaviour. It has no automatic or calendar-based review cadence.
- All seven public content routes are indexable. Their generated HTML omits `noindex`, and `sitemap.xml` advertises all seven canonical URLs.
- `robots.txt` allows crawling and references the sitemap.
- Production metadata defaults to `https://vivecounselling.com.au`; `SITE_URL` can override the origin for an intentional alternate environment.
- The apex and `www` domains are assigned to the Vercel project. `www` permanently redirects to the apex domain, and DNS resolves to Vercel.
- Homepage JSON-LD includes linked `WebSite`, `Organization`, `Person`, and `Service` entities for the confirmed public business, practitioner, contact, directory identity, social profiles, and counselling service facts. The Service records online enquiry as its delivery channel and the publicly stated AUD 120 offer for a standard 50-minute session.
- Working with Joel metadata adds a `ProfilePage` whose `mainEntity` is the same `Person` and includes the confirmed ECU and ACA credential details.
- Each of the three live Inclusion topic pages adds a `WebPage` with a route-specific `Service` as its `mainEntity`; those services link back to the same Organization and umbrella counselling Service while retaining their own stable route identities.
- A private or inferred street address and address-dependent `LocalBusiness` structured data are not included. The approved Google Business Profile can be added to the Organization's `sameAs` links once its exact public profile URL is confirmed.
- Public assets include favicons, app icons, a web manifest, a shared social preview image, and portrait/media assets under `public/`.

## Rendering, Build, And Deployment

- The public site is live at `https://vivecounselling.com.au`.
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

- Contact/Fees uses a page-owned progressive form with three direct paths: make an appointment, request a consult, or make a general enquiry. It owns the browser submission workflow and reads its recipient and success content from `src/data/enquiry.ts`.
- The form reveals only the fields relevant to the selected path after hydration. Its server-rendered version exposes the complete field set so the native form remains available without JavaScript; the endpoint derives the structured enquiry and booking types from the selected Contact path for those native submissions.
- The page displays fixed Perth business hours in AWST within Practical details. Interstate comparison notes start from the generated route timestamp and refresh in the browser when daylight-saving differences have changed since deployment.
- Consult-request timezone options are calculated from the current Australian timezone set when the conditional timezone field opens.
- Successful submissions replace the form with a compact focused confirmation that says Joel usually replies within 24 hours; the native HTML response uses the same wording.
- Public contact display and enquiry fallback/failure messaging use `joel@vivecounselling.com.au`.
- The form submits to the serverless `/api/enquiry` endpoint and supports endpoint-level URL-encoded native form posts.
- JavaScript-disabled visits expose the full server-rendered Contact form and component markup on every metadata-backed public route.
- The TypeScript endpoint validates structured fields server-side, builds the subject, reply-to, plain text, and HTML from the validated payload, formats the verified sender address with the visitor name as its display name, and sends through Resend when configured.
- The endpoint rejects unsupported content types, multipart posts, declared bodies above 25 KB, and explicit cross-site fetch, origin, or referer signals before validation or delivery.
- Public failure responses remain generic while provider, configuration, and runtime diagnostics stay in server logs.
- Basic honeypot spam protection is active.

## Analytics

- `SiteAnalytics` loads Google Analytics when `VITE_GA_MEASUREMENT_ID` is configured and sends manual public-route `page_view` events.
- The first non-honeypot enquiry-form input emits one GA4 `enquiry_started` event per rendered form, clicks on site email links emit `email_link_clicked`, and each deliberate Contact-page path selection emits `contact_option_selected` with one controlled `contact_option` parameter (`appointment`, `consult`, or `question`). These events contain no visitor-entered data.
- After `/api/enquiry` confirms a successful send, the enquiry form emits a GA4 `generate_lead` event with controlled `form_name` and `lead_source` parameters. Failed submissions emit no conversion event.
- Vercel Web Analytics and its custom-event client are not installed or rendered.
- Microsoft Clarity loads when `VITE_CLARITY_PROJECT_ID` is configured.
- The default analytics host allowlist includes the canonical apex and `www`; `VITE_ANALYTICS_ALLOWED_HOSTS` supports intentional alternate QA environments.
- The enquiry form uses `data-clarity-mask="true"` so Clarity does not capture form content.

## Testing And QA

- `tests/public-site.spec.ts` covers public landmarks, raw and JavaScript-disabled output, hydration, shared mobile-navigation Escape/focus/scroll-lock behaviour including responsive breakpoint release, complete mobile-footer scroll reach, focused Home semantics, CTA ownership, dark-hero contrast, About Vive content, mobile portrait ordering and overflow, Working with Joel hero alignment, heading roles, tab interaction and axe checks, header, mobile-navigation and footer Contact destinations, timezone behaviour, three-path conditional enquiry fields and payloads, success/error states, form semantics, flat and nested artifacts, SPA navigation, fallback activation, generated metadata, sitemap, robots, and the 404 artifact.
- `tests/tsconfig.json` provides strict TypeScript coverage for the Playwright public-site spec. `npm run typecheck:tests` runs that check directly, and the site, analytics, and full QA commands enforce it before browser testing.
- Direct Node tests under `tests/api/` cover accepted and rejected enquiry submissions.
- Direct Node tests under `tests/scripts/` cover route-metadata origin policy.
- `npm run qa:site` builds the app, starts the QA preview server, and runs the Playwright public-site suite.
- `npm run qa:analytics` builds with fake analytics identifiers and verifies Google Analytics SPA pageviews, all three controlled Contact-path selection values, anonymous contact-intent events, confirmed enquiry conversion events, failure suppression, and the Clarity script path without loading third-party scripts.
- `npm run qa` runs encoding checks, direct script tests, the build, direct API tests, and the public-site Playwright suite.
- `npm run check:encoding` is also included in `npm run qa` and `npm run qa:site`.
- Test tooling includes Playwright axe checks and Lighthouse audit scripts.
- Codex IDE visual inspection follows [visual-verification.md](visual-verification.md) and uses the repository's Playwright installation against system Chrome. `scripts/visual-session.mjs` is an optional convenience helper that manages an isolated Vite server and browser within one callback lifecycle; direct Playwright use remains supported.

## Known Gaps

- Enquiry protection does not include platform rate limiting or complete abuse protection.
- The 404 build and local-preview contract is verified, but repeatable post-deploy confirmation remains manual under `DEBT-24`.
- Route definitions, metadata, prerendering, and tests remain separate; explicit route-parity enforcement is tracked as debt.
- The Working with Joel approach tabs work after hydration, but only the initially active Psychodynamic explanation is present before JavaScript; progressive access to the Attachment and Integrative copy is tracked under `DEBT-35`.
- Dedicated type checking covers the Playwright public-site spec, but the direct JavaScript tests, scripts, and most configuration files remain outside TypeScript checking.
- Accessibility support and automated route coverage exist. `docs/checklists/accessibility-monitor.md` is the owner-directed WCAG 2.2 AA-oriented manual record for shared-shell, public-route, and not-found accessibility review, with no automatic cadence or claim of formal conformance.
- Responsive styling exists across shared and page-scoped styles. `docs/checklists/responsive-monitor.md` is the owner-directed manual record for shared-shell, public-route, and not-found responsive review, with no automatic or calendar-based cadence.
- Lighthouse tooling exists, but performance budgets are not enforced; future refinements are ordinary maintenance work.
- The implemented analytics posture is the live operating baseline. Future GA4/Clarity administration, policy, public privacy-notice, or testing refinements are ordinary operational and tracked work.
- Dedicated automated live Vercel production or preview smoke tests do not exist.
- The site is live. Future improvements continue through normal monitor, operational, writing, `SITE-*`, and `DEBT-*` workflows.

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

Fresh visual exploration and redesign are currently permitted when requested. Inherited palette, typography, heroes, page patterns, and components do not constrain concept development; the active catalogues constrain deliberate reuse without acting as layout templates.

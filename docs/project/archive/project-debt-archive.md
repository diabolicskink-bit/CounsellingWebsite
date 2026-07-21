# Project Debt Archive

This file preserves resolved and superseded `DEBT-*` items moved out of the [active project debt tracker](../project-debt.md). Stable IDs remain searchable, but archived items are supporting history rather than active requirements.

### DEBT-36 - Legacy spotlight CSS needed usage audit

Resolved on 2026-07-13 after a focused source audit found no runtime, development-page, test, or HTML call sites for `.site-spotlight`, `.site-spotlight__grid`, `.site-spotlight__eyebrow`, or `.site-spotlight__stats`. The complete base, descendant, and responsive selector family was removed from `src/styles.css`.

The removal changed no rendered page. Active shared `site-*` patterns remain unchanged, and the CSS checklist plus design-system scope record that the retired spotlight composition is not reusable API. Broader legacy CSS cleanup remains tracked under `DEBT-13`.

### DEBT-32 - Public routes need full static prerendering and hydration

Resolved on 2026-07-13 after all seven metadata-backed public routes gained component-rendered first-response HTML and guarded matching-path hydration. The build now fails when a metadata route lacks a component render, Contact uses a shared build-time timestamp seed for hydration-safe timezone content, mismatched and unknown paths retain deliberate client rendering, and the controlled `404.html` fallback remains separate and non-hydratable.

The production build, generated-artifact inspection, browser verification, and 48 focused desktop/mobile rendering checks were accepted as the migration completion baseline. The proposed standalone broad regression phases were consciously closed without execution; `DEBT-34` records the narrower rule that relevant tests are reviewed when pages are already being changed for other reasons. Canonical-host 404 confirmation remains under `DEBT-24`.

### DEBT-33 - Temporary static H1 fallback shell needs retirement path

Resolved on 2026-07-13 by removing the generic public static-shell generation path, its regex and markers, and route `h1` metadata after every metadata-backed route gained component prerendering. The build now fails if any metadata route is missing from the component prerender set, and tests assert one meaningful component-owned H1 plus real route structure.

The generic `404.html` content is retained through a dedicated not-found fallback path and marker; it no longer shares the retired public-shell machinery. Post-deploy evidence remains tracked separately under `DEBT-24`.

### DEBT-19 - Legacy issue and topic grid CSS needs usage audit

Resolved on 2026-07-10 after a focused usage audit found no source call sites for `.issues-section`, `.issues-section__inner`, `.topic-grid`, or `.topic-card`. The dead base, hover, heading, contextual, and responsive rules were removed from `src/styles.css`.

The active `.site-topic-grid` and `.site-topic-card` pattern remains documented and demonstrated. Broader legacy CSS cleanup remains tracked under `DEBT-13`.

### DEBT-26 - Social sharing image metadata points at a missing asset

Resolved on 2026-07-08 by generating the shared 1200x630 social preview image at `public/og-vive-counselling.png` and updating the configured social image alt text to match the finished asset.

The public-site suite now checks that the social image path is served and that the PNG dimensions match the Open Graph/Twitter metadata expectations. Future social-card content changes should preserve the configured route metadata path unless there is a deliberate metadata migration.

### DEBT-1 - QA suite is not a trustworthy release gate

Resolved on 2026-06-17 by updating stale public-site Playwright expectations for current page headings and not-found route behaviour, and by improving page diagnostics for console errors, failed responses, and failed requests.

The full `npm run qa:site` gate now passes locally. No new follow-up debt was created from this pass because the full public-site suite passed after the stale expectations and diagnostics gap were fixed.

### DEBT-2 - Public routes expose nested main landmarks

Resolved on 2026-06-17 by making page components the sole owners of the primary `<main>` landmark. `Layout` now renders the routed page directly between the shared header and footer instead of wrapping the outlet in an additional main.

The fix preserved routes, copy, visual design, API behaviour, and page-level `.site-page` wrappers. Public-site Playwright coverage now asserts one visible main landmark across canonical public routes and not-found boundary routes.

### DEBT-3 - Enquiry endpoint request-shape hardening

Resolved on 2026-06-17 by adding a pre-parse enquiry request guard. Valid JSON fetch submissions and endpoint-level URL-encoded native form posts still work, while missing or unsupported content types, multipart posts, oversized declared bodies, and explicit cross-site fetch/origin/referer signals are blocked before validation or email delivery.

Blocked requests reuse the archived `DEBT-5` generic public error contract and log only safe request metadata server-side. Platform-level rate limiting remains tracked separately under `DEBT-23`.

### DEBT-4 - Enquiry validation and email rendering depend on client-built strings

Resolved on 2026-06-17 by changing enquiry submissions to structured JSON fields and making the API validate those fields before building the email subject, reply-to, plain text, and HTML output server-side.

The old composed `{ subject, body, replyTo }` payload is now rejected by validation, and direct Node API tests cover successful submissions, invalid payloads, honeypot handling, missing delivery config, and provider failure. The derived Perth business-hours comparison note was intentionally split into `DEBT-22` so timezone policy can be cleaned up separately.

### DEBT-5 - Enquiry error handling and no-JavaScript fallback are inconsistent

Resolved on 2026-06-17 by removing temporary public diagnostic detail from enquiry API and form failures. Public JSON errors are now generic, provider/configuration/runtime details are logged server-side, and the React form no longer renders technical failure detail to visitors.

The endpoint now accepts URL-encoded native form posts and returns safe minimal HTML success or failure pages for those submissions. Full JavaScript-disabled public-page rendering remains out of scope because the current Vite app still renders the contact form through client-side React.

### DEBT-6 - Production URL and Vercel routing behaviour are not locked down

Resolved on 2026-06-17 at the repository level by locking the default canonical origin to the then-current stable Vercel production hostname, preserving `SITE_URL` as the future custom-domain override, and preventing production builds from falling back to unique Vercel deployment URLs or localhost origins. The live canonical origin has since moved to `https://vivecounselling.com.au`, and the old temporary production Vercel hostname was removed from the Vercel project on 2026-07-08.

The build now generates an app-powered `404.html` fallback with noindex metadata while preserving route-specific first-response HTML for known public routes. Local script and public-site tests cover the canonical origin policy, generated metadata artifacts, sitemap, robots, and 404 fallback. Live Vercel post-deploy smoke testing was intentionally split into `DEBT-24`.

### DEBT-7 - Encoding mojibake exists in source and rendered output

Resolved on 2026-06-17 by repairing the known mojibake in `src/styles.css`, including the rendered navigation submenu glyph and corrupted hero-system comment separators.

Future corruption is guarded by `npm run check:encoding`, which scans project text files for common mojibake markers and now runs as part of both `npm run qa` and `npm run qa:site`. Generated and third-party output directories are intentionally excluded from the source scan.

### DEBT-10 - Enquiry API lacks direct tests

Resolved on 2026-06-17 by adding direct Node API tests for `/api/enquiry` with mocked Resend/fetch behaviour. Coverage now includes accepted general, appointment, and consult submissions; invalid structured payloads; legacy composed payload rejection; honeypot short-circuiting; missing delivery configuration; and provider failure.

The remaining visitor-visible form-flow browser coverage stays tracked in `SITE-6`, and future hardening/configuration work can extend the API tests added here instead of reopening this baseline coverage item.

### DEBT-14 - Side-stripe panel rules conflict with active patterns

Resolved on 2026-06-17 after a visual audit confirmed the active striped panels are intentional and not a UI problem. The issue was the blanket AI/design-system rule against 4px side stripes, which conflicted with good existing shared panel/card patterns.

The resolution removed the side-stripe prohibition from active design-system guidance and the design export, while leaving public UI, CSS, routes, and copy unchanged. Existing `.site-copy-panel`, `.site-check-panel`, and `.site-fee-card` side-stripe treatments remain valid shared patterns. The unrelated, unused `.site-highlight__box` selector was later removed in the 2026-07-13 dead CSS sweep.

Visual audit report: `docs/reports/2026-06-17-debt-14-side-stripe-visual-audit.md`.

### DEBT-12 - Design-system card boundary is unclear

Resolved on 2026-06-17 by clarifying the AI-facing card boundary in the repository guidance and design-system docs. Active card work now points to `.site-card`, `.site-card--link`, `.site-card__*`, `.site-topic-card`, `.site-fee-card`, and deliberate page-scoped compositions; `Card.tsx`, `.card`, and `.card-grid` are no longer described as active card API.

The remaining source cleanup was split into `DEBT-17` and later resolved there by removing the unused legacy card component and generic card CSS. Broader legacy CSS cleanup context remains linked from `DEBT-13`, and future discoveries can split into additional smaller `DEBT-*` items rather than reopening this archived boundary item.

### DEBT-17 - Legacy Card component and card CSS need cleanup

Resolved on 2026-06-17 by confirming that the legacy `Card` component and generic card selectors had no active source usage, then removing `src/components/Card.tsx`, `.card`, `.card-grid`, `.card-kicker`, `.card-title--small`, the `.issues-section .card*` overrides, and card-specific responsive hooks from production CSS.

The active card API remains `.site-card`, `.site-card--link`, `.site-card__*`, `.site-card-grid`, `.site-topic-card`, `.site-fee-card`, and deliberate page-scoped compositions. Broader legacy CSS cleanup remains tracked under `DEBT-13`; panel/strip selectors were later resolved in `DEBT-18`, and issue/topic selectors were later resolved in `DEBT-19`.

### DEBT-18 - Legacy panel and strip CSS need usage audit

Resolved on 2026-06-27 through the progressive CSS checklist cleanup. The old panel/media shell selectors `.image-panel`, `.feature-panel*`, and `.two-column-panel` were removed first after source searches found no active usage; the remaining unused `.fit-strip*` band selectors and responsive hooks were then removed from `src/styles.css`.

No compatibility case was found for the panel/strip cluster. Broader legacy CSS review remains tracked under `DEBT-13`; the adjacent old issue/topic selector slice was later resolved in `DEBT-19`.

### DEBT-25 - Shared public route manifest may be needed

Closed on 2026-06-18 after assessment found that a shared route manifest would likely add more architecture than value for this small, mostly static counselling practice site. The public route set is not expected to grow much, and route registration, navigation, redirects, metadata, sitemap, prerendering, and tests overlap without all wanting the same data shape.

Route drift prevention remains tracked under `DEBT-8`, which should add focused parity coverage. If future route churn makes the current duplication materially painful, a new debt item can revisit manifest consolidation with fresh evidence.

### DEBT-28 - Google Analytics does not explicitly track SPA route changes

Resolved on 2026-06-27 by making the manually injected Google Analytics path explicitly route-aware. `SiteAnalytics` disables GA's automatic initial page view, then sends manual `page_view` events for public route metadata entries on initial load and React Router navigation, using deterministic title, location, path, and measurement-ID payloads.

Default QA builds still keep analytics disabled and assert that no analytics scripts are injected. An opt-in `npm run qa:analytics` harness builds with a fake GA measurement ID, intercepts third-party analytics URLs, and verifies initial plus client-side route-change pageviews without loading external scripts. `LAUNCH-5` was later closed after the site went live and this implemented analytics posture was accepted as the operating baseline.

### DEBT-31 - Favicon, touch, and app icon assets need quality and usage audit

Resolved on 2026-06-18 by replacing the active public favicon, touch, and web-app icon assets with the approved folded-paper `v07` source. The active PNG set lives in `public/` at the referenced browser/device sizes, and `public/favicon.svg` has been replaced with a compact vector sibling so SVG-capable browsers do not keep showing the old mark. The historical icon candidate exports were removed on 2026-07-08 after the active public assets were confirmed.

The icon references were confirmed in generated head metadata and `public/site.webmanifest`, and public-site tests now verify the served PNG icon dimensions in addition to existence.

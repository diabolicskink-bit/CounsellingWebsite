# Technical Code Review - 2026-06-17

Scope: technical structure, code quality, routing, build/deploy, tests, accessibility implementation, CSS/design-system architecture, and the enquiry/API path. This review deliberately does not assess copy quality, visual taste, or content strategy.

## Verification Run

- `npm run build` passed.
- `npm run qa:site` failed: 30 failed, 46 passed.
- Build output observed: JS bundle about 252.5 kB before gzip, CSS bundle about 74.4 kB before gzip.

## Numbered Improvements And Fixes

1. **Fix the failing QA suite before trusting it as a release gate.**  
   Priority: P1  
   Evidence: `npm run qa:site` failed 30 of 76 tests. Failures include stale H1 expectations in `tests/public-site.spec.ts:92`, stale 404 expectations in `tests/public-site.spec.ts:264` and `tests/public-site.spec.ts:278`, and public-page console 404 failures at `tests/public-site.spec.ts:103`.  
   Recommended fix: Update tests to match the current semantic contract, then investigate and eliminate or explicitly filter the console 404 source. Add failed-request URL capture in the console/network listener so future failures identify the exact asset or endpoint.

2. **Resolve nested `<main>` landmarks.**  
   Priority: P1  
   Evidence: `src/components/Layout.tsx:187` wraps every route in `<main>`, while pages such as `src/pages/Home.tsx:360` also return `<main>`. Playwright snapshots confirm `main` inside `main`.  
   Recommended fix: Choose one ownership model. Either keep `<main>` in `Layout` and make pages render a `<div className="site-page ...">`, or remove the layout-level `<main>` and keep page-level mains. The site should expose one primary main landmark per route.

3. **Harden the public enquiry endpoint against spam and abuse.**  
   Priority: P1  
   Evidence: The only visible protection is a honeypot in `src/components/EnquiryForm.tsx:315`, checked by `api/enquiry.js:374`. There is no rate limiting, origin check, challenge, IP throttling, or quota guard.  
   Recommended fix: Add rate limiting or bot protection suitable for Vercel, validate expected origins, and monitor/send limits. The endpoint is not an open relay because the recipient is fixed, but it can still spam the inbox and burn email quota.

4. **Move enquiry validation to the server using structured fields.**  
   Priority: P1  
   Evidence: The browser composes `subject`, `body`, and `replyTo` in `src/components/EnquiryForm.tsx:140`, while `api/enquiry.js:378` only checks those three strings exist. The API does not validate email format, allowed enquiry/booking values, conditional required fields, name, or message as structured data.  
   Recommended fix: Send structured JSON fields from the client and build both text and HTML email bodies on the server after validation.

5. **Stop exposing technical/provider errors to visitors.**  
   Priority: P1  
   Evidence: `api/enquiry.js:400` returns missing environment variable names, `api/enquiry.js:431` can return Resend response bodies, and `api/enquiry.js:443` can return unexpected error messages. `src/components/EnquiryForm.tsx:459` renders those details in the page.  
   Recommended fix: Log detailed diagnostics server-side. Return a generic public error response and render only the fallback contact instruction to users.

6. **Fix the no-JavaScript form fallback or remove the implied fallback.**  
   Priority: P1  
   Evidence: `src/components/EnquiryForm.tsx:293` declares `action="/api/enquiry"` and `method="post"`, but the API expects the JavaScript-built payload, not native form fields such as `name`, `email`, and `message`.  
   Recommended fix: Either make `api/enquiry.js` accept normal form posts as progressive enhancement, or remove the misleading form action/method and treat it as a JavaScript-only flow.

7. **Require a canonical production `SITE_URL`.**  
   Priority: P1  
   Evidence: `scripts/prerender-route-metadata.mjs:29` falls back from `SITE_URL` to `VERCEL_URL`, and `src/data/routeMetadata.json:4` falls back to localhost. A production build can emit deployment-preview canonicals, OG URLs, sitemap URLs, and robots sitemap URLs if `SITE_URL` is missing.  
   Recommended fix: Fail production builds when `SITE_URL` is absent, and set it to the canonical public domain in Vercel.

8. **Verify Vercel routing, not only `vite preview`.**  
   Priority: P1  
   Evidence: `package.json:13` runs QA against `vite preview`; `vercel.json:3` uses `cleanUrls` and redirects but has no explicit SPA fallback rewrite. Tests assume unknown routes hydrate the React `NotFound` component, but Vercel behavior is not exercised locally.  
   Recommended fix: Add an explicit Vercel rewrite/fallback strategy for SPA deep links if that is the intended behavior, then verify with Vercel preview or a Vercel-equivalent local check.

9. **Update stale 404 route-boundary tests.**  
   Priority: P1  
   Evidence: Tests expect `h1` text "Page not found" and an `h2.hero-display`, but `src/pages/NotFound.tsx:75` renders "Page not found" as a paragraph label and `src/pages/NotFound.tsx:76` renders `h1` as "This is not the room."  
   Recommended fix: Decide the intended semantic contract, then update either tests or markup. Keep the test focused on one H1, `noindex`, useful recovery links, and absence of dev navigation in production.

10. **Fix encoding/mojibake in source and generated output.**  
    Priority: P1  
    Evidence: `src/styles.css:242` contains a mojibake triangle string in `content`, and `src/styles.css:2576` onward contains mojibake comment separators. The Playwright failure snapshots also show a mojibake copyright symbol in rendered footer output.  
    Recommended fix: Normalize affected files to UTF-8, replace mojibake with ASCII or intended Unicode, and add a lightweight check for replacement characters or common mojibake sequences.

11. **Add direct tests for the enquiry API and form flow.**  
    Priority: P2  
    Evidence: Existing Playwright tests cover public pages, metadata, assets, redirects, tabs, and some axe checks, but not `/api/enquiry`, form success/error behavior, honeypot behavior, invalid payloads, missing env vars, Resend failures, or native form submission.  
    Recommended fix: Add API-level tests with mocked `fetch`/Resend and a browser form test that mocks `/api/enquiry`.

12. **Unify route definitions, metadata, prerendering, and tests.**  
    Priority: P2  
    Evidence: Public routes are defined in `src/data/routes.ts:1`, registered separately in `src/App.tsx:55`, listed separately in `src/data/routeMetadata.json:10`, and hard-coded again in `tests/public-site.spec.ts:18`.  
    Recommended fix: Create one route manifest or add parity tests proving every public route has metadata, prerender output, sitemap coverage, navigation intent, and test coverage.

13. **Expand TypeScript coverage beyond `src`.**  
    Priority: P2  
    Evidence: `tsconfig.json:19` includes only `src`. `tsconfig.node.json:10` includes only `vite.config.ts`, and it is not referenced by a root project config. Playwright tests, scripts, config files, and the serverless API are mostly outside type checking.  
    Recommended fix: Add a root `tsconfig` with project references or dedicated typecheck scripts for tests/config/scripts. Consider moving `api/enquiry.js` to TypeScript or adding dedicated validation and tests if it remains JavaScript.

14. **Remove brittle text parsing from the email renderer.**  
    Priority: P2  
    Evidence: `src/components/EnquiryForm.tsx:158` emits labelled text rows, and `api/enquiry.js:48` reparses those rows to render the HTML email.  
    Recommended fix: Use a validated structured object as the single source for text email, HTML email, subject, reply-to, and timing notes.

15. **Make email recipient configuration explicit.**  
    Priority: P2  
    Evidence: `api/enquiry.js:381` falls back to a hard-coded Gmail recipient, while the public email is separately hard-coded in `src/data/enquiry.ts:4`.  
    Recommended fix: Require `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL` in production. Keep the public display email and delivery recipient intentionally synchronized or explicitly documented if they differ.

16. **Clarify the design-system card/component boundary.**  
    Priority: P2  
    Evidence: `docs/design-system/components.md:11` still points agents toward `Card`, while `src/components/Card.tsx:8` emits `.card`; the active production card pattern is `.site-card` in `src/styles.css:1072`.  
    Recommended fix: Retire, rewire, or clearly mark the old `Card` component as legacy, then update `docs/design-system/current-scope.md` and rendered examples as needed.

17. **Run a legacy CSS cleanup sweep.**  
    Priority: P2  
    Evidence: `src/styles.css:449` through `src/styles.css:823` still contains older `.image-panel`, `.card`, `.fit-strip`, `.section`, `.feature-panel`, `.topic-card`, `.two-column-panel`, and related overrides, while production pages mostly use `site-*`/`hero-*`.  
    Recommended fix: Audit actual usage, remove dead layers, or quarantine legacy aliases. Preserve still-used pieces such as `.section-heading` until a replacement exists.

18. **Resolve design-system rule conflicts around side-stripe panels.**  
    Priority: P2  
    Evidence: `docs/design-system/ai-rules.md:82` prohibits new 4px side stripes, but active shared patterns still use thick side borders, including `.site-highlight__box` around `src/styles.css:1211`, `.site-copy-panel`/`.site-check-panel` around `src/styles.css:1309`, and `.site-fee-card` around `src/styles.css:1437`.  
    Recommended fix: Either normalize these patterns to the current rule, or document them as explicit existing exceptions so future changes are not contradictory.

19. **Promote repeated portrait/media styling into a shared modifier.**  
    Priority: P2  
    Evidence: Home and Working With Joel repeat similar hero media and portrait tag styling in `src/styles-home.css:22`, `src/styles-home.css:44`, `src/styles-working-with-joel.css:108`, and `src/styles-working-with-joel.css:123`.  
    Recommended fix: Promote a shared `hero-media-note` portrait modifier if the pattern is intended to remain across pages.

20. **Add a global reduced-motion baseline.**  
    Priority: P2  
    Evidence: `src/styles.css:67` sets global smooth scrolling, while reduced-motion handling is localized around broad tabs and FAQ at `src/styles.css:1931` and `src/styles.css:2198`.  
    Recommended fix: Add a global `prefers-reduced-motion: reduce` rule for scroll behavior and shared transitions/animations.

21. **Treat public page CSS as global until stronger scoping exists.**  
    Priority: P2  
    Evidence: Public pages are statically imported in `src/App.tsx:6`, and each imports a global page stylesheet, such as `src/pages/Home.tsx:8`. Current class prefixes are disciplined, but all page CSS joins one cascade and one production CSS bundle.  
    Recommended fix: Keep page-root prefix rules strict. If page CSS continues to grow, consider route-level lazy loading for public pages or CSS Modules for page-only rules.

22. **Gate or test third-party analytics scripts deliberately.**  
    Priority: P2  
    Evidence: `index.html:11` loads Google Tag Manager directly and `src/App.tsx:75` renders Vercel Analytics. Public-page tests fail on generic 404 console errors, and third-party scripts are active during local QA unless explicitly blocked.  
    Recommended fix: Decide whether analytics should run in local/preview/test. In tests, block or mock analytics requests, or capture failed request URLs so third-party failures do not obscure app regressions.

23. **Add performance budgets to Lighthouse tooling.**  
    Priority: P3  
    Evidence: `scripts/run-lighthouse.mjs:60` reads and prints category scores but does not enforce minimum thresholds.  
    Recommended fix: Define minimum category scores or budgets and make `audit:lighthouse` fail when they regress.

24. **Pin runtime/package-manager expectations.**  
    Priority: P3  
    Evidence: Current Vite/plugin versions require modern Node, but `package.json` has no `engines` or `packageManager`.  
    Recommended fix: Add `engines.node` and `packageManager` so local, CI, and Vercel builds agree on tooling.

25. **Consider image delivery improvements for public assets.**  
    Priority: P3  
    Evidence: Portrait images are served from `public` as direct JPG assets and referenced by string paths in `src/pages/Home.tsx:10` and `src/pages/WorkingWithJoel.tsx:7`.  
    Recommended fix: Consider WebP/AVIF variants, explicit width/height attributes where practical, and responsive `srcset` for large portrait assets. The current CSS aspect-ratio wrappers reduce layout risk, so this is lower priority than the QA/API/routing issues.

## Suggested Remediation Order

1. Fix the QA suite and nested main landmarks.
2. Harden and test the enquiry/API path.
3. Lock down production URL and Vercel routing behavior.
4. Normalize encoding issues.
5. Consolidate route metadata and TypeScript coverage.
6. Run the design-system/CSS cleanup items in focused sweeps.

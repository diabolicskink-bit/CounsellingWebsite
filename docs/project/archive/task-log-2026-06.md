# Task Log - June 2026

Consolidated June milestones. Entries describe what was established at the time; historical checks and outstanding work are not current status. Git retains the detailed changes and original entries.

Use the [current system guide](../current-scope.md) for implementation and source owners, the [project map](../README.md) for current guidance, and the [archive index](README.md) for other months. The [active log](../task-log.md) owns admission and maintenance guidance.

## 2026-06-27 - Branded Contact Email Applied

- Applied `joel@vivecounselling.com.au` to public contact details and enquiry API fallback messages, resolving `SITE-10`. Explicit Production delivery configuration remained separate work under `DEBT-11`.

## 2026-06-27 - Public Route Analytics Established

- Replaced GA's implicit initial page view with manual public-route events covering first load and React Router navigation. Mocked third-party request checks covered the route contract, resolving `DEBT-28`; they did not verify GA administration settings.

## 2026-06-27 - Unused Layout And Card Implementation Removed

- Removed the unused generic Card component and card selectors on 17 June (`DEBT-17`), followed by unused SplitSection layout, panel and strip selectors on 27 June (`DEBT-18`). Source-consumer checks bounded the removals; retained public consumers were preserved.
- Broader CSS migration remained under `DEBT-13` and related items. These removals did not approve retained styles for reuse; current contracts belong to the [design-system catalogues](../../design-system/README.md).

## 2026-06-26 - Custom Domain And Pre-Launch Indexing Guard Prepared

- Assigned `vivecounselling.com.au` to the Vercel project and configured `www` to redirect to the apex. DNS propagation and live HTTPS verification were still outstanding in this task.
- Added page and response-header `noindex, nofollow`, an empty sitemap, and crawlable robots output so the pre-launch site could remain available for review without advertising indexable pages. `SITE-23` tracked launch; [July history](task-log-2026-07.md#2026-07-08---public-indexing-and-social-preview-enabled) records the subsequent canonical-domain and indexing change.

## 2026-06-23 - Shared Portrait Treatment Introduced

- Consolidated the repeated Joel portrait frame and overlaid name tag across Home and Working with Joel, resolving `SITE-8` under the design-system model then in use.
- The promotion history does not establish today's reusable API; subsequent catalogue and source changes are recorded in [August](task-log-2026-08.md#2026-08-05---initial-shared-foundations-and-contact-invitation-promoted).

## 2026-06-18 - Public Identity Assets Replaced

- Replaced the favicon, touch and device icons with the owner-approved folded-paper mark, including an SVG counterpart so browsers would not retain the old visual identity.
- Added served PNG-dimension checks and resolved `DEBT-31`.

## 2026-06-18 - Cross-Site Review Ownership Separated

- Kept broad review observations outside concrete `SITE-*` work; actionable findings belonged in the visitor backlog or technical debt tracker.
- Added checklists to the development Documents reader alongside reports and plans. The initial accessibility checklist was later replaced by the [owner-directed monitors established in July](task-log-2026-07.md#2026-07-22---manual-review-monitors-replaced-readiness-tracking).

## 2026-06-17 - Enquiry API And Safety Contracts Established

- Moved the enquiry endpoint to TypeScript and structured fields validated before server-side email construction. Direct API tests covered accepted and invalid submissions, honeypots, missing configuration and provider failures (`DEBT-4`, `DEBT-10`).
- Returned generic visitor-safe errors while retaining provider and runtime diagnostics in server logs; URL-encoded native posts received minimal HTML outcome pages (`DEBT-5`). Complete JavaScript-disabled page rendering came later.
- Added pre-parse content-type, declared-size and cross-site request guards while preserving JSON and native form submissions (`DEBT-3`). Firewall rate limiting, explicit delivery configuration and timezone comparison remained separately tracked as `DEBT-23`, `DEBT-11` and `DEBT-22`.

## 2026-06-17 - Canonical Routing And Local QA Baseline Repaired

- Prevented Production canonicals from using localhost or unique deployment URLs, initially using the stable Vercel hostname with a custom-domain override. Added an app-powered, noindexed `404.html` fallback (`DEBT-6`); repeatable deployed smoke checks remained under `DEBT-24`.
- Restored the public-site browser gate and diagnostics (`DEBT-1`), made each page own its single main landmark (`DEBT-2`), and introduced the encoding scan (`DEBT-7`). These were local checks.
- Included the TypeScript enquiry API in the application build; `DEBT-9` retained the separate scripts, tests and configuration type-checking gap.

## 2026-06-17 - Project Memory And Design Governance Established

- Created `docs/project/`, separated project guidance from design-system documentation, and seeded `DEBT-*` and `SITE-*` records from the technical review. The review supplied evidence; the trackers owned concrete follow-up work.
- Rebuilt design-system guidance by responsibility and preserved unresolved typography work in debt records. Removed the blanket side-stripe prohibition after the owner accepted the existing treatment (`DEBT-14`), keeping unused-source cleanup separate.
- Distinguished true debt prerequisites from related context. Current tracker state lives in [project debt](../project-debt.md) and the [site backlog](../site-backlog.md), with completed records in their respective archives.

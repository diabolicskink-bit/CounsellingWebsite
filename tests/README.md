# Tests

This guide owns coverage organisation, commands, and execution limits. [Verification](../docs/guidance/VERIFICATION.md) owns test design and check selection. [AGENTS.md](../AGENTS.md) owns task authorization.

## Test Scope And Maintenance

Follow [Verification](../docs/guidance/VERIFICATION.md#test-scope-and-maintenance) for test design and [Analytics](../docs/guidance/ANALYTICS.md) for dashboard and Preview boundaries.

## Organisation

| Folder | What belongs here |
| --- | --- |
| `node/analytics/`, `node/enquiry/`, `node/visits/` | Domain behaviour with external services substituted. |
| `node/server/` | Shared server origin and header rules. |
| `node/site/` | Route/privacy rules, canonical origins and article integrity. |
| `node/tooling/` | Migration handling, read-only queries, article editing and essential deployment/tool boundaries. |
| `browser/public-site/` | Focused enquiry, navigation and hydration/accessibility checks. |
| `browser/analytics/` | Collection/attribution and private no-tracking checks. |
| `database/` | Reporting SQL executed against synthetic Preview fixtures. |

Use `*.test.mjs` for Node/database tests and `*.spec.ts` for Playwright. Keep helpers local unless several files use them; shared helpers have no test suffix and register no tests or hooks on import.

## Commands

Run from the repository root. [package.json](../package.json) owns the exact selections. These commands describe available checks, not a required sequence.

| Command | Selection and limits |
| --- | --- |
| `npm run check:encoding` | Repository text-encoding check, useful for documentation and copy edits. |
| `npm run test:node` | All local Node tests; no database or running site. |
| `npm run test:api` | Shared server and analytics/enquiry/visit tests with external services substituted. |
| `npm run test:analytics` | API tests plus migration handling and read-only-query checks. |
| `npm run typecheck:tests` | Strict TypeScript check for Playwright specs. |
| `npm run test:e2e` | Public browser tests against an existing local build/server. |
| `npm run qa:site` | Encoding, test types, build, then public browser tests. |
| `npm run qa:analytics` | Test types and local analytics checks, then blocked/enabled collection builds and browser checks; no real database. |
| `npm run test:database` | Opt-in PostgreSQL reporting checks against synthetic Preview fixtures. |
| `npm run qa` | Encoding, test types, local Node checks, build, and public browser suite; excludes database and analytics browser tests. |
| `npm run audit:lighthouse` | Build and local Lighthouse reports; no enforced performance budget. |

For focused work, run the affected file, for example `node --test tests/node/enquiry/email.test.mjs`. Browser discovery can be checked with `npx playwright test --list` without launching browsers.

## Runtime And Evidence Boundaries

[Current scope](../docs/reference/SYSTEM.md#working-locally-and-verifying-changes) covers dependency setup and local development/build commands.

Playwright uses installed Google Chrome with `channel: "chrome"`; the project retains the name `chromium`, but no Playwright browser download is required. For ad-hoc IDE inspection, use [visual verification](../docs/guidance/VERIFICATION.md).

QA manages local built-output servers on port 4287 for the public suite and 4288 for analytics. Analytics QA rebuilds `dist/` with test collection settings; rerun an ordinary build before treating that output as a normal site build. Commands that rebuild the same output directory must run sequentially.

Local Node tests substitute external dependencies, and browser tests intercept the relevant API/provider responses. They verify local behaviour and contracts, not deployed email delivery, Vercel middleware, real SQL execution, or all-browser coverage.

Database tests read `.env.preview.local` directly, so ambient `DATABASE_URL` cannot select a different database. Follow [database setup](../database/README.md). Missing configuration fails the explicit database command; ordinary checks never need it. These fixtures execute real reporting SQL against synthetic sources without reading or changing retained visitor data. They do not verify the deployed API or UI.

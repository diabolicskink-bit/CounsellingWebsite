# Tests

This is a small, owner-operated site. Tests should protect useful behaviour without making routine content or design changes expensive.

- Keep coverage for enquiry delivery and failure, authentication/privacy, data identity and deletion boundaries, reporting calculations, and article saving.
- Use a few representative cases for a behaviour. Keep detailed input cases where they protect a public or data boundary; avoid repeating the same checks in every layer.
- Do not pin public copy, headings, service lists, layout, complete config objects, SQL formatting or inventories of current files. A copy change or feature removal does not by itself need a regression test.
- Dashboard presentation is checked by the owner. Browser tests protect public journeys and collection/privacy boundaries, not report layouts.

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

Run from the repository root. [package.json](../package.json) owns the exact selections.

| Command | Selection |
| --- | --- |
| `npm run test:node` | All local Node tests; no database or running site. |
| `npm run test:api` | Shared server and analytics/enquiry/visit tests. |
| `npm run test:analytics` | API tests plus migration and read-only-query checks. |
| `npm run typecheck:tests` | Playwright TypeScript checks. |
| `npm run test:e2e` | Public browser tests against an existing local build/server. |
| `npm run qa:site` | Encoding, test types, build and public browser tests. |
| `npm run qa:analytics` | Local analytics checks, then isolated blocked/enabled collection builds and browser checks. |
| `npm run test:database` | Explicit PostgreSQL fixture tests. |
| `npm run qa` | Local Node checks, build and public browser suite; excludes database and analytics browser tests. |

For focused work, run the affected file, for example `node --test tests/node/enquiry/email.test.mjs`. Browser discovery can be checked with `npx playwright test --list` without launching browsers. Use installed Chrome; no Playwright browser download is required.

Database tests read `.env.preview.local` directly, so ambient `DATABASE_URL` cannot select a different database. Follow [database setup](../database/README.md). Missing configuration fails the explicit database command; ordinary checks never need it. These fixtures neither read nor change retained visitor data.

Local mocks/builds do not verify deployed email delivery, Vercel middleware or live database behaviour. [AGENTS.md](../AGENTS.md#engineering-and-verification) owns proportionate verification and dashboard Preview policy.

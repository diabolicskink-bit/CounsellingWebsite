# Database

Versioned SQL migrations for the first-party visit ledger live in
`database/migrations/` and are applied in filename order with `npm run
db:migrate`. The command records each filename and checksum in
`visit_schema_migrations`, skips migrations already applied unchanged, and
refuses to continue if an applied migration file has been edited.

`npm run db:migrate` reads `.env.local` when it exists. After pulling Preview
into the ignored `.env.preview.local` file, use `npm run db:migrate:preview` to
target that environment explicitly.

The application connects to Neon through the server-only `DATABASE_URL`
environment variable. Never prefix this variable with `VITE_` or expose it to
browser code.

The Vercel-managed Neon resource is connected only to Development and Preview.
It is intentionally not connected to Production while preview testing is in
progress.

`visit_ledger` is the read-only reporting view created by migration `0002`. It
marks the earliest retained visit for an anonymous browser ID as `new`, marks
later retained visits as `returning`, classifies traffic, and adds page-view
totals without exposing any browser-facing read route.

Repository-owned Neon saved-query templates live in `database/queries/`. The
queries apply explicit ordering and Australia/Perth reporting dates; a view does
not guarantee its own row order. Full referrer URLs and identifiers are private
operational data and should remain accessible only through Neon.

Browser identifiers rotate on their 12-month calendar anniversary. Vercel calls
the protected `GET /api/visit-retention` function daily at 18:15 UTC (02:15 in
Australia/Perth) and supplies the server-only `CRON_SECRET` authorization. The
cleanup deletes visits whose start time is older than Postgres `INTERVAL '12
months'`; the foreign key removes their page views through `ON DELETE CASCADE`.
Vercel Cron schedules run only on production deployments, so Slice 7 will invoke
the protected function directly when checking the preview database.

# Database

Versioned SQL migrations for the first-party visit ledger live in
`database/migrations/` and are applied in filename order.

The application connects to Neon through the server-only `DATABASE_URL`
environment variable. Never prefix this variable with `VITE_` or expose it to
browser code.

The migrations are repository definitions only at this stage. Provisioning a
Neon resource and applying them to a non-production database belongs to Slice 8
of the implementation plan.

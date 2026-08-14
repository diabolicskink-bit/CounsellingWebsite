# Visit Ledger Queries

These read-only SQL files are the repository-owned templates for Neon saved
queries. After the preview database is connected in Slice 7, paste each query
into the Neon SQL Editor and save it with the filename's descriptive name.

- `01_latest_visits.sql` is the main newest-first ledger.
- `02_visitors.sql` groups visits by anonymous browser ID.
- `03_today_overview.sql` gives the current Australia/Perth day totals.
- `04_traffic_last_30_days.sql` summarizes source and ad fields by day.
- `05_visit_page_sequence.sql` shows one selected visit's ordered paths after
  its zero UUID is replaced with a ledger `visit_id`.

The `visit_ledger` view itself has no guaranteed row order; use the explicit
ordering in these queries. Treat full referrer URLs and identifiers as private
operational data. Keep access inside Neon and do not expose these queries or
the view through a public API.

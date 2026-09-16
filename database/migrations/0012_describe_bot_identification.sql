BEGIN;

COMMENT ON COLUMN site_visits.is_bot IS
  'Combined bot classification: true for a positive BotID or User-Agent observation, false for an unflagged BotID check, null when unavailable. Positive observations persist within a visit.';
COMMENT ON COLUMN site_visits.bot_name IS
  'Best-effort bot name from Vercel, User-Agent, or crawler IP/DNS fallback; null when unidentified. Not proof of identity.';
COMMENT ON COLUMN site_visits.bot_category IS
  'Category associated with the retained bot name, when available.';
COMMENT ON COLUMN visit_ledger.is_bot IS
  'True for identified bot visits, false for unflagged visits, and null when unclassified.';
COMMENT ON COLUMN visit_ledger.bot_name IS
  'Best-effort bot name from Vercel, User-Agent, or crawler IP/DNS fallback; null when unidentified.';
COMMENT ON COLUMN visit_ledger.bot_category IS
  'Category associated with the retained bot name, when available.';

COMMIT;

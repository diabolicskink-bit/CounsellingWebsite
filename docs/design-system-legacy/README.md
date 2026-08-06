# Legacy Design-System Register

This directory is a living, non-authoritative record of inherited implementation from earlier versions and rebuilds of the site.

Items recorded here may still be important to production. Their presence means only that current source evidence has been recorded; it does not make them approved for new reuse, safe to remove, or part of the active design system.

The complete current reusable API lives only in `docs/design-system/foundations.md`, `components.md`, and `patterns.md`.

## Purpose

Use this register to reduce rediscovery while the site moves gradually toward a clean supported system:

- record inherited tokens, components, and selector families when source work encounters them
- note verified consumers and uncertainty without promoting the item
- preserve existing consumers during unrelated work
- identify focused cleanup or promotion opportunities for separately authorized tasks

This is not a required whole-codebase migration checklist. Absence from the register does not prove an item is unused.

## File Map

- `foundations.md`: inherited global tokens, typography roles, and baseline rules not promoted into the active system
- `components.md`: current React implementation not promoted into the active system
- `patterns.md`: inherited selector families and compositions not promoted into the active system

## Update Rules

- Update an entry only from current source and consumer evidence.
- Do not add new consumers because an item is recorded here.
- On promotion, remove the legacy entry and add the complete contract to the relevant active catalogue.
- On source removal, delete the legacy entry. Git, the applicable debt record, and the project task log retain completed history.
- Do not store removed-item, retired-API, or old rendered-catalogue records here.

The former `/design-language/*` catalogue and its documentation UI are preserved in Git history rather than this living register.

# Audience research

This directory contains extensive internal audience understanding for reuse by
copywriting, page-development, content, and design tasks. Dossiers combine
formal findings with public first-person experiences. They do not contain
copywriting, design, positioning, SEO, market, competitor, or communication
recommendations and do not override current project direction, confirmed facts,
or owner decisions.

## Using this research

- Read the relevant dossier before starting new audience research.
- Use only the evidence relevant to the current task.
- Expand thin, dated, or narrow coverage when it materially affects the work.
- Add durable new findings back to the dossier rather than leaving them in a
  one-off report.
- Ignore `working/` outside the same continuing parent research task unless the
  user explicitly requests its inspection. Working files are retained raw
  material, not reusable evidence.
- Derive communication or implementation decisions in the appropriate
  downstream task, applying current project and writing direction there.

## Dossiers

| Audience | File | Evidence coverage |
| --- | --- | --- |
| {{AUDIENCE}} | [{{DOSSIER_FILE}}]({{DOSSIER_PATH}}) | {{COVERAGE}} |

## Structure

- `audiences/` contains one primary dossier for each broad audience selected by
  the owner.
- `audiences/subsegments/` contains narrower files only when a subsegment has a
  substantial distinct evidence base or recurring downstream use.
- Parent dossiers retain a concise description of, and link to, any extracted
  subsegment.
- `working/` contains retained, non-canonical files from delegated research.
  New runs use a dated per-task folder; downstream work ignores the directory.

## Maintenance

Update the table whenever a dossier is created, renamed, split, merged, or
substantively refreshed. Keep each coverage description specific to the
evidence actually present.

Do not delete or tidy working files at task completion. Keep them Git-tracked
until the user reviews and removes them.

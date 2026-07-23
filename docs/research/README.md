# Audience research

This directory contains extensive internal audience understanding for reuse
across copywriting, page development, content strategy, service explanation,
and website work. Dossiers combine formal findings with public first-person
experiences. They are not approved public copy and do not override owner
decisions or current service information.

## Using this research

- Read the relevant dossier before starting new audience research.
- Check its research coverage before relying on it. Research questions or a
  brief without findings do not constitute audience evidence.
- Use only the material relevant to the current decision or writing task.
- Expand thin, dated, or narrow coverage when it materially affects the work.
- Add durable new findings back to the dossier rather than leaving them in a
  one-off report.
- Ignore `working/` outside the same continuing parent research task unless the
  owner explicitly requests its inspection. Working files are retained raw
  material, not reusable evidence.
- Apply [writing direction](../project/writing-direction.md), relevant current
  project information, and owner decisions before turning research into public
  wording.

## Dossiers

| Audience | File | Evidence coverage |
| --- | --- | --- |
| Kink clients | [kink-clients.md](audiences/kink-clients.md) | Rebuilt formal evidence, public-web discussion with a 15-source recurrence sample, and dated Australian/Perth search and provider observations |
| ENM and polyamory clients | [enm-polyamory-clients.md](audiences/enm-polyamory-clients.md) | Formal evidence, international public-web discussion, Australian/Perth search and service landscape, plus targeted therapist-attitude, ENM-incongruent advice and sexual-health competence research |
| LGBTQIA+ clients | [lgbtqia-clients.md](audiences/lgbtqia-clients.md) | Initial subgroup-specific formal evidence, international public web discussion, and Australian/Perth search and service landscape |

## Structure

- `audiences/` contains one primary dossier for each broad audience selected by
  the owner.
- A primary dossier describes relevant subsegments and situations within the
  broader audience.
- `audiences/subsegments/` is created only when a subsegment has a substantial
  distinct evidence base, recurring downstream use, a maintainability need, or
  an explicit owner request.
- Parent dossiers retain a concise description of and link to any extracted
  subsegment.
- `working/` contains retained, non-canonical files from delegated research.
  New runs use a dated per-task folder; downstream work ignores the directory.

## Evidence model

Dossiers currently contain four evidence streams:

- formal and authoritative evidence using `F##` source IDs;
- recurring themes from public web discussion using `W##` source IDs;
- dated search and market observations using `S##` source IDs;
- authorised owner or practice knowledge using `P##` source IDs.

Public web discussion is qualitative audience signal, not a prevalence estimate.
Existing `S##` observations remain part of the current dossiers. New SEO,
search-landscape, provider, directory, competitor, and market research belongs
to `market-segment-research` rather than future audience dossiers.

Future audience dossiers use `F##`, `W##`, and `P##` in one lightweight source
table with `ID`, `Source`, and `Description`. Concrete populations, sample sizes,
percentages, comparisons, settings, and meaningful limitations belong beside
the relevant findings in the dossier body.

## Maintenance

Update the dossier table whenever a file is created, renamed, split, merged, or
substantively refreshed. Keep each coverage description specific to the
evidence actually present.

Preserve sound synthesis and source IDs where practical, expand useful gaps,
remove superseded material, and rely on Git for document history.

Do not delete or tidy working files at task completion. Keep them Git-tracked
until the owner reviews and removes them.

# Audience research

This directory contains durable internal audience research for reuse across
copywriting, SEO, content strategy, service explanation, and website work.
Research dossiers are supporting evidence and synthesis. They are not approved
public copy and do not override current product direction, confirmed service
facts, or owner decisions.

## Using this research

- Read the relevant dossier before starting new audience research.
- Check its status and review coverage before relying on it. A scaffolded dossier
  contains a research brief, not audience findings.
- Use only the material relevant to the current decision or writing task.
- Recheck stale, volatile, consequential, or weakly supported points when they
  materially affect the work.
- Add durable new findings back to the dossier rather than leaving them in a
  one-off report.
- Apply current [product direction](../project/product-direction.md), [writing
  direction](../project/writing-direction.md), confirmed project facts, and
  owner decisions before turning research into public wording.

## Dossiers

| Audience | File | Coverage | Last reviewed |
| --- | --- | --- | --- |
| Kink clients | [kink-clients.md](audiences/kink-clients.md) | Initial formal evidence, public web discussion, and Australian search/market landscape | 2026-07-16 |
| LGBTQIA+ clients | [lgbtqia-clients.md](audiences/lgbtqia-clients.md) | Initial subgroup-specific formal evidence, international public web discussion, and Australian/Perth search and service landscape | 2026-07-16 |

## Structure

- `audiences/` contains one primary dossier for each broad audience selected by
  the owner.
- A primary dossier describes relevant subsegments and situations within the
  broader audience.
- `audiences/subsegments/` is created only when a subsegment has a substantial
  distinct evidence base, recurring downstream use, materially different search
  or service decisions, or an explicit owner request.
- Parent dossiers retain a concise description of and link to any extracted
  subsegment.

## Evidence model

Dossiers can combine four distinct evidence streams:

- formal and authoritative evidence using `F##` source IDs;
- recurring themes from public web discussion using `W##` source IDs;
- dated search and market observations using `S##` source IDs;
- authorised owner or practice knowledge using `P##` source IDs.

Public web discussion is qualitative audience signal, not a prevalence estimate.
Source roles and material limitations belong in the source register so the main
synthesis can remain direct and useful.

## Maintenance

Update the dossier table whenever a file is created, renamed, split, merged, or
substantively refreshed. Review dates describe the material actually checked;
they do not imply that every section was refreshed.

Preserve sound synthesis and source IDs where practical, refresh volatile search
observations more often than stable background research, remove superseded
material, and rely on Git plus each dossier's compact review log for history.

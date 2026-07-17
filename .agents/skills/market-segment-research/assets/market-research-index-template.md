# Market research

This directory contains dated, source-backed internal research about defined
market segments, query landscapes, demonstrable demand signals, competitors,
provider supply, directories, offers, pricing, and market structure. It is
evidence for later SEO, content, positioning, and product work. It is not
strategy, approved public copy, audience research, or a provider-quality
assessment, and it does not override current project direction or owner
decisions.

## Using this research

- Read the relevant dossier and its observation dates before relying on it.
- Use only the evidence relevant to the current task and respect each sample,
  metric, geography, and source limitation.
- Refresh volatile or stale evidence when its age could change the decision.
- Add durable new market findings to the appropriate dossier rather than
  leaving them in chat or a one-off working packet.
- Ignore `working/` outside the same continuing parent research task unless the
  user explicitly requests its inspection. Working files are retained raw
  material, not reusable evidence.
- Derive SEO, content, positioning, pricing, or implementation decisions in the
  appropriate downstream task.

## Segment dossiers

| Segment | File | Geography | Last observed | Evidence coverage |
| --- | --- | --- | --- | --- |
| {{SEGMENT}} | [{{DOSSIER_FILE}}]({{DOSSIER_PATH}}) | {{GEOGRAPHY}} | {{YYYY-MM-DD}} | {{COVERAGE}} |

## Structure

- `segments/` contains one canonical dossier for each maintainable market
  boundary.
- Related geographies, delivery modes, or provider types remain together while
  their methods and evidence are meaningfully comparable.
- Separate dossiers are used when their boundaries, recurring research
  questions, evidence bases, or maintenance needs materially differ.
- `working/` contains retained, non-canonical files from delegated research.
  New runs use a dated per-task folder; normal downstream work ignores it.

## Evidence model

Canonical dossiers use:

- `Q##` for exact-query and search-interface observations;
- `D##` for demand tools, first-party demand data, and demand datasets;
- `C##` for competitor, provider, substitute, and offer pages;
- `T##` for directories, marketplaces, associations, and taxonomies; and
- `M##` for official statistics, industry sources, and broader market evidence.

These streams are not interchangeable. Search visibility does not establish
demand; provider claims do not establish quality; and a directory's taxonomy
does not define the whole market.

## Maintenance

Update the dossier table whenever a file is created, renamed, split, merged, or
substantively refreshed. Keep the observation date and coverage description
specific to the evidence actually present.

Preserve sound findings and source IDs where practical, refresh evidence in
proportion to its volatility, remove superseded material, and rely on Git for
document history.

Do not delete or tidy working files at task completion. Keep them Git-tracked
until the user reviews and removes them.

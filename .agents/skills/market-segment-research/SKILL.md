---
name: market-segment-research
description: >
  Create, expand, refresh, organise, and maintain dated market-research
  dossiers covering SEO and query landscapes, demonstrable search-demand
  signals, competitors and provider supply, directories and taxonomies,
  offers, pricing, visible market language, and segment-level market structure.
  Use when Codex needs reproducible research about a service segment,
  competitor set, local or online market, or search landscape for later SEO,
  content, positioning, or product work. Produce a durable Markdown artifact
  under docs. Keep observed market evidence separate from audience research and
  strategy; do not infer demand from search-result presence, audience preference
  from provider language, provider quality from claims, or stable rankings from
  a snapshot.
---

# Market segment research

Build a dated, source-backed account of how a defined market appears across
search, demand evidence, providers, intermediaries, and other relevant market
sources. Preserve enough method and scope for another agent to understand what
was actually observed. Produce research for later decisions, not the decisions
themselves.

## Keep the evidence boundaries explicit

Include only streams relevant to the brief:

- exact-query and search-interface observations;
- measured or modelled query-demand evidence from accessible tools;
- first-party search, enquiry, or conversion data when access is authorised;
- competitor, provider, substitute, and adjacent-service pages;
- directories, marketplaces, professional associations, and taxonomies;
- visible roles, services, formats, locations, prices, offers, claims, and
  terminology;
- official statistics, industry data, market reports, and transparent derived
  estimates; and
- distribution channels, referral routes, geographic coverage, and other
  evidence that clarifies the segment's structure.

Separate what each stream can establish:

- A search-result sample shows a dated visible result set, not search volume,
  stable rank, market share, or audience preference.
- A demand tool reports its own metric, model, geography, and period. It does
  not automatically measure total demand or service uptake.
- A provider page establishes what that provider publicly says. It does not
  establish competence, quality, effectiveness, availability, or client
  preference.
- A directory establishes its own categories, filters, listings, and counts.
  It does not define the whole market or validate its members.
- A price, review count, availability label, or other volatile field is an
  observation as of the recorded date, not a durable provider fact.
- A repeated feature is a pattern within the defined sample, not a population
  rate unless the sample supports that claim.

Exclude unless the user explicitly requests a separate downstream task:

- audience lived-experience research, audience preferences, inferred visitor
  psychology, or public-discussion synthesis; route these to
  `audience-research`;
- SEO targeting, content opportunities, positioning, messaging, page
  requirements, copy, design, or implementation recommendations;
- provider rankings, quality judgements, clinical judgements, or unsupported
  labels such as `best`, `leading`, `saturated`, or `high demand`;
- invented keyword volumes, market sizes, conversion rates, competitor sets,
  or numerical precision; and
- the project's own pages as competitor evidence unless the user requests an
  own-site or comparative audit.

If the user requests research and recommendations together, finish and save the
research artifact first. Keep recommendations in the downstream deliverable so
the reusable dossier remains an evidence record rather than a strategy memo.

## Establish authority

1. Read repository instructions and the documentation map for file conventions,
   authority, and update rules.
2. Read the market-research index, relevant dossier, and linked market files.
3. Read only the project material needed to define the service, segment,
   geography, known competitors, or authorised first-party data.
4. Treat existing site copy, plans, reports, and owner hypotheses as research
   prompts unless they contain separately identifiable evidence.
5. Preserve unrelated changes. Do not edit public copy, project direction,
   provider listings, analytics configuration, or implementation unless the
   task explicitly requests that separate work.

## Choose the operation

Use the smallest operation that satisfies the task:

- **Set up** the research root, index, segment directory, working directory,
  and first dossier.
- **Create** a broad evidence-backed dossier for a defined market segment.
- **Expand** a material gap such as demand, competitors, directories, pricing,
  geography, or query coverage and integrate it into the dossier.
- **Refresh** volatile, dated, thin, challenged, or no-longer-comparable
  evidence.
- **Compare** a defined set of providers, segments, locations, or channels
  using a common observation frame.
- **Restructure** duplicated material or split a dossier that has become too
  broad to maintain.
- **Extract** source-bound findings from an indexed dossier for a downstream
  task without deriving that task's strategy.

New research must not live only in chat or an unindexed working file. Create or
update at least one durable Markdown research artifact under `docs/`. If setup
and research are requested together, perform setup first and continue into
research rather than stopping at empty scaffolding.

## Set up the market-research library

Follow an established repository convention when one exists. Otherwise create:

```text
docs/market-research/
  README.md
  segments/
    <segment-slug>.md
  working/
    README.md
    <YYYY-MM-DD>--<segment-slug>--<operation-slug>/
      <subtask-slug>.md
```

Use `assets/market-research-index-template.md` for the initial index,
`assets/market-segment-dossier-template.md` for a new dossier, and
`assets/market-research-working-readme.md` for `working/README.md`. Replace all
placeholders and remove unused example rows or sections.

- Use short lowercase hyphenated paths.
- Define a segment tightly enough that geography, service type, delivery mode,
  and comparison set are intelligible.
- Add every canonical dossier to the index with its geography, last observation
  date, and actual evidence coverage.
- Add the library to the repository documentation map when that map owns
  documentation discovery.
- Keep one canonical location for durable findings. Cross-link rather than
  duplicate across dossiers.
- Treat retained working notes as non-canonical, possibly incomplete research.

Keep related situations in one dossier while their evidence and research
questions remain meaningfully comparable. Split when the geography, segment,
method, evidence base, recurring use, or document size makes a separate file
more maintainable. Move rather than duplicate detailed findings and leave
concise links in both directions.

## Define the research brief and observation frame

Record before researching:

- the segment definition and inclusion and exclusion boundary;
- geography, delivery mode, service category, and time period;
- the research questions and intended evidence streams;
- known competitors, substitutes, directories, or tools supplied by the user;
- the observation window and freshness needed for the decision;
- exact metrics or repeated fields required for comparison; and
- access limits involving location, account state, personalisation, device,
  paid tools, private data, dynamic interfaces, or inaccessible pages.

Define terms such as `competitor`, `provider`, `listing`, `local`, `online`,
`price`, `search volume`, and `result` whenever ambiguity could change the
sample or conclusion. Use research questions to guide the work rather than
forcing every dossier through every possible market topic.

## Delegate independent research when useful

The parent agent may use subagents when evidence streams, geographies,
competitor samples, or research questions can be investigated independently.
Delegation is optional; do not create working files merely to imitate a
multi-agent workflow.

Read `references/parallel-research.md` completely before spawning a research
subagent or creating a delegated working packet. Follow these core rules:

- Give each subagent one bounded research question or evidence stream and one
  unique file in the current task folder under
  `docs/market-research/working/`.
- Require substantive findings, methods, sources, and limits in that file.
- Do not allow subagents to edit indexed dossiers, the research index, final
  source IDs, another subagent's file, or unrelated project material.
- Read every delegated file, inspect the cited sources needed for integration,
  reconcile overlapping or non-comparable samples, and assign stable source
  IDs before changing the canonical dossier.
- Retain every working file unchanged at handoff and report the task-folder
  path. Working files are ordinary Git-tracked project files.
- Ignore working files outside the same continuing parent task unless the user
  explicitly requests their inspection. Indexed dossiers remain the reusable
  market-research authority.

## Research proportionately

Read `references/research-method.md` completely before conducting internet
research, analysing demand, defining a competitor sample, or writing new market
findings.

Select the evidence streams that can answer the brief. Start broad enough to
discover relevant categories and intermediaries, then use explicit samples for
counts and comparisons. Deliberately seek contrasting providers, adjacent
services, alternate terminology, contradictory evidence, and sampled absences.
Do not use a fixed source quota. Continue until the defined questions are
answered proportionately, new searching mainly repeats represented patterns,
or a stated practical limit is reached.

When a desired measure is unavailable, report it as unknown. Use proxies only
when they add real information, name them as proxies, and state what they do
not establish. Never backfill a missing demand measure from result counts,
autocomplete, directory size, provider abundance, or intuition.

## Write the canonical dossier

Start with concise `Key findings`, then use descriptive headings shaped by the
research. A useful dossier normally contains:

- the segment boundary, geography, observation window, research questions,
  coverage, and methods;
- source-shaped observations with the exact query, tool, page, dataset,
  provider sample, metric, or taxonomy that produced them;
- cross-source synthesis of repeated features, differences, segment structure,
  and contradictions within the defined evidence;
- denominators and shared fields for every counted comparison;
- metric definitions, units, periods, geographies, assumptions, and formulas
  beside quantitative findings; and
- explicit limitations, non-comparable evidence, sampled absences, and
  unresolved questions.

Use tables when the same fields are compared across three or more queries,
providers, prices, channels, or datasets. Keep narrative for context,
exceptions, synthesis, and evidence that does not fit a common field set.

Use stable source IDs:

- `Q##` for exact-query and search-interface observations;
- `D##` for demand tools, first-party demand data, and demand datasets;
- `C##` for competitor, provider, substitute, and offer pages;
- `T##` for directories, marketplaces, associations, and taxonomies; and
- `M##` for official statistics, industry sources, and broader market evidence.

Preserve sound existing or legacy IDs where practical rather than renumbering a
maintained dossier. Cite IDs beside material findings. In the source register,
record `ID`, `Source`, `Observed`, and `Scope and material limit`. Put detailed
evidence in the body rather than turning the register into a second dossier.

Open the original source before using an exact figure, price, quotation,
calculation input, or unusually consequential claim. Label provider claims,
modelled estimates, relative indices, derived calculations, and first-party
data accurately. Do not merge counts from different dates, interfaces,
geographies, denominators, or inclusion rules unless the comparison is valid
and explained.

## Maintain the library

Before updating, compare the request with current coverage and observation
dates. Refresh the evidence whose volatility or age matters to the task.

- Preserve sound findings and source IDs where practical.
- Date observations at the level needed to avoid implying freshness.
- Replace or remove superseded claims; rely on Git for document history.
- Keep differently scoped or non-comparable samples separate.
- Consolidate duplication and repair links after moves or splits.
- Update the dossier's coverage, observation window, source register, and index
  entry after a substantive pass.
- State what was checked, what changed, and what remains unknown or unmeasured.

Do not claim a full market refresh when only one evidence stream, query set,
competitor group, or geography was checked.

## Hand research to downstream work

A downstream SEO, content, copywriting, page-development, product, or
positioning task may interpret the dossier. This skill should extract relevant
evidence and identify material gaps. The downstream task owns:

- keyword selection, prioritisation, and opportunity scoring;
- positioning, differentiation, and communication recommendations;
- page structure, metadata, copy, offers, and conversion decisions;
- product, service, channel, pricing, and implementation decisions; and
- application of current project direction, audience research, and owner
  judgement.

Return durable new market evidence discovered during downstream work to the
dossier. Do not return downstream implications as if they were observed market
facts.

## Quality check

Verify that:

- a durable Markdown dossier exists under `docs/` and is indexed when the
  library uses an index;
- the segment, geography, observation date, methods, samples, result depth,
  tools, and material access limits are clear;
- search visibility, search demand, service uptake, provider supply, market
  size, and audience preference have not been treated as interchangeable;
- exact figures, prices, quotations, calculations, and unusually consequential
  claims were checked against the original source and retain their units,
  periods, definitions, and limitations;
- provider and directory statements are attributed as self-description rather
  than presented as verified quality or competence;
- counts have defined samples and denominators, while sampled absences and
  volatile rankings are described proportionately;
- source IDs resolve and the source register contains `ID`, `Source`,
  `Observed`, and `Scope and material limit`;
- no audience synthesis, SEO strategy, positioning, copy, design, or
  implementation recommendation entered the research record; and
- when research was delegated, every subagent wrote its assigned file, only
  the parent changed canonical research, and the retained task-folder path is
  ready for the final handoff.

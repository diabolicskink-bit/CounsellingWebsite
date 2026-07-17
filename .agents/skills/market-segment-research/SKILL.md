---
name: market-segment-research
description: >
  Create, expand, refresh, organise, and maintain dated market-research
  dossiers covering SEO and queries, demand signals, competitors, providers,
  directories, offers, pricing, language, market structure, and detailed
  owner-specific decision synthesis. Use for local, national, online, or
  international market and SEO decisions, including work that must combine
  target-location reality with transferable patterns from broader or more
  mature markets. Produce a durable Markdown artifact under docs with clear
  interpretation, assumptions, opportunities, risks, prioritised
  recommendations, and next steps. Keep evidence, geographic scope, inference,
  and recommendations distinguishable; keep audience lived-experience research
  separate; and do not infer demand from result presence, audience preference
  from provider language, provider quality from claims, or stable rankings from
  a snapshot.
---

# Market segment research

Build a dated, source-backed account of how a defined market appears across
search, demand evidence, providers, intermediaries, and other relevant market
sources. Then interpret that evidence for the owner's actual context and make
clear, prioritised recommendations. Preserve enough method and scope for
another agent to distinguish what was observed, what was inferred, and why a
recommended action follows.

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

Keep outside this skill unless the user explicitly requests a combined task:

- audience lived-experience research, audience preferences, inferred visitor
  psychology, or public-discussion synthesis; route these to
  `audience-research`;
- provider rankings, quality judgements, clinical judgements, or unsupported
  labels such as `best`, `leading`, `saturated`, or `high demand`;
- invented keyword volumes, market sizes, conversion rates, competitor sets,
  or numerical precision; and
- the project's own pages as competitor evidence unless the user requests an
  own-site or comparative audit.

This skill owns market interpretation and recommendations, including SEO and
query priorities, positioning, differentiation, offer, price, channel,
information architecture, content opportunity, conversion-path and measurement
recommendations when supported by the brief. It does not own finished public
copy, page design, code, analytics implementation, provider outreach or other
execution unless the user explicitly requests that additional work.

Keep three layers visibly separate throughout the dossier:

1. **Evidence:** dated observations and measured or reported findings with
   source IDs and material limits.
2. **Interpretation:** reasoned conclusions about what the combined evidence
   likely means for the defined owner and decision, labelled as inference where
   appropriate.
3. **Recommendations:** explicit actions or choices, with rationale, priority,
   confidence, dependencies, risks and validation needs.

Do not weaken recommendations into generic possibilities merely because the
evidence is incomplete. Make the best justified recommendation, state the
uncertainty, and say what evidence or experiment could change it. Use explicit
assumptions to bridge evidence or context gaps when doing so is decision-useful:
state the assumption, why it is reasonable, how much the recommendation depends
on it, and what would change if it proves false. Never present an assumption as
an observed market fact.

## Establish authority

1. Read repository instructions and the documentation map for file conventions,
   authority, and update rules.
2. Read the market-research index, relevant dossier, and linked market files.
3. Read the current product or business direction and the project material
   needed to understand the owner's service, capabilities, constraints,
   geography, commercial aims, known competitors, and authorised first-party
   data. Recommendations must be specific to this context.
4. Treat existing site copy, plans, reports, and owner hypotheses as research
   prompts unless they contain separately identifiable evidence. Use approved
   direction and current service facts as decision constraints, not external
   market evidence.
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
- **Advise** on what the market evidence means for the owner and recommend
  priorities across SEO, positioning, offers, pricing, channels, content,
  conversion paths or measurement.
- **Restructure** duplicated material or split a dossier that has become too
  broad to maintain.
- **Extract** evidence, interpretation and recommendations from an indexed
  dossier for a downstream task.

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
- the target decision market, the owner's actual serviceable market, and any
  broader comparison or learning geographies;
- the research questions and intended evidence streams;
- the decision questions the owner needs answered and the outcomes the work is
  intended to improve;
- known competitors, substitutes, directories, or tools supplied by the user;
- relevant owner capabilities, constraints, differentiators, service facts and
  non-negotiable direction;
- the observation window and freshness needed for the decision;
- exact metrics or repeated fields required for comparison; and
- access limits involving location, account state, personalisation, device,
  paid tools, private data, dynamic interfaces, or inaccessible pages.

Define terms such as `competitor`, `provider`, `listing`, `local`, `online`,
`price`, `search volume`, and `result` whenever ambiguity could change the
sample or conclusion. Use research questions to guide the work rather than
forcing every dossier through every possible market topic.

Also define the recommendation scope. Unless the user narrows it, cover every
decision area materially affected by the evidence rather than stopping at SEO
or competitor description. Do not force recommendations into an area for which
the research and owner context have no useful bearing.

## Use layered geographic evidence

Read `references/geographic-scope-and-transfer.md` completely before researching
a location-specific segment or using evidence from one geography to inform a
decision in another.

For a local decision, consider four distinct evidence layers:

1. **Target decision market:** the place the decision must work, such as Perth.
2. **Serviceable market:** other places the owner can actually serve, such as
   Western Australia or Australia-wide online.
3. **Comparable markets:** places with useful structural similarity, such as
   other Australian cities.
4. **Learning markets:** broader or more mature markets that can reveal query
   language, intent patterns, content models, offers, channels, taxonomies or
   emerging conventions, even when their providers are not competitors.

Do not research every layer mechanically. Select broader geographies when they
can answer a decision question better than the target market alone. Keep local
market reality and external learning separate, then assess transferability
before using a broader-market pattern in a local recommendation.

Record the evidence geography, query wording, requested or actual search
location, result/provider geography, decision role and transfer limit. Never use
international keyword volume, rankings, prices, regulation, provider abundance
or platform behaviour as if it measured the target market.

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

## Develop detailed decision synthesis

Read `references/decision-synthesis.md` completely after the evidence has been
integrated and before writing or refreshing recommendations.

Make the synthesis answer the owner's decision rather than merely restating
patterns. Explain:

- what the evidence changes, confirms, weakens or leaves unresolved for the
  owner;
- how the market appears to work and which forces, intermediaries, role
  boundaries, query behaviours or offer conventions matter most;
- what is specific to the target market, what broader markets reveal, and
  which broader patterns are transferable, adaptable, testable or unsuitable;
- where the owner's current capabilities or constraints fit that structure;
- which apparent opportunities are well supported, assumption-dependent or
  only suitable for testing;
- what to do, what not to do, in what order, and why; and
- which measurements or experiments would reduce the most consequential
  uncertainty.

Use stated assumptions where necessary. Trace material interpretations and
recommendations to source IDs, project facts, owner direction and assumptions
without pretending that a recommendation is itself observed evidence.

## Write the canonical dossier

Start with concise `Key findings`, then use descriptive headings shaped by the
research and the decision. A useful dossier normally contains:

- the segment boundary, geography, observation window, research questions,
  coverage, and methods;
- the target, serviceable, comparable and learning geographies actually used,
  why each was selected, and the decision role of its evidence;
- source-shaped observations with the exact query, tool, page, dataset,
  provider sample, metric, or taxonomy that produced them;
- cross-source synthesis of repeated features, differences, segment structure,
  and contradictions within the defined evidence;
- denominators and shared fields for every counted comparison;
- metric definitions, units, periods, geographies, assumptions, and formulas
  beside quantitative findings; and
- explicit limitations, non-comparable evidence, sampled absences, and
  unresolved questions.

After the evidence sections, include a substantial decision layer unless the
user explicitly asks for evidence only:

- `What this means for {{OWNER_OR_PROJECT}}`: detailed, owner-specific
  interpretation rather than a generic findings recap;
- `Assumptions used`: only the assumptions that materially support the
  interpretation or recommendations, with consequence if wrong;
- `Geographic transfer assessment`: broader-market patterns that affect the
  advice, their transfer classification, localisation and target-market check;
- `Recommendations`: explicit actions and choices grouped by the decision
  areas that the evidence actually affects;
- `Priorities and sequence`: now/next/later or another clear ordering, with
  rationale, dependencies and effort or risk where material;
- `What not to do`: tempting conclusions or actions the evidence argues
  against;
- `Measurement and validation`: the smallest useful tests or datasets for
  consequential uncertainties; and
- `Decision summary`: a concise statement of the recommended direction and
  the strongest reasons for it.

Do not impose a rigid module list. Combine or rename decision sections when a
more natural structure makes the reasoning clearer, but never omit the actual
interpretation, recommendations and prioritisation by hiding them inside a
findings summary.

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
Include the evidence geography and cross-market decision role in the scope
field when they are not obvious from the source name.

Open the original source before using an exact figure, price, quotation,
calculation input, or unusually consequential claim. Label provider claims,
modelled estimates, relative indices, derived calculations, and first-party
data accurately. Do not merge counts from different dates, interfaces,
geographies, denominators, or inclusion rules unless the comparison is valid
and explained.

For every material recommendation, make its chain inspectable:

`evidence + owner context + stated assumptions -> interpretation -> action`

Use source IDs for the evidence part of that chain. Use a concise confidence
statement based on evidence quality and assumption sensitivity, not a
fabricated numerical confidence score.

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
- Revisit interpretations and recommendations when the evidence, owner
  direction, service capability or material assumptions change.
- Date or qualify recommendations whose usefulness depends on volatile market
  conditions or a temporary project constraint.
- State what was checked, what changed, what is assumed, and what remains
  unknown or unmeasured.

Do not claim a full market refresh when only one evidence stream, query set,
competitor group, or geography was checked.

## Hand recommendations to execution work

Use this skill to own the market-facing reasoning and recommended direction.
Hand off execution at the point where another specialised skill is better
suited to produce the artifact or change, for example:

- `copywriter` or `develop-page-copy` for finished messaging, page plans,
  metadata and public copy;
- website or product skills for design and implementation;
- analytics or engineering work for measurement implementation; and
- `audience-research` for formal and public first-person audience understanding.

Give the downstream task the relevant evidence, owner-specific interpretation,
recommended direction, assumptions, constraints and open tests. The downstream
task may refine implementation choices, but should not have to reconstruct what
the market research means from raw observations.

Return durable new market evidence discovered during execution to the dossier.
Keep implementation results and later recommendations visibly separate from
the evidence that originally supported them.

## Quality check

Verify that:

- a durable Markdown dossier exists under `docs/` and is indexed when the
  library uses an index;
- the segment, geography, observation date, methods, samples, result depth,
  tools, and material access limits are clear;
- target, serviceable, comparable and learning geographies are distinguished,
  and the query, search-observation and result geographies are recorded where
  they materially differ;
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
- the dossier contains detailed owner-specific interpretation, explicit
  recommendations, priorities, reasons, material assumptions, risks and next
  evidence or tests unless the user requested evidence only;
- each material recommendation can be traced to evidence, owner context and any
  stated assumptions, and confidence is calibrated without invented scores;
- recommendations do not disguise search visibility as demand, provider claims
  as quality, sample patterns as market-wide rates, or assumptions as facts;
- broader-market evidence is not presented as target-market demand, ranking,
  price, supply or regulation, and every imported pattern used in a
  recommendation has an explicit transfer and localisation judgement;
- audience lived-experience synthesis and finished copy, design or
  implementation have not entered the dossier unless separately requested; and
- when research was delegated, every subagent wrote its assigned file, only
  the parent changed canonical research, and the retained task-folder path is
  ready for the final handoff.

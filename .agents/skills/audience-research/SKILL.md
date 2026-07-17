---
name: audience-research
description: >
  Create, expand, refresh, organise, and maintain extensive audience dossiers
  that combine formal evidence with public first-person experiences for later
  use by copywriting and page-development skills. Use when Codex needs a broad,
  detailed account of an audience's lived contexts, differing perspectives,
  recurring experiences, language, and relevant quantitative findings. This
  skill does not produce copy, design or communication recommendations, SEO
  research, search-landscape research, market analysis, or competitor analysis.
---

# Audience research

Build a broad, detailed account that helps downstream copywriting and page work
understand the audience from the inside. Combine concrete formal findings with
the texture, language, variation, and disagreement found in public first-person
material. This is extensive audience learning, not a formal research paper or
an auditable literature review.

## Keep a strict research boundary

Include formal studies, reviews, surveys, community research, public discussion,
blogs, Q&A, comments, reviews, first-person accounts, and authorised aggregated
owner observations when they deepen audience understanding. Preserve specific
populations, sample sizes, percentages, comparisons, settings, and meaningful
limitations wherever they make a finding more useful or change how it should be
read.

Develop both source-shaped reporting and careful cross-source synthesis. It is
appropriate to describe recurring lived patterns, tensions, feelings expressed
in the sources, and differences between situations. Keep that interpretation
grounded in the material rather than inventing an average person.

Exclude unless the user separately requests another kind of work:

- existing page copy, route status, navigation, metadata, release state, design,
  implementation, or other site-specific material;
- audits or maintenance of the project's own listings, pages, or search
  performance;
- statements about what a site should communicate, what visitors need, what
  would reassure them, or how the practice should differentiate itself;
- copywriting, content, service-design, product, enquiry-flow, or SEO
  recommendations;
- analyst-created slogans, principles, implications, personas, or lists of
  assumptions to avoid that are not themselves research findings;
- query landscapes, rankings, directories, provider-page comparisons,
  competitor analysis, or other SEO and market research. Route that work to
  `market-segment-research` when available.

Project facts may define the dossier's audience boundary, service type, or
geography. Do not turn those facts into audience research or carry unrelated
project details into the dossier.

## Establish authority

1. Read repository instructions and the documentation map for file conventions,
   authority, and update rules.
2. Read the research index, relevant dossier, and linked subsegment files.
3. Read only the project material needed to confirm the audience boundary,
   service category, or geography. Keep implementation and current page content
   out of the research record.
4. Preserve unrelated changes. Do not edit public copy, project direction,
   services, search listings, or implementation unless the task explicitly
   requests that separate work.

## Choose the operation

Use the smallest operation that satisfies the task:

- **Set up** the research root, index, audience directory, and first dossier.
- **Create** a researched dossier for a broad audience.
- **Expand** a material gap and integrate the result.
- **Refresh** material that is stale, thin, challenged, or missing useful
  perspectives.
- **Restructure** duplicated material or a warranted subsegment.
- **Extract** source-bound findings for a downstream task without deriving its
  strategy.

If setup and research are requested together, perform setup first and continue
into research. Do not stop at empty scaffolding.

## Set up the research library

When no project convention exists, create:

```text
docs/research/
  README.md
  audiences/
    <audience-slug>.md
    subsegments/
      <parent-slug>--<subsegment-slug>.md
  working/
    README.md
    <YYYY-MM-DD>--<audience-slug>--<operation-slug>/
      <subtask-slug>.md
```

Use `assets/research-index-template.md` for the initial index and
`assets/audience-dossier-template.md` for a new dossier. Use
`assets/research-working-readme.md` for `working/README.md`. Replace every
placeholder and remove unused example rows or sections.

- Use a short lowercase hyphenated filename.
- Use the owner-selected broad audience as the parent dossier. Keep relevant
  situations inside it unless separate evidence warrants another file.
- Add every dossier to the index with a concise description of its evidence
  coverage.
- Add the library to the repository documentation map when that map owns
  documentation discovery.
- Keep one canonical location for a durable finding. Cross-link rather than
  duplicate across indexed dossiers. Retained working notes are non-canonical
  and may contain duplication, discarded leads, or incomplete material.

## Define the research brief

Record:

- the audience label and inclusion or exclusion boundary;
- geography, service setting, and time period where they affect the evidence;
- the research questions to answer;
- existing evidence and material gaps;
- which evidence streams are in scope.

Use starting questions to open the enquiry, not to prescribe a universal topic
list. Follow the evidence into unexpected contexts and angles, then vary later
searches to challenge the emerging account and find materially different
perspectives. Do not define research questions as communication decisions such
as "what should the page say?" or "how should the practice position itself?"

## Delegate independent research when useful

The parent agent may use subagents when evidence streams or research questions
can be investigated independently. The parent is the agent responsible for the
user's overall audience-research task. Delegation is optional; do not create
working files merely to imitate a multi-agent workflow.

Read `references/parallel-research.md` completely before spawning a research
subagent or creating a delegated working packet. Follow these core rules:

- Give each subagent one bounded research question or evidence stream and one
  unique file under the current task folder in `docs/research/working/`.
- Require each subagent to place its substantive findings in that file. Allow
  any useful format and as much detail as the subagent needs.
- Do not allow subagents to edit indexed dossiers, final source IDs, the
  research index, another subagent's file, or unrelated project material.
- Read every delegated file, check exact figures, quotations, or unusually
  consequential claims, resolve overlap or disagreement, and assign stable
  source IDs before integrating selected evidence into the canonical dossier.
- Retain every working file unchanged at handoff and report the task-folder path
  to the user. Treat working files as ordinary Git-tracked project files.
- Ignore working files outside the same continuing parent task unless the user
  explicitly requests their inspection. Indexed dossiers remain the reusable
  research authority.

## Research broadly

Read `references/research-approach.md` completely before conducting internet
research or writing new findings.

Use formal evidence to retain useful scale, comparisons, studied populations,
and reported categories. Use public first-person material to understand how
experiences are described, situated, questioned, disagreed with, or made sense
of in people's own discussions. Use authorised owner evidence only in its
de-identified scope.

Search widely and follow promising leads rather than filling a preset dossier
outline. Deliberately look beyond the first coherent story for different
contexts, positive and negative accounts, uncertainty, contradictions, and
counterexamples. Do not use a fixed source quota. Continue until additional
searching mainly repeats the patterns already represented or the task's
practical limits have been reached.

## Write detailed audience understanding

Start with concise `Key findings`, then use descriptive headings shaped by what
the research actually found. Combine:

- source-shaped descriptions that retain concrete situations and useful detail;
- cross-source synthesis of recurring experiences, expressed feelings,
  language, tensions, differences, and contradictions; and
- exact figures, sample sizes, comparisons, settings, and limitations wherever
  they make the account more informative or prevent a misleading reading.

Check the original source before placing an exact figure, quotation, or
unusually consequential claim in the canonical dossier. Do not impose a broader
verification quota or turn the dossier into a study-by-study audit. Cite stable
IDs beside material findings: `F##` for formal or authoritative evidence, `W##`
for public first-person material, and `P##` for authorised owner or practice
evidence.

Keep the source register light: one table with `ID`, `Source`, and
`Description`. Put the detailed evidence in the body where downstream readers
encounter the finding. Preserve meaningful disagreement instead of averaging
it into a single audience position. Do not convert the synthesis into a persona,
page requirement, communication priority, or copy or design recommendation.

## Handle situations and subsegments proportionately

Describe the situation itself: who or what it involved, the context, the
reported experience, and the evidence. Do not add a column explaining what the
situation "changes for the work."

Keep situations in the parent dossier by default. Create a separate file only
when at least one condition is met:

- it has a substantial distinct evidence base;
- it forms a recurring independent research question;
- the parent has become difficult to scan or maintain;
- the owner explicitly requests separate treatment.

When extracting a subsegment, move rather than duplicate the detail, retain a
concise linked summary in the parent, link back from the child, name it
`<parent-slug>--<subsegment-slug>.md`, and update the index.

## Maintain the library

Before updating, compare the request with current coverage and expand the parts
that are thin, dated, repeatedly useful, or missing important perspectives.

- Preserve sound findings and source IDs where practical.
- Add durable factual evidence discovered during later work; do not import the
  later task's recommendations or page-specific reasoning.
- Replace or remove superseded claims; rely on Git rather than retaining
  obsolete prose in the main dossier.
- Consolidate duplication and repair links after moves or splits.
- Update the dossier's research coverage, source register, and index entry after
  a substantive pass.
- State what was checked, what changed, and what remains unresearched.

Do not claim a full refresh when only one section was checked.

## Hand evidence to downstream skills

A downstream copywriting, page-development, content, design, or strategy skill
may interpret the dossier for its own task. The audience-research skill should
only extract relevant research and identify material gaps. The downstream skill
owns:

- communication priorities and recommendations;
- page structure, positioning, and wording;
- visitor-decision interpretation;
- application of project direction and service facts.

Return newly discovered durable evidence to the dossier. Do not return the
downstream task's implications as if they were audience findings.

## Quality check

Verify that:

- the research is broad enough to show variation rather than one convenient
  account of the audience;
- exact figures, quotations, and unusually consequential claims were checked
  against their sources and retain the context needed to read them sensibly;
- public accounts are presented as experiences and perspectives rather than
  population rates, diagnoses, or a universal audience view;
- the dossier contains both detailed source-shaped material and useful
  cross-source synthesis;
- sensitive public material is paraphrased and de-identified;
- the source register contains only `ID`, `Source`, and `Description`, and its
  links and cited IDs resolve;
- no SEO, market, competitor, copy, design, positioning, or communication
  recommendations entered the dossier; and
- when research was delegated, every subagent produced its assigned working
  file, only the parent changed canonical research, and the retained task-folder
  path is ready for the final handoff.

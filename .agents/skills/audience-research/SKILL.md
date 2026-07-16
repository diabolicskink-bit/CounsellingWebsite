---
name: audience-research
description: >
  Create, research, organise, update, audit, split, and maintain evidence-led
  audience dossiers for later use by other skills. Use when Codex needs to
  investigate a client or customer audience, record detailed formal research,
  document recurring public-web discussion, examine search or market evidence,
  set up or maintain a docs/research library, refresh stale findings, or turn
  repeated research into reusable project memory. This skill records what the
  evidence found; it does not produce copy, communication strategy, SEO
  recommendations, page analysis, or inferred visitor requirements.
---

# Audience research

Build and maintain a durable research record. Report what sources studied,
observed, measured, and found. Leave strategic interpretation and communication
decisions to the downstream skill or task.

## Keep a strict research boundary

Include:

- study populations, settings, methods, measures, dates, sample sizes, reported
  percentages or counts, comparisons, and findings;
- situations, experiences, reasons, language, disagreements, and gaps that are
  documented in the evidence;
- de-identified recurring themes and counterexamples from public discussion;
- dated, reproducible observations from search results, directories, and market
  pages when search research is in scope;
- authorised, aggregated owner or practice observations when they are audience
  evidence.

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
  assumptions to avoid that are not themselves research findings.

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
- **Refresh** only stale, volatile, weak, or challenged material.
- **Restructure** duplicated material or a warranted subsegment.
- **Audit** coverage, evidence, freshness, usability, and links.
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
```

Use `assets/research-index-template.md` for the initial index and
`assets/audience-dossier-template.md` for a new dossier. Replace every
placeholder and remove unused example rows or sections.

- Use a short lowercase hyphenated filename.
- Use the owner-selected broad audience as the parent dossier. Keep relevant
  situations inside it unless separate evidence warrants another file.
- Add every dossier to the index with its coverage and actual review date.
- Add the library to the repository documentation map when that map owns
  documentation discovery.
- Keep one canonical location for a finding. Cross-link rather than duplicate.

## Define the research brief

Record:

- the audience label and inclusion or exclusion boundary;
- geography, service setting, and time period where they affect the evidence;
- the research questions to answer;
- existing evidence and material gaps;
- which evidence streams are in scope.

Useful questions can cover:

- situations and meaningful subgroups represented in the evidence;
- documented reasons for seeking counselling or another service;
- therapy, healthcare, or comparable provider experiences;
- disclosure, access, provider search, selection, and barriers;
- familiar, competing, or contested language and self-description;
- negative, positive, mixed, and contradictory experiences;
- search vocabulary and the dated result landscape, when requested.

Do not define research questions as communication decisions such as "what should
the page say?" or "how should the practice position itself?"

## Research complementary evidence streams

Read `references/evidence-method.md` completely before conducting internet
research or writing new findings.

### Formal and authoritative evidence

Use peer-reviewed studies, reviews, surveys, professional guidance, standards,
official data, and credible community or advocacy research. Prefer primary
studies for exact results and reviews for the wider evidence map.

For each material study, capture as available:

- population, sample size, geography, setting, recruitment, and method;
- measure, comparison group, and time period;
- reported count, percentage, association, theme, or conclusion;
- whether the result concerns the whole sample or a subgroup;
- limitations that materially restrict use.

Do not replace concrete results with an abstract takeaway. If a source reports
that 74% of a sample entered therapy for concerns unrelated to the studied
audience characteristic, retain the percentage, sample, and source context.

### Public web discussion

Research publicly accessible forums, community spaces, blogs, Q&A pages,
comments, reviews, and first-person accounts. Use this stream to document
language, situations, recurring questions, disagreements, and examples that
formal research may not capture.

Search across independent sources and include positive, negative, neutral, and
contradictory material. When feasible, record how many reviewed sources or
threads contained a theme. That count describes the reviewed material, not the
audience population. Paraphrase and remove identifying detail.

### Search and market evidence

When search research is in scope, record the exact query or source, geography,
date, method, result types, labels, page categories, and counted observations.
Provider content is evidence of provider wording and market structure only. It
does not establish audience preferences, provider competence, clinical quality,
or what a project should do.

Never invent search volume, ranking stability, demand, or an audience need. A
sampled absence is a sampled absence, not automatically a market opportunity.

## Write evidence-rich synthesis

Organise the dossier by research question or subject. Write readable cross-source
findings, then pull out enough concrete research detail to show their scale,
shape, and basis. Do not turn the dossier into an annotated bibliography.

Place a concise `Key findings` section after the research coverage and before
the detailed findings. Use as many findings as the evidence warrants; do not add
or remove findings to meet an arbitrary count. Each finding should:

- state a strong documented pattern, difference, or contradiction;
- include one or more headline figures, sample sizes, source-set counts, or
  qualitative categories where available;
- cite the source IDs that support the statement;
- retain subgroup or setting distinctions that materially limit the finding;
- summarise research only, without becoming an implication, recommendation, or
  communication priority.

Keep the key findings shorter than the detailed evidence sections. Some
intentional repetition of the strongest figures is useful: the overview makes
the dossier scannable, while the later sections retain the fuller study context,
variation, and limitations. Label the fuller section `Detailed findings` or use
descriptive subject headings beneath the key findings.

- Start with the cross-source finding when several suitable sources support it.
- Cite the relevant source IDs beside the finding.
- Add meaningful percentages, counts, sample sizes, ranges, comparison groups,
  dates, or qualitative categories from the strongest supporting studies.
- Repeat population or method detail in the prose only when it materially
  changes how the finding should be read. Keep routine detail and limitations in
  the source register.
- If comparable studies report percentages, present their individual figures or
  a clearly attributed range. Do not invent a pooled percentage or average when
  the populations, questions, or methods differ.
- Synthesize recurring qualitative themes across studies, then give one or more
  concrete study examples rather than restating every paper separately.
- Distinguish an author's conclusion from a measured result and from the
  dossier's cross-source synthesis.
- Preserve meaningful disagreement instead of averaging it into a bland claim.
- Report public discussion as recurrence across reviewed sources, not as "what
  clients want" or a population rate.
- Report search evidence as observed query and result behaviour, not advice.
- Use direct prose, but do not gain brevity by deleting the research detail that
  makes a claim useful.

A useful quantitative pattern is:

> Across two studies that asked whether the audience characteristic was related
> to the reason for therapy, X% of sample A and Y% of sample B said it was
> unrelated or peripheral. [F##, F##]

Use the actual figures and denominators from the papers. If the studies defined
the question differently, report the two results side by side instead of
combining them.

Avoid unsupported research-sounding formulations such as:

- "Provider labels do not settle competence."
- "Visitors need concrete evidence."
- "The useful communication task is..."
- "What useful care demonstrates..."
- "The strongest differentiating opportunity is..."

Replace them with researched synthesis and concrete support. For example:
identify which labels appeared across which sampled pages, or state that
negative therapist responses recurred across several studies and then give the
specific categories reported in a study of `n=27` interviewees.

Use stable reference IDs: `F01` for formal or authoritative evidence, `W01` for
public discussion, `S01` for search or market evidence, and `P01` for authorised
owner or practice evidence.

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

Before updating, compare the request with current coverage and refresh only what
needs work.

- Preserve sound findings and source IDs where practical.
- Add durable factual evidence discovered during later work; do not import the
  later task's recommendations or page-specific reasoning.
- Refresh formal evidence and public discourse independently.
- Recheck volatile search observations more often than stable background work.
- Replace or remove superseded claims; rely on Git and the compact review log
  rather than retaining obsolete prose in the main dossier.
- Consolidate duplication and repair links after moves or splits.
- Update the dossier review coverage and date, index, and review log after a
  substantive pass.
- State what was checked, what changed, and what remains unresearched.

Do not claim a full refresh when only one section was checked.

## Hand evidence to downstream skills

A downstream copywriting, SEO, content, design, or strategy skill may interpret
the dossier for its own task. The audience-research skill should only extract the
relevant evidence and identify material gaps. The downstream skill owns:

- communication priorities and recommendations;
- page structure, positioning, and wording;
- visitor-decision interpretation;
- SEO targeting and content opportunities;
- application of project direction and service facts.

Return newly discovered durable evidence to the dossier. Do not return the
downstream task's implications as if they were audience findings.

## Quality check

Verify that:

- every material claim is traceable to an evidence source;
- formal findings retain useful sample, method, geography, date, and numerical
  detail;
- percentages clearly identify the studied sample and denominator where known;
- public themes describe the reviewed sources rather than the whole audience;
- search observations are dated, localised, reproducible, and non-prescriptive;
- situations describe evidence rather than implications for practice;
- positive, negative, mixed, and contradictory findings are represented;
- a concise `Key findings` section makes the strongest evidence scannable while
  remaining source-bound and non-prescriptive;
- no site-specific implementation, communication advice, visitor requirement,
  implications section, or assumptions-to-avoid section has entered the dossier;
- sensitive material is paraphrased and de-identified;
- source IDs, links, index coverage, and review dates agree.

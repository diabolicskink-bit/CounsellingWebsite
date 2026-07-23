---
name: develop-page-copy
description: >
  Develop visitor-facing page content through two separate artifact passes:
  create a reader-informed whole-page plan without exact public copy, or develop
  one bounded section into reviewed exact copy and a semantic
  content-composition brief using an existing page plan, supplied section
  brief, or available page context. Use when a user wants to plan a new or
  substantially rebuilt page, start from a hero-only or partial page, develop
  one section in detail with or without a page plan, create or continue
  artifacts in docs/page-plan, or prepare content for a later website-design
  pass. Do not use for a small line edit, typo fix, visual design, code
  implementation, or insertion of already-approved wording.
---

# Develop page copy

Start by establishing the range of reader situations the page needs to serve.
For a specialist page, consider the meaningful range within its subject. For a
general page, consider specialist and inclusion contexts only where they can
materially affect the writing. Do not average the range into one representative
reader or turn research into a requirements list.

Treat page planning and section development as separate passes. Use the page
plan to decide the page argument, information structure, and each section's
distinct contribution without drafting exact public copy. In a separate
section pass, use the page plan when it exists; otherwise recover a bounded
local section brief from the user's request, current page context, and
authorised sources. Develop that section into exact working copy and a semantic
content composition that a separately invoked `website-design` task can
interpret. Produce one substantive artifact per invocation and stop at its
boundary.

## Establish authority

In the Vive Counselling repository:

1. Read `AGENTS.md` and `docs/project/README.md`.
2. Read `docs/project/writing-direction.md`. Read
   `docs/project/current-scope.md` or source only when the page needs a current
   service or implementation detail.
3. Read the relevant page source, adjacent page context, selected tracker or
   plan, and `docs/research/README.md`. Use the relevant dossier or dossiers as
   directed by the reader-range method below.
4. Treat current source as factual and layout context, not approved voice,
   unless the owner or writing direction says otherwise.
5. Use research to test assumptions and relevance, not as a page outline or a
   source of ready-made marketing claims.

Use existing research dossiers and other authorised research artifacts as
inputs only. Never invoke `audience-research`, directly or through another
skill, and do not create, update, or maintain research artifacts in this
workflow. Do not choose the copywriter skill's Research mode here.

When research does not answer an editorial question, continue with a
proportionate working hypothesis and label it only when it materially affects
the plan. Do not invent a practice detail or external claim; omit or flag one
that the available material does not supply.

Do not invoke `website-design` automatically. If the user explicitly requests
copy development and design in the same task, finish the authorised page-plan
or section artifact first, then pass it to the separately authorised design
work.

## Establish the reader range

Do this before deciding the page argument or section structure. Follow the
copywriter skill's reader-range method.

For a specialist page:

- use every dossier materially relevant to the subject and any consequential
  intersections;
- identify the meaningful range of situations within the subject rather than
  one representative client;
- include people for whom the specialist subject is central and people for whom
  it is relevant context when the page needs to serve both; and
- do not let the most painful, stigmatised, or emotionally prominent finding
  become the automatic page premise.

For a general page:

- assume a reader may have none, one, or several specialist or inclusion
  contexts relevant to the practice;
- check for unstated defaults in examples, relationship language, questions,
  practical information, and descriptions of counselling;
- load a specialist dossier only when it can materially change the page; and
- mention a context only when it belongs to the subject or adds useful
  information.

Consider each materially different situation separately and retain only the
implications that change selection, language, explanation, examples, emphasis,
omission, or an inclusion check. Mark a consequential inference without
building an evidence ledger. Do not create personas, imagined testimony, one
section per reader situation, or a public catalogue of the range.

## Apply the copywriter skill to copy decisions

This skill does not replace the `copywriter` skill. Keep their responsibilities
distinct while using both in the same two-artifact workflow.

This skill owns:

- the authorised artifact and stopping point;
- the page argument, information structure, and likely reading paths;
- section ownership, boundaries, relationships, and page-level non-duplication;
- the requirement to consider structurally different directions before
  committing to one draft;
- artifact structure, stable IDs, status, and cross-links;
- direction-selection records; and
- the section's semantic content composition and design-handoff record.

The copywriter skill owns:

- reader-range and page-context analysis within each copy decision;
- page purpose, message strategy, search language, and editorial direction;
- angle craft, composition, drafting, revision, and voice;
- proportionate reader-range review; and
- sentence review, model glue, inclusion, and read-aloud review.

Before doing any of those things:

1. Read the `copywriter` skill completely. Do not choose its Research mode from
   this workflow.
2. For a page plan, use Strategy mode and only the references it routes to for
   page purpose, message, search language, editorial direction, and information
   structure. Do not enter drafting, line-craft, model-glue, or finished-copy
   review.
3. For section development, use Draft or substantial rewrite mode and follow
   the references it routes to for angle craft, exact wording, critique,
   revision, model glue, and quality review.
4. Apply its reader-range, page-context, communication-job, and reader-review
   methods to the scope established here.
5. After the copywriter review of a section, use this skill's page-flow gates
   for ownership, sequence, duplication, direction traceability, semantic
   composition, design handoff, and artifact authority.

A page plan may remain a planning artifact, but any part of it that decides the
page purpose, message, editorial direction, ordering, search language, or later
copy treatment is copy strategy and should use the copywriter skill.

## Choose one artifact mode

Identify the one substantive artifact the user has authorised:

- **Page plan:** Decide the page argument, information structure, section jobs,
  boundaries, relationships, and likely reading paths without drafting exact
  visitor-facing copy.
- **Section development:** Take one bounded section from an existing page plan,
  supplied section brief, or available page context; consider concise
  alternative directions; and produce one reviewed exact-copy and semantic
  content-composition brief.

Use these routing rules:

- A whole-page request without a usable current plan produces or updates the
  page plan and stops.
- A request that spans planning and detailed section work produces the page
  plan first and stops. Report the next section pass rather than starting it.
- A section request does not require a page plan. When one exists, use its
  section job, boundaries, reader range, and coverage map. When none exists,
  recover a local section brief from the user's request, current page or hero,
  surrounding copy, adjacent-page context, and authorised sources.
- Without a page plan, proceed when the available context supports a bounded
  section job and accurate copy. Record that page architecture, cross-section
  coverage, and relationships remain provisional. Ask only when missing context
  would materially change the section's job or make the copy unsupported.
- A request for several sections requires the user to choose the first section.
  Do not batch section artifacts.
- A section pass may make the mechanical cross-link update when a page plan
  exists, but it must not revise unrelated page-plan decisions.

Do not silently jump modes. A page plan is a decision artifact, not a longer
way to write a first draft. A section artifact does not authorise visual design,
implementation, another section, or a different page artifact.

Before creating either artifact, read
[`references/output-structures.md`](references/output-structures.md). For
section development, also read
[`references/page-flow-gates.md`](references/page-flow-gates.md).

## Page-plan mode

### 1. Reset to the authorised starting state

State what exists and what is being treated as absent. If the user says to
assume the page contains only a hero, use the hero as the sole public-copy
starting point even if old sections remain in source.

Record what the hero already communicates. Later sections must add to it rather
than restate it.

### 2. Establish the reader range and page context

Record the materially different reader situations and only the implications
that could change this page. Note what the existing opening has already
established and whether the page needs a sequential argument, scan-friendly
retrieval, or a combination. Do not turn the reader range into a list of
sections, anxieties, or researched concerns.

### 3. Decide the page argument before its sections

Use the copywriter skill's Strategy mode to consider at least two meaningfully
different editorial routes, then recommend one. Keep the alternatives concise.

The route must explain why its content, order, and emphasis suit the subject,
page purpose, and relevant readers. It must not merely rename the sections
already in source.

### 4. Give every page part one owned job

For the hero and each section, define:

- the section's distinct contribution;
- the content it should cover;
- the likely content ingredients or semantic forms, without exact copy;
- the editorial rule governing selection and treatment;
- what it must not do or repeat;
- its relationship to surrounding sections when sequence matters.

Assign each planned section a stable, descriptive ID derived from its owned
job, such as `session-process` or `approach-in-practice`. Use the ID for the section
workthrough filename and keep it unchanged if the section moves. Change it only
when the section's owned job materially changes.

If two sections make the same contribution, combine them or change their jobs.
If a section exists only to provide a new heading or layout beat, remove it.

### 5. Make omissions and uncertainty explicit

Include:

- a coverage and non-duplication map;
- material the page should leave out;
- open decisions that would materially affect later wording;
- an order for drafting the sections; and
- proportionate reader-range acceptance checks for the finished page.

Do not use an open decision as an excuse to stop if a bounded working
assumption preserves the user's intent. Label the assumption and continue.

### 6. Save the page plan

Use `docs/page-plan/<page-slug>-page.md` unless the repository or user specifies
another location. Keep it reader-informed and proportionate to the page's risk
and complexity. Create `docs/page-plan/` if it does not exist.

Do not include exact visitor-facing section copy or prescribe visual layout.
Stop after saving the page plan. Do not edit public page code unless the user
separately authorises implementation.

## Section-development mode

### 1. Establish the section's local brief and page context

When a page plan exists, reuse its reader range, section job, boundaries, and
coverage map. Otherwise establish a proportionate section-level reader range
and derive one bounded communication job from the user's request, current page
or hero, surrounding copy, adjacent-page context, and authorised sources.

Read the available preceding and following copy. When adjacent copy or planned
section jobs are unavailable, mark the page relationship and cross-section
coverage as provisional and leave them for the later page-plan or design pass.
State:

- what surrounding content already establishes;
- the one contribution this section owns;
- which reader differences materially affect this section;
- its relationship to nearby sections when sequence matters; and
- which nearby material it must not duplicate.

This is the main defence against a locally polished section that weakens the
whole page. The absence of a page plan is a limitation to record, not by itself
a reason to stop.

### 2. Make the editorial decisions before writing prose

Apply the copywriter skill's strategy and editorial-model guidance. Decide:

- the main message;
- the most useful organising principle;
- essential, optional, and excluded content;
- the natural vocabulary relevant to the subject and reader range;
- any reader-range implication that should change the section; and
- the GOOD, BAD, and MODEL-default outcomes.

Choose concrete situations, explanations, examples, or abstract terms according
to the section's actual material. Do not treat reader recognition as a required
effect or include examples merely to display research coverage.

### 3. Explore structurally different directions

Use the copywriter skill's angle process. Consider at least two materially
different directions before selecting one. Keep this exploration concise: an
organising idea, likely shape, strength, and main risk are usually enough. Do
not draft every direction in full merely to demonstrate exploration.

Possible differences include:

- direct explanation versus one developed example;
- explanation versus observable process;
- contrast versus sequence;
- one narrow proposition versus several related situations; or
- sequential argument versus scan-friendly retrieval.

Recommend one direction and explain the consequential trade-off. When the user
is actively choosing between directions, show the concise direction notes and
ask for their selection before drafting. Otherwise select the strongest
direction for the task and proceed.

### 4. Write one committed exact-copy draft

Carry the selected direction through to one complete section draft using the
copywriter skill's composition, voice, momentum, and line-level guidance. Do
not blend safer parts of the rejected directions into it. Draft the exact
visitor-facing wording for every visible content unit; do not stop at
descriptions, wire-copy labels, or topic bullets.

If the selected direction cannot be drafted because it contradicts supplied
practice information, an owner decision, a service boundary, or the section's
owned job,
record why, select another viable direction, and draft that one. Produce one
complete recommendation; do not turn the concise direction exploration into
multiple full drafts.

Let the draft be uneven if the content calls for it. Do not force equal
paragraphs, symmetrical modules, or a comprehensive issues grid merely for
visual or rhetorical regularity.

### 5. Test the draft across the reader range

Hide the research notes, strategy, and rationale. Encounter only the complete
visible draft in context from each materially relevant situation. Record
only differences that expose a real assumption, ambiguity, omission,
terminology problem, loss of relevance, or practical weakness, tying each
finding to observable wording, order, emphasis, omission, or page position.
Do not invent reactions or fill fixed response headings.

Return to editor mode and identify the most important revision pressure. The
review may support adding material, but it must also be able to recommend
deletion, compression, or deferral. Treat it as an editorial simulation, not
empirical or representative user testing.

### 6. Critique and refine the selected direction

Use the reader-range and copywriter reviews to revise the committed draft while
preserving its organising principle. Do not mine rejected directions for safe
phrases or combine their strongest-looking parts. If critique shows that the
selected direction itself is wrong, explicitly change direction and write a
new coherent draft rather than synthesising the alternatives.

Present one clean recommended working draft. Keep the rejected directions
concise and separate rather than expanding or blending them.

### 7. Map the copy into a semantic content composition

After the exact copy is coherent, map it into the content units the section
needs. Use forms such as a heading, paragraph, link, supporting note, or list
only when they suit the content. For each unit, record:

- its exact visitor-facing copy;
- its communication role and priority;
- its order and relationship to the other units;
- its link destination or interaction purpose when known; and
- any meaning, claim, or relationship the later design must preserve.

This is a content-composition brief, not a wireframe. Do not choose cards,
grids, columns, art direction, responsive behaviour, component styling, or
other visual solutions. The later design pass may regroup, reorder, or
proportionately adjust the copy when presentation or whole-page flow benefits,
provided it preserves the section's argument, supported claims, voice, and
meaning and identifies material copy changes.

### 8. Run copy-quality and page-flow review

Apply the copywriter skill's sentence-function, deletion, model-glue,
inclusion, and read-aloud methods to the recommended copy. Then run the
ownership, direction-traceability, duplication, page-relationship,
semantic-composition, design-handoff, and artifact-authority checks in
`references/page-flow-gates.md`.

Prefer deletion to replacing weak glue with more polished glue. Remove examples
included only to demonstrate research coverage.

### 9. Save and cross-link the section workthrough

Use `docs/page-plan/<page-slug>-section-<section-id>.md` unless the user
specifies a different name. Use the stable job-based ID assigned in the page
plan rather than the section's current order. When no page plan exists, derive
a short stable job-based ID from the bounded section job. Link back to the page
plan and add its mechanical cross-link only when that plan exists. Otherwise
record `Page plan: not available` and the inputs used for the local section
brief. Create `docs/page-plan/` if it does not exist.

Treat existing numbered workthrough filenames as stable legacy paths. Do not
rename them merely to adopt this convention; migrate them only when the user
authorises that work and all inbound links can be updated together.

Keep the working document distinct from approved public copy. State that its
exact copy is a recommended working source for later design, not automatically
owner-approved or implemented wording. Stop after saving and cross-linking this
one section artifact.

## Working rules

- Let the page lead with whatever material best serves its actual purpose; do
  not impose recognition, decision-making, or another reusable opening move.
- Use research to test assumptions and relevance; do not translate its taxonomy
  or findings into required public content.
- Treat general knowledge and visitor hypotheses as working assumptions, not
  facts about the practice.
- Do not turn every topic into an eyebrow, card, tile, or equal module.
- Do not infer a predetermined outcome from a feeling, conflict, identity, or
  relationship structure.
- Describe semantic content composition without prescribing visual design.
- Preserve exact owner-approved wording; distinguish it from working copy.
- Report the selected direction and the remaining open decisions clearly.

## Proportionality

Use the complete relevant artifact mode for a new page, a major rebuild, a
sensitive audience, or an unclear page argument. Compress the documentation for
a narrow or low-risk artifact, but preserve the mode boundary, section
ownership, genuinely different directions, and proportionate reader-range
review. Reuse or compress the existing reader considerations rather than
generating a full audience artifact for a narrow revision.

Do not add headings to an artifact solely to satisfy a template. The structures
are prompts for decisions, not a quota.


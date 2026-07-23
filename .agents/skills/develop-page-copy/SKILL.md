---
name: develop-page-copy
description: >
  Develop visitor-facing website copy through a staged documentation workflow:
  first create a reader-informed page plan, then develop
  individual sections in separate Markdown workthroughs with conceptual
  choices, structurally different directions, reader-range review, and a
  recommended draft. Use when a user wants to plan a new or
  substantially rebuilt service page before writing it, start from a hero-only
  or partial page, work through a page section by section, create or continue
  artifacts in docs/page-plan, or avoid jumping directly from research into
  public copy. Do not use when the task is only a small line edit, typo fix,
  visual design, code implementation, or insertion of already-approved wording.
---

# Develop page copy

Start by establishing the range of reader situations the page needs to serve.
For a specialist page, consider the meaningful range within its subject. For a
general page, consider specialist and inclusion contexts only where they can
materially affect the writing. Do not average the range into one representative
reader or turn research into a requirements list.

Treat page planning and section drafting as separate editorial stages. Use the
page plan to decide the page argument, information structure, and each
section's distinct contribution. Then develop one section at a time by
selecting a direction and carrying it through to a committed draft.

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

Use `website-design` only when the user also requests visual design or
implementation.

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
distinct while using both in the same staged workflow.

This skill owns:

- the authorised stage and stopping point;
- the page argument, information structure, and likely reading paths;
- section ownership, boundaries, relationships, and page-level non-duplication;
- the requirement to consider structurally different directions before
  committing to one draft;
- artifact structure, stable IDs, status, and cross-links;
- direction-selection records; and
- full-page assembly and page-flow review.

The copywriter skill owns:

- reader-range and page-context analysis within each copy decision;
- page purpose, message strategy, search language, and editorial direction;
- angle craft, composition, drafting, revision, and voice;
- proportionate reader-range review; and
- sentence review, model glue, inclusion, and read-aloud review.

Before doing any of those things:

1. Read the `copywriter` skill completely and choose its appropriate work mode.
   Do not choose its Research mode from this workflow.
2. Follow the references it routes to for the task. In particular, use its
   editorial-model guidance for new pages, substantial rewrites, unclear page
   purpose, or uncertain section roles; use its angle prompts when the writing
   direction is open; and use its model-glue and quality-review guidance before
   finalising substantial copy.
3. Apply its reader-range, page-context, communication-job, and reader-review
   methods to the page scope established here.
4. Apply the copywriter's quality methods to the public copy. Then use this
   skill's page-flow gates for ownership, sequence, duplication, direction
   traceability, assembly, and artifact authority.

A page plan may remain a planning artifact, but any part of it that decides the
page purpose, message, editorial direction, ordering, search language, or later
copy treatment is copy strategy and should use the copywriter skill.

## Choose the current stage

Identify the artifact the user has authorised:

- **Page plan:** Decide the page argument, information structure, section jobs,
  boundaries, relationships, and likely reading paths. Do not draft the
  finished sections.
- **Section development:** Take one section from an existing plan and work from
  alternative directions to one committed draft and recommendation.
- **Full staged workflow:** Create the page plan first, then use it as the basis
  for section development. Preserve the two artifacts even when both happen in
  one task.
- **Assembly:** After the sections have been selected, assemble them and run a
  full-page flow and duplication pass. Do this only when requested.

Do not silently jump stages. A plan is a decision artifact, not a longer way to
write a first draft. If the user asks only for planning, stop before public
copy. If they ask for one section, do not implement or redesign the page.

Before creating an artifact, read
[`references/output-structures.md`](references/output-structures.md). For
section drafting or final assembly, also read
[`references/page-flow-gates.md`](references/page-flow-gates.md).

## Stage 1 — Create the page plan

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

Use the copywriter skill to test at least two meaningfully different editorial
routes when the argument is unclear, then recommend one.

The route must explain why its content, order, and emphasis suit the subject,
page purpose, and relevant readers. It must not merely rename the sections
already in source.

### 4. Give every page part one owned job

For the hero and each section, define:

- the section's distinct contribution;
- the content it should cover;
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
and complexity.

Do not edit public page code unless the user separately authorises
implementation.

## Stage 2 — Develop one section

### 1. Recover the section's place on the page

Reuse the page-level reader range. Read the page plan and the actual preceding
and following content. State:

- what surrounding content already establishes;
- the one contribution this section owns;
- which reader differences materially affect this section;
- its relationship to nearby sections when sequence matters; and
- which nearby material it must not duplicate.

This is the main defence against a locally polished section that weakens the
whole page.

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

Use the copywriter skill's angle process. For substantial section work,
consider at least two materially different directions before selecting one.
Keep this exploration concise: an organising idea, likely shape, strength, and
main risk are usually enough. Do not draft every direction in full merely to
demonstrate exploration.

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

### 4. Write one committed draft

Carry the selected direction through to one complete section draft using the
copywriter skill's composition, voice, momentum, and line-level guidance. Do
not blend safer parts of the rejected directions into it. Do not stop at a
description, wire-copy labels, or topic bullets.

If the selected direction cannot be drafted because it contradicts supplied
practice information, an owner decision, a service boundary, or the section's
owned job,
record why, select another viable direction, and draft that one. Produce
multiple complete drafts only when the user explicitly asks to compare finished
alternatives.

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

Present one clean recommended working draft. If the user explicitly requested
multiple finished alternatives, keep them separate, compare them against
section-specific criteria, and recommend one. Do not create a composite unless
the user specifically asks for one after seeing the alternatives.

### 7. Run copy-quality and page-flow review

Apply the copywriter skill's sentence-function, deletion, model-glue,
inclusion, and read-aloud methods to the recommended copy. Then run the
ownership, direction-traceability, duplication, page
relationship, assembly, and
artifact-authority checks in `references/page-flow-gates.md`.

Prefer deletion to replacing weak glue with more polished glue. Remove examples
included only to demonstrate research coverage.

### 8. Save and cross-link the section workthrough

Use `docs/page-plan/<page-slug>-section-<section-id>.md` unless the user
specifies a different name. Use the stable job-based ID assigned in the page
plan rather than the section's current order. Link back to the page plan and
add a link from the relevant section of the page plan to the workthrough.

Treat existing numbered workthrough filenames as stable legacy paths. Do not
rename them merely to adopt this convention; migrate them only when the user
authorises that work and all inbound links can be updated together.

Keep the working document distinct from approved public copy. State its status.

## Stage 3 — Assemble only after selection

When the user asks to assemble the page:

1. Reuse the page-level reader range and use the recommended section drafts as
   inputs, not immutable wording.
2. Apply the copywriter skill and read the whole page from the hero down.
3. Remove repeated claims, examples, stance statements, and calls to action.
4. Recheck section ownership and relationships in the actual sequence.
5. Adjust headings and openings for page-level rhythm and search clarity.
6. Re-run the copywriter skill's quality methods across the full page.
7. Re-run `references/page-flow-gates.md` across the assembled sequence.
8. Keep implementation separate unless the user authorises it.

A section that works in isolation may still need to lose a sentence when it sits
beside the next section.

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
- Do not write design instructions unless design is in scope.
- Preserve exact owner-approved wording; distinguish it from working copy.
- Report the selected direction and the remaining open decisions clearly.

## Proportionality

Use the full workflow for a new page, a major rebuild, a sensitive audience, or
an unclear page argument. Compress the documentation for a narrow or low-risk
page, but preserve the stage boundary, section ownership, genuinely different
directions, and proportionate reader-range review. Reuse or compress the existing
reader considerations rather than generating a full audience artifact for a
narrow revision.

Do not add headings to an artifact solely to satisfy a template. The structures
are prompts for decisions, not a quota.


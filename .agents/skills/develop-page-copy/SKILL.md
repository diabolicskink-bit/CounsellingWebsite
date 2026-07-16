---
name: develop-page-copy
description: >
  Develop visitor-facing website copy through a staged documentation workflow:
  first create a research-grounded, visitor-first page plan, then develop
  individual sections in separate Markdown workthroughs with conceptual
  choices, structurally different copy candidates, cold-reader testing, and a
  recommended draft. Use when a user wants to plan a new or substantially
  rebuilt service page before writing it, start from a hero-only or partial
  page, work through a page section by section, create or continue artifacts in
  docs/page-plan, or avoid jumping directly from research into public copy. Do
  not use when the task is only a small line edit, typo fix, visual design, code
  implementation, or insertion of already-approved wording.
---

# Develop page copy

Start by putting on the visitor's hat. Identify who has arrived, what brought
them here, what they already know, and what they need from the page next. Let
their developing questions shape the page. Do not begin with the provider's
knowledge, the research taxonomy, or an inventory of available content.

Treat page planning and section drafting as separate editorial stages. Use the
page plan to decide the visitor journey and give each section a distinct job.
Then develop one section at a time with real copy alternatives and a reasoned
recommendation.

## Establish authority

In the Vive Counselling repository:

1. Read `AGENTS.md` and `docs/project/README.md`.
2. Read `docs/project/product-direction.md`,
   `docs/project/writing-direction.md`, and `docs/project/current-scope.md`.
3. Read the relevant page source, adjacent page context, selected tracker or
   plan, and applicable research dossier.
4. Treat current source as factual and layout context, not approved voice,
   unless the owner or writing direction says otherwise.
5. Treat research as evidence and a coverage constraint, not as a page outline
   or a source of ready-made marketing claims.

Use `audience-research` only when the task requires new evidence, a dossier
update, or formal research maintenance. Use `website-design` only when the user
also requests visual design or implementation.

## Put on the visitor's hat

Do this before deciding the page argument or section structure. Work out:

- who the primary visitor is and which materially different visitor positions
  also matter;
- what situation, question, change, or search brought them to this page now;
- how much they are likely to know and which words they may use themselves;
- what the hero or preceding content has already told them;
- what they still need to understand, judge, compare, or feel able to do;
- what might make them feel categorised, instructed, pressured, or overlooked;
  and
- what the page should not require them to learn, defend, or decide before it
  becomes useful.

Write a short, evidence-grounded visitor-hat account before planning the page.
First person can help expose provider-centred assumptions:

> I have arrived because ...
> At this point I know ...
> I still need to understand ...
> I do not want this page to assume ...
> By the end, I need to be able to ...

Treat this as a working hypothesis, not a fictional intimate persona. Ground it
in the brief, research, search language, current page context, and sensible
uncertainty. Do not claim private feelings or lived experience as fact.

Return to the visitor's hat at the start of every section workthrough and again
during full-page assembly. Ask `What does this visitor need next?` before asking
`What should the page say next?`

## Apply the copywriter skill to copy decisions

This skill does not replace the `copywriter` skill. It sequences the work and
defines the artifacts. The copywriter skill governs page-purpose thinking,
message strategy, angle selection, composition, drafting, revision, voice,
search language, inclusion, claims, and copy-quality review.

Before doing any of those things:

1. Read the `copywriter` skill completely and choose its appropriate work mode.
2. Follow the references it routes to for the task. In particular, use its
   editorial-model guidance for new pages, substantial rewrites, unclear page
   purpose, or uncertain section roles; use its angle prompts when the writing
   direction is open; and use its model-glue and quality-review guidance before
   finalising substantial copy.
3. Apply its reader, page-moment, communication-job, intellectual-reading, and
   relational-reading distinctions to the visitor identified here.
4. Treat the quality gates bundled with this skill as reinforcement, not a
   substitute for the copywriter process.

A page plan may remain a planning artifact, but any part of it that decides the
page purpose, message, editorial direction, ordering, search language, or later
copy treatment is copy strategy and should use the copywriter skill.

## Choose the current stage

Identify the artifact the user has authorised:

- **Page plan:** Decide the page argument, visitor journey, section jobs,
  boundaries, and handoffs. Do not draft the finished sections.
- **Section development:** Take one section from an existing plan and work from
  concept to actual copy candidates and a recommendation.
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
[`references/quality-gates.md`](references/quality-gates.md).

## Stage 1 — Create the page plan

### 1. Reset to the authorised starting state

State what exists and what is being treated as absent. If the user says to
assume the page contains only a hero, use the hero as the sole public-copy
starting point even if old sections remain in source.

Record what the hero already communicates. Later sections must add to it rather
than restate it.

### 2. Re-enter the visitor's page moment

Use the visitor-hat account as the starting point. Define:

- the primary reader and a small set of evidence-supported secondary positions;
- what likely brought them to this page now;
- what they know after the hero;
- the questions they still need answered;
- the decision, judgement, or next action the page should make easier; and
- materially different or adverse readings the page must avoid.

Write the page journey in the visitor's words before naming sections. Do not
invent an intimate persona. Describe positions through situation, awareness,
or relationship to the subject.

### 3. Decide the page argument before its sections

Use the copywriter skill to test at least two meaningfully different editorial
routes when the argument is unclear, then recommend one.

The route must explain why this sequence helps the visitor. It must not merely
rename the sections already in source.

### 4. Give every page part one owned job

For the hero and each section, define:

- the visitor question;
- the section's communication job;
- the content it should cover;
- the editorial rule governing selection and treatment;
- what it must not do or repeat;
- the handoff to the next section; and
- the evidence or current facts supporting it.

If two sections answer the same visitor question, combine them or change their
jobs. If a section exists only to provide a new heading or layout beat, remove
it.

### 5. Make omissions and uncertainty explicit

Include:

- a coverage and non-duplication map;
- material the page should leave out;
- open decisions that would materially affect later wording;
- an order for drafting the sections; and
- cold-reader acceptance checks for the finished page.

Do not use an open decision as an excuse to stop if a bounded working
assumption preserves the user's intent. Label the assumption and continue.

### 6. Save the page plan

Use `docs/page-plan/<page-slug>-page.md` unless the repository or user specifies
another location. Keep it visitor-first and proportionate to the page's risk
and complexity.

Do not edit public page code unless the user separately authorises
implementation.

## Stage 2 — Develop one section

### 1. Recover the section's place in the journey

Put the visitor's hat back on. Read the page plan and the actual preceding and
following content. State:

- what the visitor already understands;
- the live question at this point;
- the one job this section owns;
- what the next section needs it to make possible; and
- which nearby material it must not duplicate.

This is the main defence against a locally polished section that weakens the
whole page.

### 2. Make the editorial decisions before writing prose

Apply the copywriter skill's strategy and editorial-model guidance. Decide:

- the main message;
- the most useful organising principle;
- essential, optional, and excluded content;
- the natural vocabulary of the visitor;
- the intended intellectual reading;
- the intended relational effect; and
- the GOOD, BAD, and MODEL-default outcomes.

Prefer lived situations, decisions, contrasts, or changes over abstract issue
labels when they provide stronger recognition. Select examples for range and
meaning, not completeness.

### 3. Explore structurally different angles

Use the copywriter skill's angle process. Default to three angles for
substantial section work. Each must change the editorial composition, not
merely the heading or tone.

Possible differences include:

- narrative movement versus direct recognition statements;
- a moment of change versus a recurring pattern;
- contrast versus sequence;
- one developed example versus several short situations; or
- uncertainty-led versus decision-led framing.

For each angle, state its organising idea, strength, and main risk before
drafting it.

### 4. Write actual copy candidates

Draft the complete section for each viable angle using the copywriter skill's
composition, voice, momentum, and line-level guidance. Do not stop at
descriptions, wire-copy labels, or topic bullets.

Let the drafts be uneven if the content calls for it. Do not force equal
paragraphs, symmetrical modules, or a comprehensive issues grid merely because
they are easy to compare.

### 5. Test each candidate cold

Hide the working and put the relevant visitor's hat back on. Apply the
copywriter skill's grounded visitor-reading process, then review each draft
through:

- **immediate reading:** what the visitor notices first;
- **intellectual reading:** what they can reasonably understand or infer;
- **relational reading:** how the language positions them in relation to the
  provider;
- **sceptical or adverse reading:** how a wary or differently situated visitor
  could read it; and
- **revision pressure:** the most important weakness to solve.

Use reader positions supported by the brief or research. Do not assign feelings
to a fictional reader as fact.

### 6. Compare, choose, and refine

Compare candidates against criteria specific to the section. Recommend one
direction and explain why it serves the page journey better, not merely why it
sounds better.

Then present a clean recommended working draft. Import useful material from
other candidates only when it strengthens the chosen organising idea. Do not
create a committee draft that preserves every good sentence.

### 7. Run the quality gates

Run the sentence-function, deletion, model-glue, inclusion, claim, research,
handoff, and read-aloud checks in `references/quality-gates.md`.

Prefer deletion to replacing weak glue with more polished glue. Remove examples
included only to demonstrate research coverage.

### 8. Save and cross-link the section workthrough

Use `docs/page-plan/<page-slug>-section-<number>.md` unless the user specifies a
different name. Link back to the page plan and add a link from the relevant
section of the page plan to the workthrough.

Keep the working document distinct from approved public copy. State its status.

## Stage 3 — Assemble only after selection

When the user asks to assemble the page:

1. Put the primary visitor's hat back on and use the recommended section drafts
   as inputs, not immutable wording.
2. Apply the copywriter skill and read the whole page from the hero down.
3. Remove repeated claims, examples, stance statements, and calls to action.
4. Recheck section ownership and handoffs in the actual sequence.
5. Adjust headings and openings for page-level rhythm and search clarity.
6. Re-run the quality gates across the full page.
7. Keep implementation separate unless the user authorises it.

A section that won in isolation may still need to lose a sentence when it sits
beside the next section.

## Working rules

- Lead with visitor recognition and decision-making, not provider doctrine.
- Use research to improve distinctions and prevent exclusion; do not dump its
  taxonomy into the page.
- Do not make the page perform expertise for peer practitioners.
- Do not turn every topic into an eyebrow, card, tile, or equal module.
- Do not use generic reassurance as a substitute for accurate recognition.
- Do not infer a predetermined outcome from a feeling, conflict, identity, or
  relationship structure.
- Do not write design instructions unless design is in scope.
- Preserve exact owner-approved wording; distinguish it from working copy.
- Report the selected direction and the remaining open decisions clearly.

## Proportionality

Use the full workflow for a new page, a major rebuild, a sensitive audience, or
an unclear page argument. Compress the documentation for a narrow or low-risk
page, but preserve the stage boundary, section ownership, genuinely different
angles, and cold-reader review.

Do not add headings to an artifact solely to satisfy a template. The structures
are prompts for decisions, not a quota.


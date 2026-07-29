---
name: develop-page-copy
description: >
  Develop visitor-facing page content through one of two bounded artifacts:
  create a reader-informed whole-page plan without exact public copy, or develop
  one section into reviewed exact copy and a semantic content-composition brief
  using an existing plan, supplied brief, or available page context. Use for
  new or substantially rebuilt pages, hero-only or partial pages, one detailed
  section, docs/page-plan artifacts, or copy preparation for a later
  website-design pass. Do not use for small line edits, typo fixes, visual
  design, code implementation, or insertion of already-approved wording.
---

# Develop page copy

Create one authorised artifact per invocation and stop at its boundary. Keep
page planning separate from exact-copy section development:

- A **page plan** owns the page argument, information structure, section jobs,
  boundaries, non-duplication, and likely reading paths. It contains no exact
  visitor-facing section copy.
- A **section artifact** develops one bounded section into a complete reviewed
  copy recommendation and semantic content composition for later design.

Use the `copywriter` skill for every editorial decision. This skill owns the
artifact contract, stopping point, section ownership, stable IDs, cross-links,
page-flow checks, and design handoff; it does not reproduce the copywriting
method.

## Establish authority

In the Vive Counselling repository:

1. Read `AGENTS.md`, `docs/project/README.md`, and
   `docs/project/writing-direction.md`.
2. Read `docs/project/current-scope.md` or source only when the artifact needs a
   current service or implementation detail.
3. Read the relevant page, adjacent copy, selected tracker or plan, and
   `docs/research/README.md`.
4. Read the complete `copywriter` skill and apply the mode required below.
5. Before creating an artifact, read
   `references/artifact-contracts.md`.

Treat current public copy as factual and layout context, not approved voice,
unless the owner explicitly approves it. Use existing audience research as an
input only. Do not invoke `audience-research`, create or update research
artifacts, or turn research into a page outline or ready-made claims.

When material is missing, use a bounded working assumption only when it
preserves the intended artifact. Mark consequential uncertainty. Omit or flag
unsupported practice details and claims.

Do not invoke `website-design` automatically. When copy development and design
are both authorised, finish and save this artifact first, then pass it to the
separately invoked design work.

## Choose one artifact mode

### Page plan

Use this mode for a whole new or substantially rebuilt page when no usable plan
exists. Also use it when the request spans page planning and detailed section
copy; produce the plan and stop before drafting a section.

Apply the copywriter's **Strategy** mode. Use its source-envelope,
reader-range, artifact-register, search-language, direction, commitment, and
composition methods. Do not enter line drafting or cold review.

### Section development

Use this mode for one bounded section from:

- an existing page plan;
- a supplied section brief; or
- a local brief recoverable from the request, current hero or page, surrounding
  copy, adjacent-page context, and authorised sources.

A page plan is helpful but not mandatory. Without one, proceed when the
available context supports one accurate section job. Mark page architecture,
cross-section coverage, and unknown relationships as provisional.

Apply the copywriter's **Draft or substantial rewrite** mode, including one
editorial commitment, one model-default risk, one committed working draft, a
frozen cold review, accepted revision decisions, clean recommended copy, and a
brief pressure test.

When several sections are requested, ask the owner to select the first one
unless an existing plan or explicit order makes the intended first artifact
unambiguous. Do not batch section artifacts.

## Build a page plan

### 1. Establish the starting state

Record what exists and what the task treats as absent. If the owner says to
assume hero-only, use the hero as the sole public-copy starting point even when
old sections remain in source.

State what the opening already communicates and what later sections must not
repeat.

### 2. Select the page direction

Use the copywriter Strategy mode to:

- establish the relevant reader range and page context;
- define the page's communication job and natural search language;
- consider at least two structurally different routes;
- select one editorial commitment and record its material trade-off; and
- decide whether the material needs sequence, scan-friendly retrieval, or both.

Do not write exact headings, body copy, calls to action, or other public
section wording. Planning labels may be explicit descriptions of section jobs.

### 3. Assign page ownership

Give the hero and every proposed section one distinct contribution. For each
section, record:

- a stable descriptive ID derived from its job;
- its owned contribution and essential content;
- likely semantic forms without exact copy;
- what it must not repeat or absorb;
- its relationship to surrounding sections when sequence matters; and
- relevant reader considerations that change the section.

Combine, remove, or redefine sections with duplicate jobs. Remove sections
that exist only to create a heading or visual beat.

### 4. Record page controls

Include a coverage and non-duplication map, material the page should leave out,
consequential open decisions, the section drafting order, and finished-page
acceptance checks.

### 5. Save and stop

Save to `docs/page-plan/<page-slug>-page.md` unless the owner or repository
specifies another path. Create `docs/page-plan/` when needed. Do not draft
section copy, prescribe visual layout, or edit public page code.

## Develop one section

### 1. Establish the bounded local job

Use the page plan's section job, reader range, boundaries, and coverage map
when available. Otherwise derive one local job from the strongest authorised
context.

Record:

- what the hero and available surrounding content already establish;
- the one contribution this section owns;
- reader differences that materially affect it;
- what nearby or later content should handle; and
- which page relationships remain provisional.

Read available preceding and following copy. Do not invent adjacent sections
or transitions when that context is absent.

### 2. Run the copywriter workflow

Use the copywriter to:

- establish the section's source envelope;
- consider two structurally different directions;
- choose one editorial commitment and one likely model-default risk;
- draft one complete exact-copy direction;
- freeze and cold-review the visible artifact;
- rewrite accepted causal findings; and
- pressure-test the clean recommendation.

Do not combine rejected directions or produce several full drafts. Preserve the
selected organising principle unless the critique shows that it failed; when
it fails, name the direction change and write one new coherent draft.

### 3. Check page flow and map semantic content

Confirm that the clean copy:

- performs its owned contribution without restarting the page;
- does not duplicate surrounding facts, examples, stance, or action;
- fits the known sequence or remains intelligible for likely scan entry;
- stops without manufacturing a transition or conclusion; and
- maps completely into semantic units such as heading, paragraph, list, note,
  link, or action.

For each unit, record exact copy, communication role and priority, order and
relationship, interaction destination when known, and meaning or claims later
design must preserve.

Do not choose cards, grids, columns, visual hierarchy, art direction, styling,
motion, responsive behaviour, or components.

### 4. Save, cross-link, and stop

Save to `docs/page-plan/<page-slug>-section-<section-id>.md`. Use the stable
job-based ID from the plan; without a plan, derive one from the bounded local
job and record `Page plan: not available`.

When a plan exists, add its mechanical link to the section artifact and link
back from the section. Do not revise unrelated plan decisions. Keep existing
numbered legacy paths stable unless the owner authorises a complete link
migration.

Mark the exact copy as recommended working copy, not owner-approved or
implemented wording. Stop after this one artifact.

## Working rules

- Preserve exact owner-approved wording and distinguish it from working copy.
- Use research to test assumptions, not to generate required public coverage.
- Do not infer a predetermined outcome from a feeling, identity, conflict, or
  relationship structure.
- Let content determine section count, order, length, and semantic form.
- Keep page-plan and section documentation proportionate, but preserve the mode
  boundary, section ownership, real direction choice, and required copywriter
  review.
- Do not add artifact headings solely to satisfy a template.

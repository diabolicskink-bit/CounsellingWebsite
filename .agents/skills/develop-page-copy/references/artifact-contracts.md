# Page-copy artifact contracts

Use these structures adaptively. Include the decisions required to make the
artifact authoritative and useful; do not add commentary merely to show that a
field was visited.

Create one substantive artifact per invocation. A page plan contains no exact
visitor-facing section copy. A section artifact contains one exact-copy
recommendation, its complete visible copywriter loop, and semantic content
composition.

## Contents

- [Shared authority and status](#shared-authority-and-status)
- [Page-plan contract](#page-plan-contract)
- [Section-development contract](#section-development-contract)
- [Page-flow and handoff gates](#page-flow-and-handoff-gates)
- [Cross-linking and status](#cross-linking-and-status)

## Shared authority and status

Distinguish:

- owner-approved wording;
- supplied practice information;
- research input;
- working assumption;
- planning direction;
- working draft;
- recommended working copy;
- owner-approved copy; and
- implemented copy.

Recommended copy does not become approved or implemented by implication.
Record consequential unknowns without building an evidence ledger.

## Page-plan contract

Use the path `docs/page-plan/<page-slug>-page.md`.

### Header and authority

Record the page, planning status, authorised starting state, relevant owner
wording, source material, research inputs, current facts used, and material
unknowns. State that the artifact plans content but does not authorise exact
copy, visual design, or implementation.

### Existing opening and page context

Record:

- what the hero or approved opening already communicates;
- what later sections must not prove again;
- the first unresolved informational or editorial need; and
- whether the page needs sequence, scan-friendly retrieval, or both.

### Reader and communication brief

Use the copywriter Strategy mode to record proportionately:

- reader scope and only the materially different situations;
- the page job and main message;
- natural subject and search language;
- source-backed speaker material;
- material omissions and constraints;
- two structurally different page directions;
- the selected editorial commitment and trade-off; and
- the likely model-default risk for later drafting.

Do not include imagined biographies, testimony, audience requirements lists,
or exact public copy.

### Page architecture

For the hero and every section, use:

```markdown
### Planning label

**Stable section ID:** `<job-based-slug>`

**Owned contribution:**

**Essential content:**

**Likely semantic forms:**

**Relevant reader considerations:**

**Must not do or repeat:**

**Relationship to surrounding sections:**
```

Planning labels describe jobs and need not become public headings.

### Page controls

Include:

- coverage and non-duplication map;
- material to omit or handle elsewhere;
- consequential open decisions;
- section drafting order; and
- finished-page reader-range, source, transferability, composition, speaker,
  and ending acceptance checks.

## Section-development contract

Use the path
`docs/page-plan/<page-slug>-section-<section-id>.md`.

### Header, scope, and context

Record:

- page and section;
- stable section ID;
- recommended-working-copy status;
- backlink to the page plan or `Page plan: not available`;
- inputs used to establish the local job when no plan exists;
- what surrounding copy already establishes;
- the section's one owned contribution;
- material reader differences;
- non-duplication boundary; and
- provisional page relationships.

State that the artifact contains exact working copy and semantic content
composition, not visual design or implementation.

### Editorial commitment

Use the copywriter to record:

- two materially different directions considered;
- the selected direction and consequential trade-off;
- the source-backed editorial commitment;
- what leads, what is omitted, and where the section stops; and
- one likely model-default risk and the compositional decision resisting it.

Keep rejected directions concise. Do not draft them in full or blend them.

### Visible copywriter loop

Include:

```markdown
## Committed working draft

[One complete exact-copy draft]

## Prioritised cold-review findings

[Only material source, transferability, composition, speaker, ending, or
reader-range findings, each with its causal intervention]

## Accepted revision decisions

[Changes made in the copy and strengths or constraints preserved]

## Recommended working copy

[One clean complete recommendation]

## Pressure test

[Brief confirmation that accepted findings are resolved and no material new
failure appeared]
```

If the cold review finds no material revision, do not repeat unchanged copy.
Present the recommendation once and state that result.

### Semantic content composition

Map every visible unit of the recommended copy. For each unit record:

- short working label;
- semantic form;
- exact visitor-facing copy;
- communication role and priority;
- order and relationship to other units;
- link destination or interaction purpose when known; and
- meaning, claim, or relationship later design must preserve.

Do not prescribe cards, grids, columns, art direction, styling, responsive
behaviour, motion, or components.

## Page-flow and handoff gates

Before treating a section artifact as ready for design, confirm:

1. **Ownership:** The copy performs the assigned contribution and would leave a
   necessary page-level gap if removed.
2. **Direction traceability:** The clean recommendation still carries the
   selected organising principle, or an explicit direction change is recorded.
3. **Coverage:** Facts, examples, stance, process, search language, and actions
   are not duplicated merely because the section was drafted independently.
4. **Page movement:** The opening adds to preceding material, the ending stops
   without manufactured transition, and unknown adjacencies remain provisional.
5. **Semantic handoff:** Every exact-copy unit is mapped and later design knows
   which meaning and claims must survive.
6. **Authority:** Status, assumptions, stable ID, links, and boundaries between
   planning, recommendation, approval, design, and implementation are clear.

Revise when a gate reveals a real problem. Record the resulting decision or
change, not a ceremonial checklist.

## Cross-linking and status

When a page plan exists, link its section entry to the workthrough:

```markdown
**Detailed section development:** [Directions, reviewed exact copy, and content
composition](<page-slug>-section-<section-id>.md).
```

Add a backlink from the section artifact. Without a plan, do not create one
merely to add a link; record the local inputs and provisional wider-page state.

Keep stable job-based IDs and filenames when sections move. Rename a legacy or
existing artifact only through an authorised migration that updates all inbound
links.

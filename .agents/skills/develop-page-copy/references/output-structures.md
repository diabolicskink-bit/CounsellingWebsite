# Output structures

Use these as adaptable structures. Keep only the parts that materially improve
the work. Do not turn them into compulsory boilerplate.

## Contents

1. [Page-plan artifact](#page-plan-artifact)
2. [Section-development artifact](#section-development-artifact)
3. [Cross-linking and status](#cross-linking-and-status)

## Page-plan artifact

Suggested path: `docs/page-plan/<page-slug>-page.md`

### Header

- Page name and `page plan`
- Status and scope
- Explicit starting assumption, such as `Treat the current page as hero-only`
- What this artifact does and does not authorise

### Authority and inputs

- Owner-approved or supplied wording
- Product and writing direction
- Current source facts
- Existing audience or topic research artifacts
- Labelled general-knowledge assumptions where existing evidence is incomplete
- Adjacent pages and current service facts
- Relevant open decisions

Separate wording authority, factual evidence, supporting research, working
assumptions, and owner decisions.

### Existing opening

- What the hero or approved opening already communicates
- What it should not be asked to prove again
- The first unresolved visitor question

### Research-grounded pseudoperson

Show one short, coherent account of the situation selected from the closest
matching dossier. Prefer first person when it helps the editor inhabit the
perspective, but use freeform prose rather than a fixed persona template or
questionnaire. Let the evidence determine which experiences, hopes, worries,
stakes, confidence signals, sensitivities, language, or contradictions matter
for this task.

Follow the account with a concise evidence-and-limits note. Identify the
dossier basis without summarising it, and distinguish synthesis from direct
evidence. If no dossier matched, say briefly that the account is a best-effort
simulation based on task and project context.

Do not add a name, biography, identity detail, or universal inner life. Treat
the account as a planning perspective, not manufactured testimony, empirical
testing, or a list of content the page must include.

### Visitor-first page journey

- How the pseudoperson's attention and considerations develop after the hero
- What the page can leave to another section or page
- The decision or next action the page should make easier

### Evidence and assumption implications

Record only findings that change the page's argument, coverage, language,
inclusion, or claim boundaries. Do not summarise the full dossier. When an
existing artifact does not answer a necessary question, record the general
knowledge or visitor hypothesis being used as a working assumption and keep it
distinct from publication evidence.

### Directions considered

For each meaningfully different page route:

- organising idea;
- benefit;
- risk; and
- decision.

### Communication brief

- Page job
- Main message
- Reader response or judgement this page should make possible
- Primary natural search language
- GOOD outcome
- BAD outcome
- MODEL-default outcome to resist

### Recommended page skeleton

For the hero and each section:

```markdown
### Section N — Planning label

**Stable section ID:** `<short-job-based-slug>`

**Working heading direction:**

**Visitor question:**

**Section job:**

**Content to cover:**

**Editorial rule:**

**Must not do:**

**Handoff to the next section:**

**Evidence, fact, or assumption basis:**
```

The planning label may be more explicit than the eventual public heading.

### Whole-page controls

- Coverage and non-duplication map
- Material the page should leave out
- Open decisions before public drafting
- Drafting sequence
- Finished-page inhabited-reader and adversarial acceptance checks

## Section-development artifact

Suggested path: `docs/page-plan/<page-slug>-section-<section-id>.md`

Use a short, lowercase, hyphenated section ID derived from the section's owned
job, such as `recognition` or `role-in-counselling`. Keep the ID and filename
stable when the section moves. Existing numbered workthroughs may retain their
current paths; do not rename them without an authorised migration that updates
all inbound links.

### Header and scope

- Page and section name
- Stable section ID
- Working-copy status
- Backlink to the page plan
- Statement that the artifact is copy development, not a design specification

### Decision in brief

State the strongest current organising principle and why it adds something the
preceding content does not already do.

### Section context

- What the hero or preceding section already establishes
- The page-level pseudoperson's current state; update only what the visible page
  has changed
- Live visitor question
- Primary communication job
- Reader response or judgement this section should make possible
- What the section must make possible next

### Editorial choices

Apply the copywriter skill before making these choices. Explain the few
decisions that materially shape the section. Examples:

- situations rather than categories;
- one developed contrast rather than exhaustive coverage;
- the moment something changed rather than a life summary;
- ordinary language with selective specialist vocabulary; or
- tension without a predetermined verdict.

### Content priority

- Essential
- Useful if it fits naturally
- Better held elsewhere or left implicit

### Forecast

- GOOD outcome
- BAD outcome
- MODEL-default outcome to resist
- Likely model-glue phrases or structures

### Angle exploration

Use the copywriter skill's direction and angle process. Develop the default
three structurally different angles. For each:

- organising idea;
- strength; and
- main risk.

### Candidate sections

For substantial section work, use the copywriter skill to compose, draft, and
revise three complete candidates. Replace an angle that conflicts with an
established fact, owner decision, service boundary, or section job. Produce
fewer complete candidates only when the user explicitly narrows the
exploration.

```markdown
## Candidate A — Descriptive name

### Draft

[Complete visitor-facing section copy]

### What this draft is doing

[Sentence or movement-level editorial explanation]

### Inhabited reader response

[Freeform notes on what becomes salient from the page-level pseudoperson's
position, tied to observable wording, order, emphasis, omission, or context.]

### Main revision pressure
```

### Decision

- Comparison using section-specific criteria
- Recommended outcome: one selected candidate or a synthesis
- Explanation of why the selected or combined direction serves the page
- Clean recommended working draft
- Explanation of why other useful material was omitted

When synthesis is selected, add:

```markdown
### Synthesis record

**Recommendation type:** Synthesised working draft

**Candidate contributions:**

- Candidate A contributes ...
- Candidate C contributes ...

[List only the candidates that contribute to the synthesis.]

**Why synthesis is stronger:**

[Explain why the combined editorial movement serves the section better than
selecting one candidate intact. A candidate need not remain the base.]

### Clean recommended working draft

[Complete synthesised visitor-facing section copy]

### Inhabited reader response to the synthesised draft

[A fresh freeform response from the same page-level pseudoperson, tied to the
visible copy.]

**Coherence and repetition:**

**Page fit and handoff:**

### Main revision pressure after synthesis
```

Develop and reader-test the candidates separately before completing this record.
Treat the synthesised draft as a new composition, not as an assembly that
inherits the strengths of its sources automatically.

### Copywriter quality and grounding

- Sentence-function check
- Model-glue and deletion pass
- Inclusion and adverse-reading check
- Research grounding and claim limits
- Read-aloud pass

Apply the copywriter skill's methods for these checks. Do not recreate a second
copywriting method inside this artifact.

### Page-flow and artifact integrity

- Section ownership and actual page position
- Candidate or synthesis traceability
- Cross-section coverage and non-duplication
- Handoff into the next section
- Status, stable ID, authority, and assumption labels
- Open questions for full-page assembly
- Acceptance checks

Apply [`page-flow-gates.md`](page-flow-gates.md) for these checks after the
copywriter review.

## Cross-linking and status

Add a link from the page-plan section to its detailed workthrough:

```markdown
**Detailed copy development:** [Section N conceptual work and draft
variations](<page-slug>-section-<section-id>.md).
```

Add a backlink from the section workthrough to the page plan.

Use status labels that distinguish:

- planning direction;
- working copy;
- recommended working draft;
- owner-approved copy; and
- implemented copy.

Do not allow `recommended` to become `approved` by implication.

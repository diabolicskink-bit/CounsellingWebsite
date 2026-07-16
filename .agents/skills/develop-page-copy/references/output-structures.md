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
- Audience or topic research
- Adjacent pages and current service facts
- Relevant open decisions

Separate wording authority from factual evidence and supporting research.

### Existing opening

- What the hero or approved opening already communicates
- What it should not be asked to prove again
- The first unresolved visitor question

### Visitor-hat orientation

Identify the visitor before describing the page:

- Primary reader
- Evidence-supported reader positions
- What brought them here now
- What they know after the hero
- What they still need from the page
- What the page should not presume or require

Write a concise, evidence-grounded account in the visitor's words:

```markdown
I have arrived because ...
At this point I know ...
I still need to understand ...
I do not want this page to assume ...
By the end, I need to be able to ...
```

Use this as a planning hypothesis, not as manufactured testimony.

### Visitor-first page journey

- Visitor questions after the hero
- The order in which those questions develop
- The decision or next action the page should make easier

### Research implications

Record only findings that change the page's argument, coverage, language,
inclusion, or claim boundaries. Do not summarise the full dossier.

### Directions considered

For each meaningfully different page route:

- organising idea;
- benefit;
- risk; and
- decision.

### Communication brief

- Page job
- Main message
- Intended intellectual reading
- Intended relational effect
- Primary natural search language
- GOOD outcome
- BAD outcome
- MODEL-default outcome to resist

### Recommended page skeleton

For the hero and each section:

```markdown
### Section N — Planning label

**Working heading direction:**

**Visitor question:**

**Section job:**

**Content to cover:**

**Editorial rule:**

**Must not do:**

**Handoff to the next section:**

**Research or fact basis:**
```

The planning label may be more explicit than the eventual public heading.

### Whole-page controls

- Coverage and non-duplication map
- Material the page should leave out
- Open decisions before public drafting
- Drafting sequence
- Finished-page cold-reader and adversarial acceptance checks

## Section-development artifact

Suggested path: `docs/page-plan/<page-slug>-section-<number>.md`

### Header and scope

- Page and section name
- Working-copy status
- Backlink to the page plan
- Statement that the artifact is copy development, not a design specification

### Decision in brief

State the strongest current organising principle and why it adds something the
preceding content does not already do.

### Section context

- What the hero or preceding section already establishes
- Visitor positions arriving here and the one-line visitor-hat reading for each
- Live visitor question
- Primary communication job
- Intended intellectual reading
- Intended relational effect
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

Use the copywriter skill to compose, draft, and revise the complete copy for
each viable angle:

```markdown
## Candidate A — Descriptive name

### Draft

[Complete visitor-facing section copy]

### What this draft is doing

[Sentence or movement-level editorial explanation]

### Cold visitor reading

**Immediate:**

**Intellectual:**

**Relational:**

**Sceptical or adverse:**

### Main revision pressure
```

### Decision

- Comparison using section-specific criteria
- Recommended direction
- Clean recommended working draft
- Explanation of why other useful material was omitted

### Quality and grounding

- Sentence-function check
- Model-glue and deletion pass
- Inclusion and adverse-reading check
- Research grounding and claim limits
- Handoff into the next section
- Open questions for full-page assembly
- Acceptance checks

## Cross-linking and status

Add a link from the page-plan section to its detailed workthrough:

```markdown
**Detailed copy development:** [Section N conceptual work and draft
variations](<page-slug>-section-<number>.md).
```

Add a backlink from the section workthrough to the page plan.

Use status labels that distinguish:

- planning direction;
- working copy;
- recommended working draft;
- owner-approved copy; and
- implemented copy.

Do not allow `recommended` to become `approved` by implication.

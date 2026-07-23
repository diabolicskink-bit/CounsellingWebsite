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
- Writing direction
- Current service details only when the page needs them
- Existing audience or topic research artifacts
- Material working assumptions where research is incomplete
- Adjacent pages and current service facts
- Relevant open decisions

Keep approved wording, research inputs, material working assumptions, and owner
decisions distinct where the difference affects the copy. Do not create an
evidence ledger.

### Existing opening

- What the hero or approved opening already communicates
- What it should not be asked to prove again
- The first unresolved editorial or informational need

### Reader range

State whether the page is specialist or general, then record the materially
different reader situations that can change the page. For specialist pages,
include central and contextual relevance when both belong. For general pages,
record only specialist or inclusion contexts that can materially affect this
page rather than loading every dossier.

Record only the implications for the page and any consequential inference or
unknown. Do not add an evidence-and-limits section, imagined biographies,
testimony, emotional reactions, or a list of content every reader situation
must receive.

### Page architecture

- The page's argument or organising principle
- Whether the material needs sequence, scan-friendly retrieval, or both
- What the page can leave to another section or page
- The likely reading paths that materially affect order or emphasis

### Relevant research implications

Record only findings that change the page's argument, coverage, language, or
inclusion. Do not summarise the full dossier. When research does not answer a
necessary editorial question, use a proportionate working assumption and note
it only when it affects the recommendation.

### Directions considered

For each meaningfully different page route:

- organising idea;
- benefit;
- risk; and
- decision.

### Communication brief

- Page job
- Main message
- Reader-range implications that materially affect the page
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

**Distinct contribution:**

**Content to cover:**

**Relevant reader considerations:**

**Editorial rule:**

**Must not do:**

**Relationship to surrounding sections, when material:**
```

The planning label may be more explicit than the eventual public heading.

### Whole-page controls

- Coverage and non-duplication map
- Material the page should leave out
- Open decisions before public drafting
- Drafting sequence
- Finished-page reader-range and adversarial acceptance checks

## Section-development artifact

Suggested path: `docs/page-plan/<page-slug>-section-<section-id>.md`

Use a short, lowercase, hyphenated section ID derived from the section's owned
job, such as `session-process` or `approach-in-practice`. Keep the ID and filename
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
- What surrounding content already establishes
- Primary communication job
- Reader-range implications that materially affect this section
- Relationship to nearby sections when sequence matters

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

### Direction exploration

Use the copywriter skill's direction process. Consider at least two materially
different directions without drafting each one in full. For each:

- organising idea;
- likely shape;
- strength; and
- main risk.

Record the selected direction and the consequential trade-off. If the user is
actively choosing between directions, pause for their selection; otherwise
recommend one and proceed.

### Committed draft

Use the copywriter skill to compose, draft, and revise one complete section in
the selected direction. Do not combine safer parts of the rejected directions.
Produce multiple complete alternatives only when the user explicitly requests
them, and keep those alternatives separate.

```markdown
## Recommended working draft

### Draft

[Complete visitor-facing section copy]

### What this draft is doing

[Sentence or movement-level editorial explanation]

### Reader-range review

[Findings that arise when the visible copy is considered from each materially
relevant situation, tied to observable wording, order, emphasis, omission, or
context. Do not invent reactions to complete the exercise.]

### Main revision pressure
```

### Decision

- Selected direction and section-specific criteria
- Explanation of why the direction serves the section and page
- Clean recommended working draft
- Explanation of why other useful material was omitted

When the user explicitly requests multiple complete alternatives, give each a
separate reader-range review, compare them against the section-specific
criteria, and recommend one. Do not create a composite unless the user asks for
one after reviewing the alternatives.

### Copywriter quality and grounding

- Sentence-function check
- Model-glue and deletion pass
- Inclusion and adverse-reading check
- No invented practice details; exceptional claim check only when triggered
- Read-aloud pass

Apply the copywriter skill's methods for these checks. Do not recreate a second
copywriting method inside this artifact.

### Page-flow and artifact integrity

- Section ownership and actual page position
- Direction and draft traceability
- Cross-section coverage and non-duplication
- Relationship to surrounding sections
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

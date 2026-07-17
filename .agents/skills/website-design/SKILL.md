---
name: website-design
description: Create, redesign, implement, or critique websites and web interfaces with distinctive art direction, content-shaped layouts, accessible interaction, responsive behaviour, and production-grade visual craft. Use when Codex is asked to design, build, style, beautify, rework, or visually review a webpage, landing page, marketing site, service page, portfolio, web application, component, or visual system; translate a brief, research, or brand into an interface; or diagnose generic, templated, or AI-looking web design. Do not use for purely backend tasks or copy-only edits that intentionally preserve the interface.
---

# Website Design

Create websites as resolved communication systems, not collections of fashionable components. Make purpose, content, composition, interaction, accessibility, performance, and identity reinforce one another.

## Orient before designing

Classify the requested outcome into one or more active modes. Classify by the result the user authorised, not by incidental analysis required along the way. A mode authorises only its own work and deliverable.

### Create

Enter Create when the task needs a new structure or visual direction and no concrete direction has already been selected.

- Complete stages 1–4 and the direction review in stage 6.
- Stop after delivering the resolved direction unless Implement is also active.
- Do not edit production files, claim a built result, or continue into implementation merely because the direction is implementable.

### Redesign

Enter Redesign when an existing experience is authorised to change and its current direction, structure, or visual expression must be reconsidered.

- First record a preservation audit: what must remain, what works and should survive, what is failing, what may change, and the authorised boundary of the redesign.
- Complete stages 1–4 as needed and the direction review in stage 6. Carry preserved decisions and constraints into the selected direction.
- Stop after delivering the resolved redesign unless Implement is also active.
- Do not treat a critique request as redesign authorisation, discard working decisions without cause, or expand the redesign beyond the requested boundary.

### Implement

Enter Implement only when the user requests a built change and there is a selected direction or a sufficiently concrete implementation target.

- Establish the source of truth for the build: the selected direction, approved mock-up or specification, requested change, repository constraints, and unresolved implementation details.
- Use stages 3 and 4 only to resolve details the source of truth leaves open. Complete stage 5 and the implementation verification in stage 6.
- If implementation exposes a material conflict with content, accessibility, feasibility, or repository constraints, preserve the governing intent. Ask only when the resolution would materially change scope, identity, safety, or an irreversible decision; otherwise make the smallest justified correction and report it.
- Stop when the requested experience is implemented and verified in proportion to its risk and scope.
- Do not reopen settled concepts, generate alternatives, or change approved direction or content merely because another implementation would be easier.

### Critique

Enter Critique when the requested outcome is diagnosis, review, or prioritised recommendations rather than changed files or a replacement direction.

- Inventory the available evidence, such as the brief, content, assets, source, rendered interface, viewports, and interaction states. Distinguish evidence that is available from evidence that is missing.
- Apply [references/quality-review.md](references/quality-review.md) proportionally and complete the critique review in stage 6.
- Stop after delivering the prioritised diagnosis.
- Do not edit files, generate replacement concepts, silently convert recommendations into a redesign, or enter implementation unless the user explicitly requests the additional mode.

### Compose modes without repeating work

Run explicitly combined modes in dependency order and carry their artifacts forward:

- **Create → Implement:** select and review the direction once, then treat it as the implementation source of truth.
- **Redesign → Implement:** carry the preservation audit, redesign boundary, and selected direction directly into implementation.
- **Critique → Redesign:** use the critique as evidence and a problem statement, then make the preservation and direction decisions required by Redesign.
- **Critique → Implement:** implement only explicitly requested, bounded corrections that fit the existing direction. If the remedy requires a new direction, Redesign must also be authorised.
- **Implement → Critique:** reuse implementation evidence, but perform the independent diagnosis the critique request requires rather than treating successful verification as a favourable critique.

Do not repeat the brief, audit, concept selection, or evidence collection merely because another mode has begun. A critique does not silently authorise redesign or implementation, and a design direction does not silently authorise changed files.

Inspect the actual content, assets, code, framework, runtime, and constraints relevant to the task. Follow higher-authority task and repository instructions. Treat existing styling as context, not proof that it is correct or reusable. Separate conventions that preserve recognition or operability from conventions that merely make new work resemble the old work. Reports, examples, galleries, and previous concepts are evidence or prompts unless the user explicitly selects them; do not silently turn their suggestions into the design brief.

If visual direction is open, read [references/visual-craft.md](references/visual-craft.md). If generic or AI-like output is a concern, also read [references/anti-generic.md](references/anti-generic.md). Before delivering implemented or reviewed work, read [references/quality-review.md](references/quality-review.md).

## Use the shared workflow stages

### 1. Frame the experience

Required for Create and for Redesign when the existing brief does not already answer the relevant questions. In Implement, capture only missing constraints instead of rebuilding a settled brief. In Critique, use the intended audience, purpose, and constraints as evaluation criteria; do not invent a replacement brief.

Write a compact decision brief before choosing visuals:

- audience and likely state on arrival;
- page job and primary next step;
- questions the page must answer;
- content and evidence that must be findable;
- reasons to trust the organisation or product;
- tone as productive tensions, such as “warm but rigorous”;
- real assets and missing assets;
- category conventions worth preserving, conventions worth challenging, and likely default assumptions;
- accessibility, performance, technology, maintenance, and delivery constraints.

Use real or representative content early. Never invent testimonials, clients, awards, statistics, clinical claims, or product capabilities. Mark illustrative material clearly.

Ask for clarification only when the missing answer would materially change scope, safety, identity, or an irreversible decision. Otherwise state a reasonable assumption and proceed.

### 2. Establish art direction

Required for Create and for Redesign when visual direction is open. In Implement, treat the selected direction as the source of truth and skip concept generation. In Critique, evaluate whether the existing direction is coherent and justified without authoring alternatives.

Define the governing idea before selecting components. Express it as:

> Create the feeling of [specific world or experience] for [audience state], using [composition], [typography], [colour/material], [imagery], and [motion behaviour].

For creation from scratch, open-ended redesign, or any request for distinctive or non-generic work, develop two or three structurally opposed concepts before high-fidelity implementation unless the user has already selected a concrete direction. Keep this exploration proportionate: concise structural outlines are enough when full mock-ups would be wasteful. Vary composition, hierarchy, density, content form, type voice, image role, material logic, motion character, and relationship to the surrounding system; palette swaps do not count as concepts.

Select a direction against purpose, audience, content fit, distinctiveness, accessibility, asset realism, and implementation cost. Do not average the concepts together. If the user has selected a direction, deepen it instead of reopening settled choices.

Make the governing idea produce observable consequences across composition, typography, material, imagery, and interaction. If it is only a mood label, an aesthetic category, or a sentence that could explain many unrelated sites, it is not yet art direction.

Commit to one dominant idea, two or three supporting behaviours, and deliberate exclusions that prevent drift. Prefer a signature relationship that belongs to the content, organisation, place, process, or interaction over a conspicuous visual device added to signal originality.

Before selecting, perform a convergence check:

- identify the three to five choices most likely to be category, framework, trend, or generation defaults;
- test the concepts without logos, brand colours, and subject nouns;
- test the whole combination, because individually defensible choices can accumulate into a familiar template;
- replace or explicitly justify transferable choices through the brief, evidence, assets, or interaction.

### 3. Shape the page around its content

In Create and Redesign, author the content architecture and composition. In Implement, resolve only the structural details left open by the source of truth. In Critique, assess content-form fit without rewriting or rearranging the experience.

Choose a page form because it suits the information: editorial narrative, fact-first service, split proposition with real proof, directory, immersive visual opening, utility-first task, or exact comparison.

Build the hierarchy before styling:

1. orientation;
2. essential answer or proposition;
3. evidence, explanation, or task support;
4. decision and next step;
5. secondary detail.

Map each content block to the visitor question it answers, the evidence it contains, and the form that makes that relationship easiest to understand. Revise the amount, order, and rhetorical shape of draft copy when design work is authorised; do not preserve a stack of similarly shaped text modules merely because they arrived as separate sections.

Select section forms semantically. Use a timeline for sequence, a table for exact comparison, an annotated image for spatial explanation, a ruled list for genuine distinctions, or a form for an actual transaction. Use direct answers, examples, boundaries, evidence, narrative, and practical detail in forms appropriate to them. Avoid repeating one rhetorical and visual module—label, expressive heading, deck, prose—through an entire page.

Compose visual weight deliberately: establish a first read, create dominant/supporting/quiet levels, use alignment and proximity to express relationships, balance density with space, vary rhythm when meaning changes, and break the grid only after establishing it.

### 4. Define a small visual grammar

In Create and Redesign, define the grammar that expresses the selected direction. In Implement, derive only the rules needed to execute unspecified details coherently. In Critique, assess the existing grammar without replacing it.

Create only the rules needed for coherence:

- container, columns, gutters, and recurring alignment anchors;
- display, reading, and utility type roles;
- canvas, text, action, accent, border, and semantic colour roles;
- spacing relationships with optical correction;
- edge, border, radius, elevation, and texture logic;
- photography or illustration direction and crop behaviour;
- state, spatial, narrative, and atmospheric motion rules.

Use tokens for genuinely repeated decisions. Keep one-off exploration page-scoped until it proves reusable. Consistency should make the interface learnable, not force unlike content into identical modules. Treat a design system as a grammar and constraint set, not a page generator: preserve interaction contracts and intentional identity while allowing authorised content-shaped departures in composition, rhythm, imagery, and emphasis.

### 5. Implement the complete experience

Run this stage only when Implement is active. Create and Redesign stop before file changes when Implement is not requested. Critique never enters this stage on its own.

Preserve the repository's established stack and conventions unless the task authorises a change. Implement the selected concept rather than allowing available components or the easiest CSS pattern to replace it. Prefer semantic HTML and native behaviour. Keep component structure proportional to the task; do not create abstractions solely to appear systematic.

Include the states polished mock-ups omit: hover, focus, active, visited, disabled, loading, empty, success, and error where applicable; keyboard order; labelled controls; useful validation; touch-safe targets; responsive navigation; reduced motion; resilient content extremes; image dimensions and sources; and font fallbacks with layout-shift control.

Treat responsive design as recomposition. Change order, crop, density, columns, disclosure, and interaction when content pressure requires it. Do not merely shrink desktop or enlarge mobile.

### 6. Review the active deliverable

Use [references/quality-review.md](references/quality-review.md) proportionally. Perform only checks supported by the available artifact and evidence. Never imply that source inspection, concept review, screenshot inspection, automated checks, or interactive testing verify things they cannot.

#### Direction review — Create and Redesign

Before delivering a direction or entering implementation, test the decision brief, selected concept, content hierarchy, governing idea, convergence risks, accessibility implications, asset realism, responsive intent, and implementation feasibility. Resolve contradictions while the work is still directional. When stopping before implementation, state what remains unbuilt or unverified; do not claim browser or interaction validation.

#### Implementation verification — Implement

Verify at four distances:

- **Thumbnail:** focal point, balance, hierarchy, silhouette, section rhythm.
- **Reading:** type texture, measure, proximity, scan paths, evidence placement.
- **Interaction:** affordances, states, feedback, keyboard, motion, responsive behaviour.
- **Detail:** line breaks, crop, icon alignment, borders, radii, shadows, loading, edge cases.

Render and inspect narrow, intermediate, and wide widths. Test real interaction rather than relying only on source inspection. Check the console, overflow, zoom or enlarged text, keyboard flow, and reduced motion. Iterate until the task and visual thesis survive implementation.

#### Critique review — Critique

Review only what the available evidence can support. Identify direct observations, interpretations, and unverified risks separately. Use rendered and interactive checks when a runnable experience is available; otherwise constrain findings to the supplied screenshots, artifacts, source, or brief. Prioritise causes and consequences rather than producing an undifferentiated checklist, and preserve resolved decisions that should survive any later work.

## Hold the quality bar

### Make hierarchy visible

Do not give the logo, navigation, headline, action, image, badge, and chat control equal contrast. Concentrate emphasis. A design with no quiet areas has no focal point.

### Make typography do real work

Choose type by voice, reading conditions, language support, styles, and loading cost. Build hierarchy with size, weight, width, style, case, colour, spacing, and position. Test real content rather than specimen words.

### Give colour and material roles

Build lightness hierarchy first, then hue. Use colour consistently for action, state, grouping, and identity. Make borders, shadows, radius, transparency, and texture belong to one material world. Accessibility contrast is a floor, not the whole decision.

### Direct imagery

Give every image a job: evidence, explanation, identification, narrative, or deliberate atmosphere. Define subject distance, point of view, light, behaviour, crop, aspect ratio, and colour treatment. Prefer information-carrying and believable imagery over generic aspiration.

### Use motion for meaning

Use motion to explain state, cause, spatial continuity, or sequence. Keep direct feedback immediate. Make repeated and automatic motion quiet or absent. Preserve comprehension under reduced-motion preferences.

### Combine recognisable interaction with distinctive expression

Keep standard controls understandable. Put originality into composition, typography, imagery, editorial rhythm, material, and context-specific interaction. Novelty should reward attention, not impose relearning.

## Resist generic generation

Do not ban gradients, cards, pills, serif headlines, bento grids, glass, or popular fonts categorically. Do not create an anti-template template either. Diagnose whether each choice and the accumulated composition follow from content and art direction or from a default recipe.

Reject broad adjectives standing in for a thesis, universal hero/section stacks, card containers around prose, decoration without a role, synthetic claims or metrics, whole-page regeneration that loses good decisions, one overall “looks good” score, and simulated humanity pasted onto a generic structure.

Run the transferability test: replace the logo, accent colour, and nouns with a competitor's or an adjacent category. If the page remains fully plausible, strengthen its content-shaped structure, evidence, imagery, visual thesis, or signature relationship. Being polished, asymmetric, restrained, expressive, or technically correct does not make a design authored.

## Deliver the result

Every active mode must leave the user with an evaluable outcome. The requirements below govern content, not presentation: use natural structure, combine related material, and omit inapplicable details rather than forcing fixed headings, empty sections, or a rigid order.

### Create deliverable

Include:

- the audience, experience job, and governing idea;
- the meaningful alternatives considered when contrastive concepts were required, why the selected direction won, and what was deliberately excluded;
- observable consequences for composition, hierarchy, typography, colour or material, imagery, motion, and responsive behaviour as relevant;
- consequential assumptions, missing assets, constraints, and what remains unbuilt or unverified;
- whether the work stops at direction or transitions into Implement.

### Redesign deliverable

Include:

- the diagnosis and authorised redesign boundary;
- what was preserved, what changed, and the reason for each material departure;
- the selected governing idea and how it addresses the diagnosed failures without losing resolved strengths;
- consequential assumptions, unresolved decisions, and whether the work stops at direction or transitions into Implement.

### Implement deliverable

Include:

- the delivered visual and interaction outcome;
- relevant changed files or artifacts;
- material interpretation decisions, deviations from the source of truth, and the reasons for them;
- the builds, tests, viewport checks, and interactions actually verified, with their results;
- remaining limitations, unverified conditions, or follow-up decisions.

### Critique deliverable

Include:

- the review scope, evidence used, and material evidence that was unavailable;
- prioritised findings that connect observation and evidence to cause, consequence, and recommended response;
- resolved decisions or strengths worth preserving;
- distinctions between direct observation, reasoned inference, and unverified risk;
- verification limits and the next decision required, without presenting recommendations as completed changes.

For combined modes, deliver one coherent decision trail and satisfy each active mode once. Do not repeat the same brief, diagnosis, rationale, or evidence under multiple labels. Lead with the outcome, explain only decisions that help the user evaluate it, and do not narrate routine tool mechanics.

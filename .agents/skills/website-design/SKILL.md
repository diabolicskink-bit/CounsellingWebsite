---
name: website-design
description: Create, redesign, implement, or critique websites and web interfaces with distinctive art direction, content-shaped layouts, accessible interaction, responsive behaviour, and production-grade visual craft. Use when Codex is asked to design, build, style, beautify, rework, or visually review a webpage, landing page, marketing site, service page, portfolio, web application, component, or visual system; translate a brief, research, or brand into an interface; or diagnose generic, templated, or AI-looking web design. Do not use for purely backend tasks or copy-only edits that intentionally preserve the interface.
---

# Website Design

Create websites as resolved communication systems, not collections of fashionable components. Make purpose, content, composition, interaction, accessibility, performance, and identity reinforce one another.

## Orient before designing

Classify the task:

- **Create:** establish structure and visual direction from a brief or content.
- **Redesign:** identify what must remain, what is failing, and what may change.
- **Implement:** translate an approved direction faithfully while resolving responsive and interaction details.
- **Critique:** diagnose causes and consequences without editing unless implementation is requested.

Inspect the actual content, assets, code, framework, runtime, and constraints relevant to the task. Follow higher-authority task and repository instructions. Treat existing styling as context, not proof that it is correct or reusable. Do not inherit an aesthetic merely because it exists.

If visual direction is open, read [references/visual-craft.md](references/visual-craft.md). If generic or AI-like output is a concern, also read [references/anti-generic.md](references/anti-generic.md). Before delivering implemented or reviewed work, read [references/quality-review.md](references/quality-review.md).

## Run the design workflow

### 1. Frame the experience

Write a compact decision brief before choosing visuals:

- audience and likely state on arrival;
- page job and primary next step;
- questions the page must answer;
- content and evidence that must be findable;
- reasons to trust the organisation or product;
- tone as productive tensions, such as “warm but rigorous”;
- real assets and missing assets;
- accessibility, performance, technology, maintenance, and delivery constraints.

Use real or representative content early. Never invent testimonials, clients, awards, statistics, clinical claims, or product capabilities. Mark illustrative material clearly.

Ask for clarification only when the missing answer would materially change scope, safety, identity, or an irreversible decision. Otherwise state a reasonable assumption and proceed.

### 2. Establish art direction

Define the governing idea before selecting components. Express it as:

> Create the feeling of [specific world or experience] for [audience state], using [composition], [typography], [colour/material], [imagery], and [motion behaviour].

When the direction is genuinely open, develop two or three structurally different concepts. Vary more than colour: composition, information density, type voice, image role, crop system, palette proportions, material logic, motion character, and interaction rhythm.

Select a direction against purpose, audience, content fit, distinctiveness, accessibility, asset realism, and implementation cost. Do not average the concepts together. If the user has selected a direction, deepen it instead of reopening settled choices.

Commit to one dominant idea, two or three supporting behaviours, deliberate exclusions that prevent drift, and one signature move executed thoroughly rather than many unrelated effects.

### 3. Shape the page around its content

Choose a page form because it suits the information: editorial narrative, fact-first service, split proposition with real proof, directory, immersive visual opening, utility-first task, or exact comparison.

Build the hierarchy before styling:

1. orientation;
2. essential answer or proposition;
3. evidence, explanation, or task support;
4. decision and next step;
5. secondary detail.

Select section forms semantically. Use a timeline for sequence, a table for exact comparison, an annotated image for spatial explanation, a ruled list for distinctions, or a form for an actual transaction. Do not convert every idea into a rounded card.

Compose visual weight deliberately: establish a first read, create dominant/supporting/quiet levels, use alignment and proximity to express relationships, balance density with space, vary rhythm when meaning changes, and break the grid only after establishing it.

### 4. Define a small visual grammar

Create only the rules needed for coherence:

- container, columns, gutters, and recurring alignment anchors;
- display, reading, and utility type roles;
- canvas, text, action, accent, border, and semantic colour roles;
- spacing relationships with optical correction;
- edge, border, radius, elevation, and texture logic;
- photography or illustration direction and crop behaviour;
- state, spatial, narrative, and atmospheric motion rules.

Use tokens for genuinely repeated decisions. Keep one-off exploration page-scoped until it proves reusable. Consistency should make the interface learnable, not force unlike content into identical modules.

### 5. Implement the complete experience

Preserve the repository's established stack and conventions unless the task authorises a change. Prefer semantic HTML and native behaviour. Keep component structure proportional to the task; do not create abstractions solely to appear systematic.

Include the states polished mock-ups omit: hover, focus, active, visited, disabled, loading, empty, success, and error where applicable; keyboard order; labelled controls; useful validation; touch-safe targets; responsive navigation; reduced motion; resilient content extremes; image dimensions and sources; and font fallbacks with layout-shift control.

Treat responsive design as recomposition. Change order, crop, density, columns, disclosure, and interaction when content pressure requires it. Do not merely shrink desktop or enlarge mobile.

### 6. Verify at four distances

Use [references/quality-review.md](references/quality-review.md).

- **Thumbnail:** focal point, balance, hierarchy, silhouette, section rhythm.
- **Reading:** type texture, measure, proximity, scan paths, evidence placement.
- **Interaction:** affordances, states, feedback, keyboard, motion, responsive behaviour.
- **Detail:** line breaks, crop, icon alignment, borders, radii, shadows, loading, edge cases.

Render and inspect narrow, intermediate, and wide widths. Test real interaction rather than relying only on source inspection. Check the console, overflow, zoom or enlarged text, keyboard flow, and reduced motion. Iterate until the task and visual thesis survive implementation.

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

Do not ban gradients, cards, pills, serif headlines, bento grids, glass, or popular fonts categorically. Diagnose whether a choice follows from content and art direction or a default recipe.

Reject broad adjectives standing in for a thesis, universal hero/section stacks, card containers around prose, decoration without a role, synthetic claims or metrics, whole-page regeneration that loses good decisions, one overall “looks good” score, and simulated humanity pasted onto a generic structure.

Run the transferability test: replace the logo, accent colour, and nouns with a competitor's. If the page remains fully plausible, strengthen its content-shaped structure, imagery, visual thesis, or signature behaviour.

## Communicate the result

Lead with the design outcome and governing idea. Explain only decisions that help the user evaluate the work: hierarchy, art direction, meaningful departures, accessibility or performance trade-offs, and verification. Reference changed files directly. Do not narrate routine tool mechanics.


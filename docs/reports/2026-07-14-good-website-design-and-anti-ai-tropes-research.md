# Good Website Design in 2026: Evidence, Visual Craft, and Distinctive Digital Experiences

**Research date:** 14 July 2026  
**Scope:** Independent research into strong contemporary website design, with particular depth on art direction, composition, layout, typography, colour, imagery, motion, accessibility, usability, performance, and trust. A secondary section examines generic AI aesthetics and how to avoid them. This report is not based on, or constrained by, the existing design rules or implementation of this repository.  
**Intended use:** A research reference and review framework, not a mandatory visual specification.

## Executive summary

Good website design is not a style. It is the successful integration of purpose, content, information architecture, visual hierarchy, interaction, accessibility, performance, trust, and a recognisable point of view.

The strongest evidence supports a few durable conclusions:

1. **Begin with what people need to understand or do.** A polished interface cannot rescue a site that does not answer the visitor's question or support the intended task. The UK Government Design Principles put user needs, evidence, simplicity, iteration, inclusion, and context ahead of surface styling.
2. **Make the structure legible before making it expressive.** Descriptive headings, meaningful links, familiar controls, clear grouping, visible focus, and useful feedback reduce cognitive effort. Good visual hierarchy and good semantic structure should describe the same underlying organisation.
3. **Treat aesthetics as functional, but not as camouflage.** People form aesthetic impressions extremely quickly. Research on website screenshots found that visual complexity and prototypicality influenced ratings within 17-50 milliseconds, with relatively low complexity and high prototypicality rated most appealing in that experiment. Attractive design can improve perceived usability, but it cannot compensate indefinitely for a confusing task or unreliable system.
4. **Balance familiarity and novelty.** Familiar patterns provide usability and confidence; contextual departures create identity and memorability. The goal is recognisable interaction with distinctive expression, not novelty in every control and not template sameness across the whole page.
5. **Accessibility and performance are design qualities.** WCAG 2.2, responsive reflow, usable target sizes, contrast, keyboard access, reduced-motion care, robust forms, and fast, stable rendering directly shape whether the design works.
6. **Strong visual design is organised contrast.** A resolved page has a clear focal point, supporting levels, intentional alignment, controlled density, useful negative space, and a rhythm of continuity and change. It does not give every section, card, colour, and heading equal weight.
7. **Art direction turns ingredients into a point of view.** Typography, colour, image, material, shape, composition, and motion should describe the same character. Distinctiveness normally comes from one or two deeply developed ideas, not many unrelated effects.
8. **Generic AI aesthetics are a secondary process risk, not the definition of design quality.** A purple gradient, bento grid, serif headline, glow, pill, or rounded card can all be appropriate. The recognisable “AI look” emerges when statistically safe choices accumulate without a content, audience, brand, or material reason. The remedy is stronger design work—specific content, authored art direction, contrastive exploration, testing, and refinement—not a fashionable anti-AI style.

The practical standard proposed in this report is:

> A good website makes its purpose and next steps obvious, remains usable across people and devices, earns trust through substance and reliable behaviour, and expresses an identity that could not be transferred unchanged to a different organisation.

## 1. Research method and confidence

This report uses three evidence layers.

### Layer A: standards and operational guidance

These sources support requirements and measurable checks:

- W3C Web Accessibility Initiative and WCAG 2.2;
- GOV.UK service and content design guidance;
- Google Chrome/web.dev documentation on responsive design, typography, and Core Web Vitals;
- regulatory and policy research on deceptive interface patterns.

### Layer B: established research and usability evidence

These sources support general design principles:

- experimental research on first impressions, visual complexity, prototypicality, novelty, and typicality;
- Nielsen Norman Group usability heuristics and eye-tracking research;
- Stanford's large web-credibility study.

Some frequently cited studies are older. They are included where the underlying human behaviour remains relevant, but their age and context should be kept in mind. For example, Stanford's credibility study is useful evidence that visual design and information structure influence credibility judgements, not a current numerical benchmark for all audiences.

### Layer C: current industry and cultural observation

These sources help identify emerging AI tropes and design practice in 2025-2026:

- 2026 research on homogenisation in AI-mediated web design;
- current design-tool commentary from Figma and Webflow;
- contemporary design criticism and practitioner commentary.

Claims about a particular “AI look” belong mainly to this third layer. They are time-sensitive cultural observations, not universal usability laws. This report therefore distinguishes **bad design outcomes** from merely **fashionable ingredients**.

## 2. What “good website design” should mean

A useful definition needs to include more than beauty or conversion.

| Quality | The design succeeds when… | Typical failure |
| --- | --- | --- |
| Useful | It answers a real need or enables a real task. | The page communicates what the organisation wants to say, not what the visitor needs to know. |
| Understandable | Purpose, structure, labels, and next steps are clear. | Vague headings, clever navigation labels, weak grouping, or too many competing messages. |
| Usable | People can complete tasks with low effort and recover from errors. | Hidden states, unclear controls, memory-heavy flows, or no useful feedback. |
| Accessible | The experience works across disability, input method, viewport, zoom, and user preferences. | Accessibility is treated as an automated score or a late compliance pass. |
| Trustworthy | Claims, identity, costs, privacy choices, and system behaviour are candid and reliable. | Visual polish masks missing specifics, manipulative choice architecture, or technical fragility. |
| Performant | Important content appears quickly, interactions respond promptly, and layout remains stable. | Oversized media, excessive scripts, font delays, or decorative motion dominate the experience. |
| Distinctive | The visual and verbal system expresses a relevant, specific point of view. | A fashionable template could be relabelled for any competitor. |
| Coherent | Repeated decisions form a learnable system without making every page identical. | Either design drift or rigid component repetition regardless of content. |
| Maintainable | The system can evolve without losing accessibility, quality, or identity. | One-off effects and duplicated components make every change risky. |

No single metric captures this. Conversion can reward coercion. Engagement can reward distraction. Accessibility conformance does not guarantee a comprehensible service. Award juries may reward spectacle that performs poorly in an everyday task. Good design needs a balanced set of outcomes and qualitative review.

## 3. Twelve durable principles

### 3.1 Start with a visitor decision or task

The [Government Design Principles](https://www.gov.uk/guidance/government-design-principles) begin with user needs, call for evidence rather than assumptions, and distinguish consistency from uniformity. Their service perspective is useful beyond government: a website is part of a real-world relationship, not an isolated composition.

Before layout work, define:

- who arrives and in what context;
- what they are trying to understand, compare, decide, or complete;
- what uncertainty blocks them;
- which information changes their decision;
- what a successful next step is;
- what must remain possible without JavaScript, animation, or visual inference.

A useful page brief is not “create an elegant landing page.” It is closer to: “Help a first-time visitor understand the offer, determine whether it fits their circumstances, find the cost and conditions, and contact the right person without searching across several pages.”

### 3.2 Build information architecture from questions, not departments

Navigation and page structure should reflect the visitor's mental model. The [GOV.UK guidance on user needs](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/identify-user-needs/) recommends grounding needs in research, analytics, support data, and language people recognise.

Good information architecture usually has:

- a small set of descriptive top-level destinations;
- a clear current location;
- meaningful page titles;
- links that predict the destination;
- important facts available where decisions are made;
- multiple sensible paths to high-value content on larger sites;
- no dependence on ambiguous labels such as “Discover,” “Solutions,” or “Learn more” when a specific destination name is possible.

The [Nielsen Norman Group menu checklist](https://media.nngroup.com/media/articles/attachments/PDF_Menu-Design-Checklist.pdf) likewise stresses descriptive labels, visible submenu cues, adequate target size, and avoiding unnecessarily deep cascading menus.

### 3.3 Design for scanning without reducing everything to fragments

People do not always read in an F-pattern, and designers should not try to manufacture one. Nielsen Norman Group's [eye-tracking synthesis](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) describes several behaviours, including layer-cake scanning through headings, spotted scanning for distinctive words, and committed reading when motivation is high. The practical lesson is to support both orientation and deeper reading.

Use:

- informative headings that remain useful out of context;
- the most important information early;
- strong opening words in headings and list items;
- short, coherent paragraphs rather than artificially clipped prose;
- lists for genuinely parallel or sequential information;
- whitespace, rules, or surfaces to show relationships;
- emphasis sparingly, so it continues to signal importance;
- descriptive links rather than repeated generic calls to action.

Avoid turning every sentence into a heading, card, chip, statistic, or scroll animation. Excessive fragmentation makes hierarchy flatter, reading more laborious, and the page more likely to resemble generated marketing UI.

### 3.4 Make visual hierarchy express meaning

Hierarchy should tell the visitor what matters, what belongs together, and what can be acted on.

The [W3C cognitive accessibility pattern for page structure](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/) recommends logical sections, clear differentiation through whitespace or boundaries, meaningful headings, and visual indicators of grouping and relative importance. The [W3C page-structure guidance](https://www.w3.org/WAI/tutorials/page-structure/content/) makes the corresponding semantic case.

Practical hierarchy rules:

- create one dominant entry point, not five equally loud messages;
- distinguish heading levels through scale, spacing, and position, not size alone;
- use proximity before boxes;
- align related content deliberately;
- reserve strong colour contrast for important information and actions;
- preserve quiet regions so emphasis has somewhere to emerge from;
- make the DOM order and visual reading order agree;
- let section rhythm vary with content density while keeping an intelligible overall system.

The common “everything is a card” pattern often fails because it assigns the same visual weight and boundary to unrelated content types. A title, fact, quote, navigation item, process step, and testimonial do not automatically need the same container.

### 3.5 Treat typography as interface infrastructure

Typography determines reading comfort, hierarchy, tone, density, responsiveness, and loading behaviour. The [web.dev typography guide](https://web.dev/learn/design/typography/) emphasises size, line length, line spacing, user preferences, and language—not merely font choice.

Good web typography generally includes:

- a body size that remains comfortable on small screens and under zoom;
- controlled measure for long-form text;
- sufficient line height and paragraph separation;
- a restrained, purposeful type scale;
- weights that render clearly on real devices;
- robust fallback fonts and loading behaviour;
- tested accented characters, numerals, punctuation, and italics;
- limited all-caps and letter spacing at small sizes;
- typefaces selected for the subject and identity, not simply because they are fashionable.

WCAG 2.2's [Visual Presentation understanding document](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) describes an AAA mechanism for controlling colours, width, alignment, line spacing, paragraph spacing, and line length. Those exact AAA conditions are not a universal visual prescription, but they identify the variables that materially affect reading.

Type can create distinctiveness with surprisingly little decoration. The danger is replacing one default with another. Moving from Inter to a currently fashionable grotesk, or from a geometric sans to an oversized editorial serif, does not by itself create authorship.

### 3.6 Use colour and surface to organise, not merely decorate

Colour should support hierarchy, state, identity, and readability.

Minimum text contrast under WCAG 2.2 is generally 4.5:1 for normal text and 3:1 for large text; the [W3C contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) explains the visual-acuity rationale. Contrast compliance is a floor, not proof of legibility. Very thin type, text over imagery, glare, ambient light, and adjacent colour effects still matter.

Strong colour systems tend to have:

- defined roles rather than a bag of hex values;
- a dominant field, supporting neutrals, and limited accents;
- states that do not rely on colour alone;
- consistent interactive contrast across default, hover, focus, active, and disabled states;
- tested text-over-image treatment;
- enough tonal difference between nested surfaces;
- restraint with gradients, translucency, and glow so they retain meaning.

The problem with a gradient is not that it is a gradient. The problem is a fashionable gradient used as a substitute for art direction, repeated regardless of subject, and often paired with low-contrast text and decorative blur.

### 3.7 Design responsively around content pressure

Responsive design should respond to content, input methods, user settings, and available space—not a short list of fashionable device widths. The [web.dev responsive-design guide](https://web.dev/articles/responsive-web-design-basics) describes layouts adapting to device capabilities and modes of interaction. WCAG's [Reflow criterion](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) requires most content to work without two-dimensional scrolling at the equivalent of 320 CSS pixels wide and at 400% zoom, with limited exceptions.

Review at minimum:

- narrow and wide viewports;
- portrait and landscape;
- 200% text resize and 400% browser zoom;
- long headings, names, labels, and translated text;
- touch, keyboard, mouse, and voice-control implications;
- slow network and missing-image states;
- reduced-motion and increased-contrast preferences where supported;
- safe areas and browser UI on mobile;
- content that changes height after validation or data loading.

Do not make mobile a compressed desktop. Reconsider priority, order, density, tap areas, and the number of simultaneous choices.

### 3.8 Make interaction obvious, forgiving, and calm

The [ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) remain a useful inspection framework: show system status, use familiar language, preserve user control, follow conventions, prevent errors, favour recognition over recall, keep interfaces relevant, and help people recover.

For public websites:

- links should look like links and buttons like buttons;
- the primary action should be identifiable without suppressing legitimate alternatives;
- controls need visible hover and focus states;
- loading, success, error, empty, and disabled states need deliberate design;
- destructive or consequential actions need proportionate confirmation;
- users should be able to go back, cancel, edit, and retry;
- accordions, tabs, dialogs, menus, and carousels need correct keyboard and screen-reader behaviour;
- motion should explain continuity, status, or spatial change rather than continually announce that the page is modern.

WCAG 2.2 sets a [24 by 24 CSS-pixel minimum target size or spacing condition](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) at Level AA, with exceptions. Important controls often benefit from larger targets. WCAG also addresses [focus not being obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) and the ability to disable non-essential [animation triggered by interaction](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

### 3.9 Make forms feel like a conversation with clear rules

Forms are where vague visual design becomes operational friction.

The W3C form tutorials recommend [explicit labels](https://www.w3.org/WAI/tutorials/forms/labels/) and accessible [error, success, and progress notifications](https://www.w3.org/WAI/tutorials/forms/notifications/). Good forms also:

- ask only for information that is necessary now;
- explain why sensitive or unusual information is needed;
- place labels persistently outside fields rather than using placeholders as labels;
- group related controls semantically and visually;
- show required status consistently;
- accept realistic input formats where possible;
- preserve entered values after errors;
- identify the problem next to the field and in a useful summary for long forms;
- use plain-language error messages that explain how to fix the issue;
- provide a visible confirmation and what happens next;
- avoid disabling submit without explaining why.

### 3.10 Make speed and stability part of the composition

Performance is experienced as design. A beautiful hero that arrives late, a button that ignores a tap, or a layout that jumps during reading is not well designed.

Google's current [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds) define a “good” experience at the 75th percentile as:

- Largest Contentful Paint (LCP): **2.5 seconds or less**;
- Interaction to Next Paint (INP): **200 milliseconds or less**;
- Cumulative Layout Shift (CLS): **0.1 or less**.

Design choices with large performance consequences include:

- autoplay video and large hero imagery;
- several font families or many font weights;
- animation libraries and page-wide scroll effects;
- large client-side bundles for simple content pages;
- third-party embeds, consent tools, analytics, and chat widgets;
- image and video elements without reserved dimensions;
- late banners inserted above existing content;
- elaborate cursor effects or WebGL used without a task benefit.

Measure both laboratory and field performance. Lighthouse can find development issues, but field data captures real devices, networks, and interactions.

### 3.11 Build trust through specificity and reliable behaviour

Trust is not produced by a shield icon, a testimonial carousel, muted colours, or a photograph of smiling people. It is produced by evidence and consistency between promise and experience.

The Stanford [web credibility research](https://credibility.stanford.edu/research.html) found that visual design, information architecture, advertising, and other design decisions influence credibility. Its large 2002 study reported that “design look” was frequently mentioned in participants' credibility comments, while the importance of particular signals varied by site category. Treat that as historical evidence of a relationship, not a current universal percentage.

Useful trust signals include:

- a clearly identified organisation or person;
- verifiable credentials and claims where relevant;
- current dates, prices, terms, availability, and limitations;
- real contact and support paths;
- transparent privacy and data-use information;
- authentic imagery with accurate captions;
- testimonials or reviews with enough context to be meaningful and lawful;
- well-maintained pages, working links, and clear error handling;
- no gap between the apparent action and what clicking it actually does.

### 3.12 Avoid deceptive design

Good design respects the visitor's ability to make an informed choice. The [OECD report on dark commercial patterns](https://www.oecd.org/en/publications/dark-commercial-patterns_44f5e846-en.html) documents interfaces that steer, deceive, coerce, or manipulate consumers. A 2024 international review announced by the [US Federal Trade Commission](https://www.ftc.gov/news-events/news/press-releases/2024/07/ftc-icpen-gpen-announce-results-review-use-dark-patterns-affecting-subscription-services-privacy) found at least one possible dark pattern in nearly 76% of 642 reviewed subscription sites and apps, while explicitly not determining that every instance was unlawful.

Avoid:

- false urgency and fake scarcity;
- preselected consent or add-ons;
- hiding material information until late in a process;
- visually dominant acceptance paired with faint refusal;
- making cancellation substantially harder than sign-up;
- repeated prompts after a decision;
- disguised advertising;
- guilt-based confirmation copy;
- confusing privacy choices;
- actions whose visual prominence serves the organisation by obscuring the visitor's interests.

## 4. Familiarity, novelty, and memorable design

Distinctive design should not require relearning ordinary interaction.

The 2012 [Tuch et al. study](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/) found that visual complexity and prototypicality affected aesthetic judgements extremely quickly; low-complexity, high-prototypicality screenshots were rated most appealing in its experiments. A newer 2025 study, [“The Effect of Novelty and Typicality on Aesthetic Appeal of Websites”](https://www.tandfonline.com/doi/full/10.1080/10447318.2025.2576633), revisits the “Most Advanced Yet Acceptable” balance and reports that the relationship varies with website type.

The useful synthesis is:

- keep navigation, links, buttons, forms, and feedback recognisable;
- put novelty into composition, imagery, typography, transitions, editorial rhythm, or a context-specific interaction;
- introduce one or two strong ideas and execute them thoroughly;
- do not make every element compete to be memorable;
- test departures with people who were not present when the concept was explained.

Memorability can come from restraint: an unusually precise typographic voice, a distinctive crop system, a recurring line or frame, a meaningful colour relationship, a unique transition between content types, or a particular way of integrating evidence. It does not require maximalism.

## 5. What good visual design actually looks like

The previous principles establish whether a website is useful and usable. This section addresses the more visual question: **what makes a site look and feel genuinely well designed?**

There is no single correct aesthetic. A restrained professional service, an experimental arts organisation, a public utility, and a children's product should not share a house style. The common quality is not minimalism, decoration, or trend alignment. It is **resolved intent**: content, hierarchy, composition, type, colour, image, surface, and motion reinforce the same purpose and character.

[IBM's layout guidance](https://www.ibm.com/design/language/layout/overview/) describes composition through hierarchy, scale, proportion, contrast, harmony, rhythm, and repetition. [Material Design's foundational principles](https://m1.material.io/material-design/introduction.html) similarly treat typography, grids, space, scale, colour, imagery, surface, and motion as meaning-making tools rather than finishing touches. The useful lesson is broader than either brand system: visual quality emerges from relationships among elements, not from the quality of isolated ingredients.

### 5.1 Begin with art direction, not components

Art direction is the governing idea that determines how the whole experience should communicate. It is more specific than a mood board and more durable than a page layout. Smashing Magazine's work on [art direction for the web](https://www.smashingmagazine.com/2018/04/art-directing-web-css-grid/) defines it as using image, layout, typography, and other choices to tell a story and direct meaning—not simply decorating a responsive template.

A useful art-direction statement combines five things:

1. **Subject:** what world does the organisation actually inhabit?
2. **Audience state:** how might the visitor feel on arrival—curious, hurried, uncertain, sceptical, excited, vulnerable?
3. **Desired change:** what should the experience help them understand, feel, or do?
4. **Character:** what tensions should the design hold, such as warm and rigorous, playful and capable, quiet and assured?
5. **Formal consequence:** what does that mean for composition, type, colour, image, and motion?

For example, “calm and premium” is too vague. A stronger direction might be: “Create the feeling of a well-edited field guide: observant, grounded, and quietly expert. Use a stable editorial grid, generous but not empty margins, candid close-range photography, a humanist text face, restrained mineral colour, fine rules, and almost no automatic motion.” The second version can guide real decisions and reject irrelevant ones.

Strong art direction usually has:

- one dominant idea that can be recognised across pages;
- two or three supporting behaviours, such as a crop rule, typographic contrast, or repeated framing device;
- deliberate exclusions that protect the concept from visual drift;
- enough flexibility to serve different content without making every page identical.

The idea should survive removal of the hero image. If identity disappears when one asset is removed, the design is relying on decoration rather than a visual system.

### 5.2 Composition: arrange visual weight, not just boxes

Composition controls what the eye notices, in what order, and with what sense of energy. [Figma's summary of graphic-design principles](https://www.figma.com/resource-library/graphic-design-principles/) identifies alignment, contrast, balance, hierarchy, white space, proportion, repetition, rhythm, movement, emphasis, proximity, and unity. These principles are useful when treated as adjustable relationships rather than a checklist.

#### Focal point

Every viewport should have a plausible first read. This does not mean everything important must sit above the fold; it means the visible composition has a dominant entry point. A strong focal point may be a headline, face, artefact, product state, question, or action. It is created through relative scale, contrast, isolation, position, or directional cues.

If a logo, navigation bar, giant headline, saturated button, autoplaying image, announcement banner, chat bubble, and floating badge all demand attention at once, the page has no hierarchy. Reduce the number of high-contrast events.

#### Balance

Balance is distribution of visual weight, not necessarily symmetry. Symmetry can feel formal, calm, ceremonial, or static. Asymmetry can feel editorial, active, spacious, or surprising. A large dense block can be balanced by a smaller high-contrast image; a heavy left column by open space and a precise accent on the right.

The test is not whether both halves contain equal objects. It is whether the composition feels intentionally held rather than accidentally lopsided.

#### Proportion and scale

Scale establishes hierarchy and emotion. Large type can be direct, public, intimate, or theatrical depending on face and context. Small details can create precision and reward attention. Strong compositions use meaningful scale jumps: a decisive headline against quiet metadata is usually clearer than six nearby sizes.

Proportion should follow the content. A portrait, map, process diagram, article introduction, and booking form deserve different spatial relationships. Repeating a 50/50 split for all of them mistakes consistency for composition.

#### Contrast

Contrast is broader than light versus dark. It can come from:

- large and small;
- dense and open;
- serif and sans;
- image and text;
- soft and sharp;
- still and moving;
- aligned and offset;
- saturated and neutral;
- continuous and interrupted.

One strong contrast is more expressive than many weak differences. If every section introduces a new colour, shape, font treatment, and animation, contrast becomes noise.

#### Unity and variation

Repetition creates coherence; variation creates emphasis and pace. Reuse alignments, spacing relationships, type roles, image treatments, edge logic, and interaction behaviour. Vary them when the meaning changes. A good system lets visitors feel that the pages belong together without predicting every section before it appears.

### 5.3 Grid, alignment, and the geometry beneath the page

A grid is a set of shared spatial decisions: container edges, columns, gutters, text measures, baselines, and recurring alignments. It does not require visible boxes or a rigid twelve-column template. Its value is relational: separate elements feel connected because they begin, end, or centre on shared lines.

[IBM's layout guidance](https://www.ibm.com/design/language/layout/overview/) distinguishes essential, dynamic, and engineered composition. Its dynamic examples use asymmetry and positive/negative space, while its engineered examples align elements to an underlying grid and repeat measurements and ratios. The apparent tension is productive: strong work can be expressive and systematic at the same time.

A practical web grid should define:

- the maximum content field on wide screens;
- outer margins that expand without stranding the content;
- a small number of columns and gutters;
- readable spans for prose, labels, media, and forms;
- persistent alignment anchors shared across sections;
- rules for full-bleed media and intentional grid breaks.

Good alignment often looks simple because decisions recur. Headings align with the text they introduce. Captions align with their image or a known secondary rail. Controls align with the fields they affect. A pull quote may break the main measure, but it returns to a recognisable anchor.

Avoid centring by habit. Centred text can suit short ceremonial statements, calls to pause, or symmetrical compositions. It becomes tiring for long copy and weakens common edges. Left alignment generally provides a stronger reading path for left-to-right languages; other scripts and directions require their own logic.

Breaking the grid works when it communicates importance, transition, or energy. It fails when offsets are sprinkled randomly to simulate creativity. Establish the rule before breaking it; make the exception visually consequential.

### 5.4 Space, density, and page rhythm

White space is active structure. It groups related elements, separates unrelated ones, gives emphasis through isolation, controls reading pace, and reveals the underlying composition. It is not a synonym for luxury and does not always mean very large gaps.

Use proximity semantically:

- labels sit closer to their field than to the preceding field;
- a heading sits closer to the content it introduces than to the section above;
- a caption belongs visibly to its image;
- supporting evidence sits near the claim it supports;
- actions sit near the decision or object they affect.

Density should follow audience and task. A decision dashboard can be compact and still be legible. A reflective narrative can use more breathing room. Excessive emptiness can force unnecessary scrolling, detach related information, and make a modest amount of content feel staged. Excessive density erases grouping and increases search effort.

Think of a page as a sequence of spatial beats:

1. **Orientation:** establish subject and direction.
2. **Expansion:** provide substance, evidence, or narrative.
3. **Change of pace:** alter scale, background, media, or column structure for a real shift in meaning.
4. **Resolution:** bring the visitor to a decision, next step, or clear ending.

Good long pages do not alternate identical “text left, image right” sections. They create rhythm through changes in measure, density, scale, and media while retaining shared anchors. A useful audit is to blur or zoom far out: the page silhouette should reveal deliberate peaks, quieter intervals, and transitions—not an endless stack of equal bands.

Vertical rhythm benefits from a coherent spacing family, but optical correction still matters. A mathematically exact gap can look wrong beside capitals, images with internal whitespace, or unusually tall type. Systems provide the baseline; judgement finishes the composition.

### 5.5 Layout archetypes should follow the kind of content

Layout quality improves when the page shape is selected for its information rather than inherited from a category template.

| Page shape | Best suited to | What makes it work | Common misuse |
| --- | --- | --- | --- |
| Editorial narrative | Articles, ideas, case studies, complex services | Strong headline/deck, readable measure, image-caption relationships, section rhythm, optional side notes | Treating every marketing page like a magazine while hiding practical facts |
| Fact-first service page | High-intent or anxious visitors | Plain title, compact practical summary, eligibility/cost/process early, action close to the facts | Opening with a vague emotional manifesto before answering basic questions |
| Split proposition | A claim with meaningful visual proof | One side states the proposition; the other demonstrates it with a real product, person, place, or artefact | Filling half the hero with decorative abstraction that adds no information |
| Index or directory | Portfolios, libraries, programmes, complex navigation | Browsing is the main interaction; categories, filters, and previews carry the visual identity | Hiding a simple site map behind an over-engineered interactive scene |
| Immersive visual opening | Art, culture, entertainment, place, or highly visual products | Media is genuinely the subject; orientation and controls remain clear; loading is disciplined | Using cinematic spectacle for an ordinary task and delaying useful content |
| Utility-first | Search, booking, calculation, application, support | The tool appears early; instructions and states are calm; surrounding content supports completion | Wrapping a primary task in many promotional sections before access |
| Comparative layout | Plans, options, before/after, evidence | Shared attributes align; differences are visible; recommendation logic is candid | Putting unrelated content in equal cards merely for visual tidiness |

Within these page shapes, choose section forms for the material: a ruled list for scannable distinctions, a timeline for sequence, an annotated image for spatial explanation, a table for exact comparison, a quotation for a human voice, or a full-bleed visual for a genuine change of register. Containers should express a relationship, not provide decoration for every paragraph.

### 5.6 Typography: voice, hierarchy, and reading texture

Typography often carries more of a website's identity than colour or illustration because it appears everywhere. [Google Design's guide to choosing web fonts](https://design.google/library/choosing-web-fonts-beginners-guide) recommends choosing from the project's actual needs: duration, amount of text, language and character support, available styles and weights, and the intended voice. It also recommends testing real text rather than judging isolated specimens.

Choose a type system by role:

- **Display voice:** the most expressive role, used sparingly for major titles or campaign moments.
- **Reading voice:** comfortable across paragraphs, lists, forms, and diverse content.
- **Utility voice:** highly legible at small sizes for labels, metadata, navigation, and states.
- **Special voice, if needed:** code, data, quotation, or a culturally specific typographic mode.

These roles can come from one versatile family. A single family with width, weight, optical size, or serif/sans companions may feel richer and more coherent than an arbitrary “font pairing.” Two families should have a reason to coexist: contrast of voice, editorial structure, or functional differentiation.

#### Build hierarchy with more than size

Use size, weight, width, case, style, colour, spacing, and position. A label may be small but prominent through uppercase rhythm and isolation; a large heading may remain gentle through a light weight and low colour contrast. Avoid using bold for every important phrase, which flattens emphasis.

A useful hierarchy has clearly separated levels. Body text, supporting text, section heading, and page title should not look like adjacent steps in a software-generated scale. Test the page in greyscale and at a glance: the structural levels should remain apparent.

#### Shape the reading texture

[web.dev's typography guidance](https://web.dev/learn/design/typography/) cites roughly 45–75 characters as a satisfactory single-column measure, with about 66 as a conventional centre point. This is a starting range, not a universal law: typeface width, language, size, and reading context matter. Long measures generally need tighter control; short measures may tolerate more leading.

For continuous prose:

- set width in character-relative units where practical;
- use unitless line height so it scales with text;
- give paragraphs enough separation to scan without breaking continuity;
- prevent isolated headings, widows, and awkward wraps where they materially affect polish;
- avoid justified web text unless hyphenation and language support are exceptionally well handled;
- test zoom, user font-size changes, and real translations.

Display typography needs line-by-line art direction. Control measure so the break supports meaning and silhouette. Avoid leaving one weak short word on a line merely because a responsive formula allowed it. At the same time, do not encode brittle manual breaks that collapse on smaller screens or in translated content.

#### Make typographic personality specific

“Serif equals premium” and “geometric sans equals modern” are category shortcuts, not art direction. Examine the actual forms: open or closed apertures, stroke contrast, x-height, width, terminals, rhythm, numeral design, italics, and punctuation. A typeface's personality comes from these details and from how it is set.

Web-font choice also has a performance cost. Subset carefully, load only required styles, use modern formats, define sensible fallbacks, and reduce layout shift. A distinctive face that arrives late and rearranges the page is not a resolved design.

### 5.7 Colour, light, surface, and material

Colour should have jobs. Assign roles before selecting many shades:

- base canvas and alternative canvas;
- primary and secondary text;
- interactive action and visited/hover/focus states;
- accent or signature colour;
- borders and quiet separators;
- success, warning, error, and informational states;
- data-series colours if applicable.

The same role should behave consistently. If blue means links in one section, decoration in another, and selected state elsewhere, visitors must repeatedly relearn it. Colour should reinforce a cue, not carry meaning alone.

A strong palette is often about **proportion** more than count. One colour may occupy most of the canvas, a supporting range may create depth, and a small accent may direct action. Saturating every section makes nothing special. Conversely, reducing everything to pale neutrals can make a sensitive or understated site feel washed out, timid, and hard to read.

Build lightness contrast first, then hue. Check the design in greyscale: content hierarchy, controls, and boundaries should remain intelligible. Then use hue to add character, grouping, or emotional temperature. Accessibility contrast is a floor; excellent colour also considers fatigue, simultaneous contrast, dark-mode behaviour, imagery, colour-vision differences, and state differentiation.

Surface treatments imply a material logic. Flat planes, paper-like layers, glass, soft fabric, glossy plastic, ink, technical grids, or luminous screens each establish expectations about edge, shadow, texture, and movement. Use one coherent material world. A frosted panel, torn-paper collage, chrome orb, hand-drawn underline, and terminal grid rarely belong together unless the collision is the concept.

Shadows and borders should explain separation or elevation. Large diffuse shadows can make every panel feel detached and inflated. Fine rules can organise editorial content without turning it into cards. Radius is also character: sharp, slightly softened, circular, and highly rounded geometry feel different. Apply it according to the chosen material and object type, not as one global “friendly” value.

Texture works when it is perceptible enough to influence the material feeling but quiet enough not to impair text, image detail, compression, or performance. Synthetic grain pasted over every surface does not create authenticity by itself.

### 5.8 Imagery and illustration should carry information or atmosphere deliberately

Images can do at least five different jobs:

1. **Evidence:** show the real person, place, product, process, result, or document.
2. **Explanation:** diagram a relationship, sequence, system, or idea.
3. **Identification:** help visitors recognise a category, destination, or individual.
4. **Narrative:** show change, context, or a moment with emotional consequence.
5. **Atmosphere:** establish a world or feeling that words cannot efficiently create.

The role should be explicit. [Nielsen Norman Group's eye-tracking research on web photos](https://www.nngroup.com/articles/photos-as-web-content/) found that people attend to relevant, information-carrying images and often ignore generic feel-good filler. Atmosphere is still legitimate, especially in cultural, hospitality, editorial, and brand experiences, but it should be art-directed rather than mistaken for evidence.

For photography, define a repeatable direction:

- subject distance and point of view;
- natural or constructed light;
- candid, observed, posed, or still-life behaviour;
- colour temperature and contrast;
- crop logic and aspect-ratio family;
- whether people look at camera, at each other, or at the task;
- how imperfection, environment, and context are handled.

Real imagery is not automatically good. An unconsidered office snapshot may be authentic but visually unhelpful. Strong documentary-style photography is selected and composed; it simply preserves believable detail rather than replacing it with generic aspiration.

Illustration needs its own grammar: line weight, geometry, perspective, colour range, texture, abstraction level, character construction, and relationship to type. [IBM's illustration guidance](https://www.ibm.com/design/language/illustration/tips-and-techniques/) treats palette, aspect ratio, rhythm, and composition as coordinated decisions. Mixing unrelated stock illustration families undermines authorship even when each image is attractive.

Crop with intent. A close crop can create intimacy or detail; a wide crop can establish context; off-centre subjects can create direction toward adjacent text. Do not position an image only to fill an empty half of a layout. Respect focal points at responsive sizes and use art-directed sources when one crop cannot serve all viewports.

### 5.9 Motion and interaction character

Motion should explain change, preserve spatial continuity, direct attention at the right moment, or provide a small amount of character. Material Design's principle that [motion provides meaning](https://m1.material.io/material-design/introduction.html) is useful: transitions should focus attention, maintain continuity, and give clear feedback.

[Nielsen Norman Group's animation guidance](https://www.nngroup.com/articles/animation-usability/) recommends defining an animation's goal, frequency, trigger, and mechanics. Peripheral movement strongly attracts attention; repeated or indirectly triggered animation can become a tax on reading. This leads to a practical hierarchy:

- **State motion:** hover, focus, selection, validation, expansion, progress. Usually short and clear.
- **Spatial motion:** show where an object came from, went, expanded, or collapsed. Preserve cause and effect.
- **Narrative motion:** guide a sequence or reveal a relationship that is difficult to explain statically.
- **Atmospheric motion:** provide ambient character. Use sparingly and keep it subordinate to content.

Match motion character to art direction. A precise technical interface may use crisp, short transitions. A playful experience may use spring and overshoot. A calm service may rely mostly on opacity and small state changes. Do not apply the same fade-and-rise reveal to every section; repetition makes the mechanism more noticeable than the content.

Directly triggered feedback should feel immediate. Longer choreography should be rare, interruptible, and absent from repetitive tasks. Animate transform and opacity where possible to protect performance, and test on lower-powered devices.

Respect `prefers-reduced-motion`, but interpret “reduced” thoughtfully. [web.dev's reduced-motion guidance](https://web.dev/articles/prefers-reduced-motion) highlights that parallax, zoom, and large spatial movement can cause discomfort. Preserve necessary state feedback with less distance, no zoom, restrained opacity, or instant transitions rather than indiscriminately removing all evidence of change.

### 5.10 Responsive design is recomposition, not shrinking

A strong responsive design preserves priority and relationships while changing form. The desktop grid may become one column, but the deeper questions are:

- Which item must be encountered first?
- Which relationships must remain adjacent?
- Which media needs a different crop or source?
- Which comparison requires horizontal space or an alternative representation?
- Which navigation and actions need persistent access?
- Which decorative idea becomes too costly or crowded?

Design breakpoints around **content pressure**: the moment a heading wraps badly, controls crowd, a card becomes too narrow, or a relationship stops reading. Device labels are convenient shorthand, not the reason for the change.

Mobile does not always mean less content. It may mean a more linear sequence, earlier practical information, progressive disclosure for secondary detail, larger touch targets, and fewer simultaneous visual events. Desktop should not become an enlarged phone column floating in empty space; use the available field to improve comparison, context, image-text relationships, or navigation.

Test intermediate widths, not only a phone and a large desktop. Many weak layouts fail on tablets, narrow laptops, split-screen windows, landscape phones, zoomed desktops, or when text expands. Responsive typography should use sensible minimums and maximums rather than scale without bound.

### 5.11 Recognisable visual directions—and what makes each one good

These are not templates. They show how different aesthetics can succeed when all formal choices support the same character.

| Direction | Positive visual ingredients | The quality bar | Typical collapse |
| --- | --- | --- | --- |
| Calm and credible | Stable grid, readable humanist type, muted but contrast-rich palette, real people/places, measured space, minimal motion | Feels assured and specific; practical facts remain easy to find | Pale “wellness” sameness, low contrast, excessive empty space, vague reassurance |
| Warm and human | Tactile colour, observed photography, natural crops, approachable type, modest irregularity, conversational details | Humanity comes from actual people, language, and material context | Fake grain, doodles, blobs, and staged stock smiles pasted onto a standard layout |
| Editorial and intelligent | Strong headline/deck relationships, expressive display type, captions, rules, asymmetric grid, deliberate image sequence | Reading has pace; typography and images interpret the subject | Random serif italics, collage, and magazine styling without editorial substance |
| Refined and luxurious | Few elements, exceptional image and type quality, controlled scale, disciplined palette, quiet transitions | Restraint exposes craft; every detail withstands attention | Tiny grey text, inaccessible contrast, slow reveals, generic beige, empty prestige language |
| Bold and energetic | Large scale jumps, compressed or expressive type, saturated accents, assertive crops, directional composition, quick motion | Energy remains hierarchical and navigable | Every element shouts; novelty overwhelms comprehension and performance |
| Technical and precise | Exposed grid, diagrams, exact labels, crisp rules, controlled monospace, high state clarity | Complexity becomes understandable and trustworthy | Generic dark navy, electric-blue glow, meaningless code texture, dense jargon |
| Playful and imaginative | Characterful type, flexible shapes, surprising transitions, vivid colour, illustrative world-building | Play supports the audience and rewards interaction without blocking it | Juvenile decoration, unpredictable controls, excessive bounce, reduced legibility |
| Raw or deliberately austere | Direct copy, sharp edges, visible structure, limited palette, plain controls, intentional awkwardness | The directness has cultural or conceptual relevance and remains usable | Unfinished work presented as style; arbitrary misalignment and hostile interaction |

The same organisation could plausibly choose more than one direction. The correct choice follows strategy, audience, content, and available assets—not a universal hierarchy of tasteful styles.

### 5.12 A positive visual-quality review

Review the design at four distances.

#### At thumbnail distance: composition

- Is there a focal point?
- Does the page have clear large, medium, and quiet zones?
- Is the balance intentional?
- Does the silhouette have rhythm, or is it a stack of equal modules?
- Can the main action be located without reading every word?

#### At reading distance: hierarchy and texture

- Do headings, summaries, body copy, metadata, evidence, and actions have distinct roles?
- Are line lengths and paragraph rhythms comfortable?
- Does proximity accurately express relationships?
- Are colour and type contrasts concentrated on what matters?
- Is there enough variation to sustain attention without fragmenting the page?

#### At interaction distance: behaviour

- Do controls look and behave like controls?
- Are hover, focus, active, disabled, loading, success, and error states part of the visual language?
- Does motion explain cause and effect?
- Are targets, focus indicators, contrast, zoom, and reduced motion handled with care?
- Does responsive transformation preserve meaning?

#### At detail distance: finish

- Are optical alignments, icon baselines, text wraps, image crops, border weights, and radii resolved?
- Do real content extremes fit the system?
- Are shadows, textures, and transitions coherent with the material idea?
- Does font loading preserve layout?
- Are there accidental one-off values that reveal an unresolved system?

Polish is not the addition of more effects. It is the removal of accidental decisions.

## 6. Secondary note: what the “AI website look” is—and is not

### 6.1 It is a convergence pattern, not proof of authorship

It is usually impossible to prove from appearance alone that AI created a website. Humans use templates, component libraries, trend references, and the same popular fonts. AI can also produce distinctive work under detailed direction.

“AI-looking” is therefore best used as shorthand for **a recognisable cluster of default decisions with weak contextual justification**, not as an accusation about the production method.

### 6.2 Current research on convergence

The 2026 paper [“Interrogating Design Homogenization in Web Vibe Coding”](https://www.microsoft.com/en-us/research/publication/interrogating-design-homogenization-in-web-vibe-coding/) argues that generative systems may reproduce dominant conventions and that the push for frictionless generation can intensify homogenisation. Its proposed mitigation is “productive friction”: interventions that prompt creators to question defaults rather than moving seamlessly from broad prompt to accepted output. This is a recent research framing, not yet a settled quantitative law of all AI-generated websites.

Related experimental work on autonomous text-image loops found convergence across [700 trajectories toward 12 dominant, commercially safe visual motifs](https://www.sciencedirect.com/science/article/pii/S2666389925002995). That experiment concerns image-generation feedback loops rather than full website production, but it provides useful evidence that unguided generative loops can drift toward conventional “visual elevator music.”

Research from UC Berkeley on [prompt-mediated interface design](https://www.ischool.berkeley.edu/programs/mims/projects/2026/aesthetic-taste-and-its-limits-breakdowns-prompt-mediated-design-user) describes recurring breakdowns including vocabulary gaps, execution gaps, convergence traps, tacit limits, authorship disconnects, and reluctance to risk a worse iteration. This helps explain why “make it more premium” often yields a different cliché rather than a more resolved design.

Design-tool makers make a similar, self-interested but useful distinction. Figma writes that [AI produces the standard, conventional approach](https://www.figma.com/blog/what-is-good-design-in-the-age-of-ai/) as a starting line, while the designer brings new ideas. Webflow acknowledges that [over-reliance on generative AI may homogenise outputs](https://webflow.com/blog/ai-future-of-web). Figma's 2026 essay on [cultivating taste](https://www.figma.com/blog/you-never-stop-cultivating-taste/) defines it through accumulated, intentional choices and argues that AI can broaden exploration but cannot stand in for a point of view.

### 6.3 Why convergence happens

The combined research supports six explanations:

1. **Broad prompts activate broad priors.** “Modern,” “clean,” “premium,” and “innovative” do not specify a subject, material, era, composition, or trade-off. The tool resolves ambiguity with common patterns.
2. **Training and reference distributions already contain design sameness.** AI accelerates conventions that templates, design systems, SaaS marketing, and trend galleries had already normalised.
3. **Component libraries make some structures cheap.** A centred hero, three-card row, testimonial carousel, FAQ, pricing grid, and closing CTA are easy to generate and technically safe.
4. **First drafts are deceptively complete.** Generated pages arrive with colour, spacing, copy, responsive CSS, and motion. That completeness can suppress the uncomfortable exploration that exposes better ideas.
5. **Whole-page regeneration destroys good local decisions.** When tools lack precise local editing, designers may accept a mediocre whole rather than risk losing the strongest part.
6. **Speed is mistaken for resolution.** The hard work—content hierarchy, reference selection, image direction, state design, accessibility, and responsive refinement—still exists after the page appears finished.

### 6.4 Homogenisation can enter at every stage

The risk is not limited to the moment a model produces code. The 2026 [web vibe-coding research](https://arxiv.org/html/2603.13036) identifies an end-to-end lifecycle from platform selection and prompting through generation, review, refinement, and deployment. Each stage can narrow the work:

| Stage | How sameness enters | Better intervention |
| --- | --- | --- |
| Brief | Generic goals such as “clean, modern, premium” | Define audience state, content, tension, visual thesis, and meaningful exclusions |
| References | Only direct competitors and current web galleries | Combine category research with books, places, objects, photography, cultural material, and historical design |
| First generation | The model fills every unstated decision with a common prior | Ask it to expose assumptions and generate structurally opposed directions |
| Selection | The most polished or complete draft wins | Judge unbranded concepts against purpose, hierarchy, distinctiveness, accessibility, and asset realism |
| Refinement | Broad prompts replace one cliché with another | Edit locally; name the exact relationship to change and preserve resolved decisions |
| Production | A convenient component library dictates page shape | Adapt components to content; add page-level composition and art direction |
| Review | “Looks good” becomes the only criterion | Use multi-axis critique and test with people outside the project |
| Scaling | One generated page is copied into a whole site | Define a flexible grammar and require content-specific variation |

The paper's “productive friction” proposal is valuable because it treats pauses, questions, alternatives, provenance, and review as quality controls. Friction should be placed where judgement matters; users should not experience friction in the finished interface merely because the design process needed more thought.

### 6.5 Evaluate dimensions separately

One overall aesthetic verdict conceals the reason a design works or fails. The 2026 [TASTE designer-annotated dataset](https://arxiv.org/abs/2605.20731) evaluates generated graphic design across multiple criteria, including typography, layout, and colour harmony, and reports that general-purpose automated judges did not reach majority agreement with the professional-designer panel. Although the study concerns generated graphics rather than complete websites, it reinforces two practical lessons:

1. critique hierarchy, layout, typography, colour, imagery, brief fidelity, interaction, accessibility, and distinctiveness separately;
2. do not outsource final aesthetic judgement to an automated “design score.”

AI-generated polish is especially easy to overrate because it removes obvious incompleteness. Reviewers should ask what is *resolved*, not what is merely *present*. A page may include a nav, hero, cards, testimonials, FAQ, footer, gradient, and animation while still lacking a coherent composition or a reason for any of those choices.

### 6.6 Avoid turning “anti-AI” into another look

A negative prompt full of banned ingredients can improve a draft, but it is not art direction. If every team rejects gradients, pills, bento grids, rounded cards, and Inter, the replacement set will become just as recognisable. The rapid movement from neon SaaS styling toward cream backgrounds, editorial serifs, collage, warm red-orange accents, and knowing imperfection shows how quickly yesterday's alternative becomes today's default.

Use trope awareness late, as a diagnostic. Use subject, audience, content, strategy, art direction, and visual craft early, as generators. The aim is not to make a site that conceals AI involvement; it is to make a site whose decisions are sufficiently specific, coherent, and useful that the production tool is not the most interesting fact about it.

## 7. A field guide to common AI-design tropes

These are observation prompts, not blanket prohibitions. The diagnostic question is not “does the page use this?” but “does the use follow from the content and identity, or from a default recipe?”

| Trope cluster | Typical manifestation | Why it feels generic | When it can still work |
| --- | --- | --- | --- |
| The universal SaaS hero | Centred pill eyebrow, enormous claim, short vague paragraph, two CTAs, floating product mock-up | It imposes the same sales hierarchy on unrelated organisations and often says little concrete | A focused digital product with a genuinely concise proposition and useful product view |
| Purple-blue aurora | White or near-black field, blurred neon gradient, glowing primary button | It has become a low-cost signifier for technology, AI, and innovation | When colour is owned by the brand and the light treatment supports a real visual concept |
| Beige editorial default | Cream background, rusty orange or primary-colour accents, oversized italic serif emphasis, tasteful collage | By 2026 it is itself a repeated generative cliché; *The New Yorker* documented this emerging cluster in [current AI design](https://www.newyorker.com/culture/infinite-scroll/the-ai-design-aesthetic-thats-taking-over-the-internet) | When tied to an authentic editorial, historical, or material reference and executed beyond surface styling |
| Bento everything | A grid of rounded cards with unequal spans, each holding an icon, metric, or mini-illustration | It treats every idea as a modular feature and often substitutes packaging for hierarchy | Dense products, portfolios, or dashboards where the modules have real independent value |
| Card soup | Every paragraph, quote, person, statistic, process step, and link receives a bordered container | Boundaries no longer communicate grouping or importance | Small sets of comparable objects or genuinely interactive destinations |
| Rounded translucency | Large radii, glass panels, backdrop blur, faint borders, deep soft shadow | It applies the same “premium” material to every subject and reduces contrast | Interfaces whose spatial layering is meaningful and whose contrast is thoroughly tested |
| Default type stack | Inter, Geist, Space Grotesk, or a fashionable editorial serif used without adjustment or rationale | Typography signals the tool ecosystem rather than the organisation | Any typeface can work when its metrics, hierarchy, language support, loading, and voice are deliberately handled |
| Lucide icon confetti | Each heading begins with a thin-line icon inside a tinted rounded square | Icons become decoration, repeat across sites, and can flatten nuanced ideas into generic symbols | Controls, wayfinding, or repeated categories where the symbol genuinely improves recognition |
| Ambient decoration | Floating orbs, blobs, dot grids, mesh gradients, noise overlays, sparkles, abstract 3D chrome | Atmosphere is added without a relationship to content | Art-directed environments where material, motion, and subject share a clear concept |
| Scripted reveal abundance | Every section fades and rises into view with the same delay | It adds latency to reading, makes the generator visible, and offers no information | One or two choreographed transitions that clarify sequence or establish tone, with reduced-motion support |
| Logo cloud/testimonial ticker | Monochrome logos followed by endlessly moving praise cards | It is a standard conversion block often lacking context or evidence | Verifiable customers or press relationships presented accessibly and at the decision point where they matter |
| Generic AI imagery | Impossibly polished people, soft-focus hands, symbolic brains, glowing networks, uncanny text or anatomy | The image communicates a category cliché and may damage trust | Clearly disclosed speculative, artistic, or concept imagery with human selection and correction |
| Synthetic copy rhythm | “Unlock,” “elevate,” “reimagine,” “seamless,” “powerful,” “future-ready”; repeated “not X, but Y”; claims without specifics | The language could describe any product and often mirrors the visual template | Rarely; concrete nouns, evidence, boundaries, and real examples are stronger |
| Metric theatre | Large numbers, animated counters, and percentages without definitions or sources | The appearance of evidence replaces evidence | Auditable metrics with scope, date, method, and relevance |
| Perfect symmetry | Every section is centred or alternates predictable left/right split blocks | The page becomes a sequence of interchangeable modules rather than a composition shaped by content | Subjects where ceremonial balance, comparison, or calm is the intended expression |

### The strongest AI tell: transferability

A useful test is to replace the logo, accent colour, and nouns with those of a different organisation. If the page still feels fully plausible, the design probably encodes a category template rather than a specific identity.

Other questions:

- Can each major visual decision be explained without using “modern,” “clean,” “premium,” or “engaging”?
- Does the layout change when the actual content changes, or is content being cut to fit modules?
- Are the images evidence, explanation, or atmosphere—and is that role clear?
- Is there a recurring idea more specific than rounded corners and a colour token?
- Are imperfections consequences of real material and process, or decorative filters applied to simulate humanity?
- Does the design contain any informed decision a generic model could not infer from the industry label alone?

## 8. A practical anti-generic design process

### Step 1: Write a decision brief before asking for visuals

Include:

- audience and context;
- page job and desired next step;
- content that must be findable;
- tone expressed as tensions, such as “precise but not clinical” or “playful without becoming juvenile”;
- reasons to trust the organisation;
- real constraints: content volume, imagery, accessibility, performance, maintenance, and technology;
- competitor conventions to preserve for usability;
- competitor conventions to challenge for differentiation.

### Step 2: Audit the category before choosing a direction

Capture 10-20 direct competitors and record repeated choices:

- hero structure;
- palette;
- type category;
- image style;
- section sequence;
- card treatment;
- action labels;
- motion;
- claims and proof.

The point is not to avoid every common pattern. It is to know which choices are conventions, which are useful signals, and which would make the result invisible in the category.

### Step 3: Build a broader reference field

Use references from outside website galleries:

- editorial design and book covers;
- architecture and interiors;
- exhibition catalogues and wayfinding;
- packaging and material samples;
- photography, film titles, maps, diagrams, and local signage;
- historical documents relevant to the subject;
- the organisation's real tools, spaces, products, or archives.

For every reference, label the transferable principle: crop, pace, contrast, density, texture, hierarchy, framing, sequence, or tone. Do not ask AI to imitate a finished site wholesale.

### Step 4: Generate genuinely different concepts

Produce at least three directions that differ structurally, not just by palette:

- different content order;
- different dominant medium;
- different typographic logic;
- different density and rhythm;
- different signature interaction;
- different approach to proof and trust.

Reject a “direction” that is the same wireframe with a new font and background.

### Step 5: Choose a design thesis

A thesis is a sentence that explains how the site should behave and feel because of what it is.

Examples of form, not prescriptions:

- “The site should read like a field guide: observable evidence first, interpretation second, action always nearby.”
- “The experience should feel like opening a well-used workshop drawer: ordered, tactile, and specific rather than glossy.”
- “The product is about speed under pressure, so the interface should prioritise immediate orientation, decisive typography, and almost no ambient motion.”

Every major decision should either reinforce the thesis or meet a usability requirement.

### Step 6: Establish a small design grammar

Define:

- type roles and measure;
- spacing rhythm;
- colour roles;
- border, radius, and shadow logic;
- image crop and treatment;
- icon or illustration rules;
- motion duration, easing, and purpose;
- component states;
- conditions for cards and panels;
- one or two signature devices.

This gives AI and human contributors constraints without forcing every page into identical modules.

### Step 7: Design with final or representative content early

Generic placeholder content produces generic layouts. Use real titles, actual paragraph lengths, real prices, awkward names, genuine images, error messages, empty states, and legal text. Let content pressure reveal where the system needs to bend.

### Step 8: Use AI for divergence and labour, not taste by default

Good uses include:

- generating structural alternatives against a detailed brief;
- exploring type-scale or spacing variants;
- creating prototypes for critique;
- identifying inconsistencies;
- producing responsive and interaction states after the design logic is defined;
- testing long content and edge cases;
- checking code against accessibility and performance requirements.

Keep human control over:

- the brief;
- reference selection;
- the design thesis;
- which trade-offs matter;
- what feels appropriate for the audience;
- image truthfulness and rights;
- final editing, testing, and acceptance.

### Step 9: Edit locally and preserve decisions

Ask for a specific change to hierarchy, crop, spacing, state, or component rather than repeated “make it better” whole-page generations. Record accepted decisions so a later generation cannot silently replace them.

### Step 10: Insert productive friction

At concept and pre-launch stages, require answers to:

- What visitor evidence supports this decision?
- What is the strongest alternative we rejected, and why?
- Which part is conventional for usability?
- Which part is distinctive, and why is it relevant?
- What breaks under zoom, slow loading, keyboard use, or long content?
- Which decorative element can be removed with no loss of meaning?
- Which component exists only because it was easy to generate?
- What proof is present where trust is requested?

This intentional pause operationalises the “productive friction” proposed in the web-vibe-coding research.

## 9. Prompt/specification template for AI-assisted exploration

This template is deliberately about decisions rather than a universal anti-trope prompt.

```text
PROJECT
[What the organisation/product is, who it serves, and the real-world context.]

PAGE JOB
[What a visitor must understand, decide, or complete.]

CONTENT PRIORITY
1. [Most important]
2. [Second]
3. [Third]

DESIGN THESIS
[One specific sentence connecting subject to visual/interaction behaviour.]

REFERENCE PRINCIPLES
- [Reference A]: borrow its [pace/crop/hierarchy/material], not its full style.
- [Reference B]: borrow its [typographic contrast/sequence/etc.].

FAMILIARITY TO PRESERVE
[Expected navigation, labels, control behaviour, and task conventions.]

DISTINCTIVE MOVE
[One memorable, content-relevant composition or interaction.]

SYSTEM
- Typography roles: [...] 
- Colour roles: [...]
- Spacing/density: [...]
- Image treatment: [...]
- Surface/border/radius logic: [...]
- Motion purpose and reduced-motion behaviour: [...]

DO NOT DEFAULT TO
[Name the category clichés discovered in the competitor audit.]

ACCESSIBILITY AND PERFORMANCE
[Contrast, keyboard, focus, reflow, targets, motion, image, and performance constraints.]

REQUIRED STATES
[Mobile, long content, validation, loading, empty, success, error, no-image.]

OUTPUT
Produce three structurally different directions. For each, explain how the composition
serves the page job, which convention it preserves, what makes it distinctive, and the
main accessibility or performance risk. Do not write production code until one direction
has been selected and challenged.
```

No prompt can replace critique. Its purpose is to create a better starting distribution and make assumptions visible.

## 10. Review scorecard

Use this after the design has real content. The score is a discussion aid; accessibility, deception, or task failure should be treated as gates rather than averaged away.

| Area | Weight | Review questions |
| --- | ---: | --- |
| Purpose and task success | 20 | Can a first-time visitor identify the page's purpose? Can representative users complete the main task? Are next steps and consequences clear? |
| Content and information architecture | 15 | Do headings, links, order, and grouping match visitor questions? Is important information present at the decision point? |
| Accessibility | 15 | Does the experience meet WCAG 2.2 AA in the tested scope? Has it been manually tested with keyboard, zoom, reflow, and representative assistive technology? |
| Interaction and feedback | 10 | Are controls recognisable? Are status, errors, success, undo, and escape paths clear? |
| Performance and resilience | 10 | Do field or realistic lab results meet performance targets? Does the page remain useful on slow networks and without decorative assets? |
| Trust and ethics | 10 | Are identity, claims, costs, data use, and limitations clear? Are choices balanced and non-manipulative? |
| Visual hierarchy and reading | 10 | Is there a clear entry point and reading order? Do typography, spacing, colour, and surfaces express meaning? |
| Distinctiveness and relevance | 5 | Could the design be transferred unchanged to a competitor? Can the distinctive decisions be connected to subject and audience? |
| Responsive quality | 3 | Does the design recompose rather than merely shrink? Are long content and touch use handled? |
| System integrity | 2 | Are patterns consistent enough to learn and flexible enough for content? Can the design be maintained? |

### Automatic review flags

Regardless of total score, stop and revise if:

- a core task cannot be completed by keyboard;
- essential text or controls fail contrast;
- focus is invisible or obscured;
- the main content cannot reflow under required conditions;
- a form loses data or gives unusable error feedback;
- a consent, price, cancellation, or privacy choice is misleading;
- important claims have no identifiable basis;
- the layout shifts during an attempted interaction;
- the primary page content is delayed by non-essential visual effects;
- the design's identity reduces to a palette, font trend, and radius setting.

## 11. Efficient testing programme

### Before visual design

- Interview or observe representative users where possible.
- Analyse search terms, support enquiries, analytics, and competitor journeys.
- Test a draft information architecture or content outline.
- Define task and trust questions.

### During concept selection

- Run a five-second comprehension check: what is this, for whom, and what can be done here?
- Compare at least three structural directions.
- Ask participants to predict where links lead.
- Test the concept with real content at narrow and wide widths.
- Review whether distinctiveness remains when colour is removed.

### During implementation

- Use semantic HTML before ARIA-based recreation.
- Test keyboard order, focus, menus, dialogs, tabs, forms, and errors.
- Test 200% text resize, 400% zoom, and 320 CSS-pixel reflow.
- Test reduced motion and high-contrast or forced-colour modes where relevant.
- Run automated accessibility checks, then manual checks; neither replaces user testing.
- Measure performance on a throttled mobile profile and with real field data after launch.

### Before and after launch

- Test primary tasks with people unfamiliar with the project.
- Audit claims, dates, costs, contact details, and privacy language.
- Verify error pages, missing assets, slow APIs, form failure, and confirmation.
- Review analytics for task success and abandonment, not clicks alone.
- Record user-reported friction and revise.
- Re-run the trope audit after several new pages have been added; design systems can drift toward sameness even when the first page was distinctive.

The [W3C Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/) are a useful preliminary review, while GOV.UK's principles emphasise ongoing evidence and iteration. A preliminary or automated check is not a complete accessibility evaluation.

## 12. Key conclusions

1. **Good design is resolved intent.** Every major decision should serve understanding, action, trust, accessibility, performance, or identity. Beauty is not separate from function; it is the felt coherence of those decisions.
2. **Art direction gives the experience a point of view.** A clear governing idea should shape composition, typography, colour, imagery, material, and motion. One deeply developed idea is usually stronger than many fashionable effects.
3. **Composition is organised visual weight.** Strong pages establish a focal point, clear levels of emphasis, deliberate balance, controlled contrast, meaningful negative space, and a rhythm of continuity and change.
4. **Layout should be shaped by content.** A narrative, directory, comparison, booking task, visual story, and practical service need different page forms. Repeated templates should not force unlike material into identical modules.
5. **Typography is both voice and infrastructure.** Type choice, measure, line height, hierarchy, line breaks, language support, loading, and responsive behaviour collectively determine whether a site feels authored and reads comfortably.
6. **Colour, surface, and motion need roles.** Colour should organise hierarchy and state; surface should imply one coherent material world; motion should explain change, continuity, or cause and effect. Decorative use is legitimate when it supports the art direction and remains subordinate to the experience.
7. **Imagery earns its space.** Photography and illustration should provide evidence, explanation, identification, narrative, or deliberately art-directed atmosphere. A repeatable crop, light, perspective, palette, and subject treatment creates more identity than isolated “hero” images.
8. **Responsive design is recomposition.** Preserve priority and relationships while allowing layout, crop, density, sequence, and interaction to change under content pressure. Do not treat mobile as a shrunken desktop or desktop as an enlarged phone.
9. **Usability and expression are complementary.** Keep ordinary interactions recognisable; put originality into the aspects that can carry meaning without imposing avoidable learning. Accessible, fast, stable execution is part of the aesthetic experience.
10. **A distinctive website should be difficult to relabel.** If changing the logo and nouns turns it into a plausible site for a competitor, the work needs more context-specific structure, content, imagery, or expression.
11. **AI sameness is best treated as a secondary review risk.** A list of banned aesthetics is insufficient; today's anti-AI look becomes tomorrow's default. Real content, real constraints, contrastive concepts, local editing, and multi-axis critique are stronger protections.
12. **Do not accept completeness as quality.** Generated or templated work may look finished while lacking states, evidence, accessibility, performance discipline, and a coherent reason for its appearance. The remedy is the design process itself: research, judgement, authorship, testing, and refinement.

## Annotated source list

### Accessibility, structure, and interaction

- [W3C: What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) — overview of new focus, target-size, help, redundant-entry, and authentication criteria.
- [W3C: Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/) — perceivable, operable, understandable, and robust foundations.
- [W3C: Clear and Understandable Page Structure](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/) — cognitive-accessibility guidance on hierarchy and visual grouping.
- [W3C: Writing for Web Accessibility](https://www.w3.org/WAI/tips/writing/) — titles, headings, links, text alternatives, instructions, and concise content.
- [W3C: Page Structure and Content](https://www.w3.org/WAI/tutorials/page-structure/content/) — semantic sections, paragraphs, lists, figures, and tables.
- [W3C: Form Labels](https://www.w3.org/WAI/tutorials/forms/labels/) and [Form Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) — labelling, instructions, validation, and status feedback.
- [W3C: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), and [Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) — detailed explanations of specific WCAG criteria.
- [W3C: Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/) — preliminary manual accessibility review.

### User-centred design, content, and usability

- [GOV.UK Government Design Principles](https://www.gov.uk/guidance/government-design-principles) — user needs, evidence, simplicity, iteration, inclusion, context, services, and consistency without uniformity.
- [GOV.UK: Learning About Users and Their Needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) — evidence-based user needs and ongoing validation.
- [GOV.UK: Understand Content Design](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/understand-content-design/) — clear, accessible, task-oriented content and maintenance.
- [Nielsen Norman Group: Ten Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) — an established inspection framework for interaction design.
- [Nielsen Norman Group: F-Shaped Pattern of Reading](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) — eye-tracking findings, scanning patterns, and content-formatting recommendations.
- [Nielsen Norman Group: Menu Design Checklist](https://media.nngroup.com/media/articles/attachments/PDF_Menu-Design-Checklist.pdf) — practical menu naming, structure, interaction, and accessibility checks.

### Aesthetics, first impressions, and credibility

- [Tuch et al.: Visual Complexity and Prototypicality in Website First Impressions](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/) — experimental evidence on very rapid aesthetic judgements.
- [Kotkajuuri: The Effect of Novelty and Typicality on Aesthetic Appeal of Websites](https://www.tandfonline.com/doi/full/10.1080/10447318.2025.2576633) — 2025 research revisiting the novelty/typicality balance across website types.
- [Stanford Web Credibility Project](https://credibility.stanford.edu/research.html) and [large credibility study report](https://credibility.stanford.edu/pdf/How_Do_People_Evaluate_a_Web_Site%27s_Credibility_v37.pdf) — historical evidence on design, structure, identity, and category-specific credibility judgements.

### Art direction, composition, and visual systems

- [IBM Design Language: Layout Overview](https://www.ibm.com/design/language/layout/overview/) — hierarchy, scale, proportion, contrast, negative space, asymmetry, grids, repeated ratios, and the relationship between essential, dynamic, and engineered composition.
- [Material Design: Introduction](https://m1.material.io/material-design/introduction.html) — typography, grid, space, scale, colour, imagery, surface, and meaningful motion as a coordinated visual language.
- [Figma: Core Graphic Design Principles](https://www.figma.com/resource-library/graphic-design-principles/) — a practical overview of alignment, contrast, balance, hierarchy, white space, proportion, repetition, rhythm, movement, emphasis, proximity, and unity.
- [Smashing Magazine: Art Directing for the Web with CSS Grid](https://www.smashingmagazine.com/2018/04/art-directing-web-css-grid/) — distinguishes art direction and storytelling from routine page styling and demonstrates expressive grid composition.
- [Apple Design Tips](https://developer.apple.com/design/tips/) — concise operational guidance on hierarchy, alignment, spacing, contrast, control placement, target size, and image handling.

### Typography, colour, imagery, and motion

- [Google Design: Choosing Web Fonts](https://design.google/library/choosing-web-fonts-beginners-guide) — selection by project scope, amount of text, expressive role, available styles, language support, and real-content testing.
- [U.S. Web Design System: Typography](https://designsystem.digital.gov/components/typography/) — micro- and macro-typography, measure, line height, alignment, and readable content structure.
- [IBM Design Language: Colour](https://www.ibm.com/design/language/color/) — systematic palette construction and the use of tonal grades and values.
- [Nielsen Norman Group: Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/) — eye-tracking evidence distinguishing relevant, information-carrying imagery from generic filler.
- [IBM Design Language: Illustration Tips and Techniques](https://www.ibm.com/design/language/illustration/tips-and-techniques/) — coordinated palette, aspect ratio, composition, rhythm, and illustrative tone.
- [Nielsen Norman Group: Animation for Attention and Comprehension](https://www.nngroup.com/articles/animation-usability/) — motion goals, frequency, triggers, attention effects, continuity, and interaction timing.
- [web.dev: `prefers-reduced-motion`](https://web.dev/articles/prefers-reduced-motion) — adapting large, zooming, parallax, and decorative movement for people who request reduced motion.

### Responsive design, typography, and performance

- [web.dev: Responsive Web Design Basics](https://web.dev/articles/responsive-web-design-basics) — content and layouts adapting to viewports, capabilities, and interaction modes.
- [web.dev: Typography](https://web.dev/learn/design/typography/) — font choice, size, line length, line spacing, language, and preferences.
- [web.dev: Core Web Vitals Thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds) — current LCP, INP, and CLS thresholds and methodology.
- [web.dev: Web Vitals](https://web.dev/articles/vitals) — field and lab measurement and the limits of each.
- [web.dev: CSS for Web Vitals](https://web.dev/articles/css-web-vitals) — layout, image, font, animation, and loading effects on performance.

### AI design, convergence, and current aesthetics

- [Shin et al.: Interrogating Design Homogenization in Web Vibe Coding](https://arxiv.org/html/2603.13036) — 2026 research mapping homogenisation risk across the vibe-coding lifecycle and proposing productive friction at individual, organisational, and ecosystem levels.
- [Zhu et al.: TASTE](https://arxiv.org/abs/2605.20731) — a 2026 professional-designer-annotated, multi-dimensional preference dataset showing why typography, layout, colour harmony, and other dimensions should not be collapsed into one generic aesthetic score.
- [Autonomous Language-Image Generation Loops Converge to Generic Visual Motifs](https://www.sciencedirect.com/science/article/pii/S2666389925002995) — experimental evidence of convergence in autonomous generative feedback loops.
- [UC Berkeley: Aesthetic Taste and Its Limits](https://www.ischool.berkeley.edu/programs/mims/projects/2026/aesthetic-taste-and-its-limits-breakdowns-prompt-mediated-design-user) — observed breakdowns in prompt-mediated interface design.
- [Figma: What Is Good Design in the Age of AI?](https://www.figma.com/blog/what-is-good-design-in-the-age-of-ai/) — AI as a conventional baseline rather than the source of future-facing design decisions.
- [Figma: You Never Stop Cultivating Taste](https://www.figma.com/blog/you-never-stop-cultivating-taste/) — current industry perspective on care, iteration, and point of view.
- [Webflow: AI and the Future of the Web](https://webflow.com/blog/ai-future-of-web) — industry acknowledgement of homogenisation risk from over-reliance on generative tools.
- [The New Yorker: The A.I.-Design Aesthetic That's Taking Over the Internet](https://www.newyorker.com/culture/infinite-scroll/the-ai-design-aesthetic-thats-taking-over-the-internet) — June 2026 cultural reporting on an emerging warm editorial AI-design cliché. This is commentary, not usability research.
- [Creative Bloq: Everything Looks the Same. Now What?](https://www.creativebloq.com/ai/everything-looks-the-same-now-what) — current design-industry synthesis of pre-AI “blanding” and accelerated generative convergence. This is commentary, not a standard.

### Ethical interface design

- [OECD: Dark Commercial Patterns](https://www.oecd.org/en/publications/dark-commercial-patterns_44f5e846-en.html) — definitions, prevalence, effectiveness, harms, and policy responses.
- [US FTC: 2024 International Dark-Pattern Review](https://www.ftc.gov/news-events/news/press-releases/2024/07/ftc-icpen-gpen-announce-results-review-use-dark-patterns-affecting-subscription-services-privacy) — review data from subscription websites and apps, with explicit caveats about legal findings.
- [European Data Protection Board: Deceptive Design Patterns Guidelines](https://www.edpb.europa.eu/documents/guideline/guidelines-032022-on-deceptive-design-patterns-in-social-media-platform_en) — privacy-focused guidance on recognising and avoiding deceptive interface patterns.

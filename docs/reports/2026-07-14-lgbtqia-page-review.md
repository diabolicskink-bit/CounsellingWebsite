# LGBTQIA+ counselling page review

Date: 14 July 2026  
Route: `/inclusion/lgbtqia`  
Branch reviewed: `work/inclusion-child-pages-launch`

## Executive assessment

The page is a sound technical draft, but it is not yet ready to become an indexable specialist landing page.

Its strongest qualities are clarity, restraint, and basic usability. The route is fully prerendered, its metadata is coherent, the heading outline is sound, the responsive layouts do not overflow, and the design avoids rainbow decoration or generic “safe space” imagery. The page also understands an important visitor need: LGBTQIA+ context may be central to the work, or it may simply need to be understood without taking over the work.

The main weakness is that the page states that the practice is affirming more often than it demonstrates why a visitor should believe that. Compared with the Kink/BDSM and ENM/polyamory pages, the copy is less specific, less practitioner-led, and less clear about service boundaries. The composition has the same problem: it is polished, but it reads like a competent shared-page template rather than an authored page with a distinctive editorial idea.

There is also one confirmed production defect. The breadcrumb has no production CSS, so its three items render as `HomeInclusive practiceLGBTQIA+` without spaces or separators at desktop and mobile sizes.

SEO infrastructure is otherwise strong, but discoverability is intentionally disabled while this remains a draft: the route has `noindex, nofollow`, is excluded from the sitemap, and has no production inbound links from the Home or Inclusion pages. That is the correct current state, not an accidental SEO failure. It does mean that removing `noindex` alone would not be a complete launch.

### Overall verdict

| Area | Assessment | Summary |
|---|---|---|
| Copy | Needs substantial revision | Clear and ethically cautious in places, but generic, repetitive, and too reliant on self-description. |
| Inclusion content | Needs owner validation | The page claims a broad LGBTQIA+ scope without yet evidencing the full scope or clarifying important service boundaries. |
| Design and layout | Good foundation, under-authored | Calm, readable, and responsive, but repetitive and less distinctive than the sibling specialist pages. |
| Technical rendering | Strong | Full prerender, correct hydration, no browser errors, no horizontal overflow, and no automated axe violations in the two reviewed viewports. |
| SEO readiness | Technically prepared, deliberately blocked | Metadata is sound; indexability, sitemap membership, and production internal links must be promoted together after content sign-off. |

## Review scope and method

This was a review only. No page copy, layout, metadata, tracker, or production code was changed.

The assessment used:

- the project `copywriter` skill for page purpose, visitor intent, voice, inclusion language, claims, content structure, and search clarity;
- the project `frontend-design` skill for hierarchy, composition, responsiveness, visual authorship, and avoidance of generic inclusion-page aesthetics;
- the browser-verification skill’s required rendered-page approach, with the repository’s Playwright dependency and installed Chrome used because the skill’s `agent-browser` CLI was not available on the system path;
- current project direction, writing direction, scope, design-system guidance, launch trackers, and SEO checklists;
- the LGBTQIA+ page source and stylesheet, shared production CSS, route metadata, prerendering code, the Inclusion Hub, and the Kink/BDSM and ENM/polyamory sibling pages;
- current primary-source Google Search documentation.

Verification completed on 14 July 2026:

- `npm run build` passed and reported seven prerendered, metadata-validated routes.
- The production preview returned `200` for `/inclusion/lgbtqia`.
- The page was inspected at `1440 × 1000` and `390 × 844`.
- Both viewports had zero horizontal overflow, console errors, page errors, or Vite error overlays.
- Automated axe scans reported no violations in either viewport. This is useful evidence, but it is not a substitute for a full keyboard, screen-reader, zoom, contrast, or reflow review under `LAUNCH-1` and `LAUNCH-2`.

This review did not include search-volume research, a live search-results competitor comparison, user research, clinical supervision, or legal review. Recommendations about expertise, lived experience, training, and service scope must be confirmed by Joel rather than invented during revision.

## The page’s job

The likely visitor is not merely looking for a definition of affirming counselling. They are trying to decide whether Joel is likely to understand enough of their context that contacting him is worth the exposure and effort.

The page therefore needs to answer five practical questions:

1. Does Joel understand relevant LGBTQIA+ experiences without making identity the explanation for everything?
2. What specifically changes in the room because of that understanding?
3. Who and what is this counselling actually for?
4. Are there important limits, conflicts, or services Joel does not provide?
5. What is the least burdensome next step if the fit seems plausible?

The current page answers the first two in principle and the fifth through repeated enquiry links. It is much less complete on evidence, scope, boundaries, and practical fit.

## What already works

### Copy and positioning

- The central idea is appropriate: sexuality or gender may be the issue, or simply part of the context in which another issue is happening.
- The page names relevant pressures such as family rejection, religious conflict, shame, minority stress, visibility, belonging, and poor-fit systems.
- The “Do I need to be out?” FAQ addresses a real pre-contact concern directly and usefully.
- The copy does not pathologise queerness, transness, non-binary identity, or non-standard relationships.
- The page avoids making outcome promises about symptom relief, transformation, or guaranteed therapeutic success.
- The route offers descriptive links to Working with Joel, fees/session details, the Inclusion Hub, and the enquiry path.

### Design and layout

- The page uses the active site typography, paper/sage palette, section rhythm, FAQ pattern, buttons, and responsive grid competently.
- The hero establishes the topic immediately and keeps the primary action visible.
- Desktop sections have clear left-to-right hierarchy; mobile sections stack in a sensible reading order.
- The page does not resort to pride flags, stock portraits, gradients, glass effects, or decorative “inclusion” badges. That restraint suits the project direction: inclusion should feel like ordinary knowledge, not a marketing ornament.
- The FAQ controls and primary actions remain visually clear at the reviewed mobile width.

### SEO and technical delivery

- The title is unique, descriptive, concise, and aligned with the route: `LGBTQIA+ Affirming Counselling | Vive Counselling`.
- The meta description is unique and human-readable, and includes the service, adult audience, national reach, relevant concerns, and Perth base.
- The canonical is correct: `https://vivecounselling.com.au/inclusion/lgbtqia`.
- Open Graph and Twitter metadata are complete and use the accepted shared social image.
- The complete page body and FAQ structured data are present in first-response HTML; discoverability does not depend on client-side rendering.
- The URL is readable and consistent with the Inclusion hierarchy.
- The heading outline is coherent: one `h1`, peer content-section `h2`s, and FAQ questions nested as `h3`s.

## Prioritised findings

Priorities describe launch impact. They do not authorise implementation or replace the project trackers.

| ID | Priority | Area | Finding | Recommended response |
|---|---|---|---|---|
| LGBT-01 | P1 | Layout | The production breadcrumb is unstyled and renders as one run-on string. | Move or recreate the breadcrumb rules in active production CSS, preferably as a shared public breadcrumb pattern, and verify focus, wrapping, separators, and current-page treatment. |
| LGBT-02 | P1 | Copy | The page asserts affirming practice more than it demonstrates subject knowledge or Joel’s own judgement. | Rebuild the copy around specific practices, situations, questions, and boundaries that Joel can truthfully stand behind. |
| LGBT-03 | P1 | Scope and claims | `LGBTQIA+` claims a wider population than the body copy currently evidences, while adult/individual service boundaries remain mostly invisible. | Confirm the intended population and service scope, then either substantiate the breadth or narrow the public wording. |
| LGBT-04 | P1 | Ethical positioning | “Ordinary competence and care,” “clients are welcome,” and not needing to “scan for basic safety” rely on self-certification and edge toward safety/welcome promises. | Replace these assurances with observable practice and accurate, bounded first-person statements. |
| LGBT-05 | P2 | Copy hierarchy | The badge, display title, opening, first eyebrow, first section, and final CTA repeat the same “affirming / explaining / correcting” premise. | Give each section a distinct job and let the hero make one clear promise of relevance without restating it throughout the page. |
| LGBT-06 | P2 | Design | Three consecutive shared two-column sections make the page visually predictable; the page-scoped stylesheet adds only two gap rules. | Add one content-led, page-specific editorial composition without using identity-themed decoration. |
| LGBT-07 | P2 | Content depth | The page is materially less specific than the Kink/BDSM and ENM/polyamory sibling pages. | Add grounded detail about what can go wrong in therapy, what Joel attends to, and how identity can be central, peripheral, uncertain, or intersecting. |
| LGBT-08 | P2 | Visitor fit and SEO | “Adults across Australia” and “Perth-based” exist in metadata but are not clearly supported in the visible page; individual-counselling scope is also unclear. | Add a restrained visible practice-detail line or fit section, consistent with the current rule not to foreground online delivery. |
| LGBT-09 | P2 | Organic launch | The route is `noindex, nofollow`, absent from the sitemap, and has no production inbound links by design. | Promote robots policy, sitemap membership, and production internal links together only after copy and scope sign-off. |
| LGBT-10 | P3 | Links and conversion | The page contains four enquiry links/buttons and two fee/contact links, including three adjacent links in one sentence. | Reduce repetition and give the hero, supporting resources, and final CTA separate decision roles. |
| LGBT-11 | P3 | Search-title alignment | The `h1` says “Queer-affirming counselling” while the visual title and metadata say “LGBTQIA+ affirming counselling.” This is not a broken outline, but it creates two near-duplicate main-title candidates. | Decide whether the distinction is intentional; if not, align the wording while preserving the site-wide semantic hero contract. |

## Copy and inclusion assessment

### 1. The copy needs more evidence and less declaration

The page’s most important lines are claims about the practice:

- “ordinary competence and care”;
- “Practical inclusion, not badge language”;
- “Trans and non-binary clients are welcome”;
- “you do not have to scan for basic safety first.”

These lines describe the conclusion the visitor is meant to reach. They do not provide enough evidence for reaching it. “Welcome” and “safe” language is especially weak because almost any counselling site can say it, and the project direction explicitly prefers demonstrated inclusion over self-certification.

The Kink/BDSM page is stronger here because it names language Joel understands, situations he will still ask about, ways therapy can mishandle kink, and a clear community conflict boundary. The ENM page is stronger because it distinguishes structural neutrality from uncritical validation and names recognisable pressures such as hinge responsibility, disclosure, mono/poly tension, and broken agreements. The LGBTQIA+ page needs an equivalent level of specificity, not equivalent length or an imitation of either layout.

A better evidence base could include owner-confirmed examples such as:

- how names, pronouns, partners, family roles, bodies, sex, faith, transition, and visibility are discussed without default assumptions;
- how Joel distinguishes identity exploration from steering someone toward a preferred conclusion;
- how minority stress or discrimination can be considered without turning identity into pathology;
- how identity can remain background context when anxiety, grief, burnout, loneliness, or another concern is the actual focus;
- what Joel does when he lacks relevant knowledge;
- what services, reports, letters, assessments, age groups, or relationship formats are outside scope.

The revision should include only statements Joel can verify.

### 2. Joel is barely present in his own specialist page

Most of the copy is passive or institutional: “there is no default assumption,” “inclusion shows up,” “can be taken seriously,” and “clients are welcome.” Joel appears only in a link to Working with Joel.

That weakens both trust and accountability. A visitor is choosing a practitioner, not an abstract affirming environment. Selective first-person language would let Joel own concrete practices and limits without manufacturing intimacy. It would also bring the page closer to the stronger, more candid voice already used on the Kink/BDSM page.

### 3. The umbrella label needs a scope decision

The title promises `LGBTQIA+` affirming counselling, but the content primarily discusses gender, sexuality, trans and non-binary clients, relationships, and family strain. It does not meaningfully show whether the `I` and `A`, bisexual/pansexual identities, or other experiences within the umbrella are understood. Nor does it need to mention every identity merely to complete an acronym.

The correct response is not a keyword list. It is an owner decision:

- If the broad umbrella accurately describes Joel’s competence and intended clientele, add a small number of concrete, natural examples that make the breadth credible.
- If some areas are not within current competence or scope, use a narrower public label and state relevant limits honestly.

The same principle applies to trans-related support. A prospective client may reasonably wonder whether the page describes general individual counselling, gender exploration, support around transition and systems, formal assessment, report/letter writing, or some combination. The page should clarify this rather than allowing the broad “affirming counselling” label to imply services that may not exist.

### 4. Important practical fit information is missing from the visible page

Metadata says this is counselling for adults across Australia and that Joel is Perth-based. The body does not clearly say either. It also does not clearly state that the core service is individual counselling.

These are not just metadata details. They help a visitor decide whether the service fits before disclosing anything. A restrained practice-detail line or fit section could carry them without violating the current product decision not to foreground online delivery.

Other facts that may deserve an owner-confirmed answer are:

- whether a partner may ever join a session;
- whether Joel works only with adults;
- whether he provides gender-related letters, assessments, or reports;
- any community-overlap or dual-relationship boundary relevant to this audience;
- what the initial consultation is for and what a first enquiry needs to contain.

### 5. The page repeats one idea instead of advancing the decision

The same premise appears repeatedly:

- “you do not need to explain yourself from scratch” in the opening;
- the same line as the first section eyebrow;
- “Less time correcting the frame” as its heading;
- “not badge language” in a later heading;
- “You do not need to explain everything perfectly” in the final CTA.

The premise is good, but the repetition makes the page feel generated around a slogan. Each section should move the decision forward:

1. establish relevance;
2. demonstrate knowledge;
3. show what can be brought;
4. clarify approach and limits;
5. answer pre-contact questions;
6. make the next step concrete.

### 6. Useful material worth retaining

A rebuild should retain or develop these ideas rather than discard everything:

- identity may be central, peripheral, or unrelated to the presenting issue;
- a client should not become a token or teaching moment;
- family rejection, faith, shame, visibility, and belonging are legitimate counselling contexts;
- uncertainty and not being out do not need to be resolved before enquiry;
- gender and sexuality should not be treated as the whole story.

“Minority stress” may also be useful, but it should be explained in plain language rather than left as an unexplained professional term.

## Design and layout assessment

### 1. Confirmed production defect: breadcrumb styling is dev-only

`LgbtqiaCounselling.tsx` renders a `.breadcrumb` navigation element. The only `.breadcrumb` rules are in `src/styles-dev.css`, which is not included in the production CSS bundle. The built bundle was checked directly and contains no `.breadcrumb` selector.

The resulting rendered text is:

```text
HomeInclusive practiceLGBTQIA+
```

It has no flex layout, spacing, separators, or distinct current-page treatment. This is visible at both reviewed viewport sizes and makes an otherwise polished hero look unfinished.

The repair should use an active public pattern, not import the entire development stylesheet. If breadcrumbs are likely to appear on other child pages, a shared production component and style contract would be more maintainable than another page-only rule. Breadcrumb structured data can be considered later, but visible correctness comes first.

### 2. The page is visually competent but not yet authored

The page-level stylesheet contains only:

- a grid and gap for the hero heading;
- a gap for the hero panel.

Everything else is assembled from shared sections. Reuse is not itself a problem, but the result is three successive versions of the same split layout: heading on the left, content or checklist on the right. The FAQ finally changes scale and rhythm, but by then the core page has already felt repetitive.

The specialist sibling pages provide a useful comparison. The Kink/BDSM page has a language field that visually demonstrates subject familiarity. The ENM page uses several content-specific arrangements for positions, therapy gaps, topics, principles, and individual work. The LGBTQIA+ page does not yet have an equivalent content-led move.

A stronger layout would not add pride-themed decoration. It would make one useful relationship easier to understand, for example:

- a restrained “what changes in the room” field pairing common therapy assumptions with Joel’s actual practice;
- three uneven editorial clusters for identity, relationships/family, and ordinary mental-health concerns;
- a short practice-and-boundaries panel beside a more narrative section about being understood without becoming the subject of the session.

One such move is enough. The rest can continue using the shared system.

### 3. The hero duplicates rather than layers information

The small `h1` is “Queer-affirming counselling” and the large display line is “LGBTQIA+ affirming counselling.” Both name the same service. The visual title therefore consumes the page’s strongest typographic moment without adding a point of view.

The shared hero contract is not the problem: a concise semantic `h1` followed by a non-heading expressive statement is the active site-wide pattern. This page simply needs the two layers to do different jobs. The exact wording should come from the copy rebuild, not from a decorative headline exercise.

### 4. The topic checklist is scannable but slightly clinical

The eight-item two-column panel works at desktop size and collapses cleanly to one column on mobile. It is the page’s clearest scanning surface.

However, repeated check-circle icons can suggest completed requirements or approved features rather than situations someone may bring to counselling. On mobile, the panel becomes a 725-pixel run of eight similar rows. Grouping the material into fewer meaningful clusters, or using a ruled typographic field without success icons, could make it feel more editorial and less like a product checklist.

### 5. Responsive behaviour is sound

At `390 × 844`:

- the hero and split sections stack in the correct order;
- actions become clear full-width targets;
- heading wraps remain readable;
- the checklist collapses to one column;
- FAQ questions remain legible and usable;
- no horizontal overflow was detected.

The page is long—approximately 3,548 rendered pixels in the reviewed mobile capture—but the length itself is not the issue. The stronger opportunity is to improve variation and progression so the scroll feels purposeful. The unstyled breadcrumb is the only obvious mobile break found in this review.

### 6. An image is not required

The absence of photography or illustration is not a gap. Adding stock images of diverse couples, flags, or abstract rainbow treatments would likely make the page more generic and less credible. If a visual asset is ever introduced, it should have a specific informational or brand role rather than functioning as proof of inclusion.

## SEO assessment

### Current SEO readiness matrix

| Check | Status | Assessment |
|---|---|---|
| Indexability | Intentional fail for public launch | Generated and hydrated HTML contain `noindex, nofollow`. Google documents that `noindex` prevents a page appearing in search results. |
| Sitemap | Intentional fail for public launch | `/inclusion/lgbtqia` is absent from the generated sitemap because only four current public routes are indexable. |
| Production internal discovery | Intentional fail for public launch | Draft child links are suppressed in production on Home, the Inclusion Hub, and navigation. The breadcrumb and body links lead out of this page but do not create inbound discovery. |
| URL | Pass | Short, readable, and correctly nested below `/inclusion`. |
| Canonical | Pass | Correct absolute apex-domain canonical is generated. |
| Prerendered content | Pass | Full page content and metadata are in first-response HTML. |
| Page title | Pass | Unique, descriptive, concise, and service-specific. Reconsider location wording only after deciding the primary search and service positioning. |
| Meta description | Pass with revision needed later | Accurate and unique now. It must be revisited after the copy/scope rewrite so it reflects the final visible proposition. |
| Main title signals | Partial | Metadata and visual title use `LGBTQIA+`; the semantic `h1` uses `Queer`. The meanings are compatible, but alignment would give Google and visitors one cleaner title phrase. |
| Heading hierarchy | Pass | One descriptive `h1`, peer `h2` sections, and correctly nested FAQ `h3`s. |
| On-page service and location clarity | Partial | The service topic is clear, but “adults,” “Perth-based,” national reach, and individual-counselling scope are not clearly visible. |
| Content differentiation | Partial | The page covers relevant themes but provides less original, practitioner-specific value than its sibling specialist pages. |
| Internal anchor text | Mostly pass | Anchors are descriptive, but the three-link resource sentence is crowded and enquiry language is repeated. |
| Social metadata | Pass | Complete OG/Twitter values and accepted shared image. |
| Structured data | Pass, limited significance | FAQ schema matches visible questions. No additional schema is required to repair the page; a `BreadcrumbList` is optional after the visible breadcrumb is fixed. |

### SEO interpretation

Google’s current documentation supports four conclusions relevant to this page:

- A `noindex` robots rule instructs Google not to show the page in search results. The page therefore cannot be evaluated as an organic landing page until the intentional draft rule is removed. See [Robots meta tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).
- Google may use the `<title>`, the main visual title, headings such as the `h1`, prominent text, and inbound anchor text to construct a title link. The current title sources are compatible but unnecessarily near-duplicated. See [Influencing title links](https://developers.google.com/search/docs/appearance/title-link).
- Search snippets are primarily generated from page content, with the meta description used when it is a better summary. Visible specificity therefore matters more than treating the meta description as a standalone keyword container. See [Controlling snippets](https://developers.google.com/search/docs/appearance/snippet).
- Google recommends descriptive internal links and states that every page a site cares about should be linked from at least one other page. Production inbound links are therefore part of launch, not an optional follow-up. See [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

Google’s people-first content guidance also asks whether a page provides substantial, original value, demonstrates first-hand expertise, and leaves a visitor with enough information to achieve their goal. That reinforces the copy recommendation: improve specificity and practitioner evidence for visitors, not by expanding a keyword list. See [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### Search-language opportunities

The existing page naturally covers `LGBTQIA+ affirming counselling`, `queer-affirming counselling`, trans and non-binary clients, gender, sexuality, identity, relationships, shame, family strain, and mental health. That is a reasonable baseline.

Potential visitor language such as `LGBTQ counsellor Perth`, `queer therapist`, `trans affirming counsellor`, or more specific identity terms should be considered only if it accurately matches the final service and reads naturally. No search-volume research was conducted for this review, so the report does not recommend selecting a primary phrase solely on assumed demand.

The final page should visibly support whatever the title and meta description promise. If Perth, adults, national availability, or a particular identity group remains in metadata, the page should contain corresponding visitor-facing information rather than relying on head metadata alone.

## Recommended rebuild direction

This is a content-first rebuild, not a request to make the page louder.

### Step 1: Resolve owner questions before drafting

Confirm:

1. Which populations and experiences Joel can accurately claim competence with under the `LGBTQIA+` umbrella.
2. Whether the service includes only general individual counselling or also any gender-related reports, letters, assessments, or transition support.
3. Whether a partner may ever join a session and how that differs from couples counselling.
4. Which training, professional experience, lived/community knowledge, and practice behaviours can be stated publicly.
5. The exact visible wording for adults, Perth base, and Australia-wide availability without foregrounding online delivery.

### Step 2: Give each content section one decision-making job

A useful architecture would be:

1. **Hero:** name the service, offer one distinctive reason the page matters, and provide one primary next step.
2. **Why context matters:** describe recognisable ways therapy can miss or distort LGBTQIA+ experience.
3. **What practice looks like with Joel:** use first-person, observable behaviours and explicit limits.
4. **What someone may bring:** group identity-related and ordinary-life concerns without turning them into a checklist of labels.
5. **Fit and boundaries:** adults, individual work, location/availability, reports or services not offered, and any conflict considerations.
6. **FAQ:** keep the strongest current questions and add only questions that remove genuine pre-contact uncertainty.
7. **Close:** explain the consultation/enquiry step concretely and once.

This structure is a recommendation, not fixed copy. The final wording should be shaped by Joel’s answers and the page’s real strongest angle.

### Step 3: Add one content-led visual move

Keep the existing system for the hero, FAQ, and CTA, but replace one of the repeated split sections with a page-specific composition that makes a meaningful relationship easier to scan. Avoid decorative identity signifiers and keep the treatment page-scoped until it proves useful elsewhere.

### Step 4: Repair the breadcrumb

Move breadcrumb styling into production scope, verify desktop/mobile wrapping and focus states, and decide whether it should become a shared child-page pattern. Do not import `styles-dev.css` into the public page.

### Step 5: Promote SEO only after content sign-off

The go-live sequence should coordinate:

1. final copy, claims, and scope approval;
2. layout and responsive verification;
3. removal of `noindex, nofollow` from the route metadata;
4. addition to the generated sitemap’s indexable route list;
5. enabling production links from the Inclusion Hub and any agreed Home/navigation surfaces;
6. rebuilt head/body verification, including canonical, robots, social metadata, FAQ schema, and hydrated state;
7. completion of the LGBTQIA+ rows in the SEO, accessibility, responsive, and copy launch checklists;
8. post-deploy response and Search Console verification.

Removing the robots rule before the page is linked and approved would create an incomplete launch state.

## Suggested acceptance criteria

The page is ready to be considered for public indexing when:

- the production breadcrumb is clearly separated, styled, keyboard-visible, and responsive;
- the hero badge and display statement perform different jobs rather than repeating the service name;
- the page demonstrates affirming practice through specific, owner-confirmed behaviours and boundaries;
- generic welcome/safety assurances are removed or replaced with bounded factual language;
- the breadth of `LGBTQIA+` is either credibly supported or intentionally narrowed;
- adults, individual-counselling scope, Perth base, and Australia-wide availability are clear enough for visitor fit;
- trans-related services and non-services are not left ambiguous;
- the page has one distinctive content-led layout treatment and no unnecessary pride-themed decoration;
- desktop, tablet, mobile, zoom/reflow, keyboard, screen-reader, and contrast checks are completed under the launch framework;
- `noindex, nofollow`, sitemap exclusion, and suppressed production links are reversed together;
- generated and hydrated metadata match the final visible page;
- final copy receives owner and ethical-claims sign-off under `LAUNCH-7`.

## Final recommendation

Do not optimise this draft by adding more identity terms, more affirming claims, or more decorative inclusion signals. Rebuild it around truthful evidence: what Joel understands, how that changes the work, what he will not assume, where his scope ends, and what a prospective adult client needs to know before contacting him.

The current page already has the technical foundation and visual restraint to support that. Once the breadcrumb is repaired and the copy becomes as specific and accountable as the stronger sibling pages, the route can be promoted through the existing SEO infrastructure with relatively little technical risk.

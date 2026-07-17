# Market research method

Use this reference when planning or conducting market-segment research and
when integrating source material into a canonical dossier. The goal of this
phase is a reproducible account of a visible market that can support detailed
decision synthesis. Keep it distinct from formal forecasting and
provider-quality ranking; develop recommendations through
`decision-synthesis.md` after the evidence is integrated.

## Contents

- [Start with claims and evidence](#start-with-claims-and-evidence)
- [Observe query and search landscapes](#observe-query-and-search-landscapes)
- [Use geography according to the claim](#use-geography-according-to-the-claim)
- [Measure demand without inventing it](#measure-demand-without-inventing-it)
- [Define provider and competitor samples](#define-provider-and-competitor-samples)
- [Use directories and taxonomies carefully](#use-directories-and-taxonomies-carefully)
- [Research prices, offers, and market structure](#research-prices-offers-and-market-structure)
- [Handle reviews and first-person material](#handle-reviews-and-first-person-material)
- [Count, compare, and calculate transparently](#count-compare-and-calculate-transparently)
- [Verify and cite sources](#verify-and-cite-sources)
- [Know when to stop](#know-when-to-stop)

## Start with claims and evidence

Turn each research question into an observable claim before selecting sources.
For example, `Which service labels appear across sampled Perth provider pages?`
can be answered from a defined provider-page sample. `Do Perth clients prefer
these labels?` cannot.

Use each evidence stream only for claims it can support:

| Evidence stream | Can support | Does not by itself support |
| --- | --- | --- |
| Exact-query result sample | Dated result composition, visible page types, labels, domains, and result features | Search volume, stable ranking, market share, preference, or service uptake |
| Keyword or advertising tool | The tool's reported volume, range, competition, or cost metric for the selected place and period | Exact future demand, organic difficulty, conversion, or the whole market |
| Search Console or site analytics | Search visibility and behaviour captured by the measured site and configuration | Total market demand, competitor performance, or unobserved enquiries |
| Enquiry, booking, or CRM data | Recorded first-party activity under the stated coding and period | Population prevalence, whole-market demand, or reasons not recorded |
| Trends or relative-interest tool | Relative change within the chosen query, place, period, and normalised scale | Absolute volume, market size, or direct comparison across separately scaled charts |
| Provider or competitor page | Public self-description of services, roles, claims, prices, locations, formats, and offers | Competence, outcomes, actual availability, market share, or client preference |
| Directory or marketplace | That source's visible taxonomy, filters, listings, counts, and display rules | Complete supply, endorsement, quality, or a universal segment definition |
| Official or industry data | The reported measure for its defined population, unit, period, and method | A differently defined segment or a local estimate without a defensible mapping |

Use source triangulation to clarify a question, not to make a claim stronger by
mixing unlike measures. When sources disagree, retain the disagreement and
inspect differences in definitions, dates, geographies, and methods.

## Observe query and search landscapes

Create a query set from the segment's service labels, audience or issue terms,
provider-role terms, geography, delivery mode, and common modifiers relevant to
the brief. Include alternate terms only when they are plausible research
variants, not to manufacture a large list.

For every sampled query, record:

- the exact query string;
- observation date and, when relevant, time;
- search engine, search interface, or tool;
- requested or inferred geography and language;
- known account, location, device, safe-search, and personalisation state;
- result depth and which result types were counted;
- visible organic, map, advertisement, directory, video, forum, featured,
  question, suggestion, or other result features; and
- failures, blocked interfaces, omitted dynamic features, and other material
  limits.

Do not call a generic web-search API a Google results page unless it actually
exposes Google. Do not silently treat returned search results, local packs,
maps, autocomplete, `People also ask`, and related searches as one sample.
Label the surface that produced each observation.

Deduplicate domains or providers when the question concerns distinct supply;
retain duplicate pages when page-level visibility is the observation. Explain
which unit was counted. Treat an order as a one-time position, not a stable
ranking. Describe a missing feature or result as absent from that sample, not
absent from the market.

Autocomplete, related-search, and question features may help discover visible
language or new queries. They are not keyword-volume measures. Approximate
result counts are unstable interface estimates and normally should not be used
as demand or supply counts.

## Use geography according to the claim

For a location-specific decision, do not assume that all useful learning must
come from that location. Use the target market to establish local reality, then
use serviceable, comparable or learning markets when they can reveal additional
language, intents, market models, content structures, offers or channels.

Follow `geographic-scope-and-transfer.md`. Keep each geographic sample and
metric separate. Record why a broader market was selected and assess whether a
pattern is directly transferable, requires localisation, is only a hypothesis,
is context only or is not transferable. Broader evidence may generate and
strengthen local recommendations; it may not silently stand in for target-market
demand, ranking, competition, price, regulation or audience preference.

## Measure demand without inventing it

Define `demand` before researching it. The user may mean query volume, relative
interest, enquiries, bookings, service utilisation, spending, unmet need, or
something else. These measures are not interchangeable.

Prefer the closest available measure:

1. Use authorised first-party data for site-specific search visibility,
   enquiries, bookings, or conversion questions.
2. Use accessible keyword or advertising tools for modelled query-volume or
   paid-search metrics, recording the tool, match rules, geography, period,
   currency, and whether values are exact, ranged, rounded, or modelled.
3. Use relative-interest tools for time and place comparisons only within the
   scale and sampling rules the tool exposes.
4. Use official statistics or credible industry data for population, service
   use, business, or spending measures that genuinely match the segment.
5. Use transparent proxies only when they illuminate part of the question and
   label both the proxy and the inference limit.

If the required system, paid tool, account, or private data is unavailable,
state that the desired demand measure remains unknown. Do not substitute:

- search-result count or result abundance;
- number of providers or directory listings;
- autocomplete, related-search, or question features;
- a few public posts, reviews, or anecdotes;
- broad population prevalence without a defensible service-demand link; or
- the analyst's impression that a topic seems common.

For first-party private data, use only authorised access, aggregate to the
minimum useful level, avoid exposing identifying information, state relevant
coding and missing-data limits, and do not place secrets or raw personal data in
the dossier.

## Define provider and competitor samples

Define `competitor` for the question. Distinguish where useful:

- direct providers offering a materially similar service to the same market;
- adjacent providers with overlapping but different roles or offers;
- substitutes that may satisfy a similar job through another service model;
- intermediaries such as directories, platforms, referrers, or marketplaces;
  and
- informational publishers that compete for search visibility but not service
  delivery.

State how providers entered the sample: exact-query results at a stated depth,
a directory category, a supplied list, a geographic census, purposive examples,
or another rule. Record exclusions and deduplication. Do not call a convenience
sample comprehensive.

Choose repeated fields before comparison. Depending on the brief, observe:

- provider role, service category, and stated credentials;
- audience, issue, or segment labels;
- page type and information architecture;
- geography, delivery mode, service configuration, and eligibility;
- visible price, duration, packages, concessions, waitlist, and booking route;
- promises, claims, proof elements, disclaimers, and risk language;
- terminology, adjacent topics, referral routes, and partnerships; and
- visible technical search features such as titles, headings, structured data,
  or indexable dedicated pages when SEO evidence is in scope.

Code only what is visible in the sampled source. Use `not observed on sampled
page` rather than `does not offer` unless the broader absence was actually
checked. Attribute claims and credentials as provider statements unless an
authoritative register was separately checked. A dedicated page, wording
choice, or repeated topic may show presentation emphasis; it does not prove
investment, expertise, performance, or audience response.

## Use directories and taxonomies carefully

Record the directory or platform's:

- category names, definitions, filters, role labels, and geographic rules;
- displayed counts, pagination, promoted placements, and sort options;
- profile fields, membership or submission rules, and visible disclaimers;
- duplicate, inactive, online-only, serves-area, or cross-category listings;
  and
- observation date and dynamic or access limits.

Separate records from distinct providers and record the counted unit. A
displayed count may include duplicates, remote providers, inactive profiles,
paid placements, or self-selected categories. Directory coverage is evidence
about that directory and a possible supply proxy, not a census unless its
method supports that description.

Professional association categories and government classifications can help
map roles and boundaries. Do not treat a taxonomy as a universal definition or
membership as evidence of issue-specific competence.

## Research prices, offers, and market structure

Price comparisons require a common unit. Record currency, tax treatment when
visible, session or package length, individual or group configuration, initial
or ongoing status, concession, rebate, subscription, and observation date.
Do not compute an average across materially different units without separating
or normalising them transparently. `Contact for price` and missing public
pricing are observations, not zero values.

Market-structure research may cover provider roles, delivery models,
geographic distribution, intermediaries, referral channels, substitutes,
adjacent services, service configurations, pricing models, visible
differentiation, and concentration within a defined sample. Distinguish a
counted market from a sampled visible market.

For market-size or growth claims, preserve:

- the market definition and included products or services;
- geography, base and forecast years, nominal or real currency, and units;
- source method, sample, forecast model, and access limits;
- whether a value is reported, converted, extrapolated, or calculated; and
- the formula and inputs for every derived number.

Do not create TAM, SAM, SOM, growth rates, or local estimates merely because a
broad market number exists. Only derive them when the user asks and the mapping
and assumptions are defensible. Present scenarios or ranges when uncertainty is
material; do not manufacture precision.

## Handle reviews and first-person material

Aggregated rating, review-count, or review-feature observations may be recorded
as dated platform fields when they are genuinely relevant. They do not by
themselves establish satisfaction, quality, demand, or representativeness.

Do not mine individual reviews, forums, or personal accounts to infer audience
needs or preferences as part of this skill. Route lived-experience research to
`audience-research`. If the user explicitly requests a mixed market-and-review
study, keep the evidence streams separate, define the review sample, paraphrase
and de-identify sensitive material, and do not convert recurring review themes
into population rates.

## Count, compare, and calculate transparently

For every count or comparison:

- state the unit, inclusion rule, sample, denominator, and observation date;
- use the same fields and coding rules across the compared set;
- distinguish `yes`, `no`, `not visible`, `not checked`, and `not applicable`;
- keep non-comparable dates, geographies, tools, and samples separate;
- show formulas for derived values and retain enough precision to reproduce the
  calculation without implying false accuracy; and
- describe small samples as small samples rather than generalising from them.

Check arithmetic. When a table supports a pattern statement, ensure its rows
and denominator actually reproduce the stated count.

## Verify and cite sources

Prefer primary sources for provider facts, tool metrics, directory rules,
official statistics, and industry-report methods. Use search snippets for
discovering sources and for explicitly sampled search-interface observations,
not as a substitute for opening a page whose content is being characterised.

Open the original source before recording an exact figure, price, quotation,
calculation input, or unusually consequential claim. Record the access or
observation date for volatile sources. Use archived or cached material only
when necessary, label it, and do not present it as current.

Paraphrase copyrighted material. Quote only when the exact market language is
itself material, keep excerpts short, and attribute them. Do not copy provider
pages, reports, or database records wholesale.

Use stable IDs in the canonical dossier: `Q##`, `D##`, `C##`, `T##`, and
`M##`. Cite IDs beside material findings. Assign final IDs only after resolving
duplicate sources and deciding what will be integrated.

## Know when to stop

Do not use a fixed source quota. Stop when the brief's questions are answered
with proportionate coverage, new sources mainly repeat the represented range,
or a practical access or time limit has been documented. Continue when the
sample still reflects only one query, directory, provider type, geography, or
convenient story and broader coverage would materially change the account.

Before synthesis, actively look for at least one plausible contradiction,
alternative category, adjacent provider type, and measurement limitation. This
is a search for range and falsification, not a requirement to force balance
where the evidence does not support it.

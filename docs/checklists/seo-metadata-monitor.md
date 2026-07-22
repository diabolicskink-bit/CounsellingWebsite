# SEO And Metadata Monitor

This is the single manual monitor for the site's technical SEO and metadata state. It combines the former route inventory, launch checklist, and search-preview data without acting as a launch gate or a scheduled review.

Update this document only when the owner explicitly directs a review. Current values can be populated from source without implying that the related behaviour has been checked.

## How To Use

- `Last checked` records the date when every item in that section received a deliberate review. Use `Not recorded` until that has happened.
- `Data` records a concrete metadata or content value. Omit it for behavioural checks such as response status, sitemap membership, redirects, generated-head parity, hydration, and not-found handling.
- `Note` is optional. Use it only for a durable exception, intentional decision, or linked `SITE-*` / `DEBT-*` gap that would otherwise be easy to lose.
- Recheck and update a section only when the owner directs it. There is no automatic or calendar-based review cadence.

## Status Labels

- `Not checked`: No applicable review is currently recorded.
- `Pass`: The condition was checked and was acceptable at the recorded section review.
- `Partial`: The condition was checked, but an accepted or separately tracked gap remains.
- `Fail`: The condition was checked and needs action.
- `N/A`: The condition does not apply.

## Review Standard

Use the relevant combination of metadata source, generated HTML, served route response, hydrated browser head, crawl artifacts, social asset response, redirect response, and not-found response. A concrete gap belongs in `SITE-*` when it is visitor-facing or `DEBT-*` when it concerns technical or maintainability pressure.

## Global Metadata

- **Last checked:** `Not recorded`

- `Not checked` Build prerendering generates metadata artifacts for every intended public route.

- `Not checked` The route metadata source contains every intended public route and no development or test routes.

- `Not checked` The generated sitemap includes only intended indexable public pages.

- `Not checked` The generated robots policy is intentional and points at the generated sitemap.
  - **Data:** `robots.txt` allows crawling and references `https://vivecounselling.com.au/sitemap.xml`; public content routes have no route-level robots directive; not-found output uses `noindex, nofollow`.

- `Not checked` Canonical metadata uses the intended public origin consistently.
  - **Data:** `https://vivecounselling.com.au` by default; `SITE_URL` supports an intentional alternate environment.

- `Not checked` Canonical and social URL values are absolute where required.

- `Not checked` Site identity metadata consistently names the practice.
  - **Data:** `Vive Counselling`

- `Not checked` Site HTML includes the intended language and viewport metadata.
  - **Data:** `lang="en"`; viewport `width=device-width, initial-scale=1.0`.

- `Not checked` Theme, manifest, favicon, touch-icon, and app-icon metadata use the configured public values.
  - **Data:** Theme colour `#234b3d`; manifest background `#f7f6f2`; `/site.webmanifest`; `/favicon.ico`; `/favicon.svg`; `/icon-192.png`; `/icon-512.png`; `/apple-touch-icon.png`.

- `Pass` The shared social image exists at the configured path and is publicly served.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`

- `Pass` Shared social image dimensions and alt metadata match expectations.
  - **Data:** `1200x630`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Partial` Structured data is valid in shape and aligned with confirmed public claims.
  - **Data:** Home emits linked `WebSite`, `Organization`, `Person`, and `Service` entities; Working with Joel emits `ProfilePage` and the credential-bearing `Person`; each specialist route emits `WebPage` and a route-specific `Service`; Inclusion, Kink/BDSM, and Contact/Fees also emit their visible `FAQPage` data.
  - **Note:** A private or inferred address and address-dependent `LocalBusiness` data remain intentionally absent. Add the approved Google Business Profile to `Organization.sameAs` only when its exact public URL is confirmed.

- `Partial` Hydrated client-side navigation keeps the complete runtime head aligned with the current route.
  - **Note:** Runtime canonical, Open Graph, Twitter, and robots metadata ownership remains tracked under `DEBT-27`.

## `/` - Home

- **Last checked:** `2026-07-08`

- `Not checked` The first-response H1 is present and matches the route purpose.
  - **Data:** `Online Counselling and Therapy Across Australia`

- `Pass` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - **Data:** `Online Therapy Across Australia | Vive Counselling`

- `Pass` Meta description is present, human-readable, and matches visible page content.
  - **Data:** `Online counselling and psychotherapy across Australia. Support for anxiety, depression, relationships and trauma. Kink, ENM and LGBTQIA+ aware.`

- `Pass` Canonical URL resolves to this route on the intended public origin.
  - **Data:** `https://vivecounselling.com.au/`

- `Pass` Canonical public URL returns a `200` response.

- `Pass` Indexability is not blocked by robots metadata or response headers.
  - **Data:** No route-level robots directive; indexable.

- `Pass` Sitemap output includes this route exactly once.

- `Pass` Open Graph and Twitter metadata are complete and aligned with the route.
  - **Data:** `og:title` / `twitter:title` use the page title; `og:description` / `twitter:description` use the meta description; `og:url` is `https://vivecounselling.com.au/`; `og:type` is `website`; `twitter:card` is `summary_large_image`.

- `Pass` The configured social image and alt metadata are appropriate for the route.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Not checked` Structured data is valid and aligned with current public claims.
  - **Data:** A linked graph containing `WebSite`, `Organization`, `Person`, and the umbrella counselling `Service`, including online enquiry and the AUD 120 standard 50-minute session offer.

- `Pass` Generated initial HTML/head metadata matches expected route metadata.

- `Partial` Hydrated and client-side navigation metadata remains correct.

- `Pass` Search and social wording avoids misleading therapeutic claims, overpromising outcomes, and pathologising language.

## `/working-with-joel` - Working with Joel

- **Last checked:** `Not recorded`

- `Not checked` The first-response H1 is present and matches the route purpose.
  - **Data:** `Joel Griffiths, Psychodynamic Counsellor`

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - **Data:** `Joel Griffiths, Psychodynamic Counsellor | Vive Counselling`

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - **Data:** `Psychodynamic counselling with Joel Griffiths, an ACA-registered counsellor working online across Australia, based in Perth. Attachment-informed and integrative.`

- `Not checked` Canonical URL resolves to this route on the intended public origin.
  - **Data:** `https://vivecounselling.com.au/working-with-joel`

- `Not checked` Canonical public URL returns a `200` response.

- `Not checked` Indexability is not blocked by robots metadata or response headers.
  - **Data:** No route-level robots directive; indexable.

- `Not checked` Sitemap output includes this route exactly once.

- `Not checked` Open Graph and Twitter metadata are complete and aligned with the route.
  - **Data:** `og:title` / `twitter:title` use the page title; `og:description` / `twitter:description` use the meta description; `og:url` is `https://vivecounselling.com.au/working-with-joel`; `og:type` is `website`; `twitter:card` is `summary_large_image`.

- `Not checked` The configured social image and alt metadata are appropriate for the route.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Not checked` Structured data is valid and aligned with current public claims.
  - **Data:** `ProfilePage` whose `mainEntity` is the site-wide `Person` for Joel Griffiths, including the confirmed Edith Cowan University qualification and ACA Level 1 credential details.

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.

- `Not checked` Hydrated and client-side navigation metadata remains correct.

- `Not checked` Search and social wording avoids misleading therapeutic claims, overpromising outcomes, and pathologising language.

## `/inclusive-counselling` - Inclusive Counselling

- **Last checked:** `Not recorded`

- `Not checked` The first-response H1 is present and matches the route purpose.
  - **Data:** `Inclusive counselling`

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - **Data:** `Kink, ENM and LGBTQIA+ Inclusive Counselling | Vive Counselling`

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - **Data:** `Inclusive counselling for adults across Australia, with particular understanding of kink, BDSM, ENM, polyamory and LGBTQIA+ lives. Perth-based and non-shaming.`

- `Not checked` Canonical URL resolves to this route on the intended public origin.
  - **Data:** `https://vivecounselling.com.au/inclusive-counselling`

- `Not checked` Canonical public URL returns a `200` response.

- `Not checked` Indexability is not blocked by robots metadata or response headers.
  - **Data:** No route-level robots directive; indexable.

- `Not checked` Sitemap output includes this route exactly once.

- `Not checked` Open Graph and Twitter metadata are complete and aligned with the route.
  - **Data:** `og:title` / `twitter:title` use the page title; `og:description` / `twitter:description` use the meta description; `og:url` is `https://vivecounselling.com.au/inclusive-counselling`; `og:type` is `website`; `twitter:card` is `summary_large_image`.

- `Not checked` The configured social image and alt metadata are appropriate for the route.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Not checked` Structured data is valid and aligned with visible page content.
  - **Data:** `FAQPage` generated from the visible Inclusion questions.

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.

- `Not checked` Hydrated and client-side navigation metadata remains correct.

- `Not checked` Search and social wording avoids misleading therapeutic claims, overpromising outcomes, and pathologising language.

## `/kink-bdsm-counselling` - Kink And BDSM

- **Last checked:** `Not recorded`

- `Not checked` The first-response H1 is present and matches the route purpose.
  - **Data:** `Kink-aware counselling and therapy`

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - **Data:** `Kink & BDSM-Aware Counselling | Vive Counselling`

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - **Data:** `Kink-aware counselling and therapy with Joel Griffiths, an ACA-registered counsellor based in Perth and working with adults across Australia.`

- `Not checked` Canonical URL resolves to this route on the intended public origin.
  - **Data:** `https://vivecounselling.com.au/kink-bdsm-counselling`

- `Not checked` Canonical public URL returns a `200` response.

- `Not checked` Indexability is not blocked by robots metadata or response headers.
  - **Data:** No route-level robots directive; indexable.

- `Not checked` Sitemap output includes this route exactly once.

- `Not checked` Open Graph and Twitter metadata are complete and aligned with the route.
  - **Data:** `og:title` / `twitter:title` use the page title; `og:description` / `twitter:description` use the meta description; `og:url` is `https://vivecounselling.com.au/kink-bdsm-counselling`; `og:type` is `website`; `twitter:card` is `summary_large_image`.

- `Not checked` The configured social image and alt metadata are appropriate for the route.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Not checked` Structured data is valid and aligned with current public claims and visible questions.
  - **Data:** `WebPage` whose `mainEntity` is the route-specific kink- and BDSM-aware `Service`, plus `FAQPage` generated from visible questions.

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.

- `Not checked` Hydrated and client-side navigation metadata remains correct.

- `Not checked` Search and social wording avoids misleading therapeutic claims, overpromising outcomes, and pathologising language.

## `/polyamory-enm-counselling` - ENM And Polyamory

- **Last checked:** `Not recorded`

- `Not checked` The first-response H1 is present and matches the route purpose.
  - **Data:** `Polyamory and ethical non-monogamy counselling and therapy`

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - **Data:** `Counselling for Polyamory, Open Relationships and ENM | Vive Counselling`

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - **Data:** `Counselling for polyamory, open relationships and ENM across Australia, without assuming monogamy is the answer or treating relationship structure as the problem.`

- `Not checked` Canonical URL resolves to this route on the intended public origin.
  - **Data:** `https://vivecounselling.com.au/polyamory-enm-counselling`

- `Not checked` Canonical public URL returns a `200` response.

- `Not checked` Indexability is not blocked by robots metadata or response headers.
  - **Data:** No route-level robots directive; indexable.

- `Not checked` Sitemap output includes this route exactly once.

- `Not checked` Open Graph and Twitter metadata are complete and aligned with the route.
  - **Data:** `og:title` / `twitter:title` use the page title; `og:description` / `twitter:description` use the meta description; `og:url` is `https://vivecounselling.com.au/polyamory-enm-counselling`; `og:type` is `website`; `twitter:card` is `summary_large_image`.

- `Not checked` The configured social image and alt metadata are appropriate for the route.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Not checked` Structured data is valid and aligned with current public claims.
  - **Data:** `WebPage` whose `mainEntity` is the route-specific polyamory, open-relationships, and ENM `Service`.

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.

- `Not checked` Hydrated and client-side navigation metadata remains correct.

- `Not checked` Search and social wording avoids misleading therapeutic claims, overpromising outcomes, and pathologising language.

## `/lgbtqia-affirming-counselling` - LGBTQIA+

- **Last checked:** `Not recorded`

- `Not checked` The first-response H1 is present and matches the route purpose.
  - **Data:** `LGBTQIA+ affirming counselling and therapy`

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - **Data:** `LGBTQIA+ Affirming Counselling | Vive Counselling`

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - **Data:** `LGBTQIA+ affirming counselling with Joel Griffiths for adults across Australia. Perth-based online counselling for sexuality, gender, relationships and other concerns.`

- `Not checked` Canonical URL resolves to this route on the intended public origin.
  - **Data:** `https://vivecounselling.com.au/lgbtqia-affirming-counselling`

- `Not checked` Canonical public URL returns a `200` response.

- `Not checked` Indexability is not blocked by robots metadata or response headers.
  - **Data:** No route-level robots directive; indexable.

- `Not checked` Sitemap output includes this route exactly once.

- `Not checked` Open Graph and Twitter metadata are complete and aligned with the route.
  - **Data:** `og:title` / `twitter:title` use the page title; `og:description` / `twitter:description` use the meta description; `og:url` is `https://vivecounselling.com.au/lgbtqia-affirming-counselling`; `og:type` is `website`; `twitter:card` is `summary_large_image`.

- `Not checked` The configured social image and alt metadata are appropriate for the route.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Not checked` Structured data is valid and aligned with current public claims.
  - **Data:** `WebPage` whose `mainEntity` is the route-specific LGBTQIA+ affirming `Service`.

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.

- `Not checked` Hydrated and client-side navigation metadata remains correct.

- `Not checked` Search and social wording avoids misleading therapeutic claims, overpromising outcomes, and pathologising language.

## `/contact` - Contact And Fees

- **Last checked:** `Not recorded`

- `Not checked` The first-response H1 is present and matches the route purpose.
  - **Data:** `Contact and fees`

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - **Data:** `Counselling Fees & Contact | Vive Counselling`

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - **Data:** `Request a free 15-minute initial consultation with Joel Griffiths at Vive Counselling. Counselling sessions are $120; view fees and contact details.`

- `Not checked` Canonical URL resolves to this route on the intended public origin.
  - **Data:** `https://vivecounselling.com.au/contact`

- `Not checked` Canonical public URL returns a `200` response.

- `Not checked` Indexability is not blocked by robots metadata or response headers.
  - **Data:** No route-level robots directive; indexable.

- `Not checked` Sitemap output includes this route exactly once.

- `Not checked` Open Graph and Twitter metadata are complete and aligned with the route.
  - **Data:** `og:title` / `twitter:title` use the page title; `og:description` / `twitter:description` use the meta description; `og:url` is `https://vivecounselling.com.au/contact`; `og:type` is `website`; `twitter:card` is `summary_large_image`.

- `Not checked` The configured social image and alt metadata are appropriate for the route.
  - **Data:** `https://vivecounselling.com.au/og-vive-counselling.png`; `Vive Counselling social preview card featuring Joel Griffiths.`

- `Not checked` Structured data is valid and aligned with visible page content.
  - **Data:** `FAQPage` generated from the visible Contact and Fees questions.

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.

- `Not checked` Hydrated and client-side navigation metadata remains correct.

- `Not checked` Search and social wording avoids misleading therapeutic claims, overpromising outcomes, and pathologising language.

## Redirects

- **Last checked:** `Not recorded`

- `Not checked` `/about` returns the intended one-hop permanent redirect to `/working-with-joel`.

- `Not checked` `/about` is excluded as a standalone sitemap URL and does not expose stale standalone canonical metadata.

- `Not checked` `/fees` returns the intended one-hop permanent redirect to `/contact`.

- `Not checked` `/fees` is excluded as a standalone sitemap URL and does not expose stale standalone canonical metadata.

- `Not checked` `/inclusion` returns the intended one-hop permanent redirect to `/inclusive-counselling`.
  - **Note:** `/inclusion` was the former indexed Inclusion Hub URL; preserve this redirect when route configuration changes.

- `Not checked` `/inclusion` is excluded as a standalone sitemap URL and does not expose stale standalone canonical metadata.

## Not-Found Behaviour

- **Last checked:** `Not recorded`

- `Not checked` Unknown public URLs return the intended not-found response state.

- `Not checked` Unknown public URLs and the generated fallback use the intended robots policy.
  - **Data:** `noindex, nofollow`

- `Not checked` Generated fallback metadata does not present a missing URL as a normal canonical public page.

- `Not checked` Not-found title, description, and H1 identify the missing-page state.
  - **Data:** Title `Page not found | Vive Counselling`; no route description; H1 `That page isn't here.`

- `Not checked` Former unindexed nested Inclusion topic URLs continue to use not-found behaviour rather than redirects.
  - **Note:** The former `/inclusion/kink-bdsm`, `/inclusion/enm-polyamory`, and `/inclusion/lgbtqia` routes were not indexed and intentionally do not redirect to the current flat URLs.

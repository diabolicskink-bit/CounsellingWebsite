# SEO Metadata Inventory

This is the editable metadata inventory companion for `LAUNCH-3`.

Use this document to see route metadata at a glance. It is not a pass/fail audit and does not prove that a value has been checked in generated HTML, browser state, social previews, or live search tools. Use [seo-metadata-launch.md](seo-metadata-launch.md) for launch checklist status and evidence notes.

## How To Use

Populate the tables from the most appropriate source for the review task: `src/data/routeMetadata.json`, generated HTML, hydrated browser head metadata, live-domain responses, social preview checks, or structured-data inspection.

Leave a value as `To populate` until it has been intentionally copied in. If a value is intentionally absent, write that plainly, such as `None`, `No route-level robots directive`, or `Intentionally absent`.

## Global Metadata

| Shared metadata field | Where it is used | Metadata text / value |
|---|---|---|
| Site name | Generated head metadata and social preview context | `Vive Counselling` |
| Canonical origin | Canonical URLs, sitemap URLs, and absolute social URLs | `https://vivecounselling.com.au` by default; `SITE_URL` supports intentional alternate environments. |
| Shared social image | Open Graph and Twitter/X image metadata | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Shared social image alt | Open Graph and Twitter/X image alt metadata | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Theme colour | Browser theme colour metadata and web app identity | `#234b3d` |
| Background colour | Web manifest app background | `#f7f6f2` |
| Favicons and app icons | Browser tab, device shortcuts, and installed app identity | `/favicon.ico`, `/favicon.svg`, `/icon-192.png`, and `/apple-touch-icon.png`; the manifest also references `/icon-512.png`. |
| Web manifest | Installed app identity and icon references | `/site.webmanifest` |
| Robots policy | Site-wide crawl policy | `robots.txt` allows crawling. Public content routes have no route-level robots directive; the not-found route and generated `404.html` use `noindex, nofollow`. |
| Sitemap | Search crawler URL discovery | `/sitemap.xml` advertises all seven canonical public content routes. |
| Structured data policy | JSON-LD or intentional absence across the site | Home emits a linked `WebSite`, `Organization`, `Person`, and `Service` graph. The umbrella Service includes the online enquiry channel and the AUD 120 standard 50-minute session offer. Working with Joel emits a `ProfilePage` whose `mainEntity` is the same credential-bearing `Person`. Each live specialist route emits a `WebPage` / route-specific `Service` graph; Kink/BDSM also emits `FAQPage`. Inclusion and Contact/Fees emit `FAQPage`. A private or inferred address and address-dependent `LocalBusiness` schema remain intentionally absent. |

## `/` - Home

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / first-response heading | Component-rendered first-response heading reference | `Counselling and Psychotherapy` |
| HTML title | Browser tab, search title, generated `<title>` | `Online Therapy Across Australia | Vive Counselling` |
| Meta description | Search snippet candidate and generated description tag | `Online counselling and psychotherapy across Australia. Support for anxiety, depression, relationships and trauma. Kink, ENM and LGBTQIA+ aware.` |
| Canonical URL | Search canonical signal | `https://vivecounselling.com.au/` |
| Robots directive | Indexability policy | No route-level robots directive. |
| Open Graph title | Social preview title | `Online Therapy Across Australia | Vive Counselling` |
| Open Graph description | Social preview description | `Online counselling and psychotherapy across Australia. Support for anxiety, depression, relationships and trauma. Kink, ENM and LGBTQIA+ aware.` |
| Open Graph URL | Social preview canonical URL | `https://vivecounselling.com.au/` |
| Open Graph image | Social preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Open Graph image alt | Social preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Twitter card | Twitter/X preview card type | `summary_large_image` |
| Twitter title | Twitter/X preview title | `Online Therapy Across Australia | Vive Counselling` |
| Twitter description | Twitter/X preview description | `Online counselling and psychotherapy across Australia. Support for anxiety, depression, relationships and trauma. Kink, ENM and LGBTQIA+ aware.` |
| Twitter image | Twitter/X preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Twitter image alt | Twitter/X preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Structured data | JSON-LD or intentional absence | A linked JSON-LD graph identifies the `WebSite`, a minimal `Organization` with Joel Griffiths as `founder`, a concise `Person` that uses Joel's practitioner page as its stable identity URL, and a `Service` for counselling and psychotherapy for adults provided by Vive across Australia. The Service includes online enquiry as its delivery channel and the AUD 120 standard 50-minute session offer. |

## `/working-with-joel` - Working with Joel

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / first-response heading | Component-rendered first-response heading reference | `Joel Griffiths, Psychodynamic Counsellor` |
| HTML title | Browser tab, search title, generated `<title>` | `Joel Griffiths, Psychodynamic Counsellor | Vive Counselling` |
| Meta description | Search snippet candidate and generated description tag | `Psychodynamic counselling with Joel Griffiths, an ACA-registered counsellor working online across Australia, based in Perth. Attachment-informed and integrative.` |
| Canonical URL | Search canonical signal | `https://vivecounselling.com.au/working-with-joel` |
| Robots directive | Indexability policy | No route-level robots directive. |
| Open Graph title | Social preview title | `Joel Griffiths, Psychodynamic Counsellor | Vive Counselling` |
| Open Graph description | Social preview description | `Psychodynamic counselling with Joel Griffiths, an ACA-registered counsellor working online across Australia, based in Perth. Attachment-informed and integrative.` |
| Open Graph URL | Social preview canonical URL | `https://vivecounselling.com.au/working-with-joel` |
| Open Graph image | Social preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Open Graph image alt | Social preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Twitter card | Twitter/X preview card type | `summary_large_image` |
| Twitter title | Twitter/X preview title | `Joel Griffiths, Psychodynamic Counsellor | Vive Counselling` |
| Twitter description | Twitter/X preview description | `Psychodynamic counselling with Joel Griffiths, an ACA-registered counsellor working online across Australia, based in Perth. Attachment-informed and integrative.` |
| Twitter image | Twitter/X preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Twitter image alt | Twitter/X preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Structured data | JSON-LD or intentional absence | A `ProfilePage` graph identifies Joel Griffiths as the page's `mainEntity`, reuses his site-wide Person ID, links him to Vive Counselling, and records his Edith Cowan University graduate diploma and ACA Level 1 registration through `hasCredential`. |

## `/inclusive-counselling` - Inclusion Hub

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / first-response heading | Component-rendered first-response heading reference | `Inclusive counselling` |
| HTML title | Browser tab, search title, generated `<title>` | `Kink, ENM and LGBTQIA+ Inclusive Counselling \| Vive Counselling` |
| Meta description | Search snippet candidate and generated description tag | `Inclusive counselling for adults across Australia, with particular understanding of kink, BDSM, ENM, polyamory and LGBTQIA+ lives. Perth-based and non-shaming.` |
| Canonical URL | Search canonical signal | `https://vivecounselling.com.au/inclusive-counselling` |
| Robots directive | Indexability policy | No route-level robots directive. |
| Open Graph title | Social preview title | `Kink, ENM and LGBTQIA+ Inclusive Counselling \| Vive Counselling` |
| Open Graph description | Social preview description | `Inclusive counselling for adults across Australia, with particular understanding of kink, BDSM, ENM, polyamory and LGBTQIA+ lives. Perth-based and non-shaming.` |
| Open Graph URL | Social preview canonical URL | `https://vivecounselling.com.au/inclusive-counselling` |
| Open Graph image | Social preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Open Graph image alt | Social preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Twitter card | Twitter/X preview card type | `summary_large_image` |
| Twitter title | Twitter/X preview title | `Kink, ENM and LGBTQIA+ Inclusive Counselling \| Vive Counselling` |
| Twitter description | Twitter/X preview description | `Inclusive counselling for adults across Australia, with particular understanding of kink, BDSM, ENM, polyamory and LGBTQIA+ lives. Perth-based and non-shaming.` |
| Twitter image | Twitter/X preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Twitter image alt | Twitter/X preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Structured data | JSON-LD or intentional absence | `FAQPage` for the five visible inclusive counselling questions. |

## `/kink-bdsm-counselling` - Kink and BDSM

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / first-response heading | Component-rendered first-response heading reference | `Kink-aware counselling and therapy` |
| HTML title | Browser tab, search title, generated `<title>` | `Kink & BDSM-Aware Counselling \| Vive Counselling` |
| Meta description | Search snippet candidate and generated description tag | `Kink-aware counselling and therapy with Joel Griffiths, an ACA-registered counsellor based in Perth and working with adults across Australia.` |
| Canonical URL | Search canonical signal | `https://vivecounselling.com.au/kink-bdsm-counselling` |
| Robots directive | Indexability policy | No route-level robots directive. |
| Open Graph title | Social preview title | `Kink & BDSM-Aware Counselling \| Vive Counselling` |
| Open Graph description | Social preview description | `Kink-aware counselling and therapy with Joel Griffiths, an ACA-registered counsellor based in Perth and working with adults across Australia.` |
| Open Graph URL | Social preview canonical URL | `https://vivecounselling.com.au/kink-bdsm-counselling` |
| Open Graph image | Social preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Open Graph image alt | Social preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Twitter card | Twitter/X preview card type | `summary_large_image` |
| Twitter title | Twitter/X preview title | `Kink & BDSM-Aware Counselling \| Vive Counselling` |
| Twitter description | Twitter/X preview description | `Kink-aware counselling and therapy with Joel Griffiths, an ACA-registered counsellor based in Perth and working with adults across Australia.` |
| Twitter image | Twitter/X preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Twitter image alt | Twitter/X preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Structured data | JSON-LD or intentional absence | A `WebPage` whose `mainEntity` is the route-specific Kink- and BDSM-aware `Service`, linked to the site-wide provider and umbrella counselling Service, plus `FAQPage` for the four visible questions. |

## `/polyamory-enm-counselling` - ENM and polyamory

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / first-response heading | Component-rendered first-response heading reference | `Polyamory and ethical non-monogamy counselling and therapy` |
| HTML title | Browser tab, search title, generated `<title>` | `Counselling for Polyamory, Open Relationships and ENM \| Vive Counselling` |
| Meta description | Search snippet candidate and generated description tag | `Counselling for polyamory, open relationships and ENM across Australia, without assuming monogamy is the answer or treating relationship structure as the problem.` |
| Canonical URL | Search canonical signal | `https://vivecounselling.com.au/polyamory-enm-counselling` |
| Robots directive | Indexability policy | No route-level robots directive. |
| Open Graph title | Social preview title | `Counselling for Polyamory, Open Relationships and ENM \| Vive Counselling` |
| Open Graph description | Social preview description | `Counselling for polyamory, open relationships and ENM across Australia, without assuming monogamy is the answer or treating relationship structure as the problem.` |
| Open Graph URL | Social preview canonical URL | `https://vivecounselling.com.au/polyamory-enm-counselling` |
| Open Graph image | Social preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Open Graph image alt | Social preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Twitter card | Twitter/X preview card type | `summary_large_image` |
| Twitter title | Twitter/X preview title | `Counselling for Polyamory, Open Relationships and ENM \| Vive Counselling` |
| Twitter description | Twitter/X preview description | `Counselling for polyamory, open relationships and ENM across Australia, without assuming monogamy is the answer or treating relationship structure as the problem.` |
| Twitter image | Twitter/X preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Twitter image alt | Twitter/X preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Structured data | JSON-LD or intentional absence | A `WebPage` whose `mainEntity` is the route-specific polyamory, open-relationships and ENM `Service`, linked to the site-wide provider and umbrella counselling Service. |

## `/lgbtqia-affirming-counselling` - LGBTQIA+

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / first-response heading | Component-rendered first-response heading reference | `LGBTQIA+ affirming counselling and therapy` |
| HTML title | Browser tab, search title, generated `<title>` | `LGBTQIA+ Affirming Counselling \| Vive Counselling` |
| Meta description | Search snippet candidate and generated description tag | `LGBTQIA+ affirming counselling with Joel Griffiths for adults across Australia. Perth-based online counselling for sexuality, gender, relationships and other concerns.` |
| Canonical URL | Search canonical signal | `https://vivecounselling.com.au/lgbtqia-affirming-counselling` |
| Robots directive | Indexability policy | No route-level robots directive. |
| Open Graph title | Social preview title | `LGBTQIA+ Affirming Counselling \| Vive Counselling` |
| Open Graph description | Social preview description | `LGBTQIA+ affirming counselling with Joel Griffiths for adults across Australia. Perth-based online counselling for sexuality, gender, relationships and other concerns.` |
| Open Graph URL | Social preview canonical URL | `https://vivecounselling.com.au/lgbtqia-affirming-counselling` |
| Open Graph image | Social preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Open Graph image alt | Social preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Twitter card | Twitter/X preview card type | `summary_large_image` |
| Twitter title | Twitter/X preview title | `LGBTQIA+ Affirming Counselling \| Vive Counselling` |
| Twitter description | Twitter/X preview description | `LGBTQIA+ affirming counselling with Joel Griffiths for adults across Australia. Perth-based online counselling for sexuality, gender, relationships and other concerns.` |
| Twitter image | Twitter/X preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Twitter image alt | Twitter/X preview image accessibility text | `Vive Counselling social preview card featuring Joel Griffiths.` |
| Structured data | JSON-LD or intentional absence | A `WebPage` whose `mainEntity` is the route-specific LGBTQIA+ affirming `Service`, linked to the site-wide provider and umbrella counselling Service. |

## `/contact` - Contact/Fees

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / first-response heading | Component-rendered first-response heading reference | `To populate` |
| HTML title | Browser tab, search title, generated `<title>` | `To populate` |
| Meta description | Search snippet candidate and generated description tag | `To populate` |
| Canonical URL | Search canonical signal | `To populate` |
| Robots directive | Indexability policy | `To populate` |
| Open Graph title | Social preview title | `To populate` |
| Open Graph description | Social preview description | `To populate` |
| Open Graph URL | Social preview canonical URL | `To populate` |
| Open Graph image | Social preview image URL | `To populate` |
| Open Graph image alt | Social preview image accessibility text | `To populate` |
| Twitter card | Twitter/X preview card type | `To populate` |
| Twitter title | Twitter/X preview title | `To populate` |
| Twitter description | Twitter/X preview description | `To populate` |
| Twitter image | Twitter/X preview image URL | `To populate` |
| Twitter image alt | Twitter/X preview image accessibility text | `To populate` |
| Structured data | JSON-LD or intentional absence | `FAQPage` for the two visible Contact/Fees questions. |

## Special URL States

| URL state | Where it is used | Metadata text / value |
|---|---|---|
| `/about` redirect | Alias route for Working with Joel | `To populate` |
| `/fees` redirect | Alias route for Contact/Fees | `To populate` |
| Unknown public URL | Not-found response state and indexability policy | `To populate` |
| Generated `404.html` fallback | App fallback shell for missing routes | `To populate` |

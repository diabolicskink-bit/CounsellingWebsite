# SEO Metadata Inventory

This is the editable metadata inventory companion for `LAUNCH-3`.

Use this document to see route metadata at a glance. It is not a pass/fail audit and does not prove that a value has been checked in generated HTML, browser state, social previews, or live search tools. Use [seo-metadata-launch.md](seo-metadata-launch.md) for launch checklist status and evidence notes.

## How To Use

Populate the tables from the most appropriate source for the review task: `src/data/routeMetadata.json`, generated HTML, hydrated browser head metadata, live-domain responses, social preview checks, or structured-data inspection.

Leave a value as `To populate` until it has been intentionally copied in. If a value is intentionally absent, write that plainly, such as `None`, `No route-level robots directive`, or `Intentionally absent`.

## Global Metadata

| Shared metadata field | Where it is used | Metadata text / value |
|---|---|---|
| Site name | Generated head metadata and social preview context | `To populate` |
| Canonical origin | Canonical URLs, sitemap URLs, and absolute social URLs | `To populate` |
| Shared social image | Open Graph and Twitter/X image metadata | `To populate` |
| Shared social image alt | Open Graph and Twitter/X image alt metadata | `To populate` |
| Theme colour | Browser theme colour metadata and web app identity | `To populate` |
| Background colour | Web manifest app background | `To populate` |
| Favicons and app icons | Browser tab, device shortcuts, and installed app identity | `To populate` |
| Web manifest | Installed app identity and icon references | `To populate` |
| Robots policy | Site-wide crawl policy | `To populate` |
| Sitemap | Search crawler URL discovery | `To populate` |
| Structured data policy | JSON-LD or intentional absence across the site | Home emits a linked `WebSite`, `Organization`, and `Person` graph. Inclusion and Contact/Fees emit `FAQPage`; the three draft Inclusion child routes also emit `FAQPage` while remaining `noindex, nofollow`. `Service`, credential, address, and local-business schema are intentionally absent. |

## `/` - Home

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / static shell heading | First-response shell and visible page heading reference | `Counselling and Psychotherapy` |
| HTML title | Browser tab, search title, generated `<title>` | `Vive Counselling | Therapy for Adults Across Australia` |
| Meta description | Search snippet candidate and generated description tag | `Counselling and therapy for adults across Australia. Direct, thoughtful and inclusive support for anxiety, relationships, shame, trauma and sexuality.` |
| Canonical URL | Search canonical signal | `https://vivecounselling.com.au/` |
| Robots directive | Indexability policy | No route-level robots directive. |
| Open Graph title | Social preview title | `Vive Counselling | Therapy for Adults Across Australia` |
| Open Graph description | Social preview description | `Counselling and therapy for adults across Australia. Direct, thoughtful and inclusive support for anxiety, relationships, shame, trauma and sexuality.` |
| Open Graph URL | Social preview canonical URL | `https://vivecounselling.com.au/` |
| Open Graph image | Social preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Open Graph image alt | Social preview image accessibility text | `Vive Counselling social preview card for online counselling across Australia with Joel Griffiths.` |
| Twitter card | Twitter/X preview card type | `summary_large_image` |
| Twitter title | Twitter/X preview title | `Vive Counselling | Therapy for Adults Across Australia` |
| Twitter description | Twitter/X preview description | `Counselling and therapy for adults across Australia. Direct, thoughtful and inclusive support for anxiety, relationships, shame, trauma and sexuality.` |
| Twitter image | Twitter/X preview image URL | `https://vivecounselling.com.au/og-vive-counselling.png` |
| Twitter image alt | Twitter/X preview image accessibility text | `Vive Counselling social preview card for online counselling across Australia with Joel Griffiths.` |
| Structured data | JSON-LD or intentional absence | A linked JSON-LD graph identifies the `WebSite`, a minimal `Organization` using the public business identity and Kink Aware Professionals directory listing, and Joel Griffiths as a `Person` linked to Vive through `worksFor` with his ACA profile in `sameAs`. |

## `/working-with-joel` - Working with Joel

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / static shell heading | First-response shell and visible page heading reference | `To populate` |
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
| Structured data | JSON-LD or intentional absence | `To populate` |

## `/inclusion` - Inclusion Hub

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / static shell heading | First-response shell and visible page heading reference | `To populate` |
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
| Structured data | JSON-LD or intentional absence | `To populate` |

## `/inclusion/kink-bdsm` - Kink and BDSM

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / static shell heading | First-response shell and visible page heading reference | `To populate` |
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
| Structured data | JSON-LD or intentional absence | `To populate` |

## `/inclusion/enm-polyamory` - ENM and polyamory

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / static shell heading | First-response shell and visible page heading reference | `To populate` |
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
| Structured data | JSON-LD or intentional absence | `To populate` |

## `/inclusion/lgbtqia` - LGBTQIA+

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / static shell heading | First-response shell and visible page heading reference | `To populate` |
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
| Structured data | JSON-LD or intentional absence | `To populate` |

## `/contact` - Contact/Fees

| Metadata field | Where it is used | Metadata text / value |
|---|---|---|
| H1 / static shell heading | First-response shell and visible page heading reference | `To populate` |
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
| Structured data | JSON-LD or intentional absence | `To populate` |

## Special URL States

| URL state | Where it is used | Metadata text / value |
|---|---|---|
| `/about` redirect | Alias route for Working with Joel | `To populate` |
| `/fees` redirect | Alias route for Contact/Fees | `To populate` |
| Unknown public URL | Not-found response state and indexability policy | `To populate` |
| Generated `404.html` fallback | App fallback shell for missing routes | `To populate` |

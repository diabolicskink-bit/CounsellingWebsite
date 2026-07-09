# SEO and Discoverability Review - 2026-07-08

## Scope

Reviewed the currently allowed public pages:

- Home: `https://vivecounselling.com.au/`
- Working with Joel: `https://vivecounselling.com.au/working-with-joel`
- Inclusion: `https://vivecounselling.com.au/inclusion`
- Contact: `https://vivecounselling.com.au/contact`

The review covered live indexability, metadata, sitemap and robots behaviour, redirects, draft-page exclusion, page experience, structured data, counselling trust signals, and visitor search intent.

## Executive Verdict

The site is in a good technical SEO position for the pages currently allowed. The four launch pages are live, indexable, canonicalised, present in the sitemap, absent from robots blocking, and scoring very well in Lighthouse. The content is also people-first: it is specific, grounded, non-generic, and likely to help the right visitors understand whether Joel's practice is a fit.

The biggest gap is not basic SEO setup. It is discoverability depth and trust completion: search engines can find the site, but the site would be stronger with a working social image, Search Console submission, more explicit trust/practical details, modest site identity structured data, and eventually fully developed public pages for high-intent inclusion topics.

## Live Technical Checks

### Passed

- All four allowed pages return `200`.
- All four allowed pages have self-referencing canonical URLs.
- No allowed page has `noindex` or an `X-Robots-Tag` block.
- `robots.txt` allows crawling and points to the sitemap.
- `sitemap.xml` contains exactly the four allowed pages.
- Draft inclusion child routes are excluded from the sitemap and carry `noindex, nofollow`.
- Unknown URLs return `404` and are noindexed.
- `/about` redirects to `/working-with-joel`.
- `/fees` redirects to `/contact`.
- Live Google Analytics tag is present for measurement ID `G-KMY717JXMC`.
- Lighthouse desktop scores:
  - Home: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
  - Working with Joel: Performance 93, Accessibility 100, Best Practices 100, SEO 100.
  - Inclusion: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
  - Contact: Performance 100, Accessibility 100, Best Practices 100, SEO 100.

### Failed

- `https://vivecounselling.com.au/og-vive-counselling.png` returns `404`.
- All page metadata references this missing image via Open Graph/Twitter image metadata.

This is the clearest technical fix. It affects social previews, link sharing, perceived polish, and trust. It is already tracked as `DEBT-26`.

Update: later on 2026-07-08, the shared social preview image was generated at `public/og-vive-counselling.png`, and `DEBT-26` was resolved. The historical finding above records the state of the original live review.

## Priority Findings

### P1 - Add the Missing Social Image

Current metadata points to `/og-vive-counselling.png`, but the live file is missing. Add a deliberate 1200 x 630 social image at `public/og-vive-counselling.png`, or update the metadata to reference a real production asset.

Update: completed later on 2026-07-08 with a 1200 x 630 Vive Counselling social preview PNG.

The image should feel specific to Vive Counselling rather than generic. A calm branded treatment with the practice name, Joel's name, "Online counselling across Australia", and a portrait or appropriate brand visual would be stronger than a decorative abstract card.

Relevant source: `src/data/routeMetadata.json`.

### P1 - Confirm Google Search Console Setup

Search Console status could not be verified from the repo. For launch visibility, verify the domain property for `vivecounselling.com.au`, submit `https://vivecounselling.com.au/sitemap.xml`, and use URL Inspection / request indexing for the four allowed pages.

Analytics confirms visits once they happen. Search Console is the tool that will show whether Google has discovered, crawled, indexed, and shown the pages for real search queries.

### P2 - Strengthen Trust Details for a Counselling Site

The site already has a distinctive, ethical voice. For counselling, search visibility and conversion both depend heavily on trust and clarity. The main remaining visitor questions are already tracked in backlog:

- Privacy and confidentiality: `SITE-11`.
- Crisis support: `SITE-12`.
- Availability and reply-time expectations: `SITE-14`.
- Rebates, payment, and cancellation clarity: `SITE-15`.
- Initial consult flow: `SITE-16`.
- Credentials and registration clarity: `SITE-17`.

These are not just conversion details. For a health-adjacent service, they also support the kind of trust and expertise signals Google asks site owners to consider for people-first content.

### P2 - Add Modest Site Identity Structured Data

The site now emits homepage `WebSite` structured data for the preferred Google site-name signal. It also emits `FAQPage` structured data on Inclusion and Contact, but does not yet emit `Organization`, `Person`, or service identity structured data.

Recommended future structured data:

- `Organization` for Vive Counselling.
- `Person` for Joel Griffiths.
- `areaServed`: Australia.
- `url`: `https://vivecounselling.com.au/`.
- Contact details that are already public.
- Credentials only if they are verified and stable.

Be cautious with `LocalBusiness` or Google Business Profile assumptions. Google's Business Profile rules generally require either a customer-facing location or a service-area business that visits customers. If the practice is online-only, check eligibility before creating or optimising a profile.

### P2 - Tune Page Titles Toward Search Intent

Current titles are technically good and pass audit checks. They could be made a little more search-explicit without keyword stuffing:

- Home: `Online Counselling Across Australia | Vive Counselling`.
- Working with Joel: `Joel Griffiths, Online Counsellor | Vive Counselling`.
- Inclusion: `Kink, ENM and LGBTQIA+ Inclusive Counselling | Vive Counselling`.
- Contact: `Get in Touch | Vive Counselling`.

The current Inclusion title is descriptive but long and abstract. Naming the specific communities represented on the page better matches likely high-intent searches.

### P2 - Accept the Tradeoff of Keeping Child Pages Hidden

The current setup correctly keeps draft inclusion child pages out of search. That is the right choice while they are not ready.

However, discoverability for searches such as "kink aware counselling", "polyamory counselling", "ENM counselling", and "LGBTQIA affirming counselling" will be limited while those topics only live inside the Inclusion hub. When the content is ready, fully developed public child pages would likely be the strongest organic growth lever.

### P3 - Improve Snippet-Level Copy Polish

Two Inclusion FAQ answers begin with "No." in a way that may read oddly in search snippets and screen-reader extraction. Consider tightening those answers so the first sentence directly answers the question.

Also check the extracted heading text around "Known before you arrive.Not learned as you go." The visual layout may be fine, but the extracted text has no space between sentences.

## Page-by-Page Notes

### Home

Strong launch page. It immediately says "Online counselling across Australia" and gives a clear emotional and practical positioning. It also names kink, ENM, and LGBTQIA+ awareness without turning the page into a keyword list.

Main improvements:

- Fix missing social image.
- Consider a slightly more search-standard title casing/order.
- Add Organization/Person structured data when site identity facts are final.

### Working with Joel

This page does good human work. It establishes Joel as an ACA-registered counsellor, based in Perth, working online across Australia, and explains what therapy with him feels like.

Main improvements:

- Title could better name the search entity: Joel + online counsellor.
- Credential and registration details could be easier to verify or scan.
- Performance is still good, but the portrait-heavy page is the one route below 100 in Lighthouse performance.

### Inclusion

This is the strongest topical SEO page. It clearly covers kink, BDSM, ENM, polyamory, LGBTQIA+ clients, shame, identity, and relationship diversity in a credible, non-performative way.

Main improvements:

- Shorten and sharpen the title around the exact topics people search for.
- Eventually split mature subtopics into public pages when ready.
- Add polish to a couple of FAQ openings.

### Contact

This page is practical and indexable. It includes fee information, session length, online delivery, contact form, and FAQ schema.

Main improvements:

- Add clearer crisis options and response-time expectations.
- Clarify payment, rebates, cancellation, and first-step flow.
- Consider a title that includes "online counselling fees".

## Recommended Action Plan

1. Add the missing social image.
2. Verify Search Console, submit the sitemap, and request indexing for the four allowed pages.
3. Update page titles where the wording feels acceptable.
4. Add practical trust details from the existing backlog items.
5. Add modest Organization/Person structured data once the public identity details are final.
6. When ready, develop and index the inclusion child pages as focused, high-quality public resources.

## Sources

- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, title links: https://developers.google.com/search/docs/appearance/title-link
- Google Search Central, meta descriptions: https://developers.google.com/search/docs/appearance/snippet
- Google Search Central, sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central, canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central, image SEO and social images: https://developers.google.com/search/docs/appearance/google-images
- Google Search Central, helpful and reliable people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Console Help: https://support.google.com/webmasters/answer/9128668
- Google Business Profile eligibility guidance: https://support.google.com/business/answer/3038177

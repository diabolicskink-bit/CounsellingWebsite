# Launch SEO And Metadata Checklist

This is the working checklist artifact for `LAUNCH-3`.

For a route-by-route metadata inventory, use [seo-metadata-inventory.md](seo-metadata-inventory.md).

Each item starts with a status label. The item describes the launch condition that should be true for visitors, search crawlers, and social previews. The note is for what is known, what is unresolved, or which `SITE-*` / `DEBT-*` item owns a gap.

Do not use `Pass` to mean "looked at it." Use `Pass` only when the condition is true enough for launch.

## Status Labels

- `Not checked`: No review has been recorded yet.
- `Pass`: Checked and acceptable for launch.
- `Partial`: Checked, but one or more accepted or tracker-linked gaps remain.
- `Fail`: Checked and not acceptable for launch until resolved or linked.
- `N/A`: The condition does not apply.

## Review Standard

Review generated files, served route responses, and hydrated browser state where relevant. Notes should name what was checked, such as generated HTML, runtime head metadata, sitemap, robots, social image response, redirect response, or not-found response.

- Canonical public pages should return `200`.
- Redirect aliases should resolve through the intended one-hop redirect.
- Unknown public URLs should expose a not-found response state and `noindex, nofollow`.
- Non-pass notes link the relevant `SITE-*` / `DEBT-*` item or state explicit launch acceptance.

## Global Metadata Outputs

- `Not checked` Build prerendering generates metadata artifacts for every intended public route.
  - Note:

- `Not checked` The route metadata source contains every intended public route and no development or test routes.
  - Note:

- `Not checked` The generated sitemap includes only intended indexable public pages.
  - Note:

- `Not checked` The generated robots policy is intentional for launch and points at the generated sitemap.
  - Note:

- `Not checked` Canonical origin uses the intended launch domain or an explicitly accepted temporary origin consistently.
  - Note:

- `Not checked` Canonical and social URL values are absolute where crawlers and social previews expect absolute URLs.
  - Note:

- `Not checked` Site HTML includes correct `lang` and viewport metadata.
  - Note:

- `Not checked` Favicons, app icons, and web manifest resolve from their configured public paths.
  - Note:

- `Pass` The shared social image asset exists at the configured path and is publicly served.
  - Note: Checked `public/og-vive-counselling.png` and built preview `/og-vive-counselling.png`. The configured shared social image path now serves the generated Vive Counselling social preview PNG.

- `Pass` Shared social image dimensions and social image alt metadata match generated metadata expectations.
  - Note: Checked PNG dimensions and generated head metadata. `/og-vive-counselling.png` is 1200x630, and `og:image:alt` / `twitter:image:alt` use the configured social preview alt text.

- `Not checked` Structured data is intentionally absent, or valid and aligned with public claims if present.
  - Note:

## `/` - Home

- `Pass` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - Note: Checked `src/data/routeMetadata.json`, `dist/index.html`, and built preview `/`. Title is "Vive Counselling | Online counselling across Australia" and is unique among the seven public route titles.

- `Pass` Meta description is present, human-readable, and matches visible page content.
  - Note: Checked route metadata, generated HTML, direct preview head, and visible Home page hero/topic content. Description matches the page's online counselling across Australia positioning and visible themes around anxiety, relationships, shame, trauma, sexuality, and inclusive support.

- `Pass` Canonical URL resolves to this route on the intended launch origin.
  - Note: Checked generated HTML and direct preview head. Canonical is `https://vivecounselling.com.au/`, matching the configured apex launch origin and Home route.

- `Pass` Canonical public URL returns a `200` response.
  - Note: Checked built preview route `/`; it returned `200` with `text/html`. Live Vercel smoke testing remains tracked separately by `DEBT-24`.

- `Pass` Indexability policy is not blocked by `robots.txt`, meta robots, or `X-Robots-Tag` unless intentionally accepted for launch.
  - Note: Checked generated `robots.txt`, direct preview `/`, generated and hydrated head, and response headers. Robots allows all, Home has no route-level robots meta tag, and the preview response had no `X-Robots-Tag` header.

- `Pass` Sitemap output includes this route exactly once.
  - Note: Checked generated `dist/sitemap.xml`. It includes exact `<loc>https://vivecounselling.com.au/</loc>` once.

- `Pass` Open Graph and Twitter metadata include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, and image metadata that match this page purpose.
  - Note: Checked `dist/index.html` and direct preview head. OG/Twitter title, description, URL, card type, image URL, image dimensions, and social image alt metadata are present and match the Home route purpose.

- `Pass` Page uses the intended route-specific social image or an accepted shared fallback with correct social image alt metadata.
  - Note: Home uses the configured shared fallback social image. Built preview serves `/og-vive-counselling.png`, and generated social image alt metadata matches the configured asset.

- `Pass` Generated initial HTML/head metadata matches expected route metadata.
  - Note: Checked `dist/index.html` against `src/data/routeMetadata.json`. Generated title, description, canonical, OG, and Twitter metadata match the Home route metadata and configured site metadata.

- `Partial` Hydrated and client-side navigation metadata remains correct, or any known gap is linked to `DEBT-27`.
  - Note: Direct hydrated load of `/` preserved the expected title, description, canonical, OG, and Twitter metadata. Navigating client-side from `/inclusion` to `/` updated title and description but left canonical, OG, and Twitter title/description/URL on the Inclusion values. Tracked by `DEBT-27`.

- `Pass` Search and social snippet wording avoids misleading therapeutic claims, overpromising outcomes, or pathologising language.
  - Note: Checked title and description against project direction and visible Home copy. Wording describes online counselling and areas people bring without promising outcomes, pathologising identities or experiences, or overstating clinical claims.

## `/working-with-joel` - Working with Joel

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - Note:

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - Note:

- `Not checked` Canonical URL resolves to this route on the intended launch origin.
  - Note:

- `Not checked` Canonical public URL returns a `200` response.
  - Note:

- `Not checked` Indexability policy is not blocked by `robots.txt`, meta robots, or `X-Robots-Tag` unless intentionally accepted for launch.
  - Note:

- `Not checked` Sitemap output includes this route exactly once.
  - Note:

- `Not checked` Open Graph and Twitter metadata include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, and image metadata that match this page purpose.
  - Note:

- `Not checked` Page uses the intended route-specific social image or an accepted shared fallback with correct social image alt metadata.
  - Note:

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.
  - Note:

- `Not checked` Hydrated and client-side navigation metadata remains correct, or any known gap is linked to `DEBT-27`.
  - Note:

- `Not checked` Search and social snippet wording avoids misleading therapeutic claims, overpromising outcomes, or pathologising language.
  - Note:

## `/inclusion` - Inclusion Hub

- `Pass` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - Note: Checked `src/data/routeMetadata.json`, `dist/inclusion.html`, and built preview `/inclusion`. Title is "Inclusive Counselling for Diverse Relationships, Sexualities and Identities | Vive Counselling" and is unique among the seven public route titles.

- `Pass` Meta description is present, human-readable, and matches visible page content.
  - Note: Checked route metadata, generated HTML, and direct preview head. Description matches the visible Inclusion Hub content around inclusive counselling, relationships, sexuality, identity, and non-shaming support.

- `Pass` Canonical URL resolves to this route on the intended launch origin.
  - Note: Checked generated HTML and direct preview head. Canonical is `https://vivecounselling.com.au/inclusion`, matching the configured apex launch origin and route.

- `Pass` Canonical public URL returns a `200` response.
  - Note: Checked built preview route `/inclusion`; it returned `200` with `text/html`. Live Vercel smoke testing remains tracked separately by `DEBT-24`.

- `Pass` Indexability policy is not blocked by `robots.txt`, meta robots, or `X-Robots-Tag` unless intentionally accepted for launch.
  - Note: Checked generated `robots.txt`, direct preview `/inclusion`, and generated head. Robots allows all, `/inclusion` has no route-level robots meta tag, and the preview response had no `X-Robots-Tag` header.

- `Pass` Sitemap output includes this route exactly once.
  - Note: Checked generated `dist/sitemap.xml`. It includes exact `<loc>https://vivecounselling.com.au/inclusion</loc>` once, while draft Inclusion child routes stay excluded.

- `Pass` Open Graph and Twitter metadata include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, and image metadata that match this page purpose.
  - Note: Checked `dist/inclusion.html` and direct preview head. OG/Twitter title, description, URL, card type, image URL, image dimensions, and social image alt metadata are present and match the Inclusion Hub route purpose.

- `Pass` Page uses the intended route-specific social image or an accepted shared fallback with correct social image alt metadata.
  - Note: `/inclusion` uses the configured shared fallback social image. Built preview serves `/og-vive-counselling.png` as a 1200x630 PNG, and the generated social image alt metadata matches the configured asset.

- `Pass` Generated initial HTML/head metadata matches expected route metadata.
  - Note: Checked `dist/inclusion.html` against `src/data/routeMetadata.json`. Generated title, description, canonical, OG, and Twitter metadata match the route metadata and configured site metadata.

- `Partial` Hydrated and client-side navigation metadata remains correct, or any known gap is linked to `DEBT-27`.
  - Note: Direct hydrated load of `/inclusion` preserved the expected title, description, canonical, OG, and Twitter metadata. Navigating client-side from `/` to `/inclusion` updated title and description but left canonical, OG, and Twitter title/description on the Home values. Tracked by `DEBT-27`.

- `Pass` Search and social snippet wording avoids misleading therapeutic claims, overpromising outcomes, or pathologising language.
  - Note: Checked title and description against project direction. Wording describes inclusive, non-shaming support without promising outcomes, pathologising identities or relationship structures, or overstating clinical claims.

## `/inclusion/kink-bdsm` - Kink and BDSM

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - Note:

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - Note:

- `Not checked` Canonical URL resolves to this route on the intended launch origin.
  - Note:

- `Not checked` Canonical public URL returns a `200` response.
  - Note:

- `Not checked` Indexability policy is not blocked by `robots.txt`, meta robots, or `X-Robots-Tag` unless intentionally accepted for launch.
  - Note:

- `Not checked` Sitemap output includes this route exactly once.
  - Note:

- `Not checked` Open Graph and Twitter metadata include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, and image metadata that match this page purpose.
  - Note:

- `Not checked` Page uses the intended route-specific social image or an accepted shared fallback with correct social image alt metadata.
  - Note:

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.
  - Note:

- `Not checked` Hydrated and client-side navigation metadata remains correct, or any known gap is linked to `DEBT-27`.
  - Note:

- `Not checked` Search and social snippet wording avoids misleading therapeutic claims, overpromising outcomes, or pathologising language.
  - Note:

## `/inclusion/enm-polyamory` - ENM and polyamory

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - Note:

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - Note:

- `Not checked` Canonical URL resolves to this route on the intended launch origin.
  - Note:

- `Not checked` Canonical public URL returns a `200` response.
  - Note:

- `Not checked` Indexability policy is not blocked by `robots.txt`, meta robots, or `X-Robots-Tag` unless intentionally accepted for launch.
  - Note:

- `Not checked` Sitemap output includes this route exactly once.
  - Note:

- `Not checked` Open Graph and Twitter metadata include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, and image metadata that match this page purpose.
  - Note:

- `Not checked` Page uses the intended route-specific social image or an accepted shared fallback with correct social image alt metadata.
  - Note:

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.
  - Note:

- `Not checked` Hydrated and client-side navigation metadata remains correct, or any known gap is linked to `DEBT-27`.
  - Note:

- `Not checked` Search and social snippet wording avoids misleading therapeutic claims, overpromising outcomes, or pathologising language.
  - Note:

## `/inclusion/lgbtqia` - LGBTQIA+

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - Note:

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - Note:

- `Not checked` Canonical URL resolves to this route on the intended launch origin.
  - Note:

- `Not checked` Canonical public URL returns a `200` response.
  - Note:

- `Not checked` Indexability policy is not blocked by `robots.txt`, meta robots, or `X-Robots-Tag` unless intentionally accepted for launch.
  - Note:

- `Not checked` Sitemap output includes this route exactly once.
  - Note:

- `Not checked` Open Graph and Twitter metadata include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, and image metadata that match this page purpose.
  - Note:

- `Not checked` Page uses the intended route-specific social image or an accepted shared fallback with correct social image alt metadata.
  - Note:

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.
  - Note:

- `Not checked` Hydrated and client-side navigation metadata remains correct, or any known gap is linked to `DEBT-27`.
  - Note:

- `Not checked` Search and social snippet wording avoids misleading therapeutic claims, overpromising outcomes, or pathologising language.
  - Note:

## `/contact` - Contact/Fees

- `Not checked` Page title is non-empty, unique among public routes, and accurate to the route purpose.
  - Note:

- `Not checked` Meta description is present, human-readable, and matches visible page content.
  - Note:

- `Not checked` Canonical URL resolves to this route on the intended launch origin.
  - Note:

- `Not checked` Canonical public URL returns a `200` response.
  - Note:

- `Not checked` Indexability policy is not blocked by `robots.txt`, meta robots, or `X-Robots-Tag` unless intentionally accepted for launch.
  - Note:

- `Not checked` Sitemap output includes this route exactly once.
  - Note:

- `Not checked` Open Graph and Twitter metadata include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, and image metadata that match this page purpose.
  - Note:

- `Not checked` Page uses the intended route-specific social image or an accepted shared fallback with correct social image alt metadata.
  - Note:

- `Not checked` Generated initial HTML/head metadata matches expected route metadata.
  - Note:

- `Not checked` Hydrated and client-side navigation metadata remains correct, or any known gap is linked to `DEBT-27`.
  - Note:

- `Not checked` Search and social snippet wording avoids misleading therapeutic claims, overpromising outcomes, or pathologising language.
  - Note:

## Redirect Routes

- `Not checked` `/about` returns the intended one-hop redirect status to `/working-with-joel`.
  - Note:

- `Not checked` `/about` is excluded as a standalone sitemap URL.
  - Note:

- `Not checked` `/about` does not expose stale standalone canonical metadata.
  - Note:

- `Not checked` `/fees` returns the intended one-hop redirect status to `/contact`.
  - Note:

- `Not checked` `/fees` is excluded as a standalone sitemap URL.
  - Note:

- `Not checked` `/fees` does not expose stale standalone canonical metadata.
  - Note:

## Not-Found Route

- `Not checked` Unknown public URLs expose a not-found response state and `noindex, nofollow`.
  - Note:

- `Not checked` Generated fallback metadata does not present missing URLs as normal indexable public pages.
  - Note:

- `Not checked` Not-found title and description identify the missing-page state and do not present it as a normal service page.
  - Note:

import { readFileSync } from "node:fs";
import { expect, test } from "playwright/test";
import { getArticleRouteMetadata } from "../../../src/content/articles/manifest";
import type { RouteMetadata, SiteMetadata } from "../../../src/data/routeMetadata";

const routeMetadataData = JSON.parse(
  readFileSync(new URL("../../../src/data/routeMetadata.json", import.meta.url), "utf8"),
) as {
  site: SiteMetadata;
  routes: Record<string, RouteMetadata>;
};

const publicRouteMetadata: Record<string, RouteMetadata> = {
  ...routeMetadataData.routes,
  ...getArticleRouteMetadata(),
};
const publicRoutes = Object.keys(publicRouteMetadata);
const siteOrigin = (process.env.SITE_URL ?? routeMetadataData.site.defaultOrigin).replace(/\/$/, "");

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

test.describe("crawl output", () => {
  test("serves canonical first-response metadata, robots, and sitemap files", async ({ request }) => {
    const robotsResponse = await request.get("/robots.txt");
    const robots = await robotsResponse.text();
    const sitemapResponse = await request.get("/sitemap.xml");
    const sitemap = await sitemapResponse.text();

    expect(robotsResponse.ok()).toBeTruthy();
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${siteOrigin}/sitemap.xml`);
    expect(sitemapResponse.ok()).toBeTruthy();

    for (const route of publicRoutes) {
      const routeUrl = route === "/" ? `${siteOrigin}/` : `${siteOrigin}${route}`;
      const metadata = publicRouteMetadata[route];
      const routeResponse = await request.get(route);
      const routeHtml = await routeResponse.text();

      expect(routeResponse.ok()).toBeTruthy();
      expect(routeHtml).toContain(`<title>${escapeHtml(metadata.title)}</title>`);
      expect(routeHtml).toContain(
        `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
      );
      expect(routeHtml).toContain(`<link rel="canonical" href="${routeUrl}" />`);
      if (metadata.robots) {
        expect(routeHtml).toContain(`<meta name="robots" content="${metadata.robots}" />`);
        expect(sitemap).not.toContain(`<loc>${routeUrl}</loc>`);
      } else {
        expect(routeHtml).not.toContain('<meta name="robots"');
        expect(sitemap).toContain(`<loc>${routeUrl}</loc>`);

        if (metadata.lastModified) {
          expect(sitemap).toContain(
            `<url><loc>${routeUrl}</loc><lastmod>${metadata.lastModified}</lastmod></url>`,
          );
        }
      }
    }

    const crisisSupportUrl = `${siteOrigin}/crisis-support`;
    const crisisSupportLastModified = routeMetadataData.routes["/crisis-support"].lastModified;

    expect(crisisSupportLastModified).toBeTruthy();
    expect(sitemap).toContain(
      `<url><loc>${crisisSupportUrl}</loc><lastmod>${crisisSupportLastModified}</lastmod></url>`,
    );
  });
});
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  articleMetadata,
  getArticlePath,
  getArticleRouteMetadata,
} from "../../src/content/articles/manifest.ts";
import { renderRouteStructuredDataTag } from "../../scripts/route-structured-data.mjs";

const metadata = JSON.parse(
  await readFile(new URL("../../src/data/routeMetadata.json", import.meta.url), "utf8"),
);

function parseStructuredDataTag(tag) {
  const prefix = '<script type="application/ld+json">';
  const suffix = "</script>";

  assert.ok(tag?.startsWith(prefix));
  assert.ok(tag.endsWith(suffix));

  return JSON.parse(tag.slice(prefix.length, -suffix.length));
}

test("renders the intended structured-data graph for each supported public route", () => {
  const routeContracts = [
    ["/", "home", ["WebSite", "Organization", "Person", "Service"]],
    ["/working-with-joel", "profile", ["ProfilePage", "Person"]],
    ["/kink-bdsm-counselling", "specialist-service", ["WebPage", "Service"]],
    ["/polyamory-enm-counselling", "specialist-service", ["WebPage", "Service"]],
    ["/lgbtqia-affirming-counselling", "specialist-service", ["WebPage", "Service"]],
    ["/crisis-support", "crisis-support", ["MedicalWebPage", "BreadcrumbList"]],
  ];

  for (const [routePath, structuredDataType, expectedTypes] of routeContracts) {
    const structuredData = parseStructuredDataTag(renderRouteStructuredDataTag({
      routeMetadata: metadata.routes[routePath],
      routePath,
      siteMetadata: metadata.site,
      siteOrigin: metadata.site.defaultOrigin,
      structuredDataType,
    }));

    assert.deepEqual(
      structuredData["@graph"].map((node) => node["@type"]),
      expectedTypes,
      routePath,
    );
  }
});

test("fails clearly when a specialist route loses its service metadata", () => {
  const routePath = "/kink-bdsm-counselling";
  const siteMetadata = structuredClone(metadata.site);

  delete siteMetadata.specialistServices[routePath];

  assert.throws(
    () => renderRouteStructuredDataTag({
      routeMetadata: metadata.routes[routePath],
      routePath,
      siteMetadata,
      siteOrigin: metadata.site.defaultOrigin,
      structuredDataType: "specialist-service",
    }),
    /Specialist route is missing service metadata/,
  );
});

test("publishes the visible Crisis Support review and authorship details", () => {
  const routePath = "/crisis-support";
  const structuredData = parseStructuredDataTag(renderRouteStructuredDataTag({
    routeMetadata: metadata.routes[routePath],
    routePath,
    siteMetadata: metadata.site,
    siteOrigin: metadata.site.defaultOrigin,
    structuredDataType: "crisis-support",
  }));
  const page = structuredData["@graph"].find((node) => node["@type"] === "MedicalWebPage");
  const breadcrumb = structuredData["@graph"]
    .find((node) => node["@type"] === "BreadcrumbList");

  assert.ok(page);
  assert.ok(breadcrumb);
  assert.equal(page.dateModified, metadata.routes[routePath].lastModified);
  assert.equal(page.lastReviewed, metadata.routes[routePath].lastReviewed);
  assert.deepEqual(page.author, { "@id": `${metadata.site.defaultOrigin}/#organization` });
  assert.deepEqual(page.publisher, { "@id": `${metadata.site.defaultOrigin}/#organization` });
  assert.equal(breadcrumb.name, "Crisis support breadcrumb trail");
  assert.equal(
    breadcrumb.itemListElement.at(-1).item,
    `${metadata.site.defaultOrigin}${routePath}`,
  );
});

test("renders CollectionPage structured data for the article index", () => {
  const routePath = "/articles";
  const structuredData = parseStructuredDataTag(renderRouteStructuredDataTag({
    routeMetadata: metadata.routes[routePath],
    routePath,
    siteMetadata: metadata.site,
    siteOrigin: metadata.site.defaultOrigin,
    structuredDataType: "collection",
  }));

  assert.equal(structuredData["@type"], "CollectionPage");
  assert.equal(structuredData.url, `${metadata.site.defaultOrigin}${routePath}`);
});

test("renders article dates, authorship, and visible breadcrumb hierarchy", () => {
  for (const articleMetadataEntry of articleMetadata) {
    const routePath = getArticlePath(articleMetadataEntry.slug);
    const routeMetadata = getArticleRouteMetadata()[routePath];
    const structuredData = parseStructuredDataTag(renderRouteStructuredDataTag({
      routeMetadata,
      routePath,
      siteMetadata: metadata.site,
      siteOrigin: metadata.site.defaultOrigin,
      structuredDataType: "article",
    }));
    const page = structuredData["@graph"].find((node) => node["@type"] === "WebPage");
    const article = structuredData["@graph"].find((node) => node["@type"] === "Article");
    const breadcrumb = structuredData["@graph"]
      .find((node) => node["@type"] === "BreadcrumbList");
    const pageUrl = `${metadata.site.defaultOrigin}${routePath}`;

    assert.ok(page);
    assert.ok(article);
    assert.ok(breadcrumb);
    assert.deepEqual(page.breadcrumb, { "@id": `${pageUrl}#breadcrumb` });
    assert.equal(
      breadcrumb.name,
      `${articleMetadataEntry.title} breadcrumb trail`,
    );
    assert.deepEqual(breadcrumb.itemListElement, [
      {
        "@type": "ListItem",
        position: 1,
        name: "Articles",
        item: `${metadata.site.defaultOrigin}/articles`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: articleMetadataEntry.topic,
        item: pageUrl,
      },
    ]);
    assert.equal(article.headline, articleMetadataEntry.title);
    assert.equal(article.datePublished, articleMetadataEntry.publishedAt);
    assert.equal(
      article.dateModified,
      articleMetadataEntry.updatedAt ?? articleMetadataEntry.publishedAt,
    );
    assert.equal(article.author.name, articleMetadataEntry.author);
    assert.equal(
      routeMetadata.lastModified,
      articleMetadataEntry.updatedAt ?? articleMetadataEntry.publishedAt,
    );
  }
});

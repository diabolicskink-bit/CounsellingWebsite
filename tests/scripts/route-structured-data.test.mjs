import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
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

  assert.ok(page);
  assert.equal(page.dateModified, metadata.routes[routePath].lastModified);
  assert.equal(page.lastReviewed, metadata.routes[routePath].lastReviewed);
  assert.deepEqual(page.author, { "@id": `${metadata.site.defaultOrigin}/#organization` });
  assert.deepEqual(page.publisher, { "@id": `${metadata.site.defaultOrigin}/#organization` });
});

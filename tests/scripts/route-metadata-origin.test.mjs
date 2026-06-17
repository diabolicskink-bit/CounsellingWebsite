import assert from "node:assert/strict";
import { test } from "node:test";
import {
  defaultCanonicalOrigin,
  getSiteOrigin,
  normalizeSiteOrigin,
} from "../../scripts/route-metadata-origin.mjs";

const siteMetadata = {
  defaultOrigin: defaultCanonicalOrigin,
};

test("normalizes site origins without requiring a protocol", () => {
  assert.equal(normalizeSiteOrigin("example.com/contact"), "https://example.com");
  assert.equal(normalizeSiteOrigin("https://example.com/contact?from=test"), "https://example.com");
});

test("production without SITE_URL ignores unique VERCEL_URL and uses the default canonical origin", () => {
  const siteOrigin = getSiteOrigin(siteMetadata, {
    VERCEL_ENV: "production",
    VERCEL_URL: "counselling-website-mw34y55f3-diabolicskink-7990s-projects.vercel.app",
  });

  assert.equal(siteOrigin, defaultCanonicalOrigin);
});

test("SITE_URL normalizes and overrides the default canonical origin", () => {
  const siteOrigin = getSiteOrigin(siteMetadata, {
    SITE_URL: "vivecounselling.example/contact",
    VERCEL_ENV: "production",
    VERCEL_URL: "counselling-website-mw34y55f3-diabolicskink-7990s-projects.vercel.app",
  });

  assert.equal(siteOrigin, "https://vivecounselling.example");
});

test("production rejects localhost and loopback SITE_URL values", () => {
  assert.throws(
    () => getSiteOrigin(siteMetadata, { SITE_URL: "http://localhost:4287", VERCEL_ENV: "production" }),
    /Production SITE_URL cannot be a localhost or loopback URL/,
  );
  assert.throws(
    () => getSiteOrigin(siteMetadata, { SITE_URL: "http://127.0.0.1:4287", VERCEL_ENV: "production" }),
    /Production SITE_URL cannot be a localhost or loopback URL/,
  );
});

test("production rejects localhost and loopback default canonical values", () => {
  assert.throws(
    () =>
      getSiteOrigin(
        {
          defaultOrigin: "http://127.0.0.1:4287",
        },
        { VERCEL_ENV: "production" },
      ),
    /Production defaultOrigin cannot be a localhost or loopback URL/,
  );
});

test("preview builds can use VERCEL_URL", () => {
  const siteOrigin = getSiteOrigin(siteMetadata, {
    VERCEL_ENV: "preview",
    VERCEL_URL: "counselling-website-git-feature-diabolicskink-7990s-projects.vercel.app",
  });

  assert.equal(siteOrigin, "https://counselling-website-git-feature-diabolicskink-7990s-projects.vercel.app");
});

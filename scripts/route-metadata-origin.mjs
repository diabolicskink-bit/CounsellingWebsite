export const defaultCanonicalOrigin = "https://counselling-website-seven.vercel.app";

export function normalizeSiteOrigin(rawOrigin) {
  const origin = String(rawOrigin ?? "").trim();

  if (!origin) {
    throw new Error("Site origin is required.");
  }

  const withProtocol = origin.includes("://") ? origin : `https://${origin}`;
  const url = new URL(withProtocol);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`Site origin must use http or https: ${rawOrigin}`);
  }

  return url.origin;
}

function isLoopbackHostname(hostname) {
  const normalizedHostname = hostname.toLowerCase();

  return (
    normalizedHostname === "localhost" ||
    normalizedHostname === "0.0.0.0" ||
    normalizedHostname === "::1" ||
    normalizedHostname === "[::1]" ||
    /^127(?:\.\d{1,3}){3}$/.test(normalizedHostname)
  );
}

function assertProductionOrigin(siteOrigin, sourceLabel) {
  const { hostname } = new URL(siteOrigin);

  if (isLoopbackHostname(hostname)) {
    throw new Error(`Production ${sourceLabel} cannot be a localhost or loopback URL: ${siteOrigin}`);
  }
}

export function getSiteOrigin(siteMetadata, env = process.env) {
  const vercelEnv = env.VERCEL_ENV?.trim();

  if (env.SITE_URL) {
    const siteOrigin = normalizeSiteOrigin(env.SITE_URL);

    if (vercelEnv === "production") {
      assertProductionOrigin(siteOrigin, "SITE_URL");
    }

    return siteOrigin;
  }

  if (vercelEnv === "production") {
    const siteOrigin = normalizeSiteOrigin(siteMetadata.defaultOrigin);

    assertProductionOrigin(siteOrigin, "defaultOrigin");

    return siteOrigin;
  }

  if (env.VERCEL_URL) {
    return normalizeSiteOrigin(env.VERCEL_URL);
  }

  return normalizeSiteOrigin(siteMetadata.defaultOrigin);
}

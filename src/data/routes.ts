import type { PublicRoutePath } from "./routeMetadata";

export const publicRoutePaths = {
  articles: "/articles",
  contact: "/contact",
  crisisSupport: "/crisis-support",
  enmPolyamory: "/polyamory-enm-counselling",
  home: "/",
  inclusion: "/inclusive-counselling",
  kinkBdsm: "/kink-bdsm-counselling",
  lgbtqia: "/lgbtqia-affirming-counselling",
  privacyPolicy: "/privacy-policy",
  workingWithJoel: "/working-with-joel",
} as const satisfies Record<string, PublicRoutePath>;

// A virtual page: /fees redirects to Contact, and Fees links are tracked under it.
export const feesRoutePath = "/fees";

export const publicRedirectRoutes = [
  { path: "/about", to: publicRoutePaths.workingWithJoel },
  { path: feesRoutePath, to: publicRoutePaths.contact },
  { path: "/inclusion", to: publicRoutePaths.inclusion },
] as const;

export function normalizeRoutePath(pathname: string) {
  return pathname.toLowerCase().replace(/\/+$/, "") || "/";
}

export function getTrackedPagePath(pathname: string, state: unknown) {
  const isContactPage = normalizeRoutePath(pathname) === publicRoutePaths.contact;
  const isFeesLink = typeof state === "object"
    && state !== null
    && "trackedPagePath" in state
    && state.trackedPagePath === feesRoutePath;

  return isContactPage && isFeesLink ? feesRoutePath : pathname;
}

export const privateRoutePaths = {
  analytics: "/analytics",
  analyticsEnquiries: "/analytics/enquiries",
  analyticsExcluded: "/analytics/excluded",
  analyticsKeywords: "/analytics/keywords",
  analyticsPageViews: "/analytics/pages",
  analyticsReferrers: "/analytics/referrers",
} as const;

export function isPrivateRoutePath(pathname: string) {
  const normalizedPath = normalizeRoutePath(pathname);
  const analyticsRoot = privateRoutePaths.analytics;

  return normalizedPath === analyticsRoot || normalizedPath.startsWith(`${analyticsRoot}/`);
}

export const devRoutePaths = {
  articleEditor: "/article-editor",
  codexTestBed: "/codex-tb",
  designSystem: "/design-system",
  designSystemComponents: "/design-system/components",
  designSystemFoundations: "/design-system/foundations",
  designSystemPatterns: "/design-system/patterns",
  documents: "/documents",
  opusTestBed: "/opus-tb",
} as const;

const sharedChromePaths = new Set<string>([
  ...Object.values(publicRoutePaths).filter((path) => path !== publicRoutePaths.home),
  ...publicRedirectRoutes.map((route) => route.path),
  // API functions and Node tests load this module without Vite's import.meta.env.
  ...(import.meta.env?.DEV ? Object.values(devRoutePaths) : []),
]);

export function usesSharedChromePath(pathname: string) {
  const normalizedPath = normalizeRoutePath(pathname);

  return sharedChromePaths.has(normalizedPath)
    || normalizedPath.startsWith(`${publicRoutePaths.articles}/`);
}

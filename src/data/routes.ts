import type { PublicRoutePath } from "./routeMetadata";

export const publicRoutePaths = {
  contact: "/contact",
  crisisSupport: "/crisis-support",
  enmPolyamory: "/polyamory-enm-counselling",
  home: "/",
  inclusion: "/inclusive-counselling",
  kinkBdsm: "/kink-bdsm-counselling",
  lgbtqia: "/lgbtqia-affirming-counselling",
  workingWithJoel: "/working-with-joel",
} as const satisfies Record<string, PublicRoutePath>;

export const feesRoutePath = "/fees";

export const publicRedirectRoutes = [
  { path: "/about", to: publicRoutePaths.workingWithJoel },
  { path: feesRoutePath, to: publicRoutePaths.contact },
  { path: "/inclusion", to: publicRoutePaths.inclusion },
] as const;

export function getTrackedPagePath(pathname: string, state: unknown) {
  if (pathname.toLowerCase() !== publicRoutePaths.contact || !state || typeof state !== "object") {
    return pathname;
  }

  return (state as Record<string, unknown>).trackedPagePath === feesRoutePath
    ? feesRoutePath
    : pathname;
}

export const privateRoutePaths = {
  analytics: "/analytics",
  analyticsEnquiries: "/analytics/enquiries",
  analyticsExcluded: "/analytics/excluded",
  analyticsPageViews: "/analytics/pages",
} as const;

export function isPrivateRoutePath(pathname: string) {
  const normalizedPathname = pathname.toLowerCase();
  const analyticsRoot = privateRoutePaths.analytics;

  return normalizedPathname === analyticsRoot
    || normalizedPathname.startsWith(`${analyticsRoot}/`);
}

export const devRoutePaths = {
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
  ...(import.meta.env?.DEV ? Object.values(devRoutePaths) : []),
]);

export function usesSharedChromePath(pathname: string) {
  return sharedChromePaths.has(pathname);
}

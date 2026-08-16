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

export const publicRedirectRoutes = [
  { path: "/about", to: publicRoutePaths.workingWithJoel },
  { path: "/fees", to: publicRoutePaths.contact },
  { path: "/inclusion", to: publicRoutePaths.inclusion },
] as const;

export const privateRoutePaths = {
  analytics: "/analytics",
  analyticsEnquiries: "/analytics/enquiries",
} as const;

export function isPrivateRoutePath(pathname: string) {
  return Object.values(privateRoutePaths).some(
    (privatePath) => pathname === privatePath || pathname.startsWith(`${privatePath}/`),
  );
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

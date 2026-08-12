export const publicRoutePaths = {
  blog: "blog",
  contact: "contact",
  enmPolyamory: "polyamory-enm-counselling",
  home: "",
  inclusion: "inclusive-counselling",
  kinkBdsm: "kink-bdsm-counselling",
  lgbtqia: "lgbtqia-affirming-counselling",
  workingWithJoel: "working-with-joel",
} as const;

export function routeHref(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export const publicRedirectRoutes = [
  { path: "about", to: routeHref(publicRoutePaths.workingWithJoel) },
  { path: "fees", to: routeHref(publicRoutePaths.contact) },
  { path: "inclusion", to: routeHref(publicRoutePaths.inclusion) },
] as const;

export const devRoutePaths = {
  codexTestBed: "codex-tb",
  designSystem: "design-system",
  designSystemComponents: "design-system/components",
  designSystemFoundations: "design-system/foundations",
  designSystemPatterns: "design-system/patterns",
  documents: "documents",
  opusTestBed: "opus-tb",
} as const;

const sharedChromePaths = new Set([
  routeHref(publicRoutePaths.blog),
  routeHref(publicRoutePaths.contact),
  routeHref(publicRoutePaths.enmPolyamory),
  routeHref(publicRoutePaths.inclusion),
  routeHref(publicRoutePaths.kinkBdsm),
  routeHref(publicRoutePaths.lgbtqia),
  routeHref(publicRoutePaths.workingWithJoel),
  ...publicRedirectRoutes.map((route) => routeHref(route.path)),
  ...(import.meta.env.DEV ? Object.values(devRoutePaths).map((path) => routeHref(path)) : []),
]);

export function usesSharedChromePath(pathname: string) {
  const blogHref = routeHref(publicRoutePaths.blog);

  return sharedChromePaths.has(pathname) || pathname.startsWith(`${blogHref}/`);
}

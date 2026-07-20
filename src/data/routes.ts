export const publicRoutePaths = {
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
  designLanguage: "design-language",
  designLanguageComponents: "design-language/components",
  designLanguageFoundations: "design-language/foundations",
  designLanguageHeroes: "design-language/heroes",
  designLanguagePatterns: "design-language/patterns",
  documents: "documents",
  opusTestBed: "opus-tb",
} as const;

const sharedChromePaths = new Set([
  routeHref(publicRoutePaths.contact),
  routeHref(publicRoutePaths.enmPolyamory),
  routeHref(publicRoutePaths.inclusion),
  routeHref(publicRoutePaths.kinkBdsm),
  routeHref(publicRoutePaths.lgbtqia),
  routeHref(publicRoutePaths.workingWithJoel),
  ...publicRedirectRoutes.map((route) => routeHref(route.path)),
  ...(import.meta.env.DEV ? Object.values(devRoutePaths).map((path) => routeHref(path)) : []),
]);

const sharedChromePrefixes = [
  ...(import.meta.env.DEV ? [`${routeHref(devRoutePaths.designLanguage)}/`] : []),
];

export function usesSharedChromePath(pathname: string) {
  return sharedChromePaths.has(pathname) || sharedChromePrefixes.some((prefix) => pathname.startsWith(prefix));
}

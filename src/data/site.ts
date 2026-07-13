import { devRoutePaths, publicRoutePaths, routeHref, showDraftInclusionLinks } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: routeHref(publicRoutePaths.home) },
  { label: "Working with Joel", href: routeHref(publicRoutePaths.workingWithJoel) },
  {
    label: "Inclusion",
    href: routeHref(publicRoutePaths.inclusion),
    children: showDraftInclusionLinks
      ? [
          { label: "Kink & BDSM", href: routeHref(publicRoutePaths.kinkBdsm) },
          { label: "ENM & polyamory", href: routeHref(publicRoutePaths.enmPolyamory) },
          { label: "LGBTQIA+", href: routeHref(publicRoutePaths.lgbtqia) },
        ]
      : undefined,
  },
  ...(import.meta.env.DEV
    ? [
        {
          label: "Dev",
          href: routeHref(devRoutePaths.designLanguage),
          children: [
            {
              label: "Design",
              href: routeHref(devRoutePaths.designLanguage),
              children: [
                { label: "Foundations", href: routeHref(devRoutePaths.designLanguageFoundations) },
                { label: "Components", href: routeHref(devRoutePaths.designLanguageComponents) },
                { label: "Heroes", href: routeHref(devRoutePaths.designLanguageHeroes) },
                { label: "Patterns", href: routeHref(devRoutePaths.designLanguagePatterns) },
              ],
            },
            { label: "Documents", href: routeHref(devRoutePaths.documents) },
            {
              label: "Test Beds",
              href: routeHref(devRoutePaths.codexTestBed),
              children: [
                { label: "Codex TB", href: routeHref(devRoutePaths.codexTestBed) },
                { label: "Opus TB", href: routeHref(devRoutePaths.opusTestBed) },
              ],
            },
          ],
        },
      ]
    : []),
  { label: "Fees", href: routeHref(publicRoutePaths.contact) },
];

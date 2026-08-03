import { devRoutePaths, publicRoutePaths, routeHref } from "./routes";

export type NavItem = Readonly<{
  label: string;
  href: string;
  mobileOnly?: boolean;
  children?: readonly NavItem[];
}>;

export const socialProfileLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/joel.ropes/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vivecounselling/",
  },
] as const;

export const navItems: readonly NavItem[] = [
  { label: "Home", href: routeHref(publicRoutePaths.home) },
  { label: "Working with Joel", href: routeHref(publicRoutePaths.workingWithJoel) },
  {
    label: "Inclusion",
    href: routeHref(publicRoutePaths.inclusion),
    children: [
      { label: "Kink & BDSM", href: routeHref(publicRoutePaths.kinkBdsm) },
      { label: "ENM & polyamory", href: routeHref(publicRoutePaths.enmPolyamory) },
      { label: "LGBTQIA+", href: routeHref(publicRoutePaths.lgbtqia) },
    ],
  },
  {
    label: "Fees",
    href: routeHref(publicRoutePaths.contact),
  },
  {
    label: "Contact",
    href: routeHref(publicRoutePaths.contact),
    mobileOnly: true,
  },
  ...(import.meta.env.DEV
    ? [
        {
          label: "Dev",
          href: routeHref(devRoutePaths.designSystem),
          children: [
            { label: "Design system", href: routeHref(devRoutePaths.designSystem) },
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
];

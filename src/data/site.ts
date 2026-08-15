import { devRoutePaths, publicRoutePaths } from "./routes";

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
  { label: "Home", href: publicRoutePaths.home },
  { label: "Working with Joel", href: publicRoutePaths.workingWithJoel },
  {
    label: "Inclusion",
    href: publicRoutePaths.inclusion,
    children: [
      { label: "Kink & BDSM", href: publicRoutePaths.kinkBdsm },
      { label: "ENM & polyamory", href: publicRoutePaths.enmPolyamory },
      { label: "LGBTQIA+", href: publicRoutePaths.lgbtqia },
    ],
  },
  {
    label: "Fees",
    href: publicRoutePaths.contact,
  },
  {
    label: "Contact",
    href: publicRoutePaths.contact,
    mobileOnly: true,
  },
  ...(import.meta.env.DEV
    ? [
        {
          label: "Dev",
          href: devRoutePaths.designSystem,
          children: [
            { label: "Design system", href: devRoutePaths.designSystem },
            { label: "Documents", href: devRoutePaths.documents },
            {
              label: "Test Beds",
              href: devRoutePaths.codexTestBed,
              children: [
                { label: "Codex TB", href: devRoutePaths.codexTestBed },
                { label: "Opus TB", href: devRoutePaths.opusTestBed },
              ],
            },
          ],
        },
      ]
    : []),
];

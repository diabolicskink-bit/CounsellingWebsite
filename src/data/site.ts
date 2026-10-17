import { visitEventTypes } from "../contracts/visitEventContract";
import { devRoutePaths, feesRoutePath, publicRoutePaths } from "./routes";

export type NavItem = Readonly<{
  label: string;
  href: string;
  mobileOnly?: boolean;
  // Opens href while analytics records this virtual page instead.
  trackedPagePath?: typeof feesRoutePath;
  children?: readonly NavItem[];
}>;

export const socialProfileLinks = [
  {
    clickEventType: visitEventTypes.instagramLinkClicked,
    label: "Instagram",
    href: "https://www.instagram.com/joel.ropes/",
  },
  {
    clickEventType: visitEventTypes.linkedinLinkClicked,
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
  { label: "Articles", href: publicRoutePaths.articles },
  { label: "Fees", href: publicRoutePaths.contact, trackedPagePath: feesRoutePath },
  { label: "Contact", href: publicRoutePaths.contact, mobileOnly: true },
  ...(import.meta.env.DEV
    ? [
        {
          label: "Dev",
          href: devRoutePaths.designSystem,
          children: [
            { label: "Article editor", href: devRoutePaths.articleEditor },
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

export const footerNavItems: readonly NavItem[] = [
  { label: "Working with Joel", href: publicRoutePaths.workingWithJoel },
  { label: "Inclusive practice", href: publicRoutePaths.inclusion },
  { label: "Articles", href: publicRoutePaths.articles },
  { label: "Fees", href: publicRoutePaths.contact, trackedPagePath: feesRoutePath },
  { label: "Crisis support", href: publicRoutePaths.crisisSupport },
  { label: "Privacy", href: publicRoutePaths.privacyPolicy },
];

import type { LucideIcon } from "lucide-react";
import {
  HeartHandshake,
  Laptop,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { devRoutePaths, publicRoutePaths, routeHref, showDraftInclusionLinks } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  devOnly?: boolean;
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
          devOnly: true,
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

export const fitItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Laptop, label: "Sessions across Australia" },
  { icon: Users, label: "For adults" },
  { icon: ShieldCheck, label: "Grounded and non-shaming" },
  {
    icon: HeartHandshake,
    label: "Inclusive of diverse relationships, sexualities, and identities",
  },
];

export const practicalItems: Array<{ icon: LucideIcon; title: string; copy: string }> = [
  {
    icon: Laptop,
    title: "Session format",
    copy: "Counselling sessions for adults across Australia.",
  },
  {
    icon: Phone,
    title: "Initial contact",
    copy: "A brief enquiry first, with a short phone conversation available where useful.",
  },
  {
    icon: MapPin,
    title: "Practice base",
    copy: "Based in Perth, Western Australia, working with adults nationally.",
  },
];

export const inclusiveTopics = [
  "Kink and BDSM",
  "Ethical non-monogamy",
  "LGBTQIA+ lives",
  "Sexuality and desire",
  "Gender and self-understanding",
  "Diverse relationship structures",
];

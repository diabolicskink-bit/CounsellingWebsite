import type { LucideIcon } from "lucide-react";
import {
  HeartHandshake,
  Laptop,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  devOnly?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Working with Joel", href: "/working-with-joel" },
  {
    label: "Inclusion",
    href: "/inclusion",
    children: [
      { label: "Kink & BDSM", href: "/inclusion/kink-bdsm" },
      { label: "ENM & polyamory", href: "/inclusion/enm-polyamory" },
      { label: "LGBTQIA+", href: "/inclusion/lgbtqia" },
    ],
  },
  {
    label: "Dev",
    href: "/design-language",
    devOnly: true,
    children: [
      {
        label: "Design",
        href: "/design-language",
        children: [
          { label: "Foundations", href: "/design-language/foundations" },
          { label: "Components", href: "/design-language/components" },
          { label: "Heroes", href: "/design-language/heroes" },
          { label: "Patterns", href: "/design-language/patterns" },
        ],
      },
      { label: "Documents", href: "/documents" },
      {
        label: "Test Beds",
        href: "/codex-tb",
        children: [
          { label: "Codex TB", href: "/codex-tb" },
          { label: "Opus TB", href: "/opus-tb" },
        ],
      },
    ],
  },
  { label: "Fees", href: "/fees" },
  { label: "Contact", href: "/contact" },
];

export const fitItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Laptop, label: "Online sessions across Australia" },
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
    copy: "Secure online sessions for adults across Australia.",
  },
  {
    icon: Phone,
    title: "Initial contact",
    copy: "A brief enquiry first, with a short phone conversation available where useful.",
  },
  {
    icon: MapPin,
    title: "Practice base",
    copy: "Based in Perth, Western Australia, working online nationally.",
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

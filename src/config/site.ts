export const siteConfig = {
  name: "UnityDev Digital",
  shortName: "UnityDev",
  tagline: "Where development happens in unity",
  description:
    "UnityDev Digital builds AI products, cloud platforms and dedicated engineering teams for companies that need to ship. Strategy, design, development and support, all from one team.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitydevdigital.com").replace(/\/$/, ""),
  email: "hello@unitydevdigital.com",
  keywords: [
    "IT services",
    "software development company",
    "AI development",
    "generative AI",
    "cloud consulting",
    "DevOps",
    "dedicated development team",
    "staff augmentation",
    "custom software",
  ],
  // Add real profile URLs to show them in the footer; empty entries are hidden.
  social: {
    linkedin: "",
    github: "",
    x: "",
  },
} as const;

export const navItems = [
  { label: "Services", href: "#services" },
  { label: "Engagement", href: "#engagement" },
  { label: "Process", href: "#process" },
  { label: "Principles", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

import Link from "next/link";
import { navItems, siteConfig } from "@/config/site";
import { services } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  x: "X",
};

export function Footer() {
  const socials = (Object.entries(siteConfig.social) as [keyof typeof siteConfig.social, string][]).filter(
    ([, url]) => url,
  );

  return (
    <footer className="relative border-t border-border bg-surface/40">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" aria-label="UnityDev Digital home" className="inline-block rounded-lg">
            <Logo />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            {siteConfig.tagline}. AI, cloud and engineering teams working as one with yours.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-6 inline-block font-display text-lg font-medium text-foreground underline decoration-brand/40 decoration-2 underline-offset-4 transition-colors hover:decoration-brand"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-mono text-xs font-medium tracking-wide text-muted uppercase">Services</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <a href="#services" className="text-foreground/80 transition-colors hover:text-brand">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-mono text-xs font-medium tracking-wide text-muted uppercase">Company</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-foreground/80 transition-colors hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="text-foreground/80 transition-colors hover:text-brand">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        {socials.length > 0 && (
          <ul className="flex gap-5">
            {socials.map(([key, url]) => (
              <li key={key}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  {socialLabels[key]}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  );
}

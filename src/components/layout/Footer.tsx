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
    <footer className="bg-surface-2">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" aria-label="UnityDev Digital home" className="inline-block rounded-lg">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {siteConfig.tagline}. AI, cloud and engineering teams that work as part of yours.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-sm font-medium">Services</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {services.map((service) => (
              <li key={service.id}>
                <a href="#services" className="hover:text-foreground hover:underline">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-medium">Company</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-foreground hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col justify-between gap-4 py-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-6">
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
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navItems } from "@/config/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { easeOut } from "@/components/motion/Reveal";

const sectionIds = navItems.map((item) => item.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);
    // Tuck the bar away while scrolling down past the hero; bring it back on scroll up.
    setHidden(latest > 640 && latest > previous + 4);
    if (latest < previous - 4) setHidden(false);
  });

  const highlighted = hovered ?? active;

  return (
    <>
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? "-110%" : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="fixed inset-x-0 top-0 z-50 pt-3"
      >
        <Container>
          <nav
            aria-label="Main"
            className={cn(
              "flex h-16 items-center justify-between rounded-2xl border px-3 transition-all duration-500 sm:px-4",
              scrolled
                ? "border-border bg-background/75 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.35)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <Link href="/" aria-label="UnityDev Digital home" className="rounded-lg">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
              {navItems.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={item.href} className="relative">
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive || hovered === id ? "text-foreground" : "text-muted",
                      )}
                    >
                      {item.label}
                    </a>
                    {highlighted === id && (
                      <m.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="hidden sm:block">
                <ButtonLink href="#contact" arrow>
                  Let&apos;s talk
                </ButtonLink>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="grid size-10 place-items-center rounded-full border border-border bg-surface/70 lg:hidden"
              >
                <Bars3Icon className="size-5" />
              </button>
            </div>
          </nav>
        </Container>
      </m.header>

      <AnimatePresence>
        {menuOpen && (
          <Dialog static open={menuOpen} onClose={setMenuOpen} className="relative z-[70] lg:hidden">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm"
              aria-hidden
            />
            <DialogPanel className="fixed inset-x-3 top-3">
              <m.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="rounded-3xl border border-border bg-surface p-5 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <Logo />
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="grid size-10 place-items-center rounded-full border border-border"
                  >
                    <XMarkIcon className="size-5" />
                  </button>
                </div>
                <ul className="mt-6 space-y-1">
                  {navItems.map((item, index) => (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.35, ease: easeOut }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-3 py-3 font-display text-xl font-medium hover:bg-surface-2"
                      >
                        {item.label}
                      </a>
                    </m.li>
                  ))}
                </ul>
                <ButtonLink href="#contact" size="lg" arrow className="mt-6 w-full" onClick={() => setMenuOpen(false)}>
                  Let&apos;s talk
                </ButtonLink>
              </m.div>
            </DialogPanel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

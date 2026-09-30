"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navItems } from "@/config/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { easeOut } from "@/components/motion/Reveal";

const sectionIds = navItems.map((item) => item.href.slice(1));

/** Full-width app bar: logo on the left, pill-shaped nav links on the right. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 8));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur-lg transition-colors duration-300",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <nav aria-label="Main" className="flex h-16 w-full items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="UnityDev Digital home" className="rounded-lg">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-brand-container text-on-brand-container"
                        : "text-muted hover:bg-surface-2 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface-2 lg:hidden"
          >
            <Bars3Icon className="size-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <Dialog static open={menuOpen} onClose={setMenuOpen} className="relative z-[70] lg:hidden">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
              aria-hidden
            />
            <DialogPanel className="fixed inset-y-0 left-0 w-[min(22rem,85vw)]">
              <m.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="h-full rounded-r-[1.75rem] bg-surface-2 p-4"
              >
                <div className="flex items-center justify-between px-2 py-2">
                  <Logo />
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface-3"
                  >
                    <XMarkIcon className="size-6" />
                  </button>
                </div>
                <ul className="mt-6 space-y-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-full px-5 py-3.5 text-base font-medium hover:bg-surface-3"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </m.div>
            </DialogPanel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

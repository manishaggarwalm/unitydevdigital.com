"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { faqs, sections } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const m3Ease = [0.2, 0, 0, 1] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const s = sections.faq;

  return (
    <section id="faq" className="py-20 sm:py-28" aria-labelledby="faq-title">
      <Container className="max-w-4xl">
        <SectionHeading id="faq-title" eyebrow={s.eyebrow} title={s.title} />

        <ul className="mt-12 space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <li
                key={faq.question}
                className={cn(
                  "overflow-hidden rounded-3xl transition-colors duration-300",
                  isOpen ? "bg-surface-2" : "bg-surface hover:bg-surface-2",
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 rounded-3xl px-6 py-5 text-left text-lg sm:px-8"
                  >
                    {faq.question}
                    <ChevronDownIcon
                      className={cn(
                        "size-5 shrink-0 text-muted transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: m3Ease }}
                    >
                      <p className="px-6 pb-6 leading-relaxed text-pretty text-muted sm:px-8">{faq.answer}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

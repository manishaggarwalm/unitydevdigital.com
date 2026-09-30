"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { faqs } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, easeOut } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="relative py-24 sm:py-32" aria-labelledby="faq-title">
      <Container className="max-w-4xl">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Questions we hear often"
          description="Can't find what you're looking for? Ask us directly and we'll get back to you within one business day."
        />

        <Stagger as="ul" className="mt-14 space-y-3" stagger={0.06}>
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <StaggerItem as="li" key={faq.question}>
                <div
                  className={cn(
                    "rounded-2xl border bg-surface transition-colors duration-300",
                    isOpen ? "border-brand/40" : "border-border hover:border-brand/25",
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-display text-lg font-medium"
                    >
                      {faq.question}
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                          isOpen ? "rotate-45 border-brand bg-brand text-on-brand" : "border-border text-muted",
                        )}
                      >
                        <PlusIcon className="size-4" />
                      </span>
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
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 leading-relaxed text-muted">{faq.answer}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

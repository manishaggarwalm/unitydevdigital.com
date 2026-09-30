"use client";

import { m } from "motion/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { engagementModels } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Engagement() {
  return (
    <section id="engagement" className="relative py-24 sm:py-32" aria-labelledby="engagement-title">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface-2/50 to-transparent"
      />
      <Container>
        <SectionHeading
          id="engagement-title"
          eyebrow="How we engage"
          title="Work with us the way that suits you"
          description="Whether you need a product delivered, a team built around your roadmap or a specialist to fill a gap, there's a model that fits."
        />

        <Stagger className="mt-16 grid items-stretch gap-6 lg:grid-cols-3" stagger={0.12}>
          {engagementModels.map((model) => (
            <StaggerItem key={model.name} className="h-full">
              <m.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={cn(
                  "relative h-full rounded-3xl p-px",
                  model.highlighted
                    ? "bg-gradient-to-b from-brand via-accent/60 to-border shadow-[0_30px_80px_-30px_var(--brand)]"
                    : "bg-border",
                )}
              >
                <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-surface p-8">
                  {model.highlighted && (
                    <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-brand to-accent px-3 py-1 text-xs font-semibold text-white">
                      Most flexible
                    </span>
                  )}
                  <p className="font-mono text-xs font-medium tracking-wide text-muted uppercase">
                    Best for: {model.bestFor}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">{model.name}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{model.description}</p>
                  <ul className="mt-7 flex-1 space-y-3 text-sm">
                    {model.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                          <CheckIcon className="size-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href="#contact"
                    variant={model.highlighted ? "primary" : "secondary"}
                    arrow
                    className="mt-8 w-full"
                  >
                    Get a proposal
                  </ButtonLink>
                </div>
              </m.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  return (
    <section id="process" className="relative py-24 sm:py-32" aria-labelledby="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="Our process"
          title="A delivery process with no surprises"
          description="Clear milestones, working software early and often, and a team that tells you the truth about progress."
        />

        <ol ref={listRef} className="relative mx-auto mt-20 max-w-4xl">
          {/* Track + scroll-linked fill */}
          <div aria-hidden className="absolute top-0 bottom-0 left-5 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <m.div
            aria-hidden
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-5 w-px origin-top bg-gradient-to-b from-brand to-accent md:left-1/2 md:-translate-x-1/2"
          />

          {processSteps.map((step, index) => {
            const right = index % 2 === 1;
            return (
              <li key={step.step} className="relative pb-14 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                {/* Node */}
                <Reveal direction="none" className="absolute top-1 left-5 -translate-x-1/2 md:left-1/2">
                  <span className="grid size-10 place-items-center rounded-full border border-brand/40 bg-background font-mono text-xs font-semibold text-brand shadow-[0_0_0_6px_var(--background),0_0_30px_-4px_var(--brand)]">
                    {step.step}
                  </span>
                </Reveal>

                <Reveal
                  direction={right ? "left" : "right"}
                  className={cn(right ? "md:col-start-2" : "md:col-start-1 md:text-right")}
                >
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
                  <p
                    className={cn(
                      "mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium",
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-accent" />
                    {step.deliverable}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

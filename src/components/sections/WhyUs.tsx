"use client";

import { commitments, pillars } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/motion/Spotlight";
import { Counter } from "@/components/motion/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32" aria-labelledby="why-title">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="why-title"
              align="left"
              eyebrow="Why UnityDev"
              title={
                <>
                  One team. <span className="text-gradient">Shared ownership.</span>
                </>
              }
              description="We work as an extension of your business, not a ticket-taking vendor. Your goals set our priorities, and we measure success by what reaches production."
            />
          </div>

          <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title} className="h-full">
                  <Spotlight className="h-full p-7">
                    <Icon className="size-7 text-brand transition-transform duration-500 group-hover/spot:scale-110" />
                    <h3 className="mt-5 text-lg font-semibold">{pillar.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{pillar.description}</p>
                  </Spotlight>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal className="mt-20">
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => (
              <div key={item.label} className="bg-surface p-8">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <Counter
                    value={item.value}
                    suffix={item.suffix}
                    className="text-gradient font-display text-4xl font-semibold sm:text-5xl"
                  />
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

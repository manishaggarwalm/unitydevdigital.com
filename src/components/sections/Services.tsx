"use client";

import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/20/solid";
import { services } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/motion/Spotlight";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32" aria-labelledby="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title={
            <>
              Everything you need to build, <span className="text-gradient">under one roof</span>
            </>
          }
          description="From your first AI proof of concept to a fully staffed product team, we cover the whole lifecycle so you don't have to coordinate five different vendors."
        />

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.id} className="h-full">
                <Spotlight className="h-full p-7 transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl border border-border bg-surface-2 text-brand transition-all duration-500 group-hover/spot:scale-110 group-hover/spot:-rotate-6 group-hover/spot:border-brand/40">
                      <Icon className="size-6" />
                    </div>
                    <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span className="text-foreground/85">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-brand"
                    aria-label={`Discuss a ${service.title} project`}
                  >
                    Discuss a project
                    <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover/spot:translate-x-0.5 group-hover/spot:-translate-y-0.5" />
                  </a>
                </Spotlight>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

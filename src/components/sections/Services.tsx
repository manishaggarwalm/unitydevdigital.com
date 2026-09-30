import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  CircleStackIcon,
  CloudIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { sections, services } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { IconChip, SectionHeading, toneOrder } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  ai: CpuChipIcon,
  cloud: CloudIcon,
  teams: UserGroupIcon,
  software: CodeBracketSquareIcon,
  data: CircleStackIcon,
  support: ShieldCheckIcon,
};

export function Services() {
  const s = sections.services;
  return (
    <section id="services" className="py-20 sm:py-28" aria-labelledby="services-title">
      <Container>
        <SectionHeading id="services-title" eyebrow={s.eyebrow} title={s.title} description={s.description} />

        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {services.map((service, index) => {
            const Icon = icons[service.id] ?? CpuChipIcon;
            return (
              <StaggerItem key={service.id} className="h-full">
                <article className="group flex h-full flex-col rounded-[1.75rem] bg-surface-2 p-7 transition-colors duration-300 ease-m3 hover:bg-surface-3 sm:p-8">
                  <IconChip tone={toneOrder[index % toneOrder.length]}>
                    <Icon className="size-6" />
                  </IconChip>
                  <h3 className="mt-6 text-[1.4rem] leading-snug">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-6 -ml-3 inline-flex h-10 items-center gap-2 self-start rounded-full px-3 text-sm font-medium text-brand transition-colors hover:bg-brand/8"
                    aria-label={`Discuss a ${service.title} project`}
                  >
                    Discuss a project
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

import type { ComponentType, SVGProps } from "react";
import { AcademicCapIcon, ArrowsPointingOutIcon, EyeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { principles, sections } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { IconChip, SectionHeading, toneOrder } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

// One icon per principle, in the same order as `principles` in home.ts.
const icons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  AcademicCapIcon,
  EyeIcon,
  LockClosedIcon,
  ArrowsPointingOutIcon,
];

export function WhyUs() {
  const s = sections.principles;
  return (
    <section id="why-us" className="py-20 sm:py-28" aria-labelledby="why-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="why-title"
            align="left"
            eyebrow={s.eyebrow}
            title={s.title}
            description={s.description}
            className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7" stagger={0.08}>
            {principles.map((item, index) => {
              const Icon = icons[index] ?? AcademicCapIcon;
              return (
                <StaggerItem key={item.title} className="h-full">
                  <article className="h-full rounded-[1.75rem] bg-surface-2 p-7">
                    <IconChip tone={toneOrder[index % toneOrder.length]}>
                      <Icon className="size-6" />
                    </IconChip>
                    <h3 className="mt-6 text-xl">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

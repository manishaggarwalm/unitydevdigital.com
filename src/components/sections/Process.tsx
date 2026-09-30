import { processSteps, sections } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Material-style horizontal stepper: numbered circles joined by a connector line. */
export function Process() {
  const s = sections.process;
  return (
    <section id="process" className="bg-surface py-20 sm:py-28" aria-labelledby="process-title">
      <Container>
        <SectionHeading id="process-title" eyebrow={s.eyebrow} title={s.title} description={s.description} />

        <Stagger
          as="ol"
          className="relative mt-16 grid gap-10 before:absolute before:top-5 before:right-[12.5%] before:left-[12.5%] before:hidden before:h-px before:bg-border md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:before:block"
          stagger={0.1}
        >
          {processSteps.map((step) => (
            <StaggerItem as="li" key={step.step} className="relative lg:text-center">
              <span className="relative grid size-10 place-items-center rounded-full bg-brand text-sm font-medium text-on-brand ring-8 ring-surface lg:mx-auto">
                {Number(step.step)}
              </span>
              <h3 className="mt-6 text-[1.4rem]">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-pretty text-muted">{step.description}</p>
              <p className="mt-5 inline-flex rounded-lg bg-surface-3 px-3 py-1.5 text-sm">{step.deliverable}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

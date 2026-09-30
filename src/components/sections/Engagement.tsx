import { CheckIcon } from "@heroicons/react/24/outline";
import { engagementModels, sections } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Engagement() {
  const s = sections.engagement;
  return (
    <section id="engagement" className="py-20 sm:py-28" aria-labelledby="engagement-title">
      <Container>
        <SectionHeading id="engagement-title" eyebrow={s.eyebrow} title={s.title} description={s.description} />

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3" stagger={0.08}>
          {engagementModels.map((model) => (
            <StaggerItem key={model.name} className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] border border-border bg-background p-8">
                <p className="text-sm text-muted">{model.bestFor}</p>
                <h3 className="mt-2 text-[1.75rem] leading-tight">{model.name}</h3>
                <p className="mt-4 leading-relaxed text-muted">{model.description}</p>
                <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-7 text-sm">
                  {model.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckIcon className="size-5 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="#contact" variant="tonal" className="mt-8 w-full">
                  Get a proposal
                </ButtonLink>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

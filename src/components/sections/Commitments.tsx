import { commitments, sections } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Commitments band. These are promises the business makes, not historical statistics. */
export function Commitments() {
  const s = sections.commitments;
  return (
    <section className="py-8 sm:py-12" aria-labelledby="commitments-title">
      <Container>
        <div className="rounded-[2rem] bg-brand-container px-6 py-14 text-on-brand-container sm:px-12 sm:py-16">
          <SectionHeading
            id="commitments-title"
            eyebrow={s.eyebrow}
            title={s.title}
            className="[&_p]:text-on-brand-container/80"
          />
          <Stagger as="dl" className="mt-12 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => (
              <StaggerItem key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block text-5xl font-normal tracking-tight sm:text-6xl">{item.value}</span>
                  <span className="mx-auto mt-3 block max-w-[15rem] text-sm leading-relaxed opacity-80">
                    {item.label}
                  </span>
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

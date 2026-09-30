import { sections, techStack } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/** Platforms we work with, as Material "assist chips". Text only: no third-party logos. */
export function Tools() {
  return (
    <section aria-labelledby="tools-title" className="pb-8">
      <Container>
        <Reveal className="text-center">
          <h2 id="tools-title" className="text-sm text-muted">
            {sections.tools.title}
          </h2>
          <ul className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-2">
            {techStack.map((tool) => (
              <li key={tool} className="rounded-lg border border-border px-3.5 py-1.5 text-sm text-muted">
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

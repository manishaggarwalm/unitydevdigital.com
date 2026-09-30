import Image from "next/image";
import { clients, sections, team, testimonials, work } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Selected work, clients, testimonials and team. Every part renders only when
 * `src/content/home.ts` holds real entries, so nothing placeholder ever ships.
 */
export function Work() {
  if (!work.length && !clients.length && !testimonials.length && !team.length) return null;
  const s = sections.work;

  return (
    <section id="work" className="py-20 sm:py-28" aria-labelledby="work-title">
      <Container>
        <SectionHeading id="work-title" eyebrow={s.eyebrow} title={s.title} />

        {clients.length > 0 && (
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-4 text-xl text-muted">
            {clients.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}

        {work.length > 0 && (
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2" stagger={0.08}>
            {work.map((project) => (
              <StaggerItem key={project.title}>
                <article className="group overflow-hidden rounded-[1.75rem] bg-surface-2">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-m3 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-sm text-muted">
                      {project.client}
                      {project.year && ` · ${project.year}`}
                    </p>
                    <h3 className="mt-2 text-2xl">{project.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <li key={service} className="rounded-lg bg-surface-3 px-3 py-1 text-xs">
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {testimonials.length > 0 && (
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <Reveal key={item.name}>
                <figure className="h-full rounded-[1.75rem] border border-border p-8">
                  <blockquote className="text-xl leading-relaxed text-pretty">“{item.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="block text-muted">
                      {item.role}, {item.company}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {team.length > 0 && (
          <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {team.map((person) => (
              <li key={person.name}>
                <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-surface-2">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-medium">{person.name}</p>
                <p className="text-sm text-muted">{person.role}</p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

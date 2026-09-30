import { techStack } from "@/content/home";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium whitespace-nowrap text-foreground/80">
      {label}
    </span>
  );
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies we work with" className="relative border-y border-border bg-surface/40 py-10">
      <Reveal>
        <p className="text-center font-mono text-xs font-medium tracking-wide text-muted uppercase">
          Fluent in the platforms and tools you already use
        </p>
      </Reveal>
      <div className="mt-7 space-y-3">
        <Marquee duration={45}>
          {[...techStack.ai, ...techStack.cloud].map((t) => (
            <Pill key={t} label={t} />
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {techStack.build.map((t) => (
            <Pill key={t} label={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

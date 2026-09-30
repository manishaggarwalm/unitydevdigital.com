import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Centred section opener: small brand-coloured eyebrow, large heading, optional description. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="text-sm font-medium text-brand">{eyebrow}</p>}
      <h2
        id={id}
        className="mt-3 text-[2rem] leading-tight font-normal tracking-[-0.01em] sm:text-5xl sm:leading-[1.1]"
      >
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{description}</p>}
    </Reveal>
  );
}

const tones = {
  blue: "bg-tone-blue text-on-tone-blue",
  green: "bg-tone-green text-on-tone-green",
  yellow: "bg-tone-yellow text-on-tone-yellow",
  rose: "bg-tone-rose text-on-tone-rose",
} as const;

export type Tone = keyof typeof tones;
export const toneOrder: Tone[] = ["blue", "green", "yellow", "rose"];

/** Rounded pastel square holding an icon, the Material "icon container". */
export function IconChip({ tone, children, className }: { tone: Tone; children: ReactNode; className?: string }) {
  return (
    <span aria-hidden className={cn("grid size-12 place-items-center rounded-2xl", tones[tone], className)}>
      {children}
    </span>
  );
}

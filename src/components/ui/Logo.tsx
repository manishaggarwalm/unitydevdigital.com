import { cn } from "@/lib/cn";

/** Two strokes joining into a "U": separate disciplines, one team. */
export function LogoMark({ className }: { className?: string }) {
  // Gradient lives in CSS rather than an SVG <defs> so repeated marks don't clash on ids.
  return (
    <span
      aria-hidden
      className={cn(
        "bg-sunset inline-grid size-9 shrink-0 place-items-center rounded-[12px] shadow-[0_6px_20px_-6px_var(--brand)]",
        className,
      )}
    >
      <svg viewBox="0 0 40 40" fill="none" className="size-full">
        <path d="M12 11v9.5a8 8 0 0 0 16 0V11" stroke="white" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M20 11v9" stroke="white" strokeOpacity="0.55" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-lg leading-none font-semibold tracking-tight whitespace-nowrap">
        UnityDev<span className="font-normal text-muted"> Digital</span>
      </span>
    </span>
  );
}

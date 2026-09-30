"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * Card with a soft glow that follows the pointer. Position is written to CSS
 * variables directly, so moving the mouse never re-renders React.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_var(--shadow-tint)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--brand) 14%, transparent), color-mix(in srgb, var(--accent) 6%, transparent) 45%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

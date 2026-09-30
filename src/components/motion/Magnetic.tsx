"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

/** Gently pulls its child toward the pointer on hover (fine pointers only). */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("inline-flex", className)}
    >
      {children}
    </m.div>
  );
}

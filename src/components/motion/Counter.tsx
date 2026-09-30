"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts from 0 to `value` once the number scrolls into view. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        el.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  // Server-render the final value so crawlers and no-JS visitors see real numbers.
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

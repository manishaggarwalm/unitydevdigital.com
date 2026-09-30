"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads the animation feature bundle (incl. layout animations) once for the whole app.
 * `strict` makes accidental use of the heavy `motion.*` components an error,
 * so always import `m` from "motion/react" instead.
 * `reducedMotion="user"` drops transform animations for visitors who ask for it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

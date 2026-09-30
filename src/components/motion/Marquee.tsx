import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Infinite horizontal scroller, implemented in CSS so it costs nothing on the
 * main thread. Content is duplicated once; the copy is hidden from assistive tech.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("group/marquee mask-fade-edges flex overflow-hidden", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee gap-3 pr-3 group-hover/marquee:[animation-play-state:paused]"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 gap-3">{children}</div>
        <div className="flex shrink-0 gap-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

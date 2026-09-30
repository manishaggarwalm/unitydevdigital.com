"use client";

import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ComponentType, PointerEvent, SVGProps } from "react";
import {
  CpuChipIcon,
  CloudIcon,
  UserGroupIcon,
  CircleStackIcon,
  CommandLineIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { LogoMark } from "@/components/ui/Logo";
import { easeOut } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Node = { label: string; icon: ComponentType<SVGProps<SVGSVGElement>>; angle: number };

const outerNodes: Node[] = [
  { label: "AI", icon: CpuChipIcon, angle: -90 },
  { label: "Cloud", icon: CloudIcon, angle: 30 },
  { label: "Teams", icon: UserGroupIcon, angle: 150 },
];

const innerNodes: Node[] = [
  { label: "Data", icon: CircleStackIcon, angle: -30 },
  { label: "DevOps", icon: CommandLineIcon, angle: 90 },
  { label: "QA", icon: ShieldCheckIcon, angle: 210 },
];

/**
 * Orbit diagram: every discipline circles one shared core. Rings spin with CSS
 * (cheap, compositor-only); the pointer tilt uses motion springs.
 */
export function HeroVisual() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1200px]"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      aria-hidden
    >
      <m.div
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: easeOut }}
        className="relative size-full [transform-style:preserve-3d]"
      >
        {/* Glow */}
        <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-highlight/25 via-brand/30 to-accent/30 blur-3xl" />

        {/* Outer orbit */}
        <Orbit nodes={outerNodes} inset="6%" spin="animate-spin-slow" counter="animate-spin-slow-reverse" size="lg" />
        {/* Inner orbit */}
        <Orbit
          nodes={innerNodes}
          inset="25%"
          spin="animate-spin-slower"
          counter="animate-spin-slower-reverse"
          size="sm"
        />

        {/* Core */}
        <div className="absolute inset-0 grid [transform:translateZ(40px)] place-items-center">
          <div className="relative">
            <span className="absolute inset-0 animate-pulse-ring rounded-[22px] bg-brand/40" />
            <span className="absolute inset-0 animate-pulse-ring rounded-[22px] bg-accent/30 [animation-delay:1.5s]" />
            <LogoMark className="relative size-20 rounded-[22px] shadow-[0_20px_60px_-10px_var(--brand)]" />
          </div>
        </div>

        {/* Floating status cards */}
        <StatusCard
          className="top-0 left-0 [transform:translateZ(70px)]"
          delay={0.9}
          dot="bg-emerald-500"
          title="Deploy succeeded"
          meta="production · eu-west · 41s"
        />
        <StatusCard
          className="right-0 bottom-0 [transform:translateZ(90px)] [&>div]:[animation-delay:-3.5s]"
          delay={1.1}
          dot="bg-brand"
          title="AI agent online"
          meta="evals passing · p95 820ms"
        />
      </m.div>
    </div>
  );
}

function Orbit({
  nodes,
  inset,
  spin,
  counter,
  size,
}: {
  nodes: Node[];
  inset: string;
  spin: string;
  counter: string;
  size: "lg" | "sm";
}) {
  return (
    <div className="absolute" style={{ inset }}>
      <div className="absolute inset-0 rounded-full border border-dashed border-foreground/15" />
      <div className={cn("absolute inset-0", spin)}>
        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute top-1/2 left-1/2 h-0 w-1/2 origin-left"
            style={{ transform: `rotate(${node.angle}deg)` }}
          >
            {/* Spoke */}
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand/25 to-brand/50" />
            {/* Node, counter-rotated so it stays upright */}
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
              <div style={{ transform: `rotate(${-node.angle}deg)` }}>
                <div className={counter}>
                  <OrbitNode node={node} size={size} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrbitNode({ node, size }: { node: Node; size: "lg" | "sm" }) {
  const Icon = node.icon;
  if (size === "sm") {
    return (
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-2.5 py-1 text-xs font-medium shadow-lg backdrop-blur">
        <Icon className="size-3.5 text-accent" />
        {node.label}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="grid size-14 place-items-center rounded-2xl border border-border bg-surface/90 shadow-xl backdrop-blur sm:size-16">
        <Icon className="size-7 text-brand" />
      </div>
      <span className="rounded-full bg-surface/80 px-2 py-0.5 font-display text-sm font-semibold backdrop-blur">
        {node.label}
      </span>
    </div>
  );
}

function StatusCard({
  className,
  delay,
  dot,
  title,
  meta,
}: {
  className?: string;
  delay: number;
  dot: string;
  title: string;
  meta: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={cn("absolute", className)}
    >
      <div className="animate-float rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-[0_20px_50px_-20px_var(--shadow-tint)] backdrop-blur-xl">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="relative flex size-2">
            <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", dot)} />
            <span className={cn("relative size-2 rounded-full", dot)} />
          </span>
          {title}
        </div>
        <p className="mt-1 font-mono text-[11px] text-muted">{meta}</p>
      </div>
    </m.div>
  );
}

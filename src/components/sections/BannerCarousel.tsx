"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { bannerSlides } from "@/content/home";
import { cn } from "@/lib/cn";

const SLIDE_MS = 6000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/**
 * Full-width photo banner at the top of the page.
 * - Crossfades between slides; the active photo zooms out slowly (transform only).
 * - Autoplay advances when the active dot's progress animation ends, so pausing
 *   the animation (hover, focus, hidden tab, pause button) pauses the carousel.
 * - No autoplay at all for visitors who prefer reduced motion.
 * - Follows the WAI-ARIA carousel pattern: labelled slides, previous/next,
 *   pause/play, and slide picker buttons.
 */
export function BannerCarousel() {
  const count = bannerSlides.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // The server snapshot says "reduced motion", so server HTML never autoplays.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
  const tabHidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
  const pointerStart = useRef<number | null>(null);

  const wrap = useCallback((i: number) => ((i % count) + count) % count, [count]);
  const go = useCallback((target: number) => setIndex(wrap(target)), [wrap]);
  const step = useCallback((delta: number) => setIndex((i) => wrap(i + delta)), [wrap]);

  const autoplay = playing && !reducedMotion;
  const running = autoplay && !hovered && !focused && !tabHidden;

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="px-4 pt-20 sm:px-6 lg:px-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div
        className="relative isolate h-[min(78svh,660px)] min-h-[520px] touch-pan-y overflow-hidden rounded-[1.75rem] bg-surface-3"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const delta = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
        }}
      >
        {/* Slides are stacked and crossfaded. Inactive ones are inert so their links can't be tabbed to. */}
        <div aria-live={autoplay ? "off" : "polite"} className="absolute inset-0">
          {bannerSlides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={!active}
                className={cn("absolute inset-0", active ? "z-10" : "z-0")}
              >
                {/* Photo layer: long crossfade. */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-m3",
                    active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    priority={i === 0}
                    // All slides sit at the top of the page; load them up front so no crossfade shows a blank.
                    loading={i === 0 ? undefined : "eager"}
                    sizes="100vw"
                    className={cn(
                      "object-cover transition-transform ease-out",
                      active ? "scale-100 duration-[7000ms]" : "scale-110 duration-0",
                    )}
                  />
                  {/* Scrim keeps white text readable over any photo */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/45 sm:to-transparent"
                  />
                </div>

                {/* Text layer: the old text leaves quickly and the new text arrives after it, so they never overlap. */}
                <div
                  className={cn(
                    "relative flex h-full flex-col justify-end p-6 pb-24 text-white transition-opacity ease-m3 sm:justify-center sm:p-12 sm:pb-12 lg:p-16",
                    active ? "opacity-100 delay-300 duration-500" : "opacity-0 duration-150",
                  )}
                >
                  <div className="max-w-xl">
                    <p className="text-sm font-medium text-white/80">{slide.eyebrow}</p>
                    <p className="mt-3 text-4xl leading-[1.1] tracking-[-0.01em] text-balance sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </p>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-pretty text-white/85">{slide.text}</p>
                    <Link
                      href={slide.cta.href}
                      className="group/cta mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-medium text-black transition-colors hover:bg-white/90"
                    >
                      {slide.cta.label}
                      <ArrowRightIcon className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 p-5 sm:px-12 sm:pb-8 lg:px-16">
          <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
            {bannerSlides.map((slide, i) => {
              const active = i === index;
              return (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={active ? "true" : undefined}
                  className="grid h-6 place-items-center"
                >
                  <span
                    className={cn(
                      "relative block h-1.5 overflow-hidden rounded-full bg-white/40 transition-[width] duration-300 ease-m3",
                      active ? "w-10" : "w-1.5 hover:bg-white/70",
                    )}
                  >
                    {active && (
                      <span
                        key={index}
                        onAnimationEnd={() => step(1)}
                        style={{ ["--slide-duration" as string]: `${SLIDE_MS}ms` }}
                        className={cn(
                          "absolute inset-0 origin-left rounded-full bg-white",
                          autoplay ? "animate-slide-progress" : "",
                          !running && "[animation-play-state:paused]",
                        )}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ControlButton
              label={playing ? "Pause slideshow" : "Play slideshow"}
              onClick={() => setPlaying((value) => !value)}
              className={cn(reducedMotion && "hidden")}
            >
              {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
            </ControlButton>
            <ControlButton label="Previous slide" onClick={() => step(-1)}>
              <ChevronLeftIcon className="size-5" />
            </ControlButton>
            <ControlButton label="Next slide" onClick={() => step(1)}>
              <ChevronRightIcon className="size-5" />
            </ControlButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30",
        className,
      )}
    >
      {children}
    </button>
  );
}

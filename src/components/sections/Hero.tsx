"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useTransform } from "motion/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { hero } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/motion/Magnetic";
import { easeOut } from "@/components/motion/Reveal";
import { HeroVisual } from "./HeroVisual";

const assurances = ["NDA from day one", "You own the IP", "Senior engineers only"];

export function Hero() {
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 700], [0, 90]);
  const copyY = useTransform(scrollY, [0, 700], [0, 40]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28" aria-labelledby="hero-title">
      <HeroBackground />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <m.div style={{ y: copyY, opacity: fade }}>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </m.div>

          <h1 id="hero-title" className="mt-6 text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4.25rem]">
            <AnimatedWords text={hero.titleLead} />
            <RotatingWord words={hero.rotatingWords} />
          </h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl"
          >
            {hero.subtitle}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink href={hero.primaryCta.href} size="lg" arrow className="w-full sm:w-auto">
                {hero.primaryCta.label}
              </ButtonLink>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary" className="w-full sm:w-auto">
                {hero.secondaryCta.label}
              </ButtonLink>
            </Magnetic>
          </m.div>

          <m.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } } }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {assurances.map((item) => (
              <m.li
                key={item}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                className="flex items-center gap-1.5"
              >
                <CheckCircleIcon className="size-4 text-accent" />
                {item}
              </m.li>
            ))}
          </m.ul>
        </m.div>

        <m.div style={{ y: visualY }}>
          <HeroVisual />
        </m.div>
      </Container>
    </section>
  );
}

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + index * 0.06, ease: easeOut }}
          >
            {word}
            {index < words.length - 1 && " "}
          </m.span>
        </span>
      ))}
    </span>
  );
}

function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative block h-[1.15em] overflow-hidden">
      {/* Screen readers get the full list once instead of a changing word. */}
      <span className="sr-only">{words.join(" ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={words[index]}
          aria-hidden
          className="text-gradient absolute inset-x-0 top-0 block"
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="bg-grid mask-radial absolute inset-0" />
      <div className="absolute -top-40 left-[8%] size-[520px] animate-aurora rounded-full bg-brand/25 blur-[120px]" />
      <div className="absolute top-20 right-[4%] size-[460px] animate-aurora rounded-full bg-accent/20 blur-[120px] [animation-delay:-6s]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

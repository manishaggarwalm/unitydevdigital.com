"use client";

import { m } from "motion/react";
import { hero } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { easeOut } from "@/components/motion/Reveal";
import { HeroMock } from "./HeroMock";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-24" aria-labelledby="hero-title">
      <Container>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-1.5 text-sm text-muted">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] leading-[1.08] font-normal tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
          >
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {hero.intro}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="outlined">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="mt-16 sm:mt-20"
        >
          <HeroMock />
        </m.div>
      </Container>
    </section>
  );
}

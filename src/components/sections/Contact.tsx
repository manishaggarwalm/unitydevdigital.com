"use client";

import { useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { AnimatePresence, m } from "motion/react";
import { CheckIcon, EnvelopeIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { siteConfig } from "@/config/site";
import { contactBudgetOptions, contactServiceOptions } from "@/content/home";
import { EMAIL_PATTERN, contactLimits, type ContactPayload } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, easeOut } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const nextSteps = [
  { title: "We reply within one business day", body: "A real person reads every message, no auto-responders." },
  { title: "Discovery call", body: "30–45 minutes to understand your goals, constraints and timeline." },
  { title: "Proposal", body: "A clear scope, team shape and estimate, usually within a week." },
];

type Status = { state: "idle" } | { state: "success" } | { state: "error"; message: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    defaultValues: { service: "Not sure yet", budget: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: ContactPayload) {
    setStatus({ state: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await response.json().catch(() => ({}))) as {
        error?: string;
        fields?: Partial<Record<keyof ContactPayload, string>>;
      };
      if (!response.ok) {
        for (const [field, message] of Object.entries(json.fields ?? {})) {
          setError(field as keyof ContactPayload, { message });
        }
        setStatus({ state: "error", message: json.error ?? "Something went wrong. Please try again." });
        return;
      }
      reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: `Network error. Please try again or email us at ${siteConfig.email}.`,
      });
    }
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 sm:py-32" aria-labelledby="contact-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
        <div className="absolute bottom-0 left-1/2 size-[640px] -translate-x-1/2 translate-y-1/3 animate-aurora rounded-full bg-brand/20 blur-[140px]" />
      </div>

      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Start a project</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="contact-title" className="mt-5 text-4xl font-semibold sm:text-5xl">
              Let&apos;s build what&apos;s <span className="text-gradient">next</span>, together.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Tell us about your idea, product or team. We&apos;ll come back with honest advice, even if we&apos;re not
              the right fit.
            </p>
          </Reveal>

          <ol className="mt-10 space-y-6">
            {nextSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={0.2 + index * 0.08} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-surface font-mono text-xs font-semibold text-brand">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 text-sm text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.45}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-brand/50"
            >
              <EnvelopeIcon className="size-5 text-brand" />
              <span>
                <span className="block text-xs text-muted">Prefer email?</span>
                <span className="font-medium">{siteConfig.email}</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} direction="left">
          <div className="relative rounded-3xl border border-border bg-surface/80 p-6 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.35)] backdrop-blur-xl sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              {status.state === "success" ? (
                <SuccessMessage key="success" onReset={() => setStatus({ state: "idle" })} />
              ) : (
                <m.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field label="Full name" error={errors.name} className="sm:col-span-1">
                    <input
                      type="text"
                      autoComplete="name"
                      className={inputClass(errors.name)}
                      aria-invalid={!!errors.name}
                      {...register("name", {
                        required: "Please tell us your name.",
                        maxLength: { value: contactLimits.name, message: "Name is too long." },
                      })}
                    />
                  </Field>
                  <Field label="Work email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      className={inputClass(errors.email)}
                      aria-invalid={!!errors.email}
                      {...register("email", {
                        required: "Please enter your email.",
                        pattern: { value: EMAIL_PATTERN, message: "Please enter a valid email address." },
                      })}
                    />
                  </Field>
                  <Field label="Company" optional error={errors.company}>
                    <input
                      type="text"
                      autoComplete="organization"
                      className={inputClass(errors.company)}
                      {...register("company", { maxLength: { value: contactLimits.company, message: "Too long." } })}
                    />
                  </Field>
                  <Field label="I'm interested in" error={errors.service}>
                    <select className={inputClass(errors.service)} {...register("service", { required: true })}>
                      {contactServiceOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget" optional error={errors.budget} className="sm:col-span-2">
                    <select className={inputClass(errors.budget)} {...register("budget")}>
                      <option value="">Select a range</option>
                      {contactBudgetOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Project details" error={errors.message} className="sm:col-span-2">
                    <textarea
                      rows={5}
                      placeholder="What are you building, and where could you use help?"
                      className={cn(inputClass(errors.message), "h-auto resize-y py-3")}
                      aria-invalid={!!errors.message}
                      {...register("message", {
                        required: "Please tell us a little about your project.",
                        minLength: {
                          value: contactLimits.messageMin,
                          message: `Please share a little more detail (at least ${contactLimits.messageMin} characters).`,
                        },
                        maxLength: { value: contactLimits.message, message: "Message is too long." },
                      })}
                    />
                  </Field>

                  {/* Honeypot */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                    </label>
                  </div>

                  <AnimatePresence>
                    {status.state === "error" && (
                      <m.p
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-2 overflow-hidden rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 sm:col-span-2 dark:text-red-400"
                      >
                        <ExclamationCircleIcon className="mt-0.5 size-4 shrink-0" />
                        {status.message}
                      </m.p>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted">We&apos;ll only use your details to respond to this enquiry.</p>
                    <Button type="submit" size="lg" arrow={!isSubmitting} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending…
                        </span>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </div>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function inputClass(error?: FieldError) {
  return cn(
    "h-12 w-full rounded-xl border bg-background/60 px-4 text-foreground transition-colors outline-none placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-ring/40",
    error ? "border-red-500/70" : "border-border",
  );
}

function Field({
  label,
  optional,
  error,
  className,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: FieldError;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 flex items-center justify-between text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </span>
      {children}
      <AnimatePresence>
        {error?.message && (
          <m.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-xs text-red-600 dark:text-red-400"
          >
            {error.message}
          </m.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
      role="status"
    >
      <m.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-white shadow-[0_20px_50px_-15px_var(--brand)]"
      >
        <CheckIcon className="size-8" strokeWidth={2.5} />
      </m.div>
      <h3 className="mt-6 text-2xl font-semibold">Thanks, message received!</h3>
      <p className="mt-3 max-w-sm text-muted">
        We&apos;ll get back to you within one business day. Keep an eye on your inbox.
      </p>
      <button type="button" onClick={onReset} className="mt-8 text-sm font-medium text-brand hover:underline">
        Send another message
      </button>
    </m.div>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { AnimatePresence, m } from "motion/react";
import { CheckIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { siteConfig } from "@/config/site";
import { contactBudgetOptions, contactNextSteps, contactServiceOptions, sections } from "@/content/home";
import { EMAIL_PATTERN, contactLimits, type ContactPayload } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Reveal, easeOut } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

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

  const s = sections.contact;

  return (
    <section id="contact" className="bg-surface py-20 sm:py-28" aria-labelledby="contact-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            align="left"
            eyebrow={s.eyebrow}
            title={s.title}
            description={s.description}
          />

          <ol className="mt-10 space-y-6">
            {contactNextSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-container text-sm font-medium text-on-brand-container">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-medium">{step.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <ButtonLink href={`mailto:${siteConfig.email}`} variant="text" className="mt-8 -ml-4">
            <span className="flex items-center gap-2">
              <EnvelopeIcon className="size-5" />
              {siteConfig.email}
            </span>
          </ButtonLink>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[1.75rem] bg-background p-6 shadow-[0_1px_3px_rgb(0_0_0/0.08)] sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status.state === "success" ? (
                <SuccessMessage key="success" onReset={() => setStatus({ state: "idle" })} />
              ) : (
                <m.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="relative grid gap-5 sm:grid-cols-2"
                >
                  <Field label="Name" error={errors.name}>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder=" "
                      className={fieldClass(errors.name)}
                      aria-invalid={!!errors.name}
                      {...register("name", {
                        required: "Tell us your name.",
                        maxLength: { value: contactLimits.name, message: "Name is too long." },
                      })}
                    />
                  </Field>
                  <Field label="Work email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder=" "
                      className={fieldClass(errors.email)}
                      aria-invalid={!!errors.email}
                      {...register("email", {
                        required: "Enter your email.",
                        pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address." },
                      })}
                    />
                  </Field>
                  <Field label="Company (optional)" error={errors.company}>
                    <input
                      type="text"
                      autoComplete="organization"
                      placeholder=" "
                      className={fieldClass(errors.company)}
                      {...register("company", {
                        maxLength: { value: contactLimits.company, message: "Company name is too long." },
                      })}
                    />
                  </Field>
                  <Field label="Interested in" error={errors.service} floated>
                    <select className={fieldClass(errors.service)} {...register("service", { required: true })}>
                      {contactServiceOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget (optional)" error={errors.budget} floated className="sm:col-span-2">
                    <select className={fieldClass(errors.budget)} {...register("budget")}>
                      <option value="">Select a range</option>
                      {contactBudgetOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="About the project" error={errors.message} className="sm:col-span-2" multiline>
                    <textarea
                      rows={5}
                      placeholder=" "
                      className={cn(fieldClass(errors.message), "h-auto resize-y py-4")}
                      aria-invalid={!!errors.message}
                      {...register("message", {
                        required: "Tell us a little about the project.",
                        minLength: {
                          value: contactLimits.messageMin,
                          message: `A little more detail please (at least ${contactLimits.messageMin} characters).`,
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

                  {status.state === "error" && (
                    <p
                      role="alert"
                      className="rounded-xl bg-tone-rose px-4 py-3 text-sm text-on-tone-rose sm:col-span-2"
                    >
                      {status.message}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted">We only use your details to reply to this enquiry.</p>
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : "Send message"}
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

/** Material 3 outlined text field. The label floats when focused or filled (via `placeholder=" "`). */
function fieldClass(error?: FieldError) {
  return cn(
    "peer h-14 w-full rounded-lg border bg-transparent px-4 text-base text-foreground transition-colors outline-none",
    "focus:border-2 focus:px-[15px]",
    error ? "border-danger focus:border-danger" : "border-outline hover:border-foreground focus:border-brand",
  );
}

function Field({
  label,
  error,
  floated,
  multiline,
  className,
  children,
}: {
  label: string;
  error?: FieldError;
  floated?: boolean;
  multiline?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="relative block">
        {children}
        <span
          className={cn(
            "pointer-events-none absolute left-3 bg-background px-1 text-muted transition-all duration-150",
            "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-brand",
            "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs",
            floated
              ? "top-0 -translate-y-1/2 text-xs"
              : multiline
                ? "top-4 text-base"
                : "top-1/2 -translate-y-1/2 text-base",
            error && "text-danger peer-focus:text-danger",
          )}
        >
          {label}
        </span>
      </span>
      {error?.message && <span className="mt-1.5 block px-4 text-xs text-danger">{error.message}</span>}
    </label>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
      role="status"
    >
      <span className="grid size-16 place-items-center rounded-full bg-tone-green text-on-tone-green">
        <CheckIcon className="size-8" />
      </span>
      <h3 className="mt-6 text-2xl">Thanks, we&apos;ve got your message</h3>
      <p className="mt-3 max-w-sm text-muted">We&apos;ll reply within one business day. Keep an eye on your inbox.</p>
      <Button type="button" variant="text" onClick={onReset} className="mt-6">
        Send another message
      </Button>
    </m.div>
  );
}

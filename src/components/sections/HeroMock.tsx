import type { ReactNode } from "react";
import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";

/**
 * Decorative product-style illustration for the hero: an AI assistant, a
 * deploy pipeline and a sprint board, one per core practice. Built from HTML
 * so it stays crisp and themes with the tokens. Hidden from assistive tech,
 * and it makes no claims (no client names, no metrics).
 */
export function HeroMock() {
  return (
    <div aria-hidden className="rounded-[2rem] bg-surface-2 p-3 sm:p-5 lg:p-6">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
        <Assistant />
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-5 lg:grid-cols-1">
          <Pipeline />
          <Sprint />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  badge,
  className,
  children,
}: {
  title: string;
  badge?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-3xl bg-background p-5 text-left shadow-[0_1px_2px_rgb(0_0_0/0.06)] sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{title}</p>
        {badge}
      </div>
      {children}
    </div>
  );
}

function Assistant() {
  return (
    <Card
      title="Knowledge assistant"
      className="lg:col-span-7"
      badge={
        <span className="flex items-center gap-1.5 rounded-full bg-tone-blue px-2.5 py-1 text-xs text-on-tone-blue">
          <SparklesIcon className="size-3.5" />
          RAG
        </span>
      }
    >
      <div className="mt-6 mb-6 space-y-4">
        <div className="ml-auto max-w-[85%] rounded-3xl rounded-br-md bg-surface-3 px-4 py-3 text-sm">
          Which of our supplier contracts renew in the next 90 days?
        </div>
        <div className="flex gap-3">
          <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-brand text-on-brand">
            <SparklesIcon className="size-4" />
          </span>
          <div className="min-w-0 flex-1 space-y-2.5 text-sm">
            <p>I found three that renew soon. Two have auto-renewal clauses you may want to review first.</p>
            <div className="space-y-2 pt-1">
              <span className="block h-2.5 w-11/12 rounded-full bg-surface-3" />
              <span className="block h-2.5 w-4/5 rounded-full bg-surface-3" />
              <span className="block h-2.5 w-3/5 rounded-full bg-surface-3" />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Contracts drive", "Finance system", "Policy docs"].map((source) => (
                <span key={source} className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted">
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Follow-up turn: hidden on small screens where the card stacks and has no spare height. */}
        <div className="ml-auto hidden max-w-[85%] rounded-3xl rounded-br-md bg-surface-3 px-4 py-3 text-sm lg:block">
          Draft a reminder to each contract owner.
        </div>
      </div>
      <div className="mt-auto flex items-center gap-3 rounded-full bg-surface-2 py-2 pr-2 pl-5 text-sm text-muted">
        <span className="flex-1 truncate">Ask about your documents…</span>
        <span className="grid size-9 place-items-center rounded-full bg-brand text-on-brand">↑</span>
      </div>
    </Card>
  );
}

function Pipeline() {
  const steps = [
    { label: "Build", done: true },
    { label: "Tests", done: true },
    { label: "Security scan", done: true },
    { label: "Deploy to production", done: false },
  ];
  return (
    <Card
      title="Release pipeline"
      badge={<span className="rounded-full bg-tone-green px-2.5 py-1 text-xs text-on-tone-green">Running</span>}
    >
      <ul className="mt-5 space-y-3 text-sm">
        {steps.map((step) => (
          <li key={step.label} className="flex items-center gap-3">
            {step.done ? (
              <CheckCircleIcon className="size-5 text-on-tone-green dark:text-tone-green" />
            ) : (
              <span className="grid size-5 place-items-center">
                <span className="size-3.5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </span>
            )}
            <span className={cn(!step.done && "font-medium")}>{step.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-3">
        <div className="h-full w-4/5 rounded-full bg-brand" />
      </div>
    </Card>
  );
}

function Sprint() {
  const columns = [
    { name: "To do", tone: "bg-tone-yellow", items: 2 },
    { name: "In progress", tone: "bg-tone-blue", items: 2 },
    { name: "Done", tone: "bg-tone-green", items: 3 },
  ];
  return (
    <Card
      title="Current sprint"
      badge={<span className="rounded-full bg-tone-yellow px-2.5 py-1 text-xs text-on-tone-yellow">Demo Friday</span>}
    >
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {columns.map((column) => (
          <div key={column.name}>
            <p className="truncate text-xs text-muted">{column.name}</p>
            <div className="mt-2 space-y-2">
              {Array.from({ length: column.items }, (_, index) => (
                <span key={index} className={cn("block h-7 rounded-lg", column.tone)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

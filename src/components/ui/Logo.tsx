import { cn } from "@/lib/cn";

/** Rounded square in the primary blue with a "U" formed by two uprights joining. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)}>
      <rect width="32" height="32" rx="9" className="fill-brand" />
      <path
        d="M11 9.5v7a5 5 0 0 0 10 0v-7"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-on-brand"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.3rem] leading-none whitespace-nowrap">
        <span className="font-medium tracking-tight">UnityDev</span> <span className="text-muted">Digital</span>
      </span>
    </span>
  );
}

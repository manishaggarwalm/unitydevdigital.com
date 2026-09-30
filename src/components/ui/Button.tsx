import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/cn";

/** Material 3 button styles: filled, tonal, outlined and text. All are full pills. */
type Variant = "filled" | "tonal" | "outlined" | "text";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,box-shadow,color] duration-200 ease-m3 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  filled: "bg-brand text-on-brand hover:bg-brand-hover hover:shadow-[0_1px_3px_1px_rgb(0_0_0/0.15)]",
  tonal: "bg-brand-container text-on-brand-container hover:shadow-[0_1px_3px_1px_rgb(0_0_0/0.12)]",
  outlined: "border border-outline text-brand hover:bg-brand/8",
  text: "text-brand hover:bg-brand/8",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode; className?: string };

function Inner({ children, arrow }: Pick<Common, "children" | "arrow">) {
  return (
    <>
      <span>{children}</span>
      {arrow && <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />}
    </>
  );
}

export function ButtonLink({
  variant = "filled",
  size = "md",
  arrow,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "filled",
  size = "md",
  arrow,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

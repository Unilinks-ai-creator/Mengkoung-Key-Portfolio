import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center gap-2 rounded-full bg-fg text-bg px-5 py-2.5 text-[14px] font-medium hover:opacity-90 transition-opacity duration-300",
  secondary:
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-fg hover:bg-fg/5 transition-colors duration-300",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={`group ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={`group ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

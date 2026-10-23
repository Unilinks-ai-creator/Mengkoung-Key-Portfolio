import Link from "next/link";

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Mengkoung Key — Home"
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md border border-border bg-fg text-bg text-[13px] font-semibold tracking-tight ${className}`}
    >
      MK
    </Link>
  );
}

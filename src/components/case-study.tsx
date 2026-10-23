import Link from "next/link";
import type { ReactNode } from "react";

export function CaseStudyBack() {
  return (
    <div className="container-wide pt-6 md:pt-8">
      <Link
        href="/work"
        className="group inline-flex items-center gap-2 text-[13px] text-muted hover:text-fg transition-colors"
      >
        <span aria-hidden>←</span> Back to work
      </Link>
    </div>
  );
}

export function CaseStudySection({
  label,
  title,
  children,
}: {
  label?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="container-wide mt-20 md:mt-28">
      {label ? (
        <p className="text-label text-muted mb-4">{label}</p>
      ) : null}
      {title ? (
        <h2 className="text-h2 max-w-[820px]">{title}</h2>
      ) : null}
      <div className="mt-8 md:mt-10 grid gap-6">{children}</div>
    </section>
  );
}

export function MetaGrid({
  items,
}: {
  items: Array<{ label: string; value: ReactNode }>;
}) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 border-t border-border pt-8 md:pt-10">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-label text-muted">{item.label}</dt>
          <dd className="mt-3 text-[15px] leading-[1.55] text-fg">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ImpactStats({
  items,
}: {
  items: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="rounded-[24px] bg-[#0d0d0d] text-white px-6 md:px-12 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {items.map((s) => (
        <div key={s.label}>
          <p className="text-[32px] md:text-[44px] font-semibold tracking-tight">
            {s.value}
          </p>
          <p className="mt-2 text-[13px] text-white/60">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

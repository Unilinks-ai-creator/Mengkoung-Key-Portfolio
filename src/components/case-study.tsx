import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type {
  CaseStudy,
  CaseStudyFeature,
  CaseStudyImage,
  CaseStudyLesson,
  CaseStudyMetaItem,
  CaseStudyStat,
} from "@/lib/case-studies";

/* ------------------------------------------------------------------ */
/* Primitives (kept)                                                   */
/* ------------------------------------------------------------------ */

export function CaseStudyBack() {
  return (
    <div className="container-wide pt-24 md:pt-28">
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
        <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-4">
          {label}
        </p>
      ) : null}
      {title ? (
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1] max-w-[820px]">
          {title}
        </h2>
      ) : null}
      <div className="mt-8 md:mt-10">{children}</div>
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
          <dt className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted">
            {item.label}
          </dt>
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

/* ------------------------------------------------------------------ */
/* New data-driven template parts                                      */
/* ------------------------------------------------------------------ */

export function CaseStudyHero({
  index,
  title,
  category,
  tagline,
  liveUrl,
  liveLabel,
  hero,
}: Pick<
  CaseStudy,
  "index" | "title" | "category" | "tagline" | "liveUrl" | "liveLabel" | "hero"
>) {
  return (
    <section className="container-wide pt-8 md:pt-12 pb-6">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <p className="text-[12px] md:text-[13px] tracking-[0.14em] uppercase text-muted tabular-nums">
            {index}
          </p>
          <h1 className="mt-4 text-[48px] sm:text-[72px] md:text-[96px] font-bold leading-[0.95] tracking-[-0.035em]">
            {title}
          </h1>
          <p className="mt-4 text-[18px] md:text-[22px] font-medium text-muted">
            {category}
          </p>
          <p className="mt-7 md:mt-8 max-w-[540px] text-[16px] md:text-[18px] leading-[1.6] text-fg/80">
            {tagline}
          </p>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-bg px-5 py-2 text-[14px] md:text-[15px] font-medium text-fg hover:border-fg/40 transition-colors"
            >
              <span>{liveLabel ?? "Visit live site"}</span>
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] text-bg font-medium group-hover:translate-x-0.5 transition-transform duration-300"
                style={{ background: "var(--accent)" }}
              >
                ↗
              </span>
            </a>
          )}
        </div>

        <div className="aspect-[16/10] rounded-[20px] overflow-hidden bg-[#111] relative shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35),0_12px_30px_-12px_rgba(0,0,0,0.2)]">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function CaseStudyFeatures({
  label = "What I built",
  items,
}: {
  label?: string;
  items: CaseStudyFeature[];
}) {
  if (!items.length) return null;
  const cols =
    items.length >= 5
      ? "md:grid-cols-2 lg:grid-cols-3"
      : items.length === 4
        ? "md:grid-cols-2"
        : "md:grid-cols-3";
  return (
    <section className="container-wide mt-16 md:mt-24">
      <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-6">
        {label}
      </p>
      <div className={`grid gap-4 md:gap-5 ${cols}`}>
        {items.map((item, i) => (
          <article
            key={item.name}
            className="group h-full rounded-[20px] border border-border bg-fg/[0.02] hover:bg-fg/[0.035] hover:border-fg/15 transition-colors p-6 md:p-7 flex flex-col"
          >
            <span
              className="text-[11px] md:text-[12px] tabular-nums tracking-[0.14em] uppercase font-medium"
              style={{ color: "var(--accent)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-[20px] md:text-[22px] font-semibold tracking-[-0.015em]">
              {item.name}
            </h3>
            <p className="mt-3 text-[14px] md:text-[15px] leading-[1.6] text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyPitch({ children }: { children: ReactNode }) {
  return (
    <section className="container-wide mt-16 md:mt-24">
      <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-6">
        The pitch
      </p>
      <p className="max-w-[760px] text-[18px] md:text-[22px] leading-[1.55] text-fg/90">
        {children}
      </p>
    </section>
  );
}

export function CaseStudyGallery({
  images,
}: {
  images: CaseStudyImage[];
}) {
  if (!images.length) return null;
  return (
    <section className="container-wide mt-16 md:mt-24">
      <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-6">
        Gallery
      </p>
      <div className="grid gap-5 md:gap-6">
        {images.map((img, i) => (
          <figure
            key={img.src + i}
            className={
              i === 0
                ? "relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#111]"
                : "relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#111]"
            }
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            {img.caption && (
              <figcaption className="absolute left-4 bottom-4 md:left-6 md:bottom-6 max-w-[80%] rounded-full bg-black/55 backdrop-blur-sm border border-white/10 px-3.5 py-1.5 text-[12px] md:text-[13px] text-white/85">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyLessons({
  items,
}: {
  items: CaseStudyLesson[];
}) {
  if (!items.length) return null;
  return (
    <section className="container-wide mt-16 md:mt-24">
      <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-6">
        What I learned
      </p>
      <ul className="max-w-[820px] divide-y divide-border border-y border-border">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="group relative py-6 md:py-7 pl-5 md:pl-6 pr-3 grid grid-cols-[2rem_1fr] md:grid-cols-[3rem_1fr] gap-x-4 md:gap-x-6 items-baseline hover:bg-fg/[0.025] transition-colors"
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-[12px] md:text-[13px] tabular-nums"
              style={{ color: "var(--accent)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[18px] md:text-[20px] font-semibold tracking-[-0.015em]">
                {item.title}
              </p>
              {item.body && (
                <p className="mt-2 text-[14.5px] md:text-[15.5px] leading-[1.6] text-muted">
                  {item.body}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyNext({
  slug,
  title,
  category,
}: {
  slug: string;
  title: string;
  category: string;
}) {
  return (
    <section className="container-wide mt-20 md:mt-28 pb-16 md:pb-24">
      <Link
        href={`/work/${slug}`}
        className="group block border-t border-border pt-10 md:pt-14"
      >
        <div className="flex items-start md:items-end justify-between gap-6 md:gap-10 flex-col md:flex-row">
          <div>
            <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-3">
              Next project
            </p>
            <p className="text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-[0.95] tracking-[-0.03em] group-hover:translate-x-1 transition-transform duration-300">
              {title}
            </p>
            <p className="mt-3 text-[15px] md:text-[17px] text-muted">
              {category}
            </p>
          </div>
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-bg text-[18px] md:text-[20px] shrink-0 group-hover:translate-x-1 transition-transform duration-300"
            style={{ background: "var(--accent)" }}
          >
            →
          </span>
        </div>
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Re-export types for consumers                                       */
/* ------------------------------------------------------------------ */

export type {
  CaseStudy,
  CaseStudyFeature,
  CaseStudyImage,
  CaseStudyLesson,
  CaseStudyMetaItem,
  CaseStudyStat,
};

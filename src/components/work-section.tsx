"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type ProjectCategory } from "@/lib/content";

const filters: Array<"All" | ProjectCategory> = [
  "All",
  "Product",
  "EdTech",
  "Consumer",
  "E-commerce",
  "F&B",
  "Design",
];

export function WorkSection() {
  const [active, setActive] =
    useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.categories.includes(active));
  }, [active]);

  return (
    <>
      {/* Filter row with sliding active indicator */}
      <section className="container-wide pt-4 md:pt-6 pb-10 md:pb-14">
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className="relative inline-flex items-center justify-center px-4 py-2 text-[13px] font-medium rounded-full"
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-active-bg"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive ? "text-bg" : "text-fg/70 hover:text-fg"
                  }`}
                >
                  {f}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live result count */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[12px] md:text-[13px] text-muted">
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <motion.span
            key={filtered.length}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="text-fg font-medium tabular-nums">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "project" : "projects"}
            {active !== "All" && (
              <>
                {" "}
                in <span className="text-fg font-medium">{active}</span>
              </>
            )}
          </motion.span>
        </div>
      </section>

      {/* Typography-first project grid with layout animations */}
      <section className="container-wide pb-16 md:pb-24">
        <motion.div
          layout
          className="grid gap-4 md:gap-5 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 320,
                    damping: 32,
                  },
                  opacity: { duration: 0.3, ease: "easeOut" },
                  y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-[16px] text-muted">
              No projects in <span className="text-fg">{active}</span> yet.
            </p>
          </motion.div>
        )}
      </section>
    </>
  );
}

function ProjectCard({ project: p }: { project: typeof projects[number] }) {
  const internalHref = p.hasCaseStudy ? `/work/${p.slug}` : null;
  const externalHref = !p.hasCaseStudy && p.href ? p.href : null;
  const href = internalHref ?? externalHref;

  const inner = <ProjectCardInner project={p} isLink={Boolean(href)} />;

  if (internalHref) {
    return (
      <Link href={internalHref} className="block h-full">
        {inner}
      </Link>
    );
  }
  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {inner}
      </a>
    );
  }
  return <div className="h-full">{inner}</div>;
}

function ProjectCardInner({
  project: p,
  isLink,
}: {
  project: typeof projects[number];
  isLink: boolean;
}) {
  const ctaLabel = p.hasCaseStudy
    ? "View case study"
    : p.href
      ? "Visit live site"
      : "Case study coming soon";

  return (
    <motion.article
      whileHover={isLink ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className="group relative h-full rounded-[22px] border border-border bg-fg/[0.02] hover:bg-fg/[0.04] hover:border-fg/15 transition-colors p-7 md:p-9 lg:p-10 flex flex-col overflow-hidden"
    >
      {/* Soft accent glow halo on hover — top-origin radial */}
      <motion.span
        aria-hidden
        className="absolute -inset-px rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(500px circle at 50% 0%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 55%)",
        }}
      />

      {/* Top row — accent index + state badge + top-right arrow */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-[36px] md:text-[44px] font-bold leading-none tabular-nums tracking-[-0.03em]"
            style={{ color: "var(--accent)" }}
          >
            {p.index}
          </span>
          <span className="text-[12px] md:text-[13px] tracking-[0.14em] uppercase text-muted">
            {p.years}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <StateBadge project={p} />
          {isLink && <ArrowIcon />}
        </div>
      </div>

      {/* Title + category */}
      <div className="relative mt-10 md:mt-14">
        <h3 className="text-[32px] md:text-[42px] lg:text-[48px] leading-[1.02] tracking-[-0.025em] font-semibold">
          {p.title}
        </h3>
        <p className="mt-2 text-[14px] md:text-[15px] text-muted">
          {p.category} · {p.role}
        </p>
      </div>

      {/* Description */}
      <p className="relative mt-5 md:mt-6 text-[15px] md:text-[16px] leading-[1.65] text-fg/85 max-w-[52ch]">
        {p.description}
      </p>

      {/* Tags */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] md:text-[12.5px] text-muted group-hover:text-fg/75 transition-colors"
          >
            {tag}
          </span>
        )).reduce((acc, el, i) => {
          if (i === 0) return [el];
          return [
            ...acc,
            <span
              key={`sep-${i}`}
              aria-hidden
              className="text-border text-[12px] md:text-[12.5px]"
            >
              ·
            </span>,
            el,
          ];
        }, [] as React.ReactNode[])}
      </div>

      {/* Footer — CTA with sliding underline */}
      <div className="relative mt-auto pt-8 md:pt-10">
        <div className="flex items-center justify-between">
          <span className="relative inline-flex items-center gap-2 text-[14px] md:text-[15px] font-medium text-fg">
            {ctaLabel}
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: "var(--accent)" }}
            />
          </span>
          {(p.hasCaseStudy || p.href) && (
            <motion.span
              aria-hidden
              className="inline-flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: "var(--accent)" }}
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 text-bg"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {p.hasCaseStudy ? (
                  <>
                    <path d="M3 8h10" />
                    <path d="M9 4l4 4-4 4" />
                  </>
                ) : (
                  <>
                    <path d="M4 12L12 4" />
                    <path d="M6 4h6v6" />
                  </>
                )}
              </svg>
            </motion.span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function StateBadge({ project: p }: { project: typeof projects[number] }) {
  if (p.hasCaseStudy) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1 text-[10.5px] font-medium text-fg tracking-[0.12em] uppercase">
        Case study
      </span>
    );
  }
  if (p.href) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1 text-[10.5px] font-medium text-fg tracking-[0.12em] uppercase">
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1 text-[10.5px] font-medium text-muted tracking-[0.12em] uppercase">
      Archive
    </span>
  );
}

function ArrowIcon() {
  return (
    <motion.span
      aria-hidden
      className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-border text-muted shrink-0"
      initial={{ rotate: 0 }}
      whileHover={{ rotate: 15 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <svg
        viewBox="0 0 14 14"
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 11L11 3" />
        <path d="M5 3h6v6" />
      </svg>
    </motion.span>
  );
}

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { FeaturedWork } from "@/lib/content";

export function ProjectCard({ project }: { project: FeaturedWork }) {
  const [active, setActive] = useState(0);
  const imgSlides = project.slides.filter((s) => s.image);
  const total = project.slides.length;
  const hero = project.slides[active];
  const linkProps = project.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  const year = project.years.replace(/^Since\s+/i, "");
  const primaryTag = project.tags?.[0];
  const overlayTags = project.tags?.slice(1, 4) ?? [];

  return (
    <article
      ref={cardRef}
      className="group relative rounded-[16px] overflow-hidden border border-border bg-surface"
    >
      <Link
        href={project.href}
        {...linkProps}
        aria-label={`Visit ${project.title}`}
        className="relative block aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-surface"
      >
        {hero.image ? (
          <motion.img
            src={hero.image}
            alt={`${project.title} — ${hero.name}`}
            style={{ y: imgY }}
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-0 will-change-transform"
          >
            <ProjectFallback title={hero.name} index={project.index} />
          </motion.div>
        )}

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.78) 100%)",
          }}
        />

        {primaryTag && (
          <div className="absolute top-4 right-4 md:top-5 md:right-5">
            <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.14em] text-black">
              {primaryTag}
            </span>
          </div>
        )}

        {imgSlides.length === 0 && (
          <div className="absolute top-4 left-4 md:top-5 md:left-5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-white/90 text-[11px] uppercase tracking-[0.18em]">
            Coming soon
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p
              className="text-[12px] md:text-[13px] font-medium tracking-wide"
              style={{ color: "var(--accent)" }}
            >
              {year}
            </p>
            <h3 className="mt-1 text-[24px] md:text-[30px] font-semibold text-white tracking-[-0.02em] leading-[1.1] drop-shadow-sm">
              {project.title}
            </h3>
            {overlayTags.length > 0 && (
              <div className="mt-2.5 hidden sm:flex flex-wrap items-center gap-x-2 gap-y-1">
                {overlayTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] md:text-[13px] text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span
            aria-hidden
            className="shrink-0 inline-flex items-center gap-2 rounded-full pl-4 pr-2 py-2 text-[13px] md:text-[14px] font-medium text-white shadow-lg shadow-black/25 transition-transform duration-300 group-hover:-translate-y-0.5"
            style={{ background: "var(--accent)" }}
          >
            View
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-black text-[13px]">
              ↗
            </span>
          </span>
        </div>
      </Link>

      {total > 1 && (
        <div
          role="tablist"
          aria-label={`${project.title} screens`}
          className="flex items-center gap-1.5 px-5 md:px-7 py-4 border-t border-border/60"
        >
          {project.slides.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.name}
              onClick={() => setActive(i)}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                i === active ? "w-8" : "w-4 bg-border hover:bg-muted"
              }`}
              style={i === active ? { background: "var(--accent)" } : undefined}
            />
          ))}
        </div>
      )}
    </article>
  );
}

function ProjectFallback({ title, index }: { title: string; index: string }) {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 25% 15%, rgba(53,200,120,0.10) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(255,255,255,0.04) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 -bottom-8 md:-left-6 md:-bottom-12 select-none leading-none text-white/[0.045] font-bold tracking-tighter text-[160px] md:text-[240px]"
      >
        {index}
      </span>
      <h4 className="relative z-10 text-white/90 text-[28px] md:text-[38px] font-semibold tracking-[-0.02em] text-center px-6">
        {title}
      </h4>
    </div>
  );
}

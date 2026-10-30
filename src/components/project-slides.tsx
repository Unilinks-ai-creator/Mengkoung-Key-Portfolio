"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { FeaturedWork } from "@/lib/content";

const DEFAULT_BRAND = { bg: "#0a0a0a", mode: "dark" as const };

export function ProjectSlides({ projects }: { projects: FeaturedWork[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 110,
    mass: 0.6,
    restDelta: 0.0005,
  });

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${projects.length * 130}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
        {projects.map((project, i) => (
          <SlidePanel
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            progress={smoothProgress}
          />
        ))}

        <ProgressIndicator total={projects.length} progress={smoothProgress} />
      </div>
    </div>
  );
}

function SlidePanel({
  project,
  index,
  total,
  progress,
}: {
  project: FeaturedWork;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const end = (index + 1) * slot;
  const fade = slot * 0.3;

  const points = [
    Math.max(0, start - fade),
    start,
    Math.max(0, end - fade),
    end,
  ];

  const opacity = useTransform(progress, points, [
    index === 0 ? 1 : 0,
    1,
    1,
    index === total - 1 ? 1 : 0,
  ]);

  const y = useTransform(progress, points, [
    index === 0 ? "0%" : "22%",
    "0%",
    "0%",
    index === total - 1 ? "0%" : "-22%",
  ]);

  const scale = useTransform(progress, points, [
    index === 0 ? 1 : 0.98,
    1,
    1,
    index === total - 1 ? 1 : 0.98,
  ]);

  const primaryTag = project.tags?.[0];
  const hero = project.slides.find((s) => s.image) ?? project.slides[0];
  const linkProps = project.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const brand = project.brand ?? DEFAULT_BRAND;
  const isLight = brand.mode === "light";
  const fg = isLight ? "#0A1210" : "#FFFFFF";
  // Metadata (category subhead, year, tag) — small text, slightly dim is fine
  const mute = isLight ? "rgba(10, 18, 16, 0.68)" : "rgba(255, 255, 255, 0.82)";
  // Body paragraph — the main thing people read; needs strong contrast on
  // saturated brand backgrounds (red, orange, deep green, etc.)
  const bodyText = isLight
    ? "rgba(10, 18, 16, 0.82)"
    : "rgba(255, 255, 255, 0.92)";

  return (
    <motion.div
      data-cursor={isLight ? undefined : "light"}
      style={{ opacity, y, scale, background: brand.bg, color: fg }}
      className="absolute inset-0 flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-[44%] h-auto md:h-full flex flex-col justify-center p-7 md:p-14 lg:p-20 order-2 md:order-1 z-10">
        <div className="flex flex-col gap-7 md:gap-9">
          <div>
            <h3 className="text-[36px] md:text-[60px] lg:text-[76px] font-semibold tracking-[-0.03em] leading-[0.98]">
              {project.title}
            </h3>
            <p
              className="mt-3 text-[14px] md:text-[16px] font-medium tracking-tight"
              style={{ color: mute }}
            >
              {project.category}
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-[48ch]">
            <p className="text-[16px] md:text-[18px] lg:text-[19px] leading-[1.5] tracking-tight">
              {project.lede}
            </p>
            <p
              className="text-[14.5px] md:text-[15.5px] lg:text-[16px] leading-[1.6]"
              style={{ color: bodyText }}
            >
              {project.body}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <div
              className="flex items-center gap-2.5 text-[12px] md:text-[13px] font-medium tracking-tight"
              style={{ color: mute }}
            >
              <span>{project.years}</span>
              {primaryTag && (
                <>
                  <span aria-hidden style={{ opacity: 0.35 }}>
                    ·
                  </span>
                  <span>{primaryTag}</span>
                </>
              )}
            </div>

            <Link
              href={project.href}
              {...linkProps}
              aria-label={`Visit ${project.title}`}
              className="group inline-flex items-center gap-2 self-start text-[14px] md:text-[15px] font-medium underline underline-offset-[6px] decoration-[1.5px] transition-opacity hover:opacity-80"
              style={{
                color: fg,
                textDecorationColor: isLight
                  ? "rgba(10,18,16,0.35)"
                  : "rgba(255,255,255,0.4)",
              }}
            >
              Visit project
              <span className="text-[13px] transition-transform duration-300 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-[56%] md:h-full flex items-center justify-center p-5 md:p-10 lg:p-14 order-1 md:order-2 min-h-[280px]">
        {hero.image ? (
          <img
            src={hero.image}
            alt={`${project.title} — ${hero.name}`}
            className="max-w-full max-h-full rounded-xl shadow-2xl shadow-black/30"
            style={{ display: "block" }}
          />
        ) : (
          <ProjectFallback title={hero.name} index={project.index} />
        )}
      </div>
    </motion.div>
  );
}

function ProgressIndicator({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute top-5 md:top-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/30 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
      {Array.from({ length: total }).map((_, i) => (
        <ProgressDot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const mid = start + slot / 2;
  const end = (index + 1) * slot;

  const width = useTransform(
    progress,
    [start, mid, end],
    ["14px", "28px", "14px"],
  );
  const opacity = useTransform(
    progress,
    [start, mid, end],
    [0.35, 1, 0.35],
  );

  return (
    <motion.span
      style={{ width, opacity }}
      className="h-[3px] rounded-full bg-white"
    />
  );
}

function ProjectFallback({ title, index }: { title: string; index: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-black/15">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 -bottom-8 md:-left-6 md:-bottom-12 select-none leading-none opacity-[0.08] font-bold tracking-tighter text-[160px] md:text-[240px]"
      >
        {index}
      </span>
      <h4 className="relative z-10 text-[28px] md:text-[38px] font-semibold tracking-[-0.02em] text-center px-6">
        {title}
      </h4>
    </div>
  );
}

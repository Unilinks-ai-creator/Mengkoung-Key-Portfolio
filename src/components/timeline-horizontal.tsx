"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { TimelineItem } from "@/lib/content";

export function TimelineHorizontal({ items }: { items: TimelineItem[] }) {
  return (
    <>
      <PinnedTrack items={items} />
      <MobileSwipe items={items} />
    </>
  );
}

/* ----------------------------- Desktop: pinned ----------------------------- */

function PinnedTrack({ items }: { items: TimelineItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const update = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setMaxTranslate(Math.max(0, trackWidth - viewportWidth));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  // Decorative background drifts
  const blobX1 = useTransform(scrollYProgress, [0, 1], ["-5%", "90%"]);
  const blobX2 = useTransform(scrollYProgress, [0, 1], ["90%", "-5%"]);
  const gridX = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]);

  return (
    <div
      ref={sectionRef}
      className="hidden md:block relative"
      style={{ height: `${items.length * 55}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 1 — Base gradient landscape */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--bg) 0%, color-mix(in oklab, var(--fg) 3%, var(--bg)) 50%, var(--bg) 100%)",
          }}
        />

        {/* 2 — Drifting grid texture */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--fg) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            x: gridX,
          }}
        />

        {/* 3 — Drifting accent blobs */}
        <motion.div
          aria-hidden
          className="absolute top-[20%] w-[45vw] h-[35vh] rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 70%)",
            left: blobX1,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[20%] w-[35vw] h-[30vh] rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--fg) 20%, transparent) 0%, transparent 70%)",
            left: blobX2,
          }}
        />

        {/* 4 — The horizontal journey rail */}
        <div
          aria-hidden
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none"
        >
          <div className="relative">
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--fg) 25%, transparent) 10%, color-mix(in oklab, var(--fg) 25%, transparent) 90%, transparent 100%)",
              }}
            />
            {/* Fading beams emanating from the rail */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in oklab, var(--accent) 60%, transparent), transparent)",
                opacity: 0.4,
                filter: "blur(2px)",
              }}
            />
          </div>
        </div>

        {/* 5 — Horizontal track with cards (edge-faded) */}
        <div
          className="relative h-full flex items-center"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-6 lg:gap-10 px-16 lg:px-24 will-change-transform"
          >
            {items.map((item, i) => (
              <TimelineCard
                key={`${item.year}-${i}`}
                item={item}
                index={i}
                total={items.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
            <div aria-hidden className="shrink-0 w-24 lg:w-32" />
          </motion.div>
        </div>

        {/* 6 — Progress chrome */}
        <PinnedProgress
          scrollYProgress={scrollYProgress}
          total={items.length}
        />
      </div>
    </div>
  );
}

/* ------------------------------- Card ------------------------------- */

function TimelineCard({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: TimelineItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isAbove = index % 2 === 0;

  // Card's "focal moment" — the scroll progress at which it's at viewport center.
  // Function-form useTransform avoids WAAPI's offset-range constraint (0..1),
  // which the array form would violate for the first and last cards.
  const cardCenterProgress = (index + 0.5) / total;
  const focalWindow = 1 / total;

  const opacity = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - cardCenterProgress);
    const inner = focalWindow * 0.5;
    const outer = focalWindow * 1.5;
    if (dist <= inner) return 1;
    if (dist >= outer) return 0.35;
    const t = (dist - inner) / (outer - inner);
    return 1 - t * 0.65;
  });

  const scale = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - cardCenterProgress);
    if (dist >= focalWindow) return 0.94;
    const t = dist / focalWindow;
    return 1 - t * 0.06;
  });

  return (
    <motion.div
      style={{ opacity, scale }}
      className="shrink-0 w-[300px] lg:w-[340px] relative"
    >
      {/* The 3-row vertical layout: top-slot | rail | bottom-slot */}
      <div className="grid grid-rows-[1fr_auto_1fr] h-[72vh] max-h-[640px]">
        {/* Top slot */}
        <div className="relative flex items-end justify-center pb-6">
          {isAbove && (
            <>
              <Card item={item} index={index} />
              <Connector direction="down" />
            </>
          )}
        </div>

        {/* Rail dot + year tag */}
        <div className="relative flex items-center justify-center h-0">
          <RailDot year={item.year} isAbove={isAbove} />
        </div>

        {/* Bottom slot */}
        <div className="relative flex items-start justify-center pt-6">
          {!isAbove && (
            <>
              <Connector direction="up" />
              <Card item={item} index={index} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Card({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <article className="relative w-full rounded-[22px] border border-border bg-surface p-6 lg:p-7 flex flex-col shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25),0_2px_6px_-2px_rgba(0,0,0,0.06)]">
      <div className="flex items-baseline justify-between">
        <span
          className="text-[11px] lg:text-[12px] tracking-[0.18em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          {item.year}
        </span>
        <span className="text-[10px] lg:text-[11px] tabular-nums text-muted">
          No. {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 text-[19px] lg:text-[21px] font-semibold tracking-[-0.015em]">
        {item.title}
      </h3>
      <p className="mt-3 text-[13.5px] lg:text-[14.5px] leading-[1.6] text-muted">
        {item.body}
      </p>
    </article>
  );
}

function Connector({ direction }: { direction: "up" | "down" }) {
  return (
    <div
      aria-hidden
      className={`absolute left-1/2 -translate-x-1/2 w-px ${
        direction === "down" ? "top-full" : "bottom-full"
      }`}
      style={{
        height: "24px",
        background:
          direction === "down"
            ? "linear-gradient(to bottom, color-mix(in oklab, var(--accent) 70%, transparent), color-mix(in oklab, var(--accent) 15%, transparent))"
            : "linear-gradient(to top, color-mix(in oklab, var(--accent) 70%, transparent), color-mix(in oklab, var(--accent) 15%, transparent))",
      }}
    />
  );
}

function RailDot({ year, isAbove }: { year: string; isAbove: boolean }) {
  return (
    <>
      {/* Outer glow ring */}
      <span
        aria-hidden
        className="absolute w-6 h-6 rounded-full"
        style={{
          background: "color-mix(in oklab, var(--accent) 25%, transparent)",
          filter: "blur(4px)",
        }}
      />
      {/* Core dot */}
      <span
        aria-hidden
        className="relative w-3 h-3 rounded-full"
        style={{
          background: "var(--accent)",
          boxShadow:
            "0 0 0 4px var(--bg), 0 0 0 5px color-mix(in oklab, var(--accent) 40%, transparent)",
        }}
      />
      {/* Year label */}
      <span
        className="absolute text-[10px] tracking-[0.22em] uppercase text-muted"
        style={{
          [isAbove ? "top" : "bottom"]: "18px",
          whiteSpace: "nowrap",
        }}
      >
        {year}
      </span>
    </>
  );
}

/* ----------------------------- Progress chrome ----------------------------- */

function PinnedProgress({
  scrollYProgress,
  total,
}: {
  scrollYProgress: MotionValue<number>;
  total: number;
}) {
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const currentIndex = useTransform(scrollYProgress, (p) => {
    const i = Math.min(total, Math.max(1, Math.ceil(p * total)));
    return String(i).padStart(2, "0");
  });

  return (
    <div className="absolute bottom-8 left-0 right-0 pointer-events-none">
      <div className="container-wide">
        <div className="flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-muted mb-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span>Scroll to walk the journey</span>
          </div>
          <div className="flex items-center gap-2 text-fg">
            <motion.span className="tabular-nums">{currentIndex}</motion.span>
            <span className="text-muted">/</span>
            <span className="text-muted tabular-nums">
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div
          className="h-px w-full overflow-hidden"
          style={{ background: "color-mix(in oklab, var(--fg) 10%, transparent)" }}
        >
          <motion.div
            style={{ width, background: "var(--accent)" }}
            className="h-full origin-left"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Mobile swipe ------------------------------ */

function MobileSwipe({ items }: { items: TimelineItem[] }) {
  return (
    <div className="md:hidden">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-10 -mx-6 scroll-pl-6">
        {items.map((item, i) => (
          <div
            key={`${item.year}-${i}`}
            className="shrink-0 w-[82%] max-w-[320px] snap-start"
          >
            <article className="h-[360px] rounded-[20px] border border-border bg-surface shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)] p-6 flex flex-col">
              <div className="flex items-baseline justify-between">
                <span
                  className="text-[12px] tracking-[0.18em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  {item.year}
                </span>
                <span className="text-[11px] tabular-nums text-muted">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.015em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-muted">
                {item.body}
              </p>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

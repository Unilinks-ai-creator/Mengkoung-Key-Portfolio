"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FeaturedSlide } from "@/lib/content";

export function ProjectCarousel({
  slides,
  projectTitle,
}: {
  slides: FeaturedSlide[];
  projectTitle: string;
}) {
  const [current, setCurrent] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (i: number) => setCurrent(((i % total) + total) % total),
    [total],
  );
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || total <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, total]);

  const slide = slides[current];

  return (
    <div ref={rootRef} className="w-full">
      <div className="group relative aspect-[4/3] rounded-[20px] bg-[#0a0a0a] border border-white/[0.06] overflow-hidden shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]">
        {slides.map((s, i) => (
          <div
            key={s.name}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={i !== current}
          >
            {s.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={s.image}
                alt={`${projectTitle} — ${s.name}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 25% 15%, rgba(47,92,255,0.09) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(255,255,255,0.03) 0%, transparent 55%)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-6 -bottom-10 md:-left-8 md:-bottom-16 select-none leading-none"
                >
                  <span className="text-white/[0.045] font-semibold tracking-tighter text-[160px] md:text-[240px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative z-10 text-center px-8">
                  <h4 className="text-white/90 text-[26px] md:text-[38px] font-medium tracking-[-0.02em] leading-[1.05]">
                    {s.name}
                  </h4>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <span aria-hidden className="h-px w-8 bg-white/15" />
                    <span className="text-white/45 text-[10px] md:text-[11px] uppercase tracking-[0.28em]">
                      {projectTitle}
                    </span>
                    <span aria-hidden className="h-px w-8 bg-white/15" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="pointer-events-none absolute top-5 right-5 text-[11px] uppercase tracking-[0.28em] text-white/45 tabular-nums font-medium">
          {String(current + 1).padStart(2, "0")}
          <span className="mx-1.5 text-white/20">/</span>
          {String(total).padStart(2, "0")}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300"
            >
              <span aria-hidden className="text-[15px] leading-none">
                ←
              </span>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300"
            >
              <span aria-hidden className="text-[15px] leading-none">
                →
              </span>
            </button>
          </>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p
          className="text-[13px] md:text-[14px] font-medium text-fg"
          aria-live="polite"
        >
          {slide.name}
        </p>
        {total > 1 && (
          <div className="flex items-center gap-1.5" role="tablist">
            {slides.map((s, i) => (
              <button
                key={s.name}
                type="button"
                role="tab"
                aria-label={`Show ${s.name}`}
                aria-selected={i === current}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-fg"
                    : "w-1.5 bg-border hover:bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

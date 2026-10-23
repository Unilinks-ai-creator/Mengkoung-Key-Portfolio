"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { ProjectPreview } from "@/components/project-preview";
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

export default function WorkPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.categories.includes(active));
  }, [active]);

  return (
    <>
      <section className="container-wide pt-10 md:pt-16 pb-6 md:pb-10">
        <Reveal>
          <p className="text-label text-muted flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Work & Projects
          </p>
        </Reveal>

        <div className="mt-6 md:mt-8 grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-end">
          <Reveal delay={0.05}>
            <h1 className="text-display">Selected work</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[15px] md:text-[17px] text-muted max-w-[440px] md:justify-self-end">
              Five ventures across e-commerce, F&amp;B, education and product
              — from a Japanese restaurant in Bangkok to an education platform
              serving 150+ students.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="mt-10 md:mt-14 flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = f === active;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium border transition-all duration-300 ${
                    isActive
                      ? "bg-fg text-bg border-fg"
                      : "bg-transparent text-fg border-border hover:border-fg/40"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section className="container-wide mt-6 md:mt-10 mb-24 md:mb-32">
        <div className="grid gap-16 md:gap-20">
          {filtered.map((p, i) => {
            const href = p.hasCaseStudy
              ? `/work/${p.slug}`
              : p.href ?? undefined;
            const isLink = Boolean(href);
            const Wrapper = ({ children }: { children: React.ReactNode }) =>
              isLink ? (
                <Link
                  href={href!}
                  className="group grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center"
                >
                  {children}
                </Link>
              ) : (
                <div className="group grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
                  {children}
                </div>
              );

            return (
              <Reveal key={p.slug} delay={i * 0.04}>
                <Wrapper>
                  <div className="aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-[16px]">
                    <div className="w-full h-full card-hover-image">
                      <ProjectPreview
                        variant={p.device ?? "desktop"}
                        title={p.title}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] text-muted">
                      {p.index} · {p.years}
                    </p>
                    <h2 className="mt-2 text-[28px] md:text-[36px] font-semibold tracking-tight">
                      {p.title}
                    </h2>
                    <p className="mt-1 text-[15px] text-muted">
                      {p.category} · {p.role}
                    </p>
                    <p className="mt-5 max-w-[520px] text-[15px] md:text-[16px] leading-[1.6] text-fg/80">
                      {p.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-[12px] text-fg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {isLink ? (
                      <div className="mt-8">
                        <span className="group inline-flex items-center gap-2 text-[14px] font-medium">
                          {p.hasCaseStudy ? "View case study" : "Learn more"}
                          <span aria-hidden className="hover-arrow">→</span>
                        </span>
                      </div>
                    ) : (
                      <p className="mt-8 text-[13px] text-muted">
                        Case study coming soon
                      </p>
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

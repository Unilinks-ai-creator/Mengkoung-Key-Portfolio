"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFeaturedWork } from "@/lib/projects";
import type { FeaturedWork } from "@/lib/content";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<FeaturedWork[] | null>(null);

  const refresh = useCallback(async () => {
    const ps = await getFeaturedWork();
    setProjects(ps);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="px-8 md:px-12 py-10 md:py-14 max-w-6xl">
      <header>
        <p className="text-[12px] uppercase tracking-[0.22em] text-muted">
          Projects
        </p>
        <h1 className="text-h2 mt-3">
          Featured work ({projects?.length ?? 0})
        </h1>
        <p className="mt-2 text-muted text-[15px]">
          Edit project cards, slides, and copy shown on the home page.
        </p>
      </header>

      <ul className="mt-10 flex flex-col divide-y divide-border border-y border-border">
        {(projects ?? []).map((p) => (
          <li key={p.slug}>
            <Link
              href={`/admin/project/${p.slug}`}
              className="flex items-center justify-between gap-4 py-4 hover:bg-fg/[0.02] transition-colors -mx-6 px-6"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="font-mono text-[13px] text-muted tabular-nums">
                  {p.index}
                </span>
                <div className="min-w-0">
                  <p className="text-[16px] font-medium text-fg truncate">
                    {p.title}
                  </p>
                  <p className="text-[13px] text-muted truncate">
                    {p.category} · {p.years}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="text-[12px] text-muted tabular-nums">
                  {p.slides.length} slide{p.slides.length === 1 ? "" : "s"}
                </span>
                <span className="text-[13px] text-fg">Edit →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

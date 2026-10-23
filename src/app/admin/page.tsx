"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  getFeaturedWork,
  seedFromCode,
  SEED_PROJECTS,
} from "@/lib/projects";
import type { FeaturedWork } from "@/lib/content";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<FeaturedWork[] | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedError, setSeedError] = useState<string | null>(null);
  const [seeded, setSeeded] = useState(false);

  const refresh = useCallback(async () => {
    const ps = await getFeaturedWork();
    setProjects(ps);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isFromSeed =
    projects !== null &&
    projects.length === SEED_PROJECTS.length &&
    projects.every((p, i) => p.slug === SEED_PROJECTS[i]?.slug);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedError(null);
    try {
      await seedFromCode();
      setSeeded(true);
      await refresh();
    } catch (e) {
      setSeedError(e instanceof Error ? e.message : "Seed failed");
    } finally {
      setSeeding(false);
    }
  };

  const totalSlides =
    projects?.reduce((n, p) => n + p.slides.length, 0) ?? 0;
  const totalImages =
    projects?.reduce(
      (n, p) => n + p.slides.filter((s) => s.image).length,
      0,
    ) ?? 0;

  return (
    <div className="px-8 md:px-12 py-10 md:py-14 max-w-6xl">
      <header className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[12px] uppercase tracking-[0.22em] text-muted">
            Dashboard
          </p>
          <h1 className="text-h2 mt-3">Welcome back.</h1>
          <p className="mt-2 text-muted text-[15px]">
            Manage your projects, About page, and contact info.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[13px] font-medium text-bg hover:opacity-90 transition-opacity"
        >
          View live site
          <span aria-hidden>↗</span>
        </Link>
      </header>

      {isFromSeed && (
        <div className="mt-10 rounded-2xl border border-border bg-fg/[0.02] p-6 flex items-start justify-between gap-6 flex-wrap">
          <div className="min-w-0">
            <p className="text-[14px] font-medium text-fg">
              Firestore is empty — showing seed data from code.
            </p>
            <p className="mt-1.5 text-[13px] text-muted">
              Click &ldquo;Seed Firestore&rdquo; once to push the current
              projects into Firestore. All edits then happen here and the live
              site reads from Firestore.
            </p>
            {seedError && (
              <p className="mt-3 text-[13px] text-red-500">{seedError}</p>
            )}
            {seeded && (
              <p className="mt-3 text-[13px] text-green-600">
                Seeded. Reload the home page (revalidates within 60s).
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-fg px-5 py-2.5 text-[13px] font-medium text-bg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {seeding ? "Seeding…" : "Seed Firestore"}
          </button>
        </div>
      )}

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Projects" value={projects?.length ?? 0} />
        <StatCard label="Slides" value={totalSlides} />
        <StatCard
          label="Images uploaded"
          value={totalImages}
          suffix={
            totalSlides > 0 ? ` / ${totalSlides}` : undefined
          }
        />
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickLink
          href="/admin/projects"
          title="Projects"
          description={`Edit your ${projects?.length ?? 0} featured projects, slides and copy.`}
        />
        <QuickLink
          href="/admin/about"
          title="About"
          description="Update your name, role, bio and avatar."
        />
        <QuickLink
          href="/admin/contact"
          title="Contact"
          description="Email and social handles shown across the site."
        />
        <QuickLink
          href="/admin/upload"
          title="Assets"
          description="Bulk-upload images for any project."
        />
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] uppercase tracking-[0.22em] text-muted">
            Recent projects
          </h2>
          <Link
            href="/admin/projects"
            className="text-[13px] text-muted hover:text-fg transition-colors"
          >
            View all →
          </Link>
        </div>
        <ul className="mt-4 flex flex-col divide-y divide-border border-y border-border">
          {(projects ?? []).slice(0, 5).map((p) => (
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
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-border p-5 bg-fg/[0.01]">
      <p className="text-[12px] uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-3 text-[32px] font-semibold tracking-tight text-fg tabular-nums">
        {value}
        {suffix && (
          <span className="text-[18px] text-muted font-normal">{suffix}</span>
        )}
      </p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border p-5 hover:bg-fg/[0.02] transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-fg">{title}</p>
          <p className="mt-1 text-[13px] text-muted">{description}</p>
        </div>
        <span className="text-[16px] text-muted group-hover:text-fg group-hover:translate-x-0.5 transition-all">
          →
        </span>
      </div>
    </Link>
  );
}

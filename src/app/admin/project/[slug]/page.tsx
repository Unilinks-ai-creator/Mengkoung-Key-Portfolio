"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import {
  getFeaturedWork,
  getProjectBySlug,
  saveProject,
} from "@/lib/projects";
import type { FeaturedSlide, FeaturedWork } from "@/lib/content";

export default function AdminProjectPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug ?? "";

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<FeaturedWork | null>(null);
  const [order, setOrder] = useState(0);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const [p, all] = await Promise.all([
        getProjectBySlug(slug),
        getFeaturedWork(),
      ]);
      setProject(p);
      const idx = all.findIndex((x) => x.slug === slug);
      setOrder(idx >= 0 ? idx : all.length);
      setLoading(false);
    })();
  }, [slug]);

  const patch = useCallback(<K extends keyof FeaturedWork>(k: K, v: FeaturedWork[K]) => {
    setProject((prev) => (prev ? { ...prev, [k]: v } : prev));
    setSaved(false);
  }, []);

  const setSlide = (i: number, next: Partial<FeaturedSlide>) => {
    setProject((prev) => {
      if (!prev) return prev;
      const slides = [...prev.slides];
      slides[i] = { ...slides[i], ...next };
      return { ...prev, slides };
    });
    setSaved(false);
  };

  const addSlide = () => {
    setProject((prev) =>
      prev
        ? { ...prev, slides: [...prev.slides, { name: "New slide" }] }
        : prev,
    );
    setSaved(false);
  };

  const removeSlide = (i: number) => {
    setProject((prev) =>
      prev ? { ...prev, slides: prev.slides.filter((_, j) => j !== i) } : prev,
    );
    setSaved(false);
  };

  const moveSlide = (i: number, dir: -1 | 1) => {
    setProject((prev) => {
      if (!prev) return prev;
      const slides = [...prev.slides];
      const j = i + dir;
      if (j < 0 || j >= slides.length) return prev;
      [slides[i], slides[j]] = [slides[j], slides[i]];
      return { ...prev, slides };
    });
    setSaved(false);
  };

  const uploadFor = async (i: number, file: File) => {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `work/${slug}/${Date.now()}-${safe}`;
    const r = storageRef(storage, path);
    await uploadBytes(r, file, { contentType: file.type });
    const url = await getDownloadURL(r);
    setSlide(i, { image: url });
  };

  const handleSave = async () => {
    if (!project) return;
    setSaving(true);
    setSaveError(null);
    try {
      await saveProject(project, order);
      setSaved(true);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="px-8 md:px-12 py-14">
        <p className="text-muted text-sm">Loading…</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="px-8 md:px-12 py-14">
        <h1 className="text-h2">Project not found</h1>
        <Link
          href="/admin/projects"
          className="mt-6 inline-block text-fg underline underline-offset-4"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 py-10 md:py-14 max-w-4xl">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <Link
            href="/admin/projects"
            className="text-[12px] uppercase tracking-[0.22em] text-muted hover:text-fg transition-colors"
          >
            ← Projects
          </Link>
          <h1 className="text-h2 mt-3 truncate">{project.title}</h1>
          <p className="mt-2 text-muted text-[14px] font-mono">
            /{project.slug}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-[14px] font-medium text-bg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && <span className="text-[12px] text-green-600">Saved.</span>}
          {saveError && (
            <span className="text-[12px] text-red-500 max-w-xs text-right">
              {saveError}
            </span>
          )}
        </div>
      </div>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <Field label="Index" value={project.index} onChange={(v) => patch("index", v)} />
        <Field label="Title" value={project.title} onChange={(v) => patch("title", v)} />
        <Field label="Category" value={project.category} onChange={(v) => patch("category", v)} />
        <Field label="Years" value={project.years} onChange={(v) => patch("years", v)} />
        <Field label="Role" value={project.role} onChange={(v) => patch("role", v)} />
        <Field label="Href" value={project.href} onChange={(v) => patch("href", v)} />

        <label className="flex items-center gap-3 md:col-span-2 select-none">
          <input
            type="checkbox"
            checked={project.external ?? false}
            onChange={(e) => patch("external", e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          <span className="text-[14px] text-fg">External link (open in new tab)</span>
        </label>

        <div className="md:col-span-2">
          <Field
            label="Lede (one-line pitch)"
            value={project.lede}
            onChange={(v) => patch("lede", v)}
            textarea
          />
        </div>
        <div className="md:col-span-2">
          <Field
            label="Body (1–2 sentences)"
            value={project.body}
            onChange={(v) => patch("body", v)}
            textarea
            rows={4}
          />
        </div>
        <div className="md:col-span-2">
          <Field
            label="Traction (optional)"
            value={project.traction ?? ""}
            onChange={(v) => patch("traction", v)}
          />
        </div>

        <div className="md:col-span-2">
          <Field
            label="Tags (comma-separated)"
            value={(project.tags ?? []).join(", ")}
            onChange={(v) =>
              patch(
                "tags",
                v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] uppercase tracking-[0.22em] text-muted">
            Slides ({project.slides.length})
          </h2>
          <button
            type="button"
            onClick={addSlide}
            className="text-[13px] text-fg hover:opacity-70 transition-opacity"
          >
            + Add slide
          </button>
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {project.slides.map((slide, i) => (
            <li
              key={i}
              className="rounded-2xl border border-border p-5 flex flex-col md:flex-row gap-5 items-start"
            >
              <div className="w-full md:w-48 shrink-0 aspect-[16/10] rounded-lg overflow-hidden bg-fg/[0.03] border border-border flex items-center justify-center">
                {slide.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[12px] text-muted">No image</span>
                )}
              </div>

              <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
                <Field
                  label={`Slide ${i + 1} name`}
                  value={slide.name}
                  onChange={(v) => setSlide(i, { name: v })}
                />
                <Field
                  label="Image URL"
                  value={slide.image ?? ""}
                  onChange={(v) => setSlide(i, { image: v || undefined })}
                />

                <div className="flex items-center flex-wrap gap-2 pt-1">
                  <label className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] text-fg cursor-pointer hover:bg-fg hover:text-bg transition-colors">
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadFor(i, f);
                      }}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => moveSlide(i, -1)}
                    disabled={i === 0}
                    className="rounded-full border border-border px-3 py-2 text-[13px] text-fg disabled:opacity-40 hover:bg-fg/[0.04] transition-colors"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSlide(i, 1)}
                    disabled={i === project.slides.length - 1}
                    className="rounded-full border border-border px-3 py-2 text-[13px] text-fg disabled:opacity-40 hover:bg-fg/[0.04] transition-colors"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSlide(i)}
                    className="ml-auto rounded-full border border-border px-3 py-2 text-[13px] text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="text-[13px] text-muted hover:text-fg transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-[14px] font-medium text-bg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border border-border bg-transparent px-4 py-3 text-[15px] text-fg outline-none focus:border-fg resize-vertical"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border border-border bg-transparent px-4 py-3 text-[15px] text-fg outline-none focus:border-fg"
        />
      )}
    </label>
  );
}

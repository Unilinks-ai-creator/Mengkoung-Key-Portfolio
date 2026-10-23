"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import { getFeaturedWork } from "@/lib/projects";
import type { FeaturedWork } from "@/lib/content";

type Uploaded = {
  slug: string;
  filename: string;
  url: string;
};

export default function AdminUploadPage() {
  const [projects, setProjects] = useState<FeaturedWork[]>([]);
  const [slug, setSlug] = useState<string>("unilinks");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState<Uploaded[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    getFeaturedWork().then((ps) => {
      setProjects(ps);
      if (ps[0]) setSlug(ps[0].slug);
    });
  }, []);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      setUploading(true);
      setUploadError(null);
      try {
        const list = Array.from(files);
        const results: Uploaded[] = [];
        for (const file of list) {
          const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
          const path = `work/${slug}/${Date.now()}-${safe}`;
          const r = storageRef(storage, path);
          await uploadBytes(r, file, { contentType: file.type });
          const url = await getDownloadURL(r);
          results.push({ slug, filename: safe, url });
        }
        setUploads((prev) => [...results, ...prev]);
      } catch (e) {
        setUploadError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [slug],
  );

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) upload(e.dataTransfer.files);
  };

  return (
    <div className="px-8 md:px-12 py-10 md:py-14 max-w-4xl">
      <header>
        <p className="text-[12px] uppercase tracking-[0.22em] text-muted">
          Assets
        </p>
        <h1 className="text-h2 mt-3">Bulk upload</h1>
        <p className="mt-2 text-muted text-[15px]">
          Drop images to upload them to a project&apos;s Storage folder.
        </p>
      </header>

      <div className="mt-10 flex items-center gap-3">
        <label className="text-[13px] uppercase tracking-[0.18em] text-muted">
          Project
        </label>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="rounded-lg border border-border bg-transparent px-3 py-2 text-[14px] text-fg"
        >
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`mt-8 block cursor-pointer rounded-2xl border-2 border-dashed p-16 text-center transition-colors ${
          dragging
            ? "border-fg bg-fg/[0.03]"
            : "border-border hover:border-muted"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && upload(e.target.files)}
          disabled={uploading}
        />
        <p className="text-[16px] text-fg font-medium">
          {uploading ? "Uploading…" : "Drop images here, or click to browse"}
        </p>
        <p className="mt-2 text-[13px] text-muted">
          Uploads to <code>work/{slug}/</code>
        </p>
      </label>

      {uploadError && (
        <p className="mt-4 text-[13px] text-red-500">{uploadError}</p>
      )}

      {uploads.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[13px] uppercase tracking-[0.22em] text-muted">
            Uploaded ({uploads.length})
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {uploads.map((u) => (
              <li
                key={u.url}
                className="flex items-center gap-4 rounded-xl border border-border p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={u.url}
                  alt=""
                  className="h-16 w-24 rounded-md object-cover bg-border"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-muted truncate">
                    {u.slug} · {u.filename}
                  </p>
                  <p className="text-[12px] text-fg font-mono truncate">
                    {u.url}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(u.url)}
                  className="rounded-full border border-border px-3 py-1.5 text-[12px] text-fg hover:bg-fg hover:text-bg transition-colors"
                >
                  Copy URL
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

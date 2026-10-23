"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import {
  DEFAULT_ABOUT,
  getAbout,
  saveAbout,
  type AboutData,
} from "@/lib/site-config";

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    (async () => {
      const d = await getAbout();
      setData(d);
      setLoading(false);
    })();
  }, []);

  const patch = useCallback(
    <K extends keyof AboutData>(k: K, v: AboutData[K]) => {
      setData((prev) => ({ ...prev, [k]: v }));
      setSaved(false);
    },
    [],
  );

  const uploadAvatar = async (file: File) => {
    setUploadingAvatar(true);
    setError(null);
    try {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `avatars/${Date.now()}-${safe}`;
      const r = storageRef(storage, path);
      await uploadBytes(r, file, { contentType: file.type });
      const url = await getDownloadURL(r);
      patch("avatarUrl", url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveAbout(data);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
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

  return (
    <div className="px-8 md:px-12 py-10 md:py-14 max-w-4xl">
      <header className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[12px] uppercase tracking-[0.22em] text-muted">
            About
          </p>
          <h1 className="text-h2 mt-3">Your profile</h1>
          <p className="mt-2 text-muted text-[15px]">
            Shown across the home page hero and About page.
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
          {error && (
            <span className="text-[12px] text-red-500 max-w-xs text-right">
              {error}
            </span>
          )}
        </div>
      </header>

      <section className="mt-12 flex items-start gap-6">
        <div className="h-24 w-24 rounded-full overflow-hidden bg-fg/[0.04] border border-border flex items-center justify-center shrink-0">
          {data.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.avatarUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[11px] text-muted">No photo</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] uppercase tracking-[0.18em] text-muted">
            Profile photo
          </p>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <label className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] text-fg cursor-pointer hover:bg-fg hover:text-bg transition-colors">
              {uploadingAvatar ? "Uploading…" : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadAvatar(f);
                }}
              />
            </label>
            {data.avatarUrl && (
              <button
                type="button"
                onClick={() => patch("avatarUrl", "")}
                className="text-[13px] text-muted hover:text-red-500 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <Field label="Name" value={data.name} onChange={(v) => patch("name", v)} />
        <Field label="Role" value={data.role} onChange={(v) => patch("role", v)} />
        <Field label="Location" value={data.location} onChange={(v) => patch("location", v)} />
        <Field label="Tagline (one-liner)" value={data.tagline} onChange={(v) => patch("tagline", v)} />
        <div className="md:col-span-2">
          <Field
            label="Bio (2–4 sentences)"
            value={data.bio}
            onChange={(v) => patch("bio", v)}
            textarea
            rows={5}
          />
        </div>
        <div className="md:col-span-2">
          <Field
            label="Currently building"
            value={data.currentlyBuilding}
            onChange={(v) => patch("currentlyBuilding", v)}
            textarea
            rows={3}
          />
        </div>
      </section>
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

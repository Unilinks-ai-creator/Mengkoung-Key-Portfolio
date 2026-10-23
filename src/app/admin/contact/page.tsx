"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_CONTACT,
  getContact,
  saveContact,
  type ContactData,
} from "@/lib/site-config";

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData>(DEFAULT_CONTACT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const d = await getContact();
      setData(d);
      setLoading(false);
    })();
  }, []);

  const patch = useCallback(
    <K extends keyof ContactData>(k: K, v: ContactData[K]) => {
      setData((prev) => ({ ...prev, [k]: v }));
      setSaved(false);
    },
    [],
  );

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveContact(data);
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
            Contact
          </p>
          <h1 className="text-h2 mt-3">Contact & socials</h1>
          <p className="mt-2 text-muted text-[15px]">
            Links that appear in the footer and contact section.
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

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="md:col-span-2">
          <Field
            label="Email"
            value={data.email}
            onChange={(v) => patch("email", v)}
            placeholder="you@example.com"
          />
        </div>
        <Field
          label="LinkedIn URL"
          value={data.linkedin}
          onChange={(v) => patch("linkedin", v)}
          placeholder="https://linkedin.com/in/…"
        />
        <Field
          label="X / Twitter URL"
          value={data.x}
          onChange={(v) => patch("x", v)}
          placeholder="https://x.com/…"
        />
        <Field
          label="GitHub URL"
          value={data.github}
          onChange={(v) => patch("github", v)}
          placeholder="https://github.com/…"
        />
        <Field
          label="Calendar / booking link"
          value={data.calendar}
          onChange={(v) => patch("calendar", v)}
          placeholder="https://cal.com/…"
        />
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-transparent px-4 py-3 text-[15px] text-fg outline-none focus:border-fg placeholder:text-muted/50"
      />
    </label>
  );
}

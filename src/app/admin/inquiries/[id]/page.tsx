"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  INQUIRY_STATUSES,
  INQUIRY_STATUS_LABEL,
  formatBudget,
  formatRelativeTime,
  getInquiry,
  projectTypeLabel,
  stageLabel,
  timelineLabel,
  updateInquiryNotes,
  updateInquiryStatus,
  type Inquiry,
  type InquiryStatus,
} from "@/lib/inquiries";

export default function InquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id ?? "";

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [statusSaving, setStatusSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getInquiry(id);
      setInquiry(data);
      setNotes(data?.notes ?? "");
      setLoading(false);
    })();
  }, [id]);

  // Debounced autosave on notes
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleNotesChange = useCallback(
    (next: string) => {
      setNotes(next);
      setNoteStatus("saving");
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        try {
          await updateInquiryNotes(id, next);
          setNoteStatus("saved");
          window.setTimeout(() => setNoteStatus("idle"), 1200);
        } catch (err) {
          console.error(err);
          setNoteStatus("idle");
        }
      }, 700);
    },
    [id],
  );

  const handleStatusChange = async (next: InquiryStatus) => {
    if (!inquiry) return;
    setStatusSaving(true);
    try {
      await updateInquiryStatus(id, next);
      setInquiry({ ...inquiry, status: next });
    } catch (err) {
      console.error(err);
    } finally {
      setStatusSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
        <p className="text-muted">Inquiry not found.</p>
        <button
          type="button"
          onClick={() => router.push("/admin/inquiries")}
          className="mt-4 text-fg underline underline-offset-4"
        >
          ← Back to inquiries
        </button>
      </div>
    );
  }

  const mailtoHref = buildMailto(inquiry);

  return (
    <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14 max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/inquiries"
        className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-fg transition-colors"
      >
        <span aria-hidden>←</span> Back to inquiries
      </Link>

      {/* Header */}
      <div className="mt-6">
        <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted">
          Inquiry · {formatRelativeTime(inquiry.createdAt)}
        </p>
        <h1 className="mt-3 text-[32px] md:text-[42px] font-semibold tracking-[-0.02em]">
          {inquiry.name}
        </h1>
        <a
          href={`mailto:${inquiry.email}`}
          className="mt-2 inline-block text-[15px] md:text-[17px] text-muted hover:text-fg transition-colors underline underline-offset-4 decoration-border hover:decoration-fg"
        >
          {inquiry.email}
        </a>
      </div>

      {/* Action bar */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <StatusPicker
          value={inquiry.status}
          onChange={handleStatusChange}
          saving={statusSaving}
        />

        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 rounded-full bg-fg text-bg px-5 py-2.5 text-[14px] font-medium hover:opacity-90 transition-opacity"
        >
          <MailIcon className="w-4 h-4" />
          Email {inquiry.name.split(" ")[0]}
        </a>

        {inquiry.source && (
          <span className="text-[12px] text-muted">
            via{" "}
            <span className="text-fg">{simplifyHost(inquiry.source)}</span>
          </span>
        )}
      </div>

      {/* Meta grid */}
      <div className="mt-10 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
        <Meta label="Company">{inquiry.company ?? "—"}</Meta>
        <Meta label="Project types">
          {inquiry.projectTypes.map(projectTypeLabel).join(" · ")}
        </Meta>
        <Meta label="Stage">{stageLabel(inquiry.stage)}</Meta>
        <Meta label="Budget">
          <span className="font-semibold tabular-nums">
            {formatBudget(inquiry.budget)}
          </span>
        </Meta>
        <Meta label="Timeline">{timelineLabel(inquiry.timeline)}</Meta>
        <Meta label="Submitted">
          {inquiry.createdAt?.toDate
            ? inquiry.createdAt.toDate().toLocaleString()
            : "—"}
        </Meta>
      </div>

      {/* Brief */}
      <div className="mt-12">
        <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-4">
          The brief
        </p>
        <div className="rounded-[16px] border border-border bg-fg/[0.02] p-6 md:p-8">
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-fg whitespace-pre-wrap">
            {inquiry.message}
          </p>
        </div>
      </div>

      {/* Internal notes */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted">
            Internal notes
          </p>
          <span className="text-[11.5px] text-muted/80 tabular-nums">
            {noteStatus === "saving"
              ? "Saving…"
              : noteStatus === "saved"
                ? "✓ Saved"
                : "Private — only you can see this"}
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          rows={6}
          placeholder="Your private notes — autosaves while you type."
          className="w-full rounded-[12px] border border-border bg-bg px-4 py-3 text-[14.5px] text-fg placeholder:text-muted/60 focus:outline-none focus:border-fg/40 transition-colors resize-y min-h-[140px]"
        />
      </div>
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10.5px] md:text-[11px] tracking-[0.22em] uppercase text-muted mb-2">
        {label}
      </p>
      <div className="text-[14.5px] md:text-[15px] text-fg">{children}</div>
    </div>
  );
}

function StatusPicker({
  value,
  onChange,
  saving,
}: {
  value: InquiryStatus;
  onChange: (v: InquiryStatus) => void;
  saving: boolean;
}) {
  const colors: Record<InquiryStatus, string> = {
    new: "var(--accent)",
    reviewing: "#f59e0b",
    contacted: "#60a5fa",
    closed: "color-mix(in oklab, var(--fg) 25%, transparent)",
  };
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg pl-3 pr-1 py-1">
      <span
        aria-hidden
        className="inline-block w-2 h-2 rounded-full"
        style={{ background: colors[value] }}
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as InquiryStatus)}
        disabled={saving}
        className="appearance-none bg-transparent pr-6 py-1.5 text-[13.5px] font-medium text-fg cursor-pointer focus:outline-none disabled:opacity-60"
      >
        {INQUIRY_STATUSES.map((s) => (
          <option key={s} value={s}>
            {INQUIRY_STATUS_LABEL[s]}
          </option>
        ))}
      </select>
    </div>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function buildMailto(inquiry: Inquiry): string {
  const first = inquiry.name.split(" ")[0];
  const subject = `Re: your inquiry about building a ${inquiry.projectTypes
    .map(projectTypeLabel)
    .join(" / ")
    .toLowerCase()}`;
  const body = `Hi ${first},\n\nThanks for reaching out — I read your brief about:\n\n> ${inquiry.message.slice(0, 180)}${
    inquiry.message.length > 180 ? "…" : ""
  }\n\n[your reply]\n\nBest,\nMengkoung`;
  return `mailto:${inquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function simplifyHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

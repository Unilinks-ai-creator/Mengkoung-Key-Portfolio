"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  INQUIRY_STATUSES,
  INQUIRY_STATUS_LABEL,
  formatBudget,
  formatRelativeTime,
  projectTypeLabel,
  stageLabel,
  subscribeToInquiries,
  timelineLabel,
  type Inquiry,
  type InquiryStatus,
} from "@/lib/inquiries";

type Filter = "all" | InquiryStatus;

export default function InquiriesPage() {
  const [list, setList] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const unsub = subscribeToInquiries((next) => {
      setList(next);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: list.length,
      new: 0,
      reviewing: 0,
      contacted: 0,
      closed: 0,
    };
    for (const i of list) base[i.status]++;
    return base;
  }, [list]);

  const filtered = useMemo(() => {
    if (filter === "all") return list;
    return list.filter((i) => i.status === filter);
  }, [list, filter]);

  return (
    <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14 max-w-5xl">
      <header className="mb-10">
        <h1 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.02em]">
          Inquiries
        </h1>
        <p className="mt-2 text-[14px] md:text-[15px] text-muted">
          Freelance leads from the public contact form. Click a row to read the
          full brief, add notes and change status.
        </p>
      </header>

      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip
          label="All"
          count={counts.all}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {INQUIRY_STATUSES.map((s) => (
          <FilterChip
            key={s}
            label={INQUIRY_STATUS_LABEL[s]}
            count={counts[s]}
            active={filter === s}
            onClick={() => setFilter(s)}
            accent={s === "new" && counts[s] > 0}
          />
        ))}
      </div>

      {/* List */}
      <div className="rounded-[16px] border border-border bg-fg/[0.02] overflow-hidden">
        {loading ? (
          <EmptyState message="Loading inquiries…" />
        ) : filtered.length === 0 ? (
          <EmptyState
            message={
              filter === "all"
                ? "No inquiries yet. The first one will appear here the moment someone submits the contact form."
                : `No inquiries in ${INQUIRY_STATUS_LABEL[filter as InquiryStatus]}.`
            }
          />
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((inquiry) => (
              <li key={inquiry.id}>
                <InquiryRow inquiry={inquiry} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
  accent,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all ${
        active
          ? "bg-fg text-bg border-fg"
          : "bg-bg text-fg border-border hover:border-fg/40"
      }`}
    >
      <span>{label}</span>
      <span
        className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[11px] tabular-nums ${
          accent
            ? "text-black"
            : active
              ? "bg-bg/15 text-bg"
              : "bg-fg/[0.08] text-muted"
        }`}
        style={accent ? { background: "var(--accent)" } : undefined}
      >
        {count}
      </span>
    </button>
  );
}

function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  const types = inquiry.projectTypes.map(projectTypeLabel).join(" · ");
  return (
    <Link
      href={`/admin/inquiries/${inquiry.id}`}
      className="group block px-5 md:px-6 py-5 md:py-6 hover:bg-fg/[0.03] transition-colors"
    >
      <div className="flex items-start gap-4">
        <StatusDot status={inquiry.status} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-[15px] md:text-[16px] font-semibold tracking-[-0.01em] text-fg">
              {inquiry.name}
            </p>
            <p className="text-[13px] md:text-[14px] text-muted truncate">
              {inquiry.email}
            </p>
          </div>

          <p className="mt-1.5 text-[13px] md:text-[14px] text-muted">
            {types} · {stageLabel(inquiry.stage)} ·{" "}
            {formatBudget(inquiry.budget)}
            {inquiry.timeline &&
              ` · ${timelineLabel(inquiry.timeline, inquiry.timelineCustom)}`}
          </p>

          <p className="mt-2 text-[13.5px] text-fg/70 line-clamp-2">
            {inquiry.message}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-[11.5px] text-muted whitespace-nowrap">
            {formatRelativeTime(inquiry.createdAt)}
          </span>
          <span
            aria-hidden
            className="text-muted group-hover:text-fg group-hover:translate-x-0.5 transition-all text-[14px]"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatusDot({ status }: { status: InquiryStatus }) {
  const map: Record<InquiryStatus, string> = {
    new: "var(--accent)",
    reviewing: "#f59e0b",
    contacted: "#60a5fa",
    closed: "color-mix(in oklab, var(--fg) 20%, transparent)",
  };
  return (
    <span
      aria-hidden
      className="mt-2 inline-block w-2 h-2 rounded-full shrink-0"
      style={{ background: map[status] }}
      title={INQUIRY_STATUS_LABEL[status]}
    />
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-6 py-16 md:py-20 text-center">
      <p className="text-[14px] md:text-[15px] text-muted max-w-md mx-auto">
        {message}
      </p>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { SkillGroup } from "@/lib/content";

type Props = {
  groups: SkillGroup[];
};

export function SkillsExplorer({ groups }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const openAll = () => setOpen(new Set(groups.map((_, i) => i)));
  const collapseAll = () => setOpen(new Set());
  const allOpen = open.size === groups.length;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between pb-4 mb-2">
        <p className="text-[13px] md:text-[14px] text-muted">
          <span className="text-fg font-medium">{groups.length}</span> skill
          groups · click to explore
        </p>
        <button
          type="button"
          onClick={allOpen ? collapseAll : openAll}
          className="text-[13px] md:text-[14px] font-medium text-muted hover:text-fg transition-colors underline underline-offset-4 decoration-border hover:decoration-fg"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* The accordion */}
      <ul className="border-t border-border">
        {groups.map((group, i) => (
          <SkillRow
            key={group.title}
            group={group}
            index={i}
            total={groups.length}
            isOpen={open.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </ul>
    </div>
  );
}

function SkillRow({
  group,
  index,
  total,
  isOpen,
  onToggle,
}: {
  group: SkillGroup;
  index: number;
  total: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="relative border-b border-border group">
      {/* Accent left-bar — pulses in when open or hovered */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
        style={{ background: "var(--accent)" }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Clickable row header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-6 md:gap-10 py-6 md:py-8 pl-5 md:pl-8 pr-4 md:pr-6 text-left transition-colors hover:bg-fg/[0.02]"
      >
        <span
          className="text-[12px] md:text-[13px] tabular-nums tracking-[0.14em] shrink-0 w-10 md:w-12"
          style={{ color: "var(--accent)" }}
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-muted/60">/{String(total).padStart(2, "0")}</span>
        </span>

        <motion.span
          className="flex-1 text-[22px] md:text-[28px] lg:text-[32px] font-semibold tracking-[-0.015em]"
          animate={{ x: isOpen ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        >
          {group.title}
        </motion.span>

        <span className="hidden sm:inline text-[12px] md:text-[13px] text-muted shrink-0 tabular-nums">
          {group.skills.length} skills
        </span>

        <motion.span
          aria-hidden
          className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-border shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: isOpen ? "var(--accent)" : "transparent",
            borderColor: isOpen ? "transparent" : undefined,
          }}
        >
          <PlusIcon isOpen={isOpen} />
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.28, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="pl-5 md:pl-8 pr-4 md:pr-6 pb-8 md:pb-10 grid gap-8 md:gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
              <p className="text-[15px] md:text-[16px] leading-[1.65] text-muted max-w-[42ch]">
                {group.description}
              </p>

              <ul className="columns-2 gap-x-6">
                {group.skills.map((s, j) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: 0.08 + j * 0.035,
                      ease: "easeOut",
                    }}
                    className="break-inside-avoid flex items-start gap-2.5 text-[14px] md:text-[15px] leading-[1.5] text-fg mb-2"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] inline-block w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    <span>{s}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="w-3.5 h-3.5"
      fill="none"
      stroke={isOpen ? "#000" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M8 2V14" />
      <path d="M2 8H14" />
    </svg>
  );
}

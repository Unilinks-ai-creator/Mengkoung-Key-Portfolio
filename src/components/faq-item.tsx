"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function FaqItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border-t border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
      >
        <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
          <span className="font-mono text-[12px] md:text-[13px] tabular-nums text-muted shrink-0">
            ({String(index).padStart(2, "0")})
          </span>
          <span className="text-[18px] md:text-[24px] font-semibold tracking-[-0.015em] text-fg group-hover:text-fg/80 transition-colors">
            {q}
          </span>
        </div>
        <span
          aria-hidden
          className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-fg transition-all duration-300 group-hover:border-fg/40"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            className="overflow-hidden"
          >
            <div className="pl-9 md:pl-14 pr-14 pb-6 md:pb-8 text-[15px] md:text-[16px] leading-[1.7] text-muted max-w-[75ch]">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

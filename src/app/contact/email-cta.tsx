"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  email: string;
};

export function EmailCta({ email }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard permission denied — fail silently */
    }
  };

  return (
    <div className="relative inline-block">
      {/* Soft pulsing glow behind the button — draws the eye */}
      <motion.span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full blur-2xl"
        style={{ background: "var(--accent)" }}
        animate={{ opacity: [0.18, 0.38, 0.18], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Email copied to clipboard" : `Copy ${email} to clipboard`}
        className="group relative inline-flex items-center gap-3 md:gap-4 rounded-full bg-fg text-bg pl-6 pr-2 py-2 md:pl-8 md:pr-2.5 md:py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] cursor-pointer"
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      >
        <span className="text-[15px] md:text-[18px] font-medium tracking-tight min-w-[16ch] text-left">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied-label"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="block"
                style={{ color: "var(--accent)" }}
              >
                Email copied
              </motion.span>
            ) : (
              <motion.span
                key="email-label"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {email}
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <motion.span
          aria-hidden
          className="relative inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-[15px] md:text-[17px] text-bg font-medium shrink-0"
          style={{ background: "var(--accent)" }}
          animate={copied ? { x: 0 } : { x: [0, 3, 0] }}
          transition={
            copied
              ? { duration: 0.3, ease: "easeOut" }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="inline-flex"
              >
                <CheckIcon />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="inline-flex group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <CopyIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </motion.button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 18 18"
      className="w-[18px] h-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="9" height="9" rx="1.6" />
      <path d="M3.5 12V4.6a1.1 1.1 0 0 1 1.1-1.1H12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 18 18"
      className="w-[18px] h-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 9.5L7 13L14.5 5" />
    </svg>
  );
}

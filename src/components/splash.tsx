"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "mk-splash-shown";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const NAME = "Mengkoung Key";
const TEXT_CLASS =
  "text-fg font-bold text-[13vw] leading-none tracking-tight whitespace-nowrap select-none";

export function Splash() {
  const [visible, setVisible] = useState(true);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setSkip(true);
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), 3600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (skip) return null;

  const textAnim = {
    initial: { opacity: 0, letterSpacing: "-0.02em" },
    animate: {
      opacity: [0, 0.22, 0.22],
      letterSpacing: ["-0.02em", "-0.05em", "-0.05em"],
    },
    transition: {
      opacity: { duration: 2.6, ease: EASE_OUT, times: [0, 0.55, 1] },
      letterSpacing: { duration: 2.6, ease: EASE_OUT, times: [0, 0.55, 1] },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Top curtain — slides up on exit */}
          <motion.div
            key="splash-top"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.5, ease: EASE_IN_OUT }}
            className="fixed inset-x-0 top-0 h-[50vh] z-[100] overflow-hidden bg-bg"
            aria-hidden
          >
            <div
              className="absolute left-1/2 top-full"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <motion.h1 {...textAnim} className={TEXT_CLASS}>
                {NAME}
              </motion.h1>
            </div>
          </motion.div>

          {/* Bottom curtain — slides down on exit */}
          <motion.div
            key="splash-bottom"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.5, ease: EASE_IN_OUT }}
            className="fixed inset-x-0 bottom-0 h-[50vh] z-[100] overflow-hidden bg-bg"
            aria-hidden
          >
            <div
              className="absolute left-1/2 top-0"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <motion.h1 {...textAnim} className={TEXT_CLASS}>
                {NAME}
              </motion.h1>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

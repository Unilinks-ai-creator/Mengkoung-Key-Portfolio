"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CURRENCIES,
  PROJECT_STAGES,
  PROJECT_TYPES,
  TIMELINES,
  createInquiry,
  validateInquiry,
  type Currency,
  type NewInquiryInput,
  type ProjectStage,
  type ProjectType,
  type Timeline,
  type ValidationErrors,
} from "@/lib/inquiries";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const mountedAt = useRef<number>(0);

  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [stage, setStage] = useState<ProjectStage | "">("");
  const [budgetSkipped, setBudgetSkipped] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState<Currency>("EUR");
  const [timeline, setTimeline] = useState<Timeline>("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const toggleProjectType = (v: ProjectType) => {
    setProjectTypes((prev) =>
      prev.includes(v) ? prev.filter((p) => p !== v) : [...prev, v],
    );
  };

  const buildInput = (): NewInquiryInput => {
    const amountNum = budgetAmount.replace(/[^\d.]/g, "");
    const budget = budgetSkipped
      ? { skipped: true as const }
      : {
          amount: Number.parseFloat(amountNum) || 0,
          currency: budgetCurrency,
        };

    return {
      name,
      email,
      company: company.trim() || undefined,
      projectTypes,
      stage: (stage || "idea") as ProjectStage,
      budget,
      timeline: timeline || undefined,
      message,
      website,
      elapsedMs: Date.now() - mountedAt.current,
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      source:
        typeof window !== "undefined" ? window.location.href : undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const input = buildInput();
    const validation = validateInquiry(input);

    // Silent-fail on honeypot/time-check (pretend success to not tip off bots)
    if (validation.website === "spam" || validation.elapsedMs === "too-fast") {
      setStatus("success");
      return;
    }

    // Surface real validation errors
    const realErrors = { ...validation };
    delete realErrors.website;
    delete realErrors.elapsedMs;
    if (Object.keys(realErrors).length > 0) {
      setErrors(realErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      await createInquiry(input);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setServerError(
        "Something went wrong on our end. Try again or email me directly.",
      );
      setStatus("error");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setProjectTypes([]);
    setStage("");
    setBudgetSkipped(false);
    setBudgetAmount("");
    setBudgetCurrency("EUR");
    setTimeline("");
    setMessage("");
    setErrors({});
    setStatus("idle");
    setServerError(null);
    mountedAt.current = Date.now();
  };

  /* ---------------------------------------------------------------- */
  /* Success state                                                     */
  /* ---------------------------------------------------------------- */

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[24px] border border-border bg-fg/[0.02] p-10 md:p-14 text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-6 md:mb-8"
          style={{ background: "var(--accent)" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 md:w-10 md:h-10 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12.5L10 18.5L20 6" />
          </svg>
        </motion.div>

        <h2 className="text-[26px] md:text-[32px] font-semibold tracking-[-0.02em]">
          Got it. Message received.
        </h2>
        <p className="mt-4 max-w-md mx-auto text-[15px] md:text-[16px] leading-[1.6] text-muted">
          I&apos;ll come back to you personally within 24 hours — from the
          email you entered. Check your spam folder if you don&apos;t see it.
        </p>

        <button
          type="button"
          onClick={resetForm}
          className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-fg underline underline-offset-4 decoration-border hover:decoration-fg transition-colors"
        >
          Send another <span aria-hidden>→</span>
        </button>
      </motion.div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Form                                                              */
  /* ---------------------------------------------------------------- */

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-[24px] border border-border bg-fg/[0.02] p-6 md:p-10 max-w-2xl mx-auto text-left"
    >
      {/* Honeypot — hidden from real users */}
      <div
        aria-hidden
        className="absolute left-[-9999px] top-[-9999px] pointer-events-none opacity-0"
      >
        <label>
          Website (leave empty)
          <input
            tabIndex={-1}
            autoComplete="off"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      {/* Name + Email */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" required error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={inputCls(!!errors.name)}
            placeholder="e.g. Sophia Nguyen"
          />
        </Field>
        <Field label="Your email" required error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={inputCls(!!errors.email)}
            placeholder="e.g. sophia@getwavy.app"
          />
        </Field>
      </div>

      {/* Company / role */}
      <div className="mt-5">
        <Field label="Company / role" error={errors.company}>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            className={inputCls(!!errors.company)}
            placeholder="e.g. Head of Product at Wavy"
          />
        </Field>
      </div>

      {/* Project types */}
      <div className="mt-6">
        <Field
          label="What do you want to build?"
          required
          hint="Pick one or more"
          error={errors.projectTypes}
        >
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((t) => {
              const selected = projectTypes.includes(t.value);
              return (
                <ChipButton
                  key={t.value}
                  selected={selected}
                  onClick={() => toggleProjectType(t.value)}
                >
                  {t.label}
                </ChipButton>
              );
            })}
          </div>
        </Field>
      </div>

      {/* Stage */}
      <div className="mt-6">
        <Field label="Where are you at?" required error={errors.stage}>
          <div className="flex flex-wrap gap-2">
            {PROJECT_STAGES.map((s) => {
              const selected = stage === s.value;
              return (
                <ChipButton
                  key={s.value}
                  selected={selected}
                  onClick={() => setStage(s.value)}
                >
                  {s.label}
                </ChipButton>
              );
            })}
          </div>
        </Field>
      </div>

      {/* Budget + Timeline */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field
          label="Budget"
          required
          error={errors.budget ?? errors.budgetAmount}
        >
          <div className="flex gap-2">
            <select
              value={budgetCurrency}
              onChange={(e) => setBudgetCurrency(e.target.value as Currency)}
              disabled={budgetSkipped}
              className={`${selectCls(!!errors.budget)} w-[88px] shrink-0 disabled:opacity-40`}
              aria-label="Currency"
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.symbol ? `${c.symbol} ${c.label}` : c.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              inputMode="numeric"
              value={budgetAmount}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                if (raw === "") {
                  setBudgetAmount("");
                  return;
                }
                const formatted = Number.parseInt(raw, 10).toLocaleString(
                  "en-US",
                );
                setBudgetAmount(formatted);
              }}
              disabled={budgetSkipped}
              className={`${inputCls(!!errors.budgetAmount)} flex-1 disabled:opacity-40`}
              placeholder={budgetSkipped ? "Skipped" : "e.g. 15,000"}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setBudgetSkipped((v) => !v);
              setBudgetAmount("");
            }}
            className="mt-2 text-[12px] text-muted hover:text-fg underline underline-offset-4 decoration-border hover:decoration-fg transition-colors"
          >
            {budgetSkipped ? "Enter an amount instead" : "Not sure yet? Skip"}
          </button>
        </Field>

        <Field label="Timeline" error={errors.timeline}>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value as Timeline)}
            className={selectCls(false)}
          >
            {TIMELINES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <div className="mt-6">
        <Field
          label="Brief — what are you trying to solve?"
          required
          hint={`${message.trim().length} / 2000 characters · minimum 30`}
          error={errors.message}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            maxLength={2000}
            className={`${inputCls(!!errors.message)} resize-y min-h-[140px]`}
            placeholder="The problem, the users, the outcome you want. Links to Figma / Notion / inspiration welcome."
          />
        </Field>
      </div>

      {/* Server error */}
      {serverError && (
        <p className="mt-5 text-[13.5px] text-red-500">{serverError}</p>
      )}

      {/* Submit */}
      <div className="mt-8">
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.01, y: submitting ? 0 : -1 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          className="group relative w-full inline-flex items-center justify-between rounded-full bg-fg text-bg pl-6 pr-2 py-2 md:pl-8 md:pr-2.5 md:py-2.5 text-[15px] md:text-[16px] font-medium shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] disabled:opacity-70"
        >
          <span>
            <AnimatePresence mode="wait" initial={false}>
              {submitting ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  Sending…
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  Send inquiry
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span
            className="inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full text-bg text-[15px] font-medium shrink-0"
            style={{ background: "var(--accent)" }}
            aria-hidden
          >
            {submitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-flex"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M8 1.5a6.5 6.5 0 1 1-6.5 6.5" />
                </svg>
              </motion.span>
            ) : (
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                →
              </span>
            )}
          </span>
        </motion.button>
        <p className="mt-4 text-[12.5px] text-muted text-center">
          By submitting you agree I may email you back. No spam, no list — just
          a reply.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-muted">
          {label}
          {required && (
            <span className="ml-1" style={{ color: "var(--accent)" }}>
              *
            </span>
          )}
        </span>
        {hint && (
          <span className="text-[11px] text-muted/70 normal-case tracking-normal">
            {hint}
          </span>
        )}
      </span>
      {children}
      {error && (
        <p className="mt-1.5 text-[12.5px] text-red-500">{error}</p>
      )}
    </label>
  );
}

function ChipButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-all duration-200 ${
        selected
          ? "bg-fg text-bg border-fg"
          : "bg-bg text-fg border-border hover:border-fg/40"
      }`}
    >
      {selected && (
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}
      {children}
    </button>
  );
}

const baseInputCls =
  "w-full rounded-[12px] border bg-bg px-4 py-3 text-[14.5px] text-fg placeholder:text-muted/60 focus:outline-none focus:border-fg/40 transition-colors";

function inputCls(hasError: boolean) {
  return `${baseInputCls} ${hasError ? "border-red-400/60" : "border-border"}`;
}

function selectCls(hasError: boolean) {
  return `${baseInputCls} ${hasError ? "border-red-400/60" : "border-border"} appearance-none cursor-pointer`;
}

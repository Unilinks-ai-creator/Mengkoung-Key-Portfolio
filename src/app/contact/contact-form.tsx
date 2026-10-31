"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CURRENCIES,
  PROJECT_STAGES,
  PROJECT_TYPES,
  TIMELINES,
  createInquiry,
  formatBudget,
  projectTypeLabel,
  stageLabel,
  timelineLabel,
  validateInquiry,
  type Currency,
  type NewInquiryInput,
  type ProjectStage,
  type ProjectType,
  type Timeline,
} from "@/lib/inquiries";

type Status = "idle" | "submitting" | "success" | "error";

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------ */

const STEPS = [
  { id: 0, label: "The project" },
  { id: 1, label: "The details" },
  { id: 2, label: "Review & send" },
] as const;

export function ContactForm() {
  const mountedAt = useRef<number>(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  // Step 1 — project
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [stage, setStage] = useState<ProjectStage | "">("");
  const [message, setMessage] = useState("");

  // Step 2 — details
  const [budgetSkipped, setBudgetSkipped] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState<Currency>("USD");
  const [timeline, setTimeline] = useState<Timeline>("");
  const [timelineCustom, setTimelineCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  // Honeypot
  const [website, setWebsite] = useState("");

  // Step-local validation errors
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const toggleProjectType = (v: ProjectType) => {
    setProjectTypes((prev) =>
      prev.includes(v) ? prev.filter((p) => p !== v) : [...prev, v],
    );
  };

  const budget = useMemo(() => {
    if (budgetSkipped) return { skipped: true as const };
    const amountNum = Number.parseFloat(budgetAmount.replace(/[^\d.]/g, ""));
    return {
      amount: Number.isFinite(amountNum) ? amountNum : 0,
      currency: budgetCurrency,
    };
  }, [budgetSkipped, budgetAmount, budgetCurrency]);

  const buildInput = (): NewInquiryInput => ({
    name,
    email,
    company: company.trim() || undefined,
    projectTypes,
    stage: (stage || "idea") as ProjectStage,
    budget,
    timeline: timeline || undefined,
    timelineCustom:
      timeline === "custom" ? timelineCustom.trim() || undefined : undefined,
    message,
    website,
    elapsedMs: Date.now() - (mountedAt.current || Date.now()),
    userAgent:
      typeof window !== "undefined" ? window.navigator.userAgent : undefined,
    source: typeof window !== "undefined" ? window.location.href : undefined,
  });

  /* ---- Per-step validation gates ---------------------------------- */

  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (projectTypes.length === 0) errs.projectTypes = "Pick at least one.";
    if (!stage) errs.stage = "Pick where you're at.";
    if (message.trim().length < 30)
      errs.message = "A little more detail helps — at least 30 characters.";
    if (message.trim().length > 2000)
      errs.message = "Keep it under 2,000 characters.";
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please enter your name.";
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(email.trim()))
      errs.email = "Please enter a valid email.";
    if (!budgetSkipped) {
      const amountNum = Number.parseFloat(
        budgetAmount.replace(/[^\d.]/g, ""),
      );
      if (!Number.isFinite(amountNum) || amountNum <= 0) {
        errs.budgetAmount = "Enter an amount, or tap “Not sure yet”.";
      }
    }
    if (timeline === "custom" && timelineCustom.trim().length < 2) {
      errs.timelineCustom = "Tell me your timeline.";
    }
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStepErrors({});
    setStep((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : s));
  };

  const goBack = () => {
    setStepErrors({});
    setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s));
  };

  const jumpTo = (target: 0 | 1 | 2) => {
    // Only let user jump backwards or to already-validated step
    if (target < step) {
      setStepErrors({});
      setStep(target);
    }
  };

  /* ---- Submit ------------------------------------------------------ */

  const handleSubmit = async () => {
    const input = buildInput();
    const validation = validateInquiry(input);

    if (validation.website === "spam" || validation.elapsedMs === "too-fast") {
      // Silent-success for bots
      setStatus("success");
      return;
    }

    const realErrors = { ...validation };
    delete realErrors.website;
    delete realErrors.elapsedMs;
    if (Object.keys(realErrors).length > 0) {
      // Shouldn't happen (we gate each step), but recover gracefully
      setServerError("Please check the previous steps.");
      setStatus("error");
      return;
    }

    setServerError(null);
    setStatus("submitting");

    try {
      await createInquiry(input);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setServerError(
        "Something went wrong on our end. Try again, or email me directly.",
      );
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStep(0);
    setStatus("idle");
    setServerError(null);
    setStepErrors({});
    setProjectTypes([]);
    setStage("");
    setMessage("");
    setBudgetSkipped(false);
    setBudgetAmount("");
    setBudgetCurrency("USD");
    setTimeline("");
    setTimelineCustom("");
    setName("");
    setEmail("");
    setCompany("");
    mountedAt.current = Date.now();
  };

  /* ---- Success state ---------------------------------------------- */

  if (status === "success") {
    return <SuccessCard onReset={resetForm} />;
  }

  /* ---- Shell ------------------------------------------------------- */

  return (
    <div className="relative rounded-[24px] border border-border bg-fg/[0.02] p-6 md:p-10 max-w-2xl mx-auto text-left">
      {/* Honeypot */}
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

      <StepIndicator current={step} onJump={jumpTo} />

      <div className="mt-7 md:mt-9 min-h-[380px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Step1Project
                projectTypes={projectTypes}
                onToggleProjectType={toggleProjectType}
                stage={stage}
                onStageChange={setStage}
                message={message}
                onMessageChange={setMessage}
                errors={stepErrors}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Step2Details
                budgetSkipped={budgetSkipped}
                onBudgetSkipChange={setBudgetSkipped}
                budgetAmount={budgetAmount}
                onBudgetAmountChange={setBudgetAmount}
                budgetCurrency={budgetCurrency}
                onBudgetCurrencyChange={setBudgetCurrency}
                timeline={timeline}
                onTimelineChange={setTimeline}
                timelineCustom={timelineCustom}
                onTimelineCustomChange={setTimelineCustom}
                name={name}
                onNameChange={setName}
                email={email}
                onEmailChange={setEmail}
                company={company}
                onCompanyChange={setCompany}
                errors={stepErrors}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Step3Review
                projectTypes={projectTypes}
                stage={stage as ProjectStage}
                message={message}
                budget={budget}
                timeline={timeline}
                timelineCustom={timelineCustom}
                name={name}
                email={email}
                company={company}
                onEditProject={() => jumpTo(0)}
                onEditDetails={() => jumpTo(1)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {serverError && (
        <p className="mt-5 text-[13.5px] text-red-500">{serverError}</p>
      )}

      <StepNav
        step={step}
        submitting={status === "submitting"}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
      />

      {step === 2 && (
        <p className="mt-5 text-[12.5px] text-muted text-center">
          By submitting you agree I may email you back. No spam, no list — just
          a reply.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step indicator                                                      */
/* ------------------------------------------------------------------ */

function StepIndicator({
  current,
  onJump,
}: {
  current: 0 | 1 | 2;
  onJump: (target: 0 | 1 | 2) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {STEPS.map((s, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <div key={s.id} className="flex items-center gap-3 flex-1">
            <button
              type="button"
              onClick={() => onJump(i as 0 | 1 | 2)}
              disabled={!done && !active}
              className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-semibold transition-all ${
                active
                  ? "bg-fg text-bg"
                  : done
                    ? "text-bg cursor-pointer hover:scale-105"
                    : "border border-border text-muted"
              }`}
              style={done ? { background: "var(--accent)" } : undefined}
              aria-label={`Step ${i + 1}: ${s.label}`}
            >
              {done ? (
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5L6.5 12L13 4.5" />
                </svg>
              ) : (
                i + 1
              )}
            </button>
            <div className="hidden sm:block flex-1 min-w-0">
              <p
                className={`text-[11px] md:text-[12px] tracking-[0.18em] uppercase truncate ${
                  active ? "text-fg font-medium" : "text-muted"
                }`}
              >
                {s.label}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden sm:block flex-1 h-px bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step navigation (Back / Continue / Send)                            */
/* ------------------------------------------------------------------ */

function StepNav({
  step,
  submitting,
  onBack,
  onNext,
  onSubmit,
}: {
  step: 0 | 1 | 2;
  submitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  const isLast = step === 2;
  const canBack = step > 0;

  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {canBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="group inline-flex items-center gap-2 text-[14px] md:text-[15px] font-medium text-muted hover:text-fg transition-colors disabled:opacity-50"
        >
          <span
            aria-hidden
            className="transition-transform group-hover:-translate-x-0.5"
          >
            ←
          </span>
          Back
        </button>
      ) : (
        <span />
      )}

      <motion.button
        type="button"
        onClick={isLast ? onSubmit : onNext}
        disabled={submitting}
        whileHover={{ scale: submitting ? 1 : 1.015, y: submitting ? 0 : -1 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className="group relative inline-flex items-center gap-3 rounded-full bg-fg text-bg pl-6 pr-2 py-2 md:pl-7 md:pr-2.5 md:py-2.5 text-[14px] md:text-[15px] font-medium shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] disabled:opacity-70"
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
                key={isLast ? "send" : "next"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {isLast ? "Send inquiry" : "Continue"}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span
          className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-bg text-[14px] font-medium shrink-0"
          style={{ background: "var(--accent)" }}
          aria-hidden
        >
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Project (types + stage + brief)                            */
/* ------------------------------------------------------------------ */

function Step1Project({
  projectTypes,
  onToggleProjectType,
  stage,
  onStageChange,
  message,
  onMessageChange,
  errors,
}: {
  projectTypes: ProjectType[];
  onToggleProjectType: (v: ProjectType) => void;
  stage: ProjectStage | "";
  onStageChange: (s: ProjectStage) => void;
  message: string;
  onMessageChange: (m: string) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-7 md:space-y-8">
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
                onClick={() => onToggleProjectType(t.value)}
              >
                {t.label}
              </ChipButton>
            );
          })}
        </div>
      </Field>

      <Field label="Where are you at?" required error={errors.stage}>
        <div className="flex flex-wrap gap-2">
          {PROJECT_STAGES.map((s) => {
            const selected = stage === s.value;
            return (
              <ChipButton
                key={s.value}
                selected={selected}
                onClick={() => onStageChange(s.value)}
              >
                {s.label}
              </ChipButton>
            );
          })}
        </div>
      </Field>

      <Field
        label="Brief — what are you trying to solve?"
        required
        hint={`${message.trim().length} / 2000 · min 30`}
        error={errors.message}
      >
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          rows={6}
          maxLength={2000}
          className={`${inputCls(!!errors.message)} resize-y min-h-[140px]`}
          placeholder="The problem, the users, the outcome you want. Links to Figma / Notion / inspiration welcome."
        />
      </Field>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Details (budget + timeline + identity)                     */
/* ------------------------------------------------------------------ */

function Step2Details({
  budgetSkipped,
  onBudgetSkipChange,
  budgetAmount,
  onBudgetAmountChange,
  budgetCurrency,
  onBudgetCurrencyChange,
  timeline,
  onTimelineChange,
  timelineCustom,
  onTimelineCustomChange,
  name,
  onNameChange,
  email,
  onEmailChange,
  company,
  onCompanyChange,
  errors,
}: {
  budgetSkipped: boolean;
  onBudgetSkipChange: (v: boolean) => void;
  budgetAmount: string;
  onBudgetAmountChange: (v: string) => void;
  budgetCurrency: Currency;
  onBudgetCurrencyChange: (v: Currency) => void;
  timeline: Timeline;
  onTimelineChange: (v: Timeline) => void;
  timelineCustom: string;
  onTimelineCustomChange: (v: string) => void;
  name: string;
  onNameChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
  company: string;
  onCompanyChange: (v: string) => void;
  errors: Record<string, string>;
}) {
  const currencyMeta =
    CURRENCIES.find((c) => c.value === budgetCurrency) ?? CURRENCIES[0];

  return (
    <div className="space-y-7 md:space-y-8">
      {/* Budget */}
      <Field label="Budget" required error={errors.budgetAmount}>
        {/* Currency picker — chip row, not a cramped select */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {CURRENCIES.map((c) => {
            const selected = budgetCurrency === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onBudgetCurrencyChange(c.value)}
                disabled={budgetSkipped}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12.5px] font-medium border transition-all disabled:opacity-40 ${
                  selected
                    ? "bg-fg text-bg border-fg"
                    : "bg-bg text-fg border-border hover:border-fg/40"
                }`}
                aria-pressed={selected}
              >
                {c.symbol && <span>{c.symbol}</span>}
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Amount — full-width, with the currency symbol as prefix */}
        <div className="relative">
          {currencyMeta.symbol && !budgetSkipped && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] md:text-[16px] font-semibold text-fg/70 pointer-events-none">
              {currencyMeta.symbol}
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            value={budgetAmount}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              if (raw === "") {
                onBudgetAmountChange("");
                return;
              }
              const formatted = Number.parseInt(raw, 10).toLocaleString(
                "en-US",
              );
              onBudgetAmountChange(formatted);
            }}
            disabled={budgetSkipped}
            className={`${inputCls(!!errors.budgetAmount)} ${
              currencyMeta.symbol && !budgetSkipped ? "pl-10" : ""
            } text-[16px] md:text-[18px] font-medium tabular-nums disabled:opacity-40`}
            placeholder={budgetSkipped ? "Skipped — open to discuss" : "e.g. 15,000"}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            onBudgetSkipChange(!budgetSkipped);
            onBudgetAmountChange("");
          }}
          className="mt-2 text-[12.5px] text-muted hover:text-fg underline underline-offset-4 decoration-border hover:decoration-fg transition-colors"
        >
          {budgetSkipped ? "Enter an amount instead" : "Not sure yet? Skip"}
        </button>
      </Field>

      {/* Timeline — chip row + custom input when "Custom" is selected */}
      <Field label="Timeline" error={errors.timelineCustom ?? errors.timeline}>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.filter((t) => t.value !== "").map((t) => {
            const selected = timeline === t.value;
            return (
              <ChipButton
                key={t.value}
                selected={selected}
                onClick={() => {
                  if (selected) {
                    onTimelineChange("");
                    if (t.value === "custom") onTimelineCustomChange("");
                  } else {
                    onTimelineChange(t.value);
                    if (t.value !== "custom") onTimelineCustomChange("");
                  }
                }}
              >
                {t.label}
              </ChipButton>
            );
          })}
        </div>

        {timeline === "custom" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <input
              type="text"
              value={timelineCustom}
              onChange={(e) => onTimelineCustomChange(e.target.value)}
              maxLength={120}
              autoFocus
              className={`${inputCls(!!errors.timelineCustom)} mt-3`}
              placeholder="e.g. By end of Q2 2026, or in 18 months"
            />
          </motion.div>
        )}
      </Field>

      {/* Name + Email */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" required error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            autoComplete="name"
            className={inputCls(!!errors.name)}
            placeholder="e.g. Sophia Nguyen"
          />
        </Field>
        <Field label="Your email" required error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            autoComplete="email"
            className={inputCls(!!errors.email)}
            placeholder="e.g. sophia@getwavy.app"
          />
        </Field>
      </div>

      {/* Company / Role */}
      <Field label="Company / role">
        <input
          type="text"
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          autoComplete="organization"
          className={inputCls(false)}
          placeholder="e.g. Head of Product at Wavy"
        />
      </Field>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Review                                                     */
/* ------------------------------------------------------------------ */

function Step3Review({
  projectTypes,
  stage,
  message,
  budget,
  timeline,
  timelineCustom,
  name,
  email,
  company,
  onEditProject,
  onEditDetails,
}: {
  projectTypes: ProjectType[];
  stage: ProjectStage;
  message: string;
  budget: NewInquiryInput["budget"];
  timeline: Timeline;
  timelineCustom: string;
  name: string;
  email: string;
  company: string;
  onEditProject: () => void;
  onEditDetails: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[13px] md:text-[14px] text-muted">
          You&apos;re sending this to{" "}
          <span className="text-fg font-medium">Mengkoung Key</span>. Have one
          last look before you hit send.
        </p>
      </div>

      {/* The project */}
      <ReviewBlock label="The project" onEdit={onEditProject}>
        <ReviewRow label="Building">
          {projectTypes.map(projectTypeLabel).join(" · ") || "—"}
        </ReviewRow>
        <ReviewRow label="Stage">{stageLabel(stage)}</ReviewRow>
        <ReviewRow label="Brief" vertical>
          <p className="text-[14.5px] md:text-[15px] leading-[1.65] text-fg whitespace-pre-wrap">
            {message}
          </p>
        </ReviewRow>
      </ReviewBlock>

      {/* The details */}
      <ReviewBlock label="The details" onEdit={onEditDetails}>
        <ReviewRow label="Budget">
          <span className="tabular-nums font-medium">
            {formatBudget(budget)}
          </span>
        </ReviewRow>
        <ReviewRow label="Timeline">
          {timelineLabel(timeline, timelineCustom)}
        </ReviewRow>
        <ReviewRow label="From">
          <span>
            {name}{" "}
            <span className="text-muted">· {email}</span>
          </span>
        </ReviewRow>
        {company && <ReviewRow label="Role">{company}</ReviewRow>}
      </ReviewBlock>
    </div>
  );
}

function ReviewBlock({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-border bg-bg p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted">
          {label}
        </p>
        <button
          type="button"
          onClick={onEdit}
          className="group inline-flex items-center gap-1 text-[12.5px] font-medium text-muted hover:text-fg transition-colors"
        >
          Edit
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ReviewRow({
  label,
  children,
  vertical,
}: {
  label: string;
  children: React.ReactNode;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <div>
        <p className="text-[11px] text-muted uppercase tracking-[0.18em] mb-2">
          {label}
        </p>
        {children}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[7rem_1fr] md:grid-cols-[9rem_1fr] gap-x-3 items-baseline">
      <p className="text-[12px] text-muted uppercase tracking-[0.18em]">
        {label}
      </p>
      <div className="text-[14.5px] md:text-[15px] text-fg">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Success                                                             */
/* ------------------------------------------------------------------ */

function SuccessCard({ onReset }: { onReset: () => void }) {
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
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-fg underline underline-offset-4 decoration-border hover:decoration-fg transition-colors"
      >
        Send another <span aria-hidden>→</span>
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
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
      {error && <p className="mt-1.5 text-[12.5px] text-red-500">{error}</p>}
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

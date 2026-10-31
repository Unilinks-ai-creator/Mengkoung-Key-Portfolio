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
/* Step metadata                                                       */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    id: 0,
    title: "The Project",
    description: "What do you want to build?",
  },
  {
    id: 1,
    title: "The Details",
    description: "Tell me more about it",
  },
  {
    id: 2,
    title: "Review & Send",
    description: "Almost done!",
  },
] as const;

const STEP_HEADLINES = [
  {
    title: "What do you want to build?",
    subtitle: "Choose one or more options to get started.",
  },
  {
    title: "Tell me more about it.",
    subtitle: "The details help me come back with a realistic plan.",
  },
  {
    title: "Almost there — one last look.",
    subtitle: "Review what you're sending, then hit send.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const ICON_CLS = "w-7 h-7 md:w-8 md:h-8";
const SECTION_ICON_CLS = "w-4 h-4";
const ICON_STROKE = { strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function PhoneIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  );
}
function GlobeIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18" />
    </svg>
  );
}
function LaptopIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M2 20h20" />
    </svg>
  );
}
function ServerIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}
function HelpIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
      <path d="M12 17h.01" />
    </svg>
  );
}
function GridIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  );
}
function BulbIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.4-1 2.2V17H9v-1.3c0-.8-.4-1.6-1-2.2A6 6 0 0 1 12 3Z" />
    </svg>
  );
}
function DocIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  );
}
function CoinIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M15 9.5c-.5-1-1.7-1.5-3-1.5s-3 .7-3 2 1.5 2 3 2 3 .7 3 2-1.5 2-3 2-2.5-.5-3-1.5" />
    </svg>
  );
}
function ClockIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function UserIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...ICON_STROKE} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function CheckIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 8.5L6.5 12L13 4.5" />
    </svg>
  );
}

const PROJECT_TYPE_ICONS: Record<ProjectType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "mobile-app": PhoneIcon,
  "web-app": GlobeIcon,
  website: LaptopIcon,
  system: ServerIcon,
  "not-sure": HelpIcon,
};

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

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
    if (target < step) {
      setStepErrors({});
      setStep(target);
    }
  };

  const handleSubmit = async () => {
    const input = buildInput();
    const validation = validateInquiry(input);

    if (validation.website === "spam" || validation.elapsedMs === "too-fast") {
      setStatus("success");
      return;
    }

    const realErrors = { ...validation };
    delete realErrors.website;
    delete realErrors.elapsedMs;
    if (Object.keys(realErrors).length > 0) {
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

  if (status === "success") {
    return <SuccessCard onReset={resetForm} />;
  }

  const headline = STEP_HEADLINES[step];

  return (
    <div className="relative rounded-[28px] md:rounded-[32px] border border-border bg-fg/[0.015] overflow-hidden max-w-6xl mx-auto">
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

      {/* Mobile — horizontal step pill */}
      <div className="md:hidden px-6 pt-6">
        <StepPill step={step} />
      </div>

      <div className="grid md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
        {/* Left — vertical stepper (desktop) */}
        <aside className="hidden md:block border-r border-border bg-fg/[0.02] p-8 lg:p-10">
          <VerticalStepper current={step} onJump={jumpTo} />
        </aside>

        {/* Right — content */}
        <div className="p-6 md:p-10 lg:p-14 min-h-[560px] flex flex-col">
          {/* Headline */}
          <div className="hidden md:block">
            <StepPill step={step} />
          </div>
          <h2 className="mt-5 md:mt-6 text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.025em]">
            {headline.title}
          </h2>
          <p className="mt-3 md:mt-4 text-[15px] md:text-[17px] text-muted max-w-xl">
            {headline.subtitle}
          </p>

          {/* Step body */}
          <div className="mt-8 md:mt-10 flex-1">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
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
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
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
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
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
        </div>
      </div>

      {step === 2 && (
        <p className="px-6 md:px-10 pb-6 md:pb-8 text-[12.5px] text-muted text-center">
          By submitting you agree I may email you back. No spam, no list — just a
          reply.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stepper bits                                                        */
/* ------------------------------------------------------------------ */

function StepPill({ step }: { step: 0 | 1 | 2 }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] md:text-[13px] font-medium"
      style={{
        background: "color-mix(in oklab, var(--accent) 18%, transparent)",
        color: "color-mix(in oklab, var(--accent) 90%, var(--fg))",
      }}
    >
      <span
        aria-hidden
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      Step {step + 1} of 3
    </span>
  );
}

function VerticalStepper({
  current,
  onJump,
}: {
  current: 0 | 1 | 2;
  onJump: (target: 0 | 1 | 2) => void;
}) {
  return (
    <ol className="relative">
      {/* vertical connecting line */}
      <span
        aria-hidden
        className="absolute left-[14px] top-5 bottom-5 w-px"
        style={{ background: "color-mix(in oklab, var(--fg) 15%, transparent)" }}
      />

      {STEPS.map((s, i) => {
        const active = i === current;
        const done = i < current;
        const disabled = !done && !active;
        return (
          <li
            key={s.id}
            className={`relative mb-10 last:mb-0 flex items-start gap-4 ${
              disabled ? "" : "cursor-pointer"
            }`}
            onClick={() => !disabled && onJump(i as 0 | 1 | 2)}
          >
            <span
              className={`relative z-10 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-semibold transition-all ${
                active
                  ? "bg-fg text-bg"
                  : done
                    ? "text-black"
                    : "border border-border bg-bg text-muted"
              }`}
              style={done ? { background: "var(--accent)" } : undefined}
            >
              {done ? <CheckIcon className="w-3.5 h-3.5" /> : i + 1}
            </span>
            <div className="pt-0.5">
              <p
                className={`text-[14px] md:text-[15px] font-semibold tracking-[-0.01em] ${
                  active || done ? "text-fg" : "text-muted"
                }`}
              >
                {s.title}
              </p>
              <p className="mt-1 text-[12.5px] md:text-[13px] text-muted leading-[1.4] max-w-[200px]">
                {s.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

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
    <div className="mt-10 md:mt-12 pt-6 border-t border-border flex items-center justify-between gap-4">
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
/* Step 1 — The Project                                                */
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
    <div className="space-y-9 md:space-y-10">
      {/* Your goal — icon tiles */}
      <section>
        <SectionLabel icon={<GridIcon className={SECTION_ICON_CLS} />}>
          Your goal
        </SectionLabel>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {PROJECT_TYPES.map((t) => {
            const Icon = PROJECT_TYPE_ICONS[t.value];
            const selected = projectTypes.includes(t.value);
            return (
              <IconTile
                key={t.value}
                selected={selected}
                onClick={() => onToggleProjectType(t.value)}
                icon={<Icon className={ICON_CLS} />}
                label={t.label}
              />
            );
          })}
        </div>
        {errors.projectTypes && (
          <p className="mt-2 text-[12.5px] text-red-500">
            {errors.projectTypes}
          </p>
        )}
      </section>

      {/* Where are you at — pill chips */}
      <section>
        <SectionLabel icon={<BulbIcon className={SECTION_ICON_CLS} />}>
          Where are you at?
        </SectionLabel>
        <div className="mt-4 flex flex-wrap gap-2 md:gap-2.5">
          {PROJECT_STAGES.map((s) => {
            const selected = stage === s.value;
            return (
              <PillChip
                key={s.value}
                selected={selected}
                onClick={() => onStageChange(s.value)}
              >
                {s.label}
              </PillChip>
            );
          })}
        </div>
        {errors.stage && (
          <p className="mt-2 text-[12.5px] text-red-500">{errors.stage}</p>
        )}
      </section>

      {/* Brief */}
      <section>
        <SectionLabel icon={<DocIcon className={SECTION_ICON_CLS} />}>
          Brief — what are you trying to solve?
        </SectionLabel>
        <div className="mt-4">
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={6}
            maxLength={2000}
            className={`${inputCls(!!errors.message)} resize-y min-h-[160px]`}
            placeholder="The problem, the users, the outcome you want. Links to Figma / Notion / inspiration welcome."
          />
          <div className="mt-2 flex items-center justify-between">
            {errors.message ? (
              <p className="text-[12.5px] text-red-500">{errors.message}</p>
            ) : (
              <span />
            )}
            <p className="text-[12px] text-muted tabular-nums">
              {message.trim().length} / 2000{" "}
              <span className="opacity-60">· min 30</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — The Details                                                */
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
    <div className="space-y-9 md:space-y-10">
      {/* Budget */}
      <section>
        <SectionLabel icon={<CoinIcon className={SECTION_ICON_CLS} />}>
          Budget
        </SectionLabel>

        <div className="mt-4 flex flex-wrap gap-1.5">
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

        <div className="mt-3 relative">
          {currencyMeta.symbol && !budgetSkipped && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] md:text-[18px] font-semibold text-fg/70 pointer-events-none">
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
            placeholder={
              budgetSkipped ? "Skipped — open to discuss" : "e.g. 15,000"
            }
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
        {errors.budgetAmount && (
          <p className="mt-1.5 text-[12.5px] text-red-500">
            {errors.budgetAmount}
          </p>
        )}
      </section>

      {/* Timeline */}
      <section>
        <SectionLabel icon={<ClockIcon className={SECTION_ICON_CLS} />}>
          Timeline
        </SectionLabel>
        <div className="mt-4 flex flex-wrap gap-2 md:gap-2.5">
          {TIMELINES.filter((t) => t.value !== "").map((t) => {
            const selected = timeline === t.value;
            return (
              <PillChip
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
              </PillChip>
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
        {errors.timelineCustom && (
          <p className="mt-2 text-[12.5px] text-red-500">
            {errors.timelineCustom}
          </p>
        )}
      </section>

      {/* About you */}
      <section>
        <SectionLabel icon={<UserIcon className={SECTION_ICON_CLS} />}>
          About you
        </SectionLabel>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField
            label="Your name"
            required
            value={name}
            onChange={onNameChange}
            autoComplete="name"
            placeholder="e.g. Sophia Nguyen"
            error={errors.name}
          />
          <TextField
            label="Your email"
            required
            type="email"
            value={email}
            onChange={onEmailChange}
            autoComplete="email"
            placeholder="e.g. sophia@getwavy.app"
            error={errors.email}
          />
          <div className="md:col-span-2">
            <TextField
              label="Company / role"
              value={company}
              onChange={onCompanyChange}
              autoComplete="organization"
              placeholder="e.g. Head of Product at Wavy"
            />
          </div>
        </div>
      </section>
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
    <div className="space-y-5">
      <ReviewBlock
        label="The project"
        icon={<GridIcon className={SECTION_ICON_CLS} />}
        onEdit={onEditProject}
      >
        <ReviewRow label="Building">
          {projectTypes.map(projectTypeLabel).join(" · ") || "—"}
        </ReviewRow>
        <ReviewRow label="Stage">{stageLabel(stage)}</ReviewRow>
        <ReviewRow label="Brief" vertical>
          <p className="leading-[1.65] whitespace-pre-wrap">
            {message}
          </p>
        </ReviewRow>
      </ReviewBlock>

      <ReviewBlock
        label="The details"
        icon={<CoinIcon className={SECTION_ICON_CLS} />}
        onEdit={onEditDetails}
      >
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
            {name} <span className="text-muted">· {email}</span>
          </span>
        </ReviewRow>
        {company && <ReviewRow label="Role">{company}</ReviewRow>}
      </ReviewBlock>
    </div>
  );
}

function ReviewBlock({
  label,
  icon,
  onEdit,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-border bg-bg p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-semibold text-fg">
          <span className="text-muted">{icon}</span>
          <span>{label}</span>
        </div>
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
      <div className="min-w-0">
        <p className="text-[12.5px] md:text-[13px] text-muted font-medium mb-2">
          {label}
        </p>
        <div className="text-[14.5px] md:text-[15px] text-fg break-words [overflow-wrap:anywhere]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[7rem_1fr] md:grid-cols-[9rem_1fr] gap-x-3 items-baseline min-w-0">
      <p className="text-[12.5px] md:text-[13px] text-muted font-medium">
        {label}
      </p>
      <div className="text-[14.5px] md:text-[15px] text-fg min-w-0 break-words [overflow-wrap:anywhere]">
        {children}
      </div>
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
      className="relative rounded-[28px] border border-border bg-fg/[0.015] p-10 md:p-16 text-center max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
        className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-6 md:mb-8"
        style={{ background: "var(--accent)" }}
      >
        <CheckIcon className="w-8 h-8 md:w-10 md:h-10 text-black" />
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

function SectionLabel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-semibold text-fg">
      <span className="text-muted">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function IconTile({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={`relative flex flex-col items-center justify-center gap-3 md:gap-4 h-28 md:h-32 rounded-[18px] md:rounded-[20px] border-2 bg-bg px-3 py-4 text-[13px] md:text-[14px] font-medium transition-colors ${
        selected
          ? "text-fg"
          : "border-border text-fg hover:border-fg/30"
      }`}
      style={
        selected
          ? {
              borderColor: "var(--accent)",
              boxShadow: "0 10px 30px -16px color-mix(in oklab, var(--accent) 50%, transparent)",
            }
          : undefined
      }
      aria-pressed={selected}
    >
      <span className="text-fg/80">{icon}</span>
      <span>{label}</span>
      {selected && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-black"
          style={{ background: "var(--accent)" }}
          aria-hidden
        >
          <CheckIcon className="w-3 h-3" />
        </motion.span>
      )}
    </motion.button>
  );
}

function PillChip({
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
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] md:text-[14px] font-medium border transition-all ${
        selected
          ? "bg-fg text-bg border-fg"
          : "bg-bg text-fg border-border hover:border-fg/40"
      }`}
      aria-pressed={selected}
    >
      {selected && <CheckIcon className="w-3.5 h-3.5" />}
      {children}
    </button>
  );
}

function TextField({
  label,
  required,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] md:text-[12.5px] font-medium text-muted mb-1.5">
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--accent)" }}>
            *
          </span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={inputCls(!!error)}
        placeholder={placeholder}
      />
      {error && <p className="mt-1.5 text-[12.5px] text-red-500">{error}</p>}
    </label>
  );
}

const baseInputCls =
  "w-full rounded-[14px] border bg-bg px-4 py-3 text-[14.5px] text-fg placeholder:text-muted/60 focus:outline-none focus:border-fg/40 transition-colors";

function inputCls(hasError: boolean) {
  return `${baseInputCls} ${hasError ? "border-red-400/60" : "border-border"}`;
}

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type InquiryStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "closed";

export const INQUIRY_STATUSES: InquiryStatus[] = [
  "new",
  "reviewing",
  "contacted",
  "closed",
];

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  contacted: "Contacted",
  closed: "Closed",
};

export type ProjectType =
  | "mobile-app"
  | "web-app"
  | "website"
  | "system"
  | "not-sure";

export const PROJECT_TYPES: Array<{ value: ProjectType; label: string }> = [
  { value: "mobile-app", label: "Mobile app" },
  { value: "web-app", label: "Web app" },
  { value: "website", label: "Website" },
  { value: "system", label: "Internal system" },
  { value: "not-sure", label: "Not sure yet" },
];

export type ProjectStage = "idea" | "brief" | "mockups" | "rebuild";

export const PROJECT_STAGES: Array<{ value: ProjectStage; label: string }> = [
  { value: "idea", label: "Just an idea" },
  { value: "brief", label: "Have a brief" },
  { value: "mockups", label: "Have mockups" },
  { value: "rebuild", label: "Rebuild existing" },
];

export type Currency =
  | "EUR"
  | "USD"
  | "GBP"
  | "JPY"
  | "THB"
  | "KHR"
  | "SGD"
  | "OTHER";

export const CURRENCIES: Array<{
  value: Currency;
  label: string;
  symbol: string;
}> = [
  { value: "EUR", label: "EUR", symbol: "€" },
  { value: "USD", label: "USD", symbol: "$" },
  { value: "GBP", label: "GBP", symbol: "£" },
  { value: "JPY", label: "JPY", symbol: "¥" },
  { value: "THB", label: "THB", symbol: "฿" },
  { value: "KHR", label: "KHR", symbol: "៛" },
  { value: "SGD", label: "SGD", symbol: "S$" },
  { value: "OTHER", label: "Other", symbol: "" },
];

export type Budget =
  | { amount: number; currency: Currency; skipped?: false }
  | { skipped: true; amount?: never; currency?: never };

export type Timeline =
  | "asap"
  | "1-3-months"
  | "3-6-months"
  | "flexible"
  | "custom"
  | "";

export const TIMELINES: Array<{ value: Timeline; label: string }> = [
  { value: "", label: "Select…" },
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "flexible", label: "Flexible" },
  { value: "custom", label: "Custom" },
];

export type Inquiry = {
  id?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  name: string;
  email: string;
  company?: string;
  projectTypes: ProjectType[];
  stage: ProjectStage;
  budget: Budget;
  timeline?: Timeline;
  /** Free-text timeline — only set when `timeline === "custom"`. */
  timelineCustom?: string;
  message: string;
  source?: string;
  userAgent?: string;
  status: InquiryStatus;
  notes?: string;
};

/* Shape used by the public form (no admin fields, no server timestamp) */
export type NewInquiryInput = {
  name: string;
  email: string;
  company?: string;
  projectTypes: ProjectType[];
  stage: ProjectStage;
  budget: Budget;
  timeline?: Timeline;
  /** Free-text timeline — required when `timeline === "custom"`. */
  timelineCustom?: string;
  message: string;
  source?: string;
  userAgent?: string;
  /** Honeypot — must be empty. */
  website?: string;
  /** Milliseconds since the form mounted. Rejected if < 2000. */
  elapsedMs: number;
};

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationErrors = Partial<
  Record<keyof NewInquiryInput, string>
> & {
  budgetAmount?: string;
};

export function validateInquiry(input: NewInquiryInput): ValidationErrors {
  const errors: ValidationErrors = {};

  // Honeypot: silent reject if filled.
  if (input.website && input.website.trim() !== "") {
    errors.website = "spam";
  }

  // Time-check: real humans take longer than 2s.
  if (input.elapsedMs < 2000) {
    errors.elapsedMs = "too-fast";
  }

  const name = (input.name ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 100) errors.name = "Name is a bit long — try shorter.";

  const email = (input.email ?? "").trim();
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";

  const company = (input.company ?? "").trim();
  if (company.length > 100) errors.company = "Keep it under 100 characters.";

  if (!Array.isArray(input.projectTypes) || input.projectTypes.length === 0) {
    errors.projectTypes = "Pick at least one.";
  }

  if (
    !input.stage ||
    !["idea", "brief", "mockups", "rebuild"].includes(input.stage)
  ) {
    errors.stage = "Pick where you're at.";
  }

  // Budget
  if ("skipped" in input.budget && input.budget.skipped === true) {
    // ok
  } else if ("amount" in input.budget) {
    if (
      typeof input.budget.amount !== "number" ||
      !Number.isFinite(input.budget.amount) ||
      input.budget.amount <= 0
    ) {
      errors.budgetAmount = "Enter an amount or skip.";
    }
    if (!input.budget.currency) {
      errors.budget = "Pick a currency.";
    }
  } else {
    errors.budget = "Enter a budget or skip.";
  }

  const message = (input.message ?? "").trim();
  if (message.length === 0) {
    errors.message = "Tell me a bit about what you're building.";
  }

  // Timeline — if "custom", the free-text must be non-empty.
  if (input.timeline === "custom") {
    const custom = (input.timelineCustom ?? "").trim();
    if (custom.length < 2) {
      errors.timelineCustom = "Tell me your timeline.";
    }
    if (custom.length > 120) {
      errors.timelineCustom = "Keep it under 120 characters.";
    }
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/* CRUD                                                                */
/* ------------------------------------------------------------------ */

const COLLECTION = "inquiries";

export async function createInquiry(input: NewInquiryInput): Promise<string> {
  const errors = validateInquiry(input);
  if (Object.keys(errors).length > 0) {
    throw new Error("Validation failed");
  }

  const payload: Record<string, unknown> = {
    createdAt: serverTimestamp(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    projectTypes: input.projectTypes,
    stage: input.stage,
    budget: input.budget,
    message: input.message.trim(),
    status: "new" as InquiryStatus,
  };

  const company = (input.company ?? "").trim();
  if (company) payload.company = company;

  if (input.timeline) payload.timeline = input.timeline;
  if (input.timeline === "custom" && input.timelineCustom) {
    payload.timelineCustom = input.timelineCustom.trim();
  }
  if (input.source) payload.source = input.source;
  if (input.userAgent) payload.userAgent = input.userAgent;

  const ref = await addDoc(collection(db, COLLECTION), payload);
  return ref.id;
}

export async function listInquiries(): Promise<Inquiry[]> {
  const snap = await getDocs(
    query(collection(db, COLLECTION), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Inquiry) }));
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Inquiry) };
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function updateInquiryNotes(
  id: string,
  notes: string,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    notes,
    updatedAt: serverTimestamp(),
  });
}

/** Live-updating list — admin page uses this for the badge count. */
export function subscribeToInquiries(
  onChange: (list: Inquiry[]) => void,
): () => void {
  return onSnapshot(
    query(collection(db, COLLECTION), orderBy("createdAt", "desc")),
    (snap) => {
      onChange(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Inquiry) })),
      );
    },
  );
}

/* ------------------------------------------------------------------ */
/* Display helpers                                                     */
/* ------------------------------------------------------------------ */

export function formatBudget(budget: Budget): string {
  if ("skipped" in budget && budget.skipped) return "Open to discuss";
  const currency = CURRENCIES.find((c) => c.value === budget.currency);
  const symbol = currency?.symbol ?? "";
  const amount = budget.amount.toLocaleString("en-US");
  if (currency?.value === "OTHER") return `${amount} ${currency.label}`;
  return `${symbol}${amount}`;
}

export function projectTypeLabel(value: ProjectType): string {
  return PROJECT_TYPES.find((t) => t.value === value)?.label ?? value;
}

export function stageLabel(value: ProjectStage): string {
  return PROJECT_STAGES.find((s) => s.value === value)?.label ?? value;
}

export function timelineLabel(value?: Timeline, custom?: string): string {
  if (!value) return "—";
  if (value === "custom") return custom?.trim() || "Custom";
  return TIMELINES.find((t) => t.value === value)?.label ?? value;
}

export function formatRelativeTime(ts: Timestamp | undefined): string {
  if (!ts) return "just now";
  const diff = Date.now() - ts.toDate().getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} d ago`;
  return ts.toDate().toLocaleDateString();
}

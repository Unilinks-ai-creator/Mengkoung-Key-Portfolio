import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ProjectPreview } from "@/components/project-preview";
import {
  CaseStudyBack,
  CaseStudySection,
  ImpactStats,
  MetaGrid,
} from "@/components/case-study";

export const metadata: Metadata = {
  title: "Unilinks — Global Education Platform",
  description:
    "An all-in-one platform helping students discover, apply and manage opportunities to study abroad.",
};

export default function UnilinksPage() {
  return (
    <>
      <CaseStudyBack />

      <section className="container-wide pt-6 md:pt-8 pb-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="text-[13px] text-muted">01 / 05</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-display mt-4">Unilinks</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 text-[22px] md:text-[28px] font-medium text-muted">
                Global Education Platform
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-fg/80">
                An all-in-one platform helping students discover, apply and
                manage opportunities to study abroad.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="aspect-[4/3] rounded-[16px] overflow-hidden">
              <ProjectPreview variant="desktop" title="Unilinks" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-wide mt-12 md:mt-16">
        <MetaGrid
          items={[
            { label: "Role", value: "Co-founder & COO" },
            { label: "Duration", value: "2023 — Present" },
            {
              label: "Co-founders",
              value: "Aung Kaung Pyae · Ngu Wah Aung · Angela",
            },
            {
              label: "My contribution",
              value: (
                <span>
                  Product Strategy · Operations · Marketing · Partnerships
                </span>
              ),
            },
          ]}
        />
      </section>

      <CaseStudySection label="Impact">
        <ImpactStats
          items={[
            { value: "150+", label: "Students enrolled" },
            { value: "50–100%", label: "Scholarships secured" },
            { value: "7+", label: "Interns trained" },
            { value: "3", label: "Countries recruiting" },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection label="The problem" title="The journey abroad is fragmented.">
        <p className="max-w-[720px] text-[17px] leading-[1.65] text-muted">
          Students who want to study abroad often navigate universities,
          scholarships, applications, documents, visas, accommodation, deadlines
          and communication — across dozens of tools that don't talk to each
          other. The result is confusion, missed deadlines, and lost
          opportunities.
        </p>
      </CaseStudySection>

      <CaseStudySection label="The insight">
        <blockquote className="max-w-[820px] text-[28px] md:text-[40px] leading-[1.15] tracking-tight font-medium">
          “Students don&apos;t just need information. They need a system that
          guides them through the entire journey.”
        </blockquote>
      </CaseStudySection>

      <CaseStudySection label="The product" title="One platform, from discovery to arrival.">
        <p className="max-w-[720px] text-[16px] leading-[1.65] text-muted">
          Unilinks brings the whole student journey into a single, coherent
          experience — from browsing universities to tracking visa progress.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Student profile & dashboard",
            "University discovery",
            "Scholarship discovery",
            "Application management",
            "Document management",
            "Visa tracking",
            "Accommodation",
            "Opportunities & alerts",
            "Advisor communication",
          ].map((f) => (
            <div
              key={f}
              className="rounded-[12px] border border-border p-5 text-[14px] text-fg"
            >
              {f}
            </div>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection label="Product evolution">
        <div className="grid gap-4 md:grid-cols-4">
          {["Agency", "Service", "Digital tools", "Platform"].map((step, i) => (
            <div
              key={step}
              className="relative rounded-[16px] border border-border px-6 py-8"
            >
              <p className="text-[13px] text-muted">Step 0{i + 1}</p>
              <p className="mt-2 text-[20px] font-semibold tracking-tight">
                {step}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[720px] text-[15px] leading-[1.65] text-muted">
          Each step was driven by real customer problems. The agency uncovered
          the manual pain. The service revealed what could be systematised.
          Digital tools proved which features unlocked real time savings. The
          platform is the compounding result.
        </p>
      </CaseStudySection>

      <CaseStudySection label="Outcome" title="What I learned.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Real problems make better products.",
              body: "Every meaningful feature came from watching a student get stuck. Nothing came from a whiteboard alone.",
            },
            {
              title: "Systems beat services.",
              body: "A service scales linearly with people. A product scales with usage — but only if the underlying journey is well-modelled.",
            },
            {
              title: "Trust is the real moat.",
              body: "Families are trusting us with their child's future. Every UI decision has to earn that.",
            },
            {
              title: "Ship small, listen loud.",
              body: "The best iteration cycles came from tiny releases followed by long conversations.",
            },
          ].map((l) => (
            <div key={l.title} className="rounded-[16px] border border-border p-6">
              <p className="text-[18px] font-semibold tracking-tight">
                {l.title}
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">
                {l.body}
              </p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    </>
  );
}

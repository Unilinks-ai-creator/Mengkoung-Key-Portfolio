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
  title: "Linky — Student Community App",
  description:
    "A community platform designed to help international students connect with people, events and opportunities.",
};

export default function LinkyPage() {
  return (
    <>
      <CaseStudyBack />

      <section className="container-wide pt-6 md:pt-8 pb-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="text-[13px] text-muted">02 / 05</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-display mt-4">Linky</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 text-[22px] md:text-[28px] font-medium text-muted">
                Student Community App
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-fg/80">
                A community platform designed to help international students
                connect with people, events and opportunities.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="aspect-[4/3] rounded-[16px] overflow-hidden">
              <ProjectPreview variant="mobile" title="Linky" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-wide mt-12 md:mt-16">
        <MetaGrid
          items={[
            { label: "Role", value: "Founder, Product Manager" },
            { label: "Duration", value: "2023 — Present" },
            { label: "Team", value: "7 interns" },
            {
              label: "My contribution",
              value: "Product Strategy · UX/UI Design · Community Building",
            },
          ]}
        />
      </section>

      <CaseStudySection label="Traction (target)">
        <ImpactStats
          items={[
            { value: "500+", label: "Early users" },
            { value: "30+", label: "Communities" },
            { value: "100+", label: "Events created" },
            { value: "High", label: "User engagement" },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection label="The problem" title="Moving abroad is lonely.">
        <p className="max-w-[720px] text-[17px] leading-[1.65] text-muted">
          International students often struggle to build social connections and
          discover useful opportunities after moving abroad. Existing tools
          serve either academics or social — never both.
        </p>
      </CaseStudySection>

      <CaseStudySection label="The opportunity">
        <blockquote className="max-w-[820px] text-[28px] md:text-[40px] leading-[1.15] tracking-tight font-medium">
          “Create one digital community connecting students beyond academics.”
        </blockquote>
      </CaseStudySection>

      <CaseStudySection label="The product" title="Discover → Connect → Participate → Grow.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Community",
            "Chat",
            "Friends",
            "Events",
            "Calendar",
            "Jobs",
            "Mentors",
            "Housing",
            "Emergency support",
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

      <CaseStudySection label="Product thinking" title="Why the MVP is community first.">
        <p className="max-w-[720px] text-[16px] leading-[1.65] text-muted">
          It is tempting to ship every feature at once. But without a healthy
          community layer, jobs and events have no participants and no signal.
          The MVP intentionally focuses on the core connection experience —
          everything else compounds from there.
        </p>
      </CaseStudySection>

      <CaseStudySection label="Monetization">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Housing",
            "Job postings",
            "University partnerships",
            "Premium services",
            "Marketplace",
            "Student services",
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
    </>
  );
}

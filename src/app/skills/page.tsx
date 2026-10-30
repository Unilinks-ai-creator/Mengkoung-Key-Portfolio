import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  Accent,
  SectionChrome,
  SectionHeader,
} from "@/components/section-chrome";
import { skillGroups, languages } from "@/lib/content";
import { SkillsExplorer } from "./skills-explorer";

const languagesGroup = {
  title: "Languages",
  description:
    "Five languages, learned across sixteen countries. I started with zero English — now I work in five of them.",
  skills: languages.map((l) => `${l.name} — ${l.level}`),
};

const allGroups = [...skillGroups, languagesGroup];

export const metadata: Metadata = {
  title: "Skills",
  description:
    "The toolkit Mengkoung Key brings to the table — Product & Strategy, Marketing & Growth, Design, AI & Engineering, Business & Operations and daily Tools.",
};

export default function SkillsPage() {
  return (
    <>
      <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
        <Reveal>
          <SectionChrome label="Skills" />
        </Reveal>

        <Reveal delay={0.05}>
          <SectionHeader
            heading={
              <>
                What I bring to the table<Accent>.</Accent>
              </>
            }
            description="Six years of building across ventures, a Master's in Digital Marketing, and a Master's in Product Management at Harbour.Space Barcelona — Highest GPA, Batch of 2026."
            headingMax="none"
          />
        </Reveal>
      </section>

      <section className="container-wide pb-16 md:pb-24">
        <Reveal>
          <SkillsExplorer groups={allGroups} />
        </Reveal>
      </section>

      <section className="container-wide">
        <Reveal>
          <div
            data-cursor="light"
            className="relative overflow-hidden rounded-[24px] bg-[#0d0d0d] text-white px-8 md:px-16 py-14 md:py-20"
          >
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div
                className="absolute -right-40 top-1/2 -translate-y-1/2 w-[900px] h-[400px] rotate-[-8deg] blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.14), transparent 60%)",
                }}
              />
            </div>

            <div className="relative">
              <p className="text-[13px] md:text-[14px] font-medium text-white/55">
                Want the long version?
              </p>
              <p className="mt-7 md:mt-9 text-[26px] sm:text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium max-w-[22ch]">
                From a D grade and zero English to Highest GPA at Harbour.Space.
              </p>
              <p className="mt-5 md:mt-6 text-[14px] md:text-[15px] text-white/60 max-w-[52ch] leading-[1.6]">
                The full story of how I built this toolkit — six years of
                shipping, learning, and figuring it out.
              </p>

              <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 self-start sm:self-auto rounded-full bg-white text-black pl-5 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 text-[14px] md:text-[15px] font-medium hover:bg-white/90 transition-all shadow-lg shadow-black/30"
                >
                  <span>Read the full story</span>
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-[13px] text-black transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ background: "var(--accent)" }}
                  >
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="text-[14px] md:text-[15px] font-medium text-white/60 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
                >
                  or email me directly
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

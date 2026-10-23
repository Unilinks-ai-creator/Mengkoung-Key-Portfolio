import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { languages, skillGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Product, marketing, design, business and operations — the toolkit Mengkoung Key has built across six ventures and a Master's in Digital Marketing.",
};

export default function SkillsPage() {
  return (
    <>
      <section className="container-wide pt-10 md:pt-16 pb-6 md:pb-10">
        <Reveal>
          <p className="text-label text-muted flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Skills
          </p>
        </Reveal>

        <div className="mt-6 md:mt-8 grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-end">
          <Reveal delay={0.05}>
            <h1 className="text-display">The toolkit.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[15px] md:text-[17px] text-muted max-w-[440px] md:justify-self-end">
              Built across six ventures, a Bachelor&apos;s in Entrepreneurship
              and a Master&apos;s in Digital Marketing. Now sharpening the
              product side at Harbour.Space Barcelona.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-wide mt-16 md:mt-24 mb-16 md:mb-24">
        <div className="grid gap-14 md:gap-20">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16 border-t border-border pt-10 md:pt-12">
                <div>
                  <p className="text-[13px] text-muted">
                    0{i + 1} / 0{skillGroups.length}
                  </p>
                  <h2 className="mt-2 text-[26px] md:text-[32px] font-semibold tracking-tight">
                    {group.title}
                  </h2>
                  <p className="mt-4 max-w-[360px] text-[14.5px] md:text-[15px] text-muted leading-[1.6]">
                    {group.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 md:pt-2 self-start">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-4 py-2 text-[13.5px] text-fg hover:border-fg/40 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide mt-8 md:mt-16 mb-24 md:mb-32">
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16 border-t border-border pt-10 md:pt-12">
          <div>
            <p className="text-[13px] text-muted">Languages</p>
            <h2 className="mt-2 text-[26px] md:text-[32px] font-semibold tracking-tight">
              Five languages.
            </h2>
            <p className="mt-4 max-w-[360px] text-[14.5px] md:text-[15px] text-muted leading-[1.6]">
              I&apos;ve lived, studied and worked in 14 countries. Language is
              how I keep building bridges between them.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 self-start">
            {languages.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.03}>
                <p className="text-[17px] font-medium tracking-tight">
                  {l.name}
                </p>
                <p className="mt-1 text-[13px] text-muted">{l.level}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

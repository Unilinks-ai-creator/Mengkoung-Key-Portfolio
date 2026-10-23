import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import {
  diamondQuote,
  drivers,
  languages,
  missionQuote,
  timeline,
  values,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cambodian entrepreneur & Product Manager based in Barcelona. A journey of building across e-commerce, F&B, logistics, education and product.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container-wide pt-10 md:pt-16 pb-12 md:pb-20">
        <Reveal>
          <p className="text-label text-muted flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            About me
          </p>
        </Reveal>

        <div className="mt-8 md:mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <Reveal delay={0.05}>
              <h1 className="text-display">
                From Cambodia
                <br />
                to Barcelona.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[540px] text-[17px] md:text-[18px] leading-[1.6] text-muted">
                A journey of curiosity, building and building again — across
                e-commerce, F&amp;B, logistics, education and product. My
                mission: contribute to Cambodia&apos;s development, and build
                products that create real opportunity.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] max-w-[440px] justify-self-end w-full overflow-hidden rounded-[16px] bg-[#111]">
              <Image
                src="/portrait.jpg"
                alt="Mengkoung Key"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover"
              />
              <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6">
                <div className="flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[12px] text-white/90">
                  <span
                    aria-hidden
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  Based in Barcelona, Spain
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-wide mt-16 md:mt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <p className="text-label text-muted mb-6">The journey</p>
            </Reveal>
            <ol className="relative border-l border-border pl-6 md:pl-8">
              {timeline.map((item, i) => (
                <Reveal
                  key={item.year}
                  delay={i * 0.03}
                  as="li"
                  className="pb-10 relative"
                >
                  <span
                    aria-hidden
                    className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-fg"
                  />
                  <p className="text-[13px] font-medium text-muted">
                    {item.year}
                  </p>
                  <p className="mt-1 text-[16px] font-semibold text-fg">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-[440px] text-[14.5px] text-muted leading-[1.6]">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:sticky lg:top-28 self-start">
            <Reveal>
              <p className="text-label text-muted mb-6">The mission</p>
            </Reveal>
            <Reveal delay={0.05}>
              <blockquote className="text-[24px] md:text-[32px] leading-[1.2] tracking-tight font-medium">
                &ldquo;{missionQuote.text}&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[460px] text-[15px] md:text-[16px] text-muted leading-[1.65]">
                Everything I build is a step toward that. Some ventures serve
                Cambodian students directly, some just teach me how to build
                better — but the through-line is opportunity, and the tool is
                product.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-2">
              {values.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-[13px] text-fg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide mt-24 md:mt-40">
        <div className="relative overflow-hidden rounded-[24px] bg-[#0d0d0d] text-white px-8 md:px-16 py-16 md:py-24">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div
              className="absolute -left-40 top-1/2 -translate-y-1/2 w-[900px] h-[400px] rotate-[8deg] blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.14), transparent 60%)",
              }}
            />
          </div>
          <div className="relative">
            <p className="text-label text-white/60">Words I keep with me</p>
            <blockquote className="mt-8 text-[32px] md:text-[52px] leading-[1.1] tracking-tight font-medium max-w-[900px]">
              &ldquo;{diamondQuote.text}&rdquo;
            </blockquote>
            <p className="mt-8 text-[13px] text-white/50">
              — {diamondQuote.attribution}
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide mt-24 md:mt-40">
        <Reveal>
          <h2 className="text-h1">What drives me</h2>
        </Reveal>

        <div className="mt-10 md:mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {drivers.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <p className="text-[18px] font-semibold tracking-tight">
                {d.title}
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted max-w-[240px]">
                {d.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide mt-24 md:mt-32 mb-8">
        <Reveal>
          <p className="text-label text-muted mb-6">Languages</p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5 border-t border-border pt-8">
          {languages.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.03}>
              <p className="text-[17px] font-medium tracking-tight">{l.name}</p>
              <p className="mt-1 text-[13px] text-muted">{l.level}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

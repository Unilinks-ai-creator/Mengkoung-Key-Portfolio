import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/section-chrome";
import { EmailCta } from "./email-cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mengkoung Key — open to product roles, founder collaborations and problems worth solving. Based in Barcelona, working anywhere.",
};

const EMAIL = "keymengkoung8@gmail.com";

const LINKEDIN = "https://linkedin.com/in/mengkoungkey";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft ambient background — replaces the wireframe sphere */}
      <BackgroundField />

      <div className="relative container-wide pt-14 md:pt-32 pb-16 md:pb-24 text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 md:gap-2.5 text-[10.5px] md:text-[15px] tracking-[0.16em] md:tracking-[0.22em] uppercase text-muted">
            <span className="relative inline-flex w-2 h-2">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full animate-ping opacity-75"
                style={{ background: "var(--accent)" }}
              />
              <span
                aria-hidden
                className="relative inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <span className="hidden sm:inline">
              Available — Replies within 24 hours
            </span>
            <span className="sm:hidden">Available · 24h reply</span>
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 md:mt-8 text-[52px] sm:text-[88px] md:text-[120px] lg:text-[160px] font-bold leading-[0.95] tracking-[-0.045em]">
            Say hello<Accent>.</Accent>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 md:mt-10 max-w-2xl mx-auto text-[16px] md:text-[22px] leading-[1.55] text-muted">
            I&apos;m open to product roles, founder collaborations and real
            problems — especially at the intersection of{" "}
            <span className="text-fg font-medium">AI</span>,{" "}
            <span className="text-fg font-medium">education</span> and{" "}
            <span className="text-fg font-medium">consumer product</span>.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 md:mt-14 flex justify-center">
            <EmailCta email={EMAIL} />
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-20 md:mt-28 flex items-center justify-center text-[16px] md:text-[18px]">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-fg hover:text-muted transition-colors"
            >
              <span className="underline underline-offset-4 decoration-border group-hover:decoration-fg transition-colors">
                Or find me on LinkedIn
              </span>
              <span
                aria-hidden
                className="text-[13px] text-muted group-hover:text-fg group-hover:translate-x-0.5 transition-all"
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-10 text-[14px] md:text-[15px] text-muted">
            Based in Barcelona · Working anywhere
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BackgroundField() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {/* Subtle vertical gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bg) 0%, color-mix(in oklab, var(--fg) 2%, var(--bg)) 60%, var(--bg) 100%)",
        }}
      />
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--fg) 1px, transparent 1px), linear-gradient(to bottom, var(--fg) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Soft focal glow — replaces the sphere */}
      <div
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[1000px] aspect-square rounded-full blur-3xl opacity-[0.22]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

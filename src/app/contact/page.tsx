import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/section-chrome";
import { ContactForm } from "./contact-form";
import { EmailCta } from "./email-cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hire Mengkoung Key for freelance product builds — mobile app, web app, website or internal system. From first problem to shipped product, with an AI-native workflow.",
};

const EMAIL = "keymengkoung8@gmail.com";
const LINKEDIN = "https://linkedin.com/in/mengkoungkey";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundField />

      <div className="relative container-wide pt-14 md:pt-32 pb-20 md:pb-28">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
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
            <h1 className="mt-6 md:mt-8 text-[48px] sm:text-[72px] md:text-[96px] lg:text-[112px] font-bold leading-[0.95] tracking-[-0.04em]">
              Let&apos;s build it<Accent>.</Accent>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 md:mt-9 max-w-2xl mx-auto text-[16px] md:text-[19px] leading-[1.55] text-muted">
              Tell me what you&apos;re trying to build and I&apos;ll come back
              with a plan — mobile app, web app, website or internal system,
              from first problem to shipped product.
            </p>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.18}>
          <div className="mt-12 md:mt-16">
            <ContactForm />
          </div>
        </Reveal>

        {/* Secondary — email + LinkedIn */}
        <Reveal delay={0.26}>
          <div className="mt-16 md:mt-20 flex flex-col items-center gap-5">
            <p className="text-[13px] md:text-[14px] text-muted">
              Prefer email? Reach me directly.
            </p>
            <EmailCta email={EMAIL} />
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group mt-4 inline-flex items-center gap-2 text-[14px] md:text-[15px] font-medium text-fg hover:text-muted transition-colors"
            >
              <span className="underline underline-offset-4 decoration-border group-hover:decoration-fg transition-colors">
                Or find me on LinkedIn
              </span>
              <span
                aria-hidden
                className="text-[12px] text-muted group-hover:text-fg group-hover:translate-x-0.5 transition-all"
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <p className="mt-10 text-center text-[13px] md:text-[14px] text-muted">
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bg) 0%, color-mix(in oklab, var(--fg) 2%, var(--bg)) 60%, var(--bg) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--fg) 1px, transparent 1px), linear-gradient(to bottom, var(--fg) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[70vw] max-w-[1000px] aspect-square rounded-full blur-3xl opacity-[0.22]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

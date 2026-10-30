import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ParticleText } from "@/components/particle-text";
import { ProjectSlides } from "@/components/project-slides";
import {
  Accent,
  CtaButton,
  SectionChrome,
  SectionHeader,
} from "@/components/section-chrome";
import { FaqItem } from "@/components/faq-item";
import { EmailCopyButton } from "@/components/email-copy-button";
import { experience, education } from "@/lib/content";
import { getFeaturedWork } from "@/lib/projects";

export const revalidate = 60;

export default async function HomePage() {
  const featuredWork = await getFeaturedWork();
  return (
    <>
      <div className="sticky top-0 z-0 h-svh flex flex-col justify-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.jpg"
            alt=""
            className="hero-portrait w-full h-full object-cover"
            style={{ objectPosition: "70% 42%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 150% 110% at 25% 105%, rgba(247,247,245,1) 0%, rgba(247,247,245,0.98) 30%, rgba(247,247,245,0.82) 50%, rgba(247,247,245,0.4) 72%, rgba(247,247,245,0.05) 90%, rgba(247,247,245,0) 100%)",
            }}
          />
        </div>
        <Hero />
      </div>
      <div className="relative z-10 bg-bg rounded-t-[28px] md:rounded-t-[40px] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.15)]">
        <Intro />
        <ExperienceEducation />
        <SelectedWork projects={featuredWork} />
        <Approach />
        <Services />
        <Stats />
        <SpeedHighlight />
        <TechStack />
        <Faq />
        <ContactCta />
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="relative container-wide pt-8 md:pt-14 pb-10 md:pb-14">
      <div className="relative">
        <Reveal>
          <p className="text-[13px] md:text-[15px] uppercase tracking-[0.18em] text-muted">
            Entrepreneur · Product Builder · Marketing
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-display mt-8 md:mt-10 max-w-[22ch]">
            {["I", "help", "founders", "turn"].map((w, i) => (
              <span key={i}>
                <ParticleText>{w}</ParticleText>{" "}
              </span>
            ))}
            <br className="hidden md:block" />
            {["problems", "into"].map((w, i) => (
              <span key={i}>
                <ParticleText>{w}</ParticleText>{" "}
              </span>
            ))}
            <ParticleText always className="text-brand-blue">
              products
            </ParticleText>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 md:mt-8 max-w-[900px] text-[17px] md:text-[20px] leading-[1.55] text-muted">
            I build products where <span className="text-fg">design</span>,{" "}
            <span className="text-fg">marketing</span>,{" "}
            <span className="text-fg">AI</span>, and{" "}
            <span className="text-fg">human behavior</span> meet. Turning
            traditional businesses into modern, scalable experiences.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-8 md:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-12 md:-left-20 top-20 md:top-24 w-[80%] md:w-[60%] max-w-[880px] aspect-[4/5]"
          style={{
            background: "color-mix(in oklab, var(--fg) 3.5%, var(--bg))",
            borderRadius: "62% 38% 48% 52% / 55% 42% 58% 45%",
            transform: "rotate(-8deg)",
            filter: "blur(0.3px)",
          }}
        />
        <span
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{
            left: "20%",
            top: "22%",
            background: "var(--accent)",
          }}
        />
      </div>

      <div className="container-wide relative">
        <Reveal>
          <div className="relative border-t border-border pt-6 md:pt-8">
          <span
            aria-hidden
            className="absolute left-1/2 -top-2 -translate-x-1/2 text-muted text-[16px] leading-none select-none bg-bg px-2"
          >
            +
          </span>

          <div className="grid gap-8 md:gap-16 md:grid-cols-[1fr_3fr] items-start">
            <div className="flex items-start gap-2.5 pt-1">
              <span
                aria-hidden
                className="inline-block w-2.5 h-2.5 rounded-sm mt-1.5 shrink-0"
                style={{ background: "var(--accent)" }}
              />
              <span className="text-fg font-medium tracking-tight text-[13px] md:text-[14px]">
                Hey, Just An Intro
              </span>
            </div>

            <div>
              <h2 className="text-left indent-[25%] text-[26px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-medium leading-[1.05] tracking-[-0.025em]">
                A full-stack product builder based in Barcelona. Obsessed
                with one idea: good products come from real user problems,
                solved simply.
              </h2>

              <div className="mt-6 md:mt-8 flex justify-start">
                <CtaButton label="About me" href="/about" />
              </div>

              <div className="mt-8 md:mt-10 grid gap-10 md:gap-16 md:grid-cols-2">
                <div className="border-t border-border pt-6 md:pt-8">
                  <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.015em] text-fg">
                    Building for Founders
                  </h3>
                  <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-muted">
                    I&apos;m a product person who ships — UX, design,
                    engineering and go-to-market in one head. Great products
                    don&apos;t come from more features; they come from
                    understanding the user&apos;s real problem and keeping the
                    solution simple.
                  </p>
                </div>
                <div className="border-t border-border pt-6 md:pt-8">
                  <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.015em] text-fg">
                    Let&apos;s Work Together
                  </h3>
                  <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-muted">
                    When I take on a project, I don&apos;t just build — I
                    consult. We shape product strategy together: what to
                    build, why it matters, and how to keep it simple. Bring a
                    rough sketch, an MVP that needs to scale, or a whole
                    product to launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceEducation() {
  const items = [...experience, ...education];
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Experience & Education" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Where I&apos;ve trained<Accent>.</Accent>
            </>
          }
          description="Cross-disciplinary training across design, business, and technology — from Cambodia to Barcelona to Taipei."
          headingMax="18ch"
        />
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-6 gap-y-10 md:gap-y-14">
          {items.map((it) => (
            <li
              key={it.name}
              title={it.name}
              className="group flex items-center justify-center gap-2.5 h-14 md:h-16"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.logo}
                alt={it.wordmark ? "" : it.name}
                className={`${it.wordmark ? "max-h-10 md:max-h-11" : "max-h-full"} max-w-[140px] w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${
                  it.natural ? "" : "brightness-0"
                }`}
              />
              {it.wordmark && (
                <span className="text-[16px] md:text-[18px] font-semibold tracking-tight text-fg opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {it.wordmark}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function SelectedWork({
  projects,
}: {
  projects: import("@/lib/content").FeaturedWork[];
}) {
  return (
    <>
      <section className="container-wide pt-16 md:pt-24 pb-4 md:pb-8">
        <Reveal>
          <SectionChrome label="Featured Works" />
        </Reveal>

        <Reveal delay={0.05}>
          <SectionHeader
            heading={
              <>
                Selected Work<Accent>.</Accent>
              </>
            }
            description="Five ventures across education, SaaS and community — each designed, engineered and shipped end-to-end."
            cta={{ label: "View all projects", href: "/work" }}
          />
        </Reveal>
      </section>

      <ProjectSlides projects={projects} />
    </>
  );
}

const approachSteps = [
  {
    step: "01",
    title: "Discover",
    body: "Understand the problem, the users and the market. Interviews, competitor teardowns, and one clear thesis to build against.",
    weight: 30,
  },
  {
    step: "02",
    title: "Design",
    body: "Sketch flows, prototype in Figma, iterate with real users until the shape feels obvious. Design that survives contact with reality.",
    weight: 30,
  },
  {
    step: "03",
    title: "Ship",
    body: "Full-stack build in Next.js, React and Firebase. Deploy fast, measure, learn, iterate. Done beats perfect — but done well.",
    weight: 40,
  },
];

function Approach() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Approach" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              How I build<Accent>.</Accent>
            </>
          }
          description="A three-step process refined across five ventures — from first sketch to shipped product, with no hand-off in between."
          cta={{ label: "Get in touch", href: "/contact" }}
        />
      </Reveal>

      <div className="mt-10 md:mt-14 grid gap-6 md:gap-6 md:grid-cols-3">
        {approachSteps.map((s, i) => (
          <Reveal key={s.step} delay={0.05 + i * 0.05}>
            <article
              className="relative h-full rounded-[24px] border border-border p-8 md:p-10 flex flex-col overflow-hidden bg-surface"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, color-mix(in oklab, var(--fg) 3%, transparent) 0 1px, transparent 1px 8px)",
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-semibold text-[56px] md:text-[64px] leading-none tracking-[-0.04em] tabular-nums"
                  style={{ color: "var(--accent)" }}
                >
                  {s.weight}
                  <span className="text-fg/40 text-[32px] md:text-[36px] font-normal align-top ml-1">
                    %
                  </span>
                </span>
                <span aria-hidden className="flex items-center gap-1.5 pt-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          d <= i
                            ? "var(--accent)"
                            : "color-mix(in oklab, var(--fg) 15%, transparent)",
                      }}
                    />
                  ))}
                </span>
              </div>

              <div className="mt-16 md:mt-20 flex items-center gap-2.5 flex-wrap">
                <span
                  aria-hidden
                  className="inline-block w-2.5 h-2.5 rounded-sm"
                  style={{ background: "var(--accent)" }}
                />
                <h3 className="text-[18px] md:text-[19px] font-semibold tracking-tight">
                  {s.title}
                </h3>
              </div>

              <p className="mt-4 text-[14px] md:text-[15px] leading-[1.6] text-muted">
                {s.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

    </section>
  );
}

const services = [
  {
    n: "01",
    title: "Product Strategy",
    body: "Turning fuzzy ideas into concrete product bets. Positioning, scope, roadmap and the first version worth shipping.",
  },
  {
    n: "02",
    title: "Product Design",
    body: "End-to-end UX and UI — flows, wireframes, Figma prototypes, design systems. Fewer meetings, more pixels.",
  },
  {
    n: "03",
    title: "Full-Stack Engineering",
    body: "Next.js, React, TypeScript, Firebase, Supabase, Node. From marketing site to production app — one person, one stack.",
  },
  {
    n: "04",
    title: "Rapid MVP Builds",
    body: "Kickoff to launched product in weeks. Right-sized architecture, fast iteration, no over-engineering.",
  },
  {
    n: "05",
    title: "Founder-Level Ownership",
    body: "Not a contractor — a builder. I sweat the details, ship the awkward parts, and stick around after launch.",
  },
  {
    n: "06",
    title: "Marketing & Growth",
    body: "Landing pages that convert, SEO that actually shows up, and product loops built into the app from day one.",
  },
];

function Services() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Services" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              What I do<Accent>.</Accent>
            </>
          }
          description="Full-stack from strategy to production — I don't hand off, I build the whole thing."
          headingMax="18ch"
        />
      </Reveal>

      <div className="mt-10 md:mt-14 grid gap-4 md:gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={0.05 + (i % 2) * 0.05}>
            <article className="group h-full rounded-[20px] border border-border bg-fg/[0.02] hover:bg-fg/[0.035] transition-colors p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              <span
                className="text-[13px] md:text-[14px] font-medium tabular-nums shrink-0 md:pt-2"
                style={{ color: "var(--accent)" }}
              >
                ({s.n})
              </span>
              <div className="min-w-0">
                <h3 className="text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.015em] font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 md:mt-3 text-[14px] md:text-[15px] leading-[1.65] text-muted">
                  {s.body}
                </p>
              </div>
              <span
                aria-hidden
                className="shrink-0 md:ml-auto md:pt-1 text-muted group-hover:text-fg transition-colors text-[18px]"
              >
                ↗
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const stats = [
  {
    n: "05",
    label: "Products shipped",
    body: "Unilinks, Startupack, Classora, Unimate and Norea City — each designed, built and launched end-to-end.",
  },
  {
    n: "12+",
    label: "Portals & modules built",
    body: "Marketing sites, admin dashboards, CRMs, mentor and student portals across the five ventures.",
  },
  {
    n: "08+",
    label: "Technologies in stack",
    body: "Next.js, React, TypeScript, Tailwind, Node, Firebase, Supabase, Framer Motion — one builder, one stack.",
  },
];

function Stats() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Track Record" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              By the numbers<Accent>.</Accent>
            </>
          }
          description="What I've shipped so far — measured, not marketed."
          headingMax="18ch"
        />
      </Reveal>

      <div className="mt-10 md:mt-14 rounded-[24px] border border-border overflow-hidden">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 + i * 0.05}>
              <article className="p-8 md:p-10 h-full flex flex-col">
                <p className="text-[13px] md:text-[14px] font-medium text-muted">
                  {s.label}
                </p>
                <p
                  className="mt-6 text-[80px] md:text-[120px] font-bold leading-[0.9] tracking-[-0.04em]"
                  style={{ color: "var(--accent)" }}
                >
                  {s.n}
                </p>
                <p className="mt-6 text-[14px] md:text-[15px] leading-[1.65] text-muted">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeedHighlight() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="How Fast" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Weeks<Accent>,</Accent> not months.
            </>
          }
          description="Small team, one full-stack builder, no waiting on hand-offs. Ideas ship while momentum is still there."
        />
      </Reveal>

      <div className="mt-10 md:mt-14 grid gap-6 md:gap-6 md:grid-cols-3">
        <Reveal delay={0.05}>
          <article className="h-full rounded-[24px] border border-border bg-fg/[0.02] p-8 md:p-10">
            <p className="text-[13px] md:text-[14px] font-medium text-muted">
              Weeks to launch
            </p>
            <p
              className="mt-4 text-[72px] md:text-[104px] font-bold leading-[0.95] tracking-[-0.04em]"
              style={{ color: "var(--accent)" }}
            >
              4
            </p>
            <p className="mt-4 text-[14px] md:text-[15px] leading-[1.65] text-muted">
              From kickoff to a launched MVP. Right-sized, production-ready, live in front of users.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="h-full rounded-[24px] border border-border bg-fg/[0.02] p-8 md:p-10">
            <p className="text-[13px] md:text-[14px] font-medium text-muted">
              People on the team
            </p>
            <p
              className="mt-4 text-[72px] md:text-[104px] font-bold leading-[0.95] tracking-[-0.04em]"
              style={{ color: "var(--accent)" }}
            >
              1
            </p>
            <p className="mt-4 text-[14px] md:text-[15px] leading-[1.65] text-muted">
              Design, code, strategy and ops in one head. No hand-offs, no telephone game, no dropped context.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <article className="h-full rounded-[24px] border border-border bg-fg/[0.02] p-8 md:p-10">
            <p className="text-[13px] md:text-[14px] font-medium text-muted">
              Live ventures
            </p>
            <p
              className="mt-4 text-[72px] md:text-[104px] font-bold leading-[0.95] tracking-[-0.04em]"
              style={{ color: "var(--accent)" }}
            >
              5
            </p>
            <p className="mt-4 text-[14px] md:text-[15px] leading-[1.65] text-muted">
              End-to-end, in production, in the last three years. Not decks — running products.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

const techStack = [
  {
    label: "Design",
    tools: ["Figma", "Framer", "Rive"],
  },
  {
    label: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    label: "Backend",
    tools: ["Node", "Firebase", "Supabase", "Postgres"],
  },
  {
    label: "AI & Tooling",
    tools: ["Claude", "OpenAI", "Cursor", "Vercel"],
  },
];

function TechStack() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Tech Stack" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Built with the best<Accent>.</Accent>
            </>
          }
          description="The tools I reach for when I want to ship fast without cutting corners."
          headingMax="18ch"
        />
      </Reveal>

      <div className="mt-10 md:mt-14 grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techStack.map((group, i) => (
          <Reveal key={group.label} delay={0.05 + i * 0.05}>
            <article className="h-full rounded-[20px] border border-border bg-fg/[0.02] p-6 md:p-7">
              <p
                className="font-mono text-[11px] md:text-[12px] tracking-[0.22em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {group.label}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {group.tools.map((t) => (
                  <li
                    key={t}
                    className="text-[18px] md:text-[20px] font-semibold tracking-tight text-fg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Product design and engineering for founders and small teams — from a landing page to a full app. If it's a real problem, the scope is honest, and there's actual excitement on both sides, I'm interested.",
  },
  {
    q: "Do you take freelance work while running your own ventures?",
    a: "Yes, selectively. I pick projects that either teach me something new or align with founders I already trust. Only one or two client engagements at a time — never more, so I can go deep.",
  },
  {
    q: "How long does a typical project take?",
    a: "Marketing sites: 1–2 weeks. Full MVPs: 3–6 weeks depending on scope. Before we start I'll always give you a shape-of-project answer — a realistic range, not a vague 'it depends.'",
  },
  {
    q: "Do you work solo or with a team?",
    a: "Solo, by design. Fewer hand-offs, no telephone game, faster iteration, cleaner code. If your project needs more hands, I can bring in trusted collaborators I've shipped with before.",
  },
  {
    q: "Where are you based? Do you travel?",
    a: "Barcelona. I work remote with clients globally and travel for kickoffs when it matters. Async by default, synchronous when the problem benefits from it.",
  },
  {
    q: "How do you price your work?",
    a: "Per-project, not per-hour. That way we're aligned on outcome, not on whether I take a long lunch. Reach out with your scope and I'll come back with a fixed shape — timeline, deliverables, price.",
  },
];

function Faq() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="FAQ" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Common questions<Accent>.</Accent>
            </>
          }
          description="The things people usually ask before we start working together."
          headingMax="18ch"
        />
      </Reveal>

      <div className="mt-14 md:mt-20 max-w-4xl mx-auto border-b border-border">
        {faqs.map((f, i) => (
          <FaqItem key={f.q} q={f.q} a={f.a} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Contact" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Let&apos;s build<br />something<Accent>.</Accent>
            </>
          }
          description="Have an idea, a rough sketch, or a product to launch? I build and consult — helping founders solve real user problems, simply."
          headingMax="14ch"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 md:mt-14 flex justify-center">
          <EmailCopyButton email="keymengkoung8@gmail.com" />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-14 md:mt-20 grid gap-6 md:grid-cols-3 text-center">
          <div>
            <p className="text-[13px] md:text-[14px] font-medium text-muted">
              Location
            </p>
            <p className="mt-2 text-[16px] font-medium text-fg">
              Barcelona, Spain
            </p>
          </div>
          <div>
            <p className="text-[13px] md:text-[14px] font-medium text-muted">
              Availability
            </p>
            <p className="mt-2 text-[16px] font-medium text-fg">
              <span
                aria-hidden
                className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                style={{ background: "var(--accent)" }}
              />
              Open for select projects
            </p>
          </div>
          <div>
            <p className="text-[13px] md:text-[14px] font-medium text-muted">
              Response time
            </p>
            <p className="mt-2 text-[16px] font-medium text-fg">
              Within 24 hours
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

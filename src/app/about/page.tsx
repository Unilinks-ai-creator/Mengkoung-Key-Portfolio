import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import {
  Accent,
  SectionChrome,
  SectionHeader,
} from "@/components/section-chrome";
import { TimelineHorizontal } from "@/components/timeline-horizontal";
import { EmailCopyButton } from "@/components/email-copy-button";
import {
  diamondQuote,
  languages,
  timeline,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Mengkoung Key — from a D-grade high-school student in Cambodia with zero English, to Highest GPA at Harbour.Space Barcelona and founder-engineer of seven ventures.",
};

export default function AboutPage() {
  return (
    <>
      <Opening />
      <WhereItStarted />
      <LostInBangkok />
      <KokoroComeback />
      <DiscoveringLeadership />
      <YougoFailed />
      <UnilinksRightTeam />
      <BarcelonaSecondChance />
      <HighestGPA />
      <Chapters />
      <Mission />
      <HowIThink />
      <Languages />
      <NextChapter />
      <WordsIKeep />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shared prose primitives                                             */
/* ------------------------------------------------------------------ */

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 md:mt-12 max-w-4xl mx-auto space-y-5 md:space-y-6 text-[16.5px] md:text-[18px] leading-[1.65] text-fg/85">
      {children}
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <blockquote
        className="my-10 md:my-12 max-w-4xl mx-auto border-l-2 pl-6 md:pl-8 text-[22px] md:text-[26px] leading-[1.3] tracking-[-0.015em] font-medium text-fg"
        style={{ borderColor: "var(--accent)" }}
      >
        {children}
      </blockquote>
    </Reveal>
  );
}

function KeyMoments({ moments }: { moments: Array<{ label: string; value: string }> }) {
  return (
    <Reveal>
      <div className="mt-12 md:mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
        {moments.map((m) => (
          <div
            key={m.label}
            className="text-center border-t border-border pt-5"
          >
            <p
              className="text-[36px] md:text-[48px] font-bold leading-none tracking-[-0.03em]"
              style={{ color: "var(--accent)" }}
            >
              {m.value}
            </p>
            <p className="mt-3 text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-muted">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Chapters                                                            */
/* ------------------------------------------------------------------ */

function Opening() {
  return (
    <section
      id="about"
      className="container-wide pt-16 md:pt-24 pb-8 md:pb-16 scroll-mt-24"
    >
      <Reveal>
        <SectionChrome label="Ch. 01 — Opening" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              I design, build and ship<Accent>.</Accent>
            </>
          }
          description="This is the long version of my story — the one with the D grade, the three hours lost in Bangkok Airport, the restaurant I didn't know how to cook for, and the Highest GPA I promised myself I'd earn."
          headingMax="none"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 md:mt-20 relative aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-[24px] bg-[#111]">
          <Image
            src="/portrait.jpg"
            alt="Mengkoung Key"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1312px"
            className="object-cover"
            style={{ objectPosition: "70% 42%" }}
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
    </section>
  );
}

function WhereItStarted() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 02 — Where It Started" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              A D grade<Accent>,</Accent> zero English<Accent>.</Accent>
            </>
          }
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            I grew up in{" "}
            <span className="text-fg font-medium">Cambodia</span>. School was
            hard for me. I finished grade 12 with a{" "}
            <span className="text-fg font-medium">D grade</span>. My English
            was zero. I could barely say my own name in English without
            thinking twice about it.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>
            Everyone around me was going to China on scholarships. So I tried
            too. I sent in application after application —{" "}
            <span className="text-fg font-medium">
              more than seven scholarships to China
            </span>
            . Every single one came back as a no. Seven doors, closed quietly,
            one after another, before I even turned nineteen.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p>
            Then one day a senior from my hometown told me he was studying at
            the{" "}
            <span className="text-fg font-medium">
              University of the Thai Chamber of Commerce (UTCC)
            </span>{" "}
            in Bangkok. I didn&apos;t know what UTCC was. I didn&apos;t know
            anything about Bangkok. But I applied — and this time, something
            different happened. I got in. With a{" "}
            <span className="text-fg font-medium">50% scholarship</span>.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p>
            The other 50%? That I had to earn. I would need to work on the
            side, freelance, hustle, do whatever it took, while my family in
            Cambodia helped me cover what was left.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="text-fg font-medium">
            It wasn&apos;t a plan. It was a door opening at the exact moment
            every other door had closed.
          </p>
        </Reveal>
      </Prose>

      <KeyMoments
        moments={[
          { label: "High school result", value: "D" },
          { label: "Scholarships rejected", value: "7+" },
          { label: "UTCC scholarship", value: "50%" },
          { label: "The other half", value: "Hustle" },
        ]}
      />
    </section>
  );
}

function LostInBangkok() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 03 — Lost in Bangkok" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Three hours lost<Accent>.</Accent>
            </>
          }
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            I landed in Bangkok at 18. First time out of Cambodia. First time
            in an airport that big. I spent almost{" "}
            <span className="text-fg font-medium">three hours lost</span>{" "}
            inside and around the airport before I finally found the right
            bus, the right stop, and the right door to my accommodation. That
            was the welcome.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>
            The first year was quiet, in the worst way. I couldn&apos;t speak
            enough English to join the group chats. I couldn&apos;t follow the
            group projects. I would sit in meetings and smile when people
            laughed — because I didn&apos;t know what the joke was. I was in
            the room, but not really in the conversation.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p>
            To cover the other half of the scholarship, I started hustling. I
            bought things in Thailand and brought them back to Cambodia to
            sell. I sold anything I could buy. Phone accessories, clothes,
            whatever friends back home were looking for. My family sent what
            they could. Between the two, I kept the lights on in Bangkok,
            semester after semester.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p>
            There was a bigger dream in there, though. The{" "}
            <span className="text-fg font-medium">
              University of Newcastle, Australia (UON)
            </span>{" "}
            ran a program in Bangkok. If you passed the English requirement,
            you could finish with a real Australian degree from UON. I studied
            for it. I saved for it. I pushed for it. But my{" "}
            <span className="text-fg font-medium">IELTS score</span> never
            reached the number I needed.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p>
            That was the first real breakdown. The Australian degree ended
            quietly, without anyone announcing it. The only option left was to
            finish my bachelor&apos;s at UTCC and keep moving.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-fg font-medium">
            I don&apos;t look back on it badly. UTCC gave me more than a
            degree. But I remember what it felt like to come up short in
            English, after everyone told me English was the thing that would
            save me.
          </p>
        </Reveal>
      </Prose>
    </section>
  );
}

function KokoroComeback() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 04 — Kokoro, The Comeback" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              I didn&apos;t know how to cook<Accent>.</Accent>
            </>
          }
          description="I opened a Japanese restaurant anyway. It was 2020, in the middle of a pandemic."
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            In 2020, right in the middle of the pandemic, I opened{" "}
            <span className="text-fg font-medium">Kokoro Izakaya</span> — a
            Japanese restaurant and bar in Bangkok. I had never run a
            restaurant. I didn&apos;t know how to cook. Half the restaurants
            on the street were closing. It was, by any normal measure, the
            wrong moment.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>
            I was lucky. A{" "}
            <span className="text-fg font-medium">
              professional chef
            </span>{" "}
            agreed to train me. He taught me the menu, the kitchen, how to
            hold a knife without embarrassing myself. We built the business
            from scratch while the city around us shut down.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p>
            Kokoro taught me more than any class. Money management — how a few
            baht decides whether tomorrow happens. Investment thinking — when
            to spend, when to wait, when to walk away. Strategy — how to read
            a market that keeps changing on you. Users — what customers
            actually want versus what they say they want. Feedback — how to
            listen to a complaint without taking it personally, and turn it
            into a better dish next week.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p>
            I learned basics of life, too. How to pay suppliers on time. How
            to keep a small team motivated. How to clean up at 2am and still
            show up at 10am for class. How to lose money on one dish and make
            it back on another.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p>
            We stayed open. We served people. We built something small but
            real, during a time when most people were just trying to survive.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-fg font-medium">
            That was the comeback. Not loud. Not big. But it was the first
            time I thought: maybe I can actually build things.
          </p>
        </Reveal>
      </Prose>
    </section>
  );
}

const leadershipFoundations = [
  {
    title: "Integrity",
    body: "If I say I'll do it, I do it. If I can't, I say so early.",
  },
  {
    title: "Authenticity",
    body: "Honest about where I'm pretending. The pretending costs more than the truth.",
  },
  {
    title: "Being Cause in the Matter",
    body: "I had a hand in every outcome. Not the victim. Not the passenger.",
  },
  {
    title: "Something Bigger Than Myself",
    body: "A cause larger than my own interests — Cambodia, students, the people I build for.",
  },
  {
    title: "Fully Listening",
    body: "Listening without preparing my reply. Making the other person feel heard, not managed.",
  },
];

function DiscoveringLeadership() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 05 — Leading Myself" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Leadership starts with me<Accent>.</Accent>
            </>
          }
          description="Dr. Jakarin's course wasn't about managing other people. It was Harvard Business School's framework for leading yourself first — Erhard and Jensen's ontological model, taught as a daily practice."
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            Around the same time I was running Kokoro, I took a leadership
            course taught by{" "}
            <span className="text-fg font-medium">
              Dr. Jakarin Srimoon
            </span>
            . I signed up expecting the usual — frameworks for managing a
            team, running a meeting, giving good feedback. What I got
            instead was a course on how to lead the one person I had been
            avoiding leading all along:{" "}
            <span className="text-fg font-medium">myself</span>.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>
            The course was built on the{" "}
            <span className="text-fg font-medium">
              Harvard Business School
            </span>{" "}
            model of leadership developed by{" "}
            <span className="text-fg font-medium">
              Werner Erhard, Michael Jensen and colleagues
            </span>
            . Their argument is simple: leadership isn&apos;t a style you
            put on. It&apos;s a way of being, grounded in a few
            non-negotiable foundations. Get the foundations right, and
            leadership becomes a natural expression — not a performance.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p>
            Dr. Jakarin walked me through those foundations one by one,
            then had me practise them until they stopped feeling like
            concepts and started feeling like reflexes.
          </p>
        </Reveal>
      </Prose>

      <div className="mt-10 md:mt-12 max-w-4xl mx-auto">
        <Reveal delay={0.22}>
          <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-6 md:mb-8">
            The foundations I practise daily
          </p>
        </Reveal>

        <ol className="divide-y divide-border border-y border-border">
          {leadershipFoundations.map((f, i) => (
            <Reveal key={f.title} delay={0.26 + i * 0.04} as="li">
              <div className="py-4 md:py-5 grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_14rem_1fr] gap-x-4 md:gap-x-6 items-baseline">
                <span
                  className="text-[12px] md:text-[13px] tabular-nums tracking-[0.14em]"
                  style={{ color: "var(--accent)" }}
                >
                  0{i + 1}
                </span>
                <h3 className="text-[16px] md:text-[17px] font-semibold tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="col-span-2 md:col-span-1 mt-1 md:mt-0 text-[14.5px] md:text-[15px] leading-[1.55] text-muted">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <PullQuote>
        Leadership isn&apos;t a role I put on. It&apos;s a way of standing
        — and when the foundations are in place, it becomes a natural
        expression of who I already am.
      </PullQuote>

      <Prose>
        <Reveal delay={0.5}>
          <p>
            Every comeback I&apos;ve had since that first breakdown traces
            back to one of those foundations. Kokoro survived because I
            chose to be a cause in the matter instead of a victim of the
            pandemic. YOUGO closed cleanly because integrity meant handing
            the money back, not hiding. Unilinks worked because the team I
            picked had the same foundations I did. Barcelona happened
            because I was committed to something bigger than my own
            résumé.
          </p>
        </Reveal>

        <Reveal delay={0.55}>
          <p className="text-fg font-medium">
            Dr. Jakarin didn&apos;t teach me how to lead other people. He
            trained me how to transform — to move past my own limitations,
            see the breakthrough of the hidden power inside me, unlock the
            full potential that was quietly waiting there, let go of the
            past, and build the future I truly want to create for everyone
            around the world.
          </p>
        </Reveal>
      </Prose>
    </section>
  );
}

function YougoFailed() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 06 — Harbour.Space & YOUGO" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              A startup that failed<Accent>.</Accent>
            </>
          }
          description="70% scholarship, ฿100,000 in funding, and the one lesson about teams I couldn't have learned any other way."
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            Harbour.Space University opened a campus in Bangkok and started
            selecting students for their{" "}
            <span className="text-fg font-medium">
              Master&apos;s in Digital Marketing
            </span>
            . I applied. I got in with a{" "}
            <span className="text-fg font-medium">70% scholarship</span>.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>
            It was the first time I saw marketing taught the way engineers
            teach engineering — the data behind it, the systems behind it,
            the real jobs that real marketers do in the real world. I loved
            it. I learned about analytics, about automation, about audiences,
            about the hard numbers under the pretty creative.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p>
            Partway through, I co-founded a startup out of Harbour.Space
            called <span className="text-fg font-medium">YOUGO</span> — a
            study-abroad platform helping students find the right program.
            The business model was close to what{" "}
            <span className="text-fg font-medium">Unilinks</span> is today.
            We won{" "}
            <span className="text-fg font-medium">
              ฿100,000 in investment from Bgrim
            </span>
            , plus continued support from Harbour.Space. On paper, we had
            everything we needed.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p>
            But the team didn&apos;t hold. People lost interest.
            Participation dropped. We were building a product that the team
            itself wasn&apos;t really using or believing in. The business was
            there. The team was not.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p>
            We made the hard call. We shut YOUGO down cleanly — returned the
            money to Bgrim, closed the project with Harbour.Space, and walked
            away without debt and without drama.
          </p>
        </Reveal>
      </Prose>

      <PullQuote>
        A startup isn&apos;t a business problem first — it&apos;s a team
        problem first. Get the team right and the idea finally lives.
      </PullQuote>

      <Prose>
        <Reveal delay={0.34}>
          <p>
            That failure taught me something I couldn&apos;t have learned any
            other way. You can have the right product, the right market, the
            right investor. If the team doesn&apos;t care, nothing moves.
          </p>
        </Reveal>
      </Prose>
    </section>
  );
}

function UnilinksRightTeam() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 07 — Unilinks, The Right Team" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              The right team<Accent>,</Accent> finally<Accent>.</Accent>
            </>
          }
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            After YOUGO closed, I didn&apos;t stop. I joined forces with three
            people who did care about the problem the way I did:{" "}
            <span className="text-fg font-medium">Ngu Wah Aung</span>,{" "}
            <span className="text-fg font-medium">Aung Kaung Pyae</span>, and{" "}
            <span className="text-fg font-medium">Nyi Myat</span>. Together
            we co-founded{" "}
            <span className="text-fg font-medium">Unilinks</span> — the same
            education platform mission YOUGO was going after, but with a team
            that would show up.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>
            I took on <span className="text-fg font-medium">COO</span>. I
            owned business development. I built the operations side of the
            company while my co-founders built the rest. Universities signed
            up. Students signed up. Partnerships signed up.{" "}
            <span className="text-fg font-medium">Unilinks</span> became the
            first real thing I had co-built that wasn&apos;t going to go away.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-fg font-medium">
            The idea was never wrong. The team was. Get the team right, and
            the idea can finally live.
          </p>
        </Reveal>
      </Prose>
    </section>
  );
}

function BarcelonaSecondChance() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 08 — Barcelona, A Second Chance" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              A second chance in Barcelona<Accent>.</Accent>
            </>
          }
          description="Canada said no. Barcelona said yes — a 100% scholarship and a new way of building."
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            I had my next move planned. I was going to apply for a visa to{" "}
            <span className="text-fg font-medium">Canada</span>. I&apos;d
            been accepted. I was preparing to pack.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>The visa came back rejected.</p>
        </Reveal>

        <Reveal delay={0.18}>
          <p>
            I started preparing to apply again — but before I could,{" "}
            <span className="text-fg font-medium">Harbour.Space</span>{" "}
            offered me something I didn&apos;t see coming: a{" "}
            <span className="text-fg font-medium">100% scholarship</span> to
            study{" "}
            <span className="text-fg font-medium">
              Master&apos;s in Product Management
            </span>{" "}
            in Barcelona. A full ride. Two Master&apos;s deep.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p>
            I took it. I moved to{" "}
            <span className="text-fg font-medium">Barcelona</span> in 2025.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <p>
            I kept working with my Unilinks team online. Different time zone,
            same mission. And in Barcelona, I started doubling down on
            something that would change the way I build forever:{" "}
            <span className="text-fg font-medium">AI-native workflow</span>.
            I learned <span className="text-fg font-medium">Claude Code</span>
            . I learned to ship fullstack, mobile, web — alone. By the time
            my first semester ended, I was shipping real products end-to-end
            with a toolkit I didn&apos;t have a year earlier.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p>
            Settling in Barcelona was not easy. I didn&apos;t know anyone.
            The paperwork — the Empadronamiento, the TIE, the appointments,
            the banking — all of it was its own second job. That became{" "}
            <span className="text-fg font-medium">Unimate</span>, a companion
            for international students arriving in Barcelona. Built because I
            needed it. Built because nobody should have to Google their way
            through what I had to Google through.
          </p>
        </Reveal>

        <Reveal delay={0.34}>
          <p>
            <span className="text-fg font-medium">Classora</span> came from
            the same place. Our classes at Harbour.Space were spread across
            five tools. Google Classroom. Slack. Discord. Email. Notion. I was
            tired of chasing assignments across half the internet. So I built
            Classora — so the next cohort wouldn&apos;t have to.
          </p>
        </Reveal>

        <Reveal delay={0.38}>
          <p className="text-fg font-medium">
            The pattern was back. See a problem. Build the thing. Learn from
            it. Build the next one.
          </p>
        </Reveal>
      </Prose>
    </section>
  );
}

function HighestGPA() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 09 — The Highest GPA" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              The promise I made myself<Accent>.</Accent>
            </>
          }
          headingMax="none"
        />
      </Reveal>

      <Prose>
        <Reveal delay={0.1}>
          <p>
            When I started at Harbour.Space Barcelona, I made a quiet promise
            to myself. I wanted to graduate with the{" "}
            <span className="text-fg font-medium">
              Highest GPA in the batch
            </span>
            . Not for a title. For me. Because the D-grade kid in Cambodia
            who got rejected by seven scholarships deserved to see what
            happens when you don&apos;t stop.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p>
            I didn&apos;t tell anyone. I just started showing up differently.
            Every class. Every deadline. Every brief, every project, every
            critique. Every piece of feedback, taken seriously, whether it
            hurt or not.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p>
            I had the privilege of learning from some of the best in the
            field —{" "}
            <span className="text-fg font-medium">Kamran Elahian</span>{" "}
            and{" "}
            <span className="text-fg font-medium">
              Svetlana Velikanova
            </span>
            , the founders of Harbour.Space itself. Alex, who taught like a
            product manager who had shipped at scale. Teachers from{" "}
            <span className="text-fg font-medium">ManyChat</span>. Marketing
            coaches. PR coaches. Growth strategists. Founders who had made
            every mistake I was about to make, and were kind enough to warn
            me first.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p>
            In 2026, I graduated with the{" "}
            <span className="text-fg font-medium">
              Highest GPA in the Batch of 2026
            </span>
            . GPA 3.98 / 4.0. I walked up and got the trophy.
          </p>
        </Reveal>
      </Prose>

      <PullQuote>
        I pick up the trophy, and a thousand names come with it.
      </PullQuote>

      <Prose>
        <Reveal delay={0.3}>
          <p>
            Because the trophy wasn&apos;t really mine. It belonged to the
            professors who pushed me. To my classmates who shared notes when
            I missed a lecture. To my{" "}
            <span className="text-fg font-medium">fiancée</span>, who kept me
            stable when nothing else was. To my{" "}
            <span className="text-fg font-medium">family in Cambodia</span>,
            who believed before anyone else did. To my second family in Spain,
            who made Barcelona a home. To every friend who told me to keep
            going when I was quietly thinking about stopping.
          </p>
        </Reveal>

        <Reveal delay={0.34}>
          <p className="text-fg font-medium">
            Nothing I&apos;ve built, I built alone. The trophy sits on my
            shelf, but it has a lot of names on it.
          </p>
        </Reveal>
      </Prose>

      <KeyMoments
        moments={[
          { label: "Final GPA", value: "3.98" },
          { label: "Harbour.Space", value: "Barcelona" },
          { label: "Batch of", value: "2026" },
          { label: "Rank", value: "#1" },
        ]}
      />
    </section>
  );
}

function Chapters() {
  return (
    <>
      <section className="container-wide pt-16 md:pt-24 pb-6 md:pb-10">
        <Reveal>
          <SectionChrome label="Ch. 10 — The Timeline" />
        </Reveal>

        <Reveal delay={0.05}>
          <SectionHeader
            heading={
              <>
                Nine years<Accent>,</Accent> twelve milestones<Accent>.</Accent>
              </>
            }
            description="Scroll down to walk the journey one milestone at a time — from arriving in Bangkok at 18 to the Highest GPA in Barcelona."
            headingMax="none"
          />
        </Reveal>
      </section>

      <TimelineHorizontal items={timeline} />
    </>
  );
}

function Mission() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 11 — The Mission" />
      </Reveal>

      <Reveal delay={0.05}>
        <blockquote className="mt-14 md:mt-20 max-w-4xl mx-auto text-center text-[20px] sm:text-[24px] md:text-[28px] leading-[1.35] tracking-[-0.01em] font-normal text-fg">
          &ldquo;I&apos;m an AI product builder, carrying one craft wherever a
          hard problem is worth solving — and spending my life closing the
          distance between the problems and the people who can solve them
          <Accent>.</Accent>&rdquo;
        </blockquote>
      </Reveal>
    </section>
  );
}

const principles = [
  {
    title: "Ship over polish.",
    body: "Something live beats something perfect. The feedback loop only starts after it ships — so I ship, then iterate in daylight.",
  },
  {
    title: "Build what you'd use.",
    body: "If I wouldn't open it tomorrow, I shouldn't build it today. The best products are the ones the builder would miss.",
  },
  {
    title: "The team is the product.",
    body: "YOUGO taught me this the hard way. Right market, right funding, wrong team — nothing moves. Get the team right first.",
  },
  {
    title: "AI is a lever, not a replacement.",
    body: "Claude Code compresses the distance from idea to shipped. But the idea, the taste and the judgement still have to be yours.",
  },
];

function HowIThink() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 12 — How I Think" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              How I think<Accent>.</Accent>
            </>
          }
          description="Four principles I've learned the hard way — written down so I can check my own compass when things get noisy, and so you know what you're signing up for."
          headingMax="none"
        />
      </Reveal>

      <div className="mt-10 md:mt-14 grid gap-4 md:gap-5 md:grid-cols-2">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={0.05 + (i % 2) * 0.05}>
            <article className="h-full rounded-[20px] border border-border bg-fg/[0.02] p-6 md:p-8">
              <span
                className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                Principle 0{i + 1}
              </span>
              <h3 className="mt-4 text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.015em] font-semibold">
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] text-muted">
                {p.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WordsIKeep() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-16 md:pb-24">
      <Reveal>
        <SectionChrome label="Ch. 15 — Final Words" />
      </Reveal>

      <Reveal delay={0.05}>
        <div
          data-cursor="light"
          className="mt-10 md:mt-14 relative overflow-hidden rounded-[24px] bg-[#0d0d0d] text-white px-8 md:px-16 py-14 md:py-20"
        >
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
            <p className="text-[13px] md:text-[14px] font-medium text-white/55">
              Words I keep with me
            </p>
            <blockquote className="mt-7 md:mt-9 text-[28px] sm:text-[36px] md:text-[52px] leading-[1.1] tracking-[-0.02em] font-medium max-w-[900px]">
              &ldquo;{diamondQuote.text}&rdquo;
            </blockquote>
            <p className="mt-7 text-[13px] md:text-[14px] text-white/50">
              — {diamondQuote.attribution}
            </p>

            <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p className="text-[14px] md:text-[15px] text-white/60 max-w-[36ch]">
                Want to build something together? Reach me directly.
              </p>
              <EmailCopyButton
                email="keymengkoung8@gmail.com"
                variant="on-dark"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const countriesByRegion = [
  {
    region: "Asia",
    countries: [
      "Cambodia",
      "Thailand",
      "Laos",
      "Vietnam",
      "China",
      "Taiwan",
      "Korea",
      "Singapore",
    ],
  },
  {
    region: "Europe",
    countries: [
      "Spain",
      "France",
      "Germany",
      "Switzerland",
      "Italy",
      "Austria",
      "Andorra",
      "Czech Republic",
    ],
  },
];

function Languages() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-8 md:pb-16">
      <Reveal>
        <SectionChrome label="Ch. 13 — Languages & Travel" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              Five languages<Accent>,</Accent> sixteen countries<Accent>.</Accent>
            </>
          }
          description="I couldn't say my own name in English when I started. Since then I've lived, studied, worked and travelled across sixteen countries — eight in Asia, eight in Europe — with formal exchange programs in Prague (VŠFS), Mannheim (HdWM) and Taipei (Shih Chien). Travel is how I kept learning what no classroom could teach."
          headingMax="none"
        />
      </Reveal>

      <KeyMoments
        moments={[
          { label: "Countries", value: "16" },
          { label: "Exchange programs", value: "3" },
          { label: "Languages", value: "5" },
          { label: "Current base", value: "BCN" },
        ]}
      />

      <div className="mt-14 md:mt-20 max-w-4xl mx-auto space-y-8 md:space-y-10">
        {countriesByRegion.map((group) => (
          <Reveal key={group.region}>
            <div className="grid gap-4 md:gap-8 md:grid-cols-[9rem_1fr] md:items-baseline border-t border-border pt-5 md:pt-6">
              <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted">
                {group.region}
              </p>
              <p className="text-[16px] md:text-[18px] leading-[1.65] text-fg">
                {group.countries.join("  ·  ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 md:mt-20 rounded-[24px] border border-border overflow-hidden">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {languages.map((l, i) => (
            <Reveal key={l.name} delay={0.05 + i * 0.04}>
              <article className="p-6 md:p-8 h-full flex flex-col">
                <p className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted">
                  0{i + 1}
                </p>
                <p className="mt-6 text-[26px] md:text-[32px] font-semibold tracking-[-0.015em]">
                  {l.name}
                </p>
                <p className="mt-2 text-[13px] md:text-[14px] text-muted">
                  {l.level}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


const nextFocuses = [
  {
    tag: "01 · Development",
    title: "Norea City",
    body: "Keep developing and improving Norea City with OCIC × Canadia Bank — new features, deeper polish, more wins for their sales and leasing teams on the 125-hectare Phnom Penh riverside flagship.",
  },
  {
    tag: "02 · Product",
    title: "Classora.co",
    body: "Scaling Classora from Beta to the next cohort — more portals, more students, more teachers. The EdTech platform I built because I lived the problem as a Harbour.Space student.",
  },
  {
    tag: "03 · Training",
    title: "AI Product Builder",
    body: "Going deep on Claude Code, Anthropic APIs, LLM-native UX and AI-first product design — turning months of build time into days, on real projects, not demos.",
  },
  {
    tag: "04 · Legacy",
    title: "Inspire the next generation",
    body: "Help the next generation lead themselves — pairing AI technology with the leadership foundations Dr. Jakarin taught me. The lever is portable. I want to put it in more hands.",
  },
];

function NextChapter() {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-16 md:pb-24">
      <Reveal>
        <SectionChrome label="Ch. 14 — What's Next" />
      </Reveal>

      <Reveal delay={0.05}>
        <SectionHeader
          heading={
            <>
              The next chapter<Accent>.</Accent>
            </>
          }
          description="Four bets I'm making right now — in parallel, with the same AI-native toolkit."
          headingMax="none"
        />
      </Reveal>

      <div className="mt-10 md:mt-14 grid gap-4 md:gap-5 sm:grid-cols-2">
        {nextFocuses.map((f, i) => (
          <Reveal key={f.title} delay={0.1 + (i % 2) * 0.05}>
            <article className="group h-full rounded-[20px] border border-border bg-fg/[0.02] hover:bg-fg/[0.035] transition-colors p-6 md:p-8">
              <span
                className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {f.tag}
              </span>
              <h3 className="mt-4 text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.015em] font-semibold">
                {f.title}
              </h3>
              <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] text-muted">
                {f.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 md:mt-20 max-w-4xl mx-auto space-y-5 md:space-y-6 text-[16.5px] md:text-[18px] leading-[1.65] text-fg/85">
        <Reveal delay={0.25}>
          <p>
            In parallel: scaling{" "}
            <span className="text-fg font-medium">Unilinks 2.0</span> with my
            co-founders — 1,000+ students, 59 university partners, and
            growing. Iterating on{" "}
            <span className="text-fg font-medium">Unimate</span> for the next
            cohort of international students arriving in Barcelona. The
            AI-native workflow is what lets me run all of it without burning
            out.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p>
            Long term: I want to put the lever in more hands. Pair{" "}
            <span className="text-fg font-medium">AI technology</span> with
            the <span className="text-fg font-medium">leadership</span>{" "}
            foundations that got me here, and help the next generation become
            the leader of themselves — wherever they&apos;re from, whatever
            they&apos;re building.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p>
            And I haven&apos;t forgotten where I started. The D grade. The
            zero English. The seven rejected scholarships. The three hours
            lost in Bangkok Airport. The Australian dream that ended quietly.
            That was me. I remember all of it. It&apos;s the reason I
            don&apos;t take any of this for granted — and the reason I keep
            building, keep studying, keep showing up for the next brief.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-fg font-medium">
            If my story speaks to yours — if you&apos;re a founder trying to
            ship faster, a team looking for someone who can own product
            end-to-end, or a student from somewhere nobody expected you to
            come from — let&apos;s talk.
          </p>
        </Reveal>
      </div>

    </section>
  );
}

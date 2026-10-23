import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { WireframeSphere } from "@/components/wireframe-sphere";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mengkoung Key — open to opportunities, collaborations and problems worth solving.",
};

export default function ContactPage() {
  return (
    <section className="container-wide pt-10 md:pt-16 pb-24 md:pb-32">
      <Reveal>
        <p className="text-label text-muted flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          Contact
        </p>
      </Reveal>

      <div className="mt-8 md:mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <Reveal delay={0.05}>
            <h1 className="text-display">
              Let&apos;s work
              <br />
              together.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[520px] text-[17px] md:text-[18px] leading-[1.6] text-muted">
              I&apos;m open to product roles, founder collaborations and
              interesting problems — especially at the intersection of AI,
              education and consumer product. Based in Barcelona, working
              anywhere.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10">
              <ButtonLink href="mailto:mengkoung.key@gmail.com">
                Get in touch <span aria-hidden className="hover-arrow">→</span>
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="relative h-[280px] md:h-[400px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <WireframeSphere
              size={420}
              className="w-[80%] max-w-[420px] text-fg/45"
              strokeOpacity={0.28}
            />
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-28 grid gap-8 md:grid-cols-4 border-t border-border pt-10 md:pt-12">
        <ContactCol label="Email">
          <a
            href="mailto:mengkoung.key@gmail.com"
            className="text-[15px] hover:text-muted transition-colors"
          >
            mengkoung.key@gmail.com
          </a>
        </ContactCol>
        <ContactCol label="Location">
          <span className="text-[15px]">Barcelona, Spain</span>
        </ContactCol>
        <ContactCol label="LinkedIn">
          <a
            href="https://linkedin.com/in/mengkoungkey"
            target="_blank"
            rel="noreferrer"
            className="text-[15px] hover:text-muted transition-colors"
          >
            linkedin.com/in/mengkoungkey
          </a>
        </ContactCol>
        <ContactCol label="Website">
          <a
            href="https://unilinks.co"
            target="_blank"
            rel="noreferrer"
            className="text-[15px] hover:text-muted transition-colors"
          >
            unilinks.co
          </a>
        </ContactCol>
      </div>
    </section>
  );
}

function ContactCol({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-label text-muted">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

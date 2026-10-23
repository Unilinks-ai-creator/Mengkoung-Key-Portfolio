import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 md:mt-40">
      <div className="container-wide pt-12 md:pt-16 pb-8">
        <div className="border-t border-border pt-5 flex items-center justify-between text-[12px] md:text-[13px]">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: "var(--accent)" }}
            />
            <span className="text-fg font-medium tracking-tight">Footer</span>
          </div>
          <span className="text-muted font-mono tabular-nums hidden sm:inline">
            (MK — 11)
          </span>
          <span className="text-muted font-mono tabular-nums">©2026</span>
        </div>
      </div>

      <div className="container-wide pb-12 md:pb-16">
        <div className="grid gap-12 md:gap-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em]">
              Mengkoung Key<span style={{ color: "var(--accent)" }}>®</span>
            </p>
            <p className="mt-3 text-[14px] md:text-[15px] text-muted max-w-[36ch]">
              Product Builder · Entrepreneur · Marketing. Building products where
              design, code and human behavior meet.
            </p>
            <p className="mt-8 flex items-center gap-2 text-[13px] text-muted">
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              Built in Barcelona with too many ideas.
            </p>
          </div>

          <FooterCol title="Sitemap">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/work">Work & Projects</FooterLink>
            <FooterLink href="/skills">Skills</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Elsewhere">
            <FooterLink href="https://linkedin.com/in/mengkoungkey" external>
              LinkedIn
            </FooterLink>
            <FooterLink href="https://github.com/mengkoungkey" external>
              GitHub
            </FooterLink>
            <FooterLink href="mailto:mengkoung.key@gmail.com" external>
              Email
            </FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink href="mailto:mengkoung.key@gmail.com" external>
              mengkoung.key@gmail.com
            </FooterLink>
            <p className="text-[14px] text-muted">Barcelona, Spain</p>
            <p className="text-[14px] text-muted">
              <span
                aria-hidden
                className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                style={{ background: "var(--accent)" }}
              />
              Available for select projects
            </p>
          </FooterCol>
        </div>

        <div className="mt-12 md:mt-16 border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] md:text-[13px] text-muted">
          <span>© {new Date().getFullYear()} Mengkoung Key. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Made with Next.js & Tailwind</span>
            <a
              href="#top"
              className="text-fg hover:text-muted transition-colors underline underline-offset-4 decoration-border hover:decoration-fg"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-muted mb-5">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls = "text-[14px] md:text-[15px] text-fg hover:text-muted transition-colors duration-300";
  if (external) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

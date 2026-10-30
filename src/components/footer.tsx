import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";

export function Footer() {
  return (
    <footer className="mt-24 md:mt-40">
      <div className="container-wide pt-12 md:pt-16 pb-12 md:pb-16 border-t border-border">
        <div className="grid gap-12 md:gap-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em]">
              Mengkoung Key<span style={{ color: "var(--accent)" }}>®</span>
            </p>
            <p className="mt-3 text-[14px] md:text-[15px] text-muted max-w-[36ch]">
              Product Builder · Entrepreneur · Marketing. Building products where
              design, code and human behavior meet.
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
            <FooterLink href="mailto:keymengkoung8@gmail.com" external>
              Email
            </FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink href="mailto:keymengkoung8@gmail.com" external>
              keymengkoung8@gmail.com
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
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[13px] md:text-[14px] font-medium text-muted mb-5">
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

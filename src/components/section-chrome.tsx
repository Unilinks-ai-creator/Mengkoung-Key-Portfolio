import Link from "next/link";

export function SectionChrome({ label }: { label: string }) {
  return (
    <div className="border-t border-border pt-5 flex items-center justify-between text-[12px] md:text-[13px]">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="inline-block w-2.5 h-2.5 rounded-sm"
          style={{ background: "var(--accent)" }}
        />
        <span className="text-fg font-medium tracking-tight">{label}</span>
      </div>
      <span className="text-muted font-mono tabular-nums">©2026</span>
    </div>
  );
}

export function SectionHeader({
  heading,
  description,
  cta,
  headingMax = "16ch",
}: {
  heading: React.ReactNode;
  description?: string;
  cta?: { label: string; href: string; external?: boolean };
  headingMax?: string;
}) {
  return (
    <div className="mt-10 md:mt-14 flex flex-col items-center text-center">
      <h2
        className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-bold leading-[0.98] tracking-[-0.035em]"
        style={{ maxWidth: headingMax }}
      >
        {heading}
      </h2>

      {description && (
        <p className="mt-4 md:mt-5 max-w-[62ch] text-muted text-[16px] md:text-[18px] leading-[1.55]">
          {description}
        </p>
      )}

      {cta && <CtaButton {...cta} className="mt-5 md:mt-6" />}
    </div>
  );
}

export function CtaButton({
  label,
  href,
  external,
  className = "",
}: {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span
        aria-hidden
        className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-bg text-[16px] transition-transform duration-300 group-hover:translate-x-0.5"
        style={{ background: "var(--accent)" }}
      >
        →
      </span>
      <span className="relative z-10 text-[15px] md:text-[16px] font-medium text-fg group-hover:text-bg transition-colors duration-300">
        {label}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ background: "var(--accent)" }}
      />
    </>
  );
  const cls = `group relative inline-flex items-center gap-3 rounded-full border border-border bg-bg pl-1.5 pr-5 py-1.5 overflow-hidden transition-colors duration-300 hover:border-transparent ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "var(--accent)" }}>{children}</span>;
}

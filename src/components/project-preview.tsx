import { WireframeSphere } from "./wireframe-sphere";

type Props = {
  variant: "desktop" | "mobile";
  title: string;
  className?: string;
};

/**
 * Placeholder product visual — dark surface with abstract product-like shapes.
 * Swap for real screenshots once available.
 */
export function ProjectPreview({ variant, title, className = "" }: Props) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-[16px] bg-[#0f0f0f] text-white ${className}`}
    >
      <div className="absolute inset-0 opacity-30">
        <WireframeSphere size={500} className="w-full h-full text-white/40" strokeOpacity={0.4} />
      </div>

      {isMobile ? (
        <div className="relative h-full flex items-center justify-center gap-3 md:gap-4 p-4 md:p-8">
          <Phone dim />
          <Phone />
          <Phone dim />
        </div>
      ) : (
        <div className="relative h-full flex items-center justify-center p-4 md:p-6">
          <Browser title={title} />
        </div>
      )}
    </div>
  );
}

function Browser({ title }: { title: string }) {
  return (
    <div className="w-full max-w-[520px] aspect-[16/10] rounded-[10px] bg-[#161616] border border-white/10 overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-3 text-[10px] uppercase tracking-widest text-white/40">
          {title}
        </span>
      </div>
      <div className="flex h-[calc(100%-28px)]">
        <div className="w-[22%] border-r border-white/5 p-3 flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-2 rounded bg-white/10"
              style={{ width: `${60 + ((i * 7) % 40)}%` }}
            />
          ))}
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div className="h-3 w-1/3 rounded bg-white/20" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-md bg-white/[0.06] border border-white/5"
              />
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            <div className="h-2 w-16 rounded bg-white/15" />
            <div className="h-2 w-24 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ dim = false }: { dim?: boolean }) {
  return (
    <div
      className={`relative rounded-[26px] border border-white/10 bg-[#141414] overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] ${
        dim ? "opacity-40 scale-[0.92]" : ""
      }`}
      style={{ width: 110, height: 220 }}
    >
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black" />
      <div className="pt-6 p-3 flex flex-col gap-2">
        <div className="h-2 w-2/3 rounded bg-white/25" />
        <div className="h-2 w-1/2 rounded bg-white/15" />
        <div className="mt-2 rounded-lg bg-white/[0.06] border border-white/5 h-14" />
        <div className="rounded-lg bg-white/[0.06] border border-white/5 h-14" />
        <div className="flex gap-1.5 mt-1">
          <div className="h-1.5 flex-1 rounded bg-white/15" />
          <div className="h-1.5 flex-1 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

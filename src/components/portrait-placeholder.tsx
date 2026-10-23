export function PortraitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-[16px] bg-[#1a1a1a] ${className}`}
      aria-label="Portrait placeholder — swap for real monochrome portrait"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.12), rgba(0,0,0,0.4) 60%, #0a0a0a 90%)",
        }}
      />
      <svg
        viewBox="0 0 200 240"
        className="absolute inset-0 w-full h-full opacity-90"
        aria-hidden
      >
        <defs>
          <linearGradient id="head" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2a2a" />
            <stop offset="1" stopColor="#0e0e0e" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="95" rx="42" ry="52" fill="url(#head)" />
        <path
          d="M32 240 C 32 175, 168 175, 168 240 Z"
          fill="url(#head)"
        />
      </svg>

      <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6">
        <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[12px] text-white/90">
          <span aria-hidden>📍</span>
          Based in Barcelona, Spain
        </div>
      </div>
    </div>
  );
}

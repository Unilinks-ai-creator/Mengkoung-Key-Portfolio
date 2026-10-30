"use client";

export function BackToTop() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });

    // Clean the #top hash from the URL without triggering another jump
    if (window.history?.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <a
      href="#top"
      onClick={handleClick}
      className="group inline-flex items-center gap-1.5 text-fg hover:text-muted transition-colors underline underline-offset-4 decoration-border hover:decoration-fg"
    >
      <span>Back to top</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </a>
  );
}

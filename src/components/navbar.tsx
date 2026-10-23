"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHidden(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-4 md:pt-6 pb-2 md:pb-3 bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-12 md:h-14">
        <Link
          href="/"
          aria-label="Mengkoung Key — home"
          className="group inline-flex items-center gap-2.5 md:gap-3 text-[19px] md:text-[22px] font-semibold tracking-tight text-fg hover:opacity-70 transition-opacity duration-300"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mk-logo.png"
            alt=""
            className="h-9 w-9 md:h-10 md:w-10 rounded-full object-contain"
          />
          <span>Mengkoung Key</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-10 lg:gap-14"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="text"
                className={`nav-link text-[14px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  active ? "text-fg is-active" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-fg"
        >
          <span aria-hidden className="text-[15px] leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-bg">
          <nav
            className="container-wide py-6 flex flex-col gap-4"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[16px] uppercase tracking-[0.14em] text-fg py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

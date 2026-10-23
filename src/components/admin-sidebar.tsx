"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true },
  { href: "/admin/projects", label: "Projects", icon: ProjectsIcon },
  { href: "/admin/about", label: "About", icon: UserIcon },
  { href: "/admin/contact", label: "Contact", icon: MailIcon },
  { href: "/admin/upload", label: "Assets", icon: ImageIcon },
];

export function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname() ?? "";

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="w-64 shrink-0 bg-fg text-bg flex flex-col min-h-screen">
      <div className="px-6 pt-8 pb-6">
        <Link href="/admin" className="inline-flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-fg font-semibold text-[14px]">
            M
          </span>
          <span className="font-semibold text-[15px] tracking-tight">
            Portfolio
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors " +
                    (active
                      ? "bg-bg/10 text-bg"
                      : "text-bg/60 hover:text-bg hover:bg-bg/[0.06]")
                  }
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-6 border-t border-bg/10 flex flex-col gap-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-bg/60 hover:text-bg hover:bg-bg/[0.06] transition-colors"
          >
            <ExternalIcon className="h-[18px] w-[18px]" />
            <span>Live site</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-bg/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-9 w-9 rounded-full bg-bg/10 flex items-center justify-center text-[13px] font-semibold text-bg shrink-0">
            {user.email?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-bg truncate">Admin</p>
            <p className="text-[11px] text-bg/50 truncate">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={() => signOut(auth)}
            title="Sign out"
            className="shrink-0 h-8 w-8 rounded-lg text-bg/50 hover:text-bg hover:bg-bg/[0.06] transition-colors inline-flex items-center justify-center"
          >
            <LogoutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function DashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}
function ProjectsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m3 17 5-5 6 6 3-3 4 4" />
    </svg>
  );
}
function ExternalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5" />
    </svg>
  );
}
function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M10 17 5 12l5-5" />
      <path d="M5 12h11" />
    </svg>
  );
}

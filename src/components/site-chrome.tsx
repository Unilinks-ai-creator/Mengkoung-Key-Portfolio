"use client";

import { usePathname } from "next/navigation";
import { Splash } from "./splash";
import { Cursor } from "./cursor";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Splash />
      <Cursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

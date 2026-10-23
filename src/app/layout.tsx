import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/site-chrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mengkoungkey.com"),
  title: {
    default: "Mengkoung Key — Product Builder & Entrepreneur",
    template: "%s — Mengkoung Key",
  },
  description:
    "Mengkoung Key is a Product Builder, Entrepreneur and Product Manager based in Barcelona, building products across education, technology and digital experiences.",
  openGraph: {
    title: "Mengkoung Key — Product Builder & Entrepreneur",
    description:
      "Entrepreneur, Product Manager & builder based in Barcelona. Currently building digital solutions in education and beyond.",
    url: "https://mengkoungkey.com",
    siteName: "Mengkoung Key",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mengkoung Key — Product Builder & Entrepreneur",
    description:
      "Entrepreneur, Product Manager & builder based in Barcelona.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body
        id="top"
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-bg text-fg antialiased"
      >
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}

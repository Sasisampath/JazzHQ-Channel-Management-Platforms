import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_SITE_ICON, NOINDEX_ROBOTS, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = localFont({ src: "./fonts/inter.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "JazzHQ",
  icons: { icon: DEFAULT_SITE_ICON },
  robots: NOINDEX_ROBOTS,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={inter.variable}><body>{children}</body></html>;
}

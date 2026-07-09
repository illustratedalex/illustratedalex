import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://illustratedalex.com"),
  title: {
    default: "Illustrated Alex — Tattoo & Piercing",
    template: "%s | Illustrated Alex",
  },
  description:
    "Custom tattoos, professional body piercing, and nearly four decades of experience. Private studio in Claremont, NH.",
  openGraph: {
    title: "Illustrated Alex — Tattoo & Piercing",
    description:
      "Custom tattoos, professional body piercing, and nearly four decades of experience. Private studio in Claremont, NH.",
    url: "https://illustratedalex.com",
    siteName: "Illustrated Alex",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full bg-[#0e0c0a] text-[#ede0cc] antialiased">
        <div className="flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

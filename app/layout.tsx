import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GA_MEASUREMENT_ID } from "@/data/site-content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a0a] text-[#f0dfbf] antialiased">
        <div className="flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}

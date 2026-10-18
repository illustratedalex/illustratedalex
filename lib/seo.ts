import type { Metadata } from "next";
import { businessFullName, STUDIO_PHONE } from "@/data/site-content";

export const SITE_URL = "https://www.illustratedalex.com";

export function createPageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: businessFullName,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

// Only published studio facts; omit unverified hours, prices, ratings and coordinates.
export const studioJsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "@id": `${SITE_URL}/#studio`,
  name: businessFullName,
  url: `${SITE_URL}/`,
  telephone: STUDIO_PHONE,
  image: `${SITE_URL}/images/studio/new-studio-exterior.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 Opera House Square",
    addressLocality: "Claremont",
    addressRegion: "NH",
    postalCode: "03743",
    addressCountry: "US",
  },
};

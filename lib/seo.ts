import type { Metadata } from "next";
import { REVIEWS_SOURCE_URL } from "../data/reviews.ts";
import {
  businessFullName,
  instagramProfiles,
  madFlasherStudioUrl,
  STUDIO_PHONE,
  studioGeo,
  studioHours,
} from "../data/site-content.ts";

export const SITE_URL = "https://www.illustratedalex.com";

export const defaultShareImage = {
  url: "/images/studio/new-studio-exterior.jpg",
  width: 2000,
  height: 1500,
  alt: "Exterior of Illustrated Alex studio at 18 Opera House Square",
};

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
      images: [defaultShareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultShareImage.url],
    },
  };
}

const serviceAreas = [
  { name: "Claremont", state: "New Hampshire" },
  { name: "Newport", state: "New Hampshire" },
  { name: "Lebanon", state: "New Hampshire" },
  { name: "Springfield", state: "Vermont" },
  { name: "Bellows Falls", state: "Vermont" },
];

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
  geo: {
    "@type": "GeoCoordinates",
    latitude: studioGeo.latitude,
    longitude: studioGeo.longitude,
  },
  openingHoursSpecification: studioHours.map((row) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...row.days],
    opens: row.opens,
    closes: row.closes,
  })),
  areaServed: serviceAreas.map((area) => ({
    "@type": "City",
    name: area.name,
    containedInPlace: { "@type": "State", name: area.state },
  })),
  sameAs: [...instagramProfiles.map((profile) => profile.href), madFlasherStudioUrl, REVIEWS_SOURCE_URL],
};

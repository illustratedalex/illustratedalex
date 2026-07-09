import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { bookingUrl, services } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom tattooing, body piercing, cover-ups, sleeves, and traveling guest artist availability at Illustrated Alex.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="What we do"
        description="Every service is personal. No templates, no rush, no compromise on quality."
      />

      <div className="space-y-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>

      <div className="border border-[#ddd4c4] bg-[#ece5d8] p-6">
        <p className="text-base font-medium text-[#1a1511]">
          Questions about a specific service?
        </p>
        <p className="mt-2 text-sm text-[#5c5047]">
          Every project is different. Appointments are recommended, and walk-ins may be available depending on timing.
          Text first so you can avoid waiting or arriving during a large tattoo session.
        </p>
        <Link
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded-sm bg-[#1a1511] px-5 py-2.5 text-sm font-semibold text-[#f3ede3] transition hover:bg-[#2e261e]"
        >
          Book a Consultation
        </Link>
      </div>
    </div>
  );
}

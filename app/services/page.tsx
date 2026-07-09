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

      <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-6">
        <p className="text-base font-medium text-stone-200">
          Questions about a specific service?
        </p>
        <p className="mt-2 text-sm text-stone-500">
          Every project is different. Reach out to discuss what you have in
          mind before booking.
        </p>
        <Link
          href={bookingUrl}
          className="mt-4 inline-flex items-center rounded bg-stone-100 px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
        >
          Book a Consultation
        </Link>
      </div>
    </div>
  );
}

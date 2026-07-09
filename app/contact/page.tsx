import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { instagramHandles, studioAddress } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation for tattooing, piercing, or guest artist sessions with Illustrated Alex in Claremont, NH.",
};

export default function ContactPage() {
  return (
    <div
      id="book"
      className="mx-auto w-full max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Book a Consultation"
        description="Send your concept, placement ideas, and preferred timing. You'll hear back with next steps and booking details."
      />

      <ContactForm />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            Studio Location
          </p>
          <p className="text-sm text-stone-300">{studioAddress}</p>
          <p className="text-xs text-stone-600">
            Private studio — by appointment only
          </p>
        </div>

        <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            Instagram
          </p>
          <div className="flex flex-wrap gap-2">
            {instagramHandles.map((handle) => (
              <Link
                key={handle}
                href={`https://instagram.com/${handle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
              >
                {handle}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

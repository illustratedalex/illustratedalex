import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { instagramHandles, studioAddress } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a tattoo or piercing consultation with Illustrated Alex at 30 Opera House Square, Claremont, NH. Appointments are recommended, and walk-ins may be available depending on schedule.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div id="book" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Contact</p>
          <h1 className="font-display text-4xl font-semibold text-[#f0dfbf] sm:text-6xl">Book a Consultation</h1>
          <p className="max-w-3xl text-base leading-7 text-[#dbc8a7] sm:text-lg sm:leading-8">
            Send your concept, placement ideas, and preferred timing. You&rsquo;ll hear back with next steps.
          </p>
        </div>

        <div className="rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="mt-8 grid gap-8 rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] p-6 sm:grid-cols-2 sm:p-8">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">Studio</p>
            <p className="text-sm text-[#f0dfbf]">{studioAddress}</p>
            <p className="text-xs text-[#dbc8a7]">
              Appointments are recommended. Walk-ins may be available when the schedule allows, but texting first is the
              best way to check availability before stopping in.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">Instagram</p>
            <div className="flex flex-wrap gap-3">
              {instagramHandles.map((handle) => (
                <Link
                  key={handle}
                  href={`https://instagram.com/${handle.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-sm text-[#dbc8a7] underline underline-offset-4 hover:text-[#f0dfbf]"
                >
                  {handle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

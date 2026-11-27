import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { StudioHours } from "@/components/studio-hours";
import { bookingUrl, serviceAreaSentence, studioAddress } from "@/data/site-content";

export const metadata = createPageMetadata(
  "/tattoos",
  "Tattoo Shop in Claremont, NH | Illustrated Alex",
  "Custom tattoo shop at 18 Opera House Square in Claremont, NH. Fine line, black and gray, cover-ups, and large-scale pieces. Text Illustrated Alex before you book.",
);

const tattooNotes = [
  {
    heading: "Custom work",
    body: "Custom tattoo work built around placement, style, and long-term wear. Fine line, black and gray, cover-ups, custom concepts, and large-scale pieces. Every project is personal — no templates, and the plan is not rushed.",
  },
  {
    heading: "Since 1986",
    body: "Alex has been tattooing since 1986, including 18 years owning Mountainside Tattoo in Bellows Falls, Vermont, before opening this studio at 18 Opera House Square in Claremont.",
  },
  {
    heading: "One-on-one",
    guideHref: "https://needlebooking.com/guides/tattoo-walk-in-or-appointment",
    body: "Appointments at the Claremont studio are one-on-one. Walk-ins may be available when the schedule allows. Text a reference first — the image, approximate size, body placement, and whether it is new work or a cover-up — and Alex will say how much time to book.",
  },
  {
    heading: "After the session",
    body: "When it fits the tattoo, Illustrated Alex uses a Tegaderm-style transparent film dressing for the early days of healing. The written steps are on the aftercare page, and the instructions from the appointment come first.",
  },
];

export default function TattoosPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Tattoos</p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Tattoo Shop in Claremont, NH</h1>
          <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
            Custom tattoos at {studioAddress}. {serviceAreaSentence}
          </p>
        </div>

        <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <div className="space-y-8">
            {tattooNotes.map((item) => (
              <div key={item.heading} className="border-b border-[#7d5b2e]/30 pb-6 last:border-0">
                <h2 className="font-display text-2xl font-semibold text-[#f0dfbf]">{item.heading}</h2>
                <p className="mt-3 text-base leading-7 text-[#dbc8a7]">{item.body}</p>
                {item.guideHref && (
                  <p className="mt-3 text-base leading-7 text-[#dbc8a7]">
                    Still deciding whether to walk in or book ahead? Read the{" "}
                    <a href={item.guideHref} className="text-[#e1c18c] underline underline-offset-4">
                      NeedleBooking walk-in tattoo and appointment guide
                    </a>
                    {" "}for what to ask before you go.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <StudioHours />
          <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">Studio</h2>
            <p className="mt-4 text-base leading-7 text-[#f0dfbf]">
              18 Opera House Square
              <br />
              Claremont, NH 03743
            </p>
            <p className="mt-4 text-sm leading-7 text-[#dbc8a7]">
              Guest artist dates in Enfield, CT and Redondo Beach, CA are posted on the travel page. The Bellows Falls
              chapter is on the Mountainside page.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/travel" className="text-sm text-[#e1c18c] underline underline-offset-4">
                Travel and guest spots
              </Link>
              <Link href="/mountainside" className="text-sm text-[#e1c18c] underline underline-offset-4">
                Mountainside Tattoo
              </Link>
            </div>
          </section>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Ready to plan a tattoo?</h2>
          <p className="mt-3 mb-6 text-sm leading-7 text-[#dbc8a7]">
            Look through the portfolio, then text the studio with your reference. Booking is online once you know how
            much time the piece needs.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-8 py-3 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
            >
              BOOK A TATTOO
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-[#bc8f4d] bg-transparent px-8 py-3 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
            >
              VIEW THE PORTFOLIO
            </Link>
            <Link
              href="/aftercare"
              className="rounded-full border border-[#bc8f4d] bg-transparent px-8 py-3 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
            >
              TATTOO AFTERCARE
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, STUDIO_PHONE, TEXT_STUDIO_URL } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a tattoo or piercing consultation with Illustrated Alex at 30 Opera House Square, Claremont, NH. Appointments are recommended, and walk-ins may be available depending on schedule.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div id="book" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Contact</p>
          <h1 className="font-display text-4xl font-semibold text-[#f0dfbf] sm:text-6xl">Contact the Studio</h1>
          <p className="max-w-3xl text-base leading-7 text-[#dbc8a7] sm:text-lg sm:leading-8">
            Text first for tattoo references, piercing questions, and booking guidance.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">Shop Cell</p>
              <p className="mt-2 font-display text-3xl font-semibold text-[#f0dfbf] sm:text-4xl">(603) 843-7005</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#dbc8a7]">
                If you have a tattoo reference image, text it to me first. I&rsquo;ll let you know how much time to
                book online through Square.
              </p>
            </section>

            <section className="space-y-4">
              {[
                {
                  number: "1",
                  title: "FOR TATTOO IDEAS",
                  body: "Text the image, approximate size, body placement, and whether it is new work or a cover-up.",
                },
                {
                  number: "2",
                  title: "FOR PIERCING QUESTIONS",
                  body: "Text your question, jewelry issue, or healing concern. Photos help when appropriate.",
                },
                {
                  number: "3",
                  title: "FOR BOOKING HELP",
                  body: "If you are unsure which Square service to choose, text first and I’ll point you in the right direction.",
                },
              ].map((item) => (
                <article key={item.number} className="rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bc8f4d]/70 text-xs font-semibold text-[#e7c98a]">
                      {item.number}
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#be9a62]">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#dbc8a7]">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={TEXT_STUDIO_URL}
                className="min-h-11 rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
              >
                TEXT NOW
              </Link>
              <Link
                href={`tel:${STUDIO_PHONE}`}
                className="min-h-11 rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
              >
                CALL THE STUDIO
              </Link>
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
              >
                BOOK ONLINE
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#7d5b2e]/40 bg-[#0f0f0f]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="relative h-[360px] sm:h-[460px] lg:h-full lg:min-h-[690px]">
              <Image
                src="/images/studio/studio-front.jpg"
                alt="Illustrated Alex studio storefront in Claremont"
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <Link
        href={TEXT_STUDIO_URL}
        className="fixed right-3 bottom-3 z-40 min-h-11 rounded-full border border-[#bc8f4d] bg-[#17120d]/92 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] text-[#f2dfbf] shadow-lg backdrop-blur sm:right-4 sm:bottom-4"
      >
        💬 TEXT THE STUDIO
      </Link>
    </div>
  );
}

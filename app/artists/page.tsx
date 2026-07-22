import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutBio, BOOKING_URL } from "@/data/site-content";

export const metadata: Metadata = {
  title: {
    absolute: "Artists | Illustrated Alex Tattoo & Piercing",
  },
  description:
    "Meet Alex Lawrence and apprentice piercer Chi Gonzalez at Illustrated Alex Tattoo & Piercing in Claremont, New Hampshire.",
};

export default function ArtistsPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <section className="mb-10 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">
            Illustrated Alex Tattoo &amp; Piercing
          </p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Meet the Artists</h1>
          <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
            Tattooing and professional body piercing in a clean, welcoming studio in downtown Claremont, New
            Hampshire.
          </p>
        </section>

        <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#be9a62]">Owner &amp; Lead Artist</p>
              <h2 className="font-display text-4xl font-semibold text-[#f0dfbf] sm:text-5xl">Alex Lawrence</h2>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d8c5a3]">
                Owner · Tattoo Artist · Professional Piercer
              </p>
              {aboutBio.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[#dbc8a7]">
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/portfolio"
                  className="rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
                >
                  View Alex&apos;s Work
                </Link>
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
                >
                  Book with Alex
                </Link>
              </div>
            </div>

            <div className="relative h-[300px] overflow-hidden rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] sm:h-[340px] lg:h-[390px]">
              <Image
                src="/images/studio/alex-tattooing.jpg"
                alt="Alex tattooing in the studio"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative h-[300px] overflow-hidden rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] sm:h-[340px] lg:h-[390px]">
              <Image
                src="/images/studio/chi-gonzalez.jpg"
                alt="Chi Gonzalez performing a piercing at Illustrated Alex Tattoo & Piercing"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#be9a62]">Apprentice Piercer</p>
              <h2 className="font-display text-4xl font-semibold text-[#f0dfbf] sm:text-5xl">Chi Gonzalez</h2>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d8c5a3]">Apprentice Piercer</p>
              <p className="text-base leading-8 text-[#dbc8a7]">
                Chi Gonzalez is an apprentice piercer at Illustrated Alex Tattoo &amp; Piercing, training under the
                guidance of Alex Lawrence.
              </p>
              <p className="text-base leading-8 text-[#dbc8a7]">
                Chi comes to the studio with previous body-piercing experience and a genuine interest in helping
                clients feel comfortable, informed and confident throughout their appointment. Their apprenticeship is
                focused on strengthening technique, placement, sterile procedure, jewelry knowledge and thorough
                aftercare education.
              </p>
              <p className="text-base leading-8 text-[#dbc8a7]">
                Whether someone is receiving their first piercing or adding something new, Chi strives to create a
                welcoming and positive experience. Piercing services are performed as part of a supervised
                apprenticeship, and available services may vary as training progresses.
              </p>
              <p className="text-base leading-8 text-[#dbc8a7]">
                Appointments with Chi are booked through the Illustrated Alex Square booking system.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
                >
                  Book with Chi
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

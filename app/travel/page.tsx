import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { TEXT_STUDIO_URL } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Travel & Guest Artist",
  description:
    "Guest artist appearances, studio visits, event bookings, and travel dates for tattoo clients outside Claremont, New Hampshire.",
};

const guestStudios = [
  {
    name: "Sacred Body Tattoo Gallery",
    location: "Enfield, Connecticut",
    address: "27 North Main St, Enfield, CT 06082",
    background:
      "Sacred Body Tattoo Gallery has been part of the Connecticut tattoo community for decades. Founded in 1992 by Mickey Scalzo, the studio has operated in Enfield since 2005 and is known for a respectful, self-expression-focused atmosphere that blends old-school tattoo values with modern equipment and strong safety standards.",
    guestCopy:
      "Alex appears at Sacred Body Tattoo Gallery by request for guest artist dates. Text ahead to ask about upcoming availability and scheduling.",
    logoPath: "/images/travel/sacred-body-logo.png",
    fallbackLabel: "Sacred Body Tattoo Gallery",
  },
  {
    name: "Pacific Sangha Tattoo",
    location: "Redondo Beach, California",
    address: "2505 Artesia Blvd, Redondo Beach, CA 90278",
    background:
      "Pacific Sangha Tattoo is a Redondo Beach tattoo and piercing studio. Public profiles list tattooing and piercing services, Redondo Beach contact information, and walk-in availability. For Alex’s guest dates, travel appointments should still be planned ahead.",
    guestCopy:
      "Alex appears at Pacific Sangha Tattoo by request for planned guest spots. Travel dates require advance coordination, design planning, and deposit details.",
    logoPath: "/images/travel/pacific-sangha-logo.png",
    fallbackLabel: "Pacific Sangha Tattoo",
  },
];

const bookingTypes = [
  "Guest Artist Spot",
  "Studio Takeover / Day Booking",
  "Event or Convention Work",
  "Private Appointment Travel",
  "Extended Week or Month Booking",
];

const contactChecklist = [
  "Your location",
  "Tattoo idea",
  "Approximate size and placement",
  "Reference images",
  "Preferred dates",
  "Whether you are a client, studio, or event organizer",
];

function hasPublicAsset(src: string) {
  const normalized = src.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", normalized));
}

const ambulanceImagePath = "/images/studio/ambulance.jpg";

export default function TravelPage() {
  const hasAmbulanceImage = hasPublicAsset(ambulanceImagePath);

  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <section className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Travel</p>
            <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Travel &amp; Guest Spots</h1>
            <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
              Guest artist appearances, studio visits, event bookings, and travel dates for tattoo clients outside
              Claremont, New Hampshire.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
              >
                REQUEST A GUEST SPOT
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
              >
                ASK ABOUT TRAVEL DATES
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="relative h-[300px] overflow-hidden rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] sm:h-[330px]">
              <Image
                src="/images/studio/alex-tattooing.jpg"
                alt="Alex tattooing during a session"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Travel Bookings</h2>
          <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
            Alex is based at Illustrated Alex Tattoo &amp; Piercing in Claremont, NH, but guest artist dates and travel
            bookings may be available for studios, events, private day bookings, week bookings, month bookings, or
            longer arrangements.
          </p>
          <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
            Appointments and travel dates should be discussed in advance so scheduling, location, design work, and
            deposit details can be planned properly.
          </p>
          <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
            Known travel and guest locations include Enfield, Connecticut and Redondo Beach, California, with other
            locations available by request when scheduling allows.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Travel Locations</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                name: "Claremont, New Hampshire",
                body: "Home studio:\n30 Opera House Square\nClaremont, NH",
              },
              {
                name: "Enfield, Connecticut",
                body: "Guest artist availability by request.\nText ahead to ask about upcoming dates.",
              },
              {
                name: "Redondo Beach, California",
                body: "Guest spot availability by request.\nTravel dates require advance planning.",
              },
            ].map((loc) => (
              <article key={loc.name} className="rounded-lg border border-[#7d5b2e]/35 bg-[#141414] p-4">
                <h3 className="font-display text-xl font-semibold text-[#f0dfbf]">{loc.name}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#dbc8a7]">{loc.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Guest Studios</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {guestStudios.map((studio) => {
              const hasLogo = hasPublicAsset(studio.logoPath);
              return (
                <article key={studio.name} className="rounded-xl border border-[#7d5b2e]/35 bg-[#141414] p-5">
                  <div className="relative h-[180px] overflow-hidden rounded-lg border border-[#7d5b2e]/35 bg-[#19130e]">
                    {hasLogo ? (
                      <>
                        <div className="absolute inset-4 rounded-[0.8rem] border border-[#a88245]/35 bg-[rgba(245,239,225,0.78)] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-10px_22px_rgba(86,60,26,0.14)] backdrop-blur-sm" />
                        <Image src={studio.logoPath} alt={`${studio.name} logo`} fill sizes="420px" className="object-contain p-6" />
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center px-5 text-center">
                        <p className="font-display text-2xl font-semibold text-[#e7d4b4]">{studio.fallbackLabel}</p>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-[#f0dfbf]">{studio.name}</h3>
                  <p className="mt-1 text-sm text-[#be9a62]">{studio.location}</p>
                  <p className="mt-1 text-sm text-[#dbc8a7]">{studio.address}</p>
                  <p className="mt-3 text-sm leading-7 text-[#dbc8a7]">{studio.background}</p>
                  <p className="mt-3 text-sm leading-7 text-[#dbc8a7]">{studio.guestCopy}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
                  >
                    ASK ABOUT DATES
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Booking Types</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {bookingTypes.map((item) => (
              <li key={item} className="text-sm text-[#dbc8a7]">
                • {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">
                Guest Spots, Warm Weather &amp; Road Work
              </h2>
              <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
                Alex is always open to traveling for the right studio, especially somewhere warm, coastal, or tropical.
                If you have a tattoo studio and would like to host a guest artist for a short run, extended stay,
                event, or seasonal booking, get in touch.
              </p>
              <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
                He travels with his own self-contained square-body ambulance setup, which means accommodations may not
                be necessary. For studios, that makes hosting simpler: provide the workspace, coordinate the schedule,
                and let the tattoos happen.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-block rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
              >
                INVITE ALEX TO YOUR STUDIO
              </Link>
            </div>
            {hasAmbulanceImage ? (
              <div className="relative h-[260px] overflow-hidden rounded-xl border border-[#7d5b2e]/35 bg-[#141414] sm:h-[300px]">
                <Image
                  src={ambulanceImagePath}
                  alt="Alex travel setup square-body ambulance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-[260px] items-center justify-center rounded-xl border border-[#7d5b2e]/35 bg-gradient-to-br from-[#17120e] to-[#0e0e0e] p-6 text-center sm:h-[300px]">
                <p className="text-sm leading-7 text-[#d9c39d]">
                  Travel setup image will be added here when the ambulance photo is available.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">What to Include When Contacting</h2>
          <p className="mt-4 text-base leading-8 text-[#dbc8a7]">When asking about travel, include:</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {contactChecklist.map((item) => (
              <li key={item} className="text-sm text-[#dbc8a7]">
                • {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <p className="text-sm leading-7 text-[#dbc8a7]">
            Travel work depends on schedule, licensing requirements, studio setup, deposit, and project fit.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-8 py-3 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
            >
              REQUEST A GUEST SPOT
            </Link>
            <Link
              href={TEXT_STUDIO_URL}
              className="rounded-full border border-[#bc8f4d] bg-transparent px-8 py-3 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
            >
              TEXT THE STUDIO
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

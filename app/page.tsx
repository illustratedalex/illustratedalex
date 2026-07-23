import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FloatingTextButton } from "@/components/floating-text-button";
import { TrackedLink } from "@/components/tracked-link";
import { clientReviews, PUBLIC_SITE_SLUG, REVIEWS_SOURCE_URL } from "@/data/reviews";
import {
  AFTERCARE_SHOP_URL,
  BOOKING_URL,
  GIFT_CARD_URL,
  SHOP_URL,
  TEXT_STUDIO_URL,
  businessTagline,
  galleryItems,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Illustrated Alex — Tattoo & Piercing",
  description:
    "Custom tattoos, professional body piercing, and nearly four decades of experience at 30 Opera House Square in Claremont, NH. Appointments are recommended, and walk-ins may be available when the schedule allows.",
};

const featuredPortfolio = galleryItems
  .filter(
    (item) =>
      item.status === "published" &&
      item.category !== "Piercings" &&
      item.category !== "Studio" &&
      item.category !== "In Progress",
  )
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .slice(0, 6);

const piercingPreview = galleryItems
  .filter((item) => item.status === "published" && item.category === "Piercings")
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .slice(0, 2);

const featuredReviews = clientReviews
  .filter((review) => review.siteSlug === PUBLIC_SITE_SLUG && review.status === "published" && review.featured)
  .sort((a, b) => a.sortOrder - b.sortOrder);

const heroShopUrl = AFTERCARE_SHOP_URL || SHOP_URL;
const studioPhotos = [
  {
    src: "/images/studio/IMG_2491.jpeg",
    alt: "Exterior of Illustrated Alex Tattoo and Piercing at 18 Opera House Square in Claremont, New Hampshire",
    className: "sm:col-span-2 lg:col-span-3",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 100vw",
    priority: true,
    aspectClass: "aspect-[16/9]",
  },
  {
    src: "/images/studio/IMG_2483.jpeg",
    alt: "Spacious gallery and waiting area inside Illustrated Alex Tattoo and Piercing",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/studio/IMG_2484.jpeg",
    alt: "Reception counter and jewelry display inside Illustrated Alex Tattoo and Piercing",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/studio/IMG_2485.jpeg",
    alt: "Front showroom with illuminated display cases and historic pressed-tin ceiling",
    className: "sm:col-span-2 lg:col-span-2",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 66vw",
    aspectClass: "aspect-[16/10]",
  },
  {
    src: "/images/studio/IMG_2486.jpeg",
    alt: "Open studio interior with hardwood floors and comfortable waiting area",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/studio/IMG_2487.jpeg",
    alt: "Bright gallery and consultation area inside the studio",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/studio/IMG_2488.jpeg",
    alt: "Spacious professional tattoo work area at Illustrated Alex",
    className: "sm:col-span-2",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 66vw",
    aspectClass: "aspect-[16/10]",
  },
  {
    src: "/images/studio/IMG_2489.jpeg",
    alt: "Tattoo stations inside the new Illustrated Alex studio",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/studio/IMG_2490.jpeg",
    alt: "Clean tattoo workspace with open floor plan and studio television",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
    aspectClass: "aspect-[4/3]",
  },
];

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <section className="relative min-h-[82vh] overflow-hidden">
        <Image
          src="/images/studio/alex-tattooing.jpg"
          alt="Alex tattooing in studio"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/72 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#d6b27d]">{businessTagline.toUpperCase()}</p>
            <h1 className="font-display mt-4 text-4xl leading-[0.95] font-semibold tracking-[0.04em] text-[#f4e6c9] sm:text-6xl md:text-7xl lg:text-8xl">
              ILLUSTRATED
              <br />
              ALEX
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#e6d7ba] sm:text-lg sm:leading-8">
              Custom tattoos, professional piercing, and nearly four decades of experience. Based in Claremont, New
              Hampshire, with guest artist appearances in Connecticut and California.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-[#9f7a3f]/60 bg-black/35 px-3 py-2 text-[10px] leading-tight text-[#ead6b3] sm:px-4 sm:py-1.5 sm:text-[11px]">
                30 Opera House Square, Claremont NH
              </span>
              <span className="rounded-full border border-[#9f7a3f]/60 bg-black/35 px-3 py-2 text-[10px] leading-tight text-[#ead6b3] sm:px-4 sm:py-1.5 sm:text-[11px]">
                Guest Artist: Enfield CT
              </span>
              <span className="rounded-full border border-[#9f7a3f]/60 bg-black/35 px-3 py-2 text-[10px] leading-tight text-[#ead6b3] sm:px-4 sm:py-1.5 sm:text-[11px]">
                Guest Artist: Redondo Beach CA
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href={BOOKING_URL}
                eventName="book_now_click"
                eventParams={{ source: "homepage_hero" }}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 w-full rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-5 py-2.5 text-center text-[11px] font-semibold tracking-[0.1em] text-[#1e1408] sm:w-auto"
              >
                BOOK APPOINTMENT
              </TrackedLink>
              <TrackedLink
                href={heroShopUrl}
                eventName="shop_click"
                eventParams={{ source: "homepage_hero" }}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 w-full rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-center text-[11px] font-semibold tracking-[0.1em] text-[#e7d4b4] sm:w-auto"
              >
                SHOP JEWELRY &amp; AFTERCARE
              </TrackedLink>
              <TrackedLink
                href={TEXT_STUDIO_URL}
                eventName="text_studio_click"
                eventParams={{ source: "homepage_hero" }}
                className="min-h-11 w-full rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-center text-[11px] font-semibold tracking-[0.1em] text-[#e7d4b4] sm:w-auto"
              >
                TEXT REFERENCE IMAGE
              </TrackedLink>
            </div>
          </div>

          <div className="w-full">
            <div className="relative mx-auto w-full max-w-[420px] rounded-3xl border border-[#8c6a37]/45 bg-black/35 p-5 backdrop-blur-md lg:ml-auto">
              <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-[#b48b4a]/18 to-transparent" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#8c6a37]/35 bg-gradient-to-b from-[#1a130b] to-black/80">
                <div className="absolute inset-5 z-0 rounded-[1.2rem] border border-[#a88245]/38 bg-[rgba(245,239,225,0.78)] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-12px_24px_rgba(86,60,26,0.14)] backdrop-blur-sm" />
                <Image
                  src="/images/brand/illustratedalex-logo-main.png"
                  alt="Illustrated Alex main logo"
                  fill
                  sizes="420px"
                  className="object-contain p-8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
              </div>
              <div className="mt-3 rounded-xl border border-[#8c6a37]/35 bg-black/45 px-3 py-2 text-center">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#ecd9b7]">
                  Personal Studio Experience • Claremont NH
                </p>
              </div>
            </div>
          </div>
        </div>

        <FloatingTextButton trackSource="floating_button" />
      </section>

      <section className="border-t border-[#7d5b2e]/40 bg-[#0f0f0f] py-14 text-[#f0dfbf]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[0.02em] sm:text-4xl">Featured Portfolio</h2>
          <p className="mt-2 text-sm text-[#d4c09c]">Custom tattoo work from recent sessions.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.map((item) => (
              <article key={item.id} className="group overflow-hidden rounded-xl border border-[#7d5b2e]/30 bg-black/25">
                <div className="relative h-[220px] sm:h-[200px]">
                  <Image
                    src={item.imageUrl}
                    alt={item.altText}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="border-t border-[#7d5b2e]/30 px-3 py-2.5">
                  <p className="text-sm font-medium text-[#f2e1c2]">{item.title}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[#c4aa7f]">{item.category}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/portfolio" className="mt-6 inline-block text-sm text-[#e1c18c] underline underline-offset-4">
            View full portfolio
          </Link>
        </div>
      </section>

      <section className="border-t border-[#7d5b2e]/35 bg-[#121212] py-14 text-[#f0dfbf]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[0.02em] sm:text-4xl">Client Reviews</h2>
          <p className="mt-2 text-sm text-[#d4c09c]">Real feedback from tattoo and piercing clients.</p>
          <p className="mt-1 text-xs text-[#bfa47a]">Curated review highlights shown here from published client feedback.</p>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredReviews.map((review) => (
              <article key={review.id} className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={`${review.id}-star-${index}`} className={index < review.rating ? "text-[#d8b06d]" : "text-[#5a4a2d]"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full border border-[#8e6a36]/50 bg-[#1a140d] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e2c48d]">
                    Google Review
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#e7d7b8]">&ldquo;{review.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-[#f0dfbf]">{review.reviewerName}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#be9a62]">{review.serviceType}</p>
              </article>
            ))}
          </div>

          <Link
            href={REVIEWS_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
          >
            Read More Reviews on Google ↗
          </Link>
        </div>
      </section>

      <section className="border-t border-[#7d5b2e]/35 bg-[#121212] py-14 text-[#f0dfbf]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[0.02em] sm:text-4xl">Piercing Services</h2>
            <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
              Professional piercing with anatomy-aware placement, quality jewelry, and clear aftercare guidance.
            </p>
            <Link href="/piercings" className="mt-5 inline-block text-sm text-[#e1c18c] underline underline-offset-4">
              Piercing information
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {piercingPreview.map((item) => (
              <div key={item.id} className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#7d5b2e]/40">
                <Image src={item.imageUrl} alt={item.altText} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#7d5b2e]/35 bg-[#131313] py-14 text-[#f0dfbf]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#be9a62]">PERSONAL STUDIO EXPERIENCE</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[0.02em] text-[#f0dfbf] sm:text-4xl">STEP INSIDE</h2>
          <div className="mt-5">
            <p className="mt-3 max-w-4xl text-base leading-8 text-[#dbc8a7]">
              Welcome to my new studio at 18 Opera House Square in Claremont, New Hampshire.
            </p>
            <p className="mt-3 max-w-4xl text-base leading-8 text-[#dbc8a7]">
              Designed to provide a brighter, cleaner and more comfortable experience, the studio offers one-on-one
              tattoo and piercing appointments in a professional environment.
            </p>
          </div>
          <div className="mt-7 relative aspect-video overflow-hidden rounded-xl border border-[#7d5b2e]/35">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/studio/IMG_2491.jpeg"
              aria-label="Walkthrough of the new Illustrated Alex Tattoo and Piercing studio at 18 Opera House Square in Claremont, New Hampshire"
              className="h-full w-full object-cover"
            >
              <source src="/images/studio/illustratedalex.mov" type="video/quicktime" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-[#f0dfbf] sm:text-base">Illustrated Alex Tattoo &amp; Piercing</p>
              <p className="mt-1 text-xs text-[#dbc8a7] sm:text-sm">18 Opera House Square · Claremont, New Hampshire</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studioPhotos.map((photo) => (
                <article key={photo.src} className={photo.className}>
                  <div className={`group relative overflow-hidden rounded-xl border border-[#7d5b2e]/35 ${photo.aspectClass}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={photo.sizes}
                      priority={photo.priority}
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#7d5b2e]/35 bg-[#131313] pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-xl border border-[#7d5b2e]/45 bg-[#0f0f0f] p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-[#f0dfbf] sm:text-4xl">Meet the Artists</h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-[#dbc8a7]">
              Alex has been tattooing since 1986 and has spent decades building a career around custom work, piercing,
              consistency, and craftsmanship.
            </p>
            <Link
              href="/artists"
              className="mt-5 inline-block rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
            >
              MEET ALEX &amp; CHI
            </Link>
          </div>

          <div className="rounded-xl border border-[#7d5b2e]/45 bg-[#0f0f0f] p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-[#f0dfbf] sm:text-4xl">Appointments, Jewelry &amp; Aftercare</h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-[#dbc8a7]">
              Book appointments, shop jewelry and aftercare, purchase gift cards, or text the studio if you need help
              choosing the right service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                href={BOOKING_URL}
                eventName="book_now_click"
                eventParams={{ source: "homepage_book_section" }}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#1e1408]"
              >
                BOOK APPOINTMENT
              </TrackedLink>
              <TrackedLink
                href={SHOP_URL}
                eventName="shop_click"
                eventParams={{ source: "homepage_book_section" }}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#e7d4b4]"
              >
                SHOP JEWELRY &amp; AFTERCARE
              </TrackedLink>
              <TrackedLink
                href={GIFT_CARD_URL}
                eventName="gift_card_click"
                eventParams={{ source: "homepage_book_section" }}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#e7d4b4]"
              >
                GIFT CARDS ↗
              </TrackedLink>
              <TrackedLink
                href={TEXT_STUDIO_URL}
                eventName="text_studio_click"
                eventParams={{ source: "homepage_book_section" }}
                className="min-h-11 rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#e7d4b4]"
              >
                TEXT THE STUDIO
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

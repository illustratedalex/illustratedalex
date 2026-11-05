import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { ProductGrid } from "@/components/shop/product-card";
import {
  categoriesFor,
  categoryPath,
  departments,
  featuredProducts,
  jewelryCategoriesWithProducts,
  productsIn,
  studioCaseNotes,
} from "@/data/catalog";
import { BOOKING_URL, GIFT_CARD_URL } from "@/data/site-content";

export const metadata = createPageMetadata(
  "/shop",
  "Body Jewelry, Aftercare & Merch | Illustrated Alex",
  "Preview the Illustrated Alex shop: body jewelry, piercing and tattoo aftercare, and studio merch. Pickup at 18 Opera House Square, Claremont, NH.",
);

const buttonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-[#bc8f4d] px-5 py-2.5 text-center text-[11px] font-semibold tracking-[0.1em] uppercase";

export default function ShopPage() {
  const filled = jewelryCategoriesWithProducts();
  const emptySites = categoriesFor("body-jewelry").filter((category) => productsIn("body-jewelry", category.slug).length === 0);
  const merch = productsIn("merch");

  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#d8b06d] uppercase">Body jewelry and aftercare</p>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-[#f0dfbf] sm:text-6xl">Jewelry for the piercing. Care for the healing.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#dbc8a7]">
            A studio draft for Claremont. Pickup at 18 Opera House Square. Shipping stays off until checkout is approved.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/shop/body-jewelry" className={`${buttonClass} bg-[#bc8f4d] text-[#1e1408]`}>
              Shop body jewelry
            </Link>
            <Link href="/shop/aftercare" className={`${buttonClass} text-[#e7d4b4]`}>
              Shop aftercare
            </Link>
            <Link href="/shop/custom-print" className={`${buttonClass} text-[#e7d4b4]`}>
              Custom UV print
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#dbc8a7]">
            Custom UV print is available on flat-face jewelry. The print fee is $25 per design up to 2″, added to the blank you choose.{" "}
            <Link href="/shop/custom-print" className="text-[#e1c18c] underline underline-offset-4">
              Start a print request
            </Link>
            .
          </p>
        </div>
        <aside className="rounded-3xl border border-[#7d5b2e]/50 bg-[#14110d] p-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#d8b06d] uppercase">Studio</p>
          <p className="mt-3 font-display text-3xl text-[#f0dfbf]">18 Opera House Square</p>
          <p className="mt-2 text-sm leading-7 text-[#dbc8a7]">Claremont, New Hampshire. Ask in the studio if you need a gauge checked before you order.</p>
        </aside>
      </section>

      <section>
        <h2 className="font-display text-3xl font-semibold">Shop by piercing</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#dbc8a7]">Tiles appear for placements that have pieces in this draft.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filled.map((category) => {
            const count = productsIn("body-jewelry", category.slug).length;
            return (
              <li key={category.slug}>
                <Link href={categoryPath(category)} className="flex min-h-24 flex-col justify-between rounded-2xl border border-[#7d5b2e]/50 bg-[#14110d] p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]">
                  <span className="font-display text-2xl text-[#f0dfbf]">{category.name}</span>
                  <span className="text-xs tracking-[0.12em] text-[#d8b06d] uppercase">{count} in this draft</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm leading-7 text-[#dbc8a7]">
          More sites, with nothing listed yet:{" "}
          {emptySites.map((category, index) => (
            <span key={category.slug}>
              {index > 0 ? ", " : null}
              <Link href={categoryPath(category)} className="text-[#e1c18c] underline underline-offset-4">
                {category.name}
              </Link>
            </span>
          ))}
          .
        </p>
      </section>

      <section>
        <h2 className="font-display text-3xl font-semibold">Featured</h2>
        <div className="mt-6">
          <ProductGrid products={featuredProducts()} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {categoriesFor("aftercare").map((category) => (
          <article key={category.slug} className="rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] p-6">
            <h2 className="font-display text-3xl text-[#f0dfbf]">{category.name}</h2>
            <p className="mt-3 text-sm leading-7 text-[#dbc8a7]">{category.summary}</p>
            <Link href={categoryPath(category)} className="mt-4 inline-flex min-h-11 items-center text-sm text-[#e1c18c] underline underline-offset-4">
              View {category.name}
            </Link>
          </article>
        ))}
      </section>

      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-semibold">Merch</h2>
          <Link href="/shop/merch" className="text-sm text-[#e1c18c] underline underline-offset-4">
            All merch
          </Link>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#dbc8a7]">
          Coming soon. Photos and prices are still open. Apparel needs Printify or Printful reconnected. These are Illustrated Alex studio placeholders, not another brand&apos;s catalog.
        </p>
        <div className="mt-6">
          <ProductGrid products={merch} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Pickup", "Collect at 18 Opera House Square, Claremont, NH."],
          ["Shipping", "Not switched on. It waits for approved checkout."],
          ["Register", "Jewelry is meant to sell through Square Catalog so inventory can decrement. Variation ids are not linked yet."],
        ].map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-[#7d5b2e]/40 p-5">
            <h2 className="font-display text-2xl text-[#f0dfbf]">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#dbc8a7]">{body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] p-6">
        <h2 className="font-display text-3xl text-[#f0dfbf]">Also in the studio case</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#dbc8a7]">
          These styles are already on the Square register. They are not repeated in this draft, so the site does not publish a second price.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#f2e1c2]">
          {studioCaseNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 border-t border-[#7d5b2e]/30 pt-8 sm:flex-row">
        <TrackedLink href={BOOKING_URL} eventName="book_now_click" eventParams={{ source: "shop_home" }} target="_blank" rel="noopener noreferrer" className={`${buttonClass} bg-[#bc8f4d] text-[#1e1408]`}>
          Book appointment
        </TrackedLink>
        <TrackedLink href={GIFT_CARD_URL} eventName="gift_card_click" eventParams={{ source: "shop_home" }} target="_blank" rel="noopener noreferrer" className={`${buttonClass} text-[#e7d4b4]`}>
          Gift cards
        </TrackedLink>
        {departments.map((department) => (
          <Link key={department.slug} href={`/shop/${department.slug}`} className={`${buttonClass} text-[#e7d4b4]`}>
            {department.name}
          </Link>
        ))}
      </section>
    </div>
  );
}

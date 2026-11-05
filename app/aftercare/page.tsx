import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PiercingAftercareSelector } from "@/components/piercing-aftercare-selector";
import { piercingAftercareItems, tattooAftercareSteps } from "@/data/aftercare";
import { displaySku, priceSummary, productPath, productsIn } from "@/data/catalog";

export const metadata = createPageMetadata(
  "/aftercare",
  "Tattoo & Piercing Aftercare | Illustrated Alex",
  "Tattoo and piercing aftercare guidance from Illustrated Alex. Separate sections for tattoos and piercings. Always follow the instructions from your appointment first.",
);

export default function AftercarePage() {
  const piercingShop = productsIn("aftercare", "piercing-aftercare");

  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Aftercare</p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Healing Your Work</h1>
          <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
            What you do after the session matters as much as the session itself.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] px-6 py-5 text-sm leading-7 text-[#dbc8a7]">
          This is general studio aftercare guidance, not medical advice. Always follow the direct instructions given
          during your appointment and contact the studio with questions. If something feels off,{" "}
          <Link href="/contact" className="text-[#e1c18c] underline underline-offset-2 hover:text-[#f0dfbf]">
            reach out to the studio
          </Link>{" "}
          rather than guessing.
        </div>

        <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Tattoo Aftercare with Tegaderm</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#dbc8a7]">
            Illustrated Alex uses Tegaderm-style transparent film dressing on freshly finished tattoos whenever
            appropriate. This breathable protective film helps protect the tattoo during the early healing stage while
            reducing friction from clothing and daily movement.
          </p>
          <ul className="mt-6 space-y-4">
            {tattooAftercareSteps.map((step, i) => (
              <li key={i} className="flex gap-4 border-b border-[#7d5b2e]/30 pb-4 last:border-0">
                <span className="mt-0.5 shrink-0 text-xs font-semibold text-[#be9a62]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold text-[#f0dfbf]">{step.title}</p>
                  <p className="mt-1 text-sm leading-7 text-[#dbc8a7]">{step.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg border border-[#bc8f4d]/45 bg-[#1a140d] px-4 py-4 text-sm leading-7 text-[#e6d2af]">
            If you notice spreading redness, unusual swelling, heat, pus, fever, severe pain, or symptoms that concern
            you, contact a medical professional.
          </div>
          <p className="mt-6 text-sm leading-7 text-[#dbc8a7]">
            Tattoo aftercare products will be listed with the shop when those SKUs are ready.{" "}
            <Link href="/shop/aftercare/tattoo-aftercare" className="text-[#e1c18c] underline underline-offset-4">
              Tattoo aftercare in the shop
            </Link>
            .
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Piercing Aftercare</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#dbc8a7]">
            Choose your piercing type below for focused aftercare notes. Most piercings heal best with simple care:
            clean hands, sterile saline wound wash, patience, and avoiding unnecessary touching or twisting.
          </p>
          <PiercingAftercareSelector items={piercingAftercareItems} />

          <div className="mt-6 rounded-xl border border-[#7d5b2e]/40 bg-[#12100d] p-5 sm:p-6">
            <p className="font-display text-2xl font-semibold text-[#f0dfbf]">Need piercing aftercare?</p>
            <p className="mt-2 text-sm leading-7 text-[#dbc8a7]">
              Sterile saline spray and alcohol-free rinses are in the shop draft. Prices follow average online retail.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-7">
              {piercingShop.map((product) => {
                const sku = displaySku(product);
                return (
                  <li key={product.slug}>
                    <Link href={productPath(product)} className="text-[#e1c18c] underline underline-offset-4">
                      {product.title}
                    </Link>
                    <span className={product.stockCount === 0 ? "text-[#be9a62]" : "text-[#dbc8a7]"}>
                      {" "}
                      · {priceSummary(product)}
                      {sku ? ` · SKU ${sku}` : ""}
                      {product.stockCount === 0 ? " · Out of stock" : ""}
                      {product.stockCount === null ? " · Stock TBD" : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/shop/aftercare/piercing-aftercare"
              className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
            >
              SHOP PIERCING AFTERCARE
            </Link>
          </div>
        </section>

        <div className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <p className="text-base font-medium text-[#f0dfbf]">Questions during healing?</p>
          <p className="mt-2 mb-5 text-sm text-[#dbc8a7]">
            Early attention prevents most healing issues. Don&rsquo;t wait — reach out if anything looks or feels unusual.
          </p>
          <Link
            href="/contact"
            className="rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
          >
            CONTACT THE STUDIO
          </Link>
        </div>
      </div>
    </div>
  );
}

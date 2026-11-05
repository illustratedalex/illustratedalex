import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { JEWELRY_RECEIPT_REF, jewelryInquiryUrl, jewelryProducts } from "@/data/jewelry";

function ProductImage({
  src,
  alt,
  featured,
}: {
  src?: string;
  alt: string;
  featured: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#1b140c] via-[#231a10] to-[#0d0d0d] ${
          featured ? "h-72 md:h-full md:min-h-[28rem]" : "aspect-[4/3]"
        }`}
      >
        <p className="px-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#d5b47c]">
          Photo coming soon
        </p>
      </div>
    );
  }

  return (
    <div className={`relative bg-[#f4f0e8] ${featured ? "h-80 md:h-full md:min-h-[28rem]" : "aspect-[4/3]"}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        className="object-contain"
      />
    </div>
  );
}

export function JewelryCatalog() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {jewelryProducts.map((product) => {
          const featured = Boolean(product.image);

          return (
            <article
              key={product.id}
              className={`overflow-hidden rounded-2xl border border-[#7d5b2e]/40 bg-[#0f0f0f] shadow-[0_8px_26px_rgba(0,0,0,0.35)] ${
                featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
              }`}
            >
              <ProductImage src={product.image?.src} alt={product.image?.alt ?? ""} featured={featured} />
              <div className="flex flex-col gap-4 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">{product.status}</p>
                <h3 className="font-display text-3xl font-semibold text-[#f0dfbf]">{product.name}</h3>
                <p className="text-sm leading-7 text-[#dbc8a7]">{product.description}</p>
                <p className="text-sm leading-7 text-[#dbc8a7]">
                  <span className="font-semibold text-[#f0dfbf]">Sizes: </span>
                  {product.sizes}
                </p>
                <div>
                  <p className="font-display text-4xl font-semibold text-[#f0dfbf]">
                    {product.price.amount}
                    {product.price.draft ? (
                      <span className="ml-3 align-middle text-[11px] font-semibold uppercase tracking-[0.16em] text-[#be9a62]">
                        Draft
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-[#dbc8a7]">per {product.price.unit}</p>
                  {product.price.note ? <p className="mt-2 text-sm leading-6 text-[#be9a62]">{product.price.note}</p> : null}
                </div>
                <TrackedLink
                  href={jewelryInquiryUrl(product.name)}
                  eventName="text_studio_click"
                  eventParams={{ source: "jewelry_catalog", product_id: product.id }}
                  className="inline-flex w-fit items-center justify-center rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4] hover:bg-[#bc8f4d]/10"
                >
                  ASK THE STUDIO
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>
      <p className="text-sm leading-7 text-[#be9a62]">
        Draft catalog only — nothing here checks out online. Spiral taper gauges still need to be measured. Photo-coming
        prices are proposed 3× amounts from receipt {JEWELRY_RECEIPT_REF} and are not shelf-verified. Text the studio to
        ask about a piece.
      </p>
    </div>
  );
}

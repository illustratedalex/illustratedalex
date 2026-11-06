import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/shop/add-to-cart";
import { PhotoFrame } from "@/components/shop/photo-frame";
import { ProductGallery } from "@/components/shop/product-gallery";
import { categories, displaySku, getCategory, getProduct, priceSummary, productPath, products, stockNotice } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return createPageMetadata(productPath(product), `${product.title} | Illustrated Alex`, product.description);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = categories.find((entry) => entry.department === product.department && entry.slug === product.category) ?? getCategory(product.department, product.category);
  const sku = displaySku(product);
  const stock = stockNotice(product);
  const aftercareHref = product.department === "body-jewelry" ? "/shop/aftercare/piercing-aftercare" : "/shop/aftercare";

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8">
      {product.image ? (
        <ProductGallery
          fit={product.imageFit}
          images={[
            { src: product.image, alt: product.imageAlt ?? product.title },
            ...(product.gallery ?? []),
          ]}
        />
      ) : (
        <PhotoFrame product={product} sizes="(max-width: 1024px) 100vw, 45vw" priority />
      )}
      <div>
        <p className="text-sm text-[#dbc8a7]">
          <Link href="/shop" className="underline underline-offset-4">Shop</Link>
          {category ? (
            <>
              {" / "}
              <Link href={`/shop/${category.department}/${category.slug}`} className="underline underline-offset-4">
                {category.name}
              </Link>
            </>
          ) : null}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{product.title}</h1>
        {sku ? <p className="mt-3 text-base font-semibold tracking-[0.14em] text-[#d8b06d]">SKU {sku}</p> : null}
        <p className="mt-4 text-lg text-[#f2e1c2]">{priceSummary(product)}</p>
        {stock ? (
          <p className={stock.kind === "out" ? "mt-2 text-sm font-semibold text-[#f0dfbf]" : stock.kind === "unknown" ? "mt-2 text-xs text-[#be9a62]" : "mt-2 text-sm text-[#dbc8a7]"}>
            {stock.label}
          </p>
        ) : null}
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#dbc8a7]">{product.description}</p>
        <h2 className="mt-6 text-sm font-semibold tracking-[0.14em] text-[#d8b06d] uppercase">Details</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-[#f0dfbf]">
          {product.materials.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {sku ? null : product.fulfillment !== "square-catalog" ? (
          <p className="mt-4 text-xs tracking-[0.08em] text-[#be9a62] uppercase">
            Draft ref {product.sku}. Not a Printful or Printify id.
          </p>
        ) : null}
        <div className="mt-6">
          <AddToCart product={product} />
        </div>
        {product.customPrintEligible ? (
          <p className="mt-6 text-sm leading-7 text-[#dbc8a7]">
            <Link href="/shop/custom-print" className="text-[#e1c18c] underline underline-offset-4">
              Have this custom printed with a design of your choice
            </Link>{" "}
            (+$25 UV print, up to 2″).
          </p>
        ) : null}
        {product.department === "body-jewelry" ? (
          <p className="mt-6 text-sm leading-7 text-[#dbc8a7]">
            After you buy jewelry, read{" "}
            <Link href={aftercareHref} className="text-[#e1c18c] underline underline-offset-4">
              piercing aftercare
            </Link>{" "}
            and the{" "}
            <Link href="/aftercare" className="text-[#e1c18c] underline underline-offset-4">
              studio healing guide
            </Link>
            .
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-7 text-[#dbc8a7]">Pickup at 18 Opera House Square, Claremont, NH, or call (603) 843-7005 to hold a piece.</p>
      </div>
    </div>
  );
}

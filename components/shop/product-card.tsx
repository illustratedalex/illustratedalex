import Link from "next/link";
import { displaySku, priceSummary, productPath, stockNotice, type CatalogProduct } from "@/data/catalog";
import { PhotoFrame } from "@/components/shop/photo-frame";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const price = priceSummary(product);
  const sku = displaySku(product);
  const stock = stockNotice(product);
  const status = product.reconnect || product.photoStatus === "coming" ? "Coming soon" : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#7d5b2e]/40 bg-[#0f0f0f]">
      <Link href={productPath(product)} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]">
        <PhotoFrame product={product} sizes="(max-width: 640px) 75vw, (max-width: 1024px) 38vw, 25vw" />
        <div className="space-y-2 px-4 py-4">
          <h3 className="font-display text-xl leading-snug font-semibold text-[#f0dfbf]">{product.title}</h3>
          {sku ? <p className="text-sm font-semibold tracking-[0.12em] text-[#d8b06d]">SKU {sku}</p> : null}
          <p className="text-sm text-[#f2e1c2]">{price}</p>
          {stock ? (
            <p className={stock.kind === "out" ? "text-sm font-semibold text-[#f0dfbf]" : stock.kind === "unknown" ? "text-xs text-[#be9a62]" : "text-sm text-[#dbc8a7]"}>
              {stock.label}
            </p>
          ) : null}
          {status ? <p className="text-[11px] tracking-[0.12em] text-[#d8b06d] uppercase">{status}</p> : null}
        </div>
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: CatalogProduct[] }) {
  if (products.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

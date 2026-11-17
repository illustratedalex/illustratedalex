import {
  displaySku,
  linePriceCents,
  productPath,
  stockNotice,
  type CatalogProduct,
} from "./catalog.ts";

const businessBrand = "Illustrated Alex";

/** Brand string already present on the listing. Unbranded studio jewelry uses the shop name. */
export function productBrandName(product: CatalogProduct) {
  const text = `${product.title} ${product.sku}`;
  if (text.includes("H2Ocean")) return "H2Ocean";
  if (text.includes("OUFER")) return "OUFER";
  if (product.title.startsWith("Recovery ")) return "Recovery";
  return businessBrand;
}

function pricedAmounts(product: CatalogProduct) {
  return product.variants
    .map((variant) => linePriceCents(product, variant))
    .filter((cents): cents is number => cents !== null);
}

function schemaAvailability(product: CatalogProduct) {
  const stock = stockNotice(product);
  if (!stock) return null;
  if (stock.kind === "out") return "https://schema.org/OutOfStock";
  if (stock.kind === "onhand") return "https://schema.org/InStock";
  return "https://schema.org/LimitedAvailability";
}

export function productJsonLd(product: CatalogProduct, siteUrl: string) {
  if (!product.image) return null;
  const amounts = pricedAmounts(product);
  if (amounts.length === 0) return null;
  const availability = schemaAvailability(product);
  if (!availability) return null;

  const unique = [...new Set(amounts)].sort((a, b) => a - b);
  const url = `${siteUrl}${productPath(product)}`;
  const images = [product.image, ...(product.gallery ?? []).map((shot) => shot.src)].map((src) =>
    src.startsWith("http") ? src : `${siteUrl}${src}`,
  );
  const sku = displaySku(product);
  const money = (cents: number) => (cents / 100).toFixed(2);
  const offers =
    unique.length === 1
      ? {
          "@type": "Offer",
          url,
          priceCurrency: "USD",
          price: money(unique[0]),
          availability,
        }
      : {
          "@type": "AggregateOffer",
          url,
          priceCurrency: "USD",
          lowPrice: money(unique[0]),
          highPrice: money(unique[unique.length - 1]),
          offerCount: amounts.length,
          availability,
        };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: images,
    description: product.description,
    ...(sku ? { sku } : {}),
    brand: { "@type": "Brand", name: productBrandName(product) },
    offers,
  };
}

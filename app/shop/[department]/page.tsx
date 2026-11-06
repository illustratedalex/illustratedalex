import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shop/product-card";
import { categoriesWithProducts, categoryPath, departments, getDepartment, productsIn } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return departments.map((department) => ({ department: department.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ department: string }> }) {
  const { department: slug } = await params;
  const department = getDepartment(slug);
  if (!department) return {};
  return createPageMetadata(`/shop/${department.slug}`, `${department.name} | Illustrated Alex`, department.summary);
}

export default async function DepartmentPage({ params }: { params: Promise<{ department: string }> }) {
  const { department: slug } = await params;
  const department = getDepartment(slug);
  if (!department) notFound();
  const categories = categoriesWithProducts(department.slug);
  const items = productsIn(department.slug);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#d8b06d] uppercase">Shop</p>
      <h1 className="font-display mt-3 text-4xl font-semibold sm:text-6xl">{department.name}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#dbc8a7]">{department.summary}</p>
      {department.slug === "body-jewelry" ? (
        <p className="mt-4 text-sm leading-7 text-[#dbc8a7]">
          <Link href="/shop/custom-print" className="text-[#e1c18c] underline underline-offset-4">
            Custom UV print
          </Link>{" "}
          is $25 per design up to 2″, added to the blank you choose.
        </p>
      ) : null}
      {department.slug === "merch" ? (
        <div className="mt-6 max-w-3xl rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] p-5 text-sm leading-7 text-[#dbc8a7]">
          <p>Mugs and gift cards are available now. Hoodies, tees, hats, and stickers are in the works and coming soon.</p>
        </div>
      ) : null}
      {department.slug === "aftercare" ? (
        <p className="mt-4 text-sm leading-7 text-[#dbc8a7]">
          Written healing notes stay on the <Link href="/aftercare" className="text-[#e1c18c] underline underline-offset-4">aftercare guide</Link>.
        </p>
      ) : null}
      <ul className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={categoryPath(category)} className="inline-flex min-h-11 items-center rounded-full border border-[#7d5b2e] px-4 text-sm text-[#f0dfbf]">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <div className="rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] p-6">
            <h2 className="font-display text-3xl">Nothing listed yet</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#dbc8a7]">
              Nothing is listed in this department yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

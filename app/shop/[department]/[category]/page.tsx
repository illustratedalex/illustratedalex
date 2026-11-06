import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shop/product-card";
import { categories, categoryPath, getCategory, getDepartment, productsIn } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ department: category.department, category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ department: string; category: string }> }) {
  const { department, category: categorySlug } = await params;
  const category = getCategory(department, categorySlug);
  if (!category) return {};
  return createPageMetadata(`/shop/${department}/${category.slug}`, `${category.name} | Illustrated Alex`, category.summary);
}

export default async function CategoryPage({ params }: { params: Promise<{ department: string; category: string }> }) {
  const { department: departmentSlug, category: categorySlug } = await params;
  const department = getDepartment(departmentSlug);
  const category = getCategory(departmentSlug, categorySlug);
  if (!department || !category) notFound();
  const items = productsIn(department.slug, category.slug);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-[#dbc8a7]">
        <Link href="/shop" className="underline underline-offset-4">Shop</Link>
        {" / "}
        <Link href={`/shop/${department.slug}`} className="underline underline-offset-4">{department.name}</Link>
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold sm:text-6xl">{category.name}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#dbc8a7]">{category.summary}</p>
      <div className="mt-8">
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <div className="rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] p-6">
            <h2 className="font-display text-3xl">Nothing listed here yet</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#dbc8a7]">
              {department.slug === "aftercare"
                ? "Piercing spray, foam soap, and rinses are listed with piercing aftercare. Tattoo wash and film can be added later. The written healing guide stays on the aftercare page."
                : "Nothing is listed for this placement right now. Ask the studio if you are looking for a specific piece."}
            </p>
            <Link href={department.slug === "aftercare" ? "/aftercare" : categoryPath(category).replace(/\/[^/]+$/, "")} className="mt-4 inline-flex min-h-11 items-center text-sm text-[#e1c18c] underline underline-offset-4">
              {department.slug === "aftercare" ? "Read the healing guide" : `Back to ${department.name}`}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

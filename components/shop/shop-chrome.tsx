"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoriesFor, departments } from "@/data/catalog";
import { useCart } from "@/components/shop/cart-provider";

const linkClass =
  "inline-flex min-h-11 items-center rounded-full px-3 text-[11px] font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]";

export function ShopChrome() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const cartLabel = ready && count > 0 ? `Cart (${count})` : "Cart";

  return (
    <div className="border-b border-[#7d5b2e]/40 bg-[#0f0f0f]">
      <p role="status" className="border-b border-[#7d5b2e]/30 bg-[#14110d] px-4 py-3 text-center text-sm leading-6 text-[#f0dfbf]">
        Preview catalog. Pickup at 18 Opera House Square, Claremont NH. Shipping opens when checkout is approved.
        Production charges are off.
      </p>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#d8b06d] uppercase">Shop</p>
          <Link href="/shop/cart" className={`${linkClass} border border-[#bc8f4d] text-[#e7d4b4]`}>
            {cartLabel}
          </Link>
        </div>
        <nav aria-label="Shop departments" className="hidden gap-2 md:flex md:flex-wrap">
          <Link href="/shop" className={`${linkClass} ${pathname === "/shop" ? "bg-[#bc8f4d] text-[#1e1408]" : "text-[#f0dfbf]"}`} aria-current={pathname === "/shop" ? "page" : undefined}>
            All
          </Link>
          {departments.map((department) => {
            const href = `/shop/${department.slug}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={department.slug} href={href} className={`${linkClass} ${active ? "bg-[#bc8f4d] text-[#1e1408]" : "text-[#f0dfbf]"}`} aria-current={active ? "page" : undefined}>
                {department.name}
              </Link>
            );
          })}
        </nav>
        <details className="md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-semibold tracking-[0.12em] text-[#f0dfbf] uppercase">
            Browse the shop
          </summary>
          <ul className="space-y-3 pt-3 pb-2">
            <li>
              <Link href="/shop" className="inline-flex min-h-11 items-center text-sm text-[#f2e1c2]">
                All
              </Link>
            </li>
            {departments.map((department) => (
              <li key={department.slug}>
                <Link href={`/shop/${department.slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-[#f0dfbf]">
                  {department.name}
                </Link>
                <ul className="pl-3">
                  {categoriesFor(department.slug).map((category) => (
                    <li key={category.slug}>
                      <Link href={`/shop/${department.slug}/${category.slug}`} className="inline-flex min-h-11 items-center text-sm text-[#dbc8a7]">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

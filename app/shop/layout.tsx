import type { Metadata } from "next";
import { CartProvider } from "@/components/shop/cart-provider";
import { ShopChrome } from "@/components/shop/shop-chrome";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="bg-[#0f0f0f] text-[#f0dfbf]">
        <ShopChrome />
        {children}
      </div>
    </CartProvider>
  );
}

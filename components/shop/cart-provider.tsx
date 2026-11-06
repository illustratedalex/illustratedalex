"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { canAddToCart, getProduct } from "@/data/catalog";

const STORAGE_KEY = "ia-shop-cart-v1";

export type CartLine = {
  slug: string;
  variantId: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  add: (slug: string, variantId: string) => string | null;
  setQuantity: (slug: string, variantId: string, quantity: number) => void;
  remove: (slug: string, variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(line: CartLine, slug: string, variantId: string) {
  return line.slug === slug && line.variantId === variantId;
}

function sanitize(lines: CartLine[]) {
  const kept: CartLine[] = [];
  for (const line of lines) {
    const product = getProduct(line.slug);
    if (!product || !canAddToCart(product)) continue;
    if (!product.variants.some((variant) => variant.id === line.variantId)) continue;
    if (!Number.isInteger(line.quantity) || line.quantity < 1) continue;
    const quantity = Math.min(line.quantity, roomFor(product, line.variantId, kept));
    if (quantity < 1) continue;
    kept.push({ slug: line.slug, variantId: line.variantId, quantity });
  }
  return kept;
}

function quantityFor(lines: CartLine[], slug: string) {
  return lines.reduce((sum, line) => (line.slug === slug ? sum + line.quantity : sum), 0);
}

function roomFor(product: NonNullable<ReturnType<typeof getProduct>>, variantId: string, lines: CartLine[]) {
  const variant = product.variants.find((entry) => entry.id === variantId);
  const variantRoom =
    variant?.stockCount == null
      ? Number.POSITIVE_INFINITY
      : variant.stockCount -
        lines
          .filter((line) => line.slug === product.slug && line.variantId === variantId)
          .reduce((sum, line) => sum + line.quantity, 0);
  const productRoom = product.stockCount == null ? Number.POSITIVE_INFINITY : product.stockCount - quantityFor(lines, product.slug);
  return Math.min(variantRoom, productRoom);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Read after mount so the exported HTML and the first client render both show an empty cart.
    let next: CartLine[] = [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]") as CartLine[];
      next = Array.isArray(parsed) ? sanitize(parsed) : [];
    } catch {
      next = [];
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is not available during static render
    setLines(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    return {
      lines,
      ready,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      add(slug, variantId) {
        const product = getProduct(slug);
        if (!product || !canAddToCart(product)) return "This piece is not available to add.";
        if (!product.variants.some((variant) => variant.id === variantId)) return "Choose a size.";
        let message: string | null = null;
        setLines((current) => {
          if (roomFor(product, variantId, current) < 1) {
            message = "That is all the studio has on hand for this piece.";
            return current;
          }
          const existing = current.find((line) => sameLine(line, slug, variantId));
          if (!existing) return [...current, { slug, variantId, quantity: 1 }];
          return current.map((line) => (sameLine(line, slug, variantId) ? { ...line, quantity: line.quantity + 1 } : line));
        });
        return message;
      },
      setQuantity(slug, variantId, quantity) {
        const product = getProduct(slug);
        setLines((current) => {
          if (!product) return current.filter((line) => !sameLine(line, slug, variantId));
          const others = current.filter((line) => !sameLine(line, slug, variantId));
          const capped = Math.min(quantity, roomFor(product, variantId, others));
          if (capped < 1) return current.filter((line) => !sameLine(line, slug, variantId));
          return current.map((line) => (sameLine(line, slug, variantId) ? { ...line, quantity: capped } : line));
        });
      },
      remove(slug, variantId) {
        setLines((current) => current.filter((line) => !sameLine(line, slug, variantId)));
      },
      clear() {
        setLines([]);
      },
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

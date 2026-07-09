"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type NavItem = { href: string; label: string; external?: boolean };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-[#7f6232]/40 bg-[#0f0f0f] text-[#d8c7a6] transition hover:text-[#f5e6c8]"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M2 2l14 14M16 2L2 16" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M2 4h14M2 9h14M2 14h14" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-1rem)] rounded-lg border border-[#7f6232]/50 bg-[#0f0f0f] py-2 shadow-xl">
          <nav>
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.label === "Book Now") {
                        trackEvent("book_now_click", { source: "mobile_nav" });
                      }
                      if (item.href === "/shop") {
                        trackEvent("shop_click", { source: "mobile_nav" });
                      }
                      setOpen(false);
                    }}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block px-5 py-3 text-xs uppercase tracking-[0.12em] text-[#e8d8b9] transition hover:bg-[#1a1a1a] hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { bookingUrl } from "@/data/site-content";

type NavItem = { href: string; label: string };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded text-stone-400 transition hover:text-stone-100"
      >
        {open ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M2 2l14 14M16 2L2 16" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M2 4h14M2 9h14M2 14h14" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-stone-800 bg-[#0e0c0a] py-2 shadow-xl">
          <nav>
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-stone-300 transition hover:bg-stone-900 hover:text-stone-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mx-3 mt-2 border-t border-stone-800 pt-2">
                <Link
                  href={bookingUrl}
                  onClick={() => setOpen(false)}
                  className="block rounded px-1 py-2 text-center text-sm font-semibold text-stone-100 transition hover:text-stone-200"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { bookingUrl, businessName, primaryNav } from "@/data/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-800/70 bg-[#0a0907]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-base font-bold tracking-wide text-stone-100 transition hover:text-stone-200"
        >
          {businessName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-5 text-sm text-stone-400">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-stone-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={bookingUrl}
            className="rounded border border-stone-600 px-4 py-1.5 text-sm font-medium text-stone-200 transition hover:border-stone-400 hover:text-stone-100"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile nav */}
        <MobileNav items={primaryNav} />
      </div>
    </header>
  );
}

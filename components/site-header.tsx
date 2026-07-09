import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { TrackedLink } from "@/components/tracked-link";
import { bookingUrl, primaryNav } from "@/data/site-content";

export function SiteHeader() {
  return (
    <header className="border-b border-[#6a5028]/40 bg-[#090909]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <Image
            src="/images/brand/illustratedalex-logo-icon-512.png"
            alt="Illustrated Alex"
            width={48}
            height={48}
            className="h-9 w-9 rounded-full object-contain sm:h-10 sm:w-10"
          />
          <span className="truncate font-display text-[11px] font-semibold tracking-[0.12em] text-[#f2e4c7] sm:text-sm sm:tracking-[0.16em] md:text-base">
            ILLUSTRATED ALEX
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-5 text-xs tracking-[0.14em] text-[#f0e2c3]">
            {primaryNav.map((item) => (
              <li key={item.href}>
                {item.href === "/shop" ? (
                  <TrackedLink
                    href={item.href}
                    eventName="shop_click"
                    eventParams={{ source: "header_nav" }}
                    className="uppercase transition hover:text-white"
                  >
                    {item.label.toUpperCase()}
                  </TrackedLink>
                ) : (
                  <Link href={item.href} className="uppercase transition hover:text-white">
                    {item.label.toUpperCase()}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <TrackedLink
                href={bookingUrl}
                eventName="book_now_click"
                eventParams={{ source: "header_desktop" }}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#b88a45] bg-[#b88a45] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1a1105] transition hover:bg-[#c69952]"
              >
                Book Now
              </TrackedLink>
            </li>
          </ul>
        </nav>

        <MobileNav items={[...primaryNav, { href: bookingUrl, label: "Book Now", external: true }]} />
      </div>
    </header>
  );
}

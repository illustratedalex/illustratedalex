import Link from "next/link";
import { businessFullName, GIFT_CARD_URL, primaryNav, studioAddress } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#7d5b2e]/35 bg-[#0d0d0d] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-sm font-medium">{businessFullName}</p>
        <p className="mt-1 text-sm text-[#dbc8a7]">{studioAddress}</p>
        <nav aria-label="Footer navigation" className="mt-3">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#d7c4a1]">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={GIFT_CARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 hover:underline"
              >
                Gift Cards ↗
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#7d5b2e]/35 pt-4">
          <p className="text-xs text-[#be9a62]">
            © {new Date().getFullYear()} {businessFullName}
          </p>
          <Link
            href="https://deadsignal.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#9d8865] hover:text-[#c9b18a]"
          >
            Built &amp; Managed by DeadSignal
          </Link>
        </div>
      </div>
    </footer>
  );
}

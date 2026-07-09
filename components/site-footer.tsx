import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { businessFullName } from "@/data/site-content";

const deadSignalIconPath = "/images/deadsignal/deadsignal-icon-transparent.png";

function hasPublicAsset(src: string) {
  const normalized = src.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", normalized));
}

export function SiteFooter() {
  const hasDeadSignalIcon = hasPublicAsset(deadSignalIconPath);

  return (
    <footer className="mt-20 border-t border-stone-800/60 bg-[#0a0907]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-serif text-sm font-semibold text-stone-300">
            {businessFullName}
          </p>
          <p className="mt-0.5 text-xs text-stone-600">
            30 Opera House Square, Claremont, NH
          </p>
        </div>
        <Link
          href="https://deadsignal.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-stone-600 transition hover:text-stone-400"
        >
          {hasDeadSignalIcon ? (
            <Image
              src={deadSignalIconPath}
              alt=""
              width={14}
              height={14}
              aria-hidden
              className="opacity-40"
            />
          ) : null}
          <span>Built &amp; Managed by DeadSignal</span>
        </Link>
      </div>
    </footer>
  );
}

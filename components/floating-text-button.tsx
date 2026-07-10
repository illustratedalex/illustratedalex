"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TEXT_STUDIO_URL } from "@/data/site-content";
import { TrackedLink } from "@/components/tracked-link";

type FloatingTextButtonProps = {
  trackSource?: string;
};

export function FloatingTextButton({ trackSource }: FloatingTextButtonProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const className = `fixed right-3 bottom-20 z-40 min-h-11 rounded-full border border-[#bc8f4d] bg-[#17120d]/92 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] text-[#f2dfbf] shadow-lg backdrop-blur transition-all duration-200 sm:right-4 sm:bottom-24 ${
    isFooterVisible ? "pointer-events-none translate-y-1 opacity-0" : "opacity-100"
  }`;

  if (trackSource) {
    return (
      <TrackedLink
        href={TEXT_STUDIO_URL}
        eventName="text_studio_click"
        eventParams={{ source: trackSource }}
        className={className}
      >
        💬 TEXT THE STUDIO
      </TrackedLink>
    );
  }

  return (
    <Link href={TEXT_STUDIO_URL} className={className}>
      💬 TEXT THE STUDIO
    </Link>
  );
}

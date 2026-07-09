"use client";

import Link, { type LinkProps } from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import type { AnalyticsEventName } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  eventName?: AnalyticsEventName;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedLink({ eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (eventName) {
      trackEvent(eventName, eventParams);
    }
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}


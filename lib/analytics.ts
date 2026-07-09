"use client";

export type AnalyticsEventName =
  | "book_now_click"
  | "gift_card_click"
  | "text_studio_click"
  | "shop_click"
  | "portfolio_image_open"
  | "contact_form_start"
  | "contact_form_submit_mock";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type WindowWithGtag = Window & {
  gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
};

export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as WindowWithGtag;
  analyticsWindow.gtag?.("event", eventName, params);
}


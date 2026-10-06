export type ReviewStatus = "published" | "hidden" | "draft";

export type PublicReview = {
  id: string;
  siteSlug: string;
  reviewerName: string;
  rating: number;
  quote: string;
  serviceType: string;
  source: string;
  sourceUrl?: string;
  featured: boolean;
  sortOrder: number;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
};

export const PUBLIC_SITE_SLUG = "illustrated-alex";

export const REVIEWS_SOURCE_URL =
  "https://www.google.com/search?q=Illustrated+Alex+Tattoo+%26+Piercing+reviews";

// Add only reviews verified against an original source.
export const clientReviews: PublicReview[] = [];

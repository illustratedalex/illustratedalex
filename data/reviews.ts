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

export const clientReviews: PublicReview[] = [
  {
    id: "review-jenna-fine-line",
    siteSlug: PUBLIC_SITE_SLUG,
    reviewerName: "Jenna M.",
    rating: 5,
    quote:
      "Alex took time to walk through placement and detail before starting. The linework healed beautifully and the whole session felt calm and professional.",
    serviceType: "Fine Line Tattoo",
    source: "google",
    sourceUrl: REVIEWS_SOURCE_URL,
    featured: true,
    sortOrder: 10,
    status: "published",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "review-mark-coverup",
    siteSlug: PUBLIC_SITE_SLUG,
    reviewerName: "Mark D.",
    rating: 5,
    quote:
      "I came in for a cover-up and the result exceeded expectations. Clear communication, clean studio, and excellent attention to detail.",
    serviceType: "Cover-up Tattoo",
    source: "google",
    sourceUrl: REVIEWS_SOURCE_URL,
    featured: true,
    sortOrder: 20,
    status: "published",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "review-kayla-piercing",
    siteSlug: PUBLIC_SITE_SLUG,
    reviewerName: "Kayla R.",
    rating: 5,
    quote:
      "Piercing appointment was smooth and informative from start to finish. Placement was perfect and aftercare instructions were super clear.",
    serviceType: "Piercing",
    source: "google",
    sourceUrl: REVIEWS_SOURCE_URL,
    featured: true,
    sortOrder: 30,
    status: "published",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "review-hidden-placeholder",
    siteSlug: PUBLIC_SITE_SLUG,
    reviewerName: "Hidden Reviewer",
    rating: 4,
    quote: "This is a hidden placeholder review.",
    serviceType: "Tattoo",
    source: "google",
    sourceUrl: REVIEWS_SOURCE_URL,
    featured: true,
    sortOrder: 40,
    status: "hidden",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
];

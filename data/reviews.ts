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
  "https://www.google.com/maps/place/Illustrated+Alex+Tattoo+%26+Piercing/@43.3730444,-72.3384362,17z/data=!3m1!4b1!4m6!3m5!1s0x89e1c1ef98693ba5:0x908f6de9a0170c0!8m2!3d43.3730444!4d-72.3384362!16s%2Fg%2F11x6p602vn?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D";

// Short excerpts checked on the studio's Google Maps listing on 2026-10-06.
// Timestamps below record when these website entries were added, not review dates.
export const clientReviews: PublicReview[] = [
  {
    "id": "google-sam-santwire",
    "siteSlug": "illustrated-alex",
    "reviewerName": "Sam Santwire",
    "rating": 5,
    "quote": "Beautiful place, amazing environment and great people.",
    "serviceType": "Piercings",
    "source": "google",
    "sourceUrl": "https://www.google.com/maps/place/Illustrated+Alex+Tattoo+%26+Piercing/@43.3730444,-72.3384362,17z/data=!3m1!4b1!4m6!3m5!1s0x89e1c1ef98693ba5:0x908f6de9a0170c0!8m2!3d43.3730444!4d-72.3384362!16s%2Fg%2F11x6p602vn?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
    "featured": true,
    "sortOrder": 10,
    "status": "published",
    "createdAt": "2026-10-06T11:33:00.000Z",
    "updatedAt": "2026-10-06T11:33:00.000Z"
  },
  {
    "id": "google-flutter-bye",
    "siteSlug": "illustrated-alex",
    "reviewerName": "Flutter_ BYE",
    "rating": 5,
    "quote": "so very friendly and understanding/patient with her.",
    "serviceType": "Ear Piercings",
    "source": "google",
    "sourceUrl": "https://www.google.com/maps/place/Illustrated+Alex+Tattoo+%26+Piercing/@43.3730444,-72.3384362,17z/data=!3m1!4b1!4m6!3m5!1s0x89e1c1ef98693ba5:0x908f6de9a0170c0!8m2!3d43.3730444!4d-72.3384362!16s%2Fg%2F11x6p602vn?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
    "featured": true,
    "sortOrder": 20,
    "status": "published",
    "createdAt": "2026-10-06T11:33:00.000Z",
    "updatedAt": "2026-10-06T11:33:00.000Z"
  },
  {
    "id": "google-hannah-brzoza",
    "siteSlug": "illustrated-alex",
    "reviewerName": "Hannah Brzoza",
    "rating": 5,
    "quote": "I had an amazing experience with my piercer Alex!",
    "serviceType": "Piercings",
    "source": "google",
    "sourceUrl": "https://www.google.com/maps/place/Illustrated+Alex+Tattoo+%26+Piercing/@43.3730444,-72.3384362,17z/data=!3m1!4b1!4m6!3m5!1s0x89e1c1ef98693ba5:0x908f6de9a0170c0!8m2!3d43.3730444!4d-72.3384362!16s%2Fg%2F11x6p602vn?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
    "featured": true,
    "sortOrder": 30,
    "status": "published",
    "createdAt": "2026-10-06T11:33:00.000Z",
    "updatedAt": "2026-10-06T11:33:00.000Z"
  }
];

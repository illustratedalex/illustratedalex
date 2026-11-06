import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GoDaddy still receives a static export. Vercel builds (VERCEL=1) keep the
  // custom-print upload route. Local `npm run build` sets STATIC_EXPORT=1.
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

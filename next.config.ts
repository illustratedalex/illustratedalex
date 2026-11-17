import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // GoDaddy still receives a static export. Vercel builds (VERCEL=1) keep the
  // custom-print upload route. Local `npm run build` sets STATIC_EXPORT=1.
  ...(staticExport ? { output: "export" as const } : {}),
  images: {
    // The default optimizer cannot run during a static export. Vercel still resizes
    // next/image requests. Source files are compressed for the export and for raw URLs.
    unoptimized: staticExport,
  },
};

if (!staticExport) {
  nextConfig.redirects = async () => [{ source: "/tattoo", destination: "/tattoos", permanent: true }];
}

export default nextConfig;

import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { CustomPrintForm } from "@/components/shop/custom-print-form";

export const metadata = createPageMetadata(
  "/shop/custom-print",
  "Custom UV-Printed Tunnels & Gauges | Illustrated Alex",
  "Upload art for custom UV-printed tunnels and gauges at Illustrated Alex in Claremont, NH. Starting at $35 per pair.",
);

const examples = [
  {
    src: "/images/custom-print/example-iris-plugs.jpg",
    alt: "White double-flare plugs with a printed iris",
    caption: "Iris UV print",
  },
  {
    src: "/images/custom-print/example-octopus-plugs.jpg",
    alt: "Black plugs with an octopus face print",
    caption: "Octopus UV print",
  },
  {
    src: "/images/custom-print/example-wood-skull-plugs.jpg",
    alt: "Wood plugs with a skull inside a labyrinth",
    caption: "Wood skull design",
  },
];

export default function CustomPrintPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-[#dbc8a7]">
        <Link href="/shop" className="underline underline-offset-4">
          Shop
        </Link>
      </p>
      <p className="mt-4 text-[11px] font-semibold tracking-[0.2em] text-[#d8b06d] uppercase">Custom work</p>
      <h1 className="font-display mt-3 max-w-3xl text-4xl leading-tight font-semibold sm:text-6xl">Custom UV-printed tunnels &amp; gauges</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[#dbc8a7]">
        Upload your art or photo. Alex prints it on durable tunnels and gauges with his eufyMake UV printer at Illustrated Alex Tattoo &amp; Piercing in Claremont, NH.
      </p>
      <p className="mt-6 inline-flex rounded-full border border-[#d8b06d] bg-[#14110d] px-4 py-2 text-sm font-semibold text-[#f2e1c2]">
        Starting at $35 per pair
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#be9a62]">The final quote can change with size and the design.</p>

      <section className="mt-12">
        <h2 className="font-display text-3xl font-semibold">Examples of our work</h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {examples.map((example) => (
            <li key={example.src} className="overflow-hidden rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d]">
              <div className="relative aspect-square">
                <Image src={example.src} alt={example.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <p className="px-3 py-3 text-sm text-[#f0dfbf]">{example.caption}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-3xl font-semibold">Artwork tips (UV print)</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-[#dbc8a7]">
          <p>We UV-print your design on plugs in the shop. Round designs work best. They sit cleanly on the plug face without awkward cropping.</p>
          <p>Send high-resolution files. Per eufyMake’s UV print guidance:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Standard: at least 300 DPI at the final print size</li>
            <li>Small / detailed plugs: 400–600 DPI preferred (small-format, like stickers/badges)</li>
          </ul>
          <p className="font-semibold text-[#f0dfbf]">Minimum image size we accept</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>At least 1200 × 1200 pixels (square); higher is better</li>
            <li>For a ~1 in (25 mm) plug face at 600 DPI you need about 600 px across; we ask for 1200 × 1200 or larger so the same file stays sharp on larger gauges</li>
            <li>Prefer a circular / round composition centered in the frame</li>
            <li>Vector (SVG, PDF, AI) ideal. It stays sharp at any size</li>
            <li>Raster is fine: PNG (best) or high-quality JPEG. Screenshots and heavily compressed social downloads are a poor fit</li>
            <li>Do not upscale a small or blurry image. That will not add real detail</li>
          </ul>
          <p>If your file is under 1200 × 1200 px or looks soft when zoomed, we may ask for a higher-res version before printing.</p>
        </div>
      </section>

      <section className="mt-12 max-w-xl">
        <h2 className="font-display text-3xl font-semibold">Request a pair</h2>
        <p className="mt-3 text-sm leading-7 text-[#dbc8a7]">
          This draft stores the file only after Vercel Blob is connected. Nothing is charged here.
        </p>
        <div className="mt-6">
          <CustomPrintForm />
        </div>
      </section>
    </div>
  );
}

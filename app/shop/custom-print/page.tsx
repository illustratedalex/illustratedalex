import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { CustomPrintForm } from "@/components/shop/custom-print-form";

export const metadata = createPageMetadata(
  "/shop/custom-print",
  "Custom UV Print | Illustrated Alex",
  "Choose a flat-face blank and upload art for a custom UV print at Illustrated Alex in Claremont, NH. The print fee is $25 per design up to 2 inches, added to the blank.",
);

const examples = [
  {
    src: "/images/custom-print/example-iris-plugs.jpg",
    alt: "Example of a white double-flare plug with a printed iris",
    caption: "Iris UV print",
  },
  {
    src: "/images/custom-print/example-octopus-plugs.jpg",
    alt: "Example of black plugs with an octopus face print",
    caption: "Octopus UV print",
  },
  {
    src: "/images/custom-print/example-wood-skull-plugs.jpg",
    alt: "Example of wood plugs with a skull inside a labyrinth",
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
      <h1 className="font-display mt-3 max-w-3xl text-4xl leading-tight font-semibold sm:text-6xl">Custom UV-printed jewelry</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[#dbc8a7]">
        Any jewelry with a decent flat printable face can take a custom print. Choose the blank first, then upload your art. Alex prints it with his eufyMake UV printer at Illustrated Alex Tattoo &amp; Piercing in Claremont, NH.
      </p>
      <p className="mt-6 max-w-2xl rounded-2xl border border-[#d8b06d] bg-[#14110d] px-4 py-4 text-base leading-7 font-semibold text-[#f2e1c2]">
        UV print fee: $25 per design (up to 2″). Added to the price of the blank jewelry you choose.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#be9a62]">
        Wood, plastic, stone, and other flat-face plugs are not in the catalog yet. Browse{" "}
        <Link href="/shop/body-jewelry" className="text-[#e1c18c] underline underline-offset-4">
          Body Jewelry
        </Link>{" "}
        when those listings go up, or request a blank with this form. Thin posts, balls, and curved barbells are not print surfaces.
      </p>

      <section className="mt-12" aria-labelledby="uv-examples-heading">
        <h2 id="uv-examples-heading" className="font-display text-3xl font-semibold">
          Examples of our UV print work
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#dbc8a7]">Not for sale as these designs. Upload your own art.</p>
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
          <p>We UV-print your design on the flat face. Round designs work best. They sit cleanly without awkward cropping.</p>
          <p>Send high-resolution files. Per eufyMake’s UV print guidance:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Standard: at least 300 DPI at the final print size</li>
            <li>Small / detailed pieces: 400–600 DPI preferred (small-format, like stickers/badges)</li>
          </ul>
          <p className="font-semibold text-[#f0dfbf]">Minimum image size we accept</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>At least 1200 × 1200 pixels (square); higher is better</li>
            <li>For a ~1 in (25 mm) face at 600 DPI you need about 600 px across; we ask for 1200 × 1200 or larger so the same file stays sharp on larger pieces</li>
            <li>Prefer a circular / round composition centered in the frame</li>
            <li>Vector (SVG, PDF, AI) ideal. It stays sharp at any size</li>
            <li>Raster is fine: PNG (best) or high-quality JPEG. Screenshots and heavily compressed social downloads are a poor fit</li>
            <li>Do not upscale a small or blurry image. That will not add real detail</li>
          </ul>
          <p>Prints are for designs up to 2 inches. If your file is under 1200 × 1200 px or looks soft when zoomed, we may ask for a higher-res version before printing.</p>
        </div>
      </section>

      <section className="mt-12 max-w-xl">
        <h2 className="font-display text-3xl font-semibold">Request a print</h2>
        <p className="mt-3 text-sm leading-7 text-[#dbc8a7]">
          Choose the blank first, then add your art. This draft stores the file only after Vercel Blob is connected. Nothing is charged here.
        </p>
        <div className="mt-6">
          <CustomPrintForm />
        </div>
      </section>
    </div>
  );
}

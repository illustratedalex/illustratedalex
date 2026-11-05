import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { CustomPrintForm } from "@/components/shop/custom-print-form";

export const metadata = createPageMetadata(
  "/shop/custom-print",
  "Custom UV-Printed Tunnels & Gauges | Illustrated Alex",
  "Upload art for custom UV-printed tunnels and gauges at Illustrated Alex in Claremont, NH. Starting at $35 per pair.",
);

const examples = [1, 2, 3, 4, 5, 6];

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
        Upload your art or photo. Alex prints it on durable tunnels and gauges with his EufyMake UV printer at Illustrated Alex Tattoo &amp; Piercing in Claremont, NH.
      </p>
      <p className="mt-6 inline-flex rounded-full border border-[#d8b06d] bg-[#14110d] px-4 py-2 text-sm font-semibold text-[#f2e1c2]">
        Starting at $35 per pair
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#be9a62]">The final quote can change with size and the design.</p>

      <section className="mt-12">
        <h2 className="font-display text-3xl font-semibold">Examples of our work</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {examples.map((example) => (
            <li
              key={example}
              className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] px-3 text-center"
            >
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[#d8b06d] uppercase">Photos coming</span>
              <span className="mt-2 text-xs text-[#dbc8a7]">Example {example}</span>
            </li>
          ))}
        </ul>
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

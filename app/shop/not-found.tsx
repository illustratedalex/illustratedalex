import Link from "next/link";

export default function ShopNotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold">That shop page is not available.</h1>
      <Link href="/shop" className="mt-6 inline-flex min-h-11 items-center text-sm text-[#e1c18c] underline underline-offset-4">
        Back to the shop
      </Link>
    </div>
  );
}

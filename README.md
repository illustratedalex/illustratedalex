# Alexander Lawrence · Illustrated Alex

Tattoo artist and body piercer building software for tattoo artists, studios, and collectors.

## Current project

- [NeedleBook](https://needlebook.com) — tattoo artist and studio discovery, with requests, bookings, deposits, calendars, clients, and consent workflows.

## Website development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## On-site shop

`/shop` is the studio shop for body jewelry, aftercare, and merch. Pickup is at 18 Opera House Square, Claremont, NH.

Jewelry shelf prices come from the inventory draft (sell = 3× wholesale). Spirals are matched pairs only. Photos live in `public/images/jewelry/`. Items with no supplier photo say “Photo coming”. No product photo was generated.

Merch (tee, sweatshirt, hoodie, cap or beanie, sticker pack) is placeholder only. Prices are TBD. Photos are needed. Square Online did not list IA tees, hats, or stickers. Printful and Printify are not connected to this repo, this Vercel project, or the current site. Mountainside mail from 2015 shows an older Printify account. Reconnect Printify first (that history, and blanks are often cheaper) or Printful if Alex prefers that quality path and hats. Easiest path: log into the old account, export products and mockups, then put keys in host env (`PRINTIFY_API_TOKEN`, `PRINTIFY_SHOP_ID`, or `PRINTFUL_API_TOKEN`). There is no plugin for either in the Grok Bot marketplace. Do not invent product ids or API keys. Shitty Tees, Tattoo T’s, and Green Mountain Printing are separate catalogs and are not imported here.

Gift cards already exist on Square. The merch gift-card page links to that existing flow.

`/shop/custom-print` is a draft request form. The UV print fee is $25 per design up to 2 inches, added to the blank. Real uploads need `BLOB_READ_WRITE_TOKEN` on Vercel. Optional email uses `RESEND_API_KEY`, `RESEND_FROM`, and `CUSTOM_PRINT_NOTIFY_EMAIL`. The GoDaddy static build does not run that API.

### Square

Checkout creates Square Orders with `catalog_object_id` line items, then pays the total Square calculated. Payment-only amounts are refused. Sandbox and production are both allowed when `SQUARE_ENVIRONMENT` is set to that value. Variation ids are still null until the Square Item Library import lands.

The GoDaddy FTP deploy is a static export and stashes `app/api`. Vercel (`VERCEL=1`) keeps `app/api/shop/checkout`. A local sandbox server can still run the same handler:

```bash
# copy square.env.example into an untracked env file first
node --experimental-strip-types --env-file=.env.local scripts/square-sandbox-server.ts
```

Required env:

- `SQUARE_ACCESS_TOKEN` (server only, never commit, never `NEXT_PUBLIC_`)
- `SQUARE_LOCATION_ID`
- `SQUARE_APPLICATION_ID`
- `SQUARE_ENVIRONMENT=sandbox` or `production`
- `NEXT_PUBLIC_SQUARE_APPLICATION_ID`
- `NEXT_PUBLIC_SQUARE_LOCATION_ID`
- `NEXT_PUBLIC_SQUARE_ENVIRONMENT=sandbox` or `production`
- `NEXT_PUBLIC_SQUARE_CHECKOUT_URL` is optional. Vercel uses `/api/shop/checkout` when it is unset.

Until the server credentials and Catalog variation ids are set, checkout tells the customer to call the studio. The GoDaddy static deploy cannot hold the access token.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

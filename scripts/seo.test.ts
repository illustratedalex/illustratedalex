import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../data/catalog.ts";
import { productJsonLd } from "../data/product-schema.ts";
import { studioAddress, studioGeo, studioHours, studioHoursSummary } from "../data/site-content.ts";
import { studioJsonLd } from "../lib/seo.ts";

const site = "https://www.illustratedalex.com";

test("studio facts use 18 Opera House Square and published hours", () => {
  assert.equal(studioAddress.startsWith("18 Opera House Square"), true);
  assert.equal(studioAddress.includes("30 Opera"), false);
  assert.equal(studioGeo.latitude, 43.373065);
  assert.equal(studioGeo.longitude, -72.338352);
  assert.deepEqual(
    studioHours.map((row) => [row.label, row.opens, row.closes]),
    [
      ["Wednesday–Saturday", "10:00", "20:00"],
      ["Sunday", "12:00", "18:00"],
    ],
  );
  assert.match(studioHoursSummary, /Closed Monday and Tuesday/);
  assert.equal(studioJsonLd.address.streetAddress, "18 Opera House Square");
  assert.equal(studioJsonLd.geo.latitude, 43.373065);
  assert.equal(studioJsonLd.openingHoursSpecification[0].opens, "10:00");
  assert.equal(studioJsonLd.openingHoursSpecification[0].closes, "20:00");
  assert.equal(studioJsonLd.sameAs.includes("https://www.instagram.com/illustratedalex/"), true);
  assert.equal(studioJsonLd.sameAs.some((url) => url.includes("madflasher.com/studios/illustratedalex")), true);
  assert.equal(studioJsonLd.areaServed.some((area) => area.name === "Bellows Falls"), true);
});

test("product schema uses the catalog price, image, availability, and brand", () => {
  const spray = products.find((product) => product.slug === "h2ocean-piercing-spray-4oz");
  assert.ok(spray);
  const sprayLd = productJsonLd(spray, site);
  assert.ok(sprayLd);
  assert.equal(sprayLd.name, spray.title);
  assert.equal(sprayLd.brand.name, "H2Ocean");
  assert.equal(sprayLd.offers["@type"], "Offer");
  assert.equal(sprayLd.offers.price, "16.00");
  assert.equal(sprayLd.offers.priceCurrency, "USD");
  assert.equal(sprayLd.offers.availability, "https://schema.org/OutOfStock");
  assert.equal(sprayLd.image[0], `${site}${spray.image}`);

  const rinse = products.find((product) => product.slug === "h2ocean-healing-rinse-8oz");
  assert.equal(productJsonLd(rinse!, site)?.offers.availability, "https://schema.org/LimitedAvailability");

  const mug = products.find((product) => product.slug === "illustrated-alex-white-glossy-mug");
  const mugLd = productJsonLd(mug!, site);
  assert.ok(mugLd);
  assert.equal(mugLd.brand.name, "Illustrated Alex");
  assert.equal(mugLd.offers["@type"], "AggregateOffer");
  assert.equal(mugLd.offers.lowPrice, "18.00");
  assert.equal(mugLd.offers.highPrice, "22.00");
  assert.equal(mugLd.offers.availability, "https://schema.org/InStock");

  const gift = products.find((product) => product.slug === "illustrated-alex-gift-card");
  assert.equal(productJsonLd(gift!, site), null);

  const industrial = products.find((product) => product.sku === "IB-036");
  assert.equal(industrial?.category, "industrial");
  assert.equal(productJsonLd(industrial!, site)?.offers.availability, "https://schema.org/InStock");
});

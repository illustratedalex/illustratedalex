import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { categories, categoriesFor, products } from "../data/catalog.ts";
import {
  assertSandboxServer,
  buildCatalogOrderRequest,
  decideCheckout,
  resolveCatalogLines,
} from "../lib/square/checkout.ts";

const jewelryPrices: Record<string, number> = {
  "IA-BLUE-SPIRAL-PAIR": 570,
  "OT-194": 810,
  "T-BA-649": 972,
  "MO-359": 876,
  "T-MO-402": 1176,
  "T-MO-403": 1296,
  "T-MO-385": 1200,
  "T-MO-395": 1596,
  "LA-099": 168,
  "EY-012": 171,
  "IB-036": 60,
  "BA-002": 141,
  "LA-054": 126,
  "LA-074": 108,
  "LA-024": 81,
  "MO-010": 81,
};

test("jewelry shelf prices match the inventory draft", () => {
  for (const [sku, cents] of Object.entries(jewelryPrices)) {
    const product = products.find((entry) => entry.sku === sku);
    assert.ok(product, sku);
    assert.equal(product.priceCents, cents);
    assert.equal(product.fulfillment, "square-catalog");
    assert.equal(product.variants.every((variant) => variant.squareCatalogVariationId === null), true);
  }
});

test("merch stays unpriced and has no print-on-demand ids", () => {
  const merch = products.filter((product) => product.department === "merch");
  assert.deepEqual(
    merch.map((product) => product.sku).sort(),
    [
      "IA-MERCH-CAP",
      "IA-MERCH-GIFT-CARD",
      "IA-MERCH-HOODIE",
      "IA-MERCH-STICKERS",
      "IA-MERCH-SWEATSHIRT",
      "IA-MERCH-TEE",
    ],
  );
  for (const product of merch) {
    assert.equal(product.priceCents, null);
    assert.equal(JSON.stringify(product).includes("printful_"), false);
    assert.equal(JSON.stringify(product).includes("printify_"), false);
  }
  for (const sku of ["IA-MERCH-TEE", "IA-MERCH-SWEATSHIRT", "IA-MERCH-HOODIE"]) {
    const product = products.find((entry) => entry.sku === sku);
    assert.equal(product?.photoStatus, "needed");
    assert.equal(product?.reconnect, "Printify or Printful");
  }
});

test("category children are alphabetical", () => {
  for (const department of ["aftercare", "body-jewelry", "merch"] as const) {
    const names = categoriesFor(department).map((category) => category.name);
    assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b)));
  }
  assert.deepEqual(
    categories.filter((category) => category.department === "body-jewelry").map((category) => category.name),
    ["Ear", "Eyebrow", "Industrial", "Lip / Labret", "Navel", "Nipples", "Nose", "Septum", "Tongue"],
  );
});

test("ready photos exist and missing photos are not invented", () => {
  for (const product of products) {
    if (product.photoStatus === "ready" || product.photoStatus === "mockup") {
      assert.ok(product.image);
      assert.equal(existsSync(path.join(process.cwd(), "public", product.image)), true);
    } else {
      assert.equal(product.image, null);
    }
  }

  const spirals = products.find((product) => product.sku === "IA-BLUE-SPIRAL-PAIR");
  assert.equal(spirals?.image, "/images/jewelry/ocean-blue-glitter-acrylic-spiral-tapers-alex.jpg");
  assert.equal(spirals?.photoStatus, "ready");

  const approved = {
    "T-BA-649": "/images/jewelry/belly-double-flat-cz-model-01.jpg",
    "MO-359": "/images/jewelry/tragus-leaf-cz-gold-model-01.jpg",
    "T-MO-395": "/images/jewelry/labret-petal-flower-gold-model-01.jpg",
  };
  for (const [sku, image] of Object.entries(approved)) {
    const product = products.find((entry) => entry.sku === sku);
    assert.equal(product?.photoStatus, "mockup");
    assert.equal(product?.image, image);
  }
});

test("checkout refuses production, missing credentials, and ad-hoc lines", () => {
  assert.equal(decideCheckout({ environment: "production", applicationId: "app", locationId: "loc", checkoutUrl: "http://127.0.0.1/checkout", lines: [] }).ready, false);
  assert.match(
    decideCheckout({ environment: undefined, applicationId: undefined, locationId: undefined, checkoutUrl: undefined, lines: [] }).reason,
    /Checkout pending Square credentials/,
  );
  assert.equal(assertSandboxServer({ environment: "production", accessToken: "token", locationId: "loc" }).ok, false);

  const blocked = resolveCatalogLines([{ sku: "T-BA-649", variantId: "12mm", quantity: 1 }], products);
  assert.equal(blocked.ok, false);
  if (!blocked.ok) assert.equal(blocked.status, 409);

  const order = buildCatalogOrderRequest({
    locationId: "LOC",
    idempotencyKey: "idem-key-1",
    lines: [{ catalog_object_id: "VARIATION", quantity: "1" }],
  });
  const serialized = JSON.stringify(order);
  assert.match(serialized, /catalog_object_id/);
  assert.equal(serialized.includes("base_price_money"), false);
  assert.equal(serialized.includes("amount_money"), false);
});

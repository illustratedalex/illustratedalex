import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { canAddToCart, categories, categoriesFor, displaySku, products, stockNotice } from "../data/catalog.ts";
import {
  assertCheckoutServer,
  buildCatalogOrderRequest,
  decideCheckout,
  resolveCatalogLines,
  squareConnectOrigin,
} from "../lib/square/checkout.ts";

const jewelryPrices: Record<string, number> = {
  "IA-BLUE-SPIRAL-PAIR": 570,
  "OT-194": 810,
  "T-BA-649": 972,
  "MO-359": 876,
  "T-MO-402": 1176,
  "T-MO-403": 1296,
  "T-MO-395": 1596,
  "LA-099": 499,
  "EY-012": 499,
  "IB-036": 499,
  "BA-002": 499,
  "LA-054": 499,
  "LA-024": 499,
  "MO-010": 499,
};

test("jewelry shelf prices match the inventory draft", () => {
  for (const [sku, cents] of Object.entries(jewelryPrices)) {
    const product = products.find((entry) => entry.sku === sku);
    assert.ok(product, sku);
    assert.equal(product.priceCents, cents);
    assert.equal(product.fulfillment, "square-catalog");
    assert.equal(product.variants.every((variant) => /^[A-Z0-9]{24}$/.test(variant.squareCatalogVariationId ?? "")), true);
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

test("jewelry listings keep the vendor reorder SKU", () => {
  const vendorSkus = ["T-BA-649", "MO-359", "T-MO-395", "T-MO-402", "T-MO-403", "BA-002", "IB-036", "LA-099", "EY-012", "OT-194", "LA-024", "MO-010", "LA-054", "LA-074"];
  assert.equal(products.some((entry) => entry.sku === "T-MO-385"), false);
  for (const sku of vendorSkus) {
    const product = products.find((entry) => entry.sku === sku);
    assert.ok(product, sku);
    assert.equal(displaySku(product), sku);
    assert.equal(product.department, "body-jewelry");
  }
  const spirals = products.find((product) => product.slug === "ocean-blue-glitter-spiral-tapers");
  assert.equal(displaySku(spirals!), null);
  assert.equal(displaySku(products.find((entry) => entry.sku === "90752-001")!), "90752-001");
  assert.equal(displaySku(products.find((entry) => entry.sku === "90773-010")!), "90773-010");
  assert.equal(displaySku(products.find((entry) => entry.sku === "90901-510")!), "90901-510");
  assert.equal(displaySku(products.find((entry) => entry.slug === "recovery-mouth-rinse-8oz")!), "MED-048");
  const spray = products.find((entry) => entry.sku === "90752-001");
  assert.equal(spray?.priceCents, 1600);
  assert.equal(spray?.featured, true);
  assert.equal(spray?.category, "piercing-aftercare");
  assert.equal(products.find((entry) => entry.sku === "90773-010")?.priceCents, 1200);
  assert.equal(products.find((entry) => entry.sku === "90901-510")?.priceCents, 1000);
  assert.equal(products.find((entry) => entry.sku === "MED-048")?.priceCents, 1000);
  assert.equal(products.find((entry) => entry.sku === "90752-001")?.stockCount, 0);
  assert.equal(products.find((entry) => entry.sku === "90773-010")?.stockCount, 0);
  assert.equal(canAddToCart(products.find((entry) => entry.sku === "90752-001")!), false);
  assert.equal(products.find((entry) => entry.sku === "90901-510")?.stockCount, null);
  assert.equal(products.find((entry) => entry.sku === "MED-048")?.stockCount, null);
  assert.equal(spirals?.stockCount, 5);
  assert.equal(spirals?.unit, "pair");
  assert.equal(canAddToCart(spirals!), true);
  assert.equal(canAddToCart(products.find((entry) => entry.sku === "T-BA-649")!), false);
  assert.equal(products.find((entry) => entry.sku === "BA-002")?.stockCount, 82);
  assert.equal(canAddToCart(products.find((entry) => entry.sku === "BA-002")!), true);
  assert.equal(products.find((entry) => entry.sku === "IB-036")?.stockCount, 116);
  assert.equal(products.find((entry) => entry.sku === "MO-010")?.stockCount, 49);
  assert.equal(canAddToCart(products.find((entry) => entry.sku === "MO-010")!), true);
  assert.equal(products.find((entry) => entry.sku === "spike_horseshoe")?.stockCount, 170);
  assert.equal(products.find((entry) => entry.sku === "ball_horseshoe")?.stockCount, 133);
  const sealed = {
    "VNO-25-ST": [499, 7, "nose"],
    "VH-003-3": [499, 3, "lip-labret"],
    "VH-003-4": [499, 18, "septum"],
    "VJ-016-OP06": [499, 3, "eyebrow"],
    "VJ-016-OP17": [499, 5, "septum"],
  } as const;
  for (const [sku, [cents, qty, category]] of Object.entries(sealed)) {
    const product = products.find((entry) => entry.sku === sku);
    assert.ok(product, sku);
    assert.equal(product.priceCents, cents);
    assert.equal(product.stockCount, qty);
    assert.equal(product.category, category);
    assert.equal(canAddToCart(product), true);
    assert.equal(displaySku(product), sku);
  }
  assert.equal(products.find((entry) => entry.sku === "VNO-25-ST")?.image, "/images/jewelry/mfg-steel-ball-l-bend-nose-stud.jpg");
  assert.equal(products.find((entry) => entry.sku === "VJ-016-OP06")?.image, null);
  assert.equal(products.find((entry) => entry.sku === "VJ-016-OP06")?.photoStatus, "needed");
  assert.equal(products.find((entry) => entry.sku === "NS40-LFK")?.image, "/images/jewelry/mfg-ns40-lfk.jpg");
  assert.notEqual(products.find((entry) => entry.sku === "NS40-LFK")?.image, products.find((entry) => entry.sku === "NS40-SME")?.image);
  assert.equal(products.find((entry) => entry.sku === "LA-024")?.stockCount, null);
  assert.equal(canAddToCart(products.find((entry) => entry.sku === "LA-024")!), false);
  assert.equal(products.find((entry) => entry.sku === "OUFER moon 2PCS")?.priceCents, 2001);
  assert.equal(displaySku(products.find((entry) => entry.sku === "OUFER moon 2PCS")!), "OUFER moon 2PCS");
  assert.equal(products.find((entry) => entry.sku === "BLUEGREENFOAMSOAP")?.stockCount, 4);
  assert.equal(displaySku(products.find((entry) => entry.sku === "NS40-LFK")!), "NS40-LFK");
  assert.equal(displaySku(products.find((entry) => entry.sku === "spike_horseshoe")!), null);
  assert.equal(products.filter((entry) => entry.sku === "spike_horseshoe" || entry.sku === "NS40-SWW?" || entry.sku === "ABBUV-type").length, 3);
  assert.equal(products.some((entry) => entry.sku.toLowerCase().includes("jump")), false);
  assert.equal(canAddToCart(products.find((entry) => entry.sku === "90901-510")!), false);
  const whiteBlanks = products.find((entry) => entry.sku === "IA-WHITE-BLANK-PLUGS");
  const blackBlanks = products.find((entry) => entry.sku === "IA-BLACK-BLANK-PLUGS");
  const woodBlanks = products.find((entry) => entry.sku === "IA-WOOD-BLANK-PLUGS");
  assert.equal(whiteBlanks?.priceCents, 499);
  assert.equal(whiteBlanks?.unit, "pair");
  assert.equal(whiteBlanks?.stockCount, 4);
  assert.equal(whiteBlanks?.customPrintEligible, true);
  assert.equal(whiteBlanks?.image, "/images/jewelry/white-acrylic-blank-plugs-clean.jpg");
  assert.equal(blackBlanks?.image, "/images/jewelry/black-acrylic-blank-plugs-clean.jpg");
  assert.equal(woodBlanks?.image, "/images/jewelry/dark-wood-blank-plugs-clean.jpg");
  for (const product of [whiteBlanks, blackBlanks, woodBlanks]) {
    for (const shot of product?.gallery ?? []) {
      assert.equal(existsSync(path.join(process.cwd(), "public", shot.src)), true, shot.src);
    }
  }
  assert.equal(`${blackBlanks?.imageAlt} ${blackBlanks?.description}`.toLowerCase().includes("shared"), false);
  assert.equal(JSON.stringify(products).toLowerCase().includes("achadirect"), false);
  assert.equal(canAddToCart(whiteBlanks!), true);
  assert.equal(blackBlanks?.priceCents, 499);
  assert.equal(blackBlanks?.stockCount, 4);
  assert.equal(woodBlanks?.priceCents, 774);
  assert.equal(woodBlanks?.stockCount, 2);
  assert.equal(woodBlanks?.customPrintEligible, true);
  assert.equal(products.some((entry) => entry.sku.includes("IRIS") || entry.sku.includes("OCTOPUS") || entry.sku.includes("SKULL")), false);

  const apmPhotos: Record<string, string> = {
    "T-MO-402": "/images/jewelry/T-MO-402-g23-ti-cz-dangle-cone-labret.jpg",
    "T-MO-403": "/images/jewelry/T-MO-403-g23-gold-pvd-ti-cz-dangle-cone-labret.jpg",
    "BA-002": "/images/jewelry/mfg-steel-clear-double-gem-belly.jpg",
    "IB-036": "/images/jewelry/mfg-steel-industrial-barbell.jpg",
    "LA-099": "/images/jewelry/apm-la-099-xl-cz-cheek.jpg",
    "EY-012": "/images/jewelry/mfg-steel-internal-curved-barbell.jpg",
  };
  for (const [sku, image] of Object.entries(apmPhotos)) {
    const product = products.find((entry) => entry.sku === sku);
    assert.equal(product?.image, image);
    assert.equal(existsSync(path.join(process.cwd(), "public", image)), true);
  }
  assert.equal(products.find((entry) => entry.sku === "T-BA-649")?.image, "/images/jewelry/belly-double-flat-cz-model-01.jpg");
  assert.equal(products.find((entry) => entry.sku === "MO-359")?.image, "/images/jewelry/tragus-leaf-cz-gold-model-01.jpg");
  assert.equal(products.find((entry) => entry.sku === "T-MO-395")?.image, "/images/jewelry/labret-petal-flower-gold-model-01.jpg");

  const cheek = products.find((entry) => entry.sku === "LA-074");
  assert.deepEqual(
    cheek?.variants.map((variant) => [variant.id, variant.priceCents]),
    [
      ["25mm", 499],
      ["22mm", 499],
      ["19mm", 499],
      ["16mm", 499],
    ],
  );
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
    if (product.photoStatus === "ready") {
      assert.ok(product.image);
      assert.equal(existsSync(path.join(process.cwd(), "public", product.image)), true);
      for (const shot of product.gallery ?? []) {
        assert.equal(existsSync(path.join(process.cwd(), "public", shot.src)), true, shot.src);
      }
    } else {
      assert.equal(product.image, null);
      assert.equal(product.gallery?.length ?? 0, 0);
    }
    const paths = [product.image, ...(product.gallery ?? []).map((shot) => shot.src)].filter(Boolean).join(" ");
    assert.equal(/tray-|sealed-packs|belly-novelty|barbell-display|gem-belly-board|pregnancy-belly|oufer-moon-nipple-2026|blank-from-|labret-hand/.test(paths), false, product.slug);
  }

  const spirals = products.find((product) => product.sku === "IA-BLUE-SPIRAL-PAIR");
  assert.equal(spirals?.image, "/images/jewelry/mfg-blue-glitter-spiral-single.jpg");
  assert.equal(spirals?.gallery?.length ?? 0, 0);
  assert.equal(spirals?.photoStatus, "ready");
  assert.equal(spirals?.stockCount, 5);

  const approved = {
    "T-BA-649": "/images/jewelry/belly-double-flat-cz-model-01.jpg",
    "MO-359": "/images/jewelry/tragus-leaf-cz-gold-model-01.jpg",
    "T-MO-395": "/images/jewelry/labret-petal-flower-gold-model-01.jpg",
  };
  for (const [sku, image] of Object.entries(approved)) {
    const product = products.find((entry) => entry.sku === sku);
    assert.ok(product);
    assert.equal(product.photoStatus, "ready");
    assert.equal(product.image, image);
    const copy = `${product.title} ${product.description} ${product.imageAlt}`.toLowerCase();
    assert.equal(copy.includes("mock"), false);
    assert.equal(copy.includes("ai "), false);
    assert.equal(copy.includes("generated"), false);
  }
});

test("shelf prices stay at or above $4.99 and descriptions stay customer-facing", () => {
  const banned = /photo count|on hand|studio case photo|leftover held|inventory draft|price tbd|photo needed|draft count|wholesale/i;
  for (const product of products) {
    if (product.priceCents !== null) assert.ok(product.priceCents >= 499, product.sku);
    for (const variant of product.variants) {
      if (variant.priceCents !== undefined) assert.ok(variant.priceCents >= 499, `${product.sku} ${variant.id}`);
    }
    assert.equal(banned.test(product.description), false, product.slug);
    assert.equal(banned.test(product.materials.join(" ")), false, product.slug);
    assert.equal(banned.test(product.title), false, product.slug);
    const notice = stockNotice(product);
    if (product.externalHref) {
      assert.equal(notice, null);
    } else {
      assert.ok(notice);
      assert.equal(/photo count|on hand|leftover|tbd/i.test(notice.label), false, product.slug);
    }
  }
  assert.equal(products.find((entry) => entry.sku === "LA-074")?.priceCents, null);
  assert.equal(products.find((entry) => entry.sku === "MO-010")?.stockCount, 49);
  assert.equal(products.find((entry) => entry.sku === "BA-002")?.variants.find((variant) => variant.id === "clear")?.stockCount, 24);
});

test("priced listings use the live Square variation ids", () => {
  const map = JSON.parse(readFileSync(path.join(process.cwd(), "data/square-variation-ids.json"), "utf8")) as Record<
    string,
    Record<string, { squareCatalogVariationId: string }>
  >;
  const priced = products.filter((product) => product.priceCents !== null || product.variants.some((variant) => variant.priceCents !== undefined));
  assert.equal(priced.length, 68);
  assert.equal(Object.keys(map).length, 68);
  let variations = 0;
  for (const product of priced) {
    assert.ok(map[product.slug], product.slug);
    for (const variant of product.variants) {
      const expected = map[product.slug][variant.id];
      assert.ok(expected, `${product.slug} ${variant.id}`);
      assert.equal(variant.squareCatalogVariationId, expected.squareCatalogVariationId);
      assert.match(variant.squareCatalogVariationId ?? "", /^[A-Z0-9]{24}$/);
      const cents = variant.priceCents ?? product.priceCents;
      assert.ok(cents !== null && cents >= 499, `${product.slug} ${variant.id}`);
      variations += 1;
    }
  }
  assert.equal(variations, 111);
  const merch = products.filter((product) => product.sku.startsWith("IA-MERCH-"));
  assert.equal(merch.length, 6);
  for (const product of merch) {
    assert.equal(product.priceCents, null);
    assert.equal(product.variants.every((variant) => variant.squareCatalogVariationId === null), true);
  }
});

test("checkout allows sandbox and production catalog orders, and refuses ad-hoc lines", () => {
  const linked = [{ squareCatalogVariationId: "VARIATION" }];
  assert.equal(
    decideCheckout({ environment: "production", applicationId: "app", locationId: "loc", checkoutUrl: "/api/shop/checkout", lines: linked }).ready,
    true,
  );
  assert.equal(
    decideCheckout({ environment: "sandbox", applicationId: "app", locationId: "loc", checkoutUrl: "/api/shop/checkout", lines: linked }).ready,
    true,
  );
  assert.equal(
    decideCheckout({ environment: "production", applicationId: "app", locationId: "loc", checkoutUrl: "/api/shop/checkout", lines: [] }).ready,
    false,
  );
  assert.match(
    decideCheckout({ environment: undefined, applicationId: undefined, locationId: undefined, checkoutUrl: undefined, lines: [] }).reason,
    /call \(603\) 843-7005/,
  );
  assert.equal(decideCheckout({ environment: "production", applicationId: "app", locationId: "loc", checkoutUrl: "/api/shop/checkout", lines: [{ squareCatalogVariationId: null }] }).ready, false);
  assert.equal(assertCheckoutServer({ environment: "production", accessToken: "token", locationId: "loc" }).ok, true);
  assert.equal(assertCheckoutServer({ environment: "sandbox", accessToken: "token", locationId: "loc" }).ok, true);
  assert.equal(assertCheckoutServer({ environment: "staging", accessToken: "token", locationId: "loc" }).ok, false);
  assert.equal(squareConnectOrigin("production"), "https://connect.squareup.com");
  assert.equal(squareConnectOrigin("sandbox"), "https://connect.squareupsandbox.com");

  const blocked = resolveCatalogLines(
    [{ sku: "T-BA-649", variantId: "12mm", quantity: 1 }],
    [{ sku: "T-BA-649", variants: [{ id: "12mm", squareCatalogVariationId: null }] }],
  );
  assert.equal(blocked.ok, false);
  if (!blocked.ok) assert.equal(blocked.status, 409);
  const resolvedLine = resolveCatalogLines([{ sku: "T-BA-649", variantId: "12mm", quantity: 1 }], products);
  assert.equal(resolvedLine.ok, true);
  if (resolvedLine.ok) assert.equal(resolvedLine.lines[0]?.catalog_object_id, "HQWMSMAMSBL6OE4XQ2WDNLP7");

  const order = buildCatalogOrderRequest({
    locationId: "LOC",
    idempotencyKey: "idem-key-1",
    lines: [{ catalog_object_id: "VARIATION", quantity: "1" }],
  });
  const serialized = JSON.stringify(order);
  assert.match(serialized, /catalog_object_id/);
  assert.equal(serialized.includes("base_price_money"), false);
  assert.equal(serialized.includes("amount_money"), false);
  assert.equal(serialized.includes("fulfillments"), false);

  const pickup = buildCatalogOrderRequest({
    locationId: "LOC",
    idempotencyKey: "idem-key-1",
    lines: [{ catalog_object_id: "VARIATION", quantity: "1" }],
    pickup: { displayName: "Alex Studio", email: "alex@illustratedalex.com", phone: "(603) 843-7005" },
  });
  const pickupJson = JSON.stringify(pickup);
  assert.match(pickupJson, /"type":"PICKUP"/);
  assert.match(pickupJson, /"schedule_type":"ASAP"/);
  assert.match(pickupJson, /"display_name":"Alex Studio"/);
  assert.match(pickupJson, /"phone_number":"\+16038437005"/);
  assert.equal(pickupJson.includes("base_price_money"), false);
  assert.equal(pickupJson.includes("amount_money"), false);

  const shopCopy = [
    "components/shop/shop-chrome.tsx",
    "components/shop/checkout-client.tsx",
    "components/shop/cart-view.tsx",
    "app/shop/page.tsx",
    "app/shop/cart/page.tsx",
    "app/shop/checkout/page.tsx",
    "app/shop/custom-print/page.tsx",
    "lib/square/checkout.ts",
    "server/square-checkout-handler.ts",
  ];
  for (const file of shopCopy) {
    const text = readFileSync(path.join(process.cwd(), file), "utf8");
    assert.equal(text.includes("Preview catalog"), false, file);
    assert.equal(text.includes("Production charges are disabled"), false, file);
    assert.equal(text.includes("Pay in sandbox"), false, file);
  }
});

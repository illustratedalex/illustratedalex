import { AFTERCARE_SHOP_URL } from "@/data/site-content";

export type TattooAftercareStep = {
  title: string;
  body: string;
};

export type PiercingAftercareItem = {
  id: string;
  name: string;
  healingEstimate: string;
  cleaning: string;
  avoid: string;
  studioNote: string;
};

export const tattooAftercareSteps: TattooAftercareStep[] = [
  {
    title: "Leave the Tegaderm on",
    body: "Leave the Tegaderm bandage on for the amount of time Alex recommends for your tattoo. For many tattoos, this may be several days, but timing can vary based on the size, placement, skin, and how much fluid collects under the bandage.",
  },
  {
    title: "Fluid under the bandage is normal",
    body: "It is normal to see ink, plasma, or fluid collect under the film. This can look dark, blurry, or wet. Do not panic and do not poke holes in the bandage.",
  },
  {
    title: "Remove early if needed",
    body: "Remove the bandage early if it leaks, peels open, exposes the tattoo, causes a rash, burns, severe irritation, or feels wrong. Once the seal is broken, the bandage should not be left on.",
  },
  {
    title: "How to remove",
    body: "Wash your hands first. Remove the film slowly, ideally in a warm shower. Stretch the film gently back over itself instead of ripping it straight away from the skin.",
  },
  {
    title: "Wash the tattoo",
    body: "Wash gently with clean hands and mild fragrance-free soap. Rinse well. Pat dry with a clean paper towel or let air dry.",
  },
  {
    title: "After the bandage is off",
    body: "Apply a very thin layer of approved tattoo aftercare or fragrance-free lotion as needed. Do not over-moisturize.",
  },
  {
    title: "Avoid while healing",
    body: "Avoid soaking, swimming, hot tubs, sun exposure, tanning, scratching, picking, dirty environments, and tight abrasive clothing until healed.",
  },
  {
    title: "When to contact the studio",
    body: "Contact the studio if you are unsure about the bandage, healing, irritation, leaking, or aftercare timing.",
  },
];

export const piercingAftercareItems: PiercingAftercareItem[] = [
  {
    id: "ear-lobe",
    name: "Ear Lobe",
    healingEstimate: "Often several months for full healing.",
    cleaning: "Spray front and back with sterile saline. Dry gently.",
    avoid: "Do not twist jewelry. Avoid sleeping directly on it, headphones that press on it, and dirty hair/products.",
    studioNote: "Downsizing may be recommended if initial jewelry feels long after swelling goes down.",
  },
  {
    id: "ear-cartilage",
    name: "Ear Cartilage",
    healingEstimate: "Cartilage piercings often take several months to a year.",
    cleaning: "Saline spray and gentle drying. Keep hair and products away.",
    avoid: "Do not sleep on it. Avoid helmets, headphones, hats, and pressure.",
    studioNote: "Bumps are often irritation-related. Text before changing jewelry or trying random products.",
  },
  {
    id: "nostril",
    name: "Nostril",
    healingEstimate: "Several months or longer.",
    cleaning: "Spray outside with saline. Let warm shower water loosen buildup. Dry gently.",
    avoid: "Makeup, face products, snagging towels, and touching/twisting.",
    studioNote: "Do not remove jewelry if irritated. Text first.",
  },
  {
    id: "septum",
    name: "Septum",
    healingEstimate: "Often a few months.",
    cleaning: "Saline as needed. Let warm water loosen buildup.",
    avoid: "Flipping constantly, twisting, makeup/facial products, and rough nose blowing.",
    studioNote: "Some tenderness and crusting can be normal early on.",
  },
  {
    id: "eyebrow",
    name: "Eyebrow",
    healingEstimate: "Several months.",
    cleaning: "Saline spray and dry gently.",
    avoid: "Makeup, skincare products, sleeping pressure, and snagging.",
    studioNote: "Watch for migration or rejection signs and text the studio if jewelry looks like it is moving.",
  },
  {
    id: "lip-labret",
    name: "Lip / Labret",
    healingEstimate: "Several months.",
    cleaning: "Clean outside with sterile saline. Rinse mouth with clean water after eating/drinking anything besides water.",
    avoid: "Smoking/vaping if possible, spicy foods early on, oral contact, makeup, and playing with jewelry.",
    studioNote: "Swelling is common early. Jewelry downsizing is often important.",
  },
  {
    id: "tongue",
    name: "Tongue",
    healingEstimate: "Initial swelling improves first, but full healing takes longer.",
    cleaning: "Rinse with clean water after eating/drinking anything besides water. Use alcohol-free mouth rinse only if recommended.",
    avoid: "Alcohol, spicy foods, oral contact, smoking/vaping if possible, and playing with jewelry.",
    studioNote: "Initial long jewelry usually needs downsizing once swelling goes down.",
  },
  {
    id: "navel",
    name: "Navel",
    healingEstimate: "Often several months to a year.",
    cleaning: "Saline spray and dry gently.",
    avoid: "High-waisted tight clothing, belts, waistbands, sleeping pressure, soaking/swimming early on.",
    studioNote: "Navel piercings can be irritated by pressure and movement. Text if redness or migration appears.",
  },
  {
    id: "nipple",
    name: "Nipple",
    healingEstimate: "Often 6-12 months or longer.",
    cleaning: "Saline spray and dry gently.",
    avoid: "Rough contact, tight bras/clothing, loofahs, sleeping pressure, oral contact, and soaking.",
    studioNote: "Some crusting is normal. Sudden swelling, severe pain, or discharge should be checked.",
  },
  {
    id: "dermal-surface-anchor",
    name: "Dermal / Surface Anchor",
    healingEstimate: "Varies and requires careful pressure management.",
    cleaning: "Saline spray and dry gently.",
    avoid: "Snagging, pressure, makeup/skincare, sleeping on it, and bumping it.",
    studioNote: "Watch for lifting, rejection, or movement. Text the studio early if it changes.",
  },
  {
    id: "surface-piercing",
    name: "Surface Piercing",
    healingEstimate: "Varies and is more prone to pressure/migration.",
    cleaning: "Saline spray and dry gently.",
    avoid: "Pressure, snagging, tight clothing, sleeping on it, and friction.",
    studioNote: "Surface piercings need careful monitoring. Text if jewelry starts shifting or skin thins.",
  },
  {
    id: "general-piercing",
    name: "General Piercing",
    healingEstimate: "Healing time varies by piercing and body.",
    cleaning: "Wash hands first. Spray with sterile saline wound wash. Let it sit briefly, then gently dry with clean gauze or a clean paper towel.",
    avoid: "Do not twist, rotate, pick, sleep on it, use alcohol, peroxide, ointments, or harsh soaps.",
    studioNote: "Text the studio if swelling, jewelry fit, irritation, or placement feels off.",
  },
];

export const PIERCING_AFTERCARE_SHOP_URL = AFTERCARE_SHOP_URL;

export const runtime = "nodejs";

const MATERIALS = new Set(["wood", "plastic-acrylic", "stone", "metal-flat", "other-flat"]);

const MATERIAL_LABELS: Record<string, string> = {
  wood: "Wood",
  "plastic-acrylic": "Plastic / acrylic",
  stone: "Stone",
  "metal-flat": "Metal flat-face plug or tunnel",
  "other-flat": "Other flat-face jewelry",
};

type OrderBody = {
  phase?: string;
  imageUrl?: string;
  name?: string;
  email?: string;
  phone?: string;
  material?: string;
  materialDetail?: string;
  size?: string;
  quantity?: number;
  notes?: string;
};

function isBlobUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character] ?? character;
  });
}

async function notifyStudio(input: { id: string; imageUrl: string; fields: Record<string, string> }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.CUSTOM_PRINT_NOTIFY_EMAIL;
  if (!apiKey || !from || !to) {
    return { emailed: false as const, reason: "Email is not configured." };
  }

  const rows = Object.entries(input.fields)
    .map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value) || "—"}</td></tr>`)
    .join("");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `custom-print/${input.id}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Custom UV print request ${input.id}`,
      html: `<p>New custom UV-print request.</p><p><a href="${escapeHtml(input.imageUrl)}">Open the uploaded art</a></p><table>${rows}</table>`,
    }),
  });

  if (!response.ok) return { emailed: false as const, reason: "The studio email could not be sent." };
  return { emailed: true as const };
}

export async function POST(request: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { ok: false, draft: true, error: "Draft: wire BLOB_READ_WRITE_TOKEN to store uploads." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as OrderBody | null;
  if (!body) return Response.json({ ok: false, error: "The form could not be read." }, { status: 400 });

  if (body.phase === "check") return Response.json({ ok: true, ready: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const material = clean(body.material, 40);
  const materialDetail = clean(body.materialDetail, 160);
  const size = clean(body.size, 80);
  const notes = clean(body.notes, 2000);
  const quantity = body.quantity;
  const imageUrl = clean(body.imageUrl, 500);

  if (!name || !email.includes("@") || !email.includes(".")) {
    return Response.json({ ok: false, error: "Name and a valid email are required." }, { status: 400 });
  }
  if (!MATERIALS.has(material)) {
    return Response.json({ ok: false, error: "Choose a blank material." }, { status: 400 });
  }
  if (material === "other-flat" && !materialDetail) {
    return Response.json({ ok: false, error: "Describe the other flat-face jewelry." }, { status: 400 });
  }
  if (!size) return Response.json({ ok: false, error: "Size or gauge is required." }, { status: 400 });
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return Response.json({ ok: false, error: "Quantity must be a whole number of pairs from 1 to 20." }, { status: 400 });
  }
  if (!isBlobUrl(imageUrl)) {
    return Response.json({ ok: false, error: "The art upload did not finish." }, { status: 400 });
  }

  const id = crypto.randomUUID().slice(0, 8);
  const notice = await notifyStudio({
    id,
    imageUrl,
    fields: {
      Name: name,
      Email: email,
      Phone: phone,
      Blank: `${MATERIAL_LABELS[material] ?? material}${materialDetail ? ` — ${materialDetail}` : ""}`,
      Size: size,
      Pairs: String(quantity),
      Notes: notes,
    },
  });

  return Response.json({
    ok: true,
    draft: false,
    id,
    imageUrl,
    emailed: notice.emailed,
    message: notice.emailed
      ? "Request sent. Alex will reply with a final quote."
      : "Art was stored. Studio email is not connected yet, so text the studio and mention this request.",
  });
}

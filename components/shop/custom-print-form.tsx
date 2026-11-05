"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState, type FormEvent } from "react";

const MAX_BYTES = 10 * 1024 * 1024;
const MIN_EDGE = 1200;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

const fieldClass =
  "mt-2 block min-h-11 w-full rounded-xl border border-[#7d5b2e] bg-[#14110d] px-3 text-sm text-[#f0dfbf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]";

type Status = { tone: "draft" | "ok" | "error"; message: string } | null;

export function CustomPrintForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [material, setMaterial] = useState("wood");
  const [materialDetail, setMaterialDetail] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileWarning, setFileWarning] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  function setPreview(next: string | null) {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = next;
    setPreviewUrl(next);
  }

  function chooseFile(next: File | null) {
    setStatus(null);
    setFileWarning(null);
    if (!next) {
      setFile(null);
      setFileError(null);
      setPreview(null);
      return;
    }
    if (!ACCEPTED.includes(next.type)) {
      setFile(null);
      setPreview(null);
      setFileError("Use a JPG, PNG, or WebP image.");
      return;
    }
    if (next.size > MAX_BYTES) {
      setFile(null);
      setPreview(null);
      setFileError("That file is over 10MB.");
      return;
    }
    setFileError(null);
    setFile(next);
    const url = URL.createObjectURL(next);
    setPreview(url);
    const image = new Image();
    image.onload = () => {
      if (image.naturalWidth < MIN_EDGE || image.naturalHeight < MIN_EDGE) {
        setFileWarning(
          `This image is ${image.naturalWidth} × ${image.naturalHeight} px. We ask for at least 1200 × 1200 px so the print stays sharp. You can still send it, and we may ask for a higher-res file before printing.`,
        );
      }
    };
    image.src = url;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    if (material === "other-flat" && !materialDetail.trim()) {
      setStatus({ tone: "error", message: "Describe the other flat-face jewelry." });
      return;
    }
    if (!size.trim()) {
      setStatus({ tone: "error", message: "Add the size or gauge." });
      return;
    }
    if (!file) {
      setFileError("Add the art or photo to print.");
      return;
    }
    setSending(true);
    try {
      const ready = await fetch("/api/shop/custom-print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase: "check" }),
      });
      if (ready.status === 404) {
        setStatus({
          tone: "draft",
          message: "Draft: this static host cannot store uploads. On Vercel, wire BLOB_READ_WRITE_TOKEN.",
        });
        return;
      }
      const readyPayload = (await ready.json().catch(() => null)) as { error?: string; draft?: boolean } | null;
      if (!ready.ok) {
        setStatus({
          tone: readyPayload?.draft ? "draft" : "error",
          message: readyPayload?.error || "Draft: wire BLOB_READ_WRITE_TOKEN to store uploads.",
        });
        return;
      }

      const blob = await upload(`custom-print/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/shop/custom-print/blob",
        contentType: file.type,
      });

      const saved = await fetch("/api/shop/custom-print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: blob.url,
          name,
          email,
          phone,
          material,
          materialDetail,
          size,
          quantity,
          notes,
        }),
      });
      const payload = (await saved.json().catch(() => null)) as { ok?: boolean; message?: string; error?: string; draft?: boolean } | null;
      if (!saved.ok || !payload?.ok) {
        setStatus({ tone: payload?.draft ? "draft" : "error", message: payload?.error || payload?.message || "The request did not send." });
        return;
      }
      setStatus({ tone: "ok", message: payload.message || "Request sent." });
      setFile(null);
      setPreview(null);
      setNotes("");
    } catch {
      setStatus({ tone: "error", message: "The upload did not finish. Check the image and try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-[#f0dfbf]">Blank material</legend>
        {[
          ["wood", "Wood"],
          ["plastic-acrylic", "Plastic / acrylic"],
          ["stone", "Stone"],
          ["metal-flat", "Metal (flat-face plugs or tunnels)"],
          ["other-flat", "Other flat-face jewelry"],
        ].map(([value, label]) => (
          <label key={value} className="flex min-h-11 items-center gap-3 text-sm text-[#f0dfbf]">
            <input
              type="radio"
              name="material"
              value={value}
              checked={material === value}
              onChange={() => setMaterial(value)}
              className="h-4 w-4 accent-[#d8b06d]"
            />
            {label}
          </label>
        ))}
      </fieldset>
      {material === "other-flat" ? (
        <label className="block text-sm text-[#f0dfbf]">
          What is the blank?
          <input required value={materialDetail} onChange={(event) => setMaterialDetail(event.target.value)} className={fieldClass} />
        </label>
      ) : null}
      <label className="block text-sm text-[#f0dfbf]">
        Size / gauge
        <input required value={size} onChange={(event) => setSize(event.target.value)} placeholder="00g, 1/2 in, 12mm" className={fieldClass} />
      </label>
      <label className="block text-sm text-[#f0dfbf]">
        Quantity (pairs)
        <input
          required
          type="number"
          min={1}
          max={20}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className={fieldClass}
        />
      </label>
      <div>
        <label htmlFor="custom-print-art" className="text-sm font-semibold text-[#f0dfbf]">
          Art or photo
        </label>
        <input
          id="custom-print-art"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          onChange={(event) => chooseFile(event.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-[#dbc8a7] file:mr-3 file:min-h-11 file:rounded-full file:border file:border-[#bc8f4d] file:bg-transparent file:px-4 file:text-[11px] file:font-semibold file:tracking-[0.1em] file:text-[#e7d4b4] file:uppercase"
        />
        <p className="mt-2 text-xs leading-5 text-[#be9a62]">JPG, PNG, or WebP. 10MB maximum. At least 1200 × 1200 pixels.</p>
        {fileError ? <p className="mt-2 text-sm text-[#f0dfbf]">{fileError}</p> : null}
        {fileWarning ? <p className="mt-2 text-sm leading-6 text-[#f2e1c2]">{fileWarning}</p> : null}
        {previewUrl ? (
          // The preview is a local file the visitor just chose.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Preview of the art you selected" className="mt-4 aspect-square w-full max-w-sm rounded-2xl border border-[#7d5b2e]/50 object-contain bg-[#16130f]" />
        ) : null}
      </div>

      <label className="block text-sm text-[#f0dfbf]">
        Name
        <input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={fieldClass} />
      </label>
      <label className="block text-sm text-[#f0dfbf]">
        Email
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className={fieldClass} />
      </label>
      <label className="block text-sm text-[#f0dfbf]">
        Phone <span className="font-normal text-[#be9a62]">(optional)</span>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" className={fieldClass} />
      </label>
      <label className="block text-sm text-[#f0dfbf]">
        Notes
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} className={`${fieldClass} min-h-28 py-3`} />
      </label>

      {status ? (
        <p role="status" className="rounded-2xl border border-[#7d5b2e]/50 bg-[#14110d] px-4 py-3 text-sm leading-6 text-[#f0dfbf]">
          {status.tone === "draft" ? "Draft. " : null}
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#1e1408] uppercase disabled:opacity-60"
      >
        {sending ? "Sending" : "Submit request"}
      </button>
    </form>
  );
}

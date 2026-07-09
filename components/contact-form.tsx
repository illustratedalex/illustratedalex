"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1200);
  }

  if (formState === "success") {
    return (
      <div className="rounded-xl border border-[#7d5b2e]/40 bg-[#16120f] px-8 py-12 text-center">
        <p className="font-display text-2xl font-semibold text-[#f0dfbf]">Message sent.</p>
        <p className="mt-3 text-[#dbc8a7]">
          Thanks for reaching out. You&rsquo;ll hear back with next steps shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-[#7d5b2e]/45 bg-[#17120e] px-4 py-3 text-sm text-[#f0dfbf] placeholder-[#9d8865] transition focus:border-[#bc8f4d] focus:outline-none focus:ring-1 focus:ring-[#bc8f4d]/25";
  const labelClass = "block text-xs font-semibold uppercase tracking-[0.14em] text-[#be9a62]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="normal-case tracking-normal text-[#b5a99b]">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" placeholder="Your phone number" className={inputClass} />
      </div>

      <div className="space-y-2">
        <p className={labelClass}>Tattoo or piercing?</p>
        <div className="flex flex-wrap gap-4">
          {["Tattoo", "Piercing", "Both", "Not sure yet"].map((option) => (
            <label key={option} className="flex min-h-10 cursor-pointer items-center gap-2 pr-2 text-sm text-[#dbc8a7]">
              <input type="radio" name="serviceType" value={option} className="accent-[#bc8f4d]" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className={labelClass}>Your idea or message</label>
        <textarea
          id="message" name="message" required rows={5}
          placeholder="Describe what you have in mind — placement, size, style, timing..."
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <p className={labelClass}>Preferred contact method</p>
        <div className="flex flex-wrap gap-4">
          {["Email", "Phone", "Instagram DM", "No preference"].map((method) => (
            <label key={method} className="flex min-h-10 cursor-pointer items-center gap-2 pr-2 text-sm text-[#dbc8a7]">
              <input type="radio" name="contactMethod" value={method} className="accent-[#bc8f4d]" />
              {method}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="min-h-11 w-full rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-8 py-3 text-[11px] font-semibold tracking-[0.1em] text-[#1e1408] transition hover:bg-[#c69952] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {formState === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

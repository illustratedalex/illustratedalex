"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    // Mock submission — replace with real handler when backend is ready
    setTimeout(() => setFormState("success"), 1200);
  }

  if (formState === "success") {
    return (
      <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-8 text-center">
        <p className="font-serif text-2xl font-semibold text-stone-100">
          Message sent.
        </p>
        <p className="mt-3 text-stone-400">
          Thanks for reaching out. You&rsquo;ll hear back with next steps
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-stone-800 bg-stone-900/40 p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded border border-stone-700 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 transition focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded border border-stone-700 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 transition focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="phone"
          className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500"
        >
          Phone{" "}
          <span className="text-stone-700 normal-case tracking-normal">
            (optional)
          </span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your phone number"
          className="w-full rounded border border-stone-700 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 transition focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
        />
      </div>

      <div className="space-y-2">
        <p className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
          Tattoo or piercing?
        </p>
        <div className="flex flex-wrap gap-4">
          {["Tattoo", "Piercing", "Both", "Not sure yet"].map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 text-sm text-stone-300"
            >
              <input
                type="radio"
                name="serviceType"
                value={option}
                className="accent-stone-400"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500"
        >
          Idea or message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Describe what you have in mind — placement, size, style, reference images, timing..."
          className="w-full rounded border border-stone-700 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 transition focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
        />
      </div>

      <div className="space-y-2">
        <p className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
          Preferred contact method
        </p>
        <div className="flex flex-wrap gap-4">
          {["Email", "Phone", "Instagram DM", "No preference"].map(
            (method) => (
              <label
                key={method}
                className="flex cursor-pointer items-center gap-2 text-sm text-stone-300"
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  className="accent-stone-400"
                />
                {method}
              </label>
            ),
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="inline-flex w-full items-center justify-center rounded border border-stone-600 px-6 py-3 text-sm font-semibold text-stone-200 transition hover:border-stone-400 hover:text-stone-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {formState === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

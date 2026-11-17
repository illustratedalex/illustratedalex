import { studioHours } from "@/data/site-content";

export function StudioHours() {
  return (
    <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8" aria-labelledby="studio-hours-heading">
      <h2 id="studio-hours-heading" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">
        Hours
      </h2>
      <ul className="mt-4 space-y-2 text-sm leading-7 text-[#dbc8a7]">
        {studioHours.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-4">
            <span className="text-[#f0dfbf]">{row.label}</span>
            <span>{row.hours}</span>
          </li>
        ))}
        <li className="flex items-baseline justify-between gap-4">
          <span className="text-[#f0dfbf]">Monday and Tuesday</span>
          <span>Closed</span>
        </li>
      </ul>
    </section>
  );
}

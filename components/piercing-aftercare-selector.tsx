"use client";

import { useMemo, useState } from "react";
import type { PiercingAftercareItem } from "@/data/aftercare";

type PiercingAftercareSelectorProps = {
  items: PiercingAftercareItem[];
};

export function PiercingAftercareSelector({ items }: PiercingAftercareSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id ?? "");

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  const selectClassName =
    "mt-3 w-full rounded-md border border-[#7d5b2e]/45 bg-[#17120e] px-4 py-3 text-sm text-[#f0dfbf] transition focus:border-[#bc8f4d] focus:outline-none focus:ring-1 focus:ring-[#bc8f4d]/25";

  return (
    <div className="mt-6">
      <label
        htmlFor="piercing-aftercare-select"
        className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#be9a62]"
      >
        Choose your piercing
      </label>
      <select
        id="piercing-aftercare-select"
        name="piercing-aftercare-select"
        value={selectedId}
        onChange={(event) => setSelectedId(event.target.value)}
        className={selectClassName}
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {selectedItem ? (
        <div className="mt-5 rounded-xl border border-[#7d5b2e]/40 bg-[#12100d] p-5 sm:p-6">
          <h3 className="font-display text-2xl font-semibold text-[#f0dfbf]">{selectedItem.name}</h3>
          <dl className="mt-4 space-y-4 text-sm leading-7 text-[#dbc8a7]">
            <div className="border-b border-[#7d5b2e]/30 pb-4 last:border-0">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#be9a62]">Healing notes</dt>
              <dd className="mt-1">{selectedItem.healingEstimate}</dd>
            </div>
            <div className="border-b border-[#7d5b2e]/30 pb-4 last:border-0">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#be9a62]">Cleaning instructions</dt>
              <dd className="mt-1">{selectedItem.cleaning}</dd>
            </div>
            <div className="border-b border-[#7d5b2e]/30 pb-4 last:border-0">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#be9a62]">What to avoid</dt>
              <dd className="mt-1">{selectedItem.avoid}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#be9a62]">When to contact the studio</dt>
              <dd className="mt-1">{selectedItem.studioNote}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </div>
  );
}

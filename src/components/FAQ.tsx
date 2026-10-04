import React, { useId, useState } from "react";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function FAQ({ items, accent = "#0066FF" }: { items: FaqItem[]; accent?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left group"
            >
              <span className="text-base sm:text-lg font-bold text-[#0A1628] group-hover:opacity-80 transition-opacity">
                {item.q}
              </span>
              <span
                className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "rotate-45 text-white" : "border-gray-300 text-[#0A1628]"
                }`}
                style={isOpen ? { backgroundColor: accent, borderColor: accent } : undefined}
              >
                <Plus className="w-4 h-4" />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-12 text-[15px] sm:text-base text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQ;

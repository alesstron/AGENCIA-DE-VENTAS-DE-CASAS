"use client";

import { useState } from "react";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full max-w-full flex-col gap-3">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-card bg-bark-brown md:aspect-[16/9]">
        <img src={images[active]} alt={`${title} — foto ${active + 1}`} className="h-full w-full object-cover" />
        <span className="label absolute bottom-3 right-3 rounded-full bg-walnut-shadow/70 px-3 py-1.5 text-[10px]">
          {active + 1} / {images.length}
        </span>
      </div>
      <div className="hide-scrollbar flex touch-pan-x overflow-x-auto whitespace-nowrap gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === active}
            className={`h-16 w-24 shrink-0 overflow-hidden rounded-card border bg-bark-brown md:h-20 md:w-32 ${
              i === active ? "border-warm-cream" : "border-cork-border opacity-60"
            }`}
          >
            <img src={src.replace("w=1600", "w=400")} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

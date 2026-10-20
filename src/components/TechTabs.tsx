"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { EspecLujo, Level } from "@/data/properties";
import { DUR, EASE } from "./motion";

const TABS = ["Planos", "Inventario", "Lujo"] as const;
type Tab = (typeof TABS)[number];

const panel = {
  initial: { opacity: 0, y: 24, rotateX: -10, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(4px)" },
};

export default function TechTabs({ niveles, inventario, lujo }: { niveles: Level[]; inventario: string[]; lujo: EspecLujo }) {
  const [tab, setTab] = useState<Tab>("Planos");
  const [nivel, setNivel] = useState(0);
  const level = niveles[nivel];
  const total = level.zonas.reduce((a, z) => a + z.m2, 0);

  const lujoRows: [string, string][] = [
    ["Tipo de suelo", lujo.suelo],
    ["Cristales", lujo.cristales],
    ["Climatización", lujo.climatizacion],
    ["Domótica", lujo.domotica],
    ["Altura de techos", `${lujo.alturaTecho.toFixed(1)} m`],
  ];

  return (
    <div className="flex w-full max-w-full flex-col gap-6">
      <div role="tablist" className="hide-scrollbar flex touch-pan-x overflow-x-auto whitespace-nowrap gap-3">
        {TABS.map((t) => (
          <motion.button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            whileTap={{ scale: 0.94 }}
            className="label relative shrink-0 rounded-outlined border border-warm-cream px-5 py-2.5"
          >
            {tab === t && <motion.span layoutId="tab-activo" transition={{ duration: DUR.base, ease: EASE }} className="absolute inset-0 rounded-outlined bg-warm-cream" />}
            <span className={`relative ${tab === t ? "text-walnut-shadow" : ""}`}>{t === "Lujo" ? "Especificaciones de lujo" : t}</span>
          </motion.button>
        ))}
      </div>

      <div className="[perspective:1000px]">
        <AnimatePresence mode="wait">
          <motion.div key={tab} {...panel} transition={{ duration: DUR.base, ease: EASE }} className="will-change-transform">
            {tab === "Planos" && (
              <div className="flex flex-col gap-5">
                <div className="hide-scrollbar flex touch-pan-x overflow-x-auto whitespace-nowrap gap-2">
                  {niveles.map((l, i) => (
                    <motion.button
                      key={l.nivel}
                      type="button"
                      onClick={() => setNivel(i)}
                      aria-pressed={nivel === i}
                      whileTap={{ scale: 0.94 }}
                      className={`label shrink-0 rounded-full border px-4 py-2 transition-colors ${
                        nivel === i ? "border-warm-cream bg-bark-brown" : "border-cork-border text-driftwood"
                      }`}
                    >
                      {l.nivel}
                    </motion.button>
                  ))}
                </div>
                <p className="label text-driftwood">
                  {level.nivel} · {total} m² · esquema proporcional, no a escala arquitectónica
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={nivel}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DUR.base, ease: EASE }}
                    className="flex w-full max-w-full flex-wrap gap-2 rounded-3xl border border-dashed border-driftwood bg-warm-cream/[0.03] p-2 backdrop-blur-md"
                  >
                    {level.zonas.map((z, i) => (
                      <motion.div
                        key={z.nombre}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: DUR.base, ease: EASE, delay: i * 0.07 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ flexGrow: z.m2, flexBasis: `${Math.max(z.m2 / 4, 90)}px`, minHeight: 88 }}
                        className="flex min-w-0 flex-col justify-between gap-2 rounded-2xl border border-dashed border-cork-border bg-bark-brown/40 p-3 will-change-transform"
                      >
                        <span className="label text-[11px]">{z.nombre}</span>
                        <span className="label text-[11px] text-driftwood">{z.m2} m²</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {tab === "Inventario" && (
              <ul className="flex flex-col">
                {inventario.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: DUR.base, ease: EASE, delay: i * 0.05 }}
                    className="border-b border-dashed border-cork-border py-3 text-[17px] break-words"
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
            )}

            {tab === "Lujo" && (
              <dl className="flex flex-col gap-3 md:grid md:grid-cols-2">
                {lujoRows.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: DUR.base, ease: EASE, delay: i * 0.07 }}
                    className="flex flex-col gap-2 rounded-2xl border border-cork-border bg-warm-cream/[0.03] p-5 backdrop-blur-md"
                  >
                    <dt className="label text-[10px] text-driftwood">{k}</dt>
                    <dd className="text-[16px] font-medium uppercase leading-[1.2] break-words">{v}</dd>
                  </motion.div>
                ))}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

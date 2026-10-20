"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { properties, type PropertyType } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import { DUR, EASE, TiltCard } from "./motion";

const TIPOS: ("Todas" | PropertyType)[] = ["Todas", "Villa", "Penthouse", "Mansión"];

const RANGOS = [
  { label: "Cualquier precio", min: 0, max: Infinity },
  { label: "Hasta $5 M USD", min: 0, max: 5e6 },
  { label: "$5 M – $15 M USD", min: 5e6, max: 15e6 },
  { label: "$15 M – $30 M USD", min: 15e6, max: 30e6 },
  { label: "Más de $30 M USD", min: 30e6, max: Infinity },
];

const CIUDADES = ["Todas", "Dubái", "Caracas"] as const;

const fieldClass =
  "label w-full rounded-none border-0 border-b border-warm-cream bg-transparent px-0.5 py-2 text-warm-cream outline-none placeholder:text-driftwood focus:border-b-2";

export default function Catalog() {
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("Todas");
  const [ciudad, setCiudad] = useState<(typeof CIUDADES)[number]>("Todas");
  const [zona, setZona] = useState("Todas");
  const [rango, setRango] = useState(0);
  const zonas = useMemo(
    () => ["Todas", ...Array.from(new Set(properties.filter((p) => ciudad === "Todas" || p.ciudad === ciudad).map((p) => p.zona)))],
    [ciudad],
  );
  const [q, setQ] = useState("");
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 120]);

  const lista = useMemo(() => {
    const r = RANGOS[rango];
    const term = q.trim().toLowerCase();
    return properties.filter(
      (p) =>
        (tipo === "Todas" || p.tipo === tipo) &&
        (ciudad === "Todas" || p.ciudad === ciudad) &&
        (zona === "Todas" || p.zona === zona) &&
        p.precioUSD >= r.min &&
        p.precioUSD <= r.max &&
        (!term || `${p.titulo} ${p.ubicacion} ${p.ref}`.toLowerCase().includes(term)),
    );
  }, [tipo, ciudad, zona, rango, q]);

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-53px)] w-full max-w-full flex-col justify-end overflow-hidden bg-walnut-shadow">
        <motion.div
          initial={{ scale: 1.2, filter: "blur(14px)", opacity: 0.4 }}
          animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: DUR.hero + 0.4, ease: EASE }}
          style={{ y: bgY }}
          className="absolute inset-x-0 -top-16 bottom-0 will-change-transform"
        >
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80"
            alt="Skyline de Dubái al atardecer"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-walnut-shadow via-walnut-shadow/60 to-walnut-shadow/20" />

        <div className="relative flex w-full max-w-full flex-col gap-8 px-5 pb-10 pt-24 md:px-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } } }}
            className="flex flex-col gap-4 [perspective:900px]"
          >
            {[
              <p key="a" className="label">Dubái & Caracas · Colección privada 2026</p>,
              <h1 key="b" className="display max-w-3xl">Residencias que definen el horizonte.</h1>,
              <p key="c" className="body-copy max-w-xl">Villas, penthouses y mansiones ultra-exclusivas, con acceso directo a sus propietarios.</p>,
            ].map((el, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -55, rotateY: i === 1 ? 12 : 0, filter: "blur(14px)" },
                  show: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, filter: "blur(0px)", transition: { duration: DUR.hero, ease: EASE } },
                }}
                style={{ transformOrigin: "50% 100%" }}
                className="will-change-transform"
              >
                {el}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            transition={{ duration: DUR.hero, ease: EASE, delay: 0.9 }}
            style={{ transformPerspective: 1000 }}
            className="flex w-full flex-col gap-6 rounded-3xl border border-warm-cream/15 bg-walnut-shadow/50 p-6 backdrop-blur-xl will-change-transform">
            <div className="hide-scrollbar flex touch-pan-x overflow-x-auto whitespace-nowrap gap-3">
              {TIPOS.map((t) => (
                <motion.button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  aria-pressed={tipo === t}
                  whileTap={{ scale: 0.94 }}
                  className="label relative shrink-0 rounded-outlined border border-warm-cream px-5 py-2.5 transition-colors hover:bg-bark-brown"
                >
                  {tipo === t && (
                    <motion.span
                      layoutId="chip-activo"
                      transition={{ duration: DUR.base, ease: EASE }}
                      className="absolute inset-0 rounded-outlined bg-warm-cream"
                    />
                  )}
                  <span className={`relative ${tipo === t ? "text-walnut-shadow" : ""}`}>
                    {t === "Todas" ? "Todas" : t === "Mansión" ? "Mansiones" : `${t}s`}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:gap-8">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por nombre o referencia"
                aria-label="Buscar propiedad"
                className={fieldClass}
              />
              <select
                value={ciudad}
                onChange={(e) => {
                  setCiudad(e.target.value as (typeof CIUDADES)[number]);
                  setZona("Todas");
                }}
                aria-label="Ciudad"
                className={fieldClass}
              >
                {CIUDADES.map((c) => (
                  <option key={c} value={c} className="bg-walnut-shadow">
                    {c === "Todas" ? "Dubái y Caracas" : c}
                  </option>
                ))}
              </select>
              <select value={zona} onChange={(e) => setZona(e.target.value)} aria-label="Zona" className={fieldClass}>
                {zonas.map((z) => (
                  <option key={z} value={z} className="bg-walnut-shadow">
                    {z === "Todas" ? "Todas las zonas" : z}
                  </option>
                ))}
              </select>
              <select value={rango} onChange={(e) => setRango(Number(e.target.value))} aria-label="Rango de precio" className={fieldClass}>
                {RANGOS.map((r, i) => (
                  <option key={r.label} value={i} className="bg-walnut-shadow">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="propiedades" className="w-full max-w-full overflow-x-hidden px-5 py-16 md:px-10">
        <div className="mb-10 flex flex-col gap-3 border-b border-dashed border-cork-border pb-6 md:flex-row md:items-end md:justify-between">
          <h2 className="heading">Propiedades</h2>
          <p className="label text-driftwood">{lista.length} de {properties.length} residencias</p>
        </div>

        {lista.length === 0 ? (
          <p className="body-copy py-16">No hay propiedades con esos filtros. Ajusta tu búsqueda.</p>
        ) : (
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {lista.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 36, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: DUR.slow, ease: EASE, delay: (i % 3) * 0.1 }}
                  className="will-change-transform"
                >
                  <TiltCard>
                    <PropertyCard p={p} />
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </>
  );
}

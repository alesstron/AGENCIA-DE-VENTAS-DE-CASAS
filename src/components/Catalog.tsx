"use client";

import { useMemo, useState } from "react";
import { properties, type PropertyType } from "@/data/properties";
import PropertyCard from "./PropertyCard";

const TIPOS: ("Todas" | PropertyType)[] = ["Todas", "Villa", "Penthouse", "Mansión"];

const RANGOS = [
  { label: "Cualquier precio", min: 0, max: Infinity },
  { label: "Hasta $15 M", min: 0, max: 15e6 },
  { label: "$15 M – $30 M", min: 15e6, max: 30e6 },
  { label: "Más de $30 M", min: 30e6, max: Infinity },
];

const ZONAS = ["Todas", ...Array.from(new Set(properties.map((p) => p.zona)))];

const fieldClass =
  "label w-full rounded-none border-0 border-b border-warm-cream bg-transparent px-0.5 py-2 text-warm-cream outline-none placeholder:text-driftwood focus:border-b-2";

export default function Catalog() {
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("Todas");
  const [zona, setZona] = useState("Todas");
  const [rango, setRango] = useState(0);
  const [q, setQ] = useState("");

  const lista = useMemo(() => {
    const r = RANGOS[rango];
    const term = q.trim().toLowerCase();
    return properties.filter(
      (p) =>
        (tipo === "Todas" || p.tipo === tipo) &&
        (zona === "Todas" || p.zona === zona) &&
        p.precioUSD >= r.min &&
        p.precioUSD <= r.max &&
        (!term || `${p.titulo} ${p.ubicacion} ${p.ref}`.toLowerCase().includes(term)),
    );
  }, [tipo, zona, rango, q]);

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-53px)] w-full max-w-full flex-col justify-end overflow-hidden bg-walnut-shadow">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80"
          alt="Skyline de Dubái al atardecer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut-shadow via-walnut-shadow/60 to-walnut-shadow/20" />

        <div className="relative flex w-full max-w-full flex-col gap-8 px-5 pb-10 pt-24 md:px-10">
          <div className="flex flex-col gap-4">
            <p className="label">Dubái · Colección privada 2026</p>
            <h1 className="display max-w-3xl">Residencias que definen el horizonte.</h1>
            <p className="body-copy max-w-xl">Villas, penthouses y mansiones ultra-exclusivas, con acceso directo a sus propietarios.</p>
          </div>

          <div className="flex w-full flex-col gap-6 rounded-card border border-cork-border bg-walnut-shadow/60 p-6 backdrop-blur-md">
            <div className="hide-scrollbar flex touch-pan-x overflow-x-auto whitespace-nowrap gap-3">
              {TIPOS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  aria-pressed={tipo === t}
                  className={`label shrink-0 rounded-outlined border border-warm-cream px-5 py-2.5 transition-colors ${
                    tipo === t ? "bg-warm-cream text-walnut-shadow" : "hover:bg-bark-brown"
                  }`}
                >
                  {t === "Todas" ? "Todas" : t === "Mansión" ? "Mansiones" : `${t}s`}
                </button>
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
              <select value={zona} onChange={(e) => setZona(e.target.value)} aria-label="Ubicación" className={fieldClass}>
                {ZONAS.map((z) => (
                  <option key={z} value={z} className="bg-walnut-shadow">
                    {z === "Todas" ? "Todas las ubicaciones" : z}
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
          </div>
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
            {lista.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

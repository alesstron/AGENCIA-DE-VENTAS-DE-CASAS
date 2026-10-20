/**
 * Tarjeta de propiedad del catálogo (Server Component). Apilada y a ancho completo en móvil;
 * el grid lo define Catalog. La portada es la primera foto de la galería, con object-cover sobre fondo bark-brown.
 * Precio y referencia en AED/USD se renderizan con <Price>/<PriceRef> para seguir la moneda elegida.
 */
import Link from "next/link";
import type { Property } from "@/data/properties";
import { Price, PriceRef } from "./currency";

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="flex w-full max-w-full flex-col h-full overflow-hidden rounded-card border border-cork-border bg-walnut-shadow/80 backdrop-blur-md">
      <Link href={`/propiedades/${p.id}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-bark-brown">
        <img src={p.galeria[0]} alt={p.titulo} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        <span
          className={`label absolute left-3 top-3 rounded-full px-3 py-1.5 text-[10px] ${
            p.estado === "Disponible" ? "border border-warm-cream bg-walnut-shadow/60" : "bg-driftwood text-walnut-shadow"
          }`}
        >
          {p.estado}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <p className="label text-driftwood">
            {p.tipo} · {p.zona} · {p.ciudad}
          </p>
          <h3 className="text-[24px] font-medium uppercase leading-[1.09]">{p.titulo}</h3>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[24px] font-medium leading-none">
            <Price usd={p.precioUSD} />
          </p>
          <p className="label text-driftwood">
            <PriceRef usd={p.precioUSD} />
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-3 border-y border-dashed border-cork-border py-4">
          <Spec k="m²" v={p.m2Construccion.toLocaleString("es")} />
          <Spec k="Hab." v={p.habitaciones} />
          <Spec k="Baños" v={p.banos} />
        </dl>

        <Link
          href={`/propiedades/${p.id}`}
          className="label mt-auto rounded-outlined border border-warm-cream px-4 py-3 text-center transition-all duration-300 hover:bg-bark-brown active:scale-[0.97]"
        >
          Ver ficha técnica / Agendar visita
        </Link>
      </div>
    </article>
  );
}

// Par etiqueta/valor de la cuadrícula de datos clave (m², habitaciones, baños).
function Spec({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="label text-[10px] text-driftwood">{k}</dt>
      <dd className="text-[18px] font-medium leading-none">{v}</dd>
    </div>
  );
}

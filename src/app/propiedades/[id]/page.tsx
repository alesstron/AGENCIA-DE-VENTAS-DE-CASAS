import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import { formatAED, formatUSD, getPropertyById, pricePerM2, properties } from "@/data/properties";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getPropertyById((await params).id);
  return p ? { title: `${p.titulo} — Dubai Luxury Estates`, description: p.descripcion } : {};
}

const ICONS: [RegExp, string][] = [
  [/helipuerto/i, "M12 3v18M5 7h14M5 17h14M8 7v10M16 7v10"],
  [/playa|muelle|amarre|lago|vista|piscina/i, "M2 15c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0M2 19c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0M12 3v8M9 6l3-3 3 3"],
  [/pozo|agua/i, "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"],
  [/planta el|eléctrica/i, "M13 2 4 14h7l-1 8 9-12h-7z"],
  [/domótica|automatiz/i, "M4 6h16v10H4zM8 20h8M12 16v4"],
  [/seguridad|concierge/i, "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4"],
  [/ascensor/i, "M6 3h12v18H6zM12 3v18M9 9l-1.5 2M15 9l1.5 2"],
  [/cine|sala/i, "M3 6h18v12H3zM3 10h18M8 6v4M14 6v4"],
  [/spa|sauna|yoga|hammam|jardines/i, "M12 21c-4-3-7-6-7-10 3 0 5 1 7 3 2-2 4-3 7-3 0 4-3 7-7 10zM12 14V8"],
  [/vino|bodega|cava/i, "M8 3h8v6a4 4 0 0 1-8 0zM12 13v8M8 21h8"],
  [/tenis|club/i, "M3 7h18v10H3zM12 7v10"],
];
const DEFAULT_ICON = "M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z";
const iconFor = (name: string) => ICONS.find(([re]) => re.test(name))?.[1] ?? DEFAULT_ICON;

export default async function PropertyPage({ params }: Params) {
  const p = getPropertyById((await params).id);
  if (!p) notFound();

  const specs: [string, string][] = [
    ["Construcción", `${p.m2Construccion.toLocaleString("es")} m²`],
    ["Terreno", p.m2Terreno ? `${p.m2Terreno.toLocaleString("es")} m²` : "Unidad en torre"],
    ["Habitaciones", String(p.habitaciones)],
    ["Baños", String(p.banos)],
    ["Estacionamientos", String(p.estacionamientos)],
    ["Piscina privada", p.piscinaPrivada ? "Sí" : "No"],
    ["Ascensor privado", p.ascensorPrivado ? "Sí" : "No"],
    ["Precio por m²", formatUSD(pricePerM2(p))],
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="border-b border-dashed border-cork-border px-5 py-4 md:px-10">
        <Link href="/#propiedades" className="label underline underline-offset-4">
          ← Volver a Propiedades
        </Link>
      </div>

      <div className="flex w-full max-w-full flex-col gap-12 px-5 py-8 md:px-10 md:py-12">
        <Gallery images={p.galeria} title={p.titulo} />

        <section className="flex flex-col gap-6 border-b border-dashed border-cork-border pb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`label rounded-full px-3 py-1.5 text-[10px] ${
                  p.estado === "Disponible" ? "border border-warm-cream" : "bg-driftwood text-walnut-shadow"
                }`}
              >
                {p.estado}
              </span>
              <span className="label text-driftwood">
                {p.tipo} · Ref. {p.ref}
              </span>
            </div>
            <h1 className="display max-w-3xl">{p.titulo}</h1>
            <p className="label">{p.ubicacion}</p>
          </div>
          <div className="flex flex-col gap-1 md:text-right">
            <p className="heading">{formatUSD(p.precioUSD)}</p>
            <p className="label text-driftwood">≈ {formatAED(p.precioUSD)}</p>
          </div>
        </section>

        <section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="heading">Descripción ejecutiva</h2>
              <p className="body-copy max-w-2xl">{p.descripcion}</p>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="heading">Especificaciones técnicas</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-3 rounded-card border border-cork-border p-5">
                    <p className="label text-[10px] text-driftwood">{k}</p>
                    <p className="text-[18px] font-medium uppercase leading-none">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="heading">Amenidades VIP</h2>
              <ul className="flex flex-col gap-3 md:grid md:grid-cols-2">
                {p.amenidades.map((a) => (
                  <li key={a} className="flex items-center gap-4 rounded-card border border-cork-border p-4">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={iconFor(a)} />
                    </svg>
                    <span className="label text-[13px]">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="heading">Inventario</h2>
              <ul className="flex flex-col">
                {p.inventario.map((i) => (
                  <li key={i} className="border-b border-dashed border-cork-border py-3 text-[17px]">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="heading">Plano / Distribución</h2>
              <p className="label text-driftwood">Esquema proporcional por superficie — no a escala arquitectónica</p>
              {p.distribucion.map((lvl) => (
                <div key={lvl.nivel} className="flex flex-col gap-3">
                  <p className="label">{lvl.nivel}</p>
                  <div className="flex w-full max-w-full flex-wrap gap-2 rounded-card border border-dashed border-driftwood p-2">
                    {lvl.zonas.map((z) => (
                      <div
                        key={z.nombre}
                        style={{ flexGrow: z.m2, flexBasis: `${Math.max(z.m2 / 4, 90)}px`, minHeight: 80 }}
                        className="flex min-w-0 flex-col justify-between gap-2 rounded-card border border-dashed border-cork-border bg-bark-brown/40 p-3"
                      >
                        <span className="label text-[11px]">{z.nombre}</span>
                        <span className="label text-[11px] text-driftwood">{z.m2} m²</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="w-full lg:sticky lg:top-24 lg:h-fit lg:w-[400px] lg:shrink-0">
            <ContactForm titulo={p.titulo} refId={p.ref} />
          </aside>
        </section>
      </div>
    </div>
  );
}

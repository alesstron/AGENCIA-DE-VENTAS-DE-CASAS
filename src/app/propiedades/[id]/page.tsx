import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import TechTabs from "@/components/TechTabs";
import { CountUp, Reveal } from "@/components/motion";
import QuickActions from "@/components/QuickActions";
import { Price } from "@/components/currency";
import { getPropertyById, pricePerM2, properties } from "@/data/properties";

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

  const specs: [string, React.ReactNode][] = [
    ["Construcción", `${p.m2Construccion.toLocaleString("es")} m²`],
    ["Terreno", p.m2Terreno ? `${p.m2Terreno.toLocaleString("es")} m²` : "Unidad en torre"],
    ["Habitaciones", String(p.habitaciones)],
    ["Baños", String(p.banos)],
    ["Estacionamientos", String(p.estacionamientos)],
    ["Piscina privada", p.piscinaPrivada ? "Sí" : "No"],
    ["Ascensor privado", p.ascensorPrivado ? "Sí" : "No"],
    ["Precio por m²", <Price key="pm2" usd={pricePerM2(p)} />],
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="border-b border-dashed border-cork-border px-5 py-4 md:px-10">
        <Link href="/#propiedades" className="label underline underline-offset-4">
          ← Volver a Propiedades
        </Link>
      </div>

      <div className="flex w-full max-w-full flex-col gap-12 px-5 py-8 md:px-10 md:py-12">
        {/* Título, precio y acciones junto a una galería de altura acotada: todo visible sin scroll excesivo */}
        <div className="flex w-full max-w-full flex-col gap-8 border-b border-dashed border-cork-border pb-12 lg:grid lg:grid-cols-5 lg:items-center lg:gap-10">
          <Reveal variant="flip" className="order-1 flex min-w-0 flex-col gap-5 lg:order-2 lg:col-span-2">
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
            <h1 className="display break-words">{p.titulo}</h1>
            <p className="label">{p.ubicacion}</p>
            <QuickActions titulo={p.titulo} refId={p.ref} precioUSD={p.precioUSD} />
          </Reveal>

          <Reveal variant="flip" className="order-2 min-w-0 lg:order-1 lg:col-span-3">
            <Gallery images={p.galeria} title={p.titulo} />
          </Reveal>
        </div>

        <section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-12">
            <Reveal className="flex flex-col gap-6">
              <h2 className="heading">Descripción ejecutiva</h2>
              <p className="body-copy max-w-2xl">{p.descripcion}</p>
            </Reveal>

            <Reveal className="flex flex-col gap-6">
              <h2 className="heading">Especificaciones técnicas</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-3 rounded-2xl border border-cork-border bg-warm-cream/[0.03] p-5 backdrop-blur-md transition-colors duration-300 hover:bg-bark-brown/60">
                    <p className="label text-[10px] text-driftwood">{k}</p>
                    <p className="text-[18px] font-medium uppercase leading-none">{v}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="flex flex-col gap-6">
              <h2 className="heading">Amenidades VIP</h2>
              <ul className="flex flex-col gap-3 md:grid md:grid-cols-2">
                {p.amenidades.map((a) => (
                  <li key={a} className="flex items-center gap-4 rounded-2xl border border-cork-border bg-warm-cream/[0.03] p-4 backdrop-blur-md transition-colors duration-300 hover:bg-bark-brown/60">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={iconFor(a)} />
                    </svg>
                    <span className="label text-[13px]">{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="flex flex-col gap-6">
              <h2 className="heading">Ficha técnica avanzada</h2>
              <TechTabs niveles={p.distribucion} inventario={p.inventario} lujo={p.lujo} />
            </Reveal>

            <Reveal className="flex flex-col gap-6">
              <h2 className="heading">Matriz de inversión</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Metric label="ROI anual estimado" sub={<><Price usd={Math.round((p.precioUSD * p.inversion.roiAnual) / 100)} /> / año</>}>
                  <CountUp value={p.inversion.roiAnual} decimals={1} suffix="%" />
                </Metric>
                <Metric label="Plusvalía proyectada a 3 años" sub={<>Valor estimado <Price usd={Math.round(p.precioUSD * (1 + p.inversion.plusvalia3a / 100))} /></>}>
                  <CountUp value={p.inversion.plusvalia3a} suffix="%" />
                </Metric>
                <Metric
                  label="Esquema de pago"
                  sub={p.inversion.esquemaPago === "60/40" ? "60% inicial · 40% a la entrega" : "50% inicial · 50% a la entrega"}
                >
                  Plan {p.inversion.esquemaPago}
                </Metric>
              </div>
              <p className="text-[10px] font-medium uppercase leading-[1.3] text-ember-accent">
                * Cifras estimadas con fines ilustrativos; no constituyen garantía de rentabilidad ni asesoría financiera.
              </p>
            </Reveal>

            <Reveal className="flex flex-col gap-6">
              <h2 className="heading">Entorno VIP</h2>
              <ul className="flex flex-col gap-3">
                {p.entorno.map((e) => (
                  <li key={e.lugar} className="flex flex-col gap-3 rounded-2xl border border-cork-border bg-warm-cream/[0.03] p-4 backdrop-blur-md">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="label text-[10px] text-driftwood">{e.categoria}</span>
                        <span className="text-[16px] font-medium uppercase leading-[1.1] break-words">{e.lugar}</span>
                      </div>
                      <span className="label shrink-0 text-right">
                        {e.minutos} min
                        <br />
                        <span className="text-driftwood">{e.km} km</span>
                      </span>
                    </div>
                    <div className="h-px w-full bg-cork-border">
                      <div className="h-px bg-warm-cream" style={{ width: `${Math.min(100, (e.minutos / 40) * 100)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="label text-[10px] text-driftwood">Tiempos aproximados en vehículo, sin tráfico.</p>
            </Reveal>
          </div>

          <aside className="w-full lg:sticky lg:top-24 lg:h-fit lg:w-[400px] lg:shrink-0">
            <Reveal delay={0.1}>
              <ContactForm titulo={p.titulo} refId={p.ref} precioUSD={p.precioUSD} />
            </Reveal>
          </aside>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, sub, children }: { label: string; sub: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-cork-border bg-warm-cream/[0.03] p-6 backdrop-blur-md">
      <p className="label text-[10px] text-driftwood">{label}</p>
      <p className="heading">{children}</p>
      <p className="label text-[11px]">{sub}</p>
    </div>
  );
}

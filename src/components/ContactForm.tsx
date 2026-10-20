"use client";

import { useState } from "react";
import { sanitize, whatsappUrl } from "@/lib/contact";
import { CurrencySelect, useCurrency } from "./currency";

const fieldClass =
  "w-full rounded-none border-0 border-b border-warm-cream bg-transparent px-0.5 py-2 text-[16px] font-medium uppercase text-warm-cream outline-none placeholder:text-driftwood focus:border-b-2";

export default function ContactForm({ titulo, refId, precioUSD, url }: { titulo: string; refId: string; precioUSD: number; url?: string }) {
  const { currency, format } = useCurrency();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("Agendar visita privada");
  const [nota, setNota] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const n = sanitize(nombre, 80);
    if (!n) return;
    const tel = sanitize(telefono, 30).replace(/[^\d+\s()-]/g, "");
    const lineas = [
      `Hola, soy ${n}.`,
      `Quiero: ${sanitize(tipo, 40).toLowerCase()}.`,
      `Propiedad: ${sanitize(titulo)} (Ref. ${sanitize(refId, 20)}).`,
      `Precio de lista: ${format(precioUSD)}${currency === "USD" ? "" : ` (${format(precioUSD, "USD")} USD)`}.`,
      fecha && `Fecha preferida: ${sanitize(fecha, 10)}.`,
      tel && `Mi contacto: ${tel}.`,
      nota && sanitize(nota, 300) && `Comentario: ${sanitize(nota, 300)}`,
      url && `Ficha: ${sanitize(url, 200)}`,
    ].filter(Boolean);
    window.open(whatsappUrl(lineas.join("\n")),"_blank", "noopener,noreferrer");
  }

  return (
    <form id="cotizar" onSubmit={enviar} className="flex w-full max-w-full scroll-mt-24 flex-col gap-6 rounded-3xl border border-cork-border bg-bark-brown p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-[24px] font-medium uppercase leading-[1.09]">Agendar visita privada / Cotizar</h3>
        <p className="label text-driftwood">
          {titulo} · Ref. {refId}
        </p>
        <p className="text-[24px] font-medium leading-none pt-2">{format(precioUSD)}</p>
      </div>
      <CurrencySelect />
      <input required maxLength={80} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" aria-label="Nombre completo" className={fieldClass} />
      <input maxLength={30} value={telefono} onChange={(e) => setTelefono(e.target.value)} type="tel" placeholder="Teléfono (opcional)" aria-label="Teléfono" className={fieldClass} />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label="Tipo de solicitud" className={fieldClass}>
        <option className="bg-walnut-shadow">Agendar visita privada</option>
        <option className="bg-walnut-shadow">Solicitar cotización</option>
      </select>
      <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" aria-label="Fecha preferida" className={`${fieldClass} [color-scheme:dark]`} />
      <textarea maxLength={300} value={nota} onChange={(e) => setNota(e.target.value)} rows={2} placeholder="Comentarios" aria-label="Comentarios" className={fieldClass} />
      <button type="submit" className="label rounded-pill bg-warm-cream px-6 py-3.5 text-walnut-shadow transition-opacity hover:opacity-90">
        Enviar por WhatsApp
      </button>
    </form>
  );
}

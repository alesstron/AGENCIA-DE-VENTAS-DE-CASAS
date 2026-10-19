"use client";

import { useState } from "react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "971500000000";

const fieldClass =
  "w-full rounded-none border-0 border-b border-warm-cream bg-transparent px-0.5 py-2 text-[16px] font-medium uppercase text-warm-cream outline-none placeholder:text-driftwood focus:border-b-2";

export default function ContactForm({ titulo, refId, url }: { titulo: string; refId: string; url?: string }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("Agendar visita privada");
  const [nota, setNota] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const lineas = [
      `Hola, soy ${nombre}.`,
      `Quiero: ${tipo.toLowerCase()}.`,
      `Propiedad: ${titulo} (Ref. ${refId}).`,
      fecha && `Fecha preferida: ${fecha}.`,
      telefono && `Mi contacto: ${telefono}.`,
      nota && `Comentario: ${nota}`,
      url && `Ficha: ${url}`,
    ].filter(Boolean);
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(lineas.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={enviar} className="flex w-full max-w-full flex-col gap-6 rounded-card border border-cork-border bg-bark-brown p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-[24px] font-medium uppercase leading-[1.09]">Agendar visita privada / Cotizar</h3>
        <p className="label text-driftwood">
          {titulo} · Ref. {refId}
        </p>
      </div>
      <input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" aria-label="Nombre completo" className={fieldClass} />
      <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="tel" placeholder="Teléfono (opcional)" aria-label="Teléfono" className={fieldClass} />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label="Tipo de solicitud" className={fieldClass}>
        <option className="bg-walnut-shadow">Agendar visita privada</option>
        <option className="bg-walnut-shadow">Solicitar cotización</option>
      </select>
      <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" aria-label="Fecha preferida" className={`${fieldClass} [color-scheme:dark]`} />
      <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={2} placeholder="Comentarios" aria-label="Comentarios" className={fieldClass} />
      <button type="submit" className="label rounded-pill bg-warm-cream px-6 py-3.5 text-walnut-shadow transition-opacity hover:opacity-90">
        Enviar por WhatsApp
      </button>
    </form>
  );
}

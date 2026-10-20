"use client";

import { sanitize, whatsappUrl } from "@/lib/contact";
import { Price, PriceRef, useCurrency } from "./currency";

/** Precio en la moneda elegida + acciones rápidas (WhatsApp y salto al formulario). */
export default function QuickActions({ titulo, refId, precioUSD }: { titulo: string; refId: string; precioUSD: number }) {
  const { currency, format } = useCurrency();
  const msg = [
    "Hola, quiero agendar una visita privada.",
    `Propiedad: ${sanitize(titulo)} (Ref. ${sanitize(refId, 20)}).`,
    `Precio de lista: ${format(precioUSD)}${currency === "USD" ? "" : ` (${format(precioUSD, "USD")} USD)`}.`,
  ].join("\n");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="heading">
          <Price usd={precioUSD} />
        </p>
        <p className="label text-driftwood">
          <PriceRef usd={precioUSD} />
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappUrl(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="label rounded-pill bg-warm-cream px-6 py-3.5 text-center text-walnut-shadow transition-transform duration-300 active:scale-[0.97]"
        >
          Agendar por WhatsApp
        </a>
        <a
          href="#cotizar"
          className="label rounded-outlined border border-warm-cream px-6 py-3.5 text-center transition-all duration-300 hover:bg-bark-brown active:scale-[0.97]"
        >
          Cotizar
        </a>
      </div>
    </div>
  );
}

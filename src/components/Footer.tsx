"use client";

import { useEffect, useState } from "react";
import { COMPANY_NAME, whatsappUrl } from "@/lib/contact";

type DocKey = "aviso" | "privacidad" | "terminos";

const DOCS: Record<DocKey, { titulo: string; secciones: [string, string][] }> = {
  aviso: {
    titulo: "Aviso Legal",
    secciones: [
      ["Titularidad", `Este sitio web es operado por ${COMPANY_NAME} ("la Inmobiliaria"). Su contenido tiene carácter informativo y comercial.`],
      ["Propiedad intelectual", "Textos, marca, diseño y estructura del sitio están protegidos. Queda prohibida su reproducción total o parcial sin autorización escrita. Las imágenes son ilustrativas y pueden proceder de bancos de imágenes de terceros."],
      ["Exención de responsabilidad", "Los precios, superficies, características y la disponibilidad de las propiedades son orientativos, pueden cambiar sin previo aviso y no constituyen una oferta vinculante. La disponibilidad debe confirmarse por escrito con un asesor. Las equivalencias en AED usan un tipo de cambio de referencia (3,6725) y no reflejan el cambio de mercado vigente."],
      ["Enlaces externos", "La Inmobiliaria no se responsabiliza del contenido ni de las políticas de sitios o servicios de terceros, como WhatsApp."],
    ],
  },
  privacidad: {
    titulo: "Política de Privacidad",
    secciones: [
      ["Datos que tratamos", "Solo los que tú introduces en el formulario de contacto: nombre, teléfono opcional, fecha preferida y comentarios."],
      ["Finalidad", "Gestionar tu solicitud de visita o cotización. Al enviar el formulario, tu mensaje se abre en WhatsApp para que lo envíes tú; este sitio no almacena esos datos en sus servidores."],
      ["Terceros", "WhatsApp (Meta) procesa los mensajes conforme a sus propias condiciones y política de privacidad."],
      ["Tus derechos", "Puedes solicitar acceso, rectificación o eliminación de los datos que nos hayas comunicado escribiéndonos por WhatsApp."],
      ["Seguridad", "Aplicamos medidas técnicas razonables (cifrado en tránsito, cabeceras de seguridad y limitación de peticiones)."],
    ],
  },
  terminos: {
    titulo: "Términos y Condiciones de Servicio",
    secciones: [
      ["Uso del sitio", "Al navegar por este sitio aceptas estos términos. Te comprometes a usarlo de forma lícita y a no realizar peticiones automatizadas abusivas."],
      ["Naturaleza del servicio", "La Inmobiliaria presenta propiedades y coordina visitas y cotizaciones. Ningún contenido del sitio constituye contrato de compraventa, reserva ni asesoría legal o fiscal."],
      ["Precios y disponibilidad", "Todos los precios y estados (Disponible / Reservada) son informativos, están sujetos a cambios y a confirmación por el propietario o la Inmobiliaria. Impuestos, tasas de registro y comisiones no están incluidos salvo indicación expresa."],
      ["Limitación de responsabilidad", "La Inmobiliaria no responde por decisiones tomadas únicamente con la información del sitio. Se recomienda verificar toda la documentación con asesores independientes antes de cualquier operación."],
      ["Modificaciones", "Estos textos pueden actualizarse en cualquier momento. La versión publicada es la vigente."],
    ],
  },
};

export default function Footer() {
  const [open, setOpen] = useState<DocKey | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const doc = open ? DOCS[open] : null;

  return (
    <footer id="contacto" className="w-full max-w-full overflow-x-hidden border-t border-dashed border-cork-border px-5 py-12 md:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="heading">{COMPANY_NAME}</p>
        <div className="flex flex-col gap-4 md:max-w-md">
          <p className="body-copy">Asesoría privada para compradores internacionales. Coordinamos tu visita a la propiedad que elijas.</p>
          <a
            href={whatsappUrl(`Hola, quiero información sobre las propiedades de ${COMPANY_NAME}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="label self-start rounded-outlined border border-warm-cream px-5 py-3 transition-colors hover:bg-bark-brown"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-dashed border-cork-border pt-6">
        <div className="flex flex-col gap-3 md:flex-row md:gap-8">
          {(Object.keys(DOCS) as DocKey[]).map((k) => (
            <button key={k} type="button" onClick={() => setOpen(k)} className="label self-start underline underline-offset-4">
              {DOCS[k].titulo}
            </button>
          ))}
        </div>
        <p className="label text-[11px]">© 2026 {COMPANY_NAME}. Todos los derechos reservados.</p>
        <p className="text-[10px] font-medium uppercase leading-[1.3] text-ember-accent">
          * Los precios, superficies y la disponibilidad de las propiedades son orientativos, pueden variar sin previo aviso y no constituyen oferta vinculante. Conversiones a EUR y VES (tasa oficial) y AED (3,6725) son referenciales y pueden variar. Imágenes ilustrativas.
        </p>
      </div>

      {doc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={doc.titulo}
          className="fixed inset-0 z-[60] flex w-full max-w-full items-end justify-center bg-walnut-shadow/80 backdrop-blur-sm md:items-center md:p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="flex max-h-[85svh] w-full max-w-2xl flex-col gap-6 overflow-y-auto overflow-x-hidden rounded-t-card border border-cork-border bg-bark-brown p-6 md:rounded-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[24px] font-medium uppercase leading-[1.09]">{doc.titulo}</h2>
              <button type="button" onClick={() => setOpen(null)} className="label shrink-0 rounded-outlined border border-warm-cream px-4 py-2">
                Cerrar
              </button>
            </div>
            {doc.secciones.map(([h, t]) => (
              <section key={h} className="flex flex-col gap-2 border-t border-dashed border-cork-border pt-4">
                <h3 className="label">{h}</h3>
                <p className="text-[16px] leading-[1.4] break-words">{t}</p>
              </section>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}

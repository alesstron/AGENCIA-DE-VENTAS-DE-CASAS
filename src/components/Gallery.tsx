"use client";

/**
 * Galería de la ficha: imagen principal con transición direccional + carrusel de miniaturas.
 * Estado `[active, dir]`: índice de la foto visible y dirección (1 avanza / -1 retrocede),
 * que define de qué lado entra y sale la imagen en la animación (variants con `custom`).
 * Navegación: flechas, miniaturas y arrastre horizontal (drag="x"); `touch-pan-y` mantiene el scroll vertical en móvil.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DUR, EASE } from "./motion";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [[active, dir], setState] = useState<[number, number]>([0, 0]);

  // Salta a una foto concreta (miniatura): la dirección depende de si el índice es mayor o menor que el actual.
  const go = (i: number) => setState([(i + images.length) % images.length, i > active ? 1 : -1]);
  // Avanza (+1) o retrocede (-1) de forma circular con el módulo sobre el total de fotos.
  const step = (d: number) => setState([(active + d + images.length) % images.length, d]);

  return (
    <div className="flex w-full max-w-full flex-col gap-3">
      {/* Visor: 16/9 con altura máxima 480/500 px, fondo bark-brown y object-cover (sin deformar la imagen) */}
      <div className="relative aspect-[16/9] max-h-[480px] w-full overflow-hidden rounded-3xl bg-bark-brown shadow-2xl shadow-black/70 md:max-h-[500px]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${title} — foto ${active + 1}`}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 1.08, filter: "blur(10px)" }),
              center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
              exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.97, filter: "blur(6px)" }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: DUR.slow, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            // Gesto de arrastre: más de 60 px a la izquierda = siguiente; a la derecha = anterior
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) step(1);
              else if (info.offset.x > 60) step(-1);
            }}
            className="absolute inset-0 h-full w-full cursor-grab touch-pan-y object-cover will-change-transform active:cursor-grabbing"
            draggable={false}
          />
        </AnimatePresence>

        {/* Controles: anterior, siguiente y contador */}
        <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className="label absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-warm-cream/30 bg-walnut-shadow/50 px-3.5 py-2.5 backdrop-blur-md transition-transform active:scale-90">
          ←
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Foto siguiente" className="label absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-warm-cream/30 bg-walnut-shadow/50 px-3.5 py-2.5 backdrop-blur-md transition-transform active:scale-90">
          →
        </button>
        <span className="label absolute bottom-3 right-3 z-10 rounded-full border border-warm-cream/20 bg-walnut-shadow/60 px-3 py-1.5 text-[10px] backdrop-blur-md">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Miniaturas: carrusel táctil horizontal; usan la versión w=400 de la imagen para ahorrar datos */}
      <div className="hide-scrollbar flex touch-pan-x overflow-x-auto whitespace-nowrap gap-3">
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => go(i)}
            whileTap={{ scale: 0.94 }}
            animate={{ opacity: i === active ? 1 : 0.55 }}
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === active}
            className={`h-16 w-24 shrink-0 overflow-hidden rounded-2xl border bg-bark-brown md:h-20 md:w-32 ${
              i === active ? "border-warm-cream" : "border-cork-border"
            }`}
          >
            <img src={src.replace("w=1600", "w=400")} alt="" className="h-full w-full object-cover" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

# CLAUDE.md — Dubai Luxury Estates

Portal inmobiliario de alto lujo (Next.js 15 App Router + Tailwind v4 + TypeScript).
Sistema visual: `DESIGN.MD/DESIGN.md` (walnut `#100904`, crema `#ffedd7`, bark `#382416`, cork `#40372e`, ember `#dc5000` solo para créditos/notas legales).

## Normas obligatorias mobile-first
- Cero scroll horizontal: `overflow-x-hidden w-full max-w-full` en body, main, secciones y contenedores de página.
- Carruseles táctiles (filtros de categoría, miniaturas): `flex overflow-x-auto touch-pan-x whitespace-nowrap` (+ `hide-scrollbar`, hijos `shrink-0`).
- Tarjetas apiladas en móvil con `flex flex-col`; grid solo desde `md:`.
- Imágenes en contenedores oscuros (`bg-bark-brown`) con `object-cover` / `object-contain`, nunca deformadas.
- Estilo: texto en mayúsculas peso 500, sin sombras, divisores 1px dashed `cork-border`, radios 12 / 22.5 / 36 px, inputs solo con borde inferior, un solo botón relleno por sección.

## Estructura
- `src/data/properties.ts` — catálogo (8 propiedades), tipos, formateo USD/AED (`USD_TO_AED = 3.6725`).
- `src/app/page.tsx` → `components/Catalog.tsx` (hero + filtros + grid).
- `src/app/propiedades/[id]/page.tsx` — ficha SSG (`generateStaticParams`), `Gallery`, `ContactForm`.
- `ContactForm` abre `https://api.whatsapp.com/send` con nombre + título + referencia. Número vía `NEXT_PUBLIC_WHATSAPP` (por defecto placeholder `971500000000`).

## Registro de avance
- [x] Datos de 8 propiedades con galería Unsplash verificada (HTTP 200).
- [x] Catálogo con hero, filtros (tipo/precio/ubicación/búsqueda) y grid.
- [x] Ficha dinámica: galería, banner, specs, amenidades con íconos, inventario, plano proporcional, formulario WhatsApp.
- [x] `npm run build` sin errores.
- [ ] Reemplazar número de WhatsApp real y subir a hosting.

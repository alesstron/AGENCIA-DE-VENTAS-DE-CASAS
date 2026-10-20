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
- `src/lib/contact.ts`: `WHATSAPP_NUMBER = 584245535901`, `COMPANY_NAME`, `sanitize()` y `whatsappUrl()` (`https://api.whatsapp.com/send?phone=…&text=…`). Usado por `ContactForm` y `Footer`.
- `components/Footer.tsx`: © 2026, modales Aviso Legal / Privacidad / Términos, exención de responsabilidad sobre precios y disponibilidad.
- Seguridad: `next.config.js` (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer/Permissions-Policy), `src/middleware.ts` (rate limit 120 req/min por IP, en memoria; usar Redis/CDN si hay varias instancias), `sanitize()` en el formulario.

## Animación (framer-motion)
- DESIGN.md no define animación; tokens propios en `components/motion.tsx`: `EASE = [0.22,1,0.36,1]`, `DUR` 0,3 / 0,6 / 0,9 / 1,2 s. Rotaciones 3D ≤ 8° (tilt) y revelaciones de entrada con blur-to-clear.
- `MotionProvider` (`reducedMotion="user"`) en el layout; `Reveal` (scroll fade-up/scale-in/flip), `TiltCard` (tilt + glare, solo ratón), `CountUp`.
- Rendimiento móvil: animar solo `transform`/`opacity`/`filter`, `will-change-transform`, carruseles `touch-pan-x`, galería con `touch-pan-y` + drag horizontal, `overflow-x-hidden` global.
- Radios: `--radius-card` = 16 px (rounded-2xl); paneles grandes `rounded-3xl`. Glassmorphism: `bg-warm-cream/[0.03] backdrop-blur-md`.
- Ficha: `TechTabs` (Planos con selector de nivel incl. Rooftop/Piscina, Inventario, Especificaciones de lujo), matriz de inversión y entorno VIP (cifras ilustrativas, con descargo).

## Multi-moneda y catálogo internacional
- `components/currency.tsx`: `CurrencyProvider` (USD/EUR/VES, persistido en localStorage), `Price`, `PriceRef`, `CurrencySelect` (header y formulario). Tasas desde `/api/rates` (open.er-api.com, caché 1 h, respaldo estático). El mensaje de WhatsApp incluye el precio en la moneda elegida.
- Catálogo: 8 propiedades en Dubái + 4 en Caracas (`ciudad`), filtro por ciudad/zona. Cifras de inversión y distancias ilustrativas.
- Ficha: galería `aspect-[16/9] max-h-[480px] md:max-h-[500px] rounded-3xl shadow-2xl`; título, precio y acciones (`QuickActions`) junto a la galería.

## Reglas anti-regresión
- No tocar `overflow-x-hidden w-full max-w-full` ni los carruseles `touch-pan-x`; verificar a 360 px de ancho tras cualquier cambio de layout.
- Precios siempre vía `Price`/`PriceRef` (nunca formatear a mano); nuevas monedas se añaden en `currency.tsx` con respaldo estático.
- Enlaces WhatsApp solo con `whatsappUrl()` y entradas con `sanitize()`; no hardcodear el número fuera de `src/lib/contact.ts`.
- Animar solo `transform`/`opacity`/`filter`; mantener `reducedMotion="user"` y tilt ≤ 8°.
- Nuevas propiedades: añadir a `src/data/properties.ts` (con `ciudad`), imágenes verificadas HTTP 200; `generateStaticParams` las recoge solo.
- Antes de cada push: `npm run build` sin errores. Si falla por memoria, comprobar `NODE_OPTIONS` del entorno.
- Despliegue: GitHub `main` → Vercel (preset Next.js, sin variables de entorno).
- Comentarios: todo el código fuente lleva comentarios en español (cabecera de archivo con propósito y flujo de datos + notas en la lógica no obvia). Mantenerlos al modificar código; los comentarios obsoletos cuentan como regresión.
- Build en Windows con poca RAM: si `next build` falla con 'heap out of memory' en la generación estática, cerrar procesos (p. ej. `npm run dev`) y reintentar.

## Registro de avance
- [x] Datos de 8 propiedades con galería Unsplash verificada (HTTP 200).
- [x] Catálogo con hero, filtros (tipo/precio/ubicación/búsqueda) y grid.
- [x] Ficha dinámica: galería, banner, specs, amenidades con íconos, inventario, plano proporcional, formulario WhatsApp.
- [x] `npm run build` sin errores.
- [x] WhatsApp oficial 584245535901, footer legal, cabeceras de seguridad, rate limiting, sanitización, `npm audit` = 0 (Next 15.5.28 + override postcss).
- [x] Animaciones 3D, tilt/glare, scroll reveals, ficha técnica ampliada.
- [x] Multi-moneda USD/EUR/VES, catálogo Dubái + Caracas (12 propiedades), README profesional, `npm run build` limpio (17 páginas).
- [ ] Revisión en navegador (`npm run dev -- -p 3001`) y después `git push` (pendiente de aprobación).

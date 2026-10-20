# Agencia Inmobiliaria de Alto Lujo (Dubai & Caracas VIP)

Portal web para una agencia inmobiliaria de alto lujo con catálogo internacional: **8 propiedades en Dubái** y **4 en Caracas**. Combina una presentación editorial oscura (walnut / crema), fichas técnicas densas orientadas a inversionistas, precios multi-moneda en tiempo real y contacto directo por WhatsApp Business, con maquetación estrictamente mobile-first.

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router, SSG con `generateStaticParams`) |
| Lenguaje | TypeScript (estricto) |
| Estilos | Tailwind CSS v4 |
| Animación | Framer Motion |
| Despliegue | Vercel |

## Características destacadas

- **Rutas dinámicas** `/propiedades/[id]`: fichas generadas estáticamente para todo el catálogo.
- **Selector multi-moneda en tiempo real**: USD `$`, EUR `€` y VES `Bs.`; tasas desde `/api/rates` (open.er-api.com, caché de 1 h, respaldo estático), elección persistida en `localStorage`. Equivalencia AED con `USD_TO_AED = 3.6725`.
- **Ficha técnica densa**: matriz de inversión (ROI), planos con selector de nivel (incl. Rooftop/Piscina), inventario, especificaciones de lujo, amenidades con iconos y entorno VIP. *Las cifras de inversión y distancias son ilustrativas.*
- **Integración universal con WhatsApp Business** (número `584245535901`) vía `https://api.whatsapp.com/send?phone=…&text=…`; el mensaje incluye la propiedad y el precio en la moneda elegida.
- **Animaciones 3D con perspectiva**: tilt con glare (solo ratón), revelaciones al hacer scroll con blur-to-clear, contadores animados; rotaciones ≤ 8° y `prefers-reduced-motion` respetado.
- **Maquetación mobile-first estricta**: cero scroll horizontal, carruseles táctiles, tarjetas apiladas en móvil y grid desde `md:`.
- **Catálogo exclusivo**: Dubái (Palm Jumeirah, Downtown Dubai, Emirates Hills, Dubai Marina, Jumeirah Bay, DIFC, Al Barari, Bluewaters) y Caracas (Country Club, Altamira, La Lagunita, Las Mercedes), con hero, filtros (tipo, precio, ciudad/zona) y búsqueda.
- **Detalle optimizado**: galería `16/9` con proporciones ajustadas (máx. 480–500 px) y ficha técnica con ROI, planos y especificaciones de acabados.

## Estructura

```
src/
  app/
    page.tsx                    # Catálogo
    propiedades/[id]/page.tsx   # Ficha SSG
    api/rates/route.ts          # Tasas de cambio (caché 1 h)
    layout.tsx, globals.css
  components/                   # Catalog, PropertyCard, Gallery, TechTabs, ContactForm,
                                # QuickActions, Footer, currency, motion
  data/properties.ts            # Catálogo, tipos, formateo de precios
  lib/contact.ts                # WhatsApp, sanitize(), whatsappUrl()
  middleware.ts                 # Rate limiting
next.config.js                  # Cabeceras de seguridad
DESIGN.MD/DESIGN.md             # Sistema visual
```

## Instalación y desarrollo local

Requisitos: Node.js 20+ y npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificación de tipos + build de producción
npm run start    # sirve el build de producción
```

Configuración: el número de WhatsApp (`WHATSAPP_NUMBER`) y el nombre de la empresa (`COMPANY_NAME`) están en `src/lib/contact.ts`. No se requieren variables de entorno.

## Despliegue en Vercel

1. Importar el repositorio de GitHub en Vercel (preset *Next.js* detectado automáticamente).
2. Comandos por defecto: `npm run build`, salida `.next`.
3. Cada `git push` a `main` genera un despliegue a producción.

## Seguridad y rendimiento

- **Cabeceras** (`next.config.js`): CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy y Permissions-Policy.
- **Rate limiting** en `src/middleware.ts`: 120 req/min por IP, en memoria (usar Redis/CDN si hay varias instancias).
- **Sanitización** de entradas del formulario con `sanitize()`.
- `npm audit` = 0 vulnerabilidades (Next 15.5.28 + override de `postcss`).
- Páginas de ficha pre-renderizadas (SSG); animaciones solo con `transform`/`opacity`/`filter`; `MotionProvider` con `reducedMotion="user"`.

## Diseño

Sistema visual en `DESIGN.MD/DESIGN.md`; normas de maquetación y arquitectura en `CLAUDE.md`.

## Aviso

Precios, cifras de inversión y disponibilidad son referenciales y no constituyen oferta vinculante (ver modales legales en el footer).

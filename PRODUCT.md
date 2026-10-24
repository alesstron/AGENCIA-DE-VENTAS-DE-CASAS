# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos audiencias con el mismo peso:

- **Inversionistas** que evalúan rentabilidad (ROI), comparan propiedades y deciden si escribir a un asesor.
- **Compradores residenciales** de alto patrimonio que buscan vivienda propia en Dubái o en Caracas.

Ambos llegan sobre todo desde el móvil (el sitio es estrictamente mobile-first) y leen en español.

## Product Purpose

"Dubai Luxury Estates" es el portal de una agencia inmobiliaria de alto lujo con catálogo en Dubái y en Caracas. Permite explorar y filtrar propiedades, revisar una ficha técnica densa y contactar directamente a un asesor por WhatsApp con la propiedad y el precio ya incluidos en el mensaje. El éxito es una conversación de WhatsApp iniciada con una propiedad concreta.

## Positioning

El puente Dubái–Caracas: un mismo catálogo, en español, que conecta a clientes venezolanos y latinos con propiedades de lujo en Dubái y en las mejores zonas de Caracas, con precios en su moneda (USD, EUR o bolívares).

## Operating Context

- Navegación: catálogo (hero, filtros por tipo, precio, ciudad/zona y búsqueda) → ficha de la propiedad → WhatsApp.
- Contacto únicamente por WhatsApp Business (`whatsappUrl()` en `src/lib/contact.ts`); no hay backend de leads.
- Selector de moneda USD / EUR / VES persistido en el navegador; tasas desde `/api/rates` con respaldo estático.
- Despliegue en Vercel desde la rama `main`.

## Capabilities and Constraints

- Next.js 15 (App Router, SSG), TypeScript, Tailwind CSS v4 y Framer Motion. Las fichas se generan estáticamente.
- Catálogo de 12 propiedades: 8 en Dubái y 4 en Caracas (`src/data/properties.ts`).
- Ficha: galería, especificaciones, amenidades, planos por nivel, inventario, matriz de inversión, entorno VIP y acciones rápidas.
- Restricciones vigentes en `CLAUDE.md`: cero scroll horizontal y verificación a 360 px, precios solo vía `Price`/`PriceRef`, WhatsApp solo vía `whatsappUrl()` con `sanitize()`, animar solo `transform`/`opacity`/`filter` con `reducedMotion="user"`, comentarios del código en español.
- Seguridad: cabeceras CSP/HSTS en `next.config.js` y límite de peticiones en `src/middleware.ts`; no debilitarlas.

## Brand Commitments

- Nombre: "Dubai Luxury Estates" (`COMPANY_NAME`).
- Idioma: español (`lang="es"`).
- Contacto oficial: WhatsApp `584245535901`, definido solo en `src/lib/contact.ts`.
- Footer legal obligatorio: Aviso Legal, Privacidad, Términos y la exención sobre precios y disponibilidad.

## Evidence on Hand

Todo el contenido es de ejemplo: propiedades, fotos (Unsplash), precios, cifras de inversión y distancias son ilustrativos y así lo indica el sitio. No hay testimonios, clientes, ventas cerradas, premios ni prensa reales; el trabajo futuro no debe inventarlos ni presentar cifras como verificadas.

## Product Principles

1. Cada camino termina en WhatsApp con una propiedad concreta y su precio en la moneda del cliente.
2. Dubái y Caracas son igual de importantes: ninguna ciudad es secundaria en filtros, catálogo ni mensajes.
3. Servir a las dos audiencias en la misma ficha: lo que vende la vivienda arriba, los datos de inversión al alcance sin estorbar.
4. Honestidad con el contenido de ejemplo: los descargos se mantienen visibles y no se fabrican pruebas sociales.
5. El móvil es la experiencia principal, no una adaptación.

## Accessibility & Inclusion

Respetar `prefers-reduced-motion` (ya implementado con `reducedMotion="user"`) y que todo funcione con tacto en pantallas de 360 px. No se ha fijado un estándar formal (p. ej. WCAG AA).

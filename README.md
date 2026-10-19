# Dubai Luxury Estates

Portal web para una agencia inmobiliaria de alto lujo inspirada en Dubái. Next.js 15 (App Router), Tailwind CSS v4, TypeScript.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificación de tipos + build estático
```

Variable opcional: `NEXT_PUBLIC_WHATSAPP` (número con código de país, sin `+`), p. ej. `NEXT_PUBLIC_WHATSAPP=971501234567`.

## Funcionalidades
- Catálogo con hero, búsqueda y filtros por tipo, precio y ubicación.
- 8 propiedades en `src/data/properties.ts`; ficha técnica en `/propiedades/[id]`.
- Galería interactiva, especificaciones, amenidades VIP, inventario, plano de distribución proporcional.
- Formulario "Agendar visita / Cotizar" que abre WhatsApp con el nombre y la referencia de la propiedad.
- Precios en USD con equivalencia AED (3,6725).

## Diseño
Guía en `DESIGN.MD/DESIGN.md`; normas de maquetación en `CLAUDE.md`.

/**
 * Configuración de Next.js: cabeceras de seguridad HTTP y optimización de imágenes.
 * Las cabeceras se aplican a todas las rutas mediante headers() (ver más abajo).
 */

// En desarrollo se relajan algunas directivas de la CSP (HMR/WebSocket de Next).
const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy: lista blanca de orígenes desde los que el navegador puede cargar recursos.
// Mitiga XSS y la inyección de contenido de terceros.
// Next.js inyecta scripts/estilos inline, por eso 'unsafe-inline'; 'unsafe-eval' solo en desarrollo (HMR).
const csp = [
  // Por defecto, solo recursos del mismo origen.
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // Imágenes: propias, data/blob y el CDN de Unsplash (galerías del catálogo).
  "img-src 'self' data: blob: https://images.unsplash.com",
  // Fuentes: Inter se autoaloja vía next/font, por lo que no hace falta un CDN externo.
  "font-src 'self' data:",
  // fetch/XHR solo al propio origen (/api/rates); ws/wss en desarrollo para el HMR.
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  // Sin plugins (Flash, <object>, <embed>).
  "object-src 'none'",
  // Impide cambiar la URL base del documento (inyección de <base>).
  "base-uri 'self'",
  // Los formularios solo pueden enviarse al propio origen (el contacto abre WhatsApp mediante enlace, no POST).
  "form-action 'self'",
  // Nadie puede incrustar el sitio en un iframe (anti-clickjacking; equivale a X-Frame-Options).
  "frame-ancestors 'none'",
  // En producción, el navegador promueve las peticiones http a https.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

// Cabeceras de seguridad enviadas en cada respuesta.
const securityHeaders = [
  // CSP construida arriba.
  { key: "Content-Security-Policy", value: csp },
  // HSTS: obliga a usar HTTPS durante 2 años, incluye subdominios y es apto para la lista preload.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Anti-clickjacking para navegadores antiguos sin soporte de frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  // Evita que el navegador "adivine" el tipo MIME (MIME sniffing).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Envía el origen completo solo a mismo sitio; a terceros, solo el dominio y bajo HTTPS.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desactiva APIs sensibles que el sitio no usa (cámara, micrófono, geolocalización, FLoC).
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Oculta la cabecera "X-Powered-By: Next.js" para no revelar el stack.
  poweredByHeader: false,
  // Optimización de imágenes (next/image): solo se permite el CDN de Unsplash como origen remoto;
  // Next sirve formatos modernos redimensionados y con caché.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Aplica las cabeceras de seguridad a todas las rutas.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;

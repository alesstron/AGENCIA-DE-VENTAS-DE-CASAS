/**
 * Middleware de Next.js (se ejecuta en el Edge antes de cada petición que coincida con `config.matcher`).
 * Su única función es limitar la tasa de peticiones por IP para mitigar abuso y scraping.
 */
import { NextResponse, type NextRequest } from "next/server";

/**
 * Rate limiting por IP (ventana fija, en memoria).
 * Limitación: el contador vive en cada instancia/proceso; en despliegues serverless
 * o multi-instancia conviene un almacén compartido (Redis/Upstash) y protección L7 en el CDN.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 120; // por IP y ventana
const MAX_TRACKED = 10_000; // tope de IPs en memoria

// IP -> { contador de la ventana actual, instante (ms) en que se reinicia }.
const hits = new Map<string, { count: number; reset: number }>();

// Obtiene la IP del cliente desde las cabeceras que añade el proxy/CDN (Vercel usa x-forwarded-for).
function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function middleware(req: NextRequest) {
  const now = Date.now();
  const ip = clientIp(req);

  // Limpieza: si el mapa crece demasiado se purgan las ventanas vencidas; si aún así excede el tope, se vacía
  // (evita fugas de memoria ante muchas IPs distintas).
  if (hits.size > MAX_TRACKED) {
    for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
    if (hits.size > MAX_TRACKED) hits.clear();
  }

  // Ventana fija: si no hay registro o ya venció, se abre una nueva de 60 s.
  let entry = hits.get(ip);
  if (!entry || entry.reset <= now) {
    entry = { count: 0, reset: now + WINDOW_MS };
    hits.set(ip, entry);
  }
  entry.count++;

  // Límite superado: 429 con Retry-After (segundos hasta el reinicio de la ventana).
  if (entry.count > MAX_REQUESTS) {
    const retry = Math.ceil((entry.reset - now) / 1000);
    return new NextResponse("Demasiadas solicitudes. Intenta de nuevo en unos instantes.", {
      status: 429,
      headers: { "Retry-After": String(retry), "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Petición válida: continúa y expone el límite y las peticiones restantes en cabeceras informativas.
  const res = NextResponse.next();
  res.headers.set("X-RateLimit-Limit", String(MAX_REQUESTS));
  res.headers.set("X-RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS - entry.count)));
  return res;
}

// Se aplica a páginas y a /api; se excluyen los estáticos y las imágenes optimizadas de Next.
export const config = {
  // Páginas y rutas de API; excluye estáticos de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

import { NextResponse, type NextRequest } from "next/server";

/**
 * Rate limiting por IP (ventana fija, en memoria).
 * Limitación: el contador vive en cada instancia/proceso; en despliegues serverless
 * o multi-instancia conviene un almacén compartido (Redis/Upstash) y protección L7 en el CDN.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 120; // por IP y ventana
const MAX_TRACKED = 10_000; // tope de IPs en memoria

const hits = new Map<string, { count: number; reset: number }>();

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function middleware(req: NextRequest) {
  const now = Date.now();
  const ip = clientIp(req);

  if (hits.size > MAX_TRACKED) {
    for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
    if (hits.size > MAX_TRACKED) hits.clear();
  }

  let entry = hits.get(ip);
  if (!entry || entry.reset <= now) {
    entry = { count: 0, reset: now + WINDOW_MS };
    hits.set(ip, entry);
  }
  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    const retry = Math.ceil((entry.reset - now) / 1000);
    return new NextResponse("Demasiadas solicitudes. Intenta de nuevo en unos instantes.", {
      status: 429,
      headers: { "Retry-After": String(retry), "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const res = NextResponse.next();
  res.headers.set("X-RateLimit-Limit", String(MAX_REQUESTS));
  res.headers.set("X-RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS - entry.count)));
  return res;
}

export const config = {
  // Páginas y rutas de API; excluye estáticos de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

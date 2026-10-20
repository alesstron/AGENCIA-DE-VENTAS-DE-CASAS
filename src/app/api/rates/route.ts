/**
 * Endpoint GET /api/rates: devuelve tasas de cambio con base USD (USD/EUR/VES) para el selector de moneda.
 * Flujo: CurrencyProvider (cliente) -> /api/rates -> open.er-api.com (con caché de 1 h);
 * si la fuente falla, responde con tasas de respaldo y `live: false`.
 */
import { NextResponse } from "next/server";

// Caché de la ruta: se regenera como máximo cada hora (ISR).
export const revalidate = 3600;

// Valores de respaldo si la fuente no responde (aproximados).
const FALLBACK = { USD: 1, EUR: 0.89, VES: 881 };

export async function GET() {
  try {
    // Timeout de 6 s para no bloquear la respuesta si la API externa tarda.
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    // Validación: solo se aceptan tasas numéricas positivas.
    const eur = Number(data?.rates?.EUR);
    const ves = Number(data?.rates?.VES);
    if (!(eur > 0) || !(ves > 0)) throw new Error("tasas inválidas");
    // Respuesta con tasas reales; CDN: 1 h de caché + 10 min de stale-while-revalidate.
    return NextResponse.json(
      { rates: { USD: 1, EUR: eur, VES: ves }, updated: data.time_last_update_utc ?? null, live: true },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" } },
    );
  } catch {
    // Fallo de red/validación: tasas estáticas aproximadas y caché corta (5 min) para reintentar pronto.
    return NextResponse.json({ rates: FALLBACK, updated: null, live: false }, { headers: { "Cache-Control": "public, s-maxage=300" } });
  }
}

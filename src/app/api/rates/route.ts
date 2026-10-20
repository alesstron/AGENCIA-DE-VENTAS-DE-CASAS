import { NextResponse } from "next/server";

export const revalidate = 3600;

// Valores de respaldo si la fuente no responde (aproximados).
const FALLBACK = { USD: 1, EUR: 0.89, VES: 881 };

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const eur = Number(data?.rates?.EUR);
    const ves = Number(data?.rates?.VES);
    if (!(eur > 0) || !(ves > 0)) throw new Error("tasas inválidas");
    return NextResponse.json(
      { rates: { USD: 1, EUR: eur, VES: ves }, updated: data.time_last_update_utc ?? null, live: true },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" } },
    );
  } catch {
    return NextResponse.json({ rates: FALLBACK, updated: null, live: false }, { headers: { "Cache-Control": "public, s-maxage=300" } });
  }
}

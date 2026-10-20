"use client";

/**
 * Sistema multi-moneda (USD $, EUR €, VES Bs.).
 * Flujo: los precios se guardan en USD (data/properties.ts) -> CurrencyProvider carga las tasas desde /api/rates
 * (con respaldo estático) -> `format()` convierte y da formato -> los componentes <Price>, <PriceRef> y
 * <CurrencySelect> lo consumen mediante el contexto. La elección se persiste en localStorage.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Monedas soportadas.
export type Currency = "USD" | "EUR" | "VES";

// Etiquetas y símbolos para el selector y el formateo.
export const CURRENCIES: { code: Currency; label: string; symbol: string }[] = [
  { code: "USD", label: "USD $", symbol: "$" },
  { code: "EUR", label: "EUR €", symbol: "€" },
  { code: "VES", label: "VES Bs.", symbol: "Bs." },
];

// Tasas respecto a 1 USD. DEFAULT_RATES se usa hasta que llega /api/rates o si este falla (valores aproximados).
type Rates = Record<Currency, number>;
const DEFAULT_RATES: Rates = { USD: 1, EUR: 0.89, VES: 881 };

// Valor del contexto de moneda.
interface Ctx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Rates;
  live: boolean;
  updated: string | null;
  /** Formatea un monto en USD en la moneda seleccionada (o en la indicada). */
  format: (usd: number, as?: Currency) => string;
}

const CurrencyContext = createContext<Ctx | null>(null);

// Formateador numérico en locale es-VE (miles con punto, sin decimales por defecto).
const nf = (maxFrac = 0) => new Intl.NumberFormat("es-VE", { maximumFractionDigits: maxFrac });

// Proveedor (montado en el layout): estado de moneda, tasas y estado "en vivo".
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);
  const [live, setLive] = useState(false);
  const [updated, setUpdated] = useState<string | null>(null);

  // Al montar: recupera la moneda guardada y pide las tasas. `cancelled` evita actualizar estado tras desmontar.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currency");
      if (saved === "USD" || saved === "EUR" || saved === "VES") setCurrencyState(saved);
    } catch {}
    let cancelled = false;
    fetch("/api/rates")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (cancelled) return;
        setRates({ ...DEFAULT_RATES, ...d.rates });
        setLive(Boolean(d.live));
        setUpdated(d.updated ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Cambia la moneda y la persiste (try/catch: localStorage puede no estar disponible).
  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("currency", c);
    } catch {}
  }, []);

  // Convierte un monto en USD a la moneda pedida y lo formatea (VES con prefijo "Bs. ").
  const format = useCallback(
    (usd: number, as: Currency = currency) => {
      const v = usd * rates[as];
      const sym = CURRENCIES.find((c) => c.code === as)!.symbol;
      return as === "VES" ? `Bs. ${nf().format(v)}` : `${sym}${nf().format(v)}`;
    },
    [currency, rates],
  );

  const value = useMemo(() => ({ currency, setCurrency, rates, live, updated, format }), [currency, setCurrency, rates, live, updated, format]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

// Hook de acceso al contexto; falla de forma explícita si falta el proveedor.
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency requiere CurrencyProvider");
  return ctx;
}

/** Precio principal en la moneda elegida. */
export function Price({ usd, className = "" }: { usd: number; className?: string }) {
  const { format } = useCurrency();
  return <span className={className}>{format(usd)}</span>;
}

/** Referencia secundaria: USD si se eligió otra moneda; AED si está en USD. */
export function PriceRef({ usd, className = "" }: { usd: number; className?: string }) {
  const { currency, format } = useCurrency();
  return (
    <span className={className}>
      {/* 3.6725 = paridad oficial USD/AED (igual que USD_TO_AED en data/properties.ts) */}
      {currency === "USD" ? `≈ AED ${nf().format(usd * 3.6725)}` : `Ref. ${format(usd, "USD")} USD`}
    </span>
  );
}

/** Selector de moneda (píldoras táctiles). `compact` = versión corta para el header; la completa muestra la tasa. */
export function CurrencySelect({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrency, live, updated, rates } = useCurrency();
  return (
    <div className="flex flex-col gap-1">
      <div role="group" aria-label="Moneda" className="flex touch-pan-x overflow-x-auto whitespace-nowrap rounded-full border border-warm-cream/40 p-0.5 hide-scrollbar">
        {CURRENCIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => setCurrency(c.code)}
            aria-pressed={currency === c.code}
            className={`label shrink-0 rounded-full transition-colors duration-300 active:scale-95 ${compact ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5"} ${
              currency === c.code ? "bg-warm-cream text-walnut-shadow" : "hover:bg-bark-brown"
            }`}
          >
            {compact ? c.code : c.label}
          </button>
        ))}
      </div>
      {!compact && (
        <p className="label text-[10px] text-driftwood">
          1 USD = {rates.EUR.toFixed(3)} EUR · {rates.VES.toFixed(2)} Bs. {live ? `· en vivo${updated ? ` (${updated.slice(5, 16)} UTC)` : ""}` : "· tasa referencial"}
        </p>
      )}
    </div>
  );
}

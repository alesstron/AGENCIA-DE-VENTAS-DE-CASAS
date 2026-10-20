/**
 * Layout raíz: envuelve todas las páginas.
 * Jerarquía de proveedores: MotionProvider (animaciones, respeta prefers-reduced-motion)
 *  -> CurrencyProvider (moneda USD/EUR/VES compartida por header, catálogo, fichas y formulario)
 *  -> header fijo + <main> + Footer.
 * Mobile-first: body y main con overflow-x-hidden / w-full / max-w-full (cero scroll horizontal).
 */
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MotionProvider } from "@/components/motion";
import { CurrencyProvider, CurrencySelect } from "@/components/currency";
import Footer from "@/components/Footer";
import { COMPANY_NAME } from "@/lib/contact";
import "./globals.css";

// Fuente Inter autoalojada por next/font (sin peticiones a Google en runtime).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// SEO básico: título y descripción de todo el sitio.
export const metadata: Metadata = {
  title: "Dubai Luxury Estates — Propiedades de alto lujo en Dubái y Caracas",
  description: "Villas, penthouses y mansiones ultra-exclusivas en Dubái y Caracas.",
};

// Viewport móvil estándar.
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden bg-walnut-shadow text-warm-cream antialiased">
        <MotionProvider>
        <CurrencyProvider>
        {/* Cabecera fija translúcida (glass): marca, selector de moneda y enlaces (ocultos en móvil) */}
        <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full border-b border-dashed border-cork-border bg-walnut-shadow/70 backdrop-blur-md">
          <nav className="flex items-center justify-between px-5 py-4 md:px-10">
            <Link href="/" className="label min-w-0 truncate pr-3 tracking-normal">
              {COMPANY_NAME}
            </Link>
            <div className="flex min-w-0 items-center gap-3 md:gap-8">
              <CurrencySelect compact />
              <Link href="/#propiedades" className="label hidden underline-offset-4 hover:underline md:inline">
                Propiedades
              </Link>
              <Link href="/#contacto" className="label hidden underline-offset-4 hover:underline md:inline">
                Contacto
              </Link>
            </div>
          </nav>
        </header>
        {/* pt-[53px] compensa la altura de la cabecera fija */}
        <main className="w-full max-w-full overflow-x-hidden pt-[53px]">{children}</main>
        <Footer />
        </CurrencyProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

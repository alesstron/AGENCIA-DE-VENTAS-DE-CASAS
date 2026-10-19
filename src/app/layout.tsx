import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Dubai Luxury Estates — Propiedades de alto lujo en Dubái",
  description: "Villas, penthouses y mansiones ultra-exclusivas en Palm Jumeirah, Downtown, Emirates Hills y Dubai Marina.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden bg-walnut-shadow text-warm-cream antialiased">
        <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full border-b border-dashed border-cork-border bg-walnut-shadow/70 backdrop-blur-md">
          <nav className="flex items-center justify-between px-5 py-4 md:px-10">
            <Link href="/" className="label tracking-normal">
              Dubai Luxury Estates
            </Link>
            <div className="flex items-center gap-5 md:gap-8">
              <Link href="/#propiedades" className="label underline-offset-4 hover:underline">
                Propiedades
              </Link>
              <Link href="/#contacto" className="label underline-offset-4 hover:underline">
                Contacto
              </Link>
            </div>
          </nav>
        </header>
        <main className="w-full max-w-full overflow-x-hidden pt-[53px]">{children}</main>
        <footer id="contacto" className="w-full max-w-full border-t border-dashed border-cork-border px-5 py-12 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="heading">Dubai Luxury Estates</p>
            <p className="body-copy max-w-md">
              Asesoría privada para compradores internacionales. Escríbenos y coordinamos una visita a la propiedad que elijas.
            </p>
          </div>
          <p className="mt-10 text-[10px] font-medium uppercase text-ember-accent">
            * Precios en USD; equivalencia en AED a tipo de cambio de referencia 3,6725. Imágenes ilustrativas.
          </p>
        </footer>
      </body>
    </html>
  );
}

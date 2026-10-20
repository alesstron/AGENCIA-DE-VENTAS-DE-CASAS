import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MotionProvider } from "@/components/motion";
import { CurrencyProvider, CurrencySelect } from "@/components/currency";
import Footer from "@/components/Footer";
import { COMPANY_NAME } from "@/lib/contact";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Dubai Luxury Estates — Propiedades de alto lujo en Dubái y Caracas",
  description: "Villas, penthouses y mansiones ultra-exclusivas en Dubái y Caracas.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden bg-walnut-shadow text-warm-cream antialiased">
        <MotionProvider>
        <CurrencyProvider>
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
        <main className="w-full max-w-full overflow-x-hidden pt-[53px]">{children}</main>
        <Footer />
        </CurrencyProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

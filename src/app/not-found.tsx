import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-start justify-center gap-6 px-5 md:px-10">
      <h1 className="display">Propiedad no encontrada</h1>
      <Link href="/#propiedades" className="label rounded-outlined border border-warm-cream px-5 py-3">
        ← Volver a Propiedades
      </Link>
    </div>
  );
}

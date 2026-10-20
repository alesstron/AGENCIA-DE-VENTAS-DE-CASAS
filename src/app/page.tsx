/**
 * Página de inicio ("/"). Es un Server Component mínimo: toda la lógica interactiva
 * (hero, filtros por ciudad/tipo/precio/búsqueda y grid animado de propiedades) vive en <Catalog />,
 * que es un Client Component. El selector multi-moneda lo aporta CurrencyProvider desde el layout.
 */
import Catalog from "@/components/Catalog";

export default function Home() {
  return <Catalog />;
}

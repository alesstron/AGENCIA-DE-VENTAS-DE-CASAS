export type PropertyType = "Villa" | "Penthouse" | "Mansión";
export type PropertyStatus = "Disponible" | "Reservada";

export interface Zone {
  nombre: string;
  m2: number;
}

export interface Level {
  nivel: string;
  zonas: Zone[];
}

export interface Property {
  id: string;
  ref: string;
  titulo: string;
  tipo: PropertyType;
  ubicacion: string;
  zona: string;
  precioUSD: number;
  estado: PropertyStatus;
  m2Construccion: number;
  m2Terreno: number;
  habitaciones: number;
  banos: number;
  estacionamientos: number;
  piscinaPrivada: boolean;
  ascensorPrivado: boolean;
  amenidades: string[];
  galeria: string[];
  descripcion: string;
  inventario: string[];
  distribucion: Level[];
}

/** Tipo de cambio de referencia USD → AED (paridad oficial). */
export const USD_TO_AED = 3.6725;

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const properties: Property[] = [
  {
    id: "palm-jumeirah-signature-villa",
    ref: "DLX-0101",
    titulo: "Palm Jumeirah Signature Villa",
    tipo: "Villa",
    ubicacion: "Frond N, Palm Jumeirah, Dubái",
    zona: "Palm Jumeirah",
    precioUSD: 24500000,
    estado: "Disponible",
    m2Construccion: 1250,
    m2Terreno: 2100,
    habitaciones: 7,
    banos: 9,
    estacionamientos: 6,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Helipuerto", "Playa privada", "Pozo de agua", "Planta eléctrica total", "Automatización domótica", "Seguridad 24/7", "Cine privado", "Spa y sauna"],
    galeria: [u("1613490493576-7fde63acd811"), u("1600596542815-ffad4c1539a9"), u("1600585154340-be6161a56a0c"), u("1600607687939-ce8a6c25118c"), u("1600566753190-17f0baa2a6c3")],
    descripcion: "Residencia frente al mar en la rama norte de la Palm, con 60 metros de playa privada y vistas despejadas al skyline de Dubai Marina. Arquitectura contemporánea de líneas puras, dobles alturas y muros de vidrio que disuelven el límite entre interior y jardín.",
    inventario: ["Salón principal a doble altura con chimenea de mármol", "Cocina de chef con isla de 6 m y cocina de servicio", "Suite principal con vestidor y terraza sobre el mar", "Piscina infinity climatizada de 18 m", "Gimnasio y spa con hammam", "Cine privado de 12 butacas", "Cuarto de servicio para 3 personas", "Garaje climatizado para 6 vehículos"],
    distribucion: [
      { nivel: "Planta baja", zonas: [{ nombre: "Salón y comedor", m2: 210 }, { nombre: "Cocina de chef", m2: 70 }, { nombre: "Cine", m2: 45 }, { nombre: "Spa y gimnasio", m2: 90 }, { nombre: "Garaje", m2: 140 }] },
      { nivel: "Planta alta", zonas: [{ nombre: "Suite principal", m2: 130 }, { nombre: "Suites (x6)", m2: 360 }, { nombre: "Biblioteca", m2: 40 }, { nombre: "Terraza", m2: 165 }] },
    ],
  },
  {
    id: "downtown-penthouse-burj-view",
    ref: "DLX-0102",
    titulo: "Downtown Penthouse with Burj View",
    tipo: "Penthouse",
    ubicacion: "Boulevard Point, Downtown Dubai",
    zona: "Downtown Dubai",
    precioUSD: 18900000,
    estado: "Disponible",
    m2Construccion: 840,
    m2Terreno: 0,
    habitaciones: 5,
    banos: 6,
    estacionamientos: 4,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Vista directa al Burj Khalifa", "Ascensor privado", "Concierge 24/7", "Automatización domótica", "Planta eléctrica total", "Seguridad 24/7", "Bodega climatizada"],
    galeria: [u("1545324418-cc1a3fa10c00"), u("1502672260266-1c1ef2d93688"), u("1600585152915-d208bec867a1"), u("1560448204-e02f11c3d0e2"), u("1522708323590-d24dbb6b0267")],
    descripcion: "Penthouse dúplex en los dos últimos niveles de la torre, con terraza perimetral y piscina privada suspendida frente al Burj Khalifa y las fuentes de Dubai. Ascensor privado con acceso directo al vestíbulo de la unidad.",
    inventario: ["Vestíbulo de ascensor privado con acabado en ónix", "Salón de 14 m de frente con ventanales de piso a techo", "Cocina Gaggenau y despensa", "Suite principal con baño en mármol Calacatta", "Terraza con piscina y jacuzzi", "Bodega climatizada para 800 botellas", "Sala de cine y oficina ejecutiva", "4 estacionamientos en torre"],
    distribucion: [
      { nivel: "Nivel inferior", zonas: [{ nombre: "Salón y comedor", m2: 190 }, { nombre: "Cocina", m2: 55 }, { nombre: "Oficina", m2: 40 }, { nombre: "Suites (x3)", m2: 210 }] },
      { nivel: "Nivel superior", zonas: [{ nombre: "Suite principal", m2: 150 }, { nombre: "Suite invitados", m2: 55 }, { nombre: "Terraza y piscina", m2: 140 }] },
    ],
  },
  {
    id: "emirates-hills-mansion",
    ref: "DLX-0103",
    titulo: "Emirates Hills Mansion",
    tipo: "Mansión",
    ubicacion: "Sector E, Emirates Hills, Dubái",
    zona: "Emirates Hills",
    precioUSD: 38000000,
    estado: "Reservada",
    m2Construccion: 2800,
    m2Terreno: 4600,
    habitaciones: 9,
    banos: 12,
    estacionamientos: 12,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Helipuerto", "Vista al campo de golf", "Pozo de agua", "Planta eléctrica total", "Automatización domótica", "Seguridad 24/7", "Cancha de tenis", "Ala de servicio independiente", "Sala de cine"],
    galeria: [u("1512917774080-9991f1c4c750"), u("1600047509807-ba8f99d2cdde"), u("1600210492486-724fe5c67fb0"), u("1600573472592-401b489a3cdc"), u("1600607688969-a5bfcd646154")],
    descripcion: "Mansión de estilo neoclásico contemporáneo sobre la colina más alta del Montgomerie, con vistas panorámicas al campo de golf y al skyline. Jardines paisajísticos, cancha de tenis y ala de servicio independiente en una parcela de más de 4.600 m².",
    inventario: ["Gran hall con escalera escultórica de mármol", "Salón formal y salón familiar", "Cocina principal, cocina de servicio y comedor para 20", "Suite principal con dos baños y dos vestidores", "Biblioteca con paneles de nogal", "Cancha de tenis iluminada", "Piscina de 25 m, pool house y cocina exterior", "Garaje para 12 vehículos"],
    distribucion: [
      { nivel: "Planta baja", zonas: [{ nombre: "Hall y salones", m2: 520 }, { nombre: "Cocinas y comedor", m2: 220 }, { nombre: "Ala de servicio", m2: 180 }, { nombre: "Garaje", m2: 380 }] },
      { nivel: "Planta alta", zonas: [{ nombre: "Suite principal", m2: 260 }, { nombre: "Suites (x8)", m2: 720 }, { nombre: "Biblioteca", m2: 90 }, { nombre: "Terrazas", m2: 430 }] },
    ],
  },
  {
    id: "marina-sky-villa",
    ref: "DLX-0104",
    titulo: "Marina Sky Villa",
    tipo: "Villa",
    ubicacion: "Marina Gate, Dubai Marina",
    zona: "Dubai Marina",
    precioUSD: 9800000,
    estado: "Disponible",
    m2Construccion: 520,
    m2Terreno: 0,
    habitaciones: 4,
    banos: 5,
    estacionamientos: 3,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Vista al puerto deportivo", "Piscina privada en terraza", "Ascensor privado", "Automatización domótica", "Planta eléctrica total", "Seguridad 24/7", "Amarre para yate"],
    galeria: [u("1600607687644-c7171b42498f"), u("1600121848594-d8644e57abab"), u("1600585154340-be6161a56a0c"), u("1583608205776-bfd35f0d9f83"), u("1560448204-e02f11c3d0e2")],
    descripcion: "Villa en el cielo de dos niveles sobre Dubai Marina, con jardín colgante, piscina privada y acceso a amarre para yate de hasta 18 m. Interiores de doble altura con carpintería italiana y domótica integral.",
    inventario: ["Salón de doble altura con vista al puerto", "Cocina abierta Miele con isla de granito", "Suite principal con terraza y jacuzzi", "Piscina privada en terraza con deck de teca", "Cuarto de servicio", "Amarre para yate de 18 m", "3 estacionamientos en torre"],
    distribucion: [
      { nivel: "Nivel 1", zonas: [{ nombre: "Salón y comedor", m2: 120 }, { nombre: "Cocina", m2: 40 }, { nombre: "Suites (x2)", m2: 110 }] },
      { nivel: "Nivel 2", zonas: [{ nombre: "Suite principal", m2: 95 }, { nombre: "Suite invitados", m2: 45 }, { nombre: "Terraza y piscina", m2: 110 }] },
    ],
  },
  {
    id: "jumeirah-bay-island-residence",
    ref: "DLX-0105",
    titulo: "Jumeirah Bay Island Residence",
    tipo: "Mansión",
    ubicacion: "Jumeirah Bay Island, Dubái",
    zona: "Jumeirah Bay",
    precioUSD: 52000000,
    estado: "Disponible",
    m2Construccion: 3400,
    m2Terreno: 3900,
    habitaciones: 8,
    banos: 11,
    estacionamientos: 10,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Helipuerto", "Muelle privado", "Pozo de agua", "Planta eléctrica total", "Automatización domótica", "Seguridad 24/7", "Spa con hammam", "Cava de vinos"],
    galeria: [u("1613977257363-707ba9348227"), u("1580587771525-78b9dba3b914"), u("1600596542815-ffad4c1539a9"), u("1600566753190-17f0baa2a6c3"), u("1600607687939-ce8a6c25118c")],
    descripcion: "Isla privada con comunidad cerrada de solo 30 residencias. Esta mansión frente al agua combina volúmenes de hormigón visto, vidrio y piedra natural, con muelle propio y vistas a la silueta de Burj Al Arab.",
    inventario: ["Hall de triple altura con instalación escultórica", "Salón con ventanales corredizos al mar", "Cocina de chef y cocina de catering", "Suite principal con spa privado", "Cava de vinos para 1.500 botellas", "Muelle privado para yate de 30 m", "Piscina infinity de 30 m", "Garaje de colección para 10 vehículos"],
    distribucion: [
      { nivel: "Planta baja", zonas: [{ nombre: "Hall y salones", m2: 600 }, { nombre: "Cocinas y comedor", m2: 240 }, { nombre: "Spa y gimnasio", m2: 210 }, { nombre: "Garaje", m2: 360 }] },
      { nivel: "Planta alta", zonas: [{ nombre: "Suite principal", m2: 320 }, { nombre: "Suites (x7)", m2: 700 }, { nombre: "Terrazas", m2: 520 }] },
    ],
  },
  {
    id: "difc-sky-penthouse",
    ref: "DLX-0106",
    titulo: "DIFC Sky Penthouse",
    tipo: "Penthouse",
    ubicacion: "Index Tower, DIFC, Dubái",
    zona: "DIFC",
    precioUSD: 12400000,
    estado: "Disponible",
    m2Construccion: 610,
    m2Terreno: 0,
    habitaciones: 4,
    banos: 5,
    estacionamientos: 4,
    piscinaPrivada: false,
    ascensorPrivado: true,
    amenidades: ["Vista panorámica 360°", "Ascensor privado", "Concierge 24/7", "Automatización domótica", "Planta eléctrica total", "Seguridad 24/7", "Club privado de residentes"],
    galeria: [u("1486406146926-c627a92ad1ab"), u("1502672260266-1c1ef2d93688"), u("1522708323590-d24dbb6b0267"), u("1560448204-e02f11c3d0e2"), u("1545324418-cc1a3fa10c00")],
    descripcion: "Penthouse en el distrito financiero con vistas de 360° al skyline, al Burj Khalifa y al Golfo. Pensado para el ejecutivo internacional: oficina privada, salón de recepción y servicios de hotel cinco estrellas en el edificio.",
    inventario: ["Salón de recepción con barra y vista panorámica", "Oficina ejecutiva con sala de juntas", "Cocina con despensa", "Suite principal con vestidor y baño de mármol", "Terraza perimetral de 90 m²", "4 estacionamientos en torre", "Acceso al club privado de residentes"],
    distribucion: [
      { nivel: "Planta única", zonas: [{ nombre: "Salón y comedor", m2: 160 }, { nombre: "Oficina", m2: 50 }, { nombre: "Cocina", m2: 45 }, { nombre: "Suite principal", m2: 110 }, { nombre: "Suites (x3)", m2: 155 }, { nombre: "Terraza", m2: 90 }] },
    ],
  },
  {
    id: "al-barari-garden-villa",
    ref: "DLX-0107",
    titulo: "Al Barari Garden Villa",
    tipo: "Villa",
    ubicacion: "The Nest, Al Barari, Dubái",
    zona: "Al Barari",
    precioUSD: 14200000,
    estado: "Reservada",
    m2Construccion: 1480,
    m2Terreno: 3200,
    habitaciones: 6,
    banos: 8,
    estacionamientos: 5,
    piscinaPrivada: true,
    ascensorPrivado: false,
    amenidades: ["Jardines botánicos", "Pozo de agua", "Planta eléctrica total", "Automatización domótica", "Seguridad 24/7", "Pabellón de yoga", "Lago privado"],
    galeria: [u("1600607687939-ce8a6c25118c"), u("1600566753190-17f0baa2a6c3"), u("1600210492486-724fe5c67fb0"), u("1564013799919-ab600027ffc6"), u("1600573472592-401b489a3cdc")],
    descripcion: "Refugio verde dentro de la comunidad botánica más exclusiva de Dubái. Una villa de líneas orgánicas que se abre a un jardín de 3.200 m² con lago, pabellón de yoga y piscina rodeada de vegetación tropical.",
    inventario: ["Salón con muros de vidrio y jardín interior", "Cocina de chef con huerto de hierbas", "Suite principal con baño exterior", "Pabellón de yoga y meditación", "Piscina lagoon de 20 m", "Casa de huéspedes independiente", "Garaje para 5 vehículos"],
    distribucion: [
      { nivel: "Planta baja", zonas: [{ nombre: "Salón y comedor", m2: 240 }, { nombre: "Cocina", m2: 65 }, { nombre: "Suites (x2)", m2: 150 }, { nombre: "Casa de huéspedes", m2: 120 }, { nombre: "Garaje", m2: 110 }] },
      { nivel: "Planta alta", zonas: [{ nombre: "Suite principal", m2: 140 }, { nombre: "Suites (x3)", m2: 230 }, { nombre: "Terrazas", m2: 225 }] },
    ],
  },
  {
    id: "bluewaters-sea-villa",
    ref: "DLX-0108",
    titulo: "Bluewaters Sea Villa",
    tipo: "Villa",
    ubicacion: "Bluewaters Island, Dubái",
    zona: "Bluewaters",
    precioUSD: 16800000,
    estado: "Disponible",
    m2Construccion: 980,
    m2Terreno: 1500,
    habitaciones: 5,
    banos: 7,
    estacionamientos: 4,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Helipuerto", "Acceso a playa privada", "Planta eléctrica total", "Automatización domótica", "Seguridad 24/7", "Vista a Ain Dubai", "Pozo de agua"],
    galeria: [u("1512453979798-5ea266f8880c"), u("1518684079-3c830dcef090"), u("1600585154340-be6161a56a0c"), u("1600596542815-ffad4c1539a9"), u("1583608205776-bfd35f0d9f83")],
    descripcion: "Villa frente al mar con vista directa a Ain Dubai y a la silueta de JBR. Fachada de piedra clara y vidrio, con terrazas escalonadas, piscina infinity y acceso a playa privada.",
    inventario: ["Salón a doble altura con vista al mar", "Cocina de chef y cocina de servicio", "Suite principal con terraza privada", "Piscina infinity de 16 m", "Gimnasio con vista al mar", "Ascensor privado de 3 niveles", "Garaje para 4 vehículos"],
    distribucion: [
      { nivel: "Planta baja", zonas: [{ nombre: "Salón y comedor", m2: 200 }, { nombre: "Cocina", m2: 60 }, { nombre: "Gimnasio", m2: 55 }, { nombre: "Garaje", m2: 100 }] },
      { nivel: "Planta alta", zonas: [{ nombre: "Suite principal", m2: 140 }, { nombre: "Suites (x4)", m2: 280 }, { nombre: "Terrazas", m2: 145 }] },
    ],
  },
];

export const getPropertyById = (id: string) => properties.find((p) => p.id === id);

export const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const formatAED = (usd: number) =>
  `AED ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(usd * USD_TO_AED)}`;

export const pricePerM2 = (p: Property) => Math.round(p.precioUSD / p.m2Construccion);

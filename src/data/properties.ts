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

export interface Inversion {
  roiAnual: number; // % anual estimado
  plusvalia3a: number; // % proyectado a 3 años
  esquemaPago: "60/40" | "50/50";
}

export interface EspecLujo {
  suelo: string;
  cristales: string;
  climatizacion: string;
  domotica: string;
  alturaTecho: number; // metros
}

export interface Distancia {
  lugar: string;
  categoria: "Aeropuerto" | "Marina" | "Centro financiero" | "Colegio internacional" | "Ocio";
  minutos: number;
  km: number;
}

type Extras = { inversion: Inversion; lujo: EspecLujo; entorno: Distancia[] };

export type Ciudad = "Dubái" | "Caracas";

export interface Property extends Extras {
  id: string;
  ciudad: Ciudad;
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

type Base = Omit<Property, keyof Extras | "ciudad">;

const base: Base[] = [
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

const baseCaracas: Base[] = [
  {
    id: "caracas-country-club-mansion",
    ref: "CCS-0201",
    titulo: "Country Club Heritage Mansion",
    tipo: "Mansión",
    ubicacion: "Urb. Country Club, Caracas",
    zona: "Country Club",
    precioUSD: 4200000,
    estado: "Disponible",
    m2Construccion: 1100,
    m2Terreno: 2400,
    habitaciones: 6,
    banos: 8,
    estacionamientos: 6,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Vista al Ávila", "Pozo de agua", "Planta eléctrica total", "Automatización domótica", "Seguridad 24/7", "Jardines paisajísticos", "Cancha de tenis", "Cava de vinos"],
    galeria: [u("1512917774080-9991f1c4c750"), u("1600607688969-a5bfcd646154"), u("1600210492486-724fe5c67fb0"), u("1600573472592-401b489a3cdc"), u("1564013799919-ab600027ffc6")],
    descripcion: "Mansión señorial en una de las urbanizaciones más tradicionales de Caracas, con jardines maduros, vistas al Ávila y total autonomía de servicios: planta eléctrica y pozo de agua con capacidad para toda la residencia.",
    inventario: ["Gran salón con chimenea y doble altura", "Comedor formal para 16 personas", "Cocina de chef y cocina de servicio", "Suite principal con terraza al jardín", "Biblioteca y sala de música", "Cancha de tenis y piscina de 20 m", "Cuarto de servicio para 3 personas", "Garaje para 6 vehículos"],
    distribucion: [
      { nivel: "Planta baja", zonas: [{ nombre: "Salón y comedor", m2: 240 }, { nombre: "Cocinas", m2: 90 }, { nombre: "Biblioteca", m2: 50 }, { nombre: "Garaje", m2: 150 }] },
      { nivel: "Planta alta", zonas: [{ nombre: "Suite principal", m2: 120 }, { nombre: "Suites (x5)", m2: 300 }, { nombre: "Terrazas", m2: 100 }] },
    ],
  },
  {
    id: "caracas-altamira-sky-penthouse",
    ref: "CCS-0202",
    titulo: "Altamira Sky Penthouse",
    tipo: "Penthouse",
    ubicacion: "Av. Francisco de Miranda, Altamira, Caracas",
    zona: "Altamira",
    precioUSD: 1900000,
    estado: "Reservada",
    m2Construccion: 480,
    m2Terreno: 0,
    habitaciones: 4,
    banos: 5,
    estacionamientos: 4,
    piscinaPrivada: true,
    ascensorPrivado: true,
    amenidades: ["Vista panorámica al Ávila", "Ascensor privado", "Planta eléctrica total", "Pozo de agua", "Seguridad 24/7", "Automatización domótica", "Terraza con jacuzzi"],
    galeria: [u("1545324418-cc1a3fa10c00"), u("1502672260266-1c1ef2d93688"), u("1560448204-e02f11c3d0e2"), u("1600585152915-d208bec867a1"), u("1522708323590-d24dbb6b0267")],
    descripcion: "Penthouse dúplex en un edificio de alta seguridad en Altamira, con terraza y jacuzzi frente al Ávila y la ciudad. Servicios autónomos de electricidad y agua.",
    inventario: ["Salón de doble altura con ventanales al Ávila", "Cocina abierta con isla y despensa", "Suite principal con vestidor y baño en mármol", "Terraza con jacuzzi y cocina exterior", "Estudio / oficina privada", "4 estacionamientos techados"],
    distribucion: [
      { nivel: "Nivel inferior", zonas: [{ nombre: "Salón y comedor", m2: 140 }, { nombre: "Cocina", m2: 40 }, { nombre: "Estudio", m2: 30 }, { nombre: "Suites (x3)", m2: 130 }] },
      { nivel: "Nivel superior", zonas: [{ nombre: "Suite principal", m2: 70 }, { nombre: "Terraza", m2: 70 }] },
    ],
  },
  {
    id: "caracas-la-lagunita-golf-villa",
    ref: "CCS-0203",
    titulo: "La Lagunita Golf Villa",
    tipo: "Villa",
    ubicacion: "Country Club La Lagunita, El Hatillo, Caracas",
    zona: "La Lagunita",
    precioUSD: 3400000,
    estado: "Disponible",
    m2Construccion: 900,
    m2Terreno: 2000,
    habitaciones: 5,
    banos: 7,
    estacionamientos: 5,
    piscinaPrivada: true,
    ascensorPrivado: false,
    amenidades: ["Frente al campo de golf", "Pozo de agua", "Planta eléctrica total", "Automatización domótica", "Seguridad 24/7", "Club privado de residentes", "Jardines paisajísticos"],
    galeria: [u("1600607687939-ce8a6c25118c"), u("1600566753190-17f0baa2a6c3"), u("1600047509807-ba8f99d2cdde"), u("1600585154340-be6161a56a0c"), u("1613490493576-7fde63acd811")],
    descripcion: "Villa contemporánea frente al campo de golf en la comunidad cerrada de La Lagunita. Espacios abiertos, piscina rodeada de jardín y servicios autónomos.",
    inventario: ["Salón y comedor abiertos al jardín", "Cocina de chef con isla de granito", "Suite principal con terraza al campo de golf", "Piscina de 15 m con deck", "Sala de cine y gimnasio", "Garaje para 5 vehículos"],
    distribucion: [
      { nivel: "Planta baja", zonas: [{ nombre: "Salón y comedor", m2: 200 }, { nombre: "Cocina", m2: 60 }, { nombre: "Cine y gimnasio", m2: 90 }, { nombre: "Garaje", m2: 110 }] },
      { nivel: "Planta alta", zonas: [{ nombre: "Suite principal", m2: 110 }, { nombre: "Suites (x4)", m2: 220 }, { nombre: "Terrazas", m2: 110 }] },
    ],
  },
  {
    id: "caracas-las-mercedes-penthouse",
    ref: "CCS-0204",
    titulo: "Las Mercedes Executive Penthouse",
    tipo: "Penthouse",
    ubicacion: "Calle Madrid, Las Mercedes, Caracas",
    zona: "Las Mercedes",
    precioUSD: 2600000,
    estado: "Disponible",
    m2Construccion: 520,
    m2Terreno: 0,
    habitaciones: 4,
    banos: 5,
    estacionamientos: 4,
    piscinaPrivada: false,
    ascensorPrivado: true,
    amenidades: ["Ascensor privado", "Planta eléctrica total", "Pozo de agua", "Seguridad 24/7", "Concierge 24/7", "Automatización domótica", "Club privado de residentes"],
    galeria: [u("1486406146926-c627a92ad1ab"), u("1560448204-e02f11c3d0e2"), u("1502672260266-1c1ef2d93688"), u("1522708323590-d24dbb6b0267"), u("1600585152915-d208bec867a1")],
    descripcion: "Penthouse ejecutivo en el corazón gastronómico y empresarial de Las Mercedes. Ascensor privado, doble orientación y servicios autónomos de energía y agua.",
    inventario: ["Recibidor con ascensor privado", "Salón con terraza y vista a la ciudad", "Cocina con despensa y lavandería", "Suite principal con vestidor", "Oficina ejecutiva", "4 estacionamientos"],
    distribucion: [
      { nivel: "Planta única", zonas: [{ nombre: "Salón y comedor", m2: 150 }, { nombre: "Oficina", m2: 45 }, { nombre: "Cocina", m2: 45 }, { nombre: "Suite principal", m2: 90 }, { nombre: "Suites (x3)", m2: 120 }, { nombre: "Terraza", m2: 70 }] },
    ],
  },
];

const d = (lugar: string, categoria: Distancia["categoria"], minutos: number, km: number): Distancia => ({ lugar, categoria, minutos, km });

// Cifras de inversión y distancias: estimaciones ilustrativas (no constituyen garantía de rentabilidad).
const extras: Record<string, Extras> = {
  "palm-jumeirah-signature-villa": {
    inversion: { roiAnual: 5.8, plusvalia3a: 24, esquemaPago: "60/40" },
    lujo: { suelo: "Mármol Calacatta pulido y roble europeo", cristales: "Vidrio laminado de control solar Low-E (SHGC 0,25)", climatizacion: "Aire zonificado VRF por habitación", domotica: "Crestron + Lutron (escenas, cortinas, iluminación)", alturaTecho: 4.2 },
    entorno: [d("Aeropuerto DXB", "Aeropuerto", 35, 38), d("Dubai Marina Yacht Club", "Marina", 15, 10), d("DIFC", "Centro financiero", 30, 28), d("Dubai British School", "Colegio internacional", 18, 12), d("The Pointe", "Ocio", 8, 4)],
  },
  "downtown-penthouse-burj-view": {
    inversion: { roiAnual: 6.4, plusvalia3a: 21, esquemaPago: "50/50" },
    lujo: { suelo: "Mármol Emperador y madera de nogal", cristales: "Doble acristalamiento de control solar, piso a techo", climatizacion: "Aire zonificado VRF con control por sala", domotica: "Crestron Home (audio multizona y seguridad)", alturaTecho: 3.8 },
    entorno: [d("Aeropuerto DXB", "Aeropuerto", 15, 14), d("Dubai Creek Harbour Marina", "Marina", 14, 9), d("DIFC", "Centro financiero", 6, 3), d("GEMS Wellington International", "Colegio internacional", 14, 9), d("Dubai Mall", "Ocio", 4, 1)],
  },
  "emirates-hills-mansion": {
    inversion: { roiAnual: 4.9, plusvalia3a: 28, esquemaPago: "50/50" },
    lujo: { suelo: "Mármol Travertino y parquet de roble francés", cristales: "Vidrio templado de control solar de doble cámara", climatizacion: "Aire zonificado VRF multizona (3 sistemas)", domotica: "Crestron + Lutron HomeWorks QSX", alturaTecho: 4.8 },
    entorno: [d("Aeropuerto DXB", "Aeropuerto", 35, 36), d("Dubai Marina Yacht Club", "Marina", 12, 9), d("DIFC", "Centro financiero", 25, 24), d("Dubai International Academy", "Colegio internacional", 10, 7), d("Montgomerie Golf Club", "Ocio", 3, 1)],
  },
  "marina-sky-villa": {
    inversion: { roiAnual: 7.1, plusvalia3a: 19, esquemaPago: "60/40" },
    lujo: { suelo: "Porcelánico gran formato y teca en terrazas", cristales: "Vidrio de control solar reflectivo", climatizacion: "Aire zonificado VRF por nivel", domotica: "Lutron RadioRA 3 + Crestron", alturaTecho: 3.6 },
    entorno: [d("Aeropuerto DWC", "Aeropuerto", 40, 45), d("Dubai Marina Yacht Club", "Marina", 3, 1), d("DIFC", "Centro financiero", 25, 24), d("Dubai International Academy", "Colegio internacional", 12, 8), d("JBR The Walk", "Ocio", 6, 2)],
  },
  "jumeirah-bay-island-residence": {
    inversion: { roiAnual: 4.6, plusvalia3a: 32, esquemaPago: "50/50" },
    lujo: { suelo: "Piedra natural Jura y roble ahumado", cristales: "Vidrio laminado acústico de control solar", climatizacion: "Aire zonificado VRF + refrigeración radiante", domotica: "Crestron Pyng + Lutron HomeWorks", alturaTecho: 5.2 },
    entorno: [d("Aeropuerto DXB", "Aeropuerto", 20, 20), d("Marina de Jumeirah Bay", "Marina", 2, 1), d("DIFC", "Centro financiero", 15, 10), d("Dubai British School", "Colegio internacional", 20, 14), d("City Walk", "Ocio", 10, 5)],
  },
  "difc-sky-penthouse": {
    inversion: { roiAnual: 6.7, plusvalia3a: 20, esquemaPago: "60/40" },
    lujo: { suelo: "Mármol Bianco Carrara y roble blanqueado", cristales: "Doble acristalamiento de control solar 360°", climatizacion: "Aire zonificado VRF", domotica: "Crestron + Lutron Palladiom", alturaTecho: 3.9 },
    entorno: [d("Aeropuerto DXB", "Aeropuerto", 15, 12), d("Dubai Harbour Marina", "Marina", 18, 14), d("DIFC (en el edificio)", "Centro financiero", 1, 0), d("GEMS Wellington International", "Colegio internacional", 15, 10), d("Dubai Opera", "Ocio", 8, 4)],
  },
  "al-barari-garden-villa": {
    inversion: { roiAnual: 5.2, plusvalia3a: 26, esquemaPago: "50/50" },
    lujo: { suelo: "Travertino natural y bambú estructural", cristales: "Vidrio de control solar con marco de aluminio térmico", climatizacion: "Aire zonificado VRF + ventilación natural", domotica: "Lutron RadioRA 3 + Crestron", alturaTecho: 4.0 },
    entorno: [d("Aeropuerto DXB", "Aeropuerto", 25, 25), d("Dubai Marina Yacht Club", "Marina", 25, 22), d("DIFC", "Centro financiero", 20, 18), d("Dubai British School", "Colegio internacional", 15, 11), d("Dubai Polo & Equestrian Club", "Ocio", 8, 5)],
  },
  "bluewaters-sea-villa": {
    inversion: { roiAnual: 6.1, plusvalia3a: 23, esquemaPago: "60/40" },
    lujo: { suelo: "Mármol Botticino y deck de teca", cristales: "Vidrio de control solar de alto rendimiento", climatizacion: "Aire zonificado VRF por habitación", domotica: "Crestron + Lutron HomeWorks QSX", alturaTecho: 4.0 },
    entorno: [d("Aeropuerto DXB", "Aeropuerto", 30, 32), d("Dubai Marina Yacht Club", "Marina", 7, 3), d("DIFC", "Centro financiero", 28, 25), d("Dubai International Academy", "Colegio internacional", 12, 8), d("Ain Dubai", "Ocio", 2, 1)],
  },
  "caracas-country-club-mansion": {
    inversion: { roiAnual: 5.5, plusvalia3a: 30, esquemaPago: "50/50" },
    lujo: { suelo: "Mármol travertino y parquet de samán", cristales: "Vidrio laminado de control solar", climatizacion: "Aire zonificado split inverter por ambiente", domotica: "Lutron RadioRA 3", alturaTecho: 4.5 },
    entorno: [d("Aeropuerto Simón Bolívar (Maiquetía)", "Aeropuerto", 50, 38), d("Marina Grande de Caraballeda", "Marina", 65, 50), d("Centro financiero de Chacao", "Centro financiero", 15, 7), d("Colegio Humboldt", "Colegio internacional", 15, 8), d("Parque Nacional El Ávila", "Ocio", 15, 7)],
  },
  "caracas-altamira-sky-penthouse": {
    inversion: { roiAnual: 6.2, plusvalia3a: 26, esquemaPago: "50/50" },
    lujo: { suelo: "Porcelanato de gran formato y roble", cristales: "Doble acristalamiento de control solar", climatizacion: "Aire zonificado VRF", domotica: "Crestron Home", alturaTecho: 3.6 },
    entorno: [d("Aeropuerto Simón Bolívar (Maiquetía)", "Aeropuerto", 50, 38), d("Marina Grande de Caraballeda", "Marina", 60, 48), d("Centro financiero de Chacao", "Centro financiero", 5, 2), d("Colegio Humboldt", "Colegio internacional", 20, 10), d("Plaza Altamira", "Ocio", 3, 1)],
  },
  "caracas-la-lagunita-golf-villa": {
    inversion: { roiAnual: 5.0, plusvalia3a: 28, esquemaPago: "60/40" },
    lujo: { suelo: "Porcelanato y madera de teca en terrazas", cristales: "Vidrio de control solar", climatizacion: "Aire zonificado split inverter", domotica: "Lutron RadioRA 3", alturaTecho: 4.0 },
    entorno: [d("Aeropuerto Simón Bolívar (Maiquetía)", "Aeropuerto", 60, 45), d("Marina Grande de Caraballeda", "Marina", 75, 60), d("Centro financiero de Chacao", "Centro financiero", 30, 18), d("Escuela Campo Alegre", "Colegio internacional", 25, 14), d("Campo de golf La Lagunita", "Ocio", 2, 1)],
  },
  "caracas-las-mercedes-penthouse": {
    inversion: { roiAnual: 6.8, plusvalia3a: 24, esquemaPago: "50/50" },
    lujo: { suelo: "Mármol Carrara y roble blanqueado", cristales: "Doble acristalamiento de control solar", climatizacion: "Aire zonificado VRF", domotica: "Crestron + Lutron", alturaTecho: 3.7 },
    entorno: [d("Aeropuerto Simón Bolívar (Maiquetía)", "Aeropuerto", 50, 38), d("Marina Grande de Caraballeda", "Marina", 65, 50), d("Centro financiero de Chacao", "Centro financiero", 12, 5), d("Escuela Campo Alegre", "Colegio internacional", 15, 7), d("Calle Madrid (gastronomía)", "Ocio", 2, 1)],
  },
};

/** Añade el nivel Rooftop / Piscina a las propiedades con piscina privada. */
const withRooftop = (b: Base): Base =>
  b.piscinaPrivada
    ? {
        ...b,
        distribucion: [
          ...b.distribucion,
          { nivel: "Rooftop / Piscina", zonas: [{ nombre: "Piscina privada", m2: Math.round(b.m2Construccion * 0.06) }, { nombre: "Deck solárium", m2: Math.round(b.m2Construccion * 0.05) }, { nombre: "Lounge exterior", m2: Math.round(b.m2Construccion * 0.04) }, { nombre: "Cocina exterior", m2: Math.round(b.m2Construccion * 0.02) }] },
        ],
      }
    : b;

export const properties: Property[] = [
  ...base.map((b): Property => ({ ...withRooftop(b), ciudad: "Dubái", ...extras[b.id] })),
  ...baseCaracas.map((b): Property => ({ ...withRooftop(b), ciudad: "Caracas", ...extras[b.id] })),
];

export const getPropertyById =(id: string) => properties.find((p) => p.id === id);

export const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const formatAED = (usd: number) =>
  `AED ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(usd * USD_TO_AED)}`;

export const pricePerM2 = (p: Property) => Math.round(p.precioUSD / p.m2Construccion);

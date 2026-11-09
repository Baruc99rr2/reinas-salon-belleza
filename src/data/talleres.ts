// Talleres grupales de Constelaciones Familiares (sección "Volver al Origen" de la home).
//
// Para anunciar uno nuevo, agregá una entrada. Solo `fecha` es obligatoria; si faltan horario o
// intercambio, la card muestra "Consultá horario e intercambio". La sección muestra el próximo
// taller que no haya pasado (la comparación con la fecha de hoy se hace en el navegador, porque el
// sitio es estático). Si ya pasaron todos, muestra "Consultá por la próxima fecha".
//
// La dirección del taller NO va acá ni en el flyer publicado: se pasa por WhatsApp. Si el flyer
// original la incluye, usá una copia sin esos datos (ver taller-2026-11-14-web.jpg).
import type { ImageMetadata } from "astro";
import flyer20261114 from "../assets/origen/taller-2026-11-14-web.jpg";

export interface Taller {
  /** Fecha del taller, "AAAA-MM-DD". */
  fecha: string;
  /** Ej.: "9:00 a 12:00 hs". */
  horario?: string;
  /** Ej.: "$35.000". */
  intercambio?: string;
  /** Flyer del taller (se muestra en miniatura y se amplía al tocarlo). */
  flyer?: ImageMetadata;
}

export const talleres: Taller[] = [
  // Datos del flyer de origen/photo_2026-11-03_15-00-46.jpg (sin la dirección ni el otro teléfono).
  { fecha: "2026-11-14", horario: "9:00 a 12:00 hs", intercambio: "$35.000", flyer: flyer20261114 },
];

// Fotos reales del salón (src/assets/about/) con su texto alternativo. Las usan la Galería de la
// home y "El salón" en /sobre-mi, así el alt se escribe una sola vez.
//
// Quedaron afuera a propósito: tomas casi iguales a estas (mismo encuadre con otra luz) y la
// tarjeta de presentación (photo_2026-10-23_22-35-29.jpg), que no es una foto del salón.
import type { ImageMetadata } from "astro";
import cabina from "../assets/about/imagen1.jpg";
import cabinaLed from "../assets/about/photo_2026-10-30_19-03-58.jpg";
import equipo from "../assets/about/photo_2026-11-02_05-19-11.jpg";
import lavado from "../assets/about/photo_2026-11-02_05-19-07 (2).jpg";
import tocador from "../assets/about/photo_2026-11-02_05-19-10 (2).jpg";
import vista from "../assets/about/photo_2026-11-02_05-19-08 (2).jpg";
import noche from "../assets/about/photo_2026-11-02_05-19-09.jpg";
import rincon from "../assets/about/photo_2026-11-02_05-19-11 (2).jpg";

export interface SalonPhoto {
  image: ImageMetadata;
  alt: string;
}

export const salonPhotos = {
  cabina: { image: cabina, alt: "Cabina de tratamientos con camilla, equipo de aparatología y carrito de productos" },
  cabinaLed: { image: cabinaLed, alt: "Cabina de tratamientos con una máscara LED facial encendida sobre la camilla" },
  equipo: { image: equipo, alt: "Equipo de aparatología corporal del salón" },
  vista: { image: vista, alt: "Vista del salón: estantería con productos, espejos redondos iluminados y sillones" },
  tocador: { image: tocador, alt: "Tocador con dos espejos redondos iluminados y un arreglo de flores" },
  lavado: { image: lavado, alt: "Sector de lavado con sillones negros y estantería de productos" },
  noche: { image: noche, alt: "El salón con luces de ambiente azules" },
  rincon: { image: rincon, alt: "Rincón del salón con espejos iluminados, un sillón rosa y la puerta de entrada" },
} satisfies Record<string, SalonPhoto>;

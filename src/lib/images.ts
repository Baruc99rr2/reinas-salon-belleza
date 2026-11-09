// Fondos por CSS (background-image) optimizados con getImage() de astro:assets: el original de
// src/assets no se publica, solo versiones AVIF y WebP redimensionadas.
//
// Ojo: no leer propiedades de la imagen importada (src.width, src.src...). Astro toma cualquier
// lectura como "se usa el original" y lo copia a dist/ aunque nadie lo pida. Tampoco hace falta:
// Astro nunca agranda una imagen por encima de su tamaño original.
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

/** Ancho de un fondo de sección: alcanza para pantallas grandes (si el original es más chico, queda en su tamaño). */
const MAX_BG_WIDTH = 1920;

export interface CssBackground {
  /** URL WebP (para usar directo en una propiedad o en JS). */
  webp: string;
  /** URL AVIF. */
  avif: string;
  /**
   * Declaraciones listas para un atributo style: primero url(WebP) como respaldo y después
   * image-set() con AVIF/WebP. Un navegador que no entiende image-set() ignora la segunda línea
   * y se queda con la primera.
   */
  style: string;
}

export async function cssBackground(src: ImageMetadata, options: { width?: number; quality?: number } = {}): Promise<CssBackground> {
  const width = options.width ?? MAX_BG_WIDTH;
  const quality = options.quality ?? 72;
  const [avif, webp] = await Promise.all([
    getImage({ src, format: "avif", width, quality }),
    getImage({ src, format: "webp", width, quality }),
  ]);
  return {
    webp: webp.src,
    avif: avif.src,
    style:
      `background-image: url("${webp.src}"); ` +
      `background-image: image-set(url("${avif.src}") type("image/avif"), url("${webp.src}") type("image/webp"));`,
  };
}

// Datos de contacto y de marca del salón: única fuente de verdad. Hero, Footer y el resto del
// sitio leen de acá — para cambiar un teléfono, la forma de atención o una red social, se cambia solo en este archivo.

export interface SocialLink {
  name: "Instagram" | "Facebook";
  /** URL completa del perfil. Si está vacía, el ícono no se muestra en el sitio. */
  url: string;
}

const address = "Otero 381, Barrio Centro, San Salvador de Jujuy";

// Instagram queda vacío (oculto en el sitio) hasta tener la URL confirmada.
const socials: SocialLink[] = [
  { name: "Instagram", url: "" },
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61595963794706" },
];

export const contact = {
  brand: "Reinas",
  tagline: "Centro de belleza integral",
  owner: "Alejandra Orquera",

  /** Teléfono tal como se muestra en pantalla. */
  phoneDisplay: "+54 9 387 740-7488",
  /** Número en formato internacional, solo dígitos (sin +, espacios ni guiones), como lo pide wa.me. */
  whatsapp: "5493877407488",

  address,
  /** Mapa embebido de Google Maps (iframe del Footer), generado a partir de la dirección. */
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,

  /** No hay horario fijo: se atiende con turno. Se muestra en Hero y Footer bajo "Atención". */
  hours: "Atención con turno previo",

  socials,
};

/** Link para llamar por teléfono (ej. "tel:+5493877407488"). */
export const phoneHref = `tel:+${contact.whatsapp}`;

/** Arma el link de WhatsApp con el mensaje ya escrito: https://wa.me/<número>?text=<mensaje>. */
export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Datos de contacto y de marca del salón: única fuente de verdad. Hero, Footer y el resto del
// sitio leen de acá — para cambiar un teléfono, horario o red social, se cambia solo en este archivo.

export interface SocialLink {
  name: "Instagram" | "Facebook" | "TikTok";
  /** URL completa del perfil. Si está vacía, el ícono no se muestra en el sitio. */
  url: string;
}

const address = "Otero 381, Barrio Centro, San Salvador de Jujuy";

// TODO: completar las URLs de los perfiles cuando estén disponibles.
const socials: SocialLink[] = [
  { name: "Instagram", url: "" },
  { name: "Facebook", url: "" },
  { name: "TikTok", url: "" },
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

  // TODO: confirmar con el salón el horario real de atención.
  hours: "Lun a Sáb: 9 a 19 hs",

  socials,
};

/** Link para llamar por teléfono (ej. "tel:+5493877407488"). */
export const phoneHref = `tel:+${contact.whatsapp}`;

/** Arma el link de WhatsApp con el mensaje ya escrito: https://wa.me/<número>?text=<mensaje>. */
export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

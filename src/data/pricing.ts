import type { ImageMetadata } from "astro";

// Fondos por convención: src/assets/plan/plan-N.<png|jpg|jpeg|webp|avif>, con N = id del plan.
// No hace falta importarlos uno por uno: se buscan solos por número.
const planImageModules = import.meta.glob<{ default: ImageMetadata }>("../assets/plan/plan-*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
});

const planImages = new Map<number, ImageMetadata>(
  Object.entries(planImageModules).map(([path, mod]) => [Number(path.match(/plan-(\d+)\.\w+$/)?.[1]), mod.default]),
);

export interface PricingPlan {
  id: number;
  /** Categoría del servicio, ej: "Cortes", "Coloración", "Tratamientos faciales" */
  category: string;
  title: string;
  /** Número como string (ej: "2500") o texto libre (ej: "A consultar") */
  price: string;
  /** ej: "/sesión", "/mes" — omitir si el precio es "A consultar" */
  period?: string;
  /** Lista de items incluidos en el plan */
  description: string[];
  /** Marca el plan como destacado ("Más elegido") */
  featured?: boolean;
  /** Color (hex) de la flor decorativa de la card, ej: "#f28fb2". Si se omite, usa el rose-muted por defecto. */
  flowerColor?: string;
  /**
   * Imagen de fondo de toda la sección Precios mientras este plan está activo en el carrusel
   * (Pricing.astro la optimiza y hace un cross-fade entre planes). No se completa a mano: sale
   * sola de src/assets/plan/plan-N.* (N = id). Un plan sin imagen no cambia el fondo al activarse.
   */
  bgImage?: ImageMetadata;
}

// Datos de ejemplo — reemplazar por los servicios y precios reales del salón.
const plans: Omit<PricingPlan, "bgImage">[] = [
  {
    id: 1,
    category: "Cortes",
    title: "Corte + Brushing",
    price: "2500",
    period: "/sesión",
    description: ["Diagnóstico capilar", "Corte personalizado", "Lavado con productos premium", "Brushing de finalización"],
    flowerColor: "#f28fb2",
  },
  {
    id: 2,
    category: "Coloración",
    title: "Color + Matices",
    price: "4200",
    period: "/sesión",
    description: ["Consultoría de color", "Aplicación de tinte o mechas", "Tratamiento post-color", "Brushing incluido"],
    featured: true,
    flowerColor: "#d14d7c",
  },
  {
    id: 3,
    category: "Tratamientos faciales",
    title: "Limpieza Facial Profunda",
    price: "3800",
    period: "/sesión",
    description: ["Doble limpieza", "Exfoliación e hidratación", "Extracción de comedones", "Mascarilla según tipo de piel"],
    flowerColor: "#c98ba0",
  },
  {
    id: 4,
    category: "Manicura y Pedicura",
    title: "Manicura + Pedicura Spa",
    price: "3200",
    period: "/sesión",
    description: ["Manicura clásica o semipermanente", "Pedicura spa con exfoliación", "Hidratación de manos y pies", "Esmaltado a elección"],
    flowerColor: "#e8709a",
  },
  {
    id: 5,
    category: "Tratamientos capilares",
    title: "Hidratación Profunda",
    price: "2900",
    period: "/sesión",
    description: ["Diagnóstico del cabello", "Ampolla de tratamiento intensivo", "Masaje capilar", "Brushing de finalización"],
    flowerColor: "#a9697f",
  },
  {
    id: 6,
    category: "Paquetes",
    title: "Día de Reina",
    price: "A consultar",
    description: ["Corte + color", "Tratamiento facial", "Manicura + pedicura", "Sesión completa a medida"],
    flowerColor: "#7d716c",
  },
];

export const pricingPlans: PricingPlan[] = plans.map((plan) => ({ ...plan, bgImage: planImages.get(plan.id) }));

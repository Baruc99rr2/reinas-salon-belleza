import type { ImageMetadata } from "astro";
import plan1 from "../assets/plan/plan-1.png";
import plan2 from "../assets/plan/plan-2.png";
import plan3 from "../assets/plan/plan-3.png";
import plan4 from "../assets/plan/plan-4.png";
import plan5 from "../assets/plan/plan-5.png";

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
  /** Color (hex) de la flor decorativa 3D de la card, ej: "#f28fb2". Si se omite, usa el rose-muted por defecto. */
  flowerColor?: string;
  /**
   * Imagen de fondo de toda la sección Precios mientras este plan está activo en el carrusel
   * (Pricing.astro la usa con un cross-fade entre planes). Para agregar un plan nuevo en el
   * futuro, alcanza con sumar su imagen como plan-N.png en src/assets/plan/, importarla arriba
   * y pasarla aquí en la entrada correspondiente — es opcional, así que un plan sin imagen
   * todavía simplemente no cambia el fondo al activarse.
   */
  bgImage?: ImageMetadata;
}

// Datos de ejemplo — reemplazar por los servicios y precios reales del salón.
export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    category: "Cortes",
    title: "Corte + Brushing",
    price: "2500",
    period: "/sesión",
    description: ["Diagnóstico capilar", "Corte personalizado", "Lavado con productos premium", "Brushing de finalización"],
    flowerColor: "#f28fb2",
    bgImage: plan1,
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
    bgImage: plan2,
  },
  {
    id: 3,
    category: "Tratamientos faciales",
    title: "Limpieza Facial Profunda",
    price: "3800",
    period: "/sesión",
    description: ["Doble limpieza", "Exfoliación e hidratación", "Extracción de comedones", "Mascarilla según tipo de piel"],
    flowerColor: "#c98ba0",
    bgImage: plan3,
  },
  {
    id: 4,
    category: "Manicura y Pedicura",
    title: "Manicura + Pedicura Spa",
    price: "3200",
    period: "/sesión",
    description: ["Manicura clásica o semipermanente", "Pedicura spa con exfoliación", "Hidratación de manos y pies", "Esmaltado a elección"],
    flowerColor: "#e8709a",
    bgImage: plan4,
  },
  {
    id: 5,
    category: "Tratamientos capilares",
    title: "Hidratación Profunda",
    price: "2900",
    period: "/sesión",
    description: ["Diagnóstico del cabello", "Ampolla de tratamiento intensivo", "Masaje capilar", "Brushing de finalización"],
    flowerColor: "#a9697f",
    bgImage: plan5,
  },
  {
    id: 6,
    category: "Paquetes",
    title: "Día de Reina",
    price: "A consultar",
    description: ["Corte + color", "Tratamiento facial", "Manicura + pedicura", "Sesión completa a medida"],
    flowerColor: "#7d716c",
    // TODO: falta plan-6.png en src/assets/plan/ — sumarla y agregar bgImage acá.
  },
];

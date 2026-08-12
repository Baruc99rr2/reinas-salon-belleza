export interface SkillCategory {
  id: string;
  /** Título breve mostrado en la tarjeta chica y en el reverso, ej: "Cabello" */
  title: string;
  /** Texto lateral tipo "riser", ej: "Reinas — Cabello" */
  label: string;
  /** Lista de servicios de la categoría */
  services: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "cabello",
    title: "Cabello",
    label: "Reinas — Cabello",
    services: ["Corte", "Color", "Peinado"],
  },
  {
    id: "maquillaje-depilacion",
    title: "Maquillaje y depilación",
    label: "Reinas — Maquillaje y depilación",
    services: ["Maquillaje profesional", "Depilación definitiva", "Depilación con cera"],
  },
  {
    id: "estetica",
    title: "Estética facial y corporal",
    label: "Reinas — Estética facial y corporal",
    services: ["Facial", "Corporal", "Aparatología", "Drenaje facial"],
  },
  {
    id: "masajes",
    title: "Masajes y terapias (spa)",
    label: "Reinas — Masajes y terapias",
    services: ["Masajes relajantes", "Masaje deportivo", "Masaje con piedras", "Drenaje linfático"],
  },
];

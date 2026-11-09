// Categorías de servicios de Reinas (tarjetas y modal de "Servicios que ofrecemos").
// Servicios reales del salón: faciales, corporales, depilación definitiva, masajes, pestañas y cejas.
// Se agrupan en 4 categorías para mantener la grilla de 4 tarjetas.
//
// TODO: confirmar con la dueña el detalle de cada lista (los nombres de los servicios puntuales son
// una propuesta a partir de las categorías reales).
//
// La foto de cada categoría y su ícono se asignan por `id` en src/components/MySkills.astro.

export interface SkillCategory {
  id: string;
  /** Título breve mostrado en la tarjeta chica y en el reverso, ej: "Masajes" */
  title: string;
  /** Texto lateral tipo "riser", ej: "Reinas — Masajes" */
  label: string;
  /** Lista de servicios de la categoría */
  services: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "faciales-corporales",
    title: "Faciales y corporales",
    label: "Reinas — Faciales y corporales",
    services: ["Tratamientos faciales", "Tratamientos corporales", "Aparatología"],
  },
  {
    id: "depilacion",
    title: "Depilación definitiva",
    label: "Reinas — Depilación definitiva",
    services: ["Depilación definitiva facial", "Depilación definitiva corporal"],
  },
  {
    id: "masajes",
    title: "Masajes",
    label: "Reinas — Masajes",
    services: ["Masajes relajantes", "Masajes descontracturantes", "Drenaje linfático"],
  },
  {
    id: "pestanas-cejas",
    title: "Pestañas y cejas",
    label: "Reinas — Pestañas y cejas",
    services: ["Lifting de pestañas", "Perfilado de cejas", "Laminado de cejas"],
  },
];

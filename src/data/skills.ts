// Categorías de servicios de Reinas (tarjetas y modal de "Servicios que ofrecemos").
// Servicios reales del salón: faciales, corporales, depilación definitiva, masajes, pestañas y cejas.
// Se agrupan en 4 categorías para mantener la grilla de 4 tarjetas.
//
// TODO: confirmar con la dueña el detalle de cada lista (los nombres de los servicios puntuales son
// una propuesta a partir de las categorías reales).
//
// La foto de cada categoría y su ícono se asignan por `id` en src/components/MySkills.astro; el
// fondo y el color de la flor de "Elegí tu servicio", en src/components/ServicePicker.astro.

export interface SkillCategory {
  id: string;
  /** Título breve mostrado en la tarjeta chica y en el reverso, ej: "Masajes" */
  title: string;
  /** Texto lateral tipo "riser", ej: "Reinas — Masajes" */
  label: string;
  /** Descripción breve (tarjetas de "Elegí tu servicio"). */
  description: string;
  /** Lista de servicios de la categoría */
  services: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "faciales-corporales",
    title: "Faciales y corporales",
    label: "Reinas — Faciales y corporales",
    description: "Tratamientos para cuidar y renovar la piel de tu rostro y de tu cuerpo.",
    services: ["Tratamientos faciales", "Tratamientos corporales", "Aparatología"],
  },
  {
    id: "depilacion",
    title: "Depilación definitiva",
    label: "Reinas — Depilación definitiva",
    description: "Depilación definitiva de rostro y cuerpo, para olvidarte del vello.",
    services: ["Depilación definitiva facial", "Depilación definitiva corporal"],
  },
  {
    id: "masajes",
    title: "Masajes",
    label: "Reinas — Masajes",
    description: "Un momento para soltar tensiones, relajarte y reconectar con tu cuerpo.",
    services: ["Masajes relajantes", "Masajes descontracturantes", "Drenaje linfático"],
  },
  {
    id: "pestanas-cejas",
    title: "Pestañas y cejas",
    label: "Reinas — Pestañas y cejas",
    description: "Una mirada definida y natural, con pestañas y cejas a tu medida.",
    services: ["Lifting de pestañas", "Perfilado de cejas", "Laminado de cejas"],
  },
];

// Armado de los mensajes que se envían por WhatsApp (modal de reserva y formulario del Footer).
// Funciones puras, sin DOM: se usan desde los <script> de BookingModal.astro y Footer.astro.

const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/** Fecha de hoy como "AAAA-MM-DD" en hora LOCAL (toISOString usa UTC y de noche daría mañana). */
export function todayIso(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** true si `value` es una fecha "AAAA-MM-DD" válida y no anterior a `min`. */
export function isValidBookingDate(value: string, min: string = todayIso()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const isRealDate = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  // Las fechas "AAAA-MM-DD" se pueden comparar como texto.
  return isRealDate && value >= min;
}

/**
 * "2026-11-18" → "miércoles 18 de noviembre". Si la fecha es de otro año que `now`, lo agrega:
 * "2027-01-08" → "viernes 8 de enero de 2027".
 */
export function formatDateEs(value: string, now: Date = new Date()): string {
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const text = `${WEEKDAYS[date.getDay()]} ${d} de ${MONTHS[m - 1]}`;
  return y === now.getFullYear() ? text : `${text} de ${y}`;
}

interface BookingMessageInput {
  /** Fecha elegida, "AAAA-MM-DD". */
  date: string;
  /** Fecha de referencia para decidir si se muestra el año (por defecto, hoy). */
  now?: Date;
  /** Categoría de servicio elegida (obligatoria), ej. "Masajes". */
  service: string;
  /** Mensaje opcional de la clienta. */
  message?: string;
}

/** Mensaje del modal de reserva. */
export function buildBookingMessage({ date, service, message, now }: BookingMessageInput): string {
  let text = `Quiero sacar un turno para esta fecha: ${formatDateEs(date, now)}`;
  text += `\nServicio: ${service.trim()}`;
  if (message?.trim()) text += `\n\n${message.trim()}`;
  return text;
}

/** Mensaje del formulario de contacto del Footer. */
export function buildContactMessage(name: string, message: string): string {
  return `Hola, soy ${name.trim()}. ${message.trim()}`;
}

# Reinas — Centro de belleza integral

Landing del salón **Reinas** (Otero 381, San Salvador de Jujuy). Sitio estático hecho con
[Astro](https://docs.astro.build) 7, Tailwind CSS v4 y TypeScript. Las reservas y consultas se hacen
por WhatsApp: no hay backend.

- **`/`** — Hero con video, Galería, Servicios (MySkills), Precios y Footer con formulario de contacto.
- **`/sobre-mi`** — Biografía y grilla de títulos y certificaciones con visor ampliado.

Modo claro/oscuro, pensado para funcionar desde 250px de ancho.

## Cómo correrlo

Requiere Node 22.12 o superior.

```sh
npm install
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve dist/ para revisarlo antes de publicar
npx astro check    # chequeo de tipos de .astro y .ts
```

Para publicar, alcanza con subir el contenido de `dist/` a cualquier hosting estático.

## Dónde se editan los datos

| Qué | Archivo |
|---|---|
| Marca, responsable, teléfono, WhatsApp, dirección, mapa, forma de atención y redes sociales | `src/data/contact.ts` |
| Planes y precios (carrusel de Precios) | `src/data/pricing.ts` |
| Categorías de servicios (tarjetas y modal de MySkills) | `src/data/skills.ts` |

Detalles:

- **`contact.ts`** es la única fuente de los datos de contacto: Hero, Footer, títulos de página y
  mensajes de WhatsApp leen de ahí. Una red social con `url: ""` no se muestra. `whatsapp` va solo
  con dígitos en formato internacional (`549...`). `buildWhatsAppUrl(texto)` arma el link `wa.me`.
- **`pricing.ts`**: cada plan tiene `category`, `title`, `price` (número o "A consultar"), `period`,
  `description` (lista), `featured` (etiqueta "Más elegido") y `flowerColor` (color de la flor
  decorativa). El fondo de la sección mientras el plan está activo sale solo de
  `src/assets/plan/plan-N.<png|jpg|webp|avif>`, con N = `id` del plan.
- **`skills.ts`**: las fotos de cada categoría están en `src/assets/card/` y se asignan en
  `src/components/MySkills.astro`, en el mismo orden que el array.
- **Galería**: las 8 fotos, su orden y sus textos alternativos están al principio de
  `src/components/Gallery.astro`.
- **Títulos de "Sobre mí"**: cualquier `src/assets/studies/titulo-N.jpg` aparece solo en la grilla,
  ordenado por N.

## Reservas por WhatsApp

- `src/components/BookingModal.astro`: modal de reserva (servicio y fecha obligatorios, mensaje
  opcional). Los servicios del selector salen de `skills.ts`. Se abre con cualquier elemento que
  tenga `data-booking-trigger`; con `data-booking-service="<id de skills.ts>"` el servicio viene
  preseleccionado. Lo usan el botón del Hero, las tarjetas de "Elegí tu servicio" y el detalle de
  cada categoría en Servicios.
- El formulario del Footer valida nombre y mensaje y abre WhatsApp con el texto armado.
- Los textos de los mensajes se arman en `src/lib/booking.ts`.

## Imágenes y videos

Todas las imágenes pasan por `astro:assets` (`<Image>`, `<Picture>` o `getImage()`): en el sitio
publicado solo hay versiones WebP/AVIF al tamaño necesario, nunca los originales.

- Para fondos por CSS se usa `cssBackground()` de `src/lib/images.ts`.
- **No leer propiedades de una imagen importada** (`imagen.src`, `imagen.width`...): Astro lo toma
  como que se usa el original y lo copia completo a `dist/`.
- Los videos tienen portada (`poster`) sacada de su primer frame, en `src/assets/posters/`. Si se
  cambia un video, regenerarla, por ejemplo con
  `ffmpeg -i video.mp4 -frames:v 1 -q:v 2 video-poster.jpg`.

## Estructura

```text
src/
├── assets/        imágenes y videos (originales; se optimizan en el build)
├── components/    secciones de la home, Navbar, Footer, BookingModal, etc.
├── data/          contact.ts, pricing.ts, skills.ts
├── layouts/       Layout.astro (head, tema claro/oscuro, modal de reserva)
├── lib/           booking.ts (mensajes de WhatsApp), images.ts (fondos optimizados)
├── pages/         index.astro (/) y sobre-mi.astro (/sobre-mi)
└── styles/        global.css (paleta, tipografías y ajustes globales)
```

## Pendientes de contenido

- Cargar la URL de Instagram (`contact.ts`).
- Reemplazar los precios de ejemplo (`pricing.ts`).
- Reemplazar la biografía de `/sobre-mi`.

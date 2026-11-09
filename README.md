# Reinas — Centro de belleza integral

Landing del salón **Reinas** (Otero 381, San Salvador de Jujuy). Sitio estático hecho con
[Astro](https://docs.astro.build) 7, Tailwind CSS v4 y TypeScript. Las reservas y consultas se hacen
por WhatsApp: no hay backend.

- **`/`** — Hero con video, Galería, Servicios (MySkills), "Elegí tu servicio" (reservas), Volver al
  Origen y Footer con formulario de contacto.
- **`/sobre-mi/`** — Biografía, las dos caras de la propuesta, fotos del salón y títulos.
- **404** — página propia para direcciones que no existen.

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

Para publicar, alcanza con subir el contenido de `dist/` a cualquier hosting estático (hoy:
Vercel, en https://reinas-salon-belleza.vercel.app).

## SEO y vista previa al compartir

- **URL del sitio:** solo en `astro.config.mjs` (`site`). Canonical, Open Graph, JSON-LD, sitemap y
  `robots.txt` la toman de ahí; si cambia el dominio, se cambia en ese único lugar.
- **Título y descripción** de cada página: props de `<Layout>` en `src/pages/index.astro` y
  `src/pages/sobre-mi.astro`.
- **Sitemap:** `@astrojs/sitemap` genera `sitemap-index.xml` en el build (sin la 404).
  `robots.txt` se genera desde `src/pages/robots.txt.ts`.
- **Datos estructurados:** `src/components/LocalBusinessSchema.astro` (schema.org `BeautySalon`, en
  la home). Sale de `contact.ts` (incluida la dirección por partes, `postalAddress`) y `skills.ts`.
  No lleva horarios ni la dirección de los talleres.
- **Imagen para compartir** (WhatsApp, Facebook, X): `public/og-image.jpg`, 1200x630. Plantilla en
  `scripts/og-image.html` (abrirla en el navegador a 1200x630 y capturar). El contenido va dentro del
  cuadrado central de 630px, porque WhatsApp a veces recorta la vista previa en cuadrado.
- **Íconos** (favicon, apple-touch-icon, 192/512 y `site.webmanifest`): `python scripts/generate-icons.py`
  los regenera desde la corona (`src/assets/logo2.png`).
- **Tipografías:** autoalojadas con `@fontsource` (Playfair Display, Poppins y Alex Brush para
  Volver al Origen); no se pide nada a Google Fonts.

## Dónde se editan los datos

| Qué | Archivo |
|---|---|
| Marca, responsable, teléfono, WhatsApp, dirección, mapa, forma de atención y redes sociales | `src/data/contact.ts` |
| Categorías de servicios (MySkills, "Elegí tu servicio" y el selector del modal de reserva) | `src/data/skills.ts` |
| Talleres de Volver al Origen | `src/data/talleres.ts` |

Detalles:

- **`contact.ts`** es la única fuente de los datos de contacto: Hero, Footer, títulos de página y
  mensajes de WhatsApp leen de ahí. Una red social con `url: ""` no se muestra. `whatsapp` va solo
  con dígitos en formato internacional (`549...`). `buildWhatsAppUrl(texto)` arma el link `wa.me`.
- **`skills.ts`** es la única fuente del catálogo: cada categoría (nombre, descripción breve y lista de
  servicios) aparece en Servicios, en "Elegí tu servicio" y en el selector del modal de reserva. La
  foto del detalle se asigna por `id` en `MySkills.astro`; el fondo y el color de la flor de cada
  tarjeta de reserva, en `ServicePicker.astro`. Por ahora el sitio no publica precios.
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
- El video del Hero tiene portada (`poster`) sacada de su primer frame, en `src/assets/posters/`. Si
  se cambia el video, regenerarla, por ejemplo con
  `ffmpeg -i video.mp4 -frames:v 1 -q:v 2 video-poster.jpg`.
- **Video de la Galería (opcional).** La celda central de la Galería muestra una foto del salón.
  Para poner un video propio:
  1. Guardalo como `src/assets/videos/galeria.mp4` (corto, sin sonido; se reproduce en loop y
     solo mientras está en pantalla).
  2. Opcional: su portada como `src/assets/videos/galeria-poster.jpg` (o `.png`/`.webp`), por
     ejemplo con `ffmpeg -i galeria.mp4 -frames:v 1 -q:v 2 galeria-poster.jpg`. Sin portada se usa
     la foto del tocador.
  3. `npm run build`: el sitio lo detecta solo. Para volver a la foto, borrá el archivo.

## Estructura

```text
src/
├── assets/        imágenes y videos (originales; se optimizan en el build)
├── components/    secciones de la home, Navbar, Footer, BookingModal, etc.
├── data/          contact.ts, skills.ts, talleres.ts, salon.ts (fotos del salón)
├── layouts/       Layout.astro (head, tema claro/oscuro, modal de reserva)
├── lib/           booking.ts (mensajes de WhatsApp), images.ts (fondos optimizados)
├── pages/         index.astro (/), sobre-mi.astro (/sobre-mi/), 404.astro y robots.txt.ts
└── styles/        global.css (paleta, tipografías y ajustes globales)
public/            og-image.jpg, íconos y site.webmanifest
scripts/           og-image.html y generate-icons.py (para regenerar imagen e íconos)
```

## Pendientes de contenido

- Confirmar con la dueña los servicios puntuales de cada categoría (`SERVICIOS-A-CONFIRMAR.md`).

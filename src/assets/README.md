Imágenes y videos originales del sitio. Astro los optimiza en el build: lo que se publica son
versiones WebP/AVIF redimensionadas, nunca estos archivos tal cual.

- `logo.png`, `logo2.png` — logo completo y corona (masters en alta resolución).
- `bg-*.png` — fondos de secciones. `bg-hero.mp4` — video del Hero.
- `carrousel/` — fotos y video de la Galería. `card/` — fotos de las categorías de servicios.
- `about/` — fotos reales del salón (Sobre mí, Galería, fondos de "Elegí tu servicio").
- `origen/` — material de Volver al Origen (logo, flyers y versiones derivadas).
- `studies/titulo-N.jpg` — títulos y certificaciones de "Sobre mí".
- `posters/` — primer frame de cada video, usado como portada.

La extensión tiene que coincidir con el formato real del archivo (un WebP con extensión `.jpg`
confunde a algunas herramientas).

Para mostrar una imagen, usar los componentes de `astro:assets` en vez de `imagen.src`:

```astro
---
import { Image } from "astro:assets";
import logo from "../assets/logo.png";
---

<Image src={logo} width={64} densities={[1, 2]} alt="Reinas" />
```

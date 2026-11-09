Carpeta para las imágenes del proyecto (logo, fotos, íconos, etc.).

Cuando el logo esté listo, agregarlo acá (por ejemplo `logo.png`) e importarlo en `Navbar.astro`:

```astro
---
import logo from "../assets/logo.png";
---

<img src={logo.src} alt="Reinas" class="h-12 w-12 rounded-full object-cover" />
```

"""Genera los íconos del sitio a partir de la corona (src/assets/logo2.png).

Uso (desde la raíz del proyecto, requiere Pillow):  python scripts/generate-icons.py

La corona es un dibujo de líneas finas con degradado dorado: vectorizada perdería el degradado y en
tamaños chicos casi no se ve. Por eso los íconos son PNG: la corona en crema sobre un cuadrado con
el degradado rosado de la marca, con las líneas engrosadas en los tamaños chicos para que se lean.

Salida en public/:
  favicon.ico (16, 32, 48) · favicon-32x32.png · apple-touch-icon.png (180)
  icon-192.png · icon-512.png (con margen seguro, sirven también como "maskable")
"""

from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "logo2.png"
OUT = ROOT / "public"

ROSE_LIGHT = (232, 112, 154)  # rose-500
ROSE_DEEP = (178, 54, 98)  # rose-700
CREAM = (255, 245, 248)  # rose-50


def crown_mask() -> Image.Image:
    alpha = Image.open(SRC).convert("RGBA").getchannel("A")
    return alpha.crop(alpha.point(lambda v: 255 if v > 20 else 0).getbbox())


def gradient(size: int) -> Image.Image:
    """Degradado diagonal rose-500 → rose-700."""
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(ROSE_LIGHT, ROSE_DEEP))
    return img


def icon(size: int, *, crown_width: float, thicken: int, rounded: bool) -> Image.Image:
    mask = crown_mask()
    if thicken > 1:
        mask = mask.filter(ImageFilter.MaxFilter(thicken))
    target_w = round(size * crown_width)
    target_h = round(mask.height * target_w / mask.width)
    mask = mask.resize((target_w, target_h), Image.LANCZOS)

    img = gradient(size).convert("RGBA")
    crown = Image.new("RGBA", mask.size, CREAM + (0,))
    crown.putalpha(mask)
    # Un poco más abajo del centro: la corona es más pesada abajo (la base) que arriba (las puntas).
    img.alpha_composite(crown, ((size - target_w) // 2, (size - target_h) // 2 + round(size * 0.02)))

    if rounded:
        corner = Image.new("L", (size, size), 0)
        ImageDraw.Draw(corner).rounded_rectangle((0, 0, size - 1, size - 1), radius=round(size * 0.22), fill=255)
        img.putalpha(ImageChops.multiply(img.getchannel("A"), corner))
    return img


def main() -> None:
    OUT.mkdir(exist_ok=True)
    # Pestañas del navegador: esquinas redondeadas y líneas bien engrosadas.
    ico_sizes = {16: icon(16, crown_width=0.86, thicken=45, rounded=True),
                 32: icon(32, crown_width=0.80, thicken=29, rounded=True),
                 48: icon(48, crown_width=0.76, thicken=19, rounded=True)}
    ico_sizes[48].save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=[ico_sizes[16], ico_sizes[32]])
    ico_sizes[32].save(OUT / "favicon-32x32.png", optimize=True)
    # iOS y Android recortan el ícono a su manera: cuadrado lleno, corona dentro del 80% central.
    icon(180, crown_width=0.62, thicken=7, rounded=False).convert("RGB").save(OUT / "apple-touch-icon.png", optimize=True)
    icon(192, crown_width=0.58, thicken=7, rounded=False).convert("RGB").save(OUT / "icon-192.png", optimize=True)
    icon(512, crown_width=0.58, thicken=3, rounded=False).convert("RGB").save(OUT / "icon-512.png", optimize=True)
    print("Íconos generados en", OUT)


if __name__ == "__main__":
    main()

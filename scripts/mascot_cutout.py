#!/usr/bin/env python3
"""Cut the white background out of newly generated mascot art.

The mascot illustrations arrive as flat white-background PNGs while the app
needs transparent ones. A plain "remove white" pass would also delete the
white hoodie, the speech bubble and the result card, so the background is
defined as *pure white reachable from the top/left/right edges*:

  * the bottom edge is not a seed, because the figure is cropped there and
    seeding it would let the flood walk up into the hoodie;
  * enclosed whites (hoodie, bubble interior, card) stay opaque;
  * the 3px fringe gets its alpha from how close to white it is and its colour
    is un-blended, so no white halo is left when the art sits on a dark panel.

Usage:
    python3 scripts/mascot_cutout.py <input.png> <girl|boy>-<pose>.png

Output always lands in public/images/sei/ at 1024x1024, matching the rest of
the set. Update the width/height/alt entries in src/components/Mascot.tsx
afterwards if the canvas size or the pose changed.
"""

import sys
from pathlib import Path

from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

OUT_DIR = Path("public/images/sei")

PURE_WHITE = 246   # a pixel counts as background only if every channel is this bright
FEATHER = 3        # ring width (px) that fades out at the edge of the figure
RAMP_SPAN = 80.0   # whiteness range mapped across alpha 0..255
SIZE = 1024


def cut(source: Path) -> Image.Image:
    rgb = np.asarray(Image.open(source).convert("RGB")).astype(np.float32)
    height, width, _ = rgb.shape
    minc = rgb.min(axis=2)

    labels, _ = ndimage.label(minc >= PURE_WHITE)
    seeds = set(labels[0, :]) | set(labels[:, 0]) | set(labels[:, -1])
    seeds.discard(0)
    background = np.isin(labels, list(seeds))

    alpha = np.full((height, width), 255.0, dtype=np.float32)
    alpha[background] = 0.0

    fringe = ndimage.binary_dilation(background, iterations=FEATHER) & ~background
    ramp = np.clip((255.0 - minc) / RAMP_SPAN, 0.0, 1.0) * 255.0
    alpha[fringe] = np.minimum(alpha[fringe], ramp[fringe])

    alpha = np.asarray(
        Image.fromarray(alpha.astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(0.7))
    ).astype(np.float32)
    alpha[background] = 0.0

    coverage = alpha / 255.0
    soft = (coverage > 0.0) & (coverage < 1.0)
    colour = rgb.copy()
    for channel in range(3):
        plane = colour[:, :, channel]
        plane[soft] = np.clip(
            (plane[soft] - (1.0 - coverage[soft]) * 255.0) / coverage[soft], 0.0, 255.0
        )

    rgba = np.dstack([colour, alpha]).astype(np.uint8)
    image = Image.fromarray(rgba, "RGBA").resize((SIZE, SIZE), Image.LANCZOS)

    pixels = np.asarray(image).copy()
    pixels[pixels[:, :, 3] == 0, :3] = 0  # no colour stored under full transparency
    return Image.fromarray(pixels, "RGBA")


def main(argv: list[str]) -> int:
    if len(argv) != 3:
        print(__doc__, file=sys.stderr)
        return 2

    source, name = Path(argv[1]), Path(argv[2])
    if not source.exists():
        print(f"input not found: {source}", file=sys.stderr)
        return 1
    if not name.stem.endswith(("-main", "-welcome", "-thinking", "-encouraging",
                               "-celebrating", "-curious")):
        print(f"unexpected pose filename: {name.name}", file=sys.stderr)
        return 1

    image = cut(source)
    target = OUT_DIR / name.name
    image.save(target, optimize=True)

    alpha = np.asarray(image)[:, :, 3]
    print(
        f"{target}  {image.width}x{image.height}  "
        f"transparent {100.0 * (alpha == 0).mean():.1f}%  "
        f"feather {100.0 * ((alpha > 0) & (alpha < 250)).mean():.1f}%  "
        f"opaque {100.0 * (alpha == 255).mean():.1f}%"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

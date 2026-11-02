"""
Normalise the documentation screenshots to one uniform 16:9 canvas.

The capture step already shoots a fixed 16:9 viewport, so this is a light safety
net: it scales every PNG under docs/screenshots/ to fit inside a 1280x720
"contain" canvas, centres it, and fills any margin with a soft neutral so all
tiles end up exactly the same size and line up perfectly in the README grid.
Portrait (mobile) captures are centred on the same canvas.

It is idempotent: re-running on already-normalised files is a no-op.

Run after the capture step:
    python3 scripts/normalize_screenshots.py
"""

import sys
from pathlib import Path

from PIL import Image

SCREENSHOTS_DIR = Path("docs/screenshots")
TARGET = (1280, 720)
BACKGROUND = (244, 246, 251)

def normalise(path: Path) -> tuple[int, int]:
    image = Image.open(path).convert("RGB")
    scale = min(TARGET[0] / image.width, TARGET[1] / image.height)
    new_size = (
        max(1, round(image.width * scale)),
        max(1, round(image.height * scale)),
    )
    fitted = image.resize(new_size, Image.LANCZOS)

    canvas = Image.new("RGB", TARGET, BACKGROUND)
    canvas.paste(
        fitted,
        ((TARGET[0] - new_size[0]) // 2, (TARGET[1] - new_size[1]) // 2),
    )
    canvas.save(path, "PNG", optimize=True)
    return canvas.size

def main() -> int:
    files = sorted(SCREENSHOTS_DIR.rglob("*.png"))
    if not files:
        print(f"No PNGs found under {SCREENSHOTS_DIR}", file=sys.stderr)
        return 1
    for path in files:
        size = normalise(path)
        print(f"{path.name} -> {size[0]}x{size[1]}")
    print(f"\nNormalised {len(files)} screenshots to {TARGET[0]}x{TARGET[1]}.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

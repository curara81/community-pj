#!/usr/bin/env python3
"""Render each detail page, crop the slab area on the left, save as JPG."""

import json
import os
import shutil
import subprocess
from pathlib import Path

PDF_PATH = "/tmp/catalog_clean.pdf"
WORK_DIR = Path("/tmp/render_work")
OUTPUT_DIR = Path("/home/user/community-pj/public/catalog-thumbs")
PAGE_MAP = json.loads(Path("/tmp/page_to_product.json").read_text(encoding="utf-8"))

DPI = 150  # 150 DPI for landscape A4 → ~1754 x 1240 px
# Slab region: left ~58% horizontally, with small margins on top/bottom
CROP_LEFT_PCT = 0.04
CROP_RIGHT_PCT = 0.58
CROP_TOP_PCT = 0.05
CROP_BOTTOM_PCT = 0.95
MAX_OUTPUT_EDGE = 800


def safe_name(name: str) -> str:
    return (
        name.upper()
        .replace(" ", "_")
        .replace("È", "E")
        .replace("É", "E")
        .replace("À", "A")
        .replace("'", "")
    )


def main():
    if WORK_DIR.exists():
        shutil.rmtree(WORK_DIR)
    WORK_DIR.mkdir()
    OUTPUT_DIR.mkdir(exist_ok=True, parents=True)

    # Clear previous outputs to avoid stale files
    for f in OUTPUT_DIR.glob("*.jpg"):
        f.unlink()

    # Resolve duplicates: if two pages map to the same product name, take the
    # first (earlier page = main detail page).
    saved = {}
    seen_products = set()

    for page_str, product in sorted(PAGE_MAP.items(), key=lambda kv: int(kv[0])):
        page = int(page_str)
        if product in seen_products:
            continue
        seen_products.add(product)

        # Render page
        prefix = WORK_DIR / f"p{page}"
        subprocess.run(
            [
                "pdftoppm",
                "-f",
                str(page),
                "-l",
                str(page),
                "-r",
                str(DPI),
                "-jpeg",
                PDF_PATH,
                str(prefix),
            ],
            check=True,
            capture_output=True,
        )
        # File is named p{page}-{NNN}.jpg with 3-digit zero-padded page number
        candidates = list(WORK_DIR.glob(f"p{page}-*.jpg"))
        if not candidates:
            print(f"  WARN no render for page {page} ({product})")
            continue
        rendered = candidates[0]

        # Get dimensions
        dim = subprocess.run(
            ["identify", "-format", "%w %h", str(rendered)],
            capture_output=True,
            text=True,
        ).stdout.strip().split()
        w, h = int(dim[0]), int(dim[1])

        x0 = int(w * CROP_LEFT_PCT)
        x1 = int(w * CROP_RIGHT_PCT)
        y0 = int(h * CROP_TOP_PCT)
        y1 = int(h * CROP_BOTTOM_PCT)
        cw, ch = x1 - x0, y1 - y0

        outname = safe_name(product) + ".jpg"
        outpath = OUTPUT_DIR / outname

        subprocess.run(
            [
                "convert",
                str(rendered),
                "-crop",
                f"{cw}x{ch}+{x0}+{y0}",
                "+repage",
                "-resize",
                f"{MAX_OUTPUT_EDGE}x{MAX_OUTPUT_EDGE}>",
                "-quality",
                "82",
                "-strip",
                str(outpath),
            ],
            check=True,
        )
        saved[product] = outname

    print(f"Saved {len(saved)} images to {OUTPUT_DIR}")

    mapping = {safe_name(p): f"/catalog-thumbs/{n}" for p, n in saved.items()}
    Path("/tmp/catalog_image_paths.json").write_text(
        json.dumps(mapping, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Mapping saved to /tmp/catalog_image_paths.json ({len(mapping)} entries)")
    # cleanup work dir
    shutil.rmtree(WORK_DIR)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Parse NUOVOCORSO catalog index into structured JSON."""

import re
import json
from pathlib import Path

INDEX_PATH = Path("/tmp/index_only.txt")
OUTPUT_PATH = Path("/tmp/catalog.json")

# Recognized finishes (order matters: longer first to avoid partial matches)
FINISHES = [
    "Soft Structured",
    "Stripes Matt",
    "Art 5D Technology",
    "Naturale Matt",
    "Levigato Polished",
    "Structured",
    "Leather",
    "Honed",
]

# Thicknesses
THK_PATTERNS = {
    "6.5mm": re.compile(r"6,5\s*mm\s*0\.25"),
    "12mm": re.compile(r"12\s*mm\s*0\.47"),
    "2cm": re.compile(r"2\s*cm\s*0\.78"),
}

# Color/tone tag dictionary (Italian + English)
COLOR_KEYWORDS = {
    "white": ["WHITE", "BIANCO", "IVORY", "SUPERWHITE",
              "STATUARIO", "CARRARA", "CALACATTA", "LASA"],
    "black": ["BLACK", "NERO", "NERA", "NOIR", "ANTHRACITE", "MARQUINA", "PORTORO"],
    "grey": ["GREY", "GRAY", "GRIGIA", "GRIGIO", "ASH", "GREIGE", "TAUPE", "CONCRETE"],
    "beige": ["BEIGE", "CREAM", "CREMO", "ALMOND", "DORATO", "ORO", "GOLD",
              "NAVONA", "MACAUBAS"],
    "brown": ["BROWN", "BORGHETTO", "NUT", "OAK", "TIGER", "AUTUMN"],
    "green": ["GREEN", "JADE", "SMERALDO", "BOSCO", "FOREST"],
    "blue": ["COBALTO", "BLU", "BLUE", "SAPPHIRE"],
    "red": ["RED", "ROSSO"],
    "orange": ["ORANGE"],
    "violet": ["VIOLA", "PURPLE", "PAONAZZETTO", "VIOLET"],
}

# Look category patterns
def classify_look(name: str, section: str) -> str:
    """Classify the visual look of the product."""
    n = name.upper()
    if section == "stone":
        return "stone-look"
    if "WOOD" in n or "ESSENCE" in n:
        return "wood-look"
    if "CEMENT" in n or "CONCRETE" in n or "BOULEVARD" in n:
        return "cement-look"
    if "BASALTINA" in n or "PIETRA" in n or "ARDESIA" in n or "ONICE" in n:
        # Onice is onyx (translucent stone)
        if "ONICE" in n:
            return "onyx-look"
        return "stone-look"
    if "TRAVERTINO" in n:
        return "travertine-look"
    # Default: marble-look (most products in main section)
    return "marble-look"


def derive_color_tags(name: str) -> list[str]:
    n = name.upper()
    # Tokenize on non-alpha to get whole words only (avoids RED matching in STRUCTURED)
    tokens = set(re.findall(r"[A-Z]+", n))
    tags = []
    for color, keywords in COLOR_KEYWORDS.items():
        for kw in keywords:
            if kw in tokens:
                tags.append(color)
                break
    return tags


def derive_tone(color_tags: list[str]) -> str:
    """Warm vs cool vs neutral tone."""
    warm = {"beige", "brown", "red"}
    cool = {"blue", "green", "violet"}
    if any(c in warm for c in color_tags):
        return "warm"
    if any(c in cool for c in color_tags):
        return "cool"
    if "white" in color_tags or "grey" in color_tags or "black" in color_tags:
        return "neutral"
    return "neutral"


def parse_line(line: str, section: str) -> dict | None:
    """Parse a single product line."""
    # Skip empty / header / footer lines
    s = line.strip()
    if not s:
        return None
    # Skip headers
    if s.startswith(("INDEX", "Prodotto", "Stone", "www.", "162x", "MACAUBAS  ")):
        if s.startswith("MACAUBAS  "):
            pass  # don't skip, fall through
        else:
            return None
    # Skip pure header rows / page footers
    if "Spessori Thickness" in s or "Finiture Finishes" in s or "full size" in s:
        return None
    if s.lower().startswith("162x") or s.lower().startswith("160x"):
        return None

    # Find earliest thickness occurrence to split name from rest
    earliest = len(s)
    for pat in THK_PATTERNS.values():
        m = pat.search(s)
        if m and m.start() < earliest:
            earliest = m.start()

    if earliest == len(s):
        # No thickness found → not a product line
        return None

    name = s[:earliest].strip()
    rest = s[earliest:]

    # Skip if name looks invalid
    if not name or len(name) < 2:
        return None
    if name.upper() == name.upper() and not re.search(r"[A-Z]", name):
        return None

    # Detect thicknesses
    thicknesses = [t for t, pat in THK_PATTERNS.items() if pat.search(rest)]

    # Detect finishes (longest match first)
    rest_for_finish = rest
    finishes = []
    for f in FINISHES:
        if f in rest_for_finish:
            finishes.append(f)
            # Remove to avoid sub-match
            rest_for_finish = rest_for_finish.replace(f, "")

    color_tags = derive_color_tags(name)
    look = classify_look(name, section)
    tone = derive_tone(color_tags)

    return {
        "name": name,
        "lookCategory": look,
        "tone": tone,
        "colorTags": color_tags,
        "thicknesses": thicknesses,
        "finishes": finishes,
        "section": section,
    }


def main():
    text = INDEX_PATH.read_text(encoding="utf-8")
    lines = text.splitlines()

    items = []
    section = "main"
    for line in lines:
        s = line.strip()
        # Detect section transition: a standalone "Stone" header line introduces stone section
        if s == "Stone" or s.startswith("Stone "):
            # Make sure it's a header (followed by Spessori) - simplest: track all "Stone" headers
            # We treat the second section explicitly: lines AFTER the Stone header at line ~96
            section = "stone"
            continue
        item = parse_line(line, section)
        if item:
            items.append(item)

    # Deduplicate by name
    seen = set()
    unique = []
    for it in items:
        if it["name"] not in seen:
            seen.add(it["name"])
            unique.append(it)

    catalog = {
        "schemaVersion": 1,
        "vendor": "NUOVOCORSO",
        "year": 2025,
        "material": "Gres Porcellanato (Porcelain Big Slab)",
        "sizes": ["162x324 cm (12mm/2cm)", "160x320 cm (6.5mm rectified)"],
        "totalItems": len(unique),
        "items": unique,
    }

    OUTPUT_PATH.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved {len(unique)} items to {OUTPUT_PATH}")

    # Show summary
    from collections import Counter
    look_counts = Counter(it["lookCategory"] for it in unique)
    print("\nLook category distribution:")
    for k, v in look_counts.most_common():
        print(f"  {k}: {v}")

    color_counts = Counter()
    for it in unique:
        for c in it["colorTags"]:
            color_counts[c] += 1
    print("\nColor tag distribution (multi-tag):")
    for k, v in color_counts.most_common():
        print(f"  {k}: {v}")

    print("\nFirst 5 items:")
    for it in unique[:5]:
        print(json.dumps(it, ensure_ascii=False))


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Map every detail page in the NUOVOCORSO catalog to its product name.
Detail pages contain FORMATO / SIZE and SPESSORI / THICKNESSES sections."""

import json
import re
import subprocess

PDF_PATH = "/tmp/catalog_clean.pdf"
TOTAL_PAGES = 232


def page_text(page: int) -> str:
    res = subprocess.run(
        ["pdftotext", "-layout", "-f", str(page), "-l", str(page), PDF_PATH, "-"],
        capture_output=True, text=True,
    )
    return res.stdout


def extract_product_name(text: str) -> str | None:
    """The product name appears as one or more all-caps lines near the top,
    BEFORE 'Gres Porcellanato' / 'Porcelain Stoneware' / 'FORMATO / SIZE'."""
    lines = text.splitlines()
    name_parts: list[str] = []
    started = False
    skip_words = {
        "DETAIL",
        "DETTAGLIO",
        "BIG SLABS",
        "STONE",
        "MARBLE LOOK",
    }
    for raw in lines:
        line = raw.strip()
        if not line:
            if name_parts:
                # blank line after we collected something → likely end of name
                break
            continue
        if line.startswith("www.") or "nuovocorso" in line.lower():
            continue
        if "Gres Porcellanato" in line or "Porcelain Stoneware" in line:
            break
        if "FORMATO" in line.upper() or "SPESSORI" in line.upper() or "FINITURE" in line.upper():
            break
        if "Dettaglio" in line or "Detail" in line:
            # Some pages have "ABSOLUTE BLACK\nDettaglio Detail\nSTRUCTURED" interleaved
            if name_parts:
                continue
            else:
                continue
        # Test: line is "all caps name fragment"
        # Allow letters, digits, spaces, ', È, etc.
        cleaned = re.sub(r"[^A-Z0-9ÈÉÀÀ-ſ'\s]", "", line.upper())
        cleaned = cleaned.strip()
        if cleaned and cleaned == line.upper().strip() and len(cleaned) <= 40:
            if cleaned in skip_words:
                continue
            if not any(c.isalpha() for c in cleaned):
                continue
            name_parts.append(cleaned)
            started = True
            if len(name_parts) >= 4:
                break
        elif started:
            break
    name = " ".join(name_parts).strip()
    # Cleanup repeated names (Dettaglio detail pages duplicate product name)
    if name:
        words = name.split()
        # dedup consecutive identical chunks (e.g., "ABSOLUTE BLACK ABSOLUTE BLACK")
        out = []
        for i, w in enumerate(words):
            if out and i + 1 < len(words):
                window = words[i : i + len(out)]
                if window == out:
                    break
            out.append(w)
        # Above is hacky; use a simpler dedup: split into half if exact repeat
        if len(words) % 2 == 0:
            half = len(words) // 2
            if words[:half] == words[half:]:
                words = words[:half]
        name = " ".join(words)
    return name or None


def main():
    detail_pages: dict[int, str] = {}
    for page in range(5, TOTAL_PAGES + 1):
        text = page_text(page)
        if "FORMATO" not in text or "SPESSORI" not in text:
            continue
        name = extract_product_name(text)
        if name:
            detail_pages[page] = name

    print(f"Found {len(detail_pages)} detail pages")
    with open("/tmp/page_to_product.json", "w", encoding="utf-8") as f:
        json.dump(detail_pages, f, ensure_ascii=False, indent=2)
    # sample
    items = list(detail_pages.items())
    print("First 10:")
    for p, n in items[:10]:
        print(f"  {p}: {n}")
    print("Last 10:")
    for p, n in items[-10:]:
        print(f"  {p}: {n}")


if __name__ == "__main__":
    main()

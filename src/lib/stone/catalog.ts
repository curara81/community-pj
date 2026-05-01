import type { Catalog } from "./types";

let cached: Catalog | null = null;
let inFlight: Promise<Catalog | null> | null = null;

export async function loadCatalog(): Promise<Catalog | null> {
  if (cached) return cached;
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const res = await fetch("/catalog.json", { cache: "force-cache" });
      if (!res.ok) return null;
      const data = (await res.json()) as Catalog;
      cached = data;
      return data;
    } catch (e) {
      console.warn("Catalog load failed", e);
      return null;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

export function compactCatalogText(catalog: Catalog): string {
  const header = `Vendor: ${catalog.vendor} ${catalog.year} | Material: ${catalog.material} | Sizes: ${catalog.sizes.join(" / ")}`;
  const lines = catalog.items.map((it) => {
    const colors = it.colorTags.length ? it.colorTags.join(",") : "-";
    const thk = it.thicknesses.length ? it.thicknesses.join("/") : "-";
    const fin = it.finishes.length
      ? it.finishes
          .map((f) =>
            f
              .replace("Naturale ", "")
              .replace("Levigato ", "")
              .replace(" Technology", "")
          )
          .join(",")
      : "-";
    return `${it.name}|${it.lookCategory}|${colors}|${it.tone}|${thk}|${fin}`;
  });
  return [
    header,
    "Format per line: name|lookCategory|colors|tone|thicknesses|finishes",
    "---",
    ...lines,
  ].join("\n");
}

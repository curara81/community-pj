import type { StoneAnalysis } from "./types";
import { loadCatalog } from "./catalog";

const TRANSLATE_URL = "https://translation.googleapis.com/language/translate/v2";
const VISION_URL = "https://vision.googleapis.com/v1/images:annotate";
const CUSTOM_SEARCH_URL = "https://www.googleapis.com/customsearch/v1";

// ─────────────────────────────────────────────────────────
// Cloud Translate
// ─────────────────────────────────────────────────────────

export async function translateToEnglish(
  text: string,
  apiKey: string
): Promise<string> {
  if (!apiKey) throw new Error("Cloud API 키가 없습니다.");
  if (!text.trim()) return text;
  // Skip if already mostly English
  if (/^[\x00-\x7F\s]+$/.test(text)) return text;

  const res = await fetch(`${TRANSLATE_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      target: "en",
      format: "text",
    }),
  });
  if (!res.ok) {
    throw new Error(`Translate 오류 (${res.status})`);
  }
  const json = await res.json();
  return json?.data?.translations?.[0]?.translatedText ?? text;
}

// ─────────────────────────────────────────────────────────
// Cloud Vision — Web Detection for stone identification
// ─────────────────────────────────────────────────────────

interface VisionWebEntity {
  entityId?: string;
  description?: string;
  score?: number;
}

interface VisionWebPage {
  url: string;
  pageTitle?: string;
  score?: number;
}

interface VisionResult {
  bestGuessLabel?: string;
  webEntities: VisionWebEntity[];
  visuallySimilarImages: { url: string }[];
  pagesWithMatchingImages: VisionWebPage[];
  fullText?: string;
}

function dataUrlToBase64(dataUrl: string): string {
  const match = dataUrl.match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/);
  if (!match) throw new Error("올바른 이미지 형식이 아닙니다.");
  return match[1];
}

async function visionWebDetect(
  imageDataUrl: string,
  apiKey: string
): Promise<VisionResult> {
  const content = dataUrlToBase64(imageDataUrl);
  const res = await fetch(`${VISION_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        {
          image: { content },
          features: [
            { type: "WEB_DETECTION", maxResults: 10 },
            { type: "LABEL_DETECTION", maxResults: 8 },
          ],
        },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Vision API 오류 (${res.status}): ${t.slice(0, 200)}`);
  }
  const json = await res.json();
  const r = json?.responses?.[0];
  const wd = r?.webDetection ?? {};
  return {
    bestGuessLabel: wd.bestGuessLabels?.[0]?.label,
    webEntities: (wd.webEntities ?? []).filter((e: VisionWebEntity) => e.description),
    visuallySimilarImages: (wd.visuallySimilarImages ?? [])
      .map((i: { url: string }) => ({ url: i.url }))
      .slice(0, 6),
    pagesWithMatchingImages: (wd.pagesWithMatchingImages ?? [])
      .map((p: VisionWebPage) => ({ url: p.url, pageTitle: p.pageTitle, score: p.score }))
      .slice(0, 6),
    fullText: (r?.labelAnnotations ?? [])
      .map((l: { description: string }) => l.description)
      .join(", "),
  };
}

const STONE_CATEGORY_KEYWORDS: { test: RegExp; cat: StoneAnalysis["category"] }[] = [
  { test: /\b(marble|carrara|calacatta|statuario|breccia)\b/i, cat: "marble" },
  { test: /\b(granite)\b/i, cat: "granite" },
  { test: /\b(quartzite|taj mahal)\b/i, cat: "quartzite" },
  { test: /\b(limestone|jura)\b/i, cat: "limestone" },
  { test: /\b(travertine|travertino)\b/i, cat: "travertine" },
  { test: /\b(onyx|onice)\b/i, cat: "onyx" },
  { test: /\b(slate|ardesia)\b/i, cat: "slate" },
  { test: /\b(sandstone|arenaria)\b/i, cat: "sandstone" },
  { test: /\b(quartz|caesarstone|silestone)\b/i, cat: "engineered_quartz" },
  { test: /\b(porcelain|gres|ceramic|tile)\b/i, cat: "ceramic" },
];

function inferCategory(text: string): StoneAnalysis["category"] {
  for (const { test, cat } of STONE_CATEGORY_KEYWORDS) {
    if (test.test(text)) return cat;
  }
  return "other";
}

export async function analyzeWithCloudVision(
  imageDataUrls: string | string[],
  apiKey: string
): Promise<StoneAnalysis> {
  if (!apiKey) throw new Error("Cloud API 키가 설정되지 않았습니다.");
  const urls = Array.isArray(imageDataUrls) ? imageDataUrls : [imageDataUrls];
  if (urls.length === 0) throw new Error("이미지가 없습니다.");

  // Vision can only process one image at a time per request → use the first
  const r = await visionWebDetect(urls[0], apiKey);

  const guess = (r.bestGuessLabel ?? "").trim();
  const topEntities = r.webEntities
    .filter((e) => e.description && (e.score ?? 0) > 0.3)
    .slice(0, 8);
  const labelText = `${guess} ${topEntities.map((e) => e.description).join(" ")} ${r.fullText ?? ""}`;
  const category = inferCategory(labelText);

  // Build a primary "name" guess from best-guess or first entity
  const primaryName =
    guess ||
    topEntities[0]?.description ||
    "Unknown stone";

  // Alternative candidates from next entities
  const alternatives = topEntities
    .slice(1, 3)
    .map((e) => ({
      name: e.description ?? "",
      reason: `Cloud Vision 매칭 신뢰도 ${(((e.score ?? 0) * 100) | 0)}%`,
      confidence: `상대 점수 ${(e.score ?? 0).toFixed(2)}`,
    }));

  // Confidence bucket from top entity score
  const topScore = topEntities[0]?.score ?? 0;
  const confidence: StoneAnalysis["confidence"] =
    topScore > 1.5 ? "high" : topScore > 0.8 ? "medium" : "low";

  // Origin / description / characteristics — Cloud Vision doesn't provide these,
  // so we leave conservative placeholders the UI handles gracefully.
  const description =
    `Google Cloud Vision의 웹 검색 매칭 결과입니다. ` +
    `유사한 웹 이미지에서 추출된 라벨을 기반으로 한 후보이며, ` +
    `정확한 산지/시세 정보가 필요하면 정밀/빠른 분석 또는 검색 탭을 이용하세요.`;

  return {
    name: primaryName,
    category,
    origin: "Cloud Vision은 산지 정보를 제공하지 않음",
    description,
    characteristics: topEntities.map((e) => e.description ?? "").filter(Boolean).slice(0, 4),
    koreanDistributors: [],
    alternativeCandidates: alternatives,
    confidence,
    // Stash similar images and source pages into custom fields via "any" since
    // schema doesn't have them. Use description's notes? Use characteristics.
    // We'll surface them via UI extension separately.
  };
}

export async function visionWebDetectRaw(
  imageDataUrl: string,
  apiKey: string
): Promise<VisionResult> {
  return visionWebDetect(imageDataUrl, apiKey);
}

// ─────────────────────────────────────────────────────────
// Custom Search — image search
// ─────────────────────────────────────────────────────────

export interface CustomSearchImageResult {
  title: string;
  link: string;
  thumbnailLink?: string;
  contextLink?: string;
}

export async function customSearchImages(
  query: string,
  apiKey: string,
  cx: string,
  num = 8
): Promise<CustomSearchImageResult[]> {
  if (!apiKey || !cx) throw new Error("Cloud API 키와 Custom Search Engine ID가 필요합니다.");
  const params = new URLSearchParams({
    key: apiKey,
    cx,
    q: `${query} marble stone slab`,
    searchType: "image",
    num: String(Math.min(num, 10)),
    safe: "active",
  });
  const res = await fetch(`${CUSTOM_SEARCH_URL}?${params}`);
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Custom Search 오류 (${res.status}): ${t.slice(0, 200)}`);
  }
  const json = await res.json();
  return (json.items ?? []).map((it: {
    title: string;
    link: string;
    image?: { thumbnailLink?: string; contextLink?: string };
  }) => ({
    title: it.title,
    link: it.link,
    thumbnailLink: it.image?.thumbnailLink,
    contextLink: it.image?.contextLink,
  }));
}

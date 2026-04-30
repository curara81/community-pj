import { STONE_ANALYSIS_PROMPT, buildUserPrompt } from "./prompts";
import type { AnalysisHints, ConfirmedLibraryItem } from "./prompts";
import { parseAnalysisJson } from "./claude";
import { loadCatalog } from "./catalog";
import type { StoneAnalysis } from "./types";

const ANALYZE_MODEL = "gemini-2.0-flash";
const SEARCH_MODEL = "gemini-2.0-flash";
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function dataUrlParts(dataUrl: string): { mimeType: string; data: string } {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) throw new Error("올바른 이미지 형식이 아닙니다.");
  return { mimeType: match[1], data: match[2] };
}

export async function analyzeWithGemini(
  imageDataUrls: string | string[],
  apiKey: string,
  options: {
    userNote?: string;
    library?: ConfirmedLibraryItem[];
    hints?: AnalysisHints;
  } = {}
): Promise<StoneAnalysis> {
  if (!apiKey) throw new Error("Gemini API 키가 설정되지 않았습니다.");
  const urls = Array.isArray(imageDataUrls) ? imageDataUrls : [imageDataUrls];
  if (urls.length === 0) throw new Error("이미지가 없습니다.");
  const images = urls.map(dataUrlParts);
  const catalog = await loadCatalog();

  const imageParts = images.map((img) => ({
    inlineData: { mimeType: img.mimeType, data: img.data },
  }));

  const response = await fetch(
    `${GEMINI_API_BASE}/${ANALYZE_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: STONE_ANALYSIS_PROMPT }] },
        contents: [
          {
            role: "user",
            parts: [
              ...imageParts,
              {
                text: buildUserPrompt(
                  options.userNote,
                  catalog,
                  options.library,
                  urls.length,
                  options.hints
                ),
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API 오류 (${response.status}): ${errText.slice(0, 300)}`);
  }

  const json = await response.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini 응답에서 텍스트를 찾을 수 없습니다.");
  return parseAnalysisJson(text);
}

// ========== Stone search with web grounding ==========

export interface SearchSource {
  title?: string;
  uri: string;
}

export interface StoneSearchResult {
  query: string;
  englishName?: string;
  koreanName?: string;
  category?: string;
  origin?: string;
  description: string;
  characteristics?: string[];
  globalPriceUsd?: { min: number; max: number; unit: string };
  applications?: string[];
  similarCatalogProducts?: string[];
  sources: SearchSource[];
  rawText?: string;
}

const SEARCH_PROMPT = `당신은 천연석재(대리석, 화강석, 라임스톤, 트래버틴 등) 정보 전문가입니다.
사용자가 한국어/영어/산지명 등으로 석재 이름을 입력하면, googleSearch 도구로 최신 정보를 검색하여 표준 정보를 반환합니다.

응답은 반드시 다음 JSON 스키마를 따르세요 (마크다운 없이 순수 JSON만):
{
  "englishName": "표준 영문 상업명",
  "koreanName": "한국에서 통용되는 명칭 (있으면)",
  "category": "marble | granite | quartzite | limestone | travertine | onyx | slate | sandstone | engineered_quartz | ceramic | other",
  "origin": "주요 산지",
  "description": "이 석재의 핵심 특징 한 문단 (2~3문장, 한국어)",
  "characteristics": ["주요 색상", "패턴/무늬", "경도/내구성", "특이점"],
  "globalPriceUsd": { "min": 30, "max": 150, "unit": "USD/m²" },
  "applications": ["floor", "wall_indoor", "wall_exterior", "countertop", "wet_area"]
}

규칙:
- googleSearch를 활용해 최신 정보(시세 / 유통사 / 위키피디아) 확인
- 한국어로 입력되면 영문 상업명을 반드시 영문으로 반환
- 모르면 빈 문자열/배열로 두고, 추정이면 그렇게 명시
- 응답은 반드시 유효한 JSON 객체`;

export async function searchStoneWithGemini(
  query: string,
  apiKey: string
): Promise<StoneSearchResult> {
  if (!apiKey) throw new Error("Gemini API 키가 설정되지 않았습니다.");
  if (!query.trim()) throw new Error("검색어를 입력하세요.");

  const response = await fetch(
    `${GEMINI_API_BASE}/${SEARCH_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SEARCH_PROMPT }] },
        contents: [
          {
            role: "user",
            parts: [{ text: `검색어: ${query}` }],
          },
        ],
        tools: [{ googleSearch: {} }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini 검색 오류 (${response.status}): ${errText.slice(0, 300)}`);
  }

  const json = await response.json();
  const candidate = json?.candidates?.[0];
  const rawText: string | undefined = candidate?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Gemini 응답에서 텍스트를 찾을 수 없습니다.");

  // Extract JSON
  const cleaned = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  const slice = firstBrace >= 0 && lastBrace > firstBrace ? cleaned.slice(firstBrace, lastBrace + 1) : cleaned;

  let parsed: Partial<StoneSearchResult> = {};
  try {
    parsed = JSON.parse(slice);
  } catch {
    parsed = { description: rawText.slice(0, 500) };
  }

  // Pull source URIs from grounding metadata
  const groundingChunks =
    candidate?.groundingMetadata?.groundingChunks ?? candidate?.grounding_metadata?.grounding_chunks ?? [];
  const sources: SearchSource[] = [];
  for (const chunk of groundingChunks) {
    const web = chunk.web ?? chunk.Web;
    if (web?.uri) sources.push({ title: web.title, uri: web.uri });
  }

  return {
    query,
    englishName: parsed.englishName,
    koreanName: parsed.koreanName,
    category: parsed.category,
    origin: parsed.origin,
    description: parsed.description ?? "",
    characteristics: parsed.characteristics,
    globalPriceUsd: parsed.globalPriceUsd,
    applications: parsed.applications,
    similarCatalogProducts: parsed.similarCatalogProducts,
    sources,
    rawText,
  };
}

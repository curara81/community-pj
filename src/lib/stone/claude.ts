import { STONE_ANALYSIS_PROMPT, buildUserPrompt } from "./prompts";
import { loadCatalog } from "./catalog";
import type { StoneAnalysis } from "./types";

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-opus-4-7";

function dataUrlToBase64(dataUrl: string): { mediaType: string; data: string } {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) throw new Error("올바른 이미지 형식이 아닙니다.");
  return { mediaType: match[1], data: match[2] };
}

export async function analyzeWithClaude(
  imageDataUrl: string,
  apiKey: string,
  userNote?: string
): Promise<StoneAnalysis> {
  if (!apiKey) throw new Error("Claude API 키가 설정되지 않았습니다.");
  const { mediaType, data } = dataUrlToBase64(imageDataUrl);
  const catalog = await loadCatalog();

  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      system: STONE_ANALYSIS_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data },
            },
            { type: "text", text: buildUserPrompt(userNote, catalog) },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Claude API 오류 (${response.status}): ${errText.slice(0, 300)}`);
  }

  const json = await response.json();
  const text = json?.content?.[0]?.text;
  if (!text) throw new Error("Claude 응답에서 텍스트를 찾을 수 없습니다.");
  return parseAnalysisJson(text);
}

export function parseAnalysisJson(text: string): StoneAnalysis {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(cleaned) as StoneAnalysis;
  } catch (e) {
    throw new Error(`AI 응답을 JSON으로 파싱할 수 없습니다: ${text.slice(0, 200)}`);
  }
}

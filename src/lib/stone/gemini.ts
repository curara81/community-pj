import { STONE_ANALYSIS_PROMPT, buildUserPrompt } from "./prompts";
import { parseAnalysisJson } from "./claude";
import type { StoneAnalysis } from "./types";

const MODEL = "gemini-2.0-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function dataUrlParts(dataUrl: string): { mimeType: string; data: string } {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) throw new Error("올바른 이미지 형식이 아닙니다.");
  return { mimeType: match[1], data: match[2] };
}

export async function analyzeWithGemini(
  imageDataUrl: string,
  apiKey: string,
  userNote?: string
): Promise<StoneAnalysis> {
  if (!apiKey) throw new Error("Gemini API 키가 설정되지 않았습니다.");
  const { mimeType, data } = dataUrlParts(imageDataUrl);

  const response = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: STONE_ANALYSIS_PROMPT }] },
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data } },
            { text: buildUserPrompt(userNote) },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API 오류 (${response.status}): ${errText.slice(0, 300)}`);
  }

  const json = await response.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini 응답에서 텍스트를 찾을 수 없습니다.");
  return parseAnalysisJson(text);
}

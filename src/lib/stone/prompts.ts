import type { Catalog } from "./types";
import { compactCatalogText } from "./catalog";

export const STONE_ANALYSIS_PROMPT = `당신은 천연석재(대리석, 화강석, 라임스톤, 트래버틴, 오닉스, 슬레이트, 사암, 쿼츠, 인조석, 세라믹타일 등)를 식별하는 전문가이자, 빅슬랩 인테리어 자재 매칭 전문가입니다.

업로드된 이미지를 분석하여 석재 정보를 JSON으로만 응답하세요. 설명이나 마크다운 코드블록 없이 순수 JSON만 출력하세요.

다음 스키마를 정확히 따르세요:
{
  "name": "영문 상업명 (예: Carrara White, Absolute Black Granite)",
  "nameKo": "한국에서 통용되는 명칭 (있으면)",
  "category": "marble | granite | quartzite | limestone | travertine | onyx | slate | sandstone | engineered_quartz | ceramic | other",
  "origin": "주요 산지 (국가/지역, 예: 이탈리아 카라라, 인도 카르나타카)",
  "description": "이 석재의 핵심 특징 한 문단 (2~3문장, 한국어)",
  "characteristics": ["주요 색상", "패턴/무늬 특징", "용도", "경도/내구성"],
  "globalPriceUsd": {
    "min": 30,
    "max": 150,
    "unit": "USD/m² 또는 USD/sqft (FOB 기준 추정)"
  },
  "koreanDistributors": [
    { "name": "유통사명", "note": "취급 정보 또는 지역 (간단히)" }
  ],
  "alternativeCandidates": [
    {
      "name": "2순위 후보의 영문 상업명",
      "nameKo": "한국 통용명 (있으면)",
      "category": "marble | granite | ...",
      "origin": "산지",
      "reason": "왜 이 후보일 수 있는지 (사진에서 보이는 시각적 단서, 한국어 1~2문장)",
      "confidence": "1순위와 비교한 가능성 (예: 가능성 30% 정도, 약간 낮음)"
    }
  ],
  "recommendations": {
    "similar": [
      {
        "productName": "카탈로그에 있는 정확한 제품명 (대문자 그대로)",
        "matchType": "similar",
        "reason": "왜 이 제품이 비슷한지 (한국어, 1~2문장)",
        "finish": "추천 마감 (카탈로그의 finishes 중 하나)",
        "application": "벽 / 바닥 / 카운터탑 등"
      }
    ],
    "complementary": [
      {
        "productName": "카탈로그에 있는 정확한 제품명",
        "matchType": "complementary",
        "reason": "왜 이 제품이 어울리는지 (보색/대비/조화 관점, 한국어)",
        "finish": "추천 마감",
        "application": "함께 쓸 수 있는 위치 (예: 사용자 돌이 바닥이면 어울리는 벽재)"
      }
    ],
  },
  "confidence": "high | medium | low"
}

규칙:
- 가격은 해외 도매(FOB) 기준 일반적인 시세 추정. 정확한 실시간 시세는 알 수 없음을 인지하고 합리적 범위로.
- 한국 유통사는 잘 알려진 업체(예: 동화석재, 보광석재, 삼성석재, 대일석재, 네오스톤 등) 중 해당 석재를 취급할 가능성이 있는 곳. 확실하지 않으면 "국내 주요 석재 유통사 문의 권장"을 note로.
- alternativeCandidates에는 항상 2개의 다른 후보를 반환하세요 (가능성 순으로 정렬, 즉 2순위와 3순위). 사진의 시각적 단서를 근거로 설명. 100% 확신해도 다른 가능성을 사용자가 비교할 수 있게 2개 채우세요. 단, 카테고리가 명백히 달라 비교 의미가 없는 경우(예: 인조 쿼츠 vs 천연 대리석) 1개만 또는 빈 배열 가능.
- 1순위 신뢰도가 낮을수록 alternativeCandidates의 reason을 더 상세히 작성.
- 인조석/세라믹/타일이면 그것대로 정확히 분류.
- recommendations:
  - similar: 사용자 사진의 돌과 가장 비슷한 룩(색상/톤/패턴) 카탈로그 제품 3개. 다양한 가격대/마감 옵션을 보여줄 수 있다면 이상적.
  - complementary: 사용자 돌과 함께 쓰기 좋은 보색/대비/조화 카탈로그 제품 2개. 예: 흰 대리석 바닥엔 어두운 마블 벽재, 차가운 톤엔 따뜻한 톤.
  - productName은 반드시 제공된 카탈로그에 있는 정확한 이름(대문자)만 사용.
  - 카탈로그가 비어있거나 적합한 매칭이 없으면 빈 배열로.
- 응답은 반드시 유효한 JSON 객체.`;

export function buildUserPrompt(userNote?: string, catalog?: Catalog | null): string {
  const lines: string[] = ["이 석재를 분석하고, 아래 NUOVOCORSO 카탈로그에서 어울리는 빅슬랩을 추천해주세요."];
  if (userNote && userNote.trim()) {
    lines.push(`사용자 메모: ${userNote.trim()}`);
  }
  if (catalog && catalog.items.length > 0) {
    lines.push("");
    lines.push("=== CATALOG (NUOVOCORSO Big Slab Porcelain) ===");
    lines.push(compactCatalogText(catalog));
    lines.push("=== END OF CATALOG ===");
    lines.push("");
    lines.push(
      "위 카탈로그에서 productName을 정확히 매칭해서 recommendations.similar 3개, recommendations.complementary 2개를 채워주세요."
    );
  } else {
    lines.push("(카탈로그를 불러올 수 없어 recommendations는 빈 배열로 두세요.)");
  }
  return lines.join("\n");
}

export type ApiProvider = "claude-sonnet" | "claude-haiku" | "claude" | "gemini";

export interface CatalogRecommendation {
  productName: string;
  matchType: "similar" | "complementary";
  reason: string;
  finish?: string;
  application?: string;
}

export type UsageLevel = "good" | "ok" | "avoid";

export interface UsageGuidance {
  /** 실내 바닥 */
  floorIndoor?: UsageLevel;
  /** 실외 바닥 (테라스, 보도) */
  floorOutdoor?: UsageLevel;
  /** 실내 벽 */
  wallIndoor?: UsageLevel;
  /** 외장 (외벽 / 외부 마감) */
  exterior?: UsageLevel;
  /** 카운터탑 / 주방 상판 */
  countertop?: UsageLevel;
  /** 욕실 / 습한 공간 */
  wetArea?: UsageLevel;
  /** 추가 주의사항 (얼룩, 산성 약함, 미끄럼 주의 등) */
  notes?: string;
}

export interface StoneAnalysis {
  name: string;
  nameKo?: string;
  category: string;
  origin: string;
  description: string;
  characteristics: string[];
  globalPriceUsd?: {
    min: number;
    max: number;
    unit: string;
  };
  koreanDistributors: Array<{
    name: string;
    note?: string;
  }>;
  alternativeCandidates?: Array<{
    name: string;
    nameKo?: string;
    category?: string;
    origin?: string;
    reason?: string;
    confidence: string;
  }>;
  recommendations?: {
    similar: CatalogRecommendation[];
    complementary: CatalogRecommendation[];
  };
  usage?: UsageGuidance;
  confidence: "high" | "medium" | "low";
}

export interface CatalogItem {
  name: string;
  lookCategory: string;
  tone: string;
  colorTags: string[];
  thicknesses: string[];
  finishes: string[];
  section: string;
}

export interface Catalog {
  schemaVersion: number;
  vendor: string;
  year: number;
  material: string;
  sizes: string[];
  totalItems: number;
  items: CatalogItem[];
}

export interface StoneRecord {
  id: string;
  createdAt: string;
  provider: ApiProvider;
  imageDataUrl?: string;
  driveFileId?: string;
  driveFileLink?: string;
  driveMetadataId?: string;
  analysis: StoneAnalysis;
  userNote?: string;
  /** User has confirmed the primary identification is correct. */
  confirmed?: boolean;
  /** Manual edits applied by the user (subset of analysis fields). */
  edited?: boolean;
}

export interface ApiKeys {
  claude?: string;
  gemini?: string;
  naverClientId?: string;
  naverClientSecret?: string;
  googleClientId?: string;
}

export interface DriveAuth {
  accessToken: string;
  expiresAt: number;
  folderId?: string;
}

export type ApiProvider = "claude" | "gemini";

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
    confidence: string;
  }>;
  confidence: "high" | "medium" | "low";
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

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search as SearchIcon,
  Loader2,
  ExternalLink,
  MapPin,
  DollarSign,
  ImageOff,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { searchStoneWithGemini } from "@/lib/stone/gemini";
import type { StoneSearchResult } from "@/lib/stone/gemini";
import { loadApiKeys } from "@/lib/stone/storage";
import { loadCatalog } from "@/lib/stone/catalog";
import { loadBundledImageIndex, safeProductKey } from "@/lib/stone/catalogImages";
import type { Catalog } from "@/lib/stone/types";

interface WikiResult {
  imageUrl?: string;
  extract?: string;
  pageUrl?: string;
}

async function fetchWikipediaImage(stoneName: string): Promise<WikiResult | null> {
  const tries = [
    stoneName,
    `${stoneName} marble`,
    `${stoneName} stone`,
    `${stoneName} (rock)`,
  ];
  for (const candidate of tries) {
    try {
      const enc = encodeURIComponent(candidate.replace(/ /g, "_"));
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${enc}`,
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      if (data.type === "disambiguation") continue;
      if (data.thumbnail?.source) {
        return {
          imageUrl: data.originalimage?.source ?? data.thumbnail.source,
          extract: data.extract,
          pageUrl: data.content_urls?.desktop?.page,
        };
      }
    } catch {
      // try next
    }
  }
  return null;
}

const CATEGORY_LABEL: Record<string, string> = {
  marble: "대리석",
  granite: "화강석",
  quartzite: "쿼츠사이트",
  limestone: "라임스톤",
  travertine: "트래버틴",
  onyx: "오닉스",
  slate: "슬레이트",
  sandstone: "사암",
  engineered_quartz: "인조 쿼츠",
  ceramic: "세라믹",
  other: "기타",
};

const APPLICATION_LABEL: Record<string, string> = {
  floor: "바닥",
  floor_indoor: "실내 바닥",
  floor_outdoor: "실외 바닥",
  wall: "벽",
  wall_indoor: "실내 벽",
  wall_exterior: "외벽",
  exterior: "외부",
  countertop: "카운터탑",
  wet_area: "욕실/주방",
};

const SearchPanel = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StoneSearchResult | null>(null);
  const [wikiImage, setWikiImage] = useState<WikiResult | null>(null);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [bundledIndex, setBundledIndex] = useState<Record<string, string>>({});

  useEffect(() => {
    void loadCatalog().then((c) => c && setCatalog(c));
    void loadBundledImageIndex().then(setBundledIndex);
  }, []);

  const runSearch = async () => {
    const q = query.trim();
    if (!q) return;
    const keys = loadApiKeys();
    if (!keys.gemini) {
      toast.error("Gemini API 키가 필요합니다.", {
        description: "설정 → AI 분석 → Gemini API Key",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    setWikiImage(null);
    try {
      const r = await searchStoneWithGemini(q, keys.gemini);
      setResult(r);
      // also try wikipedia for inline image
      const englishName = r.englishName || q;
      const wiki = await fetchWikipediaImage(englishName);
      setWikiImage(wiki);
    } catch (e) {
      toast.error("검색 실패", {
        description: e instanceof Error ? e.message : "",
      });
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") runSearch();
  };

  const matchingCatalog = result && catalog
    ? catalog.items.filter((it) => {
        const target = `${result.englishName ?? ""} ${result.koreanName ?? ""}`.toUpperCase();
        return target.includes(it.name.toUpperCase()) || it.name.toUpperCase().includes(target.trim() || "___NEVER___");
      }).slice(0, 6)
    : [];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="예: Carrara, 카라라, 이탈리아 카라라..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="pl-9 h-11"
          />
        </div>
        <Button
          onClick={runSearch}
          disabled={loading || !query.trim()}
          className="h-11 stone-cta border-0 px-4"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "검색"
          )}
        </Button>
      </div>

      <p className="text-[11px] text-muted-foreground px-1">
        한글/영어/산지명 어떤 형태로 입력해도 됩니다. Google Search 그라운딩으로 최신 정보를 찾습니다.
      </p>

      {!result && !loading && (
        <Card className="stone-card border-0 p-8 text-center text-muted-foreground">
          <SearchIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm">석재명이나 산지를 입력하고 검색하세요</p>
          <p className="text-xs mt-1 opacity-70">예) Calacatta, 화이트 카라라, 인도 카르나타카</p>
        </Card>
      )}

      {loading && (
        <Card className="stone-card border-0 p-6 flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">검색 중...</span>
        </Card>
      )}

      {result && (
        <Card className="stone-card overflow-hidden border-0">
          {wikiImage?.imageUrl && (
            <div className="bg-muted">
              <img
                src={wikiImage.imageUrl}
                alt={result.englishName || query}
                className="w-full max-h-72 object-contain"
              />
            </div>
          )}
          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {result.category && (
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                    {CATEGORY_LABEL[result.category] ?? result.category}
                  </Badge>
                )}
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900">
                  Gemini · 웹 검색
                </Badge>
              </div>
              <h3 className="text-xl font-bold leading-tight break-words">
                {result.englishName || query}
              </h3>
              {result.koreanName && result.koreanName !== result.englishName && (
                <p className="text-sm text-muted-foreground">{result.koreanName}</p>
              )}
            </div>

            {result.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.description}
              </p>
            )}

            {result.origin && (
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-[11px] text-muted-foreground">산지</p>
                  <p className="text-sm font-medium">{result.origin}</p>
                </div>
              </div>
            )}

            {result.globalPriceUsd && (
              <div className="flex items-start gap-2.5">
                <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-[11px] text-muted-foreground">해외 시세</p>
                  <p className="text-sm font-medium">
                    ${result.globalPriceUsd.min} ~ ${result.globalPriceUsd.max}{" "}
                    <span className="text-muted-foreground font-normal">{result.globalPriceUsd.unit}</span>
                  </p>
                </div>
              </div>
            )}

            {result.characteristics && result.characteristics.length > 0 && (
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">특징</p>
                <div className="flex flex-wrap gap-1">
                  {result.characteristics.map((c, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {result.applications && result.applications.length > 0 && (
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">주요 용도</p>
                <div className="flex flex-wrap gap-1">
                  {result.applications.map((a, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {APPLICATION_LABEL[a] ?? a}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {matchingCatalog.length > 0 && (
              <div className="space-y-2 pt-2 border-t">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground stone-section-title">
                  카탈로그 매칭
                </p>
                <ul className="space-y-1.5">
                  {matchingCatalog.map((it) => {
                    const thumb = bundledIndex[safeProductKey(it.name)];
                    return (
                      <li key={it.name} className="flex items-center gap-2.5">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={it.name}
                            className="w-12 h-12 rounded-md object-cover border"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
                            <ImageOff className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{it.name}</p>
                          <p className="text-[11px] text-muted-foreground">{it.lookCategory}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {result.sources.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t">
                <p className="text-[11px] text-muted-foreground">출처 ({result.sources.length})</p>
                <div className="space-y-1">
                  {result.sources.slice(0, 5).map((s, i) => (
                    <a
                      key={i}
                      href={s.uri}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      <span className="truncate">{s.title || s.uri}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {wikiImage?.pageUrl && (
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={wikiImage.pageUrl} target="_blank" rel="noreferrer">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  위키피디아에서 자세히 보기
                </a>
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchPanel;

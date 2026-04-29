import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  AlertCircle,
  MapPin,
  DollarSign,
  Building2,
  Sparkles,
  Layers,
  Shuffle,
  Image as ImageIcon,
} from "lucide-react";
import { loadCatalog } from "@/lib/stone/catalog";
import type { Catalog, CatalogRecommendation, StoneAnalysis } from "@/lib/stone/types";
import StoneImageDialog from "./StoneImageDialog";
import CatalogImageThumb from "./CatalogImageThumb";

interface ResultCardProps {
  analysis: StoneAnalysis;
}

const confidenceLabel: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
  high: { text: "높음", color: "bg-emerald-100 text-emerald-700 border-emerald-300", icon: <CheckCircle2 className="w-3 h-3" /> },
  medium: { text: "보통", color: "bg-amber-100 text-amber-700 border-amber-300", icon: <AlertCircle className="w-3 h-3" /> },
  low: { text: "낮음", color: "bg-rose-100 text-rose-700 border-rose-300", icon: <AlertCircle className="w-3 h-3" /> },
};

const categoryLabel: Record<string, string> = {
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
  // catalog look categories
  "marble-look": "마블 룩",
  "stone-look": "스톤 룩",
  "travertine-look": "트래버틴 룩",
  "cement-look": "시멘트 룩",
  "wood-look": "우드 룩",
  "onyx-look": "오닉스 룩",
};

const categoryColor: Record<string, string> = {
  marble: "bg-blue-100 text-blue-800 border-blue-300",
  granite: "bg-stone-200 text-stone-800 border-stone-400",
  quartzite: "bg-violet-100 text-violet-800 border-violet-300",
  limestone: "bg-amber-100 text-amber-800 border-amber-300",
  travertine: "bg-orange-100 text-orange-800 border-orange-300",
  onyx: "bg-emerald-100 text-emerald-800 border-emerald-300",
  slate: "bg-slate-200 text-slate-800 border-slate-400",
  sandstone: "bg-yellow-100 text-yellow-800 border-yellow-300",
  engineered_quartz: "bg-teal-100 text-teal-800 border-teal-300",
  ceramic: "bg-sky-100 text-sky-800 border-sky-300",
  other: "bg-gray-100 text-gray-800 border-gray-300",
  "marble-look": "bg-blue-100 text-blue-800 border-blue-300",
  "stone-look": "bg-stone-200 text-stone-800 border-stone-400",
  "travertine-look": "bg-orange-100 text-orange-800 border-orange-300",
  "cement-look": "bg-slate-200 text-slate-800 border-slate-400",
  "wood-look": "bg-amber-200 text-amber-900 border-amber-400",
  "onyx-look": "bg-emerald-100 text-emerald-800 border-emerald-300",
};

function CategoryChip({
  category,
  size = "md",
}: {
  category?: string;
  size?: "sm" | "md";
}) {
  if (!category) return null;
  const label = categoryLabel[category] || category;
  const color = categoryColor[category] || "bg-gray-100 text-gray-800 border-gray-300";
  const sizing = size === "sm" ? "text-[10px] py-0 px-1.5" : "text-xs px-2 py-0.5";
  return (
    <Badge variant="outline" className={`${color} ${sizing} font-medium`}>
      {label}
    </Badge>
  );
}

const RecommendationGroup = ({
  icon,
  title,
  items,
  accentClass,
  lookupLookCategory,
}: {
  icon: React.ReactNode;
  title: string;
  items: CatalogRecommendation[];
  accentClass: string;
  lookupLookCategory: (productName: string) => string | undefined;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-sm font-medium">{title}</p>
      <span className="text-xs text-muted-foreground">({items.length})</span>
    </div>
    <ul className="space-y-2">
      {items.map((r, i) => {
        const lookCat = lookupLookCategory(r.productName);
        return (
          <li
            key={i}
            className={`pl-3 border-l-2 ${accentClass} flex gap-3`}
          >
            <CatalogImageThumb productName={r.productName} size="sm" />
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-sm font-semibold break-words">{r.productName}</p>
                <CategoryChip category={lookCat} size="sm" />
              </div>
              {r.reason && (
                <p className="text-xs text-muted-foreground leading-relaxed">{r.reason}</p>
              )}
              {(r.finish || r.application) && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {r.finish && (
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                      {r.finish}
                    </Badge>
                  )}
                  {r.application && (
                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5">
                      {r.application}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

const ResultCard = ({ analysis }: ResultCardProps) => {
  const conf = confidenceLabel[analysis.confidence] || confidenceLabel.medium;
  const [imageQuery, setImageQuery] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<Catalog | null>(null);

  useEffect(() => {
    void loadCatalog().then(setCatalog);
  }, []);

  const lookupLookCategory = (productName: string): string | undefined => {
    if (!catalog) return undefined;
    const item = catalog.items.find(
      (it) => it.name.toUpperCase() === productName.toUpperCase()
    );
    return item?.lookCategory;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default" className="text-[10px] py-0 px-1.5 bg-primary">
                1순위
              </Badge>
              <CategoryChip category={analysis.category} />
              <Badge
                variant="outline"
                className={`${conf.color} flex items-center gap-1`}
              >
                {conf.icon}
                <span className="text-xs">신뢰도 {conf.text}</span>
              </Badge>
            </div>
            <h3 className="text-xl font-bold leading-tight break-words">{analysis.name}</h3>
            {analysis.nameKo && analysis.nameKo !== analysis.name && (
              <p className="text-sm text-muted-foreground">{analysis.nameKo}</p>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setImageQuery(analysis.name)}
            className="shrink-0"
          >
            <ImageIcon className="w-3.5 h-3.5 mr-1" />
            이미지
          </Button>
        </div>
        {analysis.characteristics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {analysis.characteristics.slice(0, 4).map((c, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {c}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {analysis.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{analysis.description}</p>
        )}

        <Separator />

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">산지</p>
              <p className="text-sm font-medium">{analysis.origin || "정보 없음"}</p>
            </div>
          </div>

          {analysis.globalPriceUsd && (
            <div className="flex items-start gap-3">
              <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">해외 시세 추정</p>
                <p className="text-sm font-medium">
                  ${analysis.globalPriceUsd.min} ~ ${analysis.globalPriceUsd.max}{" "}
                  <span className="text-muted-foreground font-normal">
                    {analysis.globalPriceUsd.unit}
                  </span>
                </p>
              </div>
            </div>
          )}

          {analysis.koreanDistributors?.length > 0 && (
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="text-xs text-muted-foreground mb-0.5">국내 유통사 (참고)</p>
                <ul className="space-y-1">
                  {analysis.koreanDistributors.map((d, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-medium">{d.name}</span>
                      {d.note && <span className="text-muted-foreground"> · {d.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {analysis.alternativeCandidates && analysis.alternativeCandidates.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">다른 가능성 (2~3순위)</p>
              </div>
              <ul className="space-y-3">
                {analysis.alternativeCandidates.slice(0, 2).map((c, i) => (
                  <li
                    key={i}
                    className="rounded-lg border bg-muted/30 p-3 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="secondary" className="text-[10px] py-0 px-1.5">
                            {i + 2}순위
                          </Badge>
                          <CategoryChip category={c.category} size="sm" />
                        </div>
                        <p className="text-sm font-semibold break-words">{c.name}</p>
                        {c.nameKo && c.nameKo !== c.name && (
                          <p className="text-xs text-muted-foreground">{c.nameKo}</p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setImageQuery(c.name)}
                        className="shrink-0 h-7 px-2"
                      >
                        <ImageIcon className="w-3.5 h-3.5 mr-1" />
                        이미지
                      </Button>
                    </div>
                    {c.origin && (
                      <p className="text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {c.origin}
                      </p>
                    )}
                    {c.reason && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {c.reason}
                      </p>
                    )}
                    {c.confidence && (
                      <p className="text-[11px] text-muted-foreground/70 italic">
                        {c.confidence}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {analysis.recommendations && (
          (analysis.recommendations.similar?.length > 0 ||
            analysis.recommendations.complementary?.length > 0) && (
            <>
              <Separator />
              <div className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  NUOVOCORSO 빅슬랩 추천
                </p>

                {analysis.recommendations.similar?.length > 0 && (
                  <RecommendationGroup
                    icon={<Layers className="w-4 h-4 text-emerald-600" />}
                    title="비슷한 룩"
                    items={analysis.recommendations.similar}
                    accentClass="border-l-emerald-400"
                    lookupLookCategory={lookupLookCategory}
                  />
                )}

                {analysis.recommendations.complementary?.length > 0 && (
                  <RecommendationGroup
                    icon={<Shuffle className="w-4 h-4 text-indigo-600" />}
                    title="어울리는 조합 (보색/대비)"
                    items={analysis.recommendations.complementary}
                    accentClass="border-l-indigo-400"
                    lookupLookCategory={lookupLookCategory}
                  />
                )}
              </div>
            </>
          )
        )}

        <p className="text-xs text-muted-foreground/70 pt-2 border-t">
          * 시세와 유통사 정보는 AI 추정이며 실제 거래가/취급 여부와 다를 수 있습니다.
        </p>
      </CardContent>

      <StoneImageDialog
        stoneName={imageQuery}
        open={imageQuery !== null}
        onOpenChange={(open) => !open && setImageQuery(null)}
      />
    </Card>
  );
};

export default ResultCard;

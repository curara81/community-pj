import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertCircle, MapPin, DollarSign, Building2, Sparkles, Layers, Shuffle } from "lucide-react";
import type { CatalogRecommendation, StoneAnalysis } from "@/lib/stone/types";

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
};

const RecommendationGroup = ({
  icon,
  title,
  items,
  accentClass,
}: {
  icon: React.ReactNode;
  title: string;
  items: CatalogRecommendation[];
  accentClass: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-sm font-medium">{title}</p>
      <span className="text-xs text-muted-foreground">({items.length})</span>
    </div>
    <ul className="space-y-2">
      {items.map((r, i) => (
        <li
          key={i}
          className={`pl-3 border-l-2 ${accentClass} space-y-0.5`}
        >
          <p className="text-sm font-semibold">{r.productName}</p>
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
        </li>
      ))}
    </ul>
  </div>
);

const ResultCard = ({ analysis }: ResultCardProps) => {
  const conf = confidenceLabel[analysis.confidence] || confidenceLabel.medium;
  const cat = categoryLabel[analysis.category] || analysis.category;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-xl font-bold leading-tight break-words">{analysis.name}</h3>
            {analysis.nameKo && analysis.nameKo !== analysis.name && (
              <p className="text-sm text-muted-foreground">{analysis.nameKo}</p>
            )}
          </div>
          <Badge variant="outline" className={`${conf.color} flex items-center gap-1 shrink-0`}>
            {conf.icon}
            <span className="text-xs">신뢰도 {conf.text}</span>
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{cat}</Badge>
          {analysis.characteristics?.slice(0, 4).map((c, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {c}
            </Badge>
          ))}
        </div>
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
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">유사 후보</p>
              </div>
              <ul className="space-y-1">
                {analysis.alternativeCandidates.map((c, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium">{c.name}</span>
                    {c.confidence && (
                      <span className="text-muted-foreground"> · {c.confidence}</span>
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
                  />
                )}

                {analysis.recommendations.complementary?.length > 0 && (
                  <RecommendationGroup
                    icon={<Shuffle className="w-4 h-4 text-indigo-600" />}
                    title="어울리는 조합 (보색/대비)"
                    items={analysis.recommendations.complementary}
                    accentClass="border-l-indigo-400"
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
    </Card>
  );
};

export default ResultCard;

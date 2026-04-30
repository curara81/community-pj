import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  ExternalLink,
  Clock,
  Cloud,
  Search,
  X,
  Filter,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import type { StoneRecord } from "@/lib/stone/types";
import ResultCard from "./ResultCard";
import EditRecordDialog from "./EditRecordDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HistoryListProps {
  records: StoneRecord[];
  onDelete: (id: string) => void;
  onUpdate?: (record: StoneRecord) => void;
}

function providerLabel(p: StoneRecord["provider"]): string {
  switch (p) {
    case "claude-sonnet":
      return "Sonnet";
    case "claude-haiku":
      return "Haiku";
    case "claude":
      return "Claude";
    case "gemini":
      return "Gemini";
    default:
      return p;
  }
}

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "marble", label: "대리석" },
  { value: "granite", label: "화강석" },
  { value: "quartzite", label: "쿼츠사이트" },
  { value: "limestone", label: "라임스톤" },
  { value: "travertine", label: "트래버틴" },
  { value: "onyx", label: "오닉스" },
  { value: "slate", label: "슬레이트" },
  { value: "sandstone", label: "사암" },
  { value: "engineered_quartz", label: "인조 쿼츠" },
  { value: "ceramic", label: "세라믹" },
  { value: "other", label: "기타" },
];

const CONFIDENCE_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "high", label: "높음" },
  { value: "medium", label: "보통" },
  { value: "low", label: "낮음" },
];

const HistoryList = ({ records, onDelete, onUpdate }: HistoryListProps) => {
  const [selected, setSelected] = useState<StoneRecord | null>(null);
  const [editing, setEditing] = useState<StoneRecord | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [confidenceFilter, setConfidenceFilter] = useState<string>("all");
  const [confirmedOnly, setConfirmedOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((r) => {
      if (q) {
        const haystack = [
          r.analysis.name,
          r.analysis.nameKo,
          r.analysis.origin,
          r.analysis.description,
          r.userNote,
          ...(r.analysis.characteristics ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (categoryFilter !== "all" && r.analysis.category !== categoryFilter) {
        return false;
      }
      if (confidenceFilter !== "all" && r.analysis.confidence !== confidenceFilter) {
        return false;
      }
      if (confirmedOnly && !r.confirmed) {
        return false;
      }
      return true;
    });
  }, [records, search, categoryFilter, confidenceFilter, confirmedOnly]);

  const activeFilterCount =
    (categoryFilter !== "all" ? 1 : 0) +
    (confidenceFilter !== "all" ? 1 : 0) +
    (confirmedOnly ? 1 : 0);

  const clearAll = () => {
    setSearch("");
    setCategoryFilter("all");
    setConfidenceFilter("all");
    setConfirmedOnly(false);
  };

  const toggleConfirmed = (rec: StoneRecord) => {
    if (!onUpdate) return;
    onUpdate({ ...rec, confirmed: !rec.confirmed });
    setSelected({ ...rec, confirmed: !rec.confirmed });
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p className="text-sm">아직 분석 기록이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="이름 / 산지 / 메모 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-8 h-9"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="지우기"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          size="sm"
          variant={activeFilterCount > 0 ? "default" : "outline"}
          onClick={() => setFiltersOpen((v) => !v)}
          className="h-9"
        >
          <Filter className="w-4 h-4 mr-1" />
          필터
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1.5 px-1 text-[10px]">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {filtersOpen && (
        <Card className="p-3 space-y-3 bg-muted/30">
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">카테고리</p>
            <div className="flex flex-wrap gap-1">
              {CATEGORY_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setCategoryFilter(o.value)}
                  className={`text-[11px] px-2 py-1 rounded-full border transition ${
                    categoryFilter === o.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">신뢰도</p>
            <div className="flex flex-wrap gap-1">
              {CONFIDENCE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setConfidenceFilter(o.value)}
                  className={`text-[11px] px-2 py-1 rounded-full border transition ${
                    confidenceFilter === o.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={() => setConfirmedOnly((v) => !v)}
              className={`text-[11px] px-2 py-1 rounded-full border inline-flex items-center gap-1 ${
                confirmedOnly
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-background hover:bg-muted"
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              확인된 것만 보기
            </button>
          </div>
          {(activeFilterCount > 0 || search) && (
            <Button size="sm" variant="ghost" onClick={clearAll} className="w-full">
              모두 초기화
            </Button>
          )}
        </Card>
      )}

      <p className="text-[11px] text-muted-foreground">
        {filtered.length} / {records.length} 건
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((rec) => (
            <Card
              key={rec.id}
              className="stone-card overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent/40 hover:-translate-y-0.5 transition-all border-0"
              onClick={() => setSelected(rec)}
            >
              <div className="aspect-square bg-muted overflow-hidden">
                {rec.imageDataUrl ? (
                  <img
                    src={rec.imageDataUrl}
                    alt={rec.analysis.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-500 dark:text-slate-300">
                    <Cloud className="w-8 h-8 mb-1 opacity-60" />
                    <span className="text-[10px]">Drive에 저장됨</span>
                  </div>
                )}
              </div>
              <div className="p-2.5 space-y-1">
                <p className="text-xs font-medium truncate flex items-center gap-1" title={rec.analysis.name}>
                  {rec.confirmed && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  )}
                  <span className="truncate">{rec.analysis.name}</span>
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {providerLabel(rec.provider)}
                  </Badge>
                  {rec.driveFileLink && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      Drive
                    </Badge>
                  )}
                  {rec.edited && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      수정됨
                    </Badge>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {new Date(rec.createdAt).toLocaleString("ko-KR", {
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>분석 기록</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              {selected.imageDataUrl ? (
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={selected.imageDataUrl}
                    alt={selected.analysis.name}
                    className="w-full max-h-72 object-contain bg-muted"
                  />
                </div>
              ) : (
                selected.driveFileLink && (
                  <div className="rounded-lg border p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-center text-slate-600 dark:text-slate-300">
                    <Cloud className="w-10 h-10 mx-auto mb-2 opacity-60" />
                    <p className="text-sm">사진은 Google Drive에 보관되어 있습니다.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      아래 "Drive에서 보기"로 원본 사진을 확인하세요.
                    </p>
                  </div>
                )
              )}
              <ResultCard analysis={selected.analysis} />
              <div className="flex flex-col gap-2 pt-2">
                {onUpdate && (
                  <Button
                    variant={selected.confirmed ? "default" : "outline"}
                    onClick={() => toggleConfirmed(selected)}
                    className={`w-full ${
                      selected.confirmed
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : ""
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {selected.confirmed ? "확인 완료 (해제)" : "이 답이 맞아요"}
                  </Button>
                )}
                {onUpdate && (
                  <Button
                    variant="outline"
                    onClick={() => setEditing(selected)}
                    className="w-full"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    수정
                  </Button>
                )}
                {selected.driveFileLink && (
                  <Button variant="outline" asChild className="w-full">
                    <a href={selected.driveFileLink} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Google Drive에서 보기
                    </a>
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete(selected.id);
                    setSelected(null);
                  }}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  기록 삭제
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <EditRecordDialog
        record={editing}
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        onSave={(updated) => {
          onUpdate?.(updated);
          setSelected(updated);
        }}
      />
    </div>
  );
};

export default HistoryList;

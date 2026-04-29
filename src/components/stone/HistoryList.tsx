import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ExternalLink, Clock, Cloud } from "lucide-react";
import type { StoneRecord } from "@/lib/stone/types";
import ResultCard from "./ResultCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HistoryListProps {
  records: StoneRecord[];
  onDelete: (id: string) => void;
}

const HistoryList = ({ records, onDelete }: HistoryListProps) => {
  const [selected, setSelected] = useState<StoneRecord | null>(null);

  if (records.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p className="text-sm">아직 분석 기록이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {records.map((rec) => (
          <Card
            key={rec.id}
            className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
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
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
                  <Cloud className="w-8 h-8 mb-1 opacity-60" />
                  <span className="text-[10px]">Drive에 저장됨</span>
                </div>
              )}
            </div>
            <div className="p-2.5 space-y-1">
              <p className="text-xs font-medium truncate" title={rec.analysis.name}>
                {rec.analysis.name}
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {rec.provider === "claude" ? "Claude" : "Gemini"}
                </Badge>
                {rec.driveFileLink && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    Drive
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
                  <div className="rounded-lg border p-6 bg-gradient-to-br from-slate-100 to-slate-200 text-center text-slate-600">
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
    </>
  );
};

export default HistoryList;

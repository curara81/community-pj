import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, ImageOff } from "lucide-react";

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
    `${stoneName} granite`,
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
      // type "disambiguation" or missing thumbnail → try next variant
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

function googleImagesUrl(stoneName: string): string {
  const q = `${stoneName} marble stone slab`;
  return `https://www.google.com/search?q=${encodeURIComponent(q)}&tbm=isch`;
}

interface Props {
  stoneName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StoneImageDialog = ({ stoneName, open, onOpenChange }: Props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WikiResult | null>(null);

  useEffect(() => {
    if (!open || !stoneName) return;
    let cancelled = false;
    setLoading(true);
    setResult(null);
    fetchWikipediaImage(stoneName)
      .then((r) => {
        if (!cancelled) setResult(r);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, stoneName]);

  if (!stoneName) return null;
  const gUrl = googleImagesUrl(stoneName);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="break-words">{stoneName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {loading && (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span className="text-sm">위키피디아에서 검색 중...</span>
            </div>
          )}

          {!loading && result?.imageUrl && (
            <>
              <div className="rounded-lg overflow-hidden border bg-muted">
                <img
                  src={result.imageUrl}
                  alt={stoneName}
                  className="w-full max-h-[420px] object-contain"
                />
              </div>
              {result.extract && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {result.extract.slice(0, 280)}
                  {result.extract.length > 280 && "..."}
                </p>
              )}
              {result.pageUrl && (
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={result.pageUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    위키피디아에서 자세히 보기
                  </a>
                </Button>
              )}
            </>
          )}

          {!loading && !result?.imageUrl && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ImageOff className="w-10 h-10 text-muted-foreground/60 mb-2" />
              <p className="text-sm text-muted-foreground">
                위키피디아에서 이미지를 찾지 못했습니다.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                구글 이미지에서 더 많은 사진을 확인하세요.
              </p>
            </div>
          )}

          <Button asChild className="w-full">
            <a href={gUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              구글 이미지에서 더 보기
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoneImageDialog;

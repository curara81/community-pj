import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, ImageOff } from "lucide-react";
import { customSearchImages } from "@/lib/stone/cloud";
import type { CustomSearchImageResult } from "@/lib/stone/cloud";
import { loadApiKeys } from "@/lib/stone/storage";

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
  const [wiki, setWiki] = useState<WikiResult | null>(null);
  const [cseResults, setCseResults] = useState<CustomSearchImageResult[] | null>(null);
  const [cseLoading, setCseLoading] = useState(false);

  useEffect(() => {
    if (!open || !stoneName) return;
    let cancelled = false;

    const keys = loadApiKeys();
    const useCustomSearch = !!(keys.googleCloudKey && keys.googleCseId);

    setLoading(true);
    setWiki(null);
    setCseResults(null);

    // Wikipedia for inline thumbnail/extract
    fetchWikipediaImage(stoneName)
      .then((r) => {
        if (!cancelled) setWiki(r);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Custom Search if keys available
    if (useCustomSearch) {
      setCseLoading(true);
      customSearchImages(stoneName, keys.googleCloudKey!, keys.googleCseId!, 8)
        .then((items) => {
          if (!cancelled) setCseResults(items);
        })
        .catch((e) => {
          console.warn("Custom Search 실패", e);
          if (!cancelled) setCseResults([]);
        })
        .finally(() => {
          if (!cancelled) setCseLoading(false);
        });
    }

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
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span className="text-sm">검색 중...</span>
            </div>
          )}

          {!loading && wiki?.imageUrl && (
            <>
              <div className="rounded-lg overflow-hidden border bg-muted">
                <img
                  src={wiki.imageUrl}
                  alt={stoneName}
                  className="w-full max-h-[360px] object-contain"
                />
              </div>
              {wiki.extract && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {wiki.extract.slice(0, 240)}
                  {wiki.extract.length > 240 && "..."}
                </p>
              )}
              {wiki.pageUrl && (
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={wiki.pageUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    위키피디아에서 자세히 보기
                  </a>
                </Button>
              )}
            </>
          )}

          {cseResults !== null && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] stone-section-title">
                  구글 이미지
                </p>
                {cseLoading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
              </div>
              {cseResults.length === 0 ? (
                <p className="text-xs text-muted-foreground py-3 text-center">
                  결과 없음
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {cseResults.map((r, i) => (
                    <a
                      key={i}
                      href={r.contextLink ?? r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="aspect-square rounded-md overflow-hidden bg-muted border hover:opacity-80"
                      title={r.title}
                    >
                      <img
                        src={r.thumbnailLink ?? r.link}
                        alt={r.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && !wiki?.imageUrl && cseResults === null && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <ImageOff className="w-10 h-10 text-muted-foreground/60 mb-2" />
              <p className="text-sm text-muted-foreground">
                위키피디아에서 이미지를 찾지 못했습니다.
              </p>
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                Cloud API Key + Custom Search Engine ID 등록 시 구글 이미지 검색이 켜집니다.
              </p>
            </div>
          )}

          <Button asChild className="w-full">
            <a href={gUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              구글 이미지 새 탭에서 더 보기
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoneImageDialog;

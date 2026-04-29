import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, ImagePlus, Search, X } from "lucide-react";
import { toast } from "sonner";
import { loadCatalog } from "@/lib/stone/catalog";
import {
  fetchCatalogImageBlobUrl,
  loadLocalImageMap,
  saveCatalogImageMapToDrive,
  saveLocalImageMap,
  uploadCatalogImage,
} from "@/lib/stone/catalogImages";
import { getValidAuth } from "@/lib/stone/drive";
import type { Catalog, CatalogItem } from "@/lib/stone/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CatalogImageManager = ({ open, onOpenChange }: Props) => {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [bulkProcessing, setBulkProcessing] = useState<{ done: number; total: number } | null>(null);
  const [thumbCache, setThumbCache] = useState<Record<string, string>>({});
  const bulkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    void loadCatalog().then((c) => c && setCatalog(c));
    setImageMap(loadLocalImageMap());
  }, [open]);

  useEffect(() => {
    if (!open || !catalog) return;
    const auth = getValidAuth();
    if (!auth) return;
    let cancelled = false;
    const fetched: Record<string, string> = {};
    (async () => {
      for (const [name, fileId] of Object.entries(imageMap)) {
        if (cancelled) return;
        if (thumbCache[name]) continue;
        const url = await fetchCatalogImageBlobUrl(auth, fileId);
        if (url) fetched[name] = url;
      }
      if (Object.keys(fetched).length && !cancelled) {
        setThumbCache((prev) => ({ ...prev, ...fetched }));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, catalog, imageMap, thumbCache]);

  const filtered = useMemo(() => {
    if (!catalog) return [] as CatalogItem[];
    const q = search.trim().toUpperCase();
    if (!q) return catalog.items;
    return catalog.items.filter(
      (it) =>
        it.name.toUpperCase().includes(q) ||
        it.lookCategory.toUpperCase().includes(q) ||
        it.colorTags.some((c) => c.toUpperCase().includes(q))
    );
  }, [catalog, search]);

  const total = catalog?.items.length ?? 0;
  const filledCount = Object.keys(imageMap).length;

  const uploadOne = async (productName: string, file: File) => {
    const auth = getValidAuth();
    if (!auth) {
      toast.error("Drive 연결이 필요합니다.");
      return;
    }
    const upper = productName.toUpperCase();
    const fileId = await uploadCatalogImage(auth, upper, file);
    const newMap = { ...loadLocalImageMap(), [upper]: fileId };
    saveLocalImageMap(newMap);
    setImageMap(newMap);
    try {
      await saveCatalogImageMapToDrive(auth, newMap);
    } catch (e) {
      console.warn("Drive 매핑 동기화 실패", e);
    }
    const url = await fetchCatalogImageBlobUrl(auth, fileId);
    if (url) setThumbCache((prev) => ({ ...prev, [upper]: url }));
  };

  const handleSingleUpload = async (
    productName: string,
    file: File | undefined
  ) => {
    if (!file) return;
    try {
      await uploadOne(productName, file);
      toast.success(`${productName.toUpperCase()} 업로드 완료`);
    } catch (e) {
      toast.error("업로드 실패", { description: e instanceof Error ? e.message : "" });
    }
  };

  const handleBulkUpload = async (files: FileList | null) => {
    if (!files || !catalog) return;
    const auth = getValidAuth();
    if (!auth) {
      toast.error("Drive 연결이 필요합니다.");
      return;
    }

    // Try to match each file to a product by stem (filename without extension).
    // Match: case-insensitive, allow underscores/spaces interchangeable.
    const normalize = (s: string) =>
      s
        .toUpperCase()
        .replace(/\.[a-z0-9]+$/i, "")
        .replace(/[_\s-]+/g, " ")
        .trim();

    const productByNorm = new Map<string, CatalogItem>();
    for (const it of catalog.items) {
      productByNorm.set(normalize(it.name), it);
    }

    const fileArr = Array.from(files);
    const matched: Array<{ file: File; product: CatalogItem }> = [];
    const unmatched: string[] = [];

    for (const f of fileArr) {
      const norm = normalize(f.name);
      const direct = productByNorm.get(norm);
      if (direct) {
        matched.push({ file: f, product: direct });
        continue;
      }
      // Try contains match
      const partial = catalog.items.find(
        (it) => norm.includes(normalize(it.name)) || normalize(it.name).includes(norm)
      );
      if (partial) {
        matched.push({ file: f, product: partial });
      } else {
        unmatched.push(f.name);
      }
    }

    if (matched.length === 0) {
      toast.error("매칭된 제품이 없습니다.", {
        description: "파일명을 제품명과 비슷하게 (예: CALACATTA_DORATO.jpg)",
      });
      return;
    }

    if (unmatched.length > 0) {
      toast.warning(`${unmatched.length}개 파일은 매칭 안 됨`, {
        description: unmatched.slice(0, 3).join(", "),
      });
    }

    setBulkProcessing({ done: 0, total: matched.length });
    let done = 0;
    for (const { file, product } of matched) {
      try {
        await uploadOne(product.name, file);
      } catch (e) {
        console.error(`Upload failed for ${product.name}`, e);
      }
      done += 1;
      setBulkProcessing({ done, total: matched.length });
    }
    setBulkProcessing(null);
    toast.success(`${done}/${matched.length}개 업로드 완료`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col gap-3 overflow-hidden">
        <DialogHeader>
          <DialogTitle>카탈로그 이미지 관리</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-muted-foreground">
            {filledCount} / {total} 등록됨
          </span>
          <input
            ref={bulkInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleBulkUpload(e.target.files);
              e.target.value = "";
            }}
          />
          <Button
            size="sm"
            onClick={() => bulkInputRef.current?.click()}
            disabled={!!bulkProcessing}
          >
            {bulkProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                {bulkProcessing.done}/{bulkProcessing.total}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-1" />
                일괄 업로드
              </>
            )}
          </Button>
          <span className="text-[11px] text-muted-foreground">
            파일명을 제품명과 같게 (예: CALACATTA_DORATO.jpg)
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="제품명 / 룩 / 색상 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
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

        <div className="flex-1 overflow-y-auto -mx-1 px-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filtered.map((item) => {
              const upper = item.name.toUpperCase();
              const thumb = thumbCache[upper];
              return (
                <CatalogImageRow
                  key={item.name}
                  item={item}
                  thumbUrl={thumb}
                  onSelectFile={(file) => handleSingleUpload(item.name, file)}
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CatalogImageRow = ({
  item,
  thumbUrl,
  onSelectFile,
}: {
  item: CatalogItem;
  thumbUrl?: string;
  onSelectFile: (file: File) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="border rounded-md p-2 space-y-1 bg-card">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) onSelectFile(f);
        }}
      />
      <button
        type="button"
        className="w-full aspect-square rounded bg-muted overflow-hidden flex items-center justify-center text-muted-foreground border border-dashed hover:bg-muted/70"
        onClick={() => inputRef.current?.click()}
      >
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImagePlus className="w-6 h-6" />
        )}
      </button>
      <p className="text-[11px] font-medium truncate" title={item.name}>
        {item.name}
      </p>
    </div>
  );
};

export default CatalogImageManager;

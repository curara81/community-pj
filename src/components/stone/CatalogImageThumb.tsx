import { useEffect, useRef, useState } from "react";
import { Loader2, ImagePlus, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  fetchCatalogImageBlobUrl,
  loadLocalImageMap,
  saveLocalImageMap,
  saveCatalogImageMapToDrive,
  uploadCatalogImage,
} from "@/lib/stone/catalogImages";
import { getValidAuth } from "@/lib/stone/drive";

interface Props {
  productName: string;
  size?: "sm" | "md";
  onUpdated?: () => void;
}

const CatalogImageThumb = ({ productName, size = "sm", onUpdated }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const upper = productName.toUpperCase();

  useEffect(() => {
    let cancelled = false;
    const map = loadLocalImageMap();
    const fileId = map[upper];
    if (!fileId) {
      setBlobUrl(null);
      return;
    }
    const auth = getValidAuth();
    if (!auth) return; // can't fetch without auth
    setLoading(true);
    fetchCatalogImageBlobUrl(auth, fileId)
      .then((url) => {
        if (!cancelled) setBlobUrl(url);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [upper]);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset
    if (!file) return;

    const auth = getValidAuth();
    if (!auth) {
      toast.error("Drive 연결이 필요합니다.");
      return;
    }

    setUploading(true);
    try {
      const fileId = await uploadCatalogImage(auth, upper, file);
      const map = loadLocalImageMap();
      map[upper] = fileId;
      saveLocalImageMap(map);
      try {
        await saveCatalogImageMapToDrive(auth, map);
      } catch (err) {
        console.warn("Drive 매핑 동기화 실패", err);
      }
      // load and display
      const url = await fetchCatalogImageBlobUrl(auth, fileId);
      setBlobUrl(url);
      toast.success(`${upper} 이미지 저장됨`);
      onUpdated?.();
    } catch (e) {
      console.error(e);
      toast.error("이미지 업로드 실패", {
        description: e instanceof Error ? e.message : "",
      });
    } finally {
      setUploading(false);
    }
  };

  const dim = size === "sm" ? "w-14 h-14" : "w-24 h-24";

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelected}
      />

      {blobUrl ? (
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className={`${dim} rounded-md overflow-hidden border bg-muted shrink-0 relative`}
          aria-label={`${upper} 이미지 보기`}
        >
          <img
            src={blobUrl}
            alt={upper}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || loading}
          className={`${dim} rounded-md border border-dashed bg-muted/50 flex items-center justify-center text-muted-foreground shrink-0 hover:bg-muted transition`}
          aria-label="이미지 추가"
        >
          {loading || uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImagePlus className="w-4 h-4" />
          )}
        </button>
      )}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="break-words">{upper}</DialogTitle>
          </DialogHeader>
          {blobUrl && (
            <div className="rounded-lg overflow-hidden bg-muted border">
              <img
                src={blobUrl}
                alt={upper}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              {uploading ? "업로드 중..." : "이미지 변경"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CatalogImageThumb;

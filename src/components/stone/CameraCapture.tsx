import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, ImageIcon, RotateCcw, Crop, Plus, X } from "lucide-react";
import CropDialog from "./CropDialog";

interface CameraCaptureProps {
  imageDataUrls: string[];
  onChange: (next: string[]) => void;
}

const MAX_PHOTOS = 3;
const MAX_DIMENSION = 1600;

async function readFileAsDownscaledDataUrl(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("이미지 읽기 실패"));
    reader.readAsDataURL(file);
  });

  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
      const targetW = Math.round(width * scale);
      const targetH = Math.round(height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, targetW, targetH);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => reject(new Error("이미지 디코딩 실패"));
    img.src = dataUrl;
  });
}

const CameraCapture = ({ imageDataUrls, onChange }: CameraCaptureProps) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [cropSource, setCropSource] = useState<{ url: string; index: number } | null>(null);

  const addImage = (url: string) => {
    if (imageDataUrls.length >= MAX_PHOTOS) return;
    onChange([...imageDataUrls, url]);
  };

  const replaceImage = (index: number, url: string) => {
    const next = [...imageDataUrls];
    next[index] = url;
    onChange(next);
  };

  const removeImage = (index: number) => {
    onChange(imageDataUrls.filter((_, i) => i !== index));
  };

  const handleFile = useCallback(
    async (file: File | undefined, source: "camera" | "gallery") => {
      if (!file) return;
      if (imageDataUrls.length >= MAX_PHOTOS) return;
      setProcessing(true);
      try {
        const downscaled = await readFileAsDownscaledDataUrl(file);
        if (source === "gallery") {
          setCropSource({ url: downscaled, index: -1 }); // -1 means "add new"
        } else {
          addImage(downscaled);
        }
      } catch (e) {
        console.error(e);
        alert("이미지를 처리할 수 없습니다.");
      } finally {
        setProcessing(false);
      }
    },
    [imageDataUrls]
  );

  const canAddMore = imageDataUrls.length < MAX_PHOTOS;

  if (imageDataUrls.length > 0) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {imageDataUrls.map((url, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-lg overflow-hidden border bg-muted group"
            >
              <img
                src={url}
                alt={`사진 ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
                  aria-label="삭제"
                >
                  <X className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setCropSource({ url, index: idx })}
                  className="p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
                  aria-label="자르기"
                >
                  <Crop className="w-3 h-3" />
                </button>
              </div>
              <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px]">
                {idx + 1}
              </div>
            </div>
          ))}
          {canAddMore && (
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={processing}
              className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition"
            >
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-[11px]">추가</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => cameraInputRef.current?.click()}
            disabled={!canAddMore || processing}
            className="h-10"
          >
            <Camera className="w-4 h-4 mr-1.5" />
            카메라 추가
          </Button>
          <Button variant="outline" onClick={() => onChange([])} className="h-10">
            <RotateCcw className="w-4 h-4 mr-1.5" />
            전체 다시
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground text-center">
          여러 사진을 올리면 같은 돌의 다른 각도/조명을 종합 분석합니다 (최대 {MAX_PHOTOS}장)
        </p>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0], "camera");
            e.target.value = "";
          }}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0], "gallery");
            e.target.value = "";
          }}
        />

        <CropDialog
          imageDataUrl={cropSource?.url ?? null}
          open={cropSource !== null}
          onOpenChange={(open) => !open && setCropSource(null)}
          onConfirm={(out) => {
            if (cropSource) {
              if (cropSource.index === -1) addImage(out);
              else replaceImage(cropSource.index, out);
            }
            setCropSource(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="stone-empty rounded-xl p-10 flex flex-col items-center justify-center text-center min-h-[260px]">
        <div className="w-14 h-14 rounded-2xl bg-card border flex items-center justify-center mb-3 shadow-sm">
          <Camera className="w-7 h-7 text-primary/70" />
        </div>
        <p className="text-sm font-medium text-foreground/80 mb-1">석재를 촬영하거나 갤러리에서 선택하세요</p>
        <p className="text-xs text-muted-foreground">
          여러 각도 사진을 추가하면 정확도가 올라갑니다 (최대 {MAX_PHOTOS}장)
        </p>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0], "camera");
          e.target.value = "";
        }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0], "gallery");
          e.target.value = "";
        }}
      />

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => cameraInputRef.current?.click()}
          disabled={processing}
          className="h-12 stone-cta border-0"
        >
          <Camera className="w-4 h-4 mr-2" />
          {processing ? "처리 중..." : "카메라"}
        </Button>
        <Button
          variant="outline"
          onClick={() => galleryInputRef.current?.click()}
          disabled={processing}
          className="h-12 bg-card hover:bg-muted shadow-sm"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          갤러리
        </Button>
      </div>

      <CropDialog
        imageDataUrl={cropSource?.url ?? null}
        open={cropSource !== null}
        onOpenChange={(open) => !open && setCropSource(null)}
        onConfirm={(out) => {
          if (cropSource) {
            if (cropSource.index === -1) addImage(out);
            else replaceImage(cropSource.index, out);
          }
          setCropSource(null);
        }}
      />
    </div>
  );
};

export default CameraCapture;

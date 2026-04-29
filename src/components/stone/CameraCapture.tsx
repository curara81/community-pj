import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, ImageIcon, RotateCcw, Crop } from "lucide-react";
import CropDialog from "./CropDialog";

interface CameraCaptureProps {
  imageDataUrl: string | null;
  onCapture: (dataUrl: string) => void;
  onClear: () => void;
}

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

const CameraCapture = ({ imageDataUrl, onCapture, onClear }: CameraCaptureProps) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [cropSource, setCropSource] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File | undefined, source: "camera" | "gallery") => {
      if (!file) return;
      setProcessing(true);
      try {
        const downscaled = await readFileAsDownscaledDataUrl(file);
        if (source === "gallery") {
          // Auto-open crop dialog for gallery photos so the user can
          // exclude background / non-stone areas.
          setCropSource(downscaled);
        } else {
          onCapture(downscaled);
        }
      } catch (e) {
        console.error(e);
        alert("이미지를 처리할 수 없습니다.");
      } finally {
        setProcessing(false);
      }
    },
    [onCapture]
  );

  if (imageDataUrl) {
    return (
      <div className="space-y-3">
        <div className="relative rounded-xl overflow-hidden border bg-muted">
          <img
            src={imageDataUrl}
            alt="촬영된 석재"
            className="w-full h-auto max-h-[420px] object-contain"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => setCropSource(imageDataUrl)}>
            <Crop className="w-4 h-4 mr-2" />
            자르기
          </Button>
          <Button variant="outline" onClick={onClear}>
            <RotateCcw className="w-4 h-4 mr-2" />
            다시 찍기
          </Button>
        </div>

        <CropDialog
          imageDataUrl={cropSource}
          open={cropSource !== null}
          onOpenChange={(open) => !open && setCropSource(null)}
          onConfirm={(out) => onCapture(out)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-10 flex flex-col items-center justify-center text-center min-h-[260px]">
        <Camera className="w-12 h-12 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground mb-1">석재를 촬영하거나 갤러리에서 선택하세요</p>
        <p className="text-xs text-muted-foreground/70">대리석, 화강석, 인조석, 타일 등 모든 석재 지원</p>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], "camera")}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], "gallery")}
      />

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => cameraInputRef.current?.click()}
          disabled={processing}
          className="h-12"
        >
          <Camera className="w-4 h-4 mr-2" />
          {processing ? "처리 중..." : "카메라"}
        </Button>
        <Button
          variant="outline"
          onClick={() => galleryInputRef.current?.click()}
          disabled={processing}
          className="h-12"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          갤러리
        </Button>
      </div>

      <CropDialog
        imageDataUrl={cropSource}
        open={cropSource !== null}
        onOpenChange={(open) => !open && setCropSource(null)}
        onConfirm={(out) => {
          onCapture(out);
          setCropSource(null);
        }}
      />
    </div>
  );
};

export default CameraCapture;

import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface CropDialogProps {
  imageDataUrl: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (croppedDataUrl: string) => void;
}

async function getCroppedDataUrl(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 컨텍스트 생성 실패");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg", 0.9);
}

const CropDialog = ({ imageDataUrl, open, onOpenChange, onConfirm }: CropDialogProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!imageDataUrl || !croppedAreaPixels) return;
    setProcessing(true);
    try {
      const out = await getCroppedDataUrl(imageDataUrl, croppedAreaPixels);
      onConfirm(out);
      onOpenChange(false);
      // reset for next time
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch (e) {
      console.error(e);
      alert("이미지 자르기 실패");
    } finally {
      setProcessing(false);
    }
  };

  const handleSkip = () => {
    if (!imageDataUrl) return;
    onConfirm(imageDataUrl);
    onOpenChange(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle>분석할 영역 선택</DialogTitle>
        </DialogHeader>

        <div className="relative w-full bg-black" style={{ height: "60vh" }}>
          {imageDataUrl && (
            <Cropper
              image={imageDataUrl}
              crop={crop}
              zoom={zoom}
              aspect={undefined}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              restrictPosition={false}
              showGrid
            />
          )}
        </div>

        <div className="px-4 py-3 space-y-3 bg-background">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">확대/축소</p>
            <Slider
              min={1}
              max={5}
              step={0.05}
              value={[zoom]}
              onValueChange={(v) => setZoom(v[0])}
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            손가락으로 드래그해서 위치 이동, 핀치 또는 슬라이더로 확대.
          </p>
        </div>

        <DialogFooter className="px-4 pb-4 gap-2 sm:gap-2">
          <Button variant="outline" onClick={handleSkip} disabled={processing}>
            전체 사용
          </Button>
          <Button onClick={handleConfirm} disabled={processing || !croppedAreaPixels}>
            {processing ? "처리 중..." : "잘라서 사용"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropDialog;

import { useState, RefObject } from "react";
import { toPng } from "html-to-image";
import { Share2, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Props {
  targetRef: RefObject<HTMLElement>;
  filename: string;
}

async function captureAsBlob(node: HTMLElement): Promise<Blob | null> {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: getComputedStyle(document.body).backgroundColor || "#ffffff",
  });
  const res = await fetch(dataUrl);
  return res.blob();
}

const ShareButton = ({ targetRef, filename }: Props) => {
  const [busy, setBusy] = useState(false);

  const handleShare = async () => {
    if (!targetRef.current) return;
    setBusy(true);
    try {
      const blob = await captureAsBlob(targetRef.current);
      if (!blob) throw new Error("이미지 생성 실패");

      const file = new File([blob], `${filename}.png`, { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "석재 분석 결과",
        });
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.info("이미지가 다운로드 되었습니다.");
      }
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      console.error(e);
      toast.error("공유 실패", {
        description: e instanceof Error ? e.message : "",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = async () => {
    if (!targetRef.current) return;
    setBusy(true);
    try {
      const blob = await captureAsBlob(targetRef.current);
      if (!blob) throw new Error("이미지 생성 실패");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("다운로드 완료");
    } catch (e) {
      console.error(e);
      toast.error("다운로드 실패", {
        description: e instanceof Error ? e.message : "",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" disabled={busy}>
          {busy ? (
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          ) : (
            <Share2 className="w-4 h-4 mr-1" />
          )}
          공유
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          공유 (카카오톡 등)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          이미지로 저장
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;

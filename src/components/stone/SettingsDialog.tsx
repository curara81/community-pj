import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loadApiKeys, saveApiKeys } from "@/lib/stone/storage";
import { getValidAuth, uploadSettingsToDrive } from "@/lib/stone/drive";
import type { ApiKeys } from "@/lib/stone/types";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenCatalogImages?: () => void;
}

const SettingsDialog = ({ open, onOpenChange, onOpenCatalogImages }: SettingsDialogProps) => {
  const [keys, setKeys] = useState<ApiKeys>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setKeys(loadApiKeys());
  }, [open]);

  const handleSave = async () => {
    saveApiKeys(keys);
    const auth = getValidAuth();
    if (auth) {
      setSaving(true);
      try {
        await uploadSettingsToDrive(auth, keys);
        toast.success("저장됨 (Drive 동기화 완료)");
      } catch (e) {
        toast.warning("로컬 저장 완료 (Drive 동기화 실패)", {
          description: e instanceof Error ? e.message : "",
        });
      } finally {
        setSaving(false);
      }
    } else {
      toast.success("저장됨 (이 기기에만)");
    }
    onOpenChange(false);
  };

  const update = (k: keyof ApiKeys) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeys((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>API 키 설정</DialogTitle>
          <DialogDescription>
            모든 키는 이 브라우저에만 저장됩니다 (서버 전송 없음).
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai">AI 분석</TabsTrigger>
            <TabsTrigger value="drive">Google Drive</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="claude">Claude API Key</Label>
                <a
                  href="https://console.anthropic.com/settings/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                >
                  발급 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <Input
                id="claude"
                type="password"
                placeholder="sk-ant-api03-..."
                value={keys.claude || ""}
                onChange={update("claude")}
              />
              <p className="text-xs text-muted-foreground">
                정밀분석(Sonnet 4.6)과 빠른분석(Haiku 4.5)에 사용
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="gemini">Gemini API Key</Label>
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                >
                  발급 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <Input
                id="gemini"
                type="password"
                placeholder="AIza..."
                value={keys.gemini || ""}
                onChange={update("gemini")}
              />
              <p className="text-xs text-muted-foreground">
                검색 탭 (Google Search 그라운딩) — 무료 티어 분당 15회
              </p>
            </div>

            <div className="pt-3 border-t space-y-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                  Google Cloud (선택)
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Vision API (무료 분석), Translate (한글→영문), Custom Search (이미지 검색).
                  $300 크레딧 적용됨.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="googleCloudKey">Cloud API Key</Label>
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    발급 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <Input
                  id="googleCloudKey"
                  type="password"
                  placeholder="AIza... (Cloud Console에서 새로 발급)"
                  value={keys.googleCloudKey || ""}
                  onChange={update("googleCloudKey")}
                />
                <div className="text-[11px] text-muted-foreground space-y-0.5">
                  <p>· APIs Library에서 다음 3개 활성화 필요:</p>
                  <p className="pl-3">
                    <a className="text-primary hover:underline" target="_blank" rel="noreferrer"
                       href="https://console.cloud.google.com/apis/library/translate.googleapis.com">
                      Cloud Translation API
                    </a>
                    {" / "}
                    <a className="text-primary hover:underline" target="_blank" rel="noreferrer"
                       href="https://console.cloud.google.com/apis/library/vision.googleapis.com">
                      Cloud Vision API
                    </a>
                    {" / "}
                    <a className="text-primary hover:underline" target="_blank" rel="noreferrer"
                       href="https://console.cloud.google.com/apis/library/customsearch.googleapis.com">
                      Custom Search API
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="googleCseId">Custom Search Engine ID</Label>
                  <a
                    href="https://programmablesearchengine.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    만들기 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <Input
                  id="googleCseId"
                  placeholder="cx 값 (예: 123abc456:def789)"
                  value={keys.googleCseId || ""}
                  onChange={update("googleCseId")}
                />
                <p className="text-[11px] text-muted-foreground">
                  Programmable Search Engine 만들기 → "전체 웹 검색" + "이미지 검색" 옵션 켜기 → cx ID 복사
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drive" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="googleClientId">Google OAuth Client ID</Label>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                >
                  발급 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <Input
                id="googleClientId"
                placeholder="xxxxx.apps.googleusercontent.com"
                value={keys.googleClientId || ""}
                onChange={update("googleClientId")}
              />
              <div className="text-xs text-muted-foreground space-y-1 pt-1">
                <p>1. Google Cloud Console에서 새 프로젝트 생성</p>
                <p>2. "Google Drive API" 사용 설정</p>
                <p>3. "OAuth 2.0 클라이언트 ID" 생성 (웹 애플리케이션)</p>
                <p>
                  4. 승인된 JavaScript 출처에{" "}
                  <code className="bg-muted px-1 rounded">{typeof window !== "undefined" ? window.location.origin : ""}</code>{" "}
                  추가
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {onOpenCatalogImages && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              onOpenChange(false);
              onOpenCatalogImages();
            }}
          >
            카탈로그 이미지 관리
          </Button>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

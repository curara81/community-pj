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
import { ExternalLink } from "lucide-react";
import { loadApiKeys, saveApiKeys } from "@/lib/stone/storage";
import type { ApiKeys } from "@/lib/stone/types";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [keys, setKeys] = useState<ApiKeys>({});

  useEffect(() => {
    if (open) setKeys(loadApiKeys());
  }, [open]);

  const handleSave = () => {
    saveApiKeys(keys);
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
              <p className="text-xs text-muted-foreground">정밀분석용 (유료, 종량제)</p>
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
              <p className="text-xs text-muted-foreground">빠른 분석용 (무료, 일 1500회)</p>
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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

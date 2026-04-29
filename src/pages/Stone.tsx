import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Settings,
  Sparkles,
  Zap,
  Loader2,
  Cloud,
  CloudOff,
  ArrowLeft,
  History,
  Camera,
} from "lucide-react";
import CameraCapture from "@/components/stone/CameraCapture";
import ResultCard from "@/components/stone/ResultCard";
import HistoryList from "@/components/stone/HistoryList";
import SettingsDialog from "@/components/stone/SettingsDialog";
import { analyzeWithClaude } from "@/lib/stone/claude";
import { analyzeWithGemini } from "@/lib/stone/gemini";
import {
  requestDriveAccess,
  getValidAuth,
  signOutDrive,
  uploadAnalysisToDrive,
  loadSettingsFromDrive,
  uploadSettingsToDrive,
} from "@/lib/stone/drive";
import {
  loadApiKeys,
  saveApiKeys,
  loadHistory,
  saveHistory,
  addHistoryRecord,
  loadPreferredProvider,
  savePreferredProvider,
} from "@/lib/stone/storage";
import type { ApiKeys, ApiProvider, StoneAnalysis, StoneRecord, DriveAuth } from "@/lib/stone/types";

const Stone = () => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<StoneAnalysis | null>(null);
  const [usedProvider, setUsedProvider] = useState<ApiProvider | null>(null);
  const [userNote, setUserNote] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [history, setHistory] = useState<StoneRecord[]>([]);
  const [driveAuth, setDriveAuth] = useState<DriveAuth | null>(null);
  const [activeTab, setActiveTab] = useState<"capture" | "history">("capture");

  useEffect(() => {
    setHistory(loadHistory());
    setDriveAuth(getValidAuth());

    const previousTitle = document.title;
    document.title = "석재 식별기";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", content);
      return prev;
    };
    const prevAppleTitle = setMeta("apple-mobile-web-app-title", "석재 식별기");
    const prevThemeColor = setMeta("theme-color", "#475569");

    return () => {
      document.title = previousTitle;
      if (prevAppleTitle !== null) setMeta("apple-mobile-web-app-title", prevAppleTitle);
      if (prevThemeColor !== null) setMeta("theme-color", prevThemeColor);
    };
  }, []);

  const handleAnalyze = async (provider: ApiProvider) => {
    if (!imageDataUrl) {
      toast.error("먼저 사진을 촬영하거나 선택해주세요.");
      return;
    }
    const keys = loadApiKeys();
    const key = provider === "claude" ? keys.claude : keys.gemini;
    if (!key) {
      toast.error(
        `${provider === "claude" ? "Claude" : "Gemini"} API 키가 설정되지 않았습니다.`,
        {
          action: { label: "설정", onClick: () => setSettingsOpen(true) },
        }
      );
      return;
    }

    setAnalyzing(true);
    setAnalysis(null);
    setUsedProvider(null);
    savePreferredProvider(provider);

    try {
      const result =
        provider === "claude"
          ? await analyzeWithClaude(imageDataUrl, key, userNote)
          : await analyzeWithGemini(imageDataUrl, key, userNote);

      setAnalysis(result);
      setUsedProvider(provider);

      const record: StoneRecord = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        provider,
        imageDataUrl,
        analysis: result,
        userNote: userNote || undefined,
      };

      const auth = getValidAuth();
      if (auth) {
        try {
          const upload = await uploadAnalysisToDrive(auth, {
            imageDataUrl,
            analysis: result,
            provider,
            userNote,
            recordId: record.id,
          });
          record.driveFileId = upload.imageFileId;
          record.driveFileLink = upload.imageWebViewLink;
          record.driveMetadataId = upload.metadataFileId;
          toast.success("Google Drive에 저장 완료", {
            description: "사진과 분석 결과가 백업되었습니다.",
          });
        } catch (e) {
          console.error(e);
          toast.warning("Drive 업로드 실패 (분석 결과는 로컬에 저장됨)", {
            description: e instanceof Error ? e.message : "",
          });
        }
      }

      addHistoryRecord(record);
      setHistory(loadHistory());
      toast.success(`분석 완료 (${provider === "claude" ? "Claude" : "Gemini"})`);
    } catch (e) {
      console.error(e);
      toast.error("분석 실패", {
        description: e instanceof Error ? e.message : "알 수 없는 오류",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleConnectDrive = async () => {
    const keys = loadApiKeys();
    if (!keys.googleClientId) {
      toast.error("Google OAuth Client ID가 필요합니다.", {
        action: { label: "설정", onClick: () => setSettingsOpen(true) },
      });
      return;
    }
    try {
      const auth = await requestDriveAccess(keys.googleClientId);
      setDriveAuth(auth);
      toast.success("Google Drive 연결됨");

      try {
        const remote = await loadSettingsFromDrive(auth);
        if (remote && Object.keys(remote).length > 0) {
          const merged: ApiKeys = { ...keys, ...remote };
          saveApiKeys(merged);
          toast.success("Drive에서 설정 동기화됨");
        } else if (keys.claude || keys.gemini || keys.googleClientId) {
          await uploadSettingsToDrive(auth, keys);
          toast.success("이 기기 설정을 Drive에 업로드했습니다");
        }
      } catch (e) {
        console.warn("설정 동기화 실패", e);
      }
    } catch (e) {
      toast.error("Drive 연결 실패", {
        description: e instanceof Error ? e.message : "",
      });
    }
  };

  const handleDisconnectDrive = () => {
    signOutDrive();
    setDriveAuth(null);
    toast.info("Drive 연결 해제됨");
  };

  const handleClearImage = () => {
    setImageDataUrl(null);
    setAnalysis(null);
    setUsedProvider(null);
    setUserNote("");
  };

  const handleDeleteHistory = (id: string) => {
    const next = history.filter((r) => r.id !== id);
    saveHistory(next);
    setHistory(next);
    toast.success("삭제됨");
  };

  const preferred = loadPreferredProvider();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-100">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            홈
          </Link>
          <h1 className="text-base font-bold flex items-center gap-2">
            <Camera className="w-4 h-4" />
            석재 식별기
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSettingsOpen(true)}
            aria-label="설정"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        <Card className="p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {driveAuth ? (
              <>
                <Cloud className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium">Google Drive 연결됨</p>
                  <p className="text-[11px] text-muted-foreground">StoneIdentifier 폴더에 자동 저장</p>
                </div>
              </>
            ) : (
              <>
                <CloudOff className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium">Drive 미연결</p>
                  <p className="text-[11px] text-muted-foreground">로컬에만 저장됩니다</p>
                </div>
              </>
            )}
          </div>
          <Button
            size="sm"
            variant={driveAuth ? "outline" : "default"}
            onClick={driveAuth ? handleDisconnectDrive : handleConnectDrive}
          >
            {driveAuth ? "해제" : "연결"}
          </Button>
        </Card>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "capture" | "history")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="capture">
              <Camera className="w-4 h-4 mr-1.5" />
              촬영/분석
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-1.5" />
              기록 ({history.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capture" className="space-y-4 mt-4">
            <CameraCapture
              imageDataUrl={imageDataUrl}
              onCapture={(url) => {
                setImageDataUrl(url);
                setAnalysis(null);
                setUsedProvider(null);
              }}
              onClear={handleClearImage}
            />

            {imageDataUrl && (
              <>
                <Textarea
                  placeholder="추가 메모 (선택) - 예: 욕실 벽, 인테리어용으로 검토 중"
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  rows={2}
                  className="resize-none"
                />

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleAnalyze("claude")}
                    disabled={analyzing}
                    className="h-14 flex-col gap-0.5"
                    variant={preferred === "claude" ? "default" : "outline"}
                  >
                    {analyzing && usedProvider === null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="flex items-center text-sm font-semibold">
                          <Sparkles className="w-3.5 h-3.5 mr-1" />
                          정밀분석
                        </span>
                        <span className="text-[10px] opacity-80">Claude · 유료</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleAnalyze("gemini")}
                    disabled={analyzing}
                    className="h-14 flex-col gap-0.5"
                    variant={preferred === "gemini" ? "default" : "outline"}
                  >
                    {analyzing && usedProvider === null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="flex items-center text-sm font-semibold">
                          <Zap className="w-3.5 h-3.5 mr-1" />
                          빠른분석
                        </span>
                        <span className="text-[10px] opacity-80">Gemini · 무료</span>
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {analyzing && (
              <Card className="p-6 flex items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">분석 중...</span>
              </Card>
            )}

            {analysis && !analyzing && <ResultCard analysis={analysis} />}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <HistoryList records={history} onDelete={handleDeleteHistory} />
          </TabsContent>
        </Tabs>
      </main>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Stone;

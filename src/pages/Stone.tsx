import { useEffect, useRef, useState } from "react";
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
  History,
  Camera,
  Sun,
  Moon,
  MonitorSmartphone,
  Calculator,
} from "lucide-react";
import { StoneThemeProvider, useStoneTheme } from "@/lib/stone/theme";
import CameraCapture from "@/components/stone/CameraCapture";
import ResultCard from "@/components/stone/ResultCard";
import HistoryList from "@/components/stone/HistoryList";
import SettingsDialog from "@/components/stone/SettingsDialog";
import SlabCalculator from "@/components/stone/SlabCalculator";
import ShareButton from "@/components/stone/ShareButton";
import CatalogImageManager from "@/components/stone/CatalogImageManager";
import { analyzeWithClaude } from "@/lib/stone/claude";
import type { ClaudeModel } from "@/lib/stone/claude";
import { pickConfirmedLibrary } from "@/lib/stone/prompts";
import {
  requestDriveAccess,
  getValidAuth,
  signOutDrive,
  uploadAnalysisToDrive,
  loadSettingsFromDrive,
  uploadSettingsToDrive,
  loadHistoryFromDrive,
  uploadHistoryToDrive,
} from "@/lib/stone/drive";
import {
  fetchCatalogImageMapFromDrive,
  loadLocalImageMap,
  saveLocalImageMap,
} from "@/lib/stone/catalogImages";
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

function mergeHistoryOnSync(local: StoneRecord[], remote: StoneRecord[]): StoneRecord[] {
  const remoteIds = new Set(remote.map((r) => r.id));
  const localById = new Map(local.map((r) => [r.id, r]));
  const result: StoneRecord[] = [];

  // Remote records — preserve local imageDataUrl when ID matches
  for (const r of remote) {
    const localVer = localById.get(r.id);
    result.push(localVer?.imageDataUrl ? { ...r, imageDataUrl: localVer.imageDataUrl } : r);
  }

  // Local-only records that haven't been uploaded yet (no driveFileId)
  // are kept. Records with driveFileId missing from remote = deleted elsewhere.
  for (const r of local) {
    if (remoteIds.has(r.id)) continue;
    if (r.driveFileId) continue;
    result.push(r);
  }

  return result.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function ThemeToggleButton() {
  const { theme, setTheme } = useStoneTheme();
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const icon =
    theme === "light" ? (
      <Sun className="w-4 h-4" />
    ) : theme === "dark" ? (
      <Moon className="w-4 h-4" />
    ) : (
      <MonitorSmartphone className="w-4 h-4" />
    );
  const label =
    theme === "light"
      ? "라이트 모드 (다크로 전환)"
      : theme === "dark"
        ? "다크 모드 (자동으로 전환)"
        : "자동 모드 (라이트로 전환)";
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
    >
      {icon}
    </Button>
  );
}

const Stone = () => {
  const [imageDataUrls, setImageDataUrls] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<StoneAnalysis | null>(null);
  const [usedProvider, setUsedProvider] = useState<ApiProvider | null>(null);
  const [userNote, setUserNote] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [catalogImagesOpen, setCatalogImagesOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<StoneRecord[]>([]);
  const [driveAuth, setDriveAuth] = useState<DriveAuth | null>(null);
  const [activeTab, setActiveTab] = useState<"capture" | "history">("capture");

  const syncHistoryWithDrive = async (auth: DriveAuth) => {
    try {
      const remote = await loadHistoryFromDrive(auth);
      const local = loadHistory();
      const merged = mergeHistoryOnSync(local, remote ?? []);
      saveHistory(merged);
      setHistory(merged);

      // Push back so any local-only (unsynced) records appear on Drive
      const localOnlyExists = merged.some((r) =>
        local.find((l) => l.id === r.id) && !(remote ?? []).find((rr) => rr.id === r.id)
      );
      if (localOnlyExists || (remote === null && merged.length > 0)) {
        try {
          await uploadHistoryToDrive(auth, merged);
        } catch (e) {
          console.warn("Drive 기록 업로드 실패", e);
        }
      }
    } catch (e) {
      console.warn("Drive 기록 동기화 실패", e);
    }
  };

  useEffect(() => {
    setHistory(loadHistory());
    const auth = getValidAuth();
    setDriveAuth(auth);
    if (auth) {
      void syncHistoryWithDrive(auth);
      void (async () => {
        try {
          const remoteMap = await fetchCatalogImageMapFromDrive(auth);
          if (remoteMap && Object.keys(remoteMap).length > 0) {
            const localMap = loadLocalImageMap();
            saveLocalImageMap({ ...localMap, ...remoteMap });
          }
        } catch (e) {
          console.warn("카탈로그 이미지 매핑 동기화 실패", e);
        }
      })();
    }

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
    if (imageDataUrls.length === 0) {
      toast.error("먼저 사진을 촬영하거나 선택해주세요.");
      return;
    }
    const keys = loadApiKeys();
    const key = keys.claude;
    if (!key) {
      toast.error("Claude API 키가 설정되지 않았습니다.", {
        action: { label: "설정", onClick: () => setSettingsOpen(true) },
      });
      return;
    }

    setAnalyzing(true);
    setAnalysis(null);
    setUsedProvider(null);
    savePreferredProvider(provider);

    const model: ClaudeModel =
      provider === "claude-haiku" ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-6";

    try {
      const library = pickConfirmedLibrary(history);
      const result = await analyzeWithClaude(imageDataUrls, key, {
        model,
        userNote,
        library,
      });

      setAnalysis(result);
      setUsedProvider(provider);

      const primaryImage = imageDataUrls[0];
      const record: StoneRecord = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        provider,
        imageDataUrl: primaryImage,
        analysis: result,
        userNote: userNote || undefined,
      };

      const auth = getValidAuth();
      if (auth) {
        try {
          const upload = await uploadAnalysisToDrive(auth, {
            imageDataUrl: primaryImage,
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
      const updated = loadHistory();
      setHistory(updated);
      toast.success(
        `분석 완료 (${provider === "claude-haiku" ? "Haiku 4.5" : "Sonnet 4.6"})`
      );

      const currentAuth = getValidAuth();
      if (currentAuth) {
        try {
          await uploadHistoryToDrive(currentAuth, updated);
        } catch (e) {
          console.warn("Drive 기록 동기화 실패", e);
        }
      }
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

      try {
        const remoteMap = await fetchCatalogImageMapFromDrive(auth);
        if (remoteMap && Object.keys(remoteMap).length > 0) {
          const localMap = loadLocalImageMap();
          saveLocalImageMap({ ...localMap, ...remoteMap });
        }
      } catch (e) {
        console.warn("카탈로그 이미지 매핑 동기화 실패", e);
      }

      await syncHistoryWithDrive(auth);
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
    setImageDataUrls([]);
    setAnalysis(null);
    setUsedProvider(null);
    setUserNote("");
  };

  const handleUpdateHistory = (updated: StoneRecord) => {
    const next = history.map((r) => (r.id === updated.id ? updated : r));
    saveHistory(next);
    setHistory(next);

    const currentAuth = getValidAuth();
    if (currentAuth) {
      void uploadHistoryToDrive(currentAuth, next).catch((e) =>
        console.warn("Drive 기록 동기화 실패", e)
      );
    }
  };

  const handleDeleteHistory = (id: string) => {
    const next = history.filter((r) => r.id !== id);
    saveHistory(next);
    setHistory(next);
    toast.success("삭제됨");

    const currentAuth = getValidAuth();
    if (currentAuth) {
      void uploadHistoryToDrive(currentAuth, next).catch((e) =>
        console.warn("Drive 기록 동기화 실패", e)
      );
    }
  };

  const preferred = loadPreferredProvider();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <header
        className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <img
            src="/stone-icon.svg"
            alt=""
            className="w-7 h-7 rounded-md"
            aria-hidden
          />
          <h1 className="text-base font-bold flex items-center gap-2">
            석재 식별기
          </h1>
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCalcOpen(true)}
              aria-label="슬랩 계산기"
              title="슬랩 계산기"
            >
              <Calculator className="w-4 h-4" />
            </Button>
            <ThemeToggleButton />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettingsOpen(true)}
              aria-label="설정"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main
        className="max-w-2xl mx-auto px-4 py-4 space-y-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
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
              imageDataUrls={imageDataUrls}
              onChange={(next) => {
                setImageDataUrls(next);
                setAnalysis(null);
                setUsedProvider(null);
              }}
            />

            {imageDataUrls.length > 0 && (
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
                    onClick={() => handleAnalyze("claude-sonnet")}
                    disabled={analyzing}
                    className="h-14 flex-col gap-0.5"
                    variant={preferred === "claude-sonnet" ? "default" : "outline"}
                  >
                    {analyzing && usedProvider === null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="flex items-center text-sm font-semibold">
                          <Sparkles className="w-3.5 h-3.5 mr-1" />
                          정밀분석
                        </span>
                        <span className="text-[10px] opacity-80">Sonnet 4.6</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleAnalyze("claude-haiku")}
                    disabled={analyzing}
                    className="h-14 flex-col gap-0.5"
                    variant={preferred === "claude-haiku" ? "default" : "outline"}
                  >
                    {analyzing && usedProvider === null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="flex items-center text-sm font-semibold">
                          <Zap className="w-3.5 h-3.5 mr-1" />
                          빠른분석
                        </span>
                        <span className="text-[10px] opacity-80">Haiku 4.5</span>
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

            {analysis && !analyzing && (
              <div className="space-y-2">
                <div className="flex justify-end">
                  <ShareButton
                    targetRef={resultRef}
                    filename={`석재분석_${analysis.name?.replace(/\s+/g, "_") || "결과"}_${new Date().toISOString().slice(0, 10)}`}
                  />
                </div>
                <div ref={resultRef}>
                  <ResultCard analysis={analysis} />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <HistoryList
              records={history}
              onDelete={handleDeleteHistory}
              onUpdate={handleUpdateHistory}
            />
          </TabsContent>
        </Tabs>
      </main>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onOpenCatalogImages={() => setCatalogImagesOpen(true)}
      />
      <SlabCalculator open={calcOpen} onOpenChange={setCalcOpen} />
      <CatalogImageManager open={catalogImagesOpen} onOpenChange={setCatalogImagesOpen} />
    </div>
  );
};

const StonePage = () => (
  <StoneThemeProvider>
    <Stone />
  </StoneThemeProvider>
);

export default StonePage;

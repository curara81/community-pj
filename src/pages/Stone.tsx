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
  Gift,
  Search as SearchIcon,
} from "lucide-react";
import { StoneThemeProvider, useStoneTheme } from "@/lib/stone/theme";
import CameraCapture from "@/components/stone/CameraCapture";
import ResultCard from "@/components/stone/ResultCard";
import HistoryList from "@/components/stone/HistoryList";
import SettingsDialog from "@/components/stone/SettingsDialog";
import SlabCalculator from "@/components/stone/SlabCalculator";
import ShareButton from "@/components/stone/ShareButton";
import CatalogImageManager from "@/components/stone/CatalogImageManager";
import SearchPanel from "@/components/stone/SearchPanel";
import { analyzeWithClaude } from "@/lib/stone/claude";
import type { ClaudeModel } from "@/lib/stone/claude";
import { analyzeWithCloudVision } from "@/lib/stone/cloud";
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
  const [originHint, setOriginHint] = useState("");
  const [nameHint, setNameHint] = useState("");
  const [hintsOpen, setHintsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [catalogImagesOpen, setCatalogImagesOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<StoneRecord[]>([]);
  const [driveAuth, setDriveAuth] = useState<DriveAuth | null>(null);
  const [activeTab, setActiveTab] = useState<"capture" | "search" | "history">("capture");

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
    const isCloudVision = provider === "gemini"; // legacy provider id, now used for Cloud Vision
    const key = isCloudVision ? keys.googleCloudKey : keys.claude;
    if (!key) {
      toast.error(
        `${isCloudVision ? "Google Cloud API" : "Claude API"} 키가 설정되지 않았습니다.`,
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

    const hints = {
      originHint: originHint || undefined,
      nameHint: nameHint || undefined,
    };

    try {
      const library = pickConfirmedLibrary(history);
      const result = isCloudVision
        ? await analyzeWithCloudVision(imageDataUrls, key)
        : await analyzeWithClaude(imageDataUrls, key, {
            model:
              provider === "claude-haiku"
                ? "claude-haiku-4-5-20251001"
                : "claude-sonnet-4-6",
            userNote,
            library,
            hints,
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
        `분석 완료 (${
          provider === "gemini"
            ? "Cloud Vision"
            : provider === "claude-haiku"
              ? "Haiku 4.5"
              : "Sonnet 4.6"
        })`
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
    setOriginHint("");
    setNameHint("");
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
    <div className="min-h-screen stone-app-bg">
      <header
        className="sticky top-0 z-20 stone-header"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src="/stone-icon.svg"
                alt=""
                className="w-9 h-9 rounded-lg ring-1 ring-border shadow-sm"
                aria-hidden
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-[15px] font-bold leading-tight tracking-tight">
                석재 식별기
              </h1>
              <p className="text-[10px] text-muted-foreground leading-tight tracking-wider uppercase">
                Stone Identifier · NUOVOCORSO
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
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
      >
        <Card className="stone-card p-3.5 flex items-center justify-between gap-3 border-0">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                driveAuth
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {driveAuth ? <Cloud className="w-4 h-4" /> : <CloudOff className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight">
                {driveAuth ? "Google Drive 연결됨" : "Drive 미연결"}
              </p>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {driveAuth
                  ? "StoneIdentifier 폴더에 자동 저장 · 다기기 동기화"
                  : "이 기기에만 저장됩니다"}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={driveAuth ? "outline" : "default"}
            onClick={driveAuth ? handleDisconnectDrive : handleConnectDrive}
            className={driveAuth ? "" : "stone-cta-gold border-0 hover:opacity-90"}
          >
            {driveAuth ? "해제" : "연결"}
          </Button>
        </Card>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "capture" | "search" | "history")}>
          <TabsList className="grid w-full grid-cols-3 h-11 bg-muted/60 p-1">
            <TabsTrigger value="capture" className="data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs sm:text-sm">
              <Camera className="w-4 h-4 mr-1" />
              촬영
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs sm:text-sm">
              <SearchIcon className="w-4 h-4 mr-1" />
              검색
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs sm:text-sm">
              <History className="w-4 h-4 mr-1" />
              기록 {history.length > 0 && <span className="ml-0.5 text-[10px] text-muted-foreground">({history.length})</span>}
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

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setHintsOpen((v) => !v)}
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {hintsOpen ? "▼" : "▶"} 단서 입력 (선택) - 산지 / 이름 일부를 알면
                  </button>
                  {hintsOpen && (
                    <Card className="p-3 space-y-2 bg-muted/30">
                      <div className="space-y-1">
                        <label className="text-[11px] text-muted-foreground">
                          예상 산지
                        </label>
                        <input
                          type="text"
                          value={originHint}
                          onChange={(e) => setOriginHint(e.target.value)}
                          placeholder="예: 이탈리아 카라라, 튀르키예, 인도, 브라질"
                          className="w-full px-2.5 py-1.5 text-sm rounded-md border bg-background"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-muted-foreground">
                          이름 단서 (제품명 일부 또는 시리즈)
                        </label>
                        <input
                          type="text"
                          value={nameHint}
                          onChange={(e) => setNameHint(e.target.value)}
                          placeholder="예: Calacatta, Statuario, Bianco, Crema"
                          className="w-full px-2.5 py-1.5 text-sm rounded-md border bg-background"
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        이 단서가 사진과 부합하면 1순위로 강하게 반영됩니다. 모순되면 무시됩니다.
                      </p>
                    </Card>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => handleAnalyze("claude-sonnet")}
                    disabled={analyzing}
                    className={`h-[68px] flex-col gap-0.5 border-0 px-2 ${
                      preferred === "claude-sonnet" ? "stone-cta" : "bg-card text-foreground border border-border hover:bg-muted shadow-sm"
                    }`}
                  >
                    {analyzing && usedProvider === null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="flex items-center text-[13px] font-semibold tracking-tight">
                          <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
                          정밀
                        </span>
                        <span className="text-[9px] opacity-70 tracking-wide">SONNET · 정확도</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleAnalyze("claude-haiku")}
                    disabled={analyzing}
                    className={`h-[68px] flex-col gap-0.5 border-0 px-2 ${
                      preferred === "claude-haiku" ? "stone-cta" : "bg-card text-foreground border border-border hover:bg-muted shadow-sm"
                    }`}
                  >
                    {analyzing && usedProvider === null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="flex items-center text-[13px] font-semibold tracking-tight">
                          <Zap className="w-3.5 h-3.5 mr-1 text-amber-400" />
                          빠른
                        </span>
                        <span className="text-[9px] opacity-70 tracking-wide">HAIKU · 속도</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleAnalyze("gemini")}
                    disabled={analyzing}
                    className={`h-[68px] flex-col gap-0.5 border-0 px-2 ${
                      preferred === "gemini" ? "stone-cta" : "bg-card text-foreground border border-border hover:bg-muted shadow-sm"
                    }`}
                  >
                    {analyzing && usedProvider === null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="flex items-center text-[13px] font-semibold tracking-tight">
                          <Gift className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                          무료
                        </span>
                        <span className="text-[9px] opacity-70 tracking-wide">CLOUD VISION · 크레딧</span>
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

          <TabsContent value="search" className="mt-4">
            <SearchPanel />
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

      <footer
        className="max-w-2xl mx-auto px-4 pb-6 pt-2 text-center"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
      >
        <p className="text-[11px] text-muted-foreground tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground/80">Lapis Global</span>. All rights reserved.
        </p>
      </footer>

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

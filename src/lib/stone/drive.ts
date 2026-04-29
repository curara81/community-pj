import { loadDriveAuth, saveDriveAuth, clearDriveAuth } from "./storage";
import type { DriveAuth, StoneAnalysis } from "./types";

const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";
const FOLDER_NAME = "StoneIdentifier";

interface TokenResponse {
  access_token: string;
  expires_in?: number | string;
  error?: string;
}

interface TokenClient {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
}

interface GoogleAccountsOAuth2 {
  initTokenClient: (config: {
    client_id: string;
    scope: string;
    callback: (response: TokenResponse) => void;
  }) => TokenClient;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: GoogleAccountsOAuth2;
      };
    };
  }
}

let gisLoadPromise: Promise<void> | null = null;

function loadGoogleIdentityServices(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (gisLoadPromise) return gisLoadPromise;
  gisLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Google Identity Services 스크립트 로드 실패")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Identity Services 스크립트 로드 실패"));
    document.head.appendChild(script);
  });
  return gisLoadPromise;
}

export async function requestDriveAccess(clientId: string): Promise<DriveAuth> {
  if (!clientId) throw new Error("Google OAuth Client ID가 필요합니다.");
  await loadGoogleIdentityServices();

  const oauth2 = window.google?.accounts?.oauth2;
  if (!oauth2) throw new Error("Google Identity Services 초기화 실패");

  return new Promise<DriveAuth>((resolve, reject) => {
    const tokenClient = oauth2.initTokenClient({
      client_id: clientId,
      scope: DRIVE_SCOPE,
      callback: async (response) => {
        if (response.error) {
          reject(new Error(`구글 인증 실패: ${response.error}`));
          return;
        }
        const expiresIn = response.expires_in ? Number(response.expires_in) : 3600;
        const auth: DriveAuth = {
          accessToken: response.access_token,
          expiresAt: Date.now() + (expiresIn - 60) * 1000,
        };
        try {
          auth.folderId = await ensureStoneFolder(auth.accessToken);
        } catch (e) {
          console.warn("Drive 폴더 생성 실패", e);
        }
        saveDriveAuth(auth);
        resolve(auth);
      },
    });
    tokenClient.requestAccessToken({ prompt: "" });
  });
}

export function getValidAuth(): DriveAuth | null {
  return loadDriveAuth();
}

export function signOutDrive(): void {
  clearDriveAuth();
}

async function ensureStoneFolder(accessToken: string): Promise<string> {
  const query = encodeURIComponent(
    `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
  );
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!searchRes.ok) throw new Error("Drive 폴더 검색 실패");
  const searchJson = await searchRes.json();
  if (searchJson.files?.length) return searchJson.files[0].id;

  const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: FOLDER_NAME,
      mimeType: "application/vnd.google-apps.folder",
    }),
  });
  if (!createRes.ok) throw new Error("Drive 폴더 생성 실패");
  const createJson = await createRes.json();
  return createJson.id as string;
}

function dataUrlToBlob(dataUrl: string): { blob: Blob; mimeType: string } {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) throw new Error("이미지 변환 실패");
  const mimeType = match[1];
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return { blob: new Blob([bytes], { type: mimeType }), mimeType };
}

interface UploadOptions {
  imageDataUrl: string;
  analysis: StoneAnalysis;
  provider: string;
  userNote?: string;
  recordId: string;
}

interface UploadResult {
  imageFileId: string;
  imageWebViewLink?: string;
  metadataFileId: string;
}

export async function uploadAnalysisToDrive(
  auth: DriveAuth,
  opts: UploadOptions
): Promise<UploadResult> {
  if (!auth.folderId) {
    auth.folderId = await ensureStoneFolder(auth.accessToken);
    saveDriveAuth(auth);
  }

  const safeName = (opts.analysis.name || "stone").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 60);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const baseFileName = `${timestamp}__${safeName}`;

  const { blob, mimeType } = dataUrlToBlob(opts.imageDataUrl);
  const ext = mimeType.split("/")[1] || "jpg";
  const imageFileName = `${baseFileName}.${ext}`;

  const imageMeta = {
    name: imageFileName,
    parents: [auth.folderId],
  };
  const imageRes = await multipartUpload(
    auth.accessToken,
    imageMeta,
    blob,
    mimeType
  );

  const metadata = {
    recordId: opts.recordId,
    capturedAt: new Date().toISOString(),
    provider: opts.provider,
    userNote: opts.userNote,
    imageFileId: imageRes.id,
    imageWebViewLink: imageRes.webViewLink,
    analysis: opts.analysis,
  };
  const metaBlob = new Blob([JSON.stringify(metadata, null, 2)], {
    type: "application/json",
  });
  const metaRes = await multipartUpload(
    auth.accessToken,
    { name: `${baseFileName}.json`, parents: [auth.folderId] },
    metaBlob,
    "application/json"
  );

  return {
    imageFileId: imageRes.id,
    imageWebViewLink: imageRes.webViewLink,
    metadataFileId: metaRes.id,
  };
}

async function multipartUpload(
  accessToken: string,
  metadata: object,
  fileBlob: Blob,
  mimeType: string
): Promise<{ id: string; webViewLink?: string }> {
  const boundary = `boundary_${Math.random().toString(36).slice(2)}`;
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const fileBuffer = await fileBlob.arrayBuffer();

  const head =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n`;

  const tail = closeDelimiter;

  const headBytes = new TextEncoder().encode(head);
  const tailBytes = new TextEncoder().encode(tail);
  const body = new Uint8Array(headBytes.length + fileBuffer.byteLength + tailBytes.length);
  body.set(headBytes, 0);
  body.set(new Uint8Array(fileBuffer), headBytes.length);
  body.set(tailBytes, headBytes.length + fileBuffer.byteLength);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Drive 업로드 실패 (${res.status}): ${errText.slice(0, 200)}`);
  }
  return res.json();
}

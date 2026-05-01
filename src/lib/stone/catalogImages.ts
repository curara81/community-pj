import type { DriveAuth } from "./types";

const LOCAL_KEY = "stone-app:catalog-image-map";
const FOLDER_NAME = "StoneIdentifier";
const SUBFOLDER = "catalog-images";
const MAP_FILE = "catalog-image-map.json";

export interface CatalogImageMap {
  // productName (uppercase) -> Drive fileId
  [productName: string]: string;
}

const blobUrlCache = new Map<string, string>(); // fileId -> blob URL
const inflightFetches = new Map<string, Promise<string | null>>();

let bundledIndex: Record<string, string> | null = null;
let bundledIndexPromise: Promise<Record<string, string>> | null = null;

export async function loadBundledImageIndex(): Promise<Record<string, string>> {
  if (bundledIndex) return bundledIndex;
  if (bundledIndexPromise) return bundledIndexPromise;
  bundledIndexPromise = (async () => {
    try {
      const res = await fetch("/catalog-thumb-index.json", { cache: "force-cache" });
      if (!res.ok) return {};
      const data = (await res.json()) as Record<string, string>;
      bundledIndex = data;
      return data;
    } catch {
      return {};
    } finally {
      bundledIndexPromise = null;
    }
  })();
  return bundledIndexPromise;
}

export function safeProductKey(productName: string): string {
  return productName
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/È/g, "E")
    .replace(/É/g, "E")
    .replace(/À/g, "A")
    .replace(/'/g, "");
}

export function loadLocalImageMap(): CatalogImageMap {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as CatalogImageMap) : {};
  } catch {
    return {};
  }
}

export function saveLocalImageMap(map: CatalogImageMap): void {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(map));
}

async function ensureFolder(auth: DriveAuth, name: string, parentId?: string): Promise<string> {
  const parentClause = parentId ? `'${parentId}' in parents and ` : "";
  const folderQuery = encodeURIComponent(
    `name='${name}' and mimeType='application/vnd.google-apps.folder' and ${parentClause}trashed=false`
  );
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${folderQuery}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${auth.accessToken}` } }
  );
  if (res.ok) {
    const json = await res.json();
    if (json.files?.[0]?.id) return json.files[0].id;
  }
  const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });
  if (!createRes.ok) throw new Error(`폴더 생성 실패: ${name}`);
  const json = await createRes.json();
  return json.id as string;
}

async function ensureCatalogImagesFolder(auth: DriveAuth): Promise<string> {
  const stoneFolder = await ensureFolder(auth, FOLDER_NAME);
  return ensureFolder(auth, SUBFOLDER, stoneFolder);
}

async function findFileInFolder(
  auth: DriveAuth,
  folderId: string,
  fileName: string
): Promise<string | null> {
  const q = encodeURIComponent(
    `name='${fileName}' and '${folderId}' in parents and trashed=false`
  );
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${auth.accessToken}` } }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.files?.[0]?.id ?? null;
}

async function multipartUpload(
  accessToken: string,
  metadata: object,
  blob: Blob,
  mimeType: string
): Promise<{ id: string }> {
  const boundary = `boundary_${Math.random().toString(36).slice(2)}`;
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;
  const fileBuffer = await blob.arrayBuffer();
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
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
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

export async function fetchCatalogImageMapFromDrive(
  auth: DriveAuth
): Promise<CatalogImageMap | null> {
  const stoneFolder = await ensureFolder(auth, FOLDER_NAME);
  const fileId = await findFileInFolder(auth, stoneFolder, MAP_FILE);
  if (!fileId) return null;
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    { headers: { Authorization: `Bearer ${auth.accessToken}` } }
  );
  if (!res.ok) return null;
  try {
    const json = await res.json();
    return (json.items || json) as CatalogImageMap;
  } catch {
    return null;
  }
}

export async function saveCatalogImageMapToDrive(
  auth: DriveAuth,
  map: CatalogImageMap
): Promise<void> {
  const stoneFolder = await ensureFolder(auth, FOLDER_NAME);
  const existingId = await findFileInFolder(auth, stoneFolder, MAP_FILE);
  const body = JSON.stringify(
    { schemaVersion: 1, updatedAt: new Date().toISOString(), items: map },
    null,
    2
  );
  if (existingId) {
    const res = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${existingId}?uploadType=media`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      }
    );
    if (!res.ok) throw new Error(`Drive 매핑 업데이트 실패 (${res.status})`);
    return;
  }
  const blob = new Blob([body], { type: "application/json" });
  await multipartUpload(
    auth.accessToken,
    { name: MAP_FILE, parents: [stoneFolder] },
    blob,
    "application/json"
  );
}

export async function uploadCatalogImage(
  auth: DriveAuth,
  productName: string,
  file: File
): Promise<string> {
  const folderId = await ensureCatalogImagesFolder(auth);
  const safeName = productName.toUpperCase().replace(/[^A-Z0-9._-]+/g, "_");
  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const fileName = `${safeName}.${ext}`;

  // Replace existing file with same name (delete then upload)
  const existing = await findFileInFolder(auth, folderId, fileName);
  if (existing) {
    await fetch(`https://www.googleapis.com/drive/v3/files/${existing}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });
  }

  const result = await multipartUpload(
    auth.accessToken,
    { name: fileName, parents: [folderId] },
    file,
    file.type || "image/jpeg",
  );
  return result.id;
}

export async function fetchCatalogImageBlobUrl(
  auth: DriveAuth,
  fileId: string
): Promise<string | null> {
  if (blobUrlCache.has(fileId)) return blobUrlCache.get(fileId)!;
  if (inflightFetches.has(fileId)) return inflightFetches.get(fileId)!;

  const promise = (async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      );
      if (!res.ok) return null;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlCache.set(fileId, url);
      return url;
    } catch {
      return null;
    } finally {
      inflightFetches.delete(fileId);
    }
  })();

  inflightFetches.set(fileId, promise);
  return promise;
}

export function clearImageCache(): void {
  blobUrlCache.forEach((url) => URL.revokeObjectURL(url));
  blobUrlCache.clear();
}

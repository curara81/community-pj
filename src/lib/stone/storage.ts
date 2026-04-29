import type { ApiKeys, ApiProvider, DriveAuth, StoneRecord } from "./types";

const KEY_PREFIX = "stone-app:";
const KEYS_STORAGE = `${KEY_PREFIX}api-keys`;
const DRIVE_AUTH_STORAGE = `${KEY_PREFIX}drive-auth`;
const HISTORY_STORAGE = `${KEY_PREFIX}history`;
const PREFERRED_PROVIDER = `${KEY_PREFIX}preferred-provider`;

export function loadApiKeys(): ApiKeys {
  try {
    const raw = localStorage.getItem(KEYS_STORAGE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveApiKeys(keys: ApiKeys): void {
  localStorage.setItem(KEYS_STORAGE, JSON.stringify(keys));
}

export function loadDriveAuth(): DriveAuth | null {
  try {
    const raw = localStorage.getItem(DRIVE_AUTH_STORAGE);
    if (!raw) return null;
    const auth = JSON.parse(raw) as DriveAuth;
    if (auth.expiresAt && auth.expiresAt < Date.now()) return null;
    return auth;
  } catch {
    return null;
  }
}

export function saveDriveAuth(auth: DriveAuth): void {
  localStorage.setItem(DRIVE_AUTH_STORAGE, JSON.stringify(auth));
}

export function clearDriveAuth(): void {
  localStorage.removeItem(DRIVE_AUTH_STORAGE);
}

export function loadHistory(): StoneRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(records: StoneRecord[]): void {
  const trimmed = records.slice(0, 100);
  localStorage.setItem(HISTORY_STORAGE, JSON.stringify(trimmed));
}

export function addHistoryRecord(record: StoneRecord): void {
  const all = loadHistory();
  saveHistory([record, ...all]);
}

const KNOWN_PROVIDERS: ApiProvider[] = [
  "claude-sonnet",
  "claude-haiku",
  "claude",
  "gemini",
];

export function loadPreferredProvider(): ApiProvider | null {
  const v = localStorage.getItem(PREFERRED_PROVIDER);
  return KNOWN_PROVIDERS.includes(v as ApiProvider) ? (v as ApiProvider) : null;
}

export function savePreferredProvider(provider: ApiProvider): void {
  localStorage.setItem(PREFERRED_PROVIDER, provider);
}

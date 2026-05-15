from __future__ import annotations

import os
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]


@dataclass(frozen=True)
class Settings:
    gcp_project_id: str
    gcp_location: str
    google_application_credentials: Path
    notebooklm_storage_state: Path
    youtube_api_key: str | None
    gemini_model: str
    outputs_dir: Path


def _resolve_path(env_var: str, default: str) -> Path:
    raw = os.environ.get(env_var, default)
    return Path(raw) if os.path.isabs(raw) else ROOT / raw


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    load_dotenv(ROOT / ".env")

    cred_path = _resolve_path("GOOGLE_APPLICATION_CREDENTIALS", "secrets/service-account.json")
    storage_path = _resolve_path("NOTEBOOKLM_STORAGE_STATE", "secrets/storage_state.json")

    outputs = ROOT / "outputs"
    outputs.mkdir(exist_ok=True)

    # Google SDKs read this from env, not from a function arg, so the absolute
    # path has to be exported before any google.cloud client is constructed.
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(cred_path)

    return Settings(
        gcp_project_id=os.environ.get("GCP_PROJECT_ID", ""),
        gcp_location=os.environ.get("GCP_LOCATION", "us-central1"),
        google_application_credentials=cred_path,
        notebooklm_storage_state=storage_path,
        youtube_api_key=os.environ.get("YOUTUBE_API_KEY") or None,
        gemini_model=os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"),
        outputs_dir=outputs,
    )

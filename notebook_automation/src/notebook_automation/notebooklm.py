from __future__ import annotations

from dataclasses import dataclass

from notebooklm import NotebookLMClient

from .config import get_settings


@dataclass
class NotebookHandle:
    notebook_id: str
    title: str


def _connect() -> NotebookLMClient:
    settings = get_settings()
    if not settings.notebooklm_storage_state.exists():
        raise FileNotFoundError(
            f"NotebookLM storage_state not found at {settings.notebooklm_storage_state}. "
            f"Run `python -m notebook_automation.cli auth-notebooklm --help` for setup."
        )
    return NotebookLMClient.from_storage(path=str(settings.notebooklm_storage_state))


def create_notebook(title: str) -> NotebookHandle:
    with _connect() as client:
        notebooks_api = client.notebooks  # type: ignore[attr-defined]
        nb = notebooks_api.create(title=title)
        return NotebookHandle(notebook_id=nb.id, title=nb.title)


def add_url_source(notebook_id: str, url: str, *, wait: bool = True) -> str:
    with _connect() as client:
        sources_api = client.sources  # type: ignore[attr-defined]
        src = sources_api.add_url(notebook_id=notebook_id, url=url, wait=wait, wait_timeout=180.0)
        return src.id


def add_text_source(notebook_id: str, title: str, content: str, *, wait: bool = True) -> str:
    with _connect() as client:
        sources_api = client.sources  # type: ignore[attr-defined]
        src = sources_api.add_text(notebook_id=notebook_id, title=title, content=content, wait=wait, wait_timeout=180.0)
        return src.id


def ask(notebook_id: str, question: str) -> str:
    with _connect() as client:
        chat_api = client.chat  # type: ignore[attr-defined]
        result = chat_api.ask(notebook_id=notebook_id, question=question)
        return result.answer if hasattr(result, "answer") else str(result)


def generate_briefing(notebook_id: str, language: str = "ko") -> str:
    with _connect() as client:
        artifacts_api = client.artifacts  # type: ignore[attr-defined]
        status = artifacts_api.generate_report(notebook_id=notebook_id, language=language)
        final = artifacts_api.wait_for_completion(notebook_id=notebook_id, task_id=status.task_id, timeout=600.0)
        return getattr(final, "artifact_id", "") or ""

from __future__ import annotations

from contextlib import contextmanager
from dataclasses import dataclass
from typing import Iterator

from notebooklm import NotebookLMClient

from .config import get_settings

SOURCE_TIMEOUT_S = 180.0
BRIEFING_TIMEOUT_S = 600.0


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


class Session:
    def __init__(self, client: NotebookLMClient) -> None:
        self._client = client

    def create_notebook(self, title: str) -> NotebookHandle:
        nb = self._client.notebooks.create(title=title)
        return NotebookHandle(notebook_id=nb.id, title=nb.title)

    def add_url_source(self, notebook_id: str, url: str, *, wait: bool = True) -> str:
        src = self._client.sources.add_url(
            notebook_id=notebook_id, url=url, wait=wait, wait_timeout=SOURCE_TIMEOUT_S,
        )
        return src.id

    def add_text_source(self, notebook_id: str, title: str, content: str, *, wait: bool = True) -> str:
        src = self._client.sources.add_text(
            notebook_id=notebook_id, title=title, content=content, wait=wait, wait_timeout=SOURCE_TIMEOUT_S,
        )
        return src.id

    def ask(self, notebook_id: str, question: str) -> str:
        result = self._client.chat.ask(notebook_id=notebook_id, question=question)
        return result.answer if hasattr(result, "answer") else str(result)

    def generate_briefing(self, notebook_id: str, language: str = "ko") -> str:
        status = self._client.artifacts.generate_report(notebook_id=notebook_id, language=language)
        final = self._client.artifacts.wait_for_completion(
            notebook_id=notebook_id, task_id=status.task_id, timeout=BRIEFING_TIMEOUT_S,
        )
        return getattr(final, "artifact_id", "") or ""


@contextmanager
def session() -> Iterator[Session]:
    with _connect() as client:
        yield Session(client)


def ask(notebook_id: str, question: str) -> str:
    with session() as s:
        return s.ask(notebook_id, question)

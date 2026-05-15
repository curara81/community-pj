from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager
from dataclasses import dataclass
from typing import AsyncIterator

from notebooklm import NotebookLMClient

from .config import get_settings

SOURCE_TIMEOUT_S = 180.0


@dataclass
class NotebookHandle:
    notebook_id: str
    title: str


async def _connect() -> NotebookLMClient:
    settings = get_settings()
    if not settings.notebooklm_storage_state.exists():
        raise FileNotFoundError(
            f"NotebookLM storage_state not found at {settings.notebooklm_storage_state}. "
            f"Generate it with Playwright (see notebook_automation/README.md §3)."
        )
    return await NotebookLMClient.from_storage(path=str(settings.notebooklm_storage_state))


class Session:
    def __init__(self, client: NotebookLMClient) -> None:
        self._client = client

    async def create_notebook(self, title: str) -> NotebookHandle:
        nb = await self._client.notebooks.create(title=title)
        return NotebookHandle(notebook_id=nb.id, title=nb.title)

    async def add_url_source(self, notebook_id: str, url: str, *, wait: bool = True) -> str:
        src = await self._client.sources.add_url(
            notebook_id=notebook_id, url=url, wait=wait, wait_timeout=SOURCE_TIMEOUT_S,
        )
        return src.id

    async def add_text_source(self, notebook_id: str, title: str, content: str, *, wait: bool = True) -> str:
        src = await self._client.sources.add_text(
            notebook_id=notebook_id, title=title, content=content, wait=wait, wait_timeout=SOURCE_TIMEOUT_S,
        )
        return src.id

    async def ask(self, notebook_id: str, question: str) -> str:
        result = await self._client.chat.ask(notebook_id=notebook_id, question=question)
        return result.answer


@asynccontextmanager
async def session() -> AsyncIterator[Session]:
    client = await _connect()
    async with client:
        yield Session(client)


def ask(notebook_id: str, question: str) -> str:
    async def _run() -> str:
        async with session() as s:
            return await s.ask(notebook_id, question)
    return asyncio.run(_run())

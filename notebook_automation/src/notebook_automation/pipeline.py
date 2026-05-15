from __future__ import annotations

import json
from dataclasses import dataclass, asdict
from datetime import datetime

from rich.console import Console

from . import notebooklm, youtube
from .config import get_settings

console = Console()


@dataclass
class PipelineResult:
    notebook_id: str
    notebook_title: str
    videos: list[dict]
    source_ids: list[str]


def youtube_to_notebooklm(
    query: str,
    *,
    max_results: int = 5,
    notebook_title: str | None = None,
    add_transcripts_as_text: bool = True,
) -> PipelineResult:
    settings = get_settings()

    console.log(f"[cyan]Searching YouTube[/]: {query!r} (top {max_results})")
    videos = youtube.search_videos(query, max_results=max_results)
    if not videos:
        raise RuntimeError(f"No YouTube videos found for query: {query}")

    title = notebook_title or f"{query} - {datetime.now().strftime('%Y-%m-%d %H:%M')}"
    console.log(f"[cyan]Creating NotebookLM notebook[/]: {title}")
    nb = notebooklm.create_notebook(title)
    console.log(f"  notebook_id = {nb.notebook_id}")

    source_ids: list[str] = []
    for v in videos:
        console.log(f"[cyan]Adding URL source[/]: {v.title}")
        try:
            sid = notebooklm.add_url_source(nb.notebook_id, v.watch_url, wait=True)
            source_ids.append(sid)
        except Exception as e:
            console.log(f"  [yellow]URL source failed, falling back to transcript[/]: {e}")
            if not add_transcripts_as_text:
                continue
            transcript = youtube.fetch_transcript(v.video_id)
            if not transcript:
                console.log("  [red]No transcript available, skipping[/]")
                continue
            sid = notebooklm.add_text_source(nb.notebook_id, title=v.title, content=transcript, wait=True)
            source_ids.append(sid)

    result = PipelineResult(
        notebook_id=nb.notebook_id,
        notebook_title=nb.title,
        videos=[{"video_id": v.video_id, "title": v.title, "url": v.watch_url} for v in videos],
        source_ids=source_ids,
    )

    out_path = settings.outputs_dir / f"pipeline_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    out_path.write_text(json.dumps(asdict(result), ensure_ascii=False, indent=2), encoding="utf-8")
    console.log(f"[green]Done[/] → {out_path}")
    return result

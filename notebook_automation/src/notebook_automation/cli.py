from __future__ import annotations

import json
from dataclasses import asdict

import typer
from rich import print

from . import notebooklm as nblm
from . import pipeline as pipe
from . import youtube as yt
from .config import get_settings

app = typer.Typer(no_args_is_help=True, help="YouTube → NotebookLM automation")


@app.command("doctor")
def doctor() -> None:
    """Check credentials and environment."""
    s = get_settings()
    print(f"GCP project: [bold]{s.gcp_project_id or '(unset)'}[/]")
    print(f"GCP location: {s.gcp_location}")

    checks = [
        (f"GOOGLE_APPLICATION_CREDENTIALS ({s.google_application_credentials})",
         s.google_application_credentials.exists()),
        (f"NotebookLM storage_state ({s.notebooklm_storage_state})",
         s.notebooklm_storage_state.exists()),
        ("YOUTUBE_API_KEY", bool(s.youtube_api_key)),
    ]
    ok = True
    for label, passed in checks:
        print(f"{label}: {'[green]ok[/]' if passed else '[red]MISSING[/]'}")
        if not passed:
            ok = False
    raise typer.Exit(0 if ok else 1)


@app.command("yt-search")
def yt_search(query: str, n: int = 5) -> None:
    """Search YouTube only (no NotebookLM)."""
    for v in yt.search_videos(query, max_results=n):
        print(f"- [bold]{v.title}[/] · {v.channel} · {v.url}")


@app.command("run")
def run(
    query: str = typer.Argument(..., help="YouTube search query"),
    n: int = typer.Option(5, "-n", "--num", help="number of videos"),
    title: str | None = typer.Option(None, "--title", help="notebook title"),
) -> None:
    """Search YouTube → create notebook → add sources."""
    result = pipe.youtube_to_notebooklm(query, max_results=n, notebook_title=title)
    print(json.dumps(asdict(result), ensure_ascii=False, indent=2))


@app.command("ask")
def ask(notebook_id: str, question: str) -> None:
    """Ask a question against an existing notebook."""
    print(nblm.ask(notebook_id, question))


def main() -> None:
    app()


if __name__ == "__main__":
    main()

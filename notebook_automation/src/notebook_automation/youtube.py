from __future__ import annotations

import os
from dataclasses import dataclass

import httplib2
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    NoTranscriptFound,
    TranscriptsDisabled,
    VideoUnavailable,
)

from .config import get_settings


def _http() -> httplib2.Http:
    # httplib2 ships its own cacerts.txt and ignores SSL_CERT_FILE / REQUESTS_CA_BUNDLE,
    # so we forward those to it explicitly — required behind a TLS-intercepting egress.
    ca = os.environ.get("REQUESTS_CA_BUNDLE") or os.environ.get("SSL_CERT_FILE")
    return httplib2.Http(ca_certs=ca) if ca else httplib2.Http()


@dataclass
class Video:
    video_id: str
    title: str
    channel: str
    published_at: str
    description: str
    url: str

    @property
    def watch_url(self) -> str:
        return f"https://www.youtube.com/watch?v={self.video_id}"


def search_videos(query: str, max_results: int = 5, *, order: str = "relevance") -> list[Video]:
    settings = get_settings()
    if not settings.youtube_api_key:
        raise RuntimeError("YOUTUBE_API_KEY is not set in .env")

    client = build("youtube", "v3", developerKey=settings.youtube_api_key, http=_http(), cache_discovery=False)
    resp = client.search().list(
        q=query,
        part="snippet",
        type="video",
        maxResults=max_results,
        order=order,
    ).execute()

    out: list[Video] = []
    for item in resp.get("items", []):
        vid = item["id"]["videoId"]
        sn = item["snippet"]
        out.append(Video(
            video_id=vid,
            title=sn["title"],
            channel=sn["channelTitle"],
            published_at=sn["publishedAt"],
            description=sn.get("description", ""),
            url=f"https://www.youtube.com/watch?v={vid}",
        ))
    return out


def fetch_transcript(video_id: str, languages: list[str] | None = None) -> str | None:
    langs = languages or ["ko", "en"]
    try:
        api = YouTubeTranscriptApi()
        fetched = api.fetch(video_id, languages=langs)
        return "\n".join(snippet.text for snippet in fetched.snippets)
    except (TranscriptsDisabled, NoTranscriptFound, VideoUnavailable):
        return None

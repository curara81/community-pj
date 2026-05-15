from __future__ import annotations

from dataclasses import dataclass

from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    NoTranscriptFound,
    TranscriptsDisabled,
    VideoUnavailable,
)

from .config import get_settings


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

    client = build("youtube", "v3", developerKey=settings.youtube_api_key, cache_discovery=False)
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

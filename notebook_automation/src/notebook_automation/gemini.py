from __future__ import annotations

from google import genai
from google.genai import types as genai_types

from .config import get_settings


def _client() -> genai.Client:
    settings = get_settings()
    return genai.Client(
        vertexai=True,
        project=settings.gcp_project_id,
        location=settings.gcp_location,
    )


def summarize(text: str, *, prompt: str | None = None) -> str:
    settings = get_settings()
    client = _client()
    base = prompt or (
        "Summarize the following transcript into key bullet points in Korean. "
        "Capture the main argument, supporting evidence, and any actionable takeaways."
    )
    resp = client.models.generate_content(
        model=settings.gemini_model,
        contents=[genai_types.Content(role="user", parts=[genai_types.Part.from_text(text=f"{base}\n\n---\n{text}")])],
    )
    return resp.text or ""


def analyze_briefing(briefing_text: str, question: str) -> str:
    settings = get_settings()
    client = _client()
    resp = client.models.generate_content(
        model=settings.gemini_model,
        contents=[genai_types.Content(role="user", parts=[genai_types.Part.from_text(
            text=f"Briefing:\n{briefing_text}\n\nQuestion: {question}\nAnswer in Korean."
        )])],
    )
    return resp.text or ""

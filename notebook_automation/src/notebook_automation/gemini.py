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


def _generate(text: str) -> str:
    resp = _client().models.generate_content(
        model=get_settings().gemini_model,
        contents=[genai_types.Content(role="user", parts=[genai_types.Part.from_text(text=text)])],
    )
    return resp.text or ""


def summarize(text: str, *, prompt: str | None = None) -> str:
    base = prompt or (
        "Summarize the following transcript into key bullet points in Korean. "
        "Capture the main argument, supporting evidence, and any actionable takeaways."
    )
    return _generate(f"{base}\n\n---\n{text}")


def analyze_briefing(briefing_text: str, question: str) -> str:
    return _generate(f"Briefing:\n{briefing_text}\n\nQuestion: {question}\nAnswer in Korean.")

#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

VENV=".venv"
MARKER="$VENV/.installed"

if [ ! -d "$VENV" ]; then
    python3 -m venv "$VENV"
fi

# shellcheck disable=SC1091
source "$VENV/bin/activate"

if [ ! -f "$MARKER" ] || [ requirements.txt -nt "$MARKER" ]; then
    pip install --quiet --upgrade pip
    pip install --quiet -r requirements.txt
    touch "$MARKER"
fi

mkdir -p secrets outputs

if [ ! -f .env ] && [ -f .env.example ]; then
    cp .env.example .env
fi

echo "[notebook_automation] env ready. Activate with: source notebook_automation/.venv/bin/activate"

if [ ! -f secrets/service-account.json ]; then
    echo "[notebook_automation] WARNING: secrets/service-account.json missing."
fi
if [ ! -f secrets/storage_state.json ]; then
    echo "[notebook_automation] WARNING: secrets/storage_state.json missing (NotebookLM cookies)."
fi

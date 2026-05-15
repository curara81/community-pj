# notebook_automation

YouTube → NotebookLM 자동화 파이프라인.

## 구조

```
notebook_automation/
├── requirements.txt        # 7개 핵심 패키지 + 보조 라이브러리
├── .env.example            # 환경변수 템플릿
├── secrets/                # 인증 파일 보관 (gitignored)
│   ├── service-account.json   # GCP 서비스 계정 키
│   └── storage_state.json     # NotebookLM 브라우저 쿠키
├── scripts/
│   └── bootstrap.sh        # venv + pip install (SessionStart 훅이 호출)
└── src/notebook_automation/
    ├── config.py
    ├── youtube.py
    ├── notebooklm.py
    ├── gemini.py
    ├── pipeline.py
    └── cli.py
```

## 한 번 셋업하는 것

### 1. GCP 서비스 계정 키
1. GCP Console → IAM → 서비스 계정 → 키 생성 (JSON)
2. 다운받은 JSON을 `notebook_automation/secrets/service-account.json` 으로 저장
3. 필요한 API 활성화: YouTube Data API v3, Vertex AI (Gemini), Translate, Speech-to-Text, Document AI, Storage, BigQuery
4. 서비스 계정에 역할 부여: `Vertex AI User`, `Storage Object User`, `BigQuery Data Viewer` 등

### 2. YouTube Data API 키
- GCP Console → API & Services → Credentials → API key
- `.env` 의 `YOUTUBE_API_KEY` 에 설정

### 3. NotebookLM 쿠키 (storage_state.json)
공식 API가 없으므로 브라우저 쿠키 추출이 필요:

**방법 A — 로컬 PC에서 Playwright로 한 번 로그인:**
```bash
pip install playwright && playwright install chromium
python -c "
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=False)
    ctx = b.new_context()
    page = ctx.new_page()
    page.goto('https://notebooklm.google.com')
    input('Log in then press Enter...')
    ctx.storage_state(path='storage_state.json')
"
```
생성된 `storage_state.json` 을 `notebook_automation/secrets/` 로 옮김.

**방법 B — 브라우저 익스텐션 (Get cookies.txt 등):**
NotebookLM 도메인 쿠키를 JSON 으로 export 후 `notebooklm-py` 형식에 맞게 변환.

### 4. `.env` 작성
```bash
cp .env.example .env
# 편집해서 GCP_PROJECT_ID 등 채우기
```

## 사용

```bash
source notebook_automation/.venv/bin/activate

# 1) 인증 상태 점검
nbauto doctor

# 2) 유튜브 검색만
nbauto yt-search "AI 에이전트 트렌드" --n 5

# 3) 풀 파이프라인
nbauto run "AI 에이전트 트렌드" --n 5 --title "AI 에이전트 리서치"

# 4) 만들어진 노트북에 질문
nbauto ask <notebook_id> "핵심 트렌드 3가지 요약해줘"
```

## 모바일에서 쓸 때

이 리포 루트에 `.claude/settings.json` SessionStart 훅이 있어서, Claude Code 세션 시작 시 자동으로 venv 생성 + `pip install -r requirements.txt` 실행됩니다.

**단** `secrets/` 안의 파일은 gitignore 되어있어 매 세션 새 샌드박스에 없습니다. 폰에서 트리거하려면 매 세션 시작 시 secrets 두 파일(`service-account.json`, `storage_state.json`)을 어디서 가져올지 결정해야 함. 옵션:
- 매번 채팅에 붙여넣기 → 제가 파일로 저장
- (추후) Supabase Edge Function 브로커로 자동 복원

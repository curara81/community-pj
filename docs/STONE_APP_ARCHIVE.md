# 석재 식별기 (Stone Identifier) — 아카이브 및 재개 가이드

**마지막 활성**: 2026-09-20
**소유자**: curara81@gmail.com (Lapis Global)
**브랜치**: `claude/stone-identifier-app-43bEH`
**상태**: Vercel 배포 종료됨, 코드/데이터는 보존

이 문서는 앱 사용을 중단하면서 향후 재개를 위해 남기는 백업 요약입니다.

---

## 1. 앱 개요

**목적**: 이탈리아 빅슬랩 (NUOVOCORSO) 유통 업무에서
- 현장 사진으로 석재 식별
- 카탈로그에서 매칭 제품 추천
- 검색으로 석재명 조회
- 슬랩 매수 계산

**대상 사용자**: Lapis Global 내부 사용 (개인/팀 도구)

**앱 URL** (재배포 시): `https://stone-app-six.vercel.app/stone` — 배포 종료됨. 재배포 필요.

---

## 2. 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | Vite + React 18 + TypeScript |
| UI | shadcn/ui + Tailwind CSS |
| 라우팅 | React Router (lazy loading) |
| 상태 | React useState + localStorage |
| 배포 (당시) | Vercel (stone-app 프로젝트) |
| 저장소 | GitHub `curara81/community-pj` 브랜치 `claude/stone-identifier-app-43bEH` |
| 클라우드 데이터 | Google Drive `StoneIdentifier/` 폴더 |
| 카탈로그 이미지 | `/public/catalog-thumbs/` 104장 (NUOVOCORSO 2025 PDF에서 추출) |

---

## 3. 주요 기능 (구현 완료 기준)

### 분석 (3가지 모드)
- **정밀** (Claude Sonnet 4.6) — ~40원/회, 정확도 우선
- **빠른** (Claude Haiku 4.5) — ~11원/회, 속도 우선
- **무료** (Cloud Vision + Gemini 보강) — Cloud 크레딧 + Gemini 무료 티어

### 이미지 입력
- 카메라 촬영 / 갤러리 선택
- 자르기 (react-easy-crop, 갤러리 자동 오픈)
- 최대 3장 동시 분석 (다각도 종합)

### 결과 카드
- 1순위 (풀 정보) + 2·3순위 후보
- 카테고리 컬러 칩 (대리석/화강석/라임스톤 등)
- 산지 / 시세 / 유통사
- 용도 추천 (바닥/벽/외부/카운터탑/욕실) — 한국 기후 반영
- NUOVOCORSO 카탈로그 매칭 (비슷한 룩 + 어울리는 조합) — 각 제품 썸네일 포함
- 위키피디아 썸네일 + 구글 이미지 링크

### 검색 탭
- 한글/영문/산지명 입력
- Cloud Translate (한→영) → Gemini + googleSearch 그라운딩
- 출처 링크 + 카탈로그 매칭

### 기록 탭
- Drive 자동 동기화 (다기기 공유)
- 검색 / 필터 (카테고리, 신뢰도, 확인됨)
- 수동 편집 (AI 오답 수정)
- "이 답이 맞아요" 확인 → 사용자 라이브러리로 축적 → 다음 분석 시 AI에 힌트로 주입

### 부가 기능
- 슬랩 매수 계산기 (m²/평/ft², NUOVOCORSO 프리셋)
- 결과 이미지로 공유/다운로드 (Web Share API)
- 카탈로그 이미지 관리 (일괄 업로드)
- 다크 모드 (라이트/다크/자동)
- PWA 홈 화면 설치 (아이콘 + 매니페스트)
- iOS Safe Area 처리
- Lapis Global 저작권 푸터

---

## 4. API 키 / 서비스 목록

**재개 시 필요한 것들:**

| 서비스 | 용도 | 발급처 |
|---|---|---|
| Anthropic Claude | 정밀 + 빠른 분석 | https://console.anthropic.com/settings/keys |
| Google Gemini | 검색 그라운딩 + Cloud Vision 보강 | https://aistudio.google.com/apikey |
| Google Cloud API Key | Translate + Vision + Custom Search | https://console.cloud.google.com/apis/credentials |
| Google Custom Search Engine ID | 이미지 검색 (선택) | https://programmablesearchengine.google.com/ |
| Google OAuth Client ID | Drive 동기화 | https://console.cloud.google.com/apis/credentials |

**Google Cloud 프로젝트**: `Stone-App` (`stone-app-494806`) — 크레딧 만료 2026-07-30 (이미 지났음, 만료됨)

**Cloud API 활성화 필요**:
- Cloud Translation API
- Cloud Vision API
- Custom Search API
- Google Drive API

---

## 5. 저장 위치

### 코드
- **GitHub**: `curara81/community-pj` 브랜치 `claude/stone-identifier-app-43bEH`
- main 브랜치는 커뮤니티 사이트 (다른 프로젝트)

### 데이터
- **Google Drive**: `StoneIdentifier/` 폴더 (본인 계정)
  - `stone-app-settings.json` — API 키 (암호화 안 됨)
  - `stone-app-history.json` — 분석 기록 메타데이터
  - `catalog-image-map.json` — 사용자 업로드 카탈로그 이미지 매핑
  - `catalog-images/` — 사용자 커스텀 카탈로그 이미지
  - `[timestamp]__stonename.jpg` — 분석한 원본 사진들
  - `[timestamp]__stonename.json` — 분석 결과 개별 파일

### 카탈로그
- **번들 리소스**: `/public/catalog.json` (104개 제품 스키마)
- **번들 썸네일**: `/public/catalog-thumbs/` (104장 JPG)
- **원본 PDF**: NUOVOCORSO_Catalogo_2025.pdf (본인 Drive)
- **재파싱 스크립트**: `scripts/parse_catalog.py`, `scripts/map_pages.py`, `scripts/render_thumbs.py`

---

## 6. 향후 재개 절차 (1시간 안에 복구 가능)

### 옵션 A: Vercel 재배포 (기존 URL 못 씀)

1. Vercel 대시보드 → New Project → GitHub `curara81/community-pj` 선택
2. **Production Branch**: `claude/stone-identifier-app-43bEH`
3. Build 명령 기본값 그대로 (`npm run build`, output `dist`)
4. Deploy → 새 URL 발급 (예: `stone-app-xxx.vercel.app`)
5. Google OAuth Client → 승인된 JavaScript 원본에 새 URL 추가
6. `/stone` 접속 → ⚙️ 설정 → API 키들 재입력
7. Drive 연결 → 이전 설정/기록 자동 로드

### 옵션 B: 로컬 실행 (Mac/PC)

```bash
git clone https://github.com/curara81/community-pj.git
cd community-pj
git checkout claude/stone-identifier-app-43bEH
npm install
npm run dev
# 브라우저 → http://localhost:8080/stone
```

### API 키 재발급 필요

이전 대화에서 노출된 Gemini 키 (`AIzaSy...4mKA`)는 폐기했어야 함. 다른 키들도 재개 시 신규 발급 권장.

---

## 7. 알려진 제약 / 향후 아이디어

**제약**:
- 카탈로그 이미지는 NUOVOCORSO 저작물 (본인 유통 업체 자료라 내부 사용 무방)
- Cloud Vision 단독 결과는 라벨 수준 (Gemini 없으면 부족)
- Gemini 무료 티어 분당 15회 한도
- Google "Search the entire web" CSE 옵션 종료됨 (2025년)

**미구현 아이디어** (재개 시 고려):
- OCR (카탈로그/라벨 사진 → 제품명 추출)
- 여러 사진 비교 모드 (두 돌 나란히)
- 카탈로그 내 직접 검색 (제품명/색상/마감 필터)
- 고객/프로젝트 태그 (분석에 프로젝트 라벨링)
- 크롤링 기반 이미지 DB (법적 검토 후)
- 팀 공유 라이브러리 (Drive 폴더 공유)

**논의됐던 대체 AI**:
- Perplexity sonar (검색 특화, 유료)
- OpenRouter 무료 모델 (품질 편차)
- 로컬 Ollama LLaVA (PC 전용)

---

## 8. 관련 세션

주요 대화 세션: `https://claude.ai/code/session_01KwD6vJxBRQZ3RBMe3tcLbr`
(Claude Code 세션 링크 — 나중에도 히스토리 조회 가능 여부는 Anthropic 정책 따름)

---

## 9. 정리 체크리스트 (아카이브 시점)

- [x] 소스 코드 GitHub 브랜치 보존
- [x] 카탈로그 데이터 (JSON + 썸네일) 브랜치에 커밋
- [x] 재파싱 스크립트 `scripts/` 보관
- [x] 이 문서 (`docs/STONE_APP_ARCHIVE.md`) 커밋
- [ ] Vercel 배포 종료 (사용자 수동)
- [ ] Google Drive `StoneIdentifier/` 폴더 → 유지 (본인 자산)
- [ ] API 키 → 유지하되 재개 시 신규 발급 권장
- [ ] Google Cloud 프로젝트 → 유지 (크레딧 만료됨)

# Meadow - 웹 접근성 자동 진단 서비스

URL만 입력하면 웹사이트의 접근성 문제를 즉시 확인할 수 있는 무료 서비스입니다.

## 주요 기능

- ⚡ **빠른 진단**: URL 입력 후 30초 이내에 접근성 문제 확인
- 📋 **WCAG 2.1 기준**: 국제 웹 접근성 표준 WCAG 2.1 Level A, AA 기준 진단
- 🇰🇷 **한국어 가이드**: 접근성 문제와 해결 방법을 명확한 한국어로 제공
- 📄 **리포트 다운로드**: HTML 형식으로 진단 결과 다운로드

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **분석 엔진**: axe-core (접근성 테스트), Playwright (브라우저 자동화)
- **Database**: PostgreSQL
- **Hosting**: Vercel

## 시작하기

### 필요 조건

- Node.js 18+
- npm 또는 yarn

### 설치

1. 저장소 클론:
```bash
git clone <repository-url>
cd meadow-proto
```

2. 의존성 설치:
```bash
npm install
```

3. Playwright 브라우저 설치:
```bash
npx playwright install chromium
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

**참고**: 이 프로토타입 버전은 데이터베이스가 필요하지 않습니다. 모든 분석은 일회성으로 처리되며 결과는 클라이언트 메모리에만 저장됩니다.

## 사용 방법

1. 홈페이지에서 진단하려는 웹사이트의 URL 입력
2. "진단 시작" 버튼 클릭
3. 진단 완료 후 같은 페이지에 결과 표시
4. 접근성 점수, 문제 목록, 해결 방법 확인
5. 필요시 HTML 리포트 다운로드
6. "새로운 분석하기" 버튼으로 다른 사이트 진단

## 프로젝트 구조

```
/app
  /page.tsx                 # 홈페이지 (입력폼 + 결과 표시)
  /api
    /analyze/route.ts       # POST /api/analyze (분석 API)
/components
  /AnalysisForm.tsx         # URL 입력 폼
  /ScoreDisplay.tsx         # 점수 표시
  /ImpactSummary.tsx        # 심각도별 요약
  /ViolationList.tsx        # 문제 목록
/lib
  /analyzer.ts              # Playwright + axe-core 분석
  /scoring.ts               # 점수 계산
  /translator.ts            # 한국어 번역
  /types.ts                 # TypeScript 타입 정의
  /translations/
    /accessibility-ko.json  # 한국어 번역 데이터
```

## 주요 API

### POST /api/analyze
URL 접근성 분석 요청 및 결과 반환

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "score": 67,
  "totalIssues": 22,
  "violations": [...],
  "createdAt": "2025-10-30T12:00:00.000Z"
}
```

## 제약사항 (프로토타입 버전)

- **데이터 저장**: 결과는 저장되지 않음 (일회성 분석)
- **세션**: 페이지 새로고침 시 결과 사라짐
- **페이지 크기**: 큰 페이지는 분석 시간이 오래 걸릴 수 있음
- **인증**: 로그인이 필요한 페이지는 진단 불가

## 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

### 프로덕션 서버 시작

```bash
npm start
```

### Vercel 배포

1. Vercel 계정에 로그인
2. 저장소를 연결
3. 배포 시작 (환경 변수 불필요)

## 라이선스

이 프로젝트는 axe-core (MPL 2.0 라이선스)를 사용합니다.

## 문의

문제가 있거나 제안 사항이 있으시면 이슈를 생성해주세요.
# 웹 접근성 진단 사이트 PRD (MVP)

## 1. 프로젝트 개요

### 제품명
**AccessCheck** - 웹 접근성 자동 진단 서비스

### 목적
개발자가 URL만 입력하면 웹사이트의 접근성 문제를 즉시 확인할 수 있는 무료 서비스

### 핵심 가치
- 설치 없이 즉시 사용
- 한국어로 제공되는 명확한 가이드
- axe-core 기반의 정확한 진단

## 2. 사용자

**타겟**: 웹 개발자, 프론트엔드 개발자

**주요 니즈**
- 빠른 접근성 체크
- 구체적인 수정 방법
- WCAG 기준 준수 확인

## 3. MVP 핵심 기능

### 3.1 URL 진단
- URL 입력 폼
- 실시간 진단 (30초 이내)
- WCAG 2.1 Level A, AA 기준

### 3.2 결과 대시보드
**표시 정보**
- 접근성 점수 (0-100점)
- 발견된 문제 개수
- 문제 심각도별 분류 (Critical, Serious, Moderate, Minor)

### 3.3 문제 상세 리스트
**각 문제별 표시**
- 문제 설명 (한국어)
- 영향받는 HTML 요소
- CSS Selector
- 수정 방법
- WCAG 기준

### 3.4 리포트 다운로드
- HTML 형식으로 다운로드
- 진단 날짜, URL, 전체 결과 포함

## 4. 기술 스택

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- axe-core (진단 엔진)
- Playwright (브라우저 자동화)

### Database
- PostgreSQL (진단 결과 임시 저장 24시간)

### Hosting
- Vercel

## 5. 화면 구성

```
1. 홈 (/)
   - 서비스 소개
   - URL 입력 폼
   - "진단 시작" 버튼

2. 진단 중 (/analyze?url=...)
   - 로딩 애니메이션
   - 진행 상태 표시

3. 결과 (/results/[id])
   - 점수 표시 (큰 원형 차트)
   - 문제 요약 카드 (심각도별)
   - 문제 상세 리스트
   - "리포트 다운로드" 버튼
```

## 6. 주요 화면 와이어프레임

### 홈페이지
```
┌─────────────────────────────────────┐
│         AccessCheck                  │
│   웹 접근성을 자동으로 진단합니다     │
│                                      │
│   [URL 입력: _________________]      │
│          [진단 시작 →]               │
│                                      │
│   • WCAG 2.1 기준                    │
│   • 한국어 가이드                     │
│   • 무료 사용                         │
└─────────────────────────────────────┘
```

### 결과 페이지
```
┌─────────────────────────────────────┐
│  example.com - 진단 결과             │
│                                      │
│      ┌─────┐                         │
│      │ 67  │  접근성 점수             │
│      └─────┘                         │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐         │
│  │ 🔴 3 │ │ 🟠 7 │ │ 🟡 12│         │
│  └──────┘ └──────┘ └──────┘         │
│                                      │
│  [리포트 다운로드]                    │
│                                      │
│  ──────────────────────────         │
│                                      │
│  🔴 CRITICAL                         │
│  ■ 이미지에 대체 텍스트 없음          │
│    → <img src="logo.png">            │
│    → .header > img                   │
│    → alt 속성을 추가하세요            │
│                                      │
│  ■ 버튼에 접근 가능한 이름 없음       │
│    → <button><i class="icon"></i>    │
│    → .sidebar button                 │
│    → aria-label 추가하세요            │
└─────────────────────────────────────┘
```

## 7. 데이터 구조

### Analysis 테이블
```typescript
{
  id: string           // 고유 ID
  url: string          // 진단한 URL
  score: number        // 0-100 점수
  totalIssues: number  // 전체 문제 개수
  violations: {        // 문제 목록
    ruleId: string
    impact: string     // critical|serious|moderate|minor
    description: string
    helpUrl: string
    nodes: [{
      html: string
      target: string   // CSS Selector
    }]
  }[]
  createdAt: Date
}
```

## 8. API 설계

### POST /api/analyze
**요청**
```json
{
  "url": "https://example.com"
}
```

**응답**
```json
{
  "id": "abc123",
  "status": "processing"
}
```

### GET /api/results/:id
**응답**
```json
{
  "id": "abc123",
  "url": "https://example.com",
  "score": 67,
  "totalIssues": 22,
  "violations": [
    {
      "ruleId": "image-alt",
      "impact": "critical",
      "description": "이미지에 대체 텍스트가 없습니다",
      "wcag": "WCAG 2.1 Level A - 1.1.1",
      "helpUrl": "...",
      "nodes": [
        {
          "html": "<img src=\"logo.png\">",
          "target": ".header > img",
          "solution": "alt 속성을 추가하세요"
        }
      ]
    }
  ]
}
```

## 9. 핵심 구현 로직

### 진단 프로세스
```javascript
// /api/analyze 엔드포인트
1. URL 유효성 검증
2. 브라우저 실행 (Playwright)
3. 페이지 로드
4. axe-core 실행
5. 결과를 한국어로 변환
6. DB 저장
7. 결과 ID 반환

// axe-core 실행 코드
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url);

await page.addScriptTag({ 
  path: 'node_modules/axe-core/axe.min.js' 
});

const results = await page.evaluate(() => {
  return axe.run({
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa']
  });
});

await browser.close();
```

### 점수 계산
```javascript
// 간단한 점수 산정 방식
const weights = {
  critical: 10,
  serious: 5,
  moderate: 3,
  minor: 1
};

let penalty = 0;
violations.forEach(v => {
  penalty += weights[v.impact] * v.nodes.length;
});

const score = Math.max(0, 100 - penalty);
```

## 10. 한국어 번역

### 주요 규칙 번역 (예시)
```json
{
  "color-contrast": {
    "description": "텍스트와 배경의 명도 대비가 4.5:1 미만입니다",
    "solution": "전경색과 배경색의 명도 대비를 높이세요"
  },
  "image-alt": {
    "description": "이미지에 대체 텍스트가 없습니다",
    "solution": "img 태그에 alt 속성을 추가하세요"
  },
  "button-name": {
    "description": "버튼에 접근 가능한 이름이 없습니다",
    "solution": "버튼에 텍스트나 aria-label을 추가하세요"
  },
  "label": {
    "description": "폼 요소에 레이블이 없습니다",
    "solution": "input에 연결된 label을 추가하세요"
  }
}
```

## 11. 제약사항

### 기능 제약
- 로그인 없음 (익명 사용)
- 단일 페이지만 진단
- 결과 저장 24시간만
- 동일 IP에서 1시간에 10회 제한

### 기술 제약
- 자바스크립트 렌더링이 필요한 SPA만 지원
- 로그인이 필요한 페이지 진단 불가
- 5MB 이상 페이지 제외

## 12. 출시 계획

### 4주 개발 일정

**Week 1**
- 프로젝트 세팅
- axe-core + Playwright 통합
- 기본 API 구현

**Week 2**
- 홈페이지 UI
- 결과 페이지 UI
- 한국어 번역 작업

**Week 3**
- 점수 계산 로직
- 리포트 다운로드
- 에러 처리

**Week 4**
- 테스트 (10개 이상 실제 사이트)
- 버그 수정
- 배포

## 13. 성공 지표

### 출시 후 1개월 목표
- 일 방문자 100명
- 일 진단 50회
- 평균 진단 시간 < 30초
- 에러율 < 5%

## 14. 향후 확장 가능성

**Phase 2** (출시 후 3개월)
- 회원가입 / 로그인
- 진단 이력 저장
- 여러 페이지 크롤링

**Phase 3** (출시 후 6개월)
- 유료 플랜 (무제한 진단)
- API 제공
- 팀 협업 기능

## 15. 체크리스트

### 개발 전 준비
- [ ] axe-core 라이선스 확인 (MPL 2.0)
- [ ] Playwright 설치 및 테스트
- [ ] 한국어 번역 리스트 준비
- [ ] 디자인 시스템 선정

### MVP 필수 기능
- [ ] URL 입력 폼
- [ ] 진단 실행
- [ ] 결과 점수 표시
- [ ] 문제 리스트 표시
- [ ] 한국어 설명
- [ ] HTML 리포트 다운로드

### 출시 전 체크
- [ ] 10개 사이트 테스트
- [ ] 모바일 반응형
- [ ] 에러 처리
- [ ] 로딩 상태 표시
- [ ] 이용약관 작성
- [ ] 개인정보처리방침 작성

---

## 부록: 주요 접근성 규칙 Top 10

| 순위 | Rule ID | 설명 | 영향도 |
|-----|---------|------|--------|
| 1 | color-contrast | 명도 대비 부족 | Serious |
| 2 | image-alt | 이미지 대체 텍스트 누락 | Critical |
| 3 | label | 폼 레이블 누락 | Critical |
| 4 | button-name | 버튼 이름 누락 | Critical |
| 5 | link-name | 링크 이름 누락 | Serious |
| 6 | html-has-lang | HTML lang 속성 누락 | Serious |
| 7 | document-title | 페이지 제목 누락 | Serious |
| 8 | aria-allowed-attr | 잘못된 ARIA 속성 | Critical |
| 9 | list | 잘못된 리스트 구조 | Serious |
| 10 | heading-order | 제목 순서 오류 | Moderate |
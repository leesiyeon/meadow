'use client';

import { useState, useRef, useEffect } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import ScoreDisplay from '@/components/ScoreDisplay';
import ImpactSummary from '@/components/ImpactSummary';
import ViolationList from '@/components/ViolationList';
import { getIssuesByImpact } from '@/lib/scoring';
import type { AnalysisResult } from '@/lib/types';

export default function Home() {
  const [results, setResults] = useState<any>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageScale, setImageScale] = useState({ scaleX: 1, scaleY: 1 });

  const handleNewAnalysis = () => {
    setResults(null);
  };

  // 결과가 없을 때 - 초기 화면
  if (!results) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Meadow
              </h1>
              <p className="text-2xl text-gray-600 mb-4 font-light">
                웹 접근성을 자동으로 진단합니다
              </p>
              <p className="text-gray-500">
                WCAG 2.1 Level A, AA 기준을 한눈에 확인하세요
              </p>
            </div>

            {/* Form */}
            <div className="mb-12 animate-slide-up">
              <AnalysisForm onResultsReady={setResults} />
            </div>

            {/* Footer info */}
            <div className="text-center">
              <div className="inline-flex items-center gap-8 px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">무료 사용</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">axe-core 기반</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 결과가 있을 때 - 결과 화면
  const impactCounts = getIssuesByImpact(results.violations);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <button
            onClick={handleNewAnalysis}
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-white rounded-xl border border-emerald-200 hover:border-emerald-300 hover:shadow-lg transition-all mb-6"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>새로운 분석하기</span>
          </button>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">📊</span>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">진단 결과</h1>
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a href={results.url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-emerald-600 transition-colors">
                    {results.url}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>진단 일시: {new Date(results.createdAt).toLocaleString('ko-KR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Display */}
        <div className="mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <ScoreDisplay score={results.score} />
        </div>

        {/* Impact Summary */}
        <div className="mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <ImpactSummary
            critical={impactCounts.critical}
            serious={impactCounts.serious}
            moderate={impactCounts.moderate}
            minor={impactCounts.minor}
          />
        </div>

        {/* 좌우 분할 레이아웃: 스크린샷(왼쪽 고정) + 문제 목록(오른쪽 독립 스크롤) */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 왼쪽: 스크린샷 (sticky) */}
            {results.screenshot && (
              <div className="lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-48px)] lg:overflow-y-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg shadow-md">
                        <span className="text-lg">🎯</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">문제 요소 시각화</h3>
                        <p className="text-xs text-gray-600">배지 클릭 시 오른쪽 상세 정보로 이동</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-50">
                    <div className="bg-white p-2 rounded-xl shadow-inner border border-gray-200 relative">
                      <img
                        ref={imageRef}
                        src={results.screenshot}
                        alt={`${results.url} 스크린샷 - 문제 요소가 하이라이트됨`}
                        className="w-full h-auto rounded-lg"
                        onLoad={(e) => {
                          const img = e.currentTarget;
                          const naturalWidth = img.naturalWidth;
                          const displayWidth = img.clientWidth;
                          const scaleX = displayWidth / naturalWidth;
                          const scaleY = scaleX;
                          setImageScale({ scaleX, scaleY });
                        }}
                      />

                      {/* 클릭 가능한 라벨 오버레이 */}
                      {results.elementPositions && results.elementPositions.map((pos: any, index: number) => (
                        <button
                          key={`overlay-${pos.violationIndex}-${pos.nodeIndex}`}
                          onClick={() => {
                            const elementId = `violation-${pos.violationIndex}-${pos.nodeIndex}`;
                            const element = document.getElementById(elementId);
                            if (element) {
                              const detailsElement = element.closest('details');
                              if (detailsElement && !detailsElement.open) {
                                detailsElement.open = true;
                              }

                              // 오른쪽 컨테이너 내에서 스크롤
                              const rightContainer = element.closest('.violations-container');
                              if (rightContainer) {
                                const elementTop = element.offsetTop;
                                rightContainer.scrollTo({
                                  top: elementTop - 100,
                                  behavior: 'smooth'
                                });
                              }

                              // 하이라이트 효과
                              element.classList.add('ring-4', 'ring-red-400', 'ring-offset-4');
                              setTimeout(() => {
                                element.classList.remove('ring-4', 'ring-red-400', 'ring-offset-4');
                              }, 2000);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            left: `${pos.x * imageScale.scaleX}px`,
                            top: `${pos.y * imageScale.scaleY}px`,
                            width: `${pos.width * imageScale.scaleX}px`,
                            height: `${pos.height * imageScale.scaleY}px`,
                            zIndex: 10,
                          }}
                          className="cursor-pointer hover:bg-red-500/20 transition-colors rounded"
                          title={`문제 ${pos.violationIndex + 1}-${pos.nodeIndex + 1}로 이동`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 오른쪽: 문제 목록 */}
            <div>
              <ViolationList violations={results.violations as any} />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center py-8 border-t-2 border-gray-200 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200">
            <span className="text-lg">⚡</span>
            <p className="text-sm font-medium text-gray-700">Meadow는 axe-core를 기반으로 WCAG 2.1 Level A, AA 기준을 진단합니다</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// HTML 리포트 생성 함수
function generateHtmlReport(result: AnalysisResult, impactCounts: any): string {
  const date = new Date(result.createdAt).toLocaleString('ko-KR');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meadow 진단 리포트 - ${result.url}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .score-box {
      background: white;
      padding: 40px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .score {
      font-size: 72px;
      font-weight: bold;
      color: ${result.score >= 90 ? '#16a34a' : result.score >= 70 ? '#ca8a04' : result.score >= 50 ? '#ea580c' : '#dc2626'};
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }
    .summary-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .summary-card.critical { border-left: 4px solid #dc2626; }
    .summary-card.serious { border-left: 4px solid #ea580c; }
    .summary-card.moderate { border-left: 4px solid #ca8a04; }
    .summary-card.minor { border-left: 4px solid #2563eb; }
    .summary-card .count {
      font-size: 36px;
      font-weight: bold;
    }
    .violation {
      background: white;
      padding: 25px;
      border-radius: 8px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .violation.critical { border-left: 4px solid #dc2626; }
    .violation.serious { border-left: 4px solid #ea580c; }
    .violation.moderate { border-left: 4px solid #ca8a04; }
    .violation.minor { border-left: 4px solid #2563eb; }
    .violation h3 {
      margin-top: 0;
      color: #333;
    }
    .solution-box {
      background: #f9fafb;
      padding: 15px;
      border-radius: 4px;
      margin: 10px 0;
      border: 1px solid #e5e7eb;
    }
    .node {
      background: #f9fafb;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      font-size: 12px;
      border: 1px solid #e5e7eb;
    }
    .node code {
      background: #e5e7eb;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Meadow 웹 접근성 진단 리포트</h1>
    <p><strong>URL:</strong> ${result.url}</p>
    <p><strong>진단 일시:</strong> ${date}</p>
    <p><strong>진단 기준:</strong> WCAG 2.1 Level A, AA</p>
  </div>

  ${result.screenshot ? `
  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #fee2e2, #fce7f3); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #fecaca;">
      <h3 style="margin: 0 0 8px 0; color: #991b1b; font-size: 16px;">🎯 문제 요소 시각화</h3>
      <p style="margin: 0; color: #7f1d1d; font-size: 14px;">빨간색 테두리와 라벨로 표시된 부분이 접근성 문제가 있는 요소입니다</p>
    </div>
    <img src="${result.screenshot}" alt="페이지 스크린샷 - 문제 요소가 하이라이트됨" style="width: 100%; height: auto; border-radius: 4px; border: 1px solid #e5e7eb;" />
    <p style="text-align: center; margin: 10px 0 0 0; color: #666; font-size: 12px;">💡 각 문제는 아래 상세 목록에서 확인할 수 있습니다</p>
  </div>
  ` : ''}

  <div class="score-box">
    <div class="score">${result.score}</div>
    <div>접근성 점수</div>
  </div>

  <div class="summary">
    <div class="summary-card critical">
      <div class="count" style="color: #dc2626">${impactCounts.critical}</div>
      <div>Critical (심각)</div>
    </div>
    <div class="summary-card serious">
      <div class="count" style="color: #ea580c">${impactCounts.serious}</div>
      <div>Serious (중요)</div>
    </div>
    <div class="summary-card moderate">
      <div class="count" style="color: #ca8a04">${impactCounts.moderate}</div>
      <div>Moderate (보통)</div>
    </div>
    <div class="summary-card minor">
      <div class="count" style="color: #2563eb">${impactCounts.minor}</div>
      <div>Minor (경미)</div>
    </div>
  </div>

  <h2>발견된 문제 목록 (총 ${result.totalIssues}개)</h2>

  ${result.violations.map((v: any) => `
    <div class="violation ${v.impact}">
      <h3>${v.koreanDescription || v.description}</h3>
      <p><strong>심각도:</strong> ${v.impact.toUpperCase()}</p>
      ${v.wcag ? `<p><strong>기준:</strong> ${v.wcag}</p>` : ''}
      <p><strong>영향받는 요소:</strong> ${v.nodes.length}개</p>

      <div class="solution-box">
        <strong>해결 방법:</strong><br>
        ${v.koreanSolution || v.help}
      </div>

      <details>
        <summary style="cursor: pointer; margin: 10px 0;"><strong>영향받는 요소 상세</strong></summary>
        ${v.nodes.map((node: any) => `
          <div class="node">
            <p><strong>CSS Selector:</strong> <code>${node.target.join(', ')}</code></p>
            <pre style="overflow-x: auto;">${node.html}</pre>
          </div>
        `).join('')}
      </details>

      <p><a href="${v.helpUrl}" target="_blank">자세한 정보 보기 →</a></p>
    </div>
  `).join('')}

  <div class="footer">
    <p>이 리포트는 Meadow에서 생성되었습니다.</p>
    <p>axe-core 기반의 자동화된 접근성 진단 도구</p>
    <p>생성 일시: ${new Date().toLocaleString('ko-KR')}</p>
  </div>
</body>
</html>`;
}

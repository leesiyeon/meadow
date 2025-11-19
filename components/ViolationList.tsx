import type { Violation } from '@/lib/types';

interface ViolationListProps {
  violations: (Violation & {
    koreanDescription?: string;
    koreanSolution?: string;
    wcag?: string;
    codeExample?: {
      before: string;
      after: string;
    };
  })[];
}

export default function ViolationList({ violations }: ViolationListProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return {
        border: 'border-red-200',
        bg: 'bg-gradient-to-br from-red-50 to-rose-50',
        badge: 'bg-red-100 text-red-700 border-red-200',
        accent: 'border-l-red-500'
      };
      case 'serious': return {
        border: 'border-orange-200',
        bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
        badge: 'bg-orange-100 text-orange-700 border-orange-200',
        accent: 'border-l-orange-500'
      };
      case 'moderate': return {
        border: 'border-yellow-200',
        bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
        badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        accent: 'border-l-yellow-500'
      };
      case 'minor': return {
        border: 'border-blue-200',
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        accent: 'border-l-blue-500'
      };
      default: return {
        border: 'border-gray-200',
        bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
        badge: 'bg-gray-100 text-gray-700 border-gray-200',
        accent: 'border-l-gray-500'
      };
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'critical': return { emoji: '🔴', text: 'CRITICAL' };
      case 'serious': return { emoji: '🟠', text: 'SERIOUS' };
      case 'moderate': return { emoji: '🟡', text: 'MODERATE' };
      case 'minor': return { emoji: '🔵', text: 'MINOR' };
      default: return { emoji: '⚪', text: impact.toUpperCase() };
    }
  };

  // Impact별로 그룹화
  const sortedViolations = [...violations].sort((a, b) => {
    const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
    return impactOrder[a.impact] - impactOrder[b.impact];
  });

  if (violations.length === 0) {
    return (
      <div className="p-12 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200 rounded-3xl text-center shadow-lg animate-scale-in">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg">
          <div className="text-5xl">✅</div>
        </div>
        <h3 className="text-3xl font-bold text-emerald-900 mb-3">
          접근성 문제가 발견되지 않았습니다!
        </h3>
        <p className="text-lg text-emerald-700 mb-4">
          이 페이지는 WCAG 2.1 Level A, AA 기준을 충족합니다.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-emerald-200">
          <span className="text-2xl">🎉</span>
          <span className="text-sm font-semibold text-emerald-700">완벽한 접근성</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-shrink-0 w-2 h-8 bg-gradient-to-b from-red-500 to-blue-500 rounded-full"></div>
        <h2 className="text-3xl font-bold text-gray-900">
          발견된 문제 목록
        </h2>
      </div>

      {sortedViolations.map((violation, index) => {
        const colors = getImpactColor(violation.impact);
        const label = getImpactLabel(violation.impact);

        return (
          <div
            key={`${violation.id}-${index}`}
            id={`violation-${index}-0`}
            className={`group relative p-6 border-l-4 ${colors.accent} rounded-2xl ${colors.bg} ${colors.border} border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 animate-slide-up scroll-mt-24`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${colors.badge} border rounded-full mb-3 text-xs font-bold`}>
                  <span className="text-lg">{label.emoji}</span>
                  <span>{label.text}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  {violation.koreanDescription || violation.description}
                </h3>
              </div>
              <span className="ml-4 flex-shrink-0 px-4 py-2 text-sm font-bold bg-white rounded-xl shadow-sm border border-gray-200">
                {violation.nodes.length}개 요소
              </span>
            </div>

            {violation.wcag && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 mb-4 shadow-sm">
                <span>📋</span>
                <span>{violation.wcag}</span>
              </div>
            )}

            <div className="mb-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <span className="text-lg">💡</span>
                <span>해결 방법</span>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {violation.koreanSolution || violation.help}
              </div>
            </div>

            {violation.codeExample && (
              <div className="mb-4 p-5 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                  <span className="text-lg">🔧</span>
                  <span>코드 예시</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-200">❌ 잘못된 예시</span>
                    </div>
                    <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto border border-gray-700 shadow-inner">
                      <code>{violation.codeExample.before}</code>
                    </pre>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200">✅ 올바른 예시</span>
                    </div>
                    <pre className="text-xs bg-gray-900 text-green-100 p-4 rounded-lg overflow-x-auto border border-green-700 shadow-inner">
                      <code>{violation.codeExample.after}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            <details className="group/details">
              <summary className="cursor-pointer px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:shadow-md transition-all list-none flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-base group-open/details:rotate-90 transition-transform">▶</span>
                  <span>영향받는 요소 보기 ({violation.nodes.length}개)</span>
                </span>
              </summary>
              <div className="mt-4 space-y-4">
                {violation.nodes.map((node, nodeIndex) => (
                  <div
                    key={nodeIndex}
                    id={`violation-${index}-${nodeIndex}`}
                    className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow scroll-mt-24"
                  >
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-600 mb-1.5">CSS Selector</div>
                      <div className="text-xs font-mono text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                        {node.target.join(', ')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1.5">HTML</div>
                      <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto border border-gray-700 shadow-inner">
                        <code>{node.html}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </details>

            <div className="mt-4">
              <a
                href={violation.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200 hover:shadow-md"
              >
                <span>자세한 정보 보기</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
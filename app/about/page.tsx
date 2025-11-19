import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '소개 및 연락처',
  description: 'Meadow 웹 접근성 자동 진단 서비스 소개 및 연락처',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">소개 및 연락처</h1>
          <p className="text-gray-600">Meadow에 대해 알아보세요</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🌿</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Meadow란?</h2>
                <p className="text-gray-600">웹 접근성 자동 진단 서비스</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong className="text-emerald-600">Meadow</strong>는 웹 개발자와 프론트엔드 개발자를 위한
                <strong> 무료 웹 접근성 자동 진단 도구</strong>입니다.
                URL만 입력하면 즉시 웹사이트의 접근성 문제를 확인할 수 있습니다.
              </p>

              <p>
                WCAG 2.1 Level A, AA 기준으로 axe-core 엔진을 활용하여 자동화된 접근성 검사를 수행하며,
                모든 진단 결과를 <strong>한국어로 번역</strong>하여 제공합니다.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded mt-6">
                <h3 className="font-bold text-gray-900 mb-2">핵심 가치</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>즉시 진단:</strong> 설치 없이 URL만 입력하면 바로 결과 확인</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>무료 제공:</strong> 회원가입 없이 누구나 무료로 이용 가능</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>한국어 가이드:</strong> 모든 문제와 해결책을 한국어로 제공</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>axe-core 기반:</strong> 업계 표준 접근성 테스트 엔진 사용</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              기술 스택
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 14</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Analysis Engine</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• axe-core</li>
                  <li>• Playwright</li>
                  <li>• WCAG 2.1 A, AA</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📧</span>
              연락처
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">운영자</p>
                  <p className="text-gray-600">demoat2si</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">이메일</p>
                  <a
                    href="mailto:demoat2si@gmail.com"
                    className="text-emerald-600 hover:underline"
                  >
                    demoat2si@gmail.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    문의사항, 버그 제보, 개선 제안 등을 보내주세요
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>답변 시간:</strong> 영업일 기준 1-2일 이내 회신드립니다.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>⚠️</span>
              중요 안내
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Meadow는 <strong>자동화된 진단 도구</strong>로, 모든 접근성 문제를 감지하지 못할 수 있습니다.
              실제 접근성 준수를 위해서는 전문가의 수동 검토가 필요합니다.
              진단 결과는 참고용으로만 활용하시기 바랍니다.
            </p>
          </div>

          {/* Links */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 링크</h2>
            <div className="space-y-3">
              <Link
                href="/privacy"
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                개인정보 처리방침
              </Link>
              <Link
                href="/terms"
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

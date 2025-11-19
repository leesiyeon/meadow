import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'Meadow 웹 접근성 자동 진단 서비스의 이용약관',
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">이용약관</h1>
          <p className="text-gray-600">최종 수정일: {new Date().toLocaleDateString('ko-KR')}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 Meadow(이하 &quot;서비스&quot;)가 제공하는 웹 접근성 자동 진단 서비스의 이용과 관련하여
              서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (서비스의 내용)</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>본 서비스는 다음과 같은 기능을 제공합니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>웹사이트 URL을 입력받아 WCAG 2.1 Level A, AA 기준으로 접근성 진단</li>
                <li>axe-core 엔진을 기반으로 한 자동화된 접근성 검사</li>
                <li>진단 결과의 한국어 번역 및 해결 방법 제시</li>
                <li>진단 결과 리포트 다운로드 (HTML 형식)</li>
              </ul>
              <p className="mt-4">
                <strong>본 서비스는 무료로 제공되며</strong>, 회원가입 없이 누구나 이용할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (서비스 이용)</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>이용자는 다음 사항을 준수해야 합니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>공개된 웹사이트 URL만 입력할 것 (로그인이 필요한 페이지는 분석 불가)</li>
                <li>과도한 요청을 통해 서비스에 부하를 주지 않을 것</li>
                <li>불법적이거나 유해한 콘텐츠가 포함된 웹사이트를 분석 목적으로 제출하지 않을 것</li>
                <li>서비스의 정상적인 운영을 방해하는 행위를 하지 않을 것</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (서비스의 제한 및 중단)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              서비스는 다음의 경우 서비스 제공을 제한하거나 중단할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>서비스 설비의 보수, 점검, 교체 등 부득이한 경우</li>
              <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우</li>
              <li>국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용 폭주 등의 경우</li>
              <li>이용자가 제3조의 의무를 위반한 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (진단 결과의 정확성)</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-gray-800 leading-relaxed">
                <strong>중요:</strong> 본 서비스는 axe-core 기반의 <strong>자동화된 진단 도구</strong>이며,
                모든 접근성 문제를 감지하지 못할 수 있습니다. 진단 결과는 참고용이며,
                실제 접근성 준수를 위해서는 전문가의 수동 검토가 필요합니다.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              서비스는 진단 결과의 정확성, 완전성, 유용성에 대해 보증하지 않으며,
              진단 결과에 기반한 조치로 발생하는 손해에 대해 책임지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (개인정보 보호)</h2>
            <p className="text-gray-700 leading-relaxed">
              서비스는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.
              자세한 내용은{' '}
              <Link href="/privacy" className="text-emerald-600 hover:underline font-semibold">
                개인정보 처리방침
              </Link>
              을 참조하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (저작권 및 지식재산권)</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>서비스 및 관련 소프트웨어의 저작권은 운영자에게 있습니다</li>
                <li>이용자가 생성한 진단 리포트는 이용자에게 귀속됩니다</li>
                <li>본 서비스는 오픈소스 라이브러리 axe-core(MPL 2.0)를 사용합니다</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (면책사항)</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>서비스는 다음 사항에 대해 책임을 지지 않습니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>이용자가 입력한 URL의 적법성 및 안전성</li>
                <li>진단 결과의 활용으로 인해 발생하는 직간접적 손해</li>
                <li>서비스의 일시적 중단, 오류, 지연 등으로 인한 손해</li>
                <li>제3자(Google Analytics, Google AdSense 등)의 서비스 장애로 인한 손해</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 (광고 게재)</h2>
            <p className="text-gray-700 leading-relaxed">
              서비스는 Google AdSense를 통해 광고를 게재할 수 있으며, 광고 내용 및 품질에 대한
              책임은 광고주에게 있습니다. 이용자는 광고 클릭 시 제3자 사이트로 이동할 수 있음을 인지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제10조 (준거법 및 관할법원)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁 발생 시
              관할법원은 민사소송법에 따릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제11조 (문의)</h2>
            <div className="bg-emerald-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                본 약관에 대한 문의사항이 있으시면 아래로 연락주시기 바랍니다:
              </p>
              <p className="text-gray-700 mb-1">
                <strong>운영자:</strong> demoat2si
              </p>
              <p className="text-gray-700">
                <strong>이메일:</strong>{' '}
                <a href="mailto:demoat2si@gmail.com" className="text-emerald-600 hover:underline">
                  demoat2si@gmail.com
                </a>
              </p>
            </div>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              본 이용약관은 {new Date().toLocaleDateString('ko-KR')}부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

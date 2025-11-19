import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보 처리방침',
  description: 'Meadow 웹 접근성 자동 진단 서비스의 개인정보 처리방침',
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">개인정보 처리방침</h1>
          <p className="text-gray-600">최종 수정일: {new Date().toLocaleDateString('ko-KR')}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Meadow(이하 "서비스")는 기본적으로 개인정보를 수집하지 않습니다.
              사용자가 입력한 웹사이트 URL은 일시적으로 분석에만 사용되며, 서버에 저장되지 않습니다.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>웹 접근성 진단을 위한 URL 처리 (임시 처리, 저장 안 함)</li>
              <li>서비스 개선 및 통계 분석 (Google Analytics 사용)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 수집하는 정보</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p className="font-semibold">본 서비스는 다음 정보를 자동으로 수집합니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>접속 로그 (IP 주소, 브라우저 정보, 접속 시간)</li>
                <li>서비스 이용 기록 (Google Analytics를 통한 익명 통계)</li>
                <li>쿠키 및 유사 기술 (Google AdSense 광고 게재 목적)</li>
              </ul>
              <p className="mt-4">
                <strong>회원가입이 필요하지 않으며</strong>, 이름, 이메일 등 식별 가능한 개인정보는 수집하지 않습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 쿠키(Cookie) 사용</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              본 서비스는 사용자 경험 개선 및 맞춤형 광고 제공을 위해 쿠키를 사용합니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>필수 쿠키:</strong> 서비스의 기본 기능 제공</li>
              <li><strong>분석 쿠키:</strong> Google Analytics를 통한 서비스 개선</li>
              <li><strong>광고 쿠키:</strong> Google AdSense 맞춤형 광고 제공</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              브라우저 설정을 통해 쿠키를 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-gray-700 leading-relaxed">
              사용자가 입력한 URL 및 분석 결과는 <strong>서버에 저장되지 않으며</strong>,
              브라우저 세션 종료 시 모두 삭제됩니다. Google Analytics 데이터는 Google의 개인정보
              처리방침에 따라 관리됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 제3자 제공</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              본 서비스는 다음 제3자 서비스를 이용합니다:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Google Analytics</p>
                <p className="text-sm text-gray-600">
                  목적: 서비스 이용 통계 및 분석<br />
                  개인정보 처리방침: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google Privacy Policy</a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Google AdSense</p>
                <p className="text-sm text-gray-600">
                  목적: 광고 게재 및 맞춤형 광고 제공<br />
                  개인정보 처리방침: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google Ads Policy</a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 사용자의 권리</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              본 서비스는 개인 식별 정보를 수집하지 않으므로, 별도의 개인정보 열람, 수정, 삭제 절차가 필요하지 않습니다.
              다만, 쿠키 및 추적 기술과 관련하여 다음 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>브라우저 설정을 통한 쿠키 삭제 및 차단</li>
              <li>Google 광고 맞춤설정 해제: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google Ads Settings</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 개인정보 보호책임자</h2>
            <div className="bg-emerald-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>운영자:</strong> demoat2si
              </p>
              <p className="text-gray-700">
                <strong>이메일:</strong> <a href="mailto:demoat2si@gmail.com" className="text-emerald-600 hover:underline">demoat2si@gmail.com</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 개인정보 처리방침 변경</h2>
            <p className="text-gray-700 leading-relaxed">
              본 개인정보 처리방침은 법령, 정책 또는 서비스의 변경에 따라 수정될 수 있으며,
              변경 시 본 페이지를 통해 공지합니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Meadow</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              웹 접근성 자동 진단 서비스
              <br />
              WCAG 2.1 기준 무료 검사
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  소개 및 연락처
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">문의</h3>
            <p className="text-sm text-gray-600">
              이메일:{' '}
              <a
                href="mailto:demoat2si@gmail.com"
                className="text-emerald-600 hover:underline"
              >
                demoat2si@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} Meadow. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Powered by</span>
              <a
                href="https://www.deque.com/axe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-medium"
              >
                axe-core
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

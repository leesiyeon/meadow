import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://main.d2bn6vfwpt7dhb.amplifyapp.com";
const siteName = "Meadow";
const siteTitle = "Meadow - 웹 접근성 자동 진단";
const siteDescription = "URL만 입력하면 웹사이트의 접근성 문제를 즉시 확인할 수 있는 무료 서비스. WCAG 2.1 Level A, AA 기준으로 axe-core를 활용한 자동 진단을 제공합니다.";
const siteKeywords = [
  "웹 접근성",
  "접근성 진단",
  "WCAG",
  "axe-core",
  "웹 접근성 검사",
  "접근성 테스트",
  "웹 표준",
  "장애인 웹 접근성",
  "무료 접근성 도구",
  "accessibility",
  "web accessibility",
  "accessibility testing"
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "Meadow Team" }],
  creator: "Meadow",
  publisher: "Meadow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
    // opengraph-image.tsx가 자동으로 이미지를 생성합니다
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    // opengraph-image.tsx가 자동으로 이미지를 생성합니다
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "wb8j80fm07InbtL9gncStJ-MDVJ3WGVqH3RB1Zr5HIg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": siteName,
  "url": siteUrl,
  "description": siteDescription,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "featureList": [
    "웹 접근성 자동 진단",
    "WCAG 2.1 Level A, AA 기준 검사",
    "axe-core 기반 분석",
    "즉시 결과 확인",
    "한국어 가이드 제공"
  ],
  "inLanguage": "ko",
  "isAccessibleForFree": true,
  "provider": {
    "@type": "Organization",
    "name": "Meadow Team"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HRNWCKTQXE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HRNWCKTQXE');
          `}
        </Script>

        {/* Google AdSense - 승인 후 활성화 */}
        {/*
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
      </head>
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
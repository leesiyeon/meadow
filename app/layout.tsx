import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meadow - 웹 접근성 자동 진단",
  description: "URL만 입력하면 웹사이트의 접근성 문제를 즉시 확인할 수 있는 무료 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
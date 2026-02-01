import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevUtils - 개발자 도구 모음",
  description: "개발자를 위한 편리한 유틸리티 도구 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                DevUtils
              </Link>
              <div className="flex gap-4 flex-wrap">
                <Link href="/tools/regex-tester" className="hover:text-gray-300">
                  정규식 테스터
                </Link>
                <Link href="/tools/json-formatter" className="hover:text-gray-300">
                  JSON 포맷터
                </Link>
                <Link href="/tools/base64-encoder" className="hover:text-gray-300">
                  Base64 인코더
                </Link>
                <Link href="/tools/dummy-data-generator" className="hover:text-gray-300">
                  더미 데이터 생성기
                </Link>
                <Link href="/tools/git-command-generator" className="hover:text-gray-300">
                  Git 커맨드 생성기
                </Link>
                <Link href="/tools/color-converter" className="hover:text-gray-300">
                  색상 변환기
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
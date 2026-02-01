import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // Import the new Navbar component

const BASE_URL = 'https://devutils.example.com'; // Replace with your actual domain

export const metadata: Metadata = {
  title: "DevUtils - 개발자 도구 모음",
  description: "개발자를 위한 편리한 유틸리티 도구 모음",
  icons: {
    icon: '/favicon.svg', // Referencing the new SVG favicon
  },
  openGraph: {
    title: 'DevUtils - 개발자 도구 모음',
    description: '개발자를 위한 편리한 유틸리티 도구 모음: 정규식 테스터, JSON 포맷터, Base64 인코더, 더미 데이터 생성기, Git 커맨드 생성기, 색상 변환기 등 다양한 도구를 한 곳에서!',
    url: BASE_URL,
    siteName: 'DevUtils',
    images: [
      {
        url: `${BASE_URL}/devutils-og.svg`, // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'DevUtils - 개발자 도구 모음',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevUtils - 개발자 도구 모음',
    description: '개발자를 위한 편리한 유틸리티 도구 모음: 정규식 테스터, JSON 포맷터, Base64 인코더, 더미 데이터 생성기, Git 커맨드 생성기, 색상 변환기 등 다양한 도구를 한 곳에서!',
    creator: '@your_twitter_handle', // Replace with actual Twitter handle if available
    site: '@your_twitter_handle', // Replace with actual Twitter handle if available
    images: [`${BASE_URL}/devutils-og.svg`], // Must be an absolute URL
  },
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
          <header className="bg-[color:var(--brand-primary)] text-white p-4 shadow-sm">
            <Navbar /> {/* Use the Navbar component */}
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

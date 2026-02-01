import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // Import the new Navbar component

export const metadata: Metadata = {
  title: "DevUtils - 개발자 도구 모음",
  description: "개발자를 위한 편리한 유틸리티 도구 모음",
  icons: {
    icon: '/favicon.svg', // Referencing the new SVG favicon
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
          <header className="bg-gray-800 text-white p-4">
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
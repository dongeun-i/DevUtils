import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마크다운 미리보기 | DevUtils',
  description: '마크다운을 실시간으로 렌더링하여 미리보기합니다. GitHub 스타일 지원.',
  openGraph: {
    title: '마크다운 미리보기 | DevUtils',
    description: '마크다운을 실시간으로 렌더링하여 미리보기합니다. GitHub 스타일 지원.',
    url: 'https://devutils.example.com/tools/markdown-preview',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: '마크다운 미리보기',
      },
    ],
  },
  twitter: {
    title: '마크다운 미리보기 | DevUtils',
    description: '마크다운을 실시간으로 렌더링하여 미리보기합니다. GitHub 스타일 지원.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: '마크다운 미리보기',
      },
    ],
  },
};

export default function MarkdownPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

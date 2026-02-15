import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '타임스탬프 변환기 | DevUtils',
  description: 'Unix 타임스탬프와 읽기 쉬운 날짜를 서로 변환합니다. 초·밀리초 지원, 현재 시간 확인.',
  openGraph: {
    title: '타임스탬프 변환기 | DevUtils',
    description: 'Unix 타임스탬프와 읽기 쉬운 날짜를 서로 변환합니다. 초·밀리초 지원, 현재 시간 확인.',
    url: 'https://devutils.example.com/tools/timestamp-converter',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: '타임스탬프 변환기',
      },
    ],
  },
  twitter: {
    title: '타임스탬프 변환기 | DevUtils',
    description: 'Unix 타임스탬프와 읽기 쉬운 날짜를 서로 변환합니다. 초·밀리초 지원, 현재 시간 확인.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: '타임스탬프 변환기',
      },
    ],
  },
};

export default function TimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

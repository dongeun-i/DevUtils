import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON 포맷터 / 검증기 | DevUtils',
  description: 'JSON 데이터를 포맷하고 유효성을 검사합니다. 보기 쉬운 형태로 정렬하고 오류를 식별합니다.',
  openGraph: {
    title: 'JSON 포맷터 / 검증기 | DevUtils',
    description: 'JSON 데이터를 포맷하고 유효성을 검사합니다. 보기 쉬운 형태로 정렬하고 오류를 식별합니다.',
    url: 'https://devutils.example.com/tools/json-formatter', // Replace with actual domain
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: 'JSON 포맷터 / 검증기',
      },
    ],
  },
  twitter: {
    title: 'JSON 포맷터 / 검증기 | DevUtils',
    description: 'JSON 데이터를 포맷하고 유효성을 검사합니다. 보기 쉬운 형태로 정렬하고 오류를 식별합니다.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: 'JSON 포맷터 / 검증기',
      },
    ],
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
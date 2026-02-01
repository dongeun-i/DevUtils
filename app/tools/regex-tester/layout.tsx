import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '정규식 테스터 | DevUtils',
  description: '정규식을 테스트하고 문자열에서 일치하는 부분을 찾아 하이라이트합니다. 실시간으로 정규식 매칭을 확인하고 일치하는 부분을 강조하여 표시합니다.',
  openGraph: {
    title: '정규식 테스터 | DevUtils',
    description: '정규식을 테스트하고 문자열에서 일치하는 부분을 찾아 하이라이트합니다. 실시간으로 정규식 매칭을 확인하고 일치하는 부분을 강조하여 표시합니다.',
    url: 'https://devutils.example.com/tools/regex-tester', // Replace with actual domain
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: '정규식 테스터',
      },
    ],
  },
  twitter: {
    title: '정규식 테스터 | DevUtils',
    description: '정규식을 테스트하고 문자열에서 일치하는 부분을 찾아 하이라이트합니다. 실시간으로 정규식 매칭을 확인하고 일치하는 부분을 강조하여 표시합니다.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: '정규식 테스터',
      },
    ],
  },
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}